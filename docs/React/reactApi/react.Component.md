# 组件类

组件类，详细分的话有三种类，第一类说白了就是我平时用于继承的基类组件`Component`,`PureComponent`,还有就是`react`提供的内置的组件，比如`Fragment`,`StrictMode`,另一部分就是高阶组件`forwardRef`,`memo`等。

## Component

`Component`是`class`组件的根基。类组件一切始于`Component`。

```js
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
```

这就是`Component`函数，其中`updater`对象上保存着更新组件的方法。

那么类组件在何时被实例化的呢？

```js
// react-reconciler/src/ReactFiberClassComponent.js
function constructClassInstance(
    workInProgress,
    ctor,
    props
){
   const instance = new ctor(props, context);
     instance.updater = {
        isMounted,
        enqueueSetState(){
            /* setState 触发这里面的逻辑 */
        },
        enqueueReplaceState(){},
        enqueueForceUpdate(){
            /* forceUpdate 触发这里的逻辑 */
        }
     }
}
```

对于`Component`， `react` 处理逻辑还是很简单的，实例化我们类组件，然后赋值`updater`对象，负责组件的更新。然后在组件各个阶段，执行类组件的`render`函数，和对应的生命周期函数就可以了。

## PureComponent

`PureComponent`和 `Component`用法，差不多一样，唯一不同的是，纯组件`PureComponent`会浅比较`props`和`state`是否相同，来决定是否重新渲染组件。所以一般用于**性能调优**，减少**render**次数。

下面介绍一下浅比较：

```js
class Index extends React.PureComponent{
    constructor(props){
        super(props)
        this.state={
           data:{
              name:'alien',
              age:28
           }
        }
    }
    handerClick= () => {
        const { data } = this.state
        data.age++
        this.setState({ data })
    }
    render(){
        const { data } = this.state
        return (
            <div className="box" >
        		<div className="show" >
            		<div> 你的姓名是: { data.name } </div>
            		<div> 年龄： { data.age  }</div>
            		<button onClick={ this.handerClick } >age++</button>
        		</div>
    		</div>
		)
    }
}
```

**点击按钮，没有任何反应**，因为`PureComponent`会比较两次`data`对象，都指向同一个`data`没有发生改变，所以不更新视图。

当然，这种问题可以通过浅拷贝就能解决。

```js
 this.setState({ data:{...data} })
```

## memo

`React.memo`和`PureComponent`作用类似，可以用作性能优化，`React.memo` 是高阶组件，函数组件和类组件都可以使用， `React.memo`只能对`props`的情况确定是否渲染，而`PureComponent`是针对`props`和`state`。

`React.memo` 接受两个参数，第一个参数原始组件本身，第二个参数，可以根据一次更新中`props`是否相同决定原始组件是否重新渲染，是一个返回布尔值的函数，`true` 证明组件无须重新渲染，`false`证明组件需要重新渲染，这个和类组件中的`shouldComponentUpdate()`正好相反 。

**React.memo: 第二个参数 返回 `true` 组件不渲染 ， 返回 `false` 组件重新渲染。 shouldComponentUpdate: 返回 `true` 组件渲染 ， 返回 `false` 组件不渲染。**

下面举个简单的例子：

控制 `props` 中的 `number` ：

- 只有 `number` 更改，组件渲染。
- 只有 `number` 小于 5 ，组件渲染。

```js
function TextMemo(props){
    console.log('子组件渲染')
    if(props)
    return <div>hello,world</div> 
}

const controlIsRender = (pre,next)=>{
   if(pre.number === next.number  ){ // number 不改变 ，不渲染组件
       return true 
   }else if(pre.number !== next.number && next.number > 5 ) { // number 改变 ，但值大于5 ， 不渲染组件
       return true
   }else { // 否则渲染组件
       return false
   }
}

const NewTexMemo = memo(TextMemo,controlIsRender)
class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            number:1,
            num:1
        }
    }
    render(){
        const { num , number }  = this.state
        return <div>
            <div>
                改变num：当前值 { num }  
                <button onClick={ ()=>this.setState({ num:num + 1 }) } >num++</button>
                <button onClick={ ()=>this.setState({ num:num - 1 }) } >num--</button>  
            </div>
            <div>
                改变number： 当前值 { number } 
                <button onClick={ ()=>this.setState({ number:number + 1 }) } > number ++</button>
                <button onClick={ ()=>this.setState({ number:number - 1 }) } > number -- </button>  
            </div>
            <NewTexMemo num={ num } number={number}  />
        </div>
    }
}
```

