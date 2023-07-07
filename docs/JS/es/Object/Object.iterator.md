# 遍历对象

首先我们来看看遍历对象到底有哪些方法，

三七二十一，先来总结一波：

ES6 一共有 5 种方法可以遍历对象的属性。

`（1）for...in`

`for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

`（2）Object.keys(obj)`

`Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

`（3）Object.getOwnPropertyNames(obj)`

`Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

`（4）Object.getOwnPropertySymbols(obj)`

`Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有 Symbol 属性的键名。

`（5）Reflect.ownKeys(obj)`

`Reflect.ownKeys`返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

```javascript
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```

> 什么，你对上面的方法还是一知半解，那下面让我给你一一细细道来

上面代码中，`Reflect.ownKeys`方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性`2`和`10`，其次是字符串属性`b`和`a`，最后是 Symbol 属性。

1. for … in 循环遍历对象自身的和继承的可枚举属性(循环遍历对象自身的和继承的可枚举属性(不含 Symbol 属性).). 这个应该好理解，不多说。

2. 使用 Object.keys()遍历

> (返回一个数组,包括对象自身的(不含继承的)所有可枚举属性(不含 Symbol 属性).).

3. 3.Object.getOwnPropertyNames(obj)

> 返回一个数组,包含对象自身的所有属性(不含 Symbol 属性,但是包括不可枚举属性).

```js
const checkedElement = {
  name: 'allowUnfold',
  label: '允许折叠'，
  type: 'checked'
  defafult: false
};
Object.getOwnPropertyNames(checkedElement).forEach(function(key){
  console.log(key,obj[key]);
});
```

4. 使用 Reflect.ownKeys(obj)遍历

> 返回一个数组,包含对象自身的所有属性,不管属性名是 Symbol 或字符串,也不管是否可枚举.

```js
const numbersElement = {
  name: 'order',
  label: '展示项序号'，
  type: 'number'
}

Reflect.ownKeys(numbersElement).forEach(function(key){
console.log(key,obj[key]);
});
```

5. 5

6. 6

7. 7

8. 8

9. 9

10. 10

## Object.keys 遍历(forEach/map)对象数组，合并

js 中几种遍历对象的方法，包括 for..of、for..in、Object.keys、Object.getOwnProperty,它们在使用场景方面各有不同。

js 对象的属性中可直接用、可访问到的属性分为数据属性和访问器属性。

### 数据属性（实际存储属性值的属性）的四大特性：

```js
{
value: 属性值,
writable: true/false,  //控制是否可修改
enumerable: true/false, //控制是否可被for in遍历
configurable: true/false, //1. 控制是否可删除 2. 控制是否可修改前两个特性  3.一旦改为false不可逆
}
```

### 访问器属性（不实际存储数据，专门提供对其它数据/变量的保护）的四大特性：

```js
{
get:function(){return this.隐藏属性;},
set:function(val){
//如果val符合条件
this.隐藏属性=val
//否则
报错
},
enumerable, configurable
}
```

### for..in

返回的是所有能够通过对象访问的、可枚举的属性，既包括存在于实例中的属性，也包括存在于原型中的实例,不能保证属性按对象原来的顺序输出。（可枚举-自身-原型）

```js
let obj = { a: 1, b: 2, c: 3 };

for (let prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}
// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```

### Object.keys

用于获取对象自身所有的可枚举的属性值，但不包括原型中的属性，然后返回一个由属性名组成的数组。注意它同 for..in 一样不能保证属性按对象原来的顺序输出。（可枚举-自身）

```js
// 数组
let arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// 类数组对象
let obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// 类数组对象-随机下标
let anObj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// 不可枚举属性getFoo
let myObj = Object.create(
  {},
  {
    getFoo: {
      value: function() {
        return this.foo;
      },
    },
  }
);
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
```

### Object.getOwnProperty

