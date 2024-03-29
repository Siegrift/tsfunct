import {
  go,
  goSync,
  success,
  fail,
  assertGoSuccess,
  assertGoError,
  GoWrappedError,
} from '../src/go';
import { expectType, expectNotAssignable } from 'tsd';

const resolveAfter = <T>(ms: number, value?: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value as T), ms));
const rejectAfter = <T>(ms: number, value?: T): Promise<never> =>
  new Promise((_, reject) => setTimeout(() => reject(value), ms));

describe('basic goSync usage', () => {
  it('resolves successful synchronous functions', () => {
    const res = goSync(() => 2 + 2);
    expect(res).toEqual(success(4));
    expect(res).toEqual({ success: true, data: 4 });
  });

  it('resolves unsuccessful synchronous functions', () => {
    const err = new Error('Computer says no');
    const res = goSync(() => {
      throw err;
    });
    expect(res).toEqual(fail(err));
    expect(res).toEqual({ success: false, error: err });
  });
});

describe('basic go usage', () => {
  it('resolves successful asynchronous functions', async () => {
    const successFn = new Promise((res) => res(2));
    const res = await go(() => successFn);
    expect(res).toEqual(success(2));
  });

  it('resolves unsuccessful asynchronous functions', async () => {
    const err = new Error('Computer says no');
    const errorFn = new Promise((_res, rej) => rej(err));
    const res = await go(() => errorFn);
    expect(res).toEqual(fail(err));
  });

  it('resolves asynchronous functions which throws', async () => {
    const err = new Error('Computer says no');
    const errorFn = new Promise(() => {
      throw err;
    });
    const res = await go(() => errorFn);
    expect(res).toEqual(fail(err));
  });

  describe('uniformness', () => {
    it('goSync', () => {
      const { success, error, data } = goSync(() => 123);

      expectType<number | undefined>(data);
      expectType<Error | undefined>(error);
      if (success) {
        expectType<number>(data);
        expectType<undefined>(error);
      }
    });

    it('go', async () => {
      const { success, error, data } = await go(() => Promise.resolve(123));

      expectType<number | undefined>(data);
      expectType<Error | undefined>(error);
      if (success) {
        expectType<number>(data);
        expectType<undefined>(error);
      }
    });
  });

  it('resolves on sync errors as well', async () => {
    const obj = {} as any;
    const res = await go(() => obj.nonExistingFunction());
    expect(res).toEqual(fail(new TypeError('obj.nonExistingFunction is not a function')));
  });

  // This is not an issue of promise utils library since the error is thrown before the value is
  // passed as an argument to the go function. There is nothing we can do about it.
  it('throws on sync usage without callback', async () => {
    const obj = {} as any;
    expect(() => go(obj.nonExistingFunction())).toThrow(
      new TypeError('obj.nonExistingFunction is not a function')
    );
  });

  it('accepts a sync function if the return type is never', async () => {
    const err = new Error('asd');
    const res = await go(() => {
      throw err;
    });
    expect(res).toEqual(fail(err));
  });

  it('allows to specify the type of the returned value', async () => {
    const goResOnlyData = await go<string | number>(() => {
      return Promise.resolve(123);
    });
    assertGoSuccess(goResOnlyData);
    expectType<string | number>(goResOnlyData.data);

    class CustomError extends Error {}
    const goResBoth = await go<string | number, CustomError>(() => {
      return Promise.resolve(123);
    });
    assertGoSuccess(goResBoth);
    expectType<string | number>(goResBoth.data);
  });
});

describe('basic timeout usage', () => {
  const operations = {
    successFn: () => resolveAfter(10, 2),
    errorFn: () => rejectAfter(10, new Error('Computer says no')),
  };

  it('resolves successful asynchronous functions within the timout limit', async () => {
    const res = await go(operations.successFn, { timeoutMs: 20 });
    expect(res).toEqual(success(2));
  });

  it('resolves unsuccessful asynchronous functions within the timout limit', async () => {
    const res = await go(operations.errorFn, { timeoutMs: 20 });
    expect(res).toEqual(fail(new Error('Computer says no')));
  });

  it('resolves timed out asynchronous functions', async () => {
    const res = await go(operations.successFn, { timeoutMs: 5 });
    expect(res).toEqual(fail(new Error('Operation timed out')));
  });
});

describe('custom error type', () => {
  class CustomError extends Error {
    custom: string;

    constructor(message: string) {
      super(message);
      this.custom = '123';
    }
  }

  describe('goSync', () => {
    it('error handling', () => {
      const goRes = goSync(() => {
        throw new CustomError('custom');
      });
      assertGoError(goRes);
      const err = goRes.error;

      expectType<Error>(err);
      expectNotAssignable<CustomError>(typeof err);
      expect(err instanceof CustomError).toBe(true);
    });

    it('can specify custom error type', () => {
      const goRes = goSync<never, CustomError>(() => {
        throw new CustomError('custom');
      });
      assertGoError(goRes);
      const err = goRes.error;

      expectType<CustomError>(err);
      expect(err instanceof CustomError).toBe(true);
    });

    it('will wraps non error throw in Error class', () => {
      const goRes = goSync(() => {
        throw 'string-error';
      });
      assertGoError(goRes);
      const err = goRes.error;

      expectType<Error>(err);
      expect(err instanceof Error).toBe(true);
    });
  });

  describe('go', () => {
    it('error handling', async () => {
      const goRes = await go(() => {
        throw new CustomError('custom');
      });
      assertGoError(goRes);
      const err = goRes.error;

      expectType<Error>(err);
      expectNotAssignable<CustomError>(typeof err);
      expect(err instanceof CustomError).toBe(true);
    });

    it('can specify custom error type', async () => {
      const goRes = await go<never, CustomError>(() => {
        throw new CustomError('custom');
      });
      assertGoError(goRes);
      const err = goRes.error;

      expectType<CustomError>(err);
      expect(err instanceof CustomError).toBe(true);
    });

    it('will wraps non error throw in Error class', async () => {
      const goRes = await go(() => {
        throw 'string-error';
      });
      assertGoError(goRes);
      const err = goRes.error;

      expectType<Error>(err);
      expect(err instanceof Error).toBe(true);
    });
  });
});

