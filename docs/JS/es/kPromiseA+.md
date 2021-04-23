# Promise/A+规范&实现参考

## 1. Promise/A+规范

翻译：

Promise表示一个异步操作的最终结果。与Promise最主要的交互方法是通过将函数传入它的then方法从而获取得Promise最终的值或Promise最终最拒绝（reject）的原因。

### 1. 术语

`promise`是一个包含了兼容promise规范then方法的对象或函数，
`thenable` 是一个包含了then方法的对象或函数。
`value` 是任何Javascript值。 (包括 undefined, thenable, promise等).
`exception` 是由`throw`表达式抛出来的值。
`reason` 是一个用于描述Promise被拒绝原因的值。

### 2. 要求

### 2.1 Promise状态

一个Promise必须处在其中之一的状态：pending, fulfilled 或 rejected.

- 如果是pending状态,则promise：
  - 可以转换到fulfilled或rejected状态。
- 如果是fulfilled状态,则promise：
  - 不能转换成任何其它状态。
  - 必须有一个值，且这个值不能被改变。
- 如果是rejected状态,则promise可以：
  - 不能转换成任何其它状态。
  - 必须有一个原因，且这个值不能被改变。

”值不能被改变”指的是其identity不能被改变，而不是指其成员内容不能被改变。

### 2.2 `then` 方法

一个Promise必须提供一个then方法来获取其值或原因。
Promise的then方法接受两个参数：

promise.then(onFulfilled, onRejected)

1. onFulfilled,onRejected 都是可选参数：

   1. 如果`onFulfilled`不是一个函数，则忽略之。
   2. 如果`onRejected`不是一个函数，则忽略之。

2. 如果onFulfilled是一个函数:

   1. 它必须在`promise` fulfilled后调用， 且`promise`的value为其第一个参数。
   2. 它不能在`promise` fulfilled前调用。
   3. 不能被多次调用。

3. 如果

> onRejected是一个函数,

   1. 它必须在`promise` rejected后调用， 且`promise`的reason为其第一个参数。
   2. 它不能在`promise` rejected前调用。
   3. 不能被多次调用。

