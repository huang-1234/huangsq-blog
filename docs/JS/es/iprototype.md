# 9. prototypeAND__proto__

## 构造函数创建对象

```js
function Person() {

}
var person = new Person();
person.name = 'huangsq';
console.log(person.name) // huangsq
```

Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person

## prototype

每个函数都有一个 prototype 属性
 每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。



```js
function Person() {

}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'huangsq';
var person1 = new Person();
var person2 = new Person();
console.log(person1.name) // huangsq
console.log(person2.name) // huangsq
```

<img :src="$withBase('/images/JS/es/ProtoType.webp')" alt='ProtoType'>

## `proto`
每一个JavaScript对象(除了null )都具有的一个属性，叫`proto`，这个属性会指向该对象的原型

```js
function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```

<img :src="$withBase('/images/JS/es/__proto__.webp')" alt='__proto__'>

## constructor

每个原型都有一个 constructor 属性指向关联的构造函数 实例原型指向构造函数

```js
function Person() {

}
console.log(Person === Person.prototype.constructor); // true
```

<img :src="$withBase('/images/JS/es/constructor.webp')" alt='ProtoType'>

```js
function Person() {

}
var person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

###### 实例与原型

```js
function Person() {

}
Person.prototype.name = 'huangsq';

var person = new Person();

person.name = 'Daisy';
console.log(person.name) // Daisy

delete person.name;
console.log(person.name) // huangsq
```

在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 Daisy。

但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.`proto` ，也就是 Person.prototype中查找，幸运的是我们找到了 name 属性，结果为 huangsq。

## 原型与原型
```js
var obj = new Object();
obj.name = 'huangsq'
console.log(obj.name) // huangsq
```

<img :src="$withBase('/images/JS/es/Object.webp')" alt='ProtoType'>

## 原型链

```js
console.log(Object.prototype.__proto__ === null) // true
```

<img :src="$withBase('/images/JS/es/null.webp')" alt='ProtoType'>

JavaScript 默认并不会`复制`对象的属性，相反，JavaScript 只是在两个对象之间创建一个`关联`，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，`委托`的说法反而更准确些

点击<a href='https://blog.csdn.net/weixin_43352901/article/details/108089355' target=_blank>图解原型链</a>

other write in 2018.09.25

## JS的诞生

- JS 说，我好寂寞。因为 JS 的本源是空的，即：null。
- JS 说，要有神。所以它通过万能术 `__proto__` 产生了 No1 这号神，即：`No1.__proto__ == null`。
- JS 说，神你要有自己的想法啊。所以神自己想了个方法，根据自己的原型 `prototype` 创建了对象 `Object`，即：`Object.prototype == No1; No1.__proto__ == null`。于是我们把 `prototype` 叫做原型，就好比 `Object` 的原型是神，男人的原型是人类一样，同时 `__proto__` 叫做原型链，毕竟有了 `__proto__`，对象、神、JS 之间才有联系。这时候 `Object.prototype.__proto__ == null`。
- JS 说，神你要有更多的想法啊，我把万能术 `__proto__` 借你用了。所以神根据 `Object`，使用 `__proto__` 做了个机器 No2，即 `No2.__proto__ == No1`，并规定所有的东西，通过 `__proto__` 可以连接机器，再找到自己，包括 `Object` 也是，于是 `Object 成为所有对象的原型`，`Object.__proto__.__proto__ == No1`，然后 `String`、`Number`、`Boolean`、 `Array` 这些物种也是如此。
- JS 说，神你的机器好厉害喔！你的机器能不能做出更多的机器啊？神咧嘴一笑：你通过万能术创造了我，我通过自己原型创造了对象。如此，那我造个机器 Function，`Function.prototype == No2, Function.__proto__ == No2`，即 `Function.prototype == Function.__proto__` 吧！这样 No2 就成了造机器的机器，它负责管理 Object、Function、String、Number、Boolean、Array 这几个。

`最后`，说到这里，我们应该很了解开局祭祖的那副图，并有点豁然开朗的感觉，能清楚地了解下面几条公式了：

```
Object.__proto__ === Function.prototype;
Function.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
```

可以看出，这里有个点，我们还不清楚，就是：`new 为何物？`

`首先`，我们来讲讲函数：`函数分为构造函数和普通函数`。

怎么回事呢？`No2 始机器` 在创造机器 Function 的过程中，创造了过多的机器，为了方便区分这些机器，`No1 神` 将机器分为两类：`创造物种类的 Function 叫做构造函数（通常面向对象），创造动作类的 Function 叫做普通函数（通常面向过程）`。打个比喻：`function Birl() {}` 、`function Person() {}` 这类以首字母大写形式来定义的，用来定义某个类型物种的，就叫做 `构造函数`。而 `function fly() {}`、`function eat() {}` 这类以首字母小写形式来定义的，用来定义某个动作的，就叫做普通函数。

> 注意，它们本质还是 Function 中出来的，只是为了方便区分，我们如此命名