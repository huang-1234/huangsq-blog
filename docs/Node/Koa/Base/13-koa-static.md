## koa的静态资源static

安装koa-static： 使用npm进行安装中间件,讲课时使用的是4.0.2版本。

```
npm install --save koa-static
```

**新建static文件夹** 然后在static文件中放入图片，css和js文件。

使用koa-static中间件 我们新建一个demo12.js文件，引入koa-static中间件，并用app.use方法进行使用。

```
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()


const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))


app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})
```

**总结：**静态资源环境在服务端是非常常用的一种服务，我们必须要学会使用，小伙伴这节课还是看视频吧，文字有点水。