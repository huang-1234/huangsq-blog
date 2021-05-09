# render是如何进行的

scheduleUpdateOnFiber 方法的作用是调度更新，在由 ReactDOM.render 发起的首屏渲染这个场景下，它触发的就是 performSyncWorkOnRoot。performSyncWorkOnRoot 开启的正是我们反复强调的 render 阶段；而 commitRoot 方法开启的则是真实 DOM 的渲染过程（commit 阶段）。因此以scheduleUpdateOnFiber 和 commitRoot 两个方法为界，我们可以大致把 ReactDOM.render 的调用栈划分为三个阶段：

1. 初始化阶段
2. render 阶段
3. commit 阶段

都说 Fiber 架构带来的异步渲染是 React 16 的亮点，为什么分析到现在，竟然发现 ReactDOM.render 触发的首次渲染是个同步过程呢？

同步的 ReactDOM.render，异步的 ReactDOM.createRoot
其实在 React 16，包括近期发布的 React 17 小版本中，React 都有以下 3 种启动方式：

>legacy 模式：
```jsx
ReactDOM.render(<App />, rootNode)。
```
这是当前 React App 使用的方式，当前没有计划删除本模式，但是这个模式可能不支持这些新功能。
> blocking 模式：
```jsx
ReactDOM.createBlockingRoot(rootNode).render(<App />)。
```
目前正在实验中，作为迁移到 concurrent 模式的第一个步骤。

> concurrent 模式：
```jsx
ReactDOM.createRoot(rootNode).render(<App />)。
```
目前在实验中，未来稳定之后，打算作为 React 的默认开发模式，这个模式开启了所有的新功能。

在这 3 种模式中，我们常用的 ReactDOM.render 对应的是 legacy 模式，它实际触发的仍然是同步的渲染链路。blocking 模式可以理解为 legacy 和 concurrent 之间的一个过渡形态，之所以会有这个模式，是因为 React 官方希望能够提供渐进的迁移策略，帮助我们更加顺滑地过渡到 Concurrent 模式。blocking 在实际应用中是比较低频的一个模式，了解即可。

按照官方的说法，“长远来看，模式的数量会收敛，不用考虑不同的模式，但就目前而言，模式是一项重要的迁移策略，让每个人都能决定自己什么时候迁移，并按照自己的速度进行迁移”。由此可以看出，Concurrent 模式确实是 React 的终极目标，也是其创作团队使用 Fiber 架构重写核心算法的动机所在。

拓展：关于异步模式下的首次渲染链路
当下，如果想要开启异步渲染，我们需要调用 ReactDOM.createRoot方法来启动应用，那ReactDOM.createRoot开启的渲染链路与 ReactDOM.render 有何不同呢？

由于本讲的源码取材于 React 17.0.0 版本，在这个版本中，createRoot 仍然是一个 unstable 的方法。因此实际调用的 API 应该是“unstable_createRoot”：

```jsx
ReactDOM.unstable_createRoot(rootElement).render(<App />);
```


Concurrent 模式开启

在异步渲染模式下，由于请求到的 lane 不再是 SyncLane（同步优先级），故不会再走到 performSyncWorkOnRoot 这个调用，而是会转而执行 else 中调度相关的逻辑。

这里有个点要给你点出来——React 是如何知道当前处于哪个模式的呢？我们可以以 requestUpdateLane 函数为例，下面是它局部的代码：

```jsx
function requestUpdateLane(fiber) {
  // 获取 mode 属性
  var mode = fiber.mode;
  // 结合 mode 属性判断当前的
  if ((mode & BlockingMode) === NoMode) {
    return SyncLane;
  } else if ((mode & ConcurrentMode) === NoMode) {
    return getCurrentPriorityLevel() === ImmediatePriority$1 ? SyncLane : SyncBatchedLane;
  }
  ......
  return lane;
}
```


上面代码中需要注意 fiber节点上的 mode 属性：React 将会通过修改 mode 属性为不同的值，来标识当前处于哪个渲染模式；在执行过程中，也是通过判断这个属性，来区分不同的渲染模式。

因此不同的渲染模式在挂载阶段的差异，本质上来说并不是工作流的差异（其工作流涉及 初始化 → render → commit 这 3 个步骤），而是 mode 属性的差异。mode 属性决定着这个工作流是一气呵成（同步）的，还是分片执行（异步）的。

>  Fiber 架构一定是异步渲染吗？

React 16 如果没有开启 Concurrent 模式，那它还能叫 Fiber 架构吗？

这个问题很有意思，从动机上来看，Fiber 架构的设计确实主要是为了 Concurrent 而存在。但经过了本讲紧贴源码的讲解，相信你也能够看出，在 React 16，包括已发布的 React 17 版本中，不管是否是 Concurrent，整个数据结构层面的设计、包括贯穿整个渲染链路的处理逻辑，已经完全用 Fiber 重构了一遍。站在这个角度来看，Fiber 架构在 React 中并不能够和异步渲染画严格的等号，它是一种同时兼容了同步渲染与异步渲染的设计。