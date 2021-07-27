## 发布订阅

### 在React中的组件通信

父子间通信好说，直接使用props就可以完成，但是当两个相隔很远的组件也需要通信的时候，这个使用props的编码就非常让人望而却步了。

层层传递的优点是非常简单，用已有知识就能解决，但问题是会浪费很多代码，非常烦琐，中间作为桥梁的组件会引入很多不属于自己的属性。短期来看，写代码的人会很痛苦；长期来看，整个项目的维护成本都会变得非常高昂。因此，层层传递 props 要不得。

那有没有更加灵活的解决方案，能够帮我们处理“任意组件”之间的通信需求呢？答案是不仅有，而且姿势还很多。我先从最朴素的“发布-订阅”模式讲起。

### 利用“发布-订阅”模式驱动数据流

“发布-订阅”模式可谓是解决通信类问题的“万金油”，在前端世界的应用非常广泛，比如：

前两年爆火的 socket.io 模块，它就是一个典型的跨端发布-订阅模式的实现；

在 Node.js 中，许多原生模块也是以 EventEmitter 为基类实现的；

不过大家最为熟知的，应该还是 Vue.js 中作为常规操作被推而广之的“全局事件总线” EventBus。

这些应用之间虽然名字各不相同，但内核是一致的，也就是我们下面要讲到的“发布-订阅”模型。

理解事件的发布-订阅机制
发布-订阅机制早期最广泛的应用，应该是在浏览器的 DOM 事件中。  相信有过原生 JavaScript 开发经验的同学，对下面这样的用法都不会陌生：

```js
target.addEventListener(type, listener, useCapture);
```
通过调用 addEventListener 方法，我们可以创建一个事件监听器，这个动作就是“订阅”。比如我可以监听 click（点击）事件：

```js
el.addEventListener("click", func, false);
```
这样一来，当 click 事件被触发时，事件会被“发布”出去，进而触发监听这个事件的 func 函数。这就是一个最简单的发布-订阅案例。

使用发布-订阅模式的优点在于，监听事件的位置和触发事件的位置是不受限的，就算相隔十万八千里，只要它们在同一个上下文里，就能够彼此感知。这个特性，太适合用来应对“任意组件通信”这种场景了。

发布-订阅模型 API 设计思路
通过前面的讲解，不难看出发布-订阅模式中有两个关键的动作：事件的监听（订阅）和事件的触发（发布），这两个动作自然而然地对应着两个基本的 API 方法。

> on()：负责注册事件的监听器，指定事件触发时的回调函数。

> emit()：负责触发事件，可以通过传参使其在触发的时候携带数据 。

最后，只进不出总是不太合理的，我们还要考虑一个 off() 方法，必要的时候用它来删除用不到的监听器：

> off()：负责监听器的删除。

### 发布-订阅模型编码实现
“发布-订阅”模式不仅在应用层面十分受欢迎，它更是面试官的心头好。在涉及设计模式的面试中，如果只允许出一道题，那么我相信大多数的面试官都会和我一样，会毫不犹豫地选择考察“发布-订阅模式的实现”。 接下来我就手把手带你来做这道题，写出一个同时拥有 on、emit 和 off 的 EventEmitter。

在写代码之前，先要捋清楚思路。这里我把“实现 EventEmitter”这个大问题，拆解为 3 个具体的小问题，下面我们逐个来解决。

>  问题一：事件和监听函数的对应关系如何处理？

提到“对应关系”，应该联想到的是“映射”。在 JavaScript 中，处理“映射”我们大部分情况下都是用对象来做的。所以说在全局我们需要设置一个对象，来存储事件和监听函数之间的关系：

```js
constructor() {
  // eventMap 用来存储事件和监听函数之间的关系
  this.eventMap= {}
}
```
>  问题二：如何实现订阅？

所谓“订阅”，也就是注册事件监听函数的过程。这是一个“写”操作，具体来说就是把事件和对应的监听函数写入到 eventMap 里面去：

```js
// type 这里就代表事件的名称
on(type, handler) {
  // hanlder 必须是一个函数，如果不是直接报错
  if(!(handler instanceof Function)) {
    throw new Error("the handler must be a function")
  }
  // 判断 type 事件对应的队列是否存在
  if(!this.eventMap[type]) {
   // 若不存在，新建该队列
    this.eventMap[type] = []
  }
  // 若存在，直接往队列里推入 handler
  this.eventMap[type].push(handler)
}
```
>  问题三：如何实现发布？

订阅操作是一个“写”操作，相应的，发布操作就是一个“读”操作。发布的本质是触发安装在某个事件上的监听函数，我们需要做的就是找到这个事件对应的监听函数队列，将队列中的 handler 依次执行出队：

```js
// 别忘了我们前面说过触发时是可以携带数据的，params 就是数据的载体
emit(type, params) {
  // 假设该事件是有订阅的（对应的事件队列存在）
  if(this.eventMap[type]) {
    // 将事件队列里的 handler 依次执行出队
    this.eventMap[type].forEach((handler, index)=> {
      // 注意别忘了读取 params
      handler(params)
    })
  }
}
```
到这里，最最关键的 on 方法和 emit 方法就实现完毕了。最后我们补充一个 off 方法：

```js
off(type, handler) {
  if(this.eventMap[type]) {
    this.eventMap[type].splice(this.eventMap[type].indexOf(handler)>>>0,1)
  }
}
```
接着把这些代码片段拼接进一个 class 里面，一个核心功能完备的 EventEmitter 就完成啦：

```js
class myEventEmitter {
  constructor() {
    // eventMap 用来存储事件和监听函数之间的关系
    this.eventMap = {};
  }
  // type 这里就代表事件的名称
  on(type, handler) {
    // hanlder 必须是一个函数，如果不是直接报错
    if (!(handler instanceof Function)) {
      throw new Error("哥 你错了 请传一个函数");
    }
    // 判断 type 事件对应的队列是否存在
    if (!this.eventMap[type]) {
      // 若不存在，新建该队列
      this.eventMap[type] = [];
    }
    // 若存在，直接往队列里推入 handler
    this.eventMap[type].push(handler);
  }
  // 别忘了我们前面说过触发时是可以携带数据的，params 就是数据的载体
  emit(type, params) {
    // 假设该事件是有订阅的（对应的事件队列存在）
    if (this.eventMap[type]) {
      // 将事件队列里的 handler 依次执行出队
      this.eventMap[type].forEach((handler, index) => {
        // 注意别忘了读取 params
        handler(params);
      });
    }
  }
  off(type, handler) {
    if (this.eventMap[type]) {
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1);
    }
  }
}
```
下面我们对 myEventEmitter 进行一个简单的测试，创建一个 myEvent 对象作为 myEventEmitter 的实例，然后针对名为 “test” 的事件进行监听和触发：

```js
// 实例化 myEventEmitter
const myEvent = new myEventEmitter();
// 编写一个简单的 handler
const testHandler = function (params) {
  console.log(`test事件被触发了，testHandler 接收到的入参是${params}`);
};
// 监听 test 事件
myEvent.on("test", testHandler);
// 在触发 test 事件的同时，传入希望 testHandler 感知的参数
myEvent.emit("test", "newState");
```
以上代码会输出下面红色矩形框住的部分作为运行结果：