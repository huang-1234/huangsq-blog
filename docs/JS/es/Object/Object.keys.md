# [利用Object.keys遍历(forEach/map)对象数组，合并](https://segmentfault.com/a/1190000014497376) Full

js中几种遍历对象的方法，包括for..of、for..in、Object.keys、Object.getOwnProperty,它们在使用场景方面各有不同。

js对象的属性中可直接用、可访问到的属性分为数据属性和访问器属性。

## 数据属性（实际存储属性值的属性）的四大特性：

```js
{    
    value: 属性值,    
    writable: true/false,  //控制是否可修改    
    enumerable: true/false, //控制是否可被for in遍历    
    configurable: true/false, //1. 控制是否可删除 2. 控制是否可修改前两个特性  3.一旦改为false不可逆                                                       
}
```

## 访问器属性（不实际存储数据，专门提供对其它数据/变量的保护）的四大特性：

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

## for..in

返回的是所有能够通过对象访问的、可枚举的属性，既包括存在于实例中的属性，也包括存在于原型中的实例,不能保证属性按对象原来的顺序输出。（可枚举-自身-原型）

```js
var obj = {a:1, b:2, c:3};
    
for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}
// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```

## Object.keys

用于获取对象自身所有的可枚举的属性值，但不包括原型中的属性，然后返回一个由属性名组成的数组。注意它同for..in一样不能保证属性按对象原来的顺序输出。（可枚举-自身）

```js
// 数组
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// 类数组对象
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// 类数组对象-随机下标
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// 不可枚举属性getFoo
var myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  } 
});
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
```

## Object.getOwnProperty

如果你想获取一个对象的所有属性，甚至包括不可枚举的，则可用该方法。其返回对象的所有自身属性的属性名组成的数组，但不会获取原型链上的属性。（可枚举&不可枚举-自身）

```js
//获取不可枚举属性
var my_obj = Object.create({}, {
  getFoo: {
    value: function() { return this.foo; },
    enumerable: false
  }
});
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

ChildClass.prototype = new ParentClass;
ChildClass.prototype.prototypeMethod = function() {};

console.log(
  Object.getOwnPropertyNames(
    new ChildClass()  // ["prop", "method"]
  )
);
```

## for..of

es6新增方法，主要来遍历可迭代的对象（包括Array, Map, Set, arguments等），它主要用来获取对象value值，而for..in主要获取对象key值。
另外：可以由break, continue, throw 或return终止。在这些情况下，迭代器关闭。

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

与for..in循环之间的区别：

```js
Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

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

## 小结

其实这几个方法之间的差异主要在属性是否可可枚举，是来自原型，还是实例。

## 开发中的实际应用

需求：将如下两个从后台不同端口获取的json对象数组整合处理成如下注释部分的json对象

```js
var goodsSpecJSON = [{
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
var goodsSpecList = [{
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
    goodsDetailPic: "/upload/messageImage/1523281057461_Personal.jpg,/upload/messageImage/1523282906972_Personal.jpg,/upload/messageImage/1523283570897_Personal.jpg",
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
    goodsDetailPic: "/upload/messageImage/1523281057461_Personal.jpg,/upload/messageImage/1523282906972_Personal.jpg,/upload/messageImage/1523283570897_Personal.jpg",
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
    goodsDetailPic: "/upload/messageImage/1523281057461_Personal.jpg,/upload/messageImage/1523282906972_Personal.jpg,/upload/messageImage/1523283570897_Personal.jpg",
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

// var keys = {
//     '颜色': ['红色', '白色'],
//     '容量': ['8g', '16g', '32g', '64g'],
//     '尺寸': ['大', '小', '大'],
//     '套餐': ['套餐一', '套餐二', '套餐三']
// };
// //SKU，Stock Keeping Uint(库存量单位)    
// var sku_list = [{
//     'attrs': '红色|16g|big|套餐二',
//     'price': 120
// }, {
//     'attrs': '红色|8g|big|套餐一',
//     'price': 10
// }, {
//     'attrs': '白色|16g|big|套餐二',
//     'price': 28
// }, {
//     'attrs': '红色|64g|small|套餐三',
//     'price': 220
// }, {
//     'attrs': '白色|32g|middle|套餐二',
//     'price': 130
// }, {
//     'attrs': '红色|32g|big|套餐一',
//     'price': 120
// }, ];
```

实现：主要利用Object.keys方法获取对象的key,value值，配上forEach循环实现最终想要的结果。

```js
var keys = {};
var sku_list = [];
//原数据转换小写
goodsSpecJSON = goodsSpecJSON.map(function (keyo) {
    var key = Object.keys(keyo)[0];
    var newkey = key.substring(0, 1).toLowerCase() + key.substring(1);
    var dic = {};
    dic[newkey] = keyo[key];
    return dic
});
//生成keys
goodsSpecJSON.forEach(function (keyo) {
    var key = Object.keys(keyo)[0]; //['specA']
    var val = keyo[key]; //颜色
    if (!keys.hasOwnProperty(val)) {
        keys[val] = [];
    }
    var hash = {};
    goodsSpecList.forEach(function (item, i) {
        if (hash[item[key]] === undefined) {
            hash[item[key]] = true;
            keys[val].push(item[key]);
        }
        // if (keys[val].indexOf(item[key]) === -1) {
        //     keys[val].push(item[key]);
        // }
    });
});
console.log(keys)
//生成sku_list
goodsSpecList.forEach(function (item) {
    var dic = {
        attrs: ''
    };
    goodsSpecJSON.forEach(function (keyo, j) {
        var key = Object.keys(keyo)[0];
        dic.attrs += item[key] + (j === goodsSpecJSON.length - 1 ? '' : '|');
        dic.price = item.goodsDetailPrice;
        dic.goodsDetailCount = item.goodsDetailCount;
        dic.goodsDetailId = item.goodsDetailId;
    });
    sku_list.push(dic);
});
console.log(sku_list)
```