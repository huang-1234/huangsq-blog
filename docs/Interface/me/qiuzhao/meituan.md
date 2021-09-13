# meituan

1 说说你对 this 的理解，然后看代码输出

```js
var test = {
  a: 40,
  init: () => {
    console.log(this.a); 
    function go() {
      console.log(this.a); 
    }
    go.prototype.a = 50; 
    return go;
   }
};

var p = test.init(); 
p();
```



然后把这个 init 函数由普通函数改为剪头函数



说一说你对 js 继承的理解

两个对象继承同一个父对象，然后父对象身上有一个属性是一个引用类型。当一个对象访问这个对象的引用类型属性并修改，另一个对象访问这个属性时的情况如何。

2 EventLoop

```js
const promise = new Promise((resolve, reject) => { 
  console.log(1);
  resolve(5);
  console.log(2);
}).then(val => { 
  console.log(val);
});
promise.then(() => {
  console.log(3); 
});
console.log(4); 
setTimeout(function() {
 console.log(6); 
});
```





3. vue 和 react 的一个 diff 算法