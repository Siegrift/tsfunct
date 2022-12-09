export interface User {
  id: number;
  key: string;
}

export interface Dict {
  [key: string]: number | string;
}

export interface State {
  users: User[];
  dict: Dict;
  optional?: { a: number };
  a: { b: { c: { d: { e: string } } } };
}

export const idFn = (x: any) => x;
