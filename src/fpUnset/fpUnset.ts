import { Nullable, Optional, Undefinable, UnwrapOptional as U, Without } from '../common/types';
import baseUnset from '../common/baseUnset';

type FpUnset1<T, K1> = Without<T, K1>;
type FpUnset2<T, K1, K2> = {
  [P in keyof T]: P extends K1 ? FpUnset1<T[P], K2> : T[P];
};
type FpUnset3<T, K1, K2, K3> = {
  [P in keyof T]: P extends K1 ? FpUnset2<T[P], K2, K3> : T[P];
};
type FpUnset4<T, K1, K2, K3, K4> = {
  [P in keyof T]: P extends K1 ? FpUnset3<T[P], K2, K3, K4> : T[P];
};
type FpUnset5<T, K1, K2, K3, K4, K5> = {
  [P in keyof T]: P extends K1 ? FpUnset4<T[P], K2, K3, K4, K5> : T[P];
};

interface FpUnsetFnReturn<T> {
  <K1 extends keyof T>(path: [K1]): (source: T) => FpUnset1<T, K1>;

  <K1 extends keyof T, K2 extends keyof U<T[K1]>>(path: [K1, K2]): (
    source: T
  ) => FpUnset2<T, K1, K2>;

  <K1 extends keyof T, K2 extends keyof U<T[K1]>, K3 extends keyof U<U<T[K1]>[K2]>>(
    path: [K1, K2, K3]
  ): (source: T) => FpUnset3<T, K1, K2, K3>;

  <
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    path: [K1, K2, K3, K4]
  ): (source: T) => FpUnset4<T, K1, K2, K3, K4>;

  <
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
  >(
    path: [K1, K2, K3, K4, K5]
  ): (source: T) => FpUnset5<T, K1, K2, K3, K4, K5>;

  <K1 extends keyof T>(path: [K1]): (source: Nullable<T>) => Nullable<FpUnset1<T, K1>>;

  <K1 extends keyof T, K2 extends keyof U<T[K1]>>(path: [K1, K2]): (
    source: Nullable<T>
  ) => Nullable<FpUnset2<T, K1, K2>>;

  <K1 extends keyof T, K2 extends keyof U<T[K1]>, K3 extends keyof U<U<T[K1]>[K2]>>(
    path: [K1, K2, K3]
  ): (source: Nullable<T>) => Nullable<FpUnset3<T, K1, K2, K3>>;

  <
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    path: [K1, K2, K3, K4]
  ): (source: Nullable<T>) => Nullable<FpUnset4<T, K1, K2, K3, K4>>;

  <
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
  >(
    path: [K1, K2, K3, K4, K5]
  ): (source: Nullable<T>) => Nullable<FpUnset5<T, K1, K2, K3, K4, K5>>;

  <K1 extends keyof T>(path: [K1]): (source: Undefinable<T>) => Undefinable<FpUnset1<T, K1>>;

  <K1 extends keyof T, K2 extends keyof U<T[K1]>>(path: [K1, K2]): (
    source: Undefinable<T>
  ) => Undefinable<FpUnset2<T, K1, K2>>;

  <K1 extends keyof T, K2 extends keyof U<T[K1]>, K3 extends keyof U<U<T[K1]>[K2]>>(
    path: [K1, K2, K3]
  ): (source: Undefinable<T>) => Undefinable<FpUnset3<T, K1, K2, K3>>;

  <
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    path: [K1, K2, K3, K4]
  ): (source: Undefinable<T>) => Undefinable<FpUnset4<T, K1, K2, K3, K4>>;

  <
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
  >(
    path: [K1, K2, K3, K4, K5]
  ): (source: Undefinable<T>) => Undefinable<FpUnset5<T, K1, K2, K3, K4, K5>>;

  <K1 extends keyof T>(path: [K1]): (source: Optional<T>) => Optional<FpUnset1<T, K1>>;

  <K1 extends keyof T, K2 extends keyof U<T[K1]>>(path: [K1, K2]): (
    source: Optional<T>
  ) => Optional<FpUnset2<T, K1, K2>>;

  <K1 extends keyof T, K2 extends keyof U<T[K1]>, K3 extends keyof U<U<T[K1]>[K2]>>(
    path: [K1, K2, K3]
  ): (source: Optional<T>) => Optional<FpUnset3<T, K1, K2, K3>>;

  <
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    path: [K1, K2, K3, K4]
  ): (source: Optional<T>) => Optional<FpUnset4<T, K1, K2, K3, K4>>;

  <
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
  >(
    path: [K1, K2, K3, K4, K5]
  ): (source: Optional<T>) => Optional<FpUnset5<T, K1, K2, K3, K4, K5>>;
}

// NOTE: use private implementation because typedoc generates wrong documentation.
const fpUnsetImplementation =
  <T>(): FpUnsetFnReturn<T> =>
  (path: any[]) =>
  (source: any) =>
    baseUnset(source, path);

/**
 * Removes the value on the specified path in source value. If the value is an array, the behavior
 * is similar to splicing shallow copy of the value. If the value is object, the value is removed
 * from the shallow copy using `delete` keyword.
 *
 * Source value can be nullable or undefinable, and path is treated as if the source (and all
 * intermediate) values are required (because nullable and undefinable types can't have keys).
 *
 * Path supports up to 5 elements. This means, you are not able to use this helper if you need more.
 *
 * @param source source, in which the nested value should be removed.
 * @param path path array of the nested value in the source
 * @returns source value with removed value
 */
export const fpUnset = fpUnsetImplementation;

export default fpUnset;
