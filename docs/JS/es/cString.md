# 3. 字符串

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

### 提取部分字符串

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

### 替换字符串内容

replace() 方法用另一个值替换在字符串中指定的值：

