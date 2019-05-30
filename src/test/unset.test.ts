import { unset } from '../unset'

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

describe('unset', () => {
  let state: State

  beforeEach(() => {
    state = {
      users: [{ id: 56, key: 'key' }],
      more: {
        someId: 'hello',
      },
      a: { b: { c: { d: { e: '123' } } } },
    }
  })

  describe('(immutably) remove value in source object', () => {
    test('in array', () => {
      expect(unset(state, ['users', 0])).toEqual({
        users: [],
        more: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('in dictionary', () => {
      expect(unset(state, ['more'])).toEqual({
        users: [{ id: 56, key: 'key' }],
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('unset up to 5 levels', () => {
      const obj = { a: state.a }

      expect(unset(obj, ['a'])).toEqual({})
      expect(unset(obj, ['a', 'b'])).toEqual({ a: {} })
      expect(unset(obj, ['a', 'b', 'c'])).toEqual({ a: { b: {} } })
      expect(unset(obj, ['a', 'b', 'c', 'd'])).toEqual({ a: { b: { c: {} } } })
      expect(unset(obj, ['a', 'b', 'c', 'd', 'e'])).toEqual({
        a: { b: { c: { d: {} } } },
      })
    })
  })

  test('is immutable', () => {
    unset(state, ['a', 'b', 'c', 'd', 'e'])

    expect(state).toBe(state)
  })

  test("if path doesn't exist, returns object", () => {
    expect(unset(null as any, ['key'])).toEqual(null)
    expect(unset(undefined as any, ['key'])).toEqual(undefined)

    expect(unset(state, ['users', 3, 'id'])).toEqual({
      users: [{ id: 56, key: 'key' }],
      more: {
        someId: 'hello',
      },
      a: { b: { c: { d: { e: '123' } } } },
    })

    expect(unset(state, ['more', 'newKey'])).toEqual({
      users: [{ id: 56, key: 'key' }],
      more: {
        someId: 'hello',
      },
      a: { b: { c: { d: { e: '123' } } } },
    })
  })
})
