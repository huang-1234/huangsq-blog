# 字符串

### go 数据类型rune的使用与理解

我们知道golang的数据类型有布尔型，字符串型，数字类型，派生类型。rune它属于数字类型，类似in32。 官方解释：

> // rune is an alias for int32 and is equivalent to int32 in all ways. It is // used, by convention, to distinguish character values from integer values. type rune = int32 翻译成中文：rune是int32的别名，在所有方面都等同于int32。它是按惯例，用于区分字符值和整数值。

看了官解我还没有了解其真正含义，rune一般用在哪？现在我通过2个例子来讲一下rune的使用。

### 举例说明

#### 例子1：字符串截取

如我们要指定截取字符串的长度，因为golang的string底层就是一个byte数组，我们直接取数组的前N个即可完成这个需求

```go
//要求截取前4个字符串，最后是"xs25"
var str = "xs25.cn"
fmt.Println(str[:4])
//运行后的结果：xs25
```

但这个如果在字符串中存在中文会不会有问题呢，我们以“小手25是什么”这个字符串为例来做个实验。

```go
//要求截取前4个字符串，最后是"小手25"
var str = "小手25是什么"
fmt.Println(str[:4])
//结果： 小�
```

运行后我们发现出现了乱码。为什么会出现乱码呢？正如我们所说golang的string底层是一个byte数组实现，中文字符串在unicode下占2个字节，在utf-8下占3个字节。我们golang默认编码是utf-8，所以是占用3个字节。通过len(str)可以证明一共数组长度是17，每个中文占用3个字节。

```go
var str = "小手25是什么"
fmt.Println(len(str)) //17
fmt.Println(str[:8]) //”小手25“共占8个字节
//结果：小手25
```

我们来一个取巧的方式行进字符串截取，即然字符串可以[]bype(str) 这样的方法转换，那我们也可以使用 []rune(str)这样的方式转换成一个切片，转换后我们取切片的前几个不就可以了吗。

```go
var str = "小手25是什么"
s:=[]rune(str)
fmt.Println(len(s)) //长度只有 7，每字汉字当一个字节
fmt.Println(string(s[:4])) //取前4个，取出后转成string
//结果：小手25
```

#### 例子2：在N个字符串找到找没有重复字符，且字符串总长度最长的那个

```go
ss := []string{
"ado",
"duzhenxun",
"小手25是什么",
"来个长点的字符串，微信号5552123",
}

maxLenStr := ""
for i := 0; i < len(ss); i++ {
    var repeat bool
    tmpArr := map[int32]int{}
    for k, v := range []rune(ss[i]) {
        if tmpArr[v] != 0 && len(tmpArr) > 0 {
            repeat = true //有重复
            break
        }
        tmpArr[v] = k
    }
    //没有重复找最长的
    if !repeat && len(ss[i])>len(maxLenStr){
        maxLenStr = ss[i]
    }
}
fmt.Println("无重复最长的是：",maxLenStr)

//结果：小手25是什么
```

### 知识扩展

在golang中的unicode/utf88包里提供了许多rune相关的方法自己可以多多尝试一下

### 总结

即然开头我们说过 rune是int32的别名，在所有方面都等同于int32，那在上面的2个例子中。我们把rune改为int32也是一样效果 。

```go
var str = "小手25是什么"
s:=[]int32(str)
fmt.Println(len(s)) //长度只有 7
fmt.Println(string(s[:4])) //取前4个，取出后转成string
//结果：小手25
```

现在你是不是对golang的rune有了一定的了解！其实你常用的byte其实是uint8的别名，这也是官方的解释

> // byte is an alias for uint8 and is equivalent to uint8 in all ways. It is // used, by convention, to distinguish byte values from 8-bit unsigned // integer values. type byte = uint8

