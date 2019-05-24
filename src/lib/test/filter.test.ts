import { filter } from '../filter'
import { Dictionary, NumericDictionary, Optional } from '../../types'

describe('filter', () => {
  const idFn = (x: any) => x
  test('if collection is null or undefined, returns the collection', () => {
    let arr: Optional<number[]> = null
    let dict: Optional<Dictionary<string>> = null
    let numDict: Optional<NumericDictionary<string>> = null

    expect(filter(arr, idFn)).toBe(null)
    expect(filter(dict, idFn)).toBe(null)
    expect(filter(numDict, idFn)).toBe(null)

    arr = undefined
    dict = undefined
    numDict = undefined

    expect(filter(arr, idFn)).toBe(undefined)
    expect(filter(dict, idFn)).toBe(undefined)
    expect(filter(numDict, idFn)).toBe(undefined)
  })

  test('filters elements of an array', () => {
    const arr = [1, 2, 3, 4, 5]
    const filterFn = (_: number, index: number) => index % 2 === 1

    expect(filter(arr, filterFn)).toEqual([2, 4])
  })

  test('filters elements of an dictionary', () => {
    const dict: Dictionary<string> = {
      a: 'aaaaa',
      b: 'bbb',
      c: 'c',
    }
    const filterFn = (value: string) => value.length >= 3

    expect(filter(dict, filterFn)).toEqual({ a: 'aaaaa', b: 'bbb' })
  })

  test('is immutable', () => {
    const arr = [1, 2, 3, 4, 5]
    const filterpedArr = filter(arr, () => false)

    expect(arr).toBe(arr)
    expect(filterpedArr).toEqual([])
  })
})
