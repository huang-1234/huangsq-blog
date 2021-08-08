# Vue-router原理

## 实现一

vue-router是vue项目的重要组成部分，用于构建单页应用。单页应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。路由的本质就是建立url和页面之间的映射关系。

## hash模式

hash模式是vue-router的默认模式。hash指的是url描点，当描点发生变化的时候，浏览器只会修改访问历史记录，不会访问服务器重新获取页面。因此可以监听描点值的变化，根据描点值渲染指定dom。

### 实现原理

- 改变描点

可以通过`location.hash = "/hashpath"`的方式修改浏览器的hash值。

- 监听描点变化

可以通过监听hashchange事件监听hash值的变化。

```js
window.addEventListener('hashchange', () => {
   const hash = window.location.hash.substr(1)
   // 根据hash值渲染不同的dom
})
```

## history模式

hash模式下，url可能为以下形式：

```js
http://localhost:8080/index.html#/book?bookid=1
```

上面的url中既有#又有?，会让url看上去很奇怪，因此，可以使用history模式，在此模式下，url会如下面所示：

```js
http://localhost:8080/book/1
```

### 实现原理

- 改变url

H5的history对象提供了pushState和replaceState两个方法，当调用这两个方法的时候，url会发生变化，浏览器访问历史也会发生变化，但是浏览器不会向后台发送请求。

```js
// 第一个参数：data对象，在监听变化的事件中能够获取到
// 第二个参数：title标题
// 第三个参数：跳转地址
history.pushState({}, "", '/a')
```

- 监听url变化

可以通过监听popstate事件监听history变化，也就是点击浏览器的前进或者后退功能时触发。

```js
window.addEventListener("popstate", () => {
    const path = window.location.pathname
    // 根据path不同可渲染不同的dom
})
```

### 服务端支持

当使用hash模式的时候，如果手动刷新浏览器，页面也能够正常显示。但是在history模式下，刷新浏览器就会出现问题。

如访问`http://localhost:8080/book/1`时，服务端会查找是否有相应的html能够匹配此路径，在单页应用下，服务端只有一个index.html，所以此时匹配不到，会提示404。针对这个问题，需要服务端进行history模式支持。

#### node服务

在nodejs服务中，可以引入`connect-history-api-fallback`插件：

```js
const path = require('path')
// 导入处理 history 模式的模块
const history = require('connect-history-api-fallback')
// 导入 express
const express = require('express')

const app = express()
// 注册处理 history 模式的中间件
app.use(history())
// 处理静态资源的中间件，网站根目录 ../web
app.use(express.static(path.join(__dirname, '../web')))

// 开启服务器，端口是 3000
app.listen(3000, () => {
  console.log('服务器开启，端口：3000')
})
```

#### nginx服务

在nginx服务中，可以如下方式修改配置文件，添加history模式支持：

```js
location / {
    root html;
    index index.html index.htm;
    #新添加内容
    #尝试读取$uri(当前请求的路径)，如果读取不到读取$uri/这个文     件夹下的首页
    #如果都获取不到返回根目录中的 index.html
    try_files $uri $uri/ /index.html;
}
```

## 实现自定义VueRouter

VueRouter核心是，通过Vue.use注册插件，在插件的install方法中获取用户配置的router对象。当浏览器地址发生变化的时候，根据router对象匹配相应路由，获取组件，并将组件渲染到视图上。

主要有三个重要点：

- 如何在install方法中获取vue实例上的router属性。

可以利用Vue.mixin混入声明周期函数beforeCreate，在beforeCreate函数中可以获取到Vue实例上的属性并赋值到Vue原型链上。

```js
_Vue.mixin({
   beforeCreate () {
      if (this.$options.router) {
        _Vue.prototype.$router = this.$options.router
      }
   }
})
```

- 如何触发更新

hash模式下：

1. 通过location.hash修改hash值，触发更新。
2. 通过监听hashchange事件监听浏览器前进或者后退，触发更新。

history模式下：

1. 通过history.pushState修改浏览器地址，触发更新。
2. 通过监听popstate事件监听浏览器前进或者后退，触发更新。

- 如何渲染router-view组件

1. 通过Vue.observable在router实例上创建一个保存当前路由的监控对象current。
2. 当浏览器地址变化的时候，修改监控对象current。
3. 在router-view组件中监听监控对象current的变化，当current变化后，获取用户注册的相应component，并利用h函数将component渲染成vnodes，进而更新页面视图。

