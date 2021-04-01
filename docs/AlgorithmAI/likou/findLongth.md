

# 求最长递增子序列

描述：给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。

连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



我的js源码：

```js
let FindLongth = function (numArr) {
  // 这里是保存每次遍历数组保存的结果，如果需要节约内存，可以直接使用numArr前面的部分存储结果值，
  //但是本着纯函数的原则，还是算了吧
  let lengthResult = [];
  let start = -1;
  for (let i = 0; i < numArr.length; i++) {
    let next = i + 1;
    if (numArr[i]<numArr[next]) {
      continue;
    } else {
      lengthResult.push(i - start);
      start = i;
    }
  }
  // 求出这个数组的最大值
  let maxValue = lengthResult[0]
  for (let i = 1;i < lengthResult.length;i++) {
    let nextValue = lengthResult[i];
    maxValue = maxValue > nextValue ? maxValue : nextValue;
  }
  // return maxValue;
  return maxValue;
  // lengthResult
}
// // 测试用例
// let testArr = [2,2,2,2,2,2,2]
// let re = FindLongth(testArr);
// console.log(re);
```



> 结果：力扣结果

```text
已完成
执行用时：100 ms
输入
[1,2,3,2,3,4,6,9,11,8,8,2,3,9,13,101,102,1]
输出
6
预期结果
6
```

提交结果：

```text
执行结果：
解答错误
显示详情
输入：
[]
输出：
undefined
预期结果：
0
```

通过加上

```js
if(0===numArr.length){
  return 0
}
```

完整代码附上：

```js
/**
 * @param {number[]} numArr
 * @return {number}
 */
var findLengthOfLCIS = function(numArr) {
  // 这里是保存每次遍历数组保存的结果，如果需要节约内存，可以直接使用numArr前面的部分存储结果值，
  //但是本着纯函数的原则，还是算了吧
  if (0===numArr.length) {
    return 0
  }
  let lengthResult = [];
  let start = -1;
  for (let i = 0; i < numArr.length; i++) {
    let next = i + 1;
    if (numArr[i]<numArr[next]) {
      continue;
    } else {
      lengthResult.push(i - start);
      start = i;
    }
  }
  // 求出这个数组的最大值
  let maxValue = lengthResult[0]
  for (let i = 1;i < lengthResult.length;i++) {
    let nextValue = lengthResult[i];
    maxValue = maxValue > nextValue ? maxValue : nextValue;
  }
  // return maxValue;
  return maxValue;
  // lengthResult
}
```

执行结果：

```text
执行结果：
通过
显示详情
执行用时：
100 ms
, 在所有 JavaScript 提交中击败了
16.02%
的用户
内存消耗：
39.9 MB
, 在所有 JavaScript 提交中击败了
12.98%
的用户
炫耀一下:
```

经过我的优化处理：完整代码

```js
/**
 * @param {number[]} numArr
 * @return {number}
 */
var findLengthOfLCIS = function(numArr) {
  if (0===numArr.length) {
    return 0;
  }
  let start = -1;
  let max=0; // 这个就是所要求的最长递增子序列
  for (let i = 0; i < numArr.length; i++) {
    if (numArr[i]<numArr[1+i]) {
      continue;
    } else {
      max = i - start > max ? i - start : max;
      start = i;
    }
  }
  return max;
}
```

结果显示：

```js
执行结果：
通过
显示详情
执行用时：
96 ms
, 在所有 JavaScript 提交中击败了
23.84%
的用户
内存消耗：
38.8 MB
, 在所有 JavaScript 提交中击败了
37.60%
的用户
炫耀一下:
```
来看下64ms代码
```js
var findLengthOfLCIS = function(nums, l = 1, r = 1) {
    return nums.length ? (nums.reduce((p, v) => (v > p ? r = Math.max(r, ++l) : l = 1, v)), r) : 0
};
```
当我看到优化以后时间还是这么长的时候，我有点失望了，但是当我看到我的代码一点特性也没有，完全可以使用c++来写，但是当时看到c++要写类，比较麻烦，于是我决定使用c语言来写

源码展示：

```c
int findLengthOfLCIS(int* nums, int numsSize){
    if(0==numsSize){
        return 0;
    }
    int start = -1;
    int max = 0;
    int tags = 0;
    for(int i=0;i<numsSize;++i){
        if(numsSize-1!=i && nums[i]<nums[1+i]){
            ++tags;
            max = i-start > max ? i-start : max ;
            continue;
        }else{
            max = i-start > max ? i-start : max ;
            start = i;
        }
    }
    if(numsSize-1==tags){
        return tags+1;
    }
    return max;
}
```

结果如下：

```text
执行结果：
通过
显示详情
执行用时：
12 ms
, 在所有 C 提交中击败了
63.24%
的用户
内存消耗：
6.3 MB
, 在所有 C 提交中击败了
62.29%
的用户
```

这可能还需要优化的地方吧

再次看到别人的4ms代码：

```c
int findLengthOfLCIS(int* nums, int numsSize){
    int sum = 0;
    int start = 0;
    for (int i = 0; i < numsSize; i++) {
        if (i > 0 && nums[i] <= nums[i - 1]) {
            start = i;
        }
        if(i - start + 1 > sum){
            sum = i - start + 1;
        }
    }
    return sum;
}
```

C++实现：

```c++
// longge解答最长递增子序列
#include <cstdio>
#include <algorithm>
using namespace std;

int a[40005];
int d[40005];

int main()
{
  int n;
  scanf("%d", &n);
  for (int i = 1; i <= n; i++)
    scanf("%d", &a[i]);
  if (n == 0)
  { //0个元素特判一下
    printf("0\n");
    return 0;
  }
  d[1] = a[1]; //初始化
  int len = 1;
  for (int i = 2; i <= n; i++)
  {
    //如果可以接在len后面就接上，如果是最长上升子序列，这里变成>
    if (a[i] >= d[len])
      d[++len] = a[i];
    else
    { //否则就找一个最该替换的替换掉
      //找到第一个大于它的d的下标，如果是最长上升子序列，这里变成lower_bound
      int j = upper_bound(d + 1, d + len + 1, a[i]) - d;
      d[j] = a[i];
    }
  }
  printf("%d\n", len);
  return 0;
}
```