## 登录问题

1. 如何设计数据库以及相应的接口
2. 如何保证在匿名用户未登录的情况下仅仅只是可以看相关的文章，而不可以管理自己的文章。
3. 如何保证用户登录进去以后再次刷新不会退出登录

## AdminIndex出现的问题

就是因为在app.js里面渲染AdminIndex路由组件的里面加了个exact。如下所示 admin/app.js

```jsx
function App() {
  return (
    <Fragment key="App">
      <BrowserRouter>
          <Route path="/login/" exact component={Login} />
        <Route path="/index/" exact component={AdminIndex} />
      </BrowserRouter>
    </Fragment>
  );
}
```

而又因为需要路由跳转 在文件admin/pages/AdminIndex/index,jsx里面

```js
  <Route path="/index/" exact component={AddArticle} />
  <Route path="/index/add/" exact  component={AddArticle} />
  <Route path="/index/add/:id" exact  component={AddArticle} />
  <Route path="/index/list/" exact component={ArticleList} />
```

结果当我路由跳转到的时候`/index/list/` 就再也渲染不了`AdminIndex' component了

## 官方解释如下

```js
path: string | string []
所以可以被path-to-regexp@^1.7.0 识别的 url 都能使用。

<Route path="/users/:id">
  <User />
</Route>
<Route path={["/users/:id", "/profile/:id"]}>
  <User />
</Route>
exact: bool
当值为 true 时，仅当 location.pathname 和路由路径完全匹配时候渲染。

<Route exact path="/one">
  <About />
</Route>
strict: bool
<Route strict path="/one/">
  <About />
</Route>
路由路径	location.pathname	匹配与否
/one/	/one	否
/one/	/one/	是
/one/	/one/two	是
当值为 true 时，带有 path 斜杠的只会与 location.pathname 带有斜杠的匹配。当 location.pathname 中有其他网址段时，此选项无效。

<Route exact strict path="/one">
  <About />
</Route>
路由路径	location.pathname	匹配与否
/one/	/one	是
/one/	/one/	否
/one/	/one/two	否
location: object
一个<Route>元素尝试其匹配 path 到当前的历史位置（通常是当前浏览器 URL）。但是，也可以传递与 location.pathname 不同的值进行匹配。如需要将<Route>与当前历史记录位置以外的其他位置进行匹配时，这很有用，如Animated Transitions示例所示。如果<Route>元素包装在中，<Switch>并且与传递给的位置<Switch>（或当前历史记录位置）匹配，则 location 传递给<Route>的属性将被<Switch>上的属性 代码覆盖。

sensitive: bool
当值为 true 时，匹配时将区分大小写

路由路径	location.pathname	sensitive 的值	匹配与否
/one/	/one	true	是
/one/	/one/	true	否
/one/	/one/two	false	否
最后修改时间： 53 days ago
```

## 要实现的功能4

编辑器的md语法转html语言，并且转换后的代码有高亮效果

选择marked库和highlight.js库

问题： react 使用marked+highlight.js样式不生效

原因： 需要手动引入highlight.js的样式文件

## 三、[markedjs官网](https://marked.js.org/#/USING_ADVANCED.md#highlight)

### 官网demo



```js
// Create reference instance
var myMarked = require('marked');

// Set options
// `highlight` example uses `highlight.js`
myMarked.setOptions({
  renderer: new myMarked.Renderer(),
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

// Compile
console.log(myMarked('I am using __markdown__.'));
```

### 说明



```js
highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
}
```

code 参数是`<code>`中的初始内容， 该函数返回的是经highlight `处理` （给特定内容添加上class）后的内容。