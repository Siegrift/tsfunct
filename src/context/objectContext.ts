import { OptionalContext } from './optionalContext'
import { get } from '../lib/get'
import { Optional, OptionalValueType } from '../types'
import { DefaultContext } from './defaultContext'

// create an alias as OptionalValueType is too verbose
type U<T> = OptionalValueType<T>

export class ObjectContext<T extends object> extends OptionalContext<T> {
  constructor(_value?: Optional<T>) {
    super(_value)
  }

  get<K1 extends keyof T>(
    keys: [K1],
    defaultValue?: T[K1],
  ): DefaultContext<T[K1]>
  get<K1 extends keyof T, K2 extends keyof U<T[K1]>>(
    keys: [K1, K2],
    defaultValue?: U<T[K1]>[K2],
  ): DefaultContext<U<T[K1]>[K2]>
  get<
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>
  >(
    keys: [K1, K2, K3],
    defaultValue?: U<U<T[K1]>[K2]>[K3],
  ): DefaultContext<U<U<T[K1]>[K2]>[K3]>
  get<
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
  >(
    keys: [K1, K2, K3, K4],
    defaultValue?: U<U<U<T[K1]>[K2]>[K3]>[K4],
  ): DefaultContext<U<U<U<T[K1]>[K2]>[K3]>[K4]>

  get<
    K1 extends keyof T,
    K2 extends keyof U<T[K1]>,
    K3 extends keyof U<U<T[K1]>[K2]>,
    K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
    K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
  >(
    keys: [K1, K2, K3, K4, K5],
    defaultValue?: U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5],
  ): DefaultContext<U<U<U<U<T[K1]>[K2]>[K3]>[K4]>[K5]>
  get(keys: any, defaultValue: any): any {
    return new DefaultContext(get(this.value, keys, defaultValue))
  }
}
