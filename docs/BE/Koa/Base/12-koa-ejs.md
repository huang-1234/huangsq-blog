# 12-初步koa2的模板ejs

开发中不可能把所有的html代码全部写在JS里，这显然不现实，也没办法完成大型web开发。必须借用模板机制来帮助我们开发。Koa2的模板机制：koa2的目标机制要依靠中间件来完成开发。

**安装中间件**

在koa2中使用模板机制必须依靠中间件，我们这里选择koa-views中间件，先使用npm来进行安装。

```
cnpm install --save koa-views
```

需要注意的是是koa-views 而不是koa-view，我第一次安装时就遇到了这个坑，导致一直不成功，希望小伙伴不要踩我这个简单低级的坑。

**安装ejs模板引擎**

ejs是个著名并强大的模板引擎，可以单独安装。很多开源软件都采用了ejs模板引擎。

```js
npm install --save ejs
```

** 编写模板 **

安装好ejs模板引擎后，就可以编写模板了，为了模板统一管理，我们新建一个view的文件夹，并在它下面新建index.ejs文件。

> views/index.ejs

```ejs
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <span>
      <a href="https://huang-1234.github.io/" target="_blank">huang-1234</a>
    </span> 
  </head>
  <body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p>
  </body>
</html>

```

详细解释在视频中讲解。

**编写koa文件**

有了模板文件，我们需要在js文件中配置并渲染。

> 编写use-koa2-ejs.js

```
const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const app = new Koa();

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs',
}));

app.use(async (ctx) => {
  let title = 'hello koa2, I am jsHuang!';
  await ctx.render('index', {
    title:title,
  })
})
const port = 3000;
app.listen(port, () => {
  console.log(`at http://127.0.0.1:${port}`);
})
```

总结：koa2的模板机制.