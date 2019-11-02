import { pick } from '../lib/pick'
import { Dictionary, Optional } from '../types'
import { State } from './common'

describe('pick', () => {
  test('when object is null or undefined, returns object', () => {
    let obj = null as Optional<State>

    let p: Optional<Partial<State>> = pick(obj, [])
    expect(p).toBe(null)

    obj = undefined
    p = pick(obj, [])
    expect(p).toBe(undefined)
  })

  test('optional objects', () => {
    const obj = {
      a: { b: { c: { d: { e: 'str' } } } },
      dict: {},
      users: [],
    } as Optional<State>

    const om1: Optional<Pick<State, 'a' | 'users'>> = pick(obj, ['a', 'users'])
    expect(om1).toEqual({ users: [], a: { b: { c: { d: { e: 'str' } } } } })

    const om2: Optional<Partial<State>> = pick(obj, ([
      'key1',
      'key2',
    ] as unknown) as Array<keyof State>)
    expect(om2).toEqual({})
  })

  test('returns new object from picked properties in source object', () => {
    const obj = { a: true, b: 'abc', c: 123 }

    const p: Pick<typeof obj, 'a' | 'b'> = pick(obj, ['a', 'b'])
    expect(p).toEqual({ a: true, b: 'abc' })
  })

  test('accepts also an array of properties', () => {
    const dict: Dictionary<string> = { a: 'true', b: 'abc', c: '123' }

    const p: Dictionary<string> = pick(dict, ['a', 'badKey', 'c'])
    expect(p).toEqual({ a: 'true', c: '123' })
  })

  describe('key value structures', () => {
    test('index signatures', () => {
      type A = { [k: string]: number }
      const obj = { a: 1, b: 2, c: 3 } as A

      const keys = ['a', 'b']
      const p: A = pick(obj, keys)
      expect(p).toEqual({ a: 1, b: 2 })
    })
  })
})
