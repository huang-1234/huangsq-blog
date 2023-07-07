# 从D0到D3详解

## DOM 事件级别

DOM 级别分为四个级别：DOM0 级、DOM1 级、DOM2 级、DOM3 级；

DOM 事件级别分为三个级别：



1. `DOM0 级事件`



```html
<button id="btn" type="button"></button>
<script>
    var btn = document.getElementById('btn')
    btn.onclick = function() {
        console.log('Hello World')
    }
    // btn.onclick = null // 解绑事件
</script>
```

> 缺点：无法设置多个事件处理函数

1. `DOM2 级事件`



```html
<button id="btn" type="button"></button>
<script>
    var btn = document.getElementById('btn');
    btn.addEventListener('click', showFn, false)
    btn.addEventListener('click', showFn2, false)
    // btn.removeEventListener('click', showFn, false) // 解绑事件
    function showFn() {
        alert('Hello World');
    }
     function showFn2() {
        alert('Hello World2');
    }
</script>
```

> 可以为事件设置多个事件处理函数，可以通过第三个参数 ( useCapture ) 设置在什么阶段执行事件处理函数，默认是 false， 即在事件冒泡阶段执行事件处理函数。

需要注意的是在 IE8 及以下版本需要用 `attachEvent` 和 `detachEvent` 实现，只有两个参数，事件名需要以 on 开头，只支持在事件冒泡阶段执行事件处理函数。

1. `DOM3 级事件`

> DOM3 级事件是在 DOM2 级事件的基础上添加了更多的事件类型，允许自定义事件。

- UI事件，当用户与页面上的元素交互时触发，如：load、scroll
- 焦点事件，当元素获得或失去焦点时触发，如：blur、focus
- 鼠标事件，当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup
- 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
- 文本事件，当在文档中输入文本时触发，如：textInput
- 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
- 合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
- 变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified



```javascript
// 自定义事件
var event = new Event('test')
// 给元素绑定事件
domElement.addEventListener('test', function() {
    console.log('event test')
},)

// 触发事件
setTimeout(function() {
    domElement.dispatchEvent(event)
}, 1000)
```

## DOM 事件流

> 想象画在一张纸上的一组同心圆。如果把手指放在圆心上，那么手指指向的不仅仅是一个圆，而是纸上的所有圆。所以如果点击了某个按钮，点击事件不仅仅发生在这个按钮上，整个页面也被点击了。

事件流又称为事件传播，描述的是从页面中接收事件的顺序。DOM2 级事件规定事件流包括三个阶段: `事件捕获(capture phase)`、`目标事件(target phase)`、`事件冒泡(bubblingphase)`。


 发生的顺序是：事件捕获阶段 --> 目标事件阶段 --> 事件冒泡阶段

### 事件冒泡

> 事件开始时由最具体的元素(目标元素)接收，然后逐级向上传播。



```html
<style>
  #parent {
      width: 200px;
      height: 200px;
      background-color: green;
  }
  #child {
      width: 100px;
      height: 100px;
      background-color: yellow;
  }
</style>

<div id="parent">
  <div id="child">目标元素</div>
  父级元素
</div>

<script>
  var parent = document.getElementById('parent')
  var child = document.getElementById('child')

  parent.addEventListener('click', function(e) {
      console.log('parent bubbling')
  }, false)

  child.addEventListener('click', function() {
      console.log('target bubbling')
  }, false)

  document.body.addEventListener('click', function() {
      console.log('body bubbling')
  }, false)

  document.documentElement.addEventListener('click', function() {
      console.log('html bubbling')
  }, false)

  document.addEventListener('click', function() {
      console.log('document bubbling')
  }, false)

  window.addEventListener('click', function() {
      console.log('window bubbling')
  }, false)
</script>
```

### 事件捕获

> 事件按 window -> document -> html -> body -> ... -> 目标元素 的方向向下层元素传递。



```html
<style>
  #parent {
      width: 200px;
      height: 200px;
      background-color: green;
  }
  #child {
      width: 100px;
      height: 100px;
      background-color: yellow;
  }
</style>

<div id="parent">
  <div id="child">目标元素</div>
  父级元素
</div>

<script>
  var parent = document.getElementById('parent')
  var child = document.getElementById('child')

  parent.addEventListener('click', function(e) {
      console.log('parent capture')
  }, true)

  child.addEventListener('click', function() {
      console.log('target capture')
  }, true)

  document.body.addEventListener('click', function() {
      console.log('body capture')
  }, true)

  document.documentElement.addEventListener('click', function() {
      console.log('html capture')
  }, true)

  document.addEventListener('click', function() {
      console.log('document capture')
  }, true)

  window.addEventListener('click', function() {
      console.log('window capture')
  }, true)
</script>
```

## 事件对象参数 event

> 在用户触发事件，执行事件处理函数的时候，默认会向事件处理函数传入一个 event 对象，它记录了该事件的状态和行为。

### event 常用属性和方法

