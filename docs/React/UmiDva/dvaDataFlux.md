#  umi 与dva结合解析

Umi.js

封装了编译步骤，包括了很多开发时的有用工具。只要你写好 React 代码，接下来 umi 就会把它处理为生产代码。
配置文件被约定为config/config.js。也可以使用 .umirc.js 来作为配置文件。它和 config/config.js是二选一的。 src 目录，它用来存放项目的除了配置以及单测以外的主要代码。
约定的存放页面代码的文件夹是 pages。在配置项中添加 singular 为 true 可以让 page 变为约定的文件夹。
在 umi 中，你可以使用约定式的路由，在 page 下面的 JS 文件都会按照文件名映射到一个路由。
除了约定式的路由，你也可以使用配置式的路由。其中 component 是一个字符串，它是相对于page 目录的相对路径。
当有了 routes 的配置之后 umi 就不会再执行约定式对应的路由逻辑了。

dva.js

DVA 是基于 redux、redux-saga 和 react-router 的轻量级前端框架及最佳实践沉淀。

model
软件架构的分层

服务端

Controller 层负责与用户直接打交道，渲染页面、提供接口等，侧重于展示型逻辑。
Service 层负责处理业务逻辑，供 Controller 层调用。
Data Access 层顾名思义，负责与数据源对接，进行纯粹的数据读写，供 Service 层调用。
前端：

Page 负责与用户直接打交道：渲染页面、接受用户的操作输入，侧重于展示型交互性逻辑。
Model 负责处理业务逻辑，为 Page 做数据、状态的读写、变换、暂存等。
Service 负责与 HTTP 接口对接，进行纯粹的数据读写。
dva的model对象。

```js
app.model({
  namespace: "todoList",

  state: [],

  effects: {
    *query({ _ }, { put, call }) {
      const rsp = yield call(queryTodoListFromServer);
      const todoList = rsp.data;
      yield put({ type: "save", payload: todoList });
    }
  },

  reducers: {
    save(state, { payload: todoList }) {
      return [...state, todoList];
    }
  }
});
```

1. namespace：model 的命名空间，只能用字符串。一个大型应用可能包含多个 model，通过namespace区分。

2. state：当前 model 状态的初始值，表示当前状态。

3. reducers：用于处理同步操作，可以修改 state，由 action 触发。reducer 是一个纯函数，它接受当前的 state 及一个 action 对象。action 对象里面可以包含数据体（payload）作为入参，需要返回一个新的 state。

4. effects：用于处理异步操作（例如：与服务端交互）和业务逻辑，也是由 action 触发。但是，它不可以修改 state，要通过触发 action 调用 reducer 实现对 state 的间接操作。

5. action：是 reducers 及 effects 的触发器，一般是一个对象，形如{ type: ‘add’, payload: todo }，通过 type 属性可以匹配到具体某个 reducer 或者 effect，payload 属性则是数据体，用于传送给 reducer 或 effect。


> dva 的作用

通过把状态上提到 dva model 中，我们把数据逻辑从页面中抽离出来。通过 effect 优雅地处理数据生成过程中的副作用，副作用中最常见的就是异步逻辑。 dva model 中的数据可以注入给任意组件。
   另外，dva 允许把数据逻辑再拆分（「页面」常常就是分隔的标志），以 namespace 区分。当你觉得有必要时，不同的 namespace 之间的 state 是可以互相访问的。

如果你熟悉 React 中最基本的两个概念 props 和 state，一定知道 props 和 state。
   对于一个组件来讲都是数据的来源，而 state 又可以通过 props 传递给子组件，这像是一个鸡生蛋蛋生鸡的问题：到底谁是数据的源头？答案是 state，而且是广义的state：它可以是 react 组件树中各级组件的 state，也可以是 react 组件树外部由其他 js 数据结构表示的 state，而 dva 管理的就是 react 组件树之外的 state: Redux。归根结底，props 是用来传导数据的，而 state 是数据改变的源泉。

如果你已经对 React 开发比较熟悉，就会知道子组件的 state 可以上提 (state hoisting)，由父组件来管理：

子组件间接回调到父组件的 setState 的方法来改变父组件的 state；
新的 state 通过 props 的形式把再次被子组件获悉。
而 dva 可以帮助我们把 state 上提到 所有 React 组件之上，过程是相似的：

页面通过调用 dispatch 函数来驱动 dva model state 的改变；
改变后的 dva model state 通过 connect 方法注入页面。
所谓「注入」从本质上是 控制反转 的一种实现，这种思想在许多的语言框架中都有体现，最著名的莫过于基于 Java 语言的 Spring。组件不再负责管理数据，组件只是通过 connect 向 dva 声明所需数据。

