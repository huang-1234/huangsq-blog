# npm And yarn

```js
yarn init --yes # 简写 -y
npm init --yes # 简写 -y
```

### 添加项目依赖/开发依赖

```js
yarn add <package...> [--dev/-D] //不带-D默认生产环境
yarn add [package]@[version] #带版本

npm install XXX --save 可以简写成npm i XXX -S --------> 安装项目依赖
npm install XXX --save-dev可以简写成npm i XXX -D ------> 安装开发依赖
```

查看源和换源

```js
npm config get registry  // 查看npm当前镜像源
npm config set registry https://registry.npm.taobao.org/  // 设置npm镜像源为淘宝镜像

yarn config get registry  // 查看yarn当前镜像源
yarn config set registry https://registry.npm.taobao.org/  // 设置yarn镜像源为淘宝镜像

镜像源地址部分如下：
npm --https://registry.npmjs.org/
cnpm --https://r.cnpmjs.org/
taobao --https://registry.npm.taobao.org/
```

### 全局安装一个依赖

```js
yarn global add [package]
npm install [package] -g
```

### 移除一个依赖

```js
yarn remove <packageName>
npm uninstall <packageName> -S
```

### 全局删除一个依赖

```js
yarn global remove <packageName>
npm uninstall -g <packageName>
```

### 安装所有依赖包
```js
yarn
npm i
```

### 升级依赖
```js
yarn upgrade # 升级所有依赖项，不记录在 package.json 中
npm update # npm 可以通过 ‘--save|--save-dev’ 指定升级哪类依赖

yarn upgrade webpack # 升级指定包
npm update webpack --save-dev # npm

yarn upgrade --latest # 忽略版本规则，升级到最新版本，并且更新 package.json
```

运行脚本
```js
yarn run

npm run
```

### 列出全局安装的所有依赖
```js
yarn global list --depth=0    # 限制依赖的深度

npm list -g --depth=0
```

缓存清理
```js
yarn cache clean
npm cache clean --force
```

### 查看依赖所有历史版本
```js
yarn info <package...>
npm v <package...> versions  //缩写
```

# yarnCommand

## npm常用命令区别

npm常用命令的区别：

npm i 是npm install的缩写
module_name是需要安装的模块名称
所安装的模块都会在项目的node_modules目录下

## npm i 的安装方式：

```
npm i module_name 　　　　　　　　     # 安装模块到项目目录下
npm i module_name -g 　　　　　　      # -g 的意思是将模块安装到全局，
# 具体安装到磁盘哪个位置，要看 npm config prefix 的位置
npm i module_name -S(-save) 　　　 　# 运行时依赖--save 的意思是将模块安装到项目目录下，
并在package.json文件的dependencies（运行依赖）节点写入依赖
npm i module_name -D(--save-dev)　  # 开发时依赖--save-dev 的意思是将模块安装到项目目录下，
并在package.json文件的devDependencies（开发依赖）节点写入依赖
```

具体说明如下：

`npm i ``module_name`

会把moudule_name包安装到node_modules目录中
**不会修改package.json，也就是不会将模块写入dependencies和devDependencies中**
运行 npm i 初始化项目时，不会自动安装该moudule_name（模块）

`npm i module_name -g`

安装模块到全局，不会在项目node_modules目录中保存模块包
**不会将模块依赖写入dependencies或devDependencies 节点**
运行 npm i 初始化项目时，不会自动安装该moudule_name（模块）

`npm i ``module_name ``-S`

会把moudule_name包安装到node_modules目录中
**会在package.json的dependencies属性下添加moudule_name**
运行 npm i 初始化项目时，会自动安装moudule_name到node_modules目录中
之后运行npm i --production或者注明NODE_ENV变量值为production时，
会自动安装moudule_name到node_modules目录中，即是在线上环境运行时会将包安装

`npm i ` `module_name ` `–D`

会把moudule_name包安装到node_modules目录中
**会在package.json的devDependencies属性下添加moudule_name**
之后运行npm i命令时，会自动安装moudule_name到node_modules目录中
之后运行npm i –production或者注明NODE_ENV变量值为production时，不会自动安装moudule_name到node_modules目录中

**使用原则:**
devDependencies 节点下的模块是我们在开发时需要用的，比如项目中使用的 gulp ，压缩css、js的模块。
这些模块在我们的项目部署后是不需要的，所以我们可以使用-D的形式安装。像 emoudule_namepress
这些模块是项目运行必备的，应该安装在 dependencies 节点下，所以我们应该使用-S的形式安装。

**总结为一句话：运行时需要用到的包使用–S，否则使用–D。**

```js
nodejs配置与命令
配置
第一步
第二步
命令
eggjs安装
electron安装
常用包
安装node_modules缺失的包
配置
第一步
在node安装的文件夹【X:\xxx\nodejs】下创建两个文件夹【node_global】及【node_cache】

第二步
设置环境变量：
1、“我的电脑”-右键-“属性”-“高级系统设置”-“高级”-“环境变量”
2、在【系统变量】下新建【NODE_PATH】，输入【X:\xxx\nodejs\node_global\node_modules】，
将【用户变量】下的【Path】修改为【X:\xxx\nodejs\node_global】
3、手动更改“C:\Users\Administrator.npmrc”文件
prefix=X:\XX\nodejs\node_global
cache=X:\XX\nodejs\node_cache
```

