# 1. scope&&closure

## 作用域

**作用域是指在程序中定义变量的区域，该位置决定了变量的生命周期。通俗地理解，作用域就是变量与函数的可访问范围，即作用域控制着变量和函数的可见性和生命周期。**

也就是说函数作用域在函数定义的时候就决定了（编译时），并不是取决于函数在哪里调用，这里要注意和this指向分开。

在 ES6 之前，只有`全局作用域`和`函数作用域`，在 ES6 新增了一个块作用域。

- 全局作用域中的对象在代码中的任何地方都能访问，其生命周期伴随着页面的生命周期。
- 函数作用域就是在函数内部定义的变量或者函数，并且定义的变量或者函数只能在函数内部被访问。函数执行结束之后，函数内部定义的变量会被销毁。
- 块作用域是使用一对大括号包裹的一段代码，比如函数、判断语句、循环语句，甚至单独的一个{}都可以被看作是一个块级作用域。

```js
if(1){} // if 块
while(1){} // while 块
function() {} // 函数块
```

如果一种语言支持块级作用域，那么其代码块内部定义的变量在代码块外部是访问不到的，并且等该代码块中的代码执行完成之后，代码块中定义的变量会被销毁。

## 解决变量提升

之前我们也聊过变量提升，那么它的问题在哪呢？

- **变量容易在不被察觉的情况下被覆盖掉**
- **本应销毁的变量没有被销毁**

为了解决这些问题，ES6 引入了 let 和 const 关键字，从而使 JavaScript 也能像其他语言一样拥有了块级作用域。

在块级作用域中 let 声明的变量会被提升，初始化未被提升，在初始化之前使用变量，会形成一个暂时性死区。

```js
扩展
var的创建和初始化被提升，赋值不会被提升。
let, const的创建被提升，初始化和赋值不会被提升。
function的创建、初始化和赋值均会被提升。
```



## 作用域链

首先看段代码：

```js
function bar() {
    console.log(myName)
}
function foo() {
    var myName = "CodeHuang"
    bar()
}
var myName = "huangsq"
foo()
```

发现最后输出的是huansgq，为什么不是`CodeHuang`呢？

在每个执行上下文的变量环境中，都包含了一个外部引用，用来指向外部的执行上下文，我们把这个外部引用称为 outer。

当一段代码使用了一个变量时，JavaScript 引擎首先会在“当前的执行上下文”中查找该变量，如果没找到那么 JavaScript 引擎会继续在 `outer 所指向的执行上下文`中查找。

比如上面代码，bar 函数没有在自己的执行上下文中找到 myName 变量，于是就去他的 outer 所指向的执行上下文中查找，而 bar 函数的上一级执行上下文是`全局执行上下文`，所以输出`chenyilong369`。

**如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。**

但是是 foo 函数调用的 bar 函数，那为什么 bar 函数的外部引用是全局执行上下文，而不是 foo 函数的执行上下文？

因为在 JavaScript 执行过程中，其作用域链是由`词法作用域`决定的。

## 词法作用域

词法作用域就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。

![scrope01](aScope.assets/scope01.png)

知道了定义就可以回答上面的问题了。

根据词法作用域，foo 和 bar 的上级作用域都是全局作用域，所以如果 foo 或者 bar 函数使用了一个它们没有定义的变量，那么它们会到全局作用域去查找。也就是说，**词法作用域是代码编译阶段就决定好的，和函数是怎么调用的没有关系。**

##  闭包







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

> 闭包的意义：

（1）当前作用域总是能够访问外部作用域中的变量；

（2）函数是唯一拥有自身作用域的结构，所以闭包的创建依赖于函数

变量的作用域：全局变量、局部变量是变量的作用域仅有的两种形态；一般来说，全局变量可以在任意作用域中引用，而局部变量则只能在当前作用域中引用。如：

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

由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，<font color=red>在退出函数之前，将不使用的局部变量全部删除</font>。

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