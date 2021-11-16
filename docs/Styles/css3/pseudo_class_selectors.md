# 伪元素和伪类选择器

## 伪类选择器

伪类选择器： 和一般的DOM中的元素样式不一样，它并不改变任何DOM内容。只是插入了一些修饰类的元素，这些元素对于用户来说是可见的，但是对于DOM来说不可见。伪类的效果可以通过添加一个实际的类来达到。

```css
  常用的伪类选择器是使用在a元素上的几种，`如a:link|a:visited|a:hover|a:active`
```

**提示：**在 CSS 定义中，`a:hover` 必须被置于 `a:link` 和 `a:visited` 之后，才是有效的。

**提示**：在 CSS 定义中，`a:active` 必须被置于 `a:hover` 之后，才是有效的。

伪类对元素进行分类是基于特征而不是它们的名字、属性或者内容。

由于状态是动态变化的，所以一个元素达到一个特定状态时，它可能得到一个伪类的样式；当状态改变时，它又会失去这个样式。由此可以看出，它的功能和class有些类似，但它是基于文档之外的抽象，所以叫伪类。

```css
:focus
伪类将应用于拥有键盘输入焦点的元素。
:first-child
伪类将应用于元素在页面中第一次出现的时候。
:lang
伪类将应用于元素带有指定lang的情况。
```

## 伪元素选择器

**伪元素选择器：**伪元素的效果是需要通过添加一个实际的元素才能达到的。

CSS中有如下四种伪元素选择器：

> ```css
>     `:first-line:`为某个元素的第一行文字使用样式；
>     `:first-letter:`为某个元素中的文字的首字母或第一个字使用样式；
>     `:before:`在某个元素之前插入一些内容；
>     `:after:` 在某个元素之后插入一些内容；
> ```

```css
  使用方法：选择器：伪元素{样式}
```

## 结构性伪类选择器

```maxima
 1.  四个最基本的：root、not、empty、target    

 2. first-child、last-child、nth-child、nth-last-child、               
nth-child(odd)、nth-child(even)、nth-last-child(odd)、nth-last-child(even) 

 3.  nth-of-type、nth-last-of-type    
 4. 循环使用样式  
 5. only-child
```

`:root()`选择器，从字面上我们就可以很清楚的理解是根选择器，他的意思就是匹配元素E所在文档的根元素。在HTML文档中，根元素始终是<html>。“`:root`”选择器等同于<html>元素

`:not()`选择器称为否定选择器，和jQuery中的`:not`选择器一模一样，可以选择除某个元素之外的所有元素。

`:empty()`选择器表示的就是空。用来选择没有任何内容的元素，这里没有内容指的是一点内容都没有，哪怕是一个空格。

`:target()`选择器来对页面某个target元素(该元素的id被当做页面中的超链接来使用)指定样式，该样式只在用户点击了页面中的超链接，并且跳转到target元素后起作用

`:first-child()`选择器表示的是选择父元素的第一个子元素的元素E。简单点理解就是选择元素中的第一个子元素，记住是子元素，而不是后代元素。

`:nth-child()`选择某个元素的一个或多个特定的子元素；
`:nth-last-child()`从某父元素的最后一个子元素开始计算，来选择特定的元素。

**看下面一个例子：**

```xml
    <style type="text/css"> 
        div p:nth-last-child(2){
            color:red;
        }
    </style>
</head>
<body>
    <div> 
        <p>前端</p>
        <p>开发</p>
        <p>工程</p>
        <p>软件</p>
        <p>工程</p>
    </div>
</body>
```

