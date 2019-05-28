import { DeepReadonly, Dictionary, NumericDictionary, Optional } from './types'
import { isNullOrUndefined } from './utils'

export function map<T, Result>(
  collection: T[],
  fn: (value: DeepReadonly<T>, index: number) => Result,
): Result[]

export function map<T, Result>(
  collection: Optional<T[]>,
  fn: (value: DeepReadonly<T>, index: number) => Result,
): Optional<Result[]>

export function map<T, Result>(
  collection: Dictionary<T>,
  fn: (value: DeepReadonly<T>, key: string) => { key: string; value: Result },
): Dictionary<T>

export function map<T, Result>(
  collection: Optional<Dictionary<T>>,
  fn: (value: DeepReadonly<T>, key: string) => { key: string; value: Result },
): Optional<Dictionary<T>>

export function map<T, Result>(
  collection: NumericDictionary<T>,
  fn: (value: DeepReadonly<T>, key: number) => { key: number; value: Result },
): NumericDictionary<T>

export function map<T, Result>(
  collection: Optional<NumericDictionary<T>>,
  fn: (value: DeepReadonly<T>, key: number) => { key: number; value: Result },
): Optional<NumericDictionary<T>>

export function map(collection: any, fn: any): any {
  if (isNullOrUndefined(collection)) return collection

  let res
  if (Array.isArray(collection)) {
    res = []
    for (let i = 0; i < collection.length; i++) {
      res.push(fn(collection[i], i))
    }
  } else {
    res = {} as any
    const keys = Object.keys(collection)
    for (const key of keys) {
      const mapped = fn(collection[key], key)
      res[mapped.key] = mapped.value
    }
  }

  return res
}
