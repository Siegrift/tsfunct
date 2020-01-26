import map from '../map'
import update from '../update'
import filter from '../filter'
import pipe from '../pipe'
import fpSet from '../fpSet'
import fpUpdate from '../fpUpdate'
import fpUnset from '../fpUnset'

interface User {
  name: string
  age: number
}

interface DictValue {
  id: string
  x: number
}

interface State {
  users: User[]
  dict?: { [key: string]: DictValue }
  visible?: boolean
}

describe('update, map and filter', () => {
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

describe('pipe and fp helpers', () => {
  let state: State

  beforeEach(() => {
    state = {
      users: [
        { name: 'Aaaa', age: 12 },
        { name: 'Bbbb', age: 55 },
        { name: 'Cccc', age: 89 },
      ],
      dict: { xxxx: { id: 'xxx', x: 123 } },
      visible: false,
    }
  })

  test('piping fp helpers composes the logic', () => {
    const newState: Pick<State, 'users' | 'dict'> = pipe(
      fpSet<State>()(['dict', 'xxxx'], { id: 'newId', x: 789 }),
      fpUpdate<State>()(['dict', 'xxxx', 'x'], (val) => val! + 1), // to demonstrate left to right execution
      fpUpdate<State>()(['users', 0], (u) => ({
        ...u,
        name: u.name.toUpperCase(),
      })),
      fpUnset<State>()(['users', 2]),
      fpUnset<State>()(['visible']),
    )(state)

    expect(newState).toEqual({
      dict: { xxxx: { id: 'newId', x: 790 } },
      users: [
        { age: 12, name: 'AAAA' },
        { age: 55, name: 'Bbbb' },
      ],
    })
  })
})
