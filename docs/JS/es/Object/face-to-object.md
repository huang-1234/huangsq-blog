# JS面向对象Full

## 1 理解对象

### 1-1 属性的类型

属性分两种：数据属性和访问器属性

1. 数据属性

   数据属性包含一个保存数据值的位置。值会从这个位置读取，也会写入到这个位置，数据属性有4个特性来描述它们的行为。

   - `[[Configurable]]`：表示属性是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性。默认为true
   - `[[Enumerable]]`：表示属性是否可枚举（通过for-in循环返回），默认为true
   - `[[Writable]]`：表示属性的值是否可修改，默认为true
   - `[[Value]]`：属性实际的值，默认是undefined

   注意点：虽然可以对同一个属性多次调用`Object.defineProperty()`，但在把`configurable`设为false之后就会受限制了

2. 访问器属性

   访问器属性不包含数据值。相反，它们包含一个获取函数（getter）和一个设置函数（setter）,访问器属性有4个特性来描述它们的行为

   - `[[Configurable]]`：表示属性是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改为数据属性。默认为true
   - `[[Enumberable]]`：表示属性是否可枚举（通过for-in循环返回），默认为true
   - `[[Get]]`：获取函数，在读取属性时调用，默认为undefined
   - `[[Set]]`：设置函数，在写入属性时调用，默认为undefined

### 1-2 定义多个属性

