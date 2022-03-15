距离 [umi 1.0 发布](https://github.com/sorrycc/blog/issues/64) 已有半年，umi 在这段时间做了大量的重构和改进，438 个 commit，20 个 beta 版本，**今天正式发布 2.0 版本，并调整定位为可插拔的企业级 react 应用框架**。

## umi 是什么？

umi，中文可发音为乌米，是一个可插拔的企业级 react 应用框架。umi 以路由为基础的，支持[类 next.js 的约定式路由](https://umijs.org/zh/guide/router.html)，以及各种进阶的路由功能，并以此进行功能扩展，比如[支持路由级的按需加载](https://umijs.org/zh/plugin/umi-plugin-react.html#dynamicimport)。然后配以完善的[插件体系](https://umijs.org/zh/plugin/)，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求，目前内外部加起来已有 50+ 的插件。

umi 是蚂蚁金服的底层前端框架，已直接或间接地服务了 600+ 应用，包括 java、node、H5 无线、离线（Hybrid）应用、纯前端 assets 应用、CMS 应用等。他已经很好地服务了我们的内部用户，同时希望他也能服务好外部用户。

他包含以下特性：

- 📦 **开箱即用**，内置 react、react-router 等
- 🏈 **类 next.js 且[功能完备](https://umijs.org/zh/guide/router.html)的路由约定**，同时支持配置的路由方式
- 🎉 **完善的插件体系**，覆盖从源码到构建产物的每个生命周期
- 🚀 **高性能**，通过插件支持 PWA、以路由为单元的 code splitting 等
- 💈 **支持静态页面导出**，适配各种环境，比如中台业务、无线业务、[egg](https://github.com/eggjs/egg)、支付宝钱包、云凤蝶等
- 🚄 **开发启动快**，支持一键开启 [dll](https://umijs.org/zh/plugin/umi-plugin-react.html#dll) 和 [hard-source-webpack-plugin](https://umijs.org/zh/plugin/umi-plugin-react.html#hardSource) 等
- 🐠 **一键兼容到 IE9**，基于 [umi-plugin-polyfills](https://umijs.org/zh/plugin/umi-plugin-react.html#polyfills)
- 🍁 **完善的 TypeScript 支持**，包括 d.ts 定义和 umi test
- 🌴 **与 dva 数据流的深入融合**，支持 duck directory、model 的自动加载、code splitting 等等

## 2.0 有什么改进？

### 轻内核 + 新手友好

umi@1 内置了很多优化方案，比如按需编译、按需加载、eslint、pwa、antd 校验等等，这些方案能提升开发体验和运行效率，但同时也提升了入门 umi 的门槛。

所以 umi@2 默认关掉了很多优化方案：

- 按需编译
- 按需加载
- serviceWorker
- antd
- ...

然后把这些功能改由插件来实现，按需开启，以保证 umi 内核的轻量。同时，默认构建只产生 index.html、umi.js 和 umi.css，对新手来说部署更友好。

### 全新的插件机制

umi@1 的插件机制有点过于强大，什么都能做，什么都能改。所以 umi@2 重构了插件机制，**做了很多约束，明确什么能做，什么不能做**，并提供了一套更友好的[插件 API](https://umijs.org/zh/plugin/develop.html)。

同时，这套插件机制已在内部得以验证，由超过 30 个插件构成的非常优秀的内部框架 Bigfish 正在服务于蚂蚁金服，包含埋点、后端接入、性能、服务接入、权限等等。

### umi-plugin-react

umi@1 的插件比较散，使用时通常需要安装多个插件，升级和使用都比较麻烦，所以我们提供了 umi-plugin-react。umi-plugin-react 是插件集，类似 babel 里 preset 的概念。

目前有内置了 13 个插件，包含：

- dva 整合
- antd 整合
- routes 修改
- 一键兼容 ie9
- 约定式的 i18n 方案
- 切换 react 到 preact 或其他类 react 库
- 路由级的按需加载，可定制按需的路由等级
- 通过 dll 提速
- 通过 hardSource 提速
- pwa
- 启用高清方案
- 启用 fastClick
- 支持配置 title

详见：[umijs.org/zh/plugin/u…](https://umijs.org/zh/plugin/umi-plugin-react.html)

### [webpack@4](https://medium.com/webpack/webpack-4-released-today-6cdb994702d4) + [babel@7](https://babeljs.io/blog/2018/08/27/7.0.0) + ...

趁 umi@2 的机会，我们把主要依赖度升级到了最新，除了 webpack@4 和 babel@7，还有 less@3、postcss@7、typescript@3 等，以及带来相关的构建性能提升。

同时，我们用了 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 来扩展 webpack 配置，这是相比之前的 `webpack.config.js` 更为稳妥的方案。

比如：

```
export default {
  chainWebpack(config, { webpack }) {
    // 设置 alias
    config.resolve.alias.set('a', 'path/to/a');

    // 删除进度条插件
    config.plugins.delete('progress');
  },
}

```

### `umi generate`

umi@2 支持 `umi generate`（`umi g`） 命令快速生成文件，

```
$ umi g page index

```

同时 `umi generate` 是可被扩展的，比如 umi-plugin-dva 就基于此扩展了 `dva:model` 等文件的快速生成。

### 其他改进

- 支持通过 `.env` 和 `.env.local` 配置环境变量
- 约定式路由支持通过 `yaml` 格式的注释扩展路由信息
- 改进 umi dev 404 页面
- 基于 react-loadable 实现 umi/dynamic
- umi test，允许指定测试文件，以及透传参数给 jest-cli
- umi test 支持 webpack 别名
- umi dev 支持配置 https 证书
- umi dev 提取样式，然后利用 css-hot-loader 做热更新，和 umi build 保持一致
- 默认开启 [es5ImcompatibleVersions](https://github.com/umijs/es5-imcompatible-versions)
- 删除性能消耗大户 case-sensitive-paths-webpack-plugin
- 添加 webpack alias `@`，指向 src 目录
- 优先使用本地的 umi 运行

## 快速上手

入门 umi 很简单，

```
# 安装
$ yarn global add umi # 或者 npm install -g umi

# 新建应用
$ mkdir myapp && cd myapp

# 新建页面
$ umi generate page index

# 本地开发
$ umi dev

# 构建上线
$ umi build

```

详见：[umijs.org/zh/guide/ge…](https://umijs.org/zh/guide/getting-started.html)，也可以观看 [10 分钟入门 umi 视频版](https://www.youtube.com/watch?v=vkAUGUlYm24)。

## 升级到 umi@2

目前，antd 社区的 [antd-pro](https://github.com/ant-design/ant-design-pro) 和 [antd-admin](https://github.com/zuiidea/antd-admin) 都已升级到 umi@2，之前 umi@1 的项目可参考[文档](https://umijs.org/zh/guide/migration.html)或[视频](https://youtu.be/1mvKzFLLBck)进行升级。


作者：云谦
链接：https://juejin.cn/post/6844903668634877966
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。