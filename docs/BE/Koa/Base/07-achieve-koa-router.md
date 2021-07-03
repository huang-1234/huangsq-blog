# router的极简实现

router是前端的业务逻辑和思想。我们通过判断进行各种页面的展示效果。在不借助中间件的情况下，我们用原生方法简单实现以下路由。

​	

** ctx.request.url **

要想实现原生路由，需要得到地址栏输入的路径，然后根据路径的不同进行跳转。用ctx.request.url就可以实现。我们通过一个简单的例子了解一下如何获得访问路径。

```
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  let url = ctx.request.url
  ctx.body = url
})
app.listen(3000)
```

这时候访问http://127.0.0.1:3000/jspang/18 页面会输出/jspang/18。会了这个，我们就可以根据输出的不同，实现的页面结果。

**原生路由实现**

这节看视频吧，因为html部分的编写我就不打字了。

原生路由的实现需要引入fs模块来读取文件。然后再根据路由的路径去读取，最后返回给页面，进行渲染。我们看一个小例子进行学习。

html文件我都放在根目录下的pages文件夹下，你也可以放在其他文件下

```js
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

function render(page) {
  return new Promise((resolve, reject) => {
    let pageUrl = `pages/${page}`;
    fs.readFile(pageUrl,'binary',(err, data) => {
      console.log('sq');
      if (err) {
        console.log('err:', err);
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

async function route(url) {
  let page = '404.html';
  switch (url) {
    case '/':
      page ='index.html';
      break;
    case '/index':
      page = 'index.html';
      break;
    case '/artcle':
      page = 'article.html';
      break;
    case '/404':
      page = '404.html';
      break;
    default:
      break;
  }
  let html = await render(page);
  return html;
}
//
app.use(async (ctx) => {
  let url = ctx.request.url;
  let html = await route(url);
  console.log(url);
  ctx.body = html;
})

const port = 3000;
const call_url = `http://localhost:${port} or http://127.0.0.1:${port}`
app.listen(port, () => {
  console.log(call_url);
})
```

总结：原生实现路由，也是一个基础。

