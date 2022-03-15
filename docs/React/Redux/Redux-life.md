# Redux的前世-今生-来世

> 这不是源码解读哦!!!如果你希望看到源码解析,那我想你随便 google 一下就有很多啦,当然 Redux 的源码本身也是简单易懂。推荐直接阅读~ 的源码本身也是简单易懂,[欢迎直接查看源码](https://github.com/reactjs/redux/tree/master/src)。

作者: 赵玮龙

终于要更新了,第二篇文章就这样在清明节前给大家赶出来,希望你也能有个可以充实自己的假期。这次分享下这个已经很老的前端技术栈(相对于前端发展速度来看),说他老并没有说他的设计理念老,而是说它已经有自己的历史印记了。还记得第一次redux发版已经是2015年6月的事情了,其实它也经历了很多过往才是现在我们看到的样子哦。。。

在深挖历史之前先看看这个 lib 是干嘛的,是时候仔细研读下这个 Motivation 了,如果你还没有真正使用过Redux,那我建议你可以看下[文档](https://redux.js.org/introduction/motivation)前四章节: 动机,原理,三个原则,以及和其他理念的对比~

如果你已经使用过可以直接跳过到正片了,没有用过的可以听我简单在这里啰嗦两句~ 按照作者的理念,因为我们日渐复杂的前端逻辑和代码,并且越来越多的框架和库使用这个概念

```
  UI=f(data)

```

包括前端spa的流行我们日渐复杂的项目逻辑会有越来越难控制的 state, 也就是公式中的 data,而往往这些问题都来源于 data 本身可变的数据(mutation)和异步化(asynchronicity),作者把这两种问题的混合效应类比了这个[实验](https://en.wikipedia.org/wiki/Diet_Coke_and_Mentos_eruption)曼妥思和可乐,我在我家厕所试过。。劝你千万不要尝试。。。结局往往是爆炸的局面!!!那么这个lib就是用来规约这个状态让他可控的。(往往有人说Redux是一个全局状态管理模块,我个人觉得不尽然,它提供给我们所谓的规约以至于让我们的状态可控,它确实会维护一个唯一的状态state,并且所有的data都在这里,但是它是不是全局的却不是必须的!)

### 说完它本身的立意我们来谈谈它的心路历程:

### 前世:

从 release 最早的0.2.0到现在的4.0.0我们可以看到作者 Dan gaearon(也是我个人比较欣赏的开源作者之一)的心路历程,最早的 Redux 可不是现在的样子哦(虽然我也是从3.1.0才开始使用~)

最早的版本(遥想那时候 React 正在倡导自己的 Flux 单向数据流, Github 也有各种自己基于这个理念实现的类型库) Redux 也是基于 Flux 理念去实现的,在1.0.0之前 Redux 本身还涵盖了如今 react-redux 库的内容,自行封装了类似于 Connector, Provider 等高阶组件去完成 Redux 和 React 的衔接。(作者的目的也显而易见,希望你能无痛的在 React 中去使用 Redux)。那时候的 Flux 库大多高举 functional programming 的大旗,因为那时候这种向函数式编程借鉴的 Flux 概念本身也是这么想的,我们前面提到过让一切数据流向包括逻辑可控,这恰恰是 functional programming 里 prue function 的概念,这也和 React 当年做jsx语法的初衷一致。但是一旦抛出这样的理论就需要你的受众群体去接受这个概念

```
+--------+              +------------+            +-------+            +----+
| Action | +----------->+ Dispatcher +----------->+ Store +----------->+View|
+--------+              +-------+----+            +-------+            +-+--+
                                ^                                        |
                                |                                        |
                                |                                        |
                                |                                        |
                                +----------------------------------------+

```

我们可以发现数据流向是单向的,这就是 Flux 核心理念,而 Redux 确实是遵循了这个理念但是又有些不同,不同在哪呢?

```
+----------+
|          |                +-----------+       sliceState,action        +------------+
|  Action  |dispacth(action)|           +-------------------------------->            |
|          +---------------->   store   |                                |  Reducers  |
| Creators |                |           <--------------------------------+            |
|          |                +-----+-----+    (state, action) => state    +------------+
+-----^----+                      |
      |                           |
      |                           |subscribe
      |                           |
      |                           |
      |                           |
      |              +--------+   |
      +--------------+  View  <---+
                     +--------+


```

我们可以从图中看到没有了 Dispatcher 反而多了一个 Reducers,这里不得不提一个点就是所有的 Flux 架构都围绕着所谓 Predictable(可预测的) 的概念来维护 state, 那么如何做到可预测的也就是我们必须保证我们的 state Immutable(数据不可变), Flux 里依靠 dispatcher 来分发保证 Entity 的不可变性,而 Redux 中是依靠 pure function 的概念来保证每次的 state 都是原始 state 的一个快照, 也是这个核心公式的实践 (state, action) => state 这样你的 Reducers 其实就是这样的任意多个 function,如何拆分这些 function 就是你需要考虑的事情了。而如果是 pure function 的话也利于我们去做函数复用和单元测试。这就是 Redux 向函数式编程的概念借鉴的理念, 如果你熟悉 Elm 你一定知道 Model 的概念,要更新一个 Model 并且映射到 view 上你需要有 updater 去更新你的 Model,这里 Redux 借鉴了 updater 的概念去做 reducers 拆分和复用。如果你对 Elm 也感兴趣可以看[这里](https://guide.elm-lang.org/architecture/)。

其实函数式编程的理念也贯穿到了源码中,比如里面 compose 和 middleware 的实现,这些你都可以参考[源码](https://github.com/reactjs/redux/tree/master/src),有意思的是其实纵使连原作者在一些函数式编程概念上也会有没意识到的地方,在一些实现上也遵循了一些pr的意见,比如 compose 的实现:

从最早期的 reduceRight 改成 reduce 这点就能发现,迭代了三个大版本和多个小版本的作者依然没有意识到从右向左执行函数竟然可以不用 reduceRight,感兴趣的同学可以试验下,我当时看到这个pr也是惊讶这个提出者的 Lisp 或者 Haskell 功底啊,才能有这样的直觉!! (其实函数式编程确实是可以锻炼逻辑思维模式和你的数学意识,但是真的仅此而已,并不会在所谓性能和可读性上带来什么明显提升) 为了功能的完整和解耦性,之前的版本严重耦合 React 也做出了调整,把上面提到的通信高阶组件单独提到 react-redux 库单独维护了,这样 Redux 本身也更加纯净的做状态管理这件事。

### 今生:

在回顾了前世之后,我们来看看如今的 Redux, 在基于多个版本的迭代和大家的实践过后,无论是从概念本身还是从最佳实践的案例来看,包括 Github 上一些基于 Redux 做的封装都已经有了默认的最佳实践和使用规范,那我们来看看今天的 Redux 本身使用的场景和方式。 从上面的理念我们看出来如何拆分 reducer 和维护那个单一不可变 state  是我们使用 redux 最应该关注的事情。 我们下面主要说下在 React 中使用 Redux 的最佳实践方式: (现实应用场景中,我们如今大多数人应该还是使用 Redux+React 的开发方式, 如果你还是对于 Redux 是个初学者那么你应该看[这里](https://redux.js.org/basics/actions))。 为了讨论的具有一定的官方性,我们按照官方文档来看下(我会在我认为比较个人的想做出备注和阐述), 着重讨论以下三方面:

- 管理和维护唯一状态 state
- 如何拆分 reducer
- 异步状态处理

为什么先说 reducer 呢? 因为其实我们的 state 都是 reducer 组成的, 上面那张图可以看出 (state, action) => state 是计算出 state 的规约公式, createStore() 这个 api 也是接受你的 reducer 来生成 state 的。 我们先来看看最外层我们需要为 state 生成 Initinalizing state 方式:

```jsx
// 官网说无非两种方式
// 最外层你有一个reducer:
function rootReducer(state = 0, action) {  // 在你的createStore第二个参数没有的情况下,你是需要给state一个默认值
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
}

// 通过官方提供的combineReducer去生成这个rootReducer, 其实你观看源码的话这个方法return的还是一个 (state, action) => {}的函数
function a(state = 'zwl', action) { // 在你的createStore第二个参数没有的情况下,你是需要给state一个默认值
  return state;
}
 
function b(state = 'zwt', action) { // 在你的createStore第二个参数没有的情况下,你是需要给state一个默认值
  return state;
}

const rootReducer = combineReducers({ a, b })


```

既然初始化我们看到上面提到的规约公式可以初始化你的 state, 另一个数据流向是反向的, reducer 会从你的 state 拿到需要处理的 sliceState,这里就需要翻开书看看官方文档是怎么提这个所谓 state 的范式处理状态的, 文档会从三个地方提到这个 state 本身的规约处理,分别是

- [reducer基础结构后半段](https://redux.js.org/recipes/structuring-reducers/basic-reducer-structure)
- [state范式化](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)
- [更新范式化Data](https://redux.js.org/recipes/structuring-reducers/updating-normalized-data)

当然我觉得作者已经说的很清楚了,文章尾部也给了很多链接,但是这里还是有必要总结下这个规约的 state 范式化大概应该有些什么最佳实践:

```jsx
// 首先先看下这里的 state 基本结构,当然文档中也没有限制你,鼓励你根据自己的业务形态去定制,但是却是有些比较好的实践方式
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
// 区分领域的数据, 并且可能会有两种非领域数据类型,一种是页面上一些ui状态比如一个 button 是否展示的 boolean 值,这时候你会发现所谓的 sliceState 可能就是一个 domainData 或者是它下面的一个更小的分支,这个是根据你的 reducer 拆分规则指定的, 但是你可以想象下如果你的 data 是单纬数据结构或者简单数据结构,它就会非常好做逻辑计算,比如你有[a, b, c]单纬数组就比[{},{},{}]要好删查改除!
{
  domainData1: {},
  domainData2: {},
  appState1: {},
  appState2: {},
  ui: {
    uiState1: {},
    uiState2: {},
  }
}
// 经过网络上一些经验包括笔者自己的经验,你的基本数据类型往往会遵循一个数据原则为了尽可能维护最小的单元的数据,数据共享的部分会放在一起维护,至于如何范式化这个 state 后面也会提到

{
  domainData1: {},
  domainData1ID: [],
  domainData2: {},
  domainData2ID: [],
  entites:{             //这里存放你需要共享数据的部分,但是仅仅是实例, 这里的实例的引用往往放在外面, 遵循的原则是实例和引用分开并且如果实例里有
                        //引用domainData1里的东西那么其实引用的也是id,你会存一个引用的id进去
    commonData1: {},
    commonData2: {},
  },
  commonData1ID: [],
  commonData2ID: [],
  ui: {
    uiState1: {},
    uiState2: {},
  }
}


```

下面我来说下范式化 state 这个问题:

```jsx
// 文档中列举了一个博客数据的例子(当然其实这个数据结构已经挺复杂的了)
const blogPosts = [
  {
    id: "post1",
    author: {username: "user1", name: "User 1"},
    body: "......",
    comments: [
      {
        id: "comment1",
        author: {username: "user2", name: "User 2"},
        comment: ".....",
      },
      {
        id: "comment2",
        author: {username: "user3", name: "User 3"},
        comment: ".....",
      }
    ]
  },
  {
    id: "post2",
    author: {username : "user2", name : "User 2"},
    body: "......",
    comments: [
      {
        id: "comment3",
        author: {username : "user3", name : "User 3"},
        comment: ".....",
      },
      {
        id: "comment4",
        author: {username : "user1", name : "User 1"},
        comment: ".....",
      },
      {
        id: "comment5",
        author: {username : "user3", name : "User 3"},
        comment: ".....",
      }
    ]
  }
  // 重复很多遍
]
// 其实这里我们可以想象一下,如果我们需要更新这个数据结构,假如说直接把这个数据挂在 state 上。 那就会出现这种情况的代码[...state, {...slice[comments], ...sliceUpdater}]或者嵌套更深的更新方式,首先我们知道无论是扩展运算符和Object.assign都是浅拷贝,我们往往需要对嵌套结构每一个层级都去更新,如果操作数据结构就更加不方便了我们需要根据每个层级找到相应嵌套比较深的数据结构然后进行操作。这也就是为什么我前面说我们尽量维持单维度的数据结构原因

// 文档中建议我们拍平数据后得到这样的数据结构
{
  posts: {
    byId: {
      "post1": {
        id: "post1",
        author: "user1",
        body: "......",
        comments: ["comment1", "comment2"]
      },
      "post2": {
        id: "post2",
        author: "user2",
        body: "......",
        comments: ["comment3", "comment4", "comment5"]
      }
    }
    allIds: ["post1", "post2"]
  },
  comments: {
    byId: {
      "comment1": {
        id: "comment1",
        author: "user2",
        comment: ".....",
      },
      "comment2": {
        id: "comment2",
        author: "user3",
        comment: ".....",
      },
      "comment3": {
        id: "comment3",
        author: "user3",
        comment: ".....",
      },
      "comment4": {
        id: "comment4",
        author: "user1",
        comment: ".....",
      },
      "comment5": {
        id: "comment5",
        author: "user3",
        comment: ".....",
      },
    },
    allIds: ["comment1", "comment2", "comment3", "commment4", "comment5"]
  },
  users: {
    byId: {
      "user1": {
        username: "user1",
        name: "User 1",
      }
      "user2": {
        username: "user2",
        name: "User 2",
      }
      "user3": {
        username: "user3",
        name: "User 3",
      }
    },
    allIds: ["user1", "user2", "user3"]  // 这里官方推荐把相应的id放在层级内。这个地方其实都可以也可以像我前面提到的放在users平级的地方,这个取决你的项目具体而定
  }
}
// 可以发现不同数据之间都被打成平级的关系,不需要去处理深层嵌套结构的问题,在给定的ID里去删查改除都比较方便!这里更新的话也是不会波及到别的 domainComponent 比如我们只是更新 users 里的信息只需要去更新 users > byId > user 这部分去做浅复制,它不会像上面那种嵌套数据结构整体更新影响别的相应渲染组件也去更新,这里其实还有一个优化点我们后面会说,就是我们在选择这个 sliceState 的时候, 从选择的 selector 不做重复运算。

```

这里拍平方式建议采用[Normalizr](https://github.com/paularmstrong/normalizr)自己写也不是不行,但是情况会比较多,这个第三方库还是能比较好的解决这个问题。这里再提一句这个 Normalizer 有一个 denormalize 方法便于你把 normaliz 的数据结构给装回去。是不是感觉有点像范式数据库里的 join 表的过程呢? 如果你熟悉范式化数据库设计,你可能觉得这有一点点范式化数据库的概念,只不过这里确实是没有严格的定义必须遵循第几范式设计,它最重要的是你需要找到适合你的范式结构,这里作者也在文档中去给出一些链接(当然你没必要先去学习数据库的概念)可以简单了解下这些概念,包括多对多数据库设计:

- [范式数据库概要](https://www.essentialsql.com/get-ready-to-learn-sql-database-normalization-explained-in-simple-english/)
- [多对多数据库](http://www.tomjewett.com/dbdesign/dbdesign.php?page=manymany.php)

既然前面提到 sliceState 需要有个 selector,从 state 中选择相应的 slice 这个分片(这里顺便把前面提到的小优化不需要做重复运算的 selector 也提一下,这里会用到这个[库](https://github.com/reactjs/reselect)):

```
// 首先你的sliceState需要去state选择相应的分片大多时候你都是
const usersSelector = state.users
const commonsSelector = state.commons
// 但是你会发现有些值是通过两个selector计算而来的,我们就拿reselect官网的第一个例子来看下
import { createSelector } from 'reselect'

const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}

console.log(subtotalSelector(exampleState)) // 2.15
console.log(taxSelector(exampleState))      // 0.172
console.log(totalSelector(exampleState))    // { total: 2.322 }

// 这里使用reselect的作用是如果下次传入的shopItemsSelector,taxPercentSelector 并没有改变那么这个selector不会重新计算,这个大家有兴趣可以看下源码,本身源码也不多很容易看完!


```

上面概念里提到了 selector 和 state 也能多少看到 state 本身只是可读(read only)并不可修改, 下面我来说下我们的函数 reducer 如何拆分,它的规约又是如何的(官方说有以下几种 reducer):

- reducer
- root reducer
- slice reducer
- case function
- higher-order reducer

具体定义你可以参考[这里](https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic), 在我看来也不尽然非要分的这么细,函数主要的作用还是帮我们拆分逻辑以及能达到复用的效果,所以拆分 reducer 才是核心的概念。 具体的拆分逻辑可以参考[这里](https://redux.js.org/recipes/structuring-reducers/refactoring-reducers-example),我这里就不班门弄斧了,文档的案例足够清楚了。 这应该是我看到最上心的文档了。不得不说作者是一个用心且勤奋的人!!!

我们这里就说一些特殊场景的 reducer 如何处理,当然文档里还是说了在[这里](https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers)如何处理需要跨分片数据的 reducer,通俗点讲就是我们需要 sliceStateA 的 reducer 需要处理 sliceStateB 里的数据:

```
// 第一种方式
// (还记得我们开头说的 Initinalizing state 的方式吗? 下面两种方式就是利用这点)
function combinedReducer(state, action) {      // 在 root 层去拿最外面的 state 把相应需要的 sliceState 传给相应需要的 reducer
  switch(action.type) {
    case "A_TYPICAL_ACTION": {
      return {
        a: sliceReducerA(state.a, action),
        b: sliceReducerB(state.b, action)
      };
    }
    case "SOME_SPECIAL_ACTION": {
      return {
        // 明确地把 state.b 作为额外参数进行传递
        a: sliceReducerA(state.a, action, state.b),
        b: sliceReducerB(state.b, action)
      }
    }
    case "ANOTHER_SPECIAL_ACTION": {
      return {
        a: sliceReducerA(state.a, action),
        // 明确地把全部的 state 作为额外参数进行传递
        b: sliceReducerB(state.b, action, state)
      }
    }
    default: return state;
  }
}

// 第二种方式
const combinedReducer = combineReducers({
  a: sliceReducerA,
  b: sliceReducerB
});
 
function crossSliceReducer(state, action) {
  switch(action.type) {
    case "SOME_SPECIAL_ACTION": {
      return {
          // state.b是额外的参数
          a: handleSpecialCaseForA(state.a, action, state.b),
          b: sliceReducerB(state.b, action)
      }
    }
    default: return state;
  }
}
 
function rootReducer(state, action) {
  const intermediateState = combinedReducer(state, action);
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
}

// 这都是官方推荐的方法, 但是你会发现万变不离其中,都需要从根部 root 去拿 state 达到共享数据的方式,并且无论是 combineReducers 还是 function 的方式都是要 Initinalizing state 的

```

最后再来简单讨论下异步化的问题,首先在早期 Redux 版本源码里是兼顾了异步方案的,就是我们所熟悉的 redux-thunk 当然跟 react-redux 被整理出来单独作为项目一样的,它也被单独整理出来只是在文档中提及了一下。其实市面上的基于 Redux 异步解决方案也非常多,解决不同场景的 redux-thunk 应该就够了,但是还有很复杂的请求场景可能就需要下面两个现在比较流行的库去解决:

- [redux-saga](https://github.com/redux-saga/redux-saga)
- [redux-observable](https://github.com/redux-observable/redux-observable)

针对两个方案没有好坏之分,首先他们都解决了同样的问题,但是两个理念完全不一样。

#### 第一种方案

用 Generator 去解决异步问题并且自己定义了很多 api 便于你解决各种复杂场景的异步问题 例如: [call, put, cancel,...] 很多种方法,关于这个 redux-saga 文论是[官方文档](https://redux-saga.js.org/)还是网络上的各种教程已经很多我就不在这废话了。

#### 第二种方案

采用了 rx.js 的方式去解决异步问题,而 rx.js 这个库主要是 reactive programming 一种实现,它属于 [reactivex](http://reactivex.io/) 其中一个分支利用流概念解决异步编程问题。这是一个非常大的话题,我们有机会也会开专题来讨论下这个 rx.js。虽然学习它本身会比 redux-saga 有更多的 api,可能还有一堆之前没有接触过的概念需要理解。但是就面向未来可能性上学习 rx.js 本身的价值肯定会比 redux-saga 要有用的多。

不过笔者也会根据业务和团队来决定这个问题比较合理,如果算上学习成本和开发成本可能本身 redux-saga 更加适合大型项目和多人维护团队。所以具体哪种方式更加适合你,就由你来定啦!

最后来看下官方推荐的一些项目目录做法,你在[这里](https://redux.js.org/faq/code-structure)也能看到比较全的做法! 我比较推荐第一种做法: 分别定义 actions, reducers(里面有相应的 selector), constants(actionTypes), components, containers 这样我觉得比较清晰。 说了这么多现在成熟的最佳实践。是不是该畅想下未来呢？

### 来世:

其实我在上一篇文章中也提到了 React 本身的核心理念应该是会兼容单向数据流的方式(因为新的 context api 的存在!) 如果你不熟悉这个 context 可以参考[React blog](https://reactjs.org/blog/2018/03/29/react-v-16-3.html) 这里我只是畅想下,仅代表个人观点,不能代表未来任何发展趋势。

```
// 上一篇文章我们利用 context 去实现 react-redux 的时候我们利用 context 传递了 redux 本身的 store,具体的 provider 和 connect 可以参考上一篇文章
// 我们自己实现的 store应该是这样的。(全部凭自我意淫。。。可以看个思路)

export const makeStore = (store) => {
  let subscriptions = []
  const Context = createContext()

  const getState = () => store.initialState ?  store.initialState : {}  //  拿到当前的 state

  const subscribe = fn => {
    subscriptions = [...subscriptions, fn]
  }

  // 这里把 Provider 和 Connect 拿进来,他们俩分别使保存这里 store 和把 mapStateProps 以及 actions 传递进去
  class Privider...  // 一个维护Context.Provider 负责传递 store,更改store
  class Connect...  // 一个负责消费的Context.Cousumer 传递给你的组件相应的state,和actions
  // 这里我还没想好如何维护整体代码结构。。
}


```

在我准备发文章的时候,已经有人完成了这类[库](https://github.com/didierfranc/react-waterfall),那我就只能安利一波了。希望大家能看到一个方向而不是全盘否决 Redux。 因为毕竟现在我们还没有真正做好代替它的准备,而且我相信你如果真的要代替的话,在现有的项目和新项目可能都会有不少坑,不过俗话说得好不踩坑怎么进步呢?(欢迎大家多多踩坑哈哈哈哈!!!!)

### 写在最后的话:

我们经历一门技术也好,经历一个技术时代革新也罢。其实往往最重要的是过程,如果我们忽略过程只在乎结果那么一切好像都是没有调味的菜----索然无味了,再回归到 Redux 本身,它给我们带来的最多的是一种规约(如果你跟着文章读下来你应该会体会到!),如何在如今多人团队的项目中尽量增加可读性和提高维护成本,也是工程化历来探讨的主题。当然所谓的最佳实践也不过是我们真正实践过后从无论是后端也好别的行业也好借鉴那些我们真正有用的知识加以改造。所谓触类旁通的重要性吧!最后期望读者还能继续关注我的个人更新以及团队更新!!!愿在技术的浪潮中我们共勉前行。


作者：Functional_Labs
链接：https://juejin.cn/post/6844903587508666375
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。