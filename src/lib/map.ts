import {
  DeepReadonly,
  Dictionary,
  Nullable,
  NumericDictionary,
  Optional,
  Undefinable
} from '../types'
import { isNullOrUndefined } from '../utils'

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

export function map<T, Result>(
  collection: T[],
  fn: (value: DeepReadonly<T>, index: number) => Result,
): Result[]

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
export function map<T, Result>(
  collection: Nullable<T[]>,
  fn: (value: DeepReadonly<T>, index: number) => Result,
): Nullable<Result[]>

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
export function map<T, Result>(
  collection: Undefinable<T[]>,
  fn: (value: DeepReadonly<T>, index: number) => Result,
): Undefinable<Result[]>

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
export function map<T, Result>(
  collection: Optional<T[]>,
  fn: (value: DeepReadonly<T>, index: number) => Result,
): Optional<Result[]>

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
export function map<T, Result>(
  collection: Dictionary<T>,
  fn: (value: DeepReadonly<T>, key: string) => { key: string; value: Result },
): Dictionary<T>

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
export function map<T, Result>(
  collection: Nullable<Dictionary<T>>,
  fn: (value: DeepReadonly<T>, key: string) => { key: string; value: Result },
): Nullable<Dictionary<T>>

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
export function map<T, Result>(
  collection: Undefinable<Dictionary<T>>,
  fn: (value: DeepReadonly<T>, key: string) => { key: string; value: Result },
): Undefinable<Dictionary<T>>

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
export function map<T, Result>(
  collection: Optional<Dictionary<T>>,
  fn: (value: DeepReadonly<T>, key: string) => { key: string; value: Result },
): Optional<Dictionary<T>>

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
export function map<T, Result>(
  collection: NumericDictionary<T>,
  fn: (value: DeepReadonly<T>, key: number) => { key: number; value: Result },
): NumericDictionary<T>

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
export function map<T, Result>(
  collection: Nullable<NumericDictionary<T>>,
  fn: (value: DeepReadonly<T>, key: number) => { key: number; value: Result },
): Nullable<NumericDictionary<T>>

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
export function map<T, Result>(
  collection: Undefinable<NumericDictionary<T>>,
  fn: (value: DeepReadonly<T>, key: number) => { key: number; value: Result },
): Undefinable<NumericDictionary<T>>

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
export function map<T, Result>(
  collection: Optional<NumericDictionary<T>>,
  fn: (value: DeepReadonly<T>, key: number) => { key: number; value: Result },
): Optional<NumericDictionary<T>>

// NOTE: implementation
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
