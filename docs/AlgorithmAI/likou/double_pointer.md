# 双指针





# 三数之和=target

先看题目描述：



我的答案：js版本

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length===undefined || nums.length < 3 || 3 === nums.length && 0 !== nums[0] + nums[1] + nums[2]) {
    return []
  }
  nums.sort((a,b) => a-b);
  // return nums;

  let resArr = [];
  let length = nums.length;
  for (let i = 0;i < length - 1;++i) {
    if (nums[i] > 0) break; // 加上龙神这句代码，如果一直最左侧的数值都>0,则提前退出
    // if(i<length-1 && nums[i]===nums[i+1] ) continue;
     if (i > 0 && nums[i] === nums[i - 1]) continue;
    let L = i+1;let R = length - 1;
    while (L < R) {
      if (0 === nums[L] + nums[R] + nums[i] ) {
        resArr.push([nums[L], nums[R], nums[i]]);
        // 加龙神两句代码判重
        while (nums[L] === nums[L + 1]) L++;
        while (nums[R] === nums[R - 1]) R--;
        L++;R--; //
      }
      else if (0 > nums[L] + nums[R] + nums[i] ) {
        ++L;
      } else {
        R--;
      }
    }
  }
  return resArr;
};
```

