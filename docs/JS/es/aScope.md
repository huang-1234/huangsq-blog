# 1. scope&&closure

> 梳理一下关于js作用域和闭包的问题

要了解闭包之前，我们先来看下示例

函数 bar() 具有一个涵盖 foo() 作用域的闭包 （事实上，涵盖了它能访问的所有作用域，比如全局作用域）。也可以认为 bar() 被封闭在 了 foo() 的作用域中。为什么呢？原因简单明了，因为 bar() 嵌套在 foo() 内部。 

但是通过这种方式定义的闭包并不能直接进行观察，也无法明白在这个代码片段中闭包是 如何工作的。我们可以很容易地理解词法作用域，而闭包则隐藏在代码之后的神秘阴影 里，并不那么容易理解。 下面我们来看一段代码，清晰地展示了闭包：

```js
function foo() {
  var a = 2;
  function bar() { 
    console.log( a ); 
  }
  return bar; 
}
var baz = foo(); 
baz(); // 2 —— 朋友，这就是闭包的效果。 
```



函数 bar() 的词法作用域能够访问 foo() 的内部作用域。然后我们将 bar() 函数本身当作 一个值类型进行传递。在这个例子中，我们将 bar 所引用的函数对象本身当作返回值。 在 foo() 执行后，其返回值（也就是内部的 bar() 函数）赋值给变量 baz 并调用 baz()，实 际上只是通过不同的标识符引用调用了内部的函数 bar()。 bar() 显然可以被正常执行。但是在这个例子中，它在自己定义的词法作用域以外的地方 执行。 

在 foo() 执行后，通常会期待 foo() 的整个内部作用域都被销毁，因为我们知道引擎有垃 圾回收器用来释放不再使用的内存空间。由于看上去 foo() 的内容不会再被使用，所以很 自然地会考虑对其进行回收。 

而闭包的“神奇”之处正是可以阻止这件事情的发生。事实上内部作用域依然存在，因此 没有被回收。谁在使用这个内部作用域？原来是 bar() 本身在使用。 拜 bar() 所声明的位置所赐，它拥有涵盖 foo() 内部作用域的闭包，使得该作用域能够一 直存活，以供 bar() 在之后任何时间进行引用。 bar() 依然持有对该作用域的引用，而这个引用就叫作闭包。



> 闭包的定义：

在Javascript语言中，只有函数中的子函数才能引用函数中的变量，简单来说，闭包就是定义在函数中的函数，是函数内外部连接的桥梁

闭包的意义：（1）当前作用域总是能够访问外部作用域中的变量；（2）函数是唯一拥有自身作用域的结构，所以闭包的创建依赖于函数

变量的作用域：全局变量、局部变量是变量的作用域仅有的两种形态；一般来说，全局变量可以在任意作用域中引用，而局部变量则只能在当前作用域中引用。如：

这是一个全局变量，在函数内部可以读取全局变量的例子：
```js
let a = 1;
	let Get_a = function (){
	    console.log(a);
	};
	Get_a();//1
```
这是一个局部变量，无法在外部作用域中引用该变量；注意：局部变量的声明必须使用let表达式，否则运行该函数后相当于声明了一个全局变量
```js
	let Get_a = function (){
		let a = 1;
	};
	console.log(a);//a is not defined
// 这里实际上是定义全局变量：

let Get_a= function ()
{
    a = 1;
};
Get_a();
console.log(a);
```
一般情况，局部变量只能在函数中引用：子函数可以引用当前作用域中的变量，这实际上是JavaScript语言中的一个特色结构——作用域链,
```js
let Get_a = function ()
{
    let a = 1;
    let Out_a = function ()
    {
        console.log(a ++);//1
    };
    Out_a();
};
Get_a();
```
继续运行r()，输出值会递增——2、3、4、5，这个值被存储于内存中，这个Out_a子函数正是我们要讨论的闭包:
```js
let Get_a = function ()
{
    let a = 1;
    let Out_a = function ()
    {
        console.log(a ++);//1
    };
    return Out_a;
};
let r = Get_a();
r();
```

> 闭包的两大作用：
（1）内部function会访问外部函数的参数、变量、函数，
（2）将函数中的变量的值存储于内存中（不会被垃圾回收机制回收）

f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收：
```js
 function f1(){
    	let n=999;
    	nAdd=function(){n+=1}
    	function f2(){
        	alert(n);
        }
    	return f2;
}
let result=f1();
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
let a = 9;
b = 8;
console.log(global.a, global.b);
// node环境下输出  undefined 8
```

> Browser

```js
let a = 9;
b = 8;
// console.log(global.a, global.b);
console.log(window.a, window.b);
// 输出 9 8
```

是不是感觉很奇特

a都挂在window对象上了，那为啥node这一点没有模仿，也就是let a 是没有将a挂载到global对象的

>  下面我们来看下这两个属性的描述

```js
let a = 9;
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
let a = 9;
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

已经很明显了吧：let a不可配置，b可配置