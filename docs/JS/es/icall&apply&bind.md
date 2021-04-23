## icall&apply&bind

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

0. 该方法的语法和作用与 `apply()`方法类似，只有一个区别，就是 `call()` 方法接受的是**一个参数列表**，而 `apply()` 方法接受的是**一个包含多个参数的数组**。

+ bind

1. Function.prototype.bind()

   `bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

2. 参数：

   thisArg调用绑定函数时作为 `this` 参数传递给目标函数的值。 如果使用[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)运算符构造绑定函数，则忽略该值。当使用 `bind` 在 `setTimeout` 中创建一个函数（作为回调提供）时，作为 `thisArg` 传递的任何原始值都将转换为 `object`。如果 `bind` 函数的参数列表为空，或者`thisArg`是`null`或`undefined`，执行作用域的 `this` 将被视为新函数的 `thisArg`

3. 返回值：

   返回一个原函数的拷贝，并拥有指定的 **`this`** 值和初始参数。

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
  console.log(`my name is ${this.name}. I am in ${place}. I want ${this.$fn}.`);
}
let o = {
  name: 'hsq',
  $fn:'many money'
}
sayName.Apply(o,['changsha']);// 输出：my name is hsq. I am in changsha .I want many money.
```

> bind

```js
Function.prototype.BindMe = function (context) {
  console.log('first:', context);
  // const context = arguments[0];console.log(context);

  const args = Array.prototype.slice.call(arguments, 1); console.log(args);
  if (typeof this !== 'function') throw new TypeError('this must be function');
  
  var _this = this;
  let self = context || window;
  
  const funcBind = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 返回函数的执行结果
    // 判断函数是作为构造函数还是普通函数
    // 构造函数this instanceof fNOP返回true，将绑定函数的this指向该实例，可以让实例获得来自绑定函数的值。
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return _this.apply(this instanceof fnNOP ? this : context, args.concat(bindArgs));
  }
  var fnNOP = function () { }
  fnNOP.prototype = this.prototype; // fNOP函数的prototype为绑定函数的prototype
  funcBind.prototype = new fnNOP();
  // 以上三句相当于Object.create(this.prototype)
  return funcBind;
}
```

test:

```js
function sayName(place) {
  console.log(`my name is ${this.name}. I am in ${place}. I want ${this.$fn}`);
}
let o = {
  name: 'hsq',
  $fn: 'many money'
}
sayName.BindMe(o, 'changsha')();
// 输出：first: { name: 'hsq', '$fn': 'many money' }
//[ 'changsha' ]
//my name is hsq. I am in changsha. I want many money
```

参考阅读

[bokeyuan](https://www.cnblogs.com/hahazexia/p/9953906.html)

[知乎](https://zhuanlan.zhihu.com/p/71553017)

