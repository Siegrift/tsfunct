import fpUnset from '../fpUnset';
import { State } from './common';

describe('fpUnset', () => {
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
      state = fpUnset<State>()(['users', 0])(state);

      expect(state).toEqual({
        users: [],
        dict: {
          someId: 'hello',
        },
        a: { b: { c: { d: { e: '123' } } } },
      });
    });

    test('in dictionary', () => {
      state = fpUnset<State>()(['dict', 'someId'])(state);

      expect(state).toEqual({
        users: [{ id: 56, key: 'key' }],
        a: { b: { c: { d: { e: '123' } } } },
        dict: {},
      });
    });

    test('fpUnset up to 5 levels', () => {
      const obj = { a: state.a };

      const obj1: {} = fpUnset<typeof obj>()(['a'])(obj);
      expect(obj1).toEqual({});

      const obj2: { a: {} } = fpUnset<typeof obj>()(['a', 'b'])(obj);
      expect(obj2).toEqual({ a: {} });

      const obj3: { a: { b: {} } } = fpUnset<typeof obj>()(['a', 'b', 'c'])(obj);
      expect(obj3).toEqual({ a: { b: {} } });

      const obj4: { a: { b: { c: {} } } } = fpUnset<typeof obj>()(['a', 'b', 'c', 'd'])(obj);
      expect(obj4).toEqual({ a: { b: { c: {} } } });

      const obj5: { a: { b: { c: { d: {} } } } } = fpUnset<typeof obj>()(['a', 'b', 'c', 'd', 'e'])(
        obj
      );
      expect(obj5).toEqual({ a: { b: { c: { d: {} } } } });
    });
  });

  test('is immutable', () => {
    fpUnset<State>()(['a', 'b', 'c', 'd', 'e'])(state);

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

    unsetState = fpUnset<State>()(['users', 3, 'id'])(state);
    expect(unsetState).toEqual(originalState);

    unsetState = fpUnset<State>()(['dict', 'newKey'])(state);
    expect(unsetState).toEqual(originalState);

    unsetState = fpUnset<State>()(['optional'])(state);
    expect(unsetState).toEqual(originalState);
  });
});
