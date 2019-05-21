import { ArrayContext } from '../arrayContext'

describe('ArrayContext', () => {
  describe('map', () => {
    test('maps each element of an array with a function', () => {
      const a = [1, 2, 3]
      const context = new ArrayContext(a)

      expect(context.map((val) => val * 2).value).toEqual([2, 4, 6])
    })
  })

  describe('fill', () => {
    test('fills the array with number of elements with custom fn', () => {
      const context = new ArrayContext()
      expect(context.fill(3, (i) => i * 2).value).toEqual([0, 2, 4])
    })
  })
})
