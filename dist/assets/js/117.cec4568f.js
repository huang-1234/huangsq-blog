(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{477:function(e,t,a){"use strict";a.r(t);var r=a(45),v=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h2",{attrs:{id:"指令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#指令"}},[e._v("#")]),e._v(" "),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/syntax.html#%E6%8C%87%E4%BB%A4",target:"_blank",rel:"noopener noreferrer"}},[e._v("指令"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("指令 (Directives) 是带有 "),a("code",[e._v("v-")]),e._v(" 前缀的特殊 attribute。指令 attribute 的值预期是"),a("strong",[e._v("单个 JavaScript 表达式")]),e._v(" ("),a("code",[e._v("v-for")]),e._v(" 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。回顾我们在介绍中看到的例子：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('<p v-if="seen">现在你看到我了</p>\n')])])]),a("p",[e._v("这里，"),a("code",[e._v("v-if")]),e._v(" 指令将根据表达式 "),a("code",[e._v("seen")]),e._v(" 的值的真假来插入/移除 "),a("code",[e._v("<p>")]),e._v(" 元素。")]),e._v(" "),a("h3",{attrs:{id:"参数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参数"}},[e._v("#")]),e._v(" "),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/syntax.html#%E5%8F%82%E6%95%B0",target:"_blank",rel:"noopener noreferrer"}},[e._v("参数"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，"),a("code",[e._v("v-bind")]),e._v(" 指令可以用于响应式地更新 HTML attribute：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('<a v-bind:href="url">...</a>\n')])])]),a("p",[e._v("在这里 "),a("code",[e._v("href")]),e._v(" 是参数，告知 "),a("code",[e._v("v-bind")]),e._v(" 指令将该元素的 "),a("code",[e._v("href")]),e._v(" attribute 与表达式 "),a("code",[e._v("url")]),e._v(" 的值绑定。")]),e._v(" "),a("p",[e._v("另一个例子是 "),a("code",[e._v("v-on")]),e._v(" 指令，它用于监听 DOM 事件：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('<a v-on:click="doSomething">...</a>\n')])])]),a("p",[e._v("在这里参数是监听的事件名。我们也会更详细地讨论事件处理。")]),e._v(" "),a("h3",{attrs:{id:"动态参数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#动态参数"}},[e._v("#")]),e._v(" "),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/syntax.html#%E5%8A%A8%E6%80%81%E5%8F%82%E6%95%B0",target:"_blank",rel:"noopener noreferrer"}},[e._v("动态参数"),a("OutboundLink")],1)]),e._v(" "),a("blockquote",[a("p",[e._v("2.6.0 新增")])]),e._v(" "),a("p",[e._v("从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('\x3c!--\n注意，参数表达式的写法存在一些约束，如之后的“对动态参数表达式的约束”章节所述。\n--\x3e\n<a v-bind:[attributeName]="url"> ... </a>\n')])])]),a("p",[e._v("这里的 "),a("code",[e._v("attributeName")]),e._v(" 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 "),a("code",[e._v("data")]),e._v(" property "),a("code",[e._v("attributeName")]),e._v("，其值为 "),a("code",[e._v('"href"')]),e._v("，那么这个绑定将等价于 "),a("code",[e._v("v-bind:href")]),e._v("。")]),e._v(" "),a("p",[e._v("同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('<a v-on:[eventName]="doSomething"> ... </a>\n')])])]),a("p",[e._v("在这个示例中，当 "),a("code",[e._v("eventName")]),e._v(" 的值为 "),a("code",[e._v('"focus"')]),e._v(" 时，"),a("code",[e._v("v-on:[eventName]")]),e._v(" 将等价于 "),a("code",[e._v("v-on:focus")]),e._v("。")]),e._v(" "),a("h4",{attrs:{id:"对动态参数的值的约束"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#对动态参数的值的约束"}},[e._v("#")]),e._v(" 对动态参数的值的约束")]),e._v(" "),a("p",[e._v("动态参数预期会求出一个字符串，异常情况下值为 "),a("code",[e._v("null")]),e._v("。这个特殊的 "),a("code",[e._v("null")]),e._v(" 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。")]),e._v(" "),a("h4",{attrs:{id:"对动态参数表达式的约束"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#对动态参数表达式的约束"}},[e._v("#")]),e._v(" 对动态参数表达式的约束")]),e._v(" "),a("p",[e._v("动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("\x3c!-- 这会触发一个编译警告 --\x3e\n<a v-bind:['foo' + bar]=\"value\"> ... </a>\n")])])]),a("p",[e._v("变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。")]),e._v(" "),a("p",[e._v("在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('\x3c!--\n在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。\n除非在实例中有一个名为“someattr”的 property，否则代码不会工作。\n--\x3e\n<a v-bind:[someAttr]="value"> ... </a>\n')])])]),a("h3",{attrs:{id:"修饰符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修饰符"}},[e._v("#")]),e._v(" "),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/syntax.html#%E4%BF%AE%E9%A5%B0%E7%AC%A6",target:"_blank",rel:"noopener noreferrer"}},[e._v("修饰符"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("修饰符 (modifier) 是以半角句号 "),a("code",[e._v(".")]),e._v(" 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，"),a("code",[e._v(".prevent")]),e._v(" 修饰符告诉 "),a("code",[e._v("v-on")]),e._v(" 指令对于触发的事件调用 "),a("code",[e._v("event.preventDefault()")]),e._v("：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('<form v-on:submit.prevent="onSubmit">...</form>\n')])])]),a("p",[e._v("在接下来对 "),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("v-on")]),a("OutboundLink")],1),e._v(" 和 "),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/forms.html#%E4%BF%AE%E9%A5%B0%E7%AC%A6",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("v-for")]),a("OutboundLink")],1),e._v(" 等功能的探索中，你会看到修饰符的其它例子。")]),e._v(" "),a("h2",{attrs:{id:"缩写"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缩写"}},[e._v("#")]),e._v(" "),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/syntax.html#%E7%BC%A9%E5%86%99",target:"_blank",rel:"noopener noreferrer"}},[e._v("缩写"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("code",[e._v("v-")]),e._v(" 前缀作为一种视觉提示，用来识别模板中 Vue 特定的 attribute。当你在使用 Vue.js 为现有标签添加动态行为 (dynamic behavior) 时，"),a("code",[e._v("v-")]),e._v(" 前缀很有帮助，然而，对于一些频繁用到的指令来说，就会感到使用繁琐。同时，在构建由 Vue 管理所有模板的"),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Single-page_application",target:"_blank",rel:"noopener noreferrer"}},[e._v("单页面应用程序 (SPA - single page application)"),a("OutboundLink")],1),e._v(" 时，"),a("code",[e._v("v-")]),e._v(" 前缀也变得没那么重要了。因此，Vue 为 "),a("code",[e._v("v-bind")]),e._v(" 和 "),a("code",[e._v("v-on")]),e._v(" 这两个最常用的指令，提供了特定简写：")]),e._v(" "),a("h3",{attrs:{id:"v-bind-缩写"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#v-bind-缩写"}},[e._v("#")]),e._v(" "),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/syntax.html#v-bind-%E7%BC%A9%E5%86%99",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("v-bind")]),e._v(" 缩写"),a("OutboundLink")],1)]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('\x3c!-- 完整语法 --\x3e\n<a v-bind:href="url">...</a>\n\n\x3c!-- 缩写 --\x3e\n<a :href="url">...</a>\n\n\x3c!-- 动态参数的缩写 (2.6.0+) --\x3e\n<a :[key]="url"> ... </a>\n')])])]),a("h3",{attrs:{id:"v-on-缩写"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#v-on-缩写"}},[e._v("#")]),e._v(" "),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/syntax.html#v-on-%E7%BC%A9%E5%86%99",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("v-on")]),e._v(" 缩写"),a("OutboundLink")],1)]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('\x3c!-- 完整语法 --\x3e\n<a v-on:click="doSomething">...</a>\n\n\x3c!-- 缩写 --\x3e\n<a @click="doSomething">...</a>\n\n\x3c!-- 动态参数的缩写 (2.6.0+) --\x3e\n<a @[event]="doSomething"> ... </a>\n')])])]),a("p",[e._v("它们看起来可能与普通的 HTML 略有不同，但 "),a("code",[e._v(":")]),e._v(" 与 "),a("code",[e._v("@")]),e._v(" 对于 attribute 名来说都是合法字符，在所有支持 Vue 的浏览器都能被正确地解析。而且，它们不会出现在最终渲染的标记中。缩写语法是完全可选的，但随着你更深入地了解它们的作用，你会庆幸拥有它们。")])])}),[],!1,null,null,null);t.default=v.exports}}]);