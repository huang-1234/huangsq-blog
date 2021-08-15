# 浅谈 nextTick 原理

#### 1、为什么用 Vue.nextTick()

首先来了解一下 JS 的运行机制。

##### JS 运行机制（Event Loop）

JS 执行是单线程的，它是基于事件循环的。

1. 所有同步任务都在主线程上执行，形成一个执行栈。
2. 主线程之外，会存在一个任务队列，只要异步任务有了结果，就在任务队列中放置一个事件。
3. 当执行栈中的所有同步任务执行完后，就会读取任务队列。那些对应的异步任务，会结束等待状态，进入执行栈。
4. 主线程不断重复第三步。

这里主线程的执行过程就是一个`tick`，而所有的异步结果都是通过任务队列来调度。`Event Loop` 分为宏任务和微任务，无论是执行宏任务还是微任务，完成后都会进入到一下`tick`，**并在两个`tick`之间进行 UI 渲染**。

由于 Vue DOM 更新是异步执行的，即修改数据时，视图不会立即更新，而是会监听数据变化，并缓存在同一事件循环中，等同一数据循环中的所有数据变化完成之后，再统一进行视图更新。为了确保得到更新后的 DOM，所以设置了 `Vue.nextTick()`方法。

#### 2、什么是 Vue.nextTick()

是 Vue 的核心方法之一，官方文档解释如下：

> 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

##### MutationObserver

先简单介绍下`MutationObserver`：MO 是 HTML5 中的 API，是一个用于监视 DOM 变动的接口，它可以监听一个 DOM 对象上发生的子节点删除、属性修改、文本内容修改等。

调用过程是要先给它绑定回调，得到 MO 实例，这个回调会在 MO 实例监听到变动时触发。这里 MO 的回调是放在`microtask`中执行的。

```js
// 创建MO实例
const observer = new MutationObserver(callback);

const textNode = "想要监听的Don节点";

observer.observe(textNode, {
  characterData: true, // 说明监听文本内容的修改
});
```

##### 源码浅析

`nextTick` 的实现单独有一个 JS 文件来维护它，在`src/core/util/next-tick.js`中。

`nextTick` 源码主要分为两块：能力检测和根据能力检测以不同方式执行回调队列。

###### 能力检测

由于宏任务耗费的时间是大于微任务的，所以在浏览器支持的情况下，优先使用微任务。如果浏览器不支持微任务，再使用宏任务。

```js
// 空函数，可用作函数占位符
import { noop } from "shared/util";

// 错误处理函数
import { handleError } from "./error";

// 是否是IE、IOS、内置函数
import { isIE, isIOS, isNative } from "./env";

// 使用 MicroTask 的标识符，这里是因为火狐在<=53时 无法触发微任务，在modules/events.js文件中引用进行安全排除
export let isUsingMicroTask = false;

// 用来存储所有需要执行的回调函数
const callbacks = [];

// 用来标志是否正在执行回调函数
let pending = false;

// 对callbacks进行遍历，然后执行相应的回调函数
function flushCallbacks() {
  pending = false;
  // 这里拷贝的原因是：
  // 有的cb 执行过程中又会往callbacks中加入内容
  // 比如 $nextTick的回调函数里还有$nextTick
  // 后者的应该放到下一轮的nextTick 中执行
  // 所以拷贝一份当前的，遍历执行完当前的即可，避免无休止的执行下去
  const copies = callbcks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

let timerFunc; // 异步执行函数 用于异步延迟调用 flushCallbacks 函数

// 在2.5中，我们使用(宏)任务(与微任务结合使用)。
// 然而，当状态在重新绘制之前发生变化时，就会出现一些微妙的问题
// (例如#6813,out-in转换)。
// 同样，在事件处理程序中使用(宏)任务会导致一些奇怪的行为
// 因此，我们现在再次在任何地方使用微任务。
// 优先使用 Promise
if (typeof Promise !== "undefined" && isNative(Promise)) {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);

    // IOS 的UIWebView, Promise.then 回调被推入 microTask 队列，但是队列可能不会如期执行
    // 因此，添加一个空计时器强制执行 microTask
    if (isIOS) setTimeout(noop);
  };
  isUsingMicroTask = true;
} else if (
  !isIE &&
  typeof MutationObserver !== "undefined" &&
  (isNative(MutationObserver) ||
    MutationObserver.toString === "[object MutationObserverConstructor]")
) {
  // 当 原生Promise 不可用时，使用 原生MutationObserver
  // e.g. PhantomJS, iOS7, Android 4.4

  let counter = 1;
  // 创建MO实例，监听到DOM变动后会执行回调flushCallbacks
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true, // 设置true 表示观察目标的改变
  });

  // 每次执行timerFunc 都会让文本节点的内容在 0/1之间切换
  // 切换之后将新值复制到 MO 观测的文本节点上
  // 节点内容变化会触发回调
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter); // 触发回调
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}
```

