import { Optional, OptionalValue } from './types'
import { isNullOrUndefined } from 'util'

// create an alias as OptionalValue is too verbose
type U<T> = OptionalValue<T>

export function exist<T, K1 extends keyof T>(
  obj: Optional<T>,
  path: [K1],
): boolean

export function exist<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  obj: Optional<T>,
  path: [K1, K2],
): boolean

export function exist<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(obj: Optional<T>, path: [K1, K2, K3]): boolean

export function exist<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(obj: Optional<T>, path: [K1, K2, K3, K4]): boolean

export function exist<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(obj: Optional<T>, path: [K1, K2, K3, K4, K5]): boolean

export function exist(obj: any, path: any[]) {
  let index = -1
  while (++index < path.length) {
    if (
      isNullOrUndefined(obj) ||
      typeof obj !== 'object' ||
      !obj.hasOwnProperty(path[index])
    ) {
      return false
    }
    obj = obj[path[index]]
  }
  return true
}