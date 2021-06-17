#  1. esType

## 原始类型

在 es6 中，存在着 7 种原始类型：

- `Boolean`
- `Null`
- `Undefined`
- `Number`
- `String`
- `Symbol`
- `BigInt`

原始类型存储的是值，没有函数可以调用。

那么有个问题，为什么`1..toString()`是正确的？而`1.toString()`却不行了呢？

原因在于数字1后面接的第一个点`.`,编译器是直接当成数字的一部分，而`1.`后面再接上一个点`.`才会被当成数字在调用方法，而这也只是数字的隐藏类`Number`在调用它原型上的方法，数字本身只是基本类型，没有方法和属性，如果调用就会调用相应隐藏类的方法和属性。

> 引用数据类型: 对象Object（包含普通对象-Object，数组对象-Array，正则对象-RegExp，日期对象-Date，数学函数-Math，函数对象-Function），区分它们最好的方法就是后面将要介绍的``Object.prototype.toString.call(target).slice(8,-1)`
>
> tartget是需要被检测的对象，后面再加一个slice(8,-1)是为了去掉前面的[object ]

```js
function test(person) {
  person.age = 18
  person = {
    name: 'Andy',
    age: 19
  }
  return person
}
const p1 = {
  name: 'sq',
  age: 20
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```

结果:

```js
p1：{ name: 'sq', age: 18 }
p2: { name: 'Andy', age: 19 }
```

> 原因: 在函数传参的时候传递的是对象在堆中的内存地址值，test函数中的实参person是p1对象的内存地址，通过调用person.age = 18确实改变了p1的值，但随后person变成了另一块内存空间的地址，并且在最后将这另外一份内存空间的地址返回，赋给了p2。

### 对象类型

对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址（指针）。

当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。

### 正确判断 null

```js
console.log(typeof null); //object
Object.prototype.toString.call(null) // "[object Null]" 
```

### typeof vs instanceof

`typeof` 对于原始类型来说，除了 `null` 都可以显示正确的类型

```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
```

`typeof` 对于对象来说，除了函数都会显示 `object`，所以说 `typeof` 并不能准确判断变量到底是什么类型.

```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

如果我们想判断一个对象的正确类型，这时候可以考虑使用 `instanceof`，因为内部机制是通过原型链来判断的。

```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true
```

对于原始类型来说，你想直接通过 `instanceof` 来判断类型是不行的，当然我们还是有办法让 `instanceof` 判断原始类型的

```js
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) // true
```

### 类型转换

在` js `中，只有三种类型转换

- 转换为布尔值
- 转换为数字
- 转换为字符串

### 转Boolean

在条件判断时，除了 `undefined`， `null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 `true`，包括所有对象。

### 对象转原始类型

一般非基础类型进行转换时会先调用 valueOf，如果 valueOf 无法返回基本类型值，就会调用 toString

对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下：

- 先检测该对象中是否存在 `valueOf` 方法，如果有并返回了原始类型，那么就使用该值进行强制类型转换；
- 如果 `valueOf` 没有返回原始类型，那么就使用 `toString` 方法的返回值；
- 如果 `vauleOf` 和 `toString` 两个方法都不返回基本类型值，便会触发一个 `TypeError` 的错误。

也可以重写 `Symbol.toPrimitive` ，该方法在转原始类型时调用优先级最高。

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
1 + a // => 3
```

### 四则运算符

加法运算符不同于其他几个运算符，它有以下几个特点：

- 运算中其中一方为字符串，那么就会把另一方也转换为字符串。
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

```js
1 + '1' // '11'
true + true // 2
4 + [1,2,3] // "41,2,3"
```

对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字

```js
4 * '3' // 12
4 * [] // 0
4 * [1, 2] // NaN
```

### 比较运算符

- 如果是对象，就通过 `toPrimitive` 转换对象
- 如果是字符串，就通过 `unicode` 字符索引来比较

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  }
}
a > -1 // true
```

### == VS ===

对于 `==` 来说，如果对比双方的类型**不一样**的话，就会进行**类型转换**.

假如我们需要对比 `x` 和 `y` 是否相同，就会进行如下判断流程：

1. 首先会判断两者类型是否**相同**。相同的话就是比大小了
2. 类型不相同的话，那么就会进行类型转换
3. 会先判断是否在对比 `null` 和 `undefined`，是的话就会返回 `true`
4. 判断两者类型是否为 `string` 和 `number`，是的话就会将字符串转换为 `number`
5. 判断其中一方是否为 `boolean`，是的话就会把 `boolean` 转为 `number` 再进行判断
6. 判断其中一方是否为 `object` 且另一方为 `string`、`number` 或者 `symbol`，是的话就会把 `object` 转为原始类型再进行判断

对于 `===` 来说，就是判断两者类型和值是否相同

[] == ![] 为何是 true？

首先看右边，! 符号会将后面的变量强转为 boolean 值，由于 [] 转换为 boolean 是 true，故右边为 false，然后依照上方的第 5 条，将 false 转换为数字 0。

然后看左边，满足第六条的条件，调用 valueOf，由于空数组调用 valueOf 是转化为 0 ，故返回值是 true。

## 常见

### 0.1 + 0.2 === 0.3 嘛？为什么？

在两数相加时，会先转换成二进制，0.1 和 0.2 转换成二进制的时候尾数会发生无限循环，然后进行对阶运算，JS 引擎对二进制进行截断，所以造成精度丢失。

所以总结：**精度丢失可能出现在进制转换和对阶运算中**

### JS 整数是怎么表示的？

通过 Number 类型来表示，遵循 IEEE754 标准，通过 64 位来表示一个数字，（1 + 11 + 52）（1 位数符 + 11 位阶码 + 52 位尾数），最大安全数字是 Math.pow(2, 53) - 1。（符号位 + 指数位 + 小数部分有效位）

### `symbol` 有什么用处

可以用来表示一个独一无二的变量防止命名冲突。

可以利用 `symbol` 不会被常规的方法（除了 `Object.getOwnPropertySymbols` 外）遍历到，所以可以用来模拟私有变量。

主要用来提供遍历接口，布置了 `symbol.iterator` 的对象才可以使用 `for···of` 循环，可以统一处理数据结构。调用之后回返回一个遍历器对象，包含有一个 next 方法，使用 next 方法后有两个返回值 value 和 done 分别表示函数当前执行位置的值和是否遍历完毕。

Symbol.for() 可以在全局访问 symbol。

### {} + [] 和 [] + {} 的区别

```js
[] + {} // "[object Object]"
{} + [] // 0
```

看第一个，[] 会强转为 ""，{}强转为字符串为 `"[object Object]"`。两个字符串相加，得到最终结果。

第二个，编译器会把 {} 当作一个空代码块，可以理解为全局作用域下一个没有用的 {} 符号而已，可以把 `{} + []` 当作 `+ []`，而`+ []`是强制将`[]`转换为number ,转换的过程是 `+ []` --> `+""` -->`0` 最终的结果就是0。

但是我们执行`console.log({}+[])`和`console.log([]+{})`,结果是一样的，因为{}没有一个语句或者表达式的头部。

### Symbol 类型转换

- 不能被转换为数字
- 能被转换为布尔值（都是 true）
- 可以被转换成字符串 "Symbol(cool)"

### 假值列表

- undefined
- null
- false
- +0, -0, NaN
- ""

### NAN 以及 typeof NAN

NaN 指的是 Not a Number，表示非数字，typeof NaN = 'number'

##  js中`==`和`===`区别

### 简单概要

简单来说： == 代表相同， ===代表严格相同, 为啥这么说呢， 

这么理解： 当进行双等号比较时候： 先检查两个操作数数据类型，如果相同， 则进行\=\==比较， 如果不同， 则愿意为你进行一次类型转换， 转换成相同类型后再进行比较， 而\=\==比较时， 如果类型不同，直接就是false.

操作数1 == 操作数2， 操作数1 === 操作数2

比较过程：

> 双等号==： 

```js
　　（1）如果两个值类型相同，再进行三个等号(===)的比较

