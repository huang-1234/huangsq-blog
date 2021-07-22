# vue 的响应式原理

## 视图和数据变化绑定

而 vue.js 主要利用了 accessor descriptors 的 set 和 get 来更新视图，[这里](https://link.jianshu.com?t=http://www.cnblogs.com/oceanxing/p/3938443.html)看到的这个例子挺好，是一个简单的绑定。
对于一个 html 页面

```js
<div>
  <p>
    你好，<span id="nickName"></span>
  </p>
  <div id="introduce"></div>
</div>
```

设置一个数据的属性的 getter 和 setter

```js
//视图控制器
var userInfo = {};
Object.defineProperty(userInfo, "nickName", {
  get: function() {
    return document.getElementById("nickName").innerHTML;
  },
  set: function(nick) {
    document.getElementById("nickName").innerHTML = nick;
  },
});
Object.defineProperty(userInfo, "introduce", {
  get: function() {
    return document.getElementById("introduce").innerHTML;
  },
  set: function(introduce) {
    document.getElementById("introduce").innerHTML = introduce;
  },
});
```

然后就能愉快地绑定数据交互了。

```ts
userInfo.nickName = "xxx";
userInfo.introduce = "我是xxx，我来自云南，...";
```

## vue.js 的数据变动

但是，这个例子只是数据和 dom 节点的绑定，而 vue.js 更为复杂一点，它在网页 dom 和 accessor 之间会有两层，一层是 Wacher，一层是 Directive，比如以下代码。

```js
var a = { b: 1 };
var vm = new Vue({
  data: data,
});
```

把一个普通对象（a={b:1}）传给 Vue 实例作为它的 data 选项，Vue.js 将遍历它的属性，用[Object.defineProperty](https://link.jianshu.com?t=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 将它们转为 getter/setter,如图绿色的部分所示。
每次用户更改 data 里的数据的时候，比如`a.b =1`，setter 就会重新通知 Watcher 进行变动，Watcher 再通知 Directive 对 dom 节点进行更改。

[原文](https://www.jianshu.com/p/07ba2b0c8fca/
来)
