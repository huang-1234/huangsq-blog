# DOM 事件流

这篇笔记主要简述下 DOM 事件流 - DOM Event Flow. 用于理解事件捕获与冒泡.

## 什么是事件

事件, 就是文档或浏览器窗口发生的一些特定的交互瞬间. JavaScript 和 HTML 之间的交互是通过事件实现的. 可以使用事件监听器来监听事件, 以便事件发生时执行相应的代码.

## 事件流

当在页面上某个元素触发特定事件时, 比如点击, 除了被点击的目标元素, 所有祖先元素都会触发该事件, 一直到 window.

那这样就出现了一个问题, 是先在目标元素上触发事件, 还是先在祖先元素上触发呢? 这就是事件流的概念.

**事件流是事件在目标元素和祖先元素间的触发顺序**, 在早期，微软和网景实现了相反的事件流, 网景主张捕获方式, 微软主张冒泡方式:

- **捕获** - Capture - 事件由最顶层逐级向下传播, 直至到达目标元素.
- **冒泡** - Bubble - 顾名思义, 类似水中冒泡, 从下往上. 事件由第一个被触发的元素接收, 然后逐级向上传播.

后来 w3c 采用折中的方式, 规定先捕获再冒泡平息了战火. 如此一个事件就被分成了三个阶段(是的, 不光是捕获和冒泡):

1. **捕获阶段** - The capture phase - 事件从最顶层元素 window 一直传递到目标元素的父元素.
2. **目标阶段** - The target phase - 事件到达目标元素. 如果事件指定不冒泡. 那就会在这里中止.
3. **冒泡阶段** - The bubble phase - 事件从目标元素父元素向上逐级传递直到最顶层元素 window. 及捕获阶段的反方向.

那这里又有一个新的疑问, 既然捕获和冒泡阶段都会触发事件, 那先捕获再冒泡, 岂不是路径上的元素都会触发两次事件?

在 DOM2 中, 事件监听机制提供了一个参数来决定事件是在捕获阶段生效还是在冒泡阶段生效, 接下来简要学习下 `addEventListener`.

> 还有一个小问题, 为什么要单独区分一个目标阶段? 笔记接下来的注意选项框有解答.

## addEventListener

`EventTarget.addEventListener()` 方法将指定的监听器注册到目标元素上, 当该对象触发指定的事件时, 指定的回调函数就会被执行. 事件目标可以是一个文档上的元素或任何其他支持事件的对象 (比如 XMLHttpRequest).

它的工作原理是将实现EventListener的函数或对象添加到调用它的 EventTarget 上的指定事件类型的事件侦听器列表中.

### 语法



```js
target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);
target.addEventListener(type, listener[, useCapture, wantsUntrusted  ]);  // Gecko/Mozilla only
```

- `type`: 表示监听事件类型的字符串. [事件列表](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FEvents).

- `listener`: 当所监听的事件类型触发时的回调. 会接收到一个事件通知对象.

- ```js
  options
  ```

  : 可选. 可用的选项如下:

  - `capture`: Boolean, 如果是 true, 表示 listener 会在捕获阶段触发. 默认是 false. 冒泡捕获. 所以微软牛逼.
  - `once`: Boolean, 如果是 true, 表示 listener 在添加之后最多只调用一次.
  - `passive`: Boolean，如果是, 表示 listener 永远不会调用 `preventDefault()`. 如果 listener 仍然调用了这个函数, 客户端将会忽略它并抛出一个控制台警告.

- `useCapture`: 可选. Boolean, 同 `options - capture`

> 具体使用参考另一篇笔记. TODO

> 注意: 对于目标元素上的事件监听器来说, 事件会处于**目标阶段**, 而不是冒泡阶段或者捕获阶段. 在目标阶段的事件会触发该元素上的所有监听器, 而不在乎这个监听器到底在注册时 useCapture 是 true 还是 false.

## 事件监听添加与移除

添加事件监听有三种方式:

1. 通过 HTML 属性的方式



```html
<div onclick="console.log('click')"></div>
```

1. DOM0 中可以通过js脚本来给指定元素提供事件处理函数，即



```js
element.onclick = function // 只会在冒泡阶段生效
```

1. DOM2 中, 添加了新的事件监听API, 即`addEventListener`, 同时提供了取消监听的 `removeEventListener(type, handler[, options | useCapture])`. 显然事件处理函数注册后, 要取消监听, type/hanlder/useCapture的一致.

相比第一, 第二种, `addEventListener`的方式有以下几点优势:

- 可以为同一个事件注册多个回调函数, 依次触发. 而 DOM0 的方式则会被覆盖掉. 只能添加一种
- 使用 DOM0 会覆盖 HTML 的方式.
- 可以通过参数决定监听是在冒泡阶段生效还是在捕获阶段生效.
- `element.onclick` 注册的监听只会在冒泡阶段生效

例子:



