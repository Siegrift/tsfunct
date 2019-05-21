import { OptionalContext } from './optionalContext'
import { isNullOrUndefined } from './utils'

export class ObjectContext<T extends object> extends OptionalContext<T> {
  constructor(_value?: T) {
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
    const value = this.value
    if (isNullOrUndefined(value)) return this

    if (key1 === undefined) return value
    else if (key2 === undefined) return value[key1]
    else if (key3 === undefined) return value[key1][key2]
    else return value[key1][key2][key3]
  }
}
