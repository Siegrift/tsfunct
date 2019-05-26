import { map } from '../map'
import { Dictionary, NumericDictionary, Optional } from '../../types'

describe('map', () => {
  const idFn = (x: any) => x
  test('if collection is null or undefined, returns the collection', () => {
    let arr: Optional<number[]> = null
    let dict: Optional<Dictionary<string>> = null
    let numDict: Optional<NumericDictionary<string>> = null

    expect(map(arr, idFn)).toBe(null)
    expect(map(dict, idFn)).toBe(null)
    expect(map(numDict, idFn)).toBe(null)

    arr = undefined
    dict = undefined
    numDict = undefined

    expect(map(arr, idFn)).toBe(undefined)
    expect(map(dict, idFn)).toBe(undefined)
    expect(map(numDict, idFn)).toBe(undefined)
  })

  test('maps elements of an array', () => {
    const arr = [1, 2, 3, 4]
    const mapFn = (value: number, index: number) => value * index

    expect(map(arr, mapFn)).toEqual([0, 2, 6, 12])
  })

  test('maps elements of an dictionary', () => {
    const dict: Dictionary<string> = {
      a: 'a',
      b: 'b',
      c: 'c',
    }
    const mapFn = (value: string, key: string) => ({
      key: key + 'x',
      value: key + value,
    })

    expect(map(dict, mapFn)).toEqual({ ax: 'aa', bx: 'bb', cx: 'cc' })
  })

  test('is immutable', () => {
    const arr = [1, 2, 3, 4, 5]
    const mappedArr = map(arr, (value) => value * value)

    expect(arr).toBe(arr)
    expect(mappedArr).toEqual([1, 4, 9, 16, 25])
  })

  test('non idiomatic usage can modify original array', () => {
    const arr = [{ a: 0 }, { a: 1 }, { a: 2 }]
    const mapped = map(arr, (val: any) => (val.a = 3))

    expect(mapped).toEqual([3, 3, 3])
    expect(arr).toEqual([{ a: 3 }, { a: 3 }, { a: 3 }])
  })
})
