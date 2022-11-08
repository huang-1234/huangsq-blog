# CSS格式化上下文

1. 空盒子的垂直margin直接相邻，也会发生合并。



2. BFC内盒子的左外边缘都会接触包含块的左边缘(如果从右到左进行排版，那么右边发生接触)，即使存在浮动盒子也是如此。

3. BFC的内容不会与浮动元素发生重叠，且浮动元素也会参与BFC的高度计算。

4. BFC是一个隔离的独立容器，容器里面的子元素不会影响外面的元素，反过来也一样。

## 如何触发BFC

1. 根元素`<html>`
2. 浮动元素(float不为none)
3. 绝对定位元素(position为absolute或fixed)
4. overflow不为visible的块元素
5. 内联块元素、表格单元格、表格标题(display为inline-block/table-cell/table-caption)
6. 弹性元素(display为flex或inline-flex元素的直接子元素)

满足上述任一条件即可在其内部产生BFC。(更多详细的可参考MDN文档)

#### 防止外边距合并

**根据BFC布局规则：** 同一个BFC内相邻盒子之间的外边距会发生合并。

创建新的BFC，不属于同一个BFC的盒子不会出现外边距合并。

```html
<div style="border:1px solid black; width: 100px;">
    <div style="margin: 10px; height: 50px; background-color: blue;"></div>
    <!--创建新的BFC-->
    <div style="overflow: hidden;">
        <div style="margin: 10px; height: 20px; background-color: blue;"></div>
    </div>
</div>
```

## IFC 内联格式化上下文

只有inline-level元素参与的渲染区域，IFC规定并管理inline-level元素的布局方式。

***（4）BFC包含浮动的块***

这个是大家再熟悉不过的了，利用overflow:hidden清除浮动嘛，因为浮动的盒子无法撑出处于标准文档流的父盒子的height。这个就不过多解释了，相信大家都早已理解。

### 布局规则

1. 盒子沿着水平方向逐个排列。
2. 只会计算盒子水平方向上的margin、border和padding，而不会计算垂直方向上的。
3. 在垂直方向上，盒子有多种对齐方式(vertical-align)：可以top对齐，或者bottom对齐，也可以通过文本基线(baseline)对齐。
4. 能把一行的盒子完全包含进去的方形区域，被称为**行框(line box)**。
5. 行框的高度由CSS行高计算规则确定，而且同个IFC内的行框高度一般不同(行框内最高元素的高度可能不同)。
6. 行框通常是左右边紧贴包含块，但会因为浮动元素的存在而发生变化。行框的宽由包含块和存在的浮动元素决定，浮动元素可能导致行框宽度变小。如果行框内所有盒子的总宽度小于行框的宽度，那行框内盒子的水平分布方式由text-align属性决定(如果这个属性是justify，那浏览器会对inline元素内的文本和空格进行拉伸，注意不是inline-table和inline-block)。
7. 如果一个行框无法容纳多个inline元素，那他们会被分布到两个或多个垂直堆叠的行框内。
8. 如果一个inline元素的宽度超过行框能容纳的宽度，那它会被切割成若干盒子然后跨行框分布，而且被切割处margins, borders, 和padding均不生效(e.g.段落)。如果这个inline元素不能被分割(e.g.单个单词work breaking规则被禁用受行框内white-space为nowrap或pre的影响)，那么这个inline元素会直接溢出行框。

### 用途

#### 水平居中

**根据IFC的布局规则：** 水平方向上，通过text-align改变对齐方式。

#### 垂直居中

**根据IFC的布局规则：** 垂直方向上，通过vertical-align改变对齐方式。

## GFC 网格布局格式化上下文

声明display:grid/inline-grid能创建一个网格容器，网格容器会为其内容产生GFC。

网格布局引入了二维网格布局系统，通过一组相交的水平线和垂直线来定义网格的列和行，网格元素被布局到这些行和列相关的位置上。

### 布局规则

参考[网格布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)。

## FFC 弹性格式化上下文

声明display:flex/inline-flex能创建一个弹性容器，弹性容器会为其内容产生FFC。

### 布局规则

参考[弹性布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)。

参考链接：

[MDN: Block_formatting_context](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

[W3C: block-formatting](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)

