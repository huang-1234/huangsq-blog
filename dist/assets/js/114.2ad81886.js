(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{474:function(t,s,n){"use strict";n.r(s);var e=n(45),a=Object(e.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"事件循环"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#事件循环"}},[t._v("#")]),t._v(" 事件循环")]),t._v(" "),n("blockquote",[n("p",[t._v("Node.js EventEmitter")])]),t._v(" "),n("p",[t._v("Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。")]),t._v(" "),n("p",[t._v("Node.js 里面的许多对象都会分发事件：一个 net.Server 对象会在每次有新连接时触发一个事件， 一个 fs.readStream 对象会在文件被打开的时候触发一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//event.js 文件")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" events "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'events'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" emitter "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("events"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("EventEmitter")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \nemitter"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("on")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'someEvent'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("arg1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" arg2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'listener1'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" arg1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" arg2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \nemitter"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("on")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'someEvent'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("arg1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" arg2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'listener2'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" arg1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" arg2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \nemitter"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("emit")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'someEvent'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'arg1 参数'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'arg2 参数'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 运行：$ node event.js ")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//listener1 arg1 参数 arg2 参数")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//listener2 arg1 参数 arg2 参数")]),t._v("\n")])])]),n("h3",{attrs:{id:"方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#方法"}},[t._v("#")]),t._v(" 方法")]),t._v(" "),n("table",[n("thead",[n("tr",[n("th",{staticStyle:{"text-align":"left"}},[t._v("序号")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("方法 & 描述")])])]),t._v(" "),n("tbody",[n("tr",[n("td",{staticStyle:{"text-align":"left"}},[t._v("1")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("strong",[t._v("addListener(event, listener)")]),t._v(" 为指定事件添加一个监听器到监听器数组的尾部。")])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[t._v("2")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("strong",[t._v("on(event, listener)")]),t._v(" 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。"),n("code",[t._v("server.on('connection', function (stream) { console.log('someone connected!'); });")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[t._v("3")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("strong",[t._v("once(event, listener)")]),t._v(" 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。"),n("code",[t._v("server.once('connection', function (stream) { console.log('Ah, we have our first user!'); });")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[t._v("4")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("strong",[t._v("removeListener(event, listener)")]),t._v(" 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称。"),n("code",[t._v("var callback = function(stream) { console.log('someone connected!'); }; server.on('connection', callback); // ... server.removeListener('connection', callback);")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[t._v("5")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("strong",[t._v("removeAllListeners([event])")]),t._v(" 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。")])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[t._v("6")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("strong",[t._v("setMaxListeners(n)")]),t._v(" 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于改变监听器的默认限制的数量。")])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[t._v("7")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("strong",[t._v("listeners(event)")]),t._v(" 返回指定事件的监听器数组。")])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[t._v("8")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("strong",[t._v("emit(event, [arg1], [arg2], [...])")]),t._v(" 按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false。")])])])]),t._v(" "),n("h3",{attrs:{id:"类方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#类方法"}},[t._v("#")]),t._v(" 类方法")]),t._v(" "),n("table",[n("thead",[n("tr",[n("th",{staticStyle:{"text-align":"left"}},[t._v("序号")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("方法 & 描述")])])]),t._v(" "),n("tbody",[n("tr",[n("td",{staticStyle:{"text-align":"left"}},[t._v("1")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("strong",[t._v("listenerCount(emitter, event)")]),t._v(" 返回指定事件的监听器数量。")])])])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("events"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("EventEmitter"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("listenerCount")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("emitter"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" eventName"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//已废弃，不推荐")]),t._v("\nevents"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("emitter"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("listenerCount")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("eventName"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//推荐")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=a.exports}}]);