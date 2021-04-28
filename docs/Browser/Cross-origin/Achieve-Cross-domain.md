## CRA执行setupProxy.js的？

### 问题

1. 在讲述原理之前，我们先抛出一个问题：为什么直接在`src`目录下创建`setupProxy.js`文件就可以进行跨域请求了？下面带着这个问题来探索一番。

2. 既然在`react-scripts start`启动项目之后就可以跨域请求，肯定是在生成本地服务过程中引入某个代理中间件并根据`setupProxy.js`配置配置中间件。就相当于`express`项目中先生成`express`实例，然后再使用实例的`use`方法配置中间件：

```js
const app = express();
const bodyParser = require('body-parser');

// 使用body-parser解析请求body参数
app.use(bodyParser.json())
```

3. `http-proxy-middleware`中间件的使用

```js
const express = require('express'); 
const proxy = require('http-proxy-middleware'); 

let app = express(); 
app.use('/api', proxy({target: 'http://10.119.168.87:4000', changeOrigin: true}));
```

4 当运行`react-scripts start`时会执行`scripts`目录下的`start.js`脚本

```js
start.js`如引入`config`目录下的`paths.js`以及基础构建脚本`webpack.config.js`和`devServer`服务配置文件`webpackDevServer.config.js
```
5. > `paths.js`存放的是一些文件路径映射，比如我们的代理配置文件`setupProxy.js`的路径`webpack.config.js`就是基础的构建配置，比如样式加载解析、代码压缩等等。`webpackDevServer.config.js`配置的就是我们的本地服务，包括我们的跨域请求

6. 引入上述文件后，`start.js`中生成一个本地服务实例（`const app = express()`）后会根据构建、代理配置文件等配置中间件，然后启动服务

其实，创建本地服务使用的是`webpack-dev-server`包，而这个包是基于`express`实现的

```
const WebpackDevServer = require('webpack-dev-server');
const devServer = new WebpackDevServer(compiler, serverConfig);
```

