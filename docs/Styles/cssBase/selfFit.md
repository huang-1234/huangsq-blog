## 页面自适应

### 自适应是指页面内容自动适应屏幕大小，实现自适应的方法有多种：

1.简易场景实现自适应：浮动、页面居中、元素宽度不写固定而设置百分比自动匹配大小。这样在页面宽度发生变化时，能利用以上特性实现简易的自适应效果。
2.如果实际开发中有复杂场景的需求，一般通过编写多套CSS代码，然后用**媒体查询技术**，让页面根据不同屏幕尺寸来加载不同代码模块以实现适配不同屏幕的目的。这种方式需要编写多套代码，虽然工作量大，但对于不同屏幕尺寸的设备都有单独一套CSS代码，维护起来更方便。
3.响应式布局，响应式布局是指根据不同屏幕尺寸自动调整页面显示效果实现自适应(也要用到**媒体查询技术**)。响应式布局一般有栅格系统布局，flex布局。**bootstrap框架的核心就是栅格系统。** *（后面详细介绍栅格系统的实现方式）。*

### CSS3 媒体查询 media queries

媒体查询可针对不同设备场景使用不同css，一般栅格系统和多套代码逻辑匹配页面是都要用媒体查询来确定页面大小。媒体查询技术的原理：**通过匹配不同屏幕设备的特征,让不同特征下的CSS代码生效。**

**常用匹配特征 media features**
`width/height: `浏览器宽高
`max-width：` 表示小于最大宽度时生效
`min-width：` 表示大于最小宽度时生效
`device-width/device-height:` 设备屏幕分辨率宽高
`resolution: `设备分辨率
`orientation：`portrait(纵向),高度大于等于宽度时，landscape(横向),高度小于宽度时

**特征匹配操作符**
当媒体类型匹配且表达式为真的时候，对应style就会起作用:
1.and

```
@media (min-width: 700px) and (orientation: landscape) {
 ...
 }
```

表示最小宽度限制在700px，当浏览器宽度大于等于700px且为横向时CSS代码生效

2.逗号分隔

```
@media (max-width: 500px), handheld and (orientation: landscape) {
 ...
 }
```

表示最大宽度限制在500px，当浏览器宽度小于等于500px或者手持设备且为横向时生效

**媒体查询引入**
link 引入方式

```
<link rel="stylesheet" type="text/css" href="styleB.css" media="screen and (min-width: 600px) and (max-width: 800px)">
```

@media导入

```
@media screen and (max-width: 990px){
    .container{
        background: orange;
    }
}
```

### Flex布局

传统的布局方式：浮动+position定位+display属性对简单布局需求可轻易实现，但对于绝对居中这种常见的场景的实现却不太容易，同时浮动布局也会产生一些副作用效果。Flex弹性布局，用来为盒状模型提供最大的灵活性，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持。
flex的基本概念：
**1.任何一个容器元素都能指定成flex容器**
块级元素：display:flex
行内元素也能使用flex布局: display:inline-flex;
**2.使用Flex布局的元素称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。**
容器中有两个轴线，水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

**3.flex container容器的6个属性**
`flex-direction` 方向 row(行排列默认)/row-reverse/column(纵向)/column-reverse
*flex-direction:row时主轴为X方向/column时主轴为Y方向*

`flex-wrap` 换行 nowrap(默认不换行)/wrap/

`flex-flow` 上面两个属性的简写 flex-flow:row wrap 上面两个属性可写成一行

`justify-content` 主轴对齐方式 :
*space-between(多余空间放中间)
space-around(多余空间放两边)
flex-start(item元素靠近主轴起点)
flex-end(item元素靠近主轴终点)
center(item元素居中)*

`align-items` 交叉轴对齐方式
*stretch伸展(默认值，前提是item元素宽/高度不确定)，所有元素宽/高度都撑满整个container
flex-start(item元素靠近交叉轴起点)
flex-end(item元素靠近交叉轴终点)
center(item元素居中)
baseline (item元素第一行文字的baseline对齐)*

`align-content `多轴线在交叉轴方向的对齐方式（多行/多列），为什么不是主轴，因为已经换行了是多行啊。
flex-start item靠近交叉轴起点
flex-end item元素靠近交叉轴终点
center item元素靠近交叉轴中心点
space-between item元素与交叉轴两端对齐
space-around item元素每根轴线两侧间隔相等，轴线之间的间隔比轴线与边框的间隔大一倍
stretch (默认值)item元素占满整个交叉轴

**flex item的6个属性**
`order item`元素的顺序

`flex-grow `有多余空间item元素分配比例，默认为0即不放大

`flex-shrink `空间不够时item元素收缩比例，默认为1即缩小一倍

`flex-basis `指定item元素在分配多余空间之前占用主轴大小main size（px/%）,默认auto即项目本身大小

`flex `上面三个属性的简写，注意顺序

`align-self `指定单个item元素自身的对齐方式，可覆盖align-item属性，默认auto继承align-item的属性
*flex-start
flex-end
center
baseline
stretch*

### 栅格系统

栅格系统是一种自适应页面的布局方式，用于通过一系列的行（row）与列（column）的组合来创建页面布局，实际要展示的内容可以放入这些创建好的栅格中。当页面宽度发生改变时，每个栅格的大小会自动调整以适应页面尺寸。
**栅格系统的实现原理：**
1.将页面中每行布局分成12个等份，每一等份即一个grid。1个grid占1/12，2个grid占2/12，依此类推。页面上所有grid由父容器container包裹，所有grid设置浮动或者设置成行内元素保持在一行，一行排列不下时自动换行。所有grid设置成border-box。

2.定义不同屏幕尺寸时grid不同的css class名称，比如:
默认屏幕尺寸时使用:grid-df-1,grid-df-2
屏幕小尺寸使用：grid-sm-1,grid-sm-2
屏幕中等尺寸使用：grid-md-1,grid-md-2
屏幕大尺寸使用：grid-lg-1,grid-lg2

3.用媒体查询

```
@media screen and (min-width:768px){
    ......
}
```

限制不同浏览器宽度（即不同屏幕尺寸）时container的固定宽度。同时设置不同屏幕尺寸时，grid对应的css 宽度比例。

4.设置每个grid在不同屏幕尺寸时需要占的格数。这时media queries会在不同屏幕尺寸的大小时，让每个grid显示应有的比例。比如`<div class="grid-df-1 grid-sm-12 grid-md-3 grid-lg-6"></div>`即该div在默认屏幕尺寸时占1格，在sm尺寸时占12格，在md尺寸时占3格，在lg尺寸时占6格
代码示例：

```css
@media screen and (min-width:768px){
#container{
width:768px;
}
             .grid-sm-1{
                width:8.3333333%;
            }
            .grid-sm-2{
                width:16.666666%;
            }            
            .grid-sm-3{
                width:25%;
            }            
            .grid-sm-4{
                width:33.333333%;
            }            
            .grid-sm-5{
                width:41.666666%;
            }           
            .grid-sm-6{
                width:50%;
            }         
            .grid-sm-7{
  
```

实现效果如下，当页面宽度为正常大小时