完整版

```js
// 存储全局使用的Vue对象
let _Vue = null
class VueRouter {
  // vue.use要求plugin具备一个install方法
  static install (Vue) {
    // 判断插件是否已经安装过
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    _Vue = Vue

    // 将main文件中实例化Vue对象时传入的router对象添加到Vue的原型链上。
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    // 用于快速查找route
    this.routeMap = {}
    this.data = _Vue.observable({
      current: window.location.hash.substr(1)
    })
    this.init()
  }

  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap () {
    // 遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents (Vue) {
    // 注册router-link组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      methods: {
        clickHandler (e) {
          // 修改hash
          location.hash = this.to
          // 修改current，触发视图更新
          this.$router.data.current = this.to
          e.preventDefault()
        }
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      }
    })
    const that = this
    // 注册router-view插件
    Vue.component('router-view', {
      render (h) {
        const component = that.routeMap[that.data.current]
        return h(component)
      }
    })
  }

  initEvent () {
    // 在hash发生更改的时候，修改current属性，触发组件更新
    window.addEventListener('hashchange', () => {
      this.data.current = window.location.hash.substr(1)
    })
  }
}

export default VueRouter
```

## 实现二

## 后端路由简介

路由这个概念最先是后端出现的。在以前用模板引擎开发页面时，经常会看到这样

```bash
http://www.xxx.com/login
```

大致流程可以看成这样：

1. 浏览器发出请求
2. 服务器监听到80端口（或443）有请求过来，并解析url路径
3. 根据服务器的路由配置，返回相应信息（可以是 html 字串，也可以是 json 数据，图片等）
4. 浏览器根据数据包的 Content-Type 来决定如何解析数据

简单来说路由就是用来跟后端服务器进行交互的一种方式，通过不同的路径，来请求不同的资源，请求不同的页面是路由的其中一种功能。

## 前端路由

#### 1. hash 模式

随着 ajax 的流行，异步数据请求交互运行在不刷新浏览器的情况下进行。而异步交互体验的更高级版本就是 SPA —— 单页应用。单页应用不仅仅是在页面交互是无刷新的，连页面跳转都是无刷新的，为了实现单页应用，所以就有了前端路由。
类似于服务端路由，前端路由实现起来其实也很简单，就是匹配不同的 url 路径，进行解析，然后动态的渲染出区域 html 内容。但是这样存在一个问题，就是 url 每次变化的时候，都会造成页面的刷新。那解决问题的思路便是在改变 url 的情况下，保证页面的不刷新。在 2014 年之前，大家是通过 hash 来实现路由，url hash 就是类似于：

```bash
http://www.xxx.com/#/login
```

这种 #。后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。另外每次 hash 值的变化，还会触发`hashchange` 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。然后我们便可以监听`hashchange`来实现更新页面部分内容的操作：

```js
function matchAndUpdate () {
   // todo 匹配 hash 做 dom 更新操作
}

window.addEventListener('hashchange', matchAndUpdate)
```

#### 2. history 模式

14年后，因为HTML5标准发布。多了两个 API，`pushState` 和 `replaceState`，通过这两个 API 可以改变 url 地址且不会发送请求。同时还有` popstate` 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。用了 HTML5 的实现，单页路由的 url 就不会多出一个#，变得更加美观。但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。

```js
function matchAndUpdate () {
   // todo 匹配路径 做 dom 更新操作
}

window.addEventListener('popstate', matchAndUpdate)
```

## Vue router 实现

我们来看一下`vue-router`是如何定义的：

```js
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [...]
})

new Vue({
  router
  ...
})
```

可以看出来`vue-router`是通过 `Vue.use`的方法被注入进 Vue 实例中，在使用的时候我们需要全局用到 `vue-router`的`router-view`和`router-link`组件，以及`this.$router/$route`这样的实例对象。那么是如何实现这些操作的呢？下面我会分几个章节详细的带你进入`vue-router`的世界。(阅读源码是有点枯燥，但是带着问题去了解，就感觉很有意思。如果你对 vue-router 的实现机制也存在一些疑问，可以一起探讨交流)

[vue-router 实现 -- install](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fmuwoo%2Fblogs%2Fissues%2F23)

[vue-router 实现 -- new VueRouter(options)](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fmuwoo%2Fblogs%2Fissues%2F24)

[vue-router 实现 -- HashHistory](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fmuwoo%2Fblogs%2Fissues%2F25)

