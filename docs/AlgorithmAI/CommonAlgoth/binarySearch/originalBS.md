# 二分算法



### 原始的二分搜索代码

二分搜索的原型就是在「**有序数组**」中搜索一个元素 `target`，返回该元素对应的索引。

如果该元素不存在，那可以返回一个什么特殊值，这种细节问题只要微调算法实现就可实现。

还有一个重要的问题，如果「**有序数组**」中存在多个 `target` 元素，那么这些元素肯定挨在一起，这里就涉及到算法应该返回最左侧的那个 `target` 元素的索引还是最右侧的那个 `target` 元素的索引，也就是所谓的「搜索左侧边界」和「搜索右侧边界」，这个也可以通过微调算法的代码来实现。

**我们前文** **我写了首诗，把二分搜索变成了默写题** **详细探讨了上述问题，对这块还不清楚的读者建议复习前文**，已经搞清楚基本二分搜索算法的读者可以继续看下去。

**在具体的算法问题中，常用到的是「搜索左侧边界」和「搜索右侧边界」这两种场景**，很少有让你单独「搜索一个元素」。

因为算法题一般都让你求最值，比如前文 [二分搜索的运用（一）]() 中说的例题让你求吃香蕉的「最小速度」，让你求轮船的「最低运载能力」，前文 [二分搜索的运用（二）]() 讲的题就更魔幻了，让你使每个子数组之和的「最大值最小」。

求最值的过程，必然是搜索一个边界的过程，所以后面我们就详细分析一下这两种搜索边界的二分算法代码。

「搜索左侧边界」的二分搜索算法的具体代码实现如下：



```java
// 搜索左侧边界
int left_bound(int[] nums, int target) {
    if (nums.length == 0) return -1;
    int left = 0, right = nums.length;

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            // 当找到 target 时，收缩右侧边界
            right = mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid;
        }
    }
    return left;
}
```

假设输入的数组 `nums = [1,2,3,3,3,5,7]`，想搜索的元素 `target = 3`，那么算法就会返回索引 2。

「搜索右侧边界」的二分搜索算法的具体代码实现如下：



```java
// 搜索右侧边界
int right_bound(int[] nums, int target) {
    if (nums.length == 0) return -1;
    int left = 0, right = nums.length;

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            // 当找到 target 时，收缩左侧边界
            left = mid + 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid;
        }
    }
    return left - 1;
}
```

输入同上，那么算法就会返回索引 4

### 二分搜索问题的泛化

什么问题可以运用二分搜索算法技巧？

**首先，你要从题目中抽象出一个自变量** **`x`****，一个关于** **`x`** **的函数** **`f(x)`****，以及一个目标值** **`target`**。

同时，`x, f(x), target` 还要满足以下条件：

**1、****`f(x)`** **必须是在** **`x`** **上的单调函数（单调增单调减都可以）**。

**2、题目是让你计算满足约束条件** **`f(x) == target`** **时的** **`x`** **的值**。

上述规则听起来有点抽象，来举个具体的例子：

给你一个升序排列的有序数组 `nums` 以及一个目标元素 `target`，请你计算 `target` 在数组中的索引位置，如果有多个目标元素，返回最小的索引。

这就是「搜索左侧边界」这个基本题型，解法代码之前都写了，但这里面 `x, f(x), target` 分别是什么呢？

我们可以把数组中元素的索引认为是自变量 `x`，函数关系 `f(x)` 就可以这样设定：

```java
// 函数 f(x) 是关于自变量 x 的单调递增函数
// 入参 nums 是不会改变的，所以可以忽略，不算自变量
int f(int x, int[] nums) {
    return nums[x];
}
```

其实这个函数 `f` 就是在访问数组 `nums`，因为题目给我们的数组 `nums` 是升序排列的，所以函数 `f(x)` 就是在 `x` 上单调递增的函数。

最后，题目让我们求什么来着？是不是让我们计算元素 `target` 的最左侧索引？

是不是就相当于在问我们「满足 `f(x) == target` 的 `x` 的最小值是多少」？

**如果遇到一个算法问题，能够把它抽象成这幅图，就可以对它运用二分搜索算法**。

算法代码如下：

```java
// 函数 f 是关于自变量 x 的单调递增函数
int f(int x, int[] nums) {
    return nums[x];
}

int left_bound(int[] nums, int target) {
    if (nums.length == 0) return -1;
    int left = 0, right = nums.length;

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (f(mid, nums) == target) {
            // 当找到 target 时，收缩右侧边界
            right = mid;
        } else if (f(mid, nums) < target) {
            left = mid + 1;
        } else if (f(mid, nums) > target) {
            right = mid;
        }
    }
    return left;
}
```

### 运用二分搜索的套路框架

想要运用二分搜索解决具体的算法问题，可以从以下代码框架着手思考：

```java
// 函数 f 是关于自变量 x 的单调函数
int f(int x) {
    // ...
}

// 主函数，在 f(x) == target 的约束下求 x 的最值
int solution(int[] nums, int target) {
    if (nums.length == 0) return -1;
    // 问自己：自变量 x 的最小值是多少？
    int left = ...;
    // 问自己：自变量 x 的最大值是多少？
    int right = ... + 1;

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (f(mid) == target) {
            // 问自己：题目是求左边界还是右边界？
            // ...
        } else if (f(mid) < target) {
            // 问自己：怎么让 f(x) 大一点？
            // ...
        } else if (f(mid) > target) {
            // 问自己：怎么让 f(x) 小一点？
            // ...
        }
    }
    return left;
}
```

具体来说，想要用二分搜索算法解决问题，分为以下几步：

**1、确定** **`x, f(x), target`** **分别是什么，并写出函数** **`f`** **的代码**。

**2、找到** **`x`** **的取值范围作为二分搜索的搜索区间，初始化** **`left`** **和** **`right`** **变量**。

**3、根据题目的要求，确定应该使用搜索左侧还是搜索右侧的二分搜索算法，写出解法代码**。