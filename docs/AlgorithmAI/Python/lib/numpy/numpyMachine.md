

## 拼接数组np.vstack()和np.hstack()

在这里我们介绍两个拼接数组的方法：

np.vstack():在竖直方向上堆叠

np.hstack():在水平方向上平铺

```python
import numpy as np
arr1=np.array([1,2,3])
arr2=np.array([4,5,6])
print np.vstack((arr1,arr2))
 
print np.hstack((arr1,arr2))
 
a1=np.array([[1,2],[3,4],[5,6]])
a2=np.array([[7,8],[9,10],[11,12]])
print a1
print a2
print np.hstack((a1,a2))
```

结果如下：

```python
[[1 2 3]
 [4 5 6]]
[1 2 3 4 5 6]
[[1 2]
 [3 4]
 [5 6]]
[[ 7  8]
 [ 9 10]
 [11 12]]
[[ 1  2  7  8]
 [ 3  4  9 10]
 [ 5  6 11 12]]
```

这里还需要强调一点，在hstack应用的时候，我在做cs231n上的assignment1的时候，我总是在hstack这里出错！才发现我以前学的很肤浅啊！

（1）np.hstack()

函数原型：numpy.hstack(tup)

其中tup是arrays序列，tup : sequence of ndarrays

The arrays must have the same shape along all but the second axis,except 1-D arrays which can be any length.

等价于：np.concatenate(tup, axis=1)

例子一：

```python
import numpy as np
brr1=np.array([1,2,3,4,55,6,7,77,8,9,99])
brr1_folds=np.array_split(brr1,3)
print brr1_folds
print brr1_folds[0:2]+brr1_folds[1:3]
print np.hstack((brr1_folds[:2]+brr1_folds[1:3]))
print brr1_folds[0:2]
print brr1_folds[1:3]
#print np.hstack((brr1_folds[0:2],brr1_folds[1:3]))
 
```

最后一行如果不注释掉就会出错;

```python
[array([1, 2, 3, 4]), array([55,  6,  7, 77]), array([ 8,  9, 99])]
[array([1, 2, 3, 4]), array([55,  6,  7, 77]), array([55,  6,  7, 77]), array([ 8,  9, 99])]
[ 1  2  3  4 55  6  7 77 55  6  7 77  8  9 99]
[array([1, 2, 3, 4]), array([55,  6,  7, 77])]
[array([55,  6,  7, 77]), array([ 8,  9, 99])]
```

错误的原因就是以为我的array的维度不一致。改成+就好啦，加号是list的拼接！


例子二：

print np.hstack(([1,2,3,3,4],[3,4,5,8,6,6,7]))
结果是：表明了一维的数组hstack是随意的。

[1 2 3 3 4 3 4 5 8 6 6 7]

例子三：

表明我们的hstack必须要第二维度是一样的：

```python
print np.hstack(([1,2,3,3,4],[3,4,5,8,6,6,7]))
print np.hstack(([[1,2,3],[2,3,4]],[[1,2],[2,3]]))
```

结果：

[1 2 3 3 4 3 4 5 8 6 6 7]
[[1 2 3 1 2]

 [2 3 4 2 3]]

如果你把上面改成下面就会报错了！！！

```python
print np.hstack(([1,2,3,3,4],[3,4,5,8,6,6,7]))
print np.hstack(([[1,2,3],[2,3,4]],[[1,2]]))
```

