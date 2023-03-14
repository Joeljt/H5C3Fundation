// Promise 的特点：
// 1、可以通过 new 关键字创建对象，构造器接受一个函数，该函数会立即执行
// 2、有 pending、fulfilled、rejected 三个状态，调用 resolve 以及 reject 方法修改该状态，一旦变更无法再次修改
// 3、then 方法可以接受两个参数，分别对应成功和失败的回调
// 4、then 方法支持链式调用，前一个 then 方法的返回值是下一个 then 方法的成功回调
//    如果返回的是普通值，则直接返回该值；如果返回的是 promise 对象，则会返回该 promise 对象的结果；不能返回自身
//    这就要求 then 的返回值也是 promise 本身，才能保证链式调用

// resolve 或者 reject 方法，可以将普通值包装为 Promise 对象，且该 promise 对象的状态是确定的
// finally 方法可以保证传入的回调无论如何都可以得到执行，同时还能继续链式调用
// catch 方法可以捕获前边所有的报错，实际上只是 then 方法的别名，
// catch 方法可以接住之前所有的报错，是因为 reject 方法有特殊处理，即[如果未设置 error 回调，则继续抛出]的逻辑

const STATUS_PENDING = 'pending';
const STATUS_FULFILLED = 'fulfilled';
const STATUS_REJECTED = 'rejected';

class MyPromise {

  status = STATUS_PENDING;
  value = undefined;
  error = undefined;
  onSuccessCallbackArray = [];
  onFailureCallbackArray = [];

  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  resolve = (value) => {
    if (this.status !== STATUS_PENDING) return;
    this.status = STATUS_FULFILLED;
    this.value = value;
    while (this.onSuccessCallbackArray.length) {
      this.onSuccessCallbackArray.shift()();
    }
  }

  reject = (error) => {
    if (this.status !== STATUS_PENDING) return;
    this.status = STATUS_REJECTED;
    this.error = error;
    while (this.onFailureCallbackArray.length) {
      this.onFailureCallbackArray.shift()();
    }
  }

  then(onSuccess, onFailure) {
    onSuccess = typeof onSuccess === 'function' ? onSuccess : (value) => value;
    onFailure = typeof onFailure === 'function' ? onFailure : (error) => {
      throw error
    };
    const promise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        if (this.status === STATUS_FULFILLED) {
          this.catchException(() => {
            this.checkRecursiveCall(promise, onSuccess(this.value), resolve, reject);
          }, reject);
        } else if (this.status === STATUS_REJECTED) {
          this.catchException(() => {
            this.checkRecursiveCall(promise, onFailure(this.error), resolve, reject);
          }, reject);
        } else {
          this.onSuccessCallbackArray.push(() => {
            this.catchException(() => {
              this.checkRecursiveCall(promise, onSuccess(this.value), resolve, reject);
            }, reject);
          });
          this.onFailureCallbackArray.push(() => {
            this.catchException(() => {
              this.checkRecursiveCall(promise, onFailure(this.error), resolve, reject);
            }, reject);
          });
        }
      }, 0);
    });
    return promise;
  }

  catchException(call, reject) {
    try {
      call();
    } catch (error) {
      reject(error);
    }
  }

  catch(onFailure) {
    return this.then(undefined, onFailure);
  }

  finally(callback) {
    return this.then(value => {
      callback();
      return value;
    }, error => {
      callback();
      throw error;
    })
  }

  static all(array) {
    let result = [];
    let index = 0;
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        if (index === array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < array; i++) {
        let current = array[i];
        if (current instanceof MyPromise) {
          // reject this promise at all if there is one failure
          // otherwise store the result to the result array,
          // resolve this promise after every element in the array is processed.
          current.then(value => addData(i, value), error => reject(error));
        } else {
          addData(i, current);
        }
      }
    });
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }

  static reject(value) {
    if (value instanceof MyPromise) return value.then(undefined, error => {
     throw error;
    });
    return new MyPromise((resolve, reject) => reject(value));
  }

  checkRecursiveCall(promise, thenReturn, resolve, reject) {
    setTimeout(() => {
      try {
        if (promise === thenReturn) {
          return reject('不能自己调自己');
        }
        if (thenReturn instanceof MyPromise) {
          thenReturn.then(resolve, reject);
        } else {
          resolve(thenReturn);
        }
      } catch (error) {
        reject(error);
      }
    }, 0)
  }

}
