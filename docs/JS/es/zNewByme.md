# new操作符的原理解析

JavaScript中new操作符用于创建一个给定构造函数的对象实例。如下例子：
```js
function Person(name, age){
	this.name = name;
	this.age = age;
}
const person1 = new Person('Tom', 20)
console.log(person1)  // Person {name: "Tom", age: 20}
```
我们定义了一个构造函数Person，然后通过new操作符生成Person构造函数的一个实例并将其引用赋值给变量person1。然后控制台打印出person1的内容，可以看到该实例对象具有name和age属性，它们的值就是我们在调用构造函数时传入的值。

那么，我们使用new操作符的时候都发生了哪些事呢？

备注：如果对JS中的prototype、__proto__与constructor属性不大熟悉的话，强烈建议先看一下这篇文章再来看一下内容：
[帮你彻底搞懂JS中的prototype、__proto__与constructor（图解）](./ProtoTypeAndproto)

new关键字进行的操作
new关键字进行了如下的操作（为了便于描述，obj用来表示创建的空对象、用constrc来表示构造函数）：

创建一个空对象obj（{}）；
将obj的[[prototype]]属性指向构造函数constrc的原型（即obj.[[prototype]] = constrc.prototype）。
将构造函数constrc内部的this绑定到新建的对象obj，执行constrc（也就是跟调用普通函数一样，只是此时函数的this为新创建的对象obj而已，就好像执行obj.constrc()一样）；
若构造函数没有返回非原始值（即不是引用类型的值），则返回该新建的对象obj（默认会添加return this）。否则，返回引用类型的值。
这里补充说明一下：[[prototype]]属性是隐藏的，不过目前大部分新浏览器实现方式是使用__proto__来表示。构造函数的prototype属性我们是可以显式访问的。



让我们用图来展示文章开头的那个例子的过程：

<img :src="$withBase('/images/JS/es/zNewBymeNew.png')" alt='ProtoType'>

image.png

怎么样，是不是对new操作符的执行过程有了一个清晰的了解了？

自己实现new操作符
从上面我们已经清楚地掌握了new的执行过程，那么我们就动手来自己实现一下new操作吧！

```js
function myNew(constrc, ...args) {
	// 1,2 创建一个对象obj，将obj的[[prototype]]属性指向构造函数的原型对象
	// 即实现：obj.__proto__ === constructor.prototype
	const obj = Object.create(constrc.prototype)
	// 3.将constrc内部的this（即执行上下文）指向obj，并执行
	const result = constrc.apply(obj, args); 
	// 4. 如果构造函数返回的是对象，则使用构造函数执行的结果。否则，返回新创建的对象
	return result instanceof Object ? result : obj; 
}
// 使用的例子：
function Person(name, age){
	this.name = name;
	this.age = age;
}
const person1 = myNew(Person, 'Tom', 20)
console.log(person1)  // Person {name: "Tom", age: 20}
```

这里的关键两步就是：

1. 将新创建对象的原型链设置正确，这样我们才能使用原型链上的方法。
2. 将新创建的对象作为构造函数执行的上下文，这样我们才能正确地进行一些初始化操作。