# Clone

## 浅拷贝

拷贝之前，我们想要了解一下我们到底是要拷贝对象些什么类型的属性，这个需要拷贝是什么类型的数据。

数据分为基本数据类型和引用数据类型。

- **基本数据类型**：String、Number、Boolean、Null、Undefined、Symbol。基本数据类型是直接存储在栈中的数据。
- **引用数据类型**：Array、Object。引用数据类型存储的是该对象在栈中引用，真实的数据存储在内存中。

为了能直观的了解，我们先来看看下面的代码：

```js
// 基本数据类型
let str1 = '123';
str2 = str1;
str2 = '456';
console.log(str1); // '123'
console.log(str2); // '456'

// 引用数据类型
let arr1 = [1, 2, 3];
arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [1, 2, 3, 4]
```

如上，由于基本数据类型是直接存储的，所以如果我们对基本数据类型进行拷贝，然后修改新数据后，不会影响到原数据。

而当你对引用数据类型进行拷贝，然后修改新数据后，它就会影响到原数据。

初步了解上面的基本数据类型和引用数据类型之后，再来看看赋值，浅拷贝和深拷贝

```js
/**
 * @name 赋值
 */
const dataOne = {
  title: 'study',
  number: ['PonyHuang', 'PonyHuang', 'hsq'],
};
const dataTwo = dataOne;
dataTwo.title = 'play';
dataTwo.number = ['null'];
console.log(dataOne);
// dataOne: { title: 'play', number: ['null'] }
console.log(dataTwo);
// dataTwo: { title: 'play', number: ['null'] }

/**
 * @name 浅拷贝
 */
const dataThree = {
  title: 'study',
  number: ['PonyHuang', 'PonyHuang', 'hsq'],
};
const dataFour = shallowClone(dataThree); // shallowClone 待实现
dataFour.title = 'play';
dataFour.number = ['null'];
console.log(datadataThreeOne);
// dataThree: { title: 'study', number: ['null'] }
console.log(dataFour);
// dataFour: { title: 'play', number: ['null'] }

/**
 * @name 深拷贝
 */
const dataFive = {
  title: 'study',
  number: ['PonyHuang', 'PonyHuang', 'hsq'],
};
const dataSix = deepClone(dataFive); // deepClone 待实现
dataSix.title = 'play';
dataSix.number = ['null'];
console.log(dataFive);
// dataFive: { title: 'study', number: ['PonyHuang', 'PonyHuang', 'hsq'] }
console.log(dataSix);
// dataSix: { title: 'play', number: ['null'] }
```

如上，我们给出结论：

- 赋值：引用地址的拷贝。修改赋值后的数据，不管是基本数据类型还是引用数据类型，都会影响到原数据。

- 浅拷贝：一层拷贝。在浅拷贝中，修改基本数据类型不会影响原有数据的基本数据类型，修改引用数据类型会影响原有的数据类型。

- 深拷贝：无限层级拷贝。在深拷贝中，修改基本数据类型和引用数据类型都不会影响原有的数据类型。

  

```js
const arr1 = [1, 2, ['PonyHuang', 'hsq'], 4];

const shallowClone = (arr) => {
  const oReturn = [];
  for (let prop in arr) {
    if (arr.hasOwnProperty(prop)) {
        dst[prop] = arr[prop];
    }
  }
  return oReturn;
}

const arr2 = shallowClone(arr1);
arr2[2].push('LiangJunrong');
arr2[3] = 5;

console.log(arr1);
// [ 1, 2, [ 'PonyHuang', 'hsq', 'LiangJunrong' ], 4 ]
console.log(arr2);
// [ 1, 2, [ 'PonyHuang', 'hsq', 'LiangJunrong' ], 5 ]
```



## 初步实现深拷贝

```js
//myDeepClone
const deepClone = (target) => {
  // if (typeof target !== 'targetect') return new Error('the param must be a object');
  // let Result = {};
  //为了解决属性类型为数组Array，增加类型函数
  const checkType = (target) => {
    return Object.prototype.toString.call(target).slice(8, -1);
  }
  let Result, targetType = checkType(target);
  if (targetType === 'Object') {
    Result = {};
  } else if (targetType === 'Array') {
    Result = [];
  } else {
    return target
  }
  //遍历这个对象
  for (index in target) {
    const value = target[index];
    if (checkType(value) === 'Object' || checkType(value) === 'Array') {
      
      Result[index] = deepClone(target[index])
    } else {
      Result[index] = value;
    }
  }
  return Result;
}

let o1 = {
  name: 'hsq',
  course: {
    major: {
      math: ['xiandai', 'gaoshu', 'gailvlun'],
      computer:['jizu','C','C++','java','python'],
    },
    minor: {
      wenxue:'wenxue'
    }
  }
}
let o2 = deepClone(o1);
console.log(o1);
o2.course.minor.wenxue = 'no'
console.log('o1:', o1.course.minor.wenxue, 'o2:', o2.course.minor.wenxue);
//看数组输出
o2.course.major.math.push('JSxue')
console.log('o1:', o1.course.major.math, 'o2:', o2.course.major.math);
```

## 遍历对象改用for in

**for in可以遍历所有可枚举属性以及原型上的属性**

```
var createObj = function(){
    this.name = "大表哥";
}
var obj1 = new createObj();
createObj.prototype.age = 10;

for(var p in obj1){
    console.log('key:',p);
    console.log('value:',obj1[p]);
}
```

