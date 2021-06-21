# Vue的前世今生 | 原理浅析

- 2013 尤雨溪个人项目

- 2014.2 0.1版本发布

- 2015.10 1.0版本发布

- - 模板语法改进

- 2016.9 2.0版本发布

- - 跨端
  - 新的渲染机制

- 2019.10 3.0 alpha发布

- - 性能
  - 架构
  - 按需引入
  - Composition API
  - Proxy observer
  - AOT优化

## **Vue 1 响应式原理**

## **构建响应式对象流程**

- walk函数遍历data对象中的属性，调用defineReactive将其变成响应式对象

- - 对于对象属性进行递归调用walk，以保证data整个对象树中的属性都是响应式对象。

- defineReactive中使用watchers数组储存watcher，使用Object.defineProperty的get函数收集watcher和返回值，set函数用来设置值和对watchers中的watcher进行视图更新。

## **Walk函数实现**

```js
function walk(data){

    Object.keys(data).foreach(key => {
        defineReactive(data, key, data[key])
        //对象递归调用walk
        walk(data[key])
    })
}
```

## **defineReactive函数实现**

```js
function defineReactive(obj, key, value){
    let oldValue = value;
    const watchers = []
    Object.defineProperty(obj, key, {
        get(){
            //收集watcher
            watchers.push(currentWatcher)
            return oldValue
        },

        set(){
            if(newValue === oldValue) return;
            oldValue = newValue;
            watchers.forEach(watcher => wathcer.update())//更新视图
        }
    })

}
```

## **看了这么久Watcher到底是什么？**

- Watcher用于获取数据和更新视图，并实现vue指令

- - watcher从data中get数据render视图，同时data中的响应式对象劫持当前watcher并“储存”起来
  - data更新数据会触发响应式对象的set函数，把get数据时“储存”的watchers取出遍历，“通知”其更新视图。
  - watcher“接到data中的数据更新通知”，重新render视图。
  - 视图发生变化会触发data的中响应式对象的set函数，循环形成数据流。



- 例：

```js
// vm指向当前组件，el指向当前dom节点，第三个参数为标签类型，第四个为回调函数
// currentWatcher为全局变量指针


// 普通渲染的watcher
Watcher(vm, el, 'text', () =>{
    // 将currentWatcher对象指向当前watcher（vdom节点）供响应式对象的get函数获取
    currentWatcher = this;
    // 读取显示的内容
    el.textContext = eval('vm.data.text')
    // 解绑currentWatcher，防止发生错误。
    currentWatcher = null
})


//带v-if指令的watcher
Watcher(vm, el, 'text', () =>{
    // 将currentWatcher对象指向当前watcher（vdom节点）供响应式对象的get函数获取
    currentWatcher = this;
    // 实现v-if指令，通过判断变量值决定是否显示该元素,v-show原理类似
    el.style.display = eval('Boolean(vm.data.text)') ? 'block' : 'none'
    // 解绑currentWatcher，防止发生错误。
    currentWatcher = null
})
```

## **Vue 1 中存在的几个明显问题**

1. 启动时拦截所有组件的状态，进行递归响应式代理影响首次渲染速度
2. 内存占用率高，一个“指令”，“computed计算属性”，“handlebar表达式”等等均需要创建一个watcher，watcher数量过多导致内存占用率高。
3. 模板经过编译后直接操作dom，无法跨端。

## **Vue中的优化**

1. 新的渲染引擎 - vdom

2. Watcher依赖力度调整

3. 其他

4. 1. API、语法糖重新设计与定义
   2. 生命周期调整
   3. 双向数据流 -> 单向数据流
   4. 支持了jsx语法
   5. 等等...

## **新的渲染引擎 - vdom**

```js
//template
<template>
    <div v-if="text">
        {{text}}
    </div>
</template>

// vue-loader 编译后的 compile render
// h函数用于生成Vdom节点，第一个参数为当前组件，第二个参数为属性，第三个属性为子节点
render(){
 return this.text
     ? h(
         'div',
         null,
         h(this.text, null,[])
     )
     : vm.createEmptyVNode()
}
```

## **Watcher依赖力度调整**

watcher不再与单个dom节点、指令关联，一个component对应一个watcher，极大减少了vue 1 中watcher数量过多导致的内存问题。同时以来vdom diff在渲染时能以最小的代价来更新dom。

