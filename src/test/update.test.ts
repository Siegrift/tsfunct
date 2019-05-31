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

      expect(update(state, ['users', 0], updater)).toEqual({
        users: [{ id: 777, key: 'new' }],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
      expect(updaterArg!).toEqual({ id: 56, key: 'key' })
    })

    test('in dictionary', () => {
      expect(
        update(state, ['dict'], () => ({
          newKey: 777,
        })),
      ).toEqual({
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

      expect(
        update(obj, ['a'], () => ({ b: { c: { d: { e: '123' } } } })),
      ).toEqual(expected)
      expect(
        update(obj, ['a', 'b'], () => ({ c: { d: { e: '123' } } })),
      ).toEqual(expected)
      expect(update(obj, ['a', 'b', 'c'], () => ({ d: { e: '123' } }))).toEqual(
        expected,
      )
      expect(update(obj, ['a', 'b', 'c', 'd'], () => ({ e: '123' }))).toEqual(
        expected,
      )
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
      expect(update(state, ['users', 3, 'id'], () => 777)).toEqual({
        users: [{ id: 56, key: 'key' }, undefined, undefined, { id: 777 }],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('create new property in dictionary', () => {
      expect(update(state, ['dict', 'newKey'], () => 777)).toEqual({
        users: [{ id: 56, key: 'key' }],
        dict: {
          someId: 'hello',
          newKey: 777,
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('if path is number an array is created, otherwise object is created', () => {
      type A = string[]
      type D = { [key: string]: A }
      type T = { req: { opt?: D | null } }
      const obj: T = { req: { opt: null } }

      expect(update(obj, ['req', 'opt', 'key', 1], () => 'str')).toEqual({
        req: { opt: { key: [undefined, 'str'] } },
      })
    })
  })
})
