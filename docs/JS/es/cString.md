# 3. 字符串

## 字符串简介

1. length 属性返回字符串的长度：
```js
let txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let sln = txt.length;  
```
2. 

+ 查找字符串中的字符串
indexOf() 方法返回字符串中指定文本首次出现的索引（位置）：
+ lastIndexOf() 方法返回指定文本在字符串中最后一次出现的索引：
+ 两种方法都接受作为检索起始位置的第二个参数。
```js
let str = "The full name of China is the People's Republic of China.";
let pos = str.indexOf("China",0); //17
let pos = str.lastIndexOf("China"); //51 表示最后面一个china
```
+ 两种方法，indexOf() 与 search()，是相等的。
这两种方法是不相等的。区别在于：
  - search() 方法无法设置第二个开始位置参数。
  - indexOf() 方法无法设置更强大的搜索值（正则表达式）。search()可以设置正则表达式进行搜索。
+ 您将在正则表达式的章节学习到这些更强大的检索值。
```js
var str = "The full 2 name 1369 of China is the People's Republic of China.";
var pos = str.search(/[0-9]/);  //9
console.log(pos);
```

## 提取部分字符串

有三种提取部分字符串的方法：

- slice(*start*, *end*)
- substring(*start*, *end*)
- substr(*start*, *length*)

#### slice() 方法

slice() 提取字符串的某个部分并在新字符串中返回被提取的部分。

该方法设置两个参数：起始索引（开始位置），终止索引（结束位置）。
```js
var str = "Apple, Banana, Mango";
var res = str.slice(7); //Banana, Mango (从索引7开始到字符串的最后边提取，返回提取后的字符串)
console.log(res);
let res1 = str.slice(7, 13);
console.log(res1); //Banana
```
#### substring() 方法

substring() 类似于 slice()。

不同之处在于 substring() 无法接受负的索引。

#### substr() 方法

substr() 类似于 slice()。

不同之处在于第二个参数规定被提取部分的*长度*。

如果省略第二个参数，则该 substr() 将裁剪字符串的剩余部分。

## 替换字符串内容

replace() 方法用另一个值替换在字符串中指定的值：

## [从MDN系统学习String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

> 示例 String.prototype.charAt() 下面的都是js内置对象中String对象的方法

|      |      |      |
| :--- | :--: | ---: |
|      |      |      |
|      |      |      |
|      |      |      |

| String方法            | 描述                                                         | 代码示例                                             |
| :--------------------- | :----------------------------------------------------------- | ---------------------------------------------------- |
| 1. charAt()           | 返回特定位置的字符。                                         | str.charAt(index=0)                                  |
| 1. charCodeAt()       | 返回表示给定索引的字符的Unicode的值。                        |                                                      |
| 1. codePointAt()      | 返回使用UTF-16编码的给定位置的值的非负整数。                 |                                                      |
| 1. concat()           | 连接两个字符串文本，并返回一个新的字符串。                   |                                                      |
| 1. includes()         | 判断一个字符串里是否包含其他字符串。                         | str.includes(searchString[, position=0]) 返回Boolean |
| 1. endsWith()         | 判断一个字符串的是否以给定字符串结尾，结果返回布尔值。       |                                                      |
| 1. indexOf()          | 从字符串对象中返回首个被发现的给定值的索引值，如果没有找到则返回-1。 |                                                      |
| 1. lastIndexOf()      | 从字符串对象中返回最后一个被发现的给定值的索引值，如果没有找到则返回-1。 |                                                      |
| 1. localeCompare()    | 返回一个数字表示是否引用字符串在排序中位于比较字符串的前面，后面，或者二者相同。 |                                                      |
| 1. match()            | 使用正则表达式与字符串相比较。                               |                                                      |
| 1. normalize()        | 返回调用字符串值的Unicode标准化形式。                        |                                                      |
| 1. padEnd()           | 在当前字符串尾部填充指定的字符串， 直到达到指定的长度。      | 返回一个新的字符串。                                 |
| 1. padStart()         | 在当前字符串头部填充指定的字符串， 直到达到指定的长度。 返回一个新的字符串。 |                                                      |
| 1. quote()            | 设置嵌入引用的引号类型。                                     |                                                      |
| 1. repeat()           | 返回指定重复次数的由元素组成的字符串对象。                   |                                                      |
| 1. replace()          | 被用来在正则表达式和字符串直接比较，然后用新的子串来替换被匹配的子串。 |                                                      |
| 1. search()           | 对正则表达式和指定字符串进行匹配搜索，返回第一个出现的匹配项的下标。 |                                                      |
| 1. slice()            | 摘取一个字符串区域，返回一个新的字符串。                     |                                                      |
| 1. split()            | 通过分离字符串成字串，将字符串对象分割成字符串数组。         |                                                      |
| 1. startsWith()       | 断字符串的起始位置是否匹配其他字符串中的字符。               |                                                      |
| 1. substr()           | 通过指定字符数返回在指定位置开始的字符串中的字符。           |                                                      |
| 1. substring()        | 返回在字符串中指定两个下标之间的字符。                       | basic = basic.substring(0, basic.length - 1); |
| 1.toLocaleLowerCase() | 根据当前区域设置，将符串中的字符转换成小写。对于大多数语言来说，toLowerCase的返回值是一致的。 |                                                      |
| 1.toLocaleUpperCase() | 据当前区域设置，将字符串中的字符转换成大写，对于大多数语言来说，toUpperCase的返回值是一致的。 |                                                      |
| 1. toLowerCase()      | 将字符串转换成小写并返回。                                   |                                                      |
| 1. toSource()         | 返回一个对象文字代表着特定的对象。你可以使用这个返回值来创建新的对象。重写 Object.prototype.toSource 方法。 |                                                      |
| 1. toString()         | 返回用字符串表示的特定对象。重写 Object.prototype.toString 方法。 |                                                      |
| 1. toUpperCase()      | 将字符串转换成大写并返回。                                   |                                                      |
| 1. trim()             | 从字符串的开始和结尾去除空格。参照部分 ECMAScript 5 标准。   |                                                      |
| 1. trimStart()        | 从字符串的右侧去除空格。                                     |                                                      |
| 1. trimLeft()         | 从字符串的左侧去除空格。                                     |                                                      |
| 1. trimEnd()          |                                                              |                                                      |
| 1. trimRight()        | 从字符串的右侧去除空格。                                     |                                                      |
| 1. valueOf()          | 返回特定对象的原始值，重写 Object.prototype.valueOf 方法。   |                                                      |

String.prototype[@@iterator]() 

返回一个新的迭代器对象，该对象遍历字符串值的索引位置，将每个索引值作为字符串值返回。

HTML wrapper methods

下面的方法被限制使用，因为只对可用的HTML标签和属性提供部分支持。

```html
1. anchor()

<a name="name"> (hypertext target)

1. big() 
<big>

1. blink() 
<blink>

1. bold() 

<b>

1. fixed() 

<tt>

1. fontcolor() 

<font color="color">

1. fontsize() 

<font size="size">

1. italics() 

<i>

1. link()

<a href="url"> (link to URL)

1. small() 

<small>

1. strike() 

<strike>

1. sub() 

<sub>

1. sup() 

<sup>
```
示例 

将其他值转换成字符串

使用 String() 方法将其它对象转化为字符串可以被认为是一种更加安全的做法，虽然该方法底层使用的也是 toString() 方法，但是针对 null/undefined/symbols，String() 方法会有特殊的处理：
```js
var outputStrings = [];

for (let i = 0, n = inputValues.length; i < n; ++i) {

 outputStrings.push(String(inputValues[i]));

}
```


