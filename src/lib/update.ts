import {
  DeepReadonly,
  Optional,
  Set1,
  Set2,
  Set3,
  Set4,
  Set5,
  U
} from '../types'
import { shallowCopy } from '../utils'
import { isObject } from 'util'

/**
 * Updates the value on the specified path in source value using update function. This function will
 * take current value and can transform it to other value (with the same type).
 *
 * If the path in the source doesn't exist, it will be created. Note, that we don't know what is the
 * type of the object at runtime. Due to this, if the path value is number, we create an array,
 * otherwise object.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * Return type will be the same as the source type, where any optional values along the path are
 * made required (because they are created).
 *
 * @param source source, in which the nested value should be removed.
 * @param path path array of the nested value in the source
 * @returns source value with removed value
 */
export function update<T, K1 extends keyof T>(
  source: T,
  path: [K1],
  updateFn: (value: DeepReadonly<T[K1]>) => T[K1],
): Set1<T, K1>

/**
 * Updates the value on the specified path in source value using update function. This function will
 * take current value and can transform it to other value (with the same type).
 *
 * If the path in the source doesn't exist, it will be created. Note, that we don't know what is the
 * type of the object at runtime. Due to this, if the path value is number, we create an array,
 * otherwise object.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * Return type will be the same as the source type, where any optional values along the path are
 * made required (because they are created).
 *
 * @param source source, in which the nested value should be removed.
 * @param path path array of the nested value in the source
 * @returns source value with removed value
 */
export function update<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  source: T,
  path: [K1, K2],
  updateFn: (value: DeepReadonly<T[K1][K2]>) => T[K1][K2],
): Set2<T, K1, K2>

/**
 * Updates the value on the specified path in source value using update function. This function will
 * take current value and can transform it to other value (with the same type).
 *
 * If the path in the source doesn't exist, it will be created. Note, that we don't know what is the
 * type of the object at runtime. Due to this, if the path value is number, we create an array,
 * otherwise object.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * Return type will be the same as the source type, where any optional values along the path are
 * made required (because they are created).
 *
 * @param source source, in which the nested value should be removed.
 * @param path path array of the nested value in the source
 * @returns source value with removed value
 */
export function update<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(
  source: T,
  path: [K1, K2, K3],
  updateFn: (value: DeepReadonly<T[K1][K2][K3]>) => T[K1][K2][K3],
): Set3<T, K1, K2, K3>

/**
 * Updates the value on the specified path in source value using update function. This function will
 * take current value and can transform it to other value (with the same type).
 *
 * If the path in the source doesn't exist, it will be created. Note, that we don't know what is the
 * type of the object at runtime. Due to this, if the path value is number, we create an array,
 * otherwise object.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * Return type will be the same as the source type, where any optional values along the path are
 * made required (because they are created).
 *
 * @param source source, in which the nested value should be removed.
 * @param path path array of the nested value in the source
 * @returns source value with removed value
 */
export function update<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(
  source: T,
  path: [K1, K2, K3, K4],
  updateFn: (value: DeepReadonly<T[K1][K2][K3][K4]>) => T[K1][K2][K3][K4],
): Set4<T, K1, K2, K3, K4>

/**
 * Updates the value on the specified path in source value using update function. This function will
 * take current value and can transform it to other value (with the same type).
 *
 * If the path in the source doesn't exist, it will be created. Note, that we don't know what is the
 * type of the object at runtime. Due to this, if the path value is number, we create an array,
 * otherwise object.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * Return type will be the same as the source type, where any optional values along the path are
 * made required (because they are created).
 *
 * @param source source, in which the nested value should be removed.
 * @param path path array of the nested value in the source
 * @returns source value with removed value
 */
export function update<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(
  source: T,
  path: [K1, K2, K3, K4, K5],
  updateFn: (
    value: DeepReadonly<T[K1][K2][K3][K4][K5]>,
  ) => T[K1][K2][K3][K4][K5],
): Set5<T, K1, K2, K3, K4, K5>

