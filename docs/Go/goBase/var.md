# Go的变量



## golang中“var”与“:=”的区别

Go语言里面定义变量有多种方式。

使用var关键字是Go最基本的定义变量方式，有时也会使用到:=来定义变量。

定义变量
```go
// 定义一个名称为“variableName”，类型为"type"的变量

// var variableName type

var number int
```

定义变量并初始化值
```go
// 初始化“variableName”的变量为“value”值，类型是“type”
// var variableName type = value
var number int = 10
```
同时初始化多个变量，又叫平行赋值

/*
  定义三个类型都是"type"的变量,并且分别初始化为相应的值
  vname1为v1，vname2为v2，vname3为v3
*/
```go
// var vname1, vname2, vname3 type = v1, v2, v3
var number1, number2, number3 int = 1, 2, 3
```
你是不是觉得上面这样的定义有点繁琐？没关系，因为Go语言的设计者也发现了，有一种写法可以让它变得简单一点。我们可以直接忽略类型声明，那么上面的代码变成这样了：

/* 
定义三个变量，它们分别初始化为相应的值  
vname1为v1，vname2为v2，vname3为v3  
然后Go会根据其相应值的类型来帮你初始化它们
*/
```go
// var vname1, vname2, vname3 = v1, v2, v3
var number1, number2, number3 = 1, 2, 3
```
你觉得上面的还是有些繁琐？好吧，我也觉得。让我们继续简化：

/* 
定义三个变量，它们分别初始化为相应的值  
vname1为v1，vname2为v2，vname3为v3  
编译器会根据初始化的值自动推导出相应的类型*/
```go
// vname1, vname2, vname3 := v1, v2, v3
number1, number2, number3 := 1, 2, 3
```
现在是不是看上去非常简洁了？:=这个符号直接取代了var和type,这种形式叫做简短声明。不过它有一个限制，那就是它只能用在函数内部；在函数外部使用则会无法编译通过，所以一般用var方式来定义全局变量。

> 换句话说，“:=”只能在声明“局部变量”的时候使用，而“var”没有这个限制。