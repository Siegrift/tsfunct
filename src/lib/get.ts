import { isNullOrUndefined } from '../utils'
import { Optional, OptionalValueType } from '../types'

// create an alias as OptionalValueType is too verbose
type U<T> = OptionalValueType<T>

export function get<T, K1 extends keyof T>(
  obj: Optional<T>,
  keys: [K1],
  defaultValue?: T[K1],
): T[K1] | undefined

export function get<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  obj: Optional<T>,
  keys: [K1, K2],
  defaultValue?: U<T[K1]>[K2],
): U<T[K1]>[K2] | undefined

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(
  obj: Optional<T>,
  keys: [K1, K2, K3],
  defaultValue?: U<U<T[K1]>[K2]>[K3],
): U<U<T[K1]>[K2]>[K3] | undefined

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(
  obj: Optional<T>,
  keys: [K1, K2, K3, K4],
  defaultValue?: U<U<U<T[K1]>[K2]>[K3]>[K4],
): U<U<U<T[K1]>[K2]>[K3]>[K4] | undefined

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(
  obj: Optional<T>,
  keys: [K1, K2, K3, K4, K5],
  defaultValue?: U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5],
): U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5] | undefined
export function get(obj: any, keys: any[], defaultValue?: any) {
  for (const key of keys) {
    if (isNullOrUndefined(obj)) return defaultValue
    obj = obj[key]
  }
  if (isNullOrUndefined(obj)) return defaultValue
  else return obj
}
