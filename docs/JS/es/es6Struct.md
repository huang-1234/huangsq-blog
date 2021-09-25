# 5.ES6 Symbol,Set,Map

es6新增数据类型

- [Symbol 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)*（基本）*
- [Set 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)*（复杂）*
- [Map 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)（复杂）
- [WeakSet 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)*（复杂）*
- [WeakMap 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)*（复杂）*
- [TypedArray 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)*（复杂）*

## 新数据类型 Symbol

- Symbol 不是对象，可以理解成不能重复的独立字符串，括号内对象会转化为字符串
- Symbol for 在全局中定义查找，创建多个其实查找是同一个
- Symbol.keyFor 返回已经登记的Symbol类型的key


```js
const obj={
    name:'daji',
    toString(){
        return this.name
    }
}
let n=Symbol(obj)
console.log(n); //Symbol(daji)

let c=Symbol([1,2,3])
console.log(c);  //Symbol(1,2,3)

let s1=Symbol('foo')
let s2=Symbol('foo')
console.log(s1===s2); //false

let a1=Symbol.for('foo')
let a2=Symbol.for('foo')
console.log(a1===a2);  //true

const x1=Symbol('foo')
console.log(Symbol.keyFor(x1)); //undefined
const x2=Symbol.for('foo')
console.log(Symbol.keyFor(x2)); //foo
```

### 应用场景

- 对象内如果有重复key值会覆盖的解决方式



```js
let s1 = Symbol('foo');
let s2 = Symbol('foo');
const stu1 = Symbol('hsq')
const stu2 = Symbol('hsq')
console.log(stu1,stu2) // Symbol(hsq) Symbol(hsq)
const grade = {
  [stu1]: { address: 'changsha', tel: '137707531' },
  [stu2]: { address: 'changsha', tel: '137707531' }
}
console.log(grade); //{Symbol('hsq'):{...},Symbol('hsq'):{...}} 不会覆盖，显示两个
console.log(grade[stu1]);
console.log(grade[stu2]);
```

- 一定程度上保护构造函数的属性

```js
let sym=Symbol('hello')
class User{
    constructor(name){
        this.name=name
        this[sym]='hello.com'
    }
    getName(){
        return this.name+this[sym]
    }
}
let user=new User('daji')
console.log(user.getName()); //dajihello.com

for(let key in user){
    console.log(key);  //name 无法读到Symbol('hello')属性
}
for(let key of Object.keys(user)){
    console.log(key);  //name 无法读到Symbol('hello')属性
}
for(let key of Object.getOwnPropertyNames(user)){
    console.log(key);  //name 无法读到Symbol('hello')属性
}
for(let key of Object.getOwnPropertySymbols(user)){
    console.log(key);  //Symbol(hello)   只能读到symbol属性，读不到name
}
for(let key of Reflect.ownKeys(user)){
    console.log(key);   //name Symbol(hello)  都能读到
}
```

- 消除魔术字符串（重复出现的字符串）



```js
const shpeType={
    triangle:Symbol(),  //triangle:'triangle' vlaue值不重要用symbol替代
    circle:Symbol()     //circle:'circle'
}
function getArea(shape){
    let area = 0
    switch(shape){
        case shpeType.triangle:  //避免case 'triangle' 重复出现此字符串
            area=1
            break
        case shpeType.circle:
            area=2
            break
    }
    return area
}
console.log(getArea(shpeType.triangle));  //返回1  避免getArea('triangle') 重复出现此字符串
```

## 5. Set

1. `Set`对象允许你存储任何类型的唯一值，无论是[原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)或者是对象引用。`Set`对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set 中的元素只会**出现一次**，即 Set 中的元素是唯一的。

> 值的相等

