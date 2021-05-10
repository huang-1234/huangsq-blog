(window.webpackJsonp=window.webpackJsonp||[]).push([[161],{669:function(e,r,t){"use strict";t.r(r);var n=t(6),a=Object(n.a)({},(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"eggjs是什么"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#eggjs是什么"}},[e._v("#")]),e._v(" eggjs是什么")]),e._v(" "),t("blockquote",[t("p",[e._v("首先来看看官网怎么说")])]),e._v(" "),t("h2",{attrs:{id:"设计原则"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设计原则"}},[e._v("#")]),e._v(" 设计原则")]),e._v(" "),t("p",[e._v("我们深知企业级应用在追求规范和共建的同时，还需要考虑如何平衡不同团队之间的差异，求同存异。所以我们没有选择社区常见框架的大集市模式（集成如数据库、模板引擎、前端框架等功能），而是专注于提供 Web 开发的核心功能和一套灵活可扩展的插件机制。我们不会做出技术选型，因为固定的技术选型会使框架的扩展性变差，无法满足各种定制需求。通过 Egg，团队的架构师和技术负责人可以非常容易地基于自身的技术架构在 Egg 基础上扩展出适合自身业务场景的框架。")]),e._v(" "),t("p",[e._v("Egg 的插件机制有很高的可扩展性，"),t("strong",[e._v("一个插件只做一件事")]),e._v("（比如 "),t("a",{attrs:{href:"https://mozilla.github.io/nunjucks",target:"_blank",rel:"noopener noreferrer"}},[e._v("Nunjucks"),t("OutboundLink")],1),e._v(" 模板封装成了 "),t("a",{attrs:{href:"https://github.com/eggjs/egg-view-nunjucks",target:"_blank",rel:"noopener noreferrer"}},[e._v("egg-view-nunjucks"),t("OutboundLink")],1),e._v("、MySQL 数据库封装成了 "),t("a",{attrs:{href:"https://github.com/eggjs/egg-mysql",target:"_blank",rel:"noopener noreferrer"}},[e._v("egg-mysql"),t("OutboundLink")],1),e._v("）。Egg 通过框架聚合这些插件，并根据自己的业务场景定制配置，这样应用的开发成本就变得很低。")]),e._v(" "),t("p",[e._v("Egg 奉行『"),t("strong",[e._v("约定优于配置")]),e._v("』，按照"),t("a",{attrs:{href:"https://eggjs.org/zh-cn/advanced/loader.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("一套统一的约定"),t("OutboundLink")],1),e._v("进行应用开发，团队内部采用这种方式可以减少开发人员的学习成本，开发人员不再是『钉子』，可以流动起来。没有约定的团队，沟通成本是非常高的，比如有人会按目录分栈而其他人按目录分功能，开发者认知不一致很容易犯错。但约定不等于扩展性差，相反 Egg 有很高的扩展性，可以按照团队的约定定制框架。使用 "),t("a",{attrs:{href:"https://eggjs.org/zh-cn/advanced/loader.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Loader"),t("OutboundLink")],1),e._v(" 可以让框架根据不同环境定义默认配置，还可以覆盖 Egg 的默认约定。")]),e._v(" "),t("h2",{attrs:{id:"与社区框架的差异"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#与社区框架的差异"}},[e._v("#")]),e._v(" 与社区框架的差异")]),e._v(" "),t("p",[t("a",{attrs:{href:"http://expressjs.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Express"),t("OutboundLink")],1),e._v(" 是 Node.js 社区广泛使用的框架，简单且扩展性强，非常适合做个人项目。但框架本身缺少约定，标准的 MVC 模型会有各种千奇百怪的写法。Egg 按照约定进行开发，奉行『约定优于配置』，团队协作成本低。")]),e._v(" "),t("p",[t("a",{attrs:{href:"http://sailsjs.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sails"),t("OutboundLink")],1),e._v(" 是和 Egg 一样奉行『约定优于配置』的框架，扩展性也非常好。但是相比 Egg，"),t("a",{attrs:{href:"http://sailsjs.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sails"),t("OutboundLink")],1),e._v(" 支持 Blueprint REST API、"),t("a",{attrs:{href:"https://github.com/balderdashy/waterline",target:"_blank",rel:"noopener noreferrer"}},[e._v("WaterLine"),t("OutboundLink")],1),e._v(" 这样可扩展的 ORM、前端集成、WebSocket 等，但这些功能都是由 "),t("a",{attrs:{href:"http://sailsjs.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sails"),t("OutboundLink")],1),e._v(" 提供的。而 Egg 不直接提供功能，只是集成各种功能插件，比如实现 egg-blueprint，egg-waterline 等这样的插件，再使用 sails-egg 框架整合这些插件就可以替代 "),t("a",{attrs:{href:"http://sailsjs.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sails"),t("OutboundLink")],1),e._v(" 了。")]),e._v(" "),t("h2",{attrs:{id:"特性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#特性"}},[e._v("#")]),e._v(" 特性")]),e._v(" "),t("ul",[t("li",[e._v("提供基于 Egg "),t("a",{attrs:{href:"https://eggjs.org/zh-cn/advanced/framework.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("定制上层框架"),t("OutboundLink")],1),e._v("的能力")]),e._v(" "),t("li",[e._v("高度可扩展的"),t("a",{attrs:{href:"https://eggjs.org/zh-cn/basics/plugin.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("插件机制"),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("内置"),t("a",{attrs:{href:"https://eggjs.org/zh-cn/advanced/cluster-client.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("多进程管理"),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("基于 "),t("a",{attrs:{href:"http://koajs.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Koa"),t("OutboundLink")],1),e._v(" 开发，性能优异")]),e._v(" "),t("li",[e._v("框架稳定，测试覆盖率高")]),e._v(" "),t("li",[t("a",{attrs:{href:"https://eggjs.org/zh-cn/tutorials/progressive.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("渐进式开发"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);r.default=a.exports}}]);