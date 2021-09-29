## JS 数据结构解析和算法实现-并查集

## [前言](https://blog.csdn.net/weixin_33962923/article/details/91394041)

【从蛋壳到满天飞】JS 数据结构解析和算法实现，全部文章大概的内容如下： Arrays(数组)、Stacks(栈)、Queues(队列)、LinkedList(链表)、Recursion(递归思想)、BinarySearchTree(二分搜索树)、Set(集合)、Map(映射)、Heap(堆)、PriorityQueue(优先队列)、SegmentTree(线段树)、Trie(字典树)、UnionFind(并查集)、AVLTree(AVL 平衡树)、RedBlackTree(红黑平衡树)、HashTable(哈希表)

源代码有三个：ES6（单个单个的 class 类型的 js 文件） | JS + HTML（一个 js 配合一个 html）| JAVA (一个一个的工程)

全部源代码已上传 github，[点击我吧](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Filovejwl%2FMaoDataStructures)，光看文章能够掌握两成，动手敲代码、动脑思考、画图才可以掌握八成。

本文章适合 对数据结构想了解并且感兴趣的人群，文章风格一如既往如此，就觉得手机上看起来比较方便，这样显得比较有条理，整理这些笔记加源码，时间跨度也算将近半年时间了，希望对想学习数据结构的人或者正在学习数据结构的人群有帮助。

## 并查集 Union Find

1. 并查集是一种很不一样的树形结构
   1. 之前的树结构都是由父亲指向孩子，
   2. 但是并查集是由孩子指向父亲而形成的这样的一种树结构，
   3. 这样一种奇怪的树结构可以非常高效的来解决某一类问题，
   4. 这类问题就是连接问题(Connectivity Problem)，
   5. 并查集是一种可以高效的回答连接问题的这样的一种数据结构。
2. 连接问题
   1. 给出一个图中任意的两点，
   2. 这两点之间是否可以通过一个路径连接起来，
   3. 简单的使用肉眼观察距离很近的两点，是可以观察出来的，
   4. 如果两点的距离很远，两点之间隔着还有无数个点，
   5. 那么你就很难用肉眼观察出来它们是否是相连的，
   6. 此时就需要借助一定的数据结构，
   7. 而并查集就是回答这种连接问题一个非常好一种数据结构。
3. 并查集可以非常快的判断网络中节点的连接状态
   1. 这里的网络实际上是一个抽象的概念，
   2. 不仅仅是在计算机领域所使用的互联网这样的一个网络，
   3. 最典型的一个例子，如社交网络、微博、微信、facebook，
   4. 他们之间其实就是由一个一个的人作为节点形成的一个网络，
   5. 在这种时候就可以把每两个用户之间是不是好友关系，
   6. 这样的一个概念给抽象成两个节点之间的边，
   7. 如果可以这样的建立一个网络的话，相应的就会产生连接问题，
   8. 比如两个用户 A 和 B，他们本来可能是互不认识的，
   9. 那么通过这个网络是否有可能通过认识的人他认识的人，
   10. 这样一点点的扩散，最终接触到那个你本来完全不认识的人，
   11. 这样的一个问题其实就是在社交网络中相应的连接问题。
4. 网络这样的一种结构不仅仅是用在社交网络
   1. 很多信息网络，比如说亚马逊的商品、豆瓣儿的图书、
   2. 或者音乐网站的一些音乐专辑，这些内容都可以形成节点，
   3. 节点之间都可以以某种形式来定义边，从而形成一个巨大的网络，
   4. 可以在这样的网络中做非常多的事情，
   5. 比如交通系统、公交车、火车、飞机等航班与航线之间他们全都是网络，
   6. 更不用提计算机的网络，每一个路由器都是一个节点，
   7. 其实网络本身是一个应用非常广泛的概念，
   8. 在实际中处理的很多问题，把它抽象出来可能都是一个网络上的问题，
5. 在回答网络中的节点的连接状态这样的一个问题的时候，
   1. 并查集就是一个非常强力的性能非常高效的数据结构，
   2. 并查集除了可以高效的回答网络中节点间的连接状态的问题之外，
   3. 还是数学中集合这种类的一个很好的实现，
   4. 如果你使用的集合主要的操作是在求两个集合的并集的时候，
   5. 并查集中`并`其实就是集合中的`并`这样的概念，
   6. 相应的查就是一个查询操作。
6. 对于并查集来说他们非常高效的来回答在网络中两个节点是否连接的问题
   1. 在一个网络也是可以两个节点他们之间的路径是怎样的，
   2. 既然可以求出两个节点之间的路径，其实就回答了连接的问题，
   3. 两个节点之间如果存在一个路径，那么就一定是连接的，
   4. 如果这个路径根本就不存在，那么它肯定是不连接的，
   5. 这样的一个思路肯定是正确的，
   6. 如果想要回答两个节点之间的连接问题，
   7. 这个答案其实是比回答两个节点之间的路径问题回答的内容要少的，
   8. 因为只需要返回 true 或者 false 就好了，
   9. 但是如果要问 A 和 B 之间的路径是什么的话，
   10. 那么相应的就要得到一个从 A 节点出发一步一步达到节点 B，
   11. 这样一个具体的路径，换句话说其实回答路径问题的方式
   12. 来回答连接问题，那么真正回答的内容是更加的多了，
   13. 这样会导致结果消耗了一些额外的性能求出了当前不关心的内容，
   14. 那个内容就是 A 和 B 之间的具体路径是什么。
7. 当你深入的学习数据结构和算法
   1. 慢慢的就会发现很多问题都会存在这样的情况，
   2. 你完全可以使用一个复杂度更高的算法来把这个问题求解出来，
   3. 但是这个算法之所以复杂度比较高，
   4. 就是因为其实它求出了你问的那个问题并不关心的内容，
   5. 例如自己实现的堆，完全可以使用顺序表示这样的结构，
   6. 或者直接使用一个线性结构数组或链表，
   7. 然后保持这个线性结构中所有元素都是有序的，
   8. 堆这种结构每次都要取出最大或最小的那个元素，
   9. 使用这种顺序表示是非常容易实现的，
   10. 但关键在于使用顺序表示不仅仅可以非常高效的取出
   11. 那个最大的元素或者最小的元素，还可以非常高效的取出
   12. 你存储的第二大的元素或者第二小的元素，
   13. 而这些内容都是在应用堆这种数据结构的时候其实不关心的，
   14. 在系统调度的时候只关系那个优先级最大的任务，
   15. 在医院医生决定做手术的时候只关心那个当前优先级最高的患者，
   16. 为他来准备手术，在涉及一个游戏 AI 的时候，
   17. 当前控制的那个小机器人只能选择一个对你威胁最大的敌人来攻击，
   18. 所以在这种情况下使用顺序表示，它其实维护了很多这些应用中并
   19. 不需要的信息，为了维护这些信息，它就需要有额外性能消耗，
   20. 要维持一个完全的顺序表示，在插入元素的时候时间复杂度是`O(n)`
   21. 这个级别的，之所以会产生这样的情况，
   22. 因为它不仅仅是维护了当前数据中最大的或者最小的那个元素，
   23. 而堆这种数据结构除了你关心的那个最大的元素和最小的元素之外，
   24. 不管其它元素之间的顺序，这才使得堆这种数据结构相比顺序表来说，
   25. 整体大大提高了它的性能。
