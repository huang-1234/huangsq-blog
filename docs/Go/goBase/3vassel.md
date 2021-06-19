# 容器



## 数组

组是一个由固定长度的特定类型元素组成的序列，一个数组可以由零个或多个元素组成。因为数组的长度是固定的，所以在Go语言中很少直接使用数组。

和数组对应的类型是 Slice（切片），Slice 是可以增长和收缩的动态序列，功能也更灵活，但是想要理解 slice 工作原理的话需要先理解数组

数组的声明语法如下：

var 数组变量名 [元素数量]Type

语法说明如下所示：

- 数组变量名：数组声明及使用时的变量名。

- 元素数量：数组的元素数量，可以是一个表达式，但最终通过编译期计算的结果必须是整型数值，元素数量不能含有到运行时才能确认大小的数值。

- Type：可以是任意基本类型，包括数组本身，类型为数组本身时，可以实现多维数组。

  

```go
var a [3]int             // 定义三个整数的数组
fmt.Println(a[0])        // 打印第一个元素
fmt.Println(a[len(a)-1]) // 打印最后一个元素
// 打印索引和元素
for i, v := range a {
    fmt.Printf("%d %d\n", i, v)
}
// 仅打印元素,`_`是匿名变量，可重复定义，但是不可引用
for _, v := range a {
    fmt.Printf("%d\n", v)
}

q := [...]int{1, 2, 3}
fmt.Printf("%T\n", q) // "[3]int"

b := [3]int{1, 2, 3}
b = [4]int{1, 2, 3, 4} // 编译错误：无法将 [4]int 赋给 [3]int
```

数组的每个元素都可以通过索引下标来访问，索引下标的范围是从 0 开始到数组长度减 1 的位置，内置函数 len() 可以返回数组中元素的个数。

## 多维数组

声明多维数组的语法如下所示：

var array_name [size1][size2]...[sizen] array_type

其中，array_name 为数组的名字，array_type 为数组的类型，size1、size2 等等为数组每一维度的长度。

```go
// 声明一个二维整型数组，两个维度的长度分别是 4 和 2
var array [4][2]int
// 使用数组字面量来声明并初始化一个二维整型数组
array = [4][2]int{{10, 11}, {20, 21}, {30, 31}, {40, 41}}
// 声明并初始化数组中索引为 1 和 3 的元素
array = [4][2]int{1: {20, 21}, 3: {40, 41}}
// 声明并初始化数组中指定的元素
array = [4][2]int{1: {0: 20}, 3: {1: 41}}
```



## 切片

切片（slice）是对数组的一个连续片段的引用，所以切片是一个引用类型。

这个片段可以是整个数组，也可以是由起始和终止索引标识的一些项的子集，需要注意的是，终止索引标识的项不包括在切片内。

Go语言中切片的内部结构包含地址、大小和容量，切片一般用于快速地操作一块数据集合

从连续内存区域生成切片是常见的操作，格式如下：

slice [开始位置 : 结束位置]

语法说明如下：

- slice：表示目标切片对象；
- 开始位置：对应目标切片对象的索引；
- 结束位置：对应目标切片的结束索引。


从数组生成切片，代码如下：

```go
var a  = [3]int{1, 2, 3}
fmt.Println(a, a[1:2])
```

其中 a 是一个拥有 3 个整型元素的数组，被初始化为数值 1 到 3，使用 a[1:2] 可以生成一个新的切片，代码运行结果如下：

[1 2 3]  [2]

其中 [2] 就是 a[1:2] 切片操作的结果。

从数组或切片生成新的切片拥有如下特性：

- 取出的元素数量为：结束位置 - 开始位置；
- 取出元素不包含结束位置对应的索引，切片最后一个元素使用 slice[len(slice)] 获取；
- 当缺省开始位置时，表示从连续区域开头到结束位置；
- 当缺省结束位置时，表示从开始位置到整个连续区域末尾；
- 两者同时缺省时，与切片本身等效；
- 两者同时为 0 时，等效于空切片，一般用于切片复位。


根据索引位置取切片 slice 元素值时，取值范围是（0～len(slice)-1），超界会报运行时错误，生成切片时，结束位置可以填写 len(slice) 但不会报错。

### 直接声明新的切片

