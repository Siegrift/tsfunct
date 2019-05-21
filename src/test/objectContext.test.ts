import { ObjectContext } from '../objectContext'

interface User {
  id: number
  key: string
}

interface State {
  users: User[]
  more: { [key: string]: number | string }
}

describe('ObjectContext', () => {
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

  describe('get', () => {
    test('get part of the nested object', () => {
      const context = new ObjectContext(state)
      expect(context.get('users')).toBe(state.users)
      expect(context.get('users', 1)).toBe(state.users[1])
      expect(context.get('users', 1, 'id')).toBe(state.users[1].id)
    })
  })
})