8. 连接问题和路径问题也是一样的
   1. 虽然可以使用求解路径的思路来看 A 和 B 这两个点是否连接，
   2. 但是由于它回答了额外的问题，A 和 B 之间具体怎么连接都回答出来了，
   3. 在很多时候并不关心 A 和 B 之间怎么连接，只要看他是否连接，
   4. 此时并查集就是一种更好的选择，对于这一点，
   5. 很多算法或者数据结构它们所解决的问题之间的差别是非常微妙的，
   6. 需要不断的积累不断的实践，慢慢的了解每种不同的算法或者不同的数据结构，
   7. 它们所解决的那个问题以及具体的不同点在哪里，
   8. 时间久了就可以慢慢的非常快速的反应出对于某一些具体问题
   9. 最好的应该使用哪种算法或者哪种数据结构来进行解决。
9. 具体来讲对于并查集这种数据结构来说
   1. 存储一组数据，它主要可以支持两个动作，
   2. `union(p, q)`，也就是并的操作，传入两个参数 p 和 q，
   3. 然后在并查集内部将这两个数据以及他们所在的集合给合并起来，
   4. 另外一个动作就是`isConnected(p, q)`，
   5. 也就是查询对于给定的两个数据，他们是否属于同一个集合，
   6. 并查集主要支持这样的两种操作。
10. 需要设计这样的一种并查集接口
    1. 也就是说并查集也可以有不同的底层实现，
    2. 通过实现不同的并查集，
    3. 可以一点点的优化自己实现的并查集，
    4. 随着你不断的优化，
    5. 自己编写的这个并查集在具体的解决连接问题的时候，
    6. 效率会越来越高。

## 并查集 简单实现

```js
1.
   MyUnionFind;

   1. `unionElements(p, q)`：将这两个数据以及他们所在的集合进行合并。
   2. `isConnected(p, q)`：查询两个数据是否在同一个集合中。
   3. `getSize()`：当前并查集一共考虑多少个元素

2. isConnected 方法中传入的 p 和 q 都是 int 型，

   1. 对于具体元素是谁，在并查集的内部并不关心，
   2. 在使用并查集的时候可以将元素和一个数组相对应的数组索引做一个映射
   3. 相当于真正关心的是一个 id 为 p 和 id 为 q 这样的两个元素它们是否相连，
   4. 对于 id 为 p 这样的元素它具体对应的是什么样的一个元素并不关心。

3. unionElements 方法中传入的 p 和 q 都是 int 型。

4. 向线段树一样，并不考虑添加一个元素或者删除一个元素

   1. 考虑的是对于当下固定的元素来说，
   2. 进行并或者查这样的两个操作。
```

### 代码示例

1. MyUnionFind

## 并查集 简单实现 Quick Find

1. 对于并查集主要实现两个操作

   1. union 操作将两个元素合并在一起变成在一个集合中的元素，
   2. isConnected 操作查看两个元素是否是相连的

2. 并查集的基本数据表示

   1. 可以直接给每个数据做一个编号，
   2. 0-9 就表示 10 个不同的数据，
   3. 这是一种抽象的表示，
   4. 具体这十个编号可能是十个人或者是十部车或者是十本书，
   5. 这是由你的业务逻辑所决定的，
   6. 但是在并查集的内部只存 0-9 这是个编号，
   7. 它表示十个具体的元素
   8. 对于每一个元素它存储的是对应的集合的 ID。
   9. 例如下图并查集一中编号 0-4 这五个数据它们所对应的 ID 为 0，
   10. 编号为 5-9 这五个数据它们所对应的 ID 为 1，
   11. 不同的 ID 值就是不同的集合所对应的那个编号，
   12. 在并查集中就可以表示为 将这个十个数据分成了两个集合，
   13. 其中 0-4 这五个元素在一个集合中，5-9 这个五个元素在另一个集合中。
   14. 如果是下图并查集二中这样子，
   15. 其中 0、2、4、6、8 这五个元素在一个集合中，
   16. 而 1、3、5、7、9 这五个元素在一个集合中，
   17. 在具体的编程中会把这样的一个数组称之为 id，
   18. 通过这样的一个数组就可以非常容易的来回答所谓的连接问题，
   19. 在并查集图二中，0 和 2 就是相连接的，
   20. 或者说 0 和 2 是同属于一个集合的，因为他们所对应的 id 的值都是 0，
   21. 1 和 3 也属于同一个同一个集合，因为他们所对应的 id 值都为 1，
   22. 相应的可以想象 1 和 2 都属于不同的集合，因为他们对应的 id 值是不同的。

```js
// 并查集 一
//     0   1   2   3   4   5   6   7   8   9
//     -------------------------------------
// id  0   0   0   0   0   1   1   1   1   1

// 并查集 二
//     0   1   2   3   4   5   6   7   8   9
//     -------------------------------------
// id  0   1   0   1   0   1   0   1   0   1
```

3. 使用 id 这样的一个数组来存储你的数据

   1. 是可以很容易的回答 isConnected 的这个问题的，
   2. 只需要直接来看 p 和 q 这两个值所对应的 id 值是否一样就好了，
   3. 将查询 p 或者 q 每个元素背后所对应的那个集合的 id 是谁也
   4. 抽象成一个函数，这个函数就叫做 find，
   5. 只需要看`find(p)`是否等于`find(q)`就好了。

4. 当你使用 find 函数进行操作的时候只需要`O(1)`的时间复杂度
   1. 直接取出 id 这个数组所对应的这个数据的 Index 相应值即可，
   2. 所以对于这种存储方式在并查集上进行 find 操作时是非常快速的，
   3. 这种并查集的方式通常称为 QuickFind，
   4. 也就是对于 find 这种操作运算速度是非常快的。

```js
// 并查集
//    0   1   2   3   4   5   6   7   8   9
//     -------------------------------------
// id  0   1   0   1   0   1   0   1   0   1
```

5. QuickFind 方式的并查集中实现 union

   1. 如果想要合并 1 和 4 这两个索引所对应的元素，也就是`union(1, 4)`，
   2. 1 所对应的集合的 id 是 1，4 所对应的集合的 id 是 0，
   3. 在这种情况下将 1 和 4 这两个元素合并以后，
   4. 其实 1 所属的那个集合和 4 所属的那个集合每一个元素相当于也连接了起来，
   5. 本来 1、3、5、7、9 它们是连接在一起的，0、2、4、6、8 它们是连接在一起的，
   6. 而 1 和 4 并没有连接起来，但是一旦你将 1 和 4 连接起来之后，
   7. 原本和 1 连接的其它元素以及原本和 4 连接的其它元素，
   8. 比如 5 和 2，它们其实也就都连接起来了，经过这样的操作之后，
   9. 所有的奇数所表示的元素和所有的偶数所表示的元素它们所对应的集合
   10. 的 id 值应该都会变成一样的，应该都是 0 或者都是 1，
   11. 具体取 0 还是取 1 都是无所谓的，只要他们的值是一样的就好了，
   12. 就会变成下图`union(1, 4)`后的并查集，
   13. 具体实现是对整个 id 数组进行一遍循环，
   14. 在循环的过程中将所有的 id 值等于 0 所对应的那个元素的 id 值都改写成 1，
   15. 正是因为如此 QuickFind 方式的并查集实现的 union 的时间复杂度是`O(n)`，
   16. 所以这个 union 操作需要改进，也就是创建一棵树，这棵树非常的奇怪，
   17. 是由孩子指向父亲的，而当前实现的这个并查集只是用数组模拟了一下而已。

