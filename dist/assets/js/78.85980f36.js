(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{436:function(t,s,a){"use strict";a.r(s);var n=a(45),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"对js宏任务和gui线程的疑惑"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#对js宏任务和gui线程的疑惑"}},[t._v("#")]),t._v(" 对js宏任务和GUI线程的疑惑")]),t._v(" "),a("h2",{attrs:{id:"事件循环进阶-macrotask与microtask"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件循环进阶-macrotask与microtask"}},[t._v("#")]),t._v(" 事件循环进阶：macrotask与microtask")]),t._v(" "),a("p",[t._v("这段参考了参考来源中的第2篇文章（英文版的），（加了下自己的理解重新描述了下），\n强烈推荐有英文基础的同学直接观看原文，作者描述的很清晰，示例也很不错，如下：")]),t._v(" "),a("p",[t._v("https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/")]),t._v(" "),a("p",[t._v("上文中将JS事件循环机制梳理了一遍，在ES5的情况是够用了，但是在ES6盛行的现在，仍然会遇到一些问题，譬如下面这题：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'script start'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'setTimeout'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nPromise"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'promise1'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'promise2'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'script end'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("嗯哼，它的正确执行顺序是这样子的：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("script start\nscript end\npromise1\npromise2\nsetTimeout\n")])])]),a("p",[t._v("为什么呢？因为Promise里有了一个一个新的概念："),a("code",[t._v("microtask")])]),t._v(" "),a("p",[t._v("或者，进一步，JS中分为两种任务类型："),a("strong",[a("code",[t._v("macrotask")]),t._v("和"),a("code",[t._v("microtask")])]),t._v("，在ECMAScript中，microtask称为"),a("code",[t._v("jobs")]),t._v("，macrotask可称为"),a("code",[t._v("task")])]),t._v(" "),a("p",[t._v("它们的定义？区别？简单点可以按如下理解：")]),t._v(" "),a("ul",[a("li",[t._v("macrotask（又称之为宏任务），可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）\n"),a("ul",[a("li",[t._v("每一个task会从头到尾将这个任务执行完毕，不会执行其它")]),t._v(" "),a("li",[t._v("浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染。"),a("font",{attrs:{color:"red"}},[t._v("task之间的渲染指代什么???")])],1)])])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("（`task->渲染->task->...`）\n")])])]),a("ul",[a("li",[t._v("microtask（又称为微任务），可以理解是在当前 task 执行结束后立即执行的任务\n"),a("ul",[a("li",[t._v("也就是说，在当前task任务后，下一个task之前，在渲染之前")]),t._v(" "),a("li",[t._v("所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染")]),t._v(" "),a("li",[t._v("也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）")])])])]),t._v(" "),a("p",[t._v("分别很么样的场景会形成macrotask和microtask呢？")]),t._v(" "),a("ul",[a("li",[t._v("macrotask：主代码块，setTimeout，setInterval等（可以看到，事件队列中的每一个事件都是一个macrotask）")]),t._v(" "),a("li",[t._v("microtask：Promise，process.nextTick等")])]),t._v(" "),a("p",[a("strong",[t._v("补充：在node环境下，process.nextTick的优先级高于Promise")]),t._v("，也就是可以简单理解为：在宏任务结束后会先执行微任务队列中的nextTickQueue部分，然后才会执行微任务中的Promise部分。")]),t._v(" "),a("p",[t._v("参考：https://segmentfault.com/q/1010000011914016")]),t._v(" "),a("p",[t._v("再根据线程来理解下：")]),t._v(" "),a("ul",[a("li",[t._v("macrotask中的事件都是放在一个事件队列中的，而这个队列由"),a("strong",[t._v("事件触发线程")]),t._v("维护")]),t._v(" "),a("li",[t._v("microtask中的所有微任务都是添加到微任务队列（Job Queues）中，等待当前macrotask执行完毕后执行，而这个队列由"),a("strong",[t._v("JS引擎线程维护")])])]),t._v(" "),a("p",[t._v("（这点由自己理解+推测得出，因为它是在主线程下无缝执行的）")]),t._v(" "),a("p",[t._v("所以，总结下运行机制：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("执行一个宏任务（栈中没有就从事件队列中获取）")])]),t._v(" "),a("li",[a("p",[t._v("执行过程中如果遇到微任务，就将它添加到微任务的任务队列中")])]),t._v(" "),a("li",[a("p",[t._v("宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）")])]),t._v(" "),a("li",[a("p",[t._v("当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染")])]),t._v(" "),a("li",[a("p",[t._v("渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）")])])]),t._v(" "),a("h2",{attrs:{id:"使用mutationobserver实现microtask"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用mutationobserver实现microtask"}},[t._v("#")]),t._v(" 使用MutationObserver实现microtask")]),t._v(" "),a("p",[t._v("MutationObserver可以用来实现microtask\n（它属于microtask，优先级小于Promise，\n一般是Promise不支持时才会这样做）")]),t._v(" "),a("p",[t._v("它是HTML5中的新特性，作用是：监听一个DOM变动，\n当DOM对象树发生任何变动时，Mutation Observer会得到通知")]),t._v(" "),a("p",[t._v("像以前的Vue源码中就是利用它来模拟nextTick的，\n具体原理是，创建一个TextNode并监听内容变化，\n然后要nextTick的时候去改一下这个节点的文本内容，\n如下：（Vue的源码，未修改）")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" counter "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" observer "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MutationObserver")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("nextTickHandler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" textNode "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createTextNode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("counter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nobserver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("observe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("textNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    characterData"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("timerFunc")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    counter "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("counter "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("\n    textNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("counter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("a",{attrs:{href:"https://github.com/vuejs/vue/blob/9cfd63a7d08c1eba029c8bd7463b3047c3347826/src/core/util/env.js#L86-L95",target:"_blank",rel:"noopener noreferrer"}},[t._v("对应Vue源码链接"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("不过，现在的Vue（2.5+）的nextTick实现移除了MutationObserver的方式（据说是兼容性原因），\n取而代之的是使用MessageChannel\n（当然，默认情况仍然是Promise，不支持才兼容的）。")]),t._v(" "),a("p",[t._v("MessageChannel属于宏任务，优先级是："),a("code",[t._v("MessageChannel->setTimeout")]),t._v("，\n所以Vue（2.5+）内部的nextTick与2.4及之前的实现是不一样的，需要注意下。")]),t._v(" "),a("p",[t._v("这里不展开，可以看下https://juejin.im/post/5a1af88f5188254a701ec230")])])}),[],!1,null,null,null);s.default=e.exports}}]);