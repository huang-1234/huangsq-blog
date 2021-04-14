### react项目中是怎么执行setupProxy.js的？

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

var app = express(); 
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

