# 对象枚举



## 枚举keys

>  Object.keys,Object.getOwnPropertyNames,for in





```js
// 定义一个类，原型上有gender属性，和sayHi方法。
const Person = function () {}

Person.prototype = {
  gender: 'male',
  sayHi: function () {}
}

var people = new Person()
people.name = 'xiaoming';
people.age = 20;

Object.defineProperties(people, {
    weight: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: 100,
    },
    height: {
        writable: true,
        configurable: true,
        enumerable: false,
        value: 170,
    }
})
/*
最终people对象属性如下
{
  age: 20,
  name: 'xiaoming',
  weight: 100,
  height: 170,
  __proto__ {
    gender: 'male',
    sayHi: function sayHi() {}
  }
}
*/
```

|                            | 对象自身可枚举属性 | 对象自身不可枚举属性 | 原型上可枚举属性 | 原型上不可枚举属性 |
| :------------------------- | :----------------- | :------------------- | :--------------- | :----------------- |
| for...in                   | ✅                  | ❌                    | ✅                | ❌                  |
| Object.keys                | ✅                  | ❌                    | ❌                | ❌                  |
| Object.getOwnPropertyNames | ✅                  | ✅                    | ❌                | ❌                  |

`总结`

- `for...in`循环遍历对象`自身`的和继承自`原型`的`可枚举属性`（不含Symbol属性）。
- `Object.keys`返回一个数组，包括对象`自身`的（不含继承的）所有`可枚举属性`（不含Symbol属性）。
- `Object.getOwnPropertyNames`返回一个数组，包含对象`自身的所有属性`（不含Symbol属性，但是包括不可枚举属性）。