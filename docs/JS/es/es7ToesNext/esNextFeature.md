# esNext 新特性

JS语法 ES6、ES7、ES8、ES9、ES10、ES11、ES12新特性

本文集合了 ES6 至 ES11 常用到的特性，包括还在规划的 ES12，只列举大概使用，详细介绍的话内容量将十分巨大~.~。PS：使用新特性需要使用最新版的 bable 就行转义

## ES6（2015）

### 1. 类（class）

```bash
class Man {
  constructor(name) {
    this.name = '小豪';
  }
  console() {
    console.log(this.name);
  }
}
const man = new Man('小豪');
man.console(); // 小豪
```

### 2. 模块化(ES Module)

```bash
// 模块 A 导出一个方法
export const sub = (a, b) => a + b;
// 模块 B 导入使用
import { sub } from './A';
console.log(sub(1, 2)); // 3
```

### 3. 箭头（Arrow）函数

```bash
const func = (a, b) => a + b;
func(1, 2); // 3
```

### 4. 函数参数默认值

```bash
function foo(age = 25,){ // ...}
```

### 5. 模板字符串

```bash
const name = '小豪';
const str = `Your name is ${name}`;
```

### 6. 解构赋值

```bash
let a = 1, b= 2;
[a, b] = [b, a]; // a 2  b 1
```

### 7. 延展操作符

```bash
let a = [...'hello world']; // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
```

### 8. 对象属性简写

```bash
const name='小豪',
const obj = { name };
```

### 9. Promise

```bash
Promise.resolve().then(() => { console.log(2); });
console.log(1);
// 先打印 1 ，再打印 2
```

### 10. let和const

```bash
let name = '小豪'；
const arr = [];
```

## ES7（2016）

### 1. Array.prototype.includes()

```bash
[1].includes(1); // true
```

### 2. 指数操作符

```bash
2**10; // 1024
```

## ES8（2017）

### 1. async/await

异步终极解决方案

```bash
async getData(){
    const res = await api.getTableData(); // await 异步任务
    // do something    
}
```

### 2. Object.values()

```bash
Object.values({a: 1, b: 2, c: 3}); // [1, 2, 3]
```

### 3. Object.entries()

```bash
Object.entries({a: 1, b: 2, c: 3}); // [["a", 1], ["b", 2], ["c", 3]]
```

### 4. String padding

```bash
// padStart
'hello'.padStart(10); // "     hello"
// padEnd
'hello'.padEnd(10) "hello     "
```

### 5. 函数参数列表结尾允许逗号

### 6. Object.getOwnPropertyDescriptors()

> 获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。

### 7. SharedArrayBuffer对象

> SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，

```bash
/**
 * 
 * @param {*} length 所创建的数组缓冲区的大小，以字节(byte)为单位。  
 * @returns {SharedArrayBuffer} 一个大小指定的新 SharedArrayBuffer 对象。其内容被初始化为 0。
 */
new SharedArrayBuffer(10)
```

### 8. Atomics对象

> Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。

**ES7**只有2个特性:

