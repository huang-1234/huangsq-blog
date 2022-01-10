# dva 基本用法

> example

```ts
  

import { EActiveKey } from '../common';

import Service, { apiCategoryPortrait, localCategoryPortrait } from '../services'

  

import { getHeaderMsgFromData, getRankingDataByTab, getRankingFromData } from './tools';

  

export default {

namespace: 'catePort',

state: {

loading: false,

activeKey: EActiveKey.Shop,

headerMsg: {

comp: {

title: '竞对数据',

first_online_time:'',

shop_num: 12345,

shop_have_sales_num: 12345,

item_online_num: 12345,

item_have_sales_num: 12345,

},

dy: {

title: '站内数据',

first_online_time: '',

shop_num: 12345,

shop_have_sales_num: 12345,

item_online_num: 12345,

item_have_sales_num: 12345,

}

},

rankingData: {

shop: {

compTitle: '竞对商家TOP 50',

comp: [],

dyTitle: '站内商家TOP 50',

dy: [],

},

goods: {

compTitle: '竞对商品TOP 50',

comp: [],

dyTitle: '站内商品TOP 50',

dy: [],

}

},

currentRanking: {

compTitle: '竞对商家TOP 50',

comp: [],

dyTitle: '站内商家TOP 50',

dy: [],

}

},

  

reducers: {

updateActivityKey(state, { payload }) {

return {

...state,

activeKey: payload,

}

},

resolved(state, { payload }: { payload }){

return {

...state,

...payload

}

},

setHeaderMsg(state, { payload }) {

return {

...state,

...payload,

}

},

setRankingData(state, { payload }) {

return {

...state,

...payload,

}

},

updateRanking(state, { payload }) {

const { activeKey } = payload;

return {

...state,

currentRanking: getRankingDataByTab(activeKey, state.rankingData),

activeKey,

}

}

},

  

effects: {

*requestCategory(action: { params: any; }, { put, select }: any) {

yield put({

type: 'setData',

payload: {

loading: true,

competitionData: {},

dyData: {},

headerMsg: {},

rankingData: {},

}

});

// const { data } = yield Service.categoryMsg({...action.params});

// const { data } = yield Service.apiCategoryMsg({...action.params});

const { data } = yield localCategoryPortrait({...action.params});

const { competition_data, dy_data } = data;

// console.log('getHeaderMsgFromData', getHeaderMsgFromData(competition_data, dy_data));

// console.log('getRankingFromData', getRankingFromData(competition_data, dy_data));

yield put({

type: 'resolved',

payload: {

loading: false,

}

})

yield put({

type: 'setHeaderMsg',

payload: {

headerMsg: getHeaderMsgFromData(competition_data, dy_data),

}

});

yield put({

type: 'setRankingData',

payload: {

rankingData: getRankingFromData(competition_data, dy_data),

}

});

const currentRanking = select((state: any) => state.catePort.currentRanking)

yield put({

type: 'updateRanking',

payload: {

currentRanking,

}

})

}

},

}

  

/**

* 保存 catePort 静态字符串的对象

*/

interface ICatePortAction {

spaceName: string;

effects: {

requestCategory: string;

};

reducers: {

updateActivityKey: string;

setData: string;

setHeaderMsg: string;

setRankingData: string;

updateRanking: string;

}

}

export const catePort: ICatePortAction = {

spaceName: 'catePort',

effects: {

requestCategory: 'catePort/requestCategory'

},

reducers: {

updateActivityKey: 'catePort/updateActivityKey',

setData: 'catePort/setData',

setHeaderMsg: 'catePort/setHeaderMsg',

setRankingData: 'catePort/setRankingData',

updateRanking: 'catePort/updateRanking',

}

}

```

## dvajs学习笔记- effects API
> 最近在学习dva,但发现官方文档有点滞后，所以自己记录下笔记，如有笔误或者理解不当的地方，还请指正😊

