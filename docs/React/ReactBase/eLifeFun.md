# react 的生命周期函数

## 类组件

先来了解一下旧版 react 的生命周期函数有哪些：

```js
组件将要挂载时触发的函数：componentWillMount
组件挂载完成时触发的函数：componentDidMount
是否要更新数据时触发的函数：shouldComponentUpdate
将要更新数据时触发的函数：componentWillUpdate
数据更新完成时触发的函数：componentDidUpdate
组件将要销毁时触发的函数：componentWillUnmount
```

父组件中改变了 props 传值时触发的函数：componentWillReceiveProps
下面来上代码详细说明一下

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>2_react生命周期(旧)</title>
  </head>
  <body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>
  </body>
</html>
```

jsx 部分

```html
<!-- 引入react核心库 -->
<script type="text/javascript" src="../js/react.development.js"></script>
<!-- 引入react-dom，用于支持react操作DOM -->
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<!-- 引入babel，用于将jsx转为js -->
<script type="text/javascript" src="../js/babel.min.js"></script>

<script type="text/babel">
  /* 
    1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
      1.	constructor()
      2.	componentWillMount()
      3.	render()
      4.	componentDidMount() =====> 常用
              一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
    2. 更新阶段: 由组件内部this.setSate()或父组件render触发
      1.	shouldComponentUpdate()
      2.	componentWillUpdate()
      3.	render() =====> 必须使用的一个
      4.	componentDidUpdate()
    3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
      1.	componentWillUnmount()  =====> 常用
        一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
		*/
  //创建组件
  class Count extends React.Component {
    //构造器
    constructor(props) {
      console.log("Count---constructor");
      super(props);
      //初始化状态
      this.state = { count: 0 };
    }

    //加1按钮的回调
    add = () => {
      //获取原状态
      const { count } = this.state;
      //更新状态
      this.setState({ count: count + 1 });
    };

    //卸载组件按钮的回调
    death = () => {
      ReactDOM.unmountComponentAtNode(document.getElementById("test"));
    };

    //强制更新按钮的回调
    force = () => {
      this.forceUpdate();
    };
    //组件将要挂载的钩子
    componentWillMount() {
      console.log("Count---componentWillMount");
    }

    //组件挂载完毕的钩子
    componentDidMount() {
      console.log("Count---componentDidMount");
    }

    //组件将要卸载的钩子
    componentWillUnmount() {
      console.log("Count---componentWillUnmount");
    }

    //控制组件更新的“阀门” 必须返回一个布尔值
    shouldComponentUpdate() {
      console.log("Count---shouldComponentUpdate");
      return true;
    }

    //组件将要更新的钩子
    componentWillUpdate() {
      console.log("Count---componentWillUpdate");
    }

    //组件更新完毕的钩子
    componentDidUpdate() {
      console.log("Count---componentDidUpdate");
    }

    render() {
      console.log("Count---render");
      const { count } = this.state;
      return (
        <div>
          <h2>当前求和为：{count}</h2>
          <button onClick={this.add}>点我+1</button>
          <button onClick={this.death}>卸载组件</button>
          <button onClick={this.force}>
            不更改任何状态中的数据，强制更新一下
          </button>
        </div>
      );
    }
  }

  //父组件A
  class A extends React.Component {
    //初始化状态
    state = { carName: "奔驰" };
    changeCar = () => {
      this.setState({ carName: "奥拓" });
    };

    render() {
      return (
        <div>
          <div>我是A组件</div>
          <button onClick={this.changeCar}>换车</button>
          <B carName={this.state.carName} />
        </div>
      );
    }
  }

  //子组件B
  class B extends React.Component {
    //组件将要接收新的props的钩子
    componentWillReceiveProps(props) {
      console.log("B---componentWillReceiveProps", props);
    }

    //控制组件更新的“阀门”
    shouldComponentUpdate() {
      console.log("B---shouldComponentUpdate");
      return true;
    }
    //组件将要更新的钩子
    componentWillUpdate() {
      console.log("B---componentWillUpdate");
    }

    //组件更新完毕的钩子
    componentDidUpdate() {
      console.log("B---componentDidUpdate");
    }

    render() {
      console.log("B---render");
      return <div>我是B组件，接收到的车是:{this.props.carName}</div>;
    }
  }
  //渲染组件
  ReactDOM.render(<Count />, document.getElementById("test"));
