import { Optional, UnwrapOptional as U } from '../common/types'
import baseSet from '../common/baseSet'

type FpSet1<T, K1 extends keyof T, R> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> & { [KK1 in K1]: R }

type FpSet2<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  R
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      { [KK1 in K1]-?: { [key in K1]: FpSet1<U<T[K1]>, K2, R> }[KK1] }

type FpSet3<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  R
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      {
        [KK1 in K1]-?: { [key in K1]: FpSet2<U<T[K1]>, K2, K3, R> }[KK1]
      }

type FpSet4<
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
        [KK1 in K1]-?: { [key in K1]: FpSet3<U<T[K1]>, K2, K3, K4, R> }[KK1]
      }

type FpSet5<
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
        [KK1 in K1]-?: { [key in K1]: FpSet4<U<T[K1]>, K2, K3, K4, K5, R> }[KK1]
      }

// NOTE: TS doesn't allow partial generic type argument inference
// see: https://github.com/microsoft/TypeScript/pull/26349
// see: https://medium.com/@nandiinbao/partial-type-argument-inference-in-typescript-and-workarounds-for-it-d7c772788b2e
interface FpSetFnReturn<T> {
  <K1 extends keyof T, R extends T[K1]>(path: [K1], value: R): (
    source: Optional<T>,
  ) => FpSet1<T, K1, R>

  <K1 extends keyof T, K2 extends keyof U<T[K1]>, R extends U<T[K1]>[K2]>(
    path: [K1, K2],
    value: R,
  ): (source: Optional<T>) => FpSet2<T, K1, K2, R>

  <
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    R extends U<U<T[K1]>[K2]>[K3]
  >(
    path: [K1, K2, K3],
    value: R,
  ): (source: Optional<T>) => FpSet3<T, K1, K2, K3, R>

  <
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    R extends U<U<U<T[K1]>[K2]>[K3]>[K4]
  >(
    path: [K1, K2, K3, K4],
    value: R,
  ): (source: Optional<T>) => FpSet4<T, K1, K2, K3, K4, R>

  <
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>,
    R extends U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5]
  >(
    path: [K1, K2, K3, K4, K5],
    value: R,
  ): (source: Optional<T>) => FpSet5<T, K1, K2, K3, K4, K5, R>
}

// NOTE: use private implementation because typedoc generates wrong documentation.
const fpSetImplementation = <T>(): FpSetFnReturn<T> => (
  path: any[],
  value: any,
) => (source: any) => baseSet(source, path, value)

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
export const fpSet = fpSetImplementation

export default fpSet
