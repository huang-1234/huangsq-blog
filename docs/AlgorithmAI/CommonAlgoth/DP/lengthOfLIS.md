# Vue3 Diff 核心算法 - 最长递增子序列

本文主要解析 Vue3 Dom Diff 中的核心算法：最长递增子序列，不对 diff 细节做解析。

#### 最长递增子序列（longest increasing subsequence）

> 维基百科：最长递增子序列（longest increasing subsequence）是指，在一个给定的数值序列中，找到一个子序列，使得这个子序列元素的数值依次递增，并且这个子序列的长度尽可能地大。最长递增子序列中的元素在原序列中不一定是连续的。

最长递增子序列是动态规划算法里比较经典的一个例子，看完 wiki 的解释，其实也是有点懵的，可以看看[LeetCode - 最长递增子序列](https://link.segmentfault.com/?url=https%3A%2F%2Fleetcode-cn.com%2Fproblems%2Flongest-increasing-subsequence%2F)里举出的例子。

```js
arr = [10, 9, 2, 5, 3, 7, 101, 18]
arr的最长递增子序列是 [2, 5, 7, 101]、[2, 5, 7, 18]、[2, 3, 7, 101]、[2, 3, 7, 18]
```

在 LeetCode 中求解的是最长递增子序列的长度。
在 Vue3 diff 算法中，求解出来的是序列的下标，比如上述例子，求得的结果是`[2, 4, 5, 7]`。
Vue3 的求解中，用的是动态规划 + 贪心算法 + 二分查找 + 回溯结合。我们可以通过 LeetCode 的例子，使用两种解法来了解一下动态规划/贪心算法/二分查找。

##### 解法一：动态规划

> 维基百科：动态规划通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法，常常适用于有重叠子问题和最优子结构性质的问题。
> 简单来说就是将复杂的问题分解为相同的子问题，求解子问题后将其存起来，根据子问题之间的关系逐步求解。
> 深入了解：[五大基本算法之动态规划算法](https://link.segmentfault.com/?url=https%3A%2F%2Fhoubb.github.io%2F2020%2F01%2F23%2Fdata-struct-learn-07-base-dp%23dynamic-programming)

**Flow**
![flow](lengthOfLIS.assets/bVcRjZk)

_元素遍历详细过程_
![dp](lengthOfLIS.assets/bVcRjZq)

**Code**

```js
var lengthOfLIS = function(nums) {
  if (nums.length === 0) return 0;
  // 生成对应的数组,存储与之对应的最长子序列的长度
  // dp = [1, 1, 1, 1, 1, 1, 1, 1]
  let dp = Array.from(Array(nums.length), () => 1);
  // 遍历数组，判断到了当前位置时，长度为多少
  for (let i = 0; i < nums.length; i++) {
    // 遍历当前位置之前所有存储过的长度
    for (let j = 0; j < i; j++) {
      // 判断当前位置num是否比前面的num大，大的话就在其长度上+1，并取最大值
      nums[i] > nums[j] && (dp[i] = Math.max(dp[i], dp[j] + 1));
    }
  }
  // 返回最长的长度
  return Math.max(...dp);
};
```

##### 解法二：贪心算法 + 二分查找

> 贪心算法：也叫做贪婪算法，在每一步做选择时，总是选择当前最优的方法。
> 举个栗子：假如有一个背包，最多装 50kg 物品，有以下重量物品：28g、12g、8g、5g、4g。求解怎么装能够装到最重的物品？按照贪心算法，则是每次选择当前可装的最重的物品，依次是：28g + 12g + 8g = 48g。之后就无法再装入背包了，但实际我们知道背包最多可装 49g。贪心算法主要是追求局部最优解，而不一定是全局最优解。

**Flow**
![流程图](lengthOfLIS.assets/bVcRgqW)

_元素遍历详细过程_

![流程图](lengthOfLIS.assets/bVcRgrd)

**Code**

```js
var lengthOfLIS = function(nums) {
  if (nums.length === 0) return 0;
  let result = [nums[0]];
  for (let i = 1; i < nums.length; ++i) {
// 如果当前数值大于已选结果的最后一位，则直接往后新增，若当前数值更小，则直接替换前面第一个大于它的数值
    if (nums[i] > result[result.length - 1]) {
      result[result.length] = nums[i];
    } else {
      // 二分查找：找到第一个大于当前数值的结果进行替换
      let left = 0,
        right = result.length - 1;
      while (left < right) {
        let middle = ((left + right) / 2) | 0;
        if (result[middle] < nums[i]) {
          left = middle + 1;
        } else {
          right = middle;
        }
      }
      // 替换当前下标
      result[left] = nums[i];
    }
  }
  return result.length;
};
```

## Vue3 最长递增子序列源码

前面说过，Vue3 解出来的不是子序列长度，也不是最终的子序列数组，而是子序列对应的下标（为什么是下标可以参考另一篇 Vue3 Dom Diff 源码解析）。比如`[10, 9, 2, 5, 3, 7, 101, 18]`解出来的是`[2, 4, 5, 7]`。通过前面两个方法，感觉这个求解已经很简单了。使用贪心算法，将 result 存数值的下标，最后`return result`拿到最终子序列数组。但是肯定不是这样简单，来看看这个例子，直接看最后一步就好：

![ERROR:贪心+二分](lengthOfLIS.assets/bVcRjrC)

通过最后结果的下标也可以发现，最后一位最小，但是跑到前面去了，如果是求长度，这也是没问题的，但是要拿到最后的结果，很明显是不符合我们想要的结果的。Vue3 在计算时同样适用了这个算法，并中使用回溯巧妙的解决了这个问题。

**flow**
![flow](lengthOfLIS.assets/bVcRjVj)

_元素遍历详细过程_
![动态规划 + 贪心算法 + 二分查找](lengthOfLIS.assets/bVcRjVw)

目前得到的是有误的数据，所以需要通过 p 记录的所有前一位的值去回溯。直接从最后一位开始，将前面的 result 全部覆盖，如果不需要修正，则 p 中记录的每一项都是对应的前一位，不会有任何影响。如果需要修正，则会将第一次记录的正确的前一位值覆盖。
![回溯](lengthOfLIS.assets/bVcRjVF)

**code**

```js
function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  // 遍历数组
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    // 此算法中排除了等于0的情况，原因是0成为了diff算法中的占位符，在上面的流程图中已经忽略了，不影响对算法的了解
    if (arrI !== 0) {
      j = result[result.length - 1];
      // 用当前num与result中的最后一项对比
      if (arr[j] < arrI) {
        // 当前数值大于result子序列最后一项时，直接往后新增，并将当前数值的前一位result保存
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      // 当前数值小于result子序列最后一项时，使用二分法找到第一个大于当前数值的下标
      while (u < v) {
        c = ((u + v) / 2) | 0;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        // 找到下标，将当前下标对应的前一位result保存(如果找到的是第一位，不需要操作，第一位前面没有了)
        if (u > 0) {
          p[i] = result[u - 1];
        }
        // 找到下标，直接替换result中的数值
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  // 回溯，直接从最后一位开始，将前面的result全部覆盖，如果不需要修正，则p中记录的每一项都是对应的前一位，不会有任何影响
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
```

> 参考资料：
> [https://jishuin.proginn.com/p...](https://link.segmentfault.com/?url=https%3A%2F%2Fjishuin.proginn.com%2Fp%2F763bfbd2ebdc) > [https://leetcode-cn.com/probl...](https://link.segmentfault.com/?url=https%3A%2F%2Fleetcode-cn.com%2Fproblems%2Flongest-increasing-subsequence%2F) > [https://houbb.github.io/2020/...](https://link.segmentfault.com/?url=https%3A%2F%2Fhoubb.github.io%2F2020%2F01%2F23%2Fdata-struct-learn-07)
