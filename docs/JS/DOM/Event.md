# Event 对象

## Event 对象

Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态。

事件通常与函数结合使用，函数不会在事件发生前被执行！

## 事件句柄　(Event Handlers)

HTML 4.0 的新特性之一是能够使 HTML 事件触发浏览器中的行为，比如当用户点击某个 HTML 元素时启动一段 JavaScript。下面是一个属性列表，可将之插入 HTML 标签以定义事件的行为。

| 属性                                                         | 此事件发生在何时...                  |
| :----------------------------------------------------------- | :----------------------------------- |
| [onabort](https://www.w3school.com.cn/jsref/event_onabort.asp) | 图像的加载被中断。                   |
| [onblur](https://www.w3school.com.cn/jsref/event_onblur.asp) | 元素失去焦点。                       |
| [onchange](https://www.w3school.com.cn/jsref/event_onchange.asp) | 域的内容被改变。                     |
| [onclick](https://www.w3school.com.cn/jsref/event_onclick.asp) | 当用户点击某个对象时调用的事件句柄。 |
| [ondblclick](https://www.w3school.com.cn/jsref/event_ondblclick.asp) | 当用户双击某个对象时调用的事件句柄。 |
| [onerror](https://www.w3school.com.cn/jsref/event_onerror.asp) | 在加载文档或图像时发生错误。         |
| [onfocus](https://www.w3school.com.cn/jsref/event_onfocus.asp) | 元素获得焦点。                       |
| [onkeydown](https://www.w3school.com.cn/jsref/event_onkeydown.asp) | 某个键盘按键被按下。                 |
| [onkeypress](https://www.w3school.com.cn/jsref/event_onkeypress.asp) | 某个键盘按键被按下并松开。           |
| [onkeyup](https://www.w3school.com.cn/jsref/event_onkeyup.asp) | 某个键盘按键被松开。                 |
| [onload](https://www.w3school.com.cn/jsref/event_onload.asp) | 一张页面或一幅图像完成加载。         |
| [onmousedown](https://www.w3school.com.cn/jsref/event_onmousedown.asp) | 鼠标按钮被按下。                     |
| [onmousemove](https://www.w3school.com.cn/jsref/event_onmousemove.asp) | 鼠标被移动。                         |
| [onmouseout](https://www.w3school.com.cn/jsref/event_onmouseout.asp) | 鼠标从某元素移开。                   |
| [onmouseover](https://www.w3school.com.cn/jsref/event_onmouseover.asp) | 鼠标移到某元素之上。                 |
| [onmouseup](https://www.w3school.com.cn/jsref/event_onmouseup.asp) | 鼠标按键被松开。                     |
| [onreset](https://www.w3school.com.cn/jsref/event_onreset.asp) | 重置按钮被点击。                     |
| [onresize](https://www.w3school.com.cn/jsref/event_onresize.asp) | 窗口或框架被重新调整大小。           |
| [onselect](https://www.w3school.com.cn/jsref/event_onselect.asp) | 文本被选中。                         |
| [onsubmit](https://www.w3school.com.cn/jsref/event_onsubmit.asp) | 确认按钮被点击。                     |
| [onunload](https://www.w3school.com.cn/jsref/event_onunload.asp) | 用户退出页面。                       |

## 鼠标 / 键盘属性

| 属性                                                         | 描述                                         |
| :----------------------------------------------------------- | :------------------------------------------- |
| [altKey](https://www.w3school.com.cn/jsref/event_altkey.asp) | 返回当事件被触发时，"ALT" 是否被按下。       |
| [button](https://www.w3school.com.cn/jsref/event_button.asp) | 返回当事件被触发时，哪个鼠标按钮被点击。     |
| [clientX](https://www.w3school.com.cn/jsref/event_clientx.asp) | 返回当事件被触发时，鼠标指针的水平坐标。     |
| [clientY](https://www.w3school.com.cn/jsref/event_clienty.asp) | 返回当事件被触发时，鼠标指针的垂直坐标。     |
| [ctrlKey](https://www.w3school.com.cn/jsref/event_ctrlkey.asp) | 返回当事件被触发时，"CTRL" 键是否被按下。    |
| [metaKey](https://www.w3school.com.cn/jsref/event_metakey.asp) | 返回当事件被触发时，"meta" 键是否被按下。    |
| [relatedTarget](https://www.w3school.com.cn/jsref/event_relatedtarget.asp) | 返回与事件的目标节点相关的节点。             |
| [screenX](https://www.w3school.com.cn/jsref/event_screenx.asp) | 返回当某个事件被触发时，鼠标指针的水平坐标。 |
| [screenY](https://www.w3school.com.cn/jsref/event_screeny.asp) | 返回当某个事件被触发时，鼠标指针的垂直坐标。 |
| [shiftKey](https://www.w3school.com.cn/jsref/event_shiftkey.asp) | 返回当事件被触发时，"SHIFT" 键是否被按下。   |

## IE 属性

除了上面的鼠标/事件属性，IE 浏览器还支持下面的属性：

| 属性            | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| cancelBubble    | 如果事件句柄想阻止事件传播到包容对象，必须把该属性设为 true。 |
| fromElement     | 对于 mouseover 和 mouseout 事件，fromElement 引用移出鼠标的元素。 |
| keyCode         | 对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup 事件，它指定了被敲击的键的虚拟键盘码。虚拟键盘码可能和使用的键盘的布局相关。 |
| offsetX,offsetY | 发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标。   |
| returnValue     | 如果设置了该属性，它的值比事件句柄的返回值优先级高。把这个属性设置为 fasle，可以取消发生事件的源元素的默认动作。 |
| srcElement      | 对于生成事件的 Window 对象、Document 对象或 Element 对象的引用。 |
| toElement       | 对于 mouseover 和 mouseout 事件，该属性引用移入鼠标的元素。  |
| x,y             | 事件发生的位置的 x 坐标和 y 坐标，它们相对于用CSS动态定位的最内层包容元素。 |

## 标准 Event 属性

下面列出了 2 级 DOM 事件标准定义的属性。

| 属性                                                         | 描述                                           |
| :----------------------------------------------------------- | :--------------------------------------------- |
| [bubbles](https://www.w3school.com.cn/jsref/event_bubbles.asp) | 返回布尔值，指示事件是否是起泡事件类型。       |
| [cancelable](https://www.w3school.com.cn/jsref/event_cancelable.asp) | 返回布尔值，指示事件是否可拥可取消的默认动作。 |
| [currentTarget](https://www.w3school.com.cn/jsref/event_currenttarget.asp) | 返回其事件监听器触发该事件的元素。             |
| [eventPhase](https://www.w3school.com.cn/jsref/event_eventphase.asp) | 返回事件传播的当前阶段。                       |
| [target](https://www.w3school.com.cn/jsref/event_target.asp) | 返回触发此事件的元素（事件的目标节点）。       |
| [timeStamp](https://www.w3school.com.cn/jsref/event_timestamp.asp) | 返回事件生成的日期和时间。                     |
| [type](https://www.w3school.com.cn/jsref/event_type.asp)     | 返回当前 Event 对象表示的事件的名称。          |

## 标准 Event 方法

下面列出了 2 级 DOM 事件标准定义的方法。IE 的事件模型不支持这些方法：

| 方法                                                         | 描述                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| [initEvent()](https://www.w3school.com.cn/jsref/event_initevent.asp) | 初始化新创建的 Event 对象的属性。        |
| [preventDefault()](https://www.w3school.com.cn/jsref/event_preventdefault.asp) | 通知浏览器不要执行与事件关联的默认动作。 |
| [stopPropagation()](https://www.w3school.com.cn/jsref/event_stoppropagation.asp) | 不再派发事件。                           |

# Event的具体属性

## Event属性的学习积累

在[DOM事件深入浅出（一）](https://segmentfault.com/a/1190000007082623)中，我主要给大家讲解了不同DOM级别下的事件处理程序，同时介绍了事件冒泡和捕获的触发原理和方法。本文将继续介绍DOM事件中的知识点，主要侧重于DOM事件中Event对象的属性和方法。

那么什么是DOM事件中Event对象呢？事件对象（event object）指的是与特定事件相关且包含该事件详细信息的对象。我们可以通过传递给事件处理程序的参数获取事件触发后所产生的一系列方法和属性。

## Event对象

Event对象其实是一个事件处理程序的参数，当调用事件时，我们只需要将其传入事件函数就可以获取。代码如下：

```
function getEvent(event) {
    event = event || window.event;
}
```

上面的事件函数传入了一个名叫Event的参数作为事件对象，同时做了浏览器兼容处理。在IE8及以前本版之中，通过设置属性注册事件处理程序时，调用的时候并未传递事件对象，需要通过全局对象window.event来获取。所以上述代码中我们利用 || 来做判断，如果event对象存在则使用event，不存在则使用window.event。

Event对象包含了几个方法和多个属性，通过这些方法和属性我们可以获取事件的详细信息并进行相关处理。

## Event对象方法

Event对象主要有以下两个方法，用于处理事件的传播（冒泡、捕获）和事件的取消。

### 1.stopPropagation

stopPropagation方法主要用于阻止事件的进一步传播，比如阻止事件继续向上层冒泡。

```
function getEvent(event) {
    event.stopPropagation();
}

child.addEventListener('click', getEvent, false);
```

如果你需要兼容IE8及以下版本浏览器，则需要利用**cancelBubble**来代替stopPropagation，因为低版本IE不支持stopPropagation方法。

```
function getEvent(event) {
    event = event || window.event;
        
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
```

cancelBubble是IE事件对象的一个属性，设置这个属性为true能阻止事件进一步传播。

### 2.preventDefault

preventDefault方法用于取消事件的默认操作，比如a链接的跳转行为和表单自动提交行为就可以用preventDefault方法来取消。代码如下：

```
<a id="go" href="https://www.baidu.com/">禁止跳转</a>
var go = document.getElementById('go');

function goFn(event) {
    event.preventDefault();

    console.log('我没有跳转！');
}

go.addEventListener('click', goFn, false);
```

通过preventDefault，我们成功阻止了a链接的跳转行为。不过，在IE9之前的浏览器中需要设置returnValue属性为false来实现。如下：

```
function goFn(event) {
    event = event || window.event;
    
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    
    console.log('我没有跳转！');
}
```

除了以上Event对象的两个主要方法，当前DOM事件规范草案在Event对象上还定义了另一个方法，命名为stopImmediatePropagation。

### 3.stopImmediatePropagation

和stopPropagation相比，stopImmediatePropagation同样可以阻止事件的传播，不同点在于其还可以把这个元素绑定的同类型事件也阻止了。如：

```
var go = document.getElementById('go');

function goFn(event) {
    event.preventDefault();
    event.stopImmediatePropagation(); // 阻止事件冒泡并阻止同类型事件
    
    console.log('我没有跳转！');
}

function goFn2(event) {
    console.log('我是同类型事件！');
}

go.addEventListener('click', goFn, false);
go.addEventListener('click', goFn2, false);
```

我们在a链接上继续加了一个点击事件，如果我们在goFn方法中添加了stopImmediatePropagation方法，那么goFn2方法将不会被执行，同时也不会将点击事件冒泡至上层。

需要注意的是，stopImmediatePropagation目前一部分浏览器尚不支持，但是像jQuery这样的库封装了跨平台的stopImmediatePropagation方法。

## Event对象属性

与Event对象的方法相比，因Event对象的属性相对较多，文本无法一一讲解，所以主要介绍实际项目中常用的Event对象属性。

### 1.type属性

通过type我们可以获取事件发生的类型，比如点击事件我们获取的是'click'字符串。

```
var go = document.getElementById('go');

function goFn(event) {
    console.log(event.type); // 输出'click'
}

go.addEventListener('click', goFn, false);
```

### 2.target属性

target属性主要用于获取事件的目标对象，比如我们点击a标签获取的是a标签的html对象。

```
var go = document.getElementById('go');

function goFn(event) {
    var target = event.target;
    
    console.log(target === go) // 返回true
}

go.addEventListener('click', goFn, false);
```

在IE8及之前版本，我们需要使用srcElement而非target。兼容方案如下：

```
function goFn(event) {
    var event = event || window.event,    
        target = event.target || event.srcElement;
    
    console.log(target === go) // 返回true
}
```

### 3. 鼠标事件属性

在用鼠标触发事件时，主要的事件属性包含鼠标的位置和按键的状态，比如：clientX和clientY指定了鼠标在窗口坐标中的位置，button和which指定了按下的鼠标键是哪个。

```
function moveFn(event) {
    console.log(event.screenX) // 获取鼠标基于屏幕的X轴坐标
    console.log(event.screenY) // 获取鼠标基于屏幕的Y轴坐标
    console.log(event.clientX) // 获取鼠标基于浏览器窗口的X轴坐标
    console.log(event.clientY) // 获取鼠标基于浏览器窗口的Y轴坐标
    console.log(event.pageX) // 获取鼠标基于文档的X轴坐标
    console.log(event.pageY) // 获取鼠标基于文档的Y轴坐标
}

function clickFn(event) {
    console.log(event.button) // 获取鼠标按下的键。非IE浏览器中0为鼠标左键，1为鼠标中键，2为鼠标右键
    console.log(event.which) // 获取指定事件上哪个键盘键或鼠标按钮被按下
}

document.addEventListener('mouseover', moveFn, false);
document.addEventListener('click', clickFn, false);
```

### 4.键盘事件属性

在用键盘触发事件时，主要的事件属性包含键盘的按键keyCode和是否按下特殊键，比如：keyCode指定了按下键的键码值，ctrlKey指定是否按下了ctrl键。

```
function keyFn(event) {
    console.log(event.keyCode); // 获取按下键的键码值
    console.log(event.ctrlKey); // 获取是否按下了ctrl键
    console.log(event.shiftKey); // 获取是否按下了shift键
    console.log(event.altKey); // 获取是否按下了alt键
    console.log(event.metaKey); // 获取是否按下了meta键
}

document.addEventListener('keyup', keyFn, false);
```

类似的事件属性还有表单事件属性和window事件属性等，这里不再做详细介绍。有兴趣的同学可以查阅相关资料。

## 总结

本文主要讲解了DOM事件中Event对象的常用属性和方法，同时也介绍了其在IE中的兼容性问题及解决方案。然而关于DOM事件的知识点远不止这些，希望仅此能够帮助初识DOM的开发者。

备注：文本参考自《Javascript权威指南》一书及慕课网教程《DOM事件揭秘》。

## target 事件属性

### 1、event阻止默认行为的方法为，如a标签：

```jsx
$("a").click(function(event){
  event.preventDefault();
});
```

### 3、event的兼容性写法：

在IE下event为window下的一个对象，所以应写为`window.event`



```jsx
//IE是把event事件对象作为全局对象window的一个属性；可以使用event或window.event来访问；
//FireFox和Chrome等主流浏览器是通过把【事件对象】作为【事件响应函数】的【参数】进入传入的；
//兼容性的写法示例：
domElement.onclick = function( e ){
      e = e || window.event;
}
```

> 注意：不要将var e=e||event; 写成 var e=event||e; ，这在FireFox下会提示错误，FireFox无法处理未声明未赋值的变量event。

### 3、event.target的常用属性总结如下：



```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
      #main {
        width: 200px;
        height: 100px;
        background: pink;
        color: #fff;
      }
    </style>
  </head>
  <body>
    <div id="main" class="sb js node">
      <span>测试文字</span>
    </div>
    <script type="text/javascript">
      window.onload = function () {
        document.getElementById("main").onclick = function (e) {
          console.log(e.target);//<div id="main" class="sb js node"><span>测试文字</span></div>
          console.log(e.target.id);//main
          console.log(e.target.tagName);//DIV
          console.log(e.target.nodeName);//DIV
          console.log(e.target.classList);// ["sb", "js", "node", value: "sb js node"]
          console.log(e.target.className);//sb js node
          console.log(e.target.innerHTML);//<span>测试文字</span>
          console.log(e.target.innerText);//测试文字
        }
      }
    </script>
  </body>
</html>
```

