# 数组扁平化

## 2 什么是数组扁平化

['a','b','c'] //这是一个拥有3个元素的数组，是一个一维数组（不存在数组嵌套）。[['a','b'],['c','d'],['e','f']] 从整体上看是一个数组，但是其中的元素又是数组，即数组中嵌套数组，这就是二维数组

以此类推·····

['a',['b',['c']]]//3维数组 ['a',['b',['c',[.....]]]]//n维数组 数组扁平化就是把多维数组转化成一维数组。（可以联想上图。。。类比于数组的展开）

## 3 数组扁平化的方法

## 3.1 es6提供的新方法flat(depth)

```js
let a = [1,[2,3]];
a.flat(); // [1,2,3]
a.flat(1); //[1,2,3]
```

flat(`depth`) 方法中的参数depth，代表展开嵌套数组的深度，默认是1

所以我们可以添加参数1，或者直接调用flat()来对2维数组进行扁平化，如果我们可以提前知道数组的维度，对这个数组进行扁平化处理，参数depth的值就是数组的维度减一。

```js
let a = [1,[2,3,[4,[5]]]];
a.flat(4-1); // [1,2,3,4,5]  a是4维数组
```

其实还有一种更简单的办法，无需知道数组的维度，直接将目标数组变成1维数组。depth的值设置为Infinity。

```js
let a = [1,[2,3,[4,[5]]]];
a.flat(Infinity); // [1,2,3,4,5]  a是4维数组
```

## 3.2 for循环

```js
var arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];
function flatten(arr) {
var res = [];
for(let i = 0, length = arr.length; i < length; i++) {
if(Array.isArray(arr[i])) {
        res = res.concat(flatten(arr[i])); //concat 并不会改变原数组
//res.push(...flatten(arr[i])); //扩展运算符
} else{
        res.push(arr[i]);
}
}
return res;
}
  flatten(arr1); //[1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

利用for循环遍历数组的每一项并加以判断，如果不是数组，就执行push操作， 是数组的化，就再次执行该函数（递归），直至遍历完整个数组。

ps: ...和concat()可以进行替换，所以完全可以算是2种方法。

## 3.3 while循环

```js
var arr1 = [1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]];
function flatten(arr) {
while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
//arr = Array.prototype.concat.apply([],arr);
}
return arr;
}
    flatten(arr1); //[1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

同理，利用while判断加上some的遍历来实现扁平化。

## 3.4 reduce方法

```js
var arr1 = [1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]];
function flatten(arr) {
  return arr.reduce((res,next) =>{
    return res.concat(Array.isArray(next)? flatten(next) : next);
  },[]);
}
```

这里使用的是数组的reduce方法，需要注意的是reduce方法，我们传递了两个参数， 第一个参数就是就是处理扁平化的箭头函数 第二个参数是一个空数组，也是作为遍历的开始。（res）

## 3.5 使用 stack 无限反嵌套多层嵌套数组

```js
var arr1 = [1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]];
function flatten(input) {
  const stack = [...input]; //保证不会破坏原数组
  const result = [];
  while(stack.length) {
    const first = stack.shift();
    if(Array.isArray(first)) {
          stack.unshift(...first);
    } else{
         result.push(first);
      }
    }
  return result;
}
    flatten(arr1); //[1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

这种方法其实并没有多复杂，这里没有使用递归， 原理判断stack数组长度，从数组从前往后拆出每一项（此时stack数组长度减一）， 并进行判断，如果不是数组，执行push操作，该项被移除， 是数组的化，数组展开后，执行unshift操作，添加到stack数组的前面，此时stack的数组的长度会增加，这样不断的进行判断和扩展，直至每一项被拆出。

ps: 1 开始的[...input]是为了保证传进来的数组不会被破坏。

2 上面的shift(),unshift()可以换成pop()和push()，只不过return前要执行reverse()操作

## 3.6 如果数组的项全为数字，可以使用join()，toString()

如果数组的项全为数字，可以使用join()，toString()进行扁平化操作。

```js
function flatten(input) {
  return input.toString().split(',').map(item => +item);
  // return input.join().split(',').map(item => +item);
  // return input.join(',').split(',').map(item => +item);
  }
flatten(arr1); //[1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

原理很简单，先把数组转换成字符串，这个过程会把[]去掉，然后再调用split()方法转换成数组,最后不能忘了，把每一项转换为数组，即调用map()方法。

1. `ps:数组的toString()方法是定义在Array.prototype(原型)上的，会对数组每一项执行toString()`
2. `然后在拼接成一个字符串，所以即使数组是嵌套的，里面嵌套的数组也会执行toString方法。`
3. `----这里是我个人的理解。`
4. `上面的解释也是不严谨的，肯定会有大佬说，undefined和null上并没有toString()方法，`
5. `[null,undefined].toString();//"null,undefined"`
6. `这里可以理解js引擎做了判断，执行了String()方法。保证数组的toString()方法不会报错。`



