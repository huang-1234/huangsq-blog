# 基本语法

Go语言是静态类型语言，因此变量（variable）是有明确类型的，编译器也会检查变量类型的正确性。在数学概念中，变量表示没有固定值且可改变的数。但从计算机系统实现角度来看，变量是一段或多段用来存储数据的内存。

声明变量的一般形式是使用 var 关键字：
```go
var name type
```
其中，var 是声明变量的关键字，name 是变量名，type 是变量的类型。

需要注意的是，Go语言和许多编程语言不同，它在声明变量时将变量的类型放在变量的名称之后。这样做的好处就是可以避免像C语言中那样含糊不清的声明形式，例如：`int* a, b;` 。其中只有 a 是指针而 b 不是。如果你想要这两个变量都是指针，则需要将它们分开书写。而在 Go 中，则可以和轻松地将它们都声明为指针类型：

```go
var a, b *int
```
Go语言的基本类型有：
```go
- bool
- string
- int、int8、int16、int32、int64
- uint、uint8、uint16、uint32、uint64、uintptr
- byte // uint8 的别名
- rune // int32 的别名 代表一个 Unicode 码
- float32、float64
- complex64、complex128
```

当一个变量被声明之后，系统自动赋予它该类型的零值：int 为 0，float 为 0.0，bool 为 false，string 为空字符串，指针为 nil 等。所有的内存在 Go 中都是经过初始化的。

变量的命名规则遵循骆驼命名法，即首个单词小写，每个新单词的首字母大写，例如：numShips 和 startDate 。

Go语言的变量声明的标准格式为：

var 变量名 变量类型

变量声明以关键字 var 开头，后置变量类型，行尾无须分号。

## 批量格式

觉得每行都用 var 声明变量比较烦琐？没关系，还有一种为懒人提供的定义变量的方法：

```go
var (    
  a int    
  b string    
  c []float32    
  d func() bool    
  e struct {        
    x int    
  }
)
```

使用关键字 var 和括号，可以将一组变量定义放在一起。

## 简短格式

除 var 关键字外，还可使用更加简短的变量定义和初始化语法。

名字 := 表达式

需要注意的是，简短模式（short variable declaration）有以下限制：

- 定义变量，同时显式初始化。
- 不能提供数据类型。
- 只能用在函数内部。


和 var 形式声明语句一样，简短变量声明语句也可以用来声明和初始化一组变量：

i, j := 0, 1

下面通过一段代码来演示简短格式变量声明的基本样式。

```
func main() {   x:=100   a,s:=1, "abc"}
```

因为简洁和灵活的特点，简短变量声明被广泛用于大部分的局部变量的声明和初始化。var 形式的声明语句往往是用于需要显式指定变量类型地方，或者因为变量稍后会被重新赋值而初始值无关紧要的地方。

在声明变量时，自动对变量对应的内存区域进行初始化操作。每个变量会初始化其类型的默认值，例如：

- 整型和浮点型变量的默认值为 0 和 0.0。
- 字符串变量的默认值为空字符串。
- 布尔型变量默认为 bool。
- 切片、函数、指针变量的默认为 nil。


当然，依然可以在变量声明时赋予变量一个初始值。

### 回顾 C 语言

在C语言中，变量在声明时，并不会对变量对应内存区域进行清理操作。此时，变量值可能是完全不可预期的结果。开发者需要习惯在使用C语言进行声明时要初始化操作，稍有不慎，就会造成不可预知的后果。

在网络上只有程序员才能看懂的“烫烫烫”和“屯屯屯”的梗，就来源于 C/C++中变量默认不初始化。

微软的 VC 编译器会将未初始化的栈空间以 16 进制的 0xCC 填充，而未初始化的堆空间使用 0xCD 填充，而 0xCCCC 和 0xCDCD 在中文的 GB2312 编码中刚好对应“烫”和“屯”字。

因此，如果一个字符串没有结束符`\0`，直接输出的内存数据转换为字符串就刚好对应“烫烫烫”和“屯屯屯”。

## 定义字符串

可以使用双引号`""`来定义字符串，字符串中可以使用转义字符来实现换行、缩进等效果，常用的转义字符包括：

