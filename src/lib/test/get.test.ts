import { get } from '../get'

interface User {
  id: number
  key: string
}

interface State {
  users: User[]
  more: { [key: string]: number | string }
}

describe('get', () => {
  let state: State

  beforeEach(() => {
    state = {
      users: [
        { id: 156, key: 'asd' },
        { id: 56, key: 'hjghj' },
        { id: 78978, key: 'opi' },
      ],
      more: {
        someId: 'hello',
        someOther: 132,
      },
    }
  })

  test('get the nested value in object', () => {
    expect(get(state, 'more')).toEqual({
      someId: 'hello',
      someOther: 132,
    })
    expect(get(state, 'users', 0)).toEqual({ id: 156, key: 'asd' })
    expect(get(state, 'users', 0, 'id')).toEqual(156)
  })

  test('if object or intermidiate path is undefined, returns undefined', () => {
    expect(get(state, 'users', 10, 'id')).toBe(undefined)
    expect(get(state, 'more', 'badId')).toBe(undefined)
  })

  test('if object is null or undefined, returns undefined', () => {
    expect(get(null as any, 'asd')).toBe(undefined)
  })
})
