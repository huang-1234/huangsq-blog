# 1-render-stage



## beginWork

学习后续的 render 阶段和 commit 阶段。这其中，render 阶段可以认为是整个渲染链路中最为核心的一环，因为我们反复强调“找不同”的过程，恰恰就是在这个阶段发生的。

render 阶段做的事情有很多，这里我们将以 beginWork 为线索，着重探讨 Fiber 树的构建过程。

performSyncWorkOnRoot 标志着 render 阶段的开始，finishSyncRender 标志着 render 阶段的结束。这中间包含了大量的 beginWork、completeWork 调用栈，正是 render 的工作内容。

beginWork、completeWork 这两个方法需要注意，它们串联起的是一个“模拟递归”的过程。

在前面我强调过，React 15 下的调和过程是一个递归的过程。而 Fiber 架构下的调和过程，虽然并不是依赖递归来实现的，但在

ReactDOM.render 触发的同步模式下，它仍然是一个深度优先搜索的过程。在这个过程中，beginWork 将创建新的 Fiber 节点，而 completeWork 则负责将 Fiber 节点映射为 DOM 节点。



## workInProgress 节点的创建
前一章曾经提到，performSyncWorkOnRoot  是 render 阶段的起点，而这个函数最关键的地方在于它调用了 renderRootSync。

