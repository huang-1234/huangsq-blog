# Object.create()Full

1. 语法：
    Object.create(proto, [propertiesObject])
    //方法创建一个新对象，使用现有的对象来提供新创建的对象的proto。
2. 参数：

- proto : 必须。表示新建对象的原型对象，即该参数会被赋值到目标对象(即新对象，或说是最后返回的对象)的原型上。该参数可以是`null`， `对象`， 函数的`prototype属性` （创建空的对象时需传null , 否则会抛出`TypeError`异常）。
- propertiesObject : 可选。 添加到新创建对象的可枚举属性（即其自身的属性，而不是原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应[`Object.defineProperties()`](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FdefineProperties)的第二个参数。
   3 返回值：
   在指定原型对象上添加新属性后的对象。

1. 案例说明：

## 1）创建对象的方式不同

new Object() 通过构造函数来创建对象, 添加的属性是在自身实例下。
 Object.create() es6创建对象的另一种方式，可以理解为继承一个对象, 添加的属性是在原型下。



```jsx
// new Object() 方式创建
var a = {  rep : 'apple' }
var b = new Object(a)
console.log(b) // {rep: "apple"}
console.log(b.__proto__) // {}
console.log(b.rep) // {rep: "apple"}

// Object.create() 方式创建
var a = { rep: 'apple' }
var b = Object.create(a)
console.log(b)  // {}
console.log(b.__proto__) // {rep: "apple"}
console.log(b.rep) // {rep: "apple"}
```

Object.create()方法创建的对象时，属性是在原型下面的，也可以直接访问 b.rep // {rep: "apple"} ,
 此时这个值不是吧b自身的，是它通过原型链proto## 来访问到b的值。



 ## 2）创建对象属性的性质不同



```jsx
// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p
//42

o.q = 12
for (var prop in o) {
   console.log(prop)
}
//"q"

delete o.p
//false
```

Object.create() 用第二个参数来创建非空对象的属性描述符默认是为false的，而构造函数或字面量方法创建的对象属性的描述符默认为true。

当用构造函数或对象字面量方法创建空对象时，对象时有原型属性的，即有`_proto_`;
 当用Object.create()方法创建空对象时，对象是没有原型属性的。





 ## 4）`__proto__` 属性
 JavaScript 的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。
 `__proto__`属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。目前只有浏览器环境必须部署有这个属性，其他运行环境不一定要部署，因此不建议使用这个属性，而是使用下面这些来 `Object.setPrototypeOf()`（写操作）、`Object.getPrototypeOf()`（读操作）、`Object.create()`（生成操作）代替。

- `Object.create()`
   描述：该方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`；
   格式：Object.create(proto[, propertiesObject])
   用法：如果用传统的方法要给一个对象的原型上添加属性和方法，是通过 `__propt__` 实现的



```dart
var proto = {
    y: 20,
    z: 40,
    showNum(){}
};
var o = Object.create(proto);
```

如果是不用Object,create()方法，我们是如何给对象原型添加属性和方法的？
 ------ 通过构造函数或者类，例如：



```jsx
//创建一个构造函数或者类
var People = function(){}
People.prototype.y = 20
People.prototype.showNum = function() {}
//通过构造函数创建实例
var p = new People();
console.log(p.__proto__ === People.prototype) // true
```



- `Object.setPrototypeOf`
   描述：该方法的作用与 `__proto__` 相同，用来设置一个对象的 `prototype` 对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
   格式：Object.setPrototypeOf(object, prototype)
   用法：



```dart
var proto = {
    y: 20,
    z: 40
};
var o = { x: 10 };
Object.setPrototypeOf(o, proto);
```

这样o对象的原型对象就是proto

输出结果中看出，添加的方法是在原型上的。就类似于



```bash
obj.__proto__ = proto;
```



- `Object.getPrototypeOf()`
   描述：用于读取一个对象的原型对象；
   格式：Object.getPrototypeOf(obj);
   用法：



```jsx
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true
```



 ## 4.1）原型属性的继承
 这里结合一个例子来说说这几个方法的使用：
 场景：拷贝一个构造函数的实例。



```jsx
var triangle = {a: 1, b: 2, c: 3};

function ColoredTriangle() {
  this.color = 'red';
}

//ColoredTriangle.prototype = triangle;  //ColoredTriangle.prototype.constructor === ColoredTriangle// false
Object.assign(ColoredTriangle.prototype, triangle) //ColoredTriangle.prototype.constructor === ColoredTriangle// true

var c = new ColoredTriangle();
```



其中 color 属性在实例上，而其他的原型上。
 现在来拷贝一个 实例 c2



```jsx
var c2 = Object.assign({},c)
console.log(c2.color); //red
console.log(c2.a); //undefined
```

因为 Object.assing 是不能拷贝到继承或原型上的方法的。所以 实例c2 没有 a 这个属性。那要怎么要才能拷贝到原型上的方法呢？

## 4.1.1）第一种方法



```jsx
var originProto = Object.getPrototypeOf(c);
var originProto2 = Object.create(originProto);
var c2 = Object.assign(originProto2, c);
//var c2 = Object.assign(Object.create(Object.getPrototypeOf(c)), c)

