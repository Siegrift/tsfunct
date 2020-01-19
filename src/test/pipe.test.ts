import pipe from '../pipe'

describe('pipe', () => {
  it('composes left to right', () => {
    const wrap = (index: number) => (val: string) => `fn${index}(${val})`
    expect(pipe(wrap(1), wrap(2), wrap(3))('x')).toBe('fn3(fn2(fn1(x)))')

    expect(
      pipe(
        (n) => n + 2,
        (n) => n * 3,
        (n) => n - 5,
      )(7),
    ).toBe(22)
  })

  it('is strongly typed even for unlimited number of functions with same signature', () => {
    type Fn = (x: string) => string
    const f: Fn = (val) => `f(${val})`
    const piped: Fn = pipe(f, f, f, f, f, f, f, f, f, f, f)

    expect(piped('x')).toBe('f(f(f(f(f(f(f(f(f(f(f(x)))))))))))')
  })

  it('is strongly typed for small numbers of heterogeneous functions', () => {
    const f1: (x: string) => string = (val) => `f1(${val})`
    const f2: (x: string) => number = (val) => val.length
    const f3: (x: number) => string = (val) => `f3(${val})`

    const piped: (x: string) => string = pipe(f1, f2, f3)
    expect(piped('x')).toBe('f3(5)')
  })

  it('results in TS error if used with many (>10) heterogeneous function signatures', () => {
    const f1: (x: string) => string = (val) => `f1(${val})`
    const f2: (x: string) => number = (val) => val.length
    const f3: (x: number) => string = (val) => `f3(${val})`

    // @ts-ignore TODO: replace with @ts-expect-error. See: https://github.com/Microsoft/TypeScript/issues/29394
    const piped = pipe(f1, f2, f3, f1, f1, f1, f1, f1, f1, f1, f1)
    expect(piped('x')).toBe('f1(f1(f1(f1(f1(f1(f1(f1(f3(5)))))))))')
  })
})