除了可以从原有的数组或者切片中生成切片外，也可以声明一个新的切片，每一种类型都可以拥有其切片类型，表示多个相同类型元素的连续集合，因此切片类型也可以被声明，切片类型声明格式如下：

var name []Type

其中 name 表示切片的变量名，Type 表示切片对应的元素类型。

下面代码展示了切片声明的使用过程：

```go
// 声明字符串切片
var strList []string
// 声明整型切片
var numList []int
// 声明一个空切片
var numListEmpty = []int{}
// 输出3个切片
fmt.Println(strList, numList, numListEmpty)
// 输出3个切片大小
fmt.Println(len(strList), len(numList), len(numListEmpty))
// 切片判定空的结果
fmt.Println(strList == nil)
fmt.Println(numList == nil)
fmt.Println(numListEmpty == nil)
```

代码输出结果：

```go
[] [] []
0 0 0
true
true
false
```



代码说明如下：

```go
- 第 2 行，声明一个字符串切片，切片中拥有多个字符串。
- 第 5 行，声明一个整型切片，切片中拥有多个整型数值。
- 第 8 行，将 numListEmpty 声明为一个整型切片，本来会在`{}`中填充切片的初始化元素，
	这里没有填充，所以切片是空的，但是此时的 numListEmpty 已经被分配了内存，只是还没有元素。
- 第 11 行，切片均没有任何元素，3 个切片输出元素内容均为空。
- 第 14 行，没有对切片进行任何操作，strList 和 numList 没有指向任何数组或者其他切片。
- 第 17 行和第 18 行，声明但未使用的切片的默认值是 nil，strList 和 numList 也是 nil，所以和 nil 比较的结果是 true。
- 第 19 行，numListEmpty 已经被分配到了内存，但没有元素，因此和 nil 比较时是 false。
```


切片是动态结构，只能与 nil 判定相等，不能互相判定相等。声明新的切片后，可以使用 `append()`函数向切片中添加元素。

### 使用 make() 函数构造切片

如果需要动态地创建一个切片，可以使用 make() 内建函数，格式如下：

make( []Type, size, cap )

其中 Type 是指切片的元素类型，size 指的是为这个类型分配多少个元素，cap 为预分配的元素数量，这个值设定后不影响 size，只是能提前分配空间，降低多次分配空间造成的性能问题。

示例如下：

```go
a := make([]int, 2)b := make([]int, 2, 10);
fmt.Println(a, b);
fmt.Println(len(a), len(b));

// [0 0] [0 0]
// 2 2
```

其中 a 和 b 均是预分配 2 个元素的切片，只是 b 的内部存储空间已经分配了 10 个，但实际使用了 2 个元素。

容量不会影响当前的元素个数，因此 a 和 b 取 len 都是 2。

#### `Tips`

> 使用 make() 函数生成的切片一定发生了内存分配操作，但给定开始与结束位置（包括切片复位）的切片只是将新的切片结构指向已经分配好的内存区域，设定开始与结束位置，不会发生内存分配操作。

### append()

o语言的内建函数 `append()` 可以为切片动态添加元素，代码如下所示：

```go
var a []int
a = append(a, 1) // 追加1个元素
a = append(a, 1, 2, 3) // 追加多个元素, 手写解包方式
a = append(a, []int{1,2,3}...) // 追加一个切片, 切片需要解包
```

不过需要注意的是，在使用 append() 函数为切片动态添加元素时，如果空间不足以容纳足够多的元素，切片就会进行“扩容”，此时新切片的长度会发生改变。

切片在扩容时，容量的扩展规律是按容量的 2 倍数进行扩充，例如 1、2、4、8、16……，代码如下：

```go
var numbers []int
for i := 0; i < 10; i++ {
    numbers = append(numbers, i)
    fmt.Printf("len: %d  cap: %d pointer: %p\n", len(numbers), cap(numbers), numbers)
}
```

代码输出如下：

