import { isNullOrUndefined } from '../utils'
import { Optional } from '../types'

export function get<T, K1 extends keyof T>(obj: T, key: K1): T[K1]

export function get<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  obj: T,
  key1: K1,
  key2: K2,
): T[K1][K2]

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(obj: T, key1: K1, key2: K2, key3: K3): T[K1][K2][K3]

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(obj: T, key1: K1, key2: K2, key3: K3, key4: K4): T[K1][K2][K3][K4]

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(
  obj: T,
  key1: K1,
  key2: K2,
  key3: K3,
  key4: K4,
  key5: K5,
): T[K1][K2][K3][K4][K5]

export function get<T, K1 extends keyof T>(
  obj: Optional<T>,
  key: K1,
): Optional<T[K1]>

export function get<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  obj: Optional<T>,
  key1: K1,
  key2: K2,
): Optional<T[K1][K2]>

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(obj: Optional<T>, key1: K1, key2: K2, key3: K3): Optional<T[K1][K2][K3]>

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(
  obj: Optional<T>,
  key1: K1,
  key2: K2,
  key3: K3,
  key4: K4,
): Optional<T[K1][K2][K3][K4]>

export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(
  obj: Optional<T>,
  key1: K1,
  key2: K2,
  key3: K3,
  key4: K4,
  key5: K5,
): Optional<T[K1][K2][K3][K4][K5]>

export function get(
  obj: any,
  key1?: any,
  key2?: any,
  key3?: any,
  key4?: any,
  key5?: any,
) {
  if (isNullOrUndefined(obj)) {
    if (key1 === undefined) return obj
    return undefined
  }

  if (key1 === undefined) {
    return obj
  } else if (key2 === undefined) {
    return obj[key1]
  } else if (key3 === undefined) {
    if (obj[key1] === undefined) return undefined
    else return obj[key1][key2]
  } else if (key4 === undefined) {
    if (obj[key1][key2] === undefined) return undefined
    else return obj[key1][key2][key3]
  } else if (key5 === undefined) {
    if (obj[key1][key2][key3] === undefined) return undefined
    else return obj[key1][key2][key3][key4]
  } else {
    if (obj[key1][key2][key3][key4] === undefined) return undefined
    else return obj[key1][key2][key3][key4][key5]
  }
}