如果你想获取一个对象的所有属性，甚至包括不可枚举的，则可用该方法。其返回对象的所有自身属性的属性名组成的数组，但不会获取原型链上的属性。（可枚举&不可枚举-自身）

```js
//获取不可枚举属性
let my_obj = Object.create(
  {},
  {
    getFoo: {
      value: function() {
        return this.foo;
      },
      enumerable: false,
    },
  }
);
my_obj.foo = 1;

console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]
```

下面的例子演示了该方法不会获取到原型链上的属性：

```js
function ParentClass() {}
ParentClass.prototype.inheritedMethod = function() {};

function ChildClass() {
  this.prop = 5;
  this.method = function() {};
}

ChildClass.prototype = new ParentClass();
ChildClass.prototype.prototypeMethod = function() {};

console.log(
  Object.getOwnPropertyNames(
    new ChildClass() // ["prop", "method"]
  )
);
```

### for..of

es6 新增方法，主要来遍历可迭代的对象（包括 Array, Map, Set, arguments 等），它主要用来获取对象 value 值，而 for..in 主要获取对象 key 值。
另外：可以由 break, continue, throw 或 return 终止。在这些情况下，迭代器关闭。

```js
let iterable = [10, 20, 30];
for (let value of iterable) {
  value += 1;
  console.log(value);
}
// 11
// 21
// 31
```

与 for..in 循环之间的区别：

```js
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = "hello";

for (let i in iterable) {
  console.log(i); //  0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); //  0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); //  3, 5, 7
}
```

### 小结

其实这几个方法之间的差异主要在属性是否可可枚举，是来自原型，还是实例。

### 开发中的实际应用

需求：将如下两个从后台不同端口获取的 json 对象数组整合处理成如下注释部分的 json 对象