　　（2）如果两个值类型不同，也有可能相等，需根据以下规则进行类型转换在比较：

　　　　a）如果一个是null，一个是undefined，那么相等

　　　　b）如果一个是字符串，一个是数值，把字符串转换成数值之后再进行比较
```

> 三等号===:

```js
　　（1）如果类型不同，就一定不相等

　　（2）如果两个都是数值，并且是同一个值，那么相等；如果其中至少一个是NaN，那么不相等。（判断一个值是否是NaN，只能使用isNaN( ) 来判断）

　　（3）如果两个都是字符串，每个位置的字符都一样，那么相等，否则不相等。

　　（4）如果两个值都是true，或是false，那么相等

　　（5）如果两个值都引用同一个对象或是函数，那么相等，否则不相等

　　（6）如果两个值都是null，或是undefined，那么相等.
```

# 判断数据类型

本文将通过下方知识点，来讲解判断 JavaScript 数据类型的 4 种方法：

- `typeof()`
- `instanceof()`
- `constructor`
- `Object.prototype.toString.call()`

不管是面试中，亦或在工作上，会出现这么个场景：

- **如何判断某个 JavaScript 字段的数据类型？**

当然，它还可能是某个知识点的附赠品，例如：

- **当你进行深拷贝数据的时候，你是如何判断这个字段是什么类型的？你知道判断数据类型有几种方式么？它们优缺点在哪？**

那么，本文来讲解下，判断 JavaScript 数据类型的四种方法！

### 三 typeof

```js
/**
 * @name typeof示例
 * @description 通过 typeof 检测各个数据类型的返回
 */
