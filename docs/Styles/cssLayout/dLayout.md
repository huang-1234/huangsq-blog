# 3. Flex布局方式

## 布局

我们首先对布局方式分个类：

- 普通布局：`display:block/inline`
- 浮动布局：`float:left/right`
- 定位布局：`position:relative/absolute/fixed`、`left/right/top/bottom/z-index`
- 表格布局：`table系列属性`
- 弹性布局：`display:flex/inline-flex`、`flex系列属性`
- 多列布局：`column系列属性`
- 格栅布局：`display:grid/inline-grid`、`grid系列属性`
- 响应式布局：`em/rem/vw/vh/vmin/vmax`、`媒体查询`

网络中大部分都是采用的**浮动布局**、**定位布局**和**弹性布局**。（后面会专门介绍弹性布局）

## 清除浮动

在各种经典布局方式中，可能会结合`浮动布局`相关属性。使用`float`会使节点脱流导致父节点高度坍塌，若不对父节点显式声明高度则很有必要给父节点清除浮动。定义以下`clearfix`用于清除浮动，给父节点添加即可。值得注意，`clearfix`已占用`::after`，所以使用`clearfix`的父节点就不能再声明`::after`了，可改用`::before`。

```css
.clearfix::after {
 display: block;
 visibility: hidden;
 clear: both;
 height: 0;
 font-size: 0;
 content: "";
}
```

