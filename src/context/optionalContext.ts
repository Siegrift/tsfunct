import { Optional } from '../types'
import { DefaultContext } from './defaultContext'

export class OptionalContext<T = unknown> extends DefaultContext<Optional<T>> {
  constructor(value?: Optional<T>) {
    super(value)
  }

  hasValue(): boolean {
    return this.value !== null && this.value !== undefined
  }
}
