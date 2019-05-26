import { DeepReadonly, Optional } from '../types'
import { OptionalContext } from './optionalContext'
import { map } from '../lib/map'

export class ArrayContext<T = unknown> extends OptionalContext<T[]> {
  constructor(_value?: Optional<T[]>) {
    super(_value)
  }

  map<NewType>(
    fn: (value: DeepReadonly<T>, index: number) => NewType,
  ): ArrayContext<NewType> {
    return new ArrayContext<NewType>(map(this.value, fn))
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

export function arr<T>(value: Optional<T[]>) {
  return new ArrayContext(value)
}
