# 前端包管理工具

- [1 npm(Node Package Manager )](https://lzw.me/a/fe-node-package-manager.html#1 npm(Node Package Manager ))
- [2 cnpm](https://lzw.me/a/fe-node-package-manager.html#2 cnpm)
- 3 yarn
  - [3.1 yarn pnp(Plug’n’Play, 即插即用)](https://lzw.me/a/fe-node-package-manager.html#3.1 yarn pnp(Plug’n’Play, 即插即用))
  - [3.2 如何使用 yarn pnp?](https://lzw.me/a/fe-node-package-manager.html#3.2 如何使用 yarn pnp?)
- 4 pnpm（performant npm）
  - 4.1 pnpm 常用命令简介
    - [4.1.1 项目初始化](https://lzw.me/a/fe-node-package-manager.html#4.1.1 项目初始化)
    - [4.1.2 依赖安装与管理](https://lzw.me/a/fe-node-package-manager.html#4.1.2 依赖安装与管理)
    - [4.1.3 依赖审查](https://lzw.me/a/fe-node-package-manager.html#4.1.3 依赖审查)
    - [4.1.4 scripts 脚本执行](https://lzw.me/a/fe-node-package-manager.html#4.1.4 scripts 脚本执行)
    - [4.1.4 store 管理](https://lzw.me/a/fe-node-package-manager.html#4.1.4 store 管理)
- [5 总结与参考](https://lzw.me/a/fe-node-package-manager.html#5 总结与参考)

前端包管理工具面临的主要难题，面对项目庞大的 npm 包依赖链，如何快速安全稳定的进行安装和管理。

## 1 npm(Node Package Manager )

npm 是针对 Node.js 的遵循 CommonJS 包规范实现的包管理器。正是 npm 的出现使得 Node.js 社区的开放性变得简单且发展迅速。开发一个遵循 CommonJS 规范的 npm 包相当简单，而只需要注册一个 npm 账号即可简单的将其发布并共享出去。

**npm 的使用效率问题**

npm 具有成熟稳定的特性，但因其基本工作原理，存在依赖安装慢、依赖引用慢等效率问题，使得大型项目的开发体验相当糟糕。主要原因是存在大量的磁盘 IO 操作：

- 依赖安装时，需要生成 node_modules 目录，大量的文件复制使得安装效率低下
- 运行时，Node 模块解析需要大量的文件 stat 和目录读取与遍历以确定依赖的定位与解析

## 2 cnpm

cnpm是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。
cnpm 主要是通过 npm 镜像服务的方式解决在国内访问与下载 npm 包过慢的问题。

cnpm 默认使用 [npminstall – Make `npm install` fast and easy](https://github.com/cnpm/npminstall) 执行依赖安装(`cnpm install`)。`npminstall` 声称其灵感来源于 `pnpm`，拥有和 `pnpm` 类似的存储架构。

```
npm i -g cnpm --registry=https:``//registry``.nlark.com``cnpm -``v
```

## 3 yarn

yarn 的主要执行步骤参考如下：

- 依赖版本解析并下载对应版本依赖压缩文件(.tar.gz)至本地离线镜像目录（若文件已存在则不下载）
- 从离线镜像目录解压至本地缓存目录
- 从缓存目录复制至当前目录的 node_modules 目录中
- 生成 `yarn.lock` 版本锁定文件。后续安装根据 `yarn.lock` 和 `package.json` 的变化决定是否需要重新执行依赖更新

yarn 基于离线镜像、缓存目录以及 `yarn.lock` 版本锁定等策略实现对包依赖的管理，其核心是利用各种缓存策略，尽量的避免不必要的网络请求和 IO 操作。

```
npm i -g yarn``yarn -``v
```

### 3.1 yarn pnp(Plug’n’Play, 即插即用)

pnp(Plug’n’Play) 是 yarn 在 2018年9月推出的一种 npm 包安装管理策略。
yarn pnp 不再使用 node_modules：不复制文件，而是生成 `.pnp.js` 文件，记录依赖在缓存中的具体位置。

### 3.2 如何使用 `yarn pnp`?

安装最新的 yarn 版本，并在 `package.json` 文件中添加如下内容即可：

```
{`` ``"installConfig"``: {``  ``"pnp"``: ``true`` ``}``}
```

之后执行 `yarn install` 则会采用 pnp 模式。

此外，也可以使用 `yarn install --pnp` 命令，它会在 `package.json` 中帮你添加以上内容。

最后，别忘记了在 `.gitignore` 文件中添加 `.pnp.*` 以忽略 pnp 相关的文件。

`yarn pnp` 的开启是非常简单的，难点在于启用后不再使用 node_modules 这种模块查找机制后，实现对新的 npm 模块解析机制的支持。

使用当前的流行构建工具如 webpack、vite 等流行构建工具，大多数场景下均可开箱即用的支持 `yarn pnp`。它们对 yarn pnp 的支持主要依赖于 [resolve](https://yarnpkg.com/en/package/resolve)、 [enhanced-resolve](https://yarnpkg.com/en/package/enhanced-resolve)、[ts-loader](https://yarnpkg.com/en/package/ts-loader) 等第三方包提供的 Node 模块解析能力。

需注意的是，`yarn pnp` 在 windows 上的支持并不是太好，在某些场景下甚至无法使用。

## 4 pnpm（performant npm）

从名字就可以看出，pnpm 的目标是实现为高性能的 Node.js 包管理器。pnpm 的核心也是围绕如何避免 `node_modules` 目录生成产生的 IO 瓶颈。

pnpm 主要利用 hard link 硬链接机制，在全局目录（默认为 `${os.homedir}/.pnpm-store`）存储(`files`目录下)并维护(`metadata`目录下)依赖文件的信息，这样可以保证所有下载的依赖文件只有一份真实的磁盘存储。

在生成 `node_modules` 目录时，使用 `symlink` 软连接方式生成相关目录和文件结构。这样就避免了复制文件导致的磁盘 IO 性能问题。

`pnpm` 生成的软连接模式的 `node_modules` 目录结构在大多数场景下均实现可良好的支持。但仍然有一些兼容性问题（主要是在 windows 上）。由于软连接的限制，如 Electron 应用无法使用 pnpm。

```
npm i -g pnpm``pnpm -``v
```

### 4.1 pnpm 常用命令简介

在项目中使用 pnpm 的方法和使用 yarn、npm 等并没有太大的区别，以下对 pnpm 的常用命令及作用简介。

#### 4.1.1 项目初始化

```
pnpm init
```

和 `yarn init`、`npm init` 类似，不同的是，当项目目录中已经存在 `package.json` 文件时，pnpm 会尝试修正和补充完善其中的字段配置。

#### 4.1.2 依赖安装与管理

```
# install``pnpm ``install``pnpm i` `# 添加依赖(dependencies)``pnpm add <name>``pnpm add -P <name>``# 添加依赖(全局)``pnpm add -g <name>``# 添加依赖(devDependencies)``pnpm add -D <name>``# 添加依赖(optionalDependencies)``pnpm add -O <name>``# 添加依赖(peerDependencies)``pnpm add --save-peer <name>` `# 依赖移除``pnpm remove <name>``pnpm ``rm` `<name>` `# 依赖清理：移除不再有效的依赖``pnpm prune` `# 依赖版本更新``pnpm update``pnpm up` `# 依赖重建``pnpm rebuild``pnpm rb
```

依赖真实安装的位置为 `<用户主目录>/.pnpm-store` 下，在项目目录下的 `node_modules` 中只创建对依赖包的软连接，因此相同的依赖文件在磁盘中只有一份，依赖重复安装的速速大幅提高。
在 windows 下由于跨盘符的软连接会存在一些异常问题，依赖真实安装的目录默认为当前盘符的根目录，如： `E:\.pnpm-store`。

#### 4.1.3 依赖审查

```
# Checks for known security issues with the installed packages``pnpm audit` `# Print all the versions of packages that are installed, as well as their dependencies, in a tree-structure``pnpm list``pnpm ``ls` `# Check for outdated packages``pnpm outdated
```

#### 4.1.4 `scripts` 脚本执行

对 `package.json` 中的 `scripts` 脚本执行，支持的能力基本与 npm 一致。

```
# 执行一个在当前项目下可用的 shell 命令，比如执行安装目录下的 exlint``pnpm ``exec` `eslint` `# 执行 scripts 中定义的脚本命令，如 dev``pnpm run dev` `# 与 npm 一样，对可省略 run 的命令支持：``pnpm start``pnpm ``test``pnpm t` `# 打印当前项目下有效的 node_modules 目录路径。-g 参数则指定全局有效的目录路径``pnpm root [-g]` `# 其他``pnpm publish``pnpm pack
```

#### 4.1.4 `store` 管理

```
# Adds new packages to the pnpm store directly. Does not modify any projects or files outside the store``pnpm store add` `# Removes unreferenced (extraneous, orphan) packages from the store``pnpm store prune` `# Checks for modified packages in the store``pnpm store status
```

## 5 总结与参考

`npm` 作为 Node.js 最早的包管理器，所有基于 Node.js 的第三方包均遵从其标准实现，在各种系统环境下均具有天然的良好支持能力。
`yarn` 通过缓存策略尽可能的避免不必要的操作，一定程度上提升了依赖安装的体验。
`yarn pnp` 和 `pnpm` 则从依赖生成和模块查找方面下手设计新的案，解决从磁盘 IO 这个导致性能问题的主要原因。其各自采用的方案解决了磁盘 IO 的性能问题，但也带来了兼容性的问题，需在使用时特别注意。

基于以上介绍与对比，我们的建议是：

- 大多数场景下都可以安全地使用 `yarn`；
- 满足兼容性等条件的情况下，建议优先使用 `pnpm` 或 `yarn pnp`。

**扩展参考**

- https://classic.yarnpkg.com/en/docs/pnp
- https://www.yarnpkg.cn/features/pnp
- [Yarn Plug’n’Play可否助你脱离node_modules苦海?](https://juejin.cn/post/6844903814038831118)
- https://www.npmjs.com/package/yarn
- https://www.npmjs.com/package/cnpm
- https://www.npmjs.com/package/npminstall
- https://www.npmjs.com/package/pnpm