## 具体实现

### 1. vue-router 实现 -- install

Vue 通过 use 方法，加载`VueRouter`中的 install 方法。install 完成 Vue 实例对 VueRouter 的挂载过程。下面我们来分析一下具体的执行过程：

```js
export function install (Vue) {
 // ...
  // 混入 beforeCreate 钩子
  Vue.mixin({
    beforeCreate () {
      // 在option上面存在router则代表是根组件
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        // 执行_router实例的 init 方法
        this._router.init(this)
        // 为 vue 实例定义数据劫持
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 非根组件则直接从父组件中获取
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  // 设置代理，当访问 this.$router 的时候，代理到 this._routerRoot._router
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })
  // 设置代理，当访问 this.$route 的时候，代理到 this._routerRoot._route
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  // 注册 router-view 和 router-link 组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  // Vue钩子合并策略
  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
  // ...
}
```

在构造`Vue`实例的时候，我们会传入`router`对象：

```js
new Vue({
  router
})
```

此时的`router`会被挂载到 Vue 的跟组件`this.$options`选项中。在 option 上面存在 router 则代表是根组件。如果存在`this.$options`，则对`_routerRoot` 和 `_router`进行赋值操作，之后执行 `_router.init() `方法。

为了让 _router 的变化能及时响应页面的更新，所以又接着又调用了 `Vue.util.defineReactive`方法来进行`get`和`set`的响应式数据定义。

然后通过 `registerInstance(this, this)`这个方法来实现对`router-view`的挂载操作：

```js
 // 执行 vm.$options._parentVnode.data.registerRouteInstance 渲染 router-view 组件
 const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }
```

因为只有 router-view 组件定义了`data.registerRouteInstance`函数。`data.registerRouteInstance` 主要用来执行 render 的操作，创建 router-view 组件的 Vnode ：

```js
data.registerRouteInstance = (vm, val) => {
  // ...
  return h(component, data, children)
}
```

后续步骤便是为Vue全局实例注册2个属性`$router`和`$route`；以及组件`RouterView`和`RouterLink`。

关于`Vue.config.optionMergeStrategies` 参考 [自定义选项合并策略](https://cn.vuejs.org/v2/guide/mixins.html#自定义选项合并策略)。下一篇我们会接着介绍一下 VueRouter 实例化的过程
有兴趣可以移步[vue-router 实现 -- new VueRouter(options)](https://github.com/muwoo/blogs/issues/24)

### 2. new VueRouter(options)

为了构造出 `router` 对象，我们还需要对`VueRouter`进行实例化的操作，比如这样：

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/foo', name: 'foo', component: Foo },
    { path: '/bar/:id', name: 'bar', component: Bar }
  ]
})
```

#### constructor

我们来看一下在`VueRouter`内部的源码定义：

```ts
export default class VueRouter {

  // ...
  constructor (options: RouterOptions = {}) {
    this.app = null
    this.apps = []
    this.options = options
    this.beforeHooks = []
    this.resolveHooks = []
    this.afterHooks = []
    this.matcher = createMatcher(options.routes || [], this)

    let mode = options.mode || 'hash'
    this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
    if (this.fallback) {
      mode = 'hash'
    }
    if (!inBrowser) {
      mode = 'abstract'
    }
    this.mode = mode

    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
  }

  match (
    raw: RawLocation,
    current?: Route,
    redirectedFrom?: Location
  ): Route {
    return this.matcher.match(raw, current, redirectedFrom)
  }

  get currentRoute (): ?Route {
    return this.history && this.history.current
  }

