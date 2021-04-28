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

## 最常见的类别

| 事件名称               | 何时触发                              |
| :--------------------- | :------------------------------------ |
| `error (en-US)`        | 资源加载失败时。                      |
| `abort (en-US)`        | 正在加载资源已经被中止时。            |
| `load (en-US)`         | 资源及其相关资源已完成加载。          |
| `beforeunload (en-US)` | window，document 及其资源即将被卸载。 |
| `unload (en-US)`       | 文档或一个依赖资源正在被卸载。        |

### 网络事件

| 事件名称          | 何时触发               |
| :---------------- | :--------------------- |
| `online (en-US)`  | 浏览器已获得网络访问。 |
| `offline (en-US)` | 浏览器已失去网络访问。 |

| 事件名称        | 何时触发                   |
| :-------------- | :------------------------- |
| `focus (en-US)` | 元素获得焦点（不会冒泡）。 |
| `blur (en-US)`  | 元素失去焦点（不会冒泡）。 |

| 事件名称          | 何时触发                                           |
| :---------------- | :------------------------------------------------- |
| `open (en-US)`    | WebSocket 连接已建立。                             |
| `message (en-US)` | 通过 WebSocket 接收到一条消息。                    |
| `error (en-US)`   | WebSocket 连接异常被关闭（比如有些数据无法发送）。 |
| `close (en-US)`   | WebSocket 连接已关闭。                             |

| 事件名称           | 何时触发                                                     |
| :----------------- | :----------------------------------------------------------- |
| `pagehide (en-US)` | A session history entry is being traversed from.             |
| `pageshow (en-US)` | A session history entry is being traversed to.               |
| `popstate (en-US)` | A session history entry is being navigated to (in certain cases). |

| 事件名称                     | 何时触发                            |
| :--------------------------- | :---------------------------------- |
| `animationstart (en-US)`     | 某个 CSS 动画开始时触发。           |
| `animationend (en-US)`       | 某个 CSS 动画完成时触发。           |
| `animationiteration (en-US)` | 某个 CSS 动画完成后重新开始时触发。 |

| 事件名称                | 何时触发                                                     |
| :---------------------- | :----------------------------------------------------------- |
| `transitionstart`       | A [CSS transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions) has actually started (fired after any delay). |
| `transitioncancel`      | CSS过渡被取消                                                |
| `transitionend (en-US)` | CSS过渡已经完成                                              |
| `transitionrun`         | A [CSS transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions) has begun running (fired before any delay starts). |

| 事件名称         | 何时触发       |
| :--------------- | :------------- |
| `reset (en-US)`  | 点击重置按钮时 |
| `submit (en-US)` | 点击提交按钮   |

| 时间名称              | 何时触发             |
| :-------------------- | :------------------- |
| `beforeprint (en-US)` | 打印机已经就绪时触发 |
| `afterprint (en-US)`  | 打印机关闭时触发     |

| Event Name                  | Fired When                                                   |
| :-------------------------- | :----------------------------------------------------------- |
| `compositionstart (en-US)`  | The composition of a passage of text is prepared (similar to keydown for a keyboard input, but works with other inputs such as speech recognition). |
| `compositionupdate (en-US)` | A character is added to a passage of text being composed.    |
| `compositionend (en-US)`    | The composition of a passage of text has been completed or canceled. |

| Event Name                 | Fired When                                                   |
| :------------------------- | :----------------------------------------------------------- |
| `fullscreenchange (en-US)` | An element was turned to fullscreen mode or back to normal mode. |
| `fullscreenerror (en-US)`  | It was impossible to switch to fullscreen mode for technical reasons or because the permission was denied. |
| `resize (en-US)`           | The document view has been resized.                          |
| `scroll (en-US)`           | The document view or an element has been scrolled.           |

| Event Name      | Fired When                                 |
| :-------------- | :----------------------------------------- |
| `cut (en-US)`   | 已经剪贴选中的文本内容并且复制到了剪贴板。 |
| `copy (en-US)`  | 已经把选中的文本内容复制到了剪贴板。       |
| `paste (en-US)` | 从剪贴板复制的文本内容被粘贴。             |

| Event Name         | Fired When                                              |
| :----------------- | :------------------------------------------------------ |
| `keydown (en-US)`  | 按下任意按键。                                          |
| `keypress (en-US)` | 除 Shift、Fn、CapsLock 外的任意键被按住。（连续触发。） |
| `keyup (en-US)`    | 释放任意按键。                                          |

