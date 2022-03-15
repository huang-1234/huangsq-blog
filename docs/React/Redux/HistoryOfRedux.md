# [Redux 的前世今生](https://segmentfault.com/a/1190000022109701)

<center> 文章导航</center>

[1.Redux 是什么？](## 1.Redux 是什么？)

[2. Redux 的历史](## 2. Redux 的历史)

[**澜岚**](https://segmentfault.com/u/luzhenqian)发布于 2020-03-23![img](HistoryOfRedux.assets/lg.php)

本篇文章主要内容是介绍 Redux 的历史背景、实战和概念，目标读者设定为 redux 初级玩家。

既然定位为初级玩家，那么就不会讲源码、实现、设计原则这些东西。我会带你站在历史的角度俯览 redux 的传奇一生，并通过代码示例掌握基本用法，通过图示把道理捋明白。

## 1.Redux 是什么？


redux 官方自述是 A Predictable State Container for JS Apps，通俗理解，是一个用于 JavaScript 的状态管理库。注意：它特别强调了 Predictable State（可预测状态）。

### 什么是状态？

这个很好理解，万物皆有状态，可以把人类简单的分成清醒/睡眠/昏迷等状态。还可以继续细化，比如情绪，分为生气/冷静/愤怒/开心等状态。身体的某个部位，比如眼睛，失明/睁开/闭眼等状态。

为了更加容易理解状态，这里拿最典型的 TodoList 举例。

![todolist](HistoryOfRedux.assets/1460000022109875)

最原始的 web 应用，在没有状态的情况下，应该怎么做呢？

```js
<!-- todolist 原始版 -->
<div id="todo-list">
  <div>
    学英语<span> 未完成 </span><button onclick="complete(this)">完成</button>
  </div>
  <div>
    学数学<span> 已完成 </span
    ><button onclick="complete(this, true)">取消完成</button>
  </div>
  <div>
    学语文<span> 未完成 </span><button onclick="complete(this)">完成</button>
  </div>
</div>
<script>
  function complete(target, cancel = false) {
    if (cancel) {
      target.textContent = "完成";
      target.onclick = () => complete(target);
      target.previousElementSibling.textContent = " 未完成 ";
    } else {
      target.textContent = "取消完成";
      target.onclick = () => complete(target, true);
      target.previousElementSibling.textContent = " 已完成 ";
    }
  }
</script>

```

可以看到，代码比较简单，这种代码在四五年前是非常流行的，但是现在已经很少有人这么写代码了。

如果加入状态的概念，应该怎么做？
```js
<!-- todolist 状态版 -->
<div id="todo-list"></div>
<script>
  var todoEl = document.getElementById("todo-list");

  var state = {
    todoList: [
      { id: 1, name: "学英语", complete: false },
      { id: 2, name: "学数学", complete: true },
      { id: 3, name: "学语文", complete: false }
    ]
  };

  function render() {
    const todoHtml = state.todoList
      .map(
        item =>
          `<div>${item.name} ${
            item.complete
              ? `已完成 <button onclick='complete(${item.id}, true)'>取消完成</button>`
              : `未完成 <button onclick='complete(${item.id})'>完成</button>`
          }</div>`
      )
      .join("");
    todoEl.innerHTML = todoHtml;
  }

  function complete(id, cancel = false) {
    state.todoList.find(item => item.id === id).complete = !cancel;
    render();
  }

  render();
</script>

```

可以看到，比起原始版实现，状态版的代码好像更多。

### 有状态和无状态应用的区别

两份代码的显示效果是完全一致的，那么，到底哪个版本更好呢？

如果功能确定下来，只有目前的这么点功能，并且不会有任何需求的变动，那么无疑，第一种实现是更优选择。但这种情况还是在少数，更多情况下，应用总是会存在各种不确定性，随时都可能变动。

以前的 web 应用，不能称之为应用，只能叫网页，大一点的叫网站。现在为什么叫 web 应用了？因为这么叫高大上吗？并不是，而是现在的 web 应用更大，更复杂了。

你可以仔细观察，原始版 button 的文字和 click 绑定的函数，与前面的“学数学”、“学英语”完全无关。如果要给页面添加新的元素，比如什么时候完成的，点击每一条 item 会弹出详情等。这样扩展下去，应用会越来越混乱和复杂。

![没有状态的应用](HistoryOfRedux.assets/1460000022109874)

状态版的实现，比原始版多了一个`state`变量和一个`render`函数。

其中，`state`就是应用的状态，当页面发生操作时，修改`state`。当应用的`state`发生变化时，就会调用`render`方法，重新渲染页面。

![有状态的应用](HistoryOfRedux.assets/1460000022109876)

这就是有状态和无状态的区别。

是不是有点 react 和 vue 的味道了？

react 和 vue 都有`state`和`render`。react 的`state`，vue 的`data`，都是可以响应数据变化而自动重绘页面的。只不过实现方式不同。react 是在`this.setState`后发生重绘，vue 是通过对对象和数组进行数据劫持实现的，但它们同时也带来了新的问题，比如 react 中异步的渲染，vue 在`data`声明后新添加的属性无法自动响应等。更为细节的部分不多说，不在该文章范围以内。

### 为何需要状态管理容器？

现在已经明白了状态的作用，那么，既然 react 和 vue 自身都有状态系统，为什么还需要状态管理库呢？

原因是因为在组件化的探索中出现了问题。

一个正常的组件树像下面这张图。

![无redux的组件 正常态](HistoryOfRedux.assets/1460000022109877)

使用组件化的应用，可能存在几百上千个组件，如果不使用状态管理库，状态会散落在每个组件内部。一些需要共享的状态，可能要传给父组件，祖辈组件，也可能要传给子组件、子孙组件，还可能要传给兄弟组件，祖辈的兄弟组件等等。这些场景虽然仍能通过 props 的机制完成，但是非常不直观，会让人感到错综复杂，这好像又找到了以直接修改 DOM 的方式来编写代码的感觉，这很危险。

![无redux的组件 混乱态](HistoryOfRedux.assets/1460000022109878)

为此，react 没有提供什么特殊的方案，它建议直接使用 flux 模式来解决。而 vue 没有放弃，它提供了很多种解决方案，`v-model`、`sync`、`$attrs`、`$listeners`等等，但没有什么实质性的改变。

跨组件通信，是一个必须要解决的问题。

真正有实质性变化的，是 react 的 context API 和 vue 的 vue event bus 模式。

它们很像，又有所区别。它们存在同样的问题，改变状态的过程不够直观，虽然可以跨组件修改某个状态，但很难对这个操作进行跟踪、定位和预测。

![context难以定位](HistoryOfRedux.assets/1460000022109705)

这样虽然给我们极大的自由任意操作全局状态，但让我们难以快速找到究竟是谁在什么时候改变了某个全局状态。

所以，还需要更加规范细致的解决方案，可以追踪数据何时变化的状态管理库，即本节开头所讲的可预测状态，这也是 redux 一再强调的特性。

解决问题的路上总是会出现更多新的问题，这个过程就像是俄罗斯套娃，一步步无限接近真理，可世界上根本没有真理。

## 2. Redux 的历史

redux 在 github 上的第一次提交记录是 2015 年的 5 月 31 日，提交者是 gaearon，名字翻译过来你可能非常熟悉，叫盖伦。这个盖伦就是大名鼎鼎的 Facebook 工程师 Dan Abramov，国内俗称 Dan 大神。dan 大神是一个非常真实的人，不掩饰问题，不故作高深。很多人都非常喜欢他，这里是他的[博客](https://overreacted.io/)。

![dan abramov](HistoryOfRedux.assets/1460000022109707)

redux 并不是凭空出现的，在它之前，facebook 还有一个叫做 flux 的库，flux 是 2014 年 7 月 24 日开源的。对于现在的前端开发者来讲，flux 可能比较陌生。因为在它那个时代，前端领域还没有特别重视应用的状态，所以 flux 在当时并不流行。2014 年是什么时代？要知道现在所谓的前端三大框架资历最老的 Angular 出现的时间也才是 2014 年 9 月 19 日，比 flux 还要晚出现 2 个月。那个时代，还是 jQuery 和 Bootstarp 横行的时代。flux 在最开始的一段时间里，很多人不解和困惑，甚至有人提出 flux 是事件编程的倒退。其实当时很多人没有正确地看到 flux 想做什么，只是停留在表面的 API 的用法上，没体会到 flux 真正的核心是一个单向数据流的状态机。经过一段时间，flux 逐渐被人理解和认可。不巧的是之后不到一年的时间里，mobx 和 redux 相继出现，它们都在 flux 的基础上做了大量改进，所以它们比 flux 更加优秀。flux 没有机会大放异彩就被埋没在了历史的长河中，属于一个昙花一现的库。现在出现最频繁的地方，大概就是类似我这篇文章一样介绍 redux 历史的文章或书中。

所以，前端的应用状态这一概念在业界成型的时间大概是 2013 年到 2014 年左右。

![redux-history](HistoryOfRedux.assets/1460000022109708)

## 3. Redux 难吗？它好学吗？学习路线是什么？

如果以一个过来人的身份回答，redux 很简单，它不难。

毕竟它的 js 源码仅有 712 行，包括注释和换行符，如果愿意认真读的话，半天时间就能读完一遍。

可是如果把时间回放到几年前我刚开始接触 redux 的时候，我也是很懵的。

现在让我以一个初学者的身份来回答这个问题的话，应该是这样，redux 本身非常简单，但学习它有些难度。

昨天看阮一峰老师最新写的《科技爱好者周刊：第 99 期》中说了这么一件事。

> 两天前，ZDNet 发表了新文章《认识 iPad：提高你生产力的 10 个应用》。这一类的科普文章，每周都会出现，这难道不是一件很奇怪的事情吗？
>
> iPad 已经发布 10 年了，可是人们还必须看这种文章，说明大家还没找到办法，到底怎样才能在 iPad 上进行实际工作！
>
> [《iPad 的失败》](http://ignorethecode.net/blog/2020/01/29/the_failure_of_the_ipad/)

这让我想到了现在的 redux。其实到现在，还是有很多人在写关于 redux 的文章，也有很多人在问关于 redux 的疑惑。这说明大家需要 redux，但至今仍未找到学习 redux 的最好方式。所以我尝试把我这几年使用 Redux 的心得体会写一写，或许会对大家有所帮助。

dan 大神在 redux 发布 3 年后的某一天，提交了一条[commit](https://github.com/reduxjs/redux/pull/2950)。

标题是“Remove "Redux itself is very simple"”，意思是删除了一段文字，“Redux 本身非常简单”。

同时，dan 大神还在该条 commit 中提到：

> Reflecting a few years later this was a bit of a silly thing to write in the docs. Of course it's not simple to people learning it.

翻译成中文的意思是：

几年后，仍在文档中强调“react 本身非常简单”是一件很愚蠢的事情。 当然，要学习它并不容易。

由此可见，Redux 对新手而言确实不怎么友好。

至于怎么学习，推荐三条路。

第一条，英语好的同学，去看[官方文档](https://redux.js.org/)，这是最佳学习方法。也可以看一些优秀的资源。比如[dan 大神的博客](https://overreacted.io/)、[dan 大神的视频](https://egghead.io/lessons/react-redux-the-single-immutable-state-tree)、[Redux 官方推荐学习资源](https://github.com/markerikson/react-redux-links)等。

第二条，技术非常强的同学，大体翻阅下文档，写两个 demo，然后去读源码吧。

第三条，技术一般，英语也挺差的同学。看一些中文资料也不错，比如现在你正在看的这篇文章。

学习这件事，尽量还是要去源头看看。“取乎其上，得乎其中。取之于中，而求之于下。“。

但也不用过度强求，总之学会才是目的，具体怎么学，还是要看你习惯哪种方式。

## 4. Redux 解决了什么问题？

redux 和类似的框架都在解决 web 应用中状态难以管理的问题。

### facebook 面临的问题

在早期，facebook 的 web 网站经常会碰到数据和视图不一致的现象。比如消息图标莫名其妙的亮起，当点击图标后，又发现没有消息。facebook 的工程师们不止一次地解决这个 BUG，但每次修复后的一段段时间里都会重复出现。

造成这个现象的原因是数据和视图的复杂关系。数据的流向很难预测，所以也很难理清它们之间具体的关系是怎样的。

借用一张网图来看一下 jQuery 时代的应用数据流向。

![jQuery数据流向](HistoryOfRedux.assets/1460000022109706)

这非常糟糕。

### 状态管理库的鼻祖 flux

facebook 的工程师在探索这个问题时，给出的第一个答案就是 flux。

flux 不仅仅是一种库或框架，更是一种模式或架构。这种模式或架构的名字也叫作单向数据流。

flux 非常好理解。

比如页面初始化加载的这个动作，是一个 Action， dispatcher 会把 action 传递给 store，dispatcher 会修改应用的 store，store 的改变会重绘视图 view。一个界面就加载出来了，非常简单的原理。

![flux1](HistoryOfRedux.assets/1460000022109709)

视图 view 上有一个按钮，点击按钮的动作，又是一个 Action， action 又会告诉 dispatcher 该去通知 store 了，然后 store 会发生改变，重绘 view。如此循环往复，越来越简单了。

![flux2](HistoryOfRedux.assets/1460000022109710)

从上面两张图中可以看出，无论应用程序多么复杂，数据变化的流向总是一致的。

如果再加上 api 的调用，流程是这样的。

![3](HistoryOfRedux.assets/1460000022109711)

注意：这是 flux 的数据流向图，redux 和它有所区别。但不用在意，这里只是大概演示下流程。

事实证明，flux 是对的。

在之后的探索中，facebook 又做出了更让人满意的答案，redux 和 mobx。尤其是 redux。

虽然 flux 和 react 在设计原则和思想的细节上有较大的差异，但解决的问题是相同的。

react 解决的问题就是通过单向数据流的架构方式使应用的状态按照一定的模式来变化，从而能够预测应用的状态。

## 5. Redux 和 React-Reudx 的关系

Redux 本身是完全独立运行的库，不会基于某个库或框架、也不会依附于某个库或框架。所以，react 虽然可以直接使用 redux，但是无法和自身的响应式结合。

为了解决这一问题，facebook 又开发了 react-redux。

两者是有区别的，redux 的责任是单纯的状态管理，react-redux 更像一个胶水，把 react 应用程序和 redux 状态仓库粘在一起。让 redux 中数据的变化可以触发 react 中的数据响应视图。

下面这段话是来自于 redux 官网：

> Keep in mind that Redux is only concerned with managing the state. In a real app, you'll also want to use UI bindings like [react-redux](https://github.com/gaearon/react-redux).

翻译成中文意思是：

> 请记住，Redux 仅与管理状态有关。在真正的应用程序中，您还需要使用 UI 绑定的库，例如[react-redux](https://github.com/gaearon/react-redux)。

很多人在学习和理解 redux 时，经常会出现概念混淆的问题，我觉得这是学习 redux 的一大屏障。事实上，概念越多的库或框架，越难学习，比如 rx.js。

## 6. Redux 的用法

我认为先学习用法，再去理解概念相对更友好一些。因为这样更加直观。

### Redux 在原生 js 中的简单使用

我一直在强调 redux 是可以独立运行的，从某种程度上，redux 和 react 没有任何瓜葛，记住这一点，这很重要。

下面用代码演示如何在原生 js 中使用 redux，仍然是那个 todolist 示例，拿之前写的状态版进行重构。

```js
<!-- todolist redux版 -->
<script src="https://unpkg.com/redux@4.0.5/dist/redux.js"></script>
<div id="todo-list"></div>
<script>
  let todoEl = document.getElementById("todo-list");

  // 1. 定义 action types，它描述了你的应用程序有几种改变数据的操作
  let COMPLETE = "COMPLETE";
  let CANCEL_COMPLETE = "CANCEL_COMPLETE";

  // 2. 定义 reducers
  // reducer 默认会有 2 个参数，第一个是初始状态，第 2 个是 dispatch 传递进来的 action
  let initialState = [
    { _id: 1, name: "学英语", complete: false },
    { _id: 2, name: "学数学", complete: true },
    { _id: 3, name: "学语文", complete: false }
  ];

  function todoReducer(state = initialState, action) {
    // 通过判断 action 的 type 属性，来进行不同的 state 变化。
    switch (action.type) {
      case COMPLETE:
        state.find(item => (item.id = action.id)).complete = true;
        return state;
      case CANCEL_COMPLETE:
        state.find(item => (item.id = action.id)).complete = false;
      default:
        return state;
    }
  }

  // 3. 调用 createStore 创建 store，todoReducer 是必传参数
  let store = Redux.createStore(todoReducer);

  // 4. 定义 actions creator，它们是一个函数，返回一个简单对象
  let completeAction = id => ({
    type: COMPLETE,
    id
  });
  let cancelCompleteAction = id => ({
    type: CANCEL_COMPLETE,
    id
  });

  function render() {
    // 5. 使用状态时，调用 store 的 getState 方法可以获取最新的状态
    const todoHtml = store
      .getState()
      .map(
        item =>
          `<div>${item.name} ${
            item.complete
              ? `已完成 <button onclick='complete(${item._id}, true)'>取消完成</button>`
              : `未完成 <button onclick='complete(${item._id})'>完成</button>`
          }</div>`
      )
      .join("");
    todoEl.innerHTML = todoHtml;
  }

  function complete(id, cancel = false) {
    // 6. complete 函数不再直接修改 state 中的数据，而是调用 store 对象的 dispatch 方法传递 action 的方式来创建新的 state
    store.dispatch(cancel ? cancelCompleteAction(id) : completeAction(id));
    // render(); 不再这里重绘，而是使用 store 的 subscribe
  }
  // 7. 使用 store 的 subscribe 监听 state 的变化，它的参数是一个回调函数，每次 state 变化，都会自动调用该函数
  store.subscribe(render);
  render();
</script>
```

代码中有详尽的注释，这几乎是一个 redux 应用的最简版本。看明白这个例子，就搞懂了 redux 最基本的使用。

虽然代码的注释中标注了各个步骤的序号，但你可以不按照这个顺序来写代码。标注只是为了方便理解。

### Redux 中各个 API 和概念之间的关系

现在来回顾一下，上面的代码都做了什么。

首先要有一个 store，创建 store 需要调用 Redux.createStore()。 createStore 接受一个 reducer 函数作为参数。reducer 默认有 2 个参数，第 1 个是 state，它是当前状态树，第 2 个是 action，这个参数其实就是 store 对象的 dispatch 方法传递的参数 action。

action 是一个结构简单的对象，它有一个 type 属性，用于标记这个 action 是做什么的，与之对应的 reducer 函数会通过 switch 来处理这个 action。

创建 action 对象的函数叫做 action creator，它也非常简单，就是返回一个 action 对象。

reducer 函数是处理数据变更的地方，它会返回一个新的对象，这个对象就是新的状态。这和 Array 的 reduce 的运行机制非常相像。

store 的 getState 方法用于获取当前状态树对象 state；subscribe 方法用于监听 state 的变化，它接受一个函数作为参数，每次数据发生变化时，调用改回调函数。

很多人在刚开始学习 redux 时，被各个概念和它们之间的关系弄的云里雾里，我认为只要把这些概念之间的关系梳理清楚，学习 redux 的一大门槛就算跨过去了，为此我特意画了一张简单的关系图。

![关系图](HistoryOfRedux.assets/1460000022109712)

如果你从来没有使用过 redux，那你一定会觉得这里面的各种参数传来传去，函数调来调去，就像变戏法一样。为什么不直接修改 state 呢？state 的本质不就是一个全局对象吗？

确实是这样，state 就是一个全局对象。

如果直接修改 state 会有几个问题。

1. 你可能并不知道在哪里修改的对象。

当一个数据没达到预期时，很难找到到底是在哪里修改了这个数据。

1. 你可能在两星期后已经忘记为什么要在某个地方修改 state。

虽然你可以使用注释来在一定程度上解决这个问题。

1. 这样做非常不安全。

JavaScript 的对象是非常松散的，你可以随意修改，也可以把它弄丢。比如在某个不起眼的角落，写了一行 state = null;

处理数据最规范的手段就是通过某种模式来变更它们，而不是直接用=来修改。最典型的例子是数据库。

在 2017 年 8 月份，有一篇文章曾经非常火爆，[shape your store like your database](https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5)。像数据库一样设计你的 Redux，你可以读一下。

redux 是一个 JavaScript 数据容器，其实它更像一个数据库。

而我们所做的一切和 redux 中那些看似繁琐的 API 都是为了让数据的更新是可预测可追踪的，如果使用 redux 的方式来处理数据，你可以马上找到这次状态变更是因为什么，是在哪个地方让数据发生了变化。这是 redux 的唯一好处。

再来思考一个问题，一个简单的 todoList 应用把代码弄的这么复杂，有必要吗？

事实上，无论如何都找不到任何必须使用 redux 的理由。

redux 带给我们的不仅仅是学习成本，还会让我们多写很多代码。

这是付出，同时还要看收益。正常情况下，收益要高于付出，至少也要持平，我们才会考虑付出。没有人会傻到自己给自己刨坑吧？

很多初学者在学一门框架或库时就想把全家桶全用上，这是绝对不可取的。

redux 的开发动机在官网上写的很明白，就一句话：**our code must manage more state than ever before**.（我们的代码变必须管理比以往更多的状态）

换句话说，我们的应用中存在大量状态时，才应该考虑使用 redux，而不是在一开始就优先考虑使用 redux。

上面的例子使用了大部分 redux 的核心 API，但没介绍`combineReducers`、`applyMiddleware`、`bindActionCreators`、`compose`这几个更高级的 API，因为它们都不是最核心的 API，而是为了解决某项更高级的问题而存在的。这些不会在这里讲，但会在下一篇文章中提到。

dan 大神在 2018 年曾经发表过一篇文章，[you might not need redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)（你可能不需要 redux），你可以读一读。然后认真思考，到底需不需要 redux。我所指的不是到底需不需要学习 redux，而是在你的应用程序中需不需要使用 redux。redux 是一个优秀的库，作为前端工程师，无论怎样总是要见识一下的。

### Redux 在 React 中的使用

虽然 redux 可以在任何环境下使用，但 facebook 开发它的最初目的还是为了解决大型 react 应用的状态管理问题。

在 react 中使用 redux，一般都会用到 react-redux 这个库。文章前面有提到，react-redux 本身就像是一个胶水，并不复杂。

#### Provider 和 connect

它的用法大概是这样。

首先导出一个叫做 Provider 的组件，然后在 Provider 组件中注入 store。再用 Provider 把应用的根组件包裹起来。这样就可以使用 store 了。

```js
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```
react-redux 是基于 react 中的 context 来实现的，所以这一步是必须的。

需要使用 store state 的组件，使用 connect 函数将 store 和 react 的组件连接起来。

```js
import { connect } from "react-redux";
import { increment, decrement, reset } from "./actionCreators";

const Counter = props => <div> {props.counter} </div>;
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter
  };
};

const mapDispatchToProps = { increment, decrement, reset };

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

如果不需要 store 的组件，在写法遵循 react 的正常写法即可，不需要变动。

代码中多了两个新的概念，mapStateToProps 和 mapDispatchToPorps，其实它们非常好理解。

mapStateToProps 是将 redux 中 state 映射到 react 组件的 props 中，其实就是 getState 的作用。

mapDispatchToProps 是将 redux 中的 dispatch 映射到 react 组件的 props 中，这样就可以使用`props.increment`来调用 dispatch。

react-redux 的原理就是将数据提升至最高组件，然后在组件中通过 props 层层传递。

react-redux 的使用就这么简单，是的，非常简单。

#### hooks

什么是 hooks？

hooks 是 react 16.8 推出的新特性，一个替换 component 组件的方案，react 未来的发展方向。

在 hooks 出现之后，我们不再需要 connect。

react-redux 最常用的 hooks 有 3 个，useSelector、useDispatch 和 useStore。

useSelector 取代的是 mapStateToProps，useDispatch 取代的是 mapDispatchToProps。useStore 是对 store 的引用。

同样是上面那段计数器代码，用 hooks 会这样写。

```js
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from './actionCreators'

export default const Counter = () => {
  const counter = useSelector(state=>state.counter);
  const dispatch = useDispatch();
  // 如果你要调用 dispatch
  // dispatch(increment());
  return (
        <div> {counter} </div>
    )
}
```

可以看到，使用 hooks 后，代码变得非常优雅。

hooks 已经出现 3 年，现在非常稳定，如果还认为 hooks 是新特性，那真是有点跟不上时代的节奏了。我非常推荐使用 hooks，现在我开发的 react 项目中几乎全部都是函数式组件和 hooks。

需要注意的是，hooks 不能在 class 组件中使用，它只能在函数组件中使用，而且只能在函数的最外层中使用，这些都取决于 hooks 的实现方式。

## 7. 写在最后

通过这篇文章的学习，你应该已经掌握了 react 最基本的使用，如果文中所讲述的东西你都能够掌握并理解，那么恭喜你，已经成为一个合格的 redux 初级玩家了！

不过，游戏才刚刚开始。

接下来我会再写两篇关于 Redux 的文章，读者群体定位分别是中级玩家和高级玩家，敬请期待。

[javascript](https://segmentfault.com/t/javascript)[前端](https://segmentfault.com/t/前端)[react.js](https://segmentfault.com/t/react.js)

阅读 497更新于 2020-03-23

##### 推荐阅读

[对React-redux中connect方法的理解Redux是React全家桶的重要一员，之前在知乎上也看到类似的提问：该如何通俗易懂的理解Redux? Redux是JavaScript的状态容器，Redux的概念简单明了：M1seRy_阅读 30.6k41 赞1 评论](https://segmentfault.com/a/1190000010416732?utm_source=sf-related)

[【译】基于Hooks 的 Redux 速成课你对 Redux 感到困惑吗？如果使用新的 Redux Hooks，会更加简单！这里是一个关于 Redux 的速成班，将配合 React 函数组件使用：joking_zhang阅读 1.3k16 赞3 评论](https://segmentfault.com/a/1190000020747009?utm_source=sf-related)

[Redux 介绍对于复杂的单页面应用，状态（state）管理非常重要。state 可能包括：服务端的响应数据、本地对响应数据的缓存、本地创建的数据（比如，表单数据）以及一些 UI 的状态信息（比如，路由、选中的 tab、是否显示下拉...ustccjw阅读 92.7k16 赞9 评论](https://segmentfault.com/a/1190000003503338?utm_source=sf-related)

[关于Flux,Vuex,Redux的思考Flux是一种前端状态管理架构思想，专门解决软件的结构问题。基于Flux的设计思想，出现了一批前端状态管理框架。他们给出了一些库用于实现Flux的思想，并在Flux的基础上做了一些改进。在这些框架里，当前最热门的...flyer_dev阅读 9.3k15 赞](https://segmentfault.com/a/1190000007753542?utm_source=sf-related)

[Redux原理分析Redux原理分析Redux是什么 {代码...} 一.redux的工作原理先上图（图片源于网络）首先我们找到最上面的state在react中state决定了视图（ui），state的变化就会调用React的render（）方法，从而改变视图用户通过一...BeliefRC阅读 6.9k5 赞](https://segmentfault.com/a/1190000019849834?utm_source=sf-related)

[基于 Redux + Redux Persist 进行状态管理的 Flutter 应用示例好久没在 SegmentFault 写东西，唉，也不知道 是忙还是懒，以后有时间 再慢慢写起来吧，最近开始学点新东西，有的写了，个人博客跟这里同步。大胡子民工潘半仙阅读 2.5k5 赞](https://segmentfault.com/a/1190000017405058?utm_source=sf-related)

[Redux简介一般来说，当需要根据角色判断使用方式、与服务器大量交互 (例如使用 WebSocket)、视图需要从多个来源获取数据，也就是说在交互复杂、多数据源时；或者从组件的角度考虑，如果需要组件的状态广播等时需要使用。darkCode阅读 7684 赞](https://segmentfault.com/a/1190000019675921?utm_source=sf-related)

[React-redux的原理以及使用当一个react项目组件层级越来越深，页面越来越多的时候，数据在各个组件层级和页面之间传递的需求就会比较多，很多变量也需要做成可全局管理的。在这个时候，redux和react-redux的使用就很有必要了。它们能帮助我...RaoMeng阅读 3.4k4 赞](https://segmentfault.com/a/1190000017339953?utm_source=sf-related)