- [includes()](https://link.segmentfault.com/?enc=mZfEElOSWNEulRnHFrjYOw%3D%3D.7X3ZChUjIxS2AG3VYfoWnZHmyee8AmzU5UtkoiDPwE32gCxszVkLWD1vIChoSG04f5FC7jN%2B4svneAEoxIvSOUno5ODOrnwJhnLHqmobfnpH0FoHIPng75%2BxoX4VtX4v)
- 指数操作符

**ES8**尚未发布(2017年1月)，下面是它已经完成起草的一些特性：

- [Object.values()](https://link.segmentfault.com/?enc=jLJh%2Bjn78JqZchQXutkgdA%3D%3D.31OvWvZ02OCpbwUSP2nfbfFB4SOBgOcWq%2F7SYCHzrbsV4AB6lT4u4Z1viTFXH4JGuKc89eBLjpTPz8ui9OWE0Em00lprG2hoI2nokFYlrFUrurZe9K0qzphBauuMeDxk)
- [Object.entries()](https://link.segmentfault.com/?enc=bXLkPyXkEBINDesCv01e%2FQ%3D%3D.%2FcbCplpo9Wy1zGEqtyaQuhMFFyR%2FKA4YezMRFSlm6TDRR%2FqhlsKWVVDfdL0cqfguh4S2OjCRpRMrlHH8AATAMrAv9VdzaoLuWKPYaitV5xM508nlBNfnJTaBl6aNzpTl)
- [padStart()](https://link.segmentfault.com/?enc=OMRTfmcVNMeokGUKUhxe1w%3D%3D.l4lwkQS%2FMjq41n1NGuJmiB7miIyPQvXm37AqvHB%2FlavUU0jgsvCvPhyF%2B3rZnkWFa1N1QlqPFDCdAa0xpRHf3%2FczzXwA1q69oYkj39%2FyuOcEcr44fNxCgTNFvPTzJzsSI%2FPFuPRU2qxtU%2FQynW5KnQ%3D%3D)
- [padEnd()](https://link.segmentfault.com/?enc=GL2yFQ2%2BFeoJdC82CVTmsg%3D%3D.LmMnjp7NsX2zCJvxWIoq4lDNlguUKKy3NioZ6CSbltLDyqKyHlkJaHL2MhyDj6VMw6pL%2F9sVn5FpsI%2FH39qI4HnJUF6wz1SKByrPfBlL1iZm6uPoAcnpdTZ01qxn%2FCiL)
- [Object.getOwnPropertyDescriptors()](https://link.segmentfault.com/?enc=I0roEJUcl2tW8vO8Rc4MuQ%3D%3D.IC3bth6a1%2BvoswXGTmB457HwQAWhAlyZ4ZkEvoi1ETODojQ1u7RM6cKK25%2FORAlcRNA3hP0YKyJ7JEKOjkHjpFujt7lBP5mEV5fcvhtd1k81hq3ewuRpBcTmM8QWngLGfOxrPRpK9PUON7OHXPxXp6NiXFV7x1au5Zi3evf184g%3D)
- 函数参数列表结尾允许逗号
- Async/Await

### Array.prototype.includes()

#### 不使用ES7

使用[indexOf()](https://link.segmentfault.com/?enc=b7xGdoSyDJKyS6nrm0opUQ%3D%3D.p8lUDwIaMtfLRffF%2Brbt1N8TPI3QiPcIg6WlxT1b1VpONG93jBEGaugR5R0shqF641hwhJYv7vb7esxpxzXdDHVfn14PF24EqIMFeX48NLUb388t508vW7iZXKgY660T)验证数组中是否存在某个元素，这时需要根据返回值是否为**-1**来判断：

```javascript
let arr = ['react', 'angular', 'vue'];

if (arr.indexOf('react') !== -1)
{
    console.log('React存在');
}
```

#### 使用ES7

使用[includes()](https://link.segmentfault.com/?enc=fnU4m4C0gzEYDZRrfafmJg%3D%3D.sykiIlvKj%2BUCqxw%2FhtNfmY3oLV2RPevNJv48vo6YLEaWk2bWrGYnbH%2BOFZfOPHABEP5xttV36XVTrXdh7uKoJ%2FdUPimxZEfZmZHMf%2FGhvBeBDFK3YcA%2FtBMnq3JR3Q%2BU)验证数组中是否存在某个元素，这样更加直观简单：

```javascript
let arr = ['react', 'angular', 'vue'];

if (arr.includes('react'))
{
    console.log('React存在');
}
```

### 指数操作符

#### 不使用ES7

使用自定义的递归函数**calculateExponent**或者[Math.pow()](https://link.segmentfault.com/?enc=lKBbJD%2FzuCwjP%2B3R0fD61Q%3D%3D.RuGh%2F5i6d53VpQwOK%2Bu4nr5rUv1pccMuX7uo4d10ZAY4e3%2Ftg7LAxjDPCiP5sqn9hACMPTk7hJ8U0da%2FwqsLgXPEPiY3xZIT6rctQDZ5xh8p5B2Ceb%2Ff4P4XifaERQ7z)进行指数运算：

```javascript
function calculateExponent(base, exponent)
{
    if (exponent === 1)
    {
        return base;
    }
    else
    {
        return base * calculateExponent(base, exponent - 1);
    }
}

console.log(calculateExponent(7, 3)); // 输出343
console.log(Math.pow(7, 3)); // 输出343
```

#### 使用ES7

使用指数运算符，就像**+**、**-**等操作符一样：

```javascript
console.log(7**3);
```

### Object.values()

#### 不使用ES8

使用[Object.keys()](https://link.segmentfault.com/?enc=cYyc6OfgW0zB7cO6YeltLA%3D%3D.J5g0%2FmO7JD9gOLuGhmewDdWpgHjwovqgWAOme%2FSh5ekhIPTktiLW55vPj2NdK%2BCSUb1v3W5Q7W18vQfiBrLatckBrIHZtCZLBi1jwLH%2FsFNo2uG0r9wiVs3NaIFsshAh)遍历对象的属性值，需要通过属性名**key**去获取属性值：

```javascript
let obj = {a: 1, b: 2, c: 3};

Object.keys(obj).forEach((key) =>
{
    console.log(obj[key]); // 输出1, 2, 3
});
```

#### 使用ES8

使用[Object.values()](https://link.segmentfault.com/?enc=hBOaIdmRHVP4kCkpor7iMQ%3D%3D.QrI0RoLHlnqJ7aO0wUIlH2TC%2BgdP0T%2BOYD5nXHYpphuMsAM65pOoHrdSS04yg39ziekkN1TkVihAFDKgez4PzhDhb5uDUwKIEOOzOmX%2F78Cw4euXAgLcwhELJFncWorM)遍历对象的属性值，无需使用使用属性名：

```javascript
let obj = {a: 1, b: 2, c: 3}

Object.values(obj).forEach((value) =>
{
    console.log(value); // 输出1, 2, 3
});
```

### Object.entries()

#### 不使用ES8

使用[Object.keys()](https://link.segmentfault.com/?enc=qMFsLL5Yyw28meTEhVeTYA%3D%3D.NENecAAtQI9GSuNgYrpNRAtTk5TSetRjvvEA05xVN%2FIhH5Ya0g9xPR48QRMilsE5d60Bxos5CloDDV0G1p4DdqqzhME7uGrOr6LQpgWTf2L55p0GXedP%2BxA5I3LHimbu)遍历对象的属性名和属性值：

```javascript
let obj = {a: 1, b: 2, c: 3};

Object.keys(obj).forEach((key) =>
{
    console.log(key + ": " + obj[key]); // 输出a: 1, b: 2, c: 3
})
```

#### 使用ES8

使用[Object.entries()](https://link.segmentfault.com/?enc=O48geOABnFSC0kx83ZZIbA%3D%3D.b3t8diNbUOUTpRA06e5uOlOdbyZ4izF1o1%2BKmhXrr5cM5dAk1%2B5%2F7hOEmGq8sOvxqc8uWcMqK2ljRF%2Ft9HgjtwkS9QG3Yogb7PSvwBvZtwrqXGbeXxt4RghdASKlK3vF)遍历对象的属性名和属性值：

```javascript
let obj = {a: 1, b: 2, c: 3};

Object.entries(obj).forEach(([key, value]) =>
{
    console.log(key + ": " + value); // 输出a: 1, b: 2, c: 3
})
```

### padStart()

#### 不使用ES8

```javascript
console.log('0.00')             
console.log('10,000.00')    
console.log('250,000.00')  
```

输出结果如下：

```apache
0.00
10,000.00
250,000.00
```

#### 使用ES8

使用[padStart()](https://link.segmentfault.com/?enc=67v%2BBcf%2BJKkq947YaEfGcw%3D%3D.t8KieOlB1KHjp8PuaUzewwSsdfiRfXbLC6jbdrQQPe3lnQxRsYYkMc3zAJAUl521j6Swv%2FCjDJoh0h00SJjScFrZOVE%2FKaDkdT4tliEl1Y0iUBHp52pJJDV7ZhKe1QToWbYXT6rQZg7SgsVDMD72Fg%3D%3D)可以在字符串前面填充指定的字符串：

```javascript
console.log('0.00'.padStart(20))             
console.log('10,000.00'.padStart(20))    
console.log('250,000.00'.padStart(20))    
```

输出结果如下：

```apache
                0.00
           10,000.00
          250,000.00
```

### padEnd()

#### 不使用ES8

```javascript
console.log('0.00 ' + '0.00' )             
console.log('10,000.00 ' + '10,000.00' )    
console.log('250,000.00 ' + '250,000.00')  
```

输出如下：

```javascript
0.00 0.00
10,000.00 10,000.00
250,000.00 250,000.00
```

#### 使用ES8

使用[padEnd()](https://link.segmentfault.com/?enc=K%2Fj80ECtFBMTiWmGSGe%2BRw%3D%3D.3T53X4baX8JoGtIqjIIAvhGpi8wJjQcZrYCCJGy8kSPNKg7LfzEEnNyeagfE4PLJp9ekvlEvpXDPvFWc9sQVJU%2BWcyAxAdiHtcBmKdi3hV5x4wjHlVDd%2Bd0wM8AAsQGF)可以在字符串后面填充指定的字符串：

```javascript
console.log('0.00'.padEnd(20) + '0.00' )             
console.log('10,000.00'.padEnd(20) + '10,000.00' )    
console.log('250,000.00'.padEnd(20) + '250,000.00')  
```

输出如下：

```apache
0.00                0.00
10,000.00           10,000.00
250,000.00          250,000.00
```

### Object.getOwnPropertyDescriptors()

**azatsBooks**对象的定义如下：

```javascript
let azatsBooks = {
    books: ['React Quickly'],
    get latest()
    {
        let numberOfBooks = this.books.length;
        if (numberOfBooks == 0) return undefined;
        return this.books[numberOfBooks - 1];
    }
};
```

#### 不使用ES8

使用[Object.getOwnPropertyDescriptor()](https://link.segmentfault.com/?enc=034PGI5pxRw5MhESUAueRg%3D%3D.ashxHbzixG1E7TxgFBtLAv4Du9kpmW4%2Fva50tUmP9GEr0R63GEcrFJdWMs5TFD0AdZaJ7Hk7RwyWQqyd65HRiWO95xoKg8%2FEP4cA0sIUT4cytU8HjPFIPNBUOqnrx1fpA7QVeC%2FMD5uQgx%2B2nCkbdFpC7pCbhFZW68a8GmDgFIY%3D)获取单个属性的属性描述符。

获取**azatsBooks**对象的**books**属性的属性描述符：

```javascript
console.log(Object.getOwnPropertyDescriptor(azatsBooks, 'books'));

/** 输出books属性的属性描述
[object Object] {
  configurable: true,
  enumerable: true,
  value: ["React Quickly"],
  writable: true
}
**/
```

获取**azatsBooks**对象的**lastest**方法的属性描述符：

```javascript
console.log(Object.getOwnPropertyDescriptor(azatsBooks, 'latest'));

/** 输出lastest方法的属性描述
[object Object] {
  configurable: true,
  enumerable: true,
  get: function get latest() {
    let numberOfBooks = this.books.length
    if (numberOfBooks == 0) return undefined
    return this.books[numberOfBooks - 1]
  },
  set: undefined
}
**/
```

#### 使用ES8

[Object.getOwnPropertyDescriptors()](https://link.segmentfault.com/?enc=CdErcGBsqz2bq%2FSViY4WxQ%3D%3D.kSYvoVwaawxJjY%2BOAAr%2BLRAiRyzm8vvtU6AvN1Inahdq%2FAtMTJAbPTXIqtczkTVWCH5f2lDyiMZxfOK98nPhGPia6QgUAMhIyjmcjb4xwaA%2FlsviYvCzzdGfBacZpXjUmFUS%2Bce2rH9grEIjWCnBRpIf6SNIDe8PJ72iZGH7aZI%3D)相当于[Object.getOwnPropertyDescriptor()](https://link.segmentfault.com/?enc=zWrw9y2KiV9ifbl5%2FyyByg%3D%3D.Vjic929iE7ZaMyPtCwaS403x40GNIchHcu%2BH%2FqJmAgdfOxmP5QiJxcAkCIKgl2NRNwoGqzW9roZZ5tVm3XfFz9uWL0N2r3vXjiV5q17yaG5EEbAiaUPBskB5MGwKtaowmRTYvgqClszxpXr4bQXoaYQudJ3oO0OPHZYnUIBx4zY%3D)的复数形式，可以获取对象的所有自身属性的描述符：

```javascript
console.log(Object.getOwnPropertyDescriptors(azatsBooks))

/** 输出azatsBooks对象所有自身属性的属性描述
[object Object] {
  books: [object Object] {
    configurable: true,
    enumerable: true,
    value: ["React Quickly"],
    writable: true
  },
  latest: [object Object] {
    configurable: true,
    enumerable: true,
    get: function get latest() {
      let numberOfBooks = this.books.length
      if (numberOfBooks == 0) return undefined
      return this.books[numberOfBooks - 1]
    },
    set: undefined
  }
}
**/
```

### 函数参数列表结尾允许逗号

#### 不使用ES8

```javascript
var f = function(a,
  b,
  c,
  d // d之后不能带逗号
   ) { 
  console.log(d)
}
```

#### 使用ES8

```javascript
var f = function(a,
  b,
  c,
  d, // d之后允许带逗号
) { 
  console.log(d)
}
```

允许逗号之后，可以避免一些不必要的报错。(如果你希望实时监控JavaScript应用的错误，欢迎免费使用[Fundebug](https://link.segmentfault.com/?enc=Wg9NXIgvWN3bbSFKwFC9oA%3D%3D.c%2BGTOqI5M58bTLx5tffVtVtFnDiHBDh9JzCUKy3U9jA%3D))

### Async/Await

#### 使用Promise

使用**Promise**写异步代码，会比较麻烦：

```javascript
axios.get(`/q?query=${query}`)
    .then(response => response.data)
    .then(data =>
    {
        this.props.processfetchedData(data);
    })
    .catch(error => console.log(error));
```

#### 使用Async/Await

**Async/Await**使得异步代码看起来像同步代码，这正是它的魔力所在：

```javascript
async fetchData(query) =>
{
    try
    {
        const response = await axios.get(`/q?query=${query}`);
        const data = response.data;
        return data;
    }
    catch (error)
    {
        console.log(error)
    }
}

fetchData(query).then(data =>
{
    this.props.processfetchedData(data)
})
```

## ES9（2018）

### 1. 异步迭代

await可以和for...of循环一起使用，以串行的方式运行异步操作

```bash
async function process(array) {
  for await (let i of array) {
    // doSomething(i);
  }
}
```

### 2. Promise.finally()

```bash
Promise.resolve().then().catch(e => e).finally();
```

### 3. Rest/Spread 属性

```bash
const values = [1, 2, 3, 5, 6];
console.log( Math.max(...values) ); // 6
```

### 4. 正则表达式命名捕获组

```bash
const reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const match = reg.exec('2021-02-23');
```

### 5. 正则表达式反向断言

```bash
(?=p)、(?<=p)  p 前面(位置)、p 后面(位置)
(?!p)、(?<!p>) 除了 p 前面(位置)、除了 p 后面(位置)
(?<=w)
```



(?<!w)

### 6. 正则表达式dotAll模式

> 正则表达式中点.匹配除回车外的任何单字符，标记s改变这种行为，允许行终止符的出现

```bash
/hello.world/.test('hello\nworld');  // false
```

## ES10（2019）

### 1. Array.flat()和Array.flatMap()

flat()

```bash
[1, 2, [3, 4]].flat(Infinity); // [1, 2, 3, 4]
```

flatMap()

```bash
[1, 2, 3, 4].flatMap(a => [a**2]); // [1, 4, 9, 16]
```

### 2. String.trimStart()和String.trimEnd()

去除字符串首尾空白字符

### 3. String.prototype.matchAll

> matchAll（）为所有匹配的匹配对象返回一个迭代器

```bash
const raw_arr = 'test1  test2  test3'.matchAll((/t(e)(st(\d?))/g));
const arr = [...raw_arr];
```

### 4. Symbol.prototype.description

> 只读属性，回 Symbol 对象的可选描述的字符串。

```bash
Symbol('description').description; // 'description'
```

### 5. Object.fromEntries()

> 返回一个给定对象自身可枚举属性的键值对数组

```bash
// 通过 Object.fromEntries， 可以将 Map 转化为 Object:
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
console.log(Object.fromEntries(map)); // { foo: "bar", baz: 42 }
```

### 6. 可选 Catch

## ES11（2020）

### 1. Nullish coalescing Operator(空值处理)

表达式在 ?? 的左侧 运算符求值为undefined或null，返回其右侧。

```bash
let user = {
    u1: 0,
    u2: false,
    u3: null,
    u4: undefined
    u5: '',
}
let u2 = user.u2 ?? '用户2'  // false
let u3 = user.u3 ?? '用户3'  // 用户3
let u4 = user.u4 ?? '用户4'  // 用户4
let u5 = user.u5 ?? '用户5'  // ''
```

### 2. Optional chaining（可选链）

?.用户检测不确定的中间节点

```bash
let user = {}
let u1 = user.childer.name // TypeError: Cannot read property 'name' of undefined
let u1 = user.childer?.name // undefined
```

### 3. Promise.allSettled

> 返回一个在所有给定的promise已被决议或被拒绝后决议的promise，并带有一个对象数组，每个对象表示对应的promise结果

```bash
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => reject('我是失败的Promise_1'));
const promise4 = new Promise((resolve, reject) => reject('我是失败的Promise_2'));
const promiseList = [promise1,promise2,promise3, promise4]
Promise.allSettled(promiseList)
.then(values=>{
  console.log(values)
});
```

### 4. import()

按需导入

### 5. 新基本数据类型BigInt

> 任意精度的整数

### 6. globalThis

- 浏览器：window
- worker：self
- node：global

## ES12（2021）

### 1. replaceAll

> 返回一个全新的字符串，所有符合匹配规则的字符都将被替换掉

```bash
const str = 'hello world';
str.replaceAll('l', ''); // "heo word"
```

### 2. Promise.any

> Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise

```bash
const promise1 = new Promise((resolve, reject) => reject('我是失败的Promise_1'));
const promise2 = new Promise((resolve, reject) => reject('我是失败的Promise_2'));
const promiseList = [promise1, promise2];
Promise.any(promiseList)
.then(values=>{
  console.log(values);
})
.catch(e=>{
  console.log(e);
});
```

### 3. WeakRefs

> 使用WeakRefs的Class类创建对对象的弱引用(对对象的弱引用是指当该对象应该被GC回收时不会阻止GC的回收行为)

当我们通过（const、let、var）创建一个变量时，垃圾收集器GC将永远不会从内存中删除该变量，只要它的引用仍然存在可访问。WeakRef对象包含对对象的弱引用。对对象的弱引用是不会阻止垃圾收集器GC恢复该对象的引用，则GC可以在任何时候删除它。

WeakRefs在很多情况下都很有用，比如使用Map对象来实现具有很多需要大量内存的键值缓存，在这种情况下最方便的就是尽快释放键值对占用的内存。

目前，可以通过*WeakMap*()或者*WeakSet*()来使用*WeakRefs*

举个栗子

我想要跟踪特定的对象调用某一特定方法的次数，超过1000条则做对应提示

```javascript
let map = new Map()
function doSomething(obj){
	...
}
function useObject(obj){
	doSomething(obj)
  
  let called = map.get(obj) || 0
  called ++ 
  
  if(called>1000){
     console.log('当前调用次数已经超过1000次了，over')
  }
  
  map.set(obj, called)
}
复制代码
```

如上虽然可以实现我们的功能，但是会发生内存溢出,因为传递给doSomething函数的每个对象都永久保存在map中，并且不会被GC回收，因此我们可以使用*WeakMap*

```javascript
let wmap = new WeakMap()
function doSomething(obj){
	...
}
function useObject(obj){
	doSomething(obj)
  
  let called = wmap.get(obj) || 0
  
  called ++
  
  if(called>1000){
     console.log('当前调用次数已经超过1000次了，over')
  }
  
  wmap.set(obj, called)
}
复制代码
```

因为是弱引用，所以WeakMap、WeakSet的键值对是*不可枚举*的

WeakSet和WeakMap相似，但是每个对象在WeakSet中的每个对象只可能出现一次，WeakSet中所有对象都是唯一的

```javascript
let ws = new WeakSet()
let foo = {}
let bar = {}

ws.add(foo)
ws.add(bar)

ws.has(foo) //true
ws.has(bar) //true

ws.delete(foo) //删除foo对象
ws.has(foo) //false 已删除
ws.has(bar) //仍存在
复制代码
```

*WeakSet*与*Set*相比有以下两个区别

- WeakSet只能是对象集合，而不能是任何类型的任意值
- WeakSet弱引用，集合中对象引用为弱引用，如果没有其他对WeakSet对象的引用，则会被GC回收

最后，*WeakRef*实例有一个方法*deref*，返回引用的原始对象，如果原始对象被回收，则返回*undefined*

```javascript
const cache = new Map();

const setValue =  (key, obj) => {
  cache.set(key, new WeakRef(obj));
};

const getValue = (key) => {
  const ref = cache.get(key);
  if (ref) {
    return ref.deref();
  }
};

const fibonacciCached = (number) => {
  const cached = getValue(number);
  if (cached) return cached;
  const sum = calculateFibonacci(number);
  setValue(number, sum);
  return sum;
};
复制代码
```

对于缓存远程数据来说，这可能不是一个好主意，因为远程数据可能会不可预测地从内存中删除。在这种情况下，最好使用LRU之类的缓存。



### 4. 逻辑运算符和赋值表达式

> 逻辑运算符和赋值表达式，新特性结合了逻辑运算符（&&，||，??）和赋值表达式而JavaScript已存在的 复合赋值运算符有：

- 操作运算符：+= -= *= /= %= **=
- 位操作运算符：&= ^= |=
- 按位运算符：<<= >>= >>>=

```bash
a ||= b
//等价于
a = a || (a = b)

a &&= b
//等价于
a = a && (a = b)

a ??= b
//等价于
a = a ?? (a = b)
```

### ??=可用来补充/初始化缺失的属性

```javascript
const pages = [
  {
  	title:'主会场',
    path:'/'
  },
  {
    path:'/other'
  },
  ...
]
  
for (const page of pages){
	page.title ??= '默认标题'
}
console.table(pages)
//(index)  title       		path
//0        "主会场"   	  "/"
//1        "默认标题"  	 "/other"
复制代码
```

### 小结：

- &&=：当LHS值存在时，将RHS变量赋值给LHS
- ||=：当LHS值不存在时，将RHS变量赋值给LHS
- ??= ：当LHS值为null或者undefined时，将RHS变量赋值给LHS

### 5. 数字分隔符

> 数字分隔符，可以在数字之间创建可视化分隔符，通过_下划线来分割数字，使数字更具可读性

```bash
const money = 1_000_000_000;
//等价于
const money = 1000000000;

1_000_000_000 === 1000000000; // true
```