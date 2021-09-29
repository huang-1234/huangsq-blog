## 2.  浅谈 `this`

JS里面this关键字的指向问题(在浏览器环境下).

> 下面引自MDN对this的一段介绍

与其他语言相比, **函数的 [this]([this - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)) 关键字**在 JavaScript 中的表现略有不同, 此外, 在[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)和非严格模式之间也会有一些差别.

在绝大多数情况下, 函数的调用方式决定了 `this` 的值(运行时绑定). `this` 不能在执行期间被赋值, 并且在每次函数被调用时 `this` 的值也可能会不同. ES5 引入了 [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 方法来设置函数的 `this` 值, 而不用考虑函数如何被调用的. ES2015 引入了[箭头函数](https://wiki.developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions), 箭头函数不提供自身的 this 绑定( `this` 的值将保持为闭合词法上下文的值).

**this的指向在函数定义的时候是确定不了的, 只有函数执行的时候才能确定this到底指向谁**, **实际上this的最终指向的是那个调用它的对象**

* 如果一个函数中有this, 但是它没有被上一级的对象所调用, 那么this指向的就是window, js的严格版中this指向的不是window而是 undefined.
* 如果一个函数中有this, 这个函数有被上一级的对象所调用, 那么this指向的就是上一级的对象.
* 如果一个函数中有this, <font color=red>这个函数中包含多个对象, 尽管这个函数是被最外层的对象所调用, this指向的也只是它上一级的对象, </font>

## 构造函数 `this`

```js
function Fn() {
  this.user = "AndyHuang";
}
var a = new Fn();
console.log(a.user); //AndyHuang
```

首先, 必须搞清楚在JS里面, 函数的几种调用方式:

* 普通函数调用
* 作为方法来调用
* 作为构造函数来调用
* 使用apply/call方法来调用
* Function.prototype.bind方法
* es6箭头函数

但是不管函数是按哪种方法来调用的, 请记住一点: 谁调用这个函数或方法, this关键字就指向谁.

1. 普通函数

```js
function SayName() {
  name: 'andy',
  this.name: 'sq',
  console.log('this:', this, 'this.name:', this.name);
  console.log('name:', name)
}
SayName();
//this: Window this.name: sq
//Type.js:23 name: sq
```

在这段代码中 `SayName()` 函数作为普通函数调用, 实际上 `SayName` 是作为全局对象 `window` 的一个方法来进行调用的, 即 `window.person()` ;
所以这个地方是 `window` 对象调用了 `person` 方法, 那么 `person` 函数当中的 `this` 即指 `window` , 同时 `window` 还拥有了另外一个属性 `name` , 值为 `sq` .

2. 作为方法调用

在上面的代码中, 普通函数的调用即是作为 `window` 对象的方法进行调用. 显然 `this` 关键字指向了 `window` 对象. 再来看下其他的形式

```js
// 2. 作为方法调用
var name = "shuiqing";
var person = {
  name: "shuiqing",
  showName: function() {
    console.log(this.name);
  }
}
person.showName(); //输出  shuiqing
//这里是person对象调用showName方法，很显然this关键字是指向person对象的，所以会输出name

var showNameA = person.showName;
showNameA(); //输出  shuiqing
//这里将person.showName方法赋给showNameA变量，此时showNameA变量相当于window对象的一个属性，
//因此showNameA()执行的时候相当于window.showNameA(),
//即window对象调用showNameA这个方法，所以this关键字指向window
```

换种形式:

```js
let personA = {
  name: "shuiqing",
  showName: function() {
    console.log(this.name);
  }
}
let personB = {
  name: "SHUIQING",
  sayName: personA.showName
}

personB.sayName(); //输出 SHUIQING
//虽然showName方法是在personA这个对象中定义，但是调用的时候却是在personB这个对象中调用，因此this对象指向
```

3. 作为构造函数来调用

```js
function Person(name) {
  this.name = name;
}
var personA = Person("shuiqing");
console.log(personA.name); // 输出  undefined
console.log(window.name); //输出  shuiqing
//上面代码没有进行new操作，相当于window对象调用Person("shuiqing")方法，那么this指向window对象，并进行赋值操作window.name="shuiqing".
var personB = new Person("shuiqing");
console.log(personB.name); // 输出 shuiqing
```

4. new操作符：

```js
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}
let p = new Person('hsq', 18, 'male')
console.log('name:', p.name) // name:hsq
// 这说明构造函数中的this指向由他创建的实例对象
//另外
let name = 'shuiqing'

function sayName() {
  //'use strict'
  let name = 'hsq';
  // console.log(this);
  console.log('name:', this.name);
}
sayName();
//在node（严格）环境下输出：name：undefined
//在浏览器环境输出： name：hsq。另外在sayName()调用的前面加window与不加都一样，
这说明在全局调用的函数， 其实都是调用window对象的属性.也就是this指向window
// 另外如果加上’use strict‘这句话，即使在浏览器环境下，this也不指向window，
而是指向undefined。 因为没有对象调用这个方法。
```

## `this` 与 `return`

```js
// this和return
function fn() {
  this.name = 'hsq';
  return {}; // 返回一个空对象，那肯定是没有name这个属性的，自然就是undefined
}
let p1 = new fn;
console.log(p1.anme); //输出：undefined

function fn() {
  this.name = 'hsq';
  return 1;
}
let p2 = new fn;
console.log(p2.name); //输出：hsq
```

> 没有返回值, 或者返回值为一个非对象, this指向函数的实例

```js
function Person(name = 'huang', fullName = 'huangsq', age = 18, sex = 'male') {
  this.name = name;
  this.fullName = fullName;
  this.age = age
  // return { sex:sex }
  return 1
}

const p1 = new Person('jsHuang', 'jsHuangsq', 20, 'real male');
const p2 = new Person;
console.log(p1); //Person { name: 'jsHuang', fullName: 'jsHuangsq', age: 20 }
console.log(p2); //Person { name: 'huang', fullName: 'huangsq', age: 18 }
```

> 返回值为一个对象, 数组, 或者类对象, this则指向那个对象.

```js
function Person(name = 'huang', fullName = 'huangsq', age = 18, sex = 'male') {
  this.name = name;
  this.fullName = fullName;
  this.age = age
  // return { sex:sex }
  return [1, 2.3]
}

const p1 = new Person('jsHuang', 'jsHuangsq', 20, 'real male');
const p2 = new Person;
console.log(p1); //[ 1, 2.3 ]
console.log(p2); //[ 1, 2.3 ]
```

**如果返回值是一个对象, 那么this指向的就是那个返回的对象, 如果返回值不是一个对象那么this则指向函数的实例.**

## `this` 优先级(优先级向下递减)

1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。

```js
var bar = new FunObj()
```

1. 函数是否通过 call、apply（显式绑定）或者 bind 调用？如果是的话，this 绑定的是指定的对象。

```js
var bar = FunObj.call(obj2)
```

1. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。

```js
var bar = obj1.FunObj()
```

1. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。

```js
var bar = FunObj()
```

## 总结

* 当函数作为对象的方法调用时, 函数中的 this 就是该对象;
* 当函数被正常调用时, 在严格模式下, this 值是 undefined, 非严格模式下 this 指向的是全局对象 window;
* 嵌套函数中的 this 不会继承外层函数的 this 值.
