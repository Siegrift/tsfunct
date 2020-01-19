import compose from '../compose'

describe('compose', () => {
  it('composes left to right', () => {
    const wrap = (index: number) => (val: string) => `fn${index}(${val})`
    expect(compose(wrap(1), wrap(2), wrap(3))('x')).toBe('fn1(fn2(fn3(x)))')

    expect(
      // NOTE: these are necessary due to TS limitations
      compose(
        (n: number) => n + 2,
        (n: number) => n * 3,
        (n) => n - 5,
      )(7),
    ).toBe(8)
  })

  it('is strongly typed even for unlimited number of functions with same signature', () => {
    type Fn = (x: string) => string
    const f: Fn = (val) => `f(${val})`
    const composed: Fn = compose(f, f, f, f, f, f, f, f, f, f, f, f)

    expect(composed('x')).toBe('f(f(f(f(f(f(f(f(f(f(f(f(x))))))))))))')
  })

  it('is strongly typed for small numbers of heterogeneous functions', () => {
    const f1: (x: number) => string = (val) => `f1(${val})`
    const f2: (x: string) => number = (val) => val.length
    const f3: (x: string) => string = (val) => `f3(${val})`

    const composed: (x: string) => string = compose(f1, f2, f3)
    expect(composed('x')).toBe('f1(5)')
  })

  it('results in TS error if used with many (>10) heterogeneous function signatures', () => {
    const f1: (x: number) => string = (val) => `f1(${val})`
    const f2: (x: string) => number = (val) => val.length
    const f3: (x: string) => string = (val) => `f3(${val})`

    // @ts-ignore TODO: replace with @ts-expect-error. See: https://github.com/Microsoft/TypeScript/issues/29394
    const composed = compose(f1, f2, f3, f1, f1, f1, f1, f1, f1, f1, f1)
    expect(composed('x')).toBe('f1(37)')
  })
})
