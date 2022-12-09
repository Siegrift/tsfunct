import map from '../map';
import { Dictionary, Optional } from '../common/types';
import { idFn } from './common';

describe('map', () => {
  test('if collection is null or undefined, returns the collection', () => {
    let arr = null as Optional<number[]>;
    let dict = null as Optional<Dictionary<string>>;
    let m1: Optional<number[]>;
    let m2: Optional<Dictionary<string>>;

    m1 = map(arr, idFn);
    m2 = map(dict, idFn);
    expect(m1).toBe(null);
    expect(m2).toBe(null);

    arr = undefined as Optional<number[]>;
    dict = undefined as Optional<Dictionary<string>>;

    m1 = map(arr, idFn);
    m2 = map(dict, idFn);
    expect(m1).toBe(undefined);
    expect(m2).toBe(undefined);
  });

  test('maps elements of an array', () => {
    const arr = [1, 2, 3, 4];
    const mapFn = (value: number, index: number) => value * index;

    expect(map(arr, mapFn)).toEqual([0, 2, 6, 12]);
  });

  test('maps elements of an dictionary', () => {
    const dict: Dictionary<string> = {
      a: 'a',
      b: 'b',
      c: 'c',
    };
    const mapFn = (value: string, key: string) => ({
      key: key + 'x',
      value: value.length,
    });

    const newDict: Dictionary<number> = map(dict, mapFn);
    expect(newDict).toEqual({ ax: 1, bx: 1, cx: 1 });
  });

  test('is immutable', () => {
    const arr = [1, 2, 3, 4, 5];
    const mappedArr: number[] = map(arr, (value) => value * value);

    expect(arr).toBe(arr);
    expect(mappedArr).toEqual([1, 4, 9, 16, 25]);
  });

  test('non idiomatic usage can modify original array', () => {
    const arr = [{ a: 0 }, { a: 1 }, { a: 2 }];
    const mapped = map(arr, (val: any) => (val.a = 3));

    expect(mapped).toEqual([3, 3, 3]);
    expect(arr).toEqual([{ a: 3 }, { a: 3 }, { a: 3 }]);
  });
});
