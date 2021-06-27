# useHook

## useState

`useState`可以弥补函数组件没有`state`的缺陷。`useState`可以接受一个初识值，也可以是一个函数`action`，`action`返回值作为新的`state`。返回一个数组，第一个值为`state`读取值，第二个值为改变`state`的`dispatchAction`函数。

```js
const DemoState = (props) => {
  /* number为此时state读取值 ，setNumber为派发更新的函数 */
  let [number, setNumber] = useState(0); /* 0为初始值 */
  return (
    <div>
      <span>{number}</span>
      <button
        onClick={() => {
          setNumber(number + 1); /* 写法一 */
          setNumber((number) => number + 1); /* 写法二 */
          console.log(number); /* 这里的number是不能够即时改变的  */
        }}
      >
        num++
      </button>
    </div>
  );
};
```

## useEffect

`useEffect`可以弥补函数组件没有生命周期的缺点。我们可以在`useEffect`第一个参数回调函数中，做一些请求数据，事件监听等操作，第二个参数作为`dep`依赖项，当依赖项发生变化，重新执行第一个函数。

**useEffect 可以用作事件监听，还有一些基于`dom`的操作**,别忘了在`useEffect`第一个参数回调函数，返一个函数用于清除事件监听等操作。

```js
const DemoEffect = ({ a }) => {
  /* 模拟事件监听处理函数 */
  const handleResize = () => {};
  useEffect(() => {
    /* 定时器 延时器等 */
    const timer = setInterval(() => console.log(666), 1000);
    /* 事件监听 */
    window.addEventListener("resize", handleResize);
    /* 此函数用于清除副作用 */
    return function() {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [a]);
  return <div></div>;
};
```

## useMemo

`useMemo`接受两个参数，第一个参数是一个函数，返回值用于产生**保存值**。 第二个参数是一个数组，作为`dep`依赖项，数组里面的依赖项发生变化，重新执行第一个函数，产生**新的值**。

应用场景：

**1 缓存一些值，避免重新执行上下文**

```js
const number = useMemo(() => {
  /** ....大量的逻辑运算 **/
  return number;
}, [props.number]); // 只有 props.number 改变的时候，重新计算number的值。
```

**2 减少不必要的`dom`循环**

```js
/* 用 useMemo包裹的list可以限定当且仅当list改变的时候才更新此list，这样就可以避免selectList重新循环 */
{
  useMemo(
    () => (
      <div>
        {selectList.map((i, v) => (
          <span className={style.listSpan} key={v}>
            {i.patentName}
          </span>
        ))}
      </div>
    ),
    [selectList]
  );
}
```

**3 减少子组件渲染**

```js
/* 只有当props中，list列表改变的时候，子组件才渲染 */
const goodListChild = useMemo(() => <GoodList list={props.list} />, [
  props.list,
]);
```

## useCallback

`useMemo` 和 `useCallback` 接收的参数都是一样，都是在其依赖项发生变化后才执行，都是返回缓存的值，区别在于 `useMemo` 返回的是函数运行的结果， `useCallback` 返回的是函数。 返回的`callback`可以作为`props`回调函数传递给子组件。

```js
/* 用react.memo */
const DemoChildren = React.memo((props) => {
  /* 只有初始化的时候打印了 子组件更新 */
  console.log("子组件更新");
  useEffect(() => {
    props.getInfo("子组件");
  }, []);
  return <div>子组件</div>;
});
const DemoUseCallback = ({ id }) => {
  const [number, setNumber] = useState(1);
  /* 此时usecallback的第一参数 (sonName)=>{ console.log(sonName) } 经过处理赋值给 getInfo */
  const getInfo = useCallback(
    (sonName) => {
      console.log(sonName);
    },
    [id]
  );
  return (
    <div>
      {/* 点击按钮触发父组件更新 ，但是子组件没有更新 */}
      <button onClick={() => setNumber(number + 1)}>增加</button>
      <DemoChildren getInfo={getInfo} />
    </div>
  );
};
```

## useRef

`useRef`的作用：

- 是可以用来获取`dom`元素，或者`class`组件实例 。
- 创建`useRef`时候，会创建一个原始对象，只要函数组件不被销毁，原始对象就会一直存在，那么我们可以利用这个特性，来通过`useRef`保存一些数据。

