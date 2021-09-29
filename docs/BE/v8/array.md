#

深入理解 JS 数组

今天看到一个有意思的问题:

> Javascript 的 Array 中的元素在内存上的分布是连续的吗? 为什么?

咋一看, 我心里想的答案是: 肯定是啊, 数组在内存空间分配的内存不就是连续的嘛? 为什么要问这样的问题呢? 答案真的这么简单吗? 我开始不坚定自己的想法, 毕竟我也没有深究过 JavaScript 的 Array 底层是怎么实现的. 然后我就带着问题, 开始我的 Google 之旅... 好家伙, **果然有问题!**为了刨根问底, 我找到了 V8 的源码仔细研究了一下午, 准备写篇博客记录一下, 以免忘记.

## 什么是数组

在讨论 JS 数组之前, 我们先回顾一下数据结构中数组的定义:

> 在计算机科学中, 数组数据结构(英语:array data structure), 简称数组(英语: Array), 是由**相同类型的元素**(element)的集合所组成的数据结构, **分配一块连续的内存**来存储. 利用元素的索引(index)可以计算出该元素对应的存储地址.[引自维基百科](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E6%95%B0%E7%BB%84)

由维基百科给出的数组的定义可知, 数组满足:

1. 数组中所有元素是**同种类型**的元素（同一类型元素所需存储空间大小一致，所以我们可以很方便的利用元素的索引来计算出元素所在的位置）；
2. 分配**一块连续**的内存存储（固定长度、连续）。

回想一下 JS 数组, 你就会发现 JS 数组有点"特殊"...

## JS 数组有点特殊

写过 JS 代码的童鞋对下面这段代码肯定不陌生:

```js
let arr = [1, "abc", [2]]; // 同一数组可以存储不同类型的元素
console.log(arr.length); // 3

arr[arr.length] = "hello";
console.log(arr.length); // 4，数组长度可任意更改
```

从上面的代码我可以直观的看到, JS 数组与数据结构中的数组相比有些特殊:

1. 同一个 JS 数组的元素可以是**不同的数据类型**，那我们肯定没法固定长度为每个元素分配空间，那么这样的数组也就没办法通过元素的索引来计算出某个元素对应的存储地址了。
2. JS 数组可以**任意更改大小**。看到这里，你还会觉得 JS 数组在内存中分配的空间是连续的吗？如果是连续的，如果我们无限制的增加数组的大小，怎么保证后面的区域也是可以分配给数组的呢？

## 初探 JS 数组

在查阅一些资料之后, 我知道了这个结论: 在 JS 中数组存在两种形式, 一种是与 `C/C++` 等相同的在连续内存中存放数据的**快数组**, 另一种是 `HashTable` 结构的**慢数组**, 是一种典型的**字典形式**. 在 V8 引擎中, 直接创建数组默认的方式是创建**快数组**, 会直接为数组开辟**一定大小连续的内存**.

首先 `F12` 打开 Chrome 浏览器的 `Developer Tools` , 我们可以利用这个工具初步探索 JS 数组.

1. 打开 `Memory` 选项卡, 我们可以看到当前网页我们用了多大内存:

2. 在 `Console` 中执行以下代码

```js
const LIMIT = 6 * 1024 * 1024;
let arr = new Array(LIMIT);
```

3. 再打开 `Memory` 选项卡:

内存迅速增加了近 200M

回想我们再数据结构中学到的知识: 如果系统为该数组分配的是一块连续的内存, 那么在这个数组上的遍历速度应该是很快的, 那么我们可以计算一下遍历该数组大概需要多少时间:

```js
console.time("Array");
for (let i = 0; i < LIMIT; i++) arr[i] = i;
console.timeEnd("Array");
```

console 输出如下

```shell
console.time("Array");
for(let i=0; i<LIMIT; i++) arr[i] = i;
console.timeEnd("Array");
VM678:3 Array: 12.748046875 ms
```

现在我们知道了快数组是和 c/c++等语言类似的为其分配连续固定大小的内存空间, 那如果我们此时改变数组大小, 会发生什么事?

```js
arr[arr.length + 1026] = 1;
console.time("Array+1026");
for (let i = 0; i < LIMIT; i++) arr[i] = i;
console.timeEnd("Array+1026");
```

