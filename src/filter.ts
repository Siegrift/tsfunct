import {
  DeepReadonly,
  Dictionary,
  Nullable,
  NumericDictionary,
  Optional,
  Undefinable
} from './types'
import { isNullOrUndefined } from './utils'

// TODO: rewrite using type extends
export function filter<T>(
  collection: T[],
  fn: (value: DeepReadonly<T>, index: number) => boolean,
): T[]

export function filter<T>(
  collection: Nullable<T[]>,
  fn: (value: DeepReadonly<T>, index: number) => boolean,
): Nullable<T[]>

export function filter<T>(
  collection: Undefinable<T[]>,
  fn: (value: DeepReadonly<T>, index: number) => boolean,
): Undefinable<T[]>

export function filter<T>(
  collection: Optional<T[]>,
  fn: (value: DeepReadonly<T>, index: number) => boolean,
): Optional<T[]>

export function filter<T>(
  collection: Dictionary<T>,
  fn: (value: DeepReadonly<T>, key: string) => boolean,
): Dictionary<T>

export function filter<T>(
  collection: Nullable<Dictionary<T>>,
  fn: (value: DeepReadonly<T>, key: string) => boolean,
): Nullable<Dictionary<T>>

export function filter<T>(
  collection: Undefinable<Dictionary<T>>,
  fn: (value: DeepReadonly<T>, key: string) => boolean,
): Undefinable<Dictionary<T>>

export function filter<T>(
  collection: Optional<Dictionary<T>>,
  fn: (value: DeepReadonly<T>, key: string) => boolean,
): Optional<Dictionary<T>>

export function filter<T>(
  collection: NumericDictionary<T>,
  fn: (value: DeepReadonly<T>, key: number) => boolean,
): NumericDictionary<T>

export function filter<T>(
  collection: Nullable<NumericDictionary<T>>,
  fn: (value: DeepReadonly<T>, key: number) => boolean,
): Nullable<NumericDictionary<T>>

export function filter<T>(
  collection: Undefinable<NumericDictionary<T>>,
  fn: (value: DeepReadonly<T>, key: number) => boolean,
): Undefinable<NumericDictionary<T>>

export function filter<T>(
  collection: Optional<NumericDictionary<T>>,
  fn: (value: DeepReadonly<T>, key: number) => boolean,
): Optional<NumericDictionary<T>>

export function filter(collection: any, fn: any): any {
  if (isNullOrUndefined(collection)) return collection

  let res
  if (Array.isArray(collection)) {
    res = []
    for (let i = 0; i < collection.length; i++) {
      if (fn(collection[i], i)) res.push(collection[i])
    }
  } else {
    res = {} as any
    const keys = Object.keys(collection)
    for (const key of keys) {
      if (fn(collection[key], key)) res[key] = collection[key]
    }
  }

  return res
}