describe('the "this" limitation', () => {
  class Test {
    constructor() {}
    sync() {
      return this._sync();
    }
    _sync() {
      return '123';
    }

    async() {
      return this._async();
    }
    _async() {
      return Promise.resolve('123');
    }
  }

  // The error message for when reading a property of undefined has changed between major node versions
  const expectReadPropertyOfUndefined = (res: unknown, prop: string) => {
    // process.version returns the version as the string: 'v[major].[minor].[patch]'
    const majorVersion = process.version.split('.')[0]!.substring(1);
    if (Number(majorVersion) >= 16) {
      expect(res).toEqual(
        fail(new TypeError(`Cannot read properties of undefined (reading '${prop}')`))
      );
    } else {
      expect(res).toEqual(fail(new TypeError(`Cannot read property '${prop}' of undefined`)));
    }
  };

  it('fails for sync version', () => {
    const test = new Test();

    const res = goSync(test.sync);

    expectReadPropertyOfUndefined(res, '_sync');
  });

  it('fails for async version', async () => {
    const test = new Test();

    const res = await go(test.async);

    expectReadPropertyOfUndefined(res, '_async');
  });
});

describe('assertGoSuccess', () => {
  it('works for success', () => {
    const res = goSync(() => 123);

    assertGoSuccess(res);

    // The "data" property should now be inferred since the success was asserted
    const data = res.data;
    expect(data).toBe(data);
  });

  it('works for failure (rethrows the go error)', () => {
    const res = goSync(() => {
      throw new Error('my bad');
    });

    expect(() => assertGoSuccess(res)).toThrow('my bad');
  });
});

describe('assertGoError', () => {
  it('works for success', () => {
    const res = goSync(() => 123);

    expect(() => assertGoError(res)).toThrow(
      'Assertion failed. Expected error, but no error was thrown'
    );
  });

  it('works for failure', () => {
    const res = goSync(() => {
      throw new Error('error');
    });

    assertGoError(res);

    // The "error" property should now be inferred since the success was asserted
    const err = res.error;
    expect(err).toBe(err);
  });
});

it('has access to native error', async () => {
  const throwingFn = async () => {
    throw { message: 'an error', data: 'some data' };
  };

  const goRes = await go<Promise<never>, GoWrappedError>(throwingFn);

  assertGoError(goRes);
  // The error message is the  not very useful stringified data
  expect(goRes.error).toEqual(new Error('[object Object]'));
  expect(goRes.error instanceof GoWrappedError).toBeTruthy();
  expect(goRes.error.reason).toEqual({ message: 'an error', data: 'some data' });
});

describe('documentation snippets are valid', () => {
  const fetchData = (_path: string) => {
    if (_path.startsWith('throw')) return Promise.reject('unexpected error');
    return Promise.resolve('some data');
  };

  it('success usage', async () => {
    const goFetchData = await go(() => fetchData('users'));
    if (goFetchData.success) {
      const data = goFetchData.data;

      expectType<string>(data);
      expect(data).toBe('some data');
    }
  });

  it('error usage', async () => {
    const goFetchData = await go(() => fetchData('throw'));
    if (!goFetchData.success) {
      const error = goFetchData.error;

      expect(error).toEqual(new Error('unexpected error'));
    }
  });

  it('sync usage', () => {
    const someData = { key: 123 };
    const parseData = (rawData: typeof someData) => ({ ...rawData, parsed: true });
    const goParseData = goSync(() => parseData(someData));
    if (goParseData.success) {
      const data = goParseData.data;

      expect(data.parsed).toBe(true);
    }
  });

  it('shows limitation', () => {
    class MyClass {
      constructor() {}
      get() {
        return this._get();
      }
      _get() {
        return '123';
      }
    }

    const myClass = new MyClass();
    const resWorks = goSync(() => myClass.get()); // This works
    assertGoSuccess(resWorks);
    const resFails = goSync(myClass.get); // This doesn't work
    assertGoError(resFails);
  });

  it('verbosity of try catch', async () => {
    class MyError extends Error {
      reason: string;
      constructor(m: string) {
        super(m);
        this.reason = m;
      }
    }
    const someAsyncCall = () => Promise.reject(new MyError('custom error'));
    const logError = (mess: string) => expect(mess).toEqual(expect.any(String));

    // Verbose try catch
    try {
      const data = await someAsyncCall();
      expectType<never>(data); // The function above should throw
    } catch (e) {
      return logError((e as MyError).reason);
    }

    // Compare it to simpler version using go
    type MyData = Promise<never>;
    const goRes = await go<MyData, MyError>(someAsyncCall);
    if (!goRes.success) return logError(goRes.error.reason);
    // At this point TypeScript infers that the error was handled and goRes must be a success response
    const data = goRes.data;
    expectType<MyData>(data);
  });

  it('handles nested promises correctly', async () => {
    const x = Promise.resolve('123') as any as Promise<Promise<string>>;

    const goRes = await go(() => x);
    assertGoSuccess(goRes);

    expectType<string>(goRes.data);
  });
});
