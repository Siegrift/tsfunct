import get from '../src/get';
import { Dict, State, User } from './common';
import { Optional } from '../src/common/types';

describe('get', () => {
  let state: State;

  beforeEach(() => {
    state = {
      users: [
        { id: 156, key: 'asd' },
        { id: 56, key: 'key' },
        { id: 78978, key: 'opi' },
      ],
      dict: {
        someId: 'hello',
        someOther: 132,
      },
      a: { b: { c: { d: { e: '123' } } } },
    };
  });

  test('if object is null or undefined, returns undefined', () => {
    expect(get(null as any, ['asd'])).toBe(undefined);
    expect(get(undefined as any, ['asd'])).toBe(undefined);
  });

  describe('get the nested value in object', () => {
    test('in array', () => {
      const user: User = get(state, ['users', 0]);
      expect(user).toEqual({ id: 156, key: 'asd' });

      const id: number = get(state, ['users', 0, 'id']);
      expect(id).toEqual(156);
    });

    test('in dictionary', () => {
      const dict: Dict = get(state, ['dict']);
      expect(dict).toEqual({
        someId: 'hello',
        someOther: 132,
      });

      const id: string | number = get(state, ['dict', 'someId']);
      expect(id).toBe('hello');
    });

    test('get up to 5 levels', () => {
      const get1: { b: { c: { d: { e: string } } } } = get(state, ['a']);
      expect(get1).toEqual({ b: { c: { d: { e: '123' } } } });

      const get2: { c: { d: { e: string } } } = get(state, ['a', 'b']);
      expect(get2).toEqual({ c: { d: { e: '123' } } });

      const get3: { d: { e: string } } = get(state, ['a', 'b', 'c']);
      expect(get3).toEqual({ d: { e: '123' } });

      const get4: { e: string } = get(state, ['a', 'b', 'c', 'd']);
      expect(get4).toEqual({ e: '123' });

      const get5: string = get(state, ['a', 'b', 'c', 'd', 'e']);
      expect(get5).toEqual('123');
    });
  });

  test('if object or intermediate path is undefined, returns undefined', () => {
    // type is correct because array type is NOT optional, but returns undefined for non-existent keys
    const badIndex: number = get(state, ['users', 10, 'id']);
    expect(badIndex).toBe(undefined);

    // again correct, because dictionary type is required
    const badId = get(state, ['dict', 'badId']);
    expect(badId).toBe(undefined);
  });

  test('accepts default value', () => {
    const opt: { a: number } | undefined = get(state, ['optional'], { a: 10 });
    expect(opt).toEqual({ a: 10 });
  });

  test('returns nested value (as non optional) when default value is passed', () => {
    const user: User = get(state, ['users', 10], { id: -1, key: 'default' });

    expect(user).toEqual({ id: -1, key: 'default' });
    expect(user.id).toBe(-1);
  });

  test('falsy last value has more priority than defaultValue', () => {
    expect(get({ a: undefined } as any, ['a'], true)).toBe(undefined);
    expect(get({ a: { b: false } }, ['a', 'b'], true)).toBe(false);
    expect(get({ a: { b: null } } as any, ['a', 'b'], true)).toBe(null);
  });

  test('is working correctly for undefinable get with 2 elements', () => {
    interface A {
      [key: string]: { a: number } | undefined;
    }

    const x: Optional<number> = get({} as A, ['k1', 'a']);
    expect(x).toBe(undefined);
  });
});
