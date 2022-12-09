export type GoResultSuccess<T> = { data: T; error: undefined; success: true };
export type GoResultError<E extends Error = Error> = { data: undefined; error: E; success: false };
export type GoResult<T, E extends Error = Error> = GoResultSuccess<T> | GoResultError<E>;

export class GoWrappedError extends Error {
  constructor(public reason: unknown) {
    super('' + reason);
  }
}

// This needs to be written using 'function' syntax (cannot be arrow function) See:
// https://github.com/microsoft/TypeScript/issues/34523#issuecomment-542978853
export function assertGoSuccess<T>(result: GoResult<T>): asserts result is GoResultSuccess<T> {
  if (!result.success) {
    throw result.error;
  }
}

// This needs to be written using 'function' syntax (cannot be arrow function) See:
// https://github.com/microsoft/TypeScript/issues/34523#issuecomment-542978853
export function assertGoError<E extends Error>(
  result: GoResult<any, E>
): asserts result is GoResultError<E> {
  if (result.success) {
    throw new Error('Assertion failed. Expected error, but no error was thrown');
  }
}

export const success = <T>(value: T): GoResultSuccess<T> => {
  return { success: true, data: value, error: undefined };
};

// We allow the consumer to type which error is returned. The "err" parameter has weaker type ("Error") to accommodate
// for a generic error thrown by the go functions.
export const fail = <E extends Error>(err: Error): GoResultError<E> => {
  return { success: false, data: undefined, error: err as E };
};

const createGoError = <E extends Error>(err: unknown): GoResultError<E> => {
  if (err instanceof Error) return fail(err);
  return fail(new GoWrappedError(err));
};

export const goSync = <T, E extends Error>(fn: () => T): GoResult<T, E> => {
  try {
    return success(fn());
  } catch (err) {
    return createGoError(err) as GoResultError<E>;
  }
};

const cancellableTimeout = (ms: number) => {
  let rejectFn: any;
  let timeoutId: any;
  const promise = new Promise((_, reject) => {
    rejectFn = reject;
    timeoutId = setTimeout(() => reject('Operation timed out'), ms);
  });

  const cancel = () => {
    clearTimeout(timeoutId);
    rejectFn();
  };

  return {
    promise,
    cancel,
  };
};

export interface GoAsyncOptions {
  timeoutMs: number;
}

export const go = async <T, E extends Error>(
  fn: () => Promise<T>,
  options?: GoAsyncOptions
): Promise<GoResult<T, E>> => {
  try {
    if (!options?.timeoutMs) return success(await fn());
    else {
      const timeout = cancellableTimeout(options.timeoutMs);
      const result = await Promise.race([fn(), timeout.promise]);
      timeout.cancel();
      return success(result as T);
    }
  } catch (err) {
    return createGoError(err) as GoResultError<E>;
  }
};