>  connect

connect 让组件获取到两样东西：
model 中的数据；
驱动 model 改变的方法。
connect 本质上只是一个 javascript 函数，通过 @ 装饰器语法使用，放置在组件定义的上方；

connect 既然是函数，就可以接受入参，第一个入参是最常用的，它需要是一个函数，我们习惯给它命名叫做 mapStateToProps，顾名思义就是把 dva model 中的 state 通过组件的 props 注入给组件。通过实现这个函数，我们就能实现把 dva model 的 state 注入给组件。

#  基础框架概念先知道

- React
   前端三大框架之一。
- Dva
   由阿里架构师 sorrycc 带领 team 完成的一套前端框架，在作者的 github 里是这么描述它的：”dva 是 react 和 redux 的最佳实践”。
- Antd
   是阿里的一套开箱即用的中台前端/设计解决方案，UI框架。
- Umi
   一套可插拔的企业级 react 应用框架，同样由dva作者 sorrycc 完成。他在Umi中引入了 -  UI 工具 antd，打包工具 roadhog，路由 react-router和状态管理器 dva，做到了可插拔机制。

##  Dva 初实践

一般来说，可以分为主要的三个部分，models、services 和 views。其中，views负责页面上的展示，这个不做赘述；services里面主要写一些请求后台接口的方法；models是其中最重要的概念，这里存放了各种数据，并对数据进行相应的交互。

##  view层



```jsx
import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { connect } from 'dva/index';

@Form.create()
class View extends Component {
  render() {
    return(
      <div>
        <Form>
          <FormItem label="commitMessage" {...formItemLayout}>
            {getFieldDecorator('commitMessage', {
              rules: [{ type: 'string' }]
            })(<Input />)}
          </FormItem>
        </Form>
      </div>
        );
    }
}

const mapStateToProps = state => {
  const { 
    checkBranches
  } = state.projects;
  return {
    checkBranches
  };
};
export default connect(mapStateToProps)(View);
```

View层负责页面的展示问题，如React写法一致，最后通过connect方法应用model层的数据。

##  Service层



```jsx
import request from '@src/utils/request';

export function checkBranches({ id }) {
  return request(`/projects/${id}/branches`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  });
}
```

Service层主要负责存放请求后台接口的方法。这里的request封装了fetch函数，返回的是一个promise对象。request中传入两个参数，第一个是url是请求地址，第二个options是请求的参数，看情况传入，比如说这里传入了method和headers。

##  Model层



```tsx
import * as services from '@services/index';

export default {
  namespace: '',
  state: {},
  reducers: {},
  effects: {}.
  subscriptions: {}
```

model里面包括以下五部分：namespace、state、reducers、effects、subscriptions，缺一不可。注意，这里也需要从service层导入相应的方法。

- namespace 命名空间



```tsx
namespace: 'projects'
```

- state 相当于原生React中的state状态，用于存放数据的初始值。



```css
state: {
    projectsData: []
}
```

- reducers 用于存放能够改变view的action，这里按照官方说明，不应该做数据的处理，只是用来return state，从而改变view层的展示。



```kotlin
reducers: {
    getProjectAllData(state, action) {
        return { ...state, ...action.payload };
    },
}
```

- effects 用于和后台交互，是处理异步数据逻辑的地方。



```csharp
effects: {
    *getAllProjects({ payload = {} }, { call, put }) {
        try {
            const res = yield call(projectsService.checkBranches, payload);
            yield put({
                type: 'getProjectData',
                payload: {
                    projectsData: res.data
                }
            });
        } catch (e) {
            message.warning(e.message);
        }
    },
}
```

- subscriptions 订阅监听，比如监听路由，进入页面如何如何，就可以在这里处理。相当于原生React中的componentWillMount方法。就比如上述代码，监听/project路由，进入该路由页面后，将发起getAllProjects aciton，获取页面数据。



```tsx
subscriptions: {
    setup({ dispatch, history }) {
        return history.listen(({ pathname }) => {
            if (pathname === '/projects') {
                dispatch({
                    type: 'getAllProjects'
                });
            }
        });
    }
}
```

##  Dva 数据流向

总的来说如下：View层操作 –> 触发models层effect中方法 –> 触发service层请求，获取后台数据 –> 触发model层处理相应数据的方法，存储至reducer中 –> 更新model层中state –> 触发view层的render方法进行重新渲染 –> 页面更新