因为 Set 中的值总是唯一的，所以需要判断两个值是否相等。在 ECMAScript 规范的早期版本中，这不是基于和===操作符中使用的算法相同的算法。具体来说，对于 Set s， +0 （+0 严格相等于-0）和-0 是不同的值。然而，在 ECMAScript 2015 规范中这点已被更改。有关详细信息，请参阅[浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set#浏览器兼容性) 表中的“_Key equality for -0 and 0_”。

另外，`NaN`和`undefined`都可以被存储在 Set 中， `NaN`之间被视为相同的值（NaN 被认为是相同的，尽管 NaN !== NaN）。

### Set VS Array

我确信有很多开发人员坚持使用基本的全局对象：数字，字符串，对象，数组和布尔值。对于许多用例，这些都是需要的。 但是如果想让你的代码尽可能快速和可扩展，那么这些基本类型并不总是足够好。

在本文中，我们将讨论 JS 中`Set`对象如何让代码更快—  特别扩展性方便。 `Array` 和`Set`工作方式存在大量的交叉。但是使用`Set`会比`Array`在代码运行速度更有优势。

### Set 有何不同

最根本的区别是数组是一个索引集合，这说明数组中的数据值按索引排序。

```js
const arr = [A, B, C, D];
console.log(arr.indexOf(A)); // Result: 0
console.log(arr.indexOf(C)); // Result: 2
```

相比之下，`set`是一个键的集合。`set`不使用索引，而是使用键对数据排序。`set` 中的元素按插入顺序是可迭代的，它不能包含任何重复的数据。换句话说，`set`中的每一项都必须是惟一的。

### 主要的好处是什么

`set` 相对于数组有几个优势，特别是在运行时间方面：

- **查看元素**：使用`indexOf()`或`includes()`检查数组中的项是否存在是比较慢的。
- **删除元素**:在`Set`中，可以根据每项的的 `value` 来删除该项。在数组中，等价的方法是使用基于元素的索引的`splice()`。与前一点一样，依赖于索引的速度很慢。
- **保存 NaN**：不能使用`indexOf()`或 `includes()` 来查找值 `NaN`，而 `Set` 可以保存此值。
- **删除重复项**:`Set`对象只存储惟一的值,如果不想有重复项存在，相对于数组的一个显著优势，因为数组需要额外的代码来处理重复。

### 时间复杂度？

数组用来搜索元素的方法时间复杂度为`0(N)`。换句话说，运行时间的增长速度与数据大小的增长速度相同。

相比之下，`Set`用于搜索、删除和插入元素的方法的时间复杂度都只有`O(1)`，这意味着数据的大小实际上与这些方法的运行时间无关。

### Set 究竟有多快？

虽然运行时间可能会有很大差异，具体取决于所使用的系统，所提供数据的大小以及其他变量，但我希望我的测试结果能够让你真实地了解`Set`的速度。 我将分享三个简单的测试和我得到的结果。

### **准备测试**

在运行任何测试之前，创建一个数组和一个 Set，每个数组和 Set 都有 100 万个元素。为了简单起见，我从`0`开始，一直数到`999999`。

```
let arr = [], set = new Set(), n = 1000000;
for (let i = 0; i < n; i++) {
  arr.push(i);
  set.add(i);
}
```

##### 测试 1：查找元素

我们搜索数字`123123`

```js
let result;
console.time("Array");
result = arr.indexOf(123123) !== -1;
console.timeEnd("Array");
console.time("Set");
result = set.has(123123);
console.timeEnd("Set");
```

- Array: 0.173ms
- Set: 0.023ms

`Set` 速度快了`7.54`倍

##### 测试 2：添加元素

```js
console.time("Array");
arr.push(n);
console.timeEnd("Array");
console.time("Set");
set.add(n);
console.timeEnd("Set");
```

- Array: 0.018ms
- Set: 0.003ms

`Set` 速度快了`6.73`倍

##### 测试 3：删除元素

最后，删除一个元素，由于数组没有内置方法，首先先创建一个辅助函数：

```js
const deleteFromArr = (arr, item) => {
  let index = arr.indexOf(item);
  return index !== -1 && arr.splice(index, 1);
};
```

这是测试的代码：

```js
console.time("Array");
deleteFromArr(arr, n);
console.timeEnd("Array");
console.time("Set");
set.delete(n);
console.timeEnd("Set");
```

- Array: 1.122ms
- Set: 0.015ms

`Set` 速度快了`74.13`倍

总的来说，我们可以看到，使用`Set` 极大地改善运行时间。再来看看一些`Set`有用的实际例子。

### 案例 1:从数组中删除重复的值

如果想快速地从数组中删除重复的值，可以将其转换为一个 `Set`。这是迄今为止过滤惟一值最简洁的方法:

```js
const duplicateCollection = ["A", "B", "B", "C", "D", "B", "C"];
// 将数组转换为 Set
let uniqueCollection = new Set(duplicateCollection);
console.log(uniqueCollection); // Result: Set(4) {"A", "B", "C", "D"}
// 值保存在数组中
let uniqueCollection = [...new Set(duplicateCollection)];
console.log(uniqueCollection); // Result: ["A", "B", "C", "D"]
```

##### 案例 2：谷歌面试问题

**问题：**

给定一个整数无序数组和变量 `sum`，如果存在数组中任意两项和使等于 `sum` 的值，则返回`true`。否则,返回`false`。例如，数组`[3,5,1,4]`和 `sum = 9`，函数应该返回`true`，因为`4 + 5 = 9`。

**解答**

解决这个问题的一个很好的方法是遍历数组，创建 `Set`保存相对差值。

当我们遇到`3`时，我们可以把`6`加到`Set`中, 因为我们知道我们需要找到`9`的和。然后，每当我们接触到数组中的新值时，我们可以检查它是否在 `Set` 中。当遇到`5`时，在 Set 加上 4。最后，当我们最终遇到`4`时，可以在`Set`中找到它，就返回`true`。

```js
const findSum = (arr, val) => {
  let searchValues = new Set();
  searchValues.add(val - arr[0]);
  for (let i = 1, length = arr.length; i < length; i++) {
    let searchVal = val - arr[i];
    if (searchValues.has(arr[i])) {
      return true;
    } else {
      searchValues.add(searchVal);
    }
  }
  return false;
};
```

简洁的版本：

```js
const findSum = (arr, sum) =>
  arr.some(((set) => (n) => set.has(n) || !set.add(sum - n))(new Set()));
```

因为`Set.prototype.has()`的时间复杂度仅为`O(1)`，所以使用 Set 来代替数组，最终使整个解决方案的线性运行时为`O(N)`。

如果使用 `Array.prototype.indexOf()`或`Array.prototype.includes()`，它们的时间复杂度都为 O(N)，则总运行时间将为`O(N²)`，慢得多！