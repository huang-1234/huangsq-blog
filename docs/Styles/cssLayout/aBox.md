# 1. 基础框盒模型介绍


## 简明概要
当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 **CSS 基础框盒模型**（**CSS basic box model**），将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）。

每个盒子由四个部分（或称*区域*）组成，其效用由它们各自的边界（Edge）所定义（原文：defined by their respective edges，可能意指容纳、包含、限制等）。如图，与盒子的四个组成区域相对应，每个盒子有四个边界：*内容边界* *Content edge*、*内边距边界* *Padding Edge*、*边框边界* *Border Edge*、*外边框边界* *Margin Edge*。

<img :src="$withBase('/images/CSS/box.assets/boxmodel-(3).png')" alt='box-model'/>

**盒模型**由以下属性组成，由外到内用公式表示就是：**box = margin + border + padding + content**。除了content(不是属性，作为盒模型扩展理解使用)，其余属性都包含left、right、top和bottom等扩展属性。

- **margin**：边距，外部透明区域，负责隔离相邻盒子
- **border**：边框，内部着色区域，负责隔离边距和填充，包含`width`、`style`、`color`三个扩展属性
- **padding**：填充，内部着色区域，负责扩展盒子内部尺寸
- **content**：内容，以`文本`或`节点`存在的占用位置

TIP

padding着色随background-color而变，可用background-clip隔离.

## CSS盒子类型

由于历史原因，盒模型分化成两种类型，分别是**标准盒模型**和**怪异盒模型**。

CSS3里提供一个属性用于声明盒模型的类型，它就是`box-sizing`。

- **content-box**：标准盒模型(`默认`)
- **border-box**：怪异盒模型

但是它不具备继承性，若全局统一盒模型，那只能使用`*`声明`box-sizing`了。

### 标准盒模型

**标准盒模型**是W3C规范的标准，由`margin + border + padding + content`组成。与上述提到的公式一模一样，节点的`width/height`只包含`content`，不包含`padding`和`border`。

节点的尺寸计算公式如下。

- **横向**：`margin-[left/right]` + `border-[left/right]`+ `padding-[left/right]` + `width`
- **纵向**：`margin-[top/bottom]` + `border-[top/bottom]`+ `padding-[top/bottom]` + `height`

节点的宽高计算公式如下。

- **横向**：`width = width`
- **纵向**：`height = height`

###  怪异盒模型

**怪异盒模型**又名IE盒子模型，是IExplore制定的标准，由`margin + content`组成。与上述提到的公式一不同，节点的`width/height`包含`border`、`padding`和`content`。

节点的尺寸计算公式如下。

- **横向**：`margin-[left/right]` + `width`(包含`border-[left/right]`和`padding-[left/right]`)
- **纵向**：`margin-[top/bottom]` + `height`(包含`border-[top/bottom]`和`padding-[top/bottom]`)

节点的宽高计算公式如下。

- **横向**：`width = border + padding + width`
- **纵向**：`height = border + padding + height`

下面用代码来展示两者的区别：
```css
.content-box{
  width: 200px;
  height: 200px;
  background-color: aqua;
  box-sizing: content-box;
  padding: 30px;
  border: 10px dotted green;
  margin: 20px;
}
.border-box{
  width: 200px;
  height: 200px;
  background-color: rgb(255, 187, 0);
  box-sizing: border-box;
  padding: 30px;
  border: 10px dotted rgb(0, 2, 128);
  margin: 20px;
}
```
## 两种盒子的区别
<img :src="$withBase('/images/CSS/box.assets/image-20210323175451998.png')" alt='标准盒模型和怪异盒模型的区别'/>

外边距区域的大小由 [`margin-top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-top)、[`margin-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-right)、[`margin-bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-bottom)、[`margin-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-left)，和简写属性 [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) 控制。在发生[外边距合并]的情况下，由于盒之间共享外边距，外边距不容易弄清楚。

最后，请注意，除[可替换元素]外，对于行内元素来说，尽管内容周围存在内边距与边框，但其占用空间（每一行文字的高度）则由 [`line-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height) 属性决定，即使边框和内边距仍会显示在内容周围。

新增加

在 [CSS 盒子模型]的默认定义里，你对一个元素所设置的 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 与 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 只会应用到这个元素的内容区。如果这个元素有任何的 [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) 或 [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) ，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。

box-sizing 属性可以被用来调整这些表现:

- `content-box` 是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
- `border-box` 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。

**注:** `border-box`不包含`margin`

>  `box-sizing` 属性被指定为下面列表中的关键字。

```css
box-sizing = content-box
```

默认值，标准盒子模型。 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 与 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 只包括内容的宽和高， 不包括边框（border），内边距（padding），外边距（margin）。注意: 内边距、边框和外边距都在这个盒子的外部。 比如说，`.box {width: 350px; border: 10px solid black;}` 在浏览器中的渲染的实际宽度将是 370px。

尺寸计算公式：
`width` = 内容的宽度
`height` = 内容的高度

宽度和高度的计算值都不包含内容的边框（border）和内边距（padding）。
```css
box-sizing = border-box
```
 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 属性包括内容，内边距和边框，但不包括外边距。这是当文档处于 Quirks模式 时Internet Explorer使用的[盒模型]。注意，填充和边框将在盒子内 , 例如, `.box {width: 350px; border: 10px solid black;}` 导致在浏览器中呈现的宽度为350px的盒子。内容框不能为负，并且被分配到0，使得不可能使用border-box使元素消失。

尺寸计算公式：
```sass
`width` = border + padding + 内容的宽度
`height` = border + padding + 内容的高度
```