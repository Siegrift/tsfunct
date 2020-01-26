import fpUpdate from '../fpUpdate'
import { State, User } from './common'

describe('fpUpdate', () => {
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

  describe('create or override the nested value in object', () => {
    test('in array', () => {
      let updaterArg: User
      const updater = (value: User) => {
        updaterArg = value
        return { id: 777, key: 'new' }
      }

      state = fpUpdate<State>()(['users', 0], updater)(state)

      expect(state).toEqual({
        users: [{ id: 777, key: 'new' }],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
      expect(updaterArg!).toEqual({ id: 56, key: 'key' })
    })

    test('in dictionary', () => {
      state = fpUpdate<State>()(['dict'], () => ({
        newKey: 777,
      }))(state)

      expect(state).toEqual({
        users: [{ id: 56, key: 'key' }],
        dict: {
          newKey: 777,
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('fpUpdate up to 5 levels', () => {
      const obj = { a: state.a }
      const expected = { a: { b: { c: { d: { e: '123' } } } } }
      let updateObj: Pick<State, 'a'> = obj

      updateObj = fpUpdate<typeof obj>()(['a'], () => ({
        b: { c: { d: { e: '123' } } },
      }))(obj)
      expect(updateObj).toEqual(expected)

      updateObj = fpUpdate<typeof obj>()(['a', 'b'], () => ({
        c: { d: { e: '123' } },
      }))(obj)
      expect(updateObj).toEqual(expected)

      updateObj = fpUpdate<typeof obj>()(['a', 'b', 'c'], () => ({
        d: { e: '123' },
      }))(obj)
      expect(updateObj).toEqual(expected)

      updateObj = fpUpdate<typeof obj>()(['a', 'b', 'c', 'd'], () => ({
        e: '123',
      }))(obj)
      expect(updateObj).toEqual(expected)

      updateObj = fpUpdate<typeof obj>()(
        ['a', 'b', 'c', 'd', 'e'],
        () => '123',
      )(obj)
      expect(updateObj).toEqual(expected)
    })
  })

  test('is immutable', () => {
    fpUpdate<State>()(['a', 'b', 'c', 'd', 'e'], () => '123')

    expect(state).toBe(state)
  })

  describe("if path doesn't exist, it is created in the value", () => {
    test('value is primitive', () => {
      expect(fpUpdate<any>()(['key'], () => '')(null)).toEqual({ key: '' })
      expect(fpUpdate<any>()(['key'], () => '')(undefined)).toEqual({ key: '' })
      expect(fpUpdate<any>()(['key'], () => '')('')).toEqual({ key: '' })
      expect(fpUpdate<any>()(['key'], () => '')(123)).toEqual({ key: '' })
    })

    test('create new index in array', () => {
      state = fpUpdate<State>()(['users', 3, 'id'], () => 777)(state)

      expect(state).toEqual({
        users: [{ id: 56, key: 'key' }, undefined, undefined, { id: 777 }],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('create new property in dictionary', () => {
      state = fpUpdate<State>()(['dict', 'newKey'], () => 777)(state)

      expect(state).toEqual({
        users: [{ id: 56, key: 'key' }],
        dict: {
          someId: 'hello',
          newKey: 777,
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('calls fpUpdate fn with undefined', () => {
      type T = { a?: { b: number } }

      fpUpdate<T>()(['a', 'b'], (x) => {
        expect(x).toBe(undefined)
        return 123
      })({})
    })

    describe('if path is number an array is created, otherwise object is created', () => {
      test('correct root value', () => {
        expect(fpUpdate<any>()(['hello'], () => 'str')(null)).toEqual({
          hello: 'str',
        })
        expect(fpUpdate<any>()([1], () => 'str')(null)).toEqual([
          undefined,
          'str',
        ])
      })

      test('deep path', () => {
        type A = string[]
        type D = { [key: string]: A }
        type T = { req: { opt?: D | null } }
        const obj: T = { req: { opt: null } }

        const updateObj = fpUpdate<typeof obj>()(
          ['req', 'opt', 'key', 1],
          () => 'str',
        )(obj)
        expect(updateObj).toEqual({
          req: { opt: { key: [undefined, 'str'] } },
        })
      })
    })
  })

  test('optional path', () => {
    const newState = fpUpdate<State>()(['optional', 'a'], (op) => 123)(state)
    expect(newState.optional.a).toBe(123) // the path surely exists now!
  })

  test('works with union of properties', () => {
    interface A {
      a: string
      b: number
      c: boolean
    }
    const obj: A = { a: 'str', b: 123, c: true }
    const prop = 'a' as 'a' | 'b'

    const upd: A = fpUpdate<typeof obj>()([prop], (val) => val)(obj)
    expect(upd).toEqual(obj)
  })
})
