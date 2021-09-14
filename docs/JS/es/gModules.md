# 6.modules

modules是ES6引入的最重要一个特性。
所以以后再写模块，直接按照ES6的modules语法来写，然后用 babel + browserify 来打包就行了。

modules规范分两部分，一部分是如何导出，一部分是如何导入。

## 基本用法

## 命名导出(named exports)

可以直接在任何变量或者函数前面加上一个 `export` 关键字，就可以将它导出。
这种写法非常简洁，和平时几乎没有区别，唯一的区别就是在需要导出的地方加上一个 export 关键字。
比如：

```js
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
```

然后在另一个文件中这样引用：

```js
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3));
```

你可能会注意到这个奇怪的语法 `{ square, diag }` 不就是前面讲过的 destructing吗。所以你会以为还可以这样写：

```js
 import lib from 'lib';
 square = lib.square;
```

但是其实这样是错的，因为 `import { square, diag } from 'lib’;` 是import的特有语法，并不是 destructing 语法，所以其实import的时候并不是直接把整个模块以对象的形式引入的。

如果你希望能通过 `lib.square` 的形式来写，你应该这样导入：

```js
 import * as lib from 'lib';
 square = lib.square;
```

不过值得注意的一点是，如果你直接用babel编译，执行是会报错的。因为 babel 并不会完全编译 modules，他只是把 ES6 的modules语法编译成了 CMD 的语法，所以还需要用 browserify 之类的工具再次编译一遍。
如果你发现 browserify 找不到 `lib`，可以改成 `from ‘./lib’` 试试。

## 默认导出

大家会发现上面的写法比较麻烦，因为必须要指定一个名字。其实很多时候一个模块只导出了一个变量，根本没必要指定一个名字。
还有一种用法叫默认导出，就是指定一个变量作为默认值导出：

```js
 //------ myFunc.js ------
export default function () { ... };

//------ main1.js ------
import myFunc from 'myFunc';
myFunc();
```

默认导出的时候不需要指定一个变量名，它默认就是文件名。
这里的区别不仅仅是不用写名字，而是 导出的默认值就是模块本身，而不是模块下面的一个属性，即是 `import myFunc from 'myFunc’;` 而不是 `import {myFunc} from 'myFunc’;`

## 命名导出结合默认导出

默认导出同样可以结合命名导出来使用：

```js
export default function (obj) {
    ...
};
export function each(obj, iterator, context) {
    ...
}
export { each as forEach };
```

上面的代码导出了一个默认的函数，然后由导出了两个命名函数，我们可以这样导入：

```js
 import _, { each } from 'underscore';
```

注意这个逗号语法，分割了默认导出和命名导出

其实这个默认导出只是一个特殊的名字叫 default，你也可以就直接用他的名字，把它当做命名导出来用，下面两种写法是等价的：

```js
import { default as foo } from 'lib';
import foo from 'lib';
```

同样的，你也可以通过显示指定 `default` 名字来做默认导出, 下面两种写法是一样的：

```js
 //------ module1.js ------
export default 123;

//------ module2.js ------
const D = 123;
export { D as default };
```

## 仅支持静态导入导出

ES6规范只支持静态的导入和导出，也就是必须要在编译时就能确定，在运行时才能确定的是不行的，比如下面的代码就是不对的：

```js
//动态导入
var mylib;
if (Math.random()) {
    mylib = require('foo');
} else {
    mylib = require('bar');
}
//动态导出
if (Math.random()) {
    exports.baz = ...;
}
```

为什么要这么做，主要是两点：

1. 性能，在编译阶段即完成所有模块导入，如果在运行时进行会降低速度
2. 更好的检查错误，比如对变量类型进行检查

## 各种导入和导出方式总结

总结一下，ES6提供了如下几种导入方式：

```js
// Default exports and named exports
import theDefault, { named1, named2 } from 'src/mylib';
import theDefault from 'src/mylib';
import { named1, named2 } from 'src/mylib';

// Renaming: import named1 as myNamed1
import { named1 as myNamed1, named2 } from 'src/mylib';

// Importing the module as an object
// (with one property per named export)
import * as mylib from 'src/mylib';

// Only load the module, don’t import anything
import 'src/mylib';
```

如下几种导出方式：

```js
 //命名导出
export var myVar1 = ...;
export let myVar2 = ...;
export const MY_CONST = ...;

export function myFunc() {
    ...
}
export function* myGeneratorFunc() {
    ...
}
export class MyClass {
    ...
}
// default 导出
export default 123;
export default function (x) {
    return x
};
export default x => x;
export default class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};
//也可以自己列出所有导出内容
const MY_CONST = ...;
function myFunc() {
    ...
}

export { MY_CONST, myFunc };
//或者在导出的时候给他们改个名字
export { MY_CONST as THE_CONST, myFunc as theFunc };

//还可以导出从其他地方导入的模块
export * from 'src/other_module';
export { foo, bar } from 'src/other_module';
export { foo as myFoo, bar } from 'src/other_module';
```


