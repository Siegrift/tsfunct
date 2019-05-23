import { OptionalContext } from './optionalContext'
import { get } from '../lib/get'
import { Optional } from '../types'
import { DefaultContext } from './defaultContext'

export class ObjectContext<T extends object> extends OptionalContext<T> {
  constructor(_value?: Optional<T>) {
    super(_value)
  }

  get<K1 extends keyof T>(key: K1): DefaultContext<T[K1]>
  get<K1 extends keyof T, K2 extends keyof T[K1]>(
    key1: K1,
    key2: K2,
  ): DefaultContext<T[K1][K2]>
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    key1: K1,
    key2: K2,
    key3: K3,
  ): DefaultContext<T[K1][K2][K3]>
  get<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3]
  >(
    obj: T,
    key1: K1,
    key2: K2,
    key3: K3,
    key4: K4,
  ): DefaultContext<T[K1][K2][K3][K4]>
  get<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4]
  >(
    obj: T,
    key1: K1,
    key2: K2,
    key3: K3,
    key4: K4,
    key5: K5,
  ): DefaultContext<T[K1][K2][K3][K4][K5]>
  get(key1?: any, key2?: any, key3?: any, key4?: any, key5?: any): any {
    return new DefaultContext(get(this.value, key1, key2, key3, key4, key5))
  }
}