</script>
```

### 再看一个生命周期函数混合

> 关于这个React类组件的生命周期函数的调用情况可以[看下这个图](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

```tsx
export class ChildA extends Component<parentPropsType, parentStateType>{

  constructor(props: parentPropsType | Readonly<parentPropsType>) {
    super(props)
    console.log('ChildA/constructor');
    this.state = {
      countA: props.countA
    }
  }

  componentWillMount() {
    console.log('ChildA/componentWillMount');
  }
  UNSAFE_componentWillMount() {
    console.log('ChildA/UNSAFE_componentWillMount');
  }


  // componentWillReceiveNewProps,第一次接收props不算，不掉用该函数，再次接收到props才调用该回调函数hook
  componentWillReceiveProps() {
    console.log('ChildA/componentWillReceiveProps');
  }
  UNSAFE_componentWillReceiveProps() {
    console.log('ChildA/UNSAFE_componentWillReceiveProps');
  }

  /**
   * props:any, state:any
   * react-dom.development.js?61bb:67 Warning: `ReactLife` uses `getDerivedStateFromProps` 
   * but its initial state is undefined. This is not recommended. Instead, define the initial state
   *  by assigning an object to `this.state` in the constructor of `ReactLife`. This ensures that 
   * `getDerivedStateFromProps` arguments have a consistent shape.
   */
  // static getDerivedStateFromProps() {
  //   console.log('getDerivedStateFromProps');
  // }

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    console.log('ChildA/shouldComponentUpdate');
    if (nextProps.countA === this.state.countA) {
      console.log('shouldComponentUpdate return false');
      return false
    }
    
    return true
  }

  // const { state, props } = this
  
  componentWillUpdate() {
    console.log('ChildA/componentWillUpdate');
    // this.setState({state.countA: props.countA})
    // this.setState({this.state.countA:this.props.countA})
  }

  getSnapshotBeforeUpdate(sanpshotValue: any) {
    sanpshotValue='我是ChildA更新之前的huangsq'
    console.log('ChildA/getSnapshotBeforeUpdate');
    
    return sanpshotValue
  }

  // 只在组件挂载完毕的时候调用一次,页面一上来就需要做点事情
  componentDidMount() {
    console.log('ChildA/componentDidMount');
  }
  /**
   * Move data fetching code or side effects to componentDidUpdate.
   *  Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. 
   * In React 18.x, only the UNSAFE_ name will *  work. To rename all deprecated lifecycles to their new names,
   *  you can run `npx react-codemod rename-unsafe-lifecycles` in your project source older
   * @param prevProps 
   * @param prevState 
   * @param snapshot 
   * 更新完毕
   */
  // sanpshotValue来自getSnapshotBeforeUpdate的返回值、相当于在componentDidUpdate之前调用一下以获得之前的数据的快照
  componentDidUpdate(prevProps: any, prevState: any, sanpshotValue: any) {

    console.log('ChildA/componentDidUpdate<<',sanpshotValue);
  }

  componentWillUnmount() {
    console.log('ChildA/componentWillUnmount');
  }



  changecountA = () => {
    const { countA } = this.state;
    this.setState({ countA: countA + 1 });
  }
  unchangecountA = () => {
    const { countA } = this.state;
    this.setState({ countA: countA });
  }
  unmountcountA = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root') as HTMLBRElement)
  }

  makeForceUpdate = () => {
    this.forceUpdate()
  }

  render() {
    console.log('ChildA/render=============================================');
    return (
      <div style={{ width: '30vw', height: '30vh', backgroundColor: 'blue' }}>
        <h2>ChildA</h2>
        <h3>{this.state.countA}</h3>
        <h3>{this.props.countA}</h3>
        <button onClick={this.changecountA}>加一</button>
        <button onClick={this.unchangecountA}>数字不变</button>
        <button onClick={this.unmountcountA}>卸载组件</button>
        <button onClick={this.makeForceUpdate}>强制更新组件</button>
      </div>
    )
  }
}
```

> 浏览器直接警告我

```bash
ChildA uses getSnapshotBeforeUpdate() but also contains the following legacy lifecycles:
  componentWillMount
  componentWillReceiveProps
  componentWillUpdate
