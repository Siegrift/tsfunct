import { isNullOrUndefined, shallowCopy } from '../common/utils'

const baseUnset = (source: any, path: any[]) => {
  if (isNullOrUndefined(source)) return source

  const returnObject = shallowCopy(source)
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

export default baseUnset
