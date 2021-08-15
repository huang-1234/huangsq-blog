# CSS中的继承属性与非继承属性



发表于 2016-06-06



当我们参考CSS规范时，就会发现每个属性中都指出了 **Inherited**的值，即是否可继承。这决定了当你还没有为元素的属性指定值时该如何计算值。今天我们就大概的说说CSS中的继承属性与非继承属性。



##### 继承属性(inherited property)

当元素的一个继承属性没有指定值时，则取父元素的同属性的计算值。只有文档根元素取该属性的概述中给定的初始值。下面我们举一个简单的例子:

**典型例子: `color`属性**

```
p{ color: orange;}
```

HTML:

```
<p> I am a <em>smile</em> girl. </p>
```

这里你就会发现 “smile” 文本将呈现橙色，原因是`em`元素继承了`p`元素的`color`属性的值。

###### 常见的继承属性

那么，有哪些我们常见的继承属性呢？这里我给大家例举一下:

- border-collapse
- border-spacing
- caption-side
- color
- cursor
- direction
- font (其中包括 `font-family` , `font-size` , `font-weight` , `font-style`)
- letter-spacing
- line-height
- list-style (其中包括 `list-style-image` , `list-style-position` , `list-style-type`)
- text-align
- text-indent
- text-transform
- visibility
- white-space
- word-spacing

大家有没有发现一些字体呀，文本呀，颜色等的设置都是可继承属性 ~

[参考地址](https://www.w3.org/TR/CSS21/propidx.html)

##### 非继承属性(reset property)

当元素的一个非继承属性没有指定值时，则取属性的初始值。

**典型例子: `border`属性**

```
p { border: medium solid }
```

HTML:

```
<p> I am a <em>smile</em> girl. </p>
```

这时你就会发现文本 “smile” 没有边框，原因是`border`属性为不可继承属性，其初始值为`none`。

###### 常见的非继承属性

这里例举几个常见的非继承属性:

- z-index
- width (其中包括 `min-width` , `max-width`)
- dispaly
- float
- clear
- vertical-align
- unicode-bidi
- position
- top
- bottom
- left
- right
- text-decoration
- background (其中包括 `background-color` , `background-image` , `background-position` , `background-attachment` , `background-repeat`)
- border (其中包括 `border-color` , `border-style` , `border-width` , `border-spacing` and so on)
- padding (其中包括 `padding-left` , `padding-right` , `padding-top` , `padding-bottom`)
- margin (其中包括 `margin-left` , `margin-right` , `margin-top` , `margin-bottom`)
- outline (其中包括 `outline-color` , `outline-style` , `outline-width`)
- clip
- content

非继承属性大部分都是一些和定位呀，浮动呀，盒子模型呀等有关 ~

[参考地址](https://www.w3.org/TR/CSS21/propidx.html)

##### 小结

这些属性都是大家平时使用时常见的，了解了其继承性会对你的使用更加有帮助，会让你的布局更加得心应手 ~ ~ 大家也记得经常进行知识的总结呀 ~



> 发布于 2019-03-06

## **CSS哪些属性可以继承哪些不可继承**

**可继承属性：**
1.字体系列属性
font:组合字体
font-family:规定元素的字体系列
font-weight:设置字体的粗细
font-size:设置字体的尺寸
font-style:定义字体的风格
font-variant:偏大或偏小的字体
2.文本系列属性
text-indent:文本缩进
text-align:文本水平对刘
line-height:行高
word-spacing:增加或减少单词间的空白
letter-spacing：增加或减少字符间的空白
text-transform:控制文本大小写
direction:规定文本的书写方向
color:文本颜色
3.元素可见性
visibility
4.表格布局属性
caption-side定位表格标题位置
border-collapse合并表格边框
border-spacing设置相邻单元格的边框间的距离
empty-cells单元格的边框的出现与消失
table-layout表格的宽度由什么决定<automatic.fixed.inherit>
5.列表布局属性
list-style-type文字前面的小点点样式
list-style-position小点点位置
list-style以上的属性可通过这属性集合
6.引用
quotes设置嵌套引用的引号类型
7.光标属性
cursor:箭头可以变成需要的形状

**不可继承属性**
1.displey
2.文本属性
vertical-align:垂直文本对齐
text-decoration:规定添加到文本的装饰
text-shadow:文本阴影效果
white-space:空白符的处理
3.盒子模型属性
width、height、margin 、margin-top、margin-right、margin-bottom、margin-left、border、border-style、border-top-style、border-right-style、border-bottom-style、border-left-style、border-width、border-top-width、border-right-right、border-bottom-width、border-left-width、border-color、border-top-color、border-right-color、border-bottom-color、border-left-color、border-top、border-right、border-bottom、border-left、padding、padding-top、padding-right、padding-bottom、padding-left
4.背景属性
background、background-color、background-image、background-repeat、background-position、background-attachment
5.定位属性
float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index

## **CSS优先级算法**

1.原则
使用就近原则，同权重情况下样式定义最近者为准
载入样式以最后载入的定位为准

2.优先级
同权重下：
内联样式(标签内部) > 嵌入样式表(当前文件中) > 外部样式表(外部文件中)
！import > id > class >tag
备注：important比内联优先级高

## **作者有话说**

亲爱的读者：
每日两道前端面试题专栏目此后不再以此为标题.
关于日期会写在文章的最后.嘻嘻
每日两道前端面试题20190306