```

意思就是getSnapshotBeforeUpdate()已经包含了下面的三个生命周期函数

> 我们先去掉这个getSnapshotBeforeUpdate()

看下全部的代码：

```tsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'

interface propsType {}
interface stateType {
  count: number
}
export default class ReactLife extends Component<propsType, stateType> {
  constructor(props: propsType) {
    super(props)
    console.log('ReactLife/constructor');
    this.state = {
      count: 0
    }
  }
  /**
   * 1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
      1.	constructor()
      2.	componentWillMount()
      3.	render()
      4.	componentDidMount() =====> 常用
              一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
    2. 更新阶段: 由组件内部this.setSate()或父组件render触发
      1.	shouldComponentUpdate()
      2.	componentWillUpdate()
      3.	render() =====> 必须使用的一个
      4.	componentDidUpdate()
    3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
      1.	componentWillUnmount()  =====> 常用
        一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
   */
  // 只在组件将要挂载的时候调用一次
  componentWillMount() {
    console.log('ReactLife/componentWillMount');
  }
  UNSAFE_componentWillMount() {
    console.log('ReactLife/UNSAFE_componentWillMount');
  }


  // componentWillReceiveNewProps,第一次接收props不算，不掉用该函数，再次接收到props才调用该回调函数hook
  componentWillReceiveProps() {
    console.log('ReactLife/componentWillReceiveProps');
  }
  UNSAFE_componentWillReceiveProps() {
    console.log('ReactLife/UNSAFE_componentWillReceiveProps');
  }

  /**
   * props:any, state:any
   * react-dom.development.js?61bb:67 Warning: `ReactLife` uses `getDerivedStateFromProps` 
   * but its initial state is undefined. This is not recommended. Instead, define the initial state
   *  by assigning an object to `this.state` in the constructor of `ReactLife`. This ensures that 
   * `getDerivedStateFromProps` arguments have a consistent shape.
   */
  // static getDerivedStateFromProps() {
  //   console.log('ReactLife/getDerivedStateFromProps');
  // }

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    console.log('ReactLife/shouldComponentUpdate');
    if (nextState.count == this.state.count) {
      return false
    }
    return true
  }
  componentWillUpdate() {
    console.log('ReactLife/componentWillUpdate');
  }
      // 在componentDidUpdate之前调用一下以获得之前的数据的快照
  // getSnapshotBeforeUpdate(sanpshotValue: any) {
  //   sanpshotValue='我是ReactLife更新之前的huangsq'
  //   console.log('ReactLife/getSnapshotBeforeUpdate');
  //   return sanpshotValue
  // }
  // 只在组件挂载完毕的时候调用一次,页面一上来就需要做点事情
  componentDidMount() {
    console.log('ReactLife/componentDidMount');
  }
  /**
   * Move data fetching code or side effects to componentDidUpdate.
   *  Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. 
   * In React 18.x, only the UNSAFE_ name will *  work. To rename all deprecated lifecycles to their new names,
   *  you can run `npx react-codemod rename-unsafe-lifecycles` in your project source older
   * @param prevProps 
   * @param prevState 
   * @param snapshot 
   * 更新完毕
   */
  // sanpshotValue来自getSnapshotBeforeUpdate的返回值、相当于在componentDidUpdate之前调用一下以获得之前的数据的快照
  componentDidUpdate(prevProps: any, prevState: any, snapshotValue: any) {
    console.log('ReactLife/componentDidUpdate<<',snapshotValue);
  }

  componentWillUnmount() {
    console.log('ReactLife/componentWillUnmount');
  }

  changeCount = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  }
  unchangeCount = () => {
    const { count } = this.state;
    this.setState({ count: count });
  }
  unmountCount = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root') as HTMLBRElement)
  }
  makeForceUpdate = () => {
    this.forceUpdate()
  }

  render() {
    console.log('ReactLife/render================================');
    return (
      <div style={{ width: '50vw', height: '50vh', backgroundColor: 'pink' }}>
        <h2>ParentReactLife</h2>
        <h3>{this.state.count}</h3>
        <button onClick={this.changeCount}>加一</button>
        <button onClick={this.unchangeCount}>数字不变</button>
        <button onClick={this.unmountCount}>卸载组件</button>
        <button onClick={this.makeForceUpdate}>强制更新组件</button>
        <br />
        <ChildA countA={this.state.count} />
      </div>
    )
  }
}