```js
// 并查集
//     0   1   2   3   4   5   6   7   8   9
//     -------------------------------------
// id  0   1   0   1   0   1   0   1   0   1

// 并查集 union(1, 4)之后的并查集
//     0   1   2   3   4   5   6   7   8   9
//     -------------------------------------
// id  1   1   1   1   1   1   1   1   1   1
```

### 代码示例

1. MyUnionFindOne

```js
// 自定义并查集 UnionFind 第一个版本 QuickFind版

// isConnected 操作很快

class MyUnionFindOne {
  constructor(size) {
    // 存储数据所对应的集合的编号

    this.ids = new Array(size);

    // 模拟存入数据

    const len = this.ids.length;

    for (var i = 0; i < len; i++) this.ids[i] = i;
  }

  // 功能：将元素q和元素p这两个数据以及他们所在的集合进行合并

  // 时间复杂度：O(n)

  unionElements(q, p) {
    const qId = this.find(q);
    const pId = this.find(p);

    if (qId === pId) return;

    for (var i = 0; i < this.ids.length; i++)
      if (pId === this.ids[i]) this.ids[i] = qId;
  }

  // 功能：查询元素q和元素p这两个数据是否在同一个集合中

  // 时间复杂度：O(1)

  isConnected(q, p) {
    return this.ids[q] === this.ids[p];
  }

  // 查找元素所对应的集合编号

  find(index) {
    if (index < 0 || index >= this.ids.length)
      throw new Error("index is out of bound.");
    return this.ids[index];
  }

  // 功能：当前并查集一共考虑多少个元素

  getSize() {
    return this.ids.length;
  }
}
```

```js

## 并查集 简单实现 Quick Union

1. QuickFind 的方式实现的并查集查找速度非常快

1. 但是通常在标准情况下都是使用 QuickUnion 的方式实现并查集。

2. QuickUnion 的方式实现并查集思路

1. 将每一个元素，看作是一个节点，而节点之间相连接形成了一个树结构，
2. 这棵树和之前实现的所有的树都不一样，
3. 在并查集上实现的树结构是孩子指向父亲，
4. 例如节点 3 指向节点 2，那么节点 2 就是这棵树的根节点，
5. 虽然节点 2 是一个根节点，但是它也有一个指针，这个指针指向的是自己，
6. 在这种情况下如果节点 1 要和节点 3 进行一个合并，
7. 这个合并操作就是就是让节点 1 的指针指向节点 3 指向的这棵树的根节点，
8. 也就是让节点 1 去指向节点 2。
9. 如果又有一棵树 节点 7 和节点 6 都指向节点 5，节点 5 是这棵树的根节点，
10. 但是如果要节点 7 要和节点 2 做一下合并，
11. 其实就是就是让节点 7 所在的这棵树的根节点也就是节点 5 去指向节点 2，
12. 或者你是想让节点 7 和节点 3 进行一下合并，
13. 那么的得到的结果依然是这样的，因为实际的操作是让
14. 节点 7 所在的这棵树的根节点去指向节点 3 所在的这棵树的根节点，
15. 依然是节点 5 去指向节点 2，所以依然得到相同的结果，
16. 这就是实际实现并查集相应的思路。

```

// (5) (2)

// / \ | \

// / \ | \

// (6) (7) (3) (1)

```js

3. QuickUnion 的方式实现并查集非常的简单

1. 因为每一个节点本身只有一个指针，只会指向另外一个元素，
2. 并且这个指针的存储依然可以使用数组的方式来存储，
3. 这个数组就叫做 parent，
4. parent[i]就表示第 i 个元素所在的那个节点它指向了哪个元素，
5. 虽然说是指针，但是实际存储的时候依然使用一个 int 型的数组就够了，
6. 这样一来在初始化的时候`parent[i] = i`，
7. 也就是初始化的时候每一个节点都没有和其它的节点进行合并，
8. 所以在初始化的时候每一个节点都指向了自己，
9. 在这种情况下相当于 以 10 个元素为例，并查集整体就是下图这样子，
10. 每一个节点都是一个根节点，它们都指向自己。
11. 严格的来说这个并查集不是一棵树结构，而是一个森林，
12. 所谓的森林就是说里面有很多的树，在初始的情况下，
13. 这个森林中就有 10 棵树，每棵树都只有一个节点，
14. 如果进行`union(4, 3)`操作，
15. 那么直接让节点 4 的的指针去指向节点 3 就好了，
16. 这样的一个操作在数组中表示出来就是`parent[4] = 3`，
17. 那么节点 4 它指向了节点 3，如果在进行`union(3, 8)`操作，
18. 那么就让节点 3 的指针指向的那个元素指向节点 8，
19. 那么在数组中`parent[3] = 8`，再进行`union(6, 5)`操作，
20. 那么就让节点 6 的指针指向的那个元素指向节点 5，
21. 也就是`parent[6] = 5`，再进行`union(9, 4)`操作，
22. 那么就让节点 9 的指针指向指向节点 4 这棵树的根节点，
23. 那么在这里就有一个查询操作了，
24. 那么就要看一下 4 这个节点所在的根节点是谁，
25. 这个查询过程就是 节点 4 指向了节点 3，节点 3 又指向了节点 8，
26. 而节点 8 自己指向了节点 8 也就是指向了自己，说明 8 是一个根节点，
27. 那么下面要做的事情就是让 9 这个节点指向节点 8 就好了
28. 也就是`parent[9] = 8`，之所以不让节点 9 指向节点 4，
29. 因为那样的话就会形成一个链表，那么树整体的优势就体现不出来，
30. 当你的节点 9 指向节点 8，下次你查询节点 9 的根节点只需要进行一步查询，
31. 所以才让`parent[9] = 8`，再进行`union(2, 1)`操作，
32. 直接让节点 2 指向节点 1 就好了，`parent[2] = 1`，
33. 再进行`union(5, 0)`操作，直接让节点 5 指向节点 0 就好了，
34. `parent[5] = 0`，再进行`union(7, 2)`操作，
35. 由于节点 2 指向节点 1，那么节点 7 就要指向节点 1，
36. `parent[7] = 1`。
37. 接下来进行一个稍微复杂一点的操作，进行`union(6, 2)`操作，
38. 由于节点 6 指向节点 5，而节点 5 指向节点 0，2 指向节点 1，
39. 那么就是让节点 0 指向节点 1 了，所以`parent[0] = 1`。
40. 这样的一种实现就是并查集通常真正的实现方式。

```

// 0 1 2 3 4 5 6 7 8 9

// -------------------------------------

// parent 0 1 2 3 4 5 6 7 8 9

//

// Quick Union

// (0) (1) (2) (3) (4) (5) (6) (7) (8) (9)