延迟调用优先级如下：
Promise > MutationObserver > setImmediate > setTimeout

```js
export function nextTick(cb? Function, ctx: Object) {
    let _resolve
    // cb 回调函数会统一处理压入callbacks数组
    callbacks.push(() => {
        if(cb) {
            try {
                cb.call(ctx)
            } catch(e) {
                handleError(e, ctx, 'nextTick')
            }
        } else if (_resolve) {
            _resolve(ctx)
        }
    })

    // pending 为false 说明本轮事件循环中没有执行过timerFunc()
    if(!pending) {
        pending = true
        timerFunc()
    }

    // 当不传入 cb 参数时，提供一个promise化的调用
    // 如nextTick().then(() => {})
    // 当_resolve执行时，就会跳转到then逻辑中
    if(!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
}
```

`next-tick.js` 对外暴露了`nextTick`这一个参数，所以每次调用`Vue.nextTick`时会执行：

- 把传入的回调函数`cb`压入`callbacks`数组
- 执行`timerFunc`函数，延迟调用 `flushCallbacks` 函数
- 遍历执行 `callbacks` 数组中的所有函数

这里的 `callbacks` 没有直接在 `nextTick` 中执行回调函数的原因是保证在同一个 `tick` 内多次执行`nextTick`，不会开启多个异步任务，而是把这些异步任务都压成一个同步任务，在下一个 `tick` 执行完毕。

###### 附加

`noop` 的定义如下

```js
/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
export function noop (a?: any, b?: any, c?: any) {}
```

#### 3、怎么用

**语法**：`Vue.nextTick([callback, context])`

**参数**：

- `{Function} [callback]`：回调函数，不传时提供 promise 调用
- `{Object} [context]`：回调函数执行的上下文环境，不传默认是自动绑定到调用它的实例上。

```js
//改变数据
vm.message = 'changed'

//想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent) // 并不会得到'changed'

//这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(function(){
    // DOM 更新了
    //可以得到'changed'
    console.log(vm.$el.textContent)
})

// 作为一个 Promise 使用 即不传回调
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

Vue 实例方法`vm.$nextTick`做了进一步封装，把 context 参数设置成当前 Vue 实例。

#### 4、小结

使用`Vue.nextTick()`是为了可以获取更新后的 DOM 。
触发时机：在同一事件循环中的数据变化后，DOM 完成更新，立即执行`Vue.nextTick()`的回调。

> 同一事件循环中的代码执行完毕 -> DOM 更新 -> nextTick callback 触发

![1596618069-5a5da8c8522c2_articlex]($nextTick.assets/bVbya8q)

应用场景：

- 在 Vue 生命周期的

  ```
  created()
  ```

  钩子函数进行的 DOM 操作一定要放在

  ```
  Vue.nextTick()
  ```

  的回调函数中。

  **原因**：是`created()`钩子函数执行时 DOM 其实并未进行渲染。

- 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的 DOM 结构的时候，这个操作应该放在

  ```
  Vue.nextTick()
  ```

  的回调函数中。

  **原因**：Vue 异步执行 DOM 更新，只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变，如果同一个 watcher 被多次触发，只会被推入到队列中一次。

##### 版本分析

2.6 版本优先使用 microtask 作为异步延迟包装器，且写法相对简单。而 2.5 版本中，nextTick 的实现是 microTimerFunc、macroTimerFunc 组合实现的，延迟调用优先级是：Promise > setImmediate > MessageChannel > setTimeout，具体见源码。

2.5 版本在重绘之前状态改变时会有小问题（如 [＃6813](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fissues%2F6813)）。此外，在事件处理程序中使用 macrotask 会导致一些无法规避的奇怪行为（如 [#7109](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fissues%2F7109)，[＃7153](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fissues%2F7153)等）。

microtask 在某些情况下也是会有问题的，因为 microtask 优先级比较高，事件会在顺序事件（如[＃4521](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fissues%2F4521)，[＃6690](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fissues%2F6690) 有变通方法）之间甚至在同一事件的冒泡过程中触发（[＃6566](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fissues%2F6566)）。

参考：

- [Vue 源码](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fdev%2Fsrc%2Fcore%2Futil%2Fnext-tick.js)
- [Vue.js 技术揭秘](https://link.segmentfault.com/?url=https%3A%2F%2Fustbhuangyi.github.io%2Fvue-analysis%2Freactive%2Fnext-tick.html%23js-%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6)
- [vue 方法 nextTick 源码分析](https://link.segmentfault.com/?url=https%3A%2F%2Fjuejin.im%2Fpost%2F5d82f51b6fb9a06acd4558ef)
