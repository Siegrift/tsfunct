import { get } from '../get'

interface User {
  id: number
  key: string
}

interface State {
  users: User[]
  more: { [key: string]: number | string }
  optional?: { a: number }
  a: { b: { c: { d: { e: string } } } }
}

describe('get', () => {
  let state: State

  beforeEach(() => {
    state = {
      users: [
        { id: 156, key: 'asd' },
        { id: 56, key: 'hjghj' },
        { id: 78978, key: 'opi' },
      ],
      more: {
        someId: 'hello',
        someOther: 132,
      },
      a: { b: { c: { d: { e: '123' } } } },
    }
  })

  test('if object is null or undefined, returns undefined', () => {
    expect(get(null as any, ['asd'])).toBe(undefined)
    expect(get(undefined as any, ['asd'])).toBe(undefined)
  })

  describe('get the nested value in object', () => {
    test('in array', () => {
      expect(get(state, ['users', 0])).toEqual({ id: 156, key: 'asd' })
      expect(get(state, ['users', 0, 'id'])).toEqual(156)
    })

    test('in dictionary', () => {
      expect(get(state, ['more'])).toEqual({
        someId: 'hello',
        someOther: 132,
      })
      expect(get(state, ['more', 'someId'])).toBe('hello')
    })

    test('get up to 5 levels', () => {
      expect(get(state, ['a'])).toEqual({ b: { c: { d: { e: '123' } } } })
      expect(get(state, ['a', 'b'])).toEqual({ c: { d: { e: '123' } } })
      expect(get(state, ['a', 'b', 'c'])).toEqual({ d: { e: '123' } })
      expect(get(state, ['a', 'b', 'c', 'd'])).toEqual({ e: '123' })
      expect(get(state, ['a', 'b', 'c', 'd', 'e'])).toEqual('123')
    })
  })

  test('if object or intermidiate path is undefined, returns undefined', () => {
    expect(get(state, ['users', 10, 'id'])).toBe(undefined)
    expect(get(state, ['more', 'badId'])).toBe(undefined)
  })

  test('accepts default value', () => {
    expect(get(state, ['optional'], { a: 10 })).toEqual({ a: 10 })
  })

  test('returns nested value (as non optional) when default value is passed', () => {
    const user = get(state, ['users', 10], { id: -1, key: 'default' })
    // thisline verifies that user is of type 'User' and not 'User | undefined'
    const userId = user.id

    expect(user).toEqual({ id: -1, key: 'default' })
    expect(userId).toBe(-1)
  })
})