//

// 一通如下操作

// union(4, 3); // 4->3

// 0 1 2 3 4 5 6 7 8 9

// -------------------------------------

// 0 1 2 3 3 5 6 7 8 9

//

// union(3, 8); // 3->8

// 0 1 2 3 4 5 6 7 8 9

// -------------------------------------

// 0 1 2 8 3 5 6 7 8 9

//

// union(6, 5); // 6->5

// 0 1 2 3 4 5 6 7 8 9

// -------------------------------------

// 0 1 2 8 3 5 5 7 8 9

//

// union(9, 4); // 4->3 3->8 所以 9->8

// 0 1 2 3 4 5 6 7 8 9

// -------------------------------------

// 0 1 2 8 3 5 5 7 8 8

//

// union(2, 1); // 2->1

// 0 1 2 3 4 5 6 7 8 9

// -------------------------------------

// 0 1 1 8 3 5 5 7 8 8

//

// union(5, 0); // 5->0

// 0 1 2 3 4 5 6 7 8 9

// -------------------------------------

// 0 1 1 8 3 0 5 7 8 8

//

// union(7, 2); // 2->1 所以 7->1

// 0 1 2 3 4 5 6 7 8 9

// -------------------------------------

// 0 1 1 8 3 0 5 1 8 8

//

// union(6, 2); // 6->5 5->0,2->1 所以 0->1

// 0 1 2 3 4 5 6 7 8 9

// -------------------------------------

// 1 1 1 8 3 0 5 1 8 8

```js

4. QuickUnion 的方式实现并查集中的 union 操作的时间复杂度是`O(h)`

1. 这个 h 是当前 union 的这两个元素它所在的树相应的深度大小，
2. 这个深度的大小在通常的情况下都比元素的个数 n 要小，
3. 所以 union 的这个过程相对之前要快一些，
4. 不过相应的代价就是 查询的过程相应的时间复杂度依然是树的深度大小，
5. 所以就稍微牺牲了一些查询时相应的性能，
6. 不过由于在通常情况下这棵树的高度是远远小于数据总量 n 的，
7. 所以要让合并和查询这两个操作都是树的高度这个时间复杂度，
8. 相应的在大多数运用中这个性能是可以接受的，
9. 当然目前实现的并查集还是有很大的优化空间的。
```

5. 这个版本的并查集虽然是使用数组来进行存储的

1. 但是它实际上是一种非常奇怪的树，这种树是由孩子指向父亲的。

### 代码示例

1. MyUnionFindTwo

```js
// 自定义并查集 UnionFind 第二个版本 QuickUnion 版

// Union 操作变快了

// 还可以更快的
class MyUnionFindTwo {
  constructor(size) {
    // 存储当前节点所指向的父节点
    this.forest = new Array(size);
    // 在初始的时候每一个节点都指向它自己

    // 也就是每一个节点都是独立的一棵树
    const len = this.forest.length;
    for (var i = 0; i < len; i++) {
      this.forest[i] = i;
    }
  }
  // 功能：将元素q和元素p这两个数据以及他们所在的集合进行合并

  // 时间复杂度：O(h) h 为树的高度

  unionElements(treePrimary, treeSecondary) {
    const primaryRoot = this.find(treePrimary);

    const secondarRoot = this.find(treeSecondary);

    if (primaryRoot === secondarRoot) return;

    // 无论哪棵树往那棵树上进行合并 都一样，他们都是树

    // 这里是主树节点上往次树节点进行合并

    this.forest[primaryRoot] = this.forest[secondarRoot];
  }

  // 功能：查询元素q和元素p这两个数据是否在同一个集合中

  // 时间复杂度：O(h) h 为树的高度

  isConnected(treeQ, treeP) {
    return this.find(treeQ) === this.find(treeP);
  }

  // 查找元素所对应的集合编号

  find(id) {
    if (id < 0 || id >= this.ids.length)
      throw new Error("index is out of bound.");

    // 不断的去查查找当前节点的根节点

    // 根节点的索引是指向自己，如果根节点为 1 那么对应的索引也为 1。

    while (id !== this.forest[id]) id = this.forest[id];

    return id;
  }

  // 功能：当前并查集一共考虑多少个元素

  getSize() {
    return this.ids.length;
  }
}
```

## 并查集 Quick Union 基于 Size 的优化

1. 两版并查集的比较
1. 第二版的 QuickUnion 方式的并查集和
1. 第一版 QuickFind 方式的并查集在思路上有非常大的不同，
1. 第一版的并查集实际上就是使用数组来模拟每个数据所属的集合是谁，
1. 第二版的并查集虽然也是使用数组进行数据关系的存储，
1. 但整体思路上和第一版的并查集是截然不同的，
1. 因为让数据形成了一棵比较奇怪的树结构，更准确的说是森林结构，
1. 在这个森林中每一棵树相应的节点之间的关系都是孩子指向父亲的，
1. 这样一来可以通过任意的节点非常容易的查询到这棵树相应的根节点是谁，
1. 那么相应的就知道了对于每一个节点来说它所属的集合编号是谁。
1. 两个版本的并查集的性能
1. 第一个版本的并查集 QuickFind，
1. isConnected：判断两个集合是否连接 对应时间复杂度是`O(1)`级别的，
1. union：将两个集合进行合并 对应时间复杂度是`O(n)`级别的。
1. 第二个版本的并查集 QuickUnion，
1. isConnected：判断两个集合是否连接 对应时间复杂度是`O(h)`级别的，
1. union：将两个集合进行合并 对应时间复杂度是`O(h)`级别的。
1. 在测试算法性能时候
1. 很多时候实际测试的结果不仅仅和算法有关，
1. 也和你使用的语言具体执行的时候底层运行的机制相关，
1. 第一个版本的并查集 整体就是使用的一个数组，
1. 合并的操作就是对一片连续的空间进行一次循环的操作，
1. 比方说这样的操作在 一些强类型的 语言的底层会有非常好的优化，
1. 所以运行速度会非常快。
1. 而第二个版本的并查集 查询的过程其实是不断索引的过程，
1. 它不是顺次的不断访问一片连续的空间，它要在不同的地址之间进行跳转，
1. 因此它的速度就会相对的慢一些，
1. 而且在第二个版本的并查集中 find 的复杂度是`O(h)`级别的，
1. 无论是 isConnected 还是 union 都需要进行调用，
1. 也就是说在第二个版本的并查集中的 isConnected 时间复杂度要比
1. 第一个版本的并查集的 isConnected 时间复杂度要高的，
1. 也就是更加的慢一些。
1. 在第二个并查集中，
1. 当你 union 的次数变得很大的时候，实际上就是将更多的元素组合在了一个集合中，
1. 所以你得到的那棵树非常的大，可能还是一个退化的超长链表，
1. 那么它相应的深度可能就会非常的高，
1. 这就会使得 isConnected 的操作时的消耗也会非常的高，
1. 所以可能会让第二个版本的并查集明明是`O(h)`级别的复杂度还比
1. 第一个版本的并查集的`O(n)`级别的复杂度还要慢一些，
1. 所以第二个版本的并查集还是有很大的优化空间的。
1. 优化第二个版本的并查集
1. 这个优化空间主要在于，在进行 union 操作的时候，
1. 就直接将 q 这个元素的根节点直接去指向了 p 这个元素的根节点，
1. 但是没有充分的考虑 q 和 p 这两个元素它所在的那两棵树的特点是怎样的，
1. 如果不对要合并的那两个元素所在的树的形状不去做判断，
1. 很多时候这个合并的过程会不断的增加树的高度，
1. 甚至在一些极端的情况下得到的这棵树是一条链表的样子。
1. 简单的解决方案：考虑 size
1. 去考虑当前这棵树它整体有多少个节点，
1. 也就是让节点少的那棵树去指向节点多的那棵树，
1. 这样就高概率的让形成的那棵树它的深度相对的会比较低，
1. 这个优化的思路其实是非常简单的。
1. 而且肯定不会退化为一个链表，
1. 因为可以保证最后形成的那棵树相对是比较浅的，
1. 对于`O(h)`的时间复杂度来说，h 越小它的时间复杂就会越小，
1. 这样的简单优化让性能有了巨大的提升。
1. 但是还可以继续进行优化。

