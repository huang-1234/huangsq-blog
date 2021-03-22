
# Promise of long


```js
const Pending = 'pending'
const Resolved = 'resolved'
const Rejected = 'rejected'
// 创建三个常量表示状态

function myPromise(fn) {
  const that = this
  that.state = Pending
  that.value = null // value 变量用于保存 resolve 或者 reject 中传入的值
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []
  // resolvedCallbacks 和 rejectedCallbacks 用于保存 then 中的回调，因为当执行完 Promise 时状态可能还是等待中，这时候应该把 then 中的回调保存起来用于状态改变时使用

  function resolve(value) {
    if (value instanceof myPromise) { // 首先需要判断传入的值是否为 Promise 类型
      return value.then(resolve, reject) // 那么就执行它的 then 方法
    }
    setTimeout(() => { // 为了保证函数执行顺序，需要将函数体代码使用 setTimeout 包裹起来
      if (that.state === Pending) { // 判断当前状态是否为等待
        that.state = Resolved
        that.value = value // 将当前状态更改为对应状态，并且将传入的值赋值给 value
        that.resolvedCallbacks.map((cb) => cb(that.value)) // 遍历回调数组并执行
      }
    }, 0)
  }

  function reject(value) {
    setTimeout(() => {
      if (that.state === Pending) { // 判断当前状态是否为等待
        that.state = Rejected
        that.value = value // 将当前状态更改为对应状态，并且将传入的值赋值给 value
        that.rejectedCallbacks.map((cb) => cb(that.value)) // 遍历回调数组并执行
      }
    }, 0)
  }

  try {
    fn(resolve, reject) // 执行传入的函数
  } catch (e) {
    reject(e)
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  // 参数不是函数类型时，需要创建一个函数赋值给对应的参数，同时也实现了透传
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (e) => {
          throw e
        }
  // 如果状态是等待态的话，就往回调函数中 push 函数
  if (that.state === Pending) {
    return (promise2 = new myPromise((resolve, reject) => { 
      // 返回了一个新的 Promise 对象，并在 Promise 中传入了一个函数
      that.resolvedCallbacks.push(() => {
        try { // 执行 onFulfilled 或者 onRejected 函数时会返回一个 x，并且执行 Promise 解决过程，
          const x = onFulfilled(that.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
      that.rejectedCallbacks.push(() => {
        try {
          const x = onRejected(that.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
  // 当状态不是等待态时，就去执行相对应的函数
  if (that.state === Resolved) {
    // onFulfilled(that.value)
    return (promise2 = new myPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(that.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0)
    }))
  }

  if (that.state === Rejected) {
    // onRejected(that.value)
    return (promise2 = new myPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onRejected(that.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0)
    }))
  }

  function resolutionProcedure(promise2, x, resolve, reject) {
    // 规范规定了 x 不能与 promise2 相等，这样会发生循环引用的问题，
    if (promise2 === x) {
      return reject(new TypeError('Error'))
    }
	// 需要判断 x 的类型
    // 如果 x 为 Promise 的话：
    // 如果 x 处于等待态，Promise 需保持为等待态直至 x 被执行或拒绝
    // 如果 x 处于其他状态，则用相同的值处理 Promise
    if (x instanceof myPromise) {
      x.then(function (value) {
        resolutionProcedure(promise2, value, resolve, reject)
      }, reject)
    }

    let called = false // 创建一个变量 called 用于判断是否已经调用过函数
    // 判断 x 是否为对象或者函数，如果都不是的话，将 x 传入 resolve 中
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) { 
      try {
        // 如果 x 是对象或者函数的话，先把 x.then 赋值给 then，
        // 然后判断 then 的类型，如果不是函数类型的话，就将 x 传入 resolve 中
        let then = x.then
        // 如果 then 是函数类型的话，就将 x 作为函数的作用域 this 调用之，并且传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise，两个回调函数都需要判断是否已经执行过函数，然后进行相应的逻辑
        if (typeof then === 'function') {
          then.call(
            x,
            (y) => {
              if (called) return
              called = true
              resolutionProcedure(promise2, y, resolve, reject)
            },
            (e) => { // 如果抛错了，将错误传入 reject 函数中
              if (called) return
              called = true
              reject(e)
            }
          )
        } else {
          resolve(x)
        }
      } catch (e) {
        if(called) return 
        called = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  }
}

new myPromise((resolve, reject) => {
  resolve(444)
}).then().then((value) => {
  console.log(value)
})
```