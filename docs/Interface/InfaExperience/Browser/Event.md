# JS的事件机制

## 在标签内写onclick

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      #out {
        width: 25rem;
        height: 25rem;
        background-color: aqua;
      }

      #out #inner {
        width: 20rem;
        height: 20rem;
        background-color: rgb(0, 4, 255);
      }
      #out #inner #inner3{
        width: 15rem;
        height: 15rem;
        background-color: brown;
      }

    </style>
  </head>

  <body>
    <div id="out" class="test" onclick="out()">out1
      <div id="inner" class="test-inner" onclick="inner()">inner2
        <div id="inner3" onclick="inner3()">inner3
        
        </div>
      </div>
    </div>
    <script>
      const out = function(){console.log('out')}
      const inner = function(){console.log('inner')}
      const inner3 = function(){console.log('inner3')}
      
      const btn = document.getElementById("out");
      //捕获事件
      btn.addEventListener("click", function (e) {
        console.log("capture is ok");
      }, true);

      //冒泡事件
      btn.addEventListener("click", function (e) {
        console.log("bubble is ok");
      }, false);
    </script>
  </body>

</html>
```

小总结

```js
const out = function(){console.log('out')}
const inner = function(){console.log('inner')}
const inner3 = function(){console.log('inner3')}
// 而像这上面的onclick形式注册的事件，则严格按照冒泡的顺序执行函数
```



```js
//捕获事件
btn.addEventListener("click", function (e) {
  console.log("capture is ok");
}, true);
// 像上面这种标记为捕获事件，从最上层的DOM开始捕获，先触发函数，在依次执行后面的函数
//冒泡事件
btn.addEventListener("click", function (e) {
  console.log("bubble is ok");
}, false);
// 像上面这种标记为冒泡事件，从点击的DOM开始冒泡，先触发函数，在依次执行后面的函数
```



这是前端面试题系列的第 7 篇，你可能错过了前面的篇章，可以在这里找到：

- [理解函数的柯里化](https://segmentfault.com/a/1190000018180159)
- [ES6 中箭头函数的用法](https://segmentfault.com/a/1190000018119191)
- [this 的原理以及用法](https://segmentfault.com/a/1190000017957307)
- [伪类与伪元素的区别及实战](https://segmentfault.com/a/1190000017784553)
- [如何实现一个圣杯布局？](https://segmentfault.com/a/1190000017540629)
- [今日头条 面试题和思路解析](https://segmentfault.com/a/1190000017480929)

最近，小伙伴L 在温习 《JavaScript高级程序设计》中的 `事件` 这一章节时，产生了困惑。

他问了我这样几个问题：

- 了解事件流的顺序，对日常的工作有什么帮助么？
- 在 vue 的文档中，有一个修饰符 **native** ，把它用 `.` 的形式 连结在事件之后，就可以监听原生事件了。它的背后有什么原理？
- 事件的 event 对象中，有好多的属性和方法，该如何使用？

浏览器中的事件机制，也经常在面试中被提及。所以这回，我们共同探讨了这些问题，并最终整理成文，希望帮到有需要的同学。

## 事件流的概念

先从概念说起，DOM 事件流分为三个阶段：`捕获阶段`、`目标阶段`、`冒泡阶段`。先调用捕获阶段的处理函数，其次调用目标阶段的处理函数，最后调用冒泡阶段的处理函数。

网景公司提出了 `事件捕获` 的事件流。这就好比采矿的小游戏，每次都会从地面开始一路往下，抛出抓斗，捕获矿石。在上图中就是，某个 div 元素触发了某个事件，最先得到通知的是 window，然后是 document，依次往下，直到真正触发事件的那个目标元素 div 为止。

而 `事件冒泡` 则是由微软提出的，与之顺序相反。还是刚才的采矿小游戏，命中目标后，抓斗再沿路收回，直到冒出地面。在上图中就是，事件会从目标元素 div 开始依次往上，直到 window 对象为止。

w3c 为了制定统一的标准，采取了折中的方式：`先捕获在冒泡`。同一个 DOM 元素可以注册多个同类型的事件，通过 addEventListener 和 removeEventListener 进行管理。addEventListener 的第三个参数，就是为了捕获和冒泡准备的。

`注册事件`(addEventListener) 有三个参数，分别为："事件名称", "事件回调", "捕获/冒泡"(布尔型，true代表捕获事件，false代表冒泡事件)。

```js
target.addEventListener(type, listener[, useCapture]);
```

- type 表示事件类型的字符串。
- listener 是一个实现了 EventListener 接口的对象，或者是一个函数。当所监听的事件类型触发时，会接收到一个事件通知对象（实现了 Event 接口的对象）。
- capture 表示 listener 会在该类型的事件捕获阶段，传播到该 EventTarget 时触发，它是一个 Boolean 值。

`解除事件`(removeEventListener) 也有三个参数，分别为："事件名称", "事件回调", "捕获/冒泡"(Boolean 值，这个必须和注册事件时的类型一致)。

```js
target.removeEventListener(type, listener[, useCapture]);
```

要想注册过的事件能够被解除，必须将回调函数保存起来，否则无法解除。例如这样：

```js
const btn = document.getElementById("test");
//将回调存储在变量中
const fn = function(e){alert("ok");};
//绑定
btn.addEventListener("click", fn, false);
//解除
btn.removeEventListener("click", fn, false);
```

## 事件捕获和冒泡的5个注意点

当有多层交互嵌套时，事件捕获和冒泡的先后顺序，似乎不是那么好理解。接下来，将分 5 种情况讨论它们的顺序，以及如何规避意外情况的发生。

#### 1.在外层 div 注册事件，点击内层 div 来触发事件时，捕获事件总是要比冒泡事件先触发(与代码顺序无关)

假设，有这样的 html 结构：

```html
<div id="test" class="test">
   <div id="testInner" class="test-inner"></div>