### 代码示例

1. `(class: MyUnionFindOne, class: MyUnionFindTwo, class: MyUnionFindThree, class: PerformanceTest, class: Main)`

2. MyUnionFindOne

```js
// 自定义并查集 UnionFind 第一个版本 QuickFind 版

// isConnected 操作很快

class MyUnionFindOne {
  constructor(size) {
    // 存储数据所对应的集合的编号

    this.ids = new Array(size);

    // 模拟存入数据

    const len = this.ids.length;

    for (var i = 0; i < len; i++) this.ids[i] = i;
  }

  // 功能：将元素q和元素p这两个数据以及他们所在的集合进行合并

  // 时间复杂度：O(n)

  unionElements(q, p) {
    const qId = this.find(q);

    const pId = this.find(p);

    if (qId === pId) return;

    for (var i = 0; i < this.ids.length; i++)
      if (pId === this.ids[i]) this.ids[i] = qId;
  }

  // 功能：查询元素q和元素p这两个数据是否在同一个集合中

  // 时间复杂度：O(1)

  isConnected(q, p) {
    return this.ids[q] === this.ids[p];
  }

  // 查找元素所对应的集合编号

  find(index) {
    if (index < 0 || index >= this.ids.length)
      throw new Error("index is out of bound.");

    return this.ids[index];
  }

  // 功能：当前并查集一共考虑多少个元素

  getSize() {
    return this.ids.length;
  }
}
```

3. MyUnionFindTwo

```js
// 自定义并查集 UnionFind 第二个版本 QuickUnion 版

// Union 操作变快了

// 还可以更快的

class MyUnionFindTwo {
  constructor(size) {
    // 存储当前节点所指向的父节点

    this.forest = new Array(size);

    // 在初始的时候每一个节点都指向它自己

    // 也就是每一个节点都是独立的一棵树

    const len = this.forest.length;

    for (var i = 0; i < len; i++) this.forest[i] = i;
  }

  // 功能：将元素q和元素p这两个数据以及他们所在的集合进行合并

  // 时间复杂度：O(h) h 为树的高度

  unionElements(treePrimary, treeSecondary) {
    const primaryRoot = this.find(treePrimary);

    const secondarRoot = this.find(treeSecondary);

    if (primaryRoot === secondarRoot) return;

    // 无论哪棵树往那棵树上进行合并 都一样，他们都是树

    // 这里是主树节点上往次树节点进行合并

    this.forest[primaryRoot] = this.forest[secondarRoot];
  }

  // 功能：查询元素q和元素p这两个数据是否在同一个集合中

  // 时间复杂度：O(h) h 为树的高度

  isConnected(treeQ, treeP) {
    return this.find(treeQ) === this.find(treeP);
  }

  // 查找元素所对应的集合编号

  find(id) {
    if (id < 0 || id >= this.forest.length)
      throw new Error("index is out of bound.");

    // 不断的去查查找当前节点的根节点

    // 根节点的索引是指向自己，如果根节点为 1 那么对应的索引也为 1。

    while (id !== this.forest[id]) id = this.forest[id];

    return id;
  }

  // 功能：当前并查集一共考虑多少个元素

  getSize() {
    return this.forest.length;
  }
}
```

4. MyUnionFindThree

// 自定义并查集 UnionFind 第三个版本 QuickUnion 优化版
// Union 操作变快了
// 还可以更快的
// 解决方案：考虑 size 也就是某一棵树从根节点开始一共有多少个节点
// 原理：节点少的向节点多的树进行融合
// 还可以更快的

```js
class MyUnionFindThree {
  constructor(size) {
    // 存储当前节点所指向的父节点

    this.forest = new Array(size);

    // 以以某个节点为根的所有子节点的个数

    this.branch = new Array(size);

    // 在初始的时候每一个节点都指向它自己

    // 也就是每一个节点都是独立的一棵树

    const len = this.forest.length;

    for (var i = 0; i < len; i++) {
      this.forest[i] = i;

      this.branch[i] = 1; // 默认节点个数为1
    }
  }

  // 功能：将元素q和元素p这两个数据以及他们所在的集合进行合并

  // 时间复杂度：O(h) h 为树的高度

  unionElements(treePrimary, treeSecondary) {
    const primaryRoot = this.find(treePrimary);

    const secondarRoot = this.find(treeSecondary);

    if (primaryRoot === secondarRoot) return;

    // 节点少的 树 往 节点多的树 进行合并，在一定程度上减少最终树的高度

    if (this.branch[primaryRoot] < this.branch[secondarRoot]) {
      // 主树节点上往次树节点进行合并

      this.forest[primaryRoot] = this.forest[secondarRoot];

      // 次树的节点个数 += 主树的节点个数

      this.branch[secondarRoot] += this.branch[primaryRoot];
    } else {
      // branch[primaryRoot] >= branch[secondarRoot]

      // 次树节点上往主树节点进行合并

      this.forest[secondarRoot] = this.forest[primaryRoot];

      // 主树的节点个数 += 次树的节点个数

      this.branch[primaryRoot] += this.branch[secondarRoot];
    }
  }

  // 功能：查询元素q和元素p这两个数据是否在同一个集合中

  // 时间复杂度：O(h) h 为树的高度

  isConnected(treeQ, treeP) {
    return this.find(treeQ) === this.find(treeP);
  }

  // 查找元素所对应的集合编号

  find(id) {
    if (id < 0 || id >= this.forest.length)
      throw new Error("index is out of bound.");

    // 不断的去查查找当前节点的根节点

    // 根节点的索引是指向自己，如果根节点为 1 那么对应的索引也为 1。

    while (id !== this.forest[id]) id = this.forest[id];

    return id;
  }

  // 功能：当前并查集一共考虑多少个元素

  getSize() {
    return this.forest.length;
  }
}
```

5. PerformanceTest

