(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{375:function(t,a,s){"use strict";s.r(a);var e=s(45),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"开启网络线程到发出一个完整的http请求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#开启网络线程到发出一个完整的http请求"}},[t._v("#")]),t._v(" 开启网络线程到发出一个完整的http请求")]),t._v(" "),s("h2",{attrs:{id:"什么是域名"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是域名"}},[t._v("#")]),t._v(" 什么是域名")]),t._v(" "),s("h1",{attrs:{id:"什么是域名-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是域名-2"}},[t._v("#")]),t._v(" 什么是域名？")]),t._v(" "),s("p",[t._v("本文中我们讨论了域名是什么，域名是如何被构建的，以及如何获得一个域名。")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("前提:")]),t._v(" "),s("th",[t._v("首先你得知道 "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/How_does_the_Internet_work",target:"_blank",rel:"noopener noreferrer"}},[t._v("互联网是怎么工作的"),s("OutboundLink")],1),t._v(" 并理解 "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL",target:"_blank",rel:"noopener noreferrer"}},[t._v("什么是URL"),s("OutboundLink")],1),t._v("。")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("目标:")]),t._v(" "),s("td",[t._v("学习域名是什么，域名的工作方式，以及域名的重要性。")])])])]),t._v(" "),s("h3",{attrs:{id:"概述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_domain_name#%E6%A6%82%E8%BF%B0",target:"_blank",rel:"noopener noreferrer"}},[t._v("概述"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("域名（Domain names）是互联网基础架构的关键部分。它们为互联网上任何可用的网页服务器提供了方便人类理解的地址。")]),t._v(" "),s("p",[t._v("任何连上互联网的电脑都可以通过一个公共"),s("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Glossary/IP",target:"_blank",rel:"noopener noreferrer"}},[t._v("IP"),s("OutboundLink")],1),t._v("地址访问到，对于IPv4地址来说，这个地址有32位（它们通常写成四个范围在0~255以内，由点分隔的数字组成，比如173.194.121.32），而对于IPv6来说，这个地址有128位，通常写成八组由冒号分隔的四个十六进制数(e.g., "),s("code",[t._v("2027:0da8:8b73:0000:0000:8a2e:0370:1337")]),t._v("). 计算机可以很容易地处理这些IP地址, 但是对一个人来说很难找出谁在操控这些服务器以及这些网站提供什么服务。IP 地址很难记忆而且可能会随着时间的推移发生改变 。为了解决这些问题，我们使用方便记忆的地址，称作域名。")]),t._v(" "),s("h3",{attrs:{id:"自主学习"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自主学习"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_domain_name#%E8%87%AA%E4%B8%BB%E5%AD%A6%E4%B9%A0",target:"_blank",rel:"noopener noreferrer"}},[t._v("自主学习"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("em",[t._v("还没有可用的资料。请考虑为此投稿["),s("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/MDN/Contribute/Getting_started",target:"_blank",rel:"noopener noreferrer"}},[t._v("Please, consider contributing"),s("OutboundLink")],1),t._v("]。")])]),t._v(" "),s("h3",{attrs:{id:"深入探索"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#深入探索"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_domain_name#%E6%B7%B1%E5%85%A5%E6%8E%A2%E7%B4%A2",target:"_blank",rel:"noopener noreferrer"}},[t._v("深入探索"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"域名的结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#域名的结构"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_domain_name#%E5%9F%9F%E5%90%8D%E7%9A%84%E7%BB%93%E6%9E%84",target:"_blank",rel:"noopener noreferrer"}},[t._v("域名的结构"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("一个域名是由几部分（有可能只是一部分，也许是两部分，三部分...）组成的简单结构，它被点分隔，不同于中文书写顺序，它"),s("strong",[t._v("需要从右到左阅读")]),t._v("。")]),t._v(" "),s("p",[s("img",{attrs:{src:"bNetWorkThreadhttpRequest.assets/structure.png",alt:"Anatomy of the MDN domain name"}})]),t._v(" "),s("p",[t._v("域名的每一部分都提供着特定信息。")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Glossary/TLD",target:"_blank",rel:"noopener noreferrer"}},[t._v("TLD"),s("OutboundLink")],1),t._v(" （Top-Level Domain，顶级域名）")]),t._v(" "),s("p",[t._v("顶级域名可以告诉用户域名所提供的服务类型。最通用的顶级域名（.com, .org, .net）不需要web服务器满足严格的标准，但一些顶级域名则执行更严格的政策。比如：")]),t._v(" "),s("ul",[s("li",[t._v("地区的顶级域名，如.us，.fr，或.sh，可以要求必须提供给定语言的服务器或者托管在指定国家。这些TLD通常表明对应的网页服务从属于何种语言或哪个地区。")]),t._v(" "),s("li",[t._v("包含.gov的顶级域名只能被政府部门使用。")]),t._v(" "),s("li",[t._v(".edu只能为教育或研究机构使用。")])]),t._v(" "),s("p",[t._v("顶级域名既可以包含拉丁字母，也可以包含特殊字符。顶级域名最长可以达到63个字符，不过为了使用方便，大多数顶级域名都是两到三个字符。")]),t._v(" "),s("p",[t._v("顶级域名的完整列表是"),s("a",{attrs:{href:"https://www.icann.org/resources/pages/tlds-2012-02-25-en",target:"_blank",rel:"noopener noreferrer"}},[t._v("ICANN"),s("OutboundLink")],1),t._v("维护的。")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("标签 (或者说是组件)")]),t._v(" "),s("p",[t._v("标签都是紧随着TLD的。标签由1到63个大小写不敏感的字符组成，这些字符包含字母A-z，数字0-9，甚至 “-” 这个符号（当然，“-” 不应该出现在标签开头或者标签的结尾）。举几个例子，"),s("code",[t._v("a")]),t._v("，"),s("code",[t._v("97")]),t._v("，或者 "),s("code",[t._v("hello-strange-person-16-how-are-you")]),t._v(" 都是合法的标签。")])]),t._v(" "),s("li",[s("p",[t._v("Secondary Level Domain, 二级域名")]),t._v(" "),s("p",[t._v("刚好位于TLD前面的标签也被称为二级域名 (SLD)。一个域名可以有多个标签（或者说是组件），没有强制规定必须要3个标签来构成域名。例如，www.inf.ed.ac.uk 是一个正确的域名。当拥有了“上级”部分(例如 "),s("a",{attrs:{href:"https://mozilla.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("mozilla.org"),s("OutboundLink")],1),t._v(')，你还可以创建另外的域名 (有时被称为 "子域名") (例如 '),s("a",{attrs:{href:"https://developer.mozilla.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("developer.mozilla.org"),s("OutboundLink")],1),t._v(").")])])]),t._v(" "),s("h3",{attrs:{id:"购买域名"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#购买域名"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_domain_name#%E8%B4%AD%E4%B9%B0%E5%9F%9F%E5%90%8D",target:"_blank",rel:"noopener noreferrer"}},[t._v("购买域名"),s("OutboundLink")],1)]),t._v(" "),s("h4",{attrs:{id:"谁拥有域名"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#谁拥有域名"}},[t._v("#")]),t._v(" 谁拥有域名？")]),t._v(" "),s("p",[t._v("你不能真正地 “购买一个域名”，你只能花钱获得一个域名在一年或多年内的使用权。不过你可以延长你的使用权，同时你的续期将优先于其他人的使用申请。但你从来都没有拥有过域名。")]),t._v(" "),s("p",[t._v("被称为域名注册商的公司通过域名登记来记录连接你和你的域名的技术与管理信息。")]),t._v(" "),s("p",[s("strong",[t._v("提示 :")]),t._v(" 对于一些域名，它可能不归属于某个域名注册商来负责记录。比如说，每个在.fire下的域名由Amazon管理。")]),t._v(" "),s("h4",{attrs:{id:"找个可用的域名"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#找个可用的域名"}},[t._v("#")]),t._v(" 找个可用的域名")]),t._v(" "),s("p",[t._v("想要知道一个给定的域名是否可用，")]),t._v(" "),s("ul",[s("li",[t._v('去域名注册商的网站。它们大多会提供"whois"服务，告诉你一个域名是否可用。')]),t._v(" "),s("li",[t._v("另外，如果你使用系统的内置shell，可以在里面输入whois命令，下面显示的是mozilla.org网站的结果：")])]),t._v(" "),s("div",{staticClass:"language-text extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$ whois mozilla.org\nDomain Name:MOZILLA.ORG\nDomain ID: D1409563-LROR\nCreation Date: 1998-01-24T05:00:00Z\nUpdated Date: 2013-12-08T01:16:57Z\nRegistry Expiry Date: 2015-01-23T05:00:00Z\nSponsoring Registrar:MarkMonitor Inc. (R37-LROR)\nSponsoring Registrar IANA ID: 292\nWHOIS Server:\nReferral URL:\nDomain Status: clientDeleteProhibited\nDomain Status: clientTransferProhibited\nDomain Status: clientUpdateProhibited\nRegistrant ID:mmr-33684\nRegistrant Name:DNS Admin\nRegistrant Organization:Mozilla Foundation\nRegistrant Street: 650 Castro St Ste 300\nRegistrant City:Mountain View\nRegistrant State/Province:CA\nRegistrant Postal Code:94041\nRegistrant Country:US\nRegistrant Phone:+1.6509030800\n")])])]),s("p",[t._v("正如你所见，我不能注册"),s("code",[t._v("mozilla.org")]),t._v("，因为Mozilla基金会已经注册它了。")]),t._v(" "),s("p",[t._v("另外，如果你想看看我能不能注册"),s("code",[t._v("afunkydomainname.org")]),t._v("：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$ whois afunkydomainname.org\nNOT FOUND\n")])])]),s("p",[t._v("正如你所见，（在本文写作时）这个域名在whois数据库中不存在，所以我们可以要求去注册它。祝你好运吧！")]),t._v(" "),s("h4",{attrs:{id:"获得一个域名"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#获得一个域名"}},[t._v("#")]),t._v(" 获得一个域名")]),t._v(" "),s("p",[t._v("过程很简单：")]),t._v(" "),s("ol",[s("li",[t._v("去域名注册商的网站。")]),t._v(" "),s("li",[t._v('通常那些网站上都有突出的"获得域名"宣传，点击它。')]),t._v(" "),s("li",[t._v("按要求仔细填表。一定要"),s("strong",[t._v("仔细检查")]),t._v("你是否有将你想要的域名拼错。一旦你给错误域名付款了，便为时已晚！")]),t._v(" "),s("li",[t._v("注册商将会在域名正确注册后通知你。数小时之内，所有DNS服务器都会收到你的DNS信息。")])]),t._v(" "),s("p",[s("strong",[t._v("注意:")]),t._v(" 在这个过程中注册商会要求你的真实住址。请保证你正确地填写了，因为在一些国家，如果你没有提供合法的地址，注册商会关闭你的域名。")]),t._v(" "),s("h4",{attrs:{id:"dns-刷新"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dns-刷新"}},[t._v("#")]),t._v(" DNS 刷新")]),t._v(" "),s("p",[t._v("DNS数据库存储在全球每个DNS服务器上，所有这些服务器都源于(refer to)几个被称为“权威名称服务器”或“顶级DNS服务器”。只要您的注册商创建或更新给定域名的任何信息，信息就必须在每个DNS数据库中刷新。 知道给定域名的每个DNS服务器都会存储一段时间的信息，然后再次刷新（DNS服务器再次查询权威服务器）。 因此，知道此域名的DNS服务器需要一些时间才能获取最新信息。")]),t._v(" "),s("p",[s("strong",[t._v("注意 :")]),t._v(" 这个时间一般被称为 "),s("strong",[t._v("传播时间")]),t._v(" 。 然而这个术语是不精准的，因为更新本身没有传播 (top → down)。被你电脑(down)查询的 DNS 服务器只在他需要的时候才从权威服务器(top)中获取信息。")]),t._v(" "),s("h3",{attrs:{id:"dns请求如何工作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dns请求如何工作"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_domain_name#dns%E8%AF%B7%E6%B1%82%E5%A6%82%E4%BD%95%E5%B7%A5%E4%BD%9C%EF%BC%9F",target:"_blank",rel:"noopener noreferrer"}},[t._v("DNS请求如何工作？"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("正如我们所看到的，当你想在浏览器中展示一个网页的时候，输入域名比输入IP简单多了。让我们看一下这个过程：")]),t._v(" "),s("ol",[s("li",[t._v("在你的浏览器地址栏输入"),s("code",[t._v("mozilla.org")]),t._v("。")]),t._v(" "),s("li",[t._v("您的浏览器询问您的计算机是否已经识别此域名所确定的IP地址（使用本地DNS缓存）。 如果是的话，这个域名被转换为IP地址，然后浏览器与网络服务器交换内容。结束。")]),t._v(" "),s("li",[t._v("如果你的电脑不知道 "),s("code",[t._v("mozilla.org")]),t._v(" 域名背后的IP, 它会询问一个DNS服务器，这个服务器的工作就是告诉你的电脑已经注册的域名所匹配的IP。")]),t._v(" "),s("li",[t._v("现在电脑知道了要请求的IP地址，你的浏览器能够与网络服务器交换内容。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"bNetWorkThreadhttpRequest.assets/2014-10-dns-request2.png",alt:"Explanation of the steps needed to obtain the result to a DNS request"}})]),t._v(" "),s("h3",{attrs:{id:"下一步"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#下一步"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_domain_name#%E4%B8%8B%E4%B8%80%E6%AD%A5",target:"_blank",rel:"noopener noreferrer"}},[t._v("下一步"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("好了,我们讲了许多有关的步骤和结构. 接下来.")]),t._v(" "),s("ul",[s("li",[t._v("如果你想亲自实践, 现在最好开始深入设计和探索 "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Common_web_layouts",target:"_blank",rel:"noopener noreferrer"}},[t._v("对一个网页的剖析"),s("OutboundLink")],1),t._v(".")]),t._v(" "),s("li",[t._v("关于建站需要的花销这类问题的讨论也是有价值的. 请参考 "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/How_much_does_it_cost",target:"_blank",rel:"noopener noreferrer"}},[t._v("建站需要花费多少钱 "),s("OutboundLink")],1),t._v(".")]),t._v(" "),s("li",[t._v("或者在维基百科上阅读更多关于 "),s("a",{attrs:{href:"http://en.wikipedia.org/wiki/Domain_name",target:"_blank",rel:"noopener noreferrer"}},[t._v("域名"),s("OutboundLink")],1),t._v(" .")])]),t._v(" "),s("h2",{attrs:{id:"dns查询"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dns查询"}},[t._v("#")]),t._v(" dns查询")]),t._v(" "),s("h2",{attrs:{id:"tcp-ip链接"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tcp-ip链接"}},[t._v("#")]),t._v(" tcp/ip链接")]),t._v(" "),s("h2",{attrs:{id:"五层因特网协议栈"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#五层因特网协议栈"}},[t._v("#")]),t._v(" 五层因特网协议栈")]),t._v(" "),s("h2",{attrs:{id:"优化方案-如dns-prefetch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#优化方案-如dns-prefetch"}},[t._v("#")]),t._v(" 优化方案，如dns-prefetch")]),t._v(" "),s("h3",{attrs:{id:"诞生背景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#诞生背景"}},[t._v("#")]),t._v(" 诞生背景")]),t._v(" "),s("p",[t._v("Dns请求虽然占用了很少的带宽，但会有很高的延迟，由其以移动网络会更加明显。通过dns预解析技术可以很好的降低延迟")]),t._v(" "),s("p",[t._v("在firefox上使用dns-prefetch，dns预解析是与页面加载是并行处理的，且不用影响到页面加载的性能.")]),t._v(" "),s("p",[t._v("在以图片为主移动网站被访问时，在使用DNS预解析的情意中下，页面加载时间可以提升%5个点")]),t._v(" "),s("h3",{attrs:{id:"一、什么是dns-prefetch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、什么是dns-prefetch"}},[t._v("#")]),t._v(" 一、什么是dns-prefetch？")]),t._v(" "),s("p",[t._v("DNS Prefetch 是一种 DNS 预解析技术。当你浏览网页时，浏览器会在加载网页时对网页中的域名进行解析缓存，这样在你单击当前网页中的连接时就无需进行 DNS 的解析，减少用户等待时间，提高用户体验。\n目前每次DNS解析，通常在200ms以下。针对DNS解析耗时问题，一些浏览器通过DNS Prefetch 来提高访问的流畅性。")]),t._v(" "),s("h3",{attrs:{id:"二、如何设置dns-prefetch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、如何设置dns-prefetch"}},[t._v("#")]),t._v(" 二、如何设置dns-prefetch？")]),t._v(" "),s("p",[t._v("DNS Prefetch 应该尽量的放在网页的前面，推荐放在")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("charset")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("UTF-8"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" 后面。具体使用方法如下：\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("http-equiv")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("x-dns-prefetch-control"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("on"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dns-prefetch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("//www.zhix.net"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dns-prefetch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("//api.share.zhix.net"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dns-prefetch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("//bdimg.share.zhix.net"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dns-prefetch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("http://renpengpeng.com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--如果不确定是http还是https连接的话建议如下写法 --\x3e")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dns-prefetch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("//renpengpeng.com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),s("h3",{attrs:{id:"三、dns-prefetching预解析实现原理与注意事项"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、dns-prefetching预解析实现原理与注意事项"}},[t._v("#")]),t._v(" 三、DNS Prefetching预解析实现原理与注意事项")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[t._v("1."),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("信息告诉浏览器，当前页面要做DNS预解析；\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("http-equiv")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("x-dns-prefetch-control"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("on"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n2."),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("使用"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("标签来强制对DNS预解析；\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dns-prefetch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("http://bdimg.share.baidu.com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[s("p",[t._v("dns-prefetch需慎用，多页面重复DNS预解析会增加重复DNS查询次数；")])]),t._v(" "),s("li",[s("p",[t._v("浏览器对网站第一次的域名DNS解析查找流程：")])])]),t._v(" "),s("p",[t._v("浏览器缓存 -> 系统缓存 -> 路由器缓存 -> ISP -> DNS缓存 -> 递归搜素\n5. 如果要禁止隐式的DNS Prefetch，可以使用以下标签")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("http-equiv")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("x-dns-prefetch-control"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("off"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("h3",{attrs:{id:"四、典型案例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#四、典型案例"}},[t._v("#")]),t._v(" 四、典型案例;")]),t._v(" "),s("p",[t._v("淘宝：")]),t._v(" "),s("p",[t._v("支付宝：")]),t._v(" "),s("p",[t._v("网易：")]),t._v(" "),s("p"),t._v(" "),s("h3",{attrs:{id:"注意"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#注意"}},[t._v("#")]),t._v(" 注意;")]),t._v(" "),s("blockquote",[s("p",[t._v("虽然使用 DNS Prefetch 能够加快页面的解析速度，但是也不能滥用，因为有开发者指出 禁用DNS 预读取能节省每月100亿的DNS查询")])])])}),[],!1,null,null,null);a.default=n.exports}}]);