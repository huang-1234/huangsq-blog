# WebPack热加载插件

## 优化自动刷新的性能



`devServer.inline`是用来控制是否往`Chunk`中注入代理客户端的，默认会注入。 事实上，在开启`inline`时，DevServer会为每个输出的`Chunk`中注入代理客户端的代码，当你的项目需要输出的`Chunk`有很多个时，这会导致你的构建缓慢。 其实要完成自动刷新，一个页面只需要一个代理客户端就行了，DevServer之所以粗暴的为每个`Chunk`都注入，是因为它不知道某个网页依赖哪几个`Chunk`，索性就全部都注入一个代理客户端。 网页只要依赖了其中任何一个`Chunk`，代理客户端就被注入到网页中去。

这里优化的思路是关闭还不够优雅的`inline`模式，只注入一个代理客户端。 为了关闭`inline`模式，在启动DevServer时，可通过执行命令`webpack-dev-server --inline false`（也可以在配置文件中设置），这时输出的日志如下：



```csharp
> webpack-dev-server --inline false

Project is running at http://localhost:8080/webpack-dev-server/
webpack output is served from /
Hash: 5a43fc44b5e85f4c2cf1
Version: webpack 3.5.5
Time: 1130ms
        Asset    Size  Chunks                    Chunk Names
    bundle.js  750 kB       0  [emitted]  [big]  main
bundle.js.map  897 kB       0  [emitted]         main
  [81] ./main.js 2.29 kB {0} [built]
    + 169 hidden modules
```

要开发的网页被放进了一个`iframe`中，编辑源码后，`iframe`会被自动刷新。 同时你会发现构建时间从1566ms减少到了1130ms，说明优化生效了。构建性能提升的效果在要输出的`Chunk`数量越多时会显得越突出。
 如果你不想通过`iframe`的方式去访问，但同时又想让网页保持自动刷新功能，你需要手动往网页中注入代理客户端脚本，往`index.html`中插入以下标签：

```xml
<!--注入 DevServer 提供的代理客户端脚本，这个服务是 DevServer 内置的-->
<script src="http://localhost:8080/webpack-dev-server.js"></script>
```

给网页注入以上脚本后，独立打开的网页就能自动刷新了。但是要注意在发布到线上时记得删除掉这段用于开发环境的代码。

## 开启模块热替换

要做到实时预览，除了使用自动刷新刷新整个网页外，DevServer还支持一种叫做模块热替换(`Hot Module Replacement`)的技术可在不刷新整个网页的情况下做到超灵敏的实时预览。 原理是当一个源码发生变化时，只重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块。
 模块热替换技术的优势有：

- 实时预览反应更快，等待时间更短。
- 不刷新浏览器能保留当前网页的运行状态，例如在使用Redux来管理数据的应用中搭配模块热替换能做到代码更新时Redux中的数据还保持不变。

总的来说模块热替换技术很大程度上的提高了开发效率和体验。

#### 模块热替换的原理

模块热替换的原理和自动刷新原理类似，都需要往要开发的网页中注入一个代理客户端用于连接DevServer和网页， 不同在于模块热替换独特的模块替换机制。
 DevServer默认不会开启模块热替换模式，要开启该模式，只需在启动时带上参数`--hot`，完整命令是`webpack-dev-server --hot`。
 除了通过在启动时带上`--hot`参数，还可以通过接入`Plugin`实现，相关代码如下：



```java
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
module.exports = {
  entry:{
    // 为每个入口都注入代理客户端
    main:['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server','./src/main.js'],
  },
  plugins: [
    // 该插件的作用就是实现模块热替换，实际上当启动时带上 `--hot` 参数，会注入该插件，生成 .hot-update.json 文件。
    new HotModuleReplacementPlugin(),
  ],
  devServer:{
    // 告诉 DevServer 要开启模块热替换模式
    hot: true,      
  }  
};
```

在启动Webpack时带上参数`--hot`其实就是自动为你完成以上配置。