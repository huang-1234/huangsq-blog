# 一次笔试引发的关于setTimeout的this的思考

之前对于setTimeout的this指向理解一直迷迷糊糊，在项目实践中也没有遇到相关问题，在面试时也没有被过关于这个问题，所以得过且过，直到最近的一次笔试碰到了令自己困惑的问题才去深入的了解了。也再一次提醒自己对于知识点的理解真的应该细致到位，不能停留在表面。

在《高程3》中关于setTimeout的this的描述是：**超时调用的代码都是在全局作用域中执行的，因此函数中this的值在非严格模式下指向window对象**，**在严格模式下是undefined，**那为什么是这样呢，我们可以简单的理解为setTimeout为window对象下的一个方法，本文仅讨论非严格模式下的情况。依据高程三的结论，如果真正理解了，我们可以搞定遇到的百分之90的问题，如：



```
setTimeout(console.log(this),0)//window
```



```
let obj = {
    print :　function () {
        setTimeout(function () {
            console.log('setTimeout:'+this);
        },0);
    }
}; 
obj.print() //setTimeout: window
```









```
function say() {
            console.log('setTimeout:'+this);
        }let obj = {
    print :　function () {
        setTimeout(say,0);
    }
}; 
obj.print() //setTimeout: window
```



无论是直接引用、通过对象方法调用还是函数引用都很容易理解，有时候，我们会遇到两个this的情况，如下，一个是setTimeout调用环境中的this，一个是延迟执行函数中的this，这个时候需要注意区别，我们可以理解为，setTimeout中的第一个参数就是一个单纯的函数的引用而已，它的指向跟我们一般的函数调用时一样取决于被调用时所处的环境。







```
let obj = {
      say : function () {
            console.log(this);  //延迟执行函数中的this
        },
    print :　function () {
        setTimeout(this.say,0); //setTimeout调用环境中的this，指向调用者即obj
    }
}; 
obj.print() //setTimeout: window
```



我们换种写法让上面代码中setTimeout调用环境中的this指向window，此时函数执行就不会有什么效果了：

```
let obj = {
      say : function () {
            console.log(this);  //延迟执行函数中的this
        },
      print :　function () {
        setTimeout(this.say,0); //setTimeout调用环境中的this，指向调用者即obj
    }
}; 
let func = obj.print;
func() 
```

下面再看：







```
var a = 1;
function func(){
        let a = 2;
        setTimeout(function(){
            console.log(a);
            console.log(this.a);
    },0) 
}
func(); //输出2 1
```



```
var a = 1;
function func(){
       // let a = 2;
        setTimeout(function(){
            console.log(a);
            console.log(this.a);
    },0) 
}
func(); //输出1 1
```

可见，在没有使用this时，在setTimeout超时调用中变量是跟正常函数调用时沿着定义时的作用域向上查找的。



那么，当以字符串形式执行又是怎么样呢

```
var a = 2
function say(a){
  console.log(a)
}
function test(){
  let a = 1;
  setTimeout("say(a)",0)
}
test() //2

var a = 2
function test(){
  let a = 1;
  function say(a){
    console.log(a)
  }
  setTimeout("say(a)",0)
}
test()  //say is not defined
```

可见，当把say方法移到test内部时报错`say is not defined`，原因是以字符串形式执行时javascript内部实际上调用了`eval(),`而eval的执行环境是全局作用域window，全局作用域没有say方法所以报错。



将参数直接以赋值形式传进去则不会报错：

```
var a = 2;
function say(a){
    console.log(a)
}
function test(){
    let a = 1;
    setTimeout("say('hhhh')",0)
  }
test() //hhhh
```

现在看看结合es6的箭头函数时this指向是怎么样的，大家都知道，由于箭头函数不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值，在setTimeout中情况亦是如此。







```
let obj = {
    name :  "jay",
    print :　function () {
        setTimeout(() => {
            console.log(this.name)
    },0);
    }
}; 
obj.print() //jay
```



### 如何改变setTimeout的this指向

前面的讨论其实已经有两种答案了，即利用中间变量引用外面的this和应用箭头函数







```
方法一
let obj = {
    name :  "jay",
    print :　function () {
           let that = this;
        setTimeout(function() {
            console.log(that.name)
    },0);
    }
}; 方法二
let obj = {
    name :  "jay",
    print :　function () {
        setTimeout(() => {
            console.log(this.name)
    },0);
    }
}; 
```



还有一种方法是应用bind方法：







```
方法三
var name = "window";
 function say(){
  console.log(this.name);
}
let obj = {
  name : "jay",
  print : function(){
    setTimeout(say.bind(this),0)
  }
}
obj.print(); //jay


```



### setTimeout参数传递问题

1.setTimeout(function,milliseconds,param1,param2,...); param1,param2,...是可选项，用于给function提供额外的参数，但是注意，该特性在IE9及之前的IE不能使用！！







```
function say(name) {
   console.log(name)
 }s
etTimeout(say,0,'jay')
```



2.字符串形式传参：







```
function say(a,b) {
   console.log(a+b)
 } 
//let name = "jay"
setTimeout( "say(3,4)",3000) //三秒后输出7
```



### 注意事项

尽量避免setTimeout第一个参数为字符串，setTimeout允许讲一个字符串作为第一个参数，js内部将会调用eval()函数用来动态执行一段字符串脚本，eval()具有许多不可预见的危险性，eval的效率是非常低的，执行一段代码需要先将字符串转换为可执行代码，也就是比平常多了一步，并且可能隐式创建全局变量。

setTimeout递归调用时注意记得应用clearTimeout清除，以避免无限递归造成内存泄漏。