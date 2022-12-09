export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type Optional<T> = T | null | undefined;

export type Without<T, K> = T extends any[] ? T : Pick<T, Exclude<keyof T, K>>;

export interface Dictionary<T> {
  [index: string]: T;
}

export type UnwrapOptional<T extends Optional<any>> = Exclude<T, null | undefined>;

// NOTE: these are some links containing other useful types
// Require at least one of keys:
// https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist
//
// Inverse of Partial<T> = Required<T>
// https://github.com/microsoft/TypeScript/issues/15012
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
