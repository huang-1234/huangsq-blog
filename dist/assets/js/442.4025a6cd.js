(window.webpackJsonp=window.webpackJsonp||[]).push([[442],{953:function(e,t,s){"use strict";s.r(t);var n=s(6),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"计算属性和侦听器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计算属性和侦听器"}},[e._v("#")]),e._v(" 计算属性和侦听器")]),e._v(" "),s("h2",{attrs:{id:"计算属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计算属性"}},[e._v("#")]),e._v(" "),s("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7",target:"_blank",rel:"noopener noreferrer"}},[e._v("计算属性"),s("OutboundLink")],1)]),e._v(" "),s("p",[e._v("模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("<div id=\"example\">\n  {{ message.split('').reverse().join('') }}\n</div>\n")])])]),s("p",[e._v("在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 "),s("code",[e._v("message")]),e._v(" 的翻转字符串。当你想要在模板中的多处包含此翻转字符串时，就会更加难以处理。")]),e._v(" "),s("p",[e._v("所以，对于任何复杂逻辑，你都应当使用"),s("strong",[e._v("计算属性")]),e._v("。")]),e._v(" "),s("h3",{attrs:{id:"基础例子"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基础例子"}},[e._v("#")]),e._v(" "),s("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/computed.html#%E5%9F%BA%E7%A1%80%E4%BE%8B%E5%AD%90",target:"_blank",rel:"noopener noreferrer"}},[e._v("基础例子"),s("OutboundLink")],1)]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("<div id=\"example\">\n  <p>Original message: \"{{ message }}\"</p>\n  <p>Computed reversed message: \"{{ reversedMessage }}\"</p>\n</div>\nvar vm = new Vue({\n  el: '#example',\n  data: {\n    message: 'Hello'\n  },\n  computed: {\n    // 计算属性的 getter\n    reversedMessage: function () {\n      // `this` 指向 vm 实例\n      return this.message.split('').reverse().join('')\n    }\n  }\n})\n")])])]),s("p",[e._v("结果：")]),e._v(" "),s("p",[e._v('Original message: "Hello"')]),e._v(" "),s("p",[e._v('Computed reversed message: "olleH"')]),e._v(" "),s("p",[e._v("这里我们声明了一个计算属性 "),s("code",[e._v("reversedMessage")]),e._v("。我们提供的函数将用作 property "),s("code",[e._v("vm.reversedMessage")]),e._v(" 的 getter 函数：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("console.log(vm.reversedMessage) // => 'olleH'\nvm.message = 'Goodbye'\nconsole.log(vm.reversedMessage) // => 'eybdooG'\n")])])]),s("p",[e._v("你可以打开浏览器的控制台，自行修改例子中的 vm。"),s("code",[e._v("vm.reversedMessage")]),e._v(" 的值始终取决于 "),s("code",[e._v("vm.message")]),e._v(" 的值。")]),e._v(" "),s("p",[e._v("你可以像绑定普通 property 一样在模板中绑定计算属性。Vue 知道 "),s("code",[e._v("vm.reversedMessage")]),e._v(" 依赖于 "),s("code",[e._v("vm.message")]),e._v("，因此当 "),s("code",[e._v("vm.message")]),e._v(" 发生改变时，所有依赖 "),s("code",[e._v("vm.reversedMessage")]),e._v(" 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 函数是没有副作用 (side effect) 的，这使它更易于测试和理解。")]),e._v(" "),s("h3",{attrs:{id:"计算属性缓存-vs-方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计算属性缓存-vs-方法"}},[e._v("#")]),e._v(" "),s("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%BC%93%E5%AD%98-vs-%E6%96%B9%E6%B3%95",target:"_blank",rel:"noopener noreferrer"}},[e._v("计算属性缓存 vs 方法"),s("OutboundLink")],1)]),e._v(" "),s("p",[e._v("你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("<p>Reversed message: \"{{ reversedMessage() }}\"</p>\n// 在组件中\nmethods: {\n  reversedMessage: function () {\n    return this.message.split('').reverse().join('')\n  }\n}\n")])])]),s("p",[e._v("我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是"),s("strong",[e._v("计算属性是基于它们的响应式依赖进行缓存的")]),e._v("。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 "),s("code",[e._v("message")]),e._v(" 还没有发生改变，多次访问 "),s("code",[e._v("reversedMessage")]),e._v(" 计算属性会立即返回之前的计算结果，而不必再次执行函数。")]),e._v(" "),s("p",[e._v("这也同样意味着下面的计算属性将不再更新，因为 "),s("code",[e._v("Date.now()")]),e._v(" 不是响应式依赖：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("computed: {\n  now: function () {\n    return Date.now()\n  }\n}\n")])])]),s("p",[e._v("相比之下，每当触发重新渲染时，调用方法将"),s("strong",[e._v("总会")]),e._v("再次执行函数。")]),e._v(" "),s("p",[e._v("我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 "),s("strong",[e._v("A")]),e._v("，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 "),s("strong",[e._v("A")]),e._v("。如果没有缓存，我们将不可避免的多次执行 "),s("strong",[e._v("A")]),e._v(" 的 getter！如果你不希望有缓存，请用方法来替代。")]),e._v(" "),s("h3",{attrs:{id:"计算属性-vs-侦听属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计算属性-vs-侦听属性"}},[e._v("#")]),e._v(" "),s("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7",target:"_blank",rel:"noopener noreferrer"}},[e._v("计算属性 vs 侦听属性"),s("OutboundLink")],1)]),e._v(" "),s("p",[e._v("Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动："),s("strong",[e._v("侦听属性")]),e._v("。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 "),s("code",[e._v("watch")]),e._v("——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 "),s("code",[e._v("watch")]),e._v(" 回调。细想一下这个例子：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("<div id=\"demo\">{{ fullName }}</div>\nvar vm = new Vue({\n  el: '#demo',\n  data: {\n    firstName: 'Foo',\n    lastName: 'Bar',\n    fullName: 'Foo Bar'\n  },\n  watch: {\n    firstName: function (val) {\n      this.fullName = val + ' ' + this.lastName\n    },\n    lastName: function (val) {\n      this.fullName = this.firstName + ' ' + val\n    }\n  }\n})\n")])])]),s("p",[e._v("上面代码是命令式且重复的。将它与计算属性的版本进行比较：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("var vm = new Vue({\n  el: '#demo',\n  data: {\n    firstName: 'Foo',\n    lastName: 'Bar'\n  },\n  computed: {\n    fullName: function () {\n      return this.firstName + ' ' + this.lastName\n    }\n  }\n})\n")])])]),s("p",[e._v("好得多了，不是吗？")]),e._v(" "),s("h3",{attrs:{id:"计算属性的-setter"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计算属性的-setter"}},[e._v("#")]),e._v(" "),s("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%9A%84-setter",target:"_blank",rel:"noopener noreferrer"}},[e._v("计算属性的 setter"),s("OutboundLink")],1)]),e._v(" "),s("p",[e._v("计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// ...\ncomputed: {\n  fullName: {\n    // getter\n    get: function () {\n      return this.firstName + ' ' + this.lastName\n    },\n    // setter\n    set: function (newValue) {\n      var names = newValue.split(' ')\n      this.firstName = names[0]\n      this.lastName = names[names.length - 1]\n    }\n  }\n}\n// ...\n")])])]),s("p",[e._v("现在再运行 "),s("code",[e._v("vm.fullName = 'John Doe'")]),e._v(" 时，setter 会被调用，"),s("code",[e._v("vm.firstName")]),e._v(" 和 "),s("code",[e._v("vm.lastName")]),e._v(" 也会相应地被更新。")]),e._v(" "),s("h2",{attrs:{id:"侦听器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#侦听器"}},[e._v("#")]),e._v(" "),s("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8",target:"_blank",rel:"noopener noreferrer"}},[e._v("侦听器"),s("OutboundLink")],1)]),e._v(" "),s("p",[e._v("虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 "),s("code",[e._v("watch")]),e._v(" 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。")]),e._v(" "),s("p",[e._v("例如：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("<div id=\"watch-example\">\n  <p>\n    Ask a yes/no question:\n    <input v-model=\"question\">\n  </p>\n  <p>{{ answer }}</p>\n</div>\n\x3c!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 --\x3e\n\x3c!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 --\x3e\n<script src=\"https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js\"><\/script>\n<script src=\"https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js\"><\/script>\n<script>\nvar watchExampleVM = new Vue({\n  el: '#watch-example',\n  data: {\n    question: '',\n    answer: 'I cannot give you an answer until you ask a question!'\n  },\n  watch: {\n    // 如果 `question` 发生改变，这个函数就会运行\n    question: function (newQuestion, oldQuestion) {\n      this.answer = 'Waiting for you to stop typing...'\n      this.debouncedGetAnswer()\n    }\n  },\n  created: function () {\n    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。\n    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率\n    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于\n    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，\n    // 请参考：https://lodash.com/docs#debounce\n    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)\n  },\n  methods: {\n    getAnswer: function () {\n      if (this.question.indexOf('?') === -1) {\n        this.answer = 'Questions usually contain a question mark. ;-)'\n        return\n      }\n      this.answer = 'Thinking...'\n      var vm = this\n      axios.get('https://yesno.wtf/api')\n        .then(function (response) {\n          vm.answer = _.capitalize(response.data.answer)\n        })\n        .catch(function (error) {\n          vm.answer = 'Error! Could not reach the API. ' + error\n        })\n    }\n  }\n})\n<\/script>\n")])])])])}),[],!1,null,null,null);t.default=a.exports}}]);