命令
```js
命令|代码
-|:-:|-:
查看所有全局安装模块|	npm list -g --depth 0
查看配置	|npm config ls
设置全局安装路径|	npm config set prefix “X:\xxx\nodejs\node_global”
设置缓存路径	|npm config set cache “X:\xxx\nodejs\node_cache”
nodejs升级|	npm i -g n stable --force
npm升级	|npm install -g npm
npm改为获取淘宝镜像	|npm config set registry https://registry.npm.taobao.org
npm改国内包镜像|	npm config set registry http://registry.cnpmjs.org
yarn设置全局安装路径|	yarn config set global-folder “D:\Program Files (x86)\Yarn\global”
yarn设置缓存路径|	yarn config set cache-folder “D:\Program Files (x86)\Yarn\cache”
yarn设置下载源|	yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
yarn查看bin的当前位置|	yarn global bin
yarn查看全局安装位置|	yarn global dir
```
安装|cnpm	npm install -g cnpm --registry=https://registry.npm.taobao.org
安装|electron
（桌面应用开发工具）|	cnpm install electron -g
eggjs安装
先安装 |npm i -g egg-init
再初始化| npm init egg --type=simple

electron安装
此时可以手动下载平台包：https://npm.taobao.org/mirrors/electron/，里面有electron所以版本和平台的二进制包。
如在windows平台10.1.4版本，则下载在10.1.4目录下electron-v10.1.4-win32-x64.zip。

下载完成之后，将其解压到node_modules/electron下的dist文件夹（需要手动创建），然后在node_modules/electron
建立一个path.txt文件。在windows平台下，path.txt文件的内容是electron.exe，编辑保存后，即可在当前工程下引用electron了。
1
常用包
包命	备注
npm、cnpm、yarn	包管理工具
eggjs、koa2、express	服务端框架
request、superagent	网络请求
swiper	内容滑动插件
fs-extra	文件管理
electron	桌面应该程序
image、canvas、sharp	图片处理
cheerio	抓取页面模块
安装node_modules缺失的包
npm install --ignore-scripts=false --verbose

## 安装包的区别

首先看下这个表现：

```bash
13770@HSQ MINGW64 /g/Study/Code/Web/learnFrontTest/Webpack/xc-cli (master)
$ npm i
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: xc-cli@1.0.0
npm ERR! Found: webpack@3.12.0
npm ERR! node_modules/webpack
npm ERR!   dev webpack@"^3.10.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer webpack@"^4.0.0 || ^5.0.0" from file-loader@6.2.0
npm ERR! node_modules/file-loader
npm ERR!   peer file-loader@"*" from url-loader@0.6.2
npm ERR!   node_modules/url-loader
npm ERR!     dev url-loader@"^0.6.2" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See F:\JS_SoftWare\node.js\node_cache\eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     F:\JS_SoftWare\node.js\node_cache\_logs\2021-07-11T01_19_38_135Z-debug.log

13770@HSQ MINGW64 /g/Study/Code/Web/learnFrontTest/Webpack/xc-cli (master)
$ yarn
yarn install v1.22.10
info No lockfile found.
[1/4] Resolving packages...
warning babel-core > babel-register > core-js@2.6.12: core-js@<3.3 is no longer maintained and not recommended for usage due to the number of
issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Please, upgrade your dependencies to the actual version of core-js.
warning babel-core > babel-runtime > core-js@2.6.12: core-js@<3.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Please, upgrade your dependencies to the actual version of core-js.
warning babel-polyfill > core-js@2.6.12: core-js@<3.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Please,
upgrade your dependencies to the actual version of core-js.
warning css-loader > cssnano > autoprefixer > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other
tools.
warning css-loader > cssnano > postcss-merge-rules > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
warning css-loader > cssnano > postcss-merge-rules > caniuse-api > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0
config used in other tools.
warning extract-text-webpack-plugin@3.0.2: Deprecated. Please use https://github.com/webpack-contrib/mini-css-extract-plugin
warning html-webpack-plugin@2.30.1: out of support
warning less > request > har-validator@4.2.1: this library is no longer supported
warning less > request > hawk@3.1.3: This module moved to @hapi/hawk. Please make sure to switch over as this distribution is no longer supported and may contain bugs and critical security issues.
warning less > request > hawk > hoek@2.16.3: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid
support is available for older versions (hapi.im/commercial).
warning less > request > hawk > cryptiles@2.0.5: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid support is available for older versions (hapi.im/commercial).
warning less > request > hawk > boom@2.10.1: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid
support is available for older versions (hapi.im/commercial).
warning less > request > hawk > cryptiles > boom@2.10.1: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid support is available for older versions (hapi.im/commercial).
warning less > request > hawk > boom > hoek@2.16.3: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid support is available for older versions (hapi.im/commercial).
warning less > request > hawk > sntp@1.0.9: This module moved to @hapi/sntp. Please make sure to switch over as this distribution is no longer supported and may contain bugs and critical security issues.
warning less > request > hawk > sntp > hoek@2.16.3: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid support is available for older versions (hapi.im/commercial).
warning webpack > watchpack > watchpack-chokidar2 > chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
warning webpack > node-libs-browser > url > querystring@0.2.0: The
warning webpack > watchpack > watchpack-chokidar2 > chokidar > fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
warning webpack > watchpack > watchpack-chokidar2 > chokidar > braces > snapdragon > source-map-resolve > urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
warning webpack > watchpack > watchpack-chokidar2 > chokidar > braces > snapdragon > source-map-resolve > resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
warning webpack-dev-server > chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
[2/4] Fetching packages...
info fsevents@2.3.2: The platform "win32" is incompatible with this module.
info "fsevents@2.3.2" is an optional dependency and failed compatibility check. Excluding it from installation.
info fsevents@1.2.13: The platform "win32" is incompatible with this module.
info "fsevents@1.2.13" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
warning " > url-loader@0.6.2" has unmet peer dependency "file-loader@*".
[4/4] Building fresh packages...
success Saved lockfile.
Done in 272.28s.
```

