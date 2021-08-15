## EventEmitter 简介

EventEmitter 是 NodeJS 的核心模块 `events` 中的类，用于对 NodeJS 中的事件进行统一管理，用 `events` 特定的 API 对事件进行添加、触发和移除等等，核心方法的模式类似于发布订阅。



## 实现 EventEmitter

### 1、EventEmitter 构造函数的实现

```javascript
// 文件：events.js
function EventEmitter() {
    this._events = Object.create(null);
}

/*
* 其他方法
*/

// 导出自定义模块
module.export = EventEmitter;
```

在构造函数 EventEmitter 上有一个属性 `_events`，类型为对象，用于存储和统一管理所有类型的事件，在创建构造函数的时候导出了 EventEmitter，后面实现其他方法的代码将放在构造函数与导出中间。

### 2、事件最大监听个数

在 EventEmitter 中监听的每一类事件都有最大监听个数，超过了这个数值，事件虽然可以正常执行，但是会发出警告信息，其目的是为了防止内存泄露。

```javascript
// 默认事件最大监听个数
EventEmitter.defaultMaxListeners = 10;
```

这个同类型事件最大个数默认是 `10`，EventEmitter 当然也有方法设置和获取这个值，下面是设置和获取同类型事件最大监听个数的方法实现。

```javascript
// 操作最大事件监听个数
// 设置同类型事件监听最大个数
EventEmitter.prototype.setMaxListeners = function (count) {
    this._count = count;
}

// 获取同类型事件监听最大个数
EventEmitter.prototype.getMaxListeners = function () {
    return this._count || EventEmitter.defaultMaxListeners;
}
```

在设置这个值的时候其实就是给 EventEmitter 实例添加了一个 `_count` 的属性用来存储设置的新值来作为这个类型事件的最大监听个数，在获取的时候就是获取 `_count`，如果没有设置过就获取默认值。

### 3、添加事件监听

在给 EventEmitter 的实例添加事件监听时，在 `_event` 对象中会以事件的类型作为属性名，值为一个数组，每次添加这个类型事件的时候，会将要执行的函数存入这个数组中进行统一管理。

添加事件监听的方法有 `on`、`once`、`addListener`、`prependListener` 和 `prependOnceListener`：

- `on` 等同于 `addListener` 将函数正常添加到 `_event` 对应事件类型的数组中；
- `once` 将函数添加到 `_event` 对应事件类型的数组中，但是只能执行一次；
- `prependListener` 将函数添加到 `_event` 对应事件类型的数组中的前面；
- `prependOnceListener` 将函数添加到 `_event` 对应事件类型的数组中的前面，但只能执行一次。

在 EventEmitter 中正常添加事件有四点需要注意：
1、如果其他的类使用 `util` 模块的 `inherits` 方法继承 EventEmitter 时是无法继承实例属性的，在调用操作 `_events` 的方法中因为无法获取到 `_events` 导致报错，为了兼容这种继承的情况，在获取不到 `_events` 时应添加一个 `_events` 到继承 EventEmitter 的类的实例上；
2、如果添加事件的类型为 `newListener`，传入要执行的函数会有一个参数 `type` ，是事件的类型，之后再添加事件的时候，就会执行 `newListener` 的函数，对添加的事件的事件类型进行处理；
3、`on` 方法表面上有两个参数，实际上有第三个参数，为布尔值，代表是否从 `_events` 对应事件类型的数组前面追加函数成员；
4、在添加事件的时候需要判断是否超出这个类型事件的最大监听个数，如果超出要打印警告信息。

**on 方法和 addListener 方法的实现：**

```javascript
// on 和 addListener 方法
// 添加事件监听
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (type, callback, flag) {
    // 兼容继承不存在 _events 的情况
    if (!this._events) this._events = Object.create(null);

    // 如果 type 不是 newListener 就去执行 newListener 的回调
    if (type !== "newListener") {
        // 如果没添加过 newListener 事件就忽略此处的逻辑
        if (this._events["newListener"] && this._events["newListener"].length) {
            this._events["newListener"].forEach(fn => fn(type));
        }
    }

    // 如果不是第一次添加 callback 存入数组中
    if (this._events[type]) {
        // 是否从数组前面添加 callback
        if (flag) {
            this._events[type].unshift(callback);
        } else {
            this._events[type].push(callback);
        }
    } else {
        // 第一次添加，在 _events 中创建数组并添加 callback 到数组中
        this._events[type] = [callback];
    }

    // 获取事件最大监听个数
    let maxListeners = this.getMaxListeners();

    // 判断 type 类型的事件是否超出最大监听个数，超出打印警告信息
    if (this._events[type].length - 1 === maxListeners) {
        console.error(`MaxListenersExceededWarning: ${maxListeners + 1} ${type} listeners added`);
    }
}
```

