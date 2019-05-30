import {
  Nullable,
  Optional,
  OptionalValue,
  Undefinable,
  Without
} from './types'
import { shallowCopy } from './utils'
import { isNullOrUndefined } from 'util'

// create an alias as OptionalValue is too verbose
type U<T> = OptionalValue<T>

// unset return types
type Unset1<T, K1> = Without<T, K1>
type Unset2<T, K1, K2> = {
  [P in keyof T]: P extends K1 ? Unset1<T[P], K2> : T[P]
}
type Unset3<T, K1, K2, K3> = {
  [P in keyof T]: P extends K1 ? Unset2<T[P], K2, K3> : T[P]
}
type Unset4<T, K1, K2, K3, K4> = {
  [P in keyof T]: P extends K1 ? Unset3<T[P], K2, K3, K4> : T[P]
}
type Unset5<T, K1, K2, K3, K4, K5> = {
  [P in keyof T]: P extends K1 ? Unset4<T[P], K2, K3, K4, K5> : T[P]
}

export function unset<T, K1 extends keyof T>(
  obj: Nullable<T>,
  path: [K1],
): Nullable<Unset1<T, K1>>

export function unset<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  obj: Nullable<T>,
  path: [K1, K2],
): Nullable<Unset2<T, K1, K2>>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(obj: Nullable<T>, path: [K1, K2, K3]): Nullable<Unset3<T, K1, K2, K3>>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(
  obj: Nullable<T>,
  path: [K1, K2, K3, K4],
): Nullable<Unset4<T, K1, K2, K3, K4>>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(
  obj: Nullable<T>,
  path: [K1, K2, K3, K4, K5],
): Nullable<Unset5<T, K1, K2, K3, K4, K5>>

export function unset<T, K1 extends keyof T>(
  obj: Undefinable<T>,
  path: [K1],
): Undefinable<Unset1<T, K1>>

export function unset<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  obj: Undefinable<T>,
  path: [K1, K2],
): Undefinable<Unset2<T, K1, K2>>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(obj: Undefinable<T>, path: [K1, K2, K3]): Undefinable<Unset3<T, K1, K2, K3>>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(
  obj: Undefinable<T>,
  path: [K1, K2, K3, K4],
): Undefinable<Unset4<T, K1, K2, K3, K4>>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(
  obj: Undefinable<T>,
  path: [K1, K2, K3, K4, K5],
): Undefinable<Unset5<T, K1, K2, K3, K4, K5>>

export function unset<T, K1 extends keyof T>(
  obj: Optional<T>,
  path: [K1],
): Optional<Unset1<T, K1>>

export function unset<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  obj: Optional<T>,
  path: [K1, K2],
): Optional<Unset2<T, K1, K2>>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(obj: Optional<T>, path: [K1, K2, K3]): Optional<Unset3<T, K1, K2, K3>>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(
  obj: Optional<T>,
  path: [K1, K2, K3, K4],
): Optional<Unset4<T, K1, K2, K3, K4>>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(
  obj: Optional<T>,
  path: [K1, K2, K3, K4, K5],
): Optional<Unset5<T, K1, K2, K3, K4, K5>>

export function unset<T, K1 extends keyof T>(obj: T, path: [K1]): Unset1<T, K1>

export function unset<T, K1 extends keyof T, K2 extends keyof U<T[K1]>>(
  obj: T,
  path: [K1, K2],
): Unset2<T, K1, K2>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>
>(obj: T, path: [K1, K2, K3]): Unset3<T, K1, K2, K3>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>
>(obj: T, path: [K1, K2, K3, K4]): Unset4<T, K1, K2, K3, K4>

export function unset<
  T,
  K1 extends keyof T,
  K2 extends keyof U<T[K1]>,
  K3 extends keyof U<U<T[K1]>[K2]>,
  K4 extends keyof U<U<U<T[K1]>[K2]>[K3]>,
  K5 extends keyof U<U<U<U<T[K1]>[K2]>[K3]>[K4]>
>(obj: T, path: [K1, K2, K3, K4, K5]): Unset5<T, K1, K2, K3, K4, K5>

export function unset(obj: any, path: any[]) {
  if (isNullOrUndefined(obj)) return obj

  const returnObject = shallowCopy(obj)
  let currentObject = returnObject
  let index = 0
  while (index < path.length) {
    if (currentObject[path[index]] === undefined) break
    if (index === path.length - 1) {
      if (Array.isArray(currentObject)) currentObject.splice(path[index], 1)
      else delete currentObject[path[index]]
    } else {
      currentObject[path[index]] = shallowCopy(currentObject[path[index]])
    }
    currentObject = currentObject[path[index]]
    index += 1
  }
  return returnObject
}
