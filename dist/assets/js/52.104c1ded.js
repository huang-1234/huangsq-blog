(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{557:function(t,a,s){"use strict";s.r(a);var e=s(6),v=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"渲染引擎"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#渲染引擎"}},[t._v("#")]),t._v(" 渲染引擎")]),t._v(" "),s("h2",{attrs:{id:"_1-浅谈浏览器内核-渲染引擎、js引擎"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-浅谈浏览器内核-渲染引擎、js引擎"}},[t._v("#")]),t._v(" 1.浅谈浏览器内核：渲染引擎、JS引擎")]),t._v(" "),s("h3",{attrs:{id:"浏览器内核是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器内核是什么"}},[t._v("#")]),t._v(" 浏览器内核是什么？")]),t._v(" "),s("p",[t._v("简而言之，浏览器内核就是把我们编写的代码转换为页面的中控件。\n虽然现在大家谈起浏览器内核时，多指代渲染引擎（Rendering engine 或 layout engineer）。但其实浏览器内核包括了两部分，渲染引擎和JS引擎，只是后来JS引擎用的越来越多所以就单独的把JS引擎拿了出来。")]),t._v(" "),s("h3",{attrs:{id:"渲染引擎-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#渲染引擎-2"}},[t._v("#")]),t._v(" 渲染引擎")]),t._v(" "),s("p",[t._v("渲染引擎负责负责对网页语法的解释（如HTML、XML等）并渲染网页（CSS）。渲染引擎决定了浏览器如何显示网页的内容以及页面的格式信息。\n下面介绍一下主流的渲染引擎。")]),t._v(" "),s("ol",[s("li",[t._v("Trident（IE）\n国内许多双核浏览器的其中一核便是Trident，也就是我们所说的兼容模式。\n如IE、腾讯TT、猎豹浏览器、360极速浏览器、百度浏览器等都使用了Trident。\n在Win10发布后，微软将其内置浏览器命名为Edge，Edge的最显著特点就是新内核EdgeHTML。")]),t._v(" "),s("li",[t._v("Gecko（firefox）\nGecko的最大特点便是完全开源，开发程度很高。可惜近几年开始没落了，如打开速度过慢，猪一样的对友Flash以及神一样的对手Chrome。")]),t._v(" "),s("li",[t._v("WebKit（safari）\n大名鼎鼎的WebKit内核是苹果公司开发的。像Opera、Chrome早期都使用的是WebKit作为浏览器内核。\n虽然Chrome早已换为Blink内核，但是当提到WebKit时，大家还是会自动联想到Chrome（苹果已经哭晕在厕所）。")]),t._v(" "),s("li",[t._v("Blink（Chrome）\n2013年，Google 宣布将在未来的 Google Chrome/Chromium 中使用基于 WebKit 的 fork Web 渲染引擎：Blink。同时 Opera 表示也将跟进 Google Chrome/Chromium 的步伐。\n且目前大部分国内浏览器最新版本的内核也都改为了Blink。")])]),t._v(" "),s("h3",{attrs:{id:"js引擎"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js引擎"}},[t._v("#")]),t._v(" JS引擎")]),t._v(" "),s("p",[t._v("JavaScript引擎是一个专门处理JavaScript脚本的虚拟机，一般会附带在网页浏览器之中。即负责对JavaScript脚本的解释与执行。")]),t._v(" "),s("ul",[s("li",[t._v("V8（Chrome）\n谷歌公司开发的V8浏览器基于C++，在运行JavaScript之前，相比其它的JavaScript的引擎转换成字节码或解释执行，V8将其编译成原生机器码（IA- 32, x86- 64, ARM, or MIPS CPUs），并且使用了如内联缓存（inline caching）等方法来提高性能。有了这些功能，JavaScript程序在V8引擎下的运行速度媲美二进制程序。\nNodeJS其实就是封装了V8。")]),t._v(" "),s("li",[t._v("Chakra （IE）")]),t._v(" "),s("li",[t._v("Chakra 中文译名为查克拉（火影乱入）。虽然新版的IE（IE9及之后的版本）以及Edge使用的是Chakra，但老版的IE仍然使用的是Jscript。")]),t._v(" "),s("li",[t._v("Nitro（SquirrelFish）（Safari）\n2008年6月2日，WebKit开发团队声明了SquirrelFish，一个能极大地提升Safari解释脚本速度的JavaScript引擎。")]),t._v(" "),s("li",[t._v("SquirrelFish是基于寄存器、直接线程的高级字节码引擎。")]),t._v(" "),s("li",[t._v("Carakan（Opera）")]),t._v(" "),s("li",[t._v("Mozilla（firefox）\n"),s("strong",[t._v("总结")])])]),t._v(" "),s("p",[t._v("一个典型的浏览器有一个渲染引擎和一个独立的JavaScript引擎。这样JavaScript引擎能够被更方便的测试、重新生成或者在另一些项目中使用。例如Carakan被用在Presto中，Nitro被用在WebKit中，SpiderMonkey被用在Gecko中，KJS被用在KHTML中，Rhino默认不包含任何布局引擎。但还有其他组合，例如V8与WebKit被用于Chrome浏览器中。JavaScript引擎能为程序员提供部分操作浏览器的功能（网络、DOM、外部事件、HTML5视频、canvas和存储）。")]),t._v(" "),s("p",[s("strong",[t._v("渲染引擎")]),t._v("又名"),s("strong",[t._v("浏览器内核")]),t._v("，指负责对网页语法解析并渲染成一张可视化页面的解析器。它是浏览器最核心最重要的部位，不同内核对网页语法的解析也有不同，因此同一网页语法在不同内核的浏览器中的渲染效果也可能不同，这就是常说的"),s("strong",[t._v("浏览器差异性")]),t._v("。")]),t._v(" "),s("h2",{attrs:{id:"_2-渲染过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-渲染过程"}},[t._v("#")]),t._v(" 2. 渲染过程")]),t._v(" "),s("p",[t._v("要了解浏览器页面的渲染过程，首先得知道"),s("code",[t._v("关键渲染路径")]),t._v("。"),s("strong",[t._v("关键渲染路径")]),t._v("指浏览器从最初接收请求得到HTML、CSS、JS等资源，然后解析、构建、渲染、布局、绘制、合成，到最后呈现在用户眼前界面的整个过程。")]),t._v(" "),s("p",[t._v("在这将页面的渲染过程分为以下几部分。")]),t._v(" "),s("ul",[s("li",[t._v("解析文件\n"),s("ul",[s("li",[t._v("将 html 文件转换为DOM树")]),t._v(" "),s("li",[t._v("将 css 文件转换为CSSOM树")]),t._v(" "),s("li",[t._v("将 DOM 树和 CSSOM 树合并生成渲染树")])])]),t._v(" "),s("li",[t._v("绘制图层\n"),s("ul",[s("li",[t._v("根据渲染树生成布局渲染树(回流)")]),t._v(" "),s("li",[t._v("根据布局渲染树生成绘制渲染树(重绘)")])])]),t._v(" "),s("li",[s("strong",[t._v("合成图层")]),t._v("：根据绘制渲染树合成图层显示在屏幕上")])]),t._v(" "),s("h3",{attrs:{id:"解析文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解析文件"}},[t._v("#")]),t._v(" 解析文件")]),t._v(" "),s("p",[t._v("HTML 文档描述了一个网页的结构，，浏览器通过 HTML 解析器将 HTML 解析成 DOM 树结构。")]),t._v(" "),s("p",[t._v("构建 DOM 树的过程：读取HTML文档的"),s("strong",[t._v("字节")]),t._v("，将字节转换成"),s("strong",[t._v("字符")]),t._v("，依据字符确定"),s("strong",[t._v("标签")]),t._v("，将标签转换成"),s("strong",[t._v("节点")]),t._v("，以节点为基准构建"),s("strong",[t._v("DOM树")]),t._v("。\nCSS文档描述一个页面的表现，浏览器通过 CSS 解析器将 CSS 解析成 CSSOM 树结构，与 DOM 树结构比较像。构建过程也与 DOM 树类似。")]),t._v(" "),s("p",[t._v("值得注意的是，在构建DOM树的过程中，当"),s("code",[t._v("HTML解析器")]),t._v("遇到"),s("code",[t._v("<script>")]),t._v("时会立即阻塞DOM树的构建，将控制权移交给浏览器的"),s("code",[t._v("JS引擎")]),t._v("，等到"),s("code",[t._v("JS引擎")]),t._v("运行完毕，浏览器才会从中断的地方恢复DOM树的构建。"),s("code",[t._v("<script>")]),t._v("的脚本加载完成后，"),s("code",[t._v("JS引擎")]),t._v("通过"),s("code",[t._v("DOM API")]),t._v("和"),s("code",[t._v("CSSOM API")]),t._v("操作DOM树和CSSOM树。为何会产生"),s("strong",[t._v("渲染阻塞")]),t._v("呢？其根本原因在于：JS操作DOM后，浏览器无法预测未来DOM的具体内容，为了防止无效操作和节省资源，只能阻塞DOM树的构建。")]),t._v(" "),s("p",[t._v("浏览器的"),s("code",[t._v("渲染引擎")]),t._v("将DOM树和CSSOM树合并生成渲染树，只渲染需显示的节点及其样式。")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/images/Browser/bRenderEngine.assets/internetCSS01.png"),alt:"浏览器渲染"}}),t._v(" "),s("ul",[s("li",[s("p",[t._v("由于上面三棵树的构建无先后条件以及顺序，会形成一边加载，一边解析，一边渲染的工作现象。")])]),t._v(" "),s("li",[s("p",[t._v("进入绘制阶段，遍历渲染树，调用渲染器的"),s("code",[t._v("paint()")]),t._v("在屏幕上绘制内容。根据渲染树布局计算样式，即每个节点在页面中的布局、尺寸等几何属性。HTML默认是流式布局，CSS和JS会打破这种布局，改变DOM的几何属性和外观属性。在绘制过程中，根据渲染树布局，再根据布局绘制，这就是常听常说的"),s("strong",[t._v("回流重绘")]),t._v("。")])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("回流")]),t._v("：几何属性需改变的渲染")])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("重绘")]),t._v("：更改外观属性而不影响几何属性的渲染")])])]),t._v(" "),s("p",[t._v("在下面文章会重点讲解回流重绘，这里不再详细介绍。")]),t._v(" "),s("h3",{attrs:{id:"合成图层"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#合成图层"}},[t._v("#")]),t._v(" 合成图层")]),t._v(" "),s("p",[t._v("将回流重绘生成的图层逐张合并并显示在屏幕上。上述几个步骤并不是一次性顺序完成的，若DOM或CSSOM被修改，上述过程会被重复执行。实际上，CSS和JS往往会多次修改DOM或CSSOM，简单来说就是用户的交互操作引发了网页的重渲染。")]),t._v(" "),s("h2",{attrs:{id:"_3-浏览器渲染过程解析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-浏览器渲染过程解析"}},[t._v("#")]),t._v(" 3. 浏览器渲染过程解析")]),t._v(" "),s("p",[t._v("写了一段时间的前端页面了，对于浏览器中页面的渲染流程和原理还有点一知半解，所以就花时间去学习了解了下浏览器的渲染原理，这边对自己的理解总结一下，如有错误请指正。")]),t._v(" "),s("h2",{attrs:{id:"_3-1-浏览器简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-浏览器简介"}},[t._v("#")]),t._v(" 3.1 浏览器简介")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("浏览器是使用最广泛的软件之一，主要功能是向服务器发出请求，在浏览器窗口中展示用户需要的网络资源。资源的位置由用户的的URI（Uniform Resource Identifier统一资源标识符）来指定，通过DNS查询，将网址转换为IP地址。资源的格式通常是HTML，也包括PDF、image及其他格式。整个浏览器工作的流程，主要如下：")])]),t._v(" "),s("li",[s("p",[t._v("用户输入网址——浏览器查找IP地址——发送HTTP请求——服务器处理请求并响应——服务器发回HTML响应——浏览器开始解析HTML——浏览器发送请求获取HTML中内嵌的对象，如CSS/图片等资源——浏览器展示完整页面")])])]),t._v(" "),s("p",[t._v("本次介绍的主要就是浏览器从接收到服务器响应的HTML到展示完整页面的整个过程，下面开始——")]),t._v(" "),s("h2",{attrs:{id:"_3-2-浏览器渲染流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-浏览器渲染流程"}},[t._v("#")]),t._v(" 3.2 浏览器渲染流程")]),t._v(" "),s("p",[t._v("先来一张浏览器渲染流程图")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/images/Browser/bRenderEngine.assets/20180628111024400"),alt:"浏览器渲染"}}),t._v(" "),s("p",[t._v("从这张经典的图中可以看出以下几点：")]),t._v(" "),s("ol",[s("li",[t._v("浏览器可以解析的资源，HTML，SVG，XHTML等，解析完会生成DOM Tree。")]),t._v(" "),s("li",[t._v("CSS资源会解析成CSS Rule Tree。")]),t._v(" "),s("li",[t._v("JS通过DOM API和CSSOM API来操作DOM树和CSS树。")]),t._v(" "),s("li",[t._v("解析完成后综合DOM树和CSS树会生成Rendering Tree，计算每个元素（Frame）的位置，这个过程就是layout或者叫reflow过程。")]),t._v(" "),s("li",[t._v("调用操作系统Native GUI的API绘制。\n注意：上述这个过程是理论上是逐步完成的，但是实际实现中为了更好的用户体验，渲染引擎为了尽可能早的将内容呈现到屏幕上，会在构建DOM树的同时去解析CSS构建CSS树，并且还会去生成Rendering Tree。解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容，这样就可以更快的显示出页面，其中解析后面的内容涉及到布局和样式的改变引起的reflow过程和repaint，我们后面在详细说明。\n接下来我们一步步详细说明：")])]),t._v(" "),s("h2",{attrs:{id:"_3-3-html解析与dom树构建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-html解析与dom树构建"}},[t._v("#")]),t._v(" 3.3 HTML解析与DOM树构建")]),t._v(" "),s("p",[t._v("HTML解析这方面没啥好说的，大致流程是浏览器使用词法分析器和解析器将HTML内容解析成为语法树，也就是DOM树，DOM 树的构建过程是一个深度遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。")]),t._v(" "),s("p",[t._v("DOM树是由DOM元素和属性节点组成，DOM是文档对象模型（Document ObjectModel）的缩写，是HTML文档的对象表示，同时也是外部内容与HTML元素之间的借口。")]),t._v(" "),s("p",[t._v("具体解析与构建过程如下：")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Web page parsing"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("h1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Web page parsing"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("h1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("This is an example Web page."),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("上面的这段HTML会解析成如下的DOM树结构：")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/images/Browser/bRenderEngine.assets/20180628114216436"),alt:"htmlDOM树"}}),t._v(" "),s("h2",{attrs:{id:"_3-4-css解析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-css解析"}},[t._v("#")]),t._v(" 3.4 CSS解析")]),t._v(" "),s("p",[t._v("CSS解析的过程类似于HTML解析，也是浏览器使用自带的解析器进行解析，一般解析过程是由上而下，会将CSS文件解析成为StyleSheet对象，且每个对象都包含CSS规则。CSS规则对象包含了选择和声明对象，以及其他与CSS语法对应的对象。CSS解析完成后会大致生成如下结构的CSS Rule Tree。")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/images/Browser/bRenderEngine.assets/20180628164455807"),alt:"CSS Tree"}}),t._v(" "),s("h2",{attrs:{id:"_3-5-渲染"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-5-渲染"}},[t._v("#")]),t._v(" 3.5 渲染")]),t._v(" "),s("p",[t._v("渲染的主要过程分为——Render Tree（渲染树）生成——Layout（布局）——Paint（绘制）。")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("Render Tree的生成\nDOM树和CSS树结合生成Render Tree（渲染树）——这是由可视化元素按照其显示顺序组成的树形结构，是文档可视化的表示，它的作用是让浏览器能够按照正确的顺序渲染页面元素。Firefox中称之为“框架”，Webkit中的术语则是呈现器或者呈现对象。\n渲染树是和DOM元素相对应的，但是并非全部一一对应，例如：1，非可视化元素是不会出现在渲染树中，如“head”元素，2，如果元素的display属性值为“none”，也不会出现在渲染树中（但是visibility属性值为“hidden”的元素会出现在渲染树中）。详细的流程请参考本文最后参考资料中的介绍。")])]),t._v(" "),s("li",[s("p",[t._v("布局\n渲染树中并不包含位置和大小的信息，计算这些值的过程就是布局或者重排。\n布局的过程是一个递归的过程，从根元素开始，递归遍历部分或者所有的渲染树结构，并为每一个需要显示元素计算几何信息。一般根元素位置坐标（0，0），大小为浏览器窗口的可见区域。\n这里涉及到两个重要的概念reflow和repaint：")])])]),t._v(" "),s("blockquote",[s("p",[t._v("repaint（重绘）：")])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[t._v("元素的某一部分属性发生改变，如字体颜色，背景颜色等改变，尺寸并未改变，这时发生的改变过程就是repaint。\n")])])]),s("blockquote",[s("p",[t._v("reflow（回流）：")])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[t._v("因为浏览器渲染是一个由上而下的过程，当发现某部分的变化影响了布局时，就需要倒回去重新渲染，这个过程就称之为reflow。reflow几乎是没法避免的，现在一些常用的效果，比如树状目录的折叠、展开（实质上是元素的显示与隐藏）等，都将引起浏览器的 reflow。鼠标滑过、点击……只要这些行为引起了页面上某些元素的占位面积、定位方式、边距等属性的变化，都会引起它内部、周围甚至整个页面的重新渲染。基本上能引起reflow的主要有几个原因：\n")])])]),s("ol",[s("li",[t._v("网页初始化。")]),t._v(" "),s("li",[t._v("JS操作DOM树的时候，增加删除元素等。")]),t._v(" "),s("li",[t._v("某些元素的尺寸改变。")]),t._v(" "),s("li",[t._v("CSS属性的改变，")])]),t._v(" "),s("p",[t._v("但是浏览器很聪明，"),s("font",{attrs:{color:"red"}},[t._v('为了避免细小的改变就进行repaint或者reflow，浏览器采用一种"dirty"系统，会将这些改变操作积攒一批，然后做一次reflow，这又叫异步reflow或增量异步reflow。')]),t._v("但是有些特殊情况不会这么做，比如：resize窗口，改变了页面默认的字体，等，对于这些操作，浏览器会马上进行reflow。")],1),t._v(" "),s("p",[t._v("但是有的时候，我们自己编写的脚本会阻止浏览器的这种操作，比如我们请求下面的值的时候：offsetTop, offsetLeft, offsetWidth, offsetHeight，scrollTop/Left/Width/Height，clientTop/Left/Width/Height，IE中的 getComputedStyle(), 或 currentStyle等，如果我们的程序运行的时候需要这些值，那么浏览器需要给我们返回最新的值，而这样就会将当前积攒的操作执行，从而引起频繁的reflow或者repaint。")]),t._v(" "),s("p",[t._v("通常reflow比repaint会耗费更多的时间，从而也就会影响性能，所以编写代码的时候要尽可能避免过多的reflow或者repaint。减少reflow/repaint的方法：")]),t._v(" "),s("ol",[s("li",[t._v("修改样式不要逐条修改，建议定义CSS样式的class，然后直接修改元素的className。")]),t._v(" "),s("li",[t._v("不要将DOM节点的属性值放在循环中当成循环的变量。")]),t._v(" "),s("li",[t._v("为动画的 HTML 元素使用 fixed 或 absoult 的 position，那么修改他们的 CSS 是不会 reflow 的。")]),t._v(" "),s("li",[t._v("把DOM离线后修改。如设置DOM的display：none，然后进行你需要的多次修改，然后再显示出来，或者clone一个节点到内存中，然后随意修改，修改完成后再与在线的交换。")]),t._v(" "),s("li",[t._v("千万不要使用table布局，一个微小的改变就可能引起整个table的重新布局。\n3，绘制")])]),t._v(" "),s("p",[t._v("在绘制阶段，系统会遍历渲染树，并且调用呈现器将的“paint”方法，将内容显示在屏幕上。同样，类似于布局过程，也分为全局和增量两种。更多绘制详情参考文末资料。")]),t._v(" "),s("h2",{attrs:{id:"_3-6-性能优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-6-性能优化"}},[t._v("#")]),t._v(" 3.6 性能优化")]),t._v(" "),s("h3",{attrs:{id:"一、提升html加载速度"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、提升html加载速度"}},[t._v("#")]),t._v(" 一、提升HTML加载速度")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("页面精简，删除不必要的注释，空格，将内嵌的JS和CSS移至外部文件，使用压缩工具等。")])]),t._v(" "),s("li",[s("p",[t._v("减少文件数量，减少页面上引入的文件数量可以减少请求的次数，可以合并的JS和CSS文件尽量合并。")])]),t._v(" "),s("li",[s("p",[t._v("减少域名查询，DNS查询和解析域名需要消耗时间，减少对外部JavaScript、CSS、图片等资源的引用，不同域名的使用越少越好。")])]),t._v(" "),s("li",[s("p",[t._v("使用缓存，重用数据。")])]),t._v(" "),s("li",[s("p",[t._v("优化页面元素的加载顺序。")])]),t._v(" "),s("li",[s("p",[t._v("使用现在CSS和合法的标签。")])]),t._v(" "),s("li",[s("p",[t._v("指定图片的大小，如果浏览可以立即确定图片大小就不需要重新进行布局操作。")])]),t._v(" "),s("li",[s("p",[t._v("根据浏览器类型选择合适的策略。")])]),t._v(" "),s("li",[s("p",[t._v("使用压缩工具等。")])]),t._v(" "),s("li",[s("p",[t._v("页面精简，删除不必要的注释，空格，将内嵌的JS和CSS移至外部文件，使用压缩工具等。")])])]),t._v(" "),s("h3",{attrs:{id:"二、编写合理的css"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、编写合理的css"}},[t._v("#")]),t._v(" 二、编写合理的CSS")]),t._v(" "),s("p",[t._v("首先说明CSS选择符的匹配顺序，从右到左！从右到左！从右到左！（重要的事情说三遍），所以，类似于“#nav li” 我们以为很简单的规则，应该马上就可以匹配成功，但是，需要从右往左匹配，所以，先会去查找所有的li，然后再去确定它的父元素是不是#nav。因此，编写合理的CSS也可以提高我们的页面行能：")]),t._v(" "),s("blockquote",[s("p",[t._v("DOM的深度尽量浅，不要嵌套过深。")])]),t._v(" "),s("ul",[s("li",[s("p",[t._v("减少inline javascript  css的数量。")])]),t._v(" "),s("li",[s("p",[t._v("使用合法的CSS属性。")])]),t._v(" "),s("li",[s("p",[t._v("不要为ID选择器指定类名或者标签名。")])]),t._v(" "),s("li",[s("p",[t._v("避免后代选择器，尽量使用子选择器。")])]),t._v(" "),s("li",[s("p",[t._v("避免使用通配符。")])])]),t._v(" "),s("h3",{attrs:{id:"三、关于javascript标签"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、关于javascript标签"}},[t._v("#")]),t._v(" 三、关于javascript标签")]),t._v(" "),s("p",[t._v("对于javascript标签首先得了解其加载和执行的特点：1，载入后立即执行，2，执行时会阻塞页面后续的内容，针对这些特点，我们使用javascript标签时应该注意：")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("将所有的javascript标签放在页面底部，也就是body标签闭合之前，这样可以保证脚本执行前已完成DOM渲染。")])]),t._v(" "),s("li",[s("p",[t._v("尽可能合并脚本，页面中引入的脚本越少，加载响应速度也就越快。")])]),t._v(" "),s("li",[s("p",[t._v("减少inline javascript的使用。")])]),t._v(" "),s("li",[s("p",[t._v("所有的javascript标签会按照其引入顺序依次执行，只有前面的内容解析完成才会解析下一个，所以注意多个javascript标签的引入顺序。")])]),t._v(" "),s("li",[s("p",[t._v("使用defer属性，该属性可以使脚本在文档完全呈现以后再执行。")])]),t._v(" "),s("li",[s("p",[t._v("使用async属性，可以使当前脚本不必等待其他脚本的执行，也不必阻塞文档的呈现。")])])]),t._v(" "),s("h2",{attrs:{id:"_3-7-结语"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-7-结语"}},[t._v("#")]),t._v(" 3.7 结语")]),t._v(" "),s("p",[t._v("关于浏览器渲染的内容基本就是这些了，下面引用网上一篇比较好相关文章中的一段做个总结：")]),t._v(" "),s("p",[t._v("HTML页面加载和解析流程")]),t._v(" "),s("ol",[s("li",[t._v("用户输入网址（假设是个html页面，并且是第一次访问），浏览器向服务器发出请求，服务器返回html文件；")]),t._v(" "),s("li",[t._v("浏览器开始载入html代码，发现"),s("code",[t._v("＜head＞")]),t._v("标签内有一个"),s("code",[t._v("＜link＞")]),t._v("标签引用外部CSS文件；")]),t._v(" "),s("li",[t._v("浏览器又发出CSS文件的请求，服务器返回这个CSS文件；")]),t._v(" "),s("li",[t._v("浏览器继续载入html中"),s("code",[t._v("＜body＞")]),t._v("部分的代码，并且CSS文件已经拿到手了，可以开始渲染页面了；")]),t._v(" "),s("li",[t._v("浏览器在代码中发现一个"),s("code",[t._v("＜img＞")]),t._v("标签引用了一张图片，向服务器发出请求。此时浏览器不会等到图片下载完"),s("font",{attrs:{color:"red"}},[t._v("(异步加载)")]),t._v("，而是继续渲染后面的代码；")],1),t._v(" "),s("li",[t._v("服务器返回图片文件，由于图片占用了一定面积，影响了后面段落的排布，因此浏览器需要回过头重新渲染这部分代码；")]),t._v(" "),s("li",[t._v("浏览器发现了一个包含一行Javascript代码的＜script＞标签，检测是否有defer和async属性，没有就赶快运行它，有的话就按照规矩来")]),t._v(" "),s("li",[t._v("Javascript脚本执行了这条语句，它命令浏览器隐藏掉代码中的某个＜div＞ （style.display=”none”）。突然少了这么一个元素，浏览器不得不重新渲染这部分代码；")]),t._v(" "),s("li",[t._v("终于等到了"),s("code",[t._v("＜/html＞")]),t._v("的到来，浏览器泪流满面……")]),t._v(" "),s("li",[t._v("等等，还没完，用户点了一下界面中的“换肤”按钮，Javascript让浏览器换了一下＜link＞标签的CSS路径；")]),t._v(" "),s("li",[t._v("浏览器召集了在座的各位＜div＞＜span＞＜ul＞＜li＞们，“大伙儿收拾收拾行李，咱得重新来过……”，浏览器向服务器请求了新的CSS文件，重新渲染页面")])]),t._v(" "),s("p",[t._v("如果需要了解更多详细的内容，请参阅下面的资料。\n参考资料：")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("权威资料："),s("a",{attrs:{href:"http://taligarsiel.com/Projects/howbrowserswork1.htm",target:"_blank",rel:"noopener noreferrer"}},[t._v("how browsers work"),s("OutboundLink")],1),t._v("(英文，特别长，但是很权威)；")])]),t._v(" "),s("li",[s("p",[t._v("如果看英文有困难的可以看看下面的翻译版本——"),s("a",{attrs:{href:"https://www.cnblogs.com/zhuanzhuruyi/p/6496276.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("浏览器工作原理简介。"),s("OutboundLink")],1)])])])])}),[],!1,null,null,null);a.default=v.exports}}]);