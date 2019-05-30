import { set } from '../set'
import { State } from './common'

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
      expect(set(state, ['users', 0], { id: 777, key: 'new' })).toEqual({
        users: [{ id: 777, key: 'new' }],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('in dictionary', () => {
      expect(set(state, ['dict'], { newKey: 777 })).toEqual({
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

      expect(set(obj, ['a'], { b: { c: { d: { e: '123' } } } })).toEqual(
        expected,
      )
      expect(set(obj, ['a', 'b'], { c: { d: { e: '123' } } })).toEqual(
        expected,
      )
      expect(set(obj, ['a', 'b', 'c'], { d: { e: '123' } })).toEqual(expected)
      expect(set(obj, ['a', 'b', 'c', 'd'], { e: '123' })).toEqual(expected)
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
      expect(set(state, ['users', 3, 'id'], 777)).toEqual({
        users: [{ id: 56, key: 'key' }, undefined, undefined, { id: 777 }],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('create new property in dictionary', () => {
      expect(set(state, ['dict', 'newKey'], 777)).toEqual({
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

      expect(set(obj, ['req', 'opt', 'key', 1], 'str')).toEqual({
        req: { opt: { key: [undefined, 'str'] } },
      })
    })
  })
})
