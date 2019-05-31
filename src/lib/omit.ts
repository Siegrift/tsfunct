import { Nullable, Optional, Undefinable, Without } from '../types'
import { isNullOrUndefined } from '../utils'

/**
 * Omits properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of omitted properties <= 15, the result type will be the source value without
 *    these properties (strongly typed).
 * 2) If the number of omitted properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be omitted
 * @param keys array of names of the properties
 * @returns the source value with omitted properties
 */
export function omit<T, K extends keyof T>(
  source: T,
  keys:
    | [K]
    | [K, K]
    | [K, K, K]
    | [K, K, K, K]
    | [K, K, K, K, K]
    | [K, K, K, K, K, K]
    | [K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K, K, K],
): Without<T, K>

/**
 * Omits properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of omitted properties <= 15, the result type will be the source value without
 *    these properties (strongly typed).
 * 2) If the number of omitted properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be omitted
 * @param keys array of names of the properties
 * @returns the source value with omitted properties
 */
export function omit<T, K extends keyof T>(
  source: Nullable<T>,
  keys:
    | [K]
    | [K, K]
    | [K, K, K]
    | [K, K, K, K]
    | [K, K, K, K, K]
    | [K, K, K, K, K, K]
    | [K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K, K, K],
): Nullable<Without<T, K>>

/**
 * Omits properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of omitted properties <= 15, the result type will be the source value without
 *    these properties (strongly typed).
 * 2) If the number of omitted properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be omitted
 * @param keys array of names of the properties
 * @returns the source value with omitted properties
 */
export function omit<T, K extends keyof T>(
  source: Undefinable<T>,
  keys:
    | [K]
    | [K, K]
    | [K, K, K]
    | [K, K, K, K]
    | [K, K, K, K, K]
    | [K, K, K, K, K, K]
    | [K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K, K, K],
): Undefinable<Without<T, K>>

/**
 * Omits properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of omitted properties <= 15, the result type will be the source value without
 *    these properties (strongly typed).
 * 2) If the number of omitted properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be omitted
 * @param keys array of names of the properties
 * @returns the source value with omitted properties
 */
export function omit<T, K extends keyof T>(
  source: Optional<T>,
  keys:
    | [K]
    | [K, K]
    | [K, K, K]
    | [K, K, K, K]
    | [K, K, K, K, K]
    | [K, K, K, K, K, K]
    | [K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K, K]
    | [K, K, K, K, K, K, K, K, K, K, K, K, K, K, K],
): Optional<Without<T, K>>

/**
 * Omits properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of omitted properties <= 15, the result type will be the source value without
 *    these properties (strongly typed).
 * 2) If the number of omitted properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be omitted
 * @param keys array of names of the properties
 * @returns the source value with omitted properties
 */
export function omit<T>(source: T, keys: Array<keyof T>): Partial<T>

/**
 * Omits properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of omitted properties <= 15, the result type will be the source value without
 *    these properties (strongly typed).
 * 2) If the number of omitted properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be omitted
 * @param keys array of names of the properties
 * @returns the source value with omitted properties
 */
export function omit<T>(
  source: Nullable<T>,
  keys: Array<keyof T>,
): Nullable<Partial<T>>

/**
 * Omits properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of omitted properties <= 15, the result type will be the source value without
 *    these properties (strongly typed).
 * 2) If the number of omitted properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be omitted
 * @param keys array of names of the properties
 * @returns the source value with omitted properties
 */
export function omit<T>(
  source: Undefinable<T>,
  keys: Array<keyof T>,
): Undefinable<Partial<T>>

/**
 * Omits properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of omitted properties <= 15, the result type will be the source value without
 *    these properties (strongly typed).
 * 2) If the number of omitted properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be omitted
 * @param keys array of names of the properties
 * @returns the source value with omitted properties
 */
export function omit<T>(
  source: Optional<T>,
  keys: Array<keyof T>,
): Optional<Partial<T>>

/**
 * Omits properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of omitted properties <= 15, the result type will be the source value without
 *    these properties (strongly typed).
 * 2) If the number of omitted properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be omitted
 * @param keys array of names of the properties
 * @returns the source value with omitted properties
 */
export function omit<T>(source: T, keys: Array<keyof T>): Partial<T>

// NOTE: implementation
export function omit(
  source: any,
  firstKeyOrKeys?: any,
  // tslint:disable-next-line
  ...otherKeys: any[]
): any {
  if (isNullOrUndefined(source)) return source

  const res = { ...source }
  if (Array.isArray(firstKeyOrKeys)) {
    firstKeyOrKeys.forEach((key) => {
      delete res[key]
    })
  } else {
    delete res[firstKeyOrKeys]
    otherKeys.forEach((key) => {
      delete res[key]
    })
  }
  return res
}
