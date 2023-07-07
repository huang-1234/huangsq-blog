# js数据结构

## 链表

### 链表和数组

大家都用过js中的数组，数组其实是一种线性表的顺序存储结构，它的特点是用一组地址连续的存储单元依次存储数据元素。而它的缺点也正是其特点而造成，比如对数组做删除或者插入的时候，可能需要移动大量的元素。

这里大致模拟一下数组的插入操作：

```
    function insert(arr, index, data) {
      for (let i = arr.length; i >index; i--) {
        arr[i] = arr[i - 1];
      }
      arr[index] = data;
    }
```

从上面的代码可以看出数组的插入以及删除都有可能会是一个O(n)的操作。从而就引出了链表这种数据结构，链表不要求逻辑上相邻的元素在物理位置上也相邻，因此它没有顺序存储结构所具有的缺点，当然它也失去了数组在一块连续空间内随机存取的优点。

### 单向链表

#### 单向链表的特点：

- 用一组任意的内存空间去存储数据元素（这里的内存空间可以是连续的，也可以是不连续的）
- 每个节点(node)都由数据本身和一个指向后续节点的指针组成
- 整个链表的存取必须从头指针开始，头指针指向第一个节点
- 最后一个节点的指针指向空（NULL）

#### 链表中的几个主要操作

- 创建节点
- 插入节点
- 搜索/遍历节点
- 删除节点
- 合并

#### 初始化节点

- 指针指向空
- 存储数据

```
    class Node {
        constructor(key) {
            this.next = null;
            this.key = key;
        }
    }
```

#### 初始化单向链表

- 每个链表都有一个头指针，指向第一个节点，没节点则指向NULL

```
    class List {
        constructor() {
            this.head = null;
        }
    }
```

#### 创建节点

```
    static createNode(key) {
        return new createNode(key);
    }
```

这里说明一下，这一块我是向外暴露了一个静态方法来创建节点，而并非直接把它封装进插入操作里去，因为我感觉这样的逻辑会更加正确一些。 从创建一个链表 -> 创建一个节点 -> 将节点插入进链表中。可能你会遇到一些文章介绍的方式是直接将一个数据作为参数去调用insert操作，在insert内部做了一个创建节点。

#### 插入节点（插入到头节点之后）

插入操作只需要去调整节点的指针即可,两种情况：

- head没有指向任何节点，说明当前插入的节点是第一个
  - head指向新节点
  - 新节点的指针指向NULL
- head有指向的节点
  - head指向新的节点
  - 新节点的指针指向原本head所指向的节点

```
    insert(node) {
        // 如果head有指向的节点
        if(this.head){
           node.next = this.head;
        }else {
           node.next = null;
        }
        this.head = node;
    }
```

### 搜索节点

- 从head开始查找
- 找到节点中的key等于想要查找的key的时候，返回该节点

```
    find(key) {
        let node = this.head;
        while(node !== null && node.key !== key){
            node = node.next;
        }
        return node;
    }
```

### 删除节点

这里分三种情况：

- 所要删除的节点刚好是第一个，也就是head指向的节点
  - 将head指向所要删除节点的下一个节点(node.next)
- 要删除的节点为最后一个节点
  - 寻找到所要删除节点的上一个节点(prevNode)
  - 将prevNode中的指针指向NULL
- 在列表中间删除某个节点
  - 寻找到所要删除节点的上一个节点(prevNode)
  - 将prevNode中的指针指向当前要删除的这个节点的下一个节点

```
    delete(node) {
        // 第一种情况
        if(node === this.head){
            this.head = node.next;
            return;
        }

        // 查找所要删除节点的上一个节点
        let prevNode = this.head;
        while (prevNode.next !== node) {
            prevNode = prevNode.next;
        }

        // 第二种情况
        if(node.next === null) {
            prevNode.next = null;
        }

        // 第三种情况
        if(node.next) {
            prevNode.next = node.next;
        }
    }
```

### 单向链表整体的代码

```
class ListNode {
  constructor(key) {
    this.next = null;
    this.key = key;
  }
}

class List {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  static createNode(key) {
    return new ListNode(key);
  }

  // 往头部插入数据
  insert(node) {
    // 如果head后面有指向的节点
    if (this.head) {
      node.next = this.head;
    } else {
      node.next = null;
    }
    this.head = node;
    this.length++;
  }

  find(key) {
    let node = this.head;
    while (node !== null && node.key !== key) {
      node = node.next;
    }
    return node;
  }

  delete(node) {
    if (this.length === 0) {
      throw 'node is undefined';
    }

    if (node === this.head) {
      this.head = node.next;
      this.length--;
      return;
    }

    let prevNode = this.head;

    while (prevNode.next !== node) {
      prevNode = prevNode.next;
    }

    if (node.next === null) {
      prevNode.next = null;
    }
    if (node.next) {
      prevNode.next = node.next;
    }
    this.length--;
  }
}
```