- \n：换行符
- \r：回车符
- \t：tab 键
- \u 或 \U：Unicode 字符
- \\\：反斜杠自身

```go
func main() {
    name,str := "hsq" ,"黄水清";
    fmt.Println(name,str); //hsq 黄水清
		namelen,strlen := len(name),len(str)
    fmt.Println(namelen,strlen); //3 9
}
```

定义字符串不能使用单引号`‘’`,编译通不过

另外我们发现英文字符长度为`1`,而中文一个字符的字符长度为`3`

一般的比较运算符（==、!=、<、<=、>=、>）是通过在内存中按字节比较来实现字符串比较的，因此比较的结果是字符串自然编码的顺序。字符串所占的字节长度可以通过函数 len() 来获取，例如 len(str)。

字符串的内容（纯字节）可以通过标准索引法来获取，在方括号`[ ]`内写入索引，索引从 0 开始计数：

- 字符串 str 的第 1 个字节：str[0]
- 第 i 个字节：str[i - 1]
- 最后 1 个字节：str[len(str)-1]


需要注意的是，这种转换方案只对纯 ASCII 码的字符串有效。

> 注意：获取字符串中某个字节的地址属于非法行为，例如 &str[i]。		

## 字符串拼接符“+”

两个字符串 s1 和 s2 可以通过 s := s1 + s2 拼接在一起。将 s2 追加到 s1 尾部并生成一个新的字符串 s。

```go
func main() {
    name,str := "hsq" ,"Beginning  " +
"second part ";
    fmt.Println(name,str); //hsq Beginning  second part 
		namelen,strlen := len(name),len(str)
    fmt.Println(namelen,strlen); //3 23
}
```

## 字符类型（byte和rune）

字符串中的每一个元素叫做“字符”，在遍历或者单个获取字符串元素时可以获得字符。

Go语言的字符有以下两种：

- 一种是 uint8 类型，或者叫 byte 型，代表了 ASCII 码的一个字符。
- 另一种是 rune 类型，代表一个 UTF-8 字符，当需要处理中文、日文或者其他复合字符时，则需要用到 rune 类型。rune 类型等价于 int32 类型。


byte 类型是 uint8 的别名，对于只占用 1 个字节的传统 ASCII 编码的字符来说，完全没有问题，例如 var ch byte = 'A'，字符使用单引号括起来。

> 比如：

```go
func main()  {
	var cbyte byte = 'a';
	var crune rune = 'a';
	fmt.Println(cbyte,crune)
	
	var ch int = '\u0041';
	var ch2 int = '\u03B2';
	var ch3 int = '\U00101234';
	fmt.Printf("%d - %d - %d\n", ch, ch2, ch3); // integer
	fmt.Printf("%c - %c - %c\n", ch, ch2, ch3); // character
	fmt.Printf("%X - %X - %X\n", ch, ch2, ch3); // UTF-8 bytes
	fmt.Printf("%U - %U - %U\n", ch, ch2, ch3);   // UTF-8 code point
	fmt.Printf("=============================================================\n");

	count := 128;
	for i := 32; i < count; i++ {
		if 1==(i-31)%5 {
			fmt.Printf("\n");
		}
		fmt.Printf("c:<%c> it's %d  ",i,i);
	}
}
```

> 输出：

