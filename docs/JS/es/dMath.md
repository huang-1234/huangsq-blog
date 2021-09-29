# 4. Math

Math 是一个内置对象，它拥有一些数学常数属性和数学函数方法。Math 不是一个函数对象。

Math 用于 Number 类型。它不支持 BigInt。

> 描述

与其他全局对象不同的是，Math 不是一个构造器。Math 的所有属性与方法都是静态的。引用圆周率的写法是 Math.PI，调用正余弦函数的写法是 Math.sin(x) ，x 是要传入的参数。Math 的常量是使用 JavaScript 中的全精度浮点数来定义的。

## 属性

Math.E

欧拉常数，也是自然对数的底数，约等于 2.718。

Math.LN2

2 的自然对数，约等于 0.693。

Math.LN10

10 的自然对数，约等于 2.303。

Math.LOG2E

以 2 为底的 E 的对数，约等于 1.443。

Math.LOG10E

以 10 为底的 E 的对数，约等于 0.434。

Math.PI

圆周率，一个圆的周长和直径之比，约等于 3.14159。

Math.SQRT1_2

二分之一 ½ 的平方根，同时也是 2 的平方根的倒数 12，约等于 0.707。

Math.SQRT2

2 的平方根，约等于 1.414。

## 方法

需要注意的是，三角函数 sin() 、cos() 、tan() 、asin() 、acos() 、atan() 和 atan2() 返回的值是弧度而非角度。

要转换，弧度除以(Math.PI / 180) 即可转换为角度，同理，角度乘以这个数则能转换为弧度。

需要注意的是，很多 Math 函数都有一个精度，而且这个精度在不同实现中也是不相同的。这意味着不同的浏览器会给出不同的结果，甚至，在不同的系统或架构下，相同的 JS 引擎也会给出不同的结果！



Math.abs(x)

返回一个数的绝对值。

Math.acos(x)

返回一个数的反余弦值。

Math.acosh(x)

返回一个数的反双曲余弦值。

Math.asin(x)

返回一个数的反正弦值。

Math.asinh(x)

返回一个数的反双曲正弦值。

Math.atan(x)

返回一个数的反正切值。

Math.atanh(x)

返回一个数的反双曲正切值。

Math.atan2(y, x)

返回 y / x 的反正切值。

Math.cbrt(x)

返回一个数的立方根。

Math.ceil(x)

返回大于一个数的最小整数，即一个数向上取整后的值。

Math.clz32(x)

返回一个 32 位整数的前导零的数量。

Math.cos(x)

返回一个数的余弦值。

Math.cosh(x)

返回一个数的双曲余弦值。

Math.exp(x)

返回欧拉常数的参数次方，Ex，其中 x 为参数，E 是欧拉常数（2.718...，自然对数的底数）。

Math.expm1(x)

返回 exp(x) - 1 的值。

Math.floor(x)

返回小于一个数的最大整数，即一个数向下取整后的值。

Math.fround(x)

返回最接近一个数的单精度浮点型表示。

Math.hypot([x[, y[, …]]])

返回其所有参数平方和的平方根。

Math.imul(x, y)

返回 32 位整数乘法的结果。

Math.log(x)

返回一个数的自然对数（㏒e，即 ㏑）。

Math.log1p(x)

返回一个数加 1 的和的自然对数（㏒e，即 ㏑）。

Math.log10(x)

返回一个数以 10 为底数的对数。

Math.log2(x)

返回一个数以 2 为底数的对数。

Math.max([x[, y[, …]]])

返回零到多个数值中最大值。

Math.min([x[, y[, …]]])

返回零到多个数值中最小值。

Math.pow(x, y)

返回一个数的 y 次幂。

Math.random()

返回一个 0 到 1 之间的伪随机数。

Math.round(x)

返回四舍五入后的整数。

Math.sign(x)

返回一个数的符号，得知一个数是正数、负数还是 0。

Math.sin(x)

返回一个数的正弦值。

Math.sinh(x)

返回一个数的双曲正弦值。

Math.sqrt(x)

返回一个数的平方根。

Math.tan(x)

返回一个数的正切值。

Math.tanh(x)

返回一个数的双曲正切值。

Math.toSource()

返回字符串 "Math"。

Math.trunc(x)

返回一个数的整数部分，直接去除其小数点及之后的部分。

## Math.random()

**Math.random()** 函数返回一个浮点数,  伪随机数在范围从**0到**小于**1**，也就是说，从0（包括0）往上，但是不包括1（排除1），然后您可以缩放到所需的范围。实现将初始种子选择到随机数生成算法;它不能被用户选择或重置。

请注意, 由于 JavaScript 中的数字是 IEEE 754 浮点数字，具有最近舍入（ round-to-nearest-even）的行为, 因此以下函数的范围 (不包括`Math.random()` 本身) 并不准确。如果选择了非常大的边界 (253 或更高), 在极罕见的情况下会计算通常-排除（usually-excluded）的上界。（注：round-to-nearest-even采用最近舍入的去偶数舍入的方式，对.5的舍入上，采用取偶数的方式）

### 0<=getNum<1

```js
function getRandom() {
  return Math.random();
}
```

### a<=getNum<b

这个例子返回了一个在指定值之间的随机数。这个值不小于 `min`（有可能等于），并且小于（不等于）`max`。

```js
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
```

### a<=intGetNum<b

这个例子返回了一个在指定值之间的随机整数。这个值不小于 `min` （如果 `min` 不是整数，则不小于 `min` 的向上取整数），且小于（不等于）`max`。

```js
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
```

也许很容易想到用 `Math.round()` 来实现，但是这会导致你的随机数处于一个不均匀的分布，这可能不符合你的需求。

### a<=intGetNum<=b

上一个例子提到的函数 `getRandomInt()` 结果范围包含了最小值，但不含最大值。如果你的随机结果需要同时包含最小值和最大值，怎么办呢? `getRandomIntInclusive()` 函数可以实现。

```js
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}
```

## javascript取整方法floor、round、ceil

**floor向下取整:**

```js
Math.floor(0.20); // 0
Math.floor(0.90); // 0
Math.floor(-0.90); // -1
Math.floor(-0.20); // -1
```

**round四舍五入**

```js
Math.round(0.2) // 0
Math.round(0.9) // 1
Math.round(-0.9) // -1
Math.round(-0.2) // 0
```

**ceil向上取整**

```js
Math.ceil(0.2) // 1
Math.ceil(0.9) // 1
Math.ceil(-0.9) // 0
Math.ceil(-0.2) // 0
```

## Math.max()

`Math.max()` 函数返回一组数中的最大值。

> 返回值

返回给定的一组数字中的最大值。如果给定的参数中至少有一个参数无法被转换成数字，则会返回 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)。

