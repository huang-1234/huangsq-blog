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



```go
target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);
target.addEventListener(type, listener[, useCapture, wantsUntrusted  ]);  // Gecko/Mozilla only
```

- `type`: 表示监听事件类型的字符串. [事件列表](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FEvents).

- `listener`: 当所监听的事件类型触发时的回调. 会接收到一个事件通知对象.

- ```
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



```xml
<div onclick="console.log('click')"></div>
```

1. DOM0 中可以通过js脚本来给指定元素提供事件处理函数，即



```bash
element.onclick = function // 只会在冒泡阶段生效
```

1. DOM2 中, 添加了新的事件监听API, 即`addEventListener`, 同时提供了取消监听的 `removeEventListener(type, handler[, options | useCapture])`. 显然事件处理函数注册后, 要取消监听, type/hanlder/useCapture的一致.

相比第一, 第二种, `addEventListener`的方式有以下几点优势:

- 可以为同一个事件注册多个回调函数, 依次触发. 而 DOM0 的方式则会被覆盖掉. 只能添加一种
- 使用 DOM0 会覆盖 HTML 的方式.
- 可以通过参数决定监听是在冒泡阶段生效还是在捕获阶段生效.
- `element.onclick` 注册的监听只会在冒泡阶段生效

例子:



```jsx
<div id="parent">
    <div id="child" onclick="console.log('html')"/>
</div>

const child = document.getElementById('child') 

child.onclick = function () { console.log('DOM0A') } // 覆盖了 HTML 的方式
child.onclick = function () { console.log('DOM0B') } // 覆盖了上一条 DOM0A   

child.addEventLisnter('click', function () { console.log('lisnterA') })
child.addEventLisnter('click', function () { console.log('lisnterB') }) // 不会覆盖
```

三种方式对应的如何移除:



```csharp
child.setAttributer('onclick', false)
child.onclick = null
child.removeEventLisnter('设置相同的参数')
```

> 三种方式优先级排序 onclick > html > addEventLisnter. onclick 会覆盖 html. 但是 addEventLisnter 不会被覆盖且可以叠加.

## 问题

1. 以下代码的输出顺序



```xml
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

# 事件参考

