### 一. 计算属性

#### 1.1. 计算属性的本质

* fullname: {set(), get()}

#### 1.2. 计算属性和methods对比

* 计算属性在多次使用时, 只会调用一次.
* 它是有缓存的



### 二. 事件监听

#### 2.1. 事件监听基本使用

#### [事件处理方法](https://cn.vuejs.org/v2/guide/events.html#事件处理方法)

然而许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 `v-on` 指令中是不可行的。因此 `v-on` 还可以接收一个需要调用的方法名称。

示例：

```js
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})
// 也可以用 JavaScript 直接调用方法
example2.greet() // => 'Hello Vue.js!'
```

除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法：

```js
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
```

结果：

有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法：

```js
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

#### 2.2. 参数问题

* btnClick
* btnClick(event)
* btnClick(abc, event) -> $event



#### 2.3. 修饰符

* stop
* prevent
* .enter
* .once
* .native

####  [事件修饰符](https://cn.vuejs.org/v2/guide/events.html#事件修饰符)

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```js
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

### 三. 条件判断

#### 3.1. v-if/v-else-if/v-else



#### 3.2. 登录小案例



#### 3.3. v-show

* v-show和v-if区别



### 四. 循环遍历

#### 4.1. 遍历数组



#### 4.2. 遍历对象

* value
* value, key
* value, key, index

#### 4.3. 数组哪些方法是响应式的



#### 4.4. 作业完成



### 五. 书籍案例



### 六. v-model的使用

#### 6.1. v-model的基本使用

* v-model => v-bind:value v-on:input

#### 6.2. v-model和radio/checkbox/select



#### 6.3. 修饰符

* lazy
* number
* trim



### 七. 组件化开发

#### 7.1. 认识组件化

#### 7.2. 组件的基本使用

#### 7.3. 全局组件和局部组件

#### 7.4. 父组件和子组件

#### 7.5. 注册的语法糖

#### 7.6. 模板的分类写法

* script
* template

#### 7.7. 数据的存放

* 子组件不能直接访问父组件
* 子组件中有自己的data, 而且必须是一个函数.
* 为什么必须是一个函数.

#### 7.8. 父子组件的通信

* 父传子: props
* 子传父: $emit

#### 7.9. 项目

* npm install
* npm run serve


