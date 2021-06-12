# 4. Array

##  数组方法返回值是否改变原数组

js数组对象自带的方法有如下这些，除了`toSource()`这个方法比较少见以外其他的方法都比较常用到，另外还有常用的遍历数组的6个高阶函数`forEach,filter,map,some,every,reduce`。

| 方法               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| concat()           | 连接两个或更多的数组，并返回结果。 `数组Array`               |
| join()             | 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。`字符串String` |
| `pop()`            | 删除并返回数组的最后一个元素。 `元素item`                    |
| `push()`           | 向数组的末尾添加一个或更多元素，并返回新的长度。 `属性length` |
| `reverse()`        | 颠倒数组中元素的顺序。 `数组Array`                           |
| `shift()`          | 删除并返回数组的第一个元素。  `元素item`                     |
| slice()            | 从某个已有的数组返回选定的元素。 `元素item`                  |
| `sort()`           | 对数组的元素进行排序。 `数组Array`                           |
| `splice()`         | 删除元素，并向数组添加新元素,返回被替换的元素。`元素item`    |
| `toSource()`       | 返回该对象的源代码。                                         |
| `toString()`       | 把数组转换为字符串，并返回结果。`字符串String`               |
| `toLocaleString()` | 把数组转换为本地数组，并返回结果。`数组Array`                |
| `unshift()`        | 向数组的开头添加一个或更多元素，并返回新的长度。 `属性length` |
| `valueOf()`        | 返回数组对象的原始值。`对象Object`                           |
| `forEach()`        | 方法用于调用数组的每个元素，并将元素传递给回调函数。(没有返回值，将数组遍历) |
| `filter()`         | 创建一个新的数组，<font color=red>新数组中的元素是通过检查指定数组中符合条件的所有元素,返回新数组</font>。`数组Array` |
| map()              | 返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。`数组Array` |
| some()             | 判断是否含有符合条件的元素，返回布尔值如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。如果没有满足条件的元素，则返回false。`布尔值Boolen` |
| every()            | 判断是否全部元素符合条件，返回布尔值。`布尔值Boolen`         |
| reduce()           | 接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。 |

## 从返回值的角度

我们将这些方法分有返回值(上述描述中红色字体返回值的类型)的和没有返回值的

```js
返回值为数组的：`concat(),reverse(),sort(),toLocaleString(),map(),filter()`
返回值为字符串的：`join(),toString()`
返回值为数组元素的：`pop(),shift(),slice(),splice()`
返回值为数组长度的：`push(),unshift()`
返回值为对象的：`valueOf()`
返回值为布尔值的：`some(),every()`
```



## 从是否改变原数组的角度

可以分为改变原数组(上述方法名为红色的方法)和不改变原数组

改变原数组的方法：`pop(),push(),reverse(),shift(),sort(),splice(),unshift()`

JavaScript的 `**Array**` 对象是用于构造数组的全局对象，数组是类似于列表的高阶对象。
```js
//1. 创建数组
var fruits = ['Apple', 'Banana'];
console.log(fruits.length);		// 2

//2. 通过索引访问数组元素
var first = fruits[0];// Apple
var last = fruits[fruits.length - 1];// Banana

//3. 遍历数组

fruits.forEach(function (item, index, array) {
    console.log(item, index);
});
// Apple 0
// Banana 1

//4. 添加元素到数组的末尾
var newLength = fruits.push('Orange');// newLength:3; fruits: ["Apple", "Banana", "Orange"]

//5. 删除数组末尾的元素
var last = fruits.pop(); // remove Orange (from the end)
// last: "Orange"; fruits: ["Apple", "Banana"];

//6. 删除数组最前面（头部）的元素
var first = fruits.shift(); // remove Apple from the front
// first: "Apple"; fruits: ["Banana"];

//7. 添加元素到数组的头部
var newLength = fruits.unshift('Strawberry') // add to the front
// ["Strawberry", "Banana"];

//8. 找出某个元素在数组中的索引
fruits.push('Mango');// ["Strawberry", "Banana", "Mango"]
var pos = fruits.indexOf('Banana');// 1

//9. 通过索引删除某个元素**
var removedItem = fruits.splice(pos, 1); // this is how to remove an item
// ["Strawberry", "Mango"]

//10. 从一个索引位置删除多个元素
var vegetables = ['Cabbage', 'Turnip', 'Radish', 'Carrot'];
console.log(vegetables);// ["Cabbage", "Turnip", "Radish", "Carrot"]

var pos = 1, n = 2;
var removedItems = vegetables.splice(pos, n);// this is how to remove items, n defines the number of items to be removed,
// from that position(pos) onward to the end of array.

console.log(vegetables);// ["Cabbage", "Carrot"] (the original array is changed)

console.log(removedItems);// ["Turnip", "Radish"]

//11. 复制一个数组
var shallowCopy = fruits.slice(); // this is how to make a copy
// ["Strawberry", "Mango"]
```

