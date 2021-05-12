# npm的依赖与版本

在日常开发中我们使用中心化的`package.json`配置文件来维护项目的配置信息（比如名称、版本、许可证等元数据）以及依赖模块

## 依赖类型

目前支持以下5种

- `dependencies`
- `devDependencies`
- `peerDependencies`
- `optionalDependencies`
- `bundledDependencies`/`bundleDependencies`

示例

```
{
  "name": "quanerp-pc-v4",
  "version": "4.0.0",
  "private": true,
  "dependencies": {
    "react": "^16.13.0",
    "rxjs": "^6.5.4"
  },
  "devDependencies": {
    "cross-env": "^7.0.2",
    "eslint": "^6.8.0",
    "mockjs": "^1.1.0",
  },
  "peerDependencies": {},
  "optionalDependencies": {},
  "bundledDependencies": [],
}
```

### dependencies

> 运行项目的依赖，打包发布后执行所需要的

```
npm install packageName --save
# 或者
npm install packageName -S
```

### devDependencies

> 开发模式下的依赖，只应用于开发环境，打包后的文件中不包含

```
npm install packageName --save-dev
# 或者
npm install packageName -D
```

### peerDependencies

> 同等（同伴）依赖

第一次见到的时候我也懵懵的，从字面意思上很难理解

它的作用我们来举个栗子说明

我写了个npm包[vue-element-utils](https://www.npmjs.com/package/vue-element-utils)它的作用是对 element-ui 做了一些自定义指定的拓展工具，如果我在没有下载安装 element-ui 之前就使用那么就会报错。

这里我们给`peerDependencies`加入 element-ui，它在下载时会判断当前依赖中是否有 element-ui 如果没有则**将声明的依赖安装进来**，如果有则**忽略 peerDependencies 中的声明**

还可以处理核心依赖库被重复下载的问题。

npm v3 中移除了`peerDependencies`，内部做了优化，将依赖的树形结构做了扁平化处理。

npm v3 中，依赖树的生成会尽量的扁平，相应 `peerDependencies` 的行为有所变化。 `peerDependencies` 中声明的依赖，如果项目没有显式依赖并安装，则不会被 npm 自动安装，转而输出 warning 日志

### optionalDependencies

> 如果一个依赖模块可以被使用， 同时你也希望在该模块找不到或无法获取时npm继续运行，你可以把这个模块依赖放到`optionalDependencies`配置中。这个配置的写法和`dependencies`的写法一样，不同的是这里边写的模块安装失败不会导致 npm install 失败。

注意点：`optionalDependencies`中的配置会覆盖`dependencies`中的配置，最好只在一个地方写。

### bundledDependencies/bundleDependencies

> 打包依赖，是一个包含依赖包名的数组对象，在发布时会将这个对象中的包打包到最终的发布包里

执行`npm pack`时，将数组中的声明打包进目标包中

## 依赖版本

### 依赖地狱

通俗而言，“依赖地狱”指开发者安装某个软件包时，发现这个软件包里又依赖不同特定版本的其它软件包。随着系统功能越来越复杂，依赖的软件包越来越多，依赖关系也越来越深，这个时候可能面临版本控制被锁死的风险。

因此，Github 起草了一个具有指导意义的，统一的版本号表示规则，称为[语义化程序版本 Semantic Versioning](https://semver.org/lang/zh-CN/)简称 `semver`。该规则规定了版本号如何表示，如何增加，如何进行比较，不同的版本号意味着什么

### 先行版本

- alpha: 内部版本
- beta: 公测版本
- rc: 即 Release candidate 正式版本的候选版本

### node-semver

npm 和 yarn 中对于依赖库版本的解析也是遵从语义化程序版本规范的，同时增加了版本解析的灵活度，基于[node-semver](https://github.com/npm/node-semver/)引入了`operator`

#### Comparators比较符

默认为`=`

| comparator |                 description                  |
| :--------: | :------------------------------------------: |
|    `<`     |   例如`<2.0.0`，指向**小于**`2.0.0`的版本    |
|    `<=`    | 例如`<=2.0.0`，指向**小于等于**`2.0.0`的版本 |
|    `>`     |   例如`>2.0.0`，指向**大于**`2.0.0`的版本    |
|    `>=`    | 例如`>=2.0.0`，指向**小于等于**`2.0.0`的版本 |
|    `=`     |   例如`=2.0.0`，指向**等于**`2.0.0`的版本    |

#### Intersections交集符

使用空格来连接两个比较符，匹配在交集内的版本号。

例如`vue:>1.0.0 <=1.2.0`，表示匹配 vue 版本处于区间 (v1.0.0, v1.2.0]（数学表示`[`包含，`(`不包含，下面都用这种方式表示）

#### Unions并集符

使用`||`来连接两个比较符，匹配在并集内的版本号。

例如`vue:<1.0.0 || >=2.0.0`，表示 vue 版本处于区间 [v0.0.0, v1.0.0) 和 [v2.0.0, 正无穷]

#### Pre-release tags先行版本号

当`comparator`中的版本号包含先行版本号时，无论`comparator`的类型是什么，**只能匹配同 主版本号.此版本号.修订号**

例如`>=3.1.1-beta.3`只能匹配到区间 [v3.1.1-beta.3, v3.1.2)

#### X-Ranges通配符

使用字符`X`、`x`、`*`来取代版本中的数字，表示本段都可以匹配

例如

- `*`等价于`>=0.0.0`
- `2.x`等价于`>=2.0.0 <3.0.0`
- `3.1.x`等价于`>=3.1.0 <3.2.0`

单独声明版本号时，空白版本段使用`x`来填充，例如：

- `空格` = `*`
- `2` = `2.x.x`
- `2.1` = `2.1.x`

#### Tilde Ranges~

次版本号不为空时，匹配范围只包含**修订号变化**

主版本号不为空，次版本号为空，匹配范围只包含**次版本号变化**

- `~2.1.1` = `>=2.1.1 <2.1.2`
- `~2.1` = `>=2.1.0 <2.2.0`
- `~2` = `>=2.0.0 <3.0.0`
- `~2.1.1-beta.2` = `>=2.1.1-beta.2 <2.1.1`
- `~0` = `>=0.0.0 <1.0.0`

#### Caret Ranges^

匹配与声明中第一个非 0 版本段数字相同的版本

- `^3.1.3` = `>=3.1.3 <4.0.0`
- `^0.4.2` = `>=0.4.2 <0.5.0`
- `^0.0.3` = `>=0.0.3 <0.0.4`

#### 其它版本类型

npm yarn 还支持扩展的版本号声明来支持 git、github 等：

- `http://....`: 指定一个可下载的 url
- `git url`: 指向一个 git 项目路径
- `user/repo`: 指定 github 上某个用户的某个项目
- `tag`: 指向一个 tag commit，建议 tag 名字不要以单词`v`开头，避免与版本号混淆
- `file:path/to/local/file`: 指向本地环境的文件

上面的`git url`，`user/repo`均支持**commit-ish**作为后缀来指向某次提交、某个 tag或某个分支

## 参考资料

- [浅谈npm 的依赖与版本](https://github.com/SamHwang1990/blog/issues/7)
- [Semver(语义化版本号)扫盲](https://juejin.im/post/5ad413ba6fb9a028b5485866)
- [你需要知道的几类npm依赖包管理](https://juejin.im/post/59d2db006fb9a00a5a32230b)

