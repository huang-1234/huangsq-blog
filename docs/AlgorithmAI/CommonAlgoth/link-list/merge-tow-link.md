# [合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

> 问题：

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

我的思路简单来说就是维护两个指针，遍历两个linklist

一种是新建一个链表，然后使用尾插法在两个链表中选择一个最小的插进去，由于是是尾插法，顺序不变。（头插法叛逆顺序）

```js
 function ListNode(val, next) {
   this.val = (val===undefined ? 0 : val)
   this.next = (next===undefined ? null : next)
 }
```



```js
// 换一种处理便捷的情况
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;

  const merge = (l1, l2) => {
    let L1 = l1, L2 = l2;
    let res = new ListNode();
    // let rear1 = L1, rear2 = L2;
    let rear = res;
    while (L1 && L2) {
      if (L1.val <= L2.val) {
        let s = new ListNode();
        s.val = L1.val;
        rear.next = s;
        rear = s;
        L1 = L1.next;
      } else {
        let s = new ListNode();
        s.val = L2.val;
        rear.next = s;
        rear = s;
        L2 = L2.next;
      }
    }
    // 处理剩下的
    if (L1) rear.next = L1;
    else if (L2) rear.next = L2;
    else rear.next = null;

    return res.next;
  }
  return merge(l1, l2);
};
```

这里按常理来说是log(n+m)的算法，但是考虑到每次都要调用函数，就显得有点太low了

所以这里我们不用每次都调用这个函数，直接每次都引用L1或者、L2，

> 代码如下

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;

  const merge = (l1, l2) => {
    let L1 = l1, L2 = l2;
    let res = new ListNode();
    // let rear1 = L1, rear2 = L2;
    let rear = res;
    while (L1 && L2) {
      if (L1.val <= L2.val) {
        let temp = L1;
        rear.next = temp;
        rear = temp;
        L1 = L1.next;
      }else {
        let temp = L2;
        rear.next=temp;
        rear = temp;
        L2 = L2.next;
      }
    }
    if(L1){
        rear.next=L1;
    }
    else if(L2){
        rear.next=L2;
    }
    else{
        rear.next = null;
    }
    
    return res.next;
  }
  return merge(l1, l2);
};
```

## c++code 头插和尾插

```cpp
#include <iostream>
using namespace std;

// 头插法将一个数组变成一个链表
typedef struct LinkNode {
  int val;
  LinkNode* next;
} Node;
// 头插法生成链表
void createListHead(LinkNode*& L, int a[], int n) {
  Node* s;
  L = (Node*)malloc(sizeof(Node));
  L->next = NULL;
  for (int i = 0; i < n; ++i) {
    s = (Node*)malloc(sizeof(Node));
    s->val = a[i];
    s->next = L->next;
    L->next = s;
  }
}
// 尾插法生成链表
void createListRear(LinkNode*& L, int a[], int n) {
  Node* s,*r;
  L = (Node*)malloc(sizeof(Node));
  // L->next = NULL;
  r = L;
  for (int i = 0; i < n; ++i) {
    s = (Node*)malloc(sizeof(Node));
    s->val = a[i];
    r->next = s;
    r = s;
  }
}
int main() {
  // int a[] = [ 1, 5, 6, 98, 7, 5, 6, 2 ];
}
```