interface parentPropsType {
  countA: number
}
interface parentStateType {
  countA: number
}
export class ChildA extends Component<parentPropsType, parentStateType>{

  constructor(props: parentPropsType | Readonly<parentPropsType>) {
    super(props)
    console.log('ChildA/constructor');
    this.state = {
      countA: props.countA
    }
  }

  componentWillMount() {
    console.log('ChildA/componentWillMount');
  }
  UNSAFE_componentWillMount() {
    console.log('ChildA/UNSAFE_componentWillMount');
  }

  // componentWillReceiveNewProps,第一次接收props不算，不掉用该函数，再次接收到props才调用该回调函数hook
  componentWillReceiveProps() {
    console.log('ChildA/componentWillReceiveProps');
  }
  UNSAFE_componentWillReceiveProps() {
    console.log('ChildA/UNSAFE_componentWillReceiveProps');
  }

  /**
   * props:any, state:any
   * react-dom.development.js?61bb:67 Warning: `ReactLife` uses `getDerivedStateFromProps` 
   * but its initial state is undefined. This is not recommended. Instead, define the initial state
   *  by assigning an object to `this.state` in the constructor of `ReactLife`. This ensures that 
   * `getDerivedStateFromProps` arguments have a consistent shape.
   */
  // static getDerivedStateFromProps() {
  //   console.log('getDerivedStateFromProps');
  // }

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    console.log('ChildA/shouldComponentUpdate');
    if (nextProps.countA === this.state.countA) {
      console.log('shouldComponentUpdate return false');
      return false
    }
    return true
  }

  // const { state, props } = this
  
  componentWillUpdate() {
    console.log('ChildA/componentWillUpdate');
    // this.setState({state.countA: props.countA})
    // this.setState({this.state.countA:this.props.countA})
  }
      // 在componentDidUpdate之前调用一下以获得之前的数据的快照
  // getSnapshotBeforeUpdate(sanpshotValue: any) {
  //   sanpshotValue='我是ChildA更新之前的huangsq'
  //   console.log('ChildA/getSnapshotBeforeUpdate');
  //   return sanpshotValue
  // }

  // 只在组件挂载完毕的时候调用一次,页面一上来就需要做点事情
  componentDidMount() {
    console.log('ChildA/componentDidMount');
  }
  /**
   * Move data fetching code or side effects to componentDidUpdate.
   *  Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. 
   * In React 18.x, only the UNSAFE_ name will *  work. To rename all deprecated lifecycles to their new names,
   *  you can run `npx react-codemod rename-unsafe-lifecycles` in your project source older
   * @param prevProps 
   * @param prevState 
   * @param snapshot 
   * 更新完毕
   */
  // sanpshotValue来自getSnapshotBeforeUpdate的返回值、相当于在componentDidUpdate之前调用一下以获得之前的数据的快照
  componentDidUpdate(prevProps: any, prevState: any, sanpshotValue: any) {
    console.log('ChildA/componentDidUpdate<<',sanpshotValue);
  }

  componentWillUnmount() {
    console.log('ChildA/componentWillUnmount');
  }

  changecountA = () => {
    const { countA } = this.state;
    this.setState({ countA: countA + 1 });
  }
  unchangecountA = () => {
    const { countA } = this.state;
    this.setState({ countA: countA });
  }
  unmountcountA = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root') as HTMLBRElement)
  }

  makeForceUpdate = () => {
    this.forceUpdate()
  }

  render() {
    console.log('ChildA/render=============================================');
    return (
      <div style={{ width: '30vw', height: '30vh', backgroundColor: 'blue' }}>
        <h2>ChildA</h2>
        <h3>{this.state.countA}</h3>
        <h3>{this.props.countA}</h3>
        <button onClick={this.changecountA}>加一</button>
        <button onClick={this.unchangecountA}>数字不变</button>
        <button onClick={this.unmountcountA}>卸载组件</button>
        <button onClick={this.makeForceUpdate}>强制更新组件</button>
      </div>
    )
  }
}
```

打开浏览器看结果

```js
ReactLife/constructor ReactLife.tsx?242c:61 
ReactLife.tsx?242c:85 ReactLife/componentWillMount
ReactLife.tsx?242c:88 ReactLife/UNSAFE_componentWillMount
ReactLife.tsx?242c:145 ReactLife/render================================
ReactLife.tsx?242c:177 ChildA/constructor
ReactLife.tsx?242c:184 ChildA/componentWillMount
ReactLife.tsx?242c:187 ChildA/UNSAFE_componentWillMount
ReactLife.tsx?242c:248 ChildA/render=============================================

