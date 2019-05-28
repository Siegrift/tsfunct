import { exist } from '../exist'

describe('exist', () => {
  let obj: { a: string[]; b: { [key: string]: boolean } }

  beforeEach(() => {
    obj = { a: ['xxx', 'yyy'], b: { c: true } }
  })

  test('returns whether the path exists on the object', () => {
    expect(exist(obj, ['a'])).toBe(true)
    expect(exist(obj, ['a', 0])).toBe(true)
    expect(exist(obj, ['b', 'c'])).toBe(true)

    expect(exist(obj as any, ['nonExistent'])).toBe(false)
    expect(exist(obj, ['a', 2])).toBe(false)
    expect(exist(obj, ['b', 'd'])).toBe(false)
  })

  test('handles case when the path exists, but value is undefined', () => {
    const undefinedObj = { a: undefined }
    expect(exist(undefinedObj, ['a'])).toBe(true)
  })
})
