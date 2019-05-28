import { Optional, OptionalValueType } from './types'
import { shallowCopy } from './utils'

// create an alias as OptionalValueType is too verbose
type U<T> = OptionalValueType<T>

export function set<T, K1 extends keyof T>(
  obj: Optional<T>,
  keys: [K1],
  value: T[K1],
): T

export function set<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  obj: Optional<T>,
  keys: [K1, K2],
  value: U<T[K1]>[K2],
): T

export function set<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(obj: Optional<T>, keys: [K1, K2, K3], value: U<U<T[K1]>[K2]>[K3]): T

export function set<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(
  obj: Optional<T>,
  keys: [K1, K2, K3, K4],
  value: U<U<U<T[K1]>[K2]>[K3]>[K4],
): T

export function set<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(
  obj: Optional<T>,
  keys: [K1, K2, K3, K4, K5],
  value: U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5],
): T

export function set(obj: any, path: any[], value: any) {
  const returnObject = shallowCopy(obj, Array.isArray(path[0]) ? [] : {})
  let currentObject = returnObject
  let index = 0
  while (index < path.length) {
    if (
      !Array.isArray(currentObject[path[index]]) &&
      typeof currentObject[path[index]] !== 'object'
    ) {
      currentObject[path[index]] = Number.isInteger(path[index + 1]) ? [] : {}
    }
    if (index === path.length - 1) currentObject[path[index]] = value
    else {
      currentObject[path[index]] = shallowCopy(currentObject[path[index]])
    }
    currentObject = currentObject[path[index]]
    index += 1
  }
  return returnObject
}
