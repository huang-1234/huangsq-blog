# BOM概要

ECMAScript是JavaScript的核心，但如果要在Web中使用JavaScript，那么BOM（浏览器对象模型）则无疑才是真正的核心。BOM提供了很多对象，用于访问浏览器的功能，**这些功能与任何网页内容无关**。多年来，缺少事实上的规范导致BOM既有意思又有问题，因为浏览器提供商会按照各自的想法随意去扩展它。于是，浏览器之间的共有的对象就成为了事实上的标准。W3C为了把浏览器中JavaScript最基本的部分标准化，已经将BOM的主要方面纳入了HTML5规范中。

## window对象

BOM的核心对象，表示一个浏览器的一个实例。在浏览器中，window对象有双重角色，它既是通过JavaScript访问浏览器窗口的一个接口，又是ECMAScript规定了Global对象。这意味着在网页中定义的任何对象、变量、函数都是window作为其Global对象，因此有权访问parseInt()方法。

### 全局作用域

全局作用域中所有声明的变量、函数都会变成window对象的属性和方法。

抛开全局变量会成为window对象的属性不谈，定义全局变量与在window对象上直接定义属性还是有一点差别：**全局变量不能通过delete操作符删除，而直接在window对象上的定义的属性可以。**

```html
  <script defer>
    var a = 15;
    window.b = 20;
    console.log(window.a,window.b) // 15 20
    delete window.a;
    delete window.b;
    console.log(window.a, window.b) // 15 undefined
  </script>
```

可以看到var a虽然也是window的属性，但是通过delete删不掉，这是为什么呢？加上两句代码

```html
<script defer>
  var a = 15;
  window.b = 20;
  console.log(window.a,window.b) // 15 20
  // delete window.a;
  // delete window.b;
  // console.log(window.a, window.b) // 15 undefined
  let outa = Object.getOwnPropertyDescriptor(window, 'a');
  console.log(outa)//{value: 15, writable: true, enumerable: true, configurable: false}
  let outb = Object.getOwnPropertyDescriptor(window, 'b');
  console.log(outb)// {value: 20, writable: true, enumerable: true, configurable: true}
</script>
```

我们可以看到通过var a = 15将a作为window的属性，其configurable=false，意思就是不可配置

而通过window.b=20;将b作为window的属性，则相反，可配置

使用var语句添加的window属性有一个名为[[Configurable]]的特性。这个特性的值被设置为false，因此这样定义的属性不可以通过delete操作符删除。

尝试访问未声明的变量会抛出错误，但是通过查询window对象，可以知道某个可能未声明的变量是否存在。



```js
// 这里会抛出错误，因为oldValue未定义
var newValue = oldValue;

// 这里不会抛出错误，因为这是一次属性查询
// newValue的值是undefined
var newValue = window.oldValue;
```

## 窗口位置

**screenLeft** 和 **screenTop**
 分别表示窗口相对于屏幕左边和上边的位置。Firefox则在**screenX**和**screenTop**属性中提供相同的窗口位置信息，使用下列代码可以跨浏览器取得窗口左边和上边的位置。



```js
var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;
```

首先确定screenLeft和screenTop是否存在，是则取得这两个属性值，不存在则使用另外的screenX和screenY。

## 窗口大小

**innerWidth** 、**innerHeight**、**outerWidth**、**outerHeight**。
 支持IE9+，Firefox，safari，opera，chrome均支持。

**innerWidth**：表示页面视图区的度（减去边框宽度）。
 **innerHieght**：表示页面视图区高度（减去边框宽度）。

**outerWidth**：返回浏览器窗口本身长度。
 **outerHeight**：返回浏览器窗口本身高度。

在IE，Firefox，safari，opera，chrome中，document.documentElement.clientWidth和document.documentElement.clientHeight中保存了页面视口的信息。IE6中，这些属性必须在标准模式下才有效；如果是混杂模式，必须通过document.body.client(Width/Height)取得相同信息。
 而对于chrome，哪种都行。

虽然最终无法确定浏览器窗口本身大小，但是可以取得页面视口大小。



