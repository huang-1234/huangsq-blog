/* import {Component} from 'react'

export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  return function wrapWithConnect(WrappedComponent) {
    class Connect extends Component {
      constructor(props, context) {
        // 从祖先Component处获得store
        this.store = props.store || context.store
        this.stateProps = computeStateProps(this.store, props)
        this.dispatchProps = computeDispatchProps(this.store, props)
        this.state = { storeState: null }
        // 对stateProps、dispatchProps、parentProps进行合并
        this.updateState()
      }
      shouldComponentUpdate(nextProps, nextState) {
        // 进行判断，当数据发生改变时，Component重新渲染
        if (propsChanged || mapStateProducedChange || dispatchPropsChanged) {
          this.updateState(nextProps)
          return true
        }
      }
      componentDidMount() {
        // 改变Component的state
        this.store.subscribe(() = {
          this.setState({
            storeState: this.storegetState.()
          })
        })
      }
      render() {
        // 生成包裹组件Connect
        return (
          <WrappedComponent {...this.nextState} />
        )
      }
    }
    Connect.contextTypes = {
      store: storeShape
    }
    return Connect;
  }
} */