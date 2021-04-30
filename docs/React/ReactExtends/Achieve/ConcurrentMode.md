# React的并发

## 官网解读concurrent

首先我们来看看官网是怎么解读concurrent的。

>  什么是 Concurrent 模式？

Concurrent 模式是一组 React 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整。

这些功能尚处于试验阶段，可能会发生改变。它们还不是稳定的 React 版本中的一部分，但是你可以在实验版本中尝试它们。

## 阻塞 vs 可中断渲染

**为了解释 Concurrent 模式，我们将使用版本控制作为比喻。** 如果你在团队中工作，你可能使用了像 Git 这样的版本控制系统并在分支上进行工作。当一个分支准备就绪时，你可以将你的工作合并到 master 中，以便他人拉取。

在版本控制存在之前，开发工作流程有很大的不同。不存在分支的概念。如果你想编辑某些文件，你必须告诉所有人在你完成编辑工作之前不要触碰这些文件。你甚至不能同时和那个人研究它们 —— 实际上, 你被它们 *阻塞* 了。

这说明了包括 React 在内的 UI 库在目前通常是如何工作的。一旦它们开始渲染一次更新，它们不能中断包括创建新的 DOM 节点和运行组件中代码在内的工作。我们称这种方法为 “阻塞渲染”。

在 Concurrent 模式中，渲染不是阻塞的。它是可中断的。这改善了用户体验。它同时解锁了以前不可能的新功能。在我们查看[下一个](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html) [章节](https://zh-hans.reactjs.org/docs/concurrent-mode-patterns.html)的具体例子之前，我们将对新功能做一个高级的概述。

### 可中断渲染

考虑一个可过滤的产品列表。你是否曾在一个列表筛选器中输入过，且每一次输入都感觉到并不流畅？一些更新产品列表的工作是不可避免的，例如创建新的 DOM 节点或者浏览器执行布局。然而，我们 *何时* 以及 *如何* 处理这项工作起着很大的作用。

解决卡顿的一种常见方法是对输入进行“防抖”处理。防抖时，我们只在用户停止输入 *之后* 更新列表。然而，令人沮丧的是，在我们键入的时候不会进行更新。作为一种替代，我们可以对输入进行“节流”，并以一定的最大频率更新列表。但是在功率较低的设备上，还是会发生卡顿现象。无论防抖还是节流都不会提供最佳的用户体验。

产生卡顿的原因很简单：一旦渲染开始，就不能被终止。因此浏览器不能在按键结束后立即更新。无论 UI 库(如 React)在基准测试中表现得多么出色，只要它使用阻塞渲染，组件中总会有一定数量的工作导致卡顿。并且，通常没有简单的解决办法。

**Concurrent 模式通过使渲染可中断来修复此基本限制。** 这意味着当用户按下另一个按键时，React 不需要阻塞浏览器更新文本输入。相反，它可以让浏览器绘制输入的更新，然后 *在内存中* 渲染更新后的列表。当渲染完成后，React 更新 DOM，并且变化会反映在屏幕上。

从概念上讲，你可以将它视为 React “在分支上”准备每一次更新。就像你可以放弃分支上的工作或者在它们之间切换一样，React 在 Concurrent 模式中可以中断一项正在执行的更新去做一些更重要的事情，然后再回到之前正在做的工作。这项技术也许会使你想起电子游戏中的[双重缓冲](https://wiki.osdev.org/Double_Buffering)。

Concurrent 模式减少了防抖和节流在 UI 中的需求。因为渲染是可以中断的，React 不需要人为地 *延迟* 工作以避免卡顿。它可以立即开始渲染，但是当需要保持应用响应时中断这项工作。

### 有意的加载顺序

我们之前说过 Concurrent 模式就像 React 工作“在分支上”。分支不仅对短期修复有用，对长期的功能开发也很有用。有时你可能会开发某项功能，但是在它达到一个“足够好的状态”以合并到 master 之前，往往需要好几周的时间。我们的版本控制比喻在这一方面同样适用于渲染。

想象一下，我们正在应用的两个屏幕之间导航。有时，我们可能没有加载足够的代码和数据在新屏幕上向用户展示“足够好”的加载状态。这样过渡到一个空白屏或者大型的轮播图会是一个不愉快的体验。然而，通常获取所需的代码和数据不会花费太长时间。**如果 React 可以在旧屏幕上多停留一段时间，并在展示新屏幕之前“跳过”“不够好的加载状态”，不是更好吗？**

虽然这在当前是可以实现的，但是协调起来会有些困难。在 Concurrent 模式中，这些功能是内置的。React 首先在内存中准备新屏幕 — 或者，用我们比喻的说法，“在不同的分支上”。所以 React 可以在更新 DOM 之前进行等待，以便加载更多内容。在 Concurrent 模式中，我们可以让 React 继续显示完全互动，带有内联加载指示器的旧屏幕。当新屏幕准备就绪之后，React 可以带我们跳转到新屏幕。

### 并发

让我们回顾一下上面的两个例子然后看一下 Concurrent 模式是如何将它们联合起来的。**在 Concurrent 模式中，React 可以 同时 更新多个状态** —— 就像分支可以让不同的团队成员独立地工作一样：

- 对于 CPU-bound 的更新 (例如创建新的 DOM 节点和运行组件中的代码)，并发意味着一个更急迫的更新可以“中断”已经开始的渲染。
- 对于 IO-bound 的更新 (例如从网络加载代码或数据)，并发意味着 React 甚至可以在全部数据到达之前就在内存中开始渲染，然后跳过令人不愉快的空白加载状态。

重要的是，你 *使用* React 的方式是相同的。components，props，和 state 等概念的基本工作方式是相同的。当你想更新屏幕，设置 state 即可。

React 使用一种启发式方法决定更新的“紧急性”，并且允许你用几行代码对其进行调整，以便你可以在每次交互中实现理想的用户体验。

## 将研究投入生产

围绕 Concurrent 模式有一个共同的主题。**它的任务是帮助将人机交互研究的结果整合到真实的 UI 中。**

例如，研究表明，在屏幕之间切换时显示过多的中间加载状态会使切换的速度 *变慢*。这就是为什么 Concurrent 模式在一个固定的“时间表”上显示新的加载状态，用于避免不愉快的和过多的更新。

类似的，我们从研究得知悬停和文本输入之类的交互需要在很短的时间内处理，而点击和页面转换可以等待稍长时间而不会感到迟缓。Concurrent 模式在内部使用不同的“优先级”，大致对应于人类感知研究中的交互类别。

专注于用户体验的团队有时会通过一次性解决方案来解决类似的问题。然而，这些解决方案难以维护所以很少能长期存活。使用 Concurrent 模式，我们的目标是将 UI 的研究结果纳入抽象本身，并提供使用它们的惯用方法。作为一个 UI 库，React 很适合这样做。

现在你已经知道 Concurrent 模式是什么了！

在之后的页面中，你将学习更多特定主题的详细信息：

- [Suspense 用于数据获取](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html) 描述了一种在 React 组件中获取数据的新机制。
- [Concurrent UI Patterns](https://zh-hans.reactjs.org/docs/concurrent-mode-patterns.html) 展示了一些通过 Concurrent 模式和 Suspense 实现的 UI 模式。
- [采用 Concurrent 模式](https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html) 解释了如何在你的项目中尝试 Concurrent 模式。
- [Concurrent 模式的 API 索引](https://zh-hans.reactjs.org/docs/concurrent-mode-reference.html) 记录了在实验性版本中可用的新 API。

在[新的React架构](https://react.iamkasong.com/preparation/newConstructure.html#react16架构)一节我们介绍了`Scheduler`，他包含两个功能：

1. 时间切片
2. 优先级调度

本节我们学习这个两个功能是如何在`Scheduler`中实现的。

# Scheduler调度原理

## Scheduler调度原理

## 时间切片原理

`时间切片`的本质是模拟实现[requestIdleCallback (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)。

除去“浏览器重排/重绘”，下图是浏览器一帧中可以用于执行`JS`的时机。

```js
一个task(宏任务) -- 队列中全部job(微任务) -- requestAnimationFrame -- 浏览器重排/重绘 -- requestIdleCallback
```

`requestIdleCallback`是在“浏览器重排/重绘”后如果当前帧还有空余时间时被调用的。

浏览器并没有提供其他`API`能够在同样的时机（浏览器重排/重绘后）调用以模拟其实现。

唯一能精准控制调用时机的`API`是`requestAnimationFrame`，他能让我们在“浏览器重排/重绘”之前执行`JS`。

这也是为什么我们通常用这个`API`实现`JS`动画 —— 这是浏览器渲染前的最后时机，所以动画能快速被渲染。

所以，退而求其次，`Scheduler`的`时间切片`功能是通过`task`（宏任务）实现的。

最常见的`task`当属`setTimeout`了。但是有个`task`比`setTimeout`执行时机更靠前，那就是[MessageChannel (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)。

所以`Scheduler`将需要被执行的回调函数作为`MessageChannel`的回调执行。如果当前宿主环境不支持`MessageChannel`，则使用`setTimeout`。

> 你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L228-L234)看到`MessageChannel`的实现。[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L47-L55)看到`setTimeout`的实现

在`React`的`render`阶段，开启`Concurrent Mode`时，每次遍历前，都会通过`Scheduler`提供的`shouldYield`方法判断是否需要中断遍历，使浏览器有时间渲染：

```js
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```

是否中断的依据，最重要的一点便是每个任务的剩余时间是否用完。

在`Schdeduler`中，为任务分配的初始剩余时间为`5ms`。

> 你可以从[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L119)看到初始剩余时间的定义

随着应用运行，会通过`fps`动态调整分配给任务的可执行时间。

> 你可以从[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L172-L187)看到动态分配任务时间

这也解释了为什么启用`Concurrent Mode`后每个任务的执行时间大体都是多于5ms的一小段时间 —— 每个时间切片被设定为5ms，任务本身再执行一小段时间，所以整体时间是多于5ms的时间

那么当`shouldYield`为`true`，以至于`performUnitOfWork`被中断后是如何重新启动的呢？我们会在介绍完"优先级调度"后解答。

##  优先级调度

首先我们来了解`优先级`的来源。需要明确的一点是，`Scheduler`是独立于`React`的包，所以他的`优先级`也是独立于`React`的`优先级`的。

`Scheduler`对外暴露了一个方法[unstable_runWithPriority (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/Scheduler.js#L217-L237)。

这个方法接受一个`优先级`与一个`回调函数`，在`回调函数`内部调用获取`优先级`的方法都会取得第一个参数对应的`优先级`：

```js
function unstable_runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
    case LowPriority:
    case IdlePriority:
      break;
    default:
      priorityLevel = NormalPriority;
  }

  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}
```

可以看到，`Scheduler`内部存在5种优先级。

在`React`内部凡是涉及到`优先级`调度的地方，都会使用`unstable_runWithPriority`。

比如，我们知道`commit`阶段是同步执行的。可以看到，`commit`阶段的起点`commitRoot`方法的优先级为`ImmediateSchedulerPriority`。

`ImmediateSchedulerPriority`即`ImmediatePriority`的别名，为最高优先级，会立即执行。

```js
function commitRoot(root) {
  const renderPriorityLevel = getCurrentPriorityLevel();
  runWithPriority(
    ImmediateSchedulerPriority,
    commitRootImpl.bind(null, root, renderPriorityLevel),
  );
  return null;
}
```

## 优先级的意义

`Scheduler`对外暴露最重要的方法便是[unstable_scheduleCallback (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/Scheduler.js#L279-L359)。该方法用于以某个`优先级`注册回调函数。

比如在`React`中，之前讲过在`commit`阶段的`beforeMutation`阶段会调度`useEffect`的回调：

```js
if (!rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = true;
  scheduleCallback(NormalSchedulerPriority, () => {
    flushPassiveEffects();
    return null;
  });
}
```

这里的回调便是通过`scheduleCallback`调度的，优先级为`NormalSchedulerPriority`，即`NormalPriority`。

不同`优先级`意味着什么？不同`优先级`意味着不同时长的任务过期时间：

```js
var timeout;
switch (priorityLevel) {
  case ImmediatePriority:
    timeout = IMMEDIATE_PRIORITY_TIMEOUT;
    break;
  case UserBlockingPriority:
    timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
    break;
  case IdlePriority:
    timeout = IDLE_PRIORITY_TIMEOUT;
    break;
  case LowPriority:
    timeout = LOW_PRIORITY_TIMEOUT;
    break;
  case NormalPriority:
  default:
    timeout = NORMAL_PRIORITY_TIMEOUT;
    break;
}

var expirationTime = startTime + timeout;
```

其中：

```js
// Times out immediately
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
// Eventually times out
var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
// Never times out
var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
```

可以看到，如果一个任务的`优先级`是`ImmediatePriority`，对应`IMMEDIATE_PRIORITY_TIMEOUT`为`-1`，那么

```js
var expirationTime = startTime - 1;
```

则该任务的过期时间比当前时间还短，表示他已经过期了，需要立即被执行。

##  不同优先级任务的排序

我们已经知道`优先级`意味着任务的过期时间。设想一个大型`React`项目，在某一刻，存在很多不同`优先级`的`任务`，对应不同的过期时间。

同时，又因为任务可以被延迟，所以我们可以将这些任务按是否被延迟分为：

- 已就绪任务
- 未就绪任务

```js
  if (typeof options === 'object' && options !== null) {
    var delay = options.delay;
    if (typeof delay === 'number' && delay > 0) {
      // 任务被延迟
      startTime = currentTime + delay;
    } else {
      startTime = currentTime;
    }
  } else {
    startTime = currentTime;
  }
```

所以，`Scheduler`存在两个队列：

- timerQueue：保存未就绪任务
- taskQueue：保存已就绪任务

每当有新的未就绪的任务被注册，我们将其插入`timerQueue`并根据开始时间重新排列`timerQueue`中任务的顺序。

当`timerQueue`中有任务就绪，即`startTime <= currentTime`，我们将其取出并加入`taskQueue`。

取出`taskQueue`中最早过期的任务并执行他。

为了能在O(1)复杂度找到两个队列中时间最早的那个任务，`Scheduler`使用[小顶堆 (opens new window)](https://www.cnblogs.com/lanhaicode/p/10546257.html)实现了`优先级队列`。

> 你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/SchedulerMinHeap.js)看到`优先级队列`的实现

至此，我们了解了`Scheduler`的实现。现在可以回答介绍`时间切片`时提到的问题：

> 那么当shouldYield为true，以至于performUnitOfWork被中断后是如何重新启动的呢？

在“取出`taskQueue`中最早过期的任务并执行他”这一步中有如下关键步骤：

```js
const continuationCallback = callback(didUserCallbackTimeout);
currentTime = getCurrentTime();
if (typeof continuationCallback === 'function') {
  // continuationCallback是函数
  currentTask.callback = continuationCallback;
  markTaskYield(currentTask, currentTime);
} else {
  if (enableProfiling) {
    markTaskCompleted(currentTask, currentTime);
    currentTask.isQueued = false;
  }
  if (currentTask === peek(taskQueue)) {
    // 将当前任务清除
    pop(taskQueue);
  }
}
advanceTimers(currentTime);
```

当注册的回调函数执行后的返回值`continuationCallback`为`function`，会将`continuationCallback`作为当前任务的回调函数。

如果返回值不是`function`，则将当前被执行的任务清除出`taskQueue`。

`render`阶段被调度的函数为`performConcurrentWorkOnRoot`，在该函数末尾有这样一段代码：

```js
if (root.callbackNode === originalCallbackNode) {
  // The task node scheduled for this root is the same one that's
  // currently executed. Need to return a continuation.
  return performConcurrentWorkOnRoot.bind(null, root);
}
```

可以看到，在满足一定条件时，该函数会将自己作为返回值。

> 你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.old.js#L850-L854)看到这段代码

# lane模型

## lane的计算机表示：车道

那么这个车道和优先级之间有什么关系呢？下面就是关于lane模型的讲解

上一节我们提到`Scheduler`与`React`是两套`优先级`机制。在`React`中，存在多种使用不同`优先级`的情况，比如：

注：以下例子皆为`Concurrent Mode`开启情况

- 过期任务或者同步任务使用`同步`优先级
- 用户交互产生的更新（比如点击事件）使用高优先级
- 网络请求产生的更新使用一般优先级
- `Suspense`使用低优先级

`React`需要设计一套满足如下需要的`优先级`机制：

- 可以表示`优先级`的不同
- 可能同时存在几个同`优先级`的`更新`，所以还得能表示`批`的概念
- 方便进行`优先级`相关计算

为了满足如上需求，`React`设计了`lane`模型。接下来我们来看`lane`模型如何满足以上3个条件。

## 表示优先级的不同

想象你身处赛车场。

不同的赛车疾驰在不同的赛道。内圈的赛道总长度更短，外圈更长。某几个临近的赛道的长度可以看作差不多长。

`lane`模型借鉴了同样的概念，使用31位的二进制表示31条赛道，位数越小的赛道`优先级`越高，某些相邻的赛道拥有相同`优先级`。

如下：

```js
export const NoLanes: Lanes = /*                        */ 0b0000000000000000000000000000000;
export const NoLane: Lane = /*                          */ 0b0000000000000000000000000000000;

export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001;
export const SyncBatchedLane: Lane = /*                 */ 0b0000000000000000000000000000010;

export const InputDiscreteHydrationLane: Lane = /*      */ 0b0000000000000000000000000000100;
const InputDiscreteLanes: Lanes = /*                    */ 0b0000000000000000000000000011000;

const InputContinuousHydrationLane: Lane = /*           */ 0b0000000000000000000000000100000;
const InputContinuousLanes: Lanes = /*                  */ 0b0000000000000000000000011000000;

export const DefaultHydrationLane: Lane = /*            */ 0b0000000000000000000000100000000;
export const DefaultLanes: Lanes = /*                   */ 0b0000000000000000000111000000000;

const TransitionHydrationLane: Lane = /*                */ 0b0000000000000000001000000000000;
const TransitionLanes: Lanes = /*                       */ 0b0000000001111111110000000000000;

const RetryLanes: Lanes = /*                            */ 0b0000011110000000000000000000000;

export const SomeRetryLane: Lanes = /*                  */ 0b0000010000000000000000000000000;

export const SelectiveHydrationLane: Lane = /*          */ 0b0000100000000000000000000000000;

const NonIdleLanes = /*                                 */ 0b0000111111111111111111111111111;

export const IdleHydrationLane: Lane = /*               */ 0b0001000000000000000000000000000;
const IdleLanes: Lanes = /*                             */ 0b0110000000000000000000000000000;

export const OffscreenLane: Lane = /*                   */ 0b1000000000000000000000000000000;
```

> 你可以在[这里 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberLane.js#L77-L107)看到`lane`的定义

其中，同步优先级占用的赛道为第一位：

```js
export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001;
```

从`SyncLane`往下一直到`SelectiveHydrationLane`，赛道的`优先级`逐步降低。

## 表示“批”的概念

可以看到其中有几个变量占用了几条赛道，比如：

```js
const InputDiscreteLanes: Lanes = /*                    */ 0b0000000000000000000000000011000;
export const DefaultLanes: Lanes = /*                   */ 0b0000000000000000000111000000000;
const TransitionLanes: Lanes = /*                       */ 0b0000000001111111110000000000000;
```

这就是`批`的概念，被称作`lanes`（区别于`优先级`的`lane`）。

其中`InputDiscreteLanes`是“用户交互”触发更新会拥有的`优先级`范围。

`DefaultLanes`是“请求数据返回后触发更新”拥有的`优先级`范围。

`TransitionLanes`是`Suspense`、`useTransition`、`useDeferredValue`拥有的`优先级`范围。

这其中有个细节，越低`优先级`的`lanes`占用的位越多。比如`InputDiscreteLanes`占了2个位，`TransitionLanes`占了9个位。

原因在于：越低`优先级`的`更新`越容易被打断，导致积压下来，所以需要更多的位。相反，最高优的同步更新的`SyncLane`不需要多余的`lanes`。

## 方便进行优先级相关计算

既然`lane`对应了二进制的位，那么`优先级`相关计算其实就是位运算。

比如：

计算`a`、`b`两个`lane`是否存在交集，只需要判断`a`与`b`按位与的结果是否为`0`：

```js
export function includesSomeLane(a: Lanes | Lane, b: Lanes | Lane) {
  return (a & b) !== NoLanes;
}
```

计算`b`这个`lanes`是否是`a`对应的`lanes`的子集，只需要判断`a`与`b`按位与的结果是否为`b`：

```js
export function isSubsetOfLanes(set: Lanes, subset: Lanes | Lane) {
  return (set & subset) === subset;
}
```

将两个`lane`或`lanes`的位合并只需要执行按位或操作：

```js
export function mergeLanes(a: Lanes | Lane, b: Lanes | Lane): Lanes {
  return a | b;
}
```

从`set`对应`lanes`中移除`subset`对应`lane`（或`lanes`），只需要对`subset`的`lane`（或`lanes`）执行按位非，结果再对`set`执行按位与。

```js
export function removeLanes(set: Lanes, subset: Lanes | Lane): Lanes {
  return set & ~subset;
}
```

> 更多位运算参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)