```js
Watch(compoent, vm, 'text', () =>{
    const newVnode = component.render()
    const oldVnode = component.render()
    //通过diff算法返回新旧节点的差异
    const patches = vm.diff(newVnode, oldVnode)
    // 通过patch函数对该组件应用差异
    vm.patch(component, patches);
})
```

## **vdom带来的优势**

1. 框架屏蔽具体渲染细节，抽象了渲染层，组建的抽象能力得以提升，不再依赖浏览器运行，进而可以跨段，如SSR、同构渲染一姐小程序、weex、uni-app等框架。
2. 通过静态分析进行更多的AOT（Ahead Of Time）编译优化。
3. 附加能力：大量组件更新时以最小的代价去更新dom。
4. vdom对比直接操作dom要慢，大部分情况下效率比vue 1 差，虽然牺牲了一点性能，但是使得vue获得更多特性及优化空间。

## **AOT编译优化**

### **Cache static element**

- 缓存静态节点、属性，避免重复创建

```js
// 编译前
<div>
    <span class="foo">
        Static
    </span>
    <span>
        {{dynmic}}
    </span>
</div>

// 编译后
const __static1=h('span',{
    class:'foo'
}, 'static')

render(){
    return h('div', [
        __static1,
        h('span', this.dynamic)
    ])
}
```

### **Component fast path**

- 编译后 直接判断是组件、原生标签还是文本节点，避免不必要的分支判断，提升性能。
- 提高vdom diff时的效率

### **Vue2优化前**

- 每次都要调用h函数去做分支判断

```js
// 编译前
<Comp></Comp>
<div></div>
<span></span>


// Vue2
render(){
    return createFragment([
        h(Comp, null, null),
        h('div', null, [
            h('span', null, null)
        ])
    ])
}

function h(type, attrs, children){
    if(isComponent(type)){
        //创建component vnode
        return createComponentVNode(type, attrs, children)
    }
    if(isDomElement(type)){
        //创建原生dom vnode
        return createElementVNode(type, attrs, children)
    }
    //创建纯string节点
    return createStringVNode(type, attrs, children)
}
```

### **Vue3优化后**

- 编译后直接调用不同的createVNode方法

```js
// Vue3
render(){
    return createFragment([
        createComponentVNode(Comp, null, null),
        createElmentVNode('div',null, [
           createElmentVNode('span', null, null)
        ])
    ])
} 
```

### **SSR optimize**

- SSR时采用字符串拼接，不创建vnode。

```js
//编译前
<template>
    <div>
        <p class="foo">
            {{msg}}
        </p>
        <comp/
    </div>
</template>

//编译后
render(){
    return h('div', [
        this.ssrString(
            `<p class="foo">`
            + this.msg
            + '</p>'
        ),
        h(comp)
    ])
}
```

### **Inline handler**

- 缓存dom上的event handler，避免重复创建。

```js
// 编译前
<div @click="count++"></div>



// 编译后
import {getBoundMethod} from 'vue'

function __fn1(){
    this.count++
}

render(){
    return h('div',{
        onClick:getBoundMethod(__fn1,this)
    })
}
```

## **Vue3变更**

## **Proxy Reactive State**

- Vue3改用Proxy去生成响应式对象
- Vue1/2中遍历和递归所有data中的属性去生成响应式对象
- Vue3中改为仅在get获取这个属性的时候才去生成响应式对象，延迟了响应式对象生成，加快了首屏渲染速度。

```js
// Vue1/2中的做法
function walk(data){
    Object.keys(data).foreach(key => {
        defineReactive(data, key, data[key])
        //对象递归调用walk
        walk(data[key])
    })
}



// Vue3中的做法
function reactive(target){
    let observerd = new Proxy(target, {
        get(target, key, receiver){
            let result = Reflect.get(target, key, receiver)
             //只有在取对象子属性的时候才递归
            reactive(result)
            return result
        },
        set(target, key, value, receiver) {
            let oldValue = target[key]
            if (value == oldValue)
                return
            let result = Reflect.set(target, key, value, receiver)
            return result;
        }
    })
    return observerd
}
```

## **Composition API**

- Vue2中，代码根据数据、方法、计算属性等进行分块，导致可能同一个业务功能的代码需要反复上下地跳着去看。