  init () {}
  beforeEach () {}
  beforeResolve () {}
  afterEach () {}
  onReady () {}
  onError () {}
  push () {}
  replace () { }
  go () {}
  back () { }
  forward () { }
  getMatchedComponents () { }
  resolve ( ) { }
  addRoutes () { }
}
```

这里我们忽略了大部分的函数实现，后面我么再展开来看。先来看一下`constructor`实例化的时候将会做的处理：通过`new VueRouter({...})`我们创建了一个` VueRouter` 的实例。
VueRouter中通过参数`mode`来指定路由模式，前面已经简单的了解了一下前端路由的2种模式。通过上面的代码，我们可以看出来 `VueRouter`对不同模式的实现大致是这样的：

1. 首先根据`mode`来确定所选的模式，如果当前环境不支持`history`模式，会强制切换到hash模式；
2. 如果当前环境不是浏览器环境，会切换到`abstract`模式下。然后再根据不同模式来生成不同的history操作对象。

由于上篇文章已经介绍了在 install 的过程中，会执行改对象的 init 函数。我们接下来的主要任务就是分析init 的实现。

#### init

```js
  init (app: any /* Vue component instance */) {
    // ...
    this.apps.push(app)

    // main app already initialized.
    if (this.app) {
      return
    }

    this.app = app

    const history = this.history

    if (history instanceof HTML5History) {
      history.transitionTo(history.getCurrentLocation())
    } else if (history instanceof HashHistory) {
      const setupHashListener = () => {
        history.setupListeners()
      }
      history.transitionTo(
        history.getCurrentLocation(),
        setupHashListener,
        setupHashListener
      )
    }

    history.listen(route => {
      this.apps.forEach((app) => {
        app._route = route
      })
    })
  }
```

回顾一下在 inistall 的 beforCreate 钩子内，我们通过这种方式调用了实例的`init`方法：

```js
this._router.init(this)
```

然后我们来分析一下执行的大致过程：init 方法内的 `app`变量便是存储的当前的vue实例的`this`。然后将 app 存入数组`apps`中。通过`this.app`判断是实例否已经被初始化。然后通过`history`来确定不同路由的切换动作动作` history.transitionTo`。最后通过` history.listen`来注册路由变化的响应回调。
接下来我们就要了解一下 `history.transitionTo`的主要流程以及 `history.listen`的实现。当然最基础的是先明白`history`是个什么东西。接下来我们会分别介绍不同`mode`下的 history 的实现。

### 3. HashHistory

因为我们用的比较多的是 vue 的 HashHistory。下面我们首先来介绍一下 HashHistory。我们知道，通过`mode`来确定使用 `history`的方式，如果当前`mode = 'hash'`，则会执行：

```js
this.history = new HashHistory(this, options.base, this.fallback)
```

`this.fallback`是用来判断当前`mode = 'hash'`是不是通过降级处理的：

```js
this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
```

接下来我们看看`HashHistory`的内部实现，首先是看一下 `new HashHistory()`的时候，实例化做了哪些事：

#### constructor

```js
// 继承 History 基类
export class HashHistory extends History {
  constructor (router: VueRouter, base: ?string, fallback: boolean) {
    // 调用基类构造器
    super(router, base)

    // 如果说是从 history 模式降级来的
    // 需要做降级检查
    if (fallback && this.checkFallback()) {
      // 如果降级 且 做了降级处理 则什么也不需要做
      return
    }
    // 保证 hash 是以 / 开头
    ensureSlash()
  }
// ...
}

function checkFallback (base) {
    // 得到除去 base 的真正的 location 值
    const location = getLocation(this.base)
    if (!/^\/#/.test(location)) {
      // 如果说此时的地址不是以 /# 开头的
      // 需要做一次降级处理 降级为 hash 模式下应有的 /# 开头
      window.location.replace(
        cleanPath(this.base + '/#' + location)
      )
      return true
    }
}

// 保证 hash 以 / 开头
function ensureSlash (): boolean {
  // 得到 hash 值
  const path = getHash()
  // 如果说是以 / 开头的 直接返回即可
  if (path.charAt(0) === '/') {
    return true
  }
  // 不是的话 需要手工保证一次 替换 hash 值
  replaceHash('/' + path)
  return false
}

export function getHash (): string {
  // 因为兼容性问题 这里没有直接使用 window.location.hash
  // 因为 Firefox decode hash 值
  const href = window.location.href
  const index = href.indexOf('#')
  // 如果此时没有 # 则返回 ''
  // 否则 取得 # 后的所有内容
  return index === -1 ? '' : href.slice(index + 1)
}
```

可以看到在实例化过程中主要做两件事情：针对于不支持` history api` 的降级处理，以及保证默认进入的时候对应的 hash 值是以 / 开头的，如果不是则替换。

如果细心点，可以发现这里并没有对 `hashchange`事件做处理。主要是因为这个问题：[beforeEnter fire twice on root path ('/') after async next call](https://github.com/vuejs/vue-router/issues/725)。

简要来说就是说如果在 `beforeEnter` 这样的钩子函数中是异步的话，`beforeEnter` 钩子就会被触发两次，原因是因为在初始化的时候如果此时的 hash 值不是以 / 开头的话就会补上 #/，这个过程会触发` hashchange` 事件，所以会再走一次生命周期钩子，也就意味着会再次调用 `beforeEnter` 钩子函数。

#### transitionTo

还记得 `init`的时候，有这样的动作：

```js
   if (history instanceof HTML5History) {
      history.transitionTo(history.getCurrentLocation())
    } else if (history instanceof HashHistory) {
      const setupHashListener = () => {
        history.setupListeners()
      }
      history.transitionTo(
        history.getCurrentLocation(),
        setupHashListener,
        setupHashListener
      )
    }
