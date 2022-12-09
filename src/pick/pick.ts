import { isNullOrUndefined } from '../common/utils';
import { Nullable, Optional, Undefinable } from '../common/types';

interface PickFn {
  <T, K extends keyof T>(source: T, keys: K[]): Pick<T, K>;
  <T, K extends keyof T>(source: Nullable<T>, keys: K[]): Undefinable<Pick<T, K>>;
  <T, K extends keyof T>(source: Nullable<T>, keys: K[]): Nullable<Pick<T, K>>;
  <T, K extends keyof T>(source: Optional<T>, keys: K[]): Optional<Pick<T, K>>;
}

/**
 * Picks properties from source value. If source type is nullable or optional, the result type is
 * nullable or optional too.
 *
 * There are two signatures of this function, depending on number of properties.
 * 1) When number of picked properties <= 15, the result type will be the source value only with
 *    these properties (strongly typed).
 * 2) If the number of picked properties > 15, the result will be the source value with all
 *    properties marked as optional.
 *
 * @param source source value which properties should be picked
 * @param keys array of names of the properties
 * @returns the source value with picked properties
 */
export const pick: PickFn = (source: any, firstKeyOrKeys?: any, ...otherKeys: any[]) => {
  if (isNullOrUndefined(source)) return source;

  const res = {} as any;
  if (Array.isArray(firstKeyOrKeys)) {
    firstKeyOrKeys.forEach((key) => {
      if (source[key] !== undefined) res[key] = source[key];
    });
  } else {
    res[firstKeyOrKeys] = source[firstKeyOrKeys];
    otherKeys.forEach((key) => {
      if (source[key] !== undefined) res[key] = source[key];
    });
  }
  return res;
};

export default pick;