```bash
$ go run "g:\Study\Code\Web\NodeJS\learnFrontTest\Go\goBase\lib\type.go"
97 97
65 - 946 - 1053236
A - β - 􁈴
41 - 3B2 - 101234
U+0041 - U+03B2 - U+101234
=============================================================
c:< > it's 32  c:<!> it's 33  c:<"> it's 34  c:<#> it's 35  c:<$> it's 36
c:<%> it's 37  c:<&> it's 38  c:<'> it's 39  c:<(> it's 40  c:<)> it's 41
c:<*> it's 42  c:<+> it's 43  c:<,> it's 44  c:<-> it's 45  c:<.> it's 46
c:</> it's 47  c:<0> it's 48  c:<1> it's 49  c:<2> it's 50  c:<3> it's 51
c:<4> it's 52  c:<5> it's 53  c:<6> it's 54  c:<7> it's 55  c:<8> it's 56
c:<9> it's 57  c:<:> it's 58  c:<;> it's 59  c:<<> it's 60  c:<=> it's 61
c:<>> it's 62  c:<?> it's 63  c:<@> it's 64  c:<A> it's 65  c:<B> it's 66
c:<C> it's 67  c:<D> it's 68  c:<E> it's 69  c:<F> it's 70  c:<G> it's 71
c:<H> it's 72  c:<I> it's 73  c:<J> it's 74  c:<K> it's 75  c:<L> it's 76
c:<M> it's 77  c:<N> it's 78  c:<O> it's 79  c:<P> it's 80  c:<Q> it's 81
c:<R> it's 82  c:<S> it's 83  c:<T> it's 84  c:<U> it's 85  c:<V> it's 86
c:<W> it's 87  c:<X> it's 88  c:<Y> it's 89  c:<Z> it's 90  c:<[> it's 91
c:<\> it's 92  c:<]> it's 93  c:<^> it's 94  c:<_> it's 95  c:<`> it's 96
c:<a> it's 97  c:<b> it's 98  c:<c> it's 99  c:<d> it's 100  c:<e> it's 101
c:<f> it's 102  c:<g> it's 103  c:<h> it's 104  c:<i> it's 105  c:<j> it's 106
c:<k> it's 107  c:<l> it's 108  c:<m> it's 109  c:<n> it's 110  c:<o> it's 111
c:<p> it's 112  c:<q> it's 113  c:<r> it's 114  c:<s> it's 115  c:<t> it's 116
c:<u> it's 117  c:<v> it's 118  c:<w> it's 119  c:<x> it's 120  c:<y> it's 121
c:<z> it's 122  c:<{> it's 123  c:<|> it's 124  c:<}> it's 125  c:<~> it's 126
c:<> it's 127
```

格式化说明符`%c`用于表示字符，当和字符配合使用时，`%v`或`%d`会输出用于表示该字符的整数，`%U`输出格式为 U+hhhh 的字符串。

Unicode 包中内置了一些用于测试字符的函数，这些函数的返回值都是一个布尔值，如下所示（其中 ch 代表字符）：

- 判断是否为字母：unicode.IsLetter(ch)
- 判断是否为数字：unicode.IsDigit(ch)
- 判断是否为空白符号：unicode.IsSpace(ch)

## UTF-8 和 Unicode 有何区别？

Unicode 与 ASCII 类似，都是一种字符集。

字符集为每个字符分配一个唯一的 ID，我们使用到的所有字符在 Unicode 字符集中都有一个唯一的 ID，例如上面例子中的 a 在 Unicode 与 ASCII 中的编码都是 97。汉字“你”在 Unicode 中的编码为 20320，在不同国家的字符集中，字符所对应的 ID 也会不同。而无论任何情况下，Unicode 中的字符的 ID 都是不会变化的。

UTF-8 是编码规则，将 Unicode 中字符的 ID 以某种方式进行编码，UTF-8 的是一种变长编码规则，从 1 到 4 个字节不等。编码规则如下：

- 0xxxxxx 表示文字符号 0～127，兼容 ASCII 字符集。
- 从 128 到 0x10ffff 表示其他字符。


根据这个规则，拉丁文语系的字符编码一般情况下每个字符占用一个字节，而中文每个字符占用 3 个字节。



> 不同类型之前的变量是不能隐式转换的





## 自定义类型

> 使用关键字type即可实现，除此之外，还拥有类型检查的功能

```go
func createStruct(){
	type (
		user struct{ 
			name string
			age int8
			place string
			// next user
		}
		event func(string) bool
	)

	var p2 = user{"hsq",18,"changsha"};
	fmt.Println("输出这个人的个人信息--：", p2);
	var fn1 event = func(s string) bool{
		println("输出函数fn1的params s--:",s);
		return ""!=s;
	}
	fn_result := fn1("hsq");
	println("fn_result--:", fn_result)
}

func main(){
	createStruct()
	/* $ go run "g:\Study\Code\Web\NodeJS\learnFrontTest\Go\goBase\refer\myselfType.go"
	输出这个人的个人信息--： {hsq 18 changsha}
	输出函数fn1的params s--: hsq
	fn_result--: true
	*/
}
```

