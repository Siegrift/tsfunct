import { Optional, UnwrapOptional as U } from '../common/types';
import { isNullOrUndefined, isObject } from '../common/utils';

interface GetFn {
  <T, K1 extends keyof T>(source: T, path: [K1]): T[K1];
  <T, K1 extends keyof T, K2 extends keyof T[K1]>(source: T, path: [K1, K2]): T[K1][K2];
  <T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    source: T,
    path: [K1, K2, K3]
  ): T[K1][K2][K3];
  <
    T,
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3]
  >(
    source: T,
    path: [K1, K2, K3, K4]
  ): T[K1][K2][K3][K4];
  <
    T,
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4]
  >(
    source: T,
    path: [K1, K2, K3, K4, K5]
  ): T[K1][K2][K3][K4][K5];
  <T, K1 extends keyof T>(source: Optional<T>, path: [K1]): T[K1] | undefined;
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(source: Optional<T>, path: [K1, K2]):
    | U<T[K1]>[K2]
    | undefined;
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>, K3 extends keyof U<U<T[K1]>[K2]>>(
    source: Optional<T>,
    path: [K1, K2, K3]
  ): U<U<T[K1]>[K2]>[K3] | undefined;
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    source: Optional<T>,
    path: [K1, K2, K3, K4]
  ): U<U<U<T[K1]>[K2]>[K3]>[K4] | undefined;
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
  >(
    source: Optional<T>,
    path: [K1, K2, K3, K4, K5]
  ): U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5] | undefined;
  <T, K1 extends keyof T>(source: Optional<T>, path: [K1], defaultValue: T[K1]): T[K1];
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
    source: Optional<T>,
    path: [K1, K2],
    defaultValue: U<T[K1]>[K2]
  ): U<T[K1]>[K2];
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>, K3 extends keyof U<U<T[K1]>[K2]>>(
    source: Optional<T>,
    path: [K1, K2, K3],
    defaultValue: U<U<T[K1]>[K2]>[K3]
  ): U<U<T[K1]>[K2]>[K3];
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    source: Optional<T>,
    path: [K1, K2, K3, K4],
    defaultValue: U<U<U<T[K1]>[K2]>[K3]>[K4]
  ): U<U<U<T[K1]>[K2]>[K3]>[K4];
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
    defaultValue: U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5]
  ): U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5];
}

/**
 * Returns the nested value in source specified by path. There are 3 ways how to use this helper.
 *
 * 1) If the source value and all intermediate nested values in the path are required, the return
 *    value is is also required.
 *
 * 2) If type of any intermediate value can be nullable or undefined, the result type can be the
 *    type on the path or undefined (returned if the intermediate value is undefined at runtime).
 *
 * 3) You can specify a default value with the same type as the type of the nested value. This value
 *    will be returned if any intermediate value in the source is undefined or null.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * @param source source, from which the nested value should be retrieved.
 * @param path path array of the nested value in the source
 * @returns the nested value in the source. Value returned is the reference of the value in source.
 * Modifying this value will also modify the source value.
 */
export const get: GetFn = (source: any, path: any[], defaultValue?: any) => {
  for (const key of path) {
    if (isNullOrUndefined(source) || !isObject(source) || !source.hasOwnProperty(key)) {
      return defaultValue;
    }
    source = source[key];
  }
  return source;
};

export default get;
