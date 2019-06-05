import { update } from '../lib/update'
import { DeepReadonly } from '../types'
import { State, User } from './common'

describe('update', () => {
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
      const updater = (value: DeepReadonly<User>) => {
        updaterArg = value
        return { id: 777, key: 'new' }
      }

      state = update(state, ['users', 0], updater)

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
      state = update(state, ['dict'], () => ({
        newKey: 777,
      }))

      expect(state).toEqual({
        users: [{ id: 56, key: 'key' }],
        dict: {
          newKey: 777,
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('update up to 5 levels', () => {
      const obj = { a: state.a }
      const expected = { a: { b: { c: { d: { e: '123' } } } } }
      let updateObj: Pick<State, 'a'> = obj

      updateObj = update(obj, ['a'], () => ({ b: { c: { d: { e: '123' } } } }))
      expect(updateObj).toEqual(expected)

      updateObj = update(obj, ['a', 'b'], () => ({ c: { d: { e: '123' } } }))
      expect(updateObj).toEqual(expected)

      updateObj = update(obj, ['a', 'b', 'c'], () => ({ d: { e: '123' } }))
      expect(updateObj).toEqual(expected)

      updateObj = update(obj, ['a', 'b', 'c', 'd'], () => ({ e: '123' }))
      expect(updateObj).toEqual(expected)

      updateObj = update(obj, ['a', 'b', 'c', 'd', 'e'], () => '123')
      expect(updateObj).toEqual(expected)
    })
  })

  test('is immutable', () => {
    update(state, ['a', 'b', 'c', 'd', 'e'], () => '123')

    expect(state).toBe(state)
  })

  describe("if path doesn't exist, it is created in the value", () => {
    test('value is primitive', () => {
      expect(update(null as any, ['key'], () => '')).toEqual({ key: '' })
      expect(update(undefined as any, ['key'], () => '')).toEqual({ key: '' })
      expect(update('' as any, ['key'], () => '')).toEqual({ key: '' })
      expect(update(123 as any, ['key'], () => '')).toEqual({ key: '' })
    })

    test('create new index in array', () => {
      state = update(state, ['users', 3, 'id'], () => 777)

      expect(state).toEqual({
        users: [{ id: 56, key: 'key' }, undefined, undefined, { id: 777 }],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('create new property in dictionary', () => {
      state = update(state, ['dict', 'newKey'], () => 777)

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
        expect(update(null as any, ['hello'], () => 'str')).toEqual({
          hello: 'str',
        })
        expect(update(null as any, [1], () => 'str')).toEqual([
          undefined,
          'str',
        ])
      })

      test('deep path', () => {
        type A = string[]
        type D = { [key: string]: A }
        type T = { req: { opt?: D | null } }
        const obj: T = { req: { opt: null } }

        const updateObj = update(obj, ['req', 'opt', 'key', 1], () => 'str')
        expect(updateObj).toEqual({
          req: { opt: { key: [undefined, 'str'] } },
        })
      })
    })
  })
})
