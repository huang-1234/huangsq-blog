### 实现call

```js
// 找茬2：我们默认定义context.say = this  fn如果已经被占用 嘎嘎 sb了。 不怕 搞定它

// say需要是一个唯一值 是不是突然想到es6的新类型 Symbol   fn = Symbol() 不过我们装逼不嫌事大 都说自己实现了

function mySymbol(obj) {
  // 不要问我为什么这么写，我也不知道就感觉这样nb
  let unique = (Math.random() + new Date().getTime()).toString(32).slice(0, 8)
  // 牛逼也要严谨
  if (obj.hasOwnProperty(unique)) {
    return mySymbol(obj) //递归调用
  } else {
    return unique
  }
}
//接下来我们一并把多参数和执行完删除自定义方法删除掉一块搞定
Function.prototype.myCall1 = function (context) {
  // 如果没有传或传的值为空对象 context指向window
  context = context || window
  let fn = mySymbol(context)
  context[fn] = this //给context添加一个方法 指向this
  // 处理参数 去除第一个参数this 其它传入fn函数
  let arg = [...arguments].slice(1) //[...xxx]把类数组变成数组，arguments为啥不是数组自行搜索 slice返回一个新数组
  context[fn](...arg) //执行fn
  delete context[fn] //删除方法
}

let Person = {
  name: 'Tom',
  say(age) {
    console.log(this)
    console.log(`我叫${this.name}我今年${age}`)
  }
}

Person1 = {
  name: 'Tom1'
}

Person.say.call(Person1, 18)//我叫Tom1我今年18

```



## 实现bind

这个和call、apply区别还是很大的，容我去抽根烟回来收拾它 还是老套路先分析bind都能干些什么，有什么特点 1、函数调用，改变this 2、返回一个绑定this的函数 3、接收多个参数 4、支持柯里化形式传参 fn(1)(2)

```js
Function.prototype.bind = function (context) {
  //返回一个绑定this的函数，我们需要在此保存this
  let self = this
  // 可以支持柯里化传参，保存参数
  let arg = [...arguments].slice(1)
  // 返回一个函数
  return function () {
    //同样因为支持柯里化形式传参我们需要再次获取存储参数
    let newArg = [...arguments]
    console.log(newArg)
    // 返回函数绑定this，传入两次保存的参数
    //考虑返回函数有返回值做了return
    return self.apply(context, arg.concat(newArg))
  }
}
```

```js
// 实现apply
// 接下来apply就简单多了，只有多参数时第二个参数是数组，就不一步步细说了。
Function.prototype.myApply = function (context) {
  // 如果没有传或传的值为空对象 context指向window
  if (typeof context === "undefined" || context === null) {
    context = window
  }
  let fn = mySymbol(context)
  context[fn] = this //给context添加一个方法 指向this
  // 处理参数 去除第一个参数this 其它传入fn函数
  let arg = [...arguments].slice(1) //[...xxx]把类数组变成数组，arguments为啥不是数组自行搜索 slice返回一个新数组
  context[fn](arg) //执行fn
  delete context[fn] //删除方法
}
```



作者：我是一个前端
链接：https://juejin.cn/post/6844903773979033614
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。