```js
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;

    if (typeof pageWidth != "number") {
        if (document.compatMode == "CSS1compat") {
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }
```

先将window.innerWidth/innerHeight的值分别赋给了pageWidth和pageHeight。检查pageWidth中是否是一个数值，不是，则通过检查compatMode确定页面是否处于标准模式，是，则使用document.documentElement.clientWidth/clientHeight的值。否则，使用document.body.clientWidth/clientHeight的值。

使用resizeTo()和resizeBy()方法可以调整浏览器窗口大小。

**resizeTo**：接受浏览器窗口的新宽度和新高度
 **resizeBy**：接受新窗口与原窗口的**宽度之差和高度之差**

> 从 Firefox 7 开始，不能改变浏览器窗口的大小了，要依据下面的规则：
>
> - 不能设置那些不是通过 window.open 创建的窗口或 Tab 的大小。
> - 当一个窗口里面含有一个以上的 Tab 时，无法设置窗口的大小。



```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test</title>
</head>
<body>
    <input type="button" value="创建窗口">
    <input type="button" value="resizeTo()">
    <input type="button" value="resizeBy()">
</body>
<script>
    var btn = document.getElementsByTagName("input")[0];
    var btn2 = document.getElementsByTagName("input")[1];
    var btn3 = document.getElementsByTagName("input")[2];

    var z;

    btn.onclick = function () {
        z = window.open("", "", "width=100,height=100");
        z.focus();
    }
    btn2.onclick = function () {
        z.resizeTo(500, 500);
        z.focus();
    }
    btn3.onclick = function () {
        z.resizeBy(100, 100);
        z.focus();
    }
</script>
</html>
```

## 导航和打开窗口

使用window.open()方法既可以导航到一个特定的URL，也可以打开一个新的浏览器窗口。这个方法接受4个参数：要加载的URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览器历史纪录中当前加载页面的布尔值。通常只传递一个参数，最后一个参数只在不打开新窗口的情况下使用。

如果为window.open()传递了第二个参数，而且该参数是已有窗口或框架的名称，那么就会在具有该名称的窗口或框架中加载第一个参数指定的URL。

```js
window.open("http://www.wrox.com/","topFrame");
// 等同于：<a href="http://www.wrox.com" target="topFrame"></a>
```

**弹出窗口**
 如果给window.open()传递的第二个参数不是一个已经存在的窗口或框架，那么该方法就会根据在第三个参数位置上传入的字符串创建一个新窗口或新标签页。如果没有传入第三个参数，那么就会打开一个带有全部默认设置（工具栏、地址栏、状态栏）的新浏览器窗口。

第三个参数是一个逗号分隔的设置字符串，表示新窗口中都显示哪些特性。

```swift
设置                    值                   说明

fullscreen           yes或no            表示浏览器窗口是否最大化，仅限IE

height                 数值             表示新窗口的高度，不能小于100

left                   数值             表示新窗口的左坐标。不能是负值

location              yes或no           表示是否在浏览器窗口中显示地址栏，不同浏览器默认值不同

menubar               yes或no           表示是否在浏览器窗口中显示菜单栏，默认值为no

resizable             yes或no           表示是否可以通过拖动浏览器窗口的边框改变其大小，默认值为no

scrollbars            yes或no           表示如果内容在视口中显示不下，是否允许滚动。默认值为no。

status                yes或no           表示是否在浏览器窗口中显示状态栏。默认值为no

toolbar               yes或no           表示是否在浏览器窗口中显示工具栏。默认值为no

top                   数值              表示新窗口的上坐标，不能是负值。

width                 数值              表示新窗口的宽度，不能小于100。
```

`window.open("http://www.wrox.com","wroxWindow","height=400，width=400,top=10,left=10,resizable=yes");`
 这段代码会打开一个新的可以调整大小的窗口，窗口初始大小为400*400像素，并且距屏幕上沿和左边各10像素。

window.open()方法会返回一个指向新窗口的引用。引用的对象与其他window对象大致相似，但我们可以对其进行更多控制。例如，有些浏览器在默认情况下可能不允许我们针对主浏览器窗口调整大小或移动位置，但却允许我们针对通过window.open()创建的窗口调整大小或移动位置。



