import { OptionalContext } from '../optionalContext'

describe('OptionalContext', () => {
  describe('hasValue', () => {
    test('returns true when the value is not null or undefined, false otherwise', () => {
      const nullContext = new OptionalContext<string>(null)
      const valueContext = new OptionalContext<string>('str')

      expect(nullContext.hasValue()).toBe(false)
      expect(valueContext.hasValue()).toBe(true)
    })
  })
})
