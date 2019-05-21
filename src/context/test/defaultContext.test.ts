import { DefaultContext } from '../defaultContext'

describe('DefaultContext', () => {
  describe('value property', () => {
    test('returns the (readonly) value wrapped in the context', () => {
      const value = 'str'
      const context = new DefaultContext(value)

      expect(context.value).toBe(value)
    })
  })

  describe('transform', () => {
    test('tranforms the value in context with custom function', () => {
      const value = 'str'
      const context = new DefaultContext(value)
      const fn = () => 123

      expect(context.transform(fn)).toBe(123)
      expect(context.value).toBe('str')
    })
  })
})
