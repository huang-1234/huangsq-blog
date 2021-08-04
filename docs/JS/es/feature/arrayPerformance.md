# 数组性能篇

```js
/* 测试环境的主要硬件：CPU T7100（1.8G）；内存4G DDR2 667；硬盘5400转。
主要软件：操作系统为Windows 7；浏览器为Firefox 3.6.9 */
/* 12
1152 */
const times = 1e5
let t1, t2;
{
  const arr1 = [ ],timeStart1 = +new Date;
  // push性能测试
  for (let i = 0; i < times; i++) {
  　　arr1.push(i);
  }
  t1 = +new Date - timeStart1
  console.log(t1);
}

{
  const timeStart2 = +new Date;
  const arr2 = [ ];
  // unshift性能测试
  for (let i = 0; i < times; i++) {
    arr2.unshift(i);
    // console.log(i);
  }
  t2 = +new Date - timeStart2;
  console.log(t2); // 1413
  console.log(t1); // 5
}


/* 我自己的电脑上：
5
310 */
/* 可见，unshift比push要慢差不多100倍！因此，平时还是要慎用unshift，特别是对大数组。那如果一定要达到unshift的效果，
有没有其他方法呢？答案是肯定的。Array有一个叫做reverse的方法，能够把一个数组反转。先把要放进数组的元素用push添加，
再执行一次reverse，就达到了unshift的效果。比如： */
{
  const arr1 = new Array(),timeStart = +new Date
  const times = 5e4
  for (let i = 0;i < times;i++){
    arr1.push(i)
  }
  arr1.reverse();
  console.log(+new Date - timeStart); // 总共花费的时间是6ms，也就是比一次for仅仅多了20%的时间
  console.log(arr1);
}
```