ReactLife.tsx?242c:228	ChildA/componentDidMount 
ReactLife.tsx?242c:125  ReactLife/componentDidMount

Child自己加一
VM18137:1 Uncaught ReferenceError: Child自己加一 is not defined
    at <anonymous>:1:1
(anonymous) @ VM18137:1
ReactLife.tsx?242c:207 ChildA/shouldComponentUpdate
ReactLife.tsx?242c:209 shouldComponentUpdate return false
ReactLife.tsx?242c:207 ChildA/shouldComponentUpdate
ReactLife.tsx?242c:216 ChildA/componentWillUpdate
ReactLife.tsx?242c:248 ChildA/render=============================================
ReactLife.tsx?242c:242 ChildA/componentDidUpdate<< undefined

ParentReactLife加一
VM18167:1 Uncaught ReferenceError: ParentReactLife加一 is not defined
    at <anonymous>:1:1
(anonymous) @ VM18167:1
ReactLife.tsx?242c:108 ReactLife/shouldComponentUpdate
ReactLife.tsx?242c:115 ReactLife/componentWillUpdate
ReactLife.tsx?242c:145 ReactLife/render================================
ReactLife.tsx?242c:191 ChildA/componentWillReceiveProps
ReactLife.tsx?242c:194 ChildA/UNSAFE_componentWillReceiveProps
ReactLife.tsx?242c:207 ChildA/shouldComponentUpdate
ReactLife.tsx?242c:216 ChildA/componentWillUpdate
ReactLife.tsx?242c:248 ChildA/render=============================================
ReactLife.tsx?242c:242 ChildA/componentDidUpdate<< undefined
ReactLife.tsx?242c:139 ReactLife/componentDidUpdate<< undefined

ParentReactLifeParentReactLife强制更新组件
VM18207:1 Uncaught ReferenceError: ParentReactLifeParentReactLife强制更新组件 is not defined
    at <anonymous>:1:1
(anonymous) @ VM18207:1
ReactLife.tsx?242c:115 ReactLife/componentWillUpdate
ReactLife.tsx?242c:145 ReactLife/render================================
ReactLife.tsx?242c:191 ChildA/componentWillReceiveProps
ReactLife.tsx?242c:194 ChildA/UNSAFE_componentWillReceiveProps
ReactLife.tsx?242c:207 ChildA/shouldComponentUpdate
ReactLife.tsx?242c:216 ChildA/componentWillUpdate
ReactLife.tsx?242c:248 ChildA/render=============================================
ReactLife.tsx?242c:242 ChildA/componentDidUpdate<< undefined
ReactLife.tsx?242c:139 ReactLife/componentDidUpdate<< undefined