```js
var wroxWin = window.open("http://www.wrox.com/","wroxWindow","height=400,width=400,top=10,left=10,resizable=yes");

// 调整大小
wroxWin.resizeTo(500,500);

// 移动位置
wroxWin.moveTo(100,100);
```

调用close()方法还可以关闭新打开的窗口。

```js
wroxWin.close();
```

但是，这个方法仅适用于通过window.open()打开的弹出窗口。对于浏览器的主窗口，如果没有得到用于允许是不能关闭它的。不过，弹出窗口倒是可以调用top.close()在不经用户允许的情况下关闭自己。弹出窗口关闭之后，窗口的引用仍然还在，但除了像下面这样检测其closed属性之外，已经没有其他用处了。



```go
wroxWin.close();
alert(wroxWin.closed);      // true
```

新创建的window对象有一个opener属性，其中保存着打开它的原始窗口对象。这个属性只在弹出窗口中的最外层window对象（top）中有定义，而且指向调用window.open()的窗口或框架。

## 间歇调用与超时调用

JavaScript是单线程语言，但它允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行。前者是在指定的时间过后执行代码，后者则是在每隔指定的时间就执行一次代码。

超时调用需要使用window对象的setTimeout()方法，接受两个参数，要执行的代码和以毫秒表示的时间（即在执行代码前需要等待多少毫秒）。其中，第一个参数可以是一个包含JavaScript代码的字符串（就和在eval()函数中使用的字符串一样），也可以是一个函数。



```js
// 不建议传递字符串！
setTimeout("alert('hello world!')",1000);

// 推荐的调用方式
setTimeout(function() {
    alert("Hello World!")
},1000);
```

虽然这两种调用方式都没有问题，但由于传递字符串可能导致性能损失，因此不建议字符串作为第一个参数。
 第二个参数是一个表示等待多长时间的毫秒数，但经过该时间后指定的代码不一定会执行。JavaScript是一个单线程的解释器，因此一定时间内只能执行一段代码。为了控制要执行的的代码，就有一个JavaScrip任务队列。这些任务会按照将它们添加到队列的顺序执行。setTimeout()的第二个参数告诉JavaScript再过多长时间把当前任务添加到队列中。如果队列是空的，那么添加的代码会立即执行；如果队列不是空的，那么它就要等前面的代码执行完毕以后再执行。

## 系统对话框

**alert()**
 alert()接受一个字符串并将其显示给用户。具体来说，调用alert()方法的结果就是向用户显示一个系统对话框，其中包含指定的文本和一个OK按钮。

通常使用alert()生成的警告对话框向用户显示一些他们无法控制的消息，例如错误消息。而用户看完消息后关闭对话框。

**confirm()**
 confirm()方法，从向用户显示消息的方面看，这种确认对话框很像一个警告对话框，但二者的主要区别在于确认对话框除了显示OK按钮外，还会显示一个Cancel按钮，两个按钮可以让用户决定是否执行给定操作。
 `confirm("Are you sure?");`

```bash
if (confirm("Are you sure?")) {
    alert("I'm so glad you're sure!");
} else {
    alert("I'm sorry to hear you're not sure.");
}
```

为了确定用户是单击了OK还是Cancel，可以检查confirm方法返回的布尔值。OK按钮返回true，Cancel按钮返回false。右上角关闭按钮和ESC也会返回false。

**prompt()**
 这是一个提示框，用于提示用户输入一些文本信息，提示框中除了显示OK和Cancel按钮外，还会显示一个文本输入域。
 prompt()方法接受两个参数：要显示给用户的文本提示和文本输入域的默认值（可以是一个空字符串）。

如果用户单击了OK按钮，则prompt返回文本输入域的值；
 如果用户单击了cancel按钮或没有单击OK按钮而是通过其他方式关闭对话框，则该方法返回null。

```csharp
var result = prompt("What is your name?","");
if (result !== null) {
    alert("Welcome, "+result);
}
```

这些系统对话框很适合向用户显示消息并请用户作出决定。由于不涉及HTML，CSS或JavaScript，因此它们是增强Web应用程序的一种便携方式。

