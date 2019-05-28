import { pick } from '../pick'
import { Dictionary, Optional } from '../types'

describe('pick', () => {
  test('when object is null or undefined, returns object', () => {
    let obj: Optional<object> = null
    expect(pick(obj, [])).toBe(null)

    obj = undefined
    expect(pick(obj, [])).toBe(undefined)
  })

  test('returns new object from picked properties in source object', () => {
    const obj = { a: true, b: 'abc', c: 123 }

    expect(pick(obj, ['a', 'b'])).toEqual({ a: true, b: 'abc' })
  })

  test('accepts also an array of properties', () => {
    const dict: Dictionary<string> = { a: 'true', b: 'abc', c: '123' }

    expect(pick(dict, ['a', 'badKey', 'c'])).toEqual({ a: 'true', c: '123' })
  })
})
