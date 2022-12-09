import unset from '../unset';
import { State } from './common';

describe('unset', () => {
  let state: State;

  beforeEach(() => {
    state = {
      users: [{ id: 56, key: 'key' }],
      dict: {
        someId: 'hello',
      },
      a: { b: { c: { d: { e: '123' } } } },
    };
  });

  describe('(immutably) remove value in source object', () => {
    test('in array', () => {
      state = unset(state, ['users', 0]);

      expect(state).toEqual({
        users: [],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      });
    });

    test('in dictionary', () => {
      state = unset(state, ['dict', 'someId']);

      expect(state).toEqual({
        users: [{ id: 56, key: 'key' }],
        a: { b: { c: { d: { e: '123' } } } },
        dict: {},
      });
    });

    test('unset up to 5 levels', () => {
      const obj = { a: state.a };

      const obj1: {} = unset(obj, ['a']);
      expect(obj1).toEqual({});

      const obj2: { a: {} } = unset(obj, ['a', 'b']);
      expect(obj2).toEqual({ a: {} });

      const obj3: { a: { b: {} } } = unset(obj, ['a', 'b', 'c']);
      expect(obj3).toEqual({ a: { b: {} } });

      const obj4: { a: { b: { c: {} } } } = unset(obj, ['a', 'b', 'c', 'd']);
      expect(obj4).toEqual({ a: { b: { c: {} } } });

      const obj5: { a: { b: { c: { d: {} } } } } = unset(obj, ['a', 'b', 'c', 'd', 'e']);
      expect(obj5).toEqual({ a: { b: { c: { d: {} } } } });
    });
  });

  test('is immutable', () => {
    unset(state, ['a', 'b', 'c', 'd', 'e']);

    expect(state).toBe(state);
  });

  test("if path doesn't exist, returns object", () => {
    let unsetState = state;
    const originalState = {
      users: [{ id: 56, key: 'key' }],
      dict: {
        someId: 'hello',
      },
      a: { b: { c: { d: { e: '123' } } } },
    };

    expect(unset(null as any, ['key'])).toEqual(null);
    expect(unset(undefined as any, ['key'])).toEqual(undefined);

    unsetState = unset(state, ['users', 3, 'id']);
    expect(unsetState).toEqual(originalState);

    unsetState = unset(state, ['dict', 'newKey']);
    expect(unsetState).toEqual(originalState);

    unsetState = unset(state, ['optional']);
    expect(unsetState).toEqual(originalState);
  });
});
