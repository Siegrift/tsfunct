import { isObject, shallowCopy } from '../common/utils';

const baseSet = (source: any, path: any, value: any) => {
  const returnObject = shallowCopy(source, Number.isInteger(path[0]) ? [] : {});
  let currentObject = returnObject;
  let index = 0;
  while (index < path.length) {
    if (!Array.isArray(currentObject[path[index]]) && !isObject(currentObject[path[index]])) {
      currentObject[path[index]] = Number.isInteger(path[index + 1]) ? [] : {};
    }
    if (index === path.length - 1) currentObject[path[index]] = value;
    else {
      currentObject[path[index]] = shallowCopy(currentObject[path[index]]);
    }
    currentObject = currentObject[path[index]];
    index += 1;
  }
  return returnObject;
};

export default baseSet;
