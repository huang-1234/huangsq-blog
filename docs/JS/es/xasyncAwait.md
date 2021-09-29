# 10. 从 Promise 到 await

## 首先我们来看看 Promsie和宏任务之间的关系

```js
console.log('the Macro1 Task begin');
setTimeout(() => {
  console.log('the Macro2 Task start');
  Promise.resolve('the micro of Macro2 Task 也不死心, 玩了玩，好像要一直then下去')
    .then(
      res => {
        console.log('这里怎么又出现了微任务, 仔细一看, 哦哦哦，原来 is the micro task of the Macro2 Task 呀');
        console.log(res)
        return res
      },
      err => {
        console.log(err);
      }
    ).then(
      res => {
        console.log(res)
        return res
      },
      err => {
        console.log(err);
      }
    ).then(
      res => {
        console.log(res)
        return res
      },
      err => {
        console.log(err);
      }
    ).then(
      res => {
        console.log(res)
        console.log('第二个宏任务的微任务终于也结束了');
      },
      err => {
        console.log(err);
      }
    )
});
Promise.resolve().then(
  () => console.log('我在第一个宏任务中默默开启一下微任务，嘿嘿嘿')
).then(
  () => Promise.resolve('微任务不死心，要一直then下去').then(
    (data) => {
      setTimeout(() => {
        console.log('the Macro3 Task start')
        Promise.resolve('the Macro3 Task')
          .then(
            res => {
              console.log('呀呀呀! 怎么办， 这里怎么又出现了微任务, 原来 is the micro task of the Macro3 Task');
              console.log(res)
            },
            err => {
              console.log(err);
            }
          )
      });
      console.log('我的这个微任务还没执行吗, 啧啧啧。。。');
      // console.log('data:',data);
      return data;
    }
  )
).then(data => {
  console.log(data);
  return data;
}).then(data => {
  console.log(data);
  return data;
}).then(data => {
  console.log(data);
  console.log('当前的宏任务和微任务们终于都结束了，太开心了')
})

console.log('the Macro1 Task end');

// node 输出
/*
the Macro1 Task begin
the Macro1 Task end
我在第一个宏任务中默默开启一下微任务，略略略
我的这个微任务还没执行吗, 啧啧啧。。。
微任务不死心，要一直then下去
微任务不死心，要一直then下去
微任务不死心，要一直then下去
当前的宏任务和微任务终于都结束了，太开心了
the Macro2 Task start
这里怎么又出现了微任务, 仔细一看, 哦哦哦，原来 is the micro task of the Macro2 Task 呀
the Macro2 Task
the Macro3 Task start
呀呀呀! 怎么办， 这里怎么又出现了微任务, 原来 is the micro task of the Macro3 Task
the Macro3 Task
 */
```

解读之前我先来看一个字节的面试题

```js
console.log('script start');

async function async1() {
  console.log('async1 start'); //
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2 start'); //
  return new Promise((resolve, reject) => {
    console.log('after async before resolve');
    resolve();
    console.log('async2 promise');
  })
}

console.log('script start middleware');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
}).then(function() {
  console.log('promise3');
});
console.log('script end');
```

乍一看, 这不就是关于宏任务, 微任务的EventLoop. 没错, 它就是EventLoop.

先来看看你的输出结果吧! 如果你还不是很了解Event, 可以去看一下我的另一篇文章EventLoop

如果你很了解EventLoop, Promise和await相关的东西, 那么跟着感觉走, 你大概率会得到一下结果:

```js
script start
script start middleware

async1 start
async2 start
after async before resolve
async2 promise
promise1
script end

async1 end
promise2
promise3

setTimeout
```

也许你会说, 难道不是这个样子么?

话不多说, 那我们就来看下浏览器的真实输出吧!

```js
script start
script start middleware
async1 start
async2 start
after async before resolve
async2 promise
promise1
script end

promise2
promise3
async1 end

setTimeout
```

看完答案后, 我与很多人一样无论如何也不理解 **为什么明明这个async1 end的微任务代码在promise2和promise3的前面呀! 怎么??? 怎么还像是延迟输出了一样的……我的第一反应是 **我对 await 的理解有偏差, 所以我决心要把这个问题弄明白.

本文主要解释浏览器对 await 的处理, **并一步步将原题代码转换为原生Promsie实现**.

所有执行顺序以 Chrome71 为准, 不讨论 Babel 和 Promise 垫片.

