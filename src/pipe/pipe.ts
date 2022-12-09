// Higher order type inference has been implemented only recenty and without
// this feature we couldn't type pipe function properly.
// see: https://github.com/microsoft/TypeScript/pull/30215

interface PipeFn {
  <V extends any[], T1>(fn0: (...args: V) => T1): (...args: V) => T1;

  <V extends any[], T1, T2>(fn0: (...args: V) => T1, fn1: (x: T1) => T2): (...args: V) => T2;

  <V extends any[], T1, T2, T3>(fn0: (...args: V) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3): (
    ...args: V
  ) => T3;

  <V extends any[], T1, T2, T3, T4>(
    fn0: (...args: V) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4
  ): (...args: V) => T4;

  <V extends any[], T1, T2, T3, T4, T5>(
    fn0: (...args: V) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5
  ): (...args: V) => T5;

  <V extends any[], T1, T2, T3, T4, T5, T6>(
    fn0: (...args: V) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6
  ): (...args: V) => T6;

  <V extends any[], T1, T2, T3, T4, T5, T6, T7>(
    fn0: (...args: V) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn: (x: T6) => T7
  ): (...args: V) => T7;

  <V extends any[], T1, T2, T3, T4, T5, T6, T7, T8>(
    fn0: (...args: V) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn: (x: T7) => T8
  ): (...args: V) => T8;

  <V extends any[], T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn0: (...args: V) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9
  ): (...args: V) => T9;

  <V extends any[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn0: (...args: V) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9,
    fn9: (x: T9) => T10
  ): (...args: V) => T10;

  // try to provide strongly typed pipe fn for functions with same signature
  <V extends any[], T>(...fns: Array<(...args: V) => T>): (...args: V) => T;
}

// NOTE: use private implementation because typedoc generates wrong documentation.
const pipeImplementation: PipeFn = (...fns: any[]) =>
  fns.reduceRight(
    (f, g) =>
      (...args: any[]) =>
        f(g(...args)),
    (id: any) => id
  );

/**
 * Creates a new function composed from the functions received as arguments. The composition
 * is left to right (the first function is invoked first and it's result is passed as an
 * argument to the second...).
 *
 * Note that this is the preferred way to compose functions in TS, because right to left
 * composition can't be typed properly (TS design limitation).
 *
 * @param fns functions that should be composed together
 * @returns the composed function
 */
export const pipe = pipeImplementation;

export default pipe;
