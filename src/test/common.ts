export interface User {
  id: number
  key: string
}

export interface State {
  users: User[]
  dict: { [key: string]: number | string }
  optional?: { a: number }
  a: { b: { c: { d: { e: string } } } }
}

export const idFn = (x: any) => x