点击result查看demo：
[http://jsfiddle.net/trigkit/h...](http://jsfiddle.net/trigkit/hpwmghwe/)点击预览
`:nth-child()`可以选择某个的一个或多个特定的子元素，你可以按这种方式进行选择：

```scss
        :nth-child(length);/*参数是具体数字*/
        :nth-child(n);/*参数是n,n从0开始计算*/
        :nth-child(n*length)/*n的倍数选择，n从0开始算*/
        :nth-child(n+length);/*选择大于length后面的元素*/
        :nth-child(-n+length)/*选择小于length前面的元素*/
        :nth-child(n*length+1);/*表示隔几选一*/
        //上面length为整数
    
```

值得注意的是：nth-child(0)没有选择元素，nth-child(1)选择第一个元素。

```xml
    <style type="text/css"> 
            *{list-style:none;};
            .demo {
                width: 400px;
                padding: 10px;            
            }
            .demo li {
                padding: 5px;
                float: left;
                margin-right:4px;
            }
             .demo li a {
                float: left;
                display: block;
                height: 20px;
                line-height: 20px;
                width: 20px;
                -moz-border-radius: 10px;
                -webkit-border-radius: 10px;
                border-radius: 10px;
                text-align: center;
                background: #f36;
                color: white;
                text-decoration: none;
            }
            .demo li:nth-child(1){
                background:#01FEFE;
            }
            .demo li:nth-child(2n){
                background:#4679BD;
            }
             
    </style>
</head>
<body>
<div class="demo">
  <ul>
    <li class="one" id="first"><a href="">1</a></li>
    <li class="two"><a href="">2</a></li>
    <li class="three"><a href="">3</a></li>
    <li class="four"><a href="">4</a></li>
    <li class="five"><a href="">5</a></li>
    <li class="six"><a href="">6</a></li>
    <li class="seven"><a href="">7</a></li>
    <li class="eight"><a href="">8</a></li>
    <li class="nine"><a href="">9</a></li>
    <li class="ten" id="last"><a href="">10</a></li>
</ul>
</div>
```

点击下面的result查看demo：

http://jsfiddle.net/yk38105a/3/点击预览

“`:nth-of-type(n)`”选择器和“`:nth-child(n)`”选择器非常类似，不同的是它只计算父元素中指定的某种类型的子元素。当某个元素中的子元素不单单是同一种类型的子元素时，使用“`:nth-of-type(n)`”选择器来定位于父元素中某种类型的子元素是非常方便和有用的。

"`:only-child`"表示的是一个元素是它的父元素的唯一一个子元素。

## css3中的伪元素

CSS中的伪元素大家以前看过：`:first-line,:first-letter,:before,:after;`

那么在CSS3中，他对伪元素进行了一定的调整，在以前的基础上增加了一个“：”也就是现在变成了`::first-letter,::first-line,::before,::after`另外他还增加了一个`::selection`。

在css3中，已经明确规定了伪类用一个冒号来表示，而伪元素则用两个冒号来表示。

`::first-line`选择元素的第一行，比如说改变每个段落的第一行文本的样式，我们就可以使用这个

```css
p::first-line {font-weight:bold;}
```

`::before`和`::after`这两个主要用来给元素的前面或后面插入内容，这两个常用"content"配合使用，见过最多的就是清除浮动，

```css
            .clearfix:before,
            .clearfix:after {
                 content: ".";
                 display: block;
                 height: 0;
                 visibility: hidden;
              }
             .clearfix:after {clear: both;}
             .clearfix {zoom: 1;}
```

对于 IE8 及更早版本中的 `:before`，必须声明 `<!DOCTYPE>`。

`:before` 选择器在被选元素的内容前面插入内容。例如：

```css
<div>
    <h1>welcome</h1>
</div>

div:before{
    content:"hello world"
}
```

那么，被选元素是`div`，`div`的内容是`h1`，插入的内容就是`content`属性值“`hello world`”

`::selection`用来改变浏览网页选中文的默认效果

------

## UI状态元素伪类选择器

```less
E:checked ： {attribute}
```

匹配所有用户界面（form表单）中处于选中状态的元素E

```less
E:enabled ： {attribute}
```

匹配所有用户界面（form表单）中处于可用状态的E元素

```less
E:disabled ： {attribute}
```

匹配所有用户界面（form表单）中处于不可用状态的E元素

```less
E::selection ： {attribute}
```

匹配E元素中被用户选中或处于高亮状态的部分

------

## 目标伪类

```less
E:target ： {attribute}
```

匹配相关URL指向的E元素