import { OptionalContext } from './optionalContext'
import { _get } from '../lib/get'
import { Optional } from '../types'

export class ObjectContext<T extends object> extends OptionalContext<T> {
  constructor(_value?: Optional<T>) {
    super(_value)
  }

  get<K1 extends keyof T>(key: K1): T[K1]
  get<K1 extends keyof T, K2 extends keyof T[K1]>(
    key1: K1,
    key2: K2,
  ): T[K1][K2]
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    key1: K1,
    key2: K2,
    key3: K3,
  ): T[K1][K2][K3]
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    key1?: K1,
    key2?: K2,
    key3?: K3,
  ) {
    return _get(this.value, key1, key2, key3)
  }
}