输出结果

```
key: name
value: 大表哥
key: age
value: 10
```

**hasOwnProperty()不会从原型上寻找属性**

```
var resName = obj1.hasOwnProperty("name");
console.log("name",resName);

var resAge = obj1.hasOwnProperty("age");
console.log("age",resAge);
```

输出结果

```node
name true
age false
```

该深拷贝可以拷贝一般的对象，而且嵌套的层级不能太深

一个特例：循环引用。

```js
let obj = { 
	name:'hsq'
};
obj.link = obj;
console.log(obj); //<ref *1> { val: 100, target: [Circular *1] }
deepClone(obj);//报错: RangeError: Maximum call stack size exceeded
```



但是这里有一个问题，就是当一个对象有一个属性指向它本身的时候，这个时候深拷贝就会出现爆栈的情况，或者对象里嵌套了很深的对象的时候也会出现爆栈。

想了很多办法，包括利用树来表示对象进行递归，还有就是利用WeakMap进行标记，每一个copy的属性都要加入到map中，当遇到已经在map里的key-value，说明已经copy过一次了，不用copy，直接返回value即可。这样就解决了循环引用导致的重复copy的问题。、

## 改良deepClone

```js
//myDeepClone,为了防止RangeError: Maximum call stack size exceeded;add a WeakMap
const deepClone = (target, map = new WeakMap()) => {
  // console.log(arguments);
  if (!arguments) throw new Error('there is no params');
  //为了解决属性类型为数组Array，增加类型函数
  const checkType = target => Object.prototype.toString.call(target).slice(8, -1);
  
  let Result, targetType = checkType(target);
  if (targetType === 'Object') {
    Result = {};
  } else if (targetType === 'Array') {
    Result = [];
  } else {
    return target;
  }

  //遍历这个对象
  for (index in target) {
    const value = target[index];
    if (map.get(value)) {
      return value
    }
    map.set(target, value);
    if (checkType(value) === 'Object' || checkType(value) === 'Array') {
      
      Result[index] = deepClone(target[index])
    } else {
      Result[index] = value;
    }
  }
  console.log('map:',map);
  return Result;
}
/* 
let o1 = {
  name: 'hsq',
  course: {
    major: {
      math: ['xiandai', 'gaoshu', 'gailvlun'],
      computer:['jizu','C','C++','java','python'],
    },
    minor: {
      wenxue:'wenxue'
    }
  }
}
let o2 = deepClone(o1);
console.log(o1);
o2.course.minor.wenxue = 'no'
console.log('o1:', o1.course.minor.wenxue, 'o2:', o2.course.minor.wenxue);
//看数组输出
o2.course.major.math.push('JSxue')
console.log('o1:', o1.course.major.math, 'o2:', o2.course.major.math); */


// Maximum call stack size exceeded
let obj = {
  val: 100,
  fn: (a, b)=>{
    console.log(a + b);
    return a + b;
  }
};
obj.obj = obj;
console.log(obj);
let out = deepClone(obj);
console.log('out:',out);
out.out = out;
console.log(out);
// 输出结果
// <ref *1> { val: 100, fn: [Function: fn], obj: [Circular *1] }
//out: <ref *1> { val: 100, fn: [Function: fn], obj: [Circular *1] }
//<ref *1> {
//  val: 100,
//  fn: [Function: fn],
//  obj: [Circular *1],
//  out: [Circular *1]
//}
```

下面看看还有没有其他的边界条件没有解决

上面的代码能解决引用自身的问题，因为做了标记，对于深度=1000的也可以拷贝，但是当深度=10000，马上就出现了爆栈。思考思考，其实我们可以将这个对象看成是一棵树，然后去遍历这棵树。

话不多说，敲代码：

## 树表示法

```js
function deepClone(x) {
  const root = {};

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    }
  ];

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

function createData(deep, breadth) {
  var data = {};
  var temp = data;

  for (var i = 0;i < deep;i++) {
    temp = temp['data'] = {};
    for (var j = 0;j < breadth;j++) {
      temp[j] = j;
    }
  }

  return data;
}
let obj = createData(1000, 1000);
let out = deepClone(obj);
console.log(out);
```

然后想了想，应该把引用自身和树的遍历结合起来

## 树加Map

```js
// 保持引用关系
function cloneForce(x) {
  // =============
  const uniqueList = []; // 用来去重
  // =============
  let root = {};
  
  // 循环数组
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    }
  ];
  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    // =============
    // 数据已经存在
    let uniqueData = find(uniqueList, data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      break; // 中断本次循环
    }

    // 数据不存在
    // 保存源数据，在拷贝数据中对应的引用
    uniqueList.push({
      source: data,
      target: res,
    });
    // =============

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

function find(arr, item) {
  for (let i = 0;i < arr.length;i++) {
    if (arr[i].source === item) {
      return arr[i];
    }
  }

  return null;
}

// test Data

function createData(deep, breadth) {
  var data = {};
  var temp = data;
  for (var i = 0;i < deep;i++) {
    temp = temp['data'] = {};
    for (var j = 0;j < breadth;j++) {
      temp[j] = j;
    }
  }
  return data;
}
let obj = createData(10000, 10000);
let out = cloneForce(obj);
console.log(out);
```