发送DOM事件是为了将发生的相关事情通知代码。每个事件都是继承自[`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 接口的对象，可以包括自定义的成员属性及函数用于获取事件发生时相关的更多信息。事件可以表示任何从基本的用户交互、到发生在渲染模型自动通知的任何事情。

本文提供了一个可以发送的事件的列表；一些是官方标准中的标准事件，另一些则是在特定浏览器内部使用的事件；例如，列出的 Mozilla 特定事件，使[附加组件](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons)可以借助它们与浏览器进行交互。

## [最常见的类别](https://developer.mozilla.org/zh-CN/docs/Web/Events#最常见的类别)

| 事件名称               | 何时触发                              |
| :--------------------- | :------------------------------------ |
| `error (en-US)`        | 资源加载失败时。                      |
| `abort (en-US)`        | 正在加载资源已经被中止时。            |
| `load (en-US)`         | 资源及其相关资源已完成加载。          |
| `beforeunload (en-US)` | window，document 及其资源即将被卸载。 |
| `unload (en-US)`       | 文档或一个依赖资源正在被卸载。        |

### [网络事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#网络事件)

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

```
change (en-US)` (see [Non-standard events](https://developer.mozilla.org/zh-CN/docs/Web/Events#non-standard_events))
`storage (en-US)
```

### [更新事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#更新事件)

```
checking`
`downloading`
`error (en-US)`
`noupdate`
`obsolete`
`updateready
```

### [值变化事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#值变化事件)

```
broadcast`
`CheckboxStateChange`
`hashchange (en-US)`
`input (en-US)`
`RadioStateChange`
`readystatechange (en-US)`
`ValueChange
```

### [未分类的事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#未分类的事件)

```
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

### [WebVR events](https://developer.mozilla.org/zh-CN/docs/Web/Events#webvr_events)

| Event name               | Fired when                                                   |
| :----------------------- | :----------------------------------------------------------- |
| `vrdisplayactivate`      | When a VR display is able to be presented to, for example if an HMD has been moved to bring it out of standby, or woken up by being put on. |
| `vrdisplayblur`          | when presentation to a [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) has been paused for some reason by the browser, OS, or VR hardware — for example, while the user is interacting with a system menu or browser, to prevent tracking or loss of experience. |
| `vrdisplayconnect`       | when a compatible [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) is connected to the computer. |
| `vrdisplaydeactivate`    | When a [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) can no longer be presented to, for example if an HMD has gone into standby or sleep mode due to a period of inactivity. |
| `vrdisplaydisconnect`    | When a compatible [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) is disconnected from the computer. |
| `vrdisplayfocus`         | When presentation to a [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) has resumed after being blurred. |
| `vrdisplaypresentchange` | The presenting state of a [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) changes — i.e. goes from presenting to not presenting, or vice versa. |

### [SVG 事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#svg_事件)

```
SVGAbort (en-US)`
`SVGError (en-US)`
`SVGLoad (en-US)`
`SVGResize (en-US)`
`SVGScroll (en-US)`
`SVGUnload (en-US)`
`SVGZoom
```

### [数据库事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#数据库事件)

```
abort (en-US)`
`blocked (en-US)`
`complete (en-US)`
`error (en-US)`
`success (en-US)`
`upgradeneeded (en-US)`
`versionchange (en-US)
```

### [脚本事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#脚本事件)

```
afterscriptexecute (en-US)`
`beforescriptexecute (en-US)
```

### [菜单事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#菜单事件)

```
DOMMenuItemActive`
`DOMMenuItemInactive
```

### [窗口事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#窗口事件)

```
close
```

### [弹出事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#弹出事件)

```
popuphidden`
`popuphiding`
`popupshowing`
`popupshown
```

### [Tab 事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#tab_事件)

```
visibilitychange (en-US)
```



### [电池事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#电池事件)

```
chargingchange`
`chargingtimechange`
`dischargingtimechange`
`levelchange
```

### [呼叫事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#呼叫事件)

```
alerting`
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
`voicechange
```

### [传感器事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#传感器事件)

```
compassneedscalibration`
`devicemotion (en-US)`
`deviceorientation (en-US)`
`orientationchange (en-US)
```

### [智能卡事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#智能卡事件)

```
icccardlockerror`
`iccinfochange`
`smartcard-insert`
`smartcard-remove`
`stkcommand`
`stksessionend`
`cardstatechange
```

### [短信和USSD事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#短信和ussd事件)

```
delivered`
`received`
`sent`
`ussdreceived
```

### [帧事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#帧事件)

```
mozbrowserclose`
`mozbrowsercontextmenu`
`mozbrowsererror`
`mozbrowsericonchange`
`mozbrowserlocationchange`
`mozbrowserloadend`
`mozbrowserloadstart`
`mozbrowseropenwindow`
`mozbrowsersecuritychange`
`mozbrowsershowmodalprompt`
`mozbrowsertitlechange
```

### [DOM变异事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#dom变异事件)

```
DOMAttributeNameChanged (en-US)`
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

### [触摸事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#触摸事件)

```
touchcancel (en-US)`
`touchend (en-US)`
`touchmove (en-US)`
`touchstart (en-US)
```

### [指针事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#指针事件)

```
pointerover`
`pointerenter`
`pointerdown`
`pointermove`
`pointerup`
`pointercancel`
`pointerout`
`pointerleave`
`gotpointercapture`
`lostpointercapture
```

## [标准事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#标准事件)

这些事件在官方Web规范中定义，并且应在各个浏览器中通用。 每个事件都和代表事件接收方的对象（由此您可以查到每个事件提供的数据），定义这个事件的标准或标准链接会一起列出。

| 事件名称                              | 事件类型                                                     | 规范                                                         | 触发时机...                                                  |
| :------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `abort (en-US)`                       | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-abort) | 资源载入已被中止                                             |
| `abort (en-US)`                       | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress](http://www.w3.org/TR/progress-events/)and[XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-abort) | Progress被终止(不是error造成的)                              |
| `abort (en-US)`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [IndexedDB](http://www.w3.org/TR/IndexedDB/#database-interface) | 事务已被中止                                                 |
| `afterprint (en-US)`                  | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5](http://www.w3.org/TR/html5/webappapis.html#printing) | 相关文档已开始打印或打印预览已被关闭                         |
| `animationcancel`                     | [`AnimationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnimationEvent) | [CSS Animations](http://www.w3.org/TR/css3-animations/#animation-events) | A [CSS animation (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) has aborted. |
| `animationend (en-US)`                | [`AnimationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnimationEvent) | [CSS Animations](http://www.w3.org/TR/css3-animations/#animation-events) | 完成一个[CSS 动画 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) |
| `animationiteration (en-US)`          | [`AnimationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnimationEvent) | [CSS Animations](http://www.w3.org/TR/css3-animations/#animation-events) | 重复播放一个[CSS 动画 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) |
| `animationstart (en-US)`              | [`AnimationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnimationEvent) | [CSS Animations](http://www.w3.org/TR/css3-animations/#animation-events) | 一个 [CSS 动画 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)已开始 |
| `appinstalled`                        | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web App Manifest](https://developer.mozilla.org/zh-CN/docs/Web/Manifest) | A web application is successfully installed as a [progressive web app](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps). |
| `audioprocess (en-US)`                | [`AudioProcessingEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/AudioProcessingEvent) | [Web Audio API audioprocess](https://webaudio.github.io/web-audio-api/#AudioProcessingEvent) | 一个[`ScriptProcessorNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/ScriptProcessorNode) 的输入缓冲区可处理 |
| `audioend`                            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://wicg.github.io/speech-api/)         | 用户代理捕捉到用以语音识别的音频                             |
| `audiostart`                          | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://wicg.github.io/speech-api/)         | 用户代理开始捕捉用以语音识别的音频                           |
| `beforeprint (en-US)`                 | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5](http://www.w3.org/TR/html5/webappapis.html#printing) | 相关文档将要开始打印或准备打印预览                           |
| `beforeunload (en-US)`                | [`BeforeUnloadEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/BeforeUnloadEvent) | [HTML5](http://www.w3.org/TR/html5/browsers.html#unloading-documents) | 即将卸载 window，document 及其资源                           |
| `beginEvent (en-US)`                  | [`TimeEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/TimeEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | A [SMIL (en-US)](https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL) animation element begins. |
| `blocked (en-US)`                     |                                                              | [IndexedDB](http://www.w3.org/TR/IndexedDB/#request-api)     | An open connection to a database is blocking a `versionchange` transaction on the same database. |
| `blur (en-US)`                        | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-blur) | An element has lost focus (does not bubble).                 |
| `boundary`                            | [`SpeechSynthesisEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisEvent) | [Web Speech API](https://wicg.github.io/speech-api/)         | The spoken utterance reaches a word or sentence boundary     |
| `canplay (en-US)`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-canplay) | The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content. |
| `canplaythrough (en-US)`              | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-canplaythrough) | The user agent can play the media up to its end without having to stop for further buffering of content. |
| `change (en-US)`                      | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [DOM L2](http://www.w3.org/TR/DOM-Level-2-Events/events.html), [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-input-element-attributes.html#event-input-change) | The `change` event is fired for [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input), [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select), and [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea) elements when a change to the element's value is committed by the user. |
| `chargingchange`                      | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Battery status](https://dvcs.w3.org/hg/dap/raw-file/tip/battery/Overview.html) | The battery begins or stops charging.                        |
| `chargingtimechange`                  | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Battery status](https://dvcs.w3.org/hg/dap/raw-file/tip/battery/Overview.html) | The `chargingTime` attribute has been updated.               |
| `click (en-US)`                       | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-click) | A pointing device button has been pressed and released on an element. |
| `close (en-US)`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [WebSocket](http://www.w3.org/TR/websockets/)                | A WebSocket connection has been closed.                      |
| `complete (en-US)`                    |                                                              | [IndexedDB](http://www.w3.org/TR/IndexedDB/#transaction)     | A transaction successfully completed.                        |
| `complete (en-US)`                    | [`OfflineAudioCompletionEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioCompletionEvent) | [Web Audio API OfflineAudioCompletionEvent](https://webaudio.github.io/web-audio-api/#OfflineAudioCompletionEvent-section) | The rendering of an [`OfflineAudioContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/OfflineAudioContext) is terminated. |
| `compositionend (en-US)`              | [`CompositionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CompositionEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-compositionend) | The composition of a passage of text has been completed or canceled. |
| `compositionstart (en-US)`            | [`CompositionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CompositionEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-compositionstart) | The composition of a passage of text is prepared (similar to keydown for a keyboard input, but works with other inputs such as speech recognition). |
| `compositionupdate (en-US)`           | [`CompositionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CompositionEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-compositionupdate) | A character is added to a passage of text being composed.    |
| `contextmenu (en-US)`                 | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [HTML5](https://html.spec.whatwg.org/multipage/forms.html#context-menus) | The right button of the mouse is clicked (before the context menu is displayed). |
| `copy (en-US)`                        | [`ClipboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent) | [Clipboard](http://www.w3.org/TR/clipboard-apis/#copy-event) | The text selection has been added to the clipboard.          |
| `cut (en-US)`                         | [`ClipboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent) | [Clipboard](http://www.w3.org/TR/clipboard-apis/#cut-event)  | The text selection has been removed from the document and added to the clipboard. |
| `dblclick (en-US)`                    | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-dblclick) | A pointing device button is clicked twice on an element.     |
| `devicechange`                        | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Media Capture and Streams](https://w3c.github.io/mediacapture-main/) | A media device such as a camera, microphone, or speaker is connected or removed from the system. |
| `devicemotion (en-US)`                | [`DeviceMotionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent) | [Device Orientation Events](http://dev.w3.org/geo/api/spec-source-orientation.html) | Fresh data is available from a motion sensor.                |
| `deviceorientation (en-US)`           | [`DeviceOrientationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceOrientationEvent) | [Device Orientation Events](http://dev.w3.org/geo/api/spec-source-orientation.html) | Fresh data is available from an orientation sensor.          |
| `dischargingtimechange`               | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Battery status](https://dvcs.w3.org/hg/dap/raw-file/tip/battery/Overview.html) | The `dischargingTime` attribute has been updated.            |
| `DOMActivate`                         | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMActivate) | A button, link or state changing element is activated (use `click (en-US)` instead). |
| `DOMAttributeNameChanged (en-US)`     | `MutationNameEvent`                                          | [DOM L3](http://www.w3.org/TR/2011/WD-DOM-Level-3-Events-20110531/#event-type-DOMAttributeNameChanged) Removed | The name of an attribute changed (use [mutation observers](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) instead). |
| `DOMAttrModified (en-US)`             | [`MutationEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMAttrModified) | The value of an attribute has been modified (use [mutation observers](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) instead). |
| `DOMCharacterDataModified (en-US)`    | [`MutationEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMCharacterDataModified) | A text or another [CharacterData (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/CharacterData) has changed (use [mutation observers](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) instead). |
| `DOMContentLoaded (en-US)`            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#the-end) | The document has finished loading (but not its dependent resources). |
| `DOMElementNameChanged (en-US)`       | `MutationNameEvent`                                          | [DOM L3](http://www.w3.org/TR/2011/WD-DOM-Level-3-Events-20110531/#event-type-DOMElementNameChanged) Removed | The name of an element changed (use [mutation observers](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) instead). |
| `DOMFocusIn`                          | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMFocusIn) | An element has received focus (use `focus (en-US)` or `focusin (en-US)` instead). |
| `DOMFocusOut`                         | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMFocusOut) | An element has lost focus (use `blur (en-US)` or `focusout (en-US)` instead). |
| `DOMNodeInserted (en-US)`             | [`MutationEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMNodeInserted) | A node has been added as a child of another node (use [mutation observers](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) instead). |
| `DOMNodeInsertedIntoDocument (en-US)` | [`MutationEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMNodeInsertedIntoDocument) | A node has been inserted into the document (use [mutation observers](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) instead). |
| `DOMNodeRemoved (en-US)`              | [`MutationEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMNodeRemoved) | A node has been removed from its parent node (use [mutation observers](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) instead). |
| `DOMNodeRemovedFromDocument (en-US)`  | [`MutationEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMNodeRemovedFromDocument) | A node has been removed from the document (use [mutation observers](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) instead). |
| `DOMSubtreeModified (en-US)`          | [`MutationEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMSubtreeModified) | A change happened in the document (use [mutation observers](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) instead). |
| `drag (en-US)`                        | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-drag) | An element or text selection is being dragged (every 350ms). |
| `dragend (en-US)`                     | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-dragend) | A drag operation is being ended (by releasing a mouse button or hitting the escape key). |
| `dragenter (en-US)`                   | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-dragenter) | A dragged element or text selection enters a valid drop target. |
| `dragleave (en-US)`                   | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-dragleave) | A dragged element or text selection leaves a valid drop target. |
| `dragover (en-US)`                    | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-dragover) | An element or text selection is being dragged over a valid drop target (every 350ms). |
| `dragstart (en-US)`                   | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-dragstart) | The user starts dragging an element or text selection.       |
| `drop (en-US)`                        | [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#event-drop) | An element is dropped on a valid drop target.                |
| `durationchange (en-US)`              | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-durationchange) | The `duration` attribute has been updated.                   |
| `emptied (en-US)`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-emptied) | The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the [`load()`](https://developer.mozilla.org/zh-CN/docs/XPCOM_Interface_Reference/NsIDOMHTMLMediaElement) method is called to reload it. |
| `end`                                 | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://wicg.github.io/speech-api/)         | The speech recognition service has disconnected.             |
| `end`                                 | [`SpeechSynthesisEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisEvent) | [Web Speech API](https://wicg.github.io/speech-api/)         | The utterance has finished being spoken.                     |
| `ended (en-US)`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-ended) | Playback has stopped because the end of the media was reached. |
| `ended (en-US)`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Audio API](https://webaudio.github.io/web-audio-api/)   | Playback has stopped because the end of the media was reached. |
| `endEvent (en-US)`                    | [`TimeEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/TimeEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | A [SMIL (en-US)](https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL) animation element ends. |
| `error (en-US)`                       | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-error) | A resource failed to load.                                   |
| `error (en-US)`                       | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress](http://www.w3.org/TR/progress-events/) and [XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-error) | Progression has failed.                                      |
| `error (en-US)`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [WebSocket](http://www.w3.org/TR/websockets/)                | A WebSocket connection has been closed with prejudice (some data couldn't be sent for example). |
| `error (en-US)`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Server Sent Events](http://dev.w3.org/html5/eventsource/)   | An event source connection has been failed.                  |
| `error (en-US)`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [IndexedDB](http://www.w3.org/TR/IndexedDB/#request-api)     | A request caused an error and failed.                        |
| `error`                               | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://wicg.github.io/speech-api/)         | A speech recognition error occurs.                           |
| `error`                               | [`SpeechSynthesisErrorEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisErrorEvent) | [Web Speech API](https://wicg.github.io/speech-api/)         | An error occurs that prevents the utterance from being successfully spoken. |
| `focus (en-US)`                       | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-focus) | An element has received focus (does not bubble).             |
| `focusin (en-US)`                     | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-focusIn) | An element is about to receive focus (bubbles).              |
| `focusout (en-US)`                    | [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-focusout) | An element is about to lose focus (bubbles).                 |
| `fullscreenchange (en-US)`            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Full Screen](https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html#api) | An element was turned to fullscreen mode or back to normal mode. |
| `fullscreenerror (en-US)`             | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Full Screen](https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html#api) | It was impossible to switch to fullscreen mode for technical reasons or because the permission was denied. |
| `gamepadconnected (en-US)`            | [`GamepadEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/GamepadEvent) | [Gamepad](http://www.w3.org/TR/gamepad/#the-gamepadconnected-event) | A gamepad has been connected.                                |
| `gamepaddisconnected (en-US)`         | [`GamepadEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/GamepadEvent) | [Gamepad](http://www.w3.org/TR/gamepad/#the-gamepaddisconnected-event) | A gamepad has been disconnected.                             |
| `gotpointercapture`                   | [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) | [Pointer Events](http://www.w3.org/TR/pointerevents/#the-gotpointercapture-event) | Element receives pointer capture.                            |
| `hashchange (en-US)`                  | [`HashChangeEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html#event-hashchange) | The fragment identifier of the URL has changed (the part of the URL after the #). |
| `lostpointercapture`                  | [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) | [Pointer Events](http://www.w3.org/TR/pointerevents/#the-lostpointercapture-event) | Element lost pointer capture.                                |
| `input (en-US)`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5](http://www.w3.org/TR/html5/forms.html#common-event-behaviors) | The value of an element changes or the content of an element with the attribute [contenteditable](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/contentEditable) is modified. |
| `invalid (en-US)`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#constraint-validation) | A submittable element has been checked and doesn't satisfy its constraints. |
| `keydown (en-US)`                     | [`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-keydown) | A key is pressed down.                                       |
| `keypress (en-US)`                    | [`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-keypress) | A key is pressed down and that key normally produces a character value (use input instead). |
| `keyup (en-US)`                       | [`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-keyup) | A key is released.                                           |
| `languagechange (en-US)`              | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML 5.1 NavigatorLanguage.languages](https://www.w3.org/TR/html51/#dom-navigator-languages) | The user's preferred languages have changed.                 |
| `levelchange`                         | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Battery status](https://dvcs.w3.org/hg/dap/raw-file/tip/battery/Overview.html) | The `level` attribute has been updated.                      |
| `load (en-US)`                        | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-load) | A resource and its dependent resources have finished loading. |
| `load (en-US)`                        | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress](http://www.w3.org/TR/progress-events/) and [XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-load) | Progression has been successful.                             |
| `loadeddata (en-US)`                  | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-loadeddata) | The first frame of the media has finished loading.           |
| `loadedmetadata (en-US)`              | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-loadedmetadata) | The metadata has been loaded.                                |
| `loadend (en-US)`                     | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress](http://www.w3.org/TR/progress-events/) and [XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-loadend) | Progress has stopped (after "error", "abort" or "load" have been dispatched). |
| `loadstart (en-US)`                   | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress ](http://www.w3.org/TR/progress-events/)and [XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-loadstart) | Progress has begun.                                          |
| `mark`                                | [`SpeechSynthesisEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisEvent) | [Web Speech API](https://wicg.github.io/speech-api/)         | The spoken utterance reaches a named SSML "mark" tag.        |
| `message (en-US)`                     | [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent) | [WebSocket](http://www.w3.org/TR/websockets/)                | A message is received through a WebSocket.                   |
| `message (en-US)`                     | [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent) | [Web Workers](http://www.w3.org/TR/workers/#communicating-with-a-dedicated-worker) | A message is received from a Web Worker.                     |
| `message`                             | [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent) | [Web Messaging](http://www.w3.org/TR/webmessaging/)          | A message is received from a child (i)frame or a parent window. |
| `message (en-US)`                     | [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent) | [Server Sent Events](http://dev.w3.org/html5/eventsource/)   | A message is received through an event source.               |
| `messageerror`                        | [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent) | [`MessagePort`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort), [Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API), [Broadcast Channel](https://developer.mozilla.org/zh-CN/docs/Web/API/Broadcast_Channel_API), [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) | A message error is raised when a message is received by an object. |
| `message`                             | [`ServiceWorkerMessageEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerMessageEvent) or [`ExtendableMessageEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableMessageEvent), depending on context. | [Service Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) | A message is received from a service worker, or a message is received in a service worker from another context. |
| `mousedown (en-US)`                   | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mousedown) | A pointing device button (usually a mouse) is pressed on an element. |
| `mouseenter (en-US)`                  | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseenter) | A pointing device is moved onto the element that has the listener attached. |
| `mouseleave (en-US)`                  | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseleave) | A pointing device is moved off the element that has the listener attached. |
| `mousemove (en-US)`                   | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mousemove) | A pointing device is moved over an element.                  |
| `mouseout (en-US)`                    | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseout) | A pointing device is moved off the element that has the listener attached or off one of its children. |
| `mouseover (en-US)`                   | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseover) | A pointing device is moved onto the element that has the listener attached or onto one of its children. |
| `mouseup (en-US)`                     | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseup) | A pointing device button is released over an element.        |
| `nomatch`                             | [`SpeechRecognitionEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionEvent) | [Web Speech API](https://wicg.github.io/speech-api/)         | The speech recognition service returns a final result with no significant recognition. |
| `notificationclick`                   | [`NotificationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/NotificationEvent) | [Notifications API onnotificationclick](https://notifications.spec.whatwg.org/#dom-serviceworkerglobalscope-onnotificationclick) | A system notification spawned by [`ServiceWorkerRegistration.showNotification()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification) has been clicked. |
| `offline (en-US)`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 offline](http://www.whatwg.org/specs/web-apps/current-work/multipage/offline.html#event-offline) | The browser has lost access to the network.                  |
| `online (en-US)`                      | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 offline](http://www.whatwg.org/specs/web-apps/current-work/multipage/offline.html#event-online) | The browser has gained access to the network (but particular websites might be unreachable). |
| `open (en-US)`                        | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [WebSocket](http://www.w3.org/TR/websockets/)                | A WebSocket connection has been established.                 |
| `open (en-US)`                        | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Server Sent Events](http://dev.w3.org/html5/eventsource/)   | An event source connection has been established.             |
| `orientationchange (en-US)`           | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Screen Orientation](http://www.w3.org/TR/screen-orientation/) | The orientation of the device (portrait/landscape) has changed |
| `pagehide (en-US)`                    | [`PageTransitionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PageTransitionEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html#event-pagehide) | A session history entry is being traversed from.             |
| `pageshow (en-US)`                    | [`PageTransitionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PageTransitionEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html#event-pageshow) | A session history entry is being traversed to.               |
| `paste (en-US)`                       | [`ClipboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent) | [Clipboard](http://www.w3.org/TR/clipboard-apis/#paste-event) | Data has been transferred from the system clipboard to the document. |
| `pause (en-US)`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-pause) | Playback has been paused.                                    |
| `pause`                               | [`SpeechSynthesisEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisEvent) | [Web Speech API](https://wicg.github.io/speech-api/)         | The utterance is paused part way through.                    |
| `pointercancel`                       | [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) | [Pointer Events](http://www.w3.org/TR/pointerevents/#the-pointercancel-event) | The pointer is unlikely to produce any more events.          |
| `pointerdown`                         | [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) | [Pointer Events](http://www.w3.org/TR/pointerevents/#the-pointerdown-event) | The pointer enters the active buttons state.                 |
| `pointerenter`                        | [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) | [Pointer Events](http://www.w3.org/TR/pointerevents/#the-pointerenter-event) | Pointing device is moved inside the hit-testing boundary.    |
| `pointerleave`                        | [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) | [Pointer Events](http://www.w3.org/TR/pointerevents/#the-pointerleave-event) | Pointing device is moved out of the hit-testing boundary.    |
| `pointerlockchange (en-US)`           | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Pointer Lock](http://www.w3.org/TR/pointerlock/#pointerlockchange-and-pointerlockerror-events) | The pointer was locked or released.                          |
| `pointerlockerror (en-US)`            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Pointer Lock](http://www.w3.org/TR/pointerlock/#pointerlockchange-and-pointerlockerror-events) | It was impossible to lock the pointer for technical reasons or because the permission was denied. |
| `pointermove`                         | [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) | [Pointer Events](http://www.w3.org/TR/pointerevents/#the-pointermove-event) | The pointer changed coordinates.                             |
| `pointerout`                          | [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) | [Pointer Events](http://www.w3.org/TR/pointerevents/#the-pointerout-event) | The pointing device moved out of hit-testing boundary or leaves detectable hover range. |
| `pointerover`                         | [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) | [Pointer Events](http://www.w3.org/TR/pointerevents/#the-pointerover-event) | The pointing device is moved into the hit-testing boundary.  |
| `pointerup`                           | [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) | [Pointer Events](http://www.w3.org/TR/pointerevents/#the-pointerup-event) | The pointer leaves the active buttons state.                 |
| `play (en-US)`                        | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-play) | Playback has begun.                                          |
| `playing (en-US)`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-playing) | Playback is ready to start after having been paused or delayed due to lack of data. |
| `popstate (en-US)`                    | [`PopStateEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent) | [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html#event-popstate) | A session history entry is being navigated to (in certain cases). |
| `progress (en-US)`                    | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [Progress](http://www.w3.org/TR/progress-events/) and [XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-progress) | In progress.                                                 |
| `push`                                | [`PushEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent) | [Push API](https://w3c.github.io/push-api/)                  | A [Service Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) has received a push message. |
| `pushsubscriptionchange`              | [`PushEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent) | [Push API](https://w3c.github.io/push-api/)                  | A [PushSubscription (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription) has expired. |
| `ratechange (en-US)`                  | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-ratechange) | The playback rate has changed.                               |
| `readystatechange (en-US)`            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | HTML5 and [XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-readystatechange) | The readyState attribute of a document has changed.          |
| `repeatEvent (en-US)`                 | [`TimeEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/TimeEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | A [SMIL (en-US)](https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL) animation element is repeated. |
| `reset (en-US)`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [DOM L2](http://www.w3.org/TR/DOM-Level-2-Events/events.html), [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#form-submission-0#resetting-a-form) | A form is reset.                                             |
| `resize (en-US)`                      | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-resize) | The document view has been resized.                          |
| `resourcetimingbufferfull`            | [`Performance`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance) | [Resource Timing](https://w3c.github.io/resource-timing/#dom-performance-onresourcetimingbufferfull) | The browser's resource timing buffer is full.                |
| `result`                              | [`SpeechRecognitionEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionEvent) | [Web Speech API](https://wicg.github.io/speech-api/)         | The speech recognition service returns a result — a word or phrase has been positively recognized and this has been communicated back to the app. |
| `resume`                              | [`SpeechSynthesisEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisEvent) | [Web Speech API](https://wicg.github.io/speech-api/)         | A paused utterance is resumed.                               |
| `scroll (en-US)`                      | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-scroll) | The document view or an element has been scrolled.           |
| `seeked (en-US)`                      | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-seeked) | A *seek* operation completed.                                |
| `seeking (en-US)`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-seeking) | A *seek* operation began.                                    |
| `select (en-US)`                      | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-select) | Some text is being selected.                                 |
| `selectstart`                         | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Selection API](https://w3c.github.io/selection-api/)        | A selection just started.                                    |
| `selectionchange`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Selection API](https://w3c.github.io/selection-api/)        | The selection in the document has been changed.              |
| `show (en-US)`                        | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) | [HTML5](http://www.w3.org/TR/html5/interactive-elements.html#context-menus) | A contextmenu event was fired on/bubbled to an element that has a [contextmenu](https://developer.mozilla.org/zh-CN/docs/DOM/element.contextmenu) attribute |
| `slotchange`                          | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [DOM](https://dom.spec.whatwg.org/)                          | The node contents of a [`HTMLSlotElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSlotElement) ([``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot)) have changed. |
| `soundend`                            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://wicg.github.io/speech-api/)         | Any sound — recognisable speech or not — has stopped being detected. |
| `soundstart`                          | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://wicg.github.io/speech-api/)         | Any sound — recognisable speech or not — has been detected.  |
| `speechend`                           | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://wicg.github.io/speech-api/)         | Speech recognised by the speech recognition service has stopped being detected. |
| `speechstart`                         | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://wicg.github.io/speech-api/)         | Sound that is recognised by the speech recognition service as speech has been detected. |
| `stalled (en-US)`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-stalled) | The user agent is trying to fetch media data, but data is unexpectedly not forthcoming. |
| `start`                               | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://wicg.github.io/speech-api/)         | The speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current `SpeechRecognition`. |
| `start`                               | [`SpeechSynthesisEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisEvent) | [Web Speech API](https://wicg.github.io/speech-api/)         | The utterance has begun to be spoken.                        |
| `storage (en-US)`                     | [`StorageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/StorageEvent) | [Web Storage](http://www.w3.org/TR/webstorage/#the-storage-event) | A storage area ([localStorage](https://developer.mozilla.org/zh-CN/docs/conflicting/Web/API/Web_Storage_API#localstorage) or [sessionStorage](https://developer.mozilla.org/zh-CN/docs/conflicting/Web/API/Web_Storage_API#sessionstorage)) has changed. |
| `submit (en-US)`                      | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [DOM L2](http://www.w3.org/TR/DOM-Level-2-Events/events.html), [HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#form-submission-algorithm) | A form is submitted.                                         |
| `success (en-US)`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [IndexedDB](http://www.w3.org/TR/IndexedDB/#request-api)     | A request successfully completed.                            |
| `suspend (en-US)`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-suspend) | Media data loading has been suspended.                       |
| `SVGAbort (en-US)`                    | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | Page loading has been stopped before the [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) was loaded. |
| `SVGError (en-US)`                    | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An error has occurred before the [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) was loaded. |
| `SVGLoad (en-US)`                     | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) document has been loaded and parsed. |
| `SVGResize (en-US)`                   | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) document is being resized. |
| `SVGScroll (en-US)`                   | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) document is being scrolled. |
| `SVGUnload (en-US)`                   | [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent) | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) document has been removed from a window or frame. |
| `SVGZoom`                             | `SVGZoomEvent`                                               | [SVG](http://www.w3.org/TR/SVG/interact.html#SVGEvents)      | An [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) document is being zoomed. |
| `timeout`                             | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | [XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/#event-xhr-timeout) |                                                              |
| `timeupdate (en-US)`                  | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-timeupdate) | The time indicated by the `currentTime` attribute has been updated. |
| `touchcancel (en-US)`                 | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/)           | A touch point has been disrupted in an implementation-specific manners (too many touch points for example). |
| `touchend (en-US)`                    | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/#the-touchend-event) | A touch point is removed from the touch surface.             |
| `touchmove (en-US)`                   | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/#the-touchmove-event) | A touch point is moved along the touch surface.              |
| `touchstart (en-US)`                  | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/#the-touchstart---------event) | A touch point is placed on the touch surface.                |
| `transitionend (en-US)`               | [`TransitionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TransitionEvent) | [CSS Transitions](http://www.w3.org/TR/css3-transitions/#transition-events) | A [CSS transition (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) has completed. |
| `unload (en-US)`                      | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-unload) | The document or a dependent resource is being unloaded.      |
| `upgradeneeded (en-US)`               |                                                              | [IndexedDB](http://www.w3.org/TR/IndexedDB/#request-api)     | An attempt was made to open a database with a version number higher than its current version. A `versionchange` transaction has been created. |
| `userproximity`                       | [`UserProximityEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/UserProximityEvent) | [Proximity Sensor](https://w3c.github.io/proximity/)         | Fresh data is available from a proximity sensor (indicates whether the nearby object is `near` the device or not). |
| `voiceschanged`                       | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Web Speech API](https://wicg.github.io/speech-api/)         | The list of [`SpeechSynthesisVoice` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice) objects that would be returned by the [`SpeechSynthesis.getVoices()`](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis/getVoices) method has changed (when the `voiceschanged` event fires.) |
| `versionchange (en-US)`               |                                                              | [IndexedDB](http://www.w3.org/TR/IndexedDB/#database-interface) | A `versionchange` transaction completed.                     |
| `visibilitychange (en-US)`            | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [Page visibility](http://www.w3.org/TR/page-visibility/#sec-visibilitychange-event) | The content of a tab has become visible or has been hidden.  |
| `volumechange (en-US)`                | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-volumechange) | The volume has changed.                                      |
| `waiting (en-US)`                     | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | [HTML5 media](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#event-media-waiting) | Playback has stopped because of a temporary lack of data.    |
| `wheel (en-US)`                       | [`WheelEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/WheelEvent) | [DOM L3](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-wheel) | A wheel button of a pointing device is rotated in any direction. |

## [非标准事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#非标准事件)

| Event Name                                                   | Event Type                                                   | Specification                                                | Fired when...                                                |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `afterscriptexecute (en-US)`                                 | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | *Mozilla Specific*                                           | A script has been executed.                                  |
| `beforescriptexecute (en-US)`                                | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | *Mozilla Specific*                                           | A script is about to be executed.                            |
| `beforeinstallprompt`                                        | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | *Chrome specific*                                            | A user is prompted to save a web site to a home screen on mobile. |
| `cardstatechange`                                            |                                                              | *Firefox OS specific*                                        | The `MozMobileConnection.cardState` property changes value.  |
| `change (en-US)`                                             | `DeviceStorageChangeEvent`                                   | *Firefox OS specific*                                        | This event is triggered each time a file is created, modified or deleted on a given storage area. |
| `connectionInfoUpdate`                                       |                                                              | *Firefox OS specific*                                        | The informations about the signal strength and the link speed have been updated. |
| `cfstatechange`                                              |                                                              | *Firefox OS specific*                                        | The call forwarding state changes.                           |
| `datachange`                                                 |                                                              | *Firefox OS specific*                                        | The `MozMobileConnection.data` object changes values.        |
| `dataerror`                                                  |                                                              | *Firefox OS specific*                                        | The `MozMobileConnection.data` object receive an error from the RIL. |
| `DOMMouseScroll (en-US)`                                     |                                                              | *Mozilla specific*                                           | The wheel button of a pointing device is rotated (detail attribute is a number of lines). (use `wheel (en-US)` instead) |
| `dragdrop`                                                   | `DragEvent`                                                  | *Mozilla specific*                                           | An element is dropped (use `drop (en-US)` instead).          |
| `dragexit`                                                   | `DragEvent`                                                  | *Mozilla specific*                                           | A drag operation is being ended(use `dragend (en-US)` instead). |
| `draggesture`                                                | `DragEvent`                                                  | *Mozilla specific*                                           | The user starts dragging an element or text selection (use `dragstart (en-US)` instead). |
| `icccardlockerror`                                           |                                                              | *Firefox OS specific*                                        | the `MozMobileConnection.unlockCardLock()` or `MozMobileConnection.setCardLock()` methods fails. |
| `iccinfochange`                                              |                                                              | *Firefox OS specific*                                        | The `MozMobileConnection.iccInfo` object changes.            |
| `localized`                                                  |                                                              | *[Mozilla Specific](https://github.com/fabi1cazenave/webL10n)* | The page has been localized using data-l10n-* attributes.    |
| `mousewheel (en-US)`                                         |                                                              | [*IE invented*](http://msdn.microsoft.com/en-us/library/ie/ms536951(v=vs.85).aspx) | The wheel button of a pointing device is rotated.            |
| `MozAudioAvailable`                                          | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) | *Mozilla specific*                                           | The audio buffer is full and the corresponding raw samples are available. |
| [`MozBeforeResize`](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozBeforeResize) |                                                              | *Mozilla specific*                                           | A window is about to be resized.                             |
| `mozbrowseractivitydone`                                     |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when some activity has been completed (complete description TBD.) |
| `mozbrowserasyncscroll`                                      |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the scroll position within a browser` `[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) changes. |
| `mozbrowseraudioplaybackchange`                              |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when audio starts or stops playing within the browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) content. |
| `mozbrowsercaretstatechanged`                                |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the text selected inside the browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) content changes. |
| `mozbrowserclose`                                            |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when window.close() is called within a browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe). |
| `mozbrowsercontextmenu`                                      |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when a browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) try to open a context menu. |
| `mozbrowserdocumentfirstpaint`                               |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when a new paint occurs on any document in the browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe). |
| `mozbrowsererror`                                            |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when an error occured while trying to load a content within a browser iframe |
| `mozbrowserfindchange`                                       |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when a search operation is performed on the browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) content (see [HTMLIFrameElement search methods](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement#search_methods).) |
| `mozbrowserfirstpaint`                                       |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) paints content for the first time (this doesn't include the initial paint from *about:blank*.) |
| `mozbrowsericonchange`                                       |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the favicon of a browser iframe changes.           |
| `mozbrowserlocationchange`                                   |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when an browser iframe's location changes.              |
| `mozbrowserloadend`                                          |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the browser iframe has finished loading all its assets. |
| `mozbrowserloadstart`                                        |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the browser iframe starts to load a new page.      |
| `mozbrowsermanifestchange`                                   |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when a the path to the app manifest changes, in the case of a browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) with an open web app embedded in it. |
| `mozbrowsermetachange`                                       |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when a [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) elelment is added to, removed from or changed in the browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)'s content. |
| `mozbrowseropensearch`                                       |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when a link to a search engine is found.                |
| `mozbrowseropentab`                                          |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when a new tab is opened within a browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) as a result of the user issuing a command to open a link target in a new tab (for example ctrl/cmd + click.) |
| `mozbrowseropenwindow`                                       |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when [`window.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open) is called within a browser iframe. |
| `mozbrowserresize`                                           |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)'s window size has changed. |
| `mozbrowserscroll`                                           |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) content scrolls. |
| `mozbrowserscrollareachanged`                                |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the available scrolling area in the browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) changes. This can occur on resize and when the page size changes (while loading for example.) |
| `mozbrowserscrollviewchange`                                 |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when asynchronous scrolling (i.e. APCZ) starts or stops. |
| `mozbrowsersecuritychange`                                   |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the SSL state changes within a browser iframe.     |
| `mozbrowserselectionstatechanged`                            |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the text selected inside the browser [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) content changes. Note that this is deprecated, and newer implementations use `mozbrowsercaretstatechanged` instead. |
| `mozbrowsershowmodalprompt`                                  |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when [`alert()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert), [`confirm()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/confirm) or [`prompt()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/prompt) are called within a browser iframe |
| `mozbrowsertitlechange`                                      |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the document.title changes within a browser iframe. |
| `mozbrowserusernameandpasswordrequired`                      |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when an HTTP authentification is requested.             |
| `mozbrowservisibilitychange`                                 |                                                              | *Firefox OS [Browser API](https://developer.mozilla.org/zh-CN/docs/Web/API/Browser_API)-specific* | Sent when the visibility state of the current browser iframe [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) changes, for example due to a call to `setVisible()`. |
| `MozGamepadButtonDown`                                       |                                                              | *To be specified*                                            | A gamepad button is pressed down.                            |
| `MozGamepadButtonUp`                                         |                                                              | *To be specified*                                            | A gamepad button is released.                                |
| `MozMousePixelScroll (en-US)`                                |                                                              | *Mozilla specific*                                           | The wheel button of a pointing device is rotated (detail attribute is a number of pixels). (use wheel instead) |
| `MozOrientation`                                             |                                                              | *Mozilla specific*                                           | Fresh data is available from an orientation sensor (see deviceorientation). |
| `MozScrolledAreaChanged`                                     | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | *Mozilla specific*                                           | The document view has been scrolled or resized.              |
| `moztimechange`                                              |                                                              | *Mozilla specific*                                           | The time of the device has been changed.                     |
| [MozTouchDown](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Mozilla_experimental_events) |                                                              | *Mozilla specific*                                           | A touch point is placed on the touch surface (use touchstart instead). |
| [MozTouchMove](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Mozilla_experimental_events) |                                                              | *Mozilla specific*                                           | A touch point is moved along the touch surface (use touchmove instead). |
| [MozTouchUp](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Mozilla_experimental_events) |                                                              | *Mozilla specific*                                           | A touch point is removed from the touch surface (use touchend instead). |
| `alerting`                                                   | `CallEvent`                                                  | *To be specified*                                            | The correspondent is being alerted (his/her phone is ringing). |
| `busy`                                                       | `CallEvent`                                                  | *To be specified*                                            | The line of the correspondent is busy.                       |
| `callschanged`                                               | `CallEvent`                                                  | *To be specified*                                            | A call has been added or removed from the list of current calls. |
| [onconnected](https://developer.mozilla.org/zh-CN/docs/DOM/onconnected) `connected` | `CallEvent`                                                  | *To be specified*                                            | A call has been connected.                                   |
| `connecting`                                                 | `CallEvent`                                                  | *To be specified*                                            | A call is about to connect.                                  |
| `delivered`                                                  | `SMSEvent`                                                   | *To be specified*                                            | An SMS has been successfully delivered.                      |
| `dialing`                                                    | `CallEvent`                                                  | *To be specified*                                            | The number of a correspondent has been dialed.               |
| `disabled`                                                   |                                                              | *Firefox OS specific*                                        | Wifi has been disabled on the device.                        |
| `disconnected`                                               | `CallEvent`                                                  | *To be specified*                                            | A call has been disconnected.                                |
| `disconnecting`                                              | `CallEvent`                                                  | *To be specified*                                            | A call is about to disconnect.                               |
| `enabled`                                                    |                                                              | *Firefox OS specific*                                        | Wifi has been enabled on the device.                         |
| `error`                                                      | `CallEvent`                                                  | *To be specified*                                            | An error occurred.                                           |
| `held`                                                       | `CallEvent`                                                  | *To be specified*                                            | A call has been held.                                        |
| `holding`                                                    | `CallEvent`                                                  | *To be specified*                                            | A call is about to be held.                                  |
| `incoming`                                                   | `CallEvent`                                                  | *To be specified*                                            | A call is being received.                                    |
| `received`                                                   | `SMSEvent`                                                   | *To be specified*                                            | An SMS has been received.                                    |
| `resuming`                                                   | `CallEvent`                                                  | *To be specified*                                            | A call is about to resume.                                   |
| `sent`                                                       | `SMSEvent`                                                   | *To be specified*                                            | An SMS has been sent.                                        |
| `statechange (en-US)`                                        | `CallEvent`                                                  | *To be specified*                                            | The state of a call has changed.                             |
| `statuschange`                                               |                                                              | *Firefox OS specific*                                        | The status of the Wifi connection changed.                   |
| `overflow (en-US)`                                           | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | *Mozilla specific*                                           | An element has been overflowed by its content or has been rendered for the first time in this state (only works for elements styled with `overflow` != `visible`). |
| `smartcard-insert`                                           |                                                              | *Mozilla specific*                                           | A [smartcard](https://developer.mozilla.org/zh-CN/docs/JavaScript_crypto) has been inserted. |
| `smartcard-remove`                                           |                                                              | *Mozilla specific*                                           | A [smartcard](https://developer.mozilla.org/zh-CN/docs/JavaScript_crypto) has been removed. |
| `stkcommand`                                                 |                                                              | *Firefox OS specific*                                        | The STK Proactive Command is issued from ICC.                |
| `stksessionend`                                              |                                                              | *Firefox OS specific*                                        | The STK Session is terminated by ICC.                        |
| `touchenter`                                                 | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/#the-touchstart---------event) Removed |                                                              |
| `touchleave`                                                 | [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) | [Touch Events](http://www.w3.org/TR/touch-events/#the-touchstart---------event) Removed |                                                              |
| `underflow (en-US)`                                          | [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) | *Mozilla specific*                                           | An element is no longer overflowed by its content (only works for elements styled with `overflow` != `visible`). |
| `uploadprogress`                                             | [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent) | *Mozilla Specific*                                           | Upload is in progress (see `progress (en-US)`).              |
| `ussdreceived`                                               |                                                              | *Firefox OS specific*                                        | A new USSD message is received                               |
| `voicechange`                                                |                                                              | *Firefox OS specific*                                        | The `MozMobileConnection.voice` object changes values.       |
| `msContentZoom`                                              |                                                              | *Microsoft specific*                                         |                                                              |
| `MSManipulationStateChanged`                                 |                                                              | *Microsoft specific*                                         |                                                              |
| `MSPointerHover`                                             |                                                              | *Microsoft specific*                                         |                                                              |

## [Mozilla 特定事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#mozilla_特定事件)

**注意：**这些事件不会暴露给 Web 内容使用，只能在 chrome 内容的上下文中使用。

### [XUL 事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#xul_事件)

| Event Name                                                   | Event Type   | Specification                                                | Fired when...                                                |
| :----------------------------------------------------------- | :----------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `broadcast`                                                  |              | [XUL](https://developer.mozilla.org/zh-CN/docs/XUL/Tutorial/Broadcasters_and_Observers#Broadcast_event) | An `observer` noticed a change to the attributes of a watched broadcaster. |
| `CheckboxStateChange`                                        |              | XUL                                                          | The state of a `checkbox` has been changed either by a user action or by a script (useful for accessibility). |
| [close](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/close_event) |              | XUL                                                          | The close button of the window has been clicked.             |
| `command`                                                    |              | XUL                                                          | An element has been activated.                               |
| `commandupdate`                                              |              | XUL                                                          | A command update occurred on a `commandset` element.         |
| `DOMMenuItemActive`                                          |              | XUL                                                          | A menu or menuitem has been hovered or highlighted.          |
| `DOMMenuItemInactive`                                        |              | *XUL*                                                        | A menu or menuitem is no longer hovered or highlighted.      |
| `popuphidden`                                                | `PopupEvent` | [*XUL*](https://developer.mozilla.org/zh-CN/docs/XUL/PopupGuide/PopupEvents) | A menupopup, panel or tooltip has been hidden.               |
| `popuphiding`                                                | `PopupEvent` | [*XUL*](https://developer.mozilla.org/zh-CN/docs/XUL/PopupGuide/PopupEvents) | A menupopup, panel or tooltip is about to be hidden.         |
| `popupshowing`                                               | `PopupEvent` | [*XUL*](https://developer.mozilla.org/zh-CN/docs/XUL/PopupGuide/PopupEvents) | A menupopup, panel or tooltip is about to become visible.    |
| `popupshown`                                                 | `PopupEvent` | [*XUL*](https://developer.mozilla.org/zh-CN/docs/XUL/PopupGuide/PopupEvents) | A menupopup, panel or tooltip has become visible.            |
| `RadioStateChange`                                           |              | XUL                                                          | The state of a `radio` has been changed either by a user action or by a script (useful for accessibility). |
| `ValueChange`                                                |              | XUL                                                          | The value of an element has changed (a progress bar for example, useful for accessibility). |

### [附加组件特定事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#附加组件特定事件)

| Event Name                                                   | Event Type | Specification     | Fired when...                                                |
| :----------------------------------------------------------- | :--------- | :---------------- | :----------------------------------------------------------- |
| [MozSwipeGesture](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozSwipeGesture) |            | *Addons specific* | A touch point is swiped across the touch surface             |
| [MozMagnifyGestureStart](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozMagnifyGestureStart) |            | *Addons specific* | Two touch points start to move away from each other.         |
| [MozMagnifyGestureUpdate](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozMagnifyGestureUpdate) |            | *Addons specific* | Two touch points move away from each other (after a MozMagnifyGestureStart). |
| [MozMagnifyGesture](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozMagnifyGesture) |            | *Addons specific* | Two touch points moved away from each other (after a sequence of MozMagnifyGestureUpdate). |
| [MozRotateGestureStart](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozRotateGestureStart) |            | *Addons specific* | Two touch points start to rotate around a point.             |
| [MozRotateGestureUpdate](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozRotateGestureUpdate) |            | *Addons specific* | Two touch points rotate around a point (after a MozRotateGestureStart). |
| [MozRotateGesture](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozRotateGesture) |            | *Addons specific* | Two touch points rotate around a point (after a sequence of MozRotateGestureUpdate). |
| [MozTapGesture](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozTapGesture) |            | *Addons specific* | Two touch points are tapped on the touch surface.            |
| [MozPressTapGesture](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozPressTapGesture) |            | *Addons specific* | A "press-tap" gesture happened on the touch surface (first finger down, second finger down, second finger up, first finger up). |
| [MozEdgeUIGesture](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozEdgeUIGesture) |            | *Addons specific* | A touch point is swiped across the touch surface to invoke the edge UI (Win8 only). |
| [MozAfterPaint](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozAfterPaint) |            | *Addons specific* | Content has been repainted.                                  |
| [DOMPopupBlocked](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMPopupBlocked) |            | *Addons specific* | A popup has been blocked                                     |
| [DOMWindowCreated](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMWindowCreated) |            | *Addons specific* | A window has been created.                                   |
| [DOMWindowClose](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMWindowClose) |            | *Addons specific* | A window is about to be closed.                              |
| [DOMTitleChanged](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMTitleChanged) |            | *Addons specifc*  | The title of a window has changed.                           |
| [DOMLinkAdded](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMLinkAdded) |            | *Addons specifc*  | A link has been added a document.                            |
| [DOMLinkRemoved](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMLinkRemoved) |            | *Addons specifc*  | A link has been removed inside from a document.              |
| [DOMMetaAdded](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMMetaAdded) |            | *Addons specific* | A `meta` element has been added to a document.               |
| [DOMMetaRemoved](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMMetaRemoved) |            | *Addons specific* | A `meta` element has been removed from a document.           |
| [DOMWillOpenModalDialog](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMWillOpenModalDialog) |            | *Addons specific* | A modal dialog is about to open.                             |
| [DOMModalDialogClosed](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMModalDialogClosed) |            | *Addons specific* | A modal dialog has been closed.                              |
| [DOMAutoComplete](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMAutoComplete) |            | *Addons specific* | The content of an element has been auto-completed.           |
| [DOMFrameContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/DOMFrameContentLoaded) |            | *Addons specific* | The frame has finished loading (but not its dependent resources). |
| [AlertActive](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/AlertActive) |            | *Addons specific* | A `notification` element is shown.                           |
| [AlertClose](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/AlertClose) |            | *Addons specific* | A `notification` element is closed.                          |
| [fullscreen](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/fullscreen) |            | *Addons specific* | Browser fullscreen mode has been entered or left.            |
| [sizemodechange](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/sizemodechange) |            | *Addons specific* | Window has entered/left fullscreen mode, or has been minimized/unminimized. |
| [MozEnteredDomFullscreen](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/MozEnteredDomFullscreen) |            | *Addons specific* | [DOM fullscreen (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) mode has been entered. |
| [SSWindowClosing](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/SSWindowClosing) |            | *Addons specific* | The session store will stop tracking this window.            |
| [SSTabClosing](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/SSTabClosing) |            | *Addons specific* | The session store will stop tracking this tab.               |
| [SSTabRestoring](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/SSTabRestoring) |            | *Addons specific* | A tab is about to be restored.                               |
| [SSTabRestored](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/SSTabRestored) |            | *Addons specific* | A tab has been restored.                                     |
| [SSWindowStateReady](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/SSWindowStateReady) |            | *Addons specific* | A window state has switched to "ready".                      |
| [SSWindowStateBusy](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/SSWindowStateBusy) |            | *Addons specific* | A window state has switched to "busy".                       |
| [TabOpen](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/TabOpen) |            | *Addons specific* | A tab has been opened.                                       |
| [TabClose](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/TabClose) |            | *Addons specific* | A tab has been closed.                                       |
| [TabSelect](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/TabSelect) |            | *Addons specific* | A tab has been selected.                                     |
| [TabShow](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/TabShow) |            | *Addons specific* | A tab has been shown.                                        |
| [TabHide](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/TabHide) |            | *Addons specific* | A tab has been hidden.                                       |
| [TabPinned](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/TabPinned) |            | *Addons specific* | A tab has been pinned.                                       |
| [TabUnpinned](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/TabUnpinned) |            | *Addons specific* | A tab has been unpinned.                                     |

### [开发者工具特定事件](https://developer.mozilla.org/zh-CN/docs/Web/Events#开发者工具特定事件)

| Event Name                                                   | Event Type | Specification       | Fired when...                                                |
| :----------------------------------------------------------- | :--------- | :------------------ | :----------------------------------------------------------- |
| [CssRuleViewRefreshed](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/CssRuleViewRefreshed) |            | *devtools specific* | The "Rules" view of the style inspector has been updated.    |
| [CssRuleViewChanged](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/CssRuleViewChanged) |            | *devtools specific* | The "Rules" view of the style inspector has been changed.    |
| [CssRuleViewCSSLinkClicked](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/CssRuleViewCSSLinkClicked) |            | *devtools specific* | A link to a CSS file has been clicked in the "Rules" view of the style inspector. |

## [参见](https://developer.mozilla.org/zh-CN/docs/Web/Events#参见)

- [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)
- [事件开发者指南 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Guide/Events)