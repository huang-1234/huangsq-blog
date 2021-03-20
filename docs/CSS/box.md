# CSS 基础框盒模型介绍



当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 **CSS 基础框盒模型**（**CSS basic box model**），将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）。

每个盒子由四个部分（或称*区域*）组成，其效用由它们各自的边界（Edge）所定义（原文：defined by their respective edges，可能意指容纳、包含、限制等）。如图，与盒子的四个组成区域相对应，每个盒子有四个边界：*内容边界* *Content edge*、*内边距边界* *Padding Edge*、*边框边界* *Border Edge*、*外边框边界* *Margin Edge*。

![CSS Box model](/images/CSS/box.assets/boxmodel-(3).png)

## **内容区域 content area**

由内容边界限制，容纳着元素的“真实”内容，例如文本、图像，或是一个视频播放器。它的尺寸为内容宽度（或称 *content-box 宽度*）和内容高度（或称 *content-box 高度*）。它通常含有一个背景颜色（默认颜色为透明）或背景图像。

如果 [`box-sizing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing) 为 `content-box`（默认），则内容区域的大小可明确地通过 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width)、[`min-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-width)、[`max-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-width)、[`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)、[`min-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-height)，和 [`max-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-height) 控制。

## **内边距区域 padding area** 

由内边距边界限制，扩展自内容区域，负责延伸内容区域的背景，填充元素中内容与边框的间距。它的尺寸是 *padding-box 宽度* 和 *padding-box 高度*。

内边距的粗细可以由 [`padding-top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-top)、[`padding-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-right)、[`padding-bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-bottom)、[`padding-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-left)，和简写属性 [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) 控制。

## **边框区域 border area**

 由边框边界限制，扩展自内边距区域，是容纳边框的区域。其尺寸为 *border-box 宽度* 和 *border-box 高度*。

边框的粗细由 [`border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width) 和简写的 [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) 属性控制。如果 [`box-sizing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing) 属性被设为 `border-box`，那么边框区域的大小可明确地通过 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width)、[`min-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-width), [`max-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-width)、[`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)、[`min-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-height)，和 [`max-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-height) 属性控制。假如框盒上设有背景（[`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color) 或 [`background-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)），背景将会一直延伸至边框的外沿（默认为在边框下层延伸，边框会盖在背景上）。此默认表现可通过 CSS 属性 [`background-clip`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip) 来改变。

## **外边距区域 margin area**

 由外边距边界限制，用空白区域扩展边框区域，以分开相邻的元素。它的尺寸为 *margin-box 宽度* 和 *margin-box 高度*。

外边距区域的大小由 [`margin-top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-top)、[`margin-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-right)、[`margin-bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-bottom)、[`margin-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-left)，和简写属性 [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) 控制。在发生[外边距合并](https://developer.mozilla.org/en-US/CSS/margin_collapsing)的情况下，由于盒之间共享外边距，外边距不容易弄清楚。

最后，请注意，除[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)外，对于行内元素来说，尽管内容周围存在内边距与边框，但其占用空间（每一行文字的高度）则由 [`line-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height) 属性决定，即使边框和内边距仍会显示在内容周围。