(window.webpackJsonp=window.webpackJsonp||[]).push([[208],{717:function(t,a,s){"use strict";s.r(a);var n=s(6),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"undefined-与-null-的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#undefined-与-null-的区别"}},[t._v("#")]),t._v(" undefined 与 null 的区别")]),t._v(" "),s("p",[t._v('大多数计算机语言，有且仅有一个表示"无"的值，比如，C 语言的 NULL，Java 语言的 null，Python 语言的 None，Ruby 语言的 nil。')]),t._v(" "),s("p",[t._v("有点奇怪的是，JavaScript 语言居然有"),s("strong",[t._v("两个")]),t._v('表示"无"的值：undefined 和 null。这是为什么？')]),t._v(" "),s("h2",{attrs:{id:"一、相似性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、相似性"}},[t._v("#")]),t._v(" 一、相似性")]),t._v(" "),s("p",[t._v("在 JavaScript 中，将一个变量赋值为 undefined 或 null，老实说，几乎没区别。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("上面代码中，a 变量分别被赋值为 undefined 和 null，这两种写法几乎等价。")]),t._v(" "),s("p",[t._v("undefined 和 null 在 if 语句中，都会被自动转为 false，相等运算符甚至直接报告两者相等。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"undefined is false"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined is false")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"null is false"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// null is false")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])])]),s("p",[t._v("上面代码说明，两者的行为是何等相似！")]),t._v(" "),s("p",[t._v("既然 undefined 和 null 的含义与用法都差不多，为什么要同时设置两个这样的值，这不是无端增加 JavaScript 的复杂度，令初学者困扰吗？Google 公司开发的 JavaScript 语言的替代品 Dart 语言，就明确规定只有 null，没有 undefined！")]),t._v(" "),s("h2",{attrs:{id:"二、历史原因"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、历史原因"}},[t._v("#")]),t._v(" 二、历史原因")]),t._v(" "),s("p",[t._v("最近，我在读新书"),s("a",{attrs:{href:"http://speakingjs.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("《Speaking JavaScript》"),s("OutboundLink")],1),t._v("时，意外发现了这个问题的答案！")]),t._v(" "),s("p",[t._v('原来，这与 JavaScript 的历史有关。1995 年 JavaScript 诞生时，最初像 Java 一样，只设置了 null 作为表示"无"的值。')]),t._v(" "),s("p",[t._v("根据 C 语言的传统，null 被设计成可以自动转为 0。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 0")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 5")]),t._v("\n")])])]),s("p",[t._v("但是，JavaScript 的设计者 Brendan Eich，觉得这样做还不够，有两个原因。")]),t._v(" "),s("p",[t._v('首先，null 像在 Java 里一样，被当成一个对象。但是，JavaScript 的数据类型分成原始类型(primitive)和合成类型(complex)两大类，Brendan Eich 觉得表示"无"的值最好不是对象。')]),t._v(" "),s("p",[t._v("其次，JavaScript 的最初版本没有包括错误处理机制，发生数据类型不匹配时，往往是自动转换类型或者默默地失败。Brendan Eich 觉得，如果 null 自动转为 0，很不容易发现错误。")]),t._v(" "),s("p",[t._v("因此，Brendan Eich 又设计了一个 undefined。")]),t._v(" "),s("h2",{attrs:{id:"三、最初设计"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、最初设计"}},[t._v("#")]),t._v(" 三、最初设计")]),t._v(" "),s("p",[t._v("JavaScript 的最初版本是这样区分的："),s("strong",[t._v('null 是一个表示"无"的对象，转为数值时为 0；undefined 是一个表示"无"的原始值，转为数值时为 NaN。')])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// NaN")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// NaN")]),t._v("\n")])])]),s("h2",{attrs:{id:"四、目前的用法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#四、目前的用法"}},[t._v("#")]),t._v(" 四、目前的用法")]),t._v(" "),s("p",[t._v("但是，上面这样的区分，在实践中很快就被证明不可行。目前，null 和 undefined 基本是同义的，只有一些细微的差别。")]),t._v(" "),s("p",[t._v('**null 表示"没有对象"，即该处不应该有值。**典型用法是：')]),t._v(" "),s("p",[t._v("(1) 作为函数的参数，表示该函数的参数不是对象。")]),t._v(" "),s("p",[t._v("(2) 作为对象原型链的终点。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("Object"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getPrototypeOf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// null")]),t._v("\n")])])]),s("p",[t._v('**undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。**典型用法是：')]),t._v(" "),s("p",[t._v("(1)变量被声明了，但没有赋值时，就等于 undefined。")]),t._v(" "),s("p",[t._v("(2) 调用函数时，应该提供的参数没有提供，该参数等于 undefined。")]),t._v(" "),s("p",[t._v("(3)对象没有赋值的属性，该属性的值为 undefined。")]),t._v(" "),s("p",[t._v("(4)函数没有返回值时，默认返回 undefined。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ni"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("f")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("x")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("f")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" o "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\no"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("p"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" x "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("f")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);