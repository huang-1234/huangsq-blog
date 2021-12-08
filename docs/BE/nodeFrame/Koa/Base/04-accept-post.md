## accept POST

对于POST请求的处理，Koa2没有封装方便的获取参数的方法，需要通过解析上下文context中的原生node.js请求对象req来获取。

**获取Post请求的步骤：**

1. 解析上下文ctx中的原生nodex.js对象req。
2. 将POST表单数据解析成query string-字符串.(例如:user=hsq&age=18)
3. 将字符串转换成JSON格式。

**ctx.request和ctx.req的区别**

- ctx.request:是Koa2中context经过封装的请求对象，它用起来更直观和简单。
- ctx.req:是context提供的node.js原生HTTP请求对象。这个虽然不那么直观，但是可以得到更多的内容，适合我们深度编程。

**tx.method 得到请求类型**

Koa2中提供了ctx.method属性，可以轻松的得到请求的类型，然后根据请求类型编写不同的相应方法，这在工作中非常常用。我们先来作个小例子，根据请求类型获得不同的页面内容。GET请求时得到表单填写页面，POST请求时，得到POST处理页面。

```js
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
  //当请求时GET请求时，显示表单让用户填写
  let html = `
    <h1>Koa2 request post demo</h1>
    <form method="POST"  action="/form">
        <p>userName</p>
        <input name="userName" /> <br/>
        <p>age</p>
        <input name="age" /> <br/>
        <p>webSite</p>
        <input name='webSite' /><br/>
        <button type="submit">submit</button>
    </form>
  `;
  if (ctx.url === '/' && ctx.method === 'GET') {
    ctx.body = html;
    //当请求时POST请求时
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    ctx.body = '接收到请求';
  } else {
    //其它请求显示404页面
    ctx.body = '<h1>404!</h1>';
  }
})

app.listen(3000, () => {
  console.log('at http://localhost:3000 or http://127.0.0.1:3000');
})
```

写好这段代码后你可以用node命令执行它，然后再浏览器中输入http://127.0.0.1:3000进行查看，第一次进入时给我们展现的是一个表单页面，我们点击提交后可以看到服务器接收到了我们的信息，但我们并没有做出任何处理。当我们下输入一个地址时，它会提示404错误。http://127.0.0.1:3000进行查看，第一次进入时给我们展现的是一个表单页面，我们点击提交后可以看到服务器接收到了我们的信息，但我们并没有做出任何处理。当我们下输入一个地址时，它会提示404错误。

## 接收POST请求-2

我们先声明一个方法，然后用Promise对象进行解析。这里我们使用了ctx.req.on来接收事件。难点是我们这里用了ES6的Promise来处理。

```js
const Koa = require('koa');
const app = new Koa();

function parseQueryStr(queryStr) {
  const queryData = {};
  const queryStrList = queryStr.split('&');
  console.log('qSL:', queryStrList);
  for (let [index, queryStr] of queryStrList.entries()) {
    const itemList = queryStr.split('=');
    console.log('itemList:', itemList);
    queryData[itemList[0]]=decodeURIComponent(itemList[1])
  }
  return queryData;
}

function parsePostData(ctx) {
  return new Promise((resolve, reject) =>{
    try {
      let post_data = "";
      ctx.req.on('data', (data) => {
        post_data += data;
      });
      ctx.req.addListener('end', () => {
        let parse_data = parseQueryStr(post_data);
        resolve(parse_data);
      })
    } catch(error) {
      console.log(error);
      reject(error)
    }
  })
}

app.use(async (ctx) => {
  //显示表单页面
  let html = `
    <h1>jsHuang Koa2 request POST</h1>
    <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>age</p>
        <input name="age" /><br/>
        <p>website</p>
        <input name="webSite" /><br/>
        <button type="submit">submit</button>
    </form>
  `;
  if (ctx.url === '/' && ctx.method === 'GET') {

    ctx.body = html;
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let pastData = await parsePostData(ctx);
    ctx.body = pastData;
  } else {
    ctx.body = '<h1>404!</h1>';
  }
});

const port = 3000;
const call_url = `http://localhost:${port} or http://127.0.0.1:${port}`
app.listen(port, () => {
  console.log(call_url);
})
```