在解释答案之前, 你需要先掌握:

* Promise 基础

  + Promise 执行器中的代码会被同步调用
  + Promise 回调是基于微任务的

* 浏览器 eventloop

* 宏任务与微任务的优先级

  + 宏任务的优先级高于微任务

  + 每一个宏任务执行完毕都必须将当前的微任务队列清空

  + 第一个 script 标签的代码是第一个宏任务

## 主要内容

问题主要涉及以下4点:

1. Promise 的链式 then() 是怎样执行的
2. async 函数的返回值
3. await 做了什么
4. PromiseResolveThenableJob: 浏览器对 `new Promise(resolve => resolve(thenable))` 的处理

下面, 让我们一步步将原题中的代码转换为更容易理解的等价代码.

## Promise 的链式 then() 是怎样执行的

在正式开始之前, 我们先来看以下这段代码:

```js
new Promise((r) => {
    r();
  })
  .then(() => console.log(1))
  .then(() => console.log(2))
  .then(() => console.log(3))

new Promise((r) => {
    r();
  })
  .then(() => console.log(4))
  .then(() => console.log(5))
  .then(() => console.log(6))
```

答案:

```js
1
4
2
5
3
6
```

如果你得出的答案是 `1 2 3 4 5 6` 那说明你还没有很好的理解 `Promise.prototype.then()` .

*为什么要先放出这段代码?*

因为 ** `async/await` 可视为 Promise 的语法糖, 同样基于微任务实现**; 本题主要纠结的点在于 **await 到底做了什么导致 `async1 end` 晚于 `promise2` 输出**. 问题的关键在于其**执行过程中的微任务数量**, 下文中我们需要用上述代码中的方式对微任务的执行顺序进行标记, 以辅助我们理解这其中的执行过程.

### 分析

* Promise 多个 `then()` 链式调用, 并不是连续的创建了多个微任务并推入微任务队列, 因为 `then()` 的返回值必然是一个 Promise, 而后续的 `then()` 是上一步 `then()` 返回的 Promise 的回调
* 传入 Promise 构造器的执行器函数内部的同步代码执行到 `resolve()`, 将 Promise 的状态改变为 `<resolved>: undefined`, 然后 then 中传入的回调函数 `console.log('1')` 作为一个微任务被推入微任务队列
* 第二个 `then()` 中传入的回调函数 `console.log('2')` 此时还没有被推入微任务队列, 只有上一个 `then()` 中的 `console.log('1')` 执行完毕后,  `console.log('2')` 才会被推入微任务队列

### 总结

* `Promise.prototype.then()` 会隐式返回一个新 Promise
* 如果 Promise 的状态是 pending, 那么 `then` 会在该 Promise 上注册一个回调, 当其状态发生变化时, 对应的回调将作为一个微任务被推入微任务队列
* 如果 Promise 的状态已经是 fulfilled 或 rejected, 那么 `then()` 会立即创建一个微任务, 将传入的对应的回调推入微任务队列

**为了更好的解析问题, 下面我对原题代码进行一些修改, 剔除和主要问题无关的代码**

(转换1)

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}

async1();

