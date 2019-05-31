import { isNullOrUndefined } from '../utils'
import { Nullable, Optional, Undefinable } from '../types'

/**
 * Picks properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of picked properties <= 15, the result type will be the source value only with
 *    these properties (strongly typed).
 * 2) If the number of picked properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be picked
 * @param keys array of names of the properties
 * @returns the source value with picked properties
 */
export function pick<T, K extends keyof T>(
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
): Pick<T, K>

/**
 * Picks properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of picked properties <= 15, the result type will be the source value only with
 *    these properties (strongly typed).
 * 2) If the number of picked properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be picked
 * @param keys array of names of the properties
 * @returns the source value with picked properties
 */
export function pick<T, K extends keyof T>(
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
): Nullable<Pick<T, K>>

/**
 * Picks properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of picked properties <= 15, the result type will be the source value only with
 *    these properties (strongly typed).
 * 2) If the number of picked properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be picked
 * @param keys array of names of the properties
 * @returns the source value with picked properties
 */
export function pick<T, K extends keyof T>(
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
): Undefinable<Pick<T, K>>

/**
 * Picks properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of picked properties <= 15, the result type will be the source value only with
 *    these properties (strongly typed).
 * 2) If the number of picked properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be picked
 * @param keys array of names of the properties
 * @returns the source value with picked properties
 */
export function pick<T, K extends keyof T>(
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
): Optional<Pick<T, K>>

/**
 * Picks properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of picked properties <= 15, the result type will be the source value only with
 *    these properties (strongly typed).
 * 2) If the number of picked properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be picked
 * @param keys array of names of the properties
 * @returns the source value with picked properties
 */
export function pick<T>(source: T, keys: Array<keyof T>): Partial<T>

/**
 * Picks properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of picked properties <= 15, the result type will be the source value only with
 *    these properties (strongly typed).
 * 2) If the number of picked properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be picked
 * @param keys array of names of the properties
 * @returns the source value with picked properties
 */
export function pick<T>(
  source: Nullable<T>,
  keys: Array<keyof T>,
): Nullable<Partial<T>>

/**
 * Picks properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of picked properties <= 15, the result type will be the source value only with
 *    these properties (strongly typed).
 * 2) If the number of picked properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be picked
 * @param keys array of names of the properties
 * @returns the source value with picked properties
 */
export function pick<T>(
  source: Undefinable<T>,
  keys: Array<keyof T>,
): Undefinable<Partial<T>>

/**
 * Picks properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of picked properties <= 15, the result type will be the source value only with
 *    these properties (strongly typed).
 * 2) If the number of picked properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be picked
 * @param keys array of names of the properties
 * @returns the source value with picked properties
 */
export function pick<T>(
  source: Optional<T>,
  keys: Array<keyof T>,
): Optional<Partial<T>>

// NOTE: implementation
export function pick(
  source: any,
  firstKeyOrKeys?: any,
  // tslint:disable-next-line
  ...otherKeys: any[]
): any {
  if (isNullOrUndefined(source)) return source

  const res = {} as any
  if (Array.isArray(firstKeyOrKeys)) {
    firstKeyOrKeys.forEach((key) => {
      if (source[key] !== undefined) res[key] = source[key]
    })
  } else {
    res[firstKeyOrKeys] = source[firstKeyOrKeys]
    otherKeys.forEach((key) => {
      if (source[key] !== undefined) res[key] = source[key]
    })
  }
  return res
}