```shell
arr[arr.length+1026] = 1
console.time("Array+1026");
for(let i=0; i<LIMIT; i++) arr[i] = i;
console.timeEnd("Array+1026");
VM760:4 Array+1026: 1194.070068359375 ms
```

当我们为数组新增 1027 ( `arr[arr.length+1026] = 1` 意味着最大索引是 `arr.length+1026` , 所以我们为数组增加了 `1027` 个长度)个长度后, 再次遍历数组, 所需要开销的时间多了 `100` 倍左右, 我们只是增加了 `1027` 个元素为什么遍历效率会低这么多? 对! 它"变了"! 它再也不是原来那个快数组了, 它变"慢"了, 变成了慢数组. 看到这里大家肯定觉得有点懵, 怎么就变了? 什么情况下会变? 你倒是说清楚啊! 别急, 下面我们就来研究研究它为什么"变了"?

## 深探 JS 数组

刚刚我们一直在说什么快数组, 慢数组. 这里"快", "慢"到底是咋回事?

## V8 中的快慢属性

这里为了避免这篇文章的内容太长, 就不去深入讨论 V8 中的快慢属性了, 这里直接说结论: 在 V8 中, 前后者分别被称为 `数组索引属性 (Array-indexed Properties)` 和 `命名属性 (Named Properties)` , 遍历时一般会先遍历前者. 前后两者在底层存储在**两个单独的数据结构**中, 分别用 `properties` 和 `elements` 两个指针指向它们

之所以存储在两个数据结构中, 是为了使不同情况下对属性的增删改查都相对高效. 实际上, V8 有一种策略: 如果命名属性个数在对象初始大小预定义范围内时, 命名属性会直接存储到**对象本身**, 而无需先通过 `properties` 指针查询, 再获取对应 `key` 的值, 省去中间的一步, 从而提升了查找属性的效率. 直接存储到对象本身的属性被称为 `对象内属性 (In-object Properties)` . `对象内属性` 与 `properties` 、 `elements` 处于同一层级.

## 快数组与慢数组

类比快慢属性, 再看我们上一节中举的例子:

```js
const LIMIT = 6 * 1024 * 1024;
let arr = new Array(LIMIT); // 快数组
arr[arr.length + 1026] = 1; // 快数组转为慢数组
```

这个例子中, 在行 `2` 声明完毕后 `arr` 是一个空数组, 但在行 `3` 马上又定义索引 `arr.length+1026` 处值为 `1` , 此时如果为 `arr` 创建一个长度为 `arr.length+1026+1` 的数组连续内存来存储这样的**稀疏数据**将会非常占用内存, 为了应对这种情况, V8 会将数组降级为**慢数组**, 创建一个**字典**来存储「 `键、值、描述符` 」(key、value、descriptor) 三元组. 当使用 `Object.defineProperty` 自定义 `key、value、descriptor`  `时, V8` 都会使用**慢属性**, 对应到数组中就是**慢数组**. 这样说还是太浅显了, 到底什么是快数组什么是慢数组, 什么时候快数组会转换为慢数组, 转换规则是什么?

```cpp
// v8/src/objects/js-array.h
// The JSArray describes JavaScript Arrays
//  Such an array can be in one of two modes:
//    - fast, backing storage is a FixedArray and length <= elements.length();
//       Please note: push and pop can be used to grow and shrink the array.
//    - slow, backing storage is a HashTable with numbers as keys.
class JSArray : public JSObject {
 public:
  // [length]: The length property.
  DECL_ACCESSORS(length, Object)
  // ...
}
```

通过在 V8 数组的定义可以了解到, 数组可以处于两种模式:

1. **Fast 模式**的存储结构是 `FixedArray` 并且**长度小于等于**`elements.length`, 可以通过 `push` 和 `pop` 增加和缩小数组;
2. **slow 模式**的存储结构是一个以**数字**为键的 `HashTable`.

### 快数组

1. 快数组是一种`线性的存储方式`，内部存储是`连续`的内存（新创建的空数组，默认的存储方式是快数组）；
2. `快数组长度是可变的`，可以根据元素的增加和删除来动态调整存储空间大小，内部是**通过扩容**和**收缩机制**实现；

### 扩容机制