完美达到了效果，`React.memo`一定程度上，可以等价于组件外部使用`shouldComponentUpdate` ，用于拦截新老`props`，确定组件是否更新。

## forwardRef

下面主要讲讲应用场景

### **转发引入Ref**

父组件想获取孙组件某一个`dom`元素。这种隔代`ref`获取引用，就需要`forwardRef`来助力。

```js
function Son (props){
    const { grandRef } = props
    return <div>
        <div> i am alien </div>
        <span ref={grandRef} >这个是想要获取元素</span>
    </div>
}

class Father extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div>
            <Son grandRef={this.props.grandRef}  />
        </div>
    }
}

const NewFather = React.forwardRef((props,ref)=><Father grandRef={ref}  {...props} />  )

class GrandFather extends React.Component{
    constructor(props){
        super(props)
    }
    node = null 
    componentDidMount(){
        console.log(this.node)
    }
    render(){
        return <div>
            <NewFather ref={(node)=> this.node = node } />
        </div>
    }
}
```

`react`不允许`ref`通过`props`传递，因为组件上已经有 `ref` 这个属性,在组件调和过程中，已经被特殊处理，`forwardRef`出现就是解决这个问题，把`ref`转发到自定义的`forwardRef`定义的属性上，让`ref`，可以通过`props`传递。

### **高阶组件转发Ref**

由于属性代理的`hoc`，被包裹一层，所以如果是类组件，是通过`ref`拿不到原始组件的实例的，不过可以通过`forWardRef`转发`ref`。

```js
function HOC(Component){
  class Wrap extends React.Component{
     render(){
        const { forwardedRef ,...otherprops  } = this.props
        return <Component ref={forwardedRef}  {...otherprops}  />
     }
  }
  return  React.forwardRef((props,ref)=> <Wrap forwardedRef={ref} {...props} /> ) 
}
class Index extends React.Component{
  componentDidMount(){
      console.log(666)
  }
  render(){
    return <div>hello,world</div>
  }
}
const HocIndex =  HOC(Index,true)
export default ()=>{
  const node = useRef(null)
  useEffect(()=>{
     /* 就可以跨层级，捕获到 Index 组件的实例了 */ 
    console.log(node.current.componentDidMount)
  },[])
  return <div><HocIndex ref={node}  /></div>
}
```

## lazy

> React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 Loadable Components 这个库

`React.lazy`和`Suspense`配合一起用，能够有动态加载组件的效果。`React.lazy` 接受一个函数，这个函数需要动态调用 `import()`。它必须返回一个 `Promise` ，该 `Promise` 需要 `resolve` 一个 `default export` 的 `React` 组件。

下面举个很简单的例子：

父组件：

```js
import Test from './comTest'
const LazyComponent =  React.lazy(()=> new Promise((resolve)=>{
      setTimeout(()=>{
          resolve({
              default: ()=> <Test />
          })
      },2000)
}))
class index extends React.Component{   
    render(){
        return <div className="context_box"  style={ { marginTop :'50px' } }   >
           <React.Suspense fallback={ <div className="icon" ><SyncOutlined  spin  /></div> } >
               <LazyComponent />
           </React.Suspense>
        </div>
    }
}
```

用`setTimeout`来模拟`import`异步引入效果。

Test:

```js
class Test extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log('--componentDidMount--')
    }
    render(){
        return (
            <div>
                <img src={alien}  className="alien" />
        	</div>
	    )
    }
}
```

## Suspense

何为`Suspense`, `Suspense` 让组件“等待”某个异步操作，直到该异步操作结束即可渲染。

用于数据获取的 `Suspense` 是一个新特性，你可以使用 `<Suspense>` 以声明的方式来“等待”任何内容，包括数据。本文重点介绍它在数据获取的用例，它也可以用于等待图像、脚本或其他异步的操作。

```js
const ProfilePage = React.lazy(() => import('./ProfilePage')); // 懒加载
<Suspense fallback={<Spinner />}>
  <ProfilePage />
</Suspense>
```

