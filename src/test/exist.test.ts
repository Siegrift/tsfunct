import exist from '../exist';

describe('exist', () => {
  let obj: { a: string[]; b: { [key: string]: boolean }; c?: { d: string } };

  beforeEach(() => {
    obj = { a: ['x', 'y'], b: { c: true } };
  });

  test('returns whether the path exists on the object', () => {
    expect(exist(obj, ['a'])).toBe(true);
    expect(exist(obj, ['a', 0])).toBe(true);
    expect(exist(obj, ['b', 'c'])).toBe(true);

    expect(exist(obj as any, ['nonExistent'])).toBe(false);
    expect(exist(obj, ['a', 2])).toBe(false);
    expect(exist(obj, ['b', 'd'])).toBe(false);
  });

  test('handles case when the path exists, but value is falsy', () => {
    expect(exist({ a: undefined } as any, ['a'])).toBe(true);
    expect(exist({ a: { b: false } }, ['a', 'b'])).toBe(true);
    expect(exist({ a: { b: null } } as any, ['a', 'b'])).toBe(true);
  });

  test('when object is null or undefined, returns false', () => {
    expect(exist(null as any, ['a'])).toBe(false);
    expect(exist(undefined as any, ['a'])).toBe(false);
  });

  test('works on optional structures', () => {
    expect(exist(obj, ['c', 'd'])).toBe(false);
  });
});
