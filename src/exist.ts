import { Optional, OptionalValue } from './types'
import { isNullOrUndefined } from 'util'

// create an alias as OptionalValue is too verbose
type U<T> = OptionalValue<T>

export function exist<T, K1 extends keyof T>(
  source: Optional<T>,
  path: [K1],
): boolean

export function exist<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  source: Optional<T>,
  path: [K1, K2],
): boolean

export function exist<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(source: Optional<T>, path: [K1, K2, K3]): boolean

export function exist<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(source: Optional<T>, path: [K1, K2, K3, K4]): boolean

export function exist<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(source: Optional<T>, path: [K1, K2, K3, K4, K5]): boolean

export function exist(source: any, path: any[]) {
  let index = -1
  while (++index < path.length) {
    if (
      isNullOrUndefined(source) ||
      typeof source !== 'object' ||
      !source.hasOwnProperty(path[index])
    ) {
      return false
    }
    source = source[path[index]]
  }
  return true
}
