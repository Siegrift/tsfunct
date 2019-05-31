export type Primitive = string | number | boolean | undefined | null

export type DeepReadonly<T> = T extends Primitive ? T : DeepReadonlyObject<T>

export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

export type Nullable<T> = T | null

export type Undefinable<T> = T | null

export type Optional<T> = T | null | undefined

export type Without<T, K> = Pick<T, Exclude<keyof T, K>>

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
