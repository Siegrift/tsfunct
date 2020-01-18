import { omit } from '../lib/omit'
import { Dictionary, Optional } from '../common/types'
import { State } from './common'

describe('omit', () => {
  test('when object is null or undefined, returns object', () => {
    let obj = null as Optional<State>

    let om: Optional<Partial<State>> = omit(obj, [])
    expect(om).toBe(null)

    obj = undefined
    om = omit(obj, [])
    expect(om).toBe(undefined)
  })

  test('optional objects', () => {
    const obj = {
      a: { b: { c: { d: { e: 'str' } } } },
      dict: {},
      users: [],
    } as Optional<State>

    const om1: Optional<Pick<State, 'dict' | 'optional'>> = omit(obj, [
      'a',
      'users',
    ])
    expect(om1).toEqual({ dict: {} })

    const om2: Optional<Partial<State>> = omit(obj, ([
      'key1',
      'key2',
    ] as unknown) as Array<keyof State>)
    expect(om2).toEqual(obj)
  })

  test('returns new object from omitted properties in source object', () => {
    const obj = { a: true, b: 'abc', c: 123 }

    const om: Pick<typeof obj, 'c'> = omit(obj, ['a', 'b'])
    expect(om).toEqual({ c: 123 })
  })

  test('accepts also an array of properties', () => {
    const dict: Dictionary<string> = { a: 'true', b: 'abc', c: '123' }

    const om: Dictionary<string> = omit(dict, ['a', 'badKey', 'c'])
    expect(om).toEqual({ b: 'abc' })
  })

  describe('key value structures', () => {
    test('index signatures', () => {
      type A = { [k: string]: number }
      const obj = { a: 1, b: 2, c: 3 } as A

      const keys = ['a', 'b']
      const p: A = omit(obj, keys)
      expect(p).toEqual({ c: 3 })
    })
  })
})
