import {
  DeepReadonly,
  Dictionary,
  Nullable,
  NumericDictionary,
  Optional,
  Undefinable
} from './types'
import { isNullOrUndefined } from './utils'

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: T[],
  fn: (value: DeepReadonly<T>, index: number) => boolean,
): T[]

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: Nullable<T[]>,
  fn: (value: DeepReadonly<T>, index: number) => boolean,
): Nullable<T[]>

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: Undefinable<T[]>,
  fn: (value: DeepReadonly<T>, index: number) => boolean,
): Undefinable<T[]>

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: Optional<T[]>,
  fn: (value: DeepReadonly<T>, index: number) => boolean,
): Optional<T[]>

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: Dictionary<T>,
  fn: (value: DeepReadonly<T>, key: string) => boolean,
): Dictionary<T>

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: Nullable<Dictionary<T>>,
  fn: (value: DeepReadonly<T>, key: string) => boolean,
): Nullable<Dictionary<T>>

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: Undefinable<Dictionary<T>>,
  fn: (value: DeepReadonly<T>, key: string) => boolean,
): Undefinable<Dictionary<T>>

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: Optional<Dictionary<T>>,
  fn: (value: DeepReadonly<T>, key: string) => boolean,
): Optional<Dictionary<T>>

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: NumericDictionary<T>,
  fn: (value: DeepReadonly<T>, key: number) => boolean,
): NumericDictionary<T>

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: Nullable<NumericDictionary<T>>,
  fn: (value: DeepReadonly<T>, key: number) => boolean,
): Nullable<NumericDictionary<T>>

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: Undefinable<NumericDictionary<T>>,
  fn: (value: DeepReadonly<T>, key: number) => boolean,
): Undefinable<NumericDictionary<T>>

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
export function filter<T>(
  collection: Optional<NumericDictionary<T>>,
  fn: (value: DeepReadonly<T>, key: number) => boolean,
): Optional<NumericDictionary<T>>

// NOTE: implementation
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
