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