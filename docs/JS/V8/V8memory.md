## 初步了解V8内存管理

### 前言

本文搬运和总结了关于V8内存管理的多方面知识，但V8的内存管理是一项非常核心并且复杂的工程，其中多处细节仍然需要深入进行学习和研究。欢迎大佬们指正文章中不全面或不准确的地方~

### 内存管理基础

内存管理是控制和协调软件获取计算机内存的过程，这里的内存一般指的是RAM（随机存取存储器）

> 所谓“随机存取”，指的是当存储器中的信息被读取或写入时，所需要的时间与这段信息所在的位置无关。

简单了解一下RAM([en.wikipedia.org/wiki/Random…](https://en.wikipedia.org/wiki/Random-access_memory))：RAM是与CPU直接交换数据的内部存储器。它可以随时读写，而且速度很快，通常作为操作系统或其他正在运行中的程序的临时资料存储介质。可以分为静态随机存取存储器（SRAM）和动态随机存取存储器（DRAM）两大类。

#### 软件获取内存干什么

- load its own bytecode that needs to be executed（加载需要执行的二进制代码）
- store the data values and data structures used by the program that is executed（存储运行过程中的数据）
- load any run-time systems that are required for the program to execute（加载运行时环境）

#### 栈内存和堆内存

软件获取的内存整体上可以分为栈内存和堆内存两类，二者的特点分别大致如下：

`栈内存：`

- 数据存取的速度非常快，因为只需要关心入栈、出栈以及从栈顶读取数据，没有查询的过程
- 存储的数据大小是固定的（静态数据）
- 内存管理的方式简单且直接，并且由操作系统进行内存空间的管理，开发者无需关心
- 栈的size是有限的，因此要注意栈溢出的问题
- 多线程的应用中，每个线程可以拥有独立的栈内存
- 一般来说，栈内存的空间小于堆内存

`堆内存：`

- 存取速度慢于栈内存
- 存储的数据大小可以改变（动态数据）
- 内存管理的难度更大，也是各种自动化内存管理工具所介入的区域
- 可能会出现内存溢出的问题
- 多线程的应用中，线程之间是共享堆内存的

这里有一个JS中栈内存和堆内存的演示示例，可以帮助我们形象地理解两类内存区域的使用：

[点击这里](https://speakerdeck.com/deepu105/v8-memory-usage-stack-and-heap)(目前需要翻墙)

#### 不同的内存管理方式

大部分现代的编程语言并不想将内存管理的负担再交给开发者，因此大都配套了自动管理内存的方法（不一定是编程语言提供），当然有的编程语言仍然可以手动进行内存管理，甚至有些还提供了多种内存管理的方法，这些方法大致包括：

- 手动管理：由开发者手动分配和释放对象的内存空间，比如C和C++
- Garbage Collection（垃圾回收）：通过释放无用的内存空间来进行内存管理，这是现代编程语言采用最多的一种内存管理方式，包括Java，Kotlin，JavaScript，C#，Golang等语言都是默认采用GC进行内存管理，一般可基于引用计数(Reference counting)和标记清除(Mark Sweep)两种基本思路
- Resource Acquisition is Initialization（RAII）：保证在任何情况下，使用对象时先构造对象，最后析构对象。在C++引入，Ada和Rust也会使用
- Automatic Reference Counting（ARC）：和引用计数GC有些类似，但在代码中自动加入了retain/release，原先需要手动添加的用来处理内存管理的引用计数的代码可以自动地由编译器完成了，一般在Objective C或Swift开发中使用
- Ownership：是Rust的一个特性，类似一个编译期的引用计数

### V8的内存结构

V8是一个高性能的开源JavaScript和WebAssembly引擎，看一下V8官方的两段介绍：

- V8 `compiles and executes JavaScript source code`, `handles memory allocation for objects`, and `garbage collects objects` it no longer needs.
- V8’s `stop-the-world`, `generational`, `accurate` garbage collector is one of the keys to V8’s performance.

这两段介绍文本分别清晰地表达了V8是干什么的以及V8内存回收机制的三大特点（后文中会简单介绍这三大特性），从中不难看出，V8的内存管理机制是V8高性能的一个关键因素。

#### 内存区域划分

![img](/images/JS/V8/V8memory.assets/34a200e5a69c420d9deed473b6d3b72ctplv-k3u1fbpfcp-watermark.image)

（[deepu.tech/memory-mana…](https://deepu.tech/memory-management-in-v8/)）

重点看一下堆内存区域：

- 新生代：用来临时存储新对象，空间被等分为两份，整体较小，采用 Scavenge（Minor GC） 算法进行垃圾回收
- 老生代：用来存储经过两次 Minor GC 依然存活的对象，采用 标记清除 & 整理（Mark-Sweep & Mark-Compact，Major GC） 算法进行垃圾回收
- 代码空间（Code Space，老生代）：用于存放编译器编译后的代码段，是唯一的可执行内存（不过过大的代码段也有可能存放在大对象空间）
- 大对象空间（Large Object Space，老生代）：用于存放超过其它空间对象限制的大对象，存放在此的对象不会在垃圾回收的时候被移动

#### 内存页的结构

堆内存中的空间都是由一组Page(内存页)构成，每一个内存页都是由操作系统分配的连续的内存块，除大对象空间以外，每一页的大小一般是1MB。

内存页的开头都是一个 header，里面包括：

- 各种元数据和 flag（比如本页属于哪个空间），GC 需要使用的各种统计数据，GC 各个阶段在本页的进展状况等
- 一个 slots buffer，记录了所有指向本页内对象的指针，以节省回收时的一些扫描操作。
- 一个 skip list，将本页划分为多个区（region）并维护各个区的边界，用于快速搜索页上的对象

紧跟着 header 的是一个 bitmap，上面的每个 bit 对应页上的一个字，用于后面会介绍到的 marking。前面的部分按 32 个字对齐后，剩余的空间才是用于存储对象的。

> V8中，32位机器是 4 字节为一个字，64 位机器是 8 字节为一个字

新生代的内存页是连续的，而老生代的内存页是分散的，以链表的形式串联起来。

#### V8垃圾回收的特性简析

- `stop-the-wrold`

在执行垃圾回收的过程中，会暂停主线程的执行：由于JS的执行可能会产生新对象，或者修改对象的引用，造成对象的生存状态改变，假如没有准备相应的手段确保程序执行时不会修改正处于回收过程中的对象，就必须暂停执行来保证对象能够被安全回收。

- `generational`

正如上文“内存区域划分”小节中介绍到的，V8将堆内存分成了新生代和老生代，换言之，V8的垃圾回收器基于一个代际假说：即很多对象在内存中存在的时间很短（die young），从垃圾回收的角度来看，很多对象一经分配内存空间随即就变成了不可访问的，而一旦存活下来的对象就很有可能会长期存在。 这个假说不仅仅适用于 V8 和 JavaScript，同样适用于大多数的动态语言。

这里再引用《深入浅出Node.js》中的一段话来帮助理解分代式的垃圾回收：

> V8的垃圾回收策略主要基于分代式垃圾回收机制。在自动垃圾回收的演变过程中，人们发现没有一种垃圾回收算法能够胜任所有的场景。因为在实际的应用中，对象的生存周期长短不一，不同的算法只能针对特定情况具有最好的效果。为此，统计学在垃圾回收算法的发展中产生了较大的作用，现代的垃圾回收算法中按对象的存活时间将内存的垃圾回收进行不同的分代，然后分别对不同分代的内存施以更高效的算法。

- `accurate`

即准确式GC：V8 预留所有的字的最后一位用于标记（tag）这个字中的内容的类型，1 表示指针，0 表示整数。这样给定一个内存中的字，它能通过查看最后一位快速地判断它包含的指针还是整数，并且可以将整数直接存储在字中，无需先通过一个指针间接引用过来，节省空间。

由于 V8 能够通过查看字的最后一位，快速地分辨指针和整数，在 GC 的时候，V8 能够跳过所有的整数，更快地沿着指针扫描堆中的对象。由于在 GC 的过程中，V8 能够准确地分辨它所遍历到的每一块内存的内容属于什么类型，因此 V8 的垃圾回收器是准确式的。

与此相对的是保守式 GC，即垃圾回收器因为某些设计导致无法确定内存中内容的类型，只能保守地先假设它们都是指针然后再加以验证，以免误回收不该回收的内存，因此可能误将数据当作指针，进而误以为一些对象仍然被引用，无法回收而浪费内存。同时因为保守式的垃圾回收器没有十足的把握区分指针和数据，也就不能确保自己能安全地修改指针，无法使用那些需要移动对象，更新指针的算法。

> 虽然 ECMAScript 中没有规定整数类型，Number 都是 IEEE 浮点数，但是由于在 CPU 上浮点数相关的操作通常比整型操作要慢，大多数的 JavaScript 引擎都在底层实现中引入了整型，用于提升 for 循环和数组索引等场景的性能

### Minor GC(Scavenge)

用于新生代的垃圾回收，由于新生代的空间比较小，一般最大不超过16MB，因此新生代的垃圾回收会很频繁，它的处理方式必须非常的快。

V8将新生代内存分为nursery和intermediate两个区域，对象初始时会被分配到nursery区域，经过一次gc后，如果对象依然存活，则会被复制到intermediate区域。再经过一次gc如果依然存活，则会被移动到老生代。

![img](/images/JS/V8/V8memory.assets/c6999782fc334c9290eb236f4b9eee9ftplv-k3u1fbpfcp-watermark.image)

（[v8.dev/blog/orinoc…](https://v8.dev/blog/orinoco-parallel-scavenger)）

#### 基本步骤

Minor GC在具体实现上，主要采用的是Cheney算法（[dl.acm.org/citation.cf…](https://dl.acm.org/citation.cfm?doid=362790.362798)），可以分为`标记`、`移动存活对象`、`更新对象指针`三个大步骤，具体如下：

1. 在进行垃圾回收前，当前存储对象的内存页被标记为From Space，另外一块semispace中的内存页被标记为To Space
2. 将执行栈、全局对象和“老生代指向新生代”的引用作为roots（这里有一个write barrier的概念，后面会解释到）
3. 开始扫描roots，找到存活对象(reachable objects)，就将其从From Space复制到To Space；进行复制时如果发现对象已经经历过了一次GC，则会被移动到老生代。复制或移动完成后会在 From Space 原来的位置留下一个转发地址（forwarding address），后续如果再次扫描到该对象时就可直接使用这个新地址
4. 复制或移动对象后，由于内存地址发生了变化，需要更新相应的指针以指向最新的内存地址
5. 算法继续运行，对存活下来的对象上的引用继续执行类似3，4步骤的扫描和复制（移动），直到没有新增的存活对象为止。此时To Space 就充满了存活的对象，而 From space 就可以当成被清空了，下次再 GC 的时候可以直接拿来重新使用。整体上是一个广度优先遍历
6. 下一次GC时，From Space和To Space的内存页会交换角色

![img](data:image/svg+xml;utf8,%3C?xml%20version=%221.0%22?%3E%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20version=%221.1%22%20width=%22800%22%20height=%22600%22%3E%3C/svg>)

复制对象到To-Space（[v8.dev/blog/trash-…](https://v8.dev/blog/trash-talk)）

![img](/images/JS/V8/V8memory.assets/59f2c8b5a7ed43d3b1285938b1acd235tplv-k3u1fbpfcp-watermark.image)

移动对象到老生代（[v8.dev/blog/trash-…](https://v8.dev/blog/trash-talk)）

#### Minor GC的细节问题

- `关于晋升`

当对象存活过两次Minor GC后，会被移动到老生代，这个过程可以成为对象的晋升。除此之外，当对象第一次被复制到To-Space中时，如果发现其体积过大（to space 空间的 25%），也会直接晋升，而不会再复制到To-Space，因为大对象的复制或移动成本是非常高的。

- `触发时机`

新生代的空间一般最大不超过16MB，当需要在From Space为新对象分配空间，但是剩余的空间不足时，就会触发Minor GC。

- `write barrier`

上文中提到过write barrier的概念，那么为什么要这个东西呢？

首先上文中提到过，在Minor GC初始进行扫描的引用roots列表中，包含了从老生代指向新生代的引用，那么如何获取这些引用呢？把老生代整体扫描一遍肯定不现实，而V8正是通过write barrier来额外维护了从老生代指向新生代的引用，避免将老生代整体进行扫描。

来看一下write barrier的定义：

> - A write barrier is a block on writing to certain memory locations by certain threads or processes.（[www.memorymanagement.org/glossary/w.…](https://www.memorymanagement.org/glossary/w.html#term-write-barrier)）

具体到内存管理领域：Write barriers are used for incremental or concurrent garbage collection. They are also used to `maintain remembered sets for generational collectors` .

可以看到，write barrier一般用于为分代回收器来维护remembered sets，那么remembered sets又是什么呢？

> A remembered set is the technique of keeping a separate list of interesting references between two sets of objects, so you don’t have to find them by scanning.（[www.memorymanagement.org/glossary/r.…](https://www.memorymanagement.org/glossary/r.html#term-remembered-set)）

> A typical use in generational garbage collection is `remembering references from an older generation to a younger one`.

从这两段描述中，应该就不难理解remembered sets的作用了。

### Major GC

Major CG从整个堆中回收垃圾，主要分为3个阶段：标记（marking），清除（sweeping）和整理（compacting，可选）。

![img](/images/JS/V8/V8memory.assets/cc5d1c37b4d24997a95c17cf8b9d8ef4tplv-k3u1fbpfcp-watermark.image)

（[v8.dev/blog/trash-…](https://v8.dev/blog/trash-talk)）

#### 标记

标记阶段就是找到可访问对象的一个过程，和Minor GC相似，标记是从一组对象的指针（objects pointers）开始的，我们将其称之为根集（root set），这其中包括了执行栈和全局对象。

V8使用三色标记法来进行对象标记：使用每个对象的两个标记位和一个显式的栈来实现标记。两个标记位编码三种颜色：白色（00），灰色（10）和黑色（11）。白色代表这个对象可以被回收；黑色代表这个对象不能回收，而且它产生的所有引用都已经扫描完毕；灰色代表这个对象不能被回收，但它产生的引用还没有被扫描完。

扫描过程是一个深度优先遍历，最初所有的对象都是白色，意味着收集器还没有发现他们。当收集器发现一个对象时，将其标记为灰色并推入到栈中。然后开始扫描该对象的产生的所有引用并执行上述操作，这是一个递归的过程。 当收集器访问他的所有字段时并标记工作表中弹出对象时，灰色就会变成黑色。当栈上的所有对象都 pop之后，最后老生代的对象就只有黑色（不可回收）和白色（可以回收）两种了。

![img](/images/JS/V8/V8memory.assets/6c11651753d3488ba6a5fec41e02767atplv-k3u1fbpfcp-watermark.image)

（[v8.dev/blog/concur…](https://v8.dev/blog/concurrent-marking)）

#### 清除

Sweeping 就是扫描每一页的 marking bitmap，找到死亡对象占用的连续区块，将这些块添加到随该页维护的一个 freelist 里。这个数据结构保存了页上可用于下次分配的内存位置，可以用于 compacting、新生代晋升与老生代直接分配对象等需要在老生代中分配内存的场景。

V8 中按照可用内存块大小的区间分出了多个 freelist，这样能更快找到合适的可用内存。

#### 整理

Compacting 则是将页中的所有存活的对象都转移到另一页里（evacuation），这样存活对象都被移走了的那一页就可以直接还给操作系统了。

这种方法主要发生在某一页中死亡对象留下来的空洞（hole）比较多的时候，但也会有例外，比如这一页中的对象被太多其他页的对象引用的时候就不会 compact，不然移动对象后更新所有指过来的指针将会是不小的开销。

### V8在GC方面的优化

Orinoco是V8的垃圾回收器项目，它利用并行(Parallel)、增量(Incremental)和并发(Concurrent)技术来降低主线程挂起的时间，从而提升了用户体验。

#### 并行技术（Parallel）

![img](/images/JS/V8/V8memory.assets/6638e9fd57aa4b2bb2a7d894ef3b1936tplv-k3u1fbpfcp-watermark.image)

（[v8.dev/blog/trash-…](https://v8.dev/blog/trash-talk)）

主线程和协助线程同时执行同样的工作，stop-the-world依然存在，但是所耗费的时间变成了单线程时的1/n+1（开启了n个协助线程）。

这种技术是三种技术中最简单的方式，因为没有JavaScript的执行，只要确保同时只有一个协助线程在访问同一个对象就可以了。

#### 增量技术（Incremental)

![img](/images/JS/V8/V8memory.assets/ac8687a3c22b4562a60d960ce54392f4tplv-k3u1fbpfcp-watermark.image)

（[v8.dev/blog/trash-…](https://v8.dev/blog/trash-talk)）

主线程间歇地执行少量的垃圾回收工作，这要比并行技术困难一些，因为每次执行JavaScript的执行可能都会导致堆内存状态的变化，从而使得之前的回收工作成了无效的。

这项技术虽然没有减少主线程暂停的总时间（一般都会有所增加），但是通过间歇地执行JavaScript，避免了主线程被长时间挂起的情况，对于用户输入和动画也可以得到及时的响应。

#### 并发技术（Concurrent）

![img](/images/JS/V8/V8memory.assets/dbbbcf1283a647aea549bb7e1de71290tplv-k3u1fbpfcp-watermark.image)

（[v8.dev/blog/trash-…](https://v8.dev/blog/trash-talk)）

并发技术是指完全由协助线程进行GC，主线程从GC的工作中解脱出来（当然也会产生一些同步开销）。

这是三种技术中最困难的，首先JavaScript 堆里面的内容随时都有可能发生变化，从而使之前做的工作完全无效；同时也有了读/写竞争（read/write races），主线程和辅助线程极有可能在同一时间去更改同一个对象。

### 优化后的V8 GC现状

`Parallel Scavenger`

![img](/images/JS/V8/V8memory.assets/9d56b82aa5ef4cb68b9f4d3f7bf8ea13tplv-k3u1fbpfcp-watermark.image)

（[v8.dev/blog/trash-…](https://v8.dev/blog/trash-talk)）

V8在新生代垃圾回收中使用并行清理，每个线程都会接收一定数量的对象指针并将活动对象移动到To Space空间中。 并行的Scavenger 回收器将新生代的垃圾回收时间减少了大约 20% - 50%

`Major GC`

![img](/images/JS/V8/V8memory.assets/8e4bfb8c19124feaa4eefe9ebaa9bb4etplv-k3u1fbpfcp-watermark.image)

（[v8.dev/blog/trash-…](https://v8.dev/blog/trash-talk)）

在Major GC中，V8综合使用了上述的优化技术，其中包括：

- 并发标记：一旦堆的动态分配接近极限的时候，将启动并发标记任务。即在主线程执行的时候，协助线程在后台执行标记任务。写入屏障（write barriers）技术在辅助线程在进行并发标记的时候会一直追踪每一个 JavaScript 对象的新引用。
- 并行清除和并发整理：当并发标记完成或者动态分配到达极限的时候，主线程会执行最终的快速标记步骤；在这个阶段主线程会被暂停，这段时间也就是主垃圾回收器执行的所有时间。在这个阶段主线程会再一次的扫描根集以确保所有的对象都完成了标记；然后辅助线程就会去做更新指针和整理内存的工作。并非所有的内存页都会被整理，之前提到的加入到空闲列表的内存页就不会被整理。在暂停的时候主线程会启动并发清理的任务，这些任务都是并发执行的，并不会影响并行内存页的整理工作和 JavaScript 的执行。

并发标记清理可以减少大型 WebGL 游戏的主线程暂停时间，最多可以减少 50%。

`空闲时垃圾回收`

![img](/images/JS/V8/V8memory.assets/ce2f86fb14934a789ec2c34edf32ae52tplv-k3u1fbpfcp-watermark.image)

（[v8.dev/blog/trash-…](https://v8.dev/blog/trash-talk)）

JavaScript是无法直接访问垃圾回收器的，但是V8提供了一种机制让Embedders（嵌入V8的环境）去触发垃圾回收。V8的垃圾回收器会发布一些“空闲时任务”，这些空闲时任务是可以被触发并执行垃圾回收的。

在Chrome浏览器中，如果计算机的屏幕刷新频率是60HZ，那么浏览器大约有16.6ms去渲染一帧，如果渲染提前完成，在下一帧之前的空闲时间就可以去触发垃圾回收器发布的空闲任务。 空闲时垃圾回收器在 Gmail 网页应用空闲的时候将 JavaScript 堆内存减少了 45%。

`Worikng...`

V8仍在继续研究提升垃圾回收性能的方法，比如将V8的一些新技术移植到Blink的垃圾回收器Oilpan上。

### 参考资料

[1] [v8.dev/blog/orinoc…](https://v8.dev/blog/orinoco-parallel-scavenger)

[2] [v8.dev/blog/concur…](https://v8.dev/blog/concurrent-marking)

> 中文翻译版：[v8.js.cn/blog/concur…](https://v8.js.cn/blog/concurrent-marking/)

[3] [v8.dev/blog/trash-…](https://v8.dev/blog/trash-talk)

> 中文翻译版：[v8.js.cn/blog/trash-…](https://v8.js.cn/blog/trash-talk/)

[4] [v8.dev/blog/orinoc…](https://v8.dev/blog/orinoco)

[5] [deepu.tech/memory-mana…](https://deepu.tech/memory-management-in-programming/)

[6] [juejin.cn/post/684490…](https://juejin.cn/post/6844903704466833421#heading-4)

[7] [deepu.tech/memory-mana…](https://deepu.tech/memory-management-in-v8/)

[8] [newhtml.net/v8-garbage-…](http://newhtml.net/v8-garbage-collection/)

[9] [developers.google.com/web/tools/c…](https://developers.google.com/web/tools/chrome-devtools/memory-problems?hl=zh-cn#概览)

[10] [blog.csdn.net/weixin_3378…](https://blog.csdn.net/weixin_33781606/article/details/89733431)

[11] [blog.csdn.net/weixin_3383…](

## 深入了解V8内存管理