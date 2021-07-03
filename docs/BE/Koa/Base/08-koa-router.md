## koa的router中间件

我们将使用中间件koa-router来完成路由的配置，koa的中间件生态环境足够强大，路由的中间件不只一种

安装koa-router中间件

```
npm install --save koa-router
```

安装完成后可以在package.json里查到，然后就可以在程序中引入并使用了。

**koa-router基础案例**

我们会把koa-router讲的详细些，所以会分成几节课来讲，我们先来看一个最基本的koa-router怎么写。

```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', function (ctx, next) {
  ctx.body = "welcome to my home, I am jsHuang";
});

let indexUrl = 'pages' + 'index.html'
router.get(indexUrl, () => {
  ctx.body = 'welcome to the index.html'
})

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
const call_url = `http://localhost:${port} or http://127.0.0.1:${port}`
app.listen(port, () => {
  console.log(call_url);
})
```

**多页面配置**

其实多页面的添加只要继续在下面填写get或者Post就可以了，比如我们再加一个index的页面。

```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router({
  prefix: '/hsq'
});

router.get('/', function (ctx, next) {
  ctx.body = "welcome to my home, I am jsHuang";
});

let indexUrl = 'pages' + 'index.html'
router.get(indexUrl, () => {
  ctx.body = 'welcome to the index.html'
})

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
const call_url = `http://localhost:${port} or http://127.0.0.1:${port}`
app.listen(port, () => {
  console.log(call_url);
})
```

总结：我们发现有了中间件进行配置路由非常简单，但是路由还是很复杂的，这只是koa-router最基本的用法.

### 09-Koa-router中间件（2）层级

对koa-router有了初步的了解。

<iframe frameborder="0" width="100%" src="https://v.qq.com/iframe/player.html?vid=g0513x50shb&amp;tiny=0&amp;auto=0" allowfullscreen="" style="box-sizing: border-box; height: 34rem; border: 1px solid rgb(204, 204, 204); border-radius: 8px; color: rgb(119, 119, 119); font-family: -apple-system, system-ui, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 16.8px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>



**设置前缀**

有时候我们想把所有的路径前面都再加入一个级别，比如原来我们访问的路径是http://127.0.0.1:3000/index，现在我们希望在所有的路径前面都加上一个jspang层级，把路径变成http://127.0.0.1:3000/hsq/index.这时候就可以使用层级来完成这个功能。路由在创建的时候是可以指定一个前缀的，这个前缀会被至于路由的最顶层，也就是说，这个路由的所有请求都是相对于这个前缀的。

```js
const router = new Router({
      prefix:'/hsq'
})
```

写上这句代码，这时候你的访问路径就加了一个层级hsq。可以在浏览器中输入:http://127.0.0.1:3000/测试一下。

**路由层级

设置前缀一般都是全局的，并不能实现路由的层级，如果你想为单个页面设置层级，也是很简单的。只要在use时使用路径就可以了。

例如这种写法装载路由层级，这里的router相当于父级：router.use(‘/page’, page.routes(), page.allowedMethods())。

通过这种写法的好处是并不是全局的，我们可以给不同的路由加层级。

代码如下：我们声明了两个路由，第一个是home,第二个是page.然后通过use赋予不同的前层级。

```
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', function (ctx, next) {
  ctx.body = "welcome to my home, I am jsHuang";
});

let indexUrl = 'pages' + 'index.html'
router.get(indexUrl, () => {
  ctx.body = 'welcome to the index.html'
})

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
const call_url = `http://localhost:${port} or http://127.0.0.1:${port}`
app.listen(port, () => {
  console.log(call_url);
})
```

### Koa-router中间件（3）参数

通过两节koa-router的学习，对路由已经有了基本的了解，但是有些小伙伴还是给我留言说：不会传递参数。确实参数的传递在程序的编写中非常重要，是必会技能之一。这节课就学习一下如何通过koa-router传递参数并接收。

<iframe frameborder="0" width="100%" src="https://v.qq.com/iframe/player.html?vid=t05164lr4zu&amp;tiny=0&amp;auto=0" allowfullscreen="" style="box-sizing: border-box; height: 34rem; border: 1px solid rgb(204, 204, 204); border-radius: 8px; color: rgb(119, 119, 119); font-family: -apple-system, system-ui, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 16.8px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>



我们先来作一个最简单的路由。

```
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', function (ctx, next) {
  ctx.body = ctx.query;
});

let indexUrl = 'pages' + 'index.html'
router.get(indexUrl, () => {
  ctx.body = 'welcome to the index.html'
})

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
const call_url = `http://localhost:${port} or http://127.0.0.1:${port}`
app.listen(port, () => {
  console.log(call_url);
})
```

这里我们使用最易用的方法ctx.query来进行接收,修改为下面代码的第6行，这样就可以轻松接收get参数。

```
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
router.get('/', function (ctx, next) {
    ctx.body=ctx.query;
});
app
  .use(router.routes())
  .use(router.allowedMethods());
  app.listen(3000,()=>{
      console.log('starting at port 3000');
  });
```

