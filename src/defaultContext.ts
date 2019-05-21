import { DeepReadonly } from './types'

export class DefaultContext<T = unknown> {
  constructor(private _value: T) {}

  public get value() {
    return this._value
  }

  protected setValue(newValue: T) {
    this._value = newValue
  }

  transform<NewType>(fn: (value: DeepReadonly<T>) => NewType): NewType {
    return fn(this.value as DeepReadonly<T>)
  }
}
