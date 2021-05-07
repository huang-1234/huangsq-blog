# instanceof&typeof

## instanceof





## typeof

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
