import { isNullOrUndefined } from './utils'
import { Nullable, Optional, Undefinable } from './types'

export function pick<T, K extends keyof T>(
  source: T,
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

export function pick<T, K extends keyof T>(
  source: Nullable<T>,
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
): Nullable<Pick<T, K>>

export function pick<T, K extends keyof T>(
  source: Undefinable<T>,
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
): Undefinable<Pick<T, K>>

export function pick<T, K extends keyof T>(
  source: Optional<T>,
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
): Optional<Pick<T, K>>

export function pick<T>(source: T, keys: Array<keyof T>): Partial<T>

export function pick<T>(
  source: Nullable<T>,
  keys: Array<keyof T>,
): Nullable<Partial<T>>

export function pick<T>(
  source: Undefinable<T>,
  keys: Array<keyof T>,
): Undefinable<Partial<T>>

export function pick<T>(
  source: Optional<T>,
  keys: Array<keyof T>,
): Optional<Partial<T>>

export function pick(
  source: any,
  firstKeyOrKeys?: any,
  // tslint:disable-next-line
  ...otherKeys: any[]
): any {
  if (isNullOrUndefined(source)) return source

  const res = {} as any
  if (Array.isArray(firstKeyOrKeys)) {
    firstKeyOrKeys.forEach((key) => {
      if (source[key] !== undefined) res[key] = source[key]
    })
  } else {
    res[firstKeyOrKeys] = source[firstKeyOrKeys]
    otherKeys.forEach((key) => {
      if (source[key] !== undefined) res[key] = source[key]
    })
  }
  return res
}
