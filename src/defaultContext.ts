import { DeepReadonly } from './types'

export class DefaultContext<T> {
  constructor(private _value: T) {}

  public get value() {
    return this._value
  }

  transform<NewType>(fn: (value: DeepReadonly<T>) => NewType): NewType {
    return fn(this.value as DeepReadonly<T>)
  }
}
