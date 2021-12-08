## mysql查询

关于去mysql查询username和password，用来登录的问题 就是一个字符串转换为一个合法的SQL语句

```js
    const sql = "SELECT admin_user.username FROM admin_user WHERE admin_user.username = '" + username + "'AND admin_user.password = '" + password + "'";
```

在middleware/main.js下面输出ctx

```js
ctx.session.openID: undefined
ctx.session: {}
ctx: {
  request: {
    method: 'GET',
    url: '/admin/getTypeInfo',
    header: {
      host: '127.0.0.1:7001',
      connection: 'keep-alive',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      accept: 'application/json, text/plain, */*',
      'sec-ch-ua-mobile': '?0',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
      origin: 'http://localhost:3000',
      'sec-fetch-site': 'cross-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      referer: 'http://localhost:3000/',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8'
    }
  },
  response: {
    status: 404,
    message: 'Not Found',
    header: [Object: null prototype] {
      vary: 'Origin',
      'access-control-allow-origin': 'http://localhost:3000',
      'access-control-allow-credentials': 'true'
    }
  },
  app: {
    env: 'local',
    name: 'use-egg-build-middle',
    baseDir: 'G:\\Study\\Code\\Web\\NodeJS\\some-project\\use-egg-build-middle',
    subdomainOffset: 2,
    config: '<egg config>',
    controller: '<egg controller>',
    httpclient: '<egg httpclient>',
    loggers: '<egg loggers>',
    middlewares: '<egg middlewares>',
    router: '<egg router>',
    serviceClasses: '<egg serviceClasses>'
  },
  originalUrl: '/admin/getTypeInfo',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>'
}
```

## egg-mysql的POST请求

```js
  // 保存文章，添加文章的接口
  async addArticle() {
    const { ctx, app } = this;
    const tmpArticle = ctx.request.body;
    console.log('service/con/admin/main.js--addtmpArticle:', tmpArticle.articleId, tmpArticle.title);
    const result = await app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    console.log('service/con/admin/main.js--await app.mysql.insert:', result);

    ctx.body = {
      isSucccess: insertSuccess,
      // eslint-disable-next-line object-shorthand
      insertId: insertId,
    };
  }
```

输出

```js
headers: {
  "Access-Control-Allow-Origin":"http://localhost:3000",
  "Access-Control-Allow-Credentials":"true",
  "vary":"Origin"
}
name: "ER_BAD_FIELD_ERRORError"
pid: 56920
hostname: HSQ

admin/main--artiType: [
  RowDataPacket { id: 1, typeName: 'js', orderNum: 1 },
  RowDataPacket { id: 2, typeName: 'html', orderNum: 2 },
  RowDataPacket { id: 3, typeName: 'css', orderNum: 3 }
]
service/con/admin/main.js--addtmpArticle: 1621244765.429 原始类型
service/con/admin/main.js--await app.mysql.insert: OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0
}
```

