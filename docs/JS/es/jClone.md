# 浅拷贝和深拷贝





初步实现深拷贝

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

该深拷贝可以拷贝

一个特例：

```js
let obj = { 
	name:'hsq'
};
obj.link = obj;
console.log(obj); //<ref *1> { val: 100, target: [Circular *1] }
deepClone(obj);//报错: RangeError: Maximum call stack size exceeded
```



但是这里有一个问题，就是当一个对象有一个属性指向它本身的时候，这个时候深拷贝就会出现爆栈的情况，或者对象里嵌套了很深的对象的时候也会出现爆栈。

```js
const deepCloneKnowledgePoints = {
  title: '浅拷贝和深拷贝',
  chapterOne: {
    title: '章节一',
    point: [
      '浅拷贝和深拷贝初探索',
      '基本数据类型和引用数据类型',
    ],
  },
  chapterTwo: {
    title: '章节二',
    point: [
      '手写浅拷贝',
      'Object.assign()',
      'Array.prototype.concat()',
      'Array.prototype.slice()',
      '...obj 展开运算符',
    ],
    extend: [
      'for...in',
      'for...of',
      'for...in 和 for...of 的区别',
      'hasOwnProperty',
    ],
  },
  chapterThree: {
    title: '章节三',
    point: [
      '手写深拷贝',
      'JSON.parse(JSON.stringify())',
      '函数库 Lodash',
      '框架 jQuery',
    ],
    extend: [
      'typeof',
      'instanceof',
      'constructor',
      {
        point: 'Object.prototype.toString.call()',
        extend: [
          'Function.prototype.apply()',
          'Function.prototype.bind()',
          'Function.prototype.call()',
          'apply()、bind() 以及 call() 的区别',
        ],
      },
      {
        point: 'JSON.parse(JSON.stringify())',
        extend: [
          'JSON.parse()',
          'JSON.stringify()',
        ]
      }
    ],
  },
};

```

