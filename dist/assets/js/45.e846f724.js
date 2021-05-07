(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{547:function(t,a,s){"use strict";s.r(a);var n=s(6),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"渲染引擎"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#渲染引擎"}},[t._v("#")]),t._v(" 渲染引擎")]),t._v(" "),s("h2",{attrs:{id:"_1-浅谈浏览器内核-渲染引擎、js引擎"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-浅谈浏览器内核-渲染引擎、js引擎"}},[t._v("#")]),t._v(" 1.浅谈浏览器内核：渲染引擎、JS引擎")]),t._v(" "),s("h3",{attrs:{id:"浏览器内核是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器内核是什么"}},[t._v("#")]),t._v(" 浏览器内核是什么？")]),t._v(" "),s("p",[t._v("简而言之，浏览器内核就是把我们编写的代码转换为页面的中控件。\n虽然现在大家谈起浏览器内核时，多指代渲染引擎（Rendering engine 或 layout engineer）。但其实浏览器内核包括了两部分，渲染引擎和JS引擎，只是后来JS引擎用的越来越多所以就单独的把JS引擎拿了出来。")]),t._v(" "),s("h3",{attrs:{id:"渲染引擎-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#渲染引擎-2"}},[t._v("#")]),t._v(" 渲染引擎")]),t._v(" "),s("p",[t._v("渲染引擎负责负责对网页语法的解释（如HTML、XML等）并渲染网页（CSS）。渲染引擎决定了浏览器如何显示网页的内容以及页面的格式信息。\n下面介绍一下主流的渲染引擎。")]),t._v(" "),s("ol",[s("li",[t._v("Trident（IE）\n国内许多双核浏览器的其中一核便是Trident，也就是我们所说的兼容模式。\n如IE、腾讯TT、猎豹浏览器、360极速浏览器、百度浏览器等都使用了Trident。\n在Win10发布后，微软将其内置浏览器命名为Edge，Edge的最显著特点就是新内核EdgeHTML。")]),t._v(" "),s("li",[t._v("Gecko（firefox）\nGecko的最大特点便是完全开源，开发程度很高。可惜近几年开始没落了，如打开速度过慢，猪一样的对友Flash以及神一样的对手Chrome。")]),t._v(" "),s("li",[t._v("WebKit（safari）\n大名鼎鼎的WebKit内核是苹果公司开发的。像Opera、Chrome早期都使用的是WebKit作为浏览器内核。\n虽然Chrome早已换为Blink内核，但是当提到WebKit时，大家还是会自动联想到Chrome（苹果已经哭晕在厕所）。")]),t._v(" "),s("li",[t._v("Blink（Chrome）\n2013年，Google 宣布将在未来的 Google Chrome/Chromium 中使用基于 WebKit 的 fork Web 渲染引擎：Blink。同时 Opera 表示也将跟进 Google Chrome/Chromium 的步伐。\n且目前大部分国内浏览器最新版本的内核也都改为了Blink。")])]),t._v(" "),s("h3",{attrs:{id:"js引擎"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js引擎"}},[t._v("#")]),t._v(" JS引擎")]),t._v(" "),s("p",[t._v("JavaScript引擎是一个专门处理JavaScript脚本的虚拟机，一般会附带在网页浏览器之中。即负责对JavaScript脚本的解释与执行。")]),t._v(" "),s("ul",[s("li",[t._v("V8（Chrome）\n谷歌公司开发的V8浏览器基于C++，在运行JavaScript之前，相比其它的JavaScript的引擎转换成字节码或解释执行，V8将其编译成原生机器码（IA- 32, x86- 64, ARM, or MIPS CPUs），并且使用了如内联缓存（inline caching）等方法来提高性能。有了这些功能，JavaScript程序在V8引擎下的运行速度媲美二进制程序。\nNodeJS其实就是封装了V8。")]),t._v(" "),s("li",[t._v("Chakra （IE）")]),t._v(" "),s("li",[t._v("Chakra 中文译名为查克拉（火影乱入）。虽然新版的IE（IE9及之后的版本）以及Edge使用的是Chakra，但老版的IE仍然使用的是Jscript。")]),t._v(" "),s("li",[t._v("Nitro（SquirrelFish）（Safari）\n2008年6月2日，WebKit开发团队声明了SquirrelFish，一个能极大地提升Safari解释脚本速度的JavaScript引擎。")]),t._v(" "),s("li",[t._v("SquirrelFish是基于寄存器、直接线程的高级字节码引擎。")]),t._v(" "),s("li",[t._v("Carakan（Opera）")]),t._v(" "),s("li",[t._v("Mozilla（firefox）\n"),s("strong",[t._v("总结")])])]),t._v(" "),s("p",[t._v("一个典型的浏览器有一个渲染引擎和一个独立的JavaScript引擎。这样JavaScript引擎能够被更方便的测试、重新生成或者在另一些项目中使用。例如Carakan被用在Presto中，Nitro被用在WebKit中，SpiderMonkey被用在Gecko中，KJS被用在KHTML中，Rhino默认不包含任何布局引擎。但还有其他组合，例如V8与WebKit被用于Chrome浏览器中。JavaScript引擎能为程序员提供部分操作浏览器的功能（网络、DOM、外部事件、HTML5视频、canvas和存储）。")]),t._v(" "),s("p",[s("strong",[t._v("渲染引擎")]),t._v("又名"),s("strong",[t._v("浏览器内核")]),t._v("，指负责对网页语法解析并渲染成一张可视化页面的解析器。它是浏览器最核心最重要的部位，不同内核对网页语法的解析也有不同，因此同一网页语法在不同内核的浏览器中的渲染效果也可能不同，这就是常说的"),s("strong",[t._v("浏览器差异性")]),t._v("。")]),t._v(" "),s("h2",{attrs:{id:"_2-渲染过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-渲染过程"}},[t._v("#")]),t._v(" 2. 渲染过程")]),t._v(" "),s("p",[t._v("要了解浏览器页面的渲染过程，首先得知道"),s("code",[t._v("关键渲染路径")]),t._v("。"),s("strong",[t._v("关键渲染路径")]),t._v("指浏览器从最初接收请求得到HTML、CSS、JS等资源，然后解析、构建、渲染、布局、绘制、合成，到最后呈现在用户眼前界面的整个过程。")]),t._v(" "),s("p",[t._v("在这将页面的渲染过程分为以下几部分。")]),t._v(" "),s("ul",[s("li",[t._v("解析文件\n"),s("ul",[s("li",[t._v("将 html 文件转换为DOM树")]),t._v(" "),s("li",[t._v("将 css 文件转换为CSSOM树")]),t._v(" "),s("li",[t._v("将 DOM 树和 CSSOM 树合并生成渲染树")])])]),t._v(" "),s("li",[t._v("绘制图层\n"),s("ul",[s("li",[t._v("根据渲染树生成布局渲染树(回流)")]),t._v(" "),s("li",[t._v("根据布局渲染树生成绘制渲染树(重绘)")])])]),t._v(" "),s("li",[s("strong",[t._v("合成图层")]),t._v("：根据绘制渲染树合成图层显示在屏幕上")])]),t._v(" "),s("h3",{attrs:{id:"解析文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解析文件"}},[t._v("#")]),t._v(" 解析文件")]),t._v(" "),s("p",[t._v("HTML 文档描述了一个网页的结构，，浏览器通过 HTML 解析器将 HTML 解析成 DOM 树结构。")]),t._v(" "),s("p",[t._v("构建 DOM 树的过程：读取HTML文档的"),s("strong",[t._v("字节")]),t._v("，将字节转换成"),s("strong",[t._v("字符")]),t._v("，依据字符确定"),s("strong",[t._v("标签")]),t._v("，将标签转换成"),s("strong",[t._v("节点")]),t._v("，以节点为基准构建"),s("strong",[t._v("DOM树")]),t._v("。\nCSS文档描述一个页面的表现，浏览器通过 CSS 解析器将 CSS 解析成 CSSOM 树结构，与 DOM 树结构比较像。构建过程也与 DOM 树类似。")]),t._v(" "),s("p",[t._v("值得注意的是，在构建DOM树的过程中，当"),s("code",[t._v("HTML解析器")]),t._v("遇到"),s("code",[t._v("<script>")]),t._v("时会立即阻塞DOM树的构建，将控制权移交给浏览器的"),s("code",[t._v("JS引擎")]),t._v("，等到"),s("code",[t._v("JS引擎")]),t._v("运行完毕，浏览器才会从中断的地方恢复DOM树的构建。"),s("code",[t._v("<script>")]),t._v("的脚本加载完成后，"),s("code",[t._v("JS引擎")]),t._v("通过"),s("code",[t._v("DOM API")]),t._v("和"),s("code",[t._v("CSSOM API")]),t._v("操作DOM树和CSSOM树。为何会产生"),s("strong",[t._v("渲染阻塞")]),t._v("呢？其根本原因在于：JS操作DOM后，浏览器无法预测未来DOM的具体内容，为了防止无效操作和节省资源，只能阻塞DOM树的构建。")]),t._v(" "),s("p",[t._v("浏览器的"),s("code",[t._v("渲染引擎")]),t._v("将DOM树和CSSOM树合并生成渲染树，只渲染需显示的节点及其样式。")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/images/Browser/bRenderEngine.assets/internetCSS01.png"),alt:"浏览器渲染"}}),t._v(" "),s("ul",[s("li",[s("p",[t._v("由于上面三棵树的构建无先后条件以及顺序，会形成一边加载，一边解析，一边渲染的工作现象。")])]),t._v(" "),s("li",[s("p",[t._v("进入绘制阶段，遍历渲染树，调用渲染器的"),s("code",[t._v("paint()")]),t._v("在屏幕上绘制内容。根据渲染树布局计算样式，即每个节点在页面中的布局、尺寸等几何属性。HTML默认是流式布局，CSS和JS会打破这种布局，改变DOM的几何属性和外观属性。在绘制过程中，根据渲染树布局，再根据布局绘制，这就是常听常说的"),s("strong",[t._v("回流重绘")]),t._v("。")])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("回流")]),t._v("：几何属性需改变的渲染")])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("重绘")]),t._v("：更改外观属性而不影响几何属性的渲染")])])]),t._v(" "),s("p",[t._v("在下面文章会重点讲解回流重绘，这里不再详细介绍。")]),t._v(" "),s("h3",{attrs:{id:"合成图层"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#合成图层"}},[t._v("#")]),t._v(" 合成图层")]),t._v(" "),s("p",[t._v("将回流重绘生成的图层逐张合并并显示在屏幕上。上述几个步骤并不是一次性顺序完成的，若DOM或CSSOM被修改，上述过程会被重复执行。实际上，CSS和JS往往会多次修改DOM或CSSOM，简单来说就是用户的交互操作引发了网页的重渲染。")]),t._v(" "),s("h2",{attrs:{id:"_3-浏览器渲染过程解析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-浏览器渲染过程解析"}},[t._v("#")]),t._v(" 3. 浏览器渲染过程解析")]),t._v(" "),s("p",[t._v("写了一段时间的前端页面了，对于浏览器中页面的渲染流程和原理还有点一知半解，所以就花时间去学习了解了下浏览器的渲染原理，这边对自己的理解总结一下，如有错误请指正。")]),t._v(" "),s("h2",{attrs:{id:"_3-1-浏览器简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-浏览器简介"}},[t._v("#")]),t._v(" 3.1 浏览器简介")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("浏览器是使用最广泛的软件之一，主要功能是向服务器发出请求，在浏览器窗口中展示用户需要的网络资源。资源的位置由用户的的URI（Uniform Resource Identifier统一资源标识符）来指定，通过DNS查询，将网址转换为IP地址。资源的格式通常是HTML，也包括PDF、image及其他格式。整个浏览器工作的流程，主要如下：")])]),t._v(" "),s("li",[s("p",[t._v("用户输入网址——浏览器查找IP地址——发送HTTP请求——服务器处理请求并响应——服务器发回HTML响应——浏览器开始解析HTML——浏览器发送请求获取HTML中内嵌的对象，如CSS/图片等资源——浏览器展示完整页面")])])]),t._v(" "),s("p",[t._v("本次介绍的主要就是浏览器从接收到服务器响应的HTML到展示完整页面的整个过程，下面开始——")]),t._v(" "),s("h2",{attrs:{id:"_3-2-浏览器渲染流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-浏览器渲染流程"}},[t._v("#")]),t._v(" 3.2 浏览器渲染流程")]),t._v(" "),s("p",[t._v("先来一张浏览器渲染流程图")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/images/Browser/bRenderEngine.assets/20180628111024400"),alt:"浏览器渲染"}}),t._v(" "),s("p",[t._v("从这张经典的图中可以看出以下几点：")]),t._v(" "),s("ol",[s("li",[t._v("浏览器可以解析的资源，HTML，SVG，XHTML等，解析完会生成DOM Tree。")]),t._v(" "),s("li",[t._v("CSS资源会解析成CSS Rule Tree。")]),t._v(" "),s("li",[t._v("JS通过DOM API和CSSOM API来操作DOM树和CSS树。")]),t._v(" "),s("li",[t._v("解析完成后综合DOM树和CSS树会生成Rendering Tree，计算每个元素（Frame）的位置，这个过程就是layout或者叫reflow过程。")]),t._v(" "),s("li",[t._v("调用操作系统Native GUI的API绘制。\n注意：上述这个过程是理论上是逐步完成的，但是实际实现中为了更好的用户体验，渲染引擎为了尽可能早的将内容呈现到屏幕上，会在构建DOM树的同时去解析CSS构建CSS树，并且还会去生成Rendering Tree。解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容，这样就可以更快的显示出页面，其中解析后面的内容涉及到布局和样式的改变引起的reflow过程和repaint，我们后面在详细说明。\n接下来我们一步步详细说明：")])]),t._v(" "),s("h2",{attrs:{id:"_3-3-html解析与dom树构建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-html解析与dom树构建"}},[t._v("#")]),t._v(" 3.3 HTML解析与DOM树构建")]),t._v(" "),s("p",[t._v("HTML解析这方面没啥好说的，大致流程是浏览器使用词法分析器和解析器将HTML内容解析成为语法树，也就是DOM树，DOM 树的构建过程是一个深度遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。")]),t._v(" "),s("p",[t._v("DOM树是由DOM元素和属性节点组成，DOM是文档对象模型（Document ObjectModel）的缩写，是HTML文档的对象表示，同时也是外部内容与HTML元素之间的借口。")]),t._v(" "),s("p",[t._v("具体解析与构建过程如下：")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Web page parsing"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("h1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Web page parsing"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("h1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("This is an example Web page."),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("上面的这段HTML会解析成如下的DOM树结构：")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/images/Browser/bRenderEngine.assets/20180628114216436"),alt:"htmlDOM树"}})])}),[],!1,null,null,null);a.default=e.exports}}]);