const test = {
  testUndefined: undefined,
  testNull: null,
  testBoolean: true,
  testNumber: 123,
  testBigInt: BigInt(1234), // 大于 2 的 53 次方算 BigInt
  testString: '123',
  testSymbol: Symbol(),
  testFunction: function() {
    console.log('function');
  },
  testObject: {
    obj: 'yes',
  },
  testObjectString: new String('String'),
  testObjectNumber: new Number(123),
}

console.log(typeof(test.testUndefined)); // undefined
console.log(typeof(test.testNull));      // object
console.log(typeof(test.testBoolean));   // boolean
console.log(typeof(test.testNumber));    // number
console.log(typeof(test.testBigInt));    // bigint
console.log(typeof(test.testString));    // string
console.log(typeof(test.testSymbol));    // symbol
console.log(typeof(test.testFunction));  // function
console.log(typeof(test.testObject));    // object
console.log(typeof(test.testObjectString));    // object
console.log(typeof(test.testObjectNumber));    // object
```

如上，可以看出，通过 `typeof`，我们可以判断大多数的类型，但是，它存在缺陷：

1. 判断 `typeof null`，会得到 `object`；
2. 判断构造函数 `typeof new String('String')` 或者 `typeof new Number(123)` 等……，也会得到 `object`。

即通过 `typeof` 进行数据类型判断会有一定的问题。



### 四 instanceof

```js
/**
 * @name instanceof示例1
 * @description 检测字符串类型
 */
const simpleString = '这是简单的 String';
const newString = new String('这是 New 出来的 String');

console.log(simpleString instanceof String); // false，检查原型链会返回 undefined
console.log(newString instanceof String); // true

/**
 * @name instanceof示例2
 * @description 检测数字类型
 */
const simpleNumber = 123;
const newNumber = new Number(123);

console.log(simpleNumber instanceof Number); // false
console.log(newNumber instanceof Number); // true

/**
 * @name instanceof示例3
 * @description 检测对象类型
 */
const simpleOjbect = {};
const newObject = new Object();

console.log(simpleOjbect instanceof Object); // true
console.log(newObject instanceof Object); // true
```

如上，`instanceof` 可能表现的差强人意，虽然它是可以检测数据类型，但是对于 `'' instanceof String` 以及 `123 instanceof Number` 等会返回 `false`，不太满足我们需求。

其实 `instanceof` 主要用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上，这块知识点到时候我们可以进一步进行学习探索。（一件值得期待的事）



### 五 constructor

```js
/**
 * @name constructor示例
 * @description constructor 检测对象类型
 */
const arr = [];
console.log(arr.constructor === Array); // true

const obj = {};
console.log(obj.constructor === Object); // true

const num = 1;
console.log(num.constructor === Number); // true

const str = '1';
console.log(str.constructor === String); // true

