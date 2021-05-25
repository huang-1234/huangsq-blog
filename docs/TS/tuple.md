## 元组

> 元组的基本应用

我们先来看一个数组和这个数组注解的缺点，比如我们有一个小姐姐数组，数组中有姓名、职业和年龄，代码如下：

```js
const xiaojiejie = ["dajiao", "teacher", 28];
```

这时候把鼠标放到`xiaojiejie`变量上面，可以看出推断出来的类型。我们就用类型注解的形式给他作一个注解，代码如下：

```js
const xiaojiejie: (string | number)[] = ["dajiao", "teacher", 28];
```

这时候你已经增加了代码注解，但是这并不能很好的限制，比如我们把代码改成下面的样子，`TypeScript`依然不会报错。

```js
const xiaojiejie: (string | number)[] = ["dajiao", 28, "teacher"];
```

我们只是简单的把数组中的位置调换了一下，但是`TypeScript`并不能发现问题，这时候我们需要一个更强大的类型，来解决这个问题，这就是元组。

元组和数组类似，但是类型注解时会不一样。

```js
const xiaojiejie: [string, string, number] = ["dajiao", "teacher", 28];
```

这时候我们就把数组中的每个元素类型的位置给固定住了，这就叫做元组。

> 元组的使用

目前我的工作中不经常使用元组，因为如果要使用元组，完全可以使用对象的形式来代替，但是如果你维护老系统，你会发现有一种数据源时`CSV`,这种文件提供的就是用逗号隔开的，如果要严谨的编程就需要用到元组了。例如我们有这样一组由`CSV`提供的（注意这里只是模拟数据）。

```js
"dajiao", "teacher", 28;
"liuying", "teacher", 18;
"cuihua", "teacher", 25;
```

如果数据源得到的数据时这样的，你就可以使用元组了。

```js
const xiaojiejies: [string, string, number][] = [
  ["dajiao", "teacher", 28],
  ["liuying", "teacher", 18],
  ["cuihua", "teacher", 25],
];
```