</div>
```

然后，我们在外层 div 上注册两个 click 事件，分别是捕获事件和冒泡事件，代码如下：

```js
const btn = document.getElementById("test");
 
//捕获事件
btn.addEventListener("click", function(e){
    alert("capture is ok");
}, true);
 
//冒泡事件
btn.addEventListener("click", function(e){
    alert("bubble is ok");
}, false);
```

点击内层的 div，先弹出 capture is ok，后弹出 bubble is ok。只有当真正触发事件的 DOM 元素是内层的时候，外层 DOM 元素才有机会模拟捕获事件和冒泡事件。

#### 2.当在触发事件的 DOM 元素上注册事件时，哪个先注册，就先执行哪个

html 结构同上，js 代码如下：

```js
const btnInner = document.getElementById("testInner");

//冒泡事件
btnInner.addEventListener("click", function(e){
    alert("bubble is ok");
}, false);
 
//捕获事件
btnInner.addEventListener("click", function(e){
    alert("capture is ok");
}, true);
```

本例中，冒泡事件先注册，所以先执行。所以，点击内层 div，先弹出 `bubble is ok`，再弹出 `capture is ok`。

#### 3.当外层 div 和内层 div 同时注册了捕获事件时，点击内层 div 时，外层 div 的事件一定会先触发

js 代码如下：

```js
const btn = document.getElementById("test");
const btnInner = document.getElementById("testInner");

btnInner.addEventListener("click", function(e){
    alert("inner capture is ok");
}, true);

btn.addEventListener("click", function(e){
    alert("outer capture is ok");
}, true);
```

虽然外层 div 的事件注册在后面，但会先触发。所以，结果是先弹出 `outer capture is ok`，再弹出 `inner capture is ok`。

#### 4.同理，当外层 div 和内层 div 都同时注册了冒泡事件，点击内层 div 时，一定是内层 div 事件先触发。

```js
const btn = document.getElementById("test");
const btnInner = document.getElementById("testInner");

btn.addEventListener("click", function(e){
    alert("outer bubble is ok");
}, false);

btnInner.addEventListener("click", function(e){
    alert("inner bubble is ok");
}, false);
```

先弹出 `inner bubble is ok`，再弹出 `outer bubble is ok`。

#### 5.阻止事件的派发

通常情况下，我们都希望点击某个 div 时，就只触发自己的事件回调。比如，明明点击的是内层 div，但是外层 div 的事件也触发了，这是就不是我们想要的了。这时，就需要阻止事件的派发。

事件触发时，会默认传入一个 event 对象，这个 event 对象上有一个方法：`stopPropagation`。MDN 上的解释是：**阻止 捕获 和 冒泡 阶段中，当前事件的进一步传播**。所以，通过此方法，让外层 div 接收不到事件，自然也就不会触发了。

```js
btnInner.addEventListener("click", function(e){
    //阻止冒泡
    e.stopPropagation();
    alert("inner bubble is ok");
}, false);
```

## 事件代理

我们经常会遇到，要监听列表中多项 li 的情况，假设我们有一个列表如下：

```html
<ul id="list">
    <li id="item1">item1</li>
    <li id="item2">item2</li>
    <li id="item3">item3</li>
    <li id="item4">item4</li>