> 语法

```js
[element0, element1, ..., elementN]
new Array(element0, element1[, ...[, elementN]])
new Array(arrayLength)
```

- 参数

- `elementN`

  `Array` 构造器会根据给定的元素创建一个 JavaScript 数组，但是当仅有一个参数且为数字时除外（详见下面的 `arrayLength` 参数）。注意，后面这种情况仅适用于用 `Array` 构造器创建数组，而不适用于用方括号创建的数组字面量。

- `arrayLength`

  一个范围在 0 到 232-1 之间的整数，此时将返回一个 `length` 的值等于 `arrayLength` 的数组对象（言外之意就是该数组此时并没有包含任何实际的元素，不能理所当然地认为它包含 `arrayLength` 个值为 `undefined` 的元素）。如果传入的参数不是有效值，则会抛出 [`RangeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError) 异常。

## 描述

数组是一种类列表对象，它的原型中提供了遍历和修改元素的相关操作。JavaScript 数组的长度和元素类型都是非固定的。<font color=red>因为数组的长度可随时改变，并且其数据在内存中也可以不连续</font>，所以 JavaScript 数组不一定是密集型的，这取决于它的使用方式。一般来说，数组的这些特性会给使用带来方便，但如果这些特性不适用于你的特定使用场景的话，可以考虑使用类型数组 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)。

只能用整数作为数组元素的索引，而不能用字符串。后者称为[关联数组](https://en.wikipedia.org/wiki/Associative_array)。使用非整数并通过[方括号](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#Objects_and_properties)或[点号](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors)来访问或设置数组元素时，所操作的并不是数组列表中的元素，而是数组对象的[属性集合](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#Properties)上的变量。数组对象的属性和数组元素列表是分开存储的，并且数组的遍历和修改操作也不能作用于这些命名属性。

## 访问数组元素

JavaScript 数组的索引是从0开始的，第一个元素的索引为0，最后一个元素的索引等于该数组的长度减1。如果指定的索引是一个无效值，JavaScript 数组并不会报错，而是会返回 `undefined`。

虽然数组元素可以看做是数组对象的属性，就像 `toString` 一样，但是下面的写法是错误的，运行时会抛出 `SyntaxError` 异常，而原因则是使用了非法的属性名：

```js
console.log(arr.0); // a syntax error
```

并不是 JavaScript 数组有什么特殊之处，而是因为在 JavaScript 中，以数字开头的属性不能用点号引用，必须用方括号。比如，如果一个对象有一个名为 `3d` 的属性，那么只能用方括号来引用它。下面是具体的例子：

```js
var years = [1950, 1960, 1970, 1980, 1990, 2000, 2010];
console.log(years.0);   // 语法错误
console.log(years[0]);  // √
renderer.3d.setTexture(model, 'character.png');     // 语法错误
renderer['3d'].setTexture(model, 'character.png');  // √
```

注意在 `3d` 那个例子中，引号是必须的。你也可以将数组的索引用引号引起来，比如 `years[2]` 可以写成 `years['2']`。 `years[2]` 中的 2 会被 JavaScript 解释器通过调用 `toString` 隐式转换成字符串。正因为这样，`'2'` 和 `'02'` 在 `years` 中所引用的可能是不同位置上的元素。而下面这个例子也可能会打印 `true`：

```js
console.log(years['2'] != years['02']);
```

类似地，如果对象的属性名称是保留字（最好不要这么做！），那么就只能通过字符串的形式用方括号来访问（从 firefox 40.0 a 开始也支持用点号访问了）：

```js
var promise = {'var'  : 'text','array': [1, 2, 3, 4]};
console.log(promise['var']);
```

## 遍历数组



![JS几种数组遍历方式以及性能分析对比2](cArray.assets/6e424f8bfc9fad4e4c044d38351a0f3c1603445364296)

## length 和数字下标之间的关系

JavaScript 数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性和其数字下标之间有着紧密的联系。数组内置的几个方法（例如 [`join`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)、[`slice`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)、[`indexOf`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 等）都会考虑 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 的值。另外还有一些方法（例如 [`push`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)、[`splice`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 等）还会改变 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 的值。

```js
var fruits = [];fruits.push('banana', 'apple', 'peach');
console.log(fruits.length); // 3
```

使用一个合法的下标为数组元素赋值，并且该下标超出了当前数组的大小的时候，解释器会同时修改 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 的值：

```js
fruits[5] = 'mango';
console.log(fruits[5]); // 'mango'
console.log(Object.keys(fruits));  // ['0', '1', '2', '5']
console.log(fruits.length); // 6
```

也可以显式地给 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 赋一个更大的值：

```js
fruits.length = 10;
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 10
```

而为 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 赋一个更小的值则会删掉一部分元素：

```js
fruits.length = 2;
console.log(Object.keys(fruits)); // ['0', '1']
console.log(fruits.length); // 2
```

这一节的内容在 [`Array.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 中有更详细的介绍。

## [正则匹配结果所返回的数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#正则匹配结果所返回的数组)

使用正则表达式匹配字符串可以得到一个数组。这个数组中包含本次匹配的相关信息和匹配结果。[`RegExp.exec`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)、[`String.match`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)、[`String.replace`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 都会返回这样的数组。看下面的例子和例子下面的表格：

```js
// 匹配1个 d 后面紧跟着至少1个 b，再后面又跟着1个 d 的子串，
// 并且需要记住子串中匹配到的 b 和最后的 d （通过正则表达式中的分组），
// 同时在匹配时忽略大小写
myRe = /d(b+)(d)/i;
myArray = myRe.exec("Shuiqing");
```

该正则匹配返回的数组包含以下属性和元素：

| 属性/元素     | 说明                                                         | 示例           |
| ------------- | ------------------------------------------------------------ | -------------- |
| `input`       | 只读属性，原始字符串                                         | cdbBdbsbz      |
| `index`       | 只读属性，匹配到的子串在原始字符串中的索引                   | 1              |
| `[0]`         | 只读元素，本次匹配到的子串                                   | dbBd           |
| `[1], ...[n]` | 只读元素，正则表达式中所指定的分组所匹配到的子串，其数量由正则中的分组数量决定，无最大上限 | [1]: bB [2]: d |

## 修改器方法

下面的这些方法会改变调用它们的对象自身的值：

- [`Array.prototype.copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) 

  在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。

- [`Array.prototype.fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) 

  将数组中指定区间的所有元素的值，都替换成某个固定的值。

- [`Array.prototype.pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

  删除数组的最后一个元素，并返回这个元素。

- [`Array.prototype.push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

  在数组的末尾增加一个或多个元素，并返回数组的新长度。

- [`Array.prototype.reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

  颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。

- [`Array.prototype.shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

  删除数组的第一个元素，并返回这个元素。

- [`Array.prototype.sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

  对数组元素进行排序，并返回当前数组。

- [`Array.prototype.splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

  在任意的位置给数组添加或删除任意个元素。

- [`Array.prototype.unshift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

  在数组的开头增加一个或多个元素，并返回数组的新长度。



## 访问方法

下面的这些方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值。

- [`Array.prototype.concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

  返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。

- [`Array.prototype.includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) 

  判断当前数组是否包含某指定的值，如果是返回 `true`，否则返回 `false`。

- [`Array.prototype.join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

  连接所有数组元素组成一个字符串。

- [`Array.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

  抽取当前数组中的一段元素组合成一个新数组。

- [`Array.prototype.toSource()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSource) 

  返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 [`Object.prototype.toSource()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toSource) 方法。

- [`Array.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)

  返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法。

- [`Array.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)

  返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString) 方法。

- [`Array.prototype.indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

  返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

- [`Array.prototype.lastIndexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

  返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。
  
## 迭代方法

在下面的众多遍历方法中，有很多方法都需要指定一个回调函数作为参数。在每一个数组元素都分别执行完回调函数之前，数组的length属性会被缓存在某个地方，所以，如果你在回调函数中为当前数组添加了新的元素，那么那些新添加的元素是不会被遍历到的。此外，如果在回调函数中对当前数组进行了其它修改，比如改变某个元素的值或者删掉某个元素，那么随后的遍历操作可能会受到未预期的影响。总之，不要尝试在遍历过程中对原数组进行任何修改，虽然规范对这样的操作进行了详细的定义，但为了可读性和可维护性，请不要这样做。

- [`Array.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

  为数组中的每个元素执行一次回调函数。

- [`Array.prototype.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) 

  返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。

- [`Array.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

  如果数组中的每个元素都满足测试函数，则返回 `true`，否则返回 `false。`

- [`Array.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

  如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

- [`Array.prototype.filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

  将所有在过滤函数中返回 `true` 的数组元素放进一个新数组中并返回。

- [`Array.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find) 

  找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 `undefined`。

- [`Array.prototype.findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) 

  找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 `-1`。

- [`Array.prototype.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys) 

  返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。

- [`Array.prototype.map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

  返回一个由回调函数的返回值组成的新数组。

- [`Array.prototype.reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

  从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

- [`Array.prototype.reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)

  从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

- [`Array.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values) 

  返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。

- [`Array.prototype[@@iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator) 

  和上面的 `values() 方法是同一个函数。`

## [规范](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#规范)

| 规范                                                         | 状态            | 说明                                                         |
| :----------------------------------------------------------- | :-------------- | :----------------------------------------------------------- |
| [ECMAScript 1st Edition (ECMA-262)](https://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262, 1st edition, June 1997.pdf) | Standard        | 初始定义。                                                   |
| [ECMAScript 5.1 (ECMA-262) Array](https://www.ecma-international.org/ecma-262/5.1/#sec-15.4) | Standard        | 新增方法: [`Array.isArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray), [`indexOf`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf), [`lastIndexOf`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf), [`every`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every), [`some`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some), [`forEach`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), [`map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [`filter`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [`reduce`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce), [`reduceRight`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight) |
| [ECMAScript 2015 (6th Edition, ECMA-262) Array](https://www.ecma-international.org/ecma-262/6.0/#sec-array-objects) | Standard        | 新增方法：[`Array.from`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from), [`Array.of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of), [`find`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find), [`findIndex`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex), [`fill`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill), [`copyWithin`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) |
| [ECMAScript (ECMA-262) Array](https://tc39.es/ecma262/#sec-array-objects) | Living Standard | 新增方法：[`Array.prototype.includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) |

# MDN中系统学习Array

## 数组方法列举

> |[数组方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) [`Array.prototype.at()`]|说明|备注|
>
>| ---------------- | ------------------------------------------------------------ |-----------|

1. [`Array.prototype[@@iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator)

2. [`at()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/at)

3. [`concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

4. [`copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

5. [`entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

6. [`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

7. [`fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

8. [`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

9. [`find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

10. [`findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

11. [`flat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

12. [`flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

13. [`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

14. [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

15. [`includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

16. [`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

17. [`Array.isArray()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

18. [`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

19. [`keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)

20. [`lastIndexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

21. [`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

22. [`Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

23. [`pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

24. [`push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

25. [`reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

26. [`reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)

27. [`reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

28. [`shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

29. [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

30. [`some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

31. [`sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

32. *`splice()`*

33. [`toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)

34. [`toSource()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSource)

35. [`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)

36. [`unshift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

37. [`values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

## 数组方法细节

## 31. sort()使用说明

```js
/* sort() 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，
然后比较它们的UTF-16代码单元值序列时构建的
由于它取决于具体实现，因此无法保证排序的时间和空间复杂性。
arr.sort([compareFunction])
参数f
compareFunction 可选
用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
firstEl
第一个用于比较的元素。
secondEl
第二个用于比较的元素。
返回值
排序后的数组。请注意，数组已原地排序，并且不进行复制。

描述
如果没有指明 compareFunction ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。
例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，
但因为（没有指明 compareFunction），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。

如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。
备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。
所以，比较函数格式如下： */

// 按某种排序标准进行比较, a 小于 b
function compare(a, b) {return a < b ? -1 : a > b ? 1 : 0;}
// 要比较数字而非字符串，比较函数可以简单的以 a 减 b，如下的函数将会将数组升序排列

function compareNumbers(a, b) {
  return a - b;
}
// sort 方法可以使用 函数表达式 方便地书写：

var numbers = [4, 2, 5, 1, 3];
numbers.sort(function (a, b) {
  return a - b;
});
console.log(numbers);

// 也可以写成：
var numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers);

// [1, 2, 3, 4, 5]
// 对象可以按照某个属性排序：

var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];

// sort by value
items.sort(function (a, b) {
  return (a.value - b.value)
});

// sort by name
items.sort(function (a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
```

