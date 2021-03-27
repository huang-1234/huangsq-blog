# 1. react新手入门

 前言：自己刚刚总结的关于react的知识点，比较简单，大家可以粗略看看。

### 一：关于react的一些知识点

##### 1，Jsx

所有的html，css都可以写在js中，这就是jsx的用法。

##### 2，生命周期

- 渲染组件的时候几个过程

1. getDefaultProps
2. getInitialState
3. componentWillMount // 组件将要被加载之前的操作。如请求数据等
4. render
5. componentDidMount(一般在这个阶段各种api的请求等，与redux配合的时候，可以在redux的action获取接口数据。)

- 组件存在时候

1. componentWillReceiveProps

   // 常用的用法是父组件的props改变了，需要在子组件中通过这个生命周期获得最新的props，然后setState组建的state

2. shouldComponentUpdate // 组件是否要重新渲染，默认为真。

3. componentWillUpdate

4. render

5. componentDidUpdate

##### 3，数据的类型验证：PropTypes

用于验证数据的类型是否是满足你的需要,不过我在现有的项目中没有特意的指定数据的propTyoe，因为这些都是前后端约定好的。

##### 4，路由（react-router）

这个与vue-router差不多，大家可以看文档。

react-router的中文官网 ： [中文官网](https://link.jianshu.com?t=http%3A%2F%2Freact-guide.github.io%2Freact-router-cn%2Fdocs%2FAPI.html)

##### 5，父子之间的传递属性

- 没有使用redux，最简单的（props与state）
- 使用redux（状态管理）: [redux中文官网](https://link.jianshu.com?t=http%3A%2F%2Fwww.redux.org.cn%2F) (差不多70多行代码)
  - mobx(相对于redux较为简单) : [mobx](https://link.jianshu.com?t=https%3A%2F%2Fmobx.js.org%2F);
  - 阿里新出的一个框架Mirror : [Mirror](https://link.jianshu.com?t=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F28643798);

##### 6，react中获取真实的dom节点 【ref】

因为react与vue一样，都是使用vitural-dom，没有处理dom节点，从而大大提高了页面的渲染效率。

当你想要获取真实的dom节点的时候，可以使用ref，具体的使用，可以看阮一峰的react入门，我下面的todolist的demo里面也会涉及到。

不过在你使用无状态组件申明组件的时候，ref在这个组件中是不能使用的。

##### 7，webpack的使用，既grunt，gulp之后的构建工具

可以通过webpack安装各种依赖，我使用的最爽的一个就是react-hot-loader，就是热更新，非常好用。不过热更新其他的工具，比如`browser-sync`,下面是一些文档。

- webpack中文官网 ： [中文官网](https://link.jianshu.com?t=https%3A%2F%2Fwebpack-china.org%2F)
- webpack的demo(阮一峰)：[webpack-demo](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2Fviviannow%2Fwebpack-ruanyf)

#### 8，react的脚手架工具create-react-app

如vue的vue-cli脚手架，[create-react-app](https://link.jianshu.com?t=%5Bhttps%3A%2F%2Fgithub.com%2Ffacebookincubator%2Fcreate-react-app)]([https://github.com/facebookincubator/create-react-app](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2Ffacebookincubator%2Fcreate-react-app))，使用以上方法的话，与vue-cli脚手架工具类似

## 二、学习react（我当时的学习路线）

1. #### 第一阶段：

   学习之前，花费了很多时间去配置`webpack`，`react-router`，`react-hot-loader`，没有使用脚手架。

2. #### 第二阶段：

   学习基础的react语法，如下面demo中的todolist，但是不涉及到redux（统一状态管理），这个阶段学的特别快。主要是我上面列的一些知识点（jsx，组件之前数据传递，react-router，PropTypes），最主要的就是一个模块化的概念，个人感觉学过vue的，理解模块化，上手应该是蛮快的。

3. #### 第三阶段：

   学习redux，当时是因为组建太多，而数据需要一层一层的传递进去，比较麻烦，就学了redux，讲状态统一管路，在用到的组件直接使用redux调用相应的状态就好了。【这个学习的成本蛮高的，主要是理解，理解了之后使用起来很简单。】

   想快速上手的话，可以学习mobx，这个相对于redux更加简单，但对大型系统的话，redux更好，如果你想快速使用redux做项目开发，可以建议使用相关的框架，我上面也提到了，阿里的[ant-design-pro](https://link.jianshu.com?t=https%3A%2F%2Fpro.ant.design%2Findex-cn)，具体的教程官方都有，这里需要说的一点是，这个框架是配合阿里的redux框架[dva](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2Fdvajs%2Fdva)使用的。大家有兴趣可以看一下。

我自己的一些总结，单单学react是不难的，难的是要和一些工具混合来用，往往这个过程的成本最高。比如使用webpack构建，redux管理状态，[redux-thunk](https://link.jianshu.com?t=http%3A%2F%2Fwww.redux.org.cn%2F)或者[redux-saga](https://link.jianshu.com?t=http%3A%2F%2Fleonshi.com%2Fredux-saga-in-chinese%2Fdocs%2Fapi%2Findex.html)来处理异步action。

还有一个很大的趋势就是前端变化很快，拿`react-router`来说，你做了一个项目，`react-router@2.0.0`是能完美跑起来的，但是换成了当换成了`react-router@3.0.0`，基本上就跑不起来了，更何况现在的`react-router`已经出到4.0，

相应的`webpack`也是这样，当时一些开发者基于`webpack1.0`开发的，当webpack升到2.0的时候，`webpack.config,js`里面的文件要重新配置了。现在`webpack`已经更新到了3.0。

### 三、关于react的网站

##### 1，各个官网：英语好的话，真的推荐去官网看。

2， 阮一峰的文档：[react的入门](https://link.jianshu.com?t=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2015%2F03%2Freact.html)，webpack的入门，[react-router](https://link.jianshu.com?t=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2016%2F05%2Freact_router.html)

3，react的一些框架和一些轮子：

> 3.1 : 有赞团队 ： [zent](https://link.jianshu.com?t=https%3A%2F%2Fwww.youzanyun.com%2Fzanui%2Freact%2Fguides%2Finstall);(也是一两个月前刚开源的);
>
> 3.2 : 蚂蚁金服：[Ant-dedign](https://link.jianshu.com?t=https%3A%2F%2Fant.design%2Fdocs%2Freact%2Fintroduce-cn) , [Ant-design-mobile](https://link.jianshu.com?t=https%3A%2F%2Fmobile.ant.design%2Fdocs%2Freact%2Fintroduce)，[ant-design-pro](https://link.jianshu.com?t=https%3A%2F%2Fpro.ant.design%2Findex-cn);
>
> 3.3 : react-weui ：[react-weui](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2Fweui%2Freact-weui)
>
> 3.4 : react-awesome : [react-awesome](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2Fenaqx%2Fawesome-react)

4，一个渐进的学react的demo。

里面基本上涉及到了，react入门的所有涵盖的知识，他都是自己搭的，没有使用脚手架工具。里面也涵盖了webpack的一些配置，对于新手学习蛮好的。



### 四、小案列（自己前段时间写的一些小demo，比较low，大家可以看看）