```

> 对于时候重新渲染组件，每一次状态或者props改变豆浆有shouldComponentUpdate控制重新渲染，那有没有不重写shouldComponentUpdate也能优化渲染呢，就是state不变，我组件就不渲染

现在让我们使用另外一种方法**PureComponent**来对组件进行优化。

React在v15.5的时候引入了Pure Component组件。React在进行组件更新时，如果发现这个组件是一个PureComponent，它会将组件现在的state和props和其下一个state和props进行**浅比较**，如果它们的值没有变化，就不会进行更新。要想让你的组件成为Pure Component，只需要`extends React.PureComponent`即可。

```tsx
export class ChildA extends React.PureComponent<parentPropsType, parentStateType>
```



### 一.挂载部分

根据官方生命周期图我们可以看到，一个组件的加载渲染，首先是 defaultProps 和 propsTypes，
（这两个是什么下一篇会单独说，这里也不是重点）然后就是 constructor 及 this.state 里的初始数据，
所以到这里是第一步。接着就是 componentWillMount 组件将要开始挂载了，这是第二步。然后组件挂载，render 解析渲染，
所以第三步呼之欲出，就是 render 数据都渲染完成，最后 componentDidMount
组件挂载完成。

子组件代码，父组件内引入渲染即可（这里先不上代码）

```jsx
import React, { Component } from "react";

class Hsq extends Component {
  constructor(props) {
    console.log("01构造函数");
    super(props);
    this.state = {};
  }
  //组件将要挂载时候触发的生命周期函数
  componentWillMount() {
    console.log("02组件将要挂载");
  }
  //组件挂载完成时候触发的生命周期函数
  componentDidMount() {
    console.log("04组件将要挂载");
  }
  render() {
    console.log("03数据渲染render");
    return <div>生命周期函数演示</div>;
  }
}
export default Hsq;
```

### 二.数据更新部分

数据更新的话第一步是 shouldComponentUpdate 确认是否要更新数据，当这个函数返回的是 true 的时候才会进行更新，
并且这个函数可以声明两个参数 nextProps 和 nextState，
nextProps 是父组件传给子组件的值，nextState 是数据更新之后值，这两个值可以在这个函数中获取到。第二步当确认更新数据之后 componentWillUpdate 将要更新数据，第三步依旧是 render，数据发生改变 render 重新进行了渲染。第四步是 componentDidUpdate
数据更新完成。

代码的话子组件在上一部分的基础上，在 this.state 中定义一个初始数据，render 中绑定一下这个数据，之后再增加一个按钮声明一个
onClick 事件去改变这个数据。这样可以看到数据更新部分的效果，我这里把第一部分的代码删掉了，看着不那么乱。

```jsx
import React, { Component } from "react";

class Hsq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "我是一个msg数据",
    };
  }
  //是否要更新数据，如果返回true才会更新数据
  shouldComponentUpdate(nextProps, nextState) {
    console.log("01是否要更新数据");
    console.log(nextProps); //父组件传给子组件的值，这里没有会显示空
    console.log(nextState); //数据更新后的值
    return true; //返回true，确认更新
  }
  //将要更新数据的时候触发的
  componentWillUpdate() {
    console.log("02组件将要更新");
  }
  //更新数据时候触发的生命周期函数
  componentDidUpdate() {
    console.log("04组件更新完成");
  }
  //更新数据
  setMsg() {
    this.setState({
      msg: "我是改变后的msg数据",
    });
  }
  render() {
    console.log("03数据渲染render");
    return (
      <div>
        {this.state.msg}
        <br />
        <hr />
        <button onClick={() => this.setMsg()}>更新msg的数据</button>
      </div>
    );
  }
}
export default Hsq;
```

### 三.单独说一下 componentWillReceiveProps，父组件中改变了 props 传值时触发的函数

这个函数也就是当我们父组件给子组件传值的时候改变了 props 的值时触发的函数，刚才在第二部分中也说到 shouldComponentUpdate
这个函数可以携带两个参数，nextProps 就是父组件传给子组件的值
在父组件中定义一个初始 title 数据，写一个按钮声明一个 onClick 事件去改变这个 title

### 四.componentWillUnmount 组件将要销毁时的函数

在父组件中定义一个 flag 为 true 的状态值，添加一个按钮声明一个 onClick 事件去
更改这个 flag 实现销毁组件。

## 函数组件

函数组件中相当于

的是useEffect

对于类组件的优化渲染有shouldComponentUpdate和React.PureComponent，

那对于函数式组件有没有相同的解决方案呢？有的，那就是轮到我们的`React.memo`登场了

```tsx
React.memo(...)是React v16.6引进来的新属性。它的作用和React.PureComponent类似，是用来控制函数组件的重新渲染的。React.memo(...) 其实就是函数组件的React.PureComponent。
```

React.memo会返回一个**纯化**(purified)的组件**MemoFuncComponent**，这个组件将会在JSX标记中渲染出来。当组件的参数props和状态state发生改变时，React将会检查前一个状态和参数是否和下一个状态和参数是否相同，如果相同，组件将不会被渲染，如果不同，组件将会被重新渲染。

以下是几点总结:

- `React.PureComponent`是银
- `React.memo(...)`是金
- `React.PureComponent`是给ES6的类组件使用的
- `React.memo(...)`是给函数组件使用的
- `React.PureComponent`减少ES6的类组件的无用渲染
- `React.memo(...)`减少函数组件的无用渲染
- 为函数组件提供优化是一个巨大的进步

> 关于`function component` 组件

### 状态每次改变，整个 function 都会重新执行

可能导致：函数的每次执行，其内部定义的变量和方法都会重新创建，也就是说会从新给它们分配内存，这会导致性能受到影响

看下面这个例子：

```tsx
import React, { useState, ReactElement } from 'react'
let num = 0; // 用于记录当前组件执行次数