</ul>
```

如果我们要实现以下功能：当鼠标点击某一 li 时，输出该 li 的内容，我们通常的写法是这样的：

```js
window.onload=function(){
    const ulNode = document.getElementById("list");
    const liNodes = ulNode.children;
    for(var i=0; i<liNodes.length; i++){
        liNodes[i].addEventListener('click',function(e){
            console.log(e.target.innerHTML);
        }, false);
    }
}
```

在传统的事件处理中，我们可能会按照需要，为每一个元素添加或者删除事件处理器。然而，事件处理器将有可能导致内存泄露，或者性能下降，用得越多这种风险就越大。JavaScript 的事件代理，则是一种简单的技巧。

#### 用法及原理

事件代理，用到了在 JavaSciprt 事件中的两个特性：事件冒泡 和 目标元素。使用事件代理，我们可以把事件处理器添加到一个元素上，等待一个事件从它的子级元素里冒泡上来，并且可以得知这个事件是从哪个元素开始的。

改进后的 js 代码如下：

```js
window.onload=function(){
    const ulNode=document.getElementById("list");
    ulNode.addEventListener('click', function(e) {
        /*判断目标事件是否为li*/
        if(e.target && e.target.nodeName.toUpperCase()=="LI"){
            console.log(e.target.innerHTML);
        }
    }, false);
};
```

## 一些常用技巧

回到文章开头的问题：了解事件流的顺序，对日常的工作有什么帮助呢？我总结了以下几个注意点。

#### 1. 阻止默认事件

比如 href 的链接跳转，submit 的表单提交等。可以在方法的最后，加上一行 `return false;`。它会阻止通过 on 的方式绑定的事件的默认事件。

```js
ele.onclick = function() {
    ……
    // 通过返回 false 值，阻止默认事件行为
    return false;
}
```

另外，重写 onclick 会覆盖之前的属性，所以解绑事件可以这么写：

```js
// 解绑事件，将 onlick 属性设为 null 即可
ele.onclick = null;
```

#### 2. stopPropagation 和 stopImmediatePropagation

前面说过 stopPropagation 的定义是：终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。事件不再被分派到其他节点上。

```js
// 事件捕获到 ele 元素后，就不再向下传播了
ele.addEventListener('click', function (event) {
  event.stopPropagation();
}, true);

// 事件冒泡到 ele 元素后，就不再向上传播了
ele.addEventListener('click', function (event) {
  event.stopPropagation();
}, false);
```

但是，stopPropagation 只会阻止当前元素 `同类型的` 事件冒泡或捕获的传播，并不会阻止该元素上 `其他类型` 事件的监听。以 click 事件为例：

```js
ele.addEventListener('click', function (event) {
  event.stopPropagation();
  console.log(1);
});

ele.addEventListener('click', function(event) {
  // 仍然可以触发
  console.log(2);
});
```

如果想禁用之后所有的 click 事件，就要用到 stopImmediatePropagation 了。但是，需要注意的是，stopImmediatePropagation 只会禁用之后注册的同类型的监听事件。就比如阻止了之后的 click 事件监听函数，但别的事件类型如 mousedown、dblclick 之类，还是可以监听到的。

```js
ele.addEventListener('click', function (event) {
    event.stopImmediatePropagation();
    console.log(1);
});

ele.addEventListener('click', function(event) {
    // 不会触发
    console.log(2);
});

ele.addEventListener('mousedown', function(event) {
    // 会触发
    console.log(3);
});
```

#### 3. jquery 中的 return false;

jquery 中的 on 是事件冒泡。当用 return false; 阻止浏览器的默认行为时，会做下面这 3 件事：

- event.preventDefault();
- event.stopPropagation();
- 停止回调函数执行并立即返回。

这 3 件事中，只有 preventDefault 是用来阻止默认行为的。除非你还想阻止事件冒泡，否则直接用 return false; 会埋下隐患。

#### 4. angular 中的 $event

angular 是个包罗万象的框架，似乎学完它的一整套之后，就能玩转世界了。它加工封装了许多原生的东西，其中就包括了 event，只是前面需要加一个 $，表示这是 angular 中的特有对象。

```js
// template
<div>
    <button (click)="doSomething($event)">Click me</button>
</div>

// js
doSomething($event: Event) {
    $event.stopPropagation();
    ...
}
```

$event 在这里作为一个变量，`显式地` 传入回调函数，之后就可以将 $event 当做原生的事件对象来用了。

#### 5. vue 中的 native 修饰符

在 vue 的自定义组件中绑定原生事件，需要用到修饰符 native。

那是因为，我们的自定义组件，最终会渲染成原生的 html 标签，而非类似于 这样的自定义组件。如果想让一个普通的 html 标签触发事件，那就需要对它做事件监听(addEventListener)。修饰符 native 的作用就在这里，它可以在背后帮我们绑定了原生事件，进行监听。

一个常用的场景是，配合 element-ui 做登录界面时，输完账号密码，想按一下回车就能登录。就可以像下面这样用修饰符：

```js
<el-input
    class="input"
    v-model="password" type="password"
    @keyup.enter.native="handleSubmit">
