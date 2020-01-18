import { filter } from '../lib/filter'
import { Dictionary, Optional } from '../common/types'
import { idFn } from './common'

describe('filter', () => {
  test('if collection is null or undefined, returns the collection', () => {
    let arr = null as Optional<number[]>
    let dict = null as Optional<Dictionary<string>>
    let f1: Optional<number[]>
    let f2: Optional<Dictionary<string>>

    f1 = filter(arr, idFn)
    f2 = filter(dict, idFn)
    expect(f1).toBe(null)
    expect(f2).toBe(null)

    arr = undefined as Optional<number[]>
    dict = undefined as Optional<Dictionary<string>>
    f1 = filter(arr, idFn)
    f2 = filter(dict, idFn)
    expect(f1).toBe(undefined)
    expect(f2).toBe(undefined)
  })

  test('filters elements of an array', () => {
    const arr = [1, 2, 3, 4, 5]
    const filterFn = (_: number, index: number) => index % 2 === 1

    const f: number[] = filter(arr, filterFn)
    expect(f).toEqual([2, 4])
  })

  test('filters elements of an dictionary', () => {
    const dict: Dictionary<string> = {
      a: 'aaaaa',
      b: 'bbb',
      c: 'c',
    }
    const filterFn = (value: string) => value.length >= 3

    const f: Dictionary<string> = filter(dict, filterFn)
    expect(f).toEqual({ a: 'aaaaa', b: 'bbb' })
  })

  test('is immutable', () => {
    const arr = [1, 2, 3, 4, 5]
    const filteredArr: number[] = filter(arr, () => false)

    expect(arr).toBe(arr)
    expect(filteredArr).toEqual([])
  })
})
