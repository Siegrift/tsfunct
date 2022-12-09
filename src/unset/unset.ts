import { Nullable, Optional, Undefinable, UnwrapOptional as U, Without } from '../common/types';
import baseUnset from '../common/baseUnset';

type Unset1<T, K1> = Without<T, K1>;
type Unset2<T, K1, K2> = {
  [P in keyof T]: P extends K1 ? Unset1<T[P], K2> : T[P];
};
type Unset3<T, K1, K2, K3> = {
  [P in keyof T]: P extends K1 ? Unset2<T[P], K2, K3> : T[P];
};
type Unset4<T, K1, K2, K3, K4> = {
  [P in keyof T]: P extends K1 ? Unset3<T[P], K2, K3, K4> : T[P];
};
type Unset5<T, K1, K2, K3, K4, K5> = {
  [P in keyof T]: P extends K1 ? Unset4<T[P], K2, K3, K4, K5> : T[P];
};

interface UnsetFn {
  <T, K1 extends keyof T>(source: T, path: [K1]): Unset1<T, K1>;
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(source: T, path: [K1, K2]): Unset2<T, K1, K2>;
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>, K3 extends keyof U<U<T[K1]>[K2]>>(
    source: T,
    path: [K1, K2, K3]
  ): Unset3<T, K1, K2, K3>;
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    source: T,
    path: [K1, K2, K3, K4]
  ): Unset4<T, K1, K2, K3, K4>;
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
  >(
    source: T,
    path: [K1, K2, K3, K4, K5]
  ): Unset5<T, K1, K2, K3, K4, K5>;
  <T, K1 extends keyof T>(source: Nullable<T>, path: [K1]): Nullable<Unset1<T, K1>>;
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(source: Nullable<T>, path: [K1, K2]): Nullable<
    Unset2<T, K1, K2>
  >;
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>, K3 extends keyof U<U<T[K1]>[K2]>>(
    source: Nullable<T>,
    path: [K1, K2, K3]
  ): Nullable<Unset3<T, K1, K2, K3>>;
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    source: Nullable<T>,
    path: [K1, K2, K3, K4]
  ): Nullable<Unset4<T, K1, K2, K3, K4>>;
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
  >(
    source: Nullable<T>,
    path: [K1, K2, K3, K4, K5]
  ): Nullable<Unset5<T, K1, K2, K3, K4, K5>>;
  <T, K1 extends keyof T>(source: Undefinable<T>, path: [K1]): Undefinable<Unset1<T, K1>>;
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
    source: Undefinable<T>,
    path: [K1, K2]
  ): Undefinable<Unset2<T, K1, K2>>;
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>, K3 extends keyof U<U<T[K1]>[K2]>>(
    source: Undefinable<T>,
    path: [K1, K2, K3]
  ): Undefinable<Unset3<T, K1, K2, K3>>;
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    source: Undefinable<T>,
    path: [K1, K2, K3, K4]
  ): Undefinable<Unset4<T, K1, K2, K3, K4>>;
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
  >(
    source: Undefinable<T>,
    path: [K1, K2, K3, K4, K5]
  ): Undefinable<Unset5<T, K1, K2, K3, K4, K5>>;
  <T, K1 extends keyof T>(source: Optional<T>, path: [K1]): Optional<Unset1<T, K1>>;
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(source: Optional<T>, path: [K1, K2]): Optional<
    Unset2<T, K1, K2>
  >;
  <T, K1 extends keyof T, K2 extends keyof U<T[K1]>, K3 extends keyof U<U<T[K1]>[K2]>>(
    source: Optional<T>,
    path: [K1, K2, K3]
  ): Optional<Unset3<T, K1, K2, K3>>;
  <
    T,
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    source: Optional<T>,
    path: [K1, K2, K3, K4]
  ): Optional<Unset4<T, K1, K2, K3, K4>>;
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
  ): Optional<Unset5<T, K1, K2, K3, K4, K5>>;
}

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
const unset: UnsetFn = baseUnset;

export default unset;
