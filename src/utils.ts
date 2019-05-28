export function isNullOrUndefined(arg: any): arg is null | undefined {
  return arg === null || arg === undefined
}

export function shallowCopy(value: any, defaultValue?: any) {
  if (Array.isArray(value)) return [...value]
  if (typeof value === 'object') return { ...value }
  return defaultValue === undefined ? value : defaultValue
}
