# 性能优化小册 - 异步堆栈追踪：为什么 await 胜过 Promise

与直接使用 `Promise` 相比，使用 `async/await` 不仅可以使代码更具可读性，而且还可以在 JavaScript 引擎中实现一些有趣的优化。

这篇文章是关于一个这样的优化，涉及异步代码的堆栈追踪。

`async/await` 和 `Promise` 的根本区别在于 `await fn()` 暂停当前函数的执行，而 `promise.then(fn)` 在将 `fn` 调用添加到回调链后，继续执行当前函数。

```
const fn = () => console.log('hello')
const a = async () => {
  await fn() // 暂停 fn 的执行
}
// 调用 a 时，才恢复 fn 的执行
a() // "hello"

const promise = Promise.resolve()
// 将 fn 添加到回调链后，继续执行 fn
promise.then(fn) // "hello"
```

在堆栈追踪的上下文中，这种差异非常显著。

当一个 `Promise` 链（无论是否脱糖化）在任何时候抛出一个未经处理的异常时， JavaScript 引擎都会显示一条错误信息和（希望）记录一个有用的堆栈追踪。

作为一名开发人员，无论您使用的是普通的 `Promise` 还是 `async await`，您都会期望这样。

## Promise

想象一个场景，当对异步函数 `b` 的调用解析时，调用函数 `c`：

```
const b = () => Promise.resolve()
const a = () => {
    b().then(() => c())
}
```

当调用 `a` 时，将同步发生以下情况：

- `b` 被调用并返回一个 `Promise`，该 `Promise` 将在将来某个时刻解决。
- `.then` 回调（实际上是调用 `c()`）被添加到回调链中（ V8 术语中，[…]被添加为解析处理程序）。

之后，我们完成了在函数 `a` 的主体中执行代码。`a` 永远不会被挂起，当对 `b` 的异步调用解析时，上下文已经消失了。

想象一下如果 `b`（或 `c` ）异步抛出异常会发生什么？理想情况下，堆栈追踪应该包括 `a`，因为 `b`（或 `c`）是从那里调用的，对吧？既然我们不在参考 `a` 了 ，那怎样能做到呢？

为了让它工作，JavaScript 引擎需要在上面的步骤之外做一些事情：`它在有机会的时候捕获并存储堆栈追踪。`

在 `V8` 中，堆栈追踪附加到 `b` 返回的 `Promise`。当 `Promise` 实现时，堆栈追踪将被传递，以便 `c` 可以根据需要使用它。

```
b()[a] -> b().then()[a] -> c[a?:a]
```

`捕获堆栈追踪需要时间（即降低性能）；存储这些堆栈追踪需要内存。`

## async/await

下面是同样的程序，使用 `async/await` 而不是 `Promise` 编写：

```js
const b = () => Promise.resolve()
const a = async () => {
  await b()
  c()
}
```

使用 `await`，即使在 `await` 调用中不收集堆栈追踪，我们也可以恢复调用链。

这是可能的，因为 `a` 被挂起，正在等待 `b` 解决。如果 `b` 抛出异常，则可以按需以这种方式重建堆栈追踪。

如果 `c` 抛出异常，堆栈追踪可以像同步函数那样构造，因为发生这种情况时，我们仍在 `a` 上下文中。

通过遵循以下建议，使 JavaScript 引擎能够以更高效的方式处理堆栈追踪：

- 偏好 `async/await` 胜过 `Promise`。
- 使用 [@babel/preset env](https://babeljs.io/docs/en/next/babel-preset-env.html) 避免不必要的 `async/await` 传输。

[英语原文](https://mathiasbynens.be/notes/async-stack-traces)

