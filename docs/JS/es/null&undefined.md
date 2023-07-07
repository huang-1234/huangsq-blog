# undefined 与 null 的区别

大多数计算机语言，有且仅有一个表示"无"的值，比如，C 语言的 NULL，Java 语言的 null，Python 语言的 None，Ruby 语言的 nil。

有点奇怪的是，JavaScript 语言居然有`两个`表示"无"的值：undefined 和 null。这是为什么？

## 一、相似性

在 JavaScript 中，将一个变量赋值为 undefined 或 null，老实说，几乎没区别。

```javascript
var a = undefined;

var a = null;
```

上面代码中，a 变量分别被赋值为 undefined 和 null，这两种写法几乎等价。

undefined 和 null 在 if 语句中，都会被自动转为 false，相等运算符甚至直接报告两者相等。

```javascript
if (!undefined) console.log("undefined is false");
// undefined is false

if (!null) console.log("null is false");
// null is false

undefined == null;
// true
```

上面代码说明，两者的行为是何等相似！

既然 undefined 和 null 的含义与用法都差不多，为什么要同时设置两个这样的值，这不是无端增加 JavaScript 的复杂度，令初学者困扰吗？Google 公司开发的 JavaScript 语言的替代品 Dart 语言，就明确规定只有 null，没有 undefined！

## 二、历史原因