- - 虽然有Mixin，但业务和业务之间的关系，包括命名空间都会出现一定问题。



- Vue3中引入Composition API使得开发者可以根据业务将代码分块，按需引入响应式对象、watch、生命周期钩子等各种属性，使用方法类似React Hooks，使得开发者更灵活地开发。

- - 详情见[Vue3中文文档 - vuejs (vue3js.cn)](https://link.zhihu.com/?target=https%3A//vue3js.cn/docs/zh/)

### **Vue2**

```js
export default {   
    data() {     
        return {       
            counter: 0     
        }   
   },   
   watch: {     
       counter(newValue, oldValue) {       
           console.log('The new counter value is: ' + this.counter)     
       }   
   } 
}
```

### **Vue3**

```js
import { ref, watch } from 'vue' 


const counter = ref(0) 
watch(counter, (newValue, oldValue) => {   
    console.log('The new counter value is: ' + counter.value) 
})
```

### **Why use Composition API**

- mixin、hoc、composition api都是为了解决代码复用的问题。但是mixin、hoc过于灵活没有规范，导致开发人员容易写出零散、难以维护的逻辑。
- Compostion API规避了mixin、hoc存在的缺陷，提供固定的编程模式->函数组合，对各模块解耦使得更优雅、更容易地去组合复用。
- 以组件状态为例，传统写法所有state都在一个component，杂糅在一起，语义化不强，compostion api使得state按照不同的逻辑分离出来，抽象出状态层组件。

```js
const Foo = {
    template:'#modal',
    mixins:[Mixin1, Mixin2],
    methods:{
        click(){
            this.sendLog()
        }
    },
    components:{
        appChild:Child
    }
}
```

- 看完以上代码会发现以下问题

- - sendLog到底来自哪个Mixin
  - mixin1，mixin2之间有没有逻辑关系
  - mixin1，mixin2如果都注入了sendLog使用哪个
  - 如果使用hoc的方式，hoc增加了两个组件实例消耗，多了两次diff。
  - 再来多几个mixin，这个组件更难维护。



- 明显地体现了Composition API的好处

## **Time Slicing**

- Vue3最开始实现了这个特性，不过后面移除了

- 原因总结为以下两条

- - 基于响应式原理及AOT编译优化，相比react而言vue vdom diff具有很高的效率
  - Time Slicing只在一些极端情况下有明显作用，引入会降低vdom diff效率，阻塞UI渲染，收益不大。

## **按需引入、支持treeshaking**

- Vue各模块（响应式、SSR、runtime等）的解耦，可按需引入。

## **Vue vs React**

## **相同点**

1. 基于MVVM思想：响应式数据驱动试图更新
2. 提供组件化的解决方案
3. 跨端：基于vdom的渲染引擎

## **核心差异**

1. 定位

2. 1. React是一个Library，只专注于state到view的映射，状态、路由、动画等解决方案均来自于社区。
   2. Vue是一个渐进式Framework，设计之初考虑开发者可能面临的问题，官方提供路由、状态管理、动画、插件等比较齐全的解决方案，不强制使用，譬如模块机制、依赖注入，可以通过插件机制很好和社区方案集成。
   3. Library，职责范围小，开发效率低，需借助外力，但是易于扩展。对维护团队而言，保持版本间兼容成本较低。更容易集中精力专注于核心变更。
   4. Framework，职责范围大，开发效率高，内置一套解决方案，扩展程度低。对维护团队而言，保持版本间兼容成本较高。

2. 渲染引擎

1. 1. Vue进行数据拦截/代理，它对侦测数据的变化更准确，改变了多少数据，就触发多少更新多少。
   2. React setState触发局部整体刷新，没有追踪数据变更，做到精确更新，所以提供给开发者shouldComponentUpdate去除一些不必要的更新。
   3. 基于这个响应式设计，间接影响了核心架构的Composition API、React Hooks的实现。

3. 模板DSL

1. 1. Vue template语法更接近html，静态表达能力很强，基于声明式的能力，更方便做AOT编译优化。
   2. JSX语法可以认为是JS基础上又增加了对html的支持，本质还是命令式变成。静态表达能力偏弱，导致优化信息不足，无法很好地做静态编译。