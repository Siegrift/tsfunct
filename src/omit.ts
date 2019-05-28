import { Without } from './types'
import { isNullOrUndefined } from './utils'

export function omit<T, K extends keyof T>(
  obj: T,
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
): Without<T, K>

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