- `type` 事件类型
- `target` 事件发出者(触发事件的元素)
- `currentTarget`
   事件监听者(被绑定事件的元素)
- `stopPropagation()` 阻止事件冒泡或捕获
- `preventDefault()` 阻止浏览器默认行为

### target 、currentTarget 与 this



```html
<div id="parent">
    <div="child"></div>
</div>
<script>
    var parent = document.getElementById('parent')

    function handler(e) {
        console.log(e.target)
        console.log(e.currentTarget)
        console.log(this)
    }
    // 给父盒子注册点击事件
    parent.addEventListener('click', handler, false)
</script>
```

当点击 parent 时，输出：



```html
1 <div id="parent">...</div>
2 <div id="parent">...</div>
3 <div id="parent">...</div>
```

当点击 child 时，输出：



```html
1 <div id="child">...</div>
2 <div id="parent">...</div>
3 <div id="parent">...</div>
```

> 所以 `target` 是事件发出者，`curentTarget` 是事件监听者，事件处理函数中的 `this` 等同于 `e.currentTarget`

### event 对象的一些兼容性写法

- 获得 event



```javascript
// 事件处理函数
function handleClick(event) {
    var e = event || window.event
    ···
}
```

- 获得 target



```javascript
···
var target = e.target || e.srcElement
···
```

- 阻止浏览器默认行为



```javascript
···
e.preventDefault ? e.preventDefault() : (e.returnValue = false)
···
```

- 阻止冒泡



```bash
···
e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true)
···
```

- 事件绑定与解绑



```javascript
function addEvent(element, type, fn) {
    element.addEventListener ? element.addEventListener(type, fn, false) : element.attachEvent('on'+ type, fn)
}

function removeEvent(element, type, fn) {
    element.removeEventListener ? element.removeEventListener(type, fn, false) : element.detachEvent('on'+ type, fn)
}
```

### 属性表

- 基础属性

| 属性          | 描述                                         |
| ------------- | -------------------------------------------- |
| altKey        | 返回当事件被触发时，”ALT” 是否被按下。       |
| button        | 返回当事件被触发时，哪个鼠标按钮被点击。     |
| clientX       | 返回当事件被触发时，鼠标指针的水平坐标。     |
| clientY       | 返回当事件被触发时，鼠标指针的垂直坐标。     |
| ctrlKey       | 返回当事件被触发时，”CTRL” 键是否被按下。    |
| metaKey       | 返回当事件被触发时，”meta” 键是否被按下。    |
| relatedTarget | 返回与事件的目标节点相关的节点。             |
| screenX       | 返回当某个事件被触发时，鼠标指针的水平坐标。 |
| screenY       | 返回当某个事件被触发时，鼠标指针的垂直坐标。 |
| shiftKey      | 返回当事件被触发时，”SHIFT” 键是否被按下。   |

- IE 属性

| 属性            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| cancelBubble    | 如果事件句柄想阻止事件传播到包容对象，必须把该属性设为 true。 |
| fromElement     | 对于 mouseover 和 mouseout 事件，fromElement 引用移出鼠标的元素。 |
| keyCode         | 对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup |
| offsetX,offsetY | 发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标。   |
| returnValue     | 如果设置了该属性，它的值比事件句柄的返回值优先级高。把这个属性设置为 false 可以阻止浏览器默认行为 |
| srcElement      | 对于生成事件的 Window 对象、Document 对象或 Element 对象的引用。 |
| toElement       | 对于 mouseover 和 mouseout 事件，该属性引用移入鼠标的元素。  |
| x,y             | 事件发生的位置的 x 坐标和 y 坐标，它们相对于用CSS动态定位的最内层包容元素。 |

- 标准 event 属性（2级 DOM 事件标准定义的属性）

| 属性或方法            | 描述                                           |
| --------------------- | ---------------------------------------------- |
| bubbles               | 返回布尔值，指示事件是否是冒泡事件类型。       |
| cancelable            | 返回布尔值，指示事件是否可拥可取消的默认动作。 |
| currentTarget         | 返回其事件监听器触发该事件的元素。             |
| eventPhase            | 返回事件传播的当前阶段。                       |
| target                | 返回触发此事件的元素（事件的目标节点）。       |
| timeStamp             | 返回事件生成的日期和时间。                     |
| type                  | 返回当前 Event 对象表示的事件的名称。          |
| initEvent()           | 初始化新创建的 Event 对象的属性。              |
| `preventDefault()`  | 通知浏览器不要执行与事件关联的默认动作。       |
| `stopPropagation()` | 不再派发事件（常用于阻止事件冒泡）。           |

------

[阅读原文](https://inknight.cn/2019/01/23/DOM-事件总结/)


 参考：# [事件流理解](https://segmentfault.com/a/1190000006027988)
 、#[javascript event（事件对象）详解](https://www.cnblogs.com/fireporsche/p/6239298.html)
 、# [DOM 事件深入浅出（一）](https://segmentfault.com/a/1190000007082623)