| Event Name                  | Fired When                                                   |
| :-------------------------- | :----------------------------------------------------------- |
| `auxclick`                  | A pointing device button (ANY non-primary button) has been pressed and released on an element. |
| `click (en-US)`             | 在元素上按下并释放任意鼠标按键。                             |
| `contextmenu (en-US)`       | 右键点击（在右键菜单显示前触发）。                           |
| `dblclick (en-US)`          | 在元素上双击鼠标按钮。                                       |
| `mousedown (en-US)`         | 在元素上按下任意鼠标按钮。                                   |
| `mouseenter (en-US)`        | 指针移到有事件监听的元素内。                                 |
| `mouseleave (en-US)`        | 指针移出元素范围外（不冒泡）。                               |
| `mousemove (en-US)`         | 指针在元素内移动时持续触发。                                 |
| `mouseover (en-US)`         | 指针移到有事件监听的元素或者它的子元素内。                   |
| `mouseout (en-US)`          | 指针移出元素，或者移到它的子元素上。                         |
| `mouseup (en-US)`           | 在元素上释放任意鼠标按键。                                   |
| `pointerlockchange (en-US)` | 鼠标被锁定或者解除锁定发生时。                               |
| `pointerlockerror (en-US)`  | 可能因为一些技术的原因鼠标锁定被禁止时。                     |
| `select (en-US)`            | 有文本被选中。                                               |
| `wheel (en-US)`             | 滚轮向任意方向滚动。                                         |

| Event Name          | Fired When                                                   |
| :------------------ | :----------------------------------------------------------- |
| `drag (en-US)`      | 正在拖动元素或文本选区（在此过程中持续触发，每 350ms 触发一次） |
| `dragend (en-US)`   | 拖放操作结束。（松开鼠标按钮或按下 Esc 键）                  |
| `dragenter (en-US)` | 被拖动的元素或文本选区移入有效释放目标区                     |
| `dragstart (en-US)` | 用户开始拖动HTML元素或选中的文本                             |
| `dragleave (en-US)` | 被拖动的元素或文本选区移出有效释放目标区                     |
| `dragover (en-US)`  | 被拖动的元素或文本选区正在有效释放目标上被拖动 （在此过程中持续触发，每350ms触发一次） |
| `drop (en-US)`      | 元素在有效释放目标区上释放                                   |

