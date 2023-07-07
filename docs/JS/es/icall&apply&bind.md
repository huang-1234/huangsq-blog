## 9. icall&apply&bind

### 官方定义

我们先来看看MDN官方文档怎么定义这三个Function原型的属性

- apply

1. 定义：

   `apply()`方法调用一个具有给定`this`值的函数，以及以一个数组（或[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)）的形式提供的参数。

2. 参数：

   ```
   thisArg
   ```

   必选的。在 *`func`* 函数运行时使用的 `this` 值。请注意，`this`可能不是该方法看到的实际值：如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。

3. 返回值：

   ```
   argsArray
   ```

   可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。 [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#browser_compatibility) 请参阅本文底部内容。

- call

0. 该方法的语法和作用与 `apply()`方法类似，只有一个区别，就是 `call()` 方法接受的是`一个参数列表`，而 `apply()` 方法接受的是`一个包含多个参数的数组`。

+ bind

1. Function.prototype.bind()

   `bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

2. 参数：

   thisArg调用绑定函数时作为 `this` 参数传递给目标函数的值。 如果使用[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)运算符构造绑定函数，则忽略该值。当使用 `bind` 在 `setTimeout` 中创建一个函数（作为回调提供）时，作为 `thisArg` 传递的任何原始值都将转换为 `object`。如果 `bind` 函数的参数列表为空，或者`thisArg`是`null`或`undefined`，执行作用域的 `this` 将被视为新函数的 `thisArg`

3. 返回值：

   返回一个原函数的拷贝，并拥有指定的 ``this`` 值和初始参数。

### 实现

主要要掌握js是基于原型继承的面向对象

> apply

```js
// apply
Function.prototype.Apply = function (thisArg, argsArr) {
  console.log(typeof this);
  console.log(thisArg);
  if (typeof this !== 'function') throw new TypeError('thisArg must be function');
  let self = thisArg || window;
  const uniqueTag = '00' + Math.random();
  console.log('this:',this);
  self[uniqueTag] = this;
  const funApply = self[uniqueTag](argsArr)
  delete self[uniqueTag];
  return funApply;
}
```

test：

```js
function sayName(place) {
  console.log(`my name is ${this.name}. I am in ${place}. I want go to${this.$fn}.`);
}
let o = {
  name: 'hsq',
  $fn:'hangzhou'
}
sayName.Apply(o,['changsha']);// 输出：my name is hsq. I am in changsha .I want go to hangzhou.
```

### bind()

> `bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
>
> — MDN

`bind` 方法与 `call / apply` 最大的不同就是前者返回一个绑定上下文的`函数`，而后两者是`直接执行`了函数。

来个例子说明下：

```js
let value = 2;
let foo = {
    value: 1
};
function bar(name, age) {
    return {
		value: this.value,
		name: name,
		age: age
    }
};

bar.call(foo, "Jack", 20); // 直接执行了函数
// {value: 1, name: "Jack", age: 20}

let bindFoo1 = bar.bind(foo, "Jack", 20); // 返回一个函数
bindFoo1();
// {value: 1, name: "Jack", age: 20}

let bindFoo2 = bar.bind(foo, "Jack"); // 返回一个函数
bindFoo2(20);
// {value: 1, name: "Jack", age: 20}
```

通过上述代码可以看出 `bind` 有如下特性：

- 1、指定 `this`
- 2、传入参数
- 3、返回一个函数
- 4、柯里化

### 模拟实现：

```js
Function.prototype.bind = function (context) {
    // 调用 bind 的不是函数，需要抛出异常
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    // this 指向调用者
    var self = this;
    // 实现第2点，因为第1个参数是指定的this,所以只截取第1个之后的参数
    var args = Array.prototype.slice.call(arguments, 1);

    // 实现第3点,返回一个函数
    return function () {
        // 实现第4点，这时的arguments是指bind返回的函数传入的参数
        // 即 return function 的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        // 实现第1点
        return self.apply( context, args.concat(bindArgs) );
    }
}
```

但还有一个问题，`bind` 有以下一个特性：

> 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

来个例子说明下：

```js
let value = 2;
let foo = {
    value: 1
};
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend = 'kevin';

let bindFoo = bar.bind(foo, 'Jack');
let obj = new bindFoo(20);
// undefined
// Jack
// 20

obj.habit;
// shopping

obj.friend;
// kevin
```

上面例子中，运行结果 `this.value` 输出为 `undefined` ，这不是全局 `value` 也不是 `foo` 对象中的 `value` ，这说明 `bind` 的 `this` 对象失效了，`new` 的实现中生成一个新的对象，这个时候的 `this` 指向的是 `obj` 。

这个可以通过修改返回函数的原型来实现，代码如下:

```js
Function.prototype.bind = function (context) {
    // 调用 bind 的不是函数，需要抛出异常
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    // this 指向调用者
    var self = this;
    // 实现第2点，因为第1个参数是指定的this,所以只截取第1个之后的参数
    var args = Array.prototype.slice.call(arguments, 1);

    // 创建一个空对象
    var fNOP = function () {};

    // 实现第3点,返回一个函数
    var fBound = function () {
        // 实现第4点，获取 bind 返回函数的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        // 然后同传入参数合并成一个参数数组，并作为 self.apply() 的第二个参数
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
        // 注释1
    }

    // 注释2
    // 空对象的原型指向绑定函数的原型
    fNOP.prototype = this.prototype;
    // 空对象的实例赋值给 fBound.prototype
    fBound.prototype = new fNOP();
    return fBound;
}
```

`注释1` ：

- 当作为构造函数时，`this` 指向实例，此时 `this instanceof fBound` 结果为 `true` ，可以让实例获得来自绑定函数的值，即上例中实例会具有 `habit` 属性。
- 当作为普通函数时，`this` 指向 `window` ，此时结果为 `false` ，将绑定函数的 `this` 指向 `context`

`注释2` ：

- 修改返回函数的 `prototype` 为绑定函数的 `prototype`，实例就可以继承绑定函数的原型中的值，即上例中 `obj` 可以获取到 `bar` 原型上的 `friend`
- 至于为什么使用一个空对象 `fNOP` 作为中介，把 `fBound.prototype` 赋值为空对象的实例（原型式继承），这是因为直接 `fBound.prototype = this.prototype` 有一个缺点，修改 `fBound.prototype` 的时候，也会直接修改 `this.prototype` ；其实也可以直接使用ES5的 `Object.create()` 方法生成一个新对象，但 `bind` 和 `Object.create()` 都是ES5方法，部分IE浏览器（IE < 9）并不支

`注意：` `bind（）` 函数在 ES5 才被加入，所以并不是所有浏览器都支持，`IE8` 及以下的版本中不被支持，如果需要兼容可以使用 Polyfill 来实现

详情可前往 [深度解析bind原理、使用场景及模拟实现](https://github.com/yygmind/blog/issues/23) 查看

### 补充：柯里化

在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。这个技术由 Christopher Strachey 以逻辑学家 Haskell Curry 命名的，尽管它是 Moses Schnfinkel 和 Gottlob Frege 发明的。

```js
var add = function(x) {
  return function(y) {
    return x + y;
  };
};
var increment = add(1);
var addTen = add(10);
increment(2);
// 3

addTen(2);
// 12

add(1)(2);
// 3
```

这里定义了一个 `add` 函数，它接受一个参数并返回一个新的函数。调用 `add` 之后，返回的函数就通过闭包的方式记住了 `add` 的第一个参数。所以说 `bind` 本身也是闭包的一种使用场景。

`柯里化`是将 `f(a,b,c)` 可以被以 `f(a)(b)(c)` 的形式被调用的转化。JavaScript 实现版本通常保留函数被正常调用和在参数数量不够的情况下返回偏函数这两个特性。

以下完整实现bind

> bind

```js
Function.prototype.BindMe = function (context) {
  console.log('first:', context);
  // const context = arguments[0];console.log(context);
  // 这里的参数args指的是bind函数本身接收的除了第一个以外剩下的参数，搜集为一个数组
  const args = Array.prototype.slice.call(arguments, 1);
  console.log('args:',args);
  if (typeof this !== 'function') throw new TypeError('this must be function');

  var _this = this;
  let self = context || window;

  const funcBind = function () {
    // 这里函数接收的参数arguments时bind函数返回的函数调用时传入的参数
    var bindArgs = Array.prototype.slice.call(arguments);
    // 返回函数的执行结果
    // 判断函数是作为构造函数还是普通函数
    // 构造函数this instanceof fNOP返回true，将绑定函数的this指向该实例，
    //可以让实例获得来自绑定函数的值。

    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    //第三个参数表示参数args和bingArgs参数的组合
    return _this.apply(this instanceof fnNOP ? this : context, args.concat(bindArgs));
  }
  var fnNOP = function () { }
  fnNOP.prototype = this.prototype; // fNOP函数的prototype为绑定函数的prototype
  funcBind.prototype = new fnNOP();
  // 以上三句相当于Object.create(this.prototype)
  return funcBind;
}

function sayName(place) {
  console.log(`my name is ${this.name}. I am in ${place}. I want go to${this.$fn}`);
  console.log(arguments);
}
let o = {
  name: 'hsq',
  $fn: 'hangzhou'
}
sayName.BindMe(o, 'changsha')('bindCallback');
```

test:

```js
function sayName(place) {
  console.log(`my name is ${this.name}. I am in ${place}. I want go to${this.$fn}`);
  console.log(arguments);
}
let o = {
  name: 'hsq',
  $fn: 'hangzhou'
}
sayName.BindMe(o, 'changsha')('bindCallback');
//first: { name: 'hsq', '$fn': 'hangzhou' }
//args: [ 'changsha' ]
//my name is hsq. I am in changsha. I want go tohangzhou
//[Arguments] { '0': 'changsha', '1': 'bindCallback' }
```

参考阅读

[bokeyuan](https://www.cnblogs.com/hahazexia/p/9953906.html)

[知乎](https://zhuanlan.zhihu.com/p/71553017)