```js
let goodsSpecJSON = [{
"SpecA": "颜色"
}, {
"SpecB": "容量"
}, {
"SpecC": "大小"
}, {
"SpecD": "尺寸"
}, {
"SpecE": "套餐"
}];
let goodsSpecList = [{
c_id: 3133,
costPrice: 0,
discountPrice: 0,
earn: 0,
etime: null,
flag: 0,
goodsDetailCount: 199,
goodsDetailId: "100PgQ2xy08121409mY27",
goodsDetailInventory: 199,
goodsDetailOff: 0,
goodsDetailPic: "/upload/messageImage/1523281057461_Personal.jpg,/upload/messageImage/1523282906972_Personal.jpg,/upload/messageImage/1523283570897_Personal.jpg",
goodsDetailPrice: 188,
goodsDetailSpec: "",
goodsId: "00Y1kR4r1029X822731o0",
isHost: 0,
managerEarn: 0,
postage: 10,
profit: 0,
specA: "红色",
specB: "32G",
specC: "小",
specD: "4.7寸",
specE: "套餐一",
unionEarn: 0,
vipPrice: 0
}, {
c_id: 3134,
costPrice: 0,
discountPrice: 0,
earn: 0,
etime: null,
flag: 0,
goodsDetailCount: 199,
goodsDetailId: "100PgQ2xy08121409mY27",
goodsDetailInventory: 199,
goodsDetailOff: 0,
goodsDetailPic: "/upload/messageImage/1523281057461_Personal.jpg,
/upload/messageImage/1523282906972_Personal.jpg,/upload/messageImage/1523283570897_Personal.jpg",
goodsDetailPrice: 188,
goodsDetailSpec: "",
goodsId: "00Y1kR4r1029X822731o0",
isHost: 0,
managerEarn: 0,
postage: 10,
profit: 0,
specA: "白色",
specB: "64G",
specC: "小",
specD: "5寸",
specE: "套餐二",
unionEarn: 0,
vipPrice: 0
}, {
c_id: 3135,
costPrice: 0,
discountPrice: 0,
earn: 0,
etime: null,
flag: 0,
goodsDetailCount: 199,
goodsDetailId: "100PgQ2xy08121409mY27",
goodsDetailInventory: 199,
goodsDetailOff: 0,
goodsDetailPic: "/upload/messageImage/1523281057461_Personal.jpg,
/upload/messageImage/1523282906972_Personal.jpg,/upload/messageImage/1523283570897_Personal.jpg",
goodsDetailPrice: 188,
goodsDetailSpec: "",
goodsId: "00Y1kR4r1029X822731o0",
isHost: 0,
managerEarn: 0,
postage: 10,
profit: 0,
specA: "黑色",
specB: "128G",
specC: "小",
specD: "4.7寸",
specE: "套餐一",
unionEarn: 0,
vipPrice: 0
}, {
c_id: 3136,
costPrice: 0,
discountPrice: 0,
earn: 0,
etime: null,
flag: 0,
goodsDetailCount: 199,
goodsDetailId: "100PgQ2xy08121409mY27",
goodsDetailInventory: 199,
goodsDetailOff: 0,
goodsDetailPic: "/upload/messageImage/1523281057461_Personal.jpg
,/upload/messageImage/1523282906972_Personal.jpg,/upload/messageImage/1523283570897_Personal.jpg",
goodsDetailPrice: 188,
goodsDetailSpec: "",
goodsId: "00Y1kR4r1029X822731o0",
isHost: 0,
managerEarn: 0,
postage: 10,
profit: 0,
specA: "蓝色",
specB: "64GG",
specC: "大",
specD: "4.5寸",
specE: "套餐二",
unionEarn: 0,
vipPrice: 0
}];

// let keys = {
// '颜色': ['红色', '白色'],
// '容量': ['8g', '16g', '32g', '64g'],
// '尺寸': ['大', '小', '大'],
// '套餐': ['套餐一', '套餐二', '套餐三']
// };
// //SKU，Stock Keeping Uint(库存量单位)
// let sku_list = [{
// 'attrs': '红色|16g|big|套餐二',
// 'price': 120
// }, {
// 'attrs': '红色|8g|big|套餐一',
// 'price': 10
// }, {
// 'attrs': '白色|16g|big|套餐二',
// 'price': 28
// }, {
// 'attrs': '红色|64g|small|套餐三',
// 'price': 220
// }, {
// 'attrs': '白色|32g|middle|套餐二',
// 'price': 130
// }, {
// 'attrs': '红色|32g|big|套餐一',
// 'price': 120
// }, ];
```

实现：主要利用 Object.keys 方法获取对象的 key,value 值，配上 forEach 循环实现最终想要的结果。

```js
let keys = {};
let sku_list = [];
//原数据转换小写
goodsSpecJSON = goodsSpecJSON.map(function(keyo) {
  let key = Object.keys(keyo)[0];
  let newkey = key.substring(0, 1).toLowerCase() + key.substring(1);
  let dic = {};
  dic[newkey] = keyo[key];
  return dic;
});
//生成keys
goodsSpecJSON.forEach(function(keyo) {
  let key = Object.keys(keyo)[0]; //['specA']
  let val = keyo[key]; //颜色
  if (!keys.hasOwnProperty(val)) {
    keys[val] = [];
  }
  let hash = {};
  goodsSpecList.forEach(function(item, i) {
    if (hash[item[key]] === undefined) {
      hash[item[key]] = true;
      keys[val].push(item[key]);
    }
    // if (keys[val].indexOf(item[key]) === -1) {
    // keys[val].push(item[key]);
    // }
  });
});
console.log(keys);
//生成sku_list
goodsSpecList.forEach(function(item) {
  let dic = {
    attrs: "",
  };
  goodsSpecJSON.forEach(function(keyo, j) {
    let key = Object.keys(keyo)[0];
    dic.attrs += item[key] + (j === goodsSpecJSON.length - 1 ? "" : "|");
    dic.price = item.goodsDetailPrice;
    dic.goodsDetailCount = item.goodsDetailCount;
    dic.goodsDetailId = item.goodsDetailId;
  });
  sku_list.push(dic);
});
console.log(sku_list);
```

