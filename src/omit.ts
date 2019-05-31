import { Nullable, Optional, Undefinable, Without } from './types'
import { isNullOrUndefined } from './utils'

export function omit<T, K extends keyof T>(
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
): Without<T, K>

export function omit<T, K extends keyof T>(
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
): Nullable<Without<T, K>>

export function omit<T, K extends keyof T>(
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
): Undefinable<Without<T, K>>

export function omit<T, K extends keyof T>(
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
): Optional<Without<T, K>>

export function omit<T>(source: T, keys: Array<keyof T>): Partial<T>

export function omit<T>(
  source: Nullable<T>,
  keys: Array<keyof T>,
): Nullable<Partial<T>>

export function omit<T>(
  source: Undefinable<T>,
  keys: Array<keyof T>,
): Undefinable<Partial<T>>

export function omit<T>(
  source: Optional<T>,
  keys: Array<keyof T>,
): Optional<Partial<T>>

export function omit<T>(source: T, keys: Array<keyof T>): Partial<T>

export function omit(
  source: any,
  firstKeyOrKeys?: any,
  // tslint:disable-next-line
  ...otherKeys: any[]
): any {
  if (isNullOrUndefined(source)) return source

  const res = { ...source }
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