const bool = true;
console.log(bool.constructor === Boolean); // true

const nul = null;
// console.log(nul.constructor); // 报错：Uncaught TypeError: Cannot read property 'constructor' of null at <anonymous>:1:5

const undefin = undefined;
// console.log(undefin.constructor); // 报错：Uncaught TypeError: Cannot read property 'constructor' of null at <anonymous>:1:5
```

`constructor` 和前面的 `typeof`、`instanceof` 不同，`typeof` 和 `instanceof` 是属于 **表达式和运算符** 分类下的，而 `constructor` 是直接关系到内置对象 `Object` 下。

当然，这里我们讲的是校验数据类型，通过 `[].constructor === Array` 或者 `(1).constructor === Number` 会返回 `true`，符合我们的预期。

但是很遗憾的表示，当你使用 `null.constructor` 或者 `undefined.constructor` 它会毫不留情的给你报：`Uncaught TypeError: Cannot read property 'constructor' of null at <anonymous>:1:5`，所以我们也不能强行使用 `constructor` 来做深拷贝时候的判断数据类型。

### 六Object.toString.call()

Object.prototype.toString.call()

```js
/**
 * @name toString示例
 * @description toString 检测对象类型
 */
const toString = Object.prototype.toString;

console.log(toString.call(new Date));     // [object Date]
console.log(toString.call(new String));   // [object String]
console.log(toString.call(Math));         // [object Math]
console.log(toString.call('feHuang'));    // [object String]
console.log(toString.call(123));          // [object Number]
console.log(toString.call([]));           // [object Array]
console.log(toString.call({}));           // [object Object]
console.log(toString.call(undefined));    // [object Undefined]
console.log(toString.call(null));         // [object Null]
```

在前面三种心有余而力不足的情况下，`Object.prototype.toString.call()` 就显得稳定而实用了。

如果你看过 jQuery 源码，你会发现它的数据类型检测也是通过这个实现的（`jQuery.type(obj)`）。

在检测数据类型方面，你不管检测 `Object.prototype.toString.call('aaa')`、`Object.prototype.toString.call(null)` 亦或者 `Object.prototype.toString.call(undefined)` 都能得到你要的类型格式：`[object String]`、`[object Null]`、`[object Undefined]`。



### 七 总结

如上，通过对比，我们得出结论，在进行 JavaScript 数据类型判断的时候，推荐使用：

- `Object.prototype.toString.call()`

当然，写到这里，虽然我们的文章看起来可能简洁短小点，但是感觉讲出了这四种方法在判断数据类型上的优缺点。

- `apply()`
- `bind()`
- `call()`
- `apply()、bind() 以及 call() 的区别`

  

# Object.prototype.toString方法的原理

在JavaScript中，想要判断某个对象值属于哪种内置类型，最靠谱的做法就是通过Object.prototype.toString方法.

```js
var arr = [];
console.log(Object.prototype.toString.call(arr))  //"[object Array]"
```

本文要讲的就是，toString方法是如何做到这一点的，原理是什么.

### ECMAScript 3

在[ES3](http://bclary.com/2004/11/07/)中，Object.prototype.toString方法的规范如下:

> - 15.2.4.2 Object.prototype.toString()
>
>   在**`toString`**方法被调用时，会执行下面的操作步骤:1. 获取this对象的[[Class]]属性的值.2. 计算出三个字符串**`"[object "，`** 第一步的操作结果Result(1)， 以及 **`"]"`**`连接后的新字符串.`3. 返回第二步的操作结果Result(2).

[[Class]]是一个内部属性，所有的对象(原生对象和宿主对象)都拥有该属性.在规范中，[[Class]]是这么定义的

| 内部属性  | 描述                             |
| --------- | -------------------------------- |
| [[Class]] | 一个字符串值,表明了该对象的类型. |

然后给了一段解释:

> 所有内置对象的[[Class]]属性的值是由本规范定义的.所有宿主对象的[[Class]]属性的值可以是任意值，甚至可以是内置对象使用过的[[Class]]属性的值.[[Class]]属性的值可以用来判断一个原生对象属于哪种内置类型.需要注意的是，除了通过**`Object.prototype.toString`**方法之外，本规范没有提供任何其他方式来让程序访问该属性的值(查看 15.2.4.2).

也就是说，把Object.prototype.toString方法返回的字符串，去掉前面固定的**`"[object "`**和后面固定的**"]"，**就是内部属性[[class]]的值，也就达到了判断对象类型的目的.jQuery中的工具方法$.type()，就是干这个的.

在ES3中，规范文档并没有总结出[[class]]内部属性一共有几种，不过我们可以自己统计一下，原生对象的[[class]]内部属性的值一共有10种.分别是:`"Array"`， `"Boolean"`， `"Date"`， `"Error"`， `"Function"`， `"Math"`， `"Number"`， `"Object"`， `"RegExp"`， `"String".`

### ECMAScript 5

在[ES5.1](http://ecma-international.org/ecma-262/5.1)中，除了规范写的更详细一些以外，Object.prototype.toString方法和[[class]]内部属性的定义上也有一些变化，Object.prototype.toString方法的规范如下:

> ##### 15.2.4.2 Object.prototype.toString ( )
>
> 在**`toString`**方法被调用时，会执行下面的操作步骤:
>
> 1. 如果**this**的值为**undefined**，则返回`"[object Undefined]"`.
> 2. 如果**this**的值为**null**，则返回`"[object Null]"`.
> 3. 让*O*成为调用ToObject(**this)**的结果.
> 4. 让*class*成为*O*的内部属性[[Class]]的值.
> 5. 返回三个字符串**`"[object "，`** *class*， 以及 **`"]"`**`连接后的新字符串```.

可以看出，比ES3多了1，2，3步.第1，2步属于新规则，比较特殊，因为"`Undefined"`和"`Null"`并不属于[[class]]属性的值，需要注意的是，这里和严格模式无关(大部分函数在严格模式下，this的值才会保持undefined或null，非严格模式下会自动成为全局对象).第3步并不算是新规则，因为在ES3的引擎中，也都会在这一步将三种原始值类型转换成对应的包装对象，只是规范中没写出来.ES5中，[[Class]]属性的解释更加详细:

