# 堆排序

 7、堆排序（Heap Sort）
堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。

7.1 算法描述
将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。

```js
let len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
function buildMaxHeap(arr) {   // 建立大顶堆
  len = arr.length;
  for (let i = Math.floor(len / 2);i >= 0;i--) { // from i=len/2 start, excurate the heapify(arr,i) untill the i less than 0
    heapify(arr, i);
  }
}

function heapify(arr, i) {     // 堆调整 , 将数组arr索引为i的元素调整到他合适的位置上
  let left = 2 * i + 1; // the index of left son
  let right = 2 * i + 2; // the index  of right son
  let largest = i; // the index of father

  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }
  // dont out and the value of arr[right] greater than the arr[largest] 
  if (right < len && arr[right] > arr[largest]) { // then let the right to the largest
    largest = right;
  }

  // 如果largest已经发生了变化，说明出现较大值上移，再次做调整，直到所有的儿子的value都小于他的fatherValue
  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, largest);
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function heapSort(arr) {
  buildMaxHeap(arr);

  for (let i = arr.length - 1;i > 0;i--) {
    swap(arr, 0, i);
    len--;
    heapify(arr, 0);
  }
  return arr;
}
```

