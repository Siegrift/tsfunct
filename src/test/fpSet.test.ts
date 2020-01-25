import fpSet from '../fpSet'
import { State } from './common'
import { Dictionary } from '../common/types'

describe('fpSet', () => {
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
      state = fpSet<State>()(['users', 0], { id: 777, key: 'new' })(state)

      expect(state).toEqual({
        users: [{ id: 777, key: 'new' }],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      })
    })

    test('in dictionary', () => {
      state = fpSet<State>()(['dict'], { newKey: 777 })(state)

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

      setObj = fpSet<typeof obj>()(['a'], { b: { c: { d: { e: '123' } } } })(
        obj,
      )
      expect(setObj).toEqual(expected)

      setObj = fpSet<typeof obj>()(['a', 'b'], { c: { d: { e: '123' } } })(obj)
      expect(setObj).toEqual(expected)

      setObj = fpSet<typeof obj>()(['a', 'b', 'c'], { d: { e: '123' } })(obj)
      expect(setObj).toEqual(expected)

      setObj = fpSet<typeof obj>()(['a', 'b', 'c', 'd'], { e: '123' })(obj)
      expect(setObj).toEqual(expected)

      setObj = fpSet<typeof obj>()(['a', 'b', 'c', 'd', 'e'], '123')(obj)
      expect(setObj).toEqual(expected)
    })
  })

  test('is immutable', () => {
    fpSet<State>()(['a', 'b', 'c', 'd', 'e'], '123')(state)

    expect(state).toBe(state)
  })

  describe("if path doesn't exist, it is created in the value", () => {
    test('works with objects with other properties', () => {
      type A = { a: { b: boolean; c: Dictionary<string> }; d: string }
      const obj: A = { a: { b: true, c: {} }, d: 'str' }

      const newObj: A = fpSet<typeof obj>()(['a', 'b'], false)(obj)
      expect(newObj).toEqual({ a: { b: false, c: {} }, d: 'str' })
    })

    test('works with union of properties', () => {
      interface A {
        a: 'fixed'
        b: string
        c: boolean
      }
      const obj: A = { a: 'fixed', b: 'str', c: true }
      const prop = 'a' as 'a' | 'b'

      const s: A = fpSet<typeof obj>()([prop], 'fixed')(obj)
      expect(s).toEqual(obj)
    })
  })
})
