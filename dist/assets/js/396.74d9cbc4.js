(window.webpackJsonp=window.webpackJsonp||[]).push([[396],{907:function(t,s,a){"use strict";a.r(s);var n=a(6),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"ts-类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ts-类型"}},[t._v("#")]),t._v(" ts 类型")]),t._v(" "),a("h2",{attrs:{id:"type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#type"}},[t._v("#")]),t._v(" type")]),t._v(" "),a("h2",{attrs:{id:"interface"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#interface"}},[t._v("#")]),t._v(" interface")]),t._v(" "),a("h2",{attrs:{id:"高级类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#高级类型"}},[t._v("#")]),t._v(" 高级类型")]),t._v(" "),a("h3",{attrs:{id:"交叉类型-intersection-types"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#交叉类型-intersection-types"}},[t._v("#")]),t._v(" 交叉类型（Intersection Types）")]),t._v(" "),a("p",[t._v("交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如， "),a("code",[t._v("Person & Serializable & Loggable")]),t._v("同时是 "),a("code",[t._v("Person")]),t._v(" "),a("em",[t._v("和")]),t._v(" "),a("code",[t._v("Serializable")]),t._v(" "),a("em",[t._v("和")]),t._v(" "),a("code",[t._v("Loggable")]),t._v("。 就是说这个类型的对象同时拥有了这三种类型的成员。")]),t._v(" "),a("p",[t._v("我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。 （在JavaScript里发生这种情况的场合很多！）")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 合并联合类型\n另外，我们可以合并联合类型为一个交叉类型，这个交叉类型需要同时满足不同的联合类型限制，也就是提取了所有联合类型的相同类型成员。\n这里，我们也可以将合并联合类型理解为求交集。\n在如下示例中，两个联合类型交叉出来的类型 IntersectionUnion 其实等价于 'em' | 'rem'，所以我们只能把 'em' 或者 'rem' 字符串赋值给\n IntersectionUnion 类型的变量。 */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("UnionA")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'px'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'em'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'rem'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'%'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("UnionB")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vh'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'em'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'rem'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'pt'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 取既属于UnionA的类型，同时也属于UnionB的属性，如果两者没有相同的属性，则取得的类型为never")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IntersectionUnion")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" UnionA "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" UnionB"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" intersectionA"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" IntersectionUnion "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'em'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ok")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" intersectionB"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" IntersectionUnion "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'rem'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ok")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" intersectionC"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" IntersectionUnion "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'px'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ts(2322)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" intersectionD"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" IntersectionUnion "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'pt'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ts(2322)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("myString")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("myNumber")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("myType")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" myString "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" myNumber\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);