```cpp
// v8/src/objects/js-array.h  105
// Number of element slots to pre-allocate for an empty array. (默认的空数组预分配的大小为 4)
static const int kPreallocatedArrayElements = 4;

// v8/src/objects/js-objects.h  537
static const uint32_t kMinAddedElementsCapacity = 16;

// v8/src/objects/js-objects.h  540
// Computes the new capacity when expanding the elements of a JSObject. (计算扩充后的容量)
static uint32_t NewElementsCapacity(uint32_t old_capacity) {
    // (old_capacity + 50%) + kMinAddedElementsCapacity
    // (扩容的公式: new_capacity = old_capacity + old_capacity / 2 + 16)
    return old_capacity + (old_capacity >> 1) + kMinAddedElementsCapacity;
}

// v8/src/code-stub-assembler.cc  5137
Node* CodeStubAssembler::CalculateNewElementsCapacity(Node* old_capacity,
                                                      ParameterMode mode) {
  CSA_SLOW_ASSERT(this, MatchesParameterMode(old_capacity, mode));
  Node* half_old_capacity = WordOrSmiShr(old_capacity, 1, mode);
  Node* new_capacity = IntPtrOrSmiAdd(half_old_capacity, old_capacity, mode);
  Node* padding =
      IntPtrOrSmiConstant(JSObject::kMinAddedElementsCapacity, mode);
  return IntPtrOrSmiAdd(new_capacity, padding, mode);
}

// v8/src/code-stub-assembler.cc  5202
// Allocate the new backing store.
Node* new_elements = AllocateFixedArray(to_kind, new_capacity, mode);
// Copy the elements from the old elements store to the new.
// The size-check above guarantees that the |new_elements| is allocated
// in new space so we can skip the write barrier.
CopyFixedArrayElements(from_kind, elements, to_kind, new_elements, capacity,
                     new_capacity, SKIP_WRITE_BARRIER, mode);
StoreObjectField(object, JSObject::kElementsOffset, new_elements);
```

默认的空数组预分配的大小为 `4` , 当数组进行扩充操作例如 `push` 时, 数组的内存若不够则将进行扩容, 最小的扩容容量为 `16` , 扩容的公式为 `new_capacity = old_capacity + old_capacity / 2 + 16` , 即申请一块原容量 `1.5` 倍加 `16` 这样大小的内存, 将原数据拷贝到新内存, 然后 `length + 1` , 并返回 `length.`

### 收缩机制

```cpp
// v8/src/elements.cc  783
// 如果容量大于等于 length * 2 + 16，则进行收缩容量调整
if (2 * length + JSObject::kMinAddedElementsCapacity <= capacity) {
    // If more than half the elements won't be used, trim the array.
    // Do not trim from short arrays to prevent frequent trimming on
    // repeated pop operations.
    // Leave some space to allow for subsequent push operations.
    int elements_to_trim = length + 1 == old_length
                                ? (capacity - length) / 2
                                : capacity - length;
    isolate->heap()->RightTrimFixedArray(*backing_store, elements_to_trim);
    // Fill the non-trimmed elements with holes.
    BackingStore::cast(*backing_store)
        ->FillWithHoles(length,
                        std::min(old_length, capacity - elements_to_trim));
} else {
    // Otherwise, fill the unused tail with holes.（否则用 HOLES 对象填充未被初始化的位置）
    BackingStore::cast(*backing_store)->FillWithHoles(length, old_length);
}
```

当数组执行 `pop` 操作时, 会判断 `pop` 后数组的容量, **是否需要进行减容**, 如果容量大于等于 `length * 2 + 16` , 则进行**收缩容量调整**, 否则用 `HOLES` **对象填充未被初始化的位置**, `elements_to_trim` 是要裁剪的大小, 需要根据 `length + 1` 和 `old_length` 判断是将空出的空间**全部收缩掉**还是**只收缩一半**.

### HOLES 对象