new Promise((resolve) => {
  console.log(1)
  resolve()
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(4)
})
```

答案:

```js
async1 start
async2
1
2
3
async1 end
4
```

我们剔除了 `setTimeout` 和一些同步代码, 然后为 `Promise` 的 `then` 链增加了一个回调, 而最终结果中 **async1 end 在 3 后输出, 而不是在 2 后!**

** `await` 一定是做了一些我们不理解的"诡异操作", 令其后续代码 `console.log('async1 end')` 被推迟了2个时序.**

换句话说, `async/await` 是 Promise 的语法糖, 同样基于微任务实现, 不可能有其他超出我们理解的东西, 所以可以断定:**在 `console.log('async1 end')` 执行前, 额外执行了2个微任务, 所以导致被推迟2个时序!**

如果你无法理解上面这段话, 没关系, 请继续向下看.

## async 函数的返回值

下面解释 async 关键字做了什么:

* 被 async 操作符修饰的函数必然返回一个 Promise
* 当 async 函数返回一个值时, Promise 的 resolve 方法负责传递这个值
* 当 async 函数抛出异常时, Promise 的 reject 方法会传递这个异常值

下面以原题中的函数 `async2` 为例, 作等价转换

(转换2)

```js
function async2() {
  console.log('async2');
  return Promise.resolve();
}
```

## await 操作符做了什么

这里需要引入 [TC39 规范](https://link.segmentfault.com/?url=https%3A%2F%2Ftc39.github.io%2Fecma262%2F%23await):

**简单说, await v 初始化步骤有以下组成**

> 1. 把 v 转成一个 promise(跟在 await 后面的).
> 2. 绑定处理函数用于后期恢复.
> 3. 暂停 async 函数并返回 implicit_promise 给调用者.

我们一步步来看, 假设 await 后是一个 promise, 且最终已完成状态的值是 42. 然后, 引擎会创建一个新的 promise 并且把 await 后的值作为 resolve 的值. 借助标准里的 PromiseResolveThenableJob 这些 promise 会被放到下个周期执行.

结合规范和这篇文章, 简单总结一下, 对于 `await v` :

* await 后的值 v 会被转换为 Promise
* 即使 v 是一个已经 `fulfilled` 的 Promise, 还是会新建一个 Promise, 并在这个新 Promise 中 `resolve(v)`
* `await v` 后续的代码的执行类似于传入 `then()` 中的回调

如此, 可进一步对原题中的 `async1` 作等价转换

(转换3)

```js
function async1() {
  console.log('async1 start')
  return new Promise(resolve => resolve(async2()))
    .then(() => {
      console.log('async1 end')
    });
}
```

至此, 我们根据规范综合以上所有等价转换, 将 `async/await` 全部转换为原生 Promise 实现, 其执行顺序在 Chrome71 上与一开始给出的(转换1)完全一致:

(转换4)

```js
function async1() {
  console.log('async1 start')
  return new Promise(resolve => resolve(async2()))
    .then(() => {
      console.log('async1 end')
    });
}

function async2() {
  console.log('async2');
  return Promise.resolve();
}

async1();

new Promise((resolve) => {
  console.log(1)
  resolve()
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(4)
})
```

到了这, 你是不是感觉整个思路变清晰了? 不过, 还是不能很好的解释 **为什么 `console.log('async1 end')` 在3后面输出**, 下面将说明其中的原因.

## PromiseResolveThenableJob: 浏览器对 `new Promise(resolve => resolve(thenable))` 的处理

仔细观察 **<转换4>** 中的 `async1` 函数, 不难发现 `return new Promise(resolve => resolve(async2()))` 中, Promise resolve 的是 `async2()` , 而 `async2()` 返回了一个状态为 `<resolved>: undefined` 的 Promsie, **Promise 是一个 thenable 对象**.

对于 thenable 对象, 《ECMAScript 6 入门》中这样描述:

> thenable 对象指的是具有then方法的对象, 比如下面这个对象
>
>

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

然后我们需要引入 TC39 规范中对 [Promise Resolve Functions](https://link.segmentfault.com/?url=https%3A%2F%2Ftc39.github.io%2Fecma262%2F%23sec-promise-resolve-functions) 的描述:

### 总结:

* 对于一个对象 `o`, 如果 `o.then` 是一个 `function`, 那么 `o` 就可以被称为 `thenable` 对象
* 对于 `new Promise(resolve => resolve(thenable))`, 即"在 Promise 中 resolve 一个 thenable 对象", 需要先将 thenable 转化为 Promsie, 然后立即调用 thenable 的 then 方法, 并且 **这个过程需要作为一个 job 加入微任务队列, 以保证对 then 方法的解析发生在其他上下文代码的解析之后**

```js
let thenable = {
  then(resolve, reject) {
    console.log('in thenable');
    resolve(100);
  }
};

new Promise((r) => {
    console.log('in p0');
    r(thenable);
  })
  .then(() => {
    console.log('thenable ok')
  })

new Promise((r) => {
    console.log('in p1');
    r();
  })
  .then(() => {
    console.log('1')
  })
  .then(() => {
    console.log('2')
  })
  .then(() => {
    console.log('3')
  })
  .then(() => {
    console.log('4')
  });
```

执行顺序:

```js
in p0
  in p1 in thenable
