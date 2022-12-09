// Beware that compose function can't be typed properly with TS
// see: https://github.com/microsoft/TypeScript/issues/31738
interface ComposeFn {
  <V extends any[], T1>(fn0: (...args: V) => T1): (...args: V) => T1;

  <V extends any[], T1, T2>(fn1: (x: T1) => T2, fn0: (...args: V) => T1): (...args: V) => T2;

  <V extends any[], T1, T2, T3>(fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (...args: V) => T1): (
    ...args: V
  ) => T3;

  <V extends any[], T1, T2, T3, T4>(
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (...args: V) => T1
  ): (...args: V) => T4;

  <V extends any[], T1, T2, T3, T4, T5>(
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (...args: V) => T1
  ): (...args: V) => T5;

  <V extends any[], T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (...args: V) => T1
  ): (...args: V) => T6;

  <V extends any[], T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (...args: V) => T1
  ): (...args: V) => T6;

  <V extends any[], T1, T2, T3, T4, T5, T6, T7>(
    fn0: (...args: V) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7
  ): (...args: V) => T7;

  <V extends any[], T1, T2, T3, T4, T5, T6, T7, T8>(
    fn7: (x: T7) => T8,
    fn6: (x: T6) => T7,
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (...args: V) => T1
  ): (...args: V) => T8;

  <V extends any[], T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn8: (x: T8) => T9,
    fn7: (x: T7) => T8,
    fn6: (x: T6) => T7,
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (...args: V) => T1
  ): (...args: V) => T9;

  <V extends any[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn9: (x: T9) => T10,
    fn8: (x: T8) => T9,
    fn7: (x: T7) => T8,
    fn6: (x: T6) => T7,
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (...args: V) => T1
  ): (...args: V) => T10;

  // try to provide strongly typed compose fn for functions with same signature
  <V extends any[], T>(...fns: Array<(...args: V) => T>): (...args: V) => T;
}

/**
 * Creates a new function composed from the functions received as arguments. The composition
 * is right to left (the last function is invoked first and it's result is passed as an
 * argument to the previous function...).
 *
 * Note that this function can't be typed properly (TS design limitation,
 * see: https://github.com/microsoft/TypeScript/issues/31738). Use `pipe` if with left to right
 * composition instead if possible.
 *
 * @param fns functions that should be composed together
 * @returns the composed function
 */
const compose: ComposeFn = (...fns: any[]) =>
  fns.reduce(
    (f, g) =>
      (...args: any[]) =>
        f(g(...args)),
    (id: any) => id
  );

export default compose;