> 所有内置对象的[[Class]]属性的值是由本规范定义的.所有宿主对象的[[Class]]属性的值可以是除了"Arguments"， "Array"， "Boolean"， "Date"， "Error"， "Function"， "JSON"， "Math"， "Number"， "Object"， "RegExp"， "String"之外的的任何字符串.[[Class]]内部属性是引擎内部用来判断一个对象属于哪种类型的值的.需要注意的是，除了通过**`Object.prototype.toString`**方法之外，本规范没有提供任何其他方式来让程序访问该属性的值(查看 15.2.4.2).

和ES3对比一下，第一个差别就是[[class]]内部属性的值多了两种，成了12种，一种是arguments对象的[[class]]成了"Arguments"，而不是以前的"Object"，还有就是多个了全局对象JSON，它的[[class]]值为"JSON".第二个差别就是，宿主对象的[[class]]内部属性的值，不能和这12种值冲突，不过在支持ES3的浏览器中，貌似也没有发现哪些宿主对象故意使用那10个值.

### ECMAScript 6

[ES6](http://people.mozilla.org/~jorendorff/es6-draft.html)目前还只是工作草案，但能够肯定的是，**[[class]]内部属性没有了**，取而代之的是另外一个内部属性[[NativeBrand]].[[NativeBrand]]属性是这么定义的:

> | 内部属性        | 属性值                     | 描述                                                         |
> | --------------- | -------------------------- | ------------------------------------------------------------ |
> | [[NativeBrand]] | 枚举NativeBrand的一个成员. | 该属性的值对应一个标志值(tag value),可以用来区分原生对象的类型. |

 [[NativeBrand]]属性的解释:

> [[NativeBrand]]内部属性用来识别某个原生对象是否为符合本规范的某一种特定类型的对象.[[NativeBrand]]内部属性的值为下面这些枚举类型的值中的一个:NativeFunction， NativeArray， StringWrapper， BooleanWrapper， NumberWrapper， NativeMath， NativeDate， NativeRegExp， NativeError， NativeJSON， NativeArguments， NativePrivateName.[[NativeBrand]]内部属性仅用来区分区分特定类型的ECMAScript原生对象.只有在表10中明确指出的对象类型才有[[NativeBrand]]内部属性.
>
> 表10 — [[NativeBrand]]内部属性的值
>
> | 属性值            | 对应类型             |
> | ----------------- | -------------------- |
> | NativeFunction    | Function objects     |
> | NativeArray       | Array objects        |
> | StringWrapper     | String objects       |
> | BooleanWrapper    | Boolean objects      |
> | NumberWrapper     | Number objects       |
> | NativeMath        | The Math object      |
> | NativeDate        | Date objects         |
> | NativeRegExp      | RegExp objects       |
> | NativeError       | Error objects        |
> | NativeJSON        | The JSON object      |
> | NativeArguments   | Arguments objects    |
> | NativePrivateName | Private Name objects |

可见，和[[class]]不同的是，并不是每个对象都拥有[[NativeBrand]].同时，Object.prototype.toString方法的规范也改成了下面这样:

> ##### 15.2.4.2 Object.prototype.toString ( )
>
> 在**`toString`**方法被调用时，会执行下面的操作步骤:
>
> 1. 如果**this**的值为**undefined**，则返回`"[object Undefined]"`.
> 2. ``如果**this**的值为**null**，则返回`"[object Null]"`.
> 3. 让*O*成为调用ToObject(**this)**的结果.
> 4. 如果*O*有[[NativeBrand]]内部属性，让*tag*成为表29中对应的值.
> 5. 否则
>    1. 让*hasTag*成为调用*O*的[[HasProperty]]内部方法后的结果，参数为@@toStringTag.
>    2. 如果*hasTag*为**false**，则让*tag*为`"Object"`.
>    3. 否则，
>       1. 让*tag*成为调用*O*的[[Get]]内部方法后的结果，参数为@@toStringTag.
>       2. 如果*tag*是一个abrupt completion，则让*tag*成为NormalCompletion(`"???"`).
>       3. 让*tag*成为*tag*.[[value]].
>       4. 如果Type(*tag*)不是字符串，则让*tag成为*`"???"`.
>       5. 如果*tag*的值为`"Arguments"`， `"Array"`， `"Boolean"`， `"Date"`， `"Error"`， `"Function"`， `"JSON"`， `"Math"`， `"Number"`， `"Object"`， `"RegExp"`，`或者"String"中的任一个，则让`*tag*成为字符串`"~"和`*tag*当前的值连接后的结果.
> 6. 返回三个字符串"[object "， tag， and "]"`连接后的新字符串```.
>
> 表29 — [[NativeBrand]] 标志值
>
> | [[NativeBrand]]值 | 标志值        |
> | ----------------- | ------------- |
> | NativeFunction    | `"Function"`  |
> | NativeArray       | `"Array"`     |
> | StringWrapper     | `"String"`    |
> | BooleanWrapper    | `"Boolean"`   |
> | NumberWrapper     | `"Number"`    |
> | NativeMath        | `"Math"`      |
> | NativeDate        | `"Date"`      |
> | NativeRegExp      | `"RegExp"`    |
> | NativeError       | `"Error"`     |
> | NativeJSON        | `"JSON"`      |
> | NativeArguments   | `"Arguments"` |
>
>  

可以看到，在规范上有了很大的变化，不过对于普通用户来说，貌似感觉不到.

也许你发现了，ES6里的新类型Map，Set等，都没有在表29中.它们在执行toString方法的时候返回的是什么?

```
console.log(Object.prototype.toString.call(Map()))   //"[object Map]"

console.log(Object.prototype.toString.call(Set()))   //"[object Set]"
```

其中的字符串"Map"是怎么来的呢:

> **15.14.5.13** Map.prototype.@@toStringTag
>
> @@toStringTag 属性的初始值为字符串**"Map"**.

由于ES6的规范还在制定中，各种相关规定都有可能改变，所以如果想了解更多细节.看看下面这两个链接，现在只需要知道的是:[[class]]没了，使用了更复杂的机制.

http://stackoverflow.com/questions/13151643/access-nativebrand-class-in-es6-ecmascript-6

https://mail.mozilla.org/pipermail/es-discuss/2012-June/023676.html