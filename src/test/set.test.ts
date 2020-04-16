import set from '../set'
import { State } from './common'
import { Dictionary } from '../common/types'
import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

describe('set', () => {
  let state: State

  beforeEach(() => {
    state = {
      users: [{ id: 56, key: 'key' }],
      dict: {
        someId: 'hello',
      },
      a: { b: { c: { d: { e: '123' } } } },
    }
  })

  describe('set or override the nested value in object', () => {
    test('in array', () => {
      state = set(state, ['users', 0], { id: 777, key: 'new' })

      expect(state).toEqual({
        users: [{ id: 777, key: 'new' }],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('in dictionary', () => {
      state = set(state, ['dict'], { newKey: 777 })

      expect(state).toEqual({
        users: [{ id: 56, key: 'key' }],
        dict: {
          newKey: 777,
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('set up to 5 levels', () => {
      const obj = { a: state.a }
      const expected = { a: { b: { c: { d: { e: '123' } } } } }
      let setObj: Pick<State, 'a'> = obj

      setObj = set(obj, ['a'], { b: { c: { d: { e: '123' } } } })
      expect(setObj).toEqual(expected)

      setObj = set(obj, ['a', 'b'], { c: { d: { e: '123' } } })
      expect(setObj).toEqual(expected)

      setObj = set(obj, ['a', 'b', 'c'], { d: { e: '123' } })
      expect(setObj).toEqual(expected)

      setObj = set(obj, ['a', 'b', 'c', 'd'], { e: '123' })
      expect(setObj).toEqual(expected)

      setObj = set(obj, ['a', 'b', 'c', 'd', 'e'], '123')
      expect(setObj).toEqual(expected)
    })
  })

  test('is immutable', () => {
    set(state, ['a', 'b', 'c', 'd', 'e'], '123')

    expect(state).toBe(state)
  })

  describe("if path doesn't exist, it is created in the value", () => {
    test('value is primitive', () => {
      expect(set(null as any, ['key'], '')).toEqual({ key: '' })
      expect(set(undefined as any, ['key'], '')).toEqual({ key: '' })
      expect(set('' as any, ['key'], '')).toEqual({ key: '' })
      expect(set(123 as any, ['key'], '')).toEqual({ key: '' })
    })

    test('create new index in array', () => {
      state = set(state, ['users', 3, 'id'], 777)

      expect(state).toEqual({
        users: [{ id: 56, key: 'key' }, undefined, undefined, { id: 777 }],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('create new property in dictionary', () => {
      state = set(state, ['dict', 'newKey'], 777)

      expect(state).toEqual({
        users: [{ id: 56, key: 'key' }],
        dict: {
          someId: 'hello',
          newKey: 777,
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    describe('if path is number an array is created, otherwise object is created', () => {
      test('correct root value', () => {
        expect(set(null as any, ['hello'], 'str')).toEqual({ hello: 'str' })
        expect(set(null as any, [1], 'str')).toEqual([undefined, 'str'])
      })

      test('deep path', () => {
        type A = string[]
        type D = { [key: string]: A }
        type T = { req: { opt?: D | null } }
        let obj: T = { req: { opt: null } }

        obj = set(obj, ['req', 'opt', 'key', 1], 'str')

        expect(obj).toEqual({
          req: { opt: { key: [undefined, 'str'] } },
        })
      })
    })

    test('works with objects with other properties', () => {
      type A = { a: { b: boolean; c: Dictionary<string> }; d: string }
      const obj: A = { a: { b: true, c: {} }, d: 'str' }

      const newObj: A = set(obj, ['a', 'b'], false)
      expect(newObj).toEqual({ a: { b: false, c: {} }, d: 'str' })
    })

    test('works not that well with union of properties', () => {
      interface A {
        a: 'fixed'
        b: string
        c: boolean
      }
      const obj: A = { a: 'fixed', b: 'str', c: true }
      const prop = 'a' as 'a' | 'b'

      expectNotAssignable<A>(set(obj, [prop], 'fixed'))
      const s: A = set(obj, [prop], 'fixed' as const)
      expect(s).toEqual(obj)
    })

    test('correct type when setting optional properties', () => {
      type User = { id: string; name?: { surname: string }; age: number }
      interface CustomState {
        user?: User
        messages: string[]
      }
      const st: CustomState = {
        user: undefined,
        messages: ['mess1', 'mess2'],
      }

      expectAssignable<CustomState>(set(st, ['user'], undefined))
      expectType<undefined>(set(st, ['user'], undefined).user)
      expectType<User>(set(st, ['user'], { age: 11, id: 'id' }).user)

      expectAssignable<CustomState>(set(st, ['user', 'name'], undefined))
      expectType<undefined>(set(st, ['user', 'name'], undefined).user.name)
      expectType<{ surname: string }>(
        set(st, ['user', 'name'], { surname: 'ads' }).user.name,
      )
    })
  })
})