[参考](https://segmentfault.com/a/1190000014497376)

## 如何遍历对象才不会入坑

我们都知道`for...in`会遍历原型链上的属性，所以一般会结合`hasOwnProperty`来判断属性是否在对象自身上，而不是在原型链上。

```js
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}
```

可每次都要多增加一行代码，多一个缩进，实在麻烦，`能不能偷懒不加 hasOwnProperty？` 于是我动起了小心思，使用字面量创建的对象或者数组，不是类的实例，原型链上干干净净的，那遍历的时候也没必要判断了吧。于是就在遍历字面量对象时放心大胆地把`hasOwnProperty`抛弃了。

### 工单打脸

我负责的产品是 API，用户在自己的页面应用中引入使用。某天，有用户反馈若同时引入我家 API 和另一个脚本库就会引发报错：

调试发现报错发生在：

```js
for (const key in renderLayers) {
  const layer = renderLayers[key];
  if (!layer.isHidden()) {
    // ...
  }
}
```

`renderLayers`是一个数组，这里原本是遍历可渲染图层进行操作，而图层对象都有`isHidden`方法，为何报错呢？原因是用户另引入的脚本对`Object`、`Array`、`String`等基础引用类型的原型链做了扩展，加入了一些方法。所以在`for...in`遍历`renderLayers`时，也遍历到了`addRange`、`clear`这些属性，`layer`则赋值为一个`function`，而不是图层对象。

```js
Object.extend = function(dest, source, replace) {
  for (let prop in source) {
    if (replace == false && dest[prop] != null) {
      continue;
    }
    dest[prop] = source[prop];
  }
  return dest;
};

Object.extend(
  Array.prototype,
  {
    addRange: function(items) {
      if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          this.push(items[i]);
        }
      }
    },
    clear: function() {
      this.length = 0;
      return this;
    },
    // ...
  },
  false
);
```

## 避坑指南

如上所述，只能开始内部大清理，所有使用`for...in`而没有带`hasOwnProperty`的地方都需要进行改造。除了加上`hasOwnProperty`进行判断之外，视具体情况还可以使用以下方法，让你的代码更加优雅：

### 1. 数组尽量使用`forEach`进行遍历

比如引发报错的这一段，`renderLayers`是一个数组，直接使用`forEach`进行遍历即可：

```js
renderLayers
  .filter((layer) => !layer.isHidden())
  .forEach((layer) => {
    // ...
  });
```

### 2. 对象深拷贝尽量使用解构赋值

`for...in`可遍历对象属性实现一一赋值完成简单的对象深拷贝，这种操作可以用解构赋值来实现，更简单。

```js
function copy(obj) {
  return { ...obj };
}

const obj = {
  a: 1,
};
const objCopy = copy(obj);
console.log(objCopy);
// 输出：{a: 1}
```

### 3. 遍历键值可以结合`Object.entries()`和`forEach`

`Object.entries()`返回对象所有键值对组成的数组，再结合`forEach`即可完成遍历。若只是遍历对象的键或者值，可以使用`Object.keys()`和`Object.values()`。 在改造过程中，可以抽象出一个`forIn`方法作为工具函数，这样多处调用就可以省掉不少冗余代码啦~

```js
function forIn(obj, callback) {
  Object.entries(obj).forEach((entry) => {
    callback(...entry);
  });
}

const obj = {
  a: 1,
};
forIn(obj, (key, value) => {
  console.log(key, value);
});
// 输出：a 1
```

### 4. 若要使用`break`、`return`提前结束循环，需结合`for...of`

方法 3 虽好，但使用`forEach`没办法中断循环，这时候可以使用`for...of`，也是非常简洁的。

```js
const obj = {
  a: 1,
  b: 2,
};
for (let [key, value] of Object.entries(obj)) {
  if (value > 1) {
    break;
  }
  console.log(key, value);
}
// 输出：a 1
```
