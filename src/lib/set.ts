import { Optional, UnwrapOptional as U } from '../types'
import { isObject, shallowCopy } from '../utils'

type Set1<T, K1 extends keyof T> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      { [KK1 in K1]-?: Required<Pick<T, KK1>> }[K1]

type Set2<T, K1 extends keyof T, K2 extends keyof U<T[K1]>> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      { [KK1 in K1]-?: Required<{ [key in K1]: Set1<U<T[K1]>, K2> }> }[K1]

type Set3<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      { [KK1 in K1]-?: Required<{ [key in K1]: Set2<U<T[K1]>, K2, K3> }> }[K1]

type Set4<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      {
        [KK1 in K1]-?: Required<{ [key in K1]: Set3<U<T[K1]>, K2, K3, K4> }>;
      }[K1]

type Set5<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      {
        [KK1 in K1]-?: Required<
          { [key in K1]: Set4<U<T[K1]>, K2, K3, K4, K5> }
        >;
      }[K1]

interface SetFn {
  <T, K1 extends keyof T>(source: Optional<T>, path: [K1], value: T[K1]): Set1<
    T,
    K1
  >
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
    source: Optional<T>,
    path: [K1, K2],
    value: U<T[K1]>[K2],
  ): Set2<T, K1, K2>
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>
  >(
    source: Optional<T>,
    path: [K1, K2, K3],
    value: U<U<T[K1]>[K2]>[K3],
  ): Set3<T, K1, K2, K3>
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    source: Optional<T>,
    path: [K1, K2, K3, K4],
    value: U<U<U<T[K1]>[K2]>[K3]>[K4],
  ): Set4<T, K1, K2, K3, K4>
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
  >(
    source: Optional<T>,
    path: [K1, K2, K3, K4, K5],
    value: U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5],
  ): Set5<T, K1, K2, K3, K4, K5>
}

// NOTE: use private implementation because typedoc generates wrong documentation.
const setImplementation: SetFn = (source: any, path: any[], value: any) => {
  const returnObject = shallowCopy(source, Number.isInteger(path[0]) ? [] : {})
  let currentObject = returnObject
  let index = 0
  while (index < path.length) {
    if (
      !Array.isArray(currentObject[path[index]]) &&
      !isObject(currentObject[path[index]])
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

/**
 * Sets the value on the specified path in source value. If the path in the source doesn't exist it
 * will be created. Note, that we don't know what is the type of the object at runtime. Due to this,
 * if the path value is number, we create an array, otherwise object.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * Return type will be the same as the source type, where any optional values along the path are
 * made required (because they are created).
 *
 * @param source source, in which the nested value should be set.
 * @param path path array of the nested value in the source
 * @param value value to be set in source on specified path
 * @returns source value with value on path set
 */
export const set = setImplementation
