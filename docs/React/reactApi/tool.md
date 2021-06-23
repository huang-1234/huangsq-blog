# 工具类

## createElement

一提到`createElement`，就不由得和`JSX`联系一起。我们写的`jsx`，最终会被 `babel`，用`createElement`编译成`react`元素形式。

下面看个实例：

```js
render(){
    return (
    	<div className="box" >
        	<div className="item">生命周期</div>
        	<Text mes="hello,world" />
        	<React.Fragment> Flagment </React.Fragment>
        	{ /*  */ }
        	text文本
    	</div>
    )
}
```

会被编译成这样：

```js
render() {
    return React.createElement("div", { className: "box" },
            React.createElement("div", { className: "item" }, "\u751F\u547D\u5468\u671F"),
            React.createElement(Text, { mes: "hello,world" }),
            React.createElement(React.Fragment, null, " Flagment "),
            "text\u6587\u672C");
    }

```

**`createElement`模型:**

```js
React.createElement(
  type,
  [props],
  [...children]
)
```

`createElement`参数：

**第一个参数**:如果是组件类型，会传入组件，如果是`dom`元素类型，传入`div`或者`span`之类的字符串。

**第二个参数**:第二个参数为一个对象，在`dom`类型中为**属性**，在`组件`类型中为**props**。

**其他参数**:依次为`children`，根据顺序排列。



**createElement做了些什么？**

经过`createElement`处理，最终会形成 `$$typeof = Symbol(react.element)`对象。对象上保存了该`react.element`的信息。

## cloneElement

`createElement`把我们写的`jsx`，变成`element`对象;  而`cloneElement`的作用是以 `element` 元素为样板克隆并返回新的 `React` 元素。返回元素的 `props` 是将新的 `props` 与原始元素的 `props` 浅层合并后的结果。

 那么`cloneElement`感觉在我们实际业务组件中，可能没什么用，但是在**一些开源项目，或者是公共插槽组件中**用处还是比较大的，比如说，我们可以在组件中，劫持`children element`，然后通过`cloneElement`克隆`element`，混入`props`。经典的案例就是 `react-router`中的`Swtich`组件，通过这种方式，来匹配唯一的 `Route`并加以渲染。

举个例子：

```js
function FatherComponent({ children }){
    const newChildren = React.cloneElement(children, { age: 18})
    return <div> { newChildren } </div>
}

function SonComponent(props){
    console.log(props) // {name: 'alien', age: 18}
    return <div>hello,world</div>
}

class Index extends React.Component{    
    render(){      
        return <div className="box" >
            <FatherComponent>
                <SonComponent name="alien"  />
            </FatherComponent>
        </div>   
    }
}
```

## createContext

`createContext`用于创建一个`Context`对象，`createContext`对象中，包括用于传递 `Context` 对象值 `value`的`Provider`，和接受`value`变化订阅的`Consumer`。

```js
const MyContext = React.createContext(defaultValue)
```

`createContext`接受一个参数`defaultValue`，如果`Consumer`上一级一直没有`Provider`,则会应用`defaultValue`作为`value`。**只有**当组件所处的树中没有匹配到 `Provider` 时，其 `defaultValue` 参数才会生效。

来模拟一个 `Context.Provider`和`Context.Consumer`的例子:

```js
function ComponentB(){
    /* 用 Consumer 订阅， 来自 Provider 中 value 的改变  */
    return <MyContext.Consumer>
        { (value) => <ComponentA  {...value} /> }
    </MyContext.Consumer>
}

function ComponentA(props){
    const { name , mes } = props
    return <div> 
            <div> 姓名： { name }  </div>
            <div> 想对大家说： { mes }  </div>
         </div>
}

function index(){
    const [ value , ] = React.useState({
        name:'alien',
        mes:'let us learn React '
    })
    return <div style={{ marginTop:'50px' }} >
        <MyContext.Provider value={value}  >
          <ComponentB />
    	</MyContext.Provider>
    </div>
}
```

`Provider`和`Consumer`的良好的特性，可以做数据的**存**和**取**，`Consumer`一方面传递`value`,另一方面可以订阅`value`的改变。

`Provider`还有一个特性可以层层传递`value`，这种特性在`react-redux`中表现的淋漓尽致。

## createFactory

```js
React.createFactory(type)
```

返回用于生成指定类型 React 元素的函数。类型参数既可以是标签名字符串（像是 '`div`' 或 '`span`'），也可以是 React 组件 类型 （ `class` 组件或函数组件），或是 `React fragment` 类型。

```js
const Text = React.createFactory(()=><div>hello,world</div>) 
function Index(){  
    return <div style={{ marginTop:'50px'  }} >
        <Text/>
    </div>
}
```

但是会有警告，表示这个`api`将要被废弃，如果想要达到同样的效果，可以用`React.createElement`。

## createRef