```js
const DemoUseRef = () => {
  const dom = useRef(null);
  const handerSubmit = () => {
    /*  <div >表单组件</div>  dom 节点 */
    console.log(dom.current);
  };
  return (
    <div>
      {/* ref 标记当前dom节点 */}
      <div ref={dom}>表单组件</div>
      <button onClick={() => handerSubmit()}>提交</button>
    </div>
  );
};
```

## useLayoutEffect

**`useEffect`执行顺序:** 组件更新挂载完成 -> 浏览器 `dom` 绘制完成 -> 执行 `useEffect` 回调。 **`useLayoutEffect` 执行顺序:** 组件更新挂载完成 -> 执行 `useLayoutEffect` 回调-> 浏览器`dom`绘制完成。

所以说 `useLayoutEffect` 代码可能会阻塞浏览器的绘制 。我们写的 `effect`和 `useLayoutEffect`，`react`在底层会被分别打上`PassiveEffect`，`HookLayout`，在`commit`阶段区分出，在什么时机执行。

```js
const DemoUseLayoutEffect = () => {
  const target = useRef();
  useLayoutEffect(() => {
    /*我们需要在dom绘制之前，移动dom到制定位置*/
    const { x, y } = getPositon(); /* 获取要移动的 x,y坐标 */
    animate(target.current, { x, y });
  }, []);
  return (
    <div>
      <span ref={target} className="animate"></span>
    </div>
  );
};
```

## useReducer

`useState`底层就是一个简单版的`useReducer`

`useReducer` 接受的第一个参数是一个函数，我们可以认为它就是一个 `reducer` , `reducer` 的参数就是常规 `reducer` 里面的 `state` 和 `action` ,返回改变后的 `state` , `useReducer` 第二个参数为 `state` 的初始值，返回一个数组，数组的第一项就是更新之后 `state` 的值 ，第二个参数是派发更新的 `dispatch` 函数。

```js
const DemoUseReducer = () => {
  /* number为更新后的state值,  dispatchNumbner 为当前的派发函数 */
  const [number, dispatchNumbner] = useReducer((state, action) => {
    const { payload, name } = action;
    /* return的值为新的state */
    switch (name) {
      case "add":
        return state + 1;
      case "sub":
        return state - 1;
      case "reset":
        return payload;
    }
    return state;
  }, 0);
  return (
    <div>
      当前值：{number}
      {/* 派发更新 */}
      <button onClick={() => dispatchNumbner({ name: "add" })}>增加</button>
      <button onClick={() => dispatchNumbner({ name: "sub" })}>减少</button>
      <button onClick={() => dispatchNumbner({ name: "reset", payload: 666 })}>
        赋值
      </button>
      {/* 把dispatch 和 state 传递给子组件  */}
      <MyChildren dispatch={dispatchNumbner} State={{ number }} />
    </div>
  );
};
```

## useContext

我们可以使用 `useContext` ，来获取父级组件传递过来的 `context` 值，这个当前值就是最近的父级组件 `Provider` 设置的 `value` `值，useContext` 参数一般是由 `createContext` 方式引入 ,也可以父级上下文 `context` 传递 ( 参数为 `context` )。`useContext` 可以代替 `context.Consumer` 来获取 `Provider` 中保存的 `value` 值

```js
/* 用useContext方式 */
const DemoContext = () => {
  const value = useContext(Context);
  /* my name is alien */
  return <div> my name is {value.name}</div>;
};
/* 用Context.Consumer 方式 */
const DemoContext1 = () => {
  return (
    <Context.Consumer>
      {/*  my name is alien  */}
      {(value) => <div> my name is {value.name}</div>}
    </Context.Consumer>
  );
};

export default () => {
  return (
    <div>
      <Context.Provider value={{ name: "alien", age: 18 }}>
        <DemoContext />
        <DemoContext1 />
      </Context.Provider>
    </div>
  );
};
```

## useImperativeHandle

`useImperativeHandle` 可以配合 `forwardRef`自定义暴露给父组件的实例值。这个很有用，我们知道，对于子组件，如果是`class`类组件，我们可以通过`ref`获取类组件的实例，但是在子组件是函数组件的情况，如果我们不能直接通过`ref`的，那么此时`useImperativeHandle`和 `forwardRef`配合就能达到效果。

`useImperativeHandle`接受三个参数：

- 第一个参数 `ref`: 接受 `forWardRef` 传递过来的 `ref`。
- 第二个参数 `createHandle`:处理函数，返回值作为暴露给父组件的`ref`对象。
- 第三个参数 `deps`:依赖项 `deps`，依赖项更改形成新的`ref`对象。

