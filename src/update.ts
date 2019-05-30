import { DeepReadonly, Optional, OptionalValue } from './types'
import { shallowCopy } from './utils'

// create an alias as OptionalValue is too verbose
type U<T> = OptionalValue<T>

export function update<T, K1 extends keyof T>(
  obj: Optional<T>,
  path: [K1],
  updateFn: (value: DeepReadonly<T[K1]>) => T[K1],
): T

export function update<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  obj: Optional<T>,
  path: [K1, K2],
  updateFn: (value: DeepReadonly<U<T[K1]>[K2]>) => U<T[K1]>[K2],
): T

export function update<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(
  obj: Optional<T>,
  path: [K1, K2, K3],
  updateFn: (value: DeepReadonly<U<U<T[K1]>[K2]>[K3]>) => U<U<T[K1]>[K2]>[K3],
): T

export function update<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(
  obj: Optional<T>,
  path: [K1, K2, K3, K4],
  updateFn: (
    value: DeepReadonly<U<U<U<T[K1]>[K2]>[K3]>[K4]>,
  ) => U<U<U<T[K1]>[K2]>[K3]>[K4],
): T

export function update<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(
  obj: Optional<T>,
  path: [K1, K2, K3, K4, K5],
  updateFn: (
    value: DeepReadonly<U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5]>,
  ) => U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5],
): T

export function update(obj: any, path: any[], updateFn: any) {
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
    if (index === path.length - 1) {
      currentObject[path[index]] = updateFn(currentObject[path[index]])
    } else {
      currentObject[path[index]] = shallowCopy(currentObject[path[index]])
    }
    currentObject = currentObject[path[index]]
    index += 1
  }
  return returnObject
}
