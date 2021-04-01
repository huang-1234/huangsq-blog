(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{448:function(t,e,r){"use strict";r.r(e);var _=r(45),s=Object(_.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"sass用法指南"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#sass用法指南"}},[t._v("#")]),t._v(" SASS用法指南")]),t._v(" "),r("p",[t._v("作者： "),r("a",{attrs:{href:"http://www.ruanyifeng.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("阮一峰"),r("OutboundLink")],1)]),t._v(" "),r("p",[t._v("日期： "),r("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2012/06/",target:"_blank",rel:"noopener noreferrer"}},[t._v("2012年6月19日"),r("OutboundLink")],1)]),t._v(" "),r("p",[t._v("学过"),r("a",{attrs:{href:"http://zh.wikipedia.org/wiki/%E5%B1%82%E5%8F%A0%E6%A0%B7%E5%BC%8F%E8%A1%A8",target:"_blank",rel:"noopener noreferrer"}},[t._v("CSS"),r("OutboundLink")],1),t._v("的人都知道，它不是一种编程语言。")]),t._v(" "),r("p",[t._v("你可以用它开发网页样式，但是没法用它编程。也就是说，CSS基本上是设计师的工具，不是程序员的工具。在程序员眼里，CSS是一件很麻烦的东西。它没有变量，也没有条件语句，只是一行行单纯的描述，写起来相当费事。")]),t._v(" "),r("p",[t._v("很自然地，有人就开始为CSS加入编程元素，这被叫做"),r("a",{attrs:{href:"http://www.catswhocode.com/blog/8-css-preprocessors-to-speed-up-development-time",target:"_blank",rel:"noopener noreferrer"}},[t._v('"CSS预处理器"'),r("OutboundLink")],1),t._v("（css preprocessor）。它的基本思想是，用一种专门的编程语言，进行网页样式设计，然后再编译成正常的CSS文件。")]),t._v(" "),r("p",[t._v('各种"CSS预处理器"之中，我自己最喜欢'),r("a",{attrs:{href:"http://sass-lang.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("SASS"),r("OutboundLink")],1),t._v("，觉得它有很多优点，打算以后都用它来写CSS。下面是我整理的用法总结，供自己开发时参考，相信对其他人也有用。")]),t._v(" "),r("h2",{attrs:{id:"一、什么是sass"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#一、什么是sass"}},[t._v("#")]),t._v(" 一、什么是SASS")]),t._v(" "),r("p",[r("a",{attrs:{href:"http://sass-lang.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("SASS"),r("OutboundLink")],1),t._v("是一种CSS的开发工具，提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发，变得简单和可维护。")]),t._v(" "),r("p",[t._v("本文总结了SASS的主要用法。我的目标是，有了这篇文章，日常的一般使用就不需要去看"),r("a",{attrs:{href:"http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),r("OutboundLink")],1),t._v("了。")]),t._v(" "),r("h2",{attrs:{id:"二、安装和使用"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#二、安装和使用"}},[t._v("#")]),t._v(" 二、安装和使用")]),t._v(" "),r("h2",{attrs:{id:"_2-1-安装"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-安装"}},[t._v("#")]),t._v(" 2.1 安装")]),t._v(" "),r("p",[t._v("SASS是Ruby语言写的，但是两者的语法没有关系。不懂Ruby，照样使用。只是必须先"),r("a",{attrs:{href:"http://www.ruby-lang.org/zh_cn/downloads/",target:"_blank",rel:"noopener noreferrer"}},[t._v("安装Ruby"),r("OutboundLink")],1),t._v("，然后再安装SASS。")]),t._v(" "),r("p",[t._v("假定你已经安装好了Ruby，接着在命令行输入下面的命令：")]),t._v(" "),r("blockquote",[r("p",[t._v("gem install sass")])]),t._v(" "),r("p",[t._v("然后，就可以使用了。")]),t._v(" "),r("h2",{attrs:{id:"_2-2-使用"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-使用"}},[t._v("#")]),t._v(" 2.2 使用")]),t._v(" "),r("p",[t._v("SASS文件就是普通的文本文件，里面可以直接使用CSS语法。文件后缀名是.scss，意思为Sassy CSS。")]),t._v(" "),r("p",[t._v("下面的命令，可以在屏幕上显示.scss文件转化的css代码。（假设文件名为test。）")]),t._v(" "),r("blockquote",[r("p",[t._v("sass test.scss")])]),t._v(" "),r("p",[t._v("如果要将显示结果保存成文件，后面再跟一个.css文件名。")]),t._v(" "),r("blockquote",[r("p",[t._v("sass test.scss test.css")])]),t._v(" "),r("p",[t._v("SASS提供四个"),r("a",{attrs:{href:"http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#output_style",target:"_blank",rel:"noopener noreferrer"}},[t._v("编译风格"),r("OutboundLink")],1),t._v("的选项：")]),t._v(" "),r("blockquote",[r("p",[t._v("* nested：嵌套缩进的css代码，它是默认值。")]),t._v(" "),r("p",[t._v("* expanded：没有缩进的、扩展的css代码。")]),t._v(" "),r("p",[t._v("* compact：简洁格式的css代码。")]),t._v(" "),r("p",[t._v("* compressed：压缩后的css代码。")])]),t._v(" "),r("p",[t._v("生产环境当中，一般使用最后一个选项。")]),t._v(" "),r("blockquote",[r("p",[t._v("sass --style compressed test.sass test.css")])]),t._v(" "),r("p",[t._v("你也可以让SASS监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本。")]),t._v(" "),r("blockquote",[r("p",[t._v("// watch a file")]),t._v(" "),r("p",[t._v("sass --watch input.scss:output.css")]),t._v(" "),r("p",[t._v("// watch a directory")]),t._v(" "),r("p",[t._v("sass --watch app/sass:public/stylesheets")])]),t._v(" "),r("p",[t._v("SASS的官方网站，提供了一个"),r("a",{attrs:{href:"http://sass-lang.com/try.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("在线转换器"),r("OutboundLink")],1),t._v("。你可以在那里，试运行下面的各种例子。")]),t._v(" "),r("h2",{attrs:{id:"三、基本用法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#三、基本用法"}},[t._v("#")]),t._v(" 三、基本用法")]),t._v(" "),r("h2",{attrs:{id:"_3-1-变量"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-变量"}},[t._v("#")]),t._v(" 3.1 变量")]),t._v(" "),r("p",[t._v("SASS允许使用变量，所有变量以$开头。")]),t._v(" "),r("blockquote",[r("p",[t._v("$blue : #1875e7;")]),t._v(" "),r("p",[t._v("div {\n　　　color : $blue;\n　　}")])]),t._v(" "),r("p",[t._v("如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。")]),t._v(" "),r("blockquote",[r("p",[t._v("$side : left;")]),t._v(" "),r("p",[t._v(".rounded {\n　　　　border-#{$side}-radius: 5px;\n　　}")])]),t._v(" "),r("h2",{attrs:{id:"_3-2-计算功能"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-计算功能"}},[t._v("#")]),t._v(" 3.2 计算功能")]),t._v(" "),r("p",[t._v("SASS允许在代码中使用算式：")]),t._v(" "),r("blockquote",[r("p",[t._v("body {\n　　　　margin: (14px/2);\n　　　　top: 50px + 100px;\n　　　　right: $var * 10%;\n　　}")])]),t._v(" "),r("h2",{attrs:{id:"_3-3-嵌套"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-嵌套"}},[t._v("#")]),t._v(" 3.3 嵌套")]),t._v(" "),r("p",[t._v("SASS允许选择器嵌套。比如，下面的CSS代码：")]),t._v(" "),r("blockquote",[r("p",[t._v("div h1 {\n　　　　color : red;\n　　}")])]),t._v(" "),r("p",[t._v("可以写成：")]),t._v(" "),r("blockquote",[r("p",[t._v("div {\n　　　　hi {\n　　　　　　color:red;\n　　　　}\n　　}")])]),t._v(" "),r("p",[t._v("属性也可以嵌套，比如border-color属性，可以写成：")]),t._v(" "),r("blockquote",[r("p",[t._v("p {\n　　　　border: {\n　　　　　　color: red;\n　　　　}\n　　}")])]),t._v(" "),r("p",[t._v("注意，border后面必须加上冒号。")]),t._v(" "),r("p",[t._v("在嵌套的代码块内，可以使用&引用父元素。比如a:hover伪类，可以写成：")]),t._v(" "),r("blockquote",[r("p",[t._v("a {\n　　　　&:hover { color: #ffb3ff; }\n　　}")])]),t._v(" "),r("h2",{attrs:{id:"_3-4-注释"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-注释"}},[t._v("#")]),t._v(" 3.4 注释")]),t._v(" "),r("p",[t._v("SASS共有两种注释风格。")]),t._v(" "),r("p",[t._v("标准的CSS注释 /* comment */ ，会保留到编译后的文件。")]),t._v(" "),r("p",[t._v("单行注释 // comment，只保留在SASS源文件中，编译后被省略。")]),t._v(" "),r("p",[t._v('在/*后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。')]),t._v(" "),r("blockquote",[r("p",[t._v("/*!\n　　　　重要注释！\n　　*/")])]),t._v(" "),r("h2",{attrs:{id:"四、代码的重用"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#四、代码的重用"}},[t._v("#")]),t._v(" 四、代码的重用")]),t._v(" "),r("h2",{attrs:{id:"_4-1-继承"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-继承"}},[t._v("#")]),t._v(" 4.1 继承")]),t._v(" "),r("p",[t._v("SASS允许一个选择器，继承另一个选择器。比如，现有class1：")]),t._v(" "),r("blockquote",[r("p",[t._v(".class1 {\n　　　　border: 1px solid #ddd;\n　　}")])]),t._v(" "),r("p",[t._v("class2要继承class1，就要使用@extend命令：")]),t._v(" "),r("blockquote",[r("p",[t._v(".class2 {\n　　　　@extend .class1;\n　　　　font-size:120%;\n　　}")])]),t._v(" "),r("h2",{attrs:{id:"_4-2-mixin"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-mixin"}},[t._v("#")]),t._v(" 4.2 Mixin")]),t._v(" "),r("p",[t._v("Mixin有点像C语言的宏（macro），是可以重用的代码块。")]),t._v(" "),r("p",[t._v("使用@mixin命令，定义一个代码块。")]),t._v(" "),r("blockquote",[r("p",[t._v("@mixin left {\n　　　　float: left;\n　　　　margin-left: 10px;\n　　}")])]),t._v(" "),r("p",[t._v("使用@include命令，调用这个mixin。")]),t._v(" "),r("blockquote",[r("p",[t._v("div {\n　　　　@include left;\n　　}")])]),t._v(" "),r("p",[t._v("mixin的强大之处，在于可以指定参数和缺省值。")]),t._v(" "),r("blockquote",[r("p",[t._v("@mixin left($value: 10px) {\n　　　　float: left;\n　　　　margin-right: $value;\n　　}")])]),t._v(" "),r("p",[t._v("使用的时候，根据需要加入参数：")]),t._v(" "),r("blockquote",[r("p",[t._v("div {\n　　　　@include left(20px);\n　　}")])]),t._v(" "),r("p",[t._v("下面是一个mixin的实例，用来生成浏览器前缀。")]),t._v(" "),r("blockquote",[r("p",[t._v("@mixin rounded($vert, $horz, $radius: 10px) {\n　　　　border-#{$vert}-#{$horz}-radius: $radius;\n　　　　-moz-border-radius-#{$vert}#{$horz}: $radius;\n　　　　-webkit-border-#{$vert}-#{$horz}-radius: $radius;\n　　}")])]),t._v(" "),r("p",[t._v("使用的时候，可以像下面这样调用：")]),t._v(" "),r("blockquote",[r("p",[t._v("#navbar li { @include rounded(top, left); }")]),t._v(" "),r("p",[t._v("#footer { @include rounded(top, left, 5px); }")])]),t._v(" "),r("h2",{attrs:{id:"_4-3-颜色函数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-颜色函数"}},[t._v("#")]),t._v(" 4.3 颜色函数")]),t._v(" "),r("p",[t._v("SASS提供了一些内置的颜色函数，以便生成系列颜色。")]),t._v(" "),r("blockquote",[r("p",[t._v("lighten(#cc3, 10%) // #d6d65c\n　　darken(#cc3, 10%) // #a3a329\n　　grayscale(#cc3) // #808080\n　　complement(#cc3) // #33c")])]),t._v(" "),r("h2",{attrs:{id:"_4-4-插入文件"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-4-插入文件"}},[t._v("#")]),t._v(" 4.4 插入文件")]),t._v(" "),r("p",[t._v("@import命令，用来插入外部文件。")]),t._v(" "),r("blockquote",[r("p",[t._v('@import "path/filename.scss";')])]),t._v(" "),r("p",[t._v("如果插入的是.css文件，则等同于css的import命令。")]),t._v(" "),r("blockquote",[r("p",[t._v('@import "foo.css";')])]),t._v(" "),r("h2",{attrs:{id:"五、高级用法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#五、高级用法"}},[t._v("#")]),t._v(" 五、高级用法")]),t._v(" "),r("h2",{attrs:{id:"_5-1-条件语句"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-条件语句"}},[t._v("#")]),t._v(" 5.1 条件语句")]),t._v(" "),r("p",[t._v("@if可以用来判断：")]),t._v(" "),r("blockquote",[r("p",[t._v("p {\n　　　　@if 1 + 1 == 2 { border: 1px solid; }\n　　　　@if 5 < 3 { border: 2px dotted; }\n　　}")])]),t._v(" "),r("p",[t._v("配套的还有@else命令：")]),t._v(" "),r("blockquote",[r("p",[t._v("@if lightness($color) > 30% {\n　　　　background-color: #000;\n　　} @else {\n　　　　background-color: #fff;\n　　}")])]),t._v(" "),r("h2",{attrs:{id:"_5-2-循环语句"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-循环语句"}},[t._v("#")]),t._v(" 5.2 循环语句")]),t._v(" "),r("p",[t._v("SASS支持for循环：")]),t._v(" "),r("blockquote",[r("p",[t._v("@for $i from 1 to 10 {\n　　　　.border-#{$i} {\n　　　　　　border: #{$i}px solid blue;\n　　　　}\n　　}")])]),t._v(" "),r("p",[t._v("也支持while循环：")]),t._v(" "),r("blockquote",[r("p",[t._v("$i: 6;")]),t._v(" "),r("p",[t._v("@while $i > 0 {\n　　　　.item-#{$i} { width: 2em * $i; }\n　　　　$i: $i - 2;\n　　}")])]),t._v(" "),r("p",[t._v("each命令，作用与for类似：")]),t._v(" "),r("blockquote",[r("p",[t._v('@each $member in a, b, c, d {\n　　　　.#{$member} {\n　　　　　　background-image: url("/image/#{$member}.jpg");\n　　　　}\n　　}')])]),t._v(" "),r("h2",{attrs:{id:"_5-3-自定义函数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-自定义函数"}},[t._v("#")]),t._v(" 5.3 自定义函数")]),t._v(" "),r("p",[t._v("SASS允许用户编写自己的函数。")]),t._v(" "),r("blockquote",[r("p",[t._v("@function double($n) {\n　　　　@return $n * 2;\n　　}")]),t._v(" "),r("p",[t._v("#sidebar {\n　　　　width: double(5px);\n　　}")])])])}),[],!1,null,null,null);e.default=s.exports}}]);