import { map } from '../lib/map'
import { update } from '../lib/update'
import { filter } from '../lib/filter'

interface User {
  name: string
  age: number
}

interface State {
  users: User[]
}

describe('integration', () => {
  let state: State

  beforeEach(() => {
    state = {
      users: [
        { name: 'Aaaa', age: 12 },
        { name: 'Bbbb', age: 55 },
        { name: 'Cccc', age: 89 },
      ],
    }
  })

  test('update, map, filter', () => {
    const newState = update(state, ['users'], (users) => {
      const young = filter(users, (user) => user.age < 60)
      return map(young, (user) => ({ ...user, age: 18 }))
    })

    expect(newState).toEqual({
      users: [
        { name: 'Aaaa', age: 18 },
        { name: 'Bbbb', age: 18 },
      ],
    })
  })
})