```

如果`history` 是 `HashHistory` 的实例。则调用`history`的`transitionTo`方法。调用`transitionTo`的时候传入了3个参数，第一个是`history.getCurrentLocation()`，后面的都是`setupHashListener`。先来看一下`getCurrentLocation`:

```
  getCurrentLocation () {
    return getHash()
  }
```

也就是返回了当前路径。接着是`setupHashListener`函数，其内部定义了`history.setupListeners()`的执行。后面我们在具体分析他所做的工作，我们现在只需要明白这几个参数的含义。
接下来我们来看一下`transitionTo`的实现：

```js
  transitionTo (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const route = this.router.match(location, this.current)
    this.confirmTransition(route, () => {
      this.updateRoute(route)
      onComplete && onComplete(route)
      this.ensureURL()

      // fire ready cbs once
      if (!this.ready) {
        this.ready = true
        this.readyCbs.forEach(cb => { cb(route) })
      }
    }, err => {
      if (onAbort) {
        onAbort(err)
      }
      if (err && !this.ready) {
        this.ready = true
        this.readyErrorCbs.forEach(cb => { cb(err) })
      }
    })
  }
```

该函数执行的时候，先去定义了`route`变量：

```
const route = this.router.match(location, this.current)
```

我们知道`location`代表了当前的 hash 路径。那么`this.current`又是什么呢？不要着急，我们找到`this.current`的定义：

```js
export function createRoute (
  record: ?RouteRecord,
  location: Location,
  redirectedFrom?: ?Location,
  router?: VueRouter
): Route {
  const stringifyQuery = router && router.options.stringifyQuery

  let query: any = location.query || {}
  try {
    // 一个深拷贝
    query = clone(query)
  } catch (e) {}

  const route: Route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  }
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery)
  }
  return Object.freeze(route)
}

export const START = createRoute(null, {
  path: '/'
})

this.current = START
```



`this.current`就是`START`，通过`createRoute`来创建返回。注意返回的是通过`Object.freeze`定义的只读对象 route。可以简单看一下大致返回的内容可能是这样的：

接着，我们会调用`this.router.match`方法，来获取`route`对象。来看一下`match`方法：

```js
  this.matcher = createMatcher(options.routes || [], this)
  match (
    raw: RawLocation,
    current?: Route,
    redirectedFrom?: Location
  ): Route {
    return this.matcher.match(raw, current, redirectedFrom)
  }
```

大致能看出来 `match`函数执行`this.macher`对象的`match`方法调用。`this.matcher `对象通过`createMatcher`方法返回。看一下`this.matcher.match`方法：

```js
  function match (
    raw: RawLocation,  // 目标url
    currentRoute?: Route, // 当前url对应的route对象
    redirectedFrom?: Location // 重定向
  ): Route {
    // 解析当前 url，得到 hash、path、query和name等信息
    const location = normalizeLocation(raw, currentRoute, false, router)
    const { name } = location
    // 如果是命名路由
    if (name) {
      //  得到路由记录
      const record = nameMap[name]
      // 不存在记录 返回
      if (!record) return _createRoute(null, location)
      const paramNames = record.regex.keys
        .filter(key => !key.optional)
        .map(key => key.name)

      if (typeof location.params !== 'object') {
        location.params = {}
      }
      // 复制 currentRoute.params 到  location.params
      if (currentRoute && typeof currentRoute.params === 'object') {
        for (const key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key]
          }
        }
      }
      // 如果存在 record 记录
      if (record) {
        location.path = fillParams(record.path, location.params, `named route "${name}"`)
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      // 处理非命名路由
      location.params = {}
       // 这里会遍历pathList，找到合适的record，因此命名路由的record查找效率更高
      for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i]
        const record = pathMap[path]
        if (matchRoute(record.regex, location.path, location.params)) {
          return _createRoute(record, location, redirectedFrom)
        }
      }
    }
    // 没有匹配到的情况
    return _createRoute(null, location)
  }
