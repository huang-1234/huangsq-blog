# jsx 简介

```jsx
const element = <h1>Hello, world!</h1>;
```

**它被称为 JSX，是一个 JavaScript 的语法扩展**

## 1.**在 JSX 中嵌入表达式**

```jsx
const name = "Josh Perez";
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(element, document.getElementById("root"));
```

在 JSX 语法中，你可以在大括号内放置任何有效的 `JavaScript 表达式`

在下面的示例中，我们将调用 JavaScript 函数 `formatName(user)` 的结果，并将结果嵌入到 `<h1>` 元素中。

```jsx
function formatName(user) {
  return user.firstName + " " + user.lastName;
}

const user = {
  firstName: "Harper",
  lastName: "Perez",
};

const element = <h1>Hello, {formatName(user)}!</h1>;

ReactDOM.render(element, document.getElementById("root"));
```

## 2. **使用 JSX 指定子元素**

假如一个标签里面没有内容，你可以使用 `/>` 来闭合标签，就像 XML 语法一样：

```jsx
const element = <img src={user.avatarUrl} />;
```

JSX 标签里能够包含很多子元素:

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

## 3.**JSX 特定属性**

你可以通过使用引号，来将属性值指定为字符串字面量：

```jsx
const element = <div tabIndex="0"></div>;
```

也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：

```jsx
const element = <img src={user.avatarUrl}></img>;
```

在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。你应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。

> 因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
>
> 例如，JSX 里的 `class` 变成了 [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)，而 `tabindex` 则变为 [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)。

## 4.JSX 的转成 html 原理

根据上面的定义，JSX 是 JS 的扩展，那么 JSX 是怎么在 JS 中生效的呢？

### Babel

通过官网的介绍，我们可以知道

> JSX 会被编译成 React.createElement(), React.createElement()将返回一个叫做"ReactElement"的对象

那么，什么是 Babel 呢

> Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中

可以看出 Babel 也有能力将 JSX 语法转化为 JS

它可以把所有的 JSX 转化为 React.createElement()调用

### createElement 源码

```jsx
export function createElement(type, config, children) {
  // propName 变量用于储存后面需要用到的元素属性
  let propName;
  // props 变量用于储存元素属性的键值对集合
  const props = {};
  // key、ref、self、source 均为 React 元素的属性，此处不必深究
  let key = null;
  let ref = null;
  let self = null;
  let source = null;
  // config 对象中存储的是元素的属性
  if (config != null) {
    // 进来之后做的第一件事，是依次对 ref、key、self 和 source 属性赋值
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    // 此处将 key 值字符串化
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // 接着就是要把 config 里面的属性都一个一个挪到 props 这个之前声明好的对象里面
    for (propName in config) {
      // 筛选出可以提进 props 对象里的属性
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }
  // childrenLength 指的是当前元素的子元素的个数，减去的 2 是 type 和 config 两个参数占用的长度
  const childrenLength = arguments.length - 2;
  // 如果抛去type和config，就只剩下一个参数，一般意味着文本节点出现了
  if (childrenLength === 1) {
    // 直接把这个参数的值赋给props.children
    props.children = children;
    // 处理嵌套多个子元素的情况
  } else if (childrenLength > 1) {
    // 声明一个子元素数组
    const childArray = Array(childrenLength);
    // 把子元素推进数组
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    // 最后把这个数组赋值给props.children
    props.children = childArray;
  }
  // 处理 defaultProps
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  // 最后返回一个调用ReactElement执行方法，并传入刚才处理过的参数
  return ReactElement(
    type
    key
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```

首先可以看到函数最开始有三个入参

```jsx
export function createElement(type, config, children)
```

- type: 用于标识节点的类型。它可以是类似“h1”“div”这样的标准 HTML 标签字符串，也可以是 React 组件类型或 React fragment 类型。
- config: 以对象形式传入，组件所有的属性都会以键值对的形式存储在 config 对象中。
- children: 以对象形式传入，它记录的是组件标签之间嵌套的内容，也就是所谓的“子节点”“子元素”。

下面是个实例

```jsx
React.createElement(
  "ul",
  {
    // 传入属性键值对
    className: "list",
    // 从第三个入参开始往后，传入的参数都是 children
  },
  React.createElement(
    "li",
    {
      key: "1",
    },
    "1"
  ),
  React.createElement(
    "li",
    {
      key: "2",
    },
    "2"
  )
);
```

这个调用对应的 DOM 结构如下：

```html
<ul className="list">
  <li key="1">1</li>
  <li key="2">2</li>
</ul>
```

然后我们大体上拆解一下 createElement 函数

<img :src="$withBase('/images/React/ReactBase/JSX01.png')" alt="JSX01"/>

可以看出 createElement 函数执行的都是一些格式化数据的操作。

可以理解为，createElement 只是一个开发者和 ReactElement 调用之间的一个 “转化器”，一个数据处理层，他只是对参数进行预期化格式化，以便用于 ReactElement 调用。

那么继续来看看 ReactElement 的源码吧

### ReactElement 源码

```jsx
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // REACT_ELEMENT_TYPE是一个常量，用来标识该对象是一个ReactElement
    $$typeof: REACT_ELEMENT_TYPE,
    // 内置属性赋值
    type: type,
    key: key,
    ref: ref,
    props: props,
    // 记录创造该元素的组件
    _owner: owner,
  };
  //
  if (__DEV__) {
    // 这里是一些针对 __DEV__ 环境下的处理
  }
  return element;
};
```

可以看到，ReactElement 只不过是对传进来的属性进行了一次封装，而这个封装出来的对象，其实就是"虚拟 DOM"。

既然是“虚拟 DOM”，也就是说离真实 DOM 还有一点距离，这点距离可以用 ReactDOM.render 来完成

```jsx
ReactDOM.render(
  // 需要渲染的元素（ReactElement）
  element,
  // 元素挂载的目标容器（一个真实DOM）
  container,
  // 回调函数，可选参数，可以用来处理渲染结束后的逻辑
  [callback]
);
```

看到上面的第二个参数，第二个参数是一个真实 DOM，这个真实 DOM 充当“容器”的角色，react 最终会渲染到这个容器中去。

```jsx
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

例如上面的例子，它的容器是要真实存在的真实 DOM

```html
<div id="root"></div>
```