1
thenable ok
2
3
4
```

#### 解析

* `in thenable` 后于 `in p1` 而先于 `1` 输出, 同时 `thenable ok` 在 `1` 后输出
* 在执行完同步任务后, 微任务队列中只有2个微任务: 第一个是 **转换thenable为Promise的过程, 即 PromiseResolveThenableJob**, 第二个是 `console.log('1')`
* 在 PromiseResolveThenableJob 执行中会执行 `thenable.then()`, 从而注册了另一个微任务:`console.log('thenable ok')`
* **正是由于规范中对 `thenable` 的处理需要在一个微任务中完成, 从而导致了第一个 Promise 的后续回调被延后了1个时序**

### 如果在 Promise 中 resolve 一个 Promise 实例呢?

1. 由于 Promise 实例是一个对象，其原型上有 then 方法，所以这也是一个 thenable 对象。
2. 同样的，浏览器会创建一个 PromiseResolveThenableJob 去处理这个 Promise 实例，**这是一个微任务**。
3. 在 PromiseResolveThenableJob 执行中，执行了 `Promise.prototype.then`，而这时 Promise 如果已经是 resolved 状态 ，then 的执行会再一次创建了一个微任务

**最终结果就是: 额外创建了两个Job, 表现上就是后续代码被推迟了2个时序**

## 最终转换

上面围绕规范说了那么多, 不知你有没有理解这其中的执行过程. 规范是晦涩难懂的, 下面我们结合规范继续对代码作"转换", 让这个过程变得更容易理解一些

对于代码

```js
new Promise((resolve) => {
  resolve(thenable)
})
```

在执行顺序上等价于(我只敢说"在执行顺序上等价", 因为浏览器的内部实现无法简单的模拟):

```js
new Promise((resolve) => {
  Promise.resolve().then(() => {
    thenable.then(resolve)
  })
})
```

所以, 原题中的 `new Promise(resolve => resolve(async2()))` , 在执行顺序上等价于:

```js
new Promise((resolve) => {
  Promise.resolve().then(() => {
    async2().then(resolve)
  })
})
```

综上, 给出最终转换:

(转换, End)

```js
function async1() {
  console.log('async1 start');
  const p = async2();
  return new Promise((resolve) => {
      Promise.resolve().then(() => {
        p.then(resolve)
      })
    })
    .then(() => {
      console.log('async1 end')
    });
}

function async2() {
  console.log('async2');
  return Promise.resolve();
}

async1();

new Promise((resolve) => {
  console.log(1)
  resolve()
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(4)
})
```

OK, 看到这里, 你应该理解了为什么在 Chrome71 中 async1 end 在 3 后输出了.

不过这还没完呢, 认真的你可能已经发现, 这里给出的执行顺序在 Chrome73 上不对啊. 没错, 这是因为 Await 规范更新了……

## Await 规范的更新

如果你在 Chrome73 中运行这道题的代码, 你会发现, 执行顺序与 Chrome71 中不同, 这又是为什么?

我来简单说说这个事情的过程:

在 Chrome71 之前的某个版本, nodejs 中有个 bug, 这个 bug 的表现就是对 await 进行了激进优化, 所谓激进优化, 就是没有按照 TC39 规范的要求执行. V8 团队修复了这个 bug. 不过, 从这个 bug 中 V8 团队得到了启发, 发现这个 bug 中的激进优化竟然可以带来性能提升, 所以向 TC39 提交了改进方案, 并会在下个版本中执行这个优化……

### 激进优化

文章中的"激进优化", 是指 `await v` 在语义上将等价于 `Promise.resolve(v)` , 而不再是现在的 `new Promise(resolve => resolve(v))` , 所以在未来的 Chrome73 中, 题中的代码可做如下等价转换:

(转换-优化版本)

```js
function async1() {
  console.log('async1 start');
  const p = async2();
  return Promise.resolve(p)
    .then(() => {
      console.log('async1 end')
    });
}

function async2() {
  console.log('async2');
  return Promise.resolve();
}

async1();

new Promise((resolve) => {
  console.log(1)
  resolve()
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(4)
})
```

执行顺序:

```js
async1 start
async2
1
async1 end
2
3
4
```

有没有觉得优化后的版本更容易理解了呢?

## 还需要补充的要点

1. `Promise.resolve(v)` 不等于 `new Promise(r => r(v))`, 因为如果 v 是一个 Promise 对象, 前者会直接返回 v, 而后者需要经过一系列的处理(主要是 PromiseResolveThenableJob)
2. 宏任务的优先级是高于微任务的, 而原题中的 `setTimeout` 所创建的宏任务可视为 **第二个宏任务**, 第一个宏任务是这段程序本身
