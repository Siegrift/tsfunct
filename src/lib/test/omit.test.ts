import { omit } from '../omit'
import { Dictionary, Optional } from '../../types'

describe('omit', () => {
  test('when object is null or undefined, returns object', () => {
    let obj: Optional<object> = null
    expect(omit(obj, [])).toBe(null)

    obj = undefined
    expect(omit(obj, [])).toBe(undefined)
  })

  test('returns new object from omitted properties in source object', () => {
    const obj = { a: true, b: 'abc', c: 123 }

    expect(omit(obj, ['a', 'b'])).toEqual({ c: 123 })
  })

  test('accepts also an array of properties', () => {
    const dict: Dictionary<string> = { a: 'true', b: 'abc', c: '123' }

    expect(omit(dict, ['a', 'badKey', 'c'])).toEqual({ b: 'abc' })
  })
})