export default (): ReactElement => {
  console.log('render num: ', ++num) // 打印执行次数

  let [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(++count)
  }

  return (
    <>
      <p>count: {count}</p>
      <button  onClick={handleClick}>
        Button
      </button>
    </>
  )
}
```

看下结果

```bash
render num:  2	testUseCallback.tsx?a1ea:25 
render num:  3	testUseCallback.tsx?a1ea:25 
render num:  4	testUseCallback.tsx?a1ea:25
```

可见，每改变一次 count， 该组件对应的整个 function 会重新执行，其内部变量和方法会重新创建，从而影响性能。

解决方法：

- 变量尽量放在函数外部
- 方法使用 useCallback 包裹起来

使用方法：

```tsx
const handleClick = useCallback(()=>{
    // 业务代码
},[ count ])
```

useCallback 的作用：组件初始化时，将第一个参数函数“缓存”起来，只有在第二个参数（数组中的值）有变化时，被包裹的函数才会重新被创建，否则不会重新创建。

**总结：变量尽量放在组件外部定义，函数使用 useCallback 包裹起来，避免组件 render 时重复创建。**

### 父组件更新，子组件也跟着执行

再看个例子，我们把上面例子作为父组件，在里面添加一个子组件.

父组件：

```tsx
import React, { useState, ReactElement } from 'react'
let num = 0; // 用于记录当前组件执行次数
export default (): ReactElement => {
  console.log('render num: ', ++num) // 打印执行次数
  let [count, setCount] = useState(0)
  const CountAddOne = () => {
    setCount(++count)
  }
  return (
    <>
      <p>count: {count}</p>
      <button  onClick={CountAddOne}>
        Button
      </button>
    </>
  )
}
```



子组件

```tsx
export default (): ReactElement => {
  console.log('children render')
  return <div>children component</div>
}
```

> 结果子组件啥也没变，这React也给我重新渲染组件了，这不扯淡吗？

这肯定不是我想要的，我想要的是子组件需要被渲染的时候再去执行，那么如何解决？

答：使用 `React.memo`。

React.memo 类似 class 组件里的 `PureComponent `, 能帮助我们控制合适重新渲染组件。

注意：说它类似，但不完全一样，它更像是 PureComponent + shouldComponentUpdate 的结合。
PureComponent 通过 props 和 state 的浅比较来判断要不要重新渲染组件。

那么在 react hooks 里如何去写呢？我们把子组件加上 React.memo :

```tsx
function ChildrenComponent():ReactElement {
  console.log('children render')
  return (
    <div>children component</div>
  )
}
export default React.memo(ChildrenComponent, (prevProps, nextProps):boolean => {
  // 如果传递 nextProps 渲染会返回与传递 prevProps 渲染相同的结果，则返回 true，否则返回 false.
 // return true:不渲染  return false:渲染
  return true
})
```

### Memo

为了提高React的运行性能，React v16.6.0提供了一个高阶组件——React.memo。当React.memo包装一个函数组件时，React会缓存输出的渲染结果，之后当遇到相同的渲染条件时，会跳过此次渲染。与React的PureComponent组件类似，React.memo默认使用了浅比较的缓存策略，但React.memo对应的是函数组件，而React.PureComponent对应的是类组件。React.memo的签名如下：

```tsx
function memo<P extends object>(  
  Component: SFC<P>,  
  propsAreEqual?: (prevProps: Readonly<PropsWithChildren<P>>, 
  nextProps: Readonly<PropsWithChildren<P>>
) => boolean): NamedExoticComponent<P>;
```

React.memo参数列表中的第一个参数接收一个函数组件，第二个参数表示可选的props比对函数。React.memo包装函数组件后，会返回一个新的记忆化组件。以一个示例来说明，若有一个子组件ChildComponent，没有通过React.memo记忆化：

```tsx
function ChildComponent({ count }) {
    console.log('childComponent render', count);
    return <>count:{count}</>;
}
const App = () => {
    const [count] = useState(0);
    const [childShow, setChild] = useState(true);
    return (
        <div>
            {' '}
            <button onClick={() => setChild(c => !c)}>隐藏/展示内容</button>{' '}
            {childShow && <div>内容</div>} <ChildComponent count={count} />{' '}
        </div>
    );
};
```

当重复单击按钮时，由于触发了重新渲染，ChildComponent将得到更新，将多次打印“childComponent render”。若引入React.memo(ChildComponent)缓存组件，则在渲染组件时，React将进行检查。如果该组件渲染的props与先前渲染的props不同，则React将触发渲染；反之，如果props前后没有变化，则React不执行渲染，更不会执行虚拟DOM差异检查，其将使用上一次的渲染结果。

```tsx
function ChildComponent({ count }) {
    console.log('childComponent render');
    return <>count:{count}</>;
}
const MemoChildComponent = React.memo(ChildComponent);
const App = () => {
    const [count] = useState(0);
    const [childShow, setChild] = useState(true);
    return (
        <div>
            {' '}
            <button onClick={() => setChild(c => !c)}> 隐藏/展示内容</button>{' '}
            {childShow && <div>内容</div>} <MemoChildComponent count={count} />{' '}
        </div>
    );
};
```

当单击“隐藏/展示内容”按钮时，会导致重新渲染，但由于原组件通过React.memo包装过，使用了包装后的组件MemoChildComponent，在多次渲染时props没有变化，因此这时不会多次打印“childComponent render”。

同时，React.memo可以使用第二个参数propsAreEqual来自定义渲染与否的逻辑：

```tsx
const MemoChildComponent = React.memo(ChildComponent, function propsAreEqual(prevProps, nextProps) {
    return prevProps.count === nextProps.count;
});
```

propsAreEqual接收上一次的prevProps与即将渲染的nextProps，函数返回的boolean值表明前后的props是否相等。若返回“true”，则认为前后props相等；反之，则认为不相等，React将根据函数的返回值决定组件的渲染情况（与shouldComponentUpdate类似）。因此，可认为函数返回“true”，props相等，不进行渲染；函数返回“false”则认为props有变化，React会执行渲染。 注意，不能把React.memo放在组件渲染过程中。

```tsx
const App = () => {
    // 每次都获得新的记忆化组件
    const MemoChildComponent = React.memo(ChildComponent);
    const [count] = useState(0);
    const [childShow, setChild] = useState(true);
    return (
        <div>
            {' '}
            <button onClick={() => setChild(c => !c)}>隐藏/展示内容</button>{' '}
            {childShow && <div>内容</div>} <MemoChildComponent count={count} />{' '}
        </div>
    );
};
```

这相当于每次渲染都开辟一块新的缓存，原缓存无法得到利用，React.memo的记忆化将失效，开发者需要特别注意。

## 参考文献

- [https://zh-hans.reactjs.org/d...](https://zh-hans.reactjs.org/docs/context.html.)
- [https://en.wikipedia.org/wiki...](https://en.wikipedia.org/wiki/Sideeffect(computer_science).)
- [https://zh-hans.reactjs.org/d...](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext.)
- [https://github.com/facebook/r...](https://github.com/facebook/react/blob/v16.8.6/packages/shared/shallowEqual.js.)
- [https://developer.mozilla.org...](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description.)

