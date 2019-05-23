import { isNullOrUndefined } from '../utils'

export function pick<T, K1 extends keyof T>(obj: T, key1: K1): Pick<T, K1>

export function pick<T, K1 extends keyof T, K2 extends keyof T>(
  obj: T,
  key1: K1,
  key2: K2,
): Pick<T, K1 | K2>

export function pick<
  T,
  K1 extends keyof T,
  K2 extends keyof T,
  K3 extends keyof T
>(obj: T, key1: K1, key2: K2, key3: K3): Pick<T, K1 | K2 | K3>

export function pick<
  T,
  K1 extends keyof T,
  K2 extends keyof T,
  K3 extends keyof T,
  K4 extends keyof T
>(obj: T, key1: K1, key2: K2, key3: K3, key4: K4): Pick<T, K1 | K2 | K3 | K4>

export function pick<
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
): Pick<T, K1 | K2 | K3 | K4 | K5>

export function pick<T>(obj: T, keys: Array<keyof T>): Partial<T>

export function pick(obj: any, firstKeyOrKeys?: any, ...otherKeys: any[]): any {
  if (isNullOrUndefined(obj)) return obj

  const res = {} as any
  if (Array.isArray(firstKeyOrKeys)) {
    firstKeyOrKeys.forEach((key) => {
      if (obj[key] !== undefined) res[key] = obj[key]
    })
  } else {
    res[firstKeyOrKeys] = obj[firstKeyOrKeys]
    otherKeys.forEach((key) => {
      if (obj[key] !== undefined) res[key] = obj[key]
    })
  }
  return res
}