最近，我在读新书[《Speaking JavaScript》](http://speakingjs.com/)时，意外发现了这个问题的答案！

原来，这与 JavaScript 的历史有关。1995 年 JavaScript 诞生时，最初像 Java 一样，只设置了 null 作为表示"无"的值。

根据 C 语言的传统，null 被设计成可以自动转为 0。

```javascript
Number(null);
// 0

5 + null;
// 5
```

但是，JavaScript 的设计者 Brendan Eich，觉得这样做还不够，有两个原因。

首先，null 像在 Java 里一样，被当成一个对象。但是，JavaScript 的数据类型分成原始类型(primitive)和合成类型(complex)两大类，Brendan Eich 觉得表示"无"的值最好不是对象。

其次，JavaScript 的最初版本没有包括错误处理机制，发生数据类型不匹配时，往往是自动转换类型或者默默地失败。Brendan Eich 觉得，如果 null 自动转为 0，很不容易发现错误。

因此，Brendan Eich 又设计了一个 undefined。

## 三、最初设计

JavaScript 的最初版本是这样区分的：`null 是一个表示"无"的对象，转为数值时为 0；undefined 是一个表示"无"的原始值，转为数值时为 NaN。`

```javascript
Number(undefined);
// NaN

5 + undefined;
// NaN
```

## 四、目前的用法

但是，上面这样的区分，在实践中很快就被证明不可行。目前，null 和 undefined 基本是同义的，只有一些细微的差别。

`null 表示"没有对象"，即该处不应该有值。`典型用法是：

(1) 作为函数的参数，表示该函数的参数不是对象。

(2) 作为对象原型链的终点。

```javascript
Object.getPrototypeOf(Object.prototype);
// null
```

`undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。`典型用法是：

(1)变量被声明了，但没有赋值时，就等于 undefined。

(2) 调用函数时，应该提供的参数没有提供，该参数等于 undefined。

(3)对象没有赋值的属性，该属性的值为 undefined。

(4)函数没有返回值时，默认返回 undefined。

```javascript
var i;
i; // undefined

function f(x) {
  console.log(x);
}
f(); // undefined

var o = new Object();
o.p; // undefined

var x = f();
x; // undefined
```

## typeof 原理探索

javascript 中的 `null`：既是对象，又不是对象，史称「薛定谔的对象」。

```
typeof null === 'object';
null instanceof Object === false
```

而

```
null instanceof null
```

会抛出异常：

```
Uncaught TypeError: Right-hand side of 'instanceof' is not an object
```

这是一个历史遗留下来的 feature(or bug?)，[The history of “typeof null”](http://2ality.com/2013/10/typeof-null.html)

在 javascript 的最初版本中，使用的 32 位系统，为了性能考虑使用低位存储了变量的类型信息：

- `000：对象`
- 1：整数
- 010：浮点数
- 100：字符串
- 110：布尔

有 2 个值比较特殊：

- undefined：用 - （−2^30）表示。
- null：对应机器码的 NULL 指针，一般是全零。

在第一版的 javascript 实现中，判断类型的代码是这么写的：

```
if (JSVAL_IS_VOID(v)) {  // (1)
    type = JSTYPE_VOID;
} else if (JSVAL_IS_OBJECT(v)) {  // (2)
    obj = JSVAL_TO_OBJECT(v);
    if (obj &&
        (ops = obj->map->ops,
            ops == &js_ObjectOps
            ? (clasp = OBJ_GET_CLASS(cx, obj),
            clasp->call || clasp == &js_FunctionClass) // (3,4)
            : ops->call != 0)) {  // (3)
        type = JSTYPE_FUNCTION;
    } else {
        type = JSTYPE_OBJECT;
    }
} else if (JSVAL_IS_NUMBER(v)) {
    type = JSTYPE_NUMBER;
} else if (JSVAL_IS_STRING(v)) {
    type = JSTYPE_STRING;
} else if (JSVAL_IS_BOOLEAN(v)) {
    type = JSTYPE_BOOLEAN;
}
```

（1）：判断是否为 undefined
（2）：如果不是 undefined，判断是否为对象
（3）：如果不是对象，判断是否为数字
（4）：。。。

这样一来，`null` 就出了一个 bug。根据 type tags 信息，低位是 `000`，因此 `null` 被判断成了一个对象。这就是为什么 `typeof null` 的返回值是 `object`。

关于 `null` 的类型在 MDN 文档中也有简单的描述：[typeof - javascript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#null)

在 ES6 中曾有关于修复此 bug 的提议，提议中称应该让 `typeof null === 'null'` [http://wiki.ecmascript.org/do...](http://wiki.ecmascript.org/doku.php?id=harmony):typeof_null 但是该提议被无情的否决了，自此 `typeof null` 终于不再是一个 bug，而是一个 feature，并且永远不会被修复。

------

这是 JavaScript 最初实现的一个 bug，目前的 JavaScript 引擎已经不这么去实现了，但是这个 bug 却一直流传了下来。

至于对象的内部表示，不同的 JavaScript 引擎实现起来都是不一样的，单说说 V8 吧。

[v8引擎是如何知道js数据类型的？](https://www.zhihu.com/question/62732293/answer/201723301) （原文太长我就不贴过来了）

## void 0 代替 undefined

首先我们来看看underscore 源码没有出现 undefined（注意，其实有出现一处，是为 "undefined"，而不是 undefined），而用 void 0 代替之。为什么要这么做？我们可以从两部分解读，其一是 undefined 哪里不好了，你非得找个替代品？其二就是替代品为毛要找 void 0？

我们先看第一点，答案很简单，undefined 并不是保留词（reserved word），它只是全局对象的一个属性，在低版本 IE 中能被重写。

```
var undefined = 10;

// undefined -- chrome
// 10 -- IE 8
alert(undefined);
```

事实上，undefined 在 ES5 中已经是全局对象的一个只读（read-only）属性了，它不能被重写。但是在局部作用域中，还是可以被重写的。

```
(function() {
  var undefined = 10;

  // 10 -- chrome
  alert(undefined);
})();

(function() {
  undefined = 10;

  // undefined -- chrome
  alert(undefined);
})();
```

接下来思考第二个问题，为毛找的替代品是 void 0？

我们来看看 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void) 的解释：

> The void operator evaluates the given expression and then returns undefined.

意思是说 void 运算符能对给定的表达式进行求值，然后返回 undefined。也就是说，void 后面你随便跟上一个表达式，返回的都是 undefined，都能完美代替 undefined！那么，这其中最短的是什么呢？毫无疑问就是 void 0 了。其实用 void 1，void (1+1)，void (0) 或者 void "hello"，void (new Date()) 等等，都是一样的效果。更重要的前提是，void 是不能被重写的（cannot be overidden）。

那么，ES5 大环境下，void 0 就没有用武之地了吗？答案是否定的，用 void 0 代替 undefined 能节省不少字节的大小，事实上，不少 JavaScript 压缩工具在压缩过程中，正是将 undefined 用 void 0 代替掉了。