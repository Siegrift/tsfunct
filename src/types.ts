export type Primitive = string | number | boolean | undefined | null

export type DeepReadonly<T> = T extends Primitive ? T : DeepReadonlyObject<T>

export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

export type Nullable<T> = T | null

export type Undefinable<T> = T | null

export type Optional<T> = T | null | undefined

export type Diff<T, U> = T extends U ? never : T

export type Filter<T, U> = T extends U ? T : never

export type Without<T, K> = Pick<T, Diff<keyof T, K>>

export interface Dictionary<T> {
  [index: string]: T
}

export interface NumericDictionary<T> {
  [index: number]: T
}

export type OptionalValue<T extends Optional<any>> = Diff<T, null | undefined>
