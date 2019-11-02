import { Optional, UnwrapOptional as U } from '../types'
import { isNullOrUndefined, isObject } from '../utils'

interface ExistFn {
  <T, K1 extends keyof T>(source: Optional<T>, path: [K1]): boolean
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
    source: Optional<T>,
    path: [K1, K2],
  ): boolean
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>
  >(
    source: Optional<T>,
    path: [K1, K2, K3],
  ): boolean
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    source: Optional<T>,
    path: [K1, K2, K3, K4],
  ): boolean
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
  >(
    source: Optional<T>,
    path: [K1, K2, K3, K4, K5],
  ): boolean
}

// NOTE: use private implementation because typedoc generates wrong documentation.
const existImplementation: ExistFn = (source: any, path: any[]) => {
  for (const key of path) {
    if (
      isNullOrUndefined(source) ||
      !isObject(source) ||
      !source.hasOwnProperty(key)
    ) {
      return false
    }
    source = source[key]
  }
  return true
}

/**
 * Checks whether path exist in source value.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * @param source source value in which the path should be checked.
 * @param path path array to be checked
 * @returns true if the path exist in source, false otherwise
 */
export const exist = existImplementation
