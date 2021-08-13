# bytedance

## 一面

题目一：项目加Fiber

我们先来聊一聊你有做过哪些项目或者你觉得做的还不错的地方

我们来聊一聊Fiber架构吧

Fiber架构是怎么实现异步可中断的，如果要你来设计一个时间片轮转的任务队列，你怎么设计

[{ type: number }, {type: string, key}]

{

 a: number;

 b: string;

}

Record<string, string | number | boolean>

{

  value: string

  a: string;

} & {

  b: number;

}

fiber diff 

requestAnimationFrame

eventLoop

\- 浏览器 

宏任务队列 -> 自己的微任务队列 -> 每次宏任务执行微任务

常用微任务 Promise 

\- Node

宏任务 / 微任务 / nextTick

来聊一下浏览器和node的EventLoop吧

### 题目二

发布订阅

```js
class EventBus
- on(eventName, fn)
- off(eventName, fn)
- emit(eventName)

const a = new EventBus();

a.on()
a.off()
a.emit()
```

实现

```js
//line=readline()
//print(line)
class EventBus{
    constructor(){
        this.eventMap = {}
    }
    on(eventName, fn){
        Object.prototype.toString.call(fn).slice()
        if(!(fn instanceof Function)){
            throw new Error(`${fn} is not find`)
        }
        if(!this.eventMap[eventName]){
            this.eventMap[eventName] = []
        }
        eventName[eventName].push(fn)
    }
    emit(eventName){
        if(!this.EventMap[eventName]){
            throw new Error(`${fn} is not find`)
        }
        eventMap[eventName].forEach((cb)=>{
            cb()
        })
    }
    
    off(eventName, fn){
        if(!eventMap[eventName]){
            throw Error(`error`)
        }
        if(~eventMap[eventName].indexOf(fn)){
            this.eventMap[eventName].splice(eventMap[eventName].indexOf(fn),1)
        }else{
            throw new Error(`${fn} is not find`)
        }
```

来聊一下浏览器方面的东西吧

### 题目三

来问你一些http2和http3的东西吧

http2

\- 头部压缩 / 多路复用 / 服务端推送

\- 强缓存 / 协商缓存



再问你一下webpack的一些东西吧

webpack打包的流程是怎么样的

webpack是怎么使用那些插件的呢？

我建议你自己学着去写一些webpack的plugin

### 想一想有哪些不会

项目的组件说明没说好

组件有哪些功能，怎么实现的

