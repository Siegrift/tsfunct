import { ArrayContext } from '../arrayContext'

describe('ArrayContext', () => {
  describe('map', () => {
    test('maps each element of an array with a function', () => {
      const a = [1, 2, 3]
      const context = new ArrayContext(a)

      expect(context.map((val) => val * 2).value).toEqual([2, 4, 6])
    })
  })
})