```

这里我们可能需要理解一下`pathList`、`pathMap`、`nameMap`这几个变量。他们是通过`createRouteMap`来创建的几个对象：

```
const { pathList, pathMap, nameMap } = createRouteMap(routes)
```

routes 使我们定义的路由数组，可能是这样的：

```js
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/foo', name: 'foo', component: Foo },
    { path: '/bar/:id', name: 'bar', component: Bar }
  ]
})
```

而 `createRouteMap`主要作用便是处理传入的`routes`属性，整理成3个对象：

所以 `match`的主要功能是通过目标路径匹配定义的route 数据，根据匹配到的记录，来进行`_createRoute`操作。而`_createRoute`会根据RouteRecord执行相关的路由操作，最后返回Route对象：

```js
  function _createRoute (
    record: ?RouteRecord,
    location: Location,
    redirectedFrom?: Location
  ): Route {
    // 重定向
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    // 别名
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    // 普通路由
    return createRoute(record, location, redirectedFrom, router)
  }
```

现在我们知道了`this.mather.match`最终返回的就是`Route`对象。到这里，我们再回到之前所说的`transitionTo`方法：

```js
transitionTo (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    // 匹配目标url的route对象
    const route = this.router.match(location, this.current)
    // 调用this.confirmTransition，执行路由转换
    this.confirmTransition(route, () => {
      // ...跳转完成
      this.updateRoute(route)
      onComplete && onComplete(route)
      this.ensureURL()
      // fire ready cbs once
      if (!this.ready) {
        this.ready = true
        this.readyCbs.forEach(cb => { cb(route) })
      }
    }, err => {
      // ...处理异常
    })
  }
}
```

得到正确的路由对象`route`后，我们开始跳转动作`confirmTransition`。接下来看看`confirmTransition`的主要操作

#### confirmTransition

```js
  confirmTransition (route: Route, onComplete: Function, onAbort?: Function) {
    const current = this.current
    // 定义中断处理
    const abort = err => {
      // ...
      onAbort && onAbort(err)
    }

    // 同路由且 matched.length 相同
    if (
      isSameRoute(route, current) &&
      // in the case the route map has been dynamically appended to
      route.matched.length === current.matched.length
    ) {
      this.ensureURL()
      return abort()
    }

    const {
      updated,
      deactivated,
      activated
    } = resolveQueue(this.current.matched, route.matched)

    // 整个切换周期的队列
    const queue: Array<?NavigationGuard> = [].concat(
      // 得到即将被销毁组建的 beforeRouteLeave 钩子函数
      extractLeaveGuards(deactivated),
      // 全局 router before hooks
      this.router.beforeHooks,
      // 得到组件 updated 钩子
      extractUpdateHooks(updated),
      // 将要更新的路由的 beforeEnter 钩子
      activated.map(m => m.beforeEnter),
      // 异步组件
      resolveAsyncComponents(activated)
    )

    this.pending = route
    // 每一个队列执行的 iterator 函数
    const iterator = (hook: NavigationGuard, next) => {
       // ...
    }


    // 执行队列 leave 和 beforeEnter 相关钩子
    runQueue(queue, iterator, () => {
       // ...
    })
  }
```

这里有一个很关键的路由对象的 matched 实例，从上次的分析中可以知道它就是匹配到的路由记录的合集；这里从执行顺序上来看有这些 `resolveQueue`、`extractLeaveGuards`、`extractUpdateHooks`、`resolveAsyncComponents`、`runQueue` 关键方法。我们先来看看`resolveQueue`方法：

###### 1. resolveQueue

```js
function resolveQueue (
  current: Array<RouteRecord>,
  next: Array<RouteRecord>
): {
  updated: Array<RouteRecord>,
  activated: Array<RouteRecord>,
  deactivated: Array<RouteRecord>
} {
  let i
  // 取得最大深度
  const max = Math.max(current.length, next.length)
  for (i = 0; i < max; i++) {
    // 如果记录不一样则停止
    if (current[i] !== next[i]) {
      break
    }
  }

  // 分别返回哪些需要更新，哪些需要激活，哪些需要卸载
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}
```

可以看出` resolveQueue` 就是交叉比对当前路由的路由记录和现在的这个路由的路由记录来确定出哪些组件需要更新，哪些需要激活，哪些组件被卸载。再执行其中的对应钩子函数。

###### 2. extractLeaveGuards/extractUpdateHooks

```js
function extractLeaveGuards (deactivated: Array<RouteRecord>): Array<?Function> {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractGuards (
  records: Array<RouteRecord>,
  name: string,
  bind: Function,
  reverse?: boolean
): Array<?Function> {
  const guards = flatMapComponents(records, (def, instance, match, key) => {
    // 获取组建的 beforeRouteLeave 钩子函数
    const guard = extractGuard(def, name)
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(guard => bind(guard, instance, match, key))
        : bind(guard, instance, match, key)
    }
  })
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def: Object | Function,
  key: string
): NavigationGuard | Array<NavigationGuard> {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def)
  }
  return def.options[key]
}