```js
// 性能测试
class PerformanceTest {
  constructor() {}

  // 对比队列

  testQueue(queue, openCount) {
    let startTime = Date.now();

    let random = Math.random;

    for (var i = 0; i < openCount; i++) {
      queue.enqueue(random() * openCount);
    }

    while (!queue.isEmpty()) {
      queue.dequeue();
    }

    let endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }

  // 对比栈

  testStack(stack, openCount) {
    let startTime = Date.now();

    let random = Math.random;

    for (var i = 0; i < openCount; i++) {
      stack.push(random() * openCount);
    }

    while (!stack.isEmpty()) {
      stack.pop();
    }

    let endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }

  // 对比集合

  testSet(set, openCount) {
    let startTime = Date.now();

    let random = Math.random;

    let arr = [];

    let temp = null;

    // 第一遍测试

    for (var i = 0; i < openCount; i++) {
      temp = random();

      // 添加重复元素，从而测试集合去重的能力

      set.add(temp * openCount);

      set.add(temp * openCount);

      arr.push(temp * openCount);
    }

    for (var i = 0; i < openCount; i++) {
      set.remove(arr[i]);
    }

    // 第二遍测试

    for (var i = 0; i < openCount; i++) {
      set.add(arr[i]);

      set.add(arr[i]);
    }

    while (!set.isEmpty()) {
      set.remove(arr[set.getSize() - 1]);
    }

    let endTime = Date.now();

    // 求出两次测试的平均时间

    let avgTime = Math.ceil((endTime - startTime) / 2);

    return this.calcTime(avgTime);
  }

  // 对比映射

  testMap(map, openCount) {
    let startTime = Date.now();

    let array = new MyArray();

    let random = Math.random;

    let temp = null;

    let result = null;

    for (var i = 0; i < openCount; i++) {
      temp = random();

      result = openCount * temp;

      array.add(result);

      array.add(result);

      array.add(result);

      array.add(result);
    }

    for (var i = 0; i < array.getSize(); i++) {
      result = array.get(i);

      if (map.contains(result)) map.add(result, map.get(result) + 1);
      else map.add(result, 1);
    }

    for (var i = 0; i < array.getSize(); i++) {
      result = array.get(i);

      map.remove(result);
    }

    let endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }

  // 对比堆 主要对比 使用heapify 与 不使用heapify时的性能

  testHeap(heap, array, isHeapify) {
    const startTime = Date.now();

    // 是否支持 heapify

    if (isHeapify) heap.heapify(array);
    else {
      for (const element of array) heap.add(element);
    }

    console.log("heap size:" + heap.size() + "\r\n");

    document.body.innerHTML += "heap size:" + heap.size() + "<br /><br />";

    // 使用数组取值

    let arr = new Array(heap.size());

    for (let i = 0; i < arr.length; i++) arr[i] = heap.extractMax();

    console.log(
      "Array size:" + arr.length + "，heap size:" + heap.size() + "\r\n"
    );

    document.body.innerHTML +=
      "Array size:" +
      arr.length +
      "，heap size:" +
      heap.size() +
      "<br /><br />";

    // 检验一下是否符合要求

    for (let i = 1; i < arr.length; i++)
      if (arr[i - 1] < arr[i]) throw new Error("error.");

    console.log("test heap completed." + "\r\n");

    document.body.innerHTML += "test heap completed." + "<br /><br />";

    const endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }

  // 对比并查集

  testUnionFind(unionFind, openCount, primaryArray, secondaryArray) {
    const size = unionFind.getSize();

    const random = Math.random;

    return this.testCustomFn(function() {
      // 合并操作

      for (var i = 0; i < openCount; i++) {
        let primaryId = primaryArray[i];

        let secondaryId = secondaryArray[i];

        unionFind.unionElements(primaryId, secondaryId);
      }

      // 查询连接操作

      for (var i = 0; i < openCount; i++) {
        let primaryRandomId = Math.floor(random() * size);

        let secondaryRandomId = Math.floor(random() * size);

        unionFind.unionElements(primaryRandomId, secondaryRandomId);
      }
    });
  }

  // 计算运行的时间，转换为 天-小时-分钟-秒-毫秒

  calcTime(result) {
    //获取距离的天数

    var day = Math.floor(result / (24 * 60 * 60 * 1000));

    //获取距离的小时数

    var hours = Math.floor((result / (60 * 60 * 1000)) % 24);

    //获取距离的分钟数

    var minutes = Math.floor((result / (60 * 1000)) % 60);

    //获取距离的秒数

    var seconds = Math.floor((result / 1000) % 60);

    //获取距离的毫秒数

    var milliSeconds = Math.floor(result % 1000);

    // 计算时间

    day = day < 10 ? "0" + day : day;

    hours = hours < 10 ? "0" + hours : hours;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    milliSeconds =
      milliSeconds < 100
        ? milliSeconds < 10
          ? "00" + milliSeconds
          : "0" + milliSeconds
        : milliSeconds;

    // 输出耗时字符串

    result =
      day +
      "天" +
      hours +
      "小时" +
      minutes +
      "分" +
      seconds +
      "秒" +
      milliSeconds +
      "毫秒" +
      "  <<<<============>>>>  总毫秒数：" +
      result;

    return result;
  }

  // 自定义对比

  testCustomFn(fn) {
    let startTime = Date.now();

    fn();

    let endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }
}
```

6. Main

```js
// main 函数

class Main {
  constructor() {
    this.alterLine("UnionFind Comparison Area");

    // 十万级别

    const size = 100000; // 并查集维护节点数

    const openCount = 100000; // 操作数

    // 生成同一份测试数据的辅助代码

    const random = Math.random;

    const primaryArray = new Array(openCount);

    const secondaryArray = new Array(openCount);

    // 生成同一份测试数据

    for (var i = 0; i < openCount; i++) {
      primaryArray[i] = Math.floor(random() * size);

      secondaryArray[i] = Math.floor(random() * size);
    }

    // 开始测试

    const myUnionFindOne = new MyUnionFindOne(size);

    const myUnionFindTwo = new MyUnionFindTwo(size);

    const myUnionFindThree = new MyUnionFindThree(size);

    const performanceTest = new PerformanceTest();

    // 测试后获取测试信息

    const myUnionFindOneInfo = performanceTest.testUnionFind(
      myUnionFindOne,

      openCount,

      primaryArray,

      secondaryArray
    );

    const myUnionFindTwoInfo = performanceTest.testUnionFind(
      myUnionFindTwo,

      openCount,

      primaryArray,

      secondaryArray
    );

    const myUnionFindThreeInfo = performanceTest.testUnionFind(
      myUnionFindThree,

      openCount,

      primaryArray,

      secondaryArray
    );

    // 总毫秒数：24143

    console.log(
      "MyUnionFindOne time：" + myUnionFindOneInfo,

      myUnionFindOne
    );

    this.show("MyUnionFindOne time：" + myUnionFindOneInfo);

    // 总毫秒数：32050

    console.log(
      "MyUnionFindTwo time：" + myUnionFindTwoInfo,

      myUnionFindTwo
    );

    this.show("MyUnionFindTwo time：" + myUnionFindTwoInfo);

    // 总毫秒数：69

    console.log(
      "MyUnionFindThree time：" + myUnionFindThreeInfo,

      myUnionFindThree
    );

    this.show("MyUnionFindThree time：" + myUnionFindThreeInfo);
  }

  // 将内容显示在页面上

  show(content) {
    document.body.innerHTML += `${content}<br /><br />`;
  }

  // 展示分割线

  alterLine(title) {
    let line = `--------------------${title}----------------------`;

    console.log(line);

    document.body.innerHTML += `${line}<br /><br />`;
  }
}

// 页面加载完毕

window.onload = function() {
  // 执行主函数

  new Main();
};
```