console.log(c2.color); // red
console.log(c2.a); // 1
```

这样就实现了原型属性的拷贝。
 Object.getPrototypeOf(c) 既  originProto  得到的是原型上的 //{a: 1, b: 2, c: 3}；
 Object.create(originProto) 既  originProto2 既是创建了一个 {a: 1, b: 2, c: 3} 在原型上的新对象；
 Object.assign(originProto2, c) 在源对象originProto2 上合并对象 c；

## 4.1.2）第二种方法 （推荐）



```jsx
var c = new ColoredTriangle();
var c2 = Object.create(Object.getPrototypeOf(c), Object.getOwnPropertyDescriptors(c));

console.log(c2.color); // red
console.log(c2.a); // 1
```

可以把Object.create()的参数理解为：第一个参数是放在新对象的原型上的，第二个参数是放在新对象的实例上的。
 所以上面例子
 Object.getPrototypeOf() 得到的是 c 对象的原型，然后作为第一个参数，所以会在新对象c2 的原型上。
 Object.getOwnPropertyDescriptors() 得到是 c 对象自身的可枚举属性，作为第二个参数，放在 c2 的实例上。

为什么说推荐这个方法呢？*因为Object.assign() 方法不能正确拷贝 get ，set 属性。*

例如，我们给 c 实例添加一个 "colorGet" 属性，并设置该属性的get 描述符：



```jsx
var c = new ColoredTriangle();
Object.defineProperty(c,'colorGet', {
    enumerable: true, // 设为可枚举，不然 Object.assign 方法会过滤该属性
    get(){
        return "Could it return " + this.color
    }
});

var c3 = Object.assign(Object.create(Object.getPrototypeOf(c)), c)
```

这里没有拷贝到  "colorGet" 的 get 描述符，而是直接把获取到的值赋值给  "colorGet" 。

那对于 get 描述符要怎么获取呢？ Object.getOwnPropertyDescriptors就专为解决这问题而生。
 而又因为要拷贝原型上的属性，所以结合Object.create、Object.getPrototypeOf 方法一起使用。即上面的第二种实现方法，如下：



```jsx
var c = new ColoredTriangle();
Object.defineProperty(c,'colorGet', {
    enumerable: true, // 设为可枚举，不然 Object.assign 方法会过滤该属性
    get(){
        return "Could it return " + this.color
    }
});

var c3 = Object.create(Object.getPrototypeOf(c), Object.getOwnPropertyDescriptors(c));
```

此时已经成功的拷贝到了get描述符啦。
 虽然说实际开发上很少会要去修改 get 描述符，但是知道多一种方法，遇到这种情况时就知道该怎么去解决了。

注意：*这些都只是一个层级的深拷贝。*



------



 上面实现 原型属性拷贝 中的两种方法中用到了 `Object.getOwnPropertyDescriptors` 、`Object.assing()` 、`Object.create`、`Object.getPrototypeOf()`方法，通常这几种方法都有一起结合使用。
 如果上面的例子还不理解，这里把他简单的拿到 *对象的继承* 来讲解。理解的话就可以忽略啦。



 ## 4.2）原型属性的继承
 以前，继承另一个对象，常常写成下面这样。



```cpp
const obj = {
  __proto__: prot,
  foo: 123,
};
```

ES6 规定`__proto__`只有浏览器要部署，其他环境不用部署。如果去除`__proto__`，可以用 Object.create() 和 Object.assign() 来实现。



```dart
//现在可以这样写 方法1
const obj = Object.create(prot);
obj.foo = 123;


// 或者  方法2
const obj = Object.assign(
  Object.create(prot),
  {
    foo: 123,
  }
);


// 或者 方法3
const obj = Object.create(prot,Object.getOwnPropertyDescriptors({ foo: 123 }));
```

但是 Object.assign() 无法正确拷贝get属性和set属性的问题。例如：



```kotlin
var prot = {x: 1, y: 2}
var obj = {
  __proto__: prot,
  foo: 100,
  bar(){ return this.foo},
  get baz() {return this.foo}
};

var obj2 = Object.assign(Object.create(prot), obj)
```

上图中，obj 对象的 foo 属性是一个取值函数，Object.assign不会复制这个取值函数，只会拿到值以后，将这个值赋上去。

而 Object.getOwnPropertyDescriptors() 可以解决这个问题 实现get 、set 属性的正确拷贝，即方法3 ，如下：



```kotlin
var prot = {x: 1, y: 2}
var obj = {
  __proto__: prot,
  foo: 100,
  bar(){ return this.foo},
  get baz() {return this.foo}
};

var obj2 = Object.create(prot, Object.getOwnPropertyDescriptors(obj))
```


 说了那么多种拷贝方法，怎么去选择呢，还是要看实际应用中的情况:

如果只是拷贝 自身可枚举属性，就可以只用 Object.assign 方法；
 如果是要拷贝原型上的属性，就需要 Object.assign , Object.create, Object.getPrototypeOf 方法结合使用
 如果是拷贝get /set 属性，就需要 结合 Ojbect.getOwnPropertyDescriptors 方法



作者：liwuwuzhi
链接：https://www.jianshu.com/p/28d85bebe599
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。