4. `onFulfilled` 和 `onRejected` 只允许在 [execution context](https://es5.github.io/#x10.3) 栈仅包含平台代码时运行. [3.1].

5. `onFulfilled` 和 `onRejected` 必须被当做函数调用 (i.e. 即函数体内的 `this` 为`undefined`). [3.2]

6. 对于一个


> promise，它的then方法可以调用多次.

   1. 当`promise` fulfilled后，所有`onFulfilled`都必须按照其注册顺序执行。
   2. 当`promise` rejected后，所有`OnRejected`都必须按照其注册顺序执行。

7. `then` 必须返回一个promise [3.3].


> promise2 = promise1.then(onFulfilled, onRejected);


   1. 如果`onFulfilled` 或 `onRejected` 返回了值`x`, 则执行Promise 解析流程`[[Resolve]](promise2, x)`.
   2. 如果`onFulfilled` 或 `onRejected`抛出了异常`e`, 则`promise2`应当以`e`为`reason`被拒绝。
   3. 如果 `onFulfilled` 不是一个函数且`promise1`已经fulfilled，则`promise2`必须以`promise1`的值fulfilled.
   4. 如果 `OnReject` 不是一个函数且`promise1`已经rejected, 则`promise2`必须以相同的reason被拒绝.

### 2.3 Promise解析过程

**Promise解析过程** 是以一个promise和一个值做为参数的抽象过程，可表示为`[[Resolve]](promise, x)`. 过程如下；

1. 如果`promise` 和 `x` 指向相同的值, 使用 `TypeError`做为原因将`promise`拒绝。

2. 如果`x` 是一个`promise`, 采用其状态 [3.4 ]:
   1. 如果`x`是pending状态，`promise`必须保持pending走到`x` fulfilled或rejected.
   2. 如果`x`是fulfilled状态，将`x`的值用于fulfill `promise`.
   3. 如果`x`是rejected状态, 将`x`的原因用于reject `promise`..

3. 如果` x`
   是一个对象或一个函数：
   1. 将 `then` 赋为 `x.then`. [3.5]
   2. 如果在取`x.then`值时抛出了异常，则以这个异常做为原因将`promise`拒绝。
   3. 如果`then`是一个函数， 以`x`为`this`调用`then` 函数， 且第一个参数是`resolvePromise`，第二个参数是` rejectPromise` ，且：
      1. 当 `resolvePromise` 被以 `y`为参数调用, 执行 `[[Resolve]](promise, y)`.
      2. 当 `rejectPromise` 被以 `r` 为参数调用, 则以`r`为原因将`promise`拒绝。
      3. 如果 `resolvePromise` 和 `rejectPromise` 都被调用了，或者被调用了多次，则只第一次有效，后面的忽略。
      4. 如果在调用`then` 时抛出了异常，则：
         1. 如果 `resolvePromise` 或 `rejectPromise` 已经被调用了，则忽略它。
         2. 否则, 以`e`为reason将 `promise` 拒绝。
   4. 如果 `then`不是一个函数，则 以`x`为值fulfill `promise`。
4. 如果 `x` 不是对象也不是函数，则以`x`为值 fulfill `promise`。

### 补充

英文原文地址：[http://promisesaplus.com](http://promisesaplus.com/)
若要了解文中每一条规则，则参阅其测试仓库：https://github.com/promises-aplus/promises-tests/tree/master/lib/tests

[原文](https://segmentfault.com/a/1190000002452115)

## 2. Promise详解与实现（Promise/A+规范）

### 1.什么是Promise?

> Promise是JS异步编程中的重要概念，异步抽象处理对象，是目前比较流行Javascript异步编程解决方案之一

### 2.对于几种常见异步编程方案

- 回调函数
- 事件监听
- 发布/订阅
- Promise对象

#### 这里就拿回调函数说说

1.对于回调函数 我们用Jquery的ajax获取数据时 都是以回调函数方式获取的数据



```tsx
$.get(url, (data) => {
    console.log(data)
)
```

2.如果说 当我们需要发送多个异步请求 并且每个请求之间需要相互依赖 那这时 我们只能 以嵌套方式来解决 形成 "回调地狱"



```tsx
$.get(url, data1 => {
    console.log(data1)
    $.get(data1.url, data2 => {
        console.log(data1)
    })
})
```

> 这样一来，在处理越多的异步逻辑时，就需要越深的回调嵌套，这种编码模式的问题主要有以下几个：

- 代码逻辑书写顺序与执行顺序不一致，不利于阅读与维护。
- 异步操作的顺序变更时，需要大规模的代码重构。
- 回调函数基本都是匿名函数，bug 追踪困难。
- 回调函数是被第三方库代码（如上例中的 ajax ）而非自己的业务代码所调用的，造成了 IoC 控制反转。

#### Promise 处理多个相互关联的异步请求

1.而我们Promise 可以更直观的方式 来解决 "回调地狱"



```tsx
const request = url => { 
    return new Promise((resolve, reject) => {
        $.get(url, data => {
            resolve(data)
        });
    })
};

// 请求data1
request(url).then(data1 => {
    return request(data1.url);   
}).then(data2 => {
    return request(data2.url);
}).then(data3 => {
    console.log(data3);
}).catch(err => throw new Error(err));
```

2.相信大家在 vue/react 都是用axios fetch 请求数据 也都支持 Promise API



```jsx
import axios from 'axios';
axios.get(url).then(data => {
   console.log(data)
})
```

> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

## 3.Promise使用

#### 1.Promise 是一个构造函数

new Promise 返回一个 promise对象 接收一个excutor执行函数作为参数, excutor有两个函数类型形参resolve reject



```jsx
const promise = new Promise((resolve, reject) => {
  // 异步处理
  // 处理结束后、调用resolve 或 reject
});
```

#### 2.promise相当于一个状态机

promise的三种状态

- pending
- fulfilled
- rejected

1.promise 对象初始化状态为 pending
 2.当调用resolve(成功)，会由pending => fulfilled
 3.当调用reject(失败)，会由pending => rejected

> 注意promsie状态 只能由 pending => fulfilled/rejected, 一旦修改就不能再变

#### 3.promise对象方法

1.then方法注册 当resolve(成功)/reject(失败)的回调函数



```cpp
// onFulfilled 是用来接收promise成功的值
// onRejected 是用来接收promise失败的原因
promise.then(onFulfilled, onRejected);
```

> then方法是异步执行的

2.resolve(成功) onFulfilled会被调用



```tsx
const promise = new Promise((resolve, reject) => {
   resolve('fulfilled'); // 状态由 pending => fulfilled
});
promise.then(result => { // onFulfilled
    console.log(result); // 'fulfilled' 
}, reason => { // onRejected 不会被调用
    
})
```

3.reject(失败) onRejected会被调用



```tsx
const promise = new Promise((resolve, reject) => {
   reject('rejected'); // 状态由 pending => rejected
});
promise.then(result => { // onFulfilled 不会被调用
  
}, reason => { // onRejected 
    console.log(rejected); // 'rejected'
})
```

4.promise.catch

> 在链式写法中可以捕获前面then中发送的异常,



```csharp
promise.catch(onRejected)
相当于
promise.then(null, onRrejected);

// 注意
// onRejected 不能捕获当前onFulfilled中的异常
promise.then(onFulfilled, onRrejected); 

// 可以写成：
promise.then(onFulfilled)
       .catch(onRrejected);   
```

#### 4.promise chain

> promise.then方法每次调用 都返回一个新的promise对象 所以可以链式写法



```jsx
function taskA() {
    console.log("Task A");
}
function taskB() {
    console.log("Task B");
}
function onRejected(error) {
    console.log("Catch Error: A or B", error);
}

var promise = Promise.resolve();
promise
    .then(taskA)
    .then(taskB)
    .catch(onRejected) // 捕获前面then方法中的异常
```

#### 5.Promise的静态方法

1.Promise.resolve 返回一个fulfilled状态的promise对象



```jsx
Promise.resolve('hello').then(function(value){
    console.log(value);
});

Promise.resolve('hello');
// 相当于
const promise = new Promise(resolve => {
   resolve('hello');
});
```

2.Promise.reject 返回一个rejected状态的promise对象



```jsx
Promise.reject(24);
new Promise((resolve, reject) => {
   reject(24);
});
```

3.Promise.all 接收一个promise对象数组为参数

> 只有全部为resolve才会调用 通常会用来处理 多个并行异步操作



```tsx
const p1 = new Promise((resolve, reject) => {
    resolve(1);
});

const p2 = new Promise((resolve, reject) => {
    resolve(2);
});

const p3 = new Promise((resolve, reject) => {
    reject(3);
});

Promise.all([p1, p2, p3]).then(data => { 
    console.log(data); // [1, 2, 3] 结果顺序和promise实例数组顺序是一致的
}, err => {
    console.log(err);
});
```

4.Promise.race 接收一个promise对象数组为参数

> Promise.race 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。



```jsx
function timerPromisefy(delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(delay);
        }, delay);
    });
}
var startDate = Date.now();

Promise.race([
    timerPromisefy(10),
    timerPromisefy(20),
    timerPromisefy(30)
]).then(function (values) {
    console.log(values); // 10
});
```

## 4. Promise 代码实现



```jsx
/**
 * Promise 实现 遵循promise/A+规范
 * Promise/A+规范译文:
 * https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#note-4
 */

// promise 三个状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(excutor) {
    let that = this; // 缓存当前promise实例对象
    that.status = PENDING; // 初始状态
    that.value = undefined; // fulfilled状态时 返回的信息
    that.reason = undefined; // rejected状态时 拒绝的原因
    that.onFulfilledCallbacks = []; // 存储fulfilled状态对应的onFulfilled函数
    that.onRejectedCallbacks = []; // 存储rejected状态对应的onRejected函数

    function resolve(value) { // value成功态时接收的终值
        if(value instanceof Promise) {
            return value.then(resolve, reject);
        }

        // 为什么resolve 加setTimeout?
        // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
        // 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。

        setTimeout(() => {
            // 调用resolve 回调对应onFulfilled函数
            if (that.status === PENDING) {
                // 只能由pedning状态 => fulfilled状态 (避免调用多次resolve reject)
                that.status = FULFILLED;
                that.value = value;
                that.onFulfilledCallbacks.forEach(cb => cb(that.value));
            }
        });
    }

    function reject(reason) { // reason失败态时接收的拒因
        setTimeout(() => {
            // 调用reject 回调对应onRejected函数
            if (that.status === PENDING) {
                // 只能由pedning状态 => rejected状态 (避免调用多次resolve reject)
                that.status = REJECTED;
                that.reason = reason;
                that.onRejectedCallbacks.forEach(cb => cb(that.reason));
            }
        });
    }

    // 捕获在excutor执行器中抛出的异常
    // new Promise((resolve, reject) => {
    //     throw new Error('error in excutor')
    // })
    try {
        excutor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

/**
 * resolve中的值几种情况：
 * 1.普通值
 * 2.promise对象
 * 3.thenable对象/函数
 */

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {  // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
        return reject(new TypeError('循环引用'));
    }

    let called = false; // 避免多次调用
    // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
    if (x instanceof Promise) { // 获得它的终值 继续resolve
        if (x.status === PENDING) { // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject);
            }, reason => {
                reject(reason);
            });
        } else { // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
            x.then(resolve, reject);
        }
        // 如果 x 为对象或者函数
    } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
        try { // 是否是thenable对象（具有then方法的对象/函数）
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if(called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, reason => {
                    if(called) return;
                    called = true;
                    reject(reason);
                })
            } else { // 说明是一个普通对象/函数
                resolve(x);
            }
        } catch(e) {
            if(called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

/**
 * [注册fulfilled状态/rejected状态对应的回调函数]
 * @param  {function} onFulfilled fulfilled状态时 执行的函数
 * @param  {function} onRejected  rejected状态时 执行的函数
 * @return {function} newPromsie  返回一个新的promise对象
 */
Promise.prototype.then = function(onFulfilled, onRejected) {
    const that = this;
    let newPromise;
    // 处理参数默认值 保证参数后续能够继续执行
    onFulfilled =
        typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected =
        typeof onRejected === "function" ? onRejected : reason => {
            throw reason;
        };

    // then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
    // 原因:
    // 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
    // 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

    // 其二 2.2.6规范 也是resolve函数里加setTimeout的原因
    // 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

    // 如下面这种情景 多次调用p1.then
    // p1.then((value) => { // 此时p1.status 由pedding状态 => fulfilled状态
    //     console.log(value); // resolve
    //     // console.log(p1.status); // fulfilled
    //     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
    //         console.log(value); // 'resolve'
    //     });
    //     console.log('当前执行栈中同步代码');
    // })
    // console.log('全局执行栈中同步代码');
    //

    if (that.status === FULFILLED) { // 成功态
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try{
                    let x = onFulfilled(that.value);
                    resolvePromise(newPromise, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
                } catch(e) {
                    reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                }
            });
        })
    }

    if (that.status === REJECTED) { // 失败态
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        });
    }

    if (that.status === PENDING) { // 等待态
        // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
        return newPromise = new Promise((resolve, reject) => {
            that.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
            that.onRejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        });
    }
};

/**
 * Promise.all Promise进行并行处理
 * 参数: promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
 */
Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let done = gen(promises.length, resolve);
        promises.forEach((promise, index) => {
            promise.then((value) => {
                done(index, value)
            }, reject)
        })
    })
}

function gen(length, resolve) {
    let count = 0;
    let values = [];
    return function(i, value) {
        values[i] = value;
        if (++count === length) {
            console.log(values);
            resolve(values);
        }
    }
}

/**
 * Promise.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */
Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
           promise.then(resolve, reject);
        });
    });
}

// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}

Promise.resolve = function (value) {
    return new Promise(resolve => {
        resolve(value);
    });
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}

/**
 * 基于Promise实现Deferred的
 * Deferred和Promise的关系
 * - Deferred 拥有 Promise
 * - Deferred 具备对 Promise的状态进行操作的特权方法（resolve reject）
 *
 *参考jQuery.Deferred
 *url: http://api.jquery.com/category/deferred-object/
 */
Promise.deferred = function() { // 延迟对象
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

/**
 * Promise/A+规范测试
 * npm i -g promises-aplus-tests
 * promises-aplus-tests Promise.js
 */

try {
  module.exports = Promise
} 
catch (e) {
}
```

### 5. Promise测试



```css
npm i -g promises-aplus-tests
promises-aplus-tests Promise.js
```

### 6. 相关知识参考资料

[ES6-promise](https://link.jianshu.com?t=http%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Fpromise)
 [Promises/A+规范-英文](https://link.jianshu.com?t=https%3A%2F%2Fpromisesaplus.com%2F)
 [Promises/A+规范-翻译1](https://link.jianshu.com?t=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000002452115)
 [Promises/A+规范-翻译-推荐](https://link.jianshu.com?t=https%3A%2F%2Fmalcolmyu.github.io%2F2015%2F06%2F12%2FPromises-A-Plus%2F%23note-4)
 [JS执行栈](https://link.jianshu.com?t=https%3A%2F%2Fwww.cnblogs.com%2Fmqliutie%2Fp%2F4422247.html)
 [Javascript异步编程的4种方法](https://link.jianshu.com?t=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2012%2F12%2Fasynchronous%EF%BC%BFjavascript.html)


链接：https://www.jianshu.com/p/459a856c476f
来源：简书