## 并查集 Quick Union 基于 Rank 的优化

1. 这个 rank 就是指树的高度或树的深度
1. 之所以不叫做 height 和 depth，
1. 是因为进行路径压缩的时候并不会维护这个 rank 了，
1. rank 只在 union 中进行维护，
1. 这个 rank 准确的来说只是一个粗略的排名或者序而已，
1. 并不是很准确的存储了树的高度或深度。
1. rank 的优化是基于 size 优化的基础上进行的
1. 最好的优化方式是记录每一个节点的根节点的最大深度是多少，
1. 这样才能够在合并的时候，
1. 让深度比较低的那棵树向深度比较高的那棵树进行合并，
1. 这样整体更加的合理，这样的一种优化方案就称之为 rank 的优化，
1. 这个 rank 依然可以使用一个数组来进行记录，
1. 其中`rank[i]`表示根节点为 i 的树的高度是多少。
1. rank 的优化性能其实和 size 优化的性能差不了多少
1. 但是当数据量达到千万这个程度的时候，
1. 就会有一点差距了，差距也不是有点大，就一两秒左右。
1. 所以还是有优化空间的。

### 代码示例

1. `(class: MyUnionFindThree, class: MyUnionFindFour, class: PerformanceTest, class: Main)`

2. MyUnionFindThree

```js
// 自定义并查集 UnionFind 第三个版本 QuickUnion 优化版

// Union 操作变快了

// 还可以更快的

// 解决方案：考虑 size 也就是某一棵树从根节点开始一共有多少个节点

// 原理：节点少的向节点多的树进行融合

// 还可以更快的
class MyUnionFindThree {
  constructor(size) {
    // 存储当前节点所指向的父节点

    this.forest = new Array(size);

    // 以以某个节点为根的所有子节点的个数

    this.branch = new Array(size);

    // 在初始的时候每一个节点都指向它自己

    // 也就是每一个节点都是独立的一棵树

    const len = this.forest.length;

    for (var i = 0; i < len; i++) {
      this.forest[i] = i;

      this.branch[i] = 1; // 默认节点个数为1
    }
  }

  // 功能：将元素q和元素p这两个数据以及他们所在的集合进行合并

  // 时间复杂度：O(h) h 为树的高度

  unionElements(treePrimary, treeSecondary) {
    const primaryRoot = this.find(treePrimary);

    const secondarRoot = this.find(treeSecondary);

    if (primaryRoot === secondarRoot) return;

    // 节点少的 树 往 节点多的树 进行合并，在一定程度上减少最终树的高度

    if (this.branch[primaryRoot] < this.branch[secondarRoot]) {
      // 主树节点上往次树节点进行合并

      this.forest[primaryRoot] = this.forest[secondarRoot];

      // 次树的节点个数 += 主树的节点个数

      this.branch[secondarRoot] += this.branch[primaryRoot];
    } else {
      // branch[primaryRoot] >= branch[secondarRoot]

      // 次树节点上往主树节点进行合并

      this.forest[secondarRoot] = this.forest[primaryRoot];

      // 主树的节点个数 += 次树的节点个数

      this.branch[primaryRoot] += this.branch[secondarRoot];
    }
  }

  // 功能：查询元素q和元素p这两个数据是否在同一个集合中

  // 时间复杂度：O(h) h 为树的高度

  isConnected(treeQ, treeP) {
    return this.find(treeQ) === this.find(treeP);
  }

  // 查找元素所对应的集合编号

  find(id) {
    if (id < 0 || id >= this.forest.length)
      throw new Error("index is out of bound.");

    // 不断的去查查找当前节点的根节点

    // 根节点的索引是指向自己，如果根节点为 1 那么对应的索引也为 1。

    while (id !== this.forest[id]) id = this.forest[id];

    return id;
  }

  // 功能：当前并查集一共考虑多少个元素

  getSize() {
    return this.forest.length;
  }
}
```

3. MyUnionFindFour

```js
// 自定义并查集 UnionFind 第四个版本 QuickUnion 优化版

// Union 操作变快了

// 还可以更快的

// 解决方案：考虑 rank 也就是某一棵树从根节点开始计算最大深度是多少

// 原理：让深度比较低的那棵树向深度比较高的那棵树进行合并

// 还可以更快的

class MyUnionFindFour {
  constructor(size) {
    // 存储当前节点所指向的父节点

    this.forest = new Array(size);

    // 记录某个节点为根的树的最大高度或深度

    this.rank = new Array(size);

    // 在初始的时候每一个节点都指向它自己

    // 也就是每一个节点都是独立的一棵树

    const len = this.forest.length;

    for (var i = 0; i < len; i++) {
      this.forest[i] = i;

      this.rank[i] = 1; // 默认深度为1
    }
  }

  // 功能：将元素q和元素p这两个数据以及他们所在的集合进行合并

  // 时间复杂度：O(h) h 为树的高度

  unionElements(treePrimary, treeSecondary) {
    const primaryRoot = this.find(treePrimary);

    const secondarRoot = this.find(treeSecondary);

    if (primaryRoot === secondarRoot) return;

    // 根据两个元素所在树的rank不同判断合并方向

    // 将rank低的集合合并到rank高的集合上

    if (this.rank[primaryRoot] < this.rank[secondarRoot]) {
      // 主树节点上往次树节点进行合并

      this.forest[primaryRoot] = this.forest[secondarRoot];
    } else if (this.rank[primaryRoot] > this.rank[secondarRoot]) {
      // 次树节点上往主树节点进行合并

      this.forest[secondarRoot] = this.forest[primaryRoot];
    } else {
      // rank[primaryRoot] == rank[secondarRoot]

      // 如果元素个数一样的根节点，那谁指向谁都无所谓

      // 本质都是一样的

      // primaryRoot合并到secondarRoot上了，qRoot的高度就会增加1

      this.forest[primaryRoot] = this.forest[secondarRoot];

      this.rank[secondarRoot] += 1;
    }
  }

  // 功能：查询元素q和元素p这两个数据是否在同一个集合中

  // 时间复杂度：O(h) h 为树的高度

  isConnected(treeQ, treeP) {
    return this.find(treeQ) === this.find(treeP);
  }

  // 查找元素所对应的集合编号

  find(id) {
    if (id < 0 || id >= this.forest.length)
      throw new Error("index is out of bound.");

    // 不断的去查查找当前节点的根节点

    // 根节点的索引是指向自己，如果根节点为 1 那么对应的索引也为 1。

    while (id !== this.forest[id]) id = this.forest[id];

    return id;
  }

  // 功能：当前并查集一共考虑多少个元素

  getSize() {
    return this.forest.length;
  }
}
```

4. PerformanceTest

