import { isNullOrUndefined } from '../utils'
import { Without } from '../types'

export function omit<T, K1 extends keyof T>(obj: T, key1: K1): Without<T, K1>

export function omit<T, K1 extends keyof T, K2 extends keyof T>(
  obj: T,
  key1: K1,
  key2: K2,
): Without<T, K1 | K2>

export function omit<
  T,
  K1 extends keyof T,
  K2 extends keyof T,
  K3 extends keyof T
>(obj: T, key1: K1, key2: K2, key3: K3): Without<T, K1 | K2 | K3>

export function omit<
  T,
  K1 extends keyof T,
  K2 extends keyof T,
  K3 extends keyof T,
  K4 extends keyof T
>(
  obj: T,
  key1: K1,
  key2: K2,
  key3: K3,
  key4: K4,
): Without<T, K1 | K2 | K3 | K4>

export function omit<
  T,
  K1 extends keyof T,
  K2 extends keyof T,
  K3 extends keyof T,
  K4 extends keyof T,
  K5 extends keyof T
>(
  obj: T,
  key1: K1,
  key2: K2,
  key3: K3,
  key4: K4,
  key5: K5,
): Without<T, K1 | K2 | K3 | K4 | K5>

export function omit<T>(obj: T, keys: Array<keyof T>): Partial<T>

export function omit(obj: any, firstKeyOrKeys?: any, ...otherKeys: any[]): any {
  if (isNullOrUndefined(obj)) return obj

  const res = { ...obj }
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
