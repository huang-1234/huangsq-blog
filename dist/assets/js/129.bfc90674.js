(window.webpackJsonp=window.webpackJsonp||[]).push([[129],{486:function(t,s,a){"use strict";a.r(s);var n=a(45),p=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"熟悉web-standard"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#熟悉web-standard"}},[t._v("#")]),t._v(" 熟悉Web Standard")]),t._v(" "),a("p",[t._v("最近看到网上的很多公司要求面试者，熟悉页面架构和布局，对Web标准和标签语义化有深入理解，对这样的要求，很多面试者不知道，到底应该说些什么。其实这个问题对很多面试者，我觉得更多的是对于语言的表达。前提是，你要对这些最基础的计算机知识有一定的理解。说白了，就是对前端的基础知识要有。")]),t._v(" "),a("ol",[a("li",[t._v("Web标准")])]),t._v(" "),a("p",[t._v("Web标准是由一系列标准组合而成。一个网页主要由三部分组成：结构层、表现层和行为层。对应的标准也分三方面：结构化标准语言主要包括XHTML和HTML以及XML，表现层标准语言主要包括CSS，行为标准主要包括对象模型，DOM、ECMAScript等。")]),t._v(" "),a("p",[t._v("结构化标准语言，就是W3C规定的那样，")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("㈠标签的书写，需要开始和结束。单便签除外；\n\n㈡块级元素不能放在"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("p"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("p"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("标签里面。li内可以包含div标签。\n\n㈢块元素里面可以放在块和内联，特殊的 p和 h1—h6里面不要放块元素，li和div可以放很多。因为这两个标签，本身就有容器的属性\n\n㈣内联里面要放内联，不要放块。\n\n㈤结构与表现分离\n\n㈥命名一定要规范\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("表现层标准：")])]),t._v(" "),a("p",[t._v("css的书写，首先要尽可能使用外部引入的方式，因为结构层尽可能的减少表现层的代码过多出现。达到分离的目的。css的选择器有哪些，那些属性可以继承，那些不可以继承。他们之间的优先级是怎么样的。怎么用最简洁的css代码表达设计者的想法，而不只是实现设计者的想法就没事了。我们要的是代码简洁，代码过多，反而让浏览器解析很多，浪费时间。")]),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[t._v("行为层标准：")])]),t._v(" "),a("p",[t._v("主要是javascript中的知识。比如DOM、ECMAScript。使用javascript中的标准，即可。一般对于用户的行为，或者说页面上的动态效果的一些特殊实现，我们可以会考虑到使用javascript来进行书写，但是代码的可复用性，模块化。变量，作用域。可能更多的就是javascript的规定了。自己把自己的理解程度说出来就可以了。")]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[t._v("标签语义化")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("什么是语义化？其实简单说来就是让机器可以读懂内容。web页面的解析是由搜索引擎来进行搜索，机器来解析。所以语义化的标准是，尽可能的让机器读懂。\n\n最初的"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HTML")]),t._v("中如h1"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),t._v("h6、thead、ul、ol等标签，通过标签的语义，最初设计的想法，来达到语义化的要求。如标题、表头、无序、有序列表，搜索引擎很好的利用了这些语义化标签抓取内容\n\n后来，最初定义的"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HTML")]),t._v("语义化标签，不足以实现对Web页面各个部分的功能或位置描述，所以Web前端人员利用"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HTML")]),t._v("标签的id和"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v("属性，进一步对"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HTML")]),t._v("标签进行描述，如对页脚"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HTML")]),t._v("标签添加如id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"footer"')]),t._v("或者"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"footer"')]),t._v("的属性（值），以“无声”的方式在不同的前端程序员或者前后端程序员间实现交流。\n\n制定"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HTML5")]),t._v("的"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("W3C")]),t._v("组织采用了诸如header、footer、section等语义化标签，来进行页面布局的设计想法，弥补了采用id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"header"')]),t._v("或者"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"section"')]),t._v("等。\n\n更深层次的语义化，是自己在团队合作的过程中，对于需要声明的变量和"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v("，id。尽可能使用彼此能理解的英文。这样减少合作的成本，加快合作的效率。\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("布局和页面架构\n布局方面，分为两种：代码上的，视觉上的。代码就是最典型的DIV+CSS布局，表格布局（table），iframe框架(特殊地方使用)布局，具体的使用。可以对应的看一下。目前最流行的是，div+css布局的方式。当然布局的概念比较广泛，因为在css中也存在很多布局的方法，比如float和position。具体理解的程度，需要自己去详细的阐述。\n视觉的布局：比如单页面的，九宫格的，瀑布流布局，tab切换布局，手风琴布局等。\n页面架构：如果是这个问题，以我目前的能力，恐怕还有点困难回答这个问题给大家推荐一篇文章吧，感觉写的还不错")])]),t._v(" "),a("h1",{attrs:{id:"深入理解web标准-网站标准"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#深入理解web标准-网站标准"}},[t._v("#")]),t._v(" "),a("a",{attrs:{href:"https://www.cnblogs.com/coco1s/p/3588716.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("深入理解Web标准（网站标准）"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("我觉得一名Web前端应该好好理解Web标准到底是什么，为什么要在我们的实际实践中遵循Web标准。")]),t._v(" "),a("p",[t._v("什么是Web标准。百度百科的解释是：")]),t._v(" "),a("p",[t._v("WEB标准不是某一个标准，而是一系列标准的集合。网页主要由三部分组成：结构（Structure）、表现（Presentation）和行为（Behavior）。对应的标准也分三方面：结构化标准语言主要包括XHTML和XML，表现标准语言主要包括CSS，行为标准主要包括对象模型（如W3C DOM）、ECMAScript等。")]),t._v(" "),a("p",[a("a",{attrs:{href:"http://www.w3school.com.cn/site/site_standards.asp",target:"_blank",rel:"noopener noreferrer"}},[t._v("Web标准"),a("OutboundLink")],1),t._v(" 。")]),t._v(" "),a("p",[t._v("其他网站也有很多解释，这里不作过多赘述。我觉得我们遵循Web标准的目的不是为了标准而标准，不是因为它是这么要求的我们才去这么做。一名优秀的Web前端，应该是Write less，do more。就是用更少的代码，做更多的事。所以我觉得我们遵循Web标准的目的应该是让我们的代码效率更高更好，只有本着这个态度去理解Web标准才能体会其深入的内涵。")]),t._v(" "),a("p",[t._v("下面具体谈谈Web标准。我在网上看到的一道yahoo的面试题。题目是：")]),t._v(" "),a("p",[t._v("有这么一段html代码，请指出代码中的毛病。")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("P")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" 我写的不是HTML代码，是寂寞。"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("br")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("br")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" 我说："),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("br")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("不要迷恋哥，哥只是一个传说\n")])])]),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[t._v('在这段代码当中，第一眼看上去没有明显的语法错误。是的，在html 4.01 strict下是完全正确的，但是在Web标准下，就是xhtml 1.0 strict下就是错误的，不合乎规范。xhtml有严谨的结构，所有标签必须关闭。如果是单独不成对的标签，在标签最后加一个"/"来关闭它。所以，代码中的'),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("P")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("要匹配一个"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(","),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("br")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("要改成"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("br")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v(",其次所有标签必须小写，所以"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("P")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("也是错误的，要改成"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(";最后"),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:"&nbsp;"}},[t._v("&nbsp;")]),t._v("空格符必须包含在容器当中，也是错误的。\n")])])]),a("p",[a("strong",[t._v("考点1.html 4.01与Web标准xhtml 1.0的差别")])]),t._v(" "),a("p",[t._v("起初，我以为如果能回答到上面所说的错误基本能拿满分了，其实不然，回答完上面的只能及格。Web标准要求的结构与表现分离，而考题当中运用了 控制缩进，是错误的，我们应该应用Css来控制文本的缩进，所以 应该删掉。")]),t._v(" "),a("p",[a("strong",[t._v("考点2.结构与表现分离")])]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[t._v("最后，还有一处错误，题目当中连续使用两个"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("br")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("来制造了两个段落，"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("br")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("是强制折行标签，这样做确实达到了两个段落的效果，但是后期段间距不易控制，我们应该合理运用标签。所以正确的做法是我们应该应用两个"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("标签来表示两个段落。\n")])])]),a("p",[a("strong",[t._v("考点3.合理运用标签")])]),t._v(" "),a("p",[t._v("所以，在xhtml标准下，正确的修改应该是：")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("我写的不是HTML代码，是寂寞。"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("我说："),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("br")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("不要迷恋哥，哥只是一个传说"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v('\n\n\n这样就完美了吗？不是，还有加分点，为了更符合Web标准，我们应该适当的的运用标签语义化（关于什么是标签语义化，可移步：http://www.cnblogs.com/coco1s/p/3583082.html,我的上一篇博文，也是Web标准的一部分）。也就是“我"说的话，可以用'),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("q")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("标签标注。\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("我写的不是HTML代码，是寂寞。"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("我说："),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("br")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("q")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("不要迷恋哥，哥只是一个传说"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("q")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n 这样就足够了，标签语义化也应该合理的运用，过分使用也会显得太画蛇添足。当然，如果还要添加，“我”字可以用"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("cite")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("标注，“HTML”可以用"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("abbr")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("标注：\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("cite")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("我"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("cite")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("写的不是"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("abbr")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("title")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),t._v("”Hyper")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("Text")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("Markup")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("Language”")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("HTML"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("abbr")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("代码，是寂寞。"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("cite")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("我"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("cite")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("说："),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("br")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("q")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("不要迷恋哥，哥只是一个传说"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("q")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[a("strong",[t._v("加分点：标签语义化")])]),t._v(" "),a("p",[t._v("综上，我们使用Web标准去编写代码，就像我前面说的，目的是write less，do more。我们的代码更加规范，更加合乎标准，我们的页面就更容易被搜索引擎抓取收录。")]),t._v(" "),a("p",[t._v("上面没有谈到具体的Web标准包括什么以及具体的采用Web标准的好处，因为这些其他网站很多很多，具体了解可以移步：")])])}),[],!1,null,null,null);s.default=p.exports}}]);