### 双向链表

如果你把上面介绍的单向列表都看明白了，那么这里介绍的双向列表其实差不多。

从上面的图可以很清楚的看到双向链表和单向链表的区别。双向链表多了一个指向上一个节点的指针。

#### 初始化节点

- 指向前一个节点的指针
- 指向后一个节点的指针
- 节点数据

```
    class ListNode {
        this.prev = null;
        this.next = null;
        this.key = key;
    }
```

#### 初始化双向链表

- 头指针指向NULL

```
    class List {
        constructor(){
            this.head = null;
        }
    }
```

#### 创建节点

```
    static createNode(key){
        return new ListNode(key);
    }
```

#### 插入节点（（插入到头节点之后）

- 看上图中head后面的第一个节点可以知道，该节点的prev指向NULL
- 节点的next指针指向后一个节点, 也就是当前头指针所指向的那个节点
- 如果head后有节点，那么原本head后的节点的prev指向新插入的这个节点(因为是双向的嘛)
- 最后将head指向新的节点

```js
    insert(node) {
        node.prev = null;
        node.next = this.head;
        if(this.head){
            this.head.prev = node;
        }
        this.head = node;
    }
```

#### 搜索节点

这里和单向节点一样，就直接贴代码了

```js
  search(key) {
    let node = this.head;
    while (node !== null && node.key !== key) {
      node = node.next;
    }
    return node;
  }
```

#### 删除节点

和之前单向链表一样，分三种情况去看：

- 删除的是第一个节点
  - head指向所要删除节点的下一个节点
  - 下一个节点的prev指针指向所要删除节点的上一个节点
- 删除的是中间的某个节点
  - 所要删除的前一个节点的next指向所要删除的下一个节点
  - 所要删除的下一个节点的prev指向所要删除的前一个节点
- 删除的是最后一个节点
  - 要删除的节点的上一个节点的next指向null（也就是指向删除节点的next所指的地址）

```js
   delete(node) {
        const {prev,next} = node;
        delete node.prev;
        delete node.next;
        if(node === this.head){
            this.head = next;
        }
        if(next){
            next.prev = prev;
        }
        if(prev){
            prev.next = next;
        }
    }
```

### 双向链表整体代码

```js
    class ListNode {
  constructor(key) {
    // 指向前一个节点
    this.prev = null;
    // 指向后一个节点
    this.next = null;
    // 节点的数据(或者用于查找的键)
    this.key = key;
  }
}

/`
 * 双向链表
 */
class List {
  constructor() {
    this.head = null;
  }

  static createNode(key) {
    return new ListNode(key);
  }

  insert(node) {
    node.prev = null;
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;
  }

  search(key) {
    let node = this.head;
    while (node !== null && node.key !== key) {
      node = node.next;
    }
    return node;
  }

  delete(node) {
    const { prev, next } = node;
    delete node.prev;
    delete node.next;

    if (node === this.head) {
      this.head = next;
    }

    if (prev) {
      prev.next = next;
    }
    if (next) {
      next.prev = prev;
    }
  }
}
```

### 总结

这里做一个小总结吧，可能有一部分人读到这里还不是特别的明白，我的建议是先好好看懂上面的单向链表。 其实只要你明白了链表的基础概念，就是有一个head，然后在有好多的节点(Node)，然后用一个指针把他们串起来就好了，至于里面的插入操作也好，删除也好，其实都是在调整节点中指针的指向。

### 后续

后续可能还会是数据结构，可能是讲二叉堆，也可能回过头来讲一些队列和栈的思想在程序中的应用。欢迎大家指出文章的错误，如果有什么写作建议也可以提出。我会持续的去写关于前端的一些技术文章，如果大家喜欢的话可以关注一下哈

https://segmentfault.com/a/1190000017569816

> 注意：

因为JS中，数组实现了链表的几乎所有功能。没那个必要去再麻烦一次了。

1. 肯定有人要说什么链表效率高数组效率差这种话，事实上在js中不存在的，你创建一个长度为一亿的数组，再创建一个长度为10的数组，并且向这两个数组的中间添加元素，console.time时间出来看看，你会发现所用时间与数组长度长度无关，用书上的话说，T与规模N无关。那么说明js数组达到了链表的效率要求。
2. 可以用splice()方法向数组的指定位置去添加和删除元素，经过测试，所需时间同样与数组长度无关，达到链表的要求。
3. 用数组下标来取代链表的head,tail,next,prev，也很方便。

