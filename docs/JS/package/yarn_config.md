# yarn config

## Yarn cache之坑

迫于电脑C盘只是128G的固态，虽然还有1个T的机械空间，但完全没用呀😭。眼看C盘越来越小，没办法开始网上各种搜索，优化C盘的办法。

首先是发现了TreeSize神器，这个能直接看到每个盘下面文件夹的大小，真的是一目了然，强烈推荐。

这个时候就发现了Yarn会在C盘个人目录下面缓存大量的包，发现的时候已经6个G了😭。

下面就介绍一下Yarn提供的几个缓存命令：

### 一、yarn cache dir

运行这个命令会显示出当前缓存目录，默认为C盘。例如我电脑的为

```bash
C:\Users\***\AppData\Local\Yarn\Cache\v4
```



### 二、yarn cache clean [<module_name…>]

运行这个命令会清理缓存包，如果没有指定包名则会全部清理，指定了就清理相关包。
不过要注意，要先清理然后再配置目录，可能会因为配置完目之后，导致之前缓存下来的没法删除。

### 三、yarn config set cache-folder

设置当前缓存目录，例如我指定了缓存目录：

```bash
yarn config set cache-folder G:\YarnCache
```



运行完当然可以再次运行yarn cache dir，来检查下是否配置成功，当然也可以找一个项目运行yarn install来试下。

### 四、同样的道理npm也会在用户目录下面缓存大量的文件，不过比yarn少了很多，只有1个G左右。

```
npm config get cache
npm cache clean --force
npm config set cache "D:\ProgramFile\nodejs\node_modules\node_cache"
npm cache verify：验证清理的有效性
```

### 五、另外一些清理C盘的发现

1. IntellJ以及基于它开发的Webstrom、AndroidStudio也会在个人目录下面缓存大量的配置文件，1-2个G了，所以JetBrains全家桶可以考虑只装一个IntellJ，其他webstrom、pycharm等可以考虑安装插件。
2. window10系统更新完，会在C盘有一个windows.old目录，这个如果系统更新完没有啥问题，过段时间也是可以删除的。

## Yarn yarn.lock文件

为了在多台机器之间获得一致的安装结果，Yarn 可能会需要比 `package.json` 文件中配置的依赖项更多的信息。它需要准确存储每一个依赖项的安装版本。因此在 Yarn 项目的根目录我们需要一个 `yarn.lock` 文件，这个 `yarn.lock` 文件是自动生成的。

当我们执行 `yarn` 命令或者添加依赖包命令后，Yarn 都会在项目根目录下自动生成一个 `yarn.lock` 文件。在使用 Yarn 安装、升级、删除依赖项目时，会自动更新到 `yarn.lock` 文件中。一般我们不会去手动编辑这个文件，因为很容易破坏这个文件。

##### 示例：

例如我们安装了一些依赖包，那么 `yarn.lock` 文件内容类似所示格式：

```
copy-descriptor@^0.1.0:
  version "0.1.1"
  resolved "https://registry.yarnpkg.com/copy-descriptor/-/copy-descriptor-0.1.1.tgz#676f6eb3c39997c2ee1ac3a924fd6124748f578d"
  integrity sha1-Z29us8OZl8LuGsOpJP1hJHSPV40=

core-util-is@~1.0.0:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/core-util-is/-/core-util-is-1.0.2.tgz#b5fd54220aa2bc5ab57aab7140c940754503c1a7"
  integrity sha1-tf1UIgqivFq1eqtxQMlAdUUDwac=

create-ecdh@^4.0.0:
  version "4.0.3"
  resolved "https://registry.yarnpkg.com/create-ecdh/-/create-ecdh-4.0.3.tgz#c9111b6f33045c4697f144787f9254cdc77c45ff"
  integrity sha512-GbEHQPMOswGpKXM9kCWVrremUcBmjteUaQ01T9rkKCPDXfUHX0IoP9LpHYo2NPFampa4e+/pFDc3jQdxrxQLaw==
  dependencies:
    bn.js "^4.1.0"
    elliptic "^6.0.0"
```

可以明显看到 `yarn.lock` 文件中的信息比 `package.json` 文件中详细了很多。

在实际项目中，`yarn.lock` 文件也很有用处，我们可以将 `yarn.lock` 提交到版本库中，其他成员就可以通过 `yarn install `获取所有依赖包，这个可以保证大家安装的依赖是完全一致的，避免产生 `bug`。