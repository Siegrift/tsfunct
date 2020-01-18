import { Dictionary, Nullable, Optional, Undefinable } from '../common/types'
import { isNullOrUndefined } from '../common/utils'

interface MapFn {
  <T, Result>(
    collection: T[],
    fn: (value: T, index: number) => Result,
  ): Result[]
  <T, Result>(
    collection: Nullable<T[]>,
    fn: (value: T, index: number) => Result,
  ): Nullable<Result[]>
  <T, Result>(
    collection: Undefinable<T[]>,
    fn: (value: T, index: number) => Result,
  ): Undefinable<Result[]>
  <T, Result>(
    collection: Optional<T[]>,
    fn: (value: T, index: number) => Result,
  ): Optional<Result[]>
  <T, Result>(
    collection: Dictionary<T>,
    fn: (value: T, key: string) => { key: string; value: Result },
  ): Dictionary<Result>
  <T, Result>(
    collection: Nullable<Dictionary<T>>,
    fn: (value: T, key: string) => { key: string; value: Result },
  ): Nullable<Dictionary<Result>>
  <T, Result>(
    collection: Undefinable<Dictionary<T>>,
    fn: (value: T, key: string) => { key: string; value: Result },
  ): Undefinable<Dictionary<Result>>
  <T, Result>(
    collection: Optional<Dictionary<T>>,
    fn: (value: T, key: string) => { key: string; value: Result },
  ): Optional<Dictionary<Result>>
}

// NOTE: use private implementation because typedoc generates wrong documentation.
const mapImplementation: MapFn = (collection: any, fn: any): any => {
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

/**
 * Maps elements from the collection using mapping function. This function will always return the
 * same type of collection. This means that if you pass nullable dictionary, you will also receive
 * nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be mapped
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function can transform this value to some other value. The return type differs depending on the
 * type of collection.
 * 1) If the collection is array, only the value must be returned
 * 2) If the value is dictionary, function must return `{ key: newKey; value: mappedResult }`
 * @returns the same type of collection with mapped elements.
 */
export const map = mapImplementation