</el-input>
```

el-input 就是自定义组件，而 keyup 就是原生事件，需要用 native 修饰符进行绑定才能监听到。

#### 6. react 中的合成事件

想要在 react 的事件回调中使用 event 对象，会产生困扰，会发现不少原生的属性都是 null。

那是因为在 react 中的事件，其实是合成事件（SyntheticEvent），并不是浏览器的原生事件，但它也符合 w3c 规范。

举一个简单的例子，我们要实现一个组件，它有一个按钮，点击按钮后会显示一张图片，点击这张图片之外的任意区域，可以隐藏这张图片，但是点击该图片本身时，不会隐藏。代码如下：

```js
class ShowImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
          active: false
        };
    }
  
    componentDidMount() {
        document.addEventListener('click', this.hideImg.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hideImg);
    }
    
    hideImg () {
        this.setState({ active: false });
    }
    
    handleClickBtn() {
        this.setState({ active: !this.state.active });
    }
  
    handleClickImg (e) {
        e.stopPropagation();
    }

    render() {
        return (
            <div className="img-wrapper">
                <button
                    className="showImgBtn"
                    onClick={this.handleClickBtn.bind(this)}>
                    显示图片
                </button>
                <div
                    className="img"
                    style={{ display: this.state.active ? 'block' : 'none' }}
                    onClick={this.handleClickImg.bind(this)}>
                    <img src="@/assets/avatar.jpg" >
                </div>
            </div>
        );
    }
}
```

按照之前说的原生事件机制，我们会错误地认为通过：

```js
handleClickImg (e) {
    e.stopPropagation();
}
```

就可以阻止事件的派发了，但其实没法这么做。想要解决这个问题，当然也不复杂，就把 react 的事件和原生事件分开即可。

```js
componentDidMount() {
    document.addEventListener('click', this.hideImg.bind(this));
    
    document.addEventListener('click', this.imgStopPropagation.bind(this));
}

componentWillUnmount() {
    document.removeEventListener('click', this.hideImg);
    
    document.removeEventListener('click', this.imgStopPropagation);
}

hideImg () {
    this.setState({ active: false });
}

