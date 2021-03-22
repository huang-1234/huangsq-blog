# 8. 模块化

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

```text
学号|姓名|分数
-|:-:|-:
小明|男|75
小红|女|79
小陆|男|92
```