通过上面代码可以看出 `on` 方法的第三个参数其实是服务于 `prependListener` 方法的，其他添加事件的方法都是基于 `on` 来实现的，只是在调用 `on` 的外层做了不同的处理，而我们平时调这些添加事件监听的方法时都只传入 `type` 和 `callback`。

**prependListener 方法的实现：**

```javascript
// prependListener 方法
// 添加事件监听，从数组的前面追加
EventEmitter.prototype.prependListener = function (type, callback) {
    // 第三个参数为 true 表示从 _events 对应事件类型的数组前面添加 callback
    this.on(type, callback, true);
}
```

**once 方法的实现：**

```javascript
// once 方法
// 添加事件监听，只能执行一次
EventEmitter.prototype.once = function (type, callback, flag) {
    let wrap => (...args) {
        callback(...args);

        // 执行 callback 后立即从数组中移除 callback
        this.removeListener(type, wrap);
    }

    // 存储 callback，确保单独使用 removeListener 删除传入的 callback 时可以被删除掉
    wrap.realCallback = callback;

    // 调用 on 添加事件监听
    this.on(type, wrap, flag);
}
```

想让事件只执行一次，需要在执行 `callback` 之后就立即在数组中移除这个函数，由于是同步执行，直接操作 `callback` 是很难实现的，添加事件其实就是添加 `callback` 到 `_events` 对应类型的数组中，我们在使用 `once` 的时候将 `callback` 包一层函数名为 `wrap`，将这个外层函数存入数组，`wrap` 的内部逻辑就是真正 `callback` 的调用和移除 `wrap`，这里涉及到事件监听的移除方法 `removeListener` 在后面来详细说明。

`once` 的第三个参数是为了 `prependOnceListener` 服务的，`prependOnceListener` 与 `prependListener` 实现方式类似，不同的是 `prependOnceListener` 是基于 `once` 实现的。

**prependOnceListener 方法的实现：**

```javascript
// prependOnceListener 方法
// 添加事件监听，从数组的前面追加，只执行一次
EventEmitter.prototype.prependOnceListener = function (type, callback) {
    // 第三个参数为 true 表示从 _events 对应事件类型的数组前面添加 callback
    this.once(type, callback, true);
}
```

### 4、移除事件监听

移除事件监听有两个方法，分别是 `removeListener` 和 `removeAllListeners`，前者的作用是移除某个类型数组中的某个回调函数，后者的作用是移除某个类型数组的所有成员，如果类型参数为空，则清空整个 `_events`。

**removeListener 方法的实现：**

```javascript
// removeListener 方法
// 移除事件执行程序
EventEmitter.prototype.removeListener = function (type, callback) {
    if(this._events[type]) {
        // 过滤掉当前传入的要移除的 callback
        this._events[type] = this._events[type].filter(fn => {
            return fn !== callback && fn !== callback.realCallback;
        });
    }
}
```

由于 `once` 中在真正的 `callback` 包了一层 `wrap`, 只有在触发事件时才能执行 `wrap` 并执行 `removeListener` 删掉函数，如果在事件触发之前使用 `removeListener` 删除，传入的是真正的回调 `callback`，无法删除，所以在 `once` 方法中对真正的 `callback` 进行了存储，在 `removeListener` 中调用 `filter` 时的返回条件的逻辑中做了处理。

**removeAllListeners 方法的实现：**

```javascript
// removeAllListeners 方法
// 移除全部事件执行程序
EventEmitter.prototype.removeAllListeners = function (type) {
    // 存在 type 清空 _events 对应的数组，否则直接清空 _events
    if (type) {
        this._events[type] = [];
    } else {
        this._events = Object.create(null);
    }
}
```

### 5、触发事件监听

执行事件就比较简单了，取出 `_events` 中对应类型的数组进行循环，执行内部的每一个函数，第一个参数为 `type`，后面参数会作为数组中函数执行传入的参数。

```javascript
// emit 方法
// 触发事件
EventEmitter.prototype.emit = function (type, ...args) {
    if (this._events[type]) {
        // 循环执行函数，并将 this 指回 EventEmitter 实例
        this._events[type].forEach(fn => fn.call(this, ...args));
    }
}
```

### 6、获取事件类型名称集合

```javascript
// eventNames 方法
// 获取监听的所有事件类型
EventEmitter.prototype.eventNames = function () {
    return Object.keys(this._events);
}
```

### 7、按事件类型获取执行程序的集合

```javascript
// listeners 方法
// 获取事件类型对应的数组
EventEmitter.prototype.listeners = function (type) {
    return this._events[type];
}
```



## EventEmitter 的基本使用

EventEmitter 的核心逻辑已经实现，由于上面大多数方法需要组合使用，所以在没有一一验证，下面让我们通过一些案例来了解 EventEmitter 的用法。

我们在这里引入自己自定义的 `events` 模块，并使用 `util` 模块的 `inherits` 继承 EventEmitter，下面是前置代码，后面将不在重复。

