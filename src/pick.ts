import { isNullOrUndefined } from './utils'

export function pick<T, K extends keyof T>(
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
): Pick<T, K>

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