imgStopPropagation (e) {
    e.stopPropagation();
}
```

#### 7. 事件对象 event

当对一个元素进行事件监听的时候，它的回调函数里就会默认传递一个参数 event，它是一个对象，包含了许多属性。我列出了一些比较常用的属性：

- event.target：指的是触发事件的那个节点，也就是事件最初发生的节点。
- event.target.matches：可以对关键节点进行匹配，来执行相应操作。
- event.currentTarget：指的是正在执行的监听函数的那个节点。
- event.isTrusted：表示事件是否是真实用户触发。
- event.preventDefault()：取消事件的默认行为。
- event.stopPropagation()：阻止事件的派发（包括了捕获和冒泡）。
- event.stopImmediatePropagation()：阻止同一个事件的其他监听函数被调用。

## 总结

事件机制在浏览器中非常有用，所有用户的交互型操作，都依赖于它。现代 JavaScript 框架应用中，我们也都离不开与原生事件的交互。

所以，在理解了事件流的概念，清楚了事件捕获与冒泡的顺序，掌握了一些原生事件的技巧之后，相信下次再遇到坑的时候，可以少走一些弯路了。

# JS事件详解(知乎)

`javascript`和`HTML`之间的交互是通过事件实现的。

`事件`就是用户或浏览器自身执行的某种动作，比如点击、加载，鼠标移入移出等等。

## DOM事件流(知乎)

事件流包括三个阶段。简而言之：事件一开始从文档的根节点流向目标对象（**捕获阶段**），然后在目标对象上被触发（**目标阶段**），之后再回溯到文档的根节点（**冒泡阶段**）。

**DOM事件流：包括三个阶段：**

**事件捕获阶段（Capture Phase）** 事件的第一个阶段是捕获阶段。事件从文档的根节点出发，随着 DOM 树的结构向事件的目标节点流去。途中经过各个层次的 DOM 节点，并在各节点上触发捕获事件，直到到达事件的目标节点。捕获阶段的主要任务是建立传播路径，在冒泡阶段，事件会通过这个路径回溯到文档跟节点。

**目标阶段（Target Phase）** 当事件到达目标节点的，事件就进入了目标阶段。事件在目标节点上被触发(执行事件对应的函数)，然后会逆向回流，直到传播至最外层的文档节点。

**冒泡阶段（Bubble Phase）**事件在目标元素上触发后，并不在这个元素上终止。它会随着 DOM 树一层层向上冒泡，直到到达最外层的根节点。也就是说，同一个事件会依次在目标节点的父节点，父节点的父节点...直到最外层的节点上被触发。

> 所有的事件都要经过捕捉阶段和目标阶段，但是有些事件会跳过冒泡阶段。例如，让元素获得输入焦点的 focus 事件以及失去输入焦点的 blur 事件就都不会冒泡。

## 事件类型

**UI (User Interface) 事件**，当用户与页面上的元素交互时触发

- load、unload、error、select、resize、scroll

**焦点事件**，在页面获得或失去焦点时触发

- blur、focusout 失去焦点
- focus、focusin 获得焦点

**鼠标事件**，用户通过鼠标在页面执行操作时触发

- click、dbclick、mousedown、mouseup

- mouseenter、mouserleave

- mousemove

- mouseout、mouseover

- 点击和双击事件触发的顺序如下

- - mousedown
  - mouseup
  - click
  - mousedown
  - mouseup
  - dbclick



**滚轮事件**，当使用鼠标滚轮操作时触发

- mousewheel

**文本事件**，在文档中输入文本时触发

- textInput 当用户在可编辑区域中输入字符时，就会触发这个事件

**键盘事件**，当用户通过键盘在页面上执行操作时触发

- keydown 按下键盘任意键时触发，不松开，则一直触发
- keypress 按下键盘上的字符键时触发，不松开，则一直触发
- Keyup 用户释放键盘上的建时触发

**HTML5事件**

- contextmenu 事件：单价鼠标右键可以调出上下文菜单
- beforeunload 事件：在浏览器卸载页面之前触发
- DOMContentLoad 事件：在形成完整的DOM树之后就会触发。
- readystatechange 事件：提供与文档加载状态有关的信息
- pageshow和pagehide 事件：页面显示和隐藏时触发 [MDN传送门](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event)
- hashchange 事件 : hash改变时触发

除此之外，还有变动事件，复合事件，HTML5新加入的一些事件，不再一一列出。[完整列表可在这里查看 Web Events](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/Events)

## 事件对象

[event:MDN传送门](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/API/Event)

在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的信息。所有的浏览器都支持 event 对象，但支持方式不同。

常用属性：

`target` 事件的目标

`currentTarget` 绑定事件的元素，与 'this' 的指向相同

`stopPropagation()` 取消事件的进一步捕获或冒泡。如果bubbles为true，则可以使用这个方法

`stopImmediatePropagation()` 方法阻止监听同一事件的其他事件监听器被调用。

如果多个事件监听器被附加到相同元素的相同事件类型上，当此事件触发时，它们会按其被添加的顺序被调用。如果在其中一个事件监听器中执行 stopImmediatePropagation() ，那么剩下的事件监听器都不会被调用。

`preventDefault()` 取消事件的默认行为，比如点击链接跳转。如果 `cancelable` 是 `true`，则可以使用这个方法

`type` 被触发的事件类型

`eventPhase` 调用事件处理程序的阶段：1表示捕获阶段，2表示“处于目标”，3表示冒泡阶段

更多详情参见：[跨浏览器的事件对象](https://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000008238779)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      .btnCon {
        width: 300px;
        height: 300px;
        border: 1px solid yellow;
      }
      .btn {
        width: 200px;
        height: 200px;
      }
      .btn div {
        width: 100px;
        height: 100px;
        border: 1px solid red;
      }
      .btn div span {
        background-color: #ccc;
      }
    </style>
  </head>

  <body>
    <div class="btnCon">
      <button class="btn">
        <div>
          <span>按钮</span>
        </div>
      </button>
    </div>

    <script>
      let btnCon = document.querySelector('.btnCon');
      let btn = document.querySelector('.btnCon div');
      // btn.onclick = c;

      btnCon.addEventListener('click', c);
      btn.addEventListener('click', c);
      // btn.addEventListener('click', c, true);

      function c(event) {
        event = event || wind
        console.log(event);
        //事件的目标
        console.log('事件的目标 =>', event.target);
        //绑定事件的元素，与 'this' 的指向相同
        console.log("绑定事件的元素 =>", event.currentTarget);
        console.log(event.currentTarget === event.target);
        //被触发的事件类型
        console.log("被触发的事件类型 => ", event.type);
        //调用事件处理程序的阶段：0表示这个时间没有事件正在被处理，1表示捕获阶段，2表示“处于目标”，3表示冒泡阶段
        console.log('调用事件处理程序的阶段：0表示这个时间没有事件正在被处理，1表示捕获阶段，2表示“处于目标”，3表示冒泡阶段');
        console.log(event.eventPhase);

        //取消事件的进一步捕获或冒泡。如果bubbles为true，则可以使用这个方法
        event.stopPropagation();
        //取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用（DOM3级事件中新增）
        event.stopImmediatePropagation();
        //取消事件的默认行为，比如点击链接跳转。如果 cancelable 是 true，则可以使用这个方法
        event.preventDefault();
      }
    </script>
  </body>
</html>
```

### 阻止事件冒泡/停止传播（Stopping Propagation）

可以通过调用事件对象的 stopPropagation 方法，在任何阶段（捕获阶段或者冒泡阶段）中断事件的传播。此后，事件不会在后面传播过程中的经过的节点上调用任何的监听函数。

