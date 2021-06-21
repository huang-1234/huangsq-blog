## Vue

Vue.js（通常被称为Vue；发音为/vjuː/，类似于 "view"）是一个开源的Model-view-viewmodel JavaScript框架，用于构建用户界面和单页面应用程序。它由Evan You创建，由他和来自Netlify和Netguru等多家公司的核心成员维护。

**概述**

Vue.js的特点是，它采用了一个渐进式的架构，专注于声明式渲染和组件合成。复杂应用所需的高级功能，如路由、状态管理和构建工具等，都是通过官方维护的支持库和包提供的，其中Nuxt.js是最受欢迎的解决方案之一。

Vue.js可以让你用称为指令（directives）的HTML属性来扩展HTML。

**历史**

Vue是由Evan You创建的。在Google工作期间，他使用AngularJS技术参与了多个项目的开发的，之后创建了Vue。他后来总结了自己的思考过程。"我想，如果我可以把AngularJS真正优秀的部分提取出来，然后构建一些轻量级的东西，会怎么样呢？" 项目的第一个版本源码提交日期是2013年7月，Vue在2014年2月首次发布。

**特点**

**组件化**

Vue 组件扩展了基本的 HTML 元素来封装可重用的代码。从高层次的角度看，组件是Vue编译器附加行为的自定义元素。在Vue中，组件本质上就是一个带有预设选项的Vue实例。下面的代码片段包含了一个Vue组件的例子。该组件显示了一个按钮，并打印出按钮被点击的次数。

**模板**

Vue使用基于HTML的模板语法，允许将渲染的DOM绑定到Vue实例的底层数据。所有 Vue 模板都是有效的 HTML，可以被符合规范的浏览器和 HTML 解析器解析。Vue 将模板编译成虚拟 DOM 渲染函数。虚拟文档对象模型（或 "DOM"）允许Vue在更新浏览器之前在其内存中渲染组件。结合反应式系统，Vue能够计算出需要重新渲染的组件的最小数量，并在App状态发生变化时，启动最小量的DOM操作。

Vue用户可以使用模板语法，也可以选择使用JSX直接编写渲染函数，渲染函数允许从软件组件中构建应用程序。

**反应式系统**

Vue的特点是采用了反应式系统，它使用纯JavaScript对象和优化的重渲染。每个组件在渲染过程中都会跟踪其反应式的依赖关系，因此系统可以精确地知道什么时候重新渲染，以及哪些组件需要重新渲染。

**变换效果**

当从DOM中插入、更新或删除项目时，Vue提供了多种方法来部署变换效果。这包括了以下工具：

- 自动应用CSS变换和动画的类
- 集成第三方CSS动画库，如Animate.css等。
- 在变换hooks期间，使用JavaScript直接操作DOM。
- 集成第三方JavaScript动画库，如Velocity.js等。

当在变换组件中的元素被插入或移除时，会出现这样的情况：

- Vue会自动检测到目标元素是否应用了CSS变换或动画。如果有，CSS变换类将在适当的时间添加/删除。
- 如果变换组件提供了JavaScript hooks，这些hooks将在适当的时间被调用。
- 如果没有检测到CSS变换/动画，并且没有提供JavaScript hooks，那么插入和/或移除的DOM操作将在下一帧中立即执行。

**路由**

单页面应用程序（SPA）的一个传统缺点是无法分享到特定网页中的确切 "子 "页面的链接。由于SPA只向用户提供一个基于URL的服务器响应（它通常服务于index.html或index.vue），因此通常情况下，将某些屏幕作为书签或分享到特定部分的链接是很困难的，甚至是不可能的。为了解决这个问题，许多客户端路由器用 "hashbang"(#!)来划分动态URL，例如[http://page.com/#!/](https://link.zhihu.com/?target=http%3A//page.com/%23!/)。然而，在HTML5中，大多数现代浏览器都支持不使用hashbang的路由。

Vue提供了一个界面，可以根据当前的URL路径来改变页面上显示的内容 – 可以有多种方式（无论是通过电子邮件链接、刷新还是页面内链接）。此外，当某些浏览器事件（如点击）发生在按钮或链接上时，使用前端路由器可以有意识地转换浏览器路径。Vue本身并没有自带前端路由。但开源的 "vue-router "包提供了一个API来更新应用程序的URL，支持返回按钮（导航历史记录），并支持电子邮件密码重置或电子邮件验证链接的认证URL参数。它支持将嵌套路由映射到嵌套组件，并提供精细化的过渡控制。添加了vue-router后，组件只需映射到它们所属的路由，父/根路由必须指明子路由的渲染位置。

上面的代码:

- 在[http://websitename.com/user/](https://link.zhihu.com/?target=http%3A//websitename.com/user/)<id>中设置一个前端路径。
- 这将在(const User...)中定义的User组件中呈现。
- 允许用户组件使用$route对象的params键输入用户的特定ID：$route.params.id。
- 这个模板（根据传递到路由器中的参数变化）将被渲染到DOM的div#app里面的<router-view></router-view>。
- 最后生成的HTML将是：[http://websitename.com/user/1](https://link.zhihu.com/?target=http%3A//websitename.com/user/1)：

**生态系统**

核心库自带的工具和库都是由核心团队和贡献者开发的。

**官方工具**

- Devtools - 用于调试Vue.js应用程序的浏览器devtools扩展。
- Vue CLI - 用于快速开发Vue.js的标准工具书
- Vue Loader - 一个webpack加载器，允许以单文件组件（SFCs）的格式编写Vue组件。

**官方程序库**

- Vue Router - Vue.js的官方路由器
- Vuex – 基于 Flux模式的 Vue.js 的集中式状态管理。
- Vue Server Renderer - 用于 Vue.js 的服务器端渲染。

**常用命令**

安装工具

**npm install -g @vue/cli**

创建工程：

**vue create my-project**

开发环境运行：

**npm run serve**

生产环境打包：

**npm run build**

**【官方网站】**

[https://vuejs.org/](https://link.zhihu.com/?target=https%3A//vuejs.org/)

**【最新版本】**

2.6.1于2019年12月13日

**【授权】**

MIT License

1. 