import { Optional, OptionalValue } from './types'
import { isNullOrUndefined } from './utils'

// create an alias as OptionalValue is too verbose
type U<T> = OptionalValue<T>

export function get<T, K1 extends keyof T>(source: T, path: [K1]): T[K1]

export function get<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  source: T,
  path: [K1, K2],
): T[K1][K2]

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(source: T, path: [K1, K2, K3]): T[K1][K2][K3]

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(source: T, path: [K1, K2, K3, K4]): T[K1][K2][K3][K4]

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(source: T, path: [K1, K2, K3, K4, K5]): T[K1][K2][K3][K4][K5]

export function get<T, K1 extends keyof T>(
  source: Optional<T>,
  path: [K1],
): T[K1] | undefined

export function get<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  source: Optional<T>,
  path: [K1, K2],
): U<T[K1]>[K2] | undefined

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(source: Optional<T>, path: [K1, K2, K3]): U<U<T[K1]>[K2]>[K3] | undefined

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(
  source: Optional<T>,
  path: [K1, K2, K3, K4],
): U<U<U<T[K1]>[K2]>[K3]>[K4] | undefined

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(
  source: Optional<T>,
  path: [K1, K2, K3, K4, K5],
): U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5] | undefined

export function get<T, K1 extends keyof T>(
  source: Optional<T>,
  path: [K1],
  defaultValue: T[K1],
): T[K1]

export function get<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  source: Optional<T>,
  path: [K1, K2],
  defaultValue: U<T[K1]>[K2],
): U<T[K1]>[K2]

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(
  source: Optional<T>,
  path: [K1, K2, K3],
  defaultValue: U<U<T[K1]>[K2]>[K3],
): U<U<T[K1]>[K2]>[K3]

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(
  source: Optional<T>,
  path: [K1, K2, K3, K4],
  defaultValue: U<U<U<T[K1]>[K2]>[K3]>[K4],
): U<U<U<T[K1]>[K2]>[K3]>[K4]

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(
  source: Optional<T>,
  path: [K1, K2, K3, K4, K5],
  defaultValue: U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5],
): U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5]

export function get(source: any, path: any[], defaultValue?: any) {
  for (const key of path) {
    if (isNullOrUndefined(source)) return defaultValue
    source = source[key]
  }
  if (isNullOrUndefined(source)) return defaultValue
  else return source
}