在一个对象上同时定义多个属性时，使用`Object.defineProperties()`方法，区别于`Object.definedProperty()`方法一次只能定义或修改多个属性，具体看[MDN文档](https://links.jianshu.com/go?to=defineProperties)

### 1-3 读取属性的特性

使用`Object.getOwnPropertyDescription(obj, prop)`方法可以获取指定属性的属性描述符，也就是属性的特性。接收两个参数：属性所在的对象和要取得其描述符的属性名。

`Object.getOwnPropertyDescriptions(obj)`方法可用来获取一个对象的所有属性的属性描述符。接收一个参数：需要获取的对象

### 1-4 合并对象

`ES6`中使用`Object.assign(target, source)`方法进行对象的合并，返回值是目标对象。这个方法实际上是对每个源对象执行的是浅复制。

### 1-5 对象标识及相等判定

为了解决 === 操作符判定特殊情况带来的问题，`ES6`新增了`Object.is()`



```js
// ===
console.log(+0 === -0) // true
console.log(+0 === 0) // true
console.log(-0 === 0) // true
console.log(NaN === NaN) // false

// Object.is()
console.log(Object.is(+0 === -0)) // false
console.log(Object.is(+0 === 0)) // true
console.log(Object.is(-0 === 0)) // false
console.log(Object.is(NaN, NaN)) // true
```

## 2 创建对象

### 2-1 工厂模式



```js
function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name)
    }
    return o;
}
let person1 = createPerson('xiaoming', 10, 'student');
let person2 = createPerson('zhangsan', 20, 'doctor');
console.log(person1 instanceof Person); // false 不能识别对象的类型
```

弊端：这里，函数每次调用都会返回一个新的对象， 这种方法可以解决创建多个类似对象的问题，但是没有解决对象标识问题（即新创建的对象是什么类型），构造函数模式可以解决这个问题。

### 2-2 构造函数模式

`ECMAScript`中的构造函数是用于创建特定类型对象的。

前面的例子使用构造函数可以这么写：



```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log(this.name)
    }
}
let person1 = new Person('xiaoming', 10, 'student');
let person2 = new Person('zhangsan', 20, 'doctor');
```

这里的代码和前面使用工厂函数创建的例子基本是一样的，只是有以下区别：

- 没有显示地创建对象
- 属性和方法直接赋值给this
- 没有返回值

为什么？可以看到我们在创建实例地时候使用了new操作符。那使用new时，内部执行了以下的操作：

1. 创建一个新的空对象
2. 这个对象内部的`__proto__`属性（这里应该是[[Prototype]]特性，具体为什么`__proto__`可以访问到？下面会解释到）指向构造函数（即Person）的prototype属性
3. 构造函数内部的this指向这个新创建的空对象
4. 执行构造函数内部的代码，也就是不断地给this赋值，不断给this添加属性
5. 返回this对象（即新创建的对象）

`instanceof`操作符是用来确定对象类型最可靠的方式。相比于工厂模式，可识别对象的类型是一个很大的好处。



```js
console.log(person1 instanceof Person); // true
console.log(person2 instanceof Object); // true
console.log(person1 instanceof Person); // true
console.log(person2 instanceof Object); // true
```

弊端：构造函数内部定义的方法会在每个实例上都创建一遍，上面的例子中，`person1`和`person2`中都有名为`sayName()`的方法，因为是做同一件事，所以没必要创建两次。这个问题可以通过原型模式来解决。

### 2-3 原型模式

每个函数都会创建一个`prototype`属性，这个属性是一个对象。

使用原型对象的好处是：在它上面定义的属性和方法可以被实例共享。原来在构造函数中直接赋值给对象实例的值，可以直接赋值给他们的原型，如下：



```js
function Person() {}
Person.prototype.name = 'xiaoming';
Person.prototype.age = 10;
Person.prototype.job = 'student';
Person.prototype.sayName = function() {
    console.log(this.name);
}
let person1 = new Person();
let person2 = new Person();
console.log(person1.name) // xiaoming
console.log(person1.sayName == person2.sayName) // true
```

虽然构造函数中什么都没有，但是却可以访问得到相应得属性和方法，而且使用定义在原型上的属性和方法是共享给所有的实例的（即所有实例都可以访问得到，也不会存在重复创建的问题）

1. 理解原型

无论何时，只要创建一个函数，这个函数就存在一个`prototype`属性（指向原型对象）。默认情况下，所有`原型对象`都有一个名为`constructor`的属性，指回对应的构造函数。比如上面的例子`Person.prototype.constructor`指回`Person`

每次调用构造函数创建一个新实例，这个实例内部存在一个`[[Prototype]]`特性，会指向构造函数的原型对象。由于脚本中没有访问这个`[[Prototype]]`特性的标准方式，但`Firefox`，`Safari`，`Chrome`中会在每个对象上暴露`__proto__`属性，通过这个属性可以访问实例对象的原型。（这也为上面将new操作符时说为什么可以通过`__proto__`访问的到原型做了解释）

关键在于理解这一点：实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有

1. 原型层级

在通过对象访问属性时，会按照这个属性的名称开始搜索。搜索开始于对象实例本身。如果在这个实例上发现了给定的名称，则返回该名称对应的值。如果没有找到这个属性，则搜索会沿着指针进入原型对象，然后在原型对象上找到属性后，再返回对应的值。

虽然可以通过实例读取原型对象上的值，但不可能通过实例重写这些值。如果在实例上添加了一个与原型对象中同名的属性，那就会在实例上创建这个属性，这个属性会遮住原型对象上的属性。即使在实例上把这个属性设置为null，也不会恢复它和原型的联系，不过，使用delete操作符可以完全删除实例上的这个属性，从而让标识符解析过程能够继续搜索原型对象。

`hasOwnProperty()方法`用于确定某个属性是在实例上还是在原型对象上。会在属性存在于调用它的对象实例上时返回true，即如果该属性是存在于实例上时，返回true，反之返回false。



```js
function Person() {}
Person.prototype.name = 'xiaoming';
let person1 = new Person()
person1.name = 'lucy'
console.log(person1.hasOwnProperty('name')) // true
delete person1.name // 删除实例上的name属性
console.log(person1.hasOwnProperty('name')) // false
```

1. 原型和in操作符

有两种方式使用in操作符：

- for-in循环中使用

  - for-in中使用in操作符时，遍历对象的所有`可枚举`属性
  - 要想获得对象上所有`可枚举`的实例属性，可以使用`Object.keys()`方法。（接收一个对象作为参数，返回所有可枚举属性组成的字符串数组）
  - `Object.getOwnPropertyNames()`方法返回的是所有实例属性，无论是否可枚举；`Object.getOwnPropertySymbols()`类似；

- 单独使用时，in操作符会在可以通过对象访问指定属性时返回true，无论该属性是在实例上还是在原型上。
  - 如果要确定某个属性是否存在于原型上，则可以像这样同时使用`hasOwnProperty`和`in`操作符

```js
function hasPrototypeProperty(object, name) {
    return !Object.hasOwnProperty(name) && (name in Object)
}
```

1. 属性枚举顺序
   - 顺序不确定：`for-in`循环，`Object.keys()`，取决于`JavaScript`引擎，可能因浏览器而异
   - 顺序确定：`Object.getOwnPropertyNames()`、`Object.getOwnPropertySymbols()`、`Object.assign()`，先以升序枚举数值键，再按定义的顺序插入枚举字符串和符号键。（数字键优先，并且升序排列，和定义属性的顺序无关，次之是字符串和符号键，这两种就按照定义属性的顺序来插入）

### 2-4 对象迭代

`ESMAScript2017`新增了两个静态方法。用于迭代对象，这两个方法执行对象的浅复制，都会忽略符号属性。

- `Object.values()`：返回的是对象 值的数组
- `Object.entries()`：返回的是 键/值对的数组

1. 其他原型语法



```js
function Person() {}
Person.prototype = {
    name: 'xiaoming',
    sayName() {
        console.log(this.name);
    }
}
```

看上面的代码，在直接通过一个包含所有属性和方法的对象来重写原型时，要注意，这样重写后，`Person.prototype`的`constructor`属性就不指向`Person`了，而是指向Object。如果我们想依靠`constructor`属性来识别类型，那怎么办？那就重新指定一下



```js
function Person() {}
Person.prototype = {
    constructor: Person,
    name: 'xiaoming',
    sayName() {
        console.log(this.name)
    }
}
```

好了，但是有个问题，以这种方式恢复`constructor`属性它是一个`[[Enumerable]]`为`true`的属性，而原生的`constructor属性`默认是不可枚举的。因此我们得用`Object.definedProperty()`方法来定义`constructor`属性：



```js
function Person() {}
Person.prototype = {
    name: 'xiaoming',
    sayName() {
        console.log(this.name)
    }
}
// 恢复constructor属性
Object.defineProperty(Person.prototype, 'constructor', {
    enumerable: false,
    value: Person
})
```

这样就可以完美恢复`constructor`属性了。

1. 原型的动态性

注意`给原型添加属性和方法`和`重写整个原型`是完全两回事。

先看个例子：给原型添加属性和方法



```js
let friend = new Person()
Person.prototype.sayHi = function() {
    console.log('Hi')
}
friend.sayHi() // Hi
```

虽然我们是在实例化之后才给原型添加`sayHi()`方法的，为什么实例可以直接访问到该方法？

这是因为new的时候实例的`[[Prototype]]`指针就已经指向`Person.prototype`了，所以无论我们后面怎么给原型对象添加属性，实例都能够访问得到。

再看看这个例子：重写整个原型



```js
let friend = new Person()
Person.prototype = {
    constructor: Person,
    name: 'xiaoming',
    sayName() {
        console.log(this.name)
    }
}
friend.sayName(); // 报错
```

为什么？

这也是刚刚上面说的，实例的`[[Prototype]]`指针是在new的时候被赋值为`Person.prototype`的，而上面的代码因为重写了原型，相当于又创建了一个新的对象，  而这时实例指向的还是最初的原型对象，上面并没有`sayName()`方法，所以报错

`重写构造函数上的原型之后再创建的实例才会引用新的原型。而在此之前创建的实例仍然会引用最 初的原型。`

1. 原生对象原型

尽管可以像修改自定义对象原型一样修改原生对象原型，随时添加方法，但不推荐在产品环境中修改原生对象原型。这样做很可能造成误会，而且可能引发命名冲突（比如一个名称在某个浏览器实现中不存在，在另一个实现中却存在）。另外还有可能意外重写原生的方法。推荐的做法是`创建一个自定义的类，继承原生类型`。

1. 原型的问题

存在的问题：

1. 弱化了向构造函数传递初始化参数的能力，会导致所有的实例默认都取得相同的属性值。
2. 原型上的方法和属性都是所有实例共享的，这对于方法来说比较合适，但是对于属性来说就不是特别好。如果属性是原始类型，那还好，可以通过实例上添加同名属性来覆盖原型上地属性。但是，如果属性是引用类型，那么当我们修改了某个实例上的该属性，（由于指针指向是相同的）那么这样就影响了其他实例上的属性，这是不合理的。

所以实际开发中通常不单独使用原型模式。

## 3 继承



```go
继承分为接口继承和`实现继承`，实现继承是`ECMAScript`唯一支持的继承方式，而这主要是通过原型链实现的。
```

### 3-1 原型链继承



```bash
原型链继承就是 `使子类的原型指向父类的构造出来的实例对象`
```

```js
SubType.prototype = new SuperType()
```

1. 默认原型

任何函数的默认原型都是`Object`的实例，这意味着这个实例有一个内部指针指向`Object.prototype`，所以自定义类型能够继承如`toString()`,`valueOf()`这些方法。

1. 原型与继承的关系

原型与实例的关系可以通过两种方式来确定：

- `instanceof`操作符：`(实例 instanceof 构造函数)`如果一个实例的原型链中出现过相应的构造函数，则返回`true`
- `isPrototypeOf()方法`：`(构造函数.prototype.isPrototypeOf(需要检测的实例对象))`原型链中的每个原型都可以调用这个方法，用于检测实例对象是否存在于另一个对象的原型链上，是则返回`true`

弊端：如果父类构造函数中存在引用值会导致子类的原型中也存在着引用值（因为子类的原型是被赋值为父类的一个实例对象），所以子类的所有实例都会共享存在的引用值。

### 3-2 盗用（借用）构造函数继承

为了解决原型包含引用值导致的继承问题，我们可以使用“盗用构造函数继承”

基本思路：在子类构造函数中调用父类构造函数，可以使用`call()`和`apply()`方法以新创建的对象为上下文执行构造函数。



```js
function SuperType(name) {
this.name = name
this.colors = ['red', 'green']
this.sayName = function() {
   console.log(this.name)
}
}
function SubType() {
SuperType.call(this, 'xiaoming') // 继承SuperType并传参
}
let instance1 = new SubType()
instance1.colors.push('blue')
console.log(instance1.colors) // ['red', 'green', 'blue']

let instance2 = new SubType()
console.log(instance2.colors) // ['red', 'green']
// 通过使用call()/apply()方法, SuperType构造函数在SubType的实例创建的新对象的上下文中执行了，相当于新的SubType对象上运行了SuperType函数中所有初始化代码。结果就是每个实例都会有自己的colors和name属性。
```

优点：可以在子类构造函数中向父类构造函数传参

缺点：也是构造函数模式的缺点：就是必须在构造函数中定义方法，因此函数不能重用

### 3-3 组合继承

组合继承综合了原型链和盗用（借用）构造函数继承，将两者的优点集中了起来。

基本思路：使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。



```js
function SuperType(name) {
    this.name = name
    this.colors = ['red', 'blue']
}
SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, age) {
    SuperType.call(this, name) // 借用构造函数继承 让SubType的每个实例都拥有name 和 colors属性，相互之间不受影响
    this.age = age
}
SubType.prototype = new SuperType() // 原型链继承父类
SubType.prototype.sayAge = function() {
    console.log(this.age)
}
let instance1 = new SubType('xiaoming', 10)
instance1.colors.push('yellow')
console.log(instance1.colors) // ['red', 'blue', 'yellow']
instance1.sayName() // xiaoming
instance1.sayAge() // 10

let instance2 = new SubType('lucy', 20)
console.log(instance2.colors) // ['red', 'blue']
instance2.sayName() // lucy
instance2.sayAge() // 20
```

优点：组合继承弥补了原型链和盗用构造函数的不足，是`JavaScript`中使用最多的继承模式，而且组合继承也保留了`instanceof`操作符和`isPrototypeOf()`方法识别合成对象的能力

弊端：存在效率问题，就是父类构造函数始终会被调用两次：一次是在赋值给子类原型时调用，另一次是在子类构造函数中调用。

### 3-4 原型式继承

基本思路：即使不自定义类型也可以通过原型实现对象之间的信息共享



```js
function object(o) {
    function F() {} // 创建一个临时构造函数F
    F.prototype = o // 构造函数F的原型指向o，说明F的实例对象能够访问到o的属性和方法
    return new F() // 返回构造函数F的实例对象
}
let person = { name: 'xiaoming', friends: ['xxx', 'yyy']}

let anotherPerson = object(person) // 返回一个对象，这个对象的[[Prototype]]指针指向o
anotherPerson.friends.push('zzz')
let yetAnotherPerson = object(person)
yetANotherPerson.friends.push('hhh')
console.log(person) // ['xxx', 'yyy', 'zzz', 'hhh']
// 实际上，object()是对传入的对象执行了一次浅复制
```

适用场景：

- 你有一个对象，想在它的基础上再创建一个新对象。你需要先把这个对象传入`object()`，然后再对返回的对象做相应的修改
- 适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。

`Object.create()`方法将原型式继承的概念规范化了。这个方法接收两个参数：第一个参数：作为新对象原型的对象；第二个参数（可选）：给新对象定义额外属性的对象。`当只有一个参数时，`Objcet.create()`和`object()`方法效果相同`

`Object.create()`的第二个参数与`Object.definedProperties()`的第二个参数一样：每个新增的属性都通过各自的描述符来描述。以这种方式添加的属性会遮蔽原型对象上的同名属性。

弊端：属性中包含的引用值类型始终会在各个实例之间共享，跟适用原型模式是一样的。

### 3-5 寄生式继承



```bash
寄生式继承与原型式继承比较接近。
```

基本思路：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象



```js
function object(o) {
   function F() {}
    F.prototype = o
    return new F()
}
function createAnother(original) {
   let clone = object(original) // 通过调用函数创建一个新对象
   clone.sayHi = function() {   // 以某种方式增强这个对象
           console.log('hi')       // 返回这个对象
   }
   return clone
}
let person = { name: 'xiaoming', friends: ['xxx', 'yyy'] }

let anotherPerson = createAnother(person)
anotherPerson.sayHi() // 'hi'
```

弊端：通过寄生式继承给对象添加函数会导致函数难以复用，与构造函数模式类似。（即每次创建实例都要重复创建方法）

### 3-6 寄生式组合继承

前面说到组合继承其实存在性能问题：父类构造函数最终会被调用两次。（第一次是在给子类原型赋值时调用；第二次是在子类构造函数里面调用）寄生式组合继承可以解决这个问题。

继承方法：组合继承（原型链继承+借用构造函数继承）+ 寄生式继承

基本思路：不通过调用父类构造函数来给子类原型赋值，而是通过取得父类原型的一个副本



```js
function object(o) {
 function F() {}
 F.prototype = o // 这里由于直接用对象赋值的形式重写原型对象，所以constructor的指向发生改变，指向该对象o
 return new F()
}
function inheritPrototype(subType, superType) {
 let prototype = object(superType.prototype) // 返回父类构造函数的一个副本
 prototype.constructor = subType   // 修改constructor的指向
 subType.prototype = prototype //
}

function SuperType(name) {
 this.name = name
 this.colors = ['red', 'yellow']
}
SuperType.prototype.sayName = function() {
 console.log(this.name)
}
function SubType(name, age) {
 SuperType.call(this, name)
 this.age = age
}
// SubType.prototype = new SuperType()
inheritPrototype(SubType, SuperType)
SubType.prototype.sayAge = function() {
 console.log(this.age)
}
```

这样的话就只调用一次父类构造函数，这样效率更高。而且原型链保持不变，因此`instanceof`操作符和`isPrototypeOf()`方法有效，所以寄生式组合继承可以算是引用类型继承的最佳方式。

## 4 类

`ES6`引入一个`class`关键字具有定义类的能力，是一个语法糖。`class`背后使用的仍然是原型和构造函数的概念。

### 4-1 类定义

定义类有两种主要方式：类声明和类表达式

类声明：`Class Person {}`

类表达式：`const Animal = class {}`

类声明不能提升

### 4-2 类构造函数

`constructor`关键字用于在类定义块的内部创建类的构造函数。方法名`constructor`会告诉解释器在使用`new`操作符创建类的新实例时，应该调用这个函数。

1. 实例化

- 调用类构造函数时必须使用`new`操作符，否则会报错。而普通构造函数如果不使用`new`，那就会以全局的`this`（通常是`window`）作为内部对象

- 类构造函数实例化之后，它会变为普通的实例方法（但是它作为类构造函数，仍然需要使用new调用）



  ```js
  class Person { // Person：类标识符
      constructor() {}  // constructor：类构造函数
  }
  let p1 = new Person()
  let p2 = new p1.constructor()
  ```

### 4-3 实例、原型和类成员



```bash
类的语法可以非常方便地定义应该存在于实例上的成员、应该存在于原型上的成员，以及应该存在于类本身的成员
```

1. 实例成员

每次通过`new`调用类标识符时，都会执行类构造函数。可以为新创建的实例`(this)`添加“自有”属性。没有限制是什么属性。

构造函数执行完毕后，仍然可以给实例继续添加新成员。

每个实例都对应一个`唯一`的成员对象，这意味着所有成员都不会在原型上共享。

1. 原型方法与访问器

为了在实例间共享方法，类定义语法把在类块中定义的方法作为原型方法。



```js
 class Person {
     constructor(name) {
         // 添加到this上面的所有内容都会存在于不同的实例上面
         this.name = name
     }
     // 在类块中定义的所有内容都会定义在类的原型上
     locate() {
         console.log('prototype')
     }
 }
 let p1 = new Person('Jack')
 let p2 = new Person('May')
 console.log(p1.name) // Jack
 console.log(p2.name) // May

 p1.locate() // prototype
 p2.locate() // prototype
```

类方法等同于对象属性，因此可以使用字符串，符号或者计算的值作为键。

类定义也支持获取和设置访问器。语法与行为跟普通对象一样



```js
class Person() {
     set name(newName) {
         this.name_ = newName
     }
     get name() {
         return this.name_
     }
 }
```

1. 静态类方法

可以在类上定义静态方法，与原型成员类似，静态成员每个类上只能有一个。使用`static`关键字作为前缀，`this`引用类自身。



```js
class Person () {
     ... 省略代码
     // 定义在类本身上
  static locate() {
         console.log('class')
     }
 }
```

1. 非函数原型和类成员的添加

虽然类定义不显示支持在原型上或类上添加成员数据，但在类定义的外部，可以通过手动来添加。

1. 迭代器与生成器方法

### 4-4 继承

1. 继承基础

`ES6`类支持单继承。使用`extends`关键字，不仅可以继承一个类，也可以继承普通的构造函数

派生类都会通过原型链访问到类和原型上定义的方法。`this`的值会反映调用相应方法的实例或者类。

1. 构造函数，`HomeObject`，`super()`

`super`关键字只能在派生类中使用，而且仅限于构造函数，实例方法和静态方法内部。

- 在构造函数中使用`super`可以调用继承的父类的构造函数



  ```js
  class Vehicle {
      constructor() {
          this.hasEngine = true
      }
  }
  class Bus extends Vehicle {
      constructor() {
          super()  // 相当于super.constructor()
          console.log(this.hasEngine) // true
          console.log(this) // Bus { hasEngine: true }
      }
  }
  new Bus()
  ```

- 在静态方法中使用`super`可以调用继承的父类上定义的静态方法



  ```js
  class Vehicle {
      static identify() {
          console.log('vehicle')
      }
  }
  class Bus extends Vehicle {
      static identify() {
          super.identify()
      }
  }
  Bus.identify() // vehicle
  ```

使用`super`注意事项：

- `super`只能在派生类构造函数和静态方法中使用。
- 不能单独引用`super`关键字，要么用它调用构造函数，要么用它引用静态方法
- 调用`super()`会调用父类构造函数，并将父类构造函数中返回的实例赋值给子类中的`this`



```js
class Father {
    constructor() {
        this.name = 'xiaoming'
    }
}
class Child extends Father {
    constructor() {
        super()
        console.log(this) // Child { name: 'xiaoming' }
    }
}
let c1 = new Child()
console.log(c1) // Child { name: 'xiaoming' }
```

- `super()`的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。



```js
class Father {
    constructor(name) {
        this.name = name
    }
}
class Child extends Father {
    constructor(name) {
        super(name)
    }
}
let c1 = new Child('Jack')
```

- 如果没有派生类中没有定义类构造函数，在实例化派生类时会自动调用`super()`，而且会自动传入所有传给派生类的参数



```js
class Father {
    constructor(name) {
        this.name = name
    }
}
class Child extends Father {}
let c1 = new Child('Jack')
```

- 在派生类构造函数中，不能在调用`super()`之前引用`this`
- 如果在派生类中`显式定义了构造函数`，则要么必须在其中调用`super()`，要么必须在其中返回一个对象



```js
class Father {
    constructor() {
        this.name = 'Jack'
    }
}
class Child extends Father {
    constructor() { // 显示定义了构造函数
        super();
    }
}
// 或者
class Child extends Father {
    constructor() {
        return {}
    }
}
```

3.抽象基类

可供其他类继承， 但本身不会被实例化。可以通过`new.target`来实现。另外可以通过抽象基类构造函数中进行检查，可以要求派生类必须定义某个方法。



```js
// 抽象基类
class Father {
    constructor() {
        if (new.target === Father) {
            throw new Error('Father cannot be directly instantiated')
        }
        if (!this.foo) {
            throw new Error('Inheriting class must define foo()')
        }
        console.log("success")
    }
}
// 派生类
class Child extends Father {
    foo() {}
}
new Child() // class Child {} // success
new Father() // class Father {}
// Error: Father cannot be directly instantiated
```