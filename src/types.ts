export type Primitive = string | number | boolean | undefined | null

// FIXME: original definition is throwing and error when using TS compiler ^3.5.1
// Error: Type instantiation is excessively deep and possibly infinite.
//
// export type DeepReadonly<T> = T extends Primitive
//   ? T
//   : { readonly [K in keyof T]: DeepReadonly<T[K]> }
//
// it seems to be passing when using the version without conditional types
export type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> }

export type Nullable<T> = T | null

export type Undefinable<T> = T | undefined

export type Optional<T> = T | null | undefined

export type Without<T, K> = T extends any[] ? T : Pick<T, Exclude<keyof T, K>>

export interface Dictionary<T> {
  [index: string]: T
}

export interface NumericDictionary<T> {
  [index: number]: T
}

export type OptionalValue<T extends Optional<any>> = Exclude<
  T,
  null | undefined
>

// less verbose alias for OptionalValue
export type U<T> = OptionalValue<T>

export type Set1<T, K1 extends keyof T> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      { [KK1 in K1]-?: Required<Pick<T, KK1>> }[K1]

export type Set2<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      { [KK1 in K1]-?: Required<{ [key in K1]: Set1<U<T[K1]>, K2> }> }[K1]

export type Set3<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      { [KK1 in K1]-?: Required<{ [key in K1]: Set2<U<T[K1]>, K2, K3> }> }[K1]

export type Set4<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
> = T extends any[]
  ? T
  : Pick<T, Exclude<keyof T, K1>> &
      {
        [KK1 in K1]-?: Required<{ [key in K1]: Set3<U<T[K1]>, K2, K3, K4> }>
      }[K1]

export type Set5<
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
        [KK1 in K1]-?: Required<{ [key in K1]: Set4<U<T[K1]>, K2, K3, K4, K5> }>
      }[K1]

// NOTE: these are some links containing other useful types
// Require at least one of keys:
// https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist
//
// Inverse of Partial<T> = Required<T>
// https://github.com/microsoft/TypeScript/issues/15012
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