## Fragment

`react`不允许一个组件返回多个节点元素，比如说如下情况

```js
render(){
    return <li> 🍎🍎🍎 </li>
           <li> 🍌🍌🍌 </li>
           <li> 🍇🍇🍇 </li>
}
```

如果我们想解决这个情况，很简单，只需要在外层套一个容器元素。

```js
render(){
    return <div>
           <li> 🍎🍎🍎 </li>
           <li> 🍌🍌🍌 </li>
           <li> 🍇🍇🍇 </li>
    </div>
}
```

但是这样会导致增加了额外的`dom`节点，所以`react`提供`Fragment`碎片概念，能够让一个组件返回多个元素。

```js
<React.Fragment>
    <li> 🍎🍎🍎 </li>
    <li> 🍌🍌🍌 </li>
    <li> 🍇🍇🍇 </li>
</React.Fragment>
```

当然也可以简化成如下的结构：

```js
<>
    <li> 🍎🍎🍎 </li>
    <li> 🍌🍌🍌 </li>
    <li> 🍇🍇🍇 </li>
</>
```

和`Fragment`区别是，`Fragment`可以支持`key`属性。`<></>`不支持`key`属性。

```js
{
   [1,2,3].map(item=><span key={item.id} >{ item.name }</span>)
}
```

`react`底层处理之后，等价于：

```html
<Fragment>
   <span></span>
   <span></span>
   <span></span>
</Fragment>
```

## Profiler

`Profiler`这个`api`一般用于开发阶段，性能检测，检测一次`react`组件渲染用时，性能开销。

`Profiler` 需要两个参数：

第一个参数：是 `id`，用于标识唯一性的`Profiler`。

第二个参数：`onRender`回调函数，用于渲染完成，接受渲染参数。

```js
const index = () => {
  const callback = (...arg) => console.log(arg)
  return <div >
    <div >
      <Profiler id="root" onRender={ callback }  >
        <Router  >
          <Meuns/>
          <KeepaliveRouterSwitch withoutRoute >
              { renderRoutes(menusList) }
          </KeepaliveRouterSwitch>
        </Router>
      </Profiler> 
    </div>
  </div>
}
```

### onRender

0 -id: `root`  ->  `Profiler` 树的 `id` 。

1 -phase: `mount` ->  `mount` 挂载 ， `update` 渲染了。

2 -actualDuration: `6.685000262223184`  -> 更新 `committed` 花费的渲染时间。

3 -baseDuration:  `4.430000321008265`  -> 渲染整颗子树需要的时间

4 -startTime : `689.7299999836832` ->  本次更新开始渲染的时间

5 -commitTime : `698.5799999674782` ->  本次更新committed 的时间

6 -interactions: `set{}` -> 本次更新的 `interactions` 的集合

> 尽管 Profiler 是一个轻量级组件，我们依然应该在需要时才去使用它。对一个应用来说，每添加一些都会给 CPU 和内存带来一些负担。

## StrictMode

`StrictMode`见名知意，严格模式，用于检测`react`项目中的潜在的问题。与 `Fragment` 一样， `StrictMode` 不会渲染成任何可见的 `UI`。它为其后代元素提供额外的检查和警告。

> 严格模式检查仅在开发模式下运行；它们不会影响生产构建。

`StrictMode`目前有助于：

- 识别不安全的生命周期。
- 关于使用过时字符串 `ref API` 的警告
- 关于使用废弃的 `findDOMNode` 方法的警告
- 检测意外的副作用
- 检测过时的 `context API`

我们举个例子，让它识别一下不安全的生命周期。

对于不安全的生命周期，指的是`UNSAFE_componentWillMount`，`UNSAFE_componentWillReceiveProps` , `UNSAFE_componentWillUpdate`。

外层开启严格模式：

```js
<React.StrictMode> 
    <Router>
        <Meuns/>
        <KeepaliveRouterSwitch withoutRoute >
            { renderRoutes(menusList) }
        </KeepaliveRouterSwitch>
    </Router>
</React.StrictMode>
```

在内层组件中，使用不安全的生命周期:

```js
class Index extends React.Component{    
    UNSAFE_componentWillReceiveProps(){
    }
    render(){      
        return <div className="box" />   
    }
}
```

运行之后就会提出警告。