export function flatMapComponents (
  matched: Array<RouteRecord>,
  fn: Function
): Array<?Function> {
  return flatten(matched.map(m => {
    // 遍历得到组建的 template, instance, macth，和组件名
    return Object.keys(m.components).map(key => fn(
      m.components[key],
      m.instances[key],
      m, key
    ))
  }))
}

// 抹平数组得到一个一维数组
export function flatten (arr: Array<any>): Array<any> {
  return Array.prototype.concat.apply([], arr)
}
```

总的来说 `extractLeaveGuards`的功能就是找到即将被销毁的路由组件的`beforeRouteLeave`钩子函数。处理成一个由深到浅的顺序组合的数组。接下来的`extractUpdateHooks`函数功能也是类似，主要是处理`beforeRouteUpdate`钩子函数。这里不再过多介绍了。

```
function extractUpdateHooks (updated: Array<RouteRecord>): Array<?Function> {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}
```

###### 3. resolveAsyncComponents

```js
export function resolveAsyncComponents (matched: Array<RouteRecord>): Function {
  // 返回“异步”钩子函数
  return (to, from, next) => {
    let hasAsync = false
    let pending = 0
    let error = null

    flatMapComponents(matched, (def, _, match, key) => {
      // 这里假定说路由上定义的组件 是函数 但是没有 options
      // 就认为他是一个异步组件。
      // 这里并没有使用 Vue 默认的异步机制的原因是我们希望在得到真正的异步组件之前
      // 整个的路由导航是一直处于挂起状态
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true
        // ...

      }
    })

    if (!hasAsync) next()
  }
}
```

这里主要是用来处理异步组建的问题，通过判断路由上定义的组件 是函数且没有 options来确定异步组件，然后在得到真正的异步组件之前将其路由挂起。

###### 4. runQueue

```js
export function runQueue (queue: Array<?NavigationGuard>, fn: Function, cb: Function) {
  const step = index => {
    // 如果全部执行完成则执行回调函数 cb
    if (index >= queue.length) {
      cb()
    } else {
      // 如果存在对应的函数
      if (queue[index]) {
        // 这里的 fn 传过来的是个 iterator 函数
        fn(queue[index], () => {
          // 执行队列中的下一个元素
          step(index + 1)
        })
      } else {
        // 执行队列中的下一个元素
        step(index + 1)
      }
    }
  }
  // 默认执行钩子队列中的第一个数据
  step(0)
}
```

我们知道在`confirmTransition`中通过这样的方式来调度队列的执行：

```
 runQueue(queue, iterator, () => { })
