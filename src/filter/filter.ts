import { Dictionary, Nullable, Optional, Undefinable } from '../common/types';
import { isNullOrUndefined } from '../common/utils';

interface FilterFn {
  <T, R extends T>(collection: T[], fn: (value: T, index: number) => value is R): R[];

  <T, R extends T>(
    collection: Nullable<T[]>,
    fn: (value: T, index: number) => value is R
  ): Nullable<R[]>;

  <T, R extends T>(
    collection: Undefinable<T[]>,
    fn: (value: T, index: number) => value is R
  ): Undefinable<R[]>;

  <T, R extends T>(
    collection: Optional<T[]>,
    fn: (value: T, index: number) => value is R
  ): Optional<R[]>;

  <T, R extends T>(
    collection: Dictionary<T>,
    fn: (value: T, key: string) => value is R
  ): Dictionary<R>;

  <T, R extends T>(
    collection: Nullable<Dictionary<T>>,
    fn: (value: T, key: string) => value is R
  ): Nullable<Dictionary<R>>;

  <T, R extends T>(
    collection: Undefinable<Dictionary<T>>,
    fn: (value: T, key: string) => value is R
  ): Undefinable<Dictionary<R>>;

  <T, R extends T>(
    collection: Optional<Dictionary<T>>,
    fn: (value: T, key: string) => value is R
  ): Optional<Dictionary<R>>;

  <T>(collection: T[], fn: (value: T, index: number) => boolean): T[];

  <T>(collection: Nullable<T[]>, fn: (value: T, index: number) => boolean): Nullable<T[]>;

  <T>(collection: Undefinable<T[]>, fn: (value: T, index: number) => boolean): Undefinable<T[]>;

  <T>(collection: Optional<T[]>, fn: (value: T, index: number) => boolean): Optional<T[]>;

  <T>(collection: Dictionary<T>, fn: (value: T, key: string) => boolean): Dictionary<T>;

  <T>(collection: Nullable<Dictionary<T>>, fn: (value: T, key: string) => boolean): Nullable<
    Dictionary<T>
  >;

  <T>(collection: Undefinable<Dictionary<T>>, fn: (value: T, key: string) => boolean): Undefinable<
    Dictionary<T>
  >;

  <T>(collection: Optional<Dictionary<T>>, fn: (value: T, key: string) => boolean): Optional<
    Dictionary<T>
  >;
}

/**
 * Filters elements from the collection for which the filter function returns true. This function
 * will always return the same type of collection. This means that if you pass nullable dictionary,
 * you will also receive nullable dictionary.
 *
 * If the collection is null or undefined, the function will immediately return.
 *
 * @param collection the collection to be filtered
 * @param fn predicate that receives the value and index (or key) of the collection element.
 * Function must return true for elements that should appear in the filtered collection, false
 * otherwise.
 * @returns the same type of collection with filtered elements.
 */
const filter: FilterFn = (collection: any, fn: any): any => {
  if (isNullOrUndefined(collection)) return collection;

  let res;
  if (Array.isArray(collection)) {
    res = [];
    for (let i = 0; i < collection.length; i++) {
      if (fn(collection[i], i)) res.push(collection[i]);
    }
  } else {
    res = {} as any;
    const keys = Object.keys(collection);
    for (const key of keys) {
      if (fn(collection[key], key)) res[key] = collection[key];
    }
  }

  return res;
};

export default filter;
