export function isNullOrUndefined(arg: any): arg is null | undefined {
  return arg === null || arg === undefined
}