## 4 总结

数组扁平化的方法是很多种的，如果要强行使用call,apply等，可能还要在加上几种，除了flat()以外，其余的方法，都要遍历数组，进行判断，除了3.5这种方法外，基本上都要递归。等有时间，在补充下，各个方法的性能区别，如果只是数字，建议用最后的方法。

## 5 后续性能问题

## 5.1 生成n维数组

```js
let arr =[];
for(let i = 199; i> 0;i--){
      arr = [i].concat([arr]); //生成一个199维的数组
}
```

这里生成199维的数组，而不是更大的数组，主要有两个原因：1、 实际项目中不会出现很深维度的数组，即使是JSON数据，也不太可能超过10维，毕竟解析起来，很繁琐。2、 这里是为了方便测试，如果设置的维度太深，例如9999，那么有些扁平化数组的方法就会报错。

## 5.2 性能测试

不多说废话，我采用的方法是console.time()/timeEnd()来生成执行函数扁平化的时间。结果如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script>
    //数组的扁平化方法
    //生成999维数组
    let arr =[];
    for(let i = 19009; i> 0 ;i--){
      arr = [i].concat([arr]);
    }
    //es6 flat()方法
    function flatten(arr){
      return arr.flat(Infinity);
    }
    //for循环 concat
    function flatten10 (arr) {
      let res =[];
      for(let i =0; i<arr.length;i++){
        if(Array.isArray(arr[i])){
          res = res.concat(flatten10(arr[i]))
        }else {
          res.push(arr[i])
        }
      }
      return res;
    }
    //for循环 push
    function flatten11 (arr) {
      let res =[];
      for(let i =0; i<arr.length;i++){
        if(Array.isArray(arr[i])){
          res.push(...flatten11(arr[i]))
        }else {
          res.push(arr[i])
        }
      }
      return res;
    }
    //while方法
    function flatten20(arr){
      while(arr.some(item => Array.isArray(item))){
        arr = [].concat(...arr)
      }
      return arr;
    }
    //while方法 原型
    function flatten21(arr){
      while(arr.some(item => Array.isArray(item))){
        arr = Array.prototype.concat.apply([],arr)
      }
      return arr;
    }
    //reduce方法
    function flatten31(arr){
      arr.reduce((res,next) =>{
        return res.concat(Array.isArray(next)?flatten31(next):next);
      },[])
    }
    //stack 从前取值
    function flatten41(arr){
      let copy = [...arr];
      let res = [];
      while (copy.length) {
        let a = copy.shift();
        Array.isArray(a) ? copy.unshift(...a) : res.push(a);
      }
      return res;
    }
    //stack 从后取值
    function flatten42(arr){
      let copy = [...arr];
      let res = [];
      while (copy.length) {
        let a = copy.pop();
        Array.isArray(a) ? copy.push(...a) : res.push(a);
      }
      return res.reverse();
    }
    //全数字四种 扁平化方法
    function flatten51(arr){
      return arr.toString().split(',').map(i => +i);
    }
    function flatten52(arr){
      return arr.join().split(',').map(i => +i);
    }
    function flatten53(arr){
      return arr.join(',').split(',').map(i => +i);
    }
    function flatten54(arr){
      return ('' + arr).split(',').map(i => +i);
    }



    console.time('es6----->falt()');
    flatten(arr);
    console.timeEnd('es6----->falt()');

    console.time('for循环-->concat');
    flatten10(arr);
    console.timeEnd('for循环-->concat');
    console.time('for循环---->push');
    flatten11(arr);
    console.timeEnd('for循环---->push');
    console.time('while-------->...');
    flatten20(arr);
    console.timeEnd('while-------->...');
    console.time('while----->原型方法');
    flatten21(arr);
    console.timeEnd('while----->原型方法');
    console.time('reduce----->');
    flatten31(arr);
    console.timeEnd('reduce----->');

    console.time('stack----->');
    flatten41(arr);
    console.timeEnd('stack----->');

    console.time('stack----->reverse');
    flatten42(arr);
    console.timeEnd('stack----->reverse');

    console.time('toString----->');
    flatten51(arr);
    console.timeEnd('toString----->');
    console.time('join----->');
    flatten52(arr);
    console.timeEnd('join----->');
    console.time('join(',')----->');
    flatten53(arr);
    console.timeEnd('join(',')----->');
    console.time('""+---------->');
    flatten54(arr);
    console.timeEnd('""+---------->');


  </script>
</body>
</html>
```



1、性能最好的是es6的`falt()`

2、最差的就是`while() reduce()`

3、剩下的方法差距都不是很大。

如果有可能支持新属性，最好使用新属性，或者stack()方法。

最后贴一下支持flat()的浏览器：