```

为`runQueue`函数 fn 参数传入了一个`iterator`函数。接下来我们看看`iterator`函数的执行：

```js
this.pending = route
const iterator = (hook: NavigationGuard, next) => {
  // 如果当前处理的路由，已经不等于 route 则终止处理
  if (this.pending !== route) {
    return abort()
  }
  try {
    // hook 是queue 中的钩子函数，在这里执行
    hook(route, current, (to: any) => {
      // 钩子函数外部执行的 next 方法
      // next(false): 中断当前的导航。
      // 如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)
      // 那么 URL 地址会重置到 from 路由对应的地址。
      if (to === false || isError(to)) {
        this.ensureURL(true)
        abort(to)
      } else if (
        // next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。
        // 当前的导航被中断，然后进行一个新的导航。
        typeof to === 'string' ||
        (typeof to === 'object' && (
          typeof to.path === 'string' ||
          typeof to.name === 'string'
        ))
      ) {
        // next('/') or next({ path: '/' }) -> redirect
        abort()
        if (typeof to === 'object' && to.replace) {
          this.replace(to)
        } else {
          this.push(to)
        }
      } else {
        // 当前钩子执行完成，移交给下一个钩子函数
        // 注意这里的 next 指的是 runQueue 中传过的执行队列下一个方法函数: step(index + 1)
        next(to)
      }
    })
  } catch (e) {
    abort(e)
  }
}
```

我们来屡一下现在主要的流程：

1. 执行`transitionTo`函数，先得到需要跳转路由的 match 对象`route`
2. 执行`confirmTransition`函数
3. `confirmTransition`函数内部判断是否是需要跳转，如果不需要跳转，则直接中断返回
4. `confirmTransition`判断如果是需要跳转，则先得到钩子函数的任务队列 queue
5. 通过 `runQueue` 函数来批次执行任务队列中的每个方法。
6. 在执 queue 的钩子函数的时候，通过`iterator`来构造迭代器由用户传入 `next`方法，确定执行的过程
7. 一直到整个队列执行完毕后，开始处理完成后的回调函数。

大致流程便是这样，我们接下来看处理完整个钩子函数队列之后将要执行的回调是什么样的：

```js
runQueue(queue, iterator, () => {
  const postEnterCbs = []
  const isValid = () => this.current === route
  // 获取 beforeRouteEnter 钩子函数
  const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)
  // 获取 beforeResolve 钩子函数 并合并生成另一个 queue
  const queue = enterGuards.concat(this.router.resolveHooks)
  runQueue(queue, iterator, () => {
    // 处理完，就不需要再次执行
    if (this.pending !== route) {
      return abort()
    }
    // 清空
    this.pending = null
    // 调用 onComplete 函数
    onComplete(route)
    if (this.router.app) {
      // nextTick 执行 postEnterCbs 所有回调
      this.router.app.$nextTick(() => {
        postEnterCbs.forEach(cb => { cb() })
      })
    }
  })
})
```

可以看到，处理完整个钩子函数队列之后将要执行的回调主要就是接入路由组件后期的钩子函数`beforeRouteEnter`和`beforeResolve`，并进行队列执行。一切处理完成后，开始执行`transitionTo`的回调函数`onComplete`：

```js
this.confirmTransition(route, () => {
  // 更新 route
  this.updateRoute(route)
  // 执行 onComplete
  onComplete && onComplete(route)
  // 更新浏览器 url
  this.ensureURL()

  // 调用 ready 的回调
  if (!this.ready) {
    this.ready = true
    this.readyCbs.forEach(cb => { cb(route) })
  }
}, err => {
  // ...
})

updateRoute (route: Route) {
    const prev = this.current
    // 当前路由更新
    this.current = route
    // cb 执行
    this.cb && this.cb(route)
    // 调用 afterEach 钩子
    this.router.afterHooks.forEach(hook => {
      hook && hook(route, prev)
    })
}
```

可以看到，到这里，已经完成了对当前 route 的更新动作。我们之前已经分析了，在 `install`函数中设置了对`route`的数据劫持。此时会触发页面的重新渲染过程。还有一点需要注意，在完成路由的更新后，同时执行了`onComplete && onComplete(route)`。而这个便是在我们之前篇幅中介绍的`setupHashListener`:

```js
const setupHashListener = () => {
  history.setupListeners()
}
history.transitionTo(
  history.getCurrentLocation(),
  setupHashListener,
  setupHashListener
)


setupListeners () {
  const router = this.router
  // 处理滚动
  const expectScroll = router.options.scrollBehavior
  const supportsScroll = supportsPushState && expectScroll

  if (supportsScroll) {
    setupScroll()
  }
  // 通过 supportsPushState 判断监听popstate 还是 hashchange
  window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', () => {
    const current = this.current
    // 判断路由格式
    if (!ensureSlash()) {
      return
    }
    this.transitionTo(getHash(), route => {
      if (supportsScroll) {
        handleScroll(this.router, route, current, true)
      }
      // 如果不支持 history 模式，则换成 hash 模式
      if (!supportsPushState) {
        replaceHash(route.fullPath)
      }
    })
  })
}
```

可以看到 `setupListeners`这里主要做了 2 件事情，一个是对路由切换滚动位置的处理，具体的可以参考这里[滚动行为](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#异步滚动)。另一个是对路由变动做了一次监听` window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', () => {})`。

#### 总结

到这里，`hash`模式下的主要操作便差不多介绍完成了，接下来我们会去介绍`history`模式。

参考：
[vue-router 源码分析-history](https://zhuanlan.zhihu.com/p/24574970)