# instanceof&typeof

## instanceof

在 JavaScript 中，判断一个变量的类型常常会用 typeof 运算符，
在使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，
它都返回 “object”。这就需要用到instanceof来检测某个对象是不是另一个对象的实例。

另外，更重的一点是 instanceof 可以在继承关系中用来判断一个实例是否属于它的父类型。

**简单用法**

```js
function Fn () {}
const fn = new Fn()
fn instanceof Fn
// true
```

**实现如下：**

```js
// left instanceof right
function _instanceof(left, right) {
  // 构造函数原型
  const prototype = right.prototype
  // 实列对象属性，指向其构造函数原型
  left = left.__proto__
  // 查实原型链
  while (true) {
    // 如果为null，说明原型链已经查找到最顶层了，真接返回false
    if (left === null) {
      return false
    }
    // 查找到原型
    if (prototype === left){
      return true
    }
    // 继续向上查找
    left = left.__proto__
  }
}
```

上面代码只实现了基础功能，而非全部，看下面代码

```js
const str = "abc"

str instanceof String // false
_instanceof(str, String) // true
```

为什么？根据`ECMAScript7`规范

```js
O instanceof C
```

> 重复地获取对象O的原型对象，然后比较该原型对象和`C`的`prototype`属性是否相等，直到相等返回`true`，或者O变为`null`，也就是遍历完整个原型链，返回`false`。

对C的规定

1. 如果`C`的数据类型不是对象，抛出一个类型错误的异常；
2. 如果`C`不能被调用，抛出一个类型错误的异常；
3. 如果`C`不能被调用，返回`false`；

对O的规定

1. 如果`O`的类型不是对象，返回`false`；

另外：如果`C`是一个`bind`函数，那么会重新在`C`绑定的目标函数上执行 O instanceof C 操作。

## 另外

来看这么一个问题

```js
var str = new String("hello world");
console.log(str instanceof String);//true
console.log(String instanceof Function);//true
console.log(str instanceof Function);//false
```

第三次输出为什么会返回false呢

1、每一个js对象都有一个proto属性 (标准表示[[prototype]])，proto是普通对象的隐式属性，在实例化的时候，会指向prototype所指的对象;对象是没有prototype属性的，prototype则是属于构造函数的属性，即

```js
console.log(str.__proto__ === String.prototype); //true
```

2、通过proto属性的串联构建了一个对象的原型访问链，起点为一个具体的对象，终点在Object.prototype，即

```js
console.log( Object.prototype.__proto__ === null ); //true
```

**指向关系**

```js
//表达式一的指向
console.log(str.__proto__ === String.prototype);//true
console.log(str instanceof String); //true

//表达式二的指向
console.log(String.__proto__ === Function.prototype);//true
console.log(String instanceof Function);//true

//表达式三的指向
console.log(str.__proto__ === String.prototype);//true
console.log(str.__proto__.__proto__ === String.prototype.__proto__);//true
console.log(str.__proto__.__proto__ === Object.prototype);//true
console.log(str.__proto__.__proto__.__proto__ === null);//true
console.log(str instanceof Object);//true
console.log(str instanceof Function);//false
```

str的原型链上没有Function.prototype，所以返回false

`instanceof` 这个运算符的名字没起好，带有很强的误导性。仅从字面理解，它好像是检查一个对象是否为某个类型的实例对象，然而 `a instanceof b` 真正的语义是检查 b.prototype 是否在 a 的原型链上，仅此而已。

str 的原型链：

```js
 str ---> String.prototype ---> Object.prototype
```

String 的原型链：

```js
String ---> Function.prototype ---> Object.prototype
```



Function.protype 不在 str 的原型链上，所以 str instanceof Function 返回 false

# typeof

## typeof 的定义

> typeof操作符返回一个字符串，表示未经计算的操作数的类型。

