export type Primitive = string | number | boolean | undefined | null
export type DeepReadonly<T> = T extends Primitive ? T : DeepReadonlyObject<T>
export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

export class TsFunct<T> {
  constructor(private _value: T) {}

  get value() {
    return this._value
  }

  apply<NewType>(fn: (value: DeepReadonly<T>) => NewType): TsFunct<NewType> {
    return createTsFunctInstance(fn(this._value as DeepReadonly<T>))
  }
}

const createTsFunctInstance = <T>(value: T) => new TsFunct(value)
export default createTsFunctInstance