上边提到的 `HOLES` 对象指的是数组中分配了空间, 但是没有存放元素的位置. 在 `Fast Elements` 模式中有一个**HOLES 的扩展**称为 `Fast Holey Elements` 模式. `Fast Holey Elements` 模式适合于数组中的有空洞情况(即只有某些索引存有数据, 而其他的索引都没有赋值的情况), 此时没有赋值的数组索引将会存储一个特殊的值 `empty` , 这样在访问这些位置时就可以得到 `undefined` . `Fast Holey Elements` 模式与 `Fast Elements` 模式一样, 会**动态分配连续的存储空间**, **分配空间的大小由最大的索引值决定**.(定义数组时, 如果没有设置容量, V8 会默认使用 `Fast Elements` 模式实现, 如果定义数组时进行了容量的指定, 就会以 `Fast Holey Elements` 模式实现).

### 数组类型

在 `Fast Elements` 模式下 V8 引擎还根据元素类型对数组类型做了细分以**优化数组**:

1. 当全部元素都为**整数型**的话，那么这个数组的类型就被标记为 `PACKED_SMI_ELEMENTS`;
2. 如果只存在**整数型**和**浮点型**的元素类型，那么这个数组的类型为 `PACKED_DOUBLE_ELEMENTS`;
3. 除此以外，一个数组包含其它的元素，都被标记为 `PACKED_ELEMENTS`（**密集数组**），但**这些数组类型并非一成不变，而是在运行时随时更改的**，但是数组的类型只能从特定种类变更为普通种类。即：

* 初始为 `PACKED_SMI_ELEMENTS`

![[公式]](array.assets/equation)

`PACKED_DOUBLE_ELEMENTS` 或 `PACKED_ELEMENTS` ;
* `PACKED_DOUBLE_ELEMENTS`

![[公式]](array.assets/equation)

`PACKED_ELEMENTS` ;
* 初始就是 `PACKED_ELEMENTS` 类型的数组, 就无法再过渡了, **无法逆向过渡**.

\4. 上述的这三种类型, 都属于密集数组, 与之相对应的, 是**稀疏数组**, 标记为 `HOLEY_ELEMENTS` , 稀疏数组同样具有三种类型, **任何一种 `PACKED` 都可以过渡到 `HOLEY` **:

* - `PACKED_SMI_ELEMENTS`

![[公式]](array.assets/equation)

`HOLEY_SMI_ELEMENTS` ,
  + `PACKED_DOUBLE_ELEMENTS`

![[公式]](array.assets/equation)

`HOLEY_DOUBLE_ELEMENTS` ,
  + `PACKED_ELEMENTS`

![[公式]](array.assets/equation)`HOLEY_ELEMENTS` .(需要注意的是, 虽然可以将数组转换为 `HOLEY` 模式, 但是**并不一定就代表着这个数组被转换为慢数组**.)

### 慢数组

慢数组是一种字典的内存形式. 不用分配大块连续的存储空间, `节省了内存` , 但是由于需要维护这样一个 `HashTable` , 其 `效率会比快数组低` , V8 中是以 `Dictionary` 的结构实现的慢数组.

```cpp
// v8/src/objects/dictionary.h  line 27
class Dictionary : public HashTable<Derived, Shape> {
    typedef HashTable<Derived, Shape> DerivedHashTable;

    public:
    typedef typename Shape::Key Key;
    // Returns the value at entry.
    Object ValueAt(int entry) {
        return this->get(DerivedHashTable::EntryToIndex(entry) + 1);
    }

    // Set the value for entry.
    void ValueAtPut(int entry, Object value) {
       this->set(DerivedHashTable::EntryToIndex(entry) + 1, value);
    }

    // Returns the property details for the property at entry.
    PropertyDetails DetailsAt(int entry) {
       return Shape::DetailsAt(Derived::cast(*this), entry);
    }

    // ...

}
```

### 快数组转换为慢数组

