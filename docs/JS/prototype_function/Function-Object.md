# Function with Object

写在开篇之前：记录学习点滴，如有错误与补充，希望大家积极指正。

有 4 个规则一定要记住，如下

- `javascript中一切皆对象，函数也属于对象。`
- `所有对象都含有__proto__。`
- `只有函数才有prototype。`
- `所有函数的默认原型都是Object的实例。`

我们来看一下 demo

```js
var o = {};
o.__proto__ === Object.prototype; //true
o instanceof Object; //true
o instanceof Function; //false

var o = Object();
o.__proto__ === Object.prototype; //true
o instanceof Object; //true
o instanceof Function; //false

var o = new Object();
o.__proto__ === Object.prototype; //true
o instanceof Object; //true
o instanceof Function; //false

function Fn() {}
var fn = new Fn();
fn.__proto__ === Fn.prototype;

fn instanceof Fn; //true
fn instanceof Object; //true
fn instanceof Function; //false
```

js 中一切皆对象，函数也是对象的一种，姑且叫做函数对象。那么`Function`与`Object`是什么关系呢。

- 函数对象都是由`Function`函数生成的，看下例

```js
function fn() {}

fn.__proto__ === Function.prototype; //true
fn instanceof Function; //true
fn instanceof Object; //true
```

可以看出当把函数当成对象的时候，函数也有`__proto__`属性，并且生成它的函数就是`Function`，那么`Function`自己呢，因为`Function`本身也是函数，函数是由`Function`生成的，那么看下例。

```js
Function.__proto__ === Function.prototype; //true
```

- Object 函数也是一个函数对象，也是由 Function 生成的，那么看下例

```js
Object.__proto__ === Function.prototype; //true
```

- 对一般函数来说，prototype 是什么呢？以`function fn(){}`为例子

- 看看 fn.prototype 的属性等于什么呢

```js
fn.prototype.__proto__ === Object.prototype; //true
fn.prototype.constructor === fn; //true
```

fn.prototype 含有`__proto__`与`constructor`两个属性，`__proto__`属性指向 Object.prototype，那么`一般函数的prototype是由Object函数生成的`。

- 特殊函数 `Object`与`Function`

先看看 Object.prototype

```js
Object.prototype
{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
constructor: ƒ Object()
hasOwnProperty: ƒ hasOwnProperty()
isPrototypeOf: ƒ isPrototypeOf()
propertyIsEnumerable: ƒ propertyIsEnumerable()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
valueOf: ƒ valueOf()
__defineGetter__: ƒ __defineGetter__()
__defineSetter__: ƒ __defineSetter__()
__lookupGetter__: ƒ __lookupGetter__()
__lookupSetter__: ƒ __lookupSetter__()
get __proto__: ƒ __proto__()
set __proto__: ƒ __proto__()
```

可以看出`Object`的`prototype`的也是一个`object`类型的对象，但是和一般函数不一样的对方是，他的 prototype 多出了很多其他的方法，这些是 Javascript 系统默认的方法。但是好像没有`__proto__`属性啊，我们把 Object.prototype.\_\_proto\_\_打出来看看

```js
Object.prototype.__proto__;
null;
```

这就是 Object 函数不一样的地方了，`Object.prototype.__proto__ === null`，这就是 Javescript 原型链的终点了。那为什么是这个样子呢？

`typeof Object.prototye === 'object'`,说明他是一个 object 类型的对象，如果他是由 Object 函数生成的，那么`Object.prototype.__proto__ === Object.prototype`。那么`Object.prototype.__proto__`指向自身，那么以**proto**属性构成的原型链将没有终点了，所以为了让原型链有终点。Javascript 规定，`Object.prototype.__proto__ === null`。

那么`Function`又是什么情况呢。

```js
typeof Function.prototype;
("function");
```

可以看出 Function 属性的 prototype 是一个`"function"`类型的对象，而不像其他的对象是`"object"`对象，那么既然是对象，那也是有**proto**属性的，那么`Function.prototype.__proto__`是什么呢

```js
Function.prototype.__proto__
{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
constructor: ƒ Object()
hasOwnProperty: ƒ hasOwnProperty()
isPrototypeOf: ƒ isPrototypeOf()
propertyIsEnumerable: ƒ propertyIsEnumerable()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
valueOf: ƒ valueOf()
__defineGetter__: ƒ __defineGetter__()
__defineSetter__: ƒ __defineSetter__()
__lookupGetter__: ƒ __lookupGetter__()
__lookupSetter__: ƒ __lookupSetter__()
get __proto__: ƒ __proto__()
set __proto__: ƒ __proto__()
```

```js
Function.prototype.__proto__ === Object.prototype;
true;
```

那么这又是为什么呢？

一般而言，一个"function"类型的对象，应该是由 Function 函数生成的，也就是`Function.prototype.__proto__ === Function.prototype`才对，如果是这样的话，也就出现了跟 Object 一样的问题，一直循环利用，没有尽头。所以 Javascript 规定，`Function.prototype.__proto__ === Object.prototype`,`Object.prototype.__proto__ === null`，是原型链有终点。也就是在原型链的终点处有 2 个特殊情况。

总结以下

- 函数含有`__proto__`与`prototype`属性，`__proto__`指向`Function.prototype`,`prototype`指向 Object.prototype。

所有的类型的`[[Prototype]]`特性，即 `__proto__`属性均指向的是 `Function.prototype`，同时 `Function.prototype` 的`[[Prototype]]`特性，即 `__proto__`属性又指向了 `Object.prototype`，`Object.prototype`的`__proto__`又指向`null`，即原型链的终点。

下面一些题目，大家分析看看

```js
function fn() {}
var o = {};
var o1 = new Object();

typeof fn; //"function"
typeof fn.prototype; //"object"
typeof fn.__proto__; //"function"
fn.prototype.__proto__ === Object.prototype; //true   所有函数的默认原型都是Object的实例
fn.__proto__ === Function.prototype; //true   所有函数都是Function生成的

fn instanceof Function; //true  fn是Function的实例
fn instanceof Object; //true  fn也是Object的实例

typeof o; //"object"
typeof o.prototype; // "undefined"  因为只有函数才有prototype
typeof o.__proto__; // "object"
o.__proto__.__proto__ === null; //true

o instanceof Object; // true o是Object的实例
```
