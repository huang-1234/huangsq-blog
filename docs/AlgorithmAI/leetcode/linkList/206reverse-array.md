# 反转数组

## 头插法

> js实现头插法

```js
/* 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。 */

// 使用头插法
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
  if (!head || !head.next) return head;

  const resList = new ListNode();
  resList.next = null;
  let p = head;
  while (p) {
    const s = new ListNode();
    s.val = p.val;
    s.next = resList.next;
    resList.next = s;
    p = p.next;
  }
  return resList.next;
};

// 头插法的C++代码,look the detail in 206.cpp
```



头插法生成链表和传入的数组或者其他可遍历的类型，两者顺序是相反的

>  C++代码,look the detail in 206.cpp

```cpp
#include <iostream>
using namespace std;

// 头插法将一个数组变成一个链表
typedef struct LinkNode {
  int val;
  LinkNode* next;
} Node;
void createListF(LinkNode*& L, int a[], int n) {
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
int main() {
  // int a[] = [ 1, 5, 6, 98, 7, 5, 6, 2 ];
}
```

## 尾插法

>  cppCode

```cpp
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
```

