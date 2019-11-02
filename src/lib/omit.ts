import { Nullable, Optional, Undefinable, Without } from '../types'
import { isNullOrUndefined } from '../utils'

interface OmitFn {
  <T, K extends keyof T>(source: T, keys: K[]): Without<T, K>
  <T, K extends keyof T>(source: Nullable<T>, keys: K[]): Nullable<
    Without<T, K>
  >
  <T, K extends keyof T>(source: Undefinable<T>, keys: K[]): Undefinable<
    Without<T, K>
  >
  <T, K extends keyof T>(source: Optional<T>, keys: K[]): Optional<
    Without<T, K>
  >
}

// NOTE: use private implementation because typedoc generates wrong documentation.
const omitImplementation: OmitFn = (
  source: any,
  firstKeyOrKeys?: any,
  // tslint:disable-next-line
  ...otherKeys: any[]
) => {
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
export const omit = omitImplementation