`createRef`可以创建一个 `ref` 元素，附加在`react`元素上。

```js
class Index extends React.Component{
    constructor(props){
        super(props)
        this.node = React.createRef()
    }
    componentDidMount(){
        console.log(this.node)
    }
    render(){
        return <div ref={this.node} > my name is alien </div>
    }
}
```

个人觉得`createRef`这个方法，很鸡肋，我们完全可以`class`类组件中这么写，来捕获`ref`。

```js
class Index extends React.Component{
    node = null
    componentDidMount(){
        console.log(this.node)
    }
    render(){
        return <div ref={(node)=> this.node } > my name is alien </div>
    }
}
```

或者在`function`组件中这么写：

```js
function Index(){
    const node = React.useRef(null)
    useEffect(()=>{
        console.log(node.current)
    },[])
    return <div ref={node} >  my name is alien </div>
}
```

## isValidElement

这个方法可以用来检测是否为`react element`元素,接受待验证对象，返回`true`或者`false`。这个api可能对于业务组件的开发，作用不大，因为对于组件内部状态，都是已知的，我们根本就不需要去验证，是否是`react element` 元素。 但是，对于一起公共组件或是开源库，`isValidElement`就很有作用了。

## Children.map

`React.Children` 提供了用于处理 `this.props.children` 不透明数据结构的实用方法。

我们先看一下透明的结构：

```js
class Text extends React.Component{
    render(){
        return <div>hello,world</div>
    }
}
function WarpComponent(props){
    console.log(props.children)
    return props.children
}
function Index(){
    return <div style={{ marginTop:'50px' }} >
        <WarpComponent>
            <Text/>
            <Text/>
            <Text/>
            <span>hello,world</span>
        </WarpComponent>
    </div>
}
```

我们修改一下 Index 组件：

```js
function Index(){
    return <div style={{ marginTop:'50px' }} >
        <WarpComponent>
            { new Array(3).fill(0).map(()=><Text/>) }
            <span>hello,world</span>
        </WarpComponent>
    </div>
}
```

这个数据结构，我们不能正常的遍历了，即使遍历也不能遍历，每一个子元素。此时就需要 `react.Chidren` 来帮忙了。

```js
function WarpComponent(props){
    const newChildren = React.Children.map(props.children,(item)=>item)
    console.log(newChildren)
    return newChildren
} 
```

此时就能正常遍历了，达到了预期效果。

如果 `children` 是一个 `Fragment` 对象，它将被视为单一子节点的情况处理，而不会被遍历。

## Children.forEach

`Children.forEach`和`Children.map` 用法类似，`Children.map`可以返回新的数组，`Children.forEach`仅停留在遍历阶段。

```js
function WarpComponent(props){
    React.Children.forEach(props.children,(item)=>console.log(item))
    return props.children
}   
```

## Children.count

`children` 中的组件总数量，等同于通过 `map` 或 `forEach` 调用回调函数的次数。对于更复杂的结果，`Children.count`可以返回同一级别子组件的数量。

```js
function WarpComponent(props){
    const childrenCount =  React.Children.count(props.children)
    console.log(childrenCount,'childrenCount')
    return props.children
}   
function Index(){
    return <div style={{ marginTop:'50px' }} >
        <WarpComponent>
            { new Array(3).fill(0).map((item,index) => new Array(2).fill(1).map((item,index1)=><Text key={index+index1} />)) }
            <span>hello,world</span>
        </WarpComponent>
    </div>
}
```

## Children.toArray

`Children.toArray`返回，`props.children`扁平化后结果。

```js
function WarpComponent(props){
    const newChidrenArray =  React.Children.toArray(props.children)
    console.log(newChidrenArray,'newChidrenArray')
    return newChidrenArray
}   
function Index(){
    return <div style={{ marginTop:'50px' }} >
        <WarpComponent>
            { new Array(3).fill(0).map((item,index)=>new Array(2).fill(1).map((item,index1)=><Text key={index+index1} />)) }
            <span>hello,world</span>
        </WarpComponent>
    </div>
}
```

**newChidrenArray** ,就是扁平化的数组结构。`React.Children.toArray()` 在拉平展开子节点列表时，更改 `key` 值以保留嵌套数组的语义。也就是说， `toArray` 会为返回数组中的每个 `key` 添加前缀，以使得每个元素 `key` 的范围都限定在此函数入参数组的对象内。

## Children.only

验证 `children` 是否只有一个子节点（一个 `React` 元素），如果有则返回它，否则此方法会抛出错误。

```js
function WarpComponent(props){
    console.log(React.Children.only(props.children))
    return props.children
}   
function Index(){
    return <div style={{ marginTop:'50px' }} >
        <WarpComponent>
            { new Array(3).fill(0).map((item,index)=><Text key={index} />) }
            <span>hello,world</span>
        </WarpComponent>
    </div>
}

```

报错。