###  1. js使用require 和 import 引入依赖的区别？

require 和 import，都是为了JS模块化使用。最近项目中，因为多人协同开发，出现了一个项目中同时使用了require 和 import 引入依赖的情况。正常情况下，一个项目中最好是对引入方式做一个规范。下面我们就来看一下require 和 import的区别：

一.require
  require是Commonjs的规范，node应用是由模块组成的，遵从commonjs的规范。用法：

  a.js
```js
function test (args) {
  // body...
  console.log(args);
}

module.exports = {
  test
};
```

b.js
```js
let { test } = require('./a.js');

test('this is a test.');
```
`
    require的核心概念：在导出的文件中定义module.exports，导出的对象类型不予限定（可为任意类型）。在导入的文件中使用require()引入即可使用。本质上，是将要导出的对象，赋值给module这个对象的exports属性，在其他文件中通过require这个方法来访问exports这个属性。上面b.js中，require(./a.js) = exports 这个对象，然后使用es6取值方式从exports对象中取出test的值。
`
二.import
import是es6为js模块化提出的新的语法，import （导入）要与export（导出）结合使用。用法：

a.js:
```js
export function test (args) {
  // body...
  console.log(args);
}

// 默认导出模块，一个文件中只能定义一个
export default function() {...};

export const name = "lyn";
```
b.js:
```js
// _代表引入的export default的内容
import _, { test, name } from './a.js';

test(`my name is ${name}`);
```
三、commonjs模块与ES6模块的区别
    1.commonjs输出的，是一个值的拷贝，而es6输出的是值的引用；

    2.commonjs是运行时加载，es6是编译时输出接口；

### 2. require&&import  之间的区别

通常比较习惯用第一种。然后用import就可以得到这个数组或则参数。但是import只能用于静态导入，就是必须在文件开始的时候，在最上层就写好。而require就可以实现动态加载。

加载方式	|规范	|命令	|特点
-|:-:|-:|-
运行时加载	|CommonJS/AMD	|require	|社区方案，提供了服务器/浏览器的模块加载方案。非语言层面的标准。只能在运行时确定模块的依赖关系及输入/输出的变量，无法进行静态优化。
编译时加载	|ESMAScript6+	|import|语言规格层面支持模块功能。支持编译时静态分析，便于JS引入宏和类型检验。动态绑定。
```js
const incrementCounter = function ({dispatch,state}){
    dispatch(‘INCREMENT‘)
}
export default {
    incrementCounter
}
//require
let myAction = require(‘xxxxx‘);
```

### 3. md文档的表格写法:

```js
学号|姓名|分数
-|:-:|-:
小明|男|75
小红|女|79
小陆|男|92
```
# export报错SyntaxError: Unexpected token export

情景重现
a.js
```js
export let test = function () {
  console.log('1');
}
```
b.js
```js
let a= require ('./a');
a.test();
```
运行node b，即出现如下报错：
```js
export default {
^^^^^^

SyntaxError: Unexpected token export
```
解决方法
a.js改为如下：
```js
exports.test = function () {
  console.log('1');
}
```
根本原因
Node和浏览器端所支持的模块规范不同。

条目	Node	浏览器
模块规范	CommonJS	ES6
导出	* modules.exports; exports	export; export default
引入	require	import；require

1. 关于exports和module.exports
在一个node执行一个文件时，会给这个文件内生成一个 exports和module对象，
而module有一个exports属性。
exports = module.exports = {};
2. 关于 export 和export default
export与export default均可用于导出常量、函数、文件、模块等
在一个文件或模块中，export、import可以有多个，export default仅有一个
通过export方式导出，在导入时要加{ }，export default则不需要
export能直接导出变量表达式，export default不行。
参考文章：

exports、module.exports和export、export default到底是咋回事，
CommonJS规范，http://javascript.ruanyifeng.com/nodejs/module.html
ES6 Module 的语法，http://es6.ruanyifeng.com/#docs/module

# 阮一峰

由于浏览器脚本的默认语言是 JavaScript，因此`type="application/javascript"`可以省略。

默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到`<script>`标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。

如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。

```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

上面代码中，`<script>`标签打开`defer`或`async`属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

`defer`与`async`的区别是：`defer`要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；`async`一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，`defer`是“渲染完再执行”，`async`是“下载完就执行”。另外，如果有多个`defer`脚本，会按照它们在页面出现的顺序加载，而多个`async`脚本是不能保证加载顺序的。

### 加载规则

浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入`type="module"`属性。

```html
<script type="module" src="./foo.js"></script>
```

上面代码在网页中插入一个模块`foo.js`，由于`type`属性设为`module`，所以浏览器知道这是一个 ES6 模块。

浏览器对于带有`type="module"`的`<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的`defer`属性。

```html
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

如果网页有多个`<script type="module">`，它们会按照在页面出现的顺序依次执行。

`<script>`标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。

```html
<script type="module" src="./foo.js" async></script>
```

一旦使用了`async`属性，`<script type="module">`就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。

ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

```html
<script type="module">
  import utils from "./utils.js";

  // other code