下面举个例子，**用`useImperativeHandle`，使得父组件能让子组件中的`input`自动赋值并聚焦**。

```js
function Son(props, ref) {
  console.log(props);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  useImperativeHandle(
    ref,
    () => {
      const handleRefs = {
        /* 声明方法用于聚焦input框 */
        onFocus() {
          inputRef.current.focus();
        },
        /* 声明方法用于改变input的值 */
        onChangeValue(value) {
          setInputValue(value);
        },
      };
      return handleRefs;
    },
    []
  );
  return (
    <div>
      <input placeholder="请输入内容" ref={inputRef} value={inputValue} />
    </div>
  );
}

const ForwarSon = forwardRef(Son);

class Index extends React.Component {
  cur = null;
  handerClick() {
    const { onFocus, onChangeValue } = this.cur;
    onFocus();
    onChangeValue("let us learn React!");
  }
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <ForwarSon ref={(cur) => (this.cur = cur)} />
        <button onClick={this.handerClick.bind(this)}>操控子组件</button>
      </div>
    );
  }
}
```

## useDebugValue

useDebugValue`可用于在`React`开发者工具中显示自定义`hook`的标签。这个`hooks`目的就是检查自定义`hooks。

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  // ...
  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? "Online" : "Offline");

  return isOnline;
}
```

## useTransition

`useTransition`允许延时由`state`改变而带来的视图渲染。避免不必要的渲染。它还允许组件将速度较慢的数据获取更新推迟到随后渲染，以便能够立即渲染更重要的更新。

```js
const TIMEOUT_MS = { timeoutMs: 2000 };
const [startTransition, isPending] = useTransition(TIMEOUT_MS);
```

- `useTransition` 接受一个对象， `timeoutMs`代码需要延时的时间。
- 返回一个数组。**第一个参数：** 是一个接受回调的函数。我们用它来告诉 `React` 需要推迟的 `state` 。 **第二个参数：** 一个布尔值。表示是否正在等待，过度状态的完成(延时`state`的更新)。

下面引入一个官方的例子：

```js
const SUSPENSE_CONFIG = { timeoutMs: 2000 };

function App() {
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);
  return (
    <>
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            const nextUserId = getNextId(resource.userId);
            setResource(fetchProfileData(nextUserId));
          });
        }}
      >
        Next
      </button>
      {isPending ? " 加载中..." : null}
      <Suspense fallback={<Spinner />}>
        <ProfilePage resource={resource} />
      </Suspense>
    </>
  );
}
```

在这段代码中，我们使用 `startTransition` 包装了我们的数据获取。这使我们可以立即开始获取用户资料的数据，同时推迟下一个用户资料页面以及其关联的 `Spinner` 的渲染 2 秒钟（ `timeoutMs` 中显示的时间）。

## useMyselfHooks

### 自定义Hook

自定义Hook是一个函数，其名称约定以use开头，以便可以看出这是一个Hooks方法。如果某函数的名称以use开头，并且调用了其他Hooks，就称其为一个自定义Hook。自定义Hook就像普通函数一样，可以定义任意的入参与出参，唯一要注意的是自定义Hook需要遵循Hooks的基本准则，如不能在条件循环中使用、不能在普通函数中使用。

自定义Hook解决了之前React组件中的共享逻辑问题。通过自定义Hook，可将如表单处理、动画、声明订阅等逻辑抽象到函数中。自定义Hook是重用逻辑的一种方式，不受内部调用情况的约束。事实上，每次调用Hooks都会有一个完全隔离的状态。因此，可以在一个组件中使用两次相同的自定义Hook。下面是两个常用自定义Hook的示例：

```js
// 获取forceUpdate函数的自定义Hook
export default function useForceUpdate() {
    const [, dispatch] = useState(Object.create(null));
    const memoizedDispatch = useCallback(() => {
        // 引用变化
        dispatch(Object.create(null));
    }, [dispatch]);
    return memoizedDispatch;
}
```

获取某个变量上一次渲染的值：

```js
// 获取上一次渲染的值
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}
```

可基于基础的React Hooks定义许多自定义Hook，如useLocalStorage、useLocation、useHistory （将在第5章中进行介绍）等。将逻辑抽象到自定义Hook中后，代码将更具有可维护性。