dva是一个基于 redux 和 redux-saga 的数据流方案，其中effects是Action 处理器，处理异步动作，基于 Redux-saga 实现。Effect 指的是副作用。根据函数式编程，计算以外的操作都属于 Effect，典型的就是 I/O 操作、数据库读写

**在本model中调用action是不用加namespace，如果加上甚至会抛出警告，跨model调用才要加上namespace区分**

-   call `阻塞` 用于调用异步逻辑，支持 promise
    
    ```
    const result = yield call(fetch, payload);
    复制代码
    ```
    
-   put `不阻塞` 用于触发 action,一般来触发reducer改变state
    
    ```
    yield put({ type: 'todos/add', payload: 'Learn Dva' });
    复制代码
    ```
    
-   put.resolve `阻塞` 功能与put一样，区别是put.resolve是阻塞的，执行完才进行下一步
    
-   select `不阻塞` 用于从 state 里获取数据
    
    ```
    const { args } = yield select(state => state[namespace]);
    复制代码
    ```
    
-   take `阻塞` dva封装了take，可以监听action的开始和结束阶段，take会阻塞到监听的事件触发，才执行下一步
    
    ```
    it('take', done => {
    const app = create();
    app.model({
      namespace: 'count',
      state: 0,
      reducers: {
        add(state, { payload }) {
          return state + payload || 1;
        },
      },
      effects: {
        *addDelay({ payload }, { put, call }) {
          yield call(delay, payload.delay || 100);
          yield put({ type: 'add', payload: payload.amount });
        },
        *test(action, { put, select, take }) {
          yield put({ type: 'addDelay', payload: { amount: 2 } });
          // @@start 是监听put操作的第一步，即payload与state还没合并，这时state为0
          //yield take('addDelay/@@start');
          //@@end 是监听put操作的最后一步，即将payload与state合并，返回新的state，这时state为2
          yield take('addDelay/@@end');
          const count = yield select(state => state.count);
          yield put({ type: 'addDelay', payload: { amount: count, delay: 0 } });
        },
      },
    });
    app.start();
    app._store.dispatch({ type: 'count/test' });
    setTimeout(() => {
      expect(app._store.getState().count).toEqual(4);
      done();
    }, 300);
    });
    复制代码
    ```
    
    可以监听action数组，满足一个即可
    
    ```
    it('take with array of actions', () => {
    const app = create();
    let takenCount = 0;
    app.model({
      namespace: 'count',
      state: null,
      reducers: {
        addRequest() {
          return 1;
        },
        addFailure() {
          return -1;
        },
        addSuccess() {
          return 0;
        },
      },
      effects: {
        *add(action, { put }) {
          yield put({ type: 'addRequest' });
          if (action.amount > 0.5) {
            yield put({ type: 'addSuccess' });
          } else {
            yield put({ type: 'addFailure' });
          }
        },
        *test(action, { put, take }) {
          yield put({ type: 'add', amount: action.amount });
          yield take(['addSuccess', 'addFailure']);
          takenCount += 1;
        },
      },
    });
    app.start();
    app._store.dispatch({ type: 'count/test', amount: 0 });
    expect(app._store.getState().count).toEqual(-1);
    app._store.dispatch({ type: 'count/test', amount: 1 });
    expect(app._store.getState().count).toEqual(0);
    expect(takenCount).toEqual(2);
    });
    复制代码
    ```
    
    可以监听其他model的action，必须要加对应的namespace
    
