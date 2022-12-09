export function isNullOrUndefined(arg: any): arg is null | undefined {
  return arg === null || arg === undefined;
}

export function isObject(value: any): boolean {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

export function shallowCopy(value: any, defaultValue?: any) {
  const _default = defaultValue === undefined ? value : defaultValue;
  // because (typeof null === "object")
  if (value === null) return _default;

  if (Array.isArray(value)) return [...value];
  if (isObject(value)) return { ...value };
  return _default;
}
