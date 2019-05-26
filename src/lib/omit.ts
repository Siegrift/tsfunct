import { omit as _omit } from 'lodash'
import { Without } from '../types'
import { isNullOrUndefined } from '../utils'

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

export function omit(obj: any, keys: any[]): any {
  if (isNullOrUndefined(obj)) return obj
  else return _omit(obj, keys)
}