```go
13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Go (ch3)
$ go run "g:\Study\Code\Web\NodeJS\learnFrontTest\Go\goBase\refer\makeslice.go"
len: 1  cap: 1 pointer: 0xc000016098
len: 2  cap: 2 pointer: 0xc0000160e0
len: 3  cap: 4 pointer: 0xc0000141e0
len: 4  cap: 4 pointer: 0xc0000141e0
len: 5  cap: 8 pointer: 0xc000010280
len: 6  cap: 8 pointer: 0xc000010280
len: 7  cap: 8 pointer: 0xc000010280
len: 8  cap: 8 pointer: 0xc000010280
len: 9  cap: 16 pointer: 0xc000110080
len: 10  cap: 16 pointer: 0xc000110080
```

代码说明如下：

- 第 1 行，声明一个整型切片。
- 第 4 行，循环向 numbers 切片中添加 10 个数。
- 第 5 行，打印输出切片的长度、容量和指针变化，使用函数 len() 查看切片拥有的元素个数，使用函数 cap() 查看切片的容量情况。


通过查看代码输出，可以发现一个有意思的规律：切片长度 len 并不等于切片的容量 cap

### copy slice

Go语言的内置函数 `copy()` 可以将一个数组切片复制到另一个数组切片中，如果加入的两个数组切片不一样大，就会按照其中较小的那个数组切片的元素个数进行复制。

copy() 函数的使用格式如下：

`copy( destSlice, srcSlice []T) int`

其中 srcSlice 为数据来源切片，destSlice 为复制的目标（也就是将 srcSlice 复制到 destSlice），目标切片必须分配过空间且足够承载复制的元素个数，并且来源和目标的类型必须一致，copy() 函数的返回值表示实际发生复制的元素个数。

下面的代码展示了使用 copy() 函数将一个切片复制到另一个切片的过程：以及展示了copy是值copy，

```go
func incompleteCopy(){
	fmt.Printf("incompleteCopy\n");
	slice1 := []int{1, 2, 3, 4, 5}
	slice2 := []int{5, 4, 3}
	// copy(slice2, slice1) // 只会复制slice1的前3个元素到slice2中
	copy(slice1, slice2) // 只会复制slice2的3个元素到slice1的前3个位置
	fmt.Println(slice1); 
	// fmt.Println(slice2);
	slice2[0]=100;
	fmt.Println(slice1,slice2);
}
func main() {
	incompleteCopy()
}
```

虽然通过循环复制切片元素更直接，不过内置的 copy() 函数使用起来更加方便，copy() 函数的第一个参数是要复制的目标 slice，第二个参数是源 slice，两个 slice 可以共享同一个底层数组，甚至有重叠也没有问题。

## range关键字

既然切片是一个集合，那么我们就可以迭代其中的元素，Go语言有个特殊的关键字 range，它可以配合关键字 for 来迭代切片里的每一个元素，如下所示：

```go
// 创建一个整型切片，并赋值
slice := []int{10, 20, 30, 40}
// 迭代每一个元素，并显示其值
for index, value := range slice {
    fmt.Printf("Index: %d Value: %d\n", index, value)
}
```

第 4 行中的 index 和 value 分别用来接收 range 关键字返回的切片中每个元素的索引和值，这里的 index 和 value 不是固定的，读者也可以定义成其它的名字。

## 多维切片

Go语言中同样允许使用多维切片，声明一个多维数组的语法格式如下：

var sliceName [][]...[]sliceType

其中，sliceName 为切片的名字，sliceType为切片的类型，每个`[ ]`代表着一个维度，切片有几个维度就需要几个`[ ]`。

下面以二维切片为例，声明一个二维切片并赋值，代码如下所示。

```go
//声明一个二维切片
var slice [][]int
//为二维切片赋值
slice = [][]int{{10}, {100, 200}}
```

上面的代码也可以简写为下面的样子。

```go
// 声明一个二维整型切片并赋值
slice := [][]int{{10}, {100, 200}}
```

上面的代码中展示了一个包含两个元素的外层切片，同时每个元素包又含一个内层的整型切片

## map