详情可见[Clearfix (opens new window)](https://stackoverflow.com/questions/211383/what-methods-of-clearfix-can-i-use)。之后再填这个坑。

## 一、Flex 布局是什么？

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局。

 ```css
 .box{
 display: flex;
 }
 ```

行内元素也可以使用 Flex 布局。

 ```css
 .box{
 display: inline-flex;
 }
 ```

Webkit 内核的浏览器，必须加上`-webkit`前缀。

 ```css
 .box{
 display: -webkit-flex; /* Safari */
 display: flex;
 }
 ```

注意，设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

## 二、基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

<img :src="$withBase('/images/CSS/Layout.assets/flex-container.png')" alt="mixureSecure">

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

## 三、容器的属性

以下6个属性设置在容器上。

 - flex-direction
 - flex-wrap
 - flex-flow
 - justify-content
 - align-items
 - align-content

## 3.1 flex-direction属性

`flex-direction`属性决定主轴的方向（即项目的排列方向）。

 ```css
 .box {
 flex-direction: row | row-reverse | column | column-reverse;
 }
 ```

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071005.png')" alt="mixureSecure">

它可能有4个值。

 - `row`（默认值）：主轴为水平方向，起点在左端。
 - `row-reverse`：主轴为水平方向，起点在右端。
 - `column`：主轴为垂直方向，起点在上沿。
 - `column-reverse`：主轴为垂直方向，起点在下沿。

## 3.2 flex-wrap属性

默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071006.png')" alt="mixureSecure">

 ```css
 .box{
 flex-wrap: nowrap | wrap | wrap-reverse;
 }
 ```

它可能取三个值。

（1）`nowrap`（默认）：不换行。

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071007.png')" alt="mixureSecure">

（2）`wrap`：换行，第一行在上方。

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071008.jpg')" alt="mixureSecure">

（3）`wrap-reverse`：换行，第一行在下方。

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071009.jpg')" alt="mixureSecure">

## 3.3 flex-flow

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

 ```css
 .box {
 flex-flow: <flex-direction || <flex-wrap;
 }
 ```

## 3.4 justify-content属性

`justify-content`属性定义了项目在主轴上的对齐方式。

 ```css
 .box {
 justify-content: flex-start | flex-end | center | space-between | space-around;
 }
 ```

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071010.png')" alt="mixureSecure">

它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

 - `flex-start`（默认值）：左对齐

 - `flex-end`：右对齐

 - `center`： 居中

 - `space-between`：两端对齐，项目之间的间隔都相等。

 - `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。



## 3.5 align-items属性

`align-items`属性定义项目在交叉轴上如何对齐。

 ```css
 .box {
 align-items: flex-start | flex-end | center | baseline | stretch;
 }
 ```

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071011.png')" alt="mixureSecure">

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

 - `flex-start`：交叉轴的起点对齐。
 - `flex-end`：交叉轴的终点对齐。
 - `center`：交叉轴的中点对齐。
 - `baseline`: 项目的第一行文字的基线对齐。
 - `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

5.2举例子：

html部分：

```html
  <div class="container"
    <!-- 五个小盒子 --
    <div class="litterBox" id="box1"</div
    <div class="litterBox" id="box2"</div
    <div class="litterBox" id="box3"</div
    <div class="litterBox" id="box4"</div
  </div
```

css：

```css
* {
  // margin: 10px;
}

.container {
  width: 90vw;
  height: 100vh;
  display: flex;
  background-color: aquamarine;
  flex-grow: 0;
  flex-wrap: nowrap;
  // flex-direction: row | row-reverse | column | column-reverse; /* 默认值为row */
  flex-direction: row;
  /* 4.justify-content属性定义了项目在主轴上的对齐方式。
  justify-content: flex-start | flex-end | center | space-between | space-around; */
  justify-content: space-around;
  /* 5.align-items属性定义项目在交叉轴上如何对齐。
  align-items: flex-start | flex-end | center | baseline | stretch; */
  align-items: center;
  /* 6.align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
*/

  .litterBox {
 width: 150px;
 height: 50px;
 background-color: pink;
 flex-shrink: 0;
 border: 1px solid;
  }

  #box1 {
 background-color: aqua;
  }

  #box2 {
 background-color: brown;
  }

  #box3 {
 background-color: blue;
  }

  #box4 {
 background-color: chartreuse;
  }
}
```

显示内容：

<img :src="$withBase('/images/CSS/Layout.assets/image-20210309195655398.png')" alt="mixureSecure">

## 3.6 align-content属性

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

 ```css
 .box {
 align-content: flex-start | flex-end | center | space-between | space-around | stretch;
 }
 ```

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071012.png')" alt="mixureSecure">

该属性可能取6个值。

 - `flex-start`：与交叉轴的起点对齐。
 - `flex-end`：与交叉轴的终点对齐。
 - `center`：与交叉轴的中点对齐。
 - `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
 - `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
 - `stretch`（默认值）：轴线占满整个交叉轴。

## 四、项目的属性

以下6个属性设置在项目上。

 - `order`
 - `flex-grow`
 - `flex-shrink`
 - `flex-basis`
 - `flex`
 - `align-self`

## 4.1 order属性

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

 ```css
 .item {
 order: <integer;
 }
 ```

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071013.png')" alt="mixureSecure">

## 4.2 flex-grow属性

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

 ```css
 .item {
 flex-grow: <number; /* default 0 */
 }
 ```

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071014.png')" alt="mixureSecure">

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

## 4.3 flex-shrink属性

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

 ```css
 .item {
 flex-shrink: <number; /* default 1 */
 }
 ```

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071015.jpg')" alt="mixureSecure">

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

## 4.4 flex-basis属性

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

 ```css
 .item {
 flex-basis: <length | auto; /* default auto */
 }
 ```

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

## 4.5 flex属性

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

 ```css
 .item {
 flex: none | [ <'flex-grow' <'flex-shrink'? || <'flex-basis' ]
 }
 ```

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

## 4.6 align-self属性

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

 ```css
 .item {
 align-self: auto | flex-start | flex-end | center | baseline | stretch;
 }
 ```

<img :src="$withBase('/images/CSS/Layout.assets/bg2015071016.png')" alt="mixureSecure">

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

# 常用的布局

## 一、空间居中布局

空间居中布局指的是，不管容器的大小，项目总是占据中心点。

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080703.jpg')" alt="mixureSecure">

css代码：

```css
.container {
 display: grid;
 place-items: center;
} 
12345
```

上面代码需要写在容器上，指定为 Grid 布局。核心代码是`place-items`属性那一行，它是一个简写形式。

css代码：

place-items: <align-items <justify-items

`align-items`属性控制垂直位置，`justify-items`属性控制水平位置。这两个属性的值一致时，就可以合并写成一个值。所以，`place-items: center;`等同于`place-items: center center;`。

同理，左上角布局可以写成下面这样。

 ```css
 place-items: start;
 ```

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080704.jpg')" alt="mixureSecure">

右下角布局。

 ```css
 place-items: end;
 ```

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080705.jpg')" alt="mixureSecure">

## 二、并列式布局

并列式布局就是多个项目并列。

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080706.jpg')" alt="mixureSecure">

如果宽度不够，放不下的项目就自动折行。

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080707.jpg')" alt="mixureSecure">

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080708.jpg')" alt="mixureSecure">

它的实现也很简单。首先，容器设置成 Flex 布局，内容居中（`justify-content`）可换行（`flex-wrap`）。

 ```css
 .container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
 }
 ```

然后，项目上面只用一行`flex`属性就够了（[CodePen 示例](https://codepen.io/una/pen/WNQdBza)）。

 ```css
 .item{
 flex: 0 1 150px;
 margin: 5px;
 }
 ```

`flex`属性是`flex-grow`、`flex-shrink`、`flex-basis`这三个属性的简写形式。

 ```css
 flex: <flex-grow <flex-shrink <flex-basis;
 ```

- `flex-basis`：项目的初始宽度。
- `flex-grow`：指定如果有多余宽度，项目是否可以扩大。
- `flex-shrink`：指定如果宽度不足，项目是否可以缩小。

`flex: 0 1 150px;`的意思就是，项目的初始宽度是150px，且不可以扩大，但是当容器宽度不足150px时，项目可以缩小。

如果写成`flex: 1 1 150px;`，就表示项目始终会占满所有宽度。

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080711.jpg')" alt="mixureSecure">

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080710.jpg')" alt="mixureSecure">

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080709.jpg')" alt="mixureSecure">

## 三、两栏式布局

两栏式布局就是一个边栏，一个主栏。

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080712.jpg')" alt="mixureSecure">

下面的实现是，边栏始终存在，主栏根据设备宽度，变宽或者变窄。如果希望主栏自动换到下一行，可以参考上面的"并列式布局"。

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080714.jpg')" alt="mixureSecure">

使用 Grid，实现很容易（[CodePen 示例](https://codepen.io/una/pen/gOaNeWL)）。

 ```css
 .container {
  display: grid;
  grid-template-columns: minmax(150px, 25%) 1fr;
 }
 ```

上面代码中，`grid-template-columns`指定页面分成两列。第一列的宽度是`minmax(150px, 25%)`，即最小宽度为`150px`，最大宽度为总宽度的25%；第二列为`1fr`，即所有剩余宽度。

## 四、三明治布局

三明治布局指的是，页面在垂直方向上，分成三部分：页眉、内容区、页脚。

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080715.jpg')" alt="mixureSecure">

这个布局会根据设备宽度，自动适应，并且不管内容区有多少内容，页脚始终在容器底部（粘性页脚）。也就是说，这个布局总是会占满整个页面高度。

<img :src="$withBase('/images/CSS/Layout.assets/bg2020080716.jpg')" alt="mixureSecure">

html代码如下：
```html
  <div class="container"
    <header class="header"
      header
    </header
    <div class="admin"
 </div
 <footer class="footer"
footer
 </footer
  </div
```


CSS 代码如下（[CodePen 示例](https://codepen.io/una/pen/bGVXPWB)）。

 ```css
 .container {
 height: 100vh;
 display: grid;
 grid-template-rows: auto 1fr auto;
 
 .header {
  height: 5vh;
  background-color: pink;
 }
 
 .admin {
  background-color: #ccc;
 
 }
 
 .footer {
  height: 10vh;
  background-color: aqua;
 }
 }
 ```

上面代码写在容器上面，指定采用 Grid 布局。核心代码是`grid-template-rows`那一行，指定垂直高度怎么划分，这里是从上到下分成三部分。第一部分（页眉）和第三部分（页脚）的高度都为`auto`，即本来的内容高度；第二部分（内容区）的高度为`1fr`，即剩余的所有高度，这可以保证页脚始终在容器的底部.

## 五、圣杯布局

圣杯布局html部分：

```html
 <div class="container"
 <!-- header --
 <header class="header"
header
 </header
 <!-- content --
 <main class="admin"

<div class="leftSiderbar"
  leftSiderbar
</div
<div class="content"
  content
</div
<div class="rightSiderbar"
  rightSiderbar
</div

 </main
 <!-- footer --
 <footer class="footer"
footer
 </footer
  </div
```

圣杯布局css

```css
* {
  margin: 0px;
}
.container {
  height: auto;
  display: grid;
  grid-template-rows: auto 1fr auto;

  .header {
 height: 10vh;
 background-color: pink;
 text-align: center;
  }

  .admin {
 background-color: #fff;
 height: 560px;
 width: 90vw;
 display: grid;
 grid-template-columns: auto 1fr auto;
 text-align: center;
 // justify-content: center;
 // 中间的admin部分实现垂直方向居中对齐。这是我测试时解决的问题
 margin-left: auto;
 margin-right: auto;

 // width: 100vw;
 .leftSiderbar {
// 右边的导航栏宽度固定为90px
width: 90px;
background-color: aqua;
 }

 .content {
background-color: #ccc;
padding: 30px;
 }

 .rightSiderbar {
width: 90px;
background-color: red;
 }
  }

  .footer {
 height: 10vh;
 background-color: rgb(112, 42, 204);
 text-align: center;
  }
}
```

## 2.css全局通用样式

```css

html, body, div, span, applet, object, iframe, 
h1, h2, h3, h4, h5, h6, p, blockquote, pre, 
a, abbr, acronym, address, big, cite, code, 
del, dfn, em, img, ins, kbd, q, s, samp, 
small, strike, strong, sub, sup, tt, var, 
b, u, i, center, 
dl, dt, dd, ol, ul, li, 
fieldset, form, label, legend, 
table, caption, tbody, tfoot, thead, tr, th, td, 
article, aside, canvas, details, embed,  
figure, figcaption, footer, header, hgroup,  
menu, nav, output, ruby, section, summary, 
time, mark, audio, video { 
 margin: 0; 
 padding: 0; 
 border: 0; 
 font-size: 100%; 
 font: inherit; 
 vertical-align: baseline; 
} 
/* HTML5 display-role reset for older browsers */ 
article, aside, details, figcaption, figure,  
footer, header, hgroup, menu, nav, section { 
 display: block; 
} 
body { 
 line-height: 1; 
} 
ol, ul { 
 list-style: none; 
} 
blockquote, q { 
 quotes: none; 
} 
blockquote:before, blockquote:after, 
q:before, q:after { 
 content: ''; 
 content: none; 
} 
table { 
 border-collapse: collapse; 
 border-spacing: 0; 
}
```