```html
<div id="parent">
    <div id="child" onclick="console.log('html')"/>
</div>
<script>
const child = document.getElementById('child') 

child.onclick = function () { console.log('DOM0A') } // 覆盖了 HTML 的方式
child.onclick = function () { console.log('DOM0B') } // 覆盖了上一条 DOM0A   

child.addEventLisnter('click', function () { console.log('lisnterA') })
child.addEventLisnter('click', function () { console.log('lisnterB') }) // 不会覆盖
</script>
```

三种方式对应的如何移除:



```js
child.setAttributer('onclick', false)
child.onclick = null
child.removeEventLisnter('设置相同的参数')
```

> 三种方式优先级排序 onclick > html > addEventLisnter. onclick 会覆盖 html. 但是 addEventLisnter 不会被覆盖且可以叠加.

## 问题

1. 以下代码的输出顺序



```html
<html onclick="console.log('html')">

<head>
    <meta charset="UTF-8">

    <title>Test</title>
    <script type="text/javascript">
        window.onload = function() {
            const parent = document.getElementById("parent");
            const child = document.getElementById("child");

            child.onclick = function () { console.log('child onclick') };

            // capture 默认为 false, 冒泡
            parent.addEventListener('click', function () { console.log('parent event') });
            child.addEventListener('click', function () { console.log('child event') });

            // 捕获
            parent.addEventListener('click', function () { console.log('parent event capture') }, { capture: true });
            child.addEventListener('click', function () { console.log('child event capture') }, { capture: true });
        }
        window.onclick = function() {
            console.log('window');
        }
    </script>
</head>

<body onclick="console.log('body')">
    <div id="parent" onclick="console.log('parent html')">parent
        <div id="child" onclick="console.log('child html')">child</div>
    </div>
</div>
</body>

</html>
```

1. 什么是事件流，同一个事件有几个阶段？
2. 如何移除通过HTML属性、element.onclick等注册的事件处理函数？

### 问题1答案

首先参考 chrome 浏览器的结果. 先来看点击 child, 输出:

1. parent html
2. parent event
3. parent event capture
4. body
5. html
6. window

奇怪! 这时候不是应该先捕获, capture 在前吗? 别急, 这时候如果调换 parent event 与 parent event capture 的 `addEventListener` 顺序, 会发现, 输出顺序也变了:

1. parent html
2. **parent event capture**
3. **parent event**
4. body
5. html
6. window

其实这时候的输出顺序只和 `addEventListener` 的顺序有关. 是否开启 `capture` 无关. 因为我们是直接点击了 `parent`. 对于 `parent` 自身而言. 它在整个点击传递过程中处于**目标阶段**. 并不涉及捕获和冒泡. 同时我们也发现. html 设置的点击是优先于 `addEventListener` 的方式的.

我们再来看下点击 child:

1. parent event capture
2. child onclick
3. child event
4. child event capture
5. parent html
6. parent event
7. body
8. html
9. window

首先, child html 没有输出, 因为被 child onclick 覆盖掉了.
 第二点, child onclick 的优先级也是高于 `addEventListener` 的.
 再然后, 点击事件传递过程中, 首先在捕获阶段, 输出了 parent event capture. 然后到达**目标阶段**. 同理之前点击 parent. 如果此时调换 child event 与 child event capture 的 `addEventListener` 顺序. 输出顺序也会改变.
 最后, 到达冒泡阶段, 由于 html 的优先级高于 `addEventListener`. 所以被输出. (别忘了, 默认都是开启冒泡)

但是. 如果使用 Safari 浏览器, 则会发现, 点击 parent, 输出:

1. parent event capture
2. parent html
3. parent event
4. body
5. html
6. window

点击 child, 输出:

1. parent event capture
2. child event capture
3. child onclick
4. child event
5. parent html
6. parent event
7. body
8. html
9. window

会发现, 对于捕获阶段的处理不一样了. 点击目标元素时, 目标元素不仅处于**目标阶段**, 也处于**捕获阶段的终点和冒泡阶段的起点**. 所以会进行 `capture` 的判断. 所以在代码编写时这里要尤为注意.

## 参考

- [W3C - Event Flow](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.w3.org%2FTR%2FDOM-Level-3-Events%2F%23event-flow)
- [DOM事件、事件流](https://links.jianshu.com/go?to=https%3A%2F%2Fjuejin.im%2Fpost%2F5c31cc6f518825261f73421d)
- [MDN - addEventListener](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FEventTarget%2FaddEventListener%23Parameters)

## 事件参考

发送DOM事件是为了将发生的相关事情通知代码。每个事件都是继承自[`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 接口的对象，可以包括自定义的成员属性及函数用于获取事件发生时相关的更多信息。事件可以表示任何从基本的用户交互、到发生在渲染模型自动通知的任何事情。

本文提供了一个可以发送的事件的列表；一些是官方标准中的标准事件，另一些则是在特定浏览器内部使用的事件；例如，列出的 Mozilla 特定事件，使[附加组件](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons)可以借助它们与浏览器进行交互。