```cpp
// src/objects/js-objects.h
static const uint32_t kMaxGap = 1024;

// src/objects/dictionary.h
// JSObjects prefer dictionary elements if the dictionary saves this much
// memory compared to a fast elements backing store.
static const uint32_t kPreferFastElementsSizeFactor = 3;

// ...
class NumberDictionaryShape : public NumberDictionaryBaseShape {
 public:
  static const int kPrefixSize = 1;
  static const int kEntrySize = 3;
};

// src/objects/js-objects-inl.h
// If the fast-case backing storage takes up much more memory than a dictionary
// backing storage would, the object should have slow elements.
// static
static inline bool ShouldConvertToSlowElements(uint32_t used_elements,
                                               uint32_t new_capacity) {
  uint32_t size_threshold = NumberDictionary::kPreferFastElementsSizeFactor *
                            NumberDictionary::ComputeCapacity(used_elements) *
                            NumberDictionary::kEntrySize;
  return size_threshold <= new_capacity;
}

static inline bool ShouldConvertToSlowElements(JSObject object,
                                               uint32_t capacity,
                                               uint32_t index,
                                               uint32_t* new_capacity) {
  STATIC_ASSERT(JSObject::kMaxUncheckedOldFastElementsLength <=
                JSObject::kMaxUncheckedFastElementsLength);
  if (index < capacity) {
    *new_capacity = capacity;
    return false;
  }
  if (index - capacity >= JSObject::kMaxGap) return true;
  *new_capacity = JSObject::NewElementsCapacity(index + 1);
  DCHECK_LT(index, *new_capacity);
  if (*new_capacity <= JSObject::kMaxUncheckedOldFastElementsLength ||
      (*new_capacity <= JSObject::kMaxUncheckedFastElementsLength &&
       ObjectInYoungGeneration(object))) {
    return false;
  }
  return ShouldConvertToSlowElements(object.GetFastElementsUsage(),
                                     *new_capacity);
}
```

从源码中我们可以得出结论:

1. 如果快数组扩容后的容量是原来的 `3` 倍以上, 意味着它比 `HashTable` 形式存储占用更大的内存, 快数组会转换为慢数组;
2. 如果快数组**新增的索引与原来最大索引**的差值大于 `1024`, 快数组会被转换会慢数组.(之前的例子:`[(arr.length + 1026) - (arr.length - 1)] = 1027 > 1024`, 故 `arr` 由快数组转为慢数组.)

### 慢数组转换为快数组

```cpp
// v8/src/objects/js-objects.cc  line 4523
static bool ShouldConvertToFastElements(JSObject object,
                                        NumberDictionary dictionary,
                                        uint32_t index,
                                        uint32_t* new_capacity) {
  // If properties with non-standard attributes or accessors were added, we
  // cannot go back to fast elements.
  if (dictionary->requires_slow_elements()) return false;

  // Adding a property with this index will require slow elements.
  if (index >= static_cast<uint32_t>(Smi::kMaxValue)) return false;

  if (object->IsJSArray()) {
    Object length = JSArray::cast(object)->length();
    if (!length->IsSmi()) return false;
    *new_capacity = static_cast<uint32_t>(Smi::ToInt(length));
  } else if (object->IsJSSloppyArgumentsObject()) {
    return false;
  } else {
    *new_capacity = dictionary->max_number_key() + 1;
  }
  *new_capacity = Max(index + 1, *new_capacity);

  uint32_t dictionary_size = static_cast<uint32_t>(dictionary->Capacity()) *
                             NumberDictionary::kEntrySize;

  // Turn fast if the dictionary only saves 50% space.
  return 2 * dictionary_size >= *new_capacity;
}

// v8/src/objects/smi.h  line 106
static constexpr int kMaxValue = kSmiMaxValue;

// v8/include/v8-internal.h  line 87
static constexpr intptr_t kSmiMaxValue = -(kSmiMinValue + 1);
```

当慢数组的元素可存放在快数组中且长度小于 `Smi::kMaxValue` 且当前慢数组相对于快数组仅节省了少于或等于 `50%` 的空间, 则转变为快数组.

## 参考资料

1. [数组](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E6%95%B0%E7%BB%84)
2. [V8](https://link.zhihu.com/?target=https%3A//github.com/v8/)
3. [Fast properties in V8](https://link.zhihu.com/?target=https%3A//v8.dev/blog/fast-properties)
4. [V8 是怎么跑起来的 —— V8 中的对象表示](https://link.zhihu.com/?target=https%3A//www.cnblogs.com/chargeworld/p/12236848.html)
5. [探究 JS V8 引擎下的"数组"底层实现](https://link.zhihu.com/?target=https%3A//juejin.cn/post/6844903943638794248)
6. [V8 中的快慢属性与快慢数组](https://link.zhihu.com/?target=https%3A//z3rog.tech/blog/2020/fast-properties.html)
7. [深入理解 Js 数组](https://link.zhihu.com/?target=https%3A//www.cnblogs.com/WindrunnerMax/p/13121840.html)
