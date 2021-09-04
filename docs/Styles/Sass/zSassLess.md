# three. sass和less

> 都是css的拓展语言，less和sass最主要的区别是less是通过Javascript编译，而sass是通过ruby编译的，如果没有引入前端工程化，less会消耗客户端性能，sass会消耗服务端性能，但是引入前端工程化的话，gunt，gulp，webpack等，less和sass在打包阶段都会转化成css，所以不会有区别，只是sass是基于ruby，所以每次npm的时候相对慢一点点

## CSS特性

CSS是一种标记性语言。如果没有calc()方法，CSS是不能进行真正意义上的计算的，更不提函数、变量这些了。早期网页开发还处于刀耕火种的时期，每一个样式都需要手写或复制，不能调用。有一个时期，“同一样式多处调用”的需求产生了“原子样式”的写法，类似于：

```css
.center {
  text-align: center;
}
```

## Less特性

Less是晚些产生的语言，基于JS进行开发，在Node中进行编译。所以使用时不需要安装其他语言，不过要记得先导入less文件，然后导入less.js。提供CDN地址在这里：

```xml
<script src="https://cdn.bootcss.com/less.js/3.0.4/less.js"></script>
<script src="https://cdn.bootcss.com/less.js/3.0.4/less.min.js"></script>
```

当然Less也提供服务器端的编译功能。
 基本语法：

- 1. 变量
      Sass: $var
      Less: @var
      两种语言都会有作用域的问题。一个变量只能在它被定义的代码块中使用。重复定义的变量会报错。

- 1. 运算赋值：

      只要保持单位统一或可相互转换，就可以进行运算，包括颜色在内：

>  Sass:

```swift
p {
  cursor: e + -resize;
}
// 编译为
// p {
//   cursor: e-resize; 
// }

body {
  margin: (14px/2);
  top: 50px + 100px;
  right: $var * 10%;
}
```

>  Less:

```dart
@base: 5%;
@filler: @base * 2;
@other: @base + @filler;

color: #888 / 4;
background-color: @base-color + #111;
height: 100% / 2 + @filler;

@var: 1px + 5;

width: (@var + 5) * 2;

border: (@width * 2) solid black;
```

1. 嵌套
    Sass和Less均允许元素嵌套。如果父子选择器均用逗号分开，那么编译时会按结合律拆开编译。
    Sass和Less指代上层元素均使用&符号。
2. 继承
    Sass中，写好的选择器进行集成，需要@extend关键字。
    Less中，直接写入即可：.be-extend-class;
3. Mixin
    Sass中，需要进行Mixin操作的选择器需要@mixin关键字，选择器后可以传入变量和默认值。