```js
// ypeof操作符返回一个字符串，表示未经计算的操作数的类型。
console.log(typeof 37);// print: "number"
console.log( typeof 'hsq');// print: "string"
console.log(typeof true);// print: "boolean"
console.log(typeof declaredButUndefinedVariable);
// 使用typeof 操作一个未定义的变量// print: "undefined"
```

## 返回值的解释

从上面的例子我们可以看出，typeof 操作符用于检测给定变量的数据类型。对于一个值使用 typeof 操作符，可能返回以下几个字符串：

- **boolean** -- 代表这个值是布尔值
- **string** -- 代表这个值是字符串
- **number** -- 代表这个值是数值
- **symbol** -- 代表这个值是Symbol
- **undefined** -- 代表这个值未定义
- **object** -- 代表这个值是对象或null
- **function** -- 代表这个值是函数

### 返回 boolean、string、number 的情况

对于布尔值、字符串、数字使用typeof 操作符，分别返回 "boolean"、"string"、"number"

```js
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写
typeof Number(1) === 'number'; // 但不要使用这种形式!
// Strings
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof总是返回一个字符串
typeof String("abc") === 'string'; // 但不要使用这种形式!
// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // 但不要使用这种形式!
```

### 返回 symbol 的情况

对 Symbol 类型的值使用 typeof 操作符时，会返回 "symbol" Symbol 是 ECMAScript 6 新增的类型

```js
// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';
```

### 返回 undefined 的情况

```js
// Undefined
console.log(typeof null); // object
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined';
```

对 undefined 使用 typeof 操作符，返回 "undefined" 未赋值的变量，默认值为 undefined ，对未赋值的变量使用 typeof 操作符，返回 "undefined"

#### 需要注意的问题

在 ECMAScript 6 之前，typeof总是保证为任何操作数返回一个字符串，所以当对未定义的变量使用 typeof 操作符时，也会返回 "undefined", 所以在 ECMAScript 6 之前，typeof 操作符时一个完全安全的操作，永远不会抛出错误。

但在 ECMAScript 6 中，引入了暂时性死区的概念，在变量声明之前，对块中的 let 和 const 变量使用 typeof 操作符时，会抛出一个 ReferenceError

看一个例子

```js
let a = 1;// a 已经声明并且是数字
typeof a === "number"
// b 是为定义的变量，并且当前块作用域中，没有与之同名的通过let和const声明的变量
typeof b === "undefined"
//当前块作用域中，通过let声明了c，在c未被初始化之前，存在暂时性死区，此时使用 typeof 抛出 ReferenceErrortypeof c 
// ReferenceErrorlet c;
```

### 返回 function 的情况

当对函数使用 typeof 操作符的时候，会返回 "function"

```js
// 函数
typeof function () { } === 'function';
typeof class C { } === 'function';
typeof Math.sin === 'function';
typeof new Function() === 'function';
//
```

**需要注意的问题**

这里有一个历史遗留问题，需要我们考虑

当我们的浏览器环境是 Safari 5 及以前版本、Chrome 7 及以前版本 在对正则表达式对象使用 typeof 操作符时，也会返回 "function"， 实际在 ECMAScript 的规范中，应该返回 "object"

### 返回 object 的情况

对于不是函数的引用类型的值，使用 typeof 操作符时，会返回 "object"

```js

typeof { a: 1 } === 'object';
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';// 下面的容易令人迷惑，不要使用！
typeof new Boolean(true) === 'object';
typeof new Number(1) === 'object';
typeof new String("abc") === 'object';

```

对于 null 使用 typeof 操作符时，也会返回 "object"

```js
typeof null === 'object'; // 从一开始出现JavaScript就是这样的
```

这是由于在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null的类型标签也成为了 0，typeof null就错误的返回了"object"

## 例外情况

上面的所有内容，其实基本概括了所有使用 typeof 操作符的情况 但是在这其中有一个例外情况：

当前所有的浏览器都暴露了一个非标准的宿主对象 document.all

我们在对 document.all 使用 typeof 操作符时，会返回 "undefined"

```js
typeof document.all === 'undefined';
```