</script>
```

举例来说，jQuery 就支持模块加载。

```html
<script type="module">
  import $ from "./jquery/src/jquery.js";
  $('#message').text('Hi from jQuery!');
</script>
```

对于外部的模块脚本（上例是`foo.js`），有几点需要注意。

- 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
- 模块脚本自动采用严格模式，不管有没有声明`use strict`。
- 模块之中，可以使用`import`命令加载其他模块（`.js`后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用`export`命令输出对外接口。
- 模块之中，顶层的`this`关键字返回`undefined`，而不是指向`window`。也就是说，在模块顶层使用`this`关键字，是无意义的。
- 同一个模块如果加载多次，将只执行一次。

下面是一个示例模块。

```javascript
import utils from 'https://example.com/js/utils.js';

const x = 1;

console.log(x === window.x); //false
console.log(this === undefined); // true
```

利用顶层的`this`等于`undefined`这个语法点，可以侦测当前代码是否在 ES6 模块之中。

```javascript
const isNotModuleScript = this !== undefined;
```

## ES6 模块与 CommonJS 模块的差异

讨论 Node.js 加载 ES6 模块之前，必须了解 ES6 模块与 CommonJS 模块完全不同。

> 它们有三个重大差异。

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段。

第二个差异是因为 CommonJS 加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

下面重点解释第一个差异。

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件`lib.js`的例子。

```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

上面代码输出内部变量`counter`和改写这个变量的内部方法`incCounter`。然后，在`main.js`里面加载这个模块。

```javascript
// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

上面代码说明，`lib.js`模块加载以后，它的内部变化就影响不到输出的`mod.counter`了。这是因为`mod.counter`是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```

上面代码中，输出的`counter`属性实际上是一个取值器函数。现在再执行`main.js`，就可以正确读取内部变量`counter`的变动了。

```bash
$ node main.js
3
4
```

ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的`import`有点像 Unix 系统的“符号连接”，原始值变了，`import`加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

还是举上面的例子。

```javascript
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

> 上面代码说明，ES6 模块输入的变量`counter`是活的，完全反应其所在模块`lib.js`内部的变化。

再举一个出现在`export`一节中的例子。

```javascript
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

// m2.js
import {foo} from './m1.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);
```

上面代码中，`m1.js`的变量`foo`，在刚加载时等于`bar`，过了 500 毫秒，又变为等于`baz`。

让我们看看，`m2.js`能否正确读取这个变化。

```bash
$ babel-node m2.js

bar
baz
```

上面代码表明，ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。

由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。

```javascript
// lib.js
export let obj = {};

// main.js
import { obj } from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
```

上面代码中，`main.js`从`lib.js`输入变量`obj`，可以对`obj`添加属性，但是重新赋值就会报错。因为变量`obj`指向的地址是只读的，不能重新赋值，这就好比`main.js`创造了一个名为`obj`的`const`变量。

最后，`export`通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。

```javascript
// mod.js
function C() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}

export let c = new C();
```

> 上面的脚本`mod.js`，输出的是一个`C`的实例。不同的脚本加载这个模块，得到的都是同一个实例。

```javascript
// x.js
import {c} from './mod';
c.add();

// y.js
import {c} from './mod';
c.show();

// main.js
import './x';
import './y';
```

现在执行`main.js`，输出的是`1`。

```bash
$ babel-node main.js
1
```

这就证明了`x.js`和`y.js`加载的都是`C`的同一个实例。

## Node.js 的模块加载方法

JavaScript 现在有两种模块。一种是 ES6 模块，简称 ESM；另一种是 CommonJS 模块，简称 CJS。

CommonJS 模块是 Node.js 专用的，与 ES6 模块不兼容。语法上面，两者最明显的差异是，CommonJS 模块使用`require()`和`module.exports`，ES6 模块使用`import`和`export`。

它们采用不同的加载方案。从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

Node.js 要求 ES6 模块采用`.mjs`后缀文件名。也就是说，只要脚本文件里面使用`import`或者`export`命令，那么就必须采用`.mjs`后缀名。Node.js 遇到`.mjs`文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定`"use strict"`。

如果不希望将后缀名改成`.mjs`，可以在项目的`package.json`文件中，指定`type`字段为`module`。

```javascript
{
   "type": "module"
}
```

一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。

```bash
# 解释成 ES6 模块
$ node my-app.js
```

如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成`.cjs`。如果没有`type`字段，或者`type`字段为`commonjs`，则`.js`脚本会被解释成 CommonJS 模块。

总结为一句话：`.mjs`文件总是以 ES6 模块加载，`.cjs`文件总是以 CommonJS 模块加载，`.js`文件的加载取决于`package.json`里面`type`字段的设置。

注意，ES6 模块与 CommonJS 模块尽量不要混用。`require`命令不能加载`.mjs`文件，会报错，只有`import`命令才可以加载`.mjs`文件。反过来，`.mjs`文件里面也不能使用`require`命令，必须使用`import`。