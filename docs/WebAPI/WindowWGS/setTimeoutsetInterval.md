# setTimeout和setInterval

## 基本知识

- setTimeout(fn,t),超时调用，超过时间t，就执行fn。
- setInterval(fn,t),间歇调用，调用周期t，执行fn。
   二者调用后，均返回一个**数值ID**，此ID是计划执行代码的唯一标识符，可以通过它来**取消尚未执行的调用**。
   `clearTimeout(id)`和`clearInterval(id)`**。**取消间歇调用的重要性要远远高于取消超时调用，因为在不加干涉的情况下，间歇调用将会一直执行到页面卸载。

## 重点

JS是一个单线程的解释器，因此一段时间内只能执行一段代码。为了要控制执行的代码，就有一个JS任务队列。这些任务会按照将它们添加到队列的顺序执行。
 **1、setTimeout(fn,t)**中t告诉JS**再过多久把当前任务添加到队列中**。并不是执行的到setTimeout就添加任务。如果队列是空，那么添加的代码会立即执行；如果队列不空，那么它就要等前面的代码执行完了以后在执行。
 **2、setInterval(fn,t)**，在间歇调用时，会出现一些意外。



```go
setInterval(function () {
    func(i++);
}, 100)
```

每100毫秒调用一次func函数，如果func的执行时间少于100毫秒的话，在遇到下一个100毫秒前就能执行完：

**问题1：**但是，当func的执行时间多于100毫秒，在触发下一个func函数时（200ms处），上一个func还没有执行完，那么此时第二个func会在队列（event loop）中等待，直到第一个函数执行完，第二个func立即执行。这样就导致func执行间隔不再是100毫秒。

```jsx
var y=0;
var x = new Date().getTime();
var d=setInterval(a,500);
function a() {
    y++;
   sleep(1000);
    if(y>=4){
        clearInterval(d)
    }
console.log(new Date().getTime()-x);

}
function sleep(sleepTime){
    var start=new Date().getTime();
    while(true){
        if(new Date().getTime()-start>sleepTime){
            break;    
        }
    }
}
//1503
//2809
//3864
//4865
```

func的执行时长多于400毫秒，那么在200毫秒处，触发第二个func，第一个没执行完成，之后将第2个添加到空队列中，在300毫秒时，触发第3个func但是任务队列中已经有了第二个func，将第3个func抛弃掉。



## 优化

如何保证每次执行的间隔一样呢，可以使用setTimeout代替setInterval。例如每隔500ms执行一次b



```jsx
var y=0;
var z = new Date().getTime();
var t=setTimeout(b,500);
function b(){
    y++;
   sleep(2000)
     if(y>=10){
        clearTimeout(t)
    }else{
        setTimeout(arguments.callee,500);
    }
     console.log(new Date().getTime()-z);
}
function sleep(sleepTime){
    var start=new Date().getTime();
    while(true){
        if(new Date().getTime()-start>sleepTime){
            break;    
        }
    }
}
```

控制台输出