```js
<input type="button" value="Click Me" id="btn">
<script>
    var btn=document.getElementById("btn");
    btn.onclick = function (event) {
        console.log("Clicked"); // 触发
        event.stopPropagation();
    }
    document.body.onclick = function (event) {
        console.log("Body clicked"); // 传播阻断 不触发
    }
</script>
```

调用 `event.stopPropagation()`不会阻止当前节点上此事件其他的监听函数被调用。如果你希望阻止当前节点上的其他回调函数被调用的话，你可以使用更激进的`event.stopImmediatePropagation()`方法。

### 阻止浏览器默认行为

当特定事件发生的时候，浏览器会有一些默认的行为作为反应。最常见的事件不过于 link 被点击。当一个 click 事件在一个`<a>`元素上被触发时，它会向上冒泡直到 DOM 结构的最外层 document，浏览器会解释 href 属性，并且在窗口中加载新地址的内容。

在 web 应用中，开发人员经常希望能够自行管理导航（navigation）信息，而不是通过刷新页面。为了实现这个目的，我们需要阻止浏览器针对点击事件的默认行为，而使用我们自己的处理方式。这时，我们就需要调用 **event.preventDefault()**.

我们可以阻止浏览器的很多其他默认行为。比如，我们可以在 HTML5 游戏中阻止敲击空格时的页面滚动行为，或者阻止文本选择0框的点击行为。

**调用 event.stopPropagation()只会阻止传播链中后续的回调函数被触发。它不会阻止浏览器的自身的行为。**

```js
<a href="http://www.baidu.com" id="baidu">百度一下</a>
<script>
    document.getElementById('baidu').onclick = function(){
        event.preventDefault();
        console.log('百度一下');
    }
</script>
```

## 事件处理程序

### HTML 事件处理程序

```js
<!-- 输出 click -->
<input type="button" value="Click Me" onclick="console.log(event.type)">

<!-- 输出 Click Me this 值等于事件的目标元素 -->
<input type="button" value="Click Me" onclick="console.log(this.value)">
```

当然在 HTML 中定义的事件处理程序也可以调用其它地方定义的脚本：

```js
// <!-- Chrome 输出 click -->
<script>
    function showMessage(event) {
        console.log(event.type);
    }
</script>
<input type="button" value="Click Me" onclick="showMessage(event)">
```

通过 HTML 指定的事件处理程序都需要HTML的参与，即结构和行为相耦合，不易维护。

### DOM0 级事件处理程序

```js
<input type="button" value="Click Me" id="btn">
<script>
    let btn = document.getElementById("btn");
    btn.onclick = function(){
        console.log(this.id); // 输出 btn
    }
</script>
```

这里是将一个函数赋值给一个事件处理程序的属性，以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理。要删除事件将 btn.onclick 设置为 **null** 即可。

### DOM2 级事件处理程序

DOM2 级事件定义了**addEventListener()** 和 `removeEventListener()`两个方法，用于添加和删除事件处理程序的操作。

所有 DOM 节点都包含这两个方法，它们接受3个参数：**要处理的事件名**、**作为事件处理程序的函数**和一个**布尔值**。最后的布尔值参数是 `true 表示在捕获阶段调用事件处理程序`，如果是 `false(默认) 表示在冒泡阶段调用事件处理程序`。

```js
//语法
btn.addEventListener('click', function(){}, false);
复制代码
<input type="button" value="Click Me" id="btn">
<script>
    let btn = document.getElementById("btn");
    btn.addEventListener("click",function(){
        console.log(this.id);
    },false);
    btn.addEventListener("click",function(){
        console.log('Hello word!');
    },false);
</script>
```

通过上面例子可以看出，同一个dom元素，可以通过`addEventListener()`添加多个事件

上面代码两个事件处理程序会按照它们的添加顺序触发，先输出 btn 再输出 Hello word!,

通过 `addEventListener()`添加的事件处理程序只能使用 `removeEventListener()`来移除，移除时传入的参数与添加时使用的参数相同，即匿名函数无法被移除。

```js
<input type="button" value="Click Me" id="btn">
<script>
    let btn=document.getElementById("btn");
    let handler = function(){
        console.log(this.id);
    }
    btn.addEventListener("click", handler, false);
    btn.removeEventListener("click",handler, false);
</script>
```

### IE 事件处理程序

IE通常都是特立独行的，它添加和删除事件处理程序的方法分别是：**attachEvent()** 和**detachEvent()**

同样接受事件处理程序名称与事件处理程序函数两个参数，但跟**addEventListener()**的区别是：

- 事件名称需要加“on”，比如“onclick”；
- 没了第三个布尔值，IE8及更早版本只支持事件冒泡；
- 仍可添加多个处理程序，但触发顺序是反着来的。

还有一点需要注意，DOM0 和 DOM2 级的方法，其作用域都是在其所依附的元素当中，`attachEvent()则是全局`，即如果像之前一样使用this.id，访问到的就不是 button 元素，而是 window，就得不到正确的结果。

