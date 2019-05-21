import { DeepReadonly } from '../types'
import { OptionalContext } from './optionalContext'
import { isNullOrUndefined } from '../utils'

export class ArrayContext<T = unknown> extends OptionalContext<T[]> {
  constructor(_value?: T[]) {
    super(_value)
  }

  map<NewType>(
    fn: (value: DeepReadonly<T>, index: number) => NewType,
  ): ArrayContext<NewType> {
    const value = this.value
    if (isNullOrUndefined(value)) return new ArrayContext<NewType>()

    const res = []
    for (let i = 0; i < value.length; i++) {
      res.push(fn(value[i] as DeepReadonly<T>, i))
    }
    return new ArrayContext(res)
  }

  fill(n: number, initFn: (index: number) => T): this {
    const res = []
    for (let i = 0; i < n; i++) {
      res.push(initFn(i))
    }
    this.setValue(res)

    return this
  }
}
