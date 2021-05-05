## 1 前言

网页性能最大的限制因素是浏览器重绘(reflow)和重排版(repaint)，React的虚拟DOM就是为了尽可能减少浏览器的重绘和重排版，从React的渲染过程看，避免不必要的渲染可以进一步提高性能。

## 2 PureRender

React优化方法中最常见的就是PureRender，PureRender的原理是重新实现shouldComponentUpdate生命周期方法，让当前传入的state和props和之前的做**浅比较**，如果返回FALSE，组件就不执行render方法，默认情况返回TRUE。react-addons-pure-render-mixin插件允许我们在ES6 的classes语法中使用PureRender：

```
        import React,{component} from ‘react’;
        import PureRenderMixin from ‘react-addons-pure-render-mixin’;
        
        class App extends Component{
            constructor(props){
                super(props);
                //!!!
                this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
            }
        render(){
            return <div calssName = {this.props.className}>foo</div>;
            }
        }
```

## 3 Immutable Data

在传递数据时，可以通过Immutable Data进一步提升组件的渲染性能，Immutable Data是针对可变对象和不可变对象所做的折衷。**可变对象**是指多个变量引用一个对象，这导致对象的time和value耦合，对象一旦改变无法重塑；**不可变对象**是指每次用到一个对象就进行深复制，这导致内存浪费；**Immutable Data**实现的原理基于持久化数据结构，也就是使用旧数据创建新数据时，旧数据依旧保存，而且为了避免深度复制，Immutable Data使用结构共享，也就是说，如果对象树中的一个节点变化，只修改这个节点和受他影响的父节点，其他节点依旧共享。Immutable Data优点体现在降低了可变数据带来的时间和值的耦合；节省了内存，可以实现数据的时间旅行，也就是说数据可以重塑。

使用Immutable Data可以直接采用Facebook开发的immutable.js库，该库具有完善API，并且和原生JavaScript对象对应。Immutable Data可以和PureRender结合使用，前面提到，PureRender通过浅比较确定shouldComponentUpdate的返回值，但是浅比较可以覆盖的场景不多，深比较成本昂贵。而Immutable.js提供了高效判断数据是否改变的方法，只需要全等算符(===)和自带的is()方法就可以知道是否执行render方法，这个操作几乎是零成本的，所以可以极大地提高性能。使用immutable data之后，仅仅改变状态了的组件及其父组件被重新渲染。

```jsx
import React, { commponent } from 'react';
import { is } from 'immutable';

class App extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
      return true;
    }
    for (const keys in nextProps) {
      // !==判断原生对象，is判断immutable对象
      if (thisProps[key] !== nextProps[key] ||
        !is(thisProps[key], nextProps[key]))
        return true;
    }
    for (const key in nextState) {
      if (thisState[key] !== nextState[key] ||
        !is(thisState[key], nextState[key])
      ){
        return true;
      }
    }
  }
}
```

问题：Immutable Data可以和PureRender结合使用是简单的作用叠加吗？优先级哪个更高呢？这种作用叠加有没有性能损耗呢？我当前的理解是，react-addons-pure-render-mixin插件引的PureRender有缺陷，因为浅复制有时会导致比较失误，immutable.js仅仅是弥补了这一问题，反而增加了代码量，那为什么不干脆将PureRender去掉，只用immutable.js呢？