```javascript
// 文件：events-demo.js
// 引入依赖
const EventEmitter = require("./events");
const util = require("util");

function Girl() {}

// 使 Girl 继承 EventEmitter
util.inherits(Girl, EventEmitter);

// 创建 Girl 的实例
let girl = new Girl();
```

**案例 1：设置和获取同类型事件的最大监听个数**

```javascript
// 文件：events-demo.js
// 获取事件最大监听个数
console.log(girl.getMaxListeners()); // 10

// 设置事件最大监听个数
girl.setMaxListeners(2);
console.log(girl.getMaxListeners()); // 2
```

**案例 2：使用 on 添加事件并执行**

```javascript
// 文件：events-demo.js
girl.on("失恋", () => console.log("哭了"));
girl.on("失恋", () => console.log("喝酒"));

girl.emit("失恋");

// 哭了
// 喝酒
```

**案例 3：使用 prependListener 添加事件并执行**

```javascript
// 文件：events-demo.js
girl.on("失恋", () => console.log("哭了"));
girl.prependListener("失恋", () => console.log("喝酒"));

girl.emit("失恋");

// 喝酒
// 哭了
```

**案例 4：添加 newListener 类型的事件**

```javascript
// 文件：events-demo.js
girl.on("newListener", (type) => console.log(type));

girl.on("失恋", () => console.log("哭了"));
girl.on("和好", () => console.log("开心"));

// 失恋
// 和好
```

**案例 5：添加同类型事件超出最大个数并执行事件**

```javascript
// 文件：events-demo.js
// 设置事件最大监听个数
girl.setMaxListeners(2);

girl.on("失恋", () => console.log("哭了"));
girl.on("失恋", () => console.log("喝酒"));
girl.on("失恋", () => console.log("吸烟"));

girl.emit("失恋");

// MaxListenersExceededWarning: 3 失恋 listeners added
// 哭了
// 喝酒
// 吸烟
```

**案例 6：对比 on 和 once**

```javascript
// 文件：events-demo.js
girl.on("失恋", () => console.log("哭了"));
girl.once("失恋", () => console.log("喝酒"));

girl.emit("失恋");
girl.emit("失恋");

// 哭了
// 喝酒
// 哭了
```

**案例 7：移除 on 和 once 添加的事件监听**

```javascript
// 文件：events-demo.js
let cry = () => console.log("哭了");
let drink = () => console.log("喝酒");

girl.on("失恋", cry);
girl.once("失恋", drink);
girl.on("失恋", () => console.log("吸烟"));

girl.removeListener("失恋", cry);
girl.removeListener("失恋", drink);

// 吸烟
```

**案例 8：使用 prependOnceListener 添加事件监听**

```javascript
// 文件：events-demo.js
girl.on("失恋", () => console.log("哭了"));
girl.prependOnceListener("失恋", () => console.log("喝酒"));

girl.emit("失恋");
girl.emit("失恋");

// 喝酒
// 哭了
// 哭了
```

**案例 9：获取某个事件类型执行程序的集合**

```javascript
// 文件：events-demo.js
let cry = () => console.log("哭了");
let drink = () => console.log("喝酒");

girl.on("失恋", cry);
girl.once("失恋", drink);
girl.once("失恋", () => console.log("吸烟"));

console.log(girl.listeners("失恋"));

// [ [Function: cry], [Function: drink], [Function] ]
```

**案例 10：获取所有事件类型名称**

```javascript
// 文件：events-demo.js
girl.on("失恋", () => console.log("哭了"));
girl.on("和好", () => console.log("开心"));

console.log(girl.eventNames());

// [ '失恋', '和好' ]
```

**案例 11：使用 removeAllListeners 按类型移除事件监听**

```javascript
// 文件：events-demo.js
girl.on("失恋", () => console.log("哭了"));
girl.on("失恋", () => console.log("喝酒"));
girl.on("和好", () => console.log("开心"));

// 移除 “失恋” 类型事件监听
girl.removeAllListeners("失恋");

console.log(girl.listeners("失恋"));

// []
```

**案例 12：使用 removeAllListeners 移除全部事件监听**

```javascript
// 文件：events-demo.js
girl.on("失恋", () => console.log("哭了"));
girl.on("失恋", () => console.log("喝酒"));
girl.on("和好", () => console.log("开心"));

// 移除全部事件监听
girl.removeAllListeners();

console.log(girl._events);

// {}
```



## EventEmitter 总结

`events` 模块在 NodeJS 中的使用率非常高，很多其他模块的事件执行机制都是通过继承该模块的 `EventEmitter` 类来实现的，比如 `ReadStream`（可读流）、`WriteStream`（可写流）、`net`（tcp）和 `http` 等等，我们也可以通过上面案例的方式创建自己的类去继承 `EventEmitter` 来实现事件的管理