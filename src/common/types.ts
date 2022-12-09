export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type Optional<T> = T | null | undefined;

export type Without<T, K> = T extends any[] ? T : Pick<T, Exclude<keyof T, K>>;

export interface Dictionary<T> {
  [index: string]: T;
}

export type UnwrapOptional<T extends Optional<any>> = Exclude<T, null | undefined>;
