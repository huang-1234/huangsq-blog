## tow. 使用Dart-Sass替换Node-Sass

在使用sass的时候，create-react-app 官网上推荐是使用 node-sass,但是前端使用node-sass会引起很多问题，node-sass的安装很容易失败,下载好node-sass之后运行的时候还需要本地编译，需要花费大量的时间和占用大量的CPU内存使用起来很不方便，所以我们要放弃node-sass改用dart-sass。但是直接安装 dart-sass 并不起作用，所以应该这样安装

```js
yarn add node-sass@npm:dart-sass
```

这样我们就在里面安装了一个 node-sass 包，但是里面内容是dart-sass 的文件

