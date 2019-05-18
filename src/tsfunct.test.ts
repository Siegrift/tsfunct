import F from './tsfunct'
interface Test {
  a: boolean
  b: number
  c: {
    d: string;
  }
}

test('create tsfunct class from value and get raw value with same type', () => {
  const obj: Test = { a: true, b: 1, c: { d: 'str' } }
  // verify that type is correct
  const value: Test = F(obj).value
  expect(value).toBe(obj)
})

test('maps the readonly value to anything', () => {
  const obj: Test = { a: true, b: 1, c: { d: 'str' } }
  const value: number = F(obj).apply((val) => val.b + 10).value
  expect(value).toBe(11)
})