Go语言中 map 是一种特殊的[数据结构](http://c.biancheng.net/data_structure/)，一种元素对（pair）的无序集合，pair 对应一个 key（索引）和一个 value（值），所以这个结构也称为关联数组或字典，这是一种能够快速寻找值的理想结构，给定 key，就可以迅速找到对应的 value。

map 这种数据结构在其他编程语言中也称为字典（[Python](http://c.biancheng.net/python/)）、hash 和 HashTable 等。

### map 概念

map 是引用类型，可以使用如下方式声明：

var mapname map[keytype]valuetype

其中：

- mapname 为 map 的变量名。
- keytype 为键类型。
- valuetype 是键对应的值类型。

> 提示：[keytype] 和 valuetype 之间允许有空格。

在声明的时候不需要知道 map 的长度，因为 map 是可以动态增长的，未初始化的 map 的值是 nil，使用函数 len() 可以获取 map 中 pair 的数目。

```go
package main
import "fmt"
func main() {
    var mapLit map[string]int
    //var mapCreated map[string]float32
    var mapAssigned map[string]int
    mapLit = map[string]int{"one": 1, "two": 2}
    mapCreated := make(map[string]float32)
    mapAssigned = mapLit
    mapCreated["key1"] = 4.5
    mapCreated["key2"] = 3.14159
    mapAssigned["two"] = 3
    fmt.Printf("Map literal at \"one\" is: %d\n", mapLit["one"])
    fmt.Printf("Map created at \"key2\" is: %f\n", mapCreated["key2"])
    fmt.Printf("Map assigned at \"two\" is: %d\n", mapLit["two"])
    fmt.Printf("Map literal at \"ten\" is: %d\n", mapLit["ten"])
}
```

输出

```go
Map literal at "one" is: 1
Map created at "key2" is: 3.14159
Map assigned at "two" is: 3
Map literal at "ten" is: 0
```

### map 容量

和数组不同，map 可以根据新增的 key-value 动态的伸缩，因此它不存在固定长度或者最大限制，但是也可以选择标明 map 的初始容量 capacity，格式如下：

make(map[keytype]valuetype, cap)

例如：

map2 := make(map[string]float, 100)

当 map 增长到容量上限的时候，如果再增加新的 key-value，map 的大小会自动加 1，所以出于性能的考虑，对于大的 map 或者会快速扩张的 map，即使只是大概知道容量，也最好先标明。

### 用切片作为 map 的值

既然一个 key 只能对应一个 value，而 value 又是一个原始类型，那么如果一个 key 要对应多个值怎么办？例如，当我们要处理 unix 机器上的所有进程，以父进程（pid 为整形）作为 key，所有的子进程（以所有子进程的 pid 组成的切片）作为 value。通过将 value 定义为 []int 类型或者其他类型的切片，就可以优雅的解决这个问题，示例代码如下所示：

```go
mp1 := make(map[int][]int)
mp2 := make(map[int]*[]int)
```

### 遍历map

map 的遍历过程使用 for range 循环完成，代码如下：

```go
scene := make(map[string]int)
scene["route"] = 66
scene["brazil"] = 4
scene["china"] = 960
for k, v := range scene {
    fmt.Println(k, v)
}
```

遍历对于Go语言的很多对象来说都是差不多的，直接使用 for range 语法即可，遍历时，可以同时获得键和值，如只遍历值，可以使用下面的形式：

```go
for _, v := range scene {
}
```

将不需要的键使用`_`改为匿名变量形式。

只遍历键时，使用下面的形式：

```go
for k := range scene {
}
```

无须将值改为匿名变量形式，忽略值即可。

> 注意：遍历输出元素的顺序与填充顺序无关，不能期望 map 在遍历时返回某种期望顺序的结果。

如果需要特定顺序的遍历结果，正确的做法是先排序，代码如下：

```go
scene := make(map[string]int)
// 准备map数据
scene["route"] = 66
scene["brazil"] = 4
scene["china"] = 960
// 声明一个切片保存map数据
var sceneList []string
// 将map数据遍历复制到切片中
for k := range scene {
    sceneList = append(sceneList, k)
}
// 对切片进行排序
sort.Strings(sceneList)
// 输出
fmt.Println(sceneList)
```

代码输出如下：

[brazil china route]

代码说明如下：

- 第 1 行，创建一个 map 实例，键为字符串，值为整型。
- 第 4～6 行，将 3 个键值对写入 map 中。
- 第 9 行，声明 sceneList 为字符串切片，以缓冲和排序 map 中的所有元素。
- 第 12 行，将 map 中元素的键遍历出来，并放入切片中。
- 第 17 行，对 sceneList 字符串切片进行排序，排序时，sceneList 会被修改。
- 第 20 行，输出排好序的 map 的键。