(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{401:function(t,e,a){"use strict";a.r(e);var r=a(45),s=Object(r.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"react的状态管理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react的状态管理"}},[t._v("#")]),t._v(" React的状态管理")]),t._v(" "),a("h2",{attrs:{id:"示例-组件的状态"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#示例-组件的状态"}},[t._v("#")]),t._v(" 示例：组件的状态")]),t._v(" "),a("p",[t._v("组件往往会有内部状态，使用"),a("code",[t._v("this.state")]),t._v("表示。")]),t._v(" "),a("p",[t._v("浏览器打开"),a("code",[t._v("demos/react-component-demo/index3.html")]),t._v("，按照"),a("a",{attrs:{href:"https://github.com/ruanyf/jstraining/blob/master/demos/README.md#react-%E7%BB%84%E4%BB%B6%E7%9A%84%E7%8A%B6%E6%80%81",target:"_blank",rel:"noopener noreferrer"}},[t._v("《操作说明》"),a("OutboundLink")],1),t._v("，仔细查看源码。")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/ruanyf/jstraining/blob/master/docs/images/react-component-state.png",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://github.com/ruanyf/jstraining/raw/master/docs/images/react-component-state.png",alt:"img"}}),a("OutboundLink")],1)]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"课堂练习-react-组件实战"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#课堂练习-react-组件实战"}},[t._v("#")]),t._v(" 课堂练习：React 组件实战")]),t._v(" "),a("p",[t._v("浏览器打开"),a("code",[t._v("demos/react-component-demo/index4.html")]),t._v("，按照"),a("a",{attrs:{href:"https://github.com/ruanyf/jstraining/blob/master/demos/README.md#react-%E7%BB%84%E4%BB%B6%E5%AE%9E%E6%88%98",target:"_blank",rel:"noopener noreferrer"}},[t._v("《操作说明》"),a("OutboundLink")],1),t._v("，完成练习。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"组件的生命周期"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组件的生命周期"}},[t._v("#")]),t._v(" 组件的生命周期")]),t._v(" "),a("p",[t._v("React 为组件的不同生命阶段，提供了近十个钩子方法。")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("componentWillMount()")]),t._v("：组件加载前调用")]),t._v(" "),a("li",[a("code",[t._v("componentDidMount()")]),t._v("：组件加载后调用")]),t._v(" "),a("li",[a("code",[t._v("componentWillUpdate()")]),t._v(": 组件更新前调用")]),t._v(" "),a("li",[a("code",[t._v("componentDidUpdate()")]),t._v(": 组件更新后调用")]),t._v(" "),a("li",[a("code",[t._v("componentWillUnmount()")]),t._v("：组件卸载前调用")]),t._v(" "),a("li",[a("code",[t._v("componentWillReceiveProps()")]),t._v("：组件接受新的参数时调用")])]),t._v(" "),a("p",[t._v("我们可以利用这些钩子，自动完成一些操作。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"课堂练习-组件的生命周期"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#课堂练习-组件的生命周期"}},[t._v("#")]),t._v(" 课堂练习：组件的生命周期")]),t._v(" "),a("p",[t._v("组件可以通过 Ajax 请求，从服务器获取数据。Ajax 请求一般在"),a("code",[t._v("componentDidMount")]),t._v("方法里面发出。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("componentDidMount() {\n  const url = '...';\n  $.getJSON(url)\n    .done()\n    .fail();\n}\n")])])]),a("p",[t._v("打开"),a("code",[t._v("demos/react-lifecycle-demo/index.html")]),t._v("，按照"),a("a",{attrs:{href:"https://github.com/ruanyf/jstraining/blob/master/demos/README.md#react-%E7%BB%84%E4%BB%B6%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F",target:"_blank",rel:"noopener noreferrer"}},[t._v("《操作说明》"),a("OutboundLink")],1),t._v("，完成练习。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"react-组件库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-组件库"}},[t._v("#")]),t._v(" React 组件库")]),t._v(" "),a("p",[t._v("React 的一大优势，就是网上有很多已经写好的组件库，可以使用。")]),t._v(" "),a("p",[t._v("React-Bootstrap：https://react-bootstrap.github.io/")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/ruanyf/jstraining/blob/master/docs/images/react-bootstrap.png",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://github.com/ruanyf/jstraining/raw/master/docs/images/react-bootstrap.png",alt:"img"}}),a("OutboundLink")],1)]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"示例-recharts"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#示例-recharts"}},[t._v("#")]),t._v(" 示例：ReCharts")]),t._v(" "),a("p",[t._v("ReCharts 是一个 React 图表组件库。http://recharts.org/")]),t._v(" "),a("p",[t._v("浏览器打开"),a("code",[t._v("demos/recharts-demo/index.html")]),t._v("，按照"),a("a",{attrs:{href:"https://github.com/ruanyf/jstraining/blob/master/demos/README.md#recharts",target:"_blank",rel:"noopener noreferrer"}},[t._v("《操作说明》"),a("OutboundLink")],1),t._v("，仔细查看源码，体会 JSX 语法对表达复杂组件的优势。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('<LineChart width={1000} height={400} data={data}>\n  <XAxis dataKey="name"/>\n  <YAxis/>\n  <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>\n  <Line type="monotone" dataKey="uv" stroke="#8884d8" />\n  <Line type="monotone" dataKey="pv" stroke="#82ca9d" />\n</LineChart>\n')])])]),a("hr"),t._v(" "),a("h2",{attrs:{id:"react-的核心思想"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-的核心思想"}},[t._v("#")]),t._v(" React 的核心思想")]),t._v(" "),a("p",[t._v("View 是 State 的输出。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("view = f(state)\n")])])]),a("p",[t._v("上式中，"),a("code",[t._v("f")]),t._v("表示函数关系。只要 State 发生变化，View 也要随之变化。")]),t._v(" "),a("hr"),t._v(" "),a("p",[t._v("React 的本质是将图形界面（GUI）函数化。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('const person = {\n  name: "michel",\n  age: 31\n}\n\nconst App = ({ person }) => <h1>{ person.name }</h1>\n\nReactDOM.render(<App person={person} />, document.body)\n')])])]),a("hr"),t._v(" "),a("h2",{attrs:{id:"react-没有解决的问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-没有解决的问题"}},[t._v("#")]),t._v(" React 没有解决的问题")]),t._v(" "),a("p",[t._v("React 本身只是一个 DOM 的抽象层，使用组件构建虚拟 DOM。")]),t._v(" "),a("p",[t._v("如果开发大应用，还需要解决两个问题。")]),t._v(" "),a("ul",[a("li",[t._v("架构：大型应用程序应该如何组织代码？")]),t._v(" "),a("li",[t._v("通信：组件之间如何通信？")])]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"架构问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#架构问题"}},[t._v("#")]),t._v(" 架构问题")]),t._v(" "),a("p",[t._v("React 只是视图层的解决方案，可以用于任何一种架构。")]),t._v(" "),a("ul",[a("li",[t._v("MVC")]),t._v(" "),a("li",[t._v("MVVM")]),t._v(" "),a("li",[t._v("Observer")]),t._v(" "),a("li",[t._v("Reactive")]),t._v(" "),a("li",[t._v("...")])]),t._v(" "),a("p",[t._v("到底哪一种架构最合适 React ？")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"通信问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#通信问题"}},[t._v("#")]),t._v(" 通信问题")]),t._v(" "),a("p",[t._v("组件会发生三种通信。")]),t._v(" "),a("ul",[a("li",[t._v("向子组件发消息")]),t._v(" "),a("li",[t._v("向父组件发消息")]),t._v(" "),a("li",[t._v("向其他组件发消息")])]),t._v(" "),a("p",[t._v("React 只提供了一种通信手段：传参。对于大应用，很不方便。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"状态的同步"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#状态的同步"}},[t._v("#")]),t._v(" 状态的同步")]),t._v(" "),a("p",[t._v("通信的本质是状态的同步。")]),t._v(" "),a("p",[t._v("React 同步状态的基本方法：找到通信双方最近的共同父组件，通过它的"),a("code",[t._v("state")]),t._v("，使得子组件的状态保持同步。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"flux-架构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#flux-架构"}},[t._v("#")]),t._v(" Flux 架构")]),t._v(" "),a("p",[t._v("Facebook 提出 Flux 架构的概念，被认为是 React 应用的标准架构。")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/ruanyf/jstraining/blob/master/docs/images/flow.png",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://github.com/ruanyf/jstraining/raw/master/docs/images/flow.png",alt:"img"}}),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("最大特点：数据单向流动。与 MVVM 的数据双向绑定，形成鲜明对比。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"flux-的核心思想"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#flux-的核心思想"}},[t._v("#")]),t._v(" Flux 的核心思想")]),t._v(" "),a("ul",[a("li",[t._v("不同组件的"),a("code",[t._v("state")]),t._v("，存放在一个外部的、公共的 Store 上面。")]),t._v(" "),a("li",[t._v("组件订阅 Store 的不同部分。")]),t._v(" "),a("li",[t._v("组件发送（dispatch）动作（action），引发 Store 的更新。")])]),t._v(" "),a("p",[t._v("Flux 只是一个概念，有30多种实现。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"目前最流行的两个-react-架构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#目前最流行的两个-react-架构"}},[t._v("#")]),t._v(" 目前最流行的两个 React 架构")]),t._v(" "),a("p",[t._v("React 架构的最重要作用：管理 Store 与 View 之间的关系。")]),t._v(" "),a("ul",[a("li",[t._v("MobX：响应式（Reactive）管理，state 是可变对象，适合中小型项目")]),t._v(" "),a("li",[t._v("Redux：函数式（Functional）管理，state 是不可变对象，适合大型项目")])]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"mobx-架构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mobx-架构"}},[t._v("#")]),t._v(" MobX 架构")]),t._v(" "),a("p",[t._v("MobX 的核心是观察者模式。")]),t._v(" "),a("ul",[a("li",[t._v("Store 是被观察者（observable）")]),t._v(" "),a("li",[t._v("组件是观察者（observer）")])]),t._v(" "),a("p",[t._v("一旦"),a("code",[t._v("Store")]),t._v("有变化，会立刻被组件观察到，从而引发重新渲染。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"mobx-的最简单例子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mobx-的最简单例子"}},[t._v("#")]),t._v(" MobX 的最简单例子")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('const {observable} = mobx;\nconst {observer} = mobxReact;\n\nconst person = observable({name: "张三", age: 31});\n\nconst App = observer(\n  ({ person }) => <h1>{ person.name }</h1>\n);\n\nReactDOM.render(<App person={person} />, document.body);\nperson.name = "李四";\n')])])]),a("p",[t._v("代码："),a("code",[t._v("demos/mobx-demo/browser-demo")]),t._v("目录")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"示例-mobx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#示例-mobx"}},[t._v("#")]),t._v(" 示例：MobX")]),t._v(" "),a("p",[t._v("进入"),a("code",[t._v("demos/mobx-demo")]),t._v("目录，按照"),a("a",{attrs:{href:"https://github.com/ruanyf/jstraining/blob/master/demos/README.md#mobx",target:"_blank",rel:"noopener noreferrer"}},[t._v("《操作说明》"),a("OutboundLink")],1),t._v("，理解 MobX 框架。")]),t._v(" "),a("hr"),t._v(" "),a("p",[t._v("UI 层是观察者，Store 是被观察者。")]),t._v(" "),a("p",[t._v("Store 所有的属性，分成两大类：直接被观察的属性和自动计算出来的属性。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("class Store {\n  @observable name = 'Bartek';\n  @computed get decorated() {\n    return `${this.name} is awesome!`;\n  }\n}\n")])])]),a("p",[t._v("UI 会观察到 Store 的变化，自动重新渲染。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"redux-架构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redux-架构"}},[t._v("#")]),t._v(" Redux 架构")]),t._v(" "),a("p",[t._v("Redux 的核心概念")]),t._v(" "),a("ul",[a("li",[t._v("所有的状态存放在"),a("code",[t._v("Store")]),t._v("。组件每次重新渲染，都必须由状态变化引起。")]),t._v(" "),a("li",[t._v("用户在 UI 上发出"),a("code",[t._v("action")]),t._v("。")]),t._v(" "),a("li",[a("code",[t._v("reducer")]),t._v("函数接收"),a("code",[t._v("action")]),t._v("，然后根据当前的"),a("code",[t._v("state")]),t._v("，计算出新的"),a("code",[t._v("state")]),t._v("。")])]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/ruanyf/jstraining/blob/master/docs/images/redux-architecture.png",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://github.com/ruanyf/jstraining/raw/master/docs/images/redux-architecture.png",alt:"img"}}),a("OutboundLink")],1)]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"redux-应用的架构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redux-应用的架构"}},[t._v("#")]),t._v(" Redux 应用的架构")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/ruanyf/jstraining/blob/master/docs/images/architecture-redux.png",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://github.com/ruanyf/jstraining/raw/master/docs/images/architecture-redux.png",alt:"img"}}),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("Redux 层保存所有状态，React 组件拿到状态以后，渲染出 HTML 代码。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"示例-redux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#示例-redux"}},[t._v("#")]),t._v(" 示例：Redux")]),t._v(" "),a("p",[t._v("进入"),a("code",[t._v("demos/redux-demo")]),t._v("目录，按照"),a("a",{attrs:{href:"https://github.com/ruanyf/jstraining/blob/master/demos/README.md#redux",target:"_blank",rel:"noopener noreferrer"}},[t._v("《操作说明》"),a("OutboundLink")],1),t._v("，理解 Redux 框架。")]),t._v(" "),a("hr"),t._v(" "),a("ul",[a("li",[t._v("Redux 将组件分成 UI 组件和容器组件两类。")]),t._v(" "),a("li",[t._v("UI 组件是纯组件，不包含 state 和生命周期方法，不涉及组件的行为，只涉及组件的外观。")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('<div className="index">\n  <p>{this.props.text}</p>\n  <input\n    defaultValue={this.props.name}\n    onChange={this.props.onChange}\n  />\n</div>\n')])])]),a("hr"),t._v(" "),a("p",[t._v("容器组件正好相反。")]),t._v(" "),a("ul",[a("li",[t._v("不涉及组件的外观，只涉及组件的行为。")]),t._v(" "),a("li",[t._v("负责订阅 Store，将 Store 的数据处理以后，再通过参数传给 UI 组件。")]),t._v(" "),a("li",[t._v("用户给出配置以后，由 Redux 生成。")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// MyComponent 是纯的 UI 组件\nconst App = connect(\n  mapStateToProps,\n  mapDispatchToProps\n)(MyComponent);\n")])])]),a("ul",[a("li",[t._v("mapStateToProps: 定义 UI 组件参数与 State 之间的映射")]),t._v(" "),a("li",[t._v("mapDispatchToProps：定义 UI 组件与 Action 之间的映射")])]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"拆分-ui-组件和容器组件的好处"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拆分-ui-组件和容器组件的好处"}},[t._v("#")]),t._v(" 拆分 UI 组件和容器组件的好处")]),t._v(" "),a("ul",[a("li",[t._v("UI 组件与后台数据无关，可以由设计师负责")]),t._v(" "),a("li",[t._v("容器组件只负责数据和行为，一旦 Store 的数据结构变化，只要调整容器组件即可")]),t._v(" "),a("li",[t._v("表现层和功能层脱钩，有利于代码重用，也有利于看清应用的数据结构和业务逻辑")])]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"reducer-函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reducer-函数"}},[t._v("#")]),t._v(" Reducer 函数")]),t._v(" "),a("p",[a("code",[t._v("reducer")]),t._v("是一个纯函数，用来接收"),a("code",[t._v("action")]),t._v("，算出新的"),a("code",[t._v("state")]),t._v("。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("function reducer(state = {\n  text: '你好，访问者',\n  name: '访问者'\n}, action) {\n  switch (action.type) {\n    case 'change':\n      return {\n        name: action.payload,\n        text: '你好，' + action.payload\n      };\n  }\n}\n")])])]),a("hr"),t._v(" "),a("ul",[a("li",[a("code",[t._v("Store")]),t._v("由 Redux 提供的"),a("code",[t._v("createStore")]),t._v("方法生成，该方法接受"),a("code",[t._v("reducer")]),t._v("作为参数。")]),t._v(" "),a("li",[t._v("为了把"),a("code",[t._v("Store")]),t._v("传入组件，必须使用 Redux 提供的"),a("code",[t._v("Provider")]),t._v("组件在应用的最外面，包裹一层。")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const store = createStore(reducer);\n\nReactDOM.render(\n  <Provider store={store}>\n    <App />\n  </Provider>,\n  document.body.appendChild(document.createElement('div'))\n);\n")])])])])}),[],!1,null,null,null);e.default=s.exports}}]);