/**
 * Updates the value on the specified path in source value using update function. This function will
 * take current value and can transform it to other value (with the same type).
 *
 * If the path in the source doesn't exist, it will be created. Note, that we don't know what is the
 * type of the object at runtime. Due to this, if the path value is number, we create an array,
 * otherwise object.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * Return type will be the same as the source type, where any optional values along the path are
 * made required (because they are created).
 *
 * @param source source, in which the nested value should be removed.
 * @param path path array of the nested value in the source
 * @returns source value with removed value
 */
export function update<T, K1 extends keyof T>(
  source: Optional<T>,
  path: [K1],
  updateFn: (value: DeepReadonly<T[K1]> | undefined) => T[K1],
): Set1<T, K1>

/**
 * Updates the value on the specified path in source value using update function. This function will
 * take current value and can transform it to other value (with the same type).
 *
 * If the path in the source doesn't exist, it will be created. Note, that we don't know what is the
 * type of the object at runtime. Due to this, if the path value is number, we create an array,
 * otherwise object.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * Return type will be the same as the source type, where any optional values along the path are
 * made required (because they are created).
 *
 * @param source source, in which the nested value should be removed.
 * @param path path array of the nested value in the source
 * @returns source value with removed value
 */
export function update<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  source: Optional<T>,
  path: [K1, K2],
  updateFn: (value: DeepReadonly<U<T[K1]>[K2]> | undefined) => U<T[K1]>[K2],
): Set2<T, K1, K2>

/**
 * Updates the value on the specified path in source value using update function. This function will
 * take current value and can transform it to other value (with the same type).
 *
 * If the path in the source doesn't exist, it will be created. Note, that we don't know what is the
 * type of the object at runtime. Due to this, if the path value is number, we create an array,
 * otherwise object.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * Return type will be the same as the source type, where any optional values along the path are
 * made required (because they are created).
 *
 * @param source source, in which the nested value should be removed.
 * @param path path array of the nested value in the source
 * @returns source value with removed value
 */
export function update<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(
  source: Optional<T>,
  path: [K1, K2, K3],
  updateFn: (
    value: DeepReadonly<U<U<T[K1]>[K2]>[K3]> | undefined,
  ) => U<U<T[K1]>[K2]>[K3],
): Set3<T, K1, K2, K3>

/**
 * Updates the value on the specified path in source value using update function. This function will
 * take current value and can transform it to other value (with the same type).
 *
 * If the path in the source doesn't exist, it will be created. Note, that we don't know what is the
 * type of the object at runtime. Due to this, if the path value is number, we create an array,
 * otherwise object.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * Return type will be the same as the source type, where any optional values along the path are
 * made required (because they are created).
 *
 * @param source source, in which the nested value should be removed.
 * @param path path array of the nested value in the source
 * @returns source value with removed value
 */
export function update<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(
  source: Optional<T>,
  path: [K1, K2, K3, K4],
  updateFn: (
    value: DeepReadonly<U<U<U<T[K1]>[K2]>[K3]>[K4]> | undefined,
  ) => U<U<U<T[K1]>[K2]>[K3]>[K4],
): Set4<T, K1, K2, K3, K4>

/**
 * Updates the value on the specified path in source value using update function. This function will
 * take current value and can transform it to other value (with the same type).
 *
 * If the path in the source doesn't exist, it will be created. Note, that we don't know what is the
 * type of the object at runtime. Due to this, if the path value is number, we create an array,
 * otherwise object.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * Return type will be the same as the source type, where any optional values along the path are
 * made required (because they are created).
 *
 * @param source source, in which the nested value should be removed.
 * @param path path array of the nested value in the source
 * @returns source value with removed value
 */
export function update<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(
  source: Optional<T>,
  path: [K1, K2, K3, K4, K5],
  updateFn: (
    value: DeepReadonly<U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5]> | undefined,
  ) => U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5],
): Set5<T, K1, K2, K3, K4, K5>

// NOTE: implementation
export function update(source: any, path: any[], updateFn: any) {
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