```js
// 性能测试

class PerformanceTest {
  constructor() {}

  // 对比队列

  testQueue(queue, openCount) {
    let startTime = Date.now();

    let random = Math.random;

    for (var i = 0; i < openCount; i++) {
      queue.enqueue(random() * openCount);
    }

    while (!queue.isEmpty()) {
      queue.dequeue();
    }

    let endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }

  // 对比栈

  testStack(stack, openCount) {
    let startTime = Date.now();

    let random = Math.random;

    for (var i = 0; i < openCount; i++) {
      stack.push(random() * openCount);
    }

    while (!stack.isEmpty()) {
      stack.pop();
    }

    let endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }

  // 对比集合

  testSet(set, openCount) {
    let startTime = Date.now();

    let random = Math.random;

    let arr = [];

    let temp = null;

    // 第一遍测试

    for (var i = 0; i < openCount; i++) {
      temp = random();

      // 添加重复元素，从而测试集合去重的能力

      set.add(temp * openCount);

      set.add(temp * openCount);

      arr.push(temp * openCount);
    }

    for (var i = 0; i < openCount; i++) {
      set.remove(arr[i]);
    }

    // 第二遍测试

    for (var i = 0; i < openCount; i++) {
      set.add(arr[i]);

      set.add(arr[i]);
    }

    while (!set.isEmpty()) {
      set.remove(arr[set.getSize() - 1]);
    }

    let endTime = Date.now();

    // 求出两次测试的平均时间

    let avgTime = Math.ceil((endTime - startTime) / 2);

    return this.calcTime(avgTime);
  }

  // 对比映射

  testMap(map, openCount) {
    let startTime = Date.now();

    let array = new MyArray();

    let random = Math.random;

    let temp = null;

    let result = null;

    for (var i = 0; i < openCount; i++) {
      temp = random();

      result = openCount * temp;

      array.add(result);

      array.add(result);

      array.add(result);

      array.add(result);
    }

    for (var i = 0; i < array.getSize(); i++) {
      result = array.get(i);

      if (map.contains(result)) map.add(result, map.get(result) + 1);
      else map.add(result, 1);
    }

    for (var i = 0; i < array.getSize(); i++) {
      result = array.get(i);

      map.remove(result);
    }

    let endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }

  // 对比堆 主要对比 使用heapify 与 不使用heapify时的性能

  testHeap(heap, array, isHeapify) {
    const startTime = Date.now();

    // 是否支持 heapify

    if (isHeapify) heap.heapify(array);
    else {
      for (const element of array) heap.add(element);
    }

    console.log("heap size:" + heap.size() + "\r\n");

    document.body.innerHTML += "heap size:" + heap.size() + "<br /><br />";

    // 使用数组取值

    let arr = new Array(heap.size());

    for (let i = 0; i < arr.length; i++) arr[i] = heap.extractMax();

    console.log(
      "Array size:" + arr.length + "，heap size:" + heap.size() + "\r\n"
    );

    document.body.innerHTML +=
      "Array size:" +
      arr.length +
      "，heap size:" +
      heap.size() +
      "<br /><br />";

    // 检验一下是否符合要求

    for (let i = 1; i < arr.length; i++)
      if (arr[i - 1] < arr[i]) throw new Error("error.");

    console.log("test heap completed." + "\r\n");

    document.body.innerHTML += "test heap completed." + "<br /><br />";

    const endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }

  // 对比并查集

  testUnionFind(unionFind, openCount, primaryArray, secondaryArray) {
    const size = unionFind.getSize();

    const random = Math.random;

    return this.testCustomFn(function() {
      // 合并操作

      for (var i = 0; i < openCount; i++) {
        let primaryId = primaryArray[i];

        let secondaryId = secondaryArray[i];

        unionFind.unionElements(primaryId, secondaryId);
      }

      // 查询连接操作

      for (var i = 0; i < openCount; i++) {
        let primaryRandomId = Math.floor(random() * size);

        let secondaryRandomId = Math.floor(random() * size);

        unionFind.unionElements(primaryRandomId, secondaryRandomId);
      }
    });
  }

  // 计算运行的时间，转换为 天-小时-分钟-秒-毫秒

  calcTime(result) {
    //获取距离的天数

    var day = Math.floor(result / (24 * 60 * 60 * 1000));

    //获取距离的小时数

    var hours = Math.floor((result / (60 * 60 * 1000)) % 24);

    //获取距离的分钟数

    var minutes = Math.floor((result / (60 * 1000)) % 60);

    //获取距离的秒数

    var seconds = Math.floor((result / 1000) % 60);

    //获取距离的毫秒数

    var milliSeconds = Math.floor(result % 1000);

    // 计算时间

    day = day < 10 ? "0" + day : day;

    hours = hours < 10 ? "0" + hours : hours;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    milliSeconds =
      milliSeconds < 100
        ? milliSeconds < 10
          ? "00" + milliSeconds
          : "0" + milliSeconds
        : milliSeconds;

    // 输出耗时字符串

    result =
      day +
      "天" +
      hours +
      "小时" +
      minutes +
      "分" +
      seconds +
      "秒" +
      milliSeconds +
      "毫秒" +
      "  <<<<============>>>>  总毫秒数：" +
      result;

    return result;
  }

  // 自定义对比

  testCustomFn(fn) {
    let startTime = Date.now();

    fn();

    let endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }
}
```

5. Main

```js
// main 函数

class Main {
  constructor() {
    this.alterLine("UnionFind Comparison Area");

    // 千万级别

    const size = 10000000; // 并查集维护节点数

    const openCount = 10000000; // 操作数

    // 生成同一份测试数据的辅助代码

    const random = Math.random;

    const primaryArray = new Array(openCount);

    const secondaryArray = new Array(openCount);

    // 生成同一份测试数据

    for (var i = 0; i < openCount; i++) {
      primaryArray[i] = Math.floor(random() * size);

      secondaryArray[i] = Math.floor(random() * size);
    }

    // 开始测试

    const myUnionFindThree = new MyUnionFindThree(size);

    const myUnionFindFour = new MyUnionFindFour(size);

    const performanceTest = new PerformanceTest();

    // 测试后获取测试信息

    const myUnionFindThreeInfo = performanceTest.testUnionFind(
      myUnionFindThree,

      openCount,

      primaryArray,

      secondaryArray
    );

    const myUnionFindFourInfo = performanceTest.testUnionFind(
      myUnionFindFour,

      openCount,

      primaryArray,

      secondaryArray
    );

    // 总毫秒数：8042

    console.log(
      "MyUnionFindThree time：" + myUnionFindThreeInfo,

      myUnionFindThree
    );

    this.show("MyUnionFindThree time：" + myUnionFindThreeInfo);

    // 总毫秒数：7463

    console.log(
      "MyUnionFindFour time：" + myUnionFindFourInfo,

      myUnionFindFour
    );

    this.show("MyUnionFindFour time：" + myUnionFindFourInfo);
  }

  // 将内容显示在页面上

  show(content) {
    document.body.innerHTML += `${content}<br /><br />`;
  }

  // 展示分割线

  alterLine(title) {
    let line = `--------------------${title}----------------------`;

    console.log(line);

    document.body.innerHTML += `${line}<br /><br />`;
  }
}

// 页面加载完毕

window.onload = function() {
  // 执行主函数

  new Main();
};
```

相关资源：[并*查集*以及各种操作](https://download.csdn.net/download/zlhy_/4890518?spm=1001.2101.3001.5697)