| Event Name               | Fired When                                                   |
| :----------------------- | :----------------------------------------------------------- |
| `audioprocess (en-US)`   | The input buffer of a [`ScriptProcessorNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/ScriptProcessorNode) is ready to be processed. |
| `canplay (en-US)`        | The browser can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content. |
| `canplaythrough (en-US)` | The browser estimates it can play the media up to its end without stopping for content buffering. |
| `complete (en-US)`       | The rendering of an [`OfflineAudioContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/OfflineAudioContext) is terminated. |
| `durationchange (en-US)` | The `duration` attribute has been updated.                   |
| `emptied (en-US)`        | The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the [`load()`](https://developer.mozilla.org/zh-CN/docs/XPCOM_Interface_Reference/NsIDOMHTMLMediaElement) method is called to reload it. |
| `ended (en-US)`          | Playback has stopped because the end of the media was reached. |
| `loadeddata (en-US)`     | The first frame of the media has finished loading.           |
| `loadedmetadata (en-US)` | The metadata has been loaded.                                |
| `pause (en-US)`          | Playback has been paused.                                    |
| `play (en-US)`           | Playback has begun.                                          |
| `playing (en-US)`        | Playback is ready to start after having been paused or delayed due to lack of data. |
| `ratechange (en-US)`     | The playback rate has changed.                               |
| `seeked (en-US)`         | A *seek* operation completed.                                |
| `seeking (en-US)`        | A *seek* operation began.                                    |
| `stalled (en-US)`        | The user agent is trying to fetch media data, but data is unexpectedly not forthcoming. |
| `suspend (en-US)`        | Media data loading has been suspended.                       |
| `timeupdate (en-US)`     | The time indicated by the `currentTime` attribute has been updated. |
| `volumechange (en-US)`   | The volume has changed.                                      |
| `waiting (en-US)`        | Playback has stopped because of a temporary lack of data.    |

| Event Name          | Fired When                                                   |
| :------------------ | :----------------------------------------------------------- |
| `abort`             | Progression has been terminated (not due to an error).       |
| `error (en-US)`     | Progression has failed.                                      |
| `load`              | Progression has been successful.                             |
| `loadend (en-US)`   | Progress has stopped (after "error", "abort" or "load" have been dispatched). |
| `loadstart (en-US)` | Progress has begun.                                          |
| `progress (en-US)`  | In progress.                                                 |
| `timeout`           | Progression is terminated due to preset time expiring.       |

### [存储事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#存储事件)

```js
change (en-US)` (see [Non-standard events](https://developer.mozilla.org/zh-CN/docs/Web/Events#non-standard_events))
`storage (en-US)
```

### [更新事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#更新事件)

```js
checking`
`downloading`
`error (en-US)`
`noupdate`
`obsolete`
`updateready
```

### [值变化事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#值变化事件)

```js
broadcast`
`CheckboxStateChange`
`hashchange (en-US)`
`input (en-US)`
`RadioStateChange`
`readystatechange (en-US)`
`ValueChange
```

### [未分类的事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#未分类的事件)

```js
invalid (en-US)`
`message (en-US)`
`message (en-US)`
`open (en-US)`
`show
```

## [不常见和非标准事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#不常见和非标准事件)

### [Abortable Fetch events](https://developer.mozilla.org/zh-CN/docs/Web/Events#abortable_fetch_events)

| Event name      | Fired when                                                   |
| :-------------- | :----------------------------------------------------------- |
| `abort (en-US)` | A DOM request is aborted, i.e. using [`AbortController.abort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/abort). |

### WebVR events

| Event name               | Fired when                                                   |
| :----------------------- | :----------------------------------------------------------- |
| `vrdisplayactivate`      | When a VR display is able to be presented to, for example if an HMD has been moved to bring it out of standby, or woken up by being put on. |
| `vrdisplayblur`          | when presentation to a [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) has been paused for some reason by the browser, OS, or VR hardware — for example, while the user is interacting with a system menu or browser, to prevent tracking or loss of experience. |
| `vrdisplayconnect`       | when a compatible [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) is connected to the computer. |
| `vrdisplaydeactivate`    | When a [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) can no longer be presented to, for example if an HMD has gone into standby or sleep mode due to a period of inactivity. |
| `vrdisplaydisconnect`    | When a compatible [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) is disconnected from the computer. |
| `vrdisplayfocus`         | When presentation to a [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) has resumed after being blurred. |
| `vrdisplaypresentchange` | The presenting state of a [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) changes — i.e. goes from presenting to not presenting, or vice versa. |

### SVG 事件

```js
SVGAbort (en-US)`
`SVGError (en-US)`
`SVGLoad (en-US)`
`SVGResize (en-US)`
`SVGScroll (en-US)`
`SVGUnload (en-US)`
`SVGZoom
```

### 数据库事件

```js
abort (en-US)`
`blocked (en-US)`
`complete (en-US)`
`error (en-US)`
`success (en-US)`
`upgradeneeded (en-US)`
`versionchange (en-US)
```

### 脚本事件

```js
`afterscriptexecute (en-US)`
`beforescriptexecute (en-US)`
```

### 菜单事件

```js
DOMMenuItemActive`
`DOMMenuItemInactive`
```

### 窗口事件

```js
close
```

### 弹出事件

```js
popuphidden`
`popuphiding`
`popupshowing`
`popupshown`
```

### Tab 事件

```
visibilitychange (en-US)
```



### 电池事件

```js
`chargingchange`
`chargingtimechange`
`dischargingtimechange`
`levelchange`
```

### 呼叫事件

```js
`alerting`
`busy`
`callschanged`
`cfstatechange`
`connected`
`connecting`
`dialing`
`disconnected`
`disconnecting`
`error`
`held`, `holding`
`incoming`
`resuming`
`statechange (en-US)`
`voicechange`
```

### 传感器事件

```js
`compassneedscalibration`
`devicemotion (en-US)`
`deviceorientation (en-US)`
`orientationchange (en-US)`
```

### 智能卡事件

```js
`icccardlockerror`
`iccinfochange`
`smartcard-insert`
`smartcard-remove`
`stkcommand`
`stksessionend`
`cardstatechange`
```

### 短信和USSD事件

```js
`delivered`
`received`
`sent`
`ussdreceived`
```

### 帧事件

```js
`mozbrowserclose`
`mozbrowsercontextmenu`
`mozbrowsererror`
`mozbrowsericonchange`
`mozbrowserlocationchange`
`mozbrowserloadend`
`mozbrowserloadstart`
`mozbrowseropenwindow`
`mozbrowsersecuritychange`
`mozbrowsershowmodalprompt`
`mozbrowsertitlechange`
```

### DOM变异事件

```js
`DOMAttributeNameChanged (en-US)`
`DOMAttrModified (en-US)`
`DOMCharacterDataModified (en-US)`
`DOMContentLoaded (en-US)`
`DOMElementNameChanged (en-US)`
`DOMNodeInserted (en-US)`
`DOMNodeInsertedIntoDocument (en-US)`
`DOMNodeRemoved (en-US)`
`DOMNodeRemovedFromDocument (en-US)`
`DOMSubtreeModified (en-US)
```

### 触摸事件

```js
`touchcancel (en-US)`
`touchend (en-US)`
`touchmove (en-US)`
`touchstart (en-US)`
```

### 指针事件

```js
`pointerover`
`pointerenter`
`pointerdown`
`pointermove`
`pointerup`
`pointercancel`
`pointerout`
`pointerleave`
`gotpointercapture`
`lostpointercapture`
```

- [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)
- [事件开发者指南 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Guide/Events)