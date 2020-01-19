import { isObject, shallowCopy } from './utils'

describe('utils', () => {
  describe('isObject', () => {
    test('returns true when the value is object', () => {
      expect(isObject({})).toBe(true)
      expect(isObject([1, 2, 3])).toBe(true)
      expect(isObject(Function)).toBe(true)

      expect(isObject(123)).toBe(false)
      expect(isObject(undefined)).toBe(false)
      expect(isObject(false)).toBe(false)
      expect(isObject(true)).toBe(false)
      expect(isObject('str')).toBe(false)
    })

    test('null is not object', () => {
      expect(isObject(null)).toBe(false)
    })
  })

  describe('shallowCopy', () => {
    test('primitive values', () => {
      expect(shallowCopy(123)).toBe(123)
      expect(shallowCopy(undefined)).toBe(undefined)
      expect(shallowCopy(null)).toBe(null)
      expect(shallowCopy(false)).toBe(false)
      expect(shallowCopy(true)).toBe(true)
      expect(shallowCopy('str')).toBe('str')
    })

    test('object', () => {
      // result needs to be shallow copy
      expect(shallowCopy({ a: true })).not.toBe({ a: true })
      expect(shallowCopy({ a: true })).toEqual({ a: true })

      // nested levels are the same
      const nested = { nested: 'str' }
      const obj = { top: nested }
      expect(shallowCopy(obj).top).toBe(nested)
    })

    test('array', () => {
      // result needs to be shallow copy
      expect(shallowCopy([true])).not.toBe([true])
      expect(shallowCopy([true])).toEqual([true])

      // nested levels are the same
      const nested = { nested: 'str' }
      const arr = [nested]
      expect(shallowCopy(arr)[0]).toBe(nested)
    })
  })
})
