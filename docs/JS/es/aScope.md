# 1. scope&&closure

> 梳理一下关于js作用域和闭包的问题

为了解决前端工作团队中每个人为变量起名而不重名的的问题。

闭包的定义：在Javascript语言中，只有函数中的子函数才能引用函数中的变量，简单来说，闭包就是定义在函数中的函数，是函数内外部连接的桥梁

闭包的意义：（1）当前作用域总是能够访问外部作用域中的变量；（2）函数是唯一拥有自身作用域的结构，所以闭包的创建依赖于函数

变量的作用域：全局变量、局部变量是变量的作用域仅有的两种形态；一般来说，全局变量可以在任意作用域中引用，而局部变量则只能在当前作用域中引用。如：

这是一个全局变量，在函数内部可以读取全局变量的例子：
```js
var a = 1;
	var Get_a = function (){
	    console.log(a);
	};
	Get_a();//1
```
这是一个局部变量，无法在外部作用域中引用该变量；注意：局部变量的声明必须使用var表达式，否则运行该函数后相当于声明了一个全局变量
```js
	var Get_a = function (){
		var a = 1;
	};
	console.log(a);//a is not defined
// 这里实际上是定义全局变量：

var Get_a= function ()
{
    a = 1;
};
Get_a();
console.log(a);
```
一般情况，局部变量只能在函数中引用：子函数可以引用当前作用域中的变量，这实际上是JavaScript语言中的一个特色结构——作用域链,
```js
var Get_a = function ()
{
    var a = 1;
    var Out_a = function ()
    {
        console.log(a ++);//1
    };
    Out_a();
};
Get_a();
```
继续运行r()，输出值会递增——2、3、4、5，这个值被存储于内存中，这个Out_a子函数正是我们要讨论的闭包:
```js
var Get_a = function ()
{
    var a = 1;
    var Out_a = function ()
    {
        console.log(a ++);//1
    };
    return Out_a;
};
var r = Get_a();
r();
```

> 闭包的两大作用：
（1）内部function会访问外部函数的参数、变量、函数，
（2）将函数中的变量的值存储于内存中（不会被垃圾回收机制回收）

f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收：
```js
 function f1(){
    	var n=999;
    	nAdd=function(){n+=1}
    	function f2(){
        	alert(n);
        }
    	return f2;
    }
    var result=f1();
    result(); // 999
    nAdd();
    result(); // 1000
```
> 使用闭包的注意点：

由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

## 测试案例

> node环境

```js
var a = 9;
b = 8;
console.log(global.a, global.b);
// node环境下输出  undefined 8
```

> Browser

```js
var a = 9;
b = 8;
// console.log(global.a, global.b);
console.log(window.a, window.b);
// 输出 9 8
```

是不是感觉很奇特

a都挂在window对象上了，那为啥node这一点没有模仿，也就是var a 是没有将a挂载到global对象的

>  下面我们来看下这两个属性的描述

```js
var a = 9;
b = 8;
// console.log(global.a, global.b);
// console.log(window.a, window.b);

console.log(Object.getOwnPropertyDescriptor(global, 'a'));
console.log(Object.getOwnPropertyDescriptor(global, 'b'));
```

输出

```js
undefined
{ value: 8, writable: true, enumerable: true, configurable: true }
```

> 浏览器端

```js
var a = 9;
b = 8;
// console.log(global.a, global.b);
// console.log(window.a, window.b);

// console.log(Object.getOwnPropertyDescriptor(global, 'a'));
// console.log(Object.getOwnPropertyDescriptor(global, 'b'));

console.log(Object.getOwnPropertyDescriptor(window, 'a'));
console.log(Object.getOwnPropertyDescriptor(window, 'b'));
// 输出
// {value: 9, writable: true, enumerable: true, configurable: false}
// {value: 8, writable: true, enumerable: true, configurable: true}
```

已经很明显了吧：var a不可配置，b可配置