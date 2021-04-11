# 7. Function的前世今生

## 一个小小的test,想来看下下面的代码会输出什么

```js
function func() {
  console.log('object');
}

let fun1 = func; console.log('fun1:-------------------',fun1);
let fun2 = func();console.log('fun2:--------------------',fun2);
```

> 1. 我们先来看看没加括号赋值的fun1

```js
function func() {console.log('object');}
let fun1 = func; console.log('fun1:-------------------',fun1);
// let fun2 = func();console.log('fun2:--------------------',fun2);
```

输出：

```js
PS G:\Study\Code\Web\learnFrontTest\JavaScript\DOM\event> node function.js
fun1:------------------- [Function: func]
```

> 2. 再来看看加括号赋值的fun2

```js
function func() { console.log('object');}
// let fun1 = func; console.log('fun1:-------------------',fun1);
let fun2 = func();console.log('fun2:--------------------',fun2);
```

输出：

```js
object
fun2:-------------------- undefined
```

> 3. 总结下来也就是不带括号赋值就是返回函数本身
> 4. 带了括号的是执行函数，并返回函数return里面的东西，没有return这是undefined
> 5. 有return，就是返回return里面，除了’()’以外的任何js表达式