[参考](https://www.cnblogs.com/zhaoweikai/p/9969282.html)

###  简介

http-proxy-middleware用于后台将请求转发给其它服务器。

例如：我们当前主机A为[http://localhost:3000/](https://link.jianshu.com/?t=http://localhost:3000/)，现在浏览器发送一个请求，请求接口/api，这个请求的数据在另外一台服务器B上（http://10.119.168.87:4000），这时，就可通过在A主机设置代理，直接将请求发送给B主机。

简单实现代码如下：

```
1 let express = require('express');
2 let proxy = require('http-proxy-middleware');
3 
4 let app = express();
5 
6 app.use('/api', proxy({target: 'http://10.119.168.87:4000', changeOrigin: true}));
7 app.listen(3000);
```

说明：我们利用express在3000端口启动了一个小型的服务器，利用了`app.use('/api', proxy({target: 'http://10.119.168.87:4000/', changeOrigin: true}))`这句话，使发到3000端口的/api请求转发到了4000端口。即请求`http://localhost:3000/api`相当于请求http://10.119.168.87:4000`/api`。

> 安装

```shell
 npm install --save-dev http-proxy-middleware
```

<font color=red>proxy([context,] config)</font>

```js
let proxy = require('http-proxy-middleware');

let apiProxy = proxy('/api', {target: 'http://www.example.org'});
```

> 下面是使用Express构建服务器

```js
// 引用依赖
let express = require('express');
let proxy = require('http-proxy-middleware');

// proxy 中间件的选择项
let options = {
        target: 'http://www.example.org', // 目标服务器 host
        changeOrigin: true,               // 默认false，是否需要改变原始主机头为目标URL
        ws: true,                         // 是否代理websockets
        pathRewrite: {
            '^/api/old-path' : '/api/new-path',     // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
            '^/api/remove/path' : '/path'           // 同上
        },
        router: {
            // 如果请求主机 == 'dev.localhost:3000',
            // 重写目标服务器 'http://www.example.org' 为 'http://localhost:8000'
            'dev.localhost:3000' : 'http://localhost:8000'
        }
    };
let exampleProxy = proxy(options); // 创建代理

let app = express();  // 使用代理
    app.use('/api', exampleProxy);
    app.listen(3000);
```

### 3.1 参数一**[context]**详解

下边是一个完整地址划分：

```js
foo://example.com:8042/over/there?name=ferret#nose
 \_/  \______________/\_________/ \_________/ \__/
  |           |            |            |       |
协议          主机         路径          查询     碎片
```

第一个参数主要设置要代理的路径，该参数具有如下用法：

**1）可以省略**

- `proxy({...})`：匹配任何路径，所有请求将被转发；

**2）可以设置为路径字符串**

- `proxy('/', {...})` ：匹配任何路径，所有请求将被转发；
- `proxy('/api', {...})`：匹配/api开头的请求

**3）可以设置为数组**

- `proxy(['/api', '/ajax', '/someotherpath'], {...}) ：匹配多个路径`

**4）可以设置为函数（自定义配置规则）**

```js
var filter = function (pathname, req) {
    return (pathname.match('^/api') && req.method === 'GET');
};
var apiProxy = proxy(filter, {target: 'http://www.example.org'}
```

**5）可以设置为通配符**

细粒度的匹配可以使用通配符匹配，Glob 匹配模式由 micromatch创造，访问 [micromatch](https://link.jianshu.com/?t=https://www.npmjs.com/package/micromatch) or [glob](https://link.jianshu.com/?t=https://www.npmjs.com/package/glob) 查找更多用例。

- `proxy('**', {...})` 匹配任何路径，所有请求将被转发；
- `proxy('**/*.html', {...})` 匹配任何以.html结尾的请求；
- `proxy('/*.html', {...})` 匹配当前路径下以html结尾的请求；
- `proxy('/api/**/*.html', {...})` 匹配/api下以html为结尾的请求；
- `proxy(['/api/**', '/ajax/**'], {...})` 组合
- `proxy(['/api/**', '!**/bad.json'], {...})` 不包括`**/bad.json`

### 3.2 参数二config详解

该接口是一个对象，里边包含的参数有如下：

```js
// proxy 中间件的选择项
var config= {
        target: 'http://www.example.org', // 目标服务器 host
        changeOrigin: true,               // 默认false，是否需要改变原始主机头为目标URL
        ws: true,                         // 是否代理websockets
        pathRewrite: {
          // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
            '^/api/old-path' : '/api/new-path',     
            '^/api/remove/path' : '/path'           // 同上
        },
        router: {
            // 如果请求主机 == 'dev.localhost:3000',
            // 重写目标服务器 'http://www.example.org' 为 'http://localhost:8000'
            'dev.localhost:3000' : 'http://localhost:8000'
        }
    };
// 创建代理
var exampleProxy = proxy(config);
```
**1）target** :用于设置目标服务器host。

**2）changeOrigin**:默认false，是否需要改变原始主机头为目标URL。

**3）ws**：设置是否代理websockets。

**4）pathRewrite**：重写目标url路径。

```js
// 重写
pathRewrite: {'^/old/api' : '/new/api'}

// 移除
pathRewrite: {'^/remove/api' : ''}

// 添加
pathRewrite: {'^/' : '/basepath/'}

// 自定义
pathRewrite: function (path, req) { return path.replace('/api', '/base/api') }
```

5）router:重写指定请求转发目标。

```js
// 使用主机或者路径进行匹配，返回最先匹配到结果
// 所以配置的顺序很重要
router: {
    'integration.localhost:3000' : 'http://localhost:8001',  // host only
    'staging.localhost:3000'     : 'http://localhost:8002',  // host only
    'localhost:3000/api'         : 'http://localhost:8003',  // host + path
    '/rest'                      : 'http://localhost:8004'   // path only
}
// 自定义
router: function(req) {
    return 'http://localhost:8004';
}
```

## 实现原理

>  http-proxy-middleware实际是用http-proxy库实现代理中间件功能。

**1）proxy([context,] config)，这步是执行了源码中HttpProxyMiddleware方法，该方法核心内容是调用httpProxy.createProxyServer()方法创建一个代理服务，并且在该方法最后返回一个middleware。**

httpProxy官网：https://github.com/nodejitsu/node-http-proxy#core-concept

**2）分析返回值middleware是一个函数，该函数核心是用上边创建的proxy服务返回值，调用web方法，用于转发请求。**

**3）app.use('/api', proxy（options）)，相当于本地服务器监听到客户端请求的‘/api’接口时，执行的回到是上边的middleware中间件函数，从上边可以看出，该函数中将请求转发到代理服务器。**

**总结：http-proxy-middleware实际就是将http-proxy封装，使用起来更加方便简单。**

