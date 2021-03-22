## 第一步 使用 yarn 初始化项目



```
$ yarn global add @umijs/create-umi-app
...
success Installed "@umijs/create-umi-app@3.0.16" with binaries:
      - create-umi-app
```

@umijs/create-umi-app 主要是用来使用命令行创建 umi 相关的库或者项目。命令中打印 success 说明安装成功，如果你还需要进一步确认，可以执行 `create-umi-app -v` 来查看 @umijs/create-umi-app 的版本号。

## 第二步 使用 create-umi-app 新建项目

先找个地方建个空目录

```
$ mkdir myapp && cd myapp
```

```
$ create-umi-app
Copy:  .editorconfig
Write: .gitignore
Copy:  .prettierignore
Copy:  .prettierrc
Write: .umirc.ts
Copy:  mock/.gitkeep
Write: package.json
Copy:  README.md
Copy:  src/pages/index.less
Copy:  src/pages/index.tsx
Copy:  tsconfig.json
Copy:  typings.d.ts
```



如果你的命令行打印的日志如上，说明新建项目完成了，如果有其他的错误，可以确认一下当前目录下是否为空。

以上两部也可以合并成一步，在一个空文件夹下面，执行 `yarn create @umijs/umi-app`

## 第三步 安装依赖

```
$ yarn 
...这个过程需要一些时间
success Saved lockfile.
✨  Done in 170.43s.
```

看到命令行打印 success，一般就是安装成功了，但是有时候因为一些网络问题，会出现丢包的情况，需要你重新运行 `yarn` 验证是否全部安装成功。

## 第四步 启动开发服务器

```
$ yarn start
$ umi dev
Starting the development server...

✔ Webpack
  Compiled successfully in 7.21s

 DONE  Compiled successfully in 7216ms                                  14:51:34


  App running at:
  - Local:   http://localhost:8000 (copied to clipboard)
  - Network: http://192.168.10.6:8000
```

你可以通过浏览器访问 http://localhost:8000/ 来查看页面：

## 错误说明

如果，你的表现和上面的不同，你可以通过比对下面两个情况来修正。

\1. 打印如下



```
? message Probably:
  /usr/local/bin/node /Users/xiaohuoni/Documents/***/***/node_module
s/umi/lib/scripts/realDev.js dev (pid 928)
  in /Users/xiaohuoni/***/***/

Would you like to run the app on another port instead? (Y/n)
```



这个问题可能是因为你的其他项目或应用已经占用了 umi 默认的 8000 端口，你只要输入 Y 并回车，umi 将在另一个空闲端口上启动服务，最终访问路径以输出日志为准。



2.提示'create-umi-app' 不是内部或外部命令，也不是可运行的程序或批处理文件。

 需要将 yarn 的 bin 加到环境变量里面。

3. 其他情况

- 可能是 Node.js 版本问题引起的，确认一下你的开发环境。

- 网络问题引起部分依赖安装失败，可能需要科学上网，或者使用国内源，例如 [tyarn](http://npm.taobao.org/package/tyarn)。
# umi官方使用教程

## 环境准备

首先得有 [node](https://nodejs.org/en/)，并确保 node 版本是 10.13 或以上。（mac 下推荐使用 [nvm](https://github.com/creationix/nvm) 来管理 node 版本）

```bash
$ node -v
v10.13.0
```

推荐使用 yarn 管理 npm 依赖，并[使用国内源](https://github.com/yiminghe/tyarn)（阿里用户使用内网源）。

```bash
# 国内源$ npm i yarn tyarn -g# 后面文档里的 yarn 换成 tyarn$ tyarn -v
# 阿里内网源$ tnpm i yarn @ali/yarn -g# 后面文档里的 yarn 换成 ayarn$ ayarn -v
```

## 脚手架

先找个地方建个空目录。

```bash
$ mkdir myapp && cd myapp
```

通过官方工具创建项目，

```bash
$ yarn create @umijs/umi-app# 或 npx @umijs/create-umi-app
Copy:  .editorconfigWrite: .gitignoreCopy:  .prettierignoreCopy:  .prettierrcWrite: .umirc.tsCopy:  mock/.gitkeepWrite: package.jsonCopy:  README.mdCopy:  src/pages/index.lessCopy:  src/pages/index.tsxCopy:  tsconfig.jsonCopy:  typings.d.ts
```

## 安装依赖

```bash
$ yarn
yarn install v1.21.1[1/4] 🔍  Resolving packages...success Already up-to-date.
```

## 启动项目

```bash
$ yarn start
Starting the development server...
✔ Webpack  Compiled successfully in 17.84s
 DONE  Compiled successfully in 17842ms                                       8:06:31 PM

  App running at:  - Local:   http://localhost:8000 (copied to clipboard)  - Network: http://192.168.12.34:8000
```

## 修改配置

默认的脚手架内置了 @umijs/preset-react，包含布局、权限、国际化、dva、简易数据流等常用功能。比如想要 ant-design-pro 的布局，编辑 `.umirc.ts` 配置 `layout: {}`，并且需要安装 `@ant-design/pro-layout`。

```diff
import { defineConfig } from 'umi';
export default defineConfig({+ layout: {},  routes: [    { path: '/', component: '@/pages/index' },  ],});
```

不用重启 `yarn start`，webpack 会在背后增量编译，过一会就可以看到以下界面，

## 部署发布

### 构建

```bash
$ yarn build
✔ Webpack  Compiled successfully in 17.17s
 DONE  Compiled successfully in 17167ms                                       8:26:25 PM
Build success.
```

构建产物默认生成到 `./dist` 下，然后通过 tree 命令查看，

```bash
tree ./dist
./dist├── index.html├── umi.css└── umi.js
```

### 本地验证

发布之前，可以通过 `serve` 做本地验证，

```bash
$ yarn global add serve$ serve ./dist
 Serving!
 - Local:            http://localhost:5000
 - On Your Network:  http://192.168.12.34:5000
 Copied local address to clipboard!
```

访问 [http://localhost:5000](http://localhost:5000/)，正常情况下应该是和执行 `yarn start` 时是一致的。

### 部署

本地验证完，就可以部署了。你需要把 `dist` 目录部署到服务器上。

[Umi基础](https://umijs.org/zh-CN/docs/directory-structure)