-   takeLatest `不阻塞` 使用 takeLatest 来启动一个新的 action。 由于 takeLatest 取消了所有之前启动且未完成的任务，即使用户以极快的速度连续多次触发 action，我们都只会以最后的一个结束。
    
    ```
    it('type: takeLatest', done => {
    const app = create();
    app.model({
      namespace: 'count',
      state: 0,
      reducers: {
        add(state, { payload }) {
          return state + payload || 1;
        },
      },
      effects: {
        addDelay: [
          function*({ payload }, { call, put }) {
            yield call(delay, 100);
            yield put({ type: 'add', payload });
          },
          { type: 'takeLatest' }
        ],
      },
    });
    app.start();
    
    // Only catch the last one.
    app._store.dispatch({ type: 'count/addDelay', payload: 2 });
    app._store.dispatch({ type: 'count/addDelay', payload: 3 });
    
    setTimeout(() => {
      expect(app._store.getState().count).toEqual(3);
      done();
    }, 200);
    });
    复制代码
    ```
    
-   throttle `不阻塞` 它在派生一次任务之后，仍然将新传入的 action 接收到底层的 buffer 中，至多保留（最近的）一个。但与此同时，它在 ms 毫秒内将暂停派生新的任务 —— 这也就是它被命名为节流阀（throttle）的原因。其用途，是在处理任务时，无视给定的时长内新传入的 action。
    
    ```
    it('type: throttle', done => {
    const app = create();
    app.model({
     namespace: 'count',
     state: 0,
     reducers: {
       add(state, { payload }) {
         return state + payload || 1;
       },
     },
     effects: {
       addDelay: [
         function*({ payload }, { call, put }) {
           yield call(delay, 100);
           yield put({ type: 'add', payload });
         },
         { type: 'throttle', ms: 100 }, // ms必须存在
       ],
     },
    });
    app.start();
    
    // Only catch the last one.
    app._store.dispatch({ type: 'count/addDelay', payload: 2 });
    app._store.dispatch({ type: 'count/addDelay', payload: 3 });
    
    setTimeout(() => {
     expect(app._store.getState().count).toEqual(2);
     done();
    }, 200);
    });
    复制代码
    ```
    
-   watcher 监听事件，不过只能执行一次
    
    ```
     it('type: watcher', done => {
    const watcher = { type: 'watcher' };
    const app = create();
    app.model({
      namespace: 'count',
      state: 0,
      reducers: {
        add(state, { payload }) {
          return state + payload || 1;
        },
      },
      effects: {
        addWatcher: [
          function*({ take, put, call }) {
            while (true) {
              const { payload } = yield take('addWatcher');
              yield call(delay, 100);
              yield put({ type: 'add', payload });
            }
          },
          watcher,
        ],
      },
    });
    app.start();
    
    // Only catch the first one.
    app._store.dispatch({ type: 'count/addWatcher', payload: 2 });
    app._store.dispatch({ type: 'count/addWatcher', payload: 3 });
    
    setTimeout(() => {
      expect(app._store.getState().count).toEqual(2);
      done();
    }, 200);
    });
    复制代码
    ```
    
