import { Optional, U } from '../types'
import { shallowCopy } from '../utils'
import { isObject } from 'util'

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
 * @param source source, in which the nested value should be set.
 * @param path path array of the nested value in the source
 * @param value value to be set in source on specified path
 * @returns source value with value on path set
 */
export function set<T, K1 extends keyof T>(
  source: Optional<T>,
  path: [K1],
  value: T[K1],
): T

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
 * @param source source, in which the nested value should be set.
 * @param path path array of the nested value in the source
 * @param value value to be set in source on specified path
 * @returns source value with value on path set
 */
export function set<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  source: Optional<T>,
  path: [K1, K2],
  value: U<T[K1]>[K2],
): T

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
 * @param source source, in which the nested value should be set.
 * @param path path array of the nested value in the source
 * @param value value to be set in source on specified path
 * @returns source value with value on path set
 */
export function set<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(source: Optional<T>, path: [K1, K2, K3], value: U<U<T[K1]>[K2]>[K3]): T

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
 * @param source source, in which the nested value should be set.
 * @param path path array of the nested value in the source
 * @param value value to be set in source on specified path
 * @returns source value with value on path set
 */
export function set<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(
  source: Optional<T>,
  path: [K1, K2, K3, K4],
  value: U<U<U<T[K1]>[K2]>[K3]>[K4],
): T

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
 * @param source source, in which the nested value should be set.
 * @param path path array of the nested value in the source
 * @param value value to be set in source on specified path
 * @returns source value with value on path set
 */
export function set<
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
): T

// NOTE: implementation
export function set(source: any, path: any[], value: any) {
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