### 封装兼容浏览器事件处理

```js
let EventUtil = {
    addHandler: function (element, type, handler, boolean) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, boolean);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, boolean);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopProgagation: function (event) {
        if (event.stopProgagation) {
            event.stopProgagation();
        } else {
            event.cancelBubble = true;
        }
    }
};
```

## 事件委托/代理事件监听

事件委托利用了`事件冒泡`，只指定一个事件处理程序，就可以管理某一类型的所有事件。例如，click 事件会一直冒泡到 document 层次（根元素），也就是说，我们可以为整个页面指定一个 onclick 事件处理程序，而不必为每个可点击的元素分别添加事件处理程序。

**事件委托的优点**

- 可以大量节省内存占用，减少事件注册
- 可以实现当新增子对象时无需再次对其绑定（动态绑定事件）

**使用事件委托注意事项**

使用“事件委托”时，并不是说把事件委托给的元素越靠近顶层就越好。

事件冒泡的过程也需要耗时，越靠近顶层，事件的”事件传播链”越长，也就越耗时。

如果DOM嵌套结构很深，事件冒泡通过大量祖先元素会导致性能损失。

```js
<ul id="myLinks">
    <li id="goSomewhere">Go somewhere</li>
    <li id="doSomething">Do something</li>
    <li id="sayHi">Say hi</li>
</ul>
<script>
    var list = document.getElementById("myLinks");
    EVentUtil.addHandler (list, "click", function (event) {
        event = EVentUtil.getEvent(event);
        var target = EVentUtil.getTarget(event);

        switch(target.id) {
            case "doSomething":
                document.title = "I changed the document's title";
                break;
            case "goSomewhere":
                location.href = "https://www.baidu.com/";
                break;
            case "sayHi":
                console.log("hi");
                break;
        }
    })
</script>
```

上面例子中的EVentUtil对象，是我们之前封装的，可以往上看看

- 通过上面例子可以看到, 我们在ul 标签 id="myLinks" 绑定了事件，
- 然后我们可以通过点击不同的li，li通过事件冒泡，来触发到ul绑定的事件，
- 这样在事件对应的函数内写上判断，
- 我们就可以通过点击不同的li，就可以执行相应的代码了
- 就不用给每个li绑定事件，而且以后新增li也绑定事件，统一在ul绑定了事件，这也就是**动态绑定事件**

## 移除事件处理程序

内存中留有那些过时不用的“`空事件处理程序`”，也是造成 web 应用程序内存与性能问题的主要原因。

在两种情况下，可能会造成上述问题：

第一种情况就是从文档中移除带有事件处理程序的元素时。这可能是通过纯粹的DOM操作，例如使用`removeChild()`和`replaceChild()`方法，但更多地是发生在使用 `innerHTML` 替换页面中某一部分的时候。如果带有事件处理程序的元素被 `innerHTML` 删除了，那么原来添加到元素中的事件处理程序极有可能被当作垃圾回收。来看下面的例子：

```js
<div id="myDiv">
    <input type="button" value="ClickMe" id="myBtn">
</div>
<script>
    let btn = document.getElementById("myBtn");
    btn.onclick = function(){
        document.getElementById("myDiv").innerHTML = "Processing…";
    }
</script>
```

这里，有一个按钮被包含在`<div>`元素中，为避免双击，单击这个按钮时就将按钮移除并替换成一条消息；这是网站设计中非常流行的一种做法。但问题在于，当按钮被从页面中移除时，它还带着一个事件处理程序呢，在`<div>`元素中设置 innerHTML 可以把按钮移走，但事件处理各种仍然与按钮保持着引用联系。有的浏览器（`尤其是IE`）在这种情况下不会作出恰当的处理，它们很有可能会将对元素和事件处理程序的引用都保存在内存中。如果你想知道某个元即将被移除，那么最好手工移除事件处理程序。如下面的例子所示：

```js
<div id="myDiv">
    <input type="button" value="ClickMe" id="myBtn">
</div>
<script>
    var btn = document.getElementById("myBtn");
    btn.onclick = function(){
        btn.onclick = null;
        document.getElementById("myDiv").innerHTML="Processing…";
    }
</script>
```

在此，我们设置`<div>`的innerHTML属性之前，先移除了按钮的事件处理程序。这样就确保了内存可以被再次利用，而从DOM中移除按钮也做到了干净利索。

**注意，在事件处理程序中删除按钮也能阻止事件冒泡。目标元素在文档中是事件冒泡的前提, 有元素节点才能冒泡上去。**