-   poll  
    轮询
    
    ```
     it('type: poll', done => {
    const app = create();
    app.model({
      namespace: 'count',
      state: 0,
      reducers: {
        add(state, { payload }) {
          return state + payload || 1;
        },
      },
      effects: {
        pollAdd: [
          function*(_, { put }) {
            yield put({ type: 'add', payload: 1 });
          },
          { type: 'poll', delay: 1000 },
        ],
      },
    });
    app.start();
    
    app._store.dispatch({ type: 'count/pollAdd-start' });
    
    setTimeout(() => {
      app._store.dispatch({ type: 'count/pollAdd-stop' });
      expect(app._store.getState().count).toEqual(2);
      done();
    }, 2000);
    });
    复制代码
    ```
    
    以上面例子来说=> { type: 'poll', delay: 1000 }来表示是轮询，delay表示间隔多少秒轮询一次。`dispatch({ type: 'count/pollAdd-start' })`表示轮询开始，`dispatch({ type: 'count/pollAdd-stop' })`表示轮询结束，但不会中断最后一次的请求。
    
    ```
    app._store.dispatch({ type: 'count/pollAdd-start' });
    // 即使紧接着取消轮询，但还是会执行一次
    app._store.dispatch({ type: 'count/pollAdd-stop' });
    复制代码
    ```
    
    `dispatch({ type: 'count/pollAdd-start' }, payload: 2)`可以携带参数，即从轮询开始到结束每次轮询都会传进去
    
    ```
    ...
    effects: {
        pollAdd: [
          function*({ payload }, { put }) {
            yield put({ type: 'add', payload });
          },
          { type: 'poll', delay: 1000 },
        ],
      },
    ...
    app._store.dispatch({ type: 'count/pollAdd-start', payload: 2 });
    
    setTimeout(() => {
      app._store.dispatch({ type: 'count/pollAdd-stop' });
      expect(app._store.getState().count).toEqual(4);
      done();
    }, 2000);
    复制代码
    ```
    
    轮询开始`dispatch({ type: 'count/pollAdd-start' })`后，只能`dispatch({ type: 'count/pollAdd-stop' })`结束轮询，才能开始新的一轮轮询。重复开始或者结束执行无效。
    
    ```
    ...
    state: 0,
      reducers: {
        add(state, { payload }) {
          return state + payload || 1;
        },
      },
     effects: {
        pollAdd: [
          function*({ payload }, { put }) {
            yield put({ type: 'add', payload });
          },
          { type: 'poll', delay: 1000 },
        ],
      }
      ...
    //1.
    app._store.dispatch({ type: 'count/pollAdd-start', payload: 2 });
    
    setTimeout(() => {
      // second start should not work
      app._store.dispatch({ type: 'count/pollAdd-start', payload: 3 });
      app._store.dispatch({ type: 'count/pollAdd-stop' });
      expect(app._store.getState().count).toEqual(6);
      done();
    }, 3000);
    //2.
    app._store.dispatch({ type: 'count/pollAdd-start', payload: 1 });
    // second start should not work
    app._store.dispatch({ type: 'count/pollAdd-start', payload: 1 });
    
    setTimeout(() => {
      app._store.dispatch({ type: 'count/pollAdd-stop' });
      expect(app._store.getState().count).toEqual(3);
      done();
    }, 3000);
    //3.
    app._store.dispatch({ type: 'count/pollAdd-start', payload: 1 });
    app._store.dispatch({ type: 'count/pollAdd-stop' });
    app._store.dispatch({ type: 'count/pollAdd-start', payload: 1 });
    
    setTimeout(() => {
      app._store.dispatch({ type: 'count/pollAdd-stop' });
      expect(app._store.getState().count).toEqual(3);
      done();
    }, 2000);
    });
    复制代码
    ```
    
    poll 源码：
    
    ```
    case 'poll':
      return function*() {
        function delay(timeout) {
          return new Promise(resolve => setTimeout(resolve, timeout));
        }
        function* pollSagaWorker(sagaEffects, action) {
          const { call } = sagaEffects;
          while (true) {
            yield call(sagaWithOnEffect, action);
            yield call(delay, delayMs);
          }
        }
        const { call, take, race } = sagaEffects;
        while (true) {
          const action = yield take(`${key}-start`);
          yield race([call(pollSagaWorker, sagaEffects, action), take(`${key}-stop`)]);
        }
      };
    复制代码
    ```
    

### 参考资料

-   [github.com/dvajs/dva/b…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fdvajs%2Fdva%2Fblob%2Fmaster%2Fpackages%2Fdva-core%2Ftest%2Feffects.test.js "https://github.com/dvajs/dva/blob/master/packages/dva-core/test/effects.test.js")
-   [dva官网](https://link.juejin.cn?target=https%3A%2F%2Fdvajs.com%2Fguide%2F "https://dvajs.com/guide/")
-   [dva-github](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fdvajs%2Fdva%2Fblob%2Fmaster%2FREADME_zh-CN.md "https://github.com/dvajs/dva/blob/master/README_zh-CN.md")

