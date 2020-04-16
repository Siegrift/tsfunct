import { Optional, UnwrapOptional as U } from '../common/types'
import baseUpdate from '../common/baseUpdate'

type Update1<T, K1 extends keyof T, R> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> & { [KK1 in K1]: R }

type Update2<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  R
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      { [KK1 in K1]-?: { [key in K1]: Update1<U<T[K1]>, K2, R> }[KK1] }

type Update3<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  R
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      {
        [KK1 in K1]-?: { [key in K1]: Update2<U<T[K1]>, K2, K3, R> }[KK1]
      }

type Update4<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  R
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      {
        [KK1 in K1]-?: { [key in K1]: Update3<U<T[K1]>, K2, K3, K4, R> }[KK1]
      }

type Update5<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>,
  R
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      {
        [KK1 in K1]-?: {
          [key in K1]: Update4<U<T[K1]>, K2, K3, K4, K5, R>
        }[KK1]
      }

interface UpdateFn {
  <T, K1 extends keyof T, R extends T[K1]>(
    source: T,
    path: [K1],
    updateFn: (value: T[K1]) => R,
  ): Update1<T, K1, R>
  <T, K1 extends keyof T, K2 extends keyof T[K1], R extends T[K1][K2]>(
    source: T,
    path: [K1, K2],
    updateFn: (value: T[K1][K2]) => R,
  ): Update2<T, K1, K2, R>
  <
    T,
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    R extends T[K1][K2][K3]
  >(
    source: T,
    path: [K1, K2, K3],
    updateFn: (value: T[K1][K2][K3]) => R,
  ): Update3<T, K1, K2, K3, R>
  <
    T,
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    R extends T[K1][K2][K3][K4]
  >(
    source: T,
    path: [K1, K2, K3, K4],
    updateFn: (value: T[K1][K2][K3][K4]) => R,
  ): Update4<T, K1, K2, K3, K4, R>
  <
    T,
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    R extends T[K1][K2][K3][K4][K5]
  >(
    source: T,
    path: [K1, K2, K3, K4, K5],
    updateFn: (value: T[K1][K2][K3][K4][K5]) => R,
  ): Update5<T, K1, K2, K3, K4, K5, R>
  <T, K1 extends keyof T, R extends T[K1]>(
    source: Optional<T>,
    path: [K1],
    updateFn: (value: T[K1] | undefined) => R,
  ): Update1<T, K1, R>
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>, R extends U<T[K1]>[K2]>(
    source: Optional<T>,
    path: [K1, K2],
    updateFn: (value: U<T[K1]>[K2] | undefined) => R,
  ): Update2<T, K1, K2, R>
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    R extends U<U<T[K1]>[K2]>[K3]
  >(
    source: Optional<T>,
    path: [K1, K2, K3],
    updateFn: (value: U<U<T[K1]>[K2]>[K3] | undefined) => R,
  ): Update3<T, K1, K2, K3, R>
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    R extends U<U<U<T[K1]>[K2]>[K3]>[K4]
  >(
    source: Optional<T>,
    path: [K1, K2, K3, K4],
    updateFn: (value: U<U<U<T[K1]>[K2]>[K3]>[K4] | undefined) => R,
  ): Update4<T, K1, K2, K3, K4, R>
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>,
    R extends U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5]
  >(
    source: Optional<T>,
    path: [K1, K2, K3, K4, K5],
    updateFn: (value: U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5] | undefined) => R,
  ): Update5<T, K1, K2, K3, K4, K5, R>
}

// NOTE: use private implementation because typedoc generates wrong documentation.
const updateImplementation: UpdateFn = baseUpdate

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
export const update = updateImplementation

export default update