**导致“空事件处理程序”的另一情况，就是卸载页面中的时候。**毫不奇怪，IE在这种情况下依然是问题最多的浏览器，尽管其他浏览器或多或少也有类似的问题。如果在页面被卸载之前没有清理干净事件处理程序。那它们就会滞留在内存中。每次加载完页面再卸载页面时（可能是在两个页面间来加切换，也可以是单击了“刷新”按钮），内存中滞留的对象数目就会增加，因为事件处理程序占用的内存并没有被释放。

一般来说，最好的做法是在页面卸载之前 ，先通过 `onunload` 事件处理程序移除所有事件处理程序。在此，事件委托技术再次表现出它的优势——需要跟踪的事件程序越少，移除它们就越容易，对这种类似的操作，我们可把它想象成：只要是通过 `onload` 事件处理程序添加的东西，最后都要通过 `onunload` 事件处理程序将它们移除。

## 一些常用事情的操作

### load 事件：

load 事件可以在任何资源（包括被依赖的资源）被加载完成时被触发，这些资源可以是图片，css，脚本，视频，音频等文件，也可以是 document 或者 window。

```js
window.onload = function(){}
```

**Image 元素 load:**

```js
// window onload
EVentUtil.addHandler (window, "load", function () {
    var image = new Image();
    // 要在指定 src 属性之前先指定事件
    EVentUtil.addHandler (image, "load", function () {
        console.log("Image loaded!");
    });
    image.src = "smile.gif";
});
```

> 注意：新图像元素不一定要添加到文档后才开始下载，只要设置了 src 属性就会开始下载。

**script 元素 load:**

```js
// window onload
EVentUtil.addHandler (window, "load", function () {
    var script = document.createElement("script");
    EVentUtil.addHandler (script, "load", function (event) {
        console.log("loaded!");
    });
    script.src = "example.js";
    document.body.appendChild(script);
})
```

> 与图像不同，只有设置了 script 元素的 src 属性并将元素添加到文档后，才会开始下载 js 文件

**onbeforeunload 事件(HTML5事件)：** 监听关闭页面事件

`window.onbeforeunload` 让开发人员可以在想用户离开一个页面的时候进行确认。这个在有些应用中非常有用，比如用户不小心关闭浏览器的 tab，我们可以要求用户保存他的修改和数据，否则将会丢失他这次的操作。

```js
EVentUtil.addHandler (window, "onbeforeunload", function (event) {
    if (textarea.value != textarea.defaultValue) {
        return 'Do you want to leave the page and discard changes?';
    }
});
```

需要注意的是，对页面添加 `onbeforeunload` 处理会导致浏览器不对页面进行缓存，这样会影响页面的访问响应时间。 同时，`onbeforeunload` 的处理函数必须是同步的（synchronous）。

**resize 事件：** 监听页面大小变化事件

在一些复杂的响应式布局中，对 window 对象监听 resize 事件是非常常用的一个技巧。仅仅通过 css 来达到想要的布局效果比较困难。很多时候，我们需要使用 JavaScript 来计算并设置一个元素的大小。

**error 事件:**

当我们的应用在加载资源的时候发生了错误，我们很多时候需要去做点什么，尤其当用户处于一个不稳定的网络情况下。Financial Times 中，我们使用 error 事件来监测文章中的某些图片加载失败，从而立刻隐藏它。由于“DOM Leven 3 Event”规定重新定义了 error 事件不再冒泡，我们可以使用如下的两种方式来处理这个事件。

```js
imageNode.addEventListener('error', function(event) {
    image.style.display = 'none';
});
```

不幸的是，addEventListener 并不能处理所有的情况。而确保图片加载错误回调函数被执行的唯一方式是使用让人诟病内联事件处理函数（inline event handlers）。

```js
<img src="http://example.com/image.jpg" onerror="this.style.display='none';" />
```

原因是你不能确定绑定 error 事件处理函数的代码会在 error 事件发生之前被执行。而使用内联处理函数意味着在标签被解析并且请求图片的时候，error监听器也将并绑定。

**当JavaScript运行时错误（包括语法错误）发生时，window会触发一个ErrorEvent接口的error事件，并执行window.onerror()。**

加载一个全局的error事件处理函数可用于自动收集错误报告。

```js
window.onerror = function(message, source, lineno, colno, error) { ... }
```

**函数参数：**

- message：错误信息（字符串）。可用于HTML onerror=""处理程序中的event。
- source：发生错误的脚本URL（字符串）
- lineno：发生错误的行号（数字）
- colno：发生错误的列号（数字）
- error：Error对象（对象）

若该函数返回true，则阻止执行默认事件处理函数。

```js
window.addEventListener('error', function(event) { ... })
```

[window.error详情](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror);

参考文献：

[javascript 事件流和事件委托](https://link.zhihu.com/?target=https%3A//juejin.cn/post/6854573221983813645);

[JS事件那些事儿 一次整明白](https://link.zhihu.com/?target=https%3A//juejin.cn/post/6844903732740636685%23heading-24);