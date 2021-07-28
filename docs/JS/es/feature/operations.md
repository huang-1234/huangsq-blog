# 运算符

`>>`运算符和`>>>`运算符

今天在看`lodash`的源码中[slice](https://link.zhihu.com/?target=https%3A//github.com/lodash/lodash/blob/master/slice.js)这个函数实现的时候发现了里面有这么一行代码

```js
length = start > end ? 0 : (end - start) >>> 0;
start >>>= 0;
```

当时就很疑惑，知道 `>>`是移位，那`>>>`又是什么鬼，还有移位`0`位又有什么意义呢，带着强烈的好奇心，我就去探究了一下 `>>> 0`它到底暗藏什么玄机。

- `>>` 和 `>>>`有什么不一样
  查了[MDN](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators%23Unsigned_right_shift)原来`>>>`是无符号右移，`>>`是有符号移位，
  `>>有符号移位`：该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，拷贝最左侧的位以填充左侧

```js
-9 >> 2;
11111111111111111111111111110111;
// -9 -> 11111111111111111111111111111101   // -3
```

`>>>无符号移位`：该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，左侧用 0 填充。因为符号位变成了 0，所以结果总是非负的。（**即便右移 0 个比特，结果也是非负的。**）

```js
9 >>> 2;
00000000000000000000000000001001;
// 9 ->  00000000000000000000000000000010 // 2
```

根据文档说明即使移动 0 位也可以将一个负数变成正数，甚至也可以将一个小数变成整数，将未定义的值转换为 0，那到底移动 0 位是什么意思。

- 移位 0 有什么意义
  > 查过一些资料，其中`stackoverflow`里面有一个[高票回答](https://link.zhihu.com/?target=https%3A//stackoverflow.com/questions/1822350/what-is-the-javascript-operator-and-how-do-you-use-it)，里面有这么一句话
  > It doesn't just convert non-Numbers to Number, it converts them to Numbers that can be expressed as 32-bit unsigned ints.
  > 原来移位操作符在移位前做了两种转换，第一将不是`number`类型的数据转换为`number`，第二将`number`转换为无符号的`32bit`数据，也就是`Uint32`类型。
  这些与移位的位数无关，移位 0 位主要就是用了 js 的内部特性做了前两种转换。
- `Uint32`类型是如何转换的
  1 . 如果不能转换为`Number`，那就为`0`
  2 . 如果为非整数，先转换为整数，参考公式`sign(n) ⋅ floor(abs(n))`

```js
function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}
```

3 . 如果是正数，返回正数，如果是负数，返回负数 + 2 的 32 次方

```js
function modulo(a, b) {
  return a - Math.floor(a / b) * b;
}
function ToUint32(x) {
  return modulo(ToInteger(x), Math.pow(2, 32));
}
```

- 总结
  `x >>> 0`本质上就是保证 x 有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为 0。一个小小的表达式，隐藏着着多重的异常处理。`js`真是诡异啊。
