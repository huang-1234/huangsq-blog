# 3. Hooks概要学习

## Hooks 的由来

> 先看看React官网怎么说：

### 在组件之间复用状态逻辑很难

React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 [render props](https://zh-hans.reactjs.org/docs/render-props.html) 和 [高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)。但是这类方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。如果你在 React DevTools 中观察过 React 应用，你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。尽管我们可以[在 DevTools 过滤掉它们](https://github.com/facebook/react-devtools/pull/503)，但这说明了一个更深层次的问题：React 需要为共享状态逻辑提供更好的原生途径。

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。**Hook 使你在无需修改组件结构的情况下复用状态逻辑。** 这使得在组件间或社区内共享 Hook 变得更便捷。

具体将在[自定义 Hook](https://zh-hans.reactjs.org/docs/hooks-custom.html) 中对此展开更多讨论。

### 复杂组件变得难以理解

我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 `componentDidMount` 和 `componentDidUpdate` 中获取数据。但是，同一个 `componentDidMount` 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 `componentWillUnmount` 中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。

在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。同时，这也是很多人将 React 与状态管理库结合使用的原因之一。但是，这往往会引入了很多抽象概念，需要你在不同的文件之间来回切换，使得复用变得更加困难。

为了解决这个问题，**Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

## 解决问题而出现

`Hooks`的出现是为了解决 React 长久以来存在的一些问题：

- 带组件状态的逻辑很难重用

为了解决这个问题，需要引入`render props`或`higher-order components`这样的设计模式，如`react-redux`提供的`connect`方法。这种方案不够直观，而且需要改变组件的层级结构，极端情况下会有多个`wrapper`嵌套调用的情况。

`Hooks`可以在不改变组件层级关系的前提下，方便的重用带状态的逻辑。

- 复杂组件难于理解

大量的业务逻辑需要放在`componentDidMount`和`componentDidUpdate`等生命周期函数中，而且往往一个生命周期函数中会包含多个不相关的业务逻辑，如日志记录和数据请求会同时放在`componentDidMount`中。另一方面，相关的业务逻辑也有可能会放在不同的生命周期函数中，如组件挂载的时候订阅事件，卸载的时候取消订阅，就需要同时在`componentDidMount`和`componentWillUnmount`中写相关逻辑。

`Hooks`可以封装相关联的业务逻辑，让代码结构更加清晰。

- 难于理解的 Class 组件

JS 中的`this`关键字让不少人吃过苦头，它的取值与其它面向对象语言都不一样，是在运行时决定的。为了解决这一痛点，才会有剪头函数的`this`绑定特性。另外 React 中还有`Class Component`和`Function Component`的概念，什么时候应该用什么组件也是一件纠结的事情。代码优化方面，对`Class Component`进行预编译和压缩会比普通函数困难得多，而且还容易出问题。

`Hooks`可以在不引入 Class 的前提下，使用 React 的各种特性。

## 1. setState更新状态的2种写法

```js
	(1). setState(stateChange, [callback])------对象式的setState
    1.stateChange为状态改变对象(该对象可以体现出状态的更改)
    2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
  
	(2). setState(updater, [callback])------函数式的setState
    1.updater为返回stateChange对象的函数。
    2.updater可以接收到state和props。
    4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
      (1).如果新状态不依赖于原状态 ===> 使用对象方式
      (2).如果新状态依赖于原状态 ===> 使用函数方式
      (3).如果需要在setState()执行后获取最新的状态数据,要在第二个callback函数中读取
```

## 2. lazyLoad

### 路由组件的lazyLoad

```jsx
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```

------

## 3. Hooks

#### 1. React Hook/Hooks是什么?

```js
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

#### 2. 三个常用的Hook

```js
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

#### 3. State Hook

```js
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

#### 4. Effect Hook

```js
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
    发ajax请求数据获取
    设置订阅 / 启动定时器
    手动更改真实DOM
(3). 语法和说明: 
    useEffect(() => { 
      // 在此可以执行任何带副作用操作
      return () => { // 在组件卸载前执行
        // 在此做一些收尾工作, 比如清除定时器/取消订阅等
      }
    }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
    componentDidMount()
    componentDidUpdate()
    componentWillUnmount() 
```

#### 5. Ref Hook

```js
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```



------



## 4. Fragment

### 使用

	<Fragment><Fragment>
	<></>

### 作用

> 可以不用必须有一个真实的DOM根标签了



<hr/>

## 5. Context
### 理解
> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

### 使用

```jsx
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
  </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

### 注意

```js
在应用开发中一般不用context, 一般都它的封装react插件
```

<hr/>


## 6. 组件优化

### Component的2个问题 

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render()
>
> 2. 只当前组件重新render(), 就会自动重新render子组件 ==> 效率低

### 效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

### 原因

>  Component中的shouldComponentUpdate()总是返回true

### 解决
```js
	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据
	项目中一般使用PureComponent来优化
```
<hr/>

## 7. render props

### 如何向组件内部动态传入带内容的结构(标签)?
```js
	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <AA><BB/></AA>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构, 一般用render函数属性
```
### children props
```js
	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 
```
### render props
```js
	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 

```
<hr/>
## 8. 错误边界

#### 理解：

错误边界：用来捕获后代组件错误，渲染出备用页面

#### 特点：

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

##### 使用方式：

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}
componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

## 9. 组件通信方式总结

#### 方式：

```js
	props：
		(1).children props
		(2).render props
	消息订阅-发布：
		pubs-sub、event等等
	集中式管理：
		redux、dva等等
	conText:
		生产者-消费者模式
```

#### 组件间的关系

```js
	父子组件：props
	兄弟组件(非嵌套组件)：消息订阅-发布、集中式管理
	祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少)
```

# 3.1 4个常用Hooks

## 为什么会有Hooks？

介绍Hooks之前，首先要给大家说一下React的组件创建方式，一种是***类组件\***，一种是***纯函数组件\***，并且React团队希望，组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管道即可。也就是说**组件的最佳写法应该是函数，而不是类。**。
 但是我们知道，在以往开发中*类组件*和*纯函数组件*的区别是很大的，纯函数组件有着类组件不具备的多种特点，简单列举几条

- 纯函数组件**没有状态**
- 纯函数组件**没有生命周期**
- 纯函数组件没有`this`
- 只能是纯函数

这就注定，我们所推崇的函数组件，只能做UI展示的功能，涉及到状态的管理与切换，我们不得不用类组件或者redux，但我们知道类组件的也是有缺点的，比如，遇到简单的页面，你的代码会显得很重，并且每创建一个类组件，都要去继承一个React实例，至于Redux,更不用多说，很久之前Redux的作者就说过，“能用React解决的问题就不用Redux”,等等一系列的话。关于React类组件redux的作者又有话说

> - 大型组件很难拆分和重构，也很难测试。
> - 业务逻辑分散在组件的各个方法之中，导致重复逻辑或关联逻辑。
> - 组件类引入了复杂的编程模式，比如 render props 和高阶组件。

下面我们用类组件做一个简单的计数器



```jsx
import React from 'react'
class AddCount extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
      count: 0
    }
  }
  addcount = () => {
    let newCount = this.state.count
    this.setState({
      count: newCount +=1
  })
  }
  render(){
    return (
      <>
        <p>{this.state.count}</p>
        <button onClick={this.addcount}>count++</button>
      </>
    )
  }
}
export default AddCount
```

可以看出来，上面的代码确实很重。
 为了解决这种，*类组件功能齐全却很重，纯函数很轻便却有上文几点重大限制*，React团队设计了**React Hooks**
 ***React Hooks就是加强版的函数组件，我们可以完全不使用 `class`，就能写出一个全功能的组件\***

## 什么是Hooks?

'Hooks'的单词意思为“钩子”。
 **React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。**而React Hooks 就是我们所说的“钩子”。
 那么Hooks要怎么用呢？“你需要写什么功能，就用什么钩子”。对于常见的功能，React为我们提供了一些常用的钩子，当然有特殊需要，我们也可以写自己的钩子。下面是React为我们提供的默认的四种最常用钩子

> - useState()
> - userContext()
> - userReducer()
> - useEffect()

不同的钩子为函数引入不同的外部功能，我们发现上面四种钩子都带有`use`前缀，React约定，钩子*一律使用* `use`前缀命名。所以，你自己定义的钩子都要命名为useXXX。

### React Hooks的用法

下面介绍四种默认钩子的用法

## 一、userState():状态钩子

我们知道，纯函数组件没有状态，`useState()`用于为函数组件引入状态。
 下面我们使用Hooks重写上面的计数器。



```jsx
import React, {useState} from 'react'
const AddCount = () => {
  const [ count, setCount ] = useState(0)
  const addcount = () => {
    let newCount = count
    setCount(newCount+=1)
  } 
  return (
    <>
      <p>{count}</p>
      <button onClick={addcount}>count++</button>
    </>
  )
}
export default AddCount 
```

通过上面的代码，我们实现了一个功能完全一样的计数器，代码看起来更加的轻便简洁，没有了继承，没有了渲染逻辑，没有了生命周期等。这就是hooks存在的意义。
 在`useState()`中，它接受状态的初始值作为参数，即上例中计数的初始值，它返回一个数组，其中数组第一项为一个变量，指向状态的当前值。类似`this.state`,第二项是一个函数，用来更新状态,类似`setState`。该函数的命名，我们约定为`set`前缀加状态的变量名。

## 二、useContext():共享状态钩子

该钩子的作用是，在组件之间共享状态。关于Context这里不再赘述，其作用就是可以做状态的分发，在React16.X以后支持，避免了react逐层通过Props传递数据。
 下面是一个例子，现在假设有A组件和B组件需要共享一个状态。



```jsx
import React,{ useContext } from 'react'
const Ceshi = () => {
  const AppContext = React.createContext({})
  const A =() => {
    const { name } = useContext(AppContext)
    return (
        <p>我是A组件的名字{name}<span>我是A的子组件{name}</span></p>
    )
}
const B =() => {
  const { name } = useContext(AppContext)
  return (
      <p>我是B组件的名字{name}</p>
  )
}
  return (
    <AppContext.Provider value={{name: 'hook测试'}}>
    <A/>
    <B/>
    </AppContext.Provider>
  )
}
export default Ceshi 
```

我们可以通过hooks做状态的共享。

## 三、useReducer():Action钩子

我们知道，在使用React的过程中，如遇到状态管理，我们一般会用到Redux,而React本身是不提供状态管理的。而`useReducer()`为我们提供了状态管理。首先，关于redux我们都知道，其原理是我们通过用户在页面中发起action,从而通过reducer方法来改变state,从而实现页面和状态的通信。而Reducer的形式是`(state, action) => newstate`。类似，我们的`useReducer()`是这样的



```cpp
const [state, dispatch] = useReducer(reducer, initialState)
```

它接受reducer函数和状态的初始值作为参数，返回一个数组，其中第一项为*当前的*状态值，第二项为发送action的dispatch函数。下面我们依然用来实现一个计数器。
 和redux一样，我们是需要通过页面组件发起action来调用reducer方法，从而改变状态，达到改变页面UI的这样一个过程。所以我们会先写一个Reducer函数，然后通过useReducer()返回给我们的state和dispatch来驱动这个数据流。思路就是这样，下面我们上代码

```jsx
import React, { useReducer } from 'react'

const AddCount = () => {
  const reducer = (state, action) => {
    if (action.type === 'add') {
      return {
        ...state,
        count: state.count + 1,
      }
    }else {
      return state
    }
  }
  const addcount = () => {
    dispatch({
      type: 'add'
    })
  }
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return (
    <>
      <p>{state.count}</p>
      <button onClick={addcount}>count++</button>
    </>
  )
}
export default AddCount
```

通过代码我们看到了，我们使用`useReducer()`代替了Redux的功能，但`useReducer`无法为我们提供中间件等功能，加入你有这些需求，还是需要用到redux。

## 四、useEffect():副作用钩子

熟悉redux-saga的同学一定对`Effect`不陌生,它可以用来更好的处理副作用，如异步请求等，我们的`useEffect()`也是为函数组件提供了处理副作用的钩子。依然我们会把请求房子`componentDidMount`里面，在函数组件中我们可以使用`useEffect()`。其具体用法如下



```jsx
useEffect(() => {},[array])
```

`useEffect()`接受两个参数，第一个参数是你要进行的异步操作，第二个参数是一个数组，用来给出Effect的依赖项。只要这个数组发生变化，`useEffect()`就会执行。当第二项省略不填时，`useEffect()`会在每次组件渲染时执行。这一点类似于类组件的`componentDidMount`。下面我们通过代码模拟一个异步加载数据。

```jsx
import React, { useState, useEffect } from 'react'
const AsyncPage = () => {
const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(()=> {
      setLoading(false)
    },5000)
  })
return (
loading ? <p>Loading...</p>: <p>异步请求完成</p>
)
}

export default AsyncPage 
```

上面的代码实现了一个异步加载，下面我们再做一个`useEffect()`依赖第二项数组变化的例子。

```jsx
import React, { useState, useEffect } from 'react'

const AsyncPage = ({name}) => {
const [loading, setLoading] = useState(true)
const [person, setPerson] = useState({})

  useEffect(() => {
    setLoading(true)
    setTimeout(()=> {
      setLoading(false)
      setPerson({name})
    },2000)
  },[name])
  return (
    <>
      {loading?<p>Loading...</p>:<p>{person.name}</p>}
    </>
  )
}

const PersonPage = () =>{
  const [state, setState] = useState('')
  const changeName = (name) => {
    setState(name)
  }
  return (
    <>
      <AsyncPage name={state}/>
      <button onClick={() => {changeName('名字1')}}>名字1</button>
      <button onClick={() => {changeName('名字2')}}>名字2</button>
    </>
  )
}

export default PersonPage 
```

上面代码中，通过改变传给`AsyncPage`的props,从而调用`useEffect()`。

## 五、创建自己的Hooks

以上我们介绍了四种最常用的react提供给我们的默认React Hooks,有时候我们需要创建我们自己想要的Hooks,来满足更便捷的开发，在小编看来，无非就是根据业务场景对以上四种Hooks进行组装，从而得到满足自己需求的钩子。
 比如，我们要将我们上面的代码功能封装成Hooks,代码如下

```dart
import React, { useState, useEffect } from 'react'

const usePerson = (name) => {
const [loading, setLoading] = useState(true)
const [person, setPerson] = useState({})

useEffect(() => {
  setLoading(true)
  setTimeout(()=> {
    setLoading(false)
      setPerson({name})
  },2000)
},[name])
  return [loading,person]
}

const AsyncPage = ({name}) => {
  const [loading, person] = usePerson(name)
    return (
      <>
        {loading?<p>Loading...</p>:<p>{person.name}</p>}
      </>
    )
  }

const PersonPage = () =>{
  const [state, setState]=useState('')
  const changeName = (name) => {
    setState(name)
  }
  return (
    <>
      <AsyncPage name={state}/>
      <button onClick={() => {changeName('名字1')}}>名字1</button>
      <button onClick={() => {changeName('名字2')}}>名字2</button>
    </>
  )
}

export default PersonPage 
```

上面代码中，我们将之前的例子封装成了自己的Hooks,便于共享。其中，我们定义`usePerson()`为我们的自定义Hooks,它接受一个字符串，返回一个数组，数组中包括两个数据的状态，之后我们在使用`usePerson()`时，会根据我们传入的参数不同而返回不同的状态，然后很简便的应用于我们的页面中。

至此，文章关于React Hooks的讲解结束，它为我们带来了React翻天覆地的变化，也让我们感受到了React的未来，不过，假如你不会Hooks也是没有关系的。根据官方文档的话来说

> - **完全可选的。** 你无需重写任何已有代码就可以在一些组件中尝试 Hook。但是如果你不想，你不必现在就去学习或使用 Hook。
> - **100% 向后兼容的。** Hook 不包含任何破坏性改动。
> - **现在可用。** Hook 已发布于 v16.8.0。
> - **没有计划从 React 中移除 class。**
> - **Hook 不会影响你对 React 概念的理解。** 恰恰相反，Hook 为已知的 React 概念提供了更直接的 API：props， state，context，refs 以及生命周期。

本文参考了[阮一峰老师的博客](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2019%2F09%2Freact-hooks.html)
 对Hooks感兴趣，想获得更多资料的，还望到[官网](https://links.jianshu.com/go?to=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fhooks-intro.html)探索，本文只做抛砖引玉和个人学习交流之用。

# 3.2 深入Hooks

### 一、前言

React Hooks 是从 v16.8 引入的又一开创性的新特性。第一次了解这项特性的时候，真的有一种豁然开朗，发现新大陆的感觉。我深深的为 React 团队天马行空的创造力和精益求精的钻研精神所折服。本文除了介绍具体的用法外，还会分析背后的逻辑和使用时候的注意事项，力求做到知其然也知其所以然。

这个系列分上下两篇，这里是上篇的传送门：
[React Hooks 解析（上）：基础](https://segmentfault.com/a/1190000018928587)

### 二、useLayoutEffect

`useLayoutEffect`的用法跟`useEffect`的用法是完全一样的，都可以执行副作用和清理操作。它们之间唯一的区别就是执行的时机。

`useEffect`不会阻塞浏览器的绘制任务，它在页面更新后才会执行。

而`useLayoutEffect`跟`componentDidMount`和`componentDidUpdate`的执行时机一样，会阻塞页面的渲染。如果在里面执行耗时任务的话，页面就会卡顿。

在绝大多数情况下，`useEffect`Hook 是更好的选择。唯一例外的就是需要根据新的 UI 来进行 DOM 操作的场景。`useLayoutEffect`会保证在页面渲染前执行，也就是说页面渲染出来的是最终的效果。如果使用`useEffect`，页面很可能因为渲染了 2 次而出现抖动。

### 三、useContext

`useContext`可以很方便的去订阅 context 的改变，并在合适的时候重新渲染组件。我们先来熟悉下标准的 context API 用法：

```
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间层组件
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 通过定义静态属性 contextType 来订阅
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

除了定义静态属性的方式，还有另外一种针对`Function Component`的订阅方式：

```
function ThemedButton() {
    // 通过定义 Consumer 来订阅
    return (
        <ThemeContext.Consumer>
          {value => <Button theme={value} />}
        </ThemeContext.Consumer>
    );
}
```

使用`useContext`来订阅，代码会是这个样子，没有额外的层级和奇怪的模式：

```
function ThemedButton() {
  const value = useContext(NumberContext);
  return <Button theme={value} />;
}
```

在需要订阅多个 context 的时候，就更能体现出`useContext`的优势。传统的实现方式：

```
function HeaderBar() {
  return (
    <CurrentUser.Consumer>
      {user =>
        <Notifications.Consumer>
          {notifications =>
            <header>
              Welcome back, {user.name}!
              You have {notifications.length} notifications.
            </header>
          }
      }
    </CurrentUser.Consumer>
  );
}
```

`useContext`的实现方式更加简洁直观：

```
function HeaderBar() {
  const user = useContext(CurrentUser);
  const notifications = useContext(Notifications);

  return (
    <header>
      Welcome back, {user.name}!
      You have {notifications.length} notifications.
    </header>
  );
}
```

### 四、useReducer

`useReducer`的用法跟 Redux 非常相似，当 state 的计算逻辑比较复杂又或者需要根据以前的值来计算时，使用这个 Hook 比`useState`会更好。下面是一个例子：

```
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```

结合 context API，我们可以模拟 Redux 的操作了，这对组件层级很深的场景特别有用，不需要一层一层的把 state 和 callback 往下传：

```
const TodosDispatch = React.createContext(null);
const TodosState = React.createContext(null);

function TodosApp() {
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <TodosState.Provider value={todos}>
        <DeepTree todos={todos} />
      </TodosState.Provider>
    </TodosDispatch.Provider>
  );
}

function DeepChild(props) {
  const dispatch = useContext(TodosDispatch);
  const todos = useContext(TodosState);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <>
      {todos}
      <button onClick={handleClick}>Add todo</button>
    </>
  );
}
```

### 五、useCallback / useMemo / React.memo

`useCallback`和`useMemo`设计的初衷是用来做性能优化的。在`Class Component`中考虑以下的场景：

```
class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <Button onClick={() => this.handleClick()}>Click Me</Button>;
  }
}
```

传给 Button 的 onClick 方法每次都是重新创建的，这会导致每次 Foo render 的时候，Button 也跟着 render。优化方法有 2 种，箭头函数和 bind。下面以 bind 为例子：

```
class Foo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <Button onClick={this.handleClick}>Click Me</Button>;
  }
}
```

同样的，`Function Component`也有这个问题：

```
function Foo() {
  const [count, setCount] = useState(0);

  const handleClick() {
    console.log(`Click happened with dependency: ${count}`)
  }
  return <Button onClick={handleClick}>Click Me</Button>;
}
```

而 React 给出的方案是`useCallback` Hook。在依赖不变的情况下 (在我们的例子中是 count )，它会返回相同的引用，避免子组件进行无意义的重复渲染：

```
function Foo() {
  const [count, setCount] = useState(0);

  const memoizedHandleClick = useCallback(
    () => console.log(`Click happened with dependency: ${count}`), [count],
  ); 
  return <Button onClick={memoizedHandleClick}>Click Me</Button>;
}
```

`useCallback`缓存的是方法的引用，而`useMemo`缓存的则是方法的返回值。使用场景是减少不必要的子组件渲染：

```
function Parent({ a, b }) {
  // 当 a 改变时才会重新渲染
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // 当 b 改变时才会重新渲染
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```

如果想实现`Class Component`的`shouldComponentUpdate`方法，可以使用`React.memo`方法，区别是它只能比较 props，不会比较 state：

```
const Parent = React.memo(({ a, b }) => {
  // 当 a 改变时才会重新渲染
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // 当 b 改变时才会重新渲染
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
});
```

### 六、useRef

`Class Component`获取 ref 的方式如下：

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  
  componentDidMount() {
    this.myRef.current.focus();
  }  

  render() {
    return <input ref={this.myRef} type="text" />;
  }
}
```

Hooks 的实现方式如下：

```
function() {
  const myRef = useRef(null);

  useEffect(() => {
    myRef.current.focus();
  }, [])
  
  return <input ref={myRef} type="text" />;
}
```

`useRef`返回一个普通 JS 对象，可以将任意数据存到`current`属性里面，就像使用实例化对象的`this`一样。另外一个使用场景是获取 previous props 或 previous state：

```
function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;

  return <h1>Now: {count}, before: {prevCount}</h1>;
}
```

### 七、自定义 Hooks

还记得我们上一篇提到的 React 存在的问题吗？其中一点是：

> 带组件状态的逻辑很难重用

通过自定义 Hooks 就能解决这一难题。

继续以上一篇文章中订阅朋友状态的例子：

```
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

假设现在我有另一个组件有类似的逻辑，当朋友上线的时候展示为绿色。简单的复制粘贴虽然可以实现需求，但太不优雅：

```
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

这时我们就可以自定义一个 Hook 来封装订阅的逻辑：

```
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

自定义 Hook 的命名有讲究，必须以`use`开头，在里面可以调用其它的 Hook。入参和返回值都可以根据需要自定义，没有特殊的约定。使用也像普通的函数调用一样，Hook 里面其它的 Hook（如`useEffect`）会自动在合适的时候调用：

```
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

自定义 Hook 其实就是一个普通的函数定义，以`use`开头来命名也只是为了方便静态代码检测，不以它开头也完全不影响使用。在此不得不佩服 React 团队的巧妙设计。

### 八、Hooks 使用规则

使用 Hooks 的时候必须遵守 2 条规则：

- 只能在代码的第一层调用 Hooks，不能在循环、条件分支或者嵌套函数中调用 Hooks。
- 只能在`Function Component`或者自定义 Hook 中调用 Hooks，不能在普通的 JS 函数中调用。

Hooks 的设计极度依赖其定义时候的顺序，如果在后序的 render 中 Hooks 的调用顺序发生变化，就会出现不可预知的问题。上面 2 条规则都是为了保证 Hooks 调用顺序的稳定性。为了贯彻这 2 条规则，React 提供一个 ESLint plugin 来做静态代码检测：[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)。

### 九、总结

本文深入介绍了 6 个 React 预定义 Hook 的使用方法和注意事项，并讲解了如何自定义 Hook，以及使用 Hooks 要遵循的一些约定。到此为止，Hooks 相关的内容已经介绍完了，内容比我刚开始计划的要多不少，想要彻底理解 Hooks 的设计是需要投入相当精力的，希望本文可以为你学习这一新特性提供一些帮助。

# 3.3 useEffect

## useEffect和生命周期 

`useEffect`会在每次 DOM 渲染后执行，不会阻塞页面渲染。它同时具备`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`三个生命周期函数的执行时机。

此外还有一些副作用需要组件卸载的时候做一些额外的清理工作的，例如订阅某个功能：

## 五、useEffect() 的用法

`useEffect()`本身是一个函数，由 React 框架提供，在函数组件内部调用即可。

举例来说，我们希望组件加载以后，网页标题（`document.title`）会随之改变。那么，改变网页标题这个操作，就是组件的副效应，必须通过`useEffect()`来实现。

> ```jsx
> import React, { useEffect } from 'react';
> 
> function Welcome(props) {
>   useEffect(() => {
>     document.title = '加载完成';
>   });
>   return <h1>Hello, {props.name}</h1>;
> }
> ```

上面例子中，`useEffect()`的参数是一个函数，它就是所要完成的副效应（改变网页标题）。组件加载以后，React 就会执行这个函数。

`useEffect()`的作用就是指定一个副效应函数，组件每渲染一次，该函数就自动执行一次。组件首次在网页 DOM 加载后，副效应函数也会执行。

## 六、useEffect() 的第二个参数

有时候，我们不希望`useEffect()`每次渲染都执行，这时可以使用它的第二个参数，使用一个数组指定副效应函数的依赖项，只有依赖项发生变化，才会重新渲染。

> ```jsx
> function Welcome(props) {
>   useEffect(() => {
>     document.title = `Hello, ${props.name}`;
>   }, [props.name]);
>   return <h1>Hello, {props.name}</h1>;
> }
> ```

上面例子中，`useEffect()`的第二个参数是一个数组，指定了第一个参数（副效应函数）的依赖项（`props.name`）。只有该变量发生变化时，副效应函数才会执行。

如果第二个参数是一个空数组，就表明副效应参数没有任何依赖项。因此，副效应函数这时只会在组件加载进入 DOM 后执行一次，后面组件重新渲染，就不会再次执行。这很合理，由于副效应不依赖任何变量，所以那些变量无论怎么变，副效应函数的执行结果都不会改变，所以运行一次就够了。

## 七、useEffect() 的用途

只要是副效应，都可以使用`useEffect()`引入。它的常见用途有下面几种。

- 获取数据（data fetching）
- 事件监听或订阅（setting up a subscription）
- 改变 DOM（changing the DOM）
- 输出日志（logging）

下面是从远程服务器获取数据的例子。（[查看运行结果](https://codesandbox.io/s/intelligent-yonath-olihz?file=/src/index.js)）

> ```jsx
> import React, { useState, useEffect } from 'react';
> import axios from 'axios';
> 
> function App() {
>   const [data, setData] = useState({ hits: [] });
> 
>   useEffect(() => {
>     const fetchData = async () => {
>       const result = await axios('https://hn.algolia.com/api/v1/search?query=redux',);
>       setData(result.data);
>     };
>     fetchData();
>   }, []);
> 
>   return (
>     <ul>
>       {data.hits.map(item => (
>         <li key={item.objectID}>
>           <a href={item.url}>{item.title}</a>
>         </li>
>       ))}
>     </ul>
>   );
> }
> 
> export default App;
> ```

上面例子中，`useState()`用来生成一个状态变量（`data`），保存获取的数据；`useEffect()`的副效应函数内部有一个 async 函数，用来从服务器异步获取数据。拿到数据以后，再用`setData()`触发组件的重新渲染。

由于获取数据只需要执行一次，所以上例的`useEffect()`的第二个参数为一个空数组。

## 八、useEffect() 的返回值

副效应是随着组件加载而发生的，那么组件卸载时，可能需要清理这些副效应。

`useEffect()`允许返回一个函数，在组件卸载时，执行该函数，清理副效应。如果不需要清理副效应，`useEffect()`就不用返回任何值。

> ```jsx
> useEffect(() => {
>   const subscription = props.source.subscribe();
>   return () => {
>     subscription.unsubscribe();
>   };
> }, [props.source]);
> ```

上面例子中，`useEffect()`在组件加载时订阅了一个事件，并且返回一个清理函数，在组件卸载时取消订阅。

实际使用中，由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应。

## 九、useEffect() 的注意点

使用`useEffect()`时，有一点需要注意。如果有多个副效应，应该调用多个`useEffect()`，而不应该合并写在一起。

> ```jsx
> function App() {
>   const [varA, setVarA] = useState(0);
>   const [varB, setVarB] = useState(0);
>   useEffect(() => {
>     const timeoutA = setTimeout(() => setVarA(varA + 1), 1000);
>     const timeoutB = setTimeout(() => setVarB(varB + 2), 2000);
> 
>     return () => {
>       clearTimeout(timeoutA);
>       clearTimeout(timeoutB);
>     };
>   }, [varA, varB]);
> 
>   return <span>{varA}, {varB}</span>;
> }
> ```

上面的例子是错误的写法，副效应函数里面有两个定时器，它们之间并没有关系，其实是两个不相关的副效应，不应该写在一起。正确的写法是将它们分开写成两个`useEffect()`。

> ```jsx
> function App() {
>   const [varA, setVarA] = useState(0);
>   const [varB, setVarB] = useState(0);
> 
>   useEffect(() => {
>     const timeout = setTimeout(() => setVarA(varA + 1), 1000);
>     return () => clearTimeout(timeout);
>   }, [varA]);
> 
>   useEffect(() => {
>     const timeout = setTimeout(() => setVarB(varB + 2), 2000);
> 
>     return () => clearTimeout(timeout);
>   }, [varB]);
> 
>   return <span>{varA}, {varB}</span>;
> }
> ```

## 十、参考链接

- [React useEffect: 4 Tips Every Developer Should Know](https://medium.com/swlh/useeffect-4-tips-every-developer-should-know-54b188b14d9c), Helder Esteves
- [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html), React
- [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data), Robin Wieruch