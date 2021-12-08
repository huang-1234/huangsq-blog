# node 版本管理





## nvm

欢迎您帮忙纠错, 一起帮助更多的人。 一起来学习交流React, QQ群：[413381701](http://shang.qq.com/wpa/qunwpa?idkey=3b9474dacbf35e4a9659e89399758406e510e5b8a3f81109f7d07efaadc6056d)

首发于：[https://github.com/Kennytian/learning-react-native](https://github.com/Kennytian/learning-react-native/blob/master/environment/nvm.md)

### 前言

之前用 npm 安装过 nvm，就以为安装成功了，但运行 nvm 就报如下提示： *This is not the package you are looking for: please go to [http://nvm.sh](http://nvm.sh/)*

### 安装NVM

查资料得出，要使用 curl 或 wget 来安装(版本可以选用官网最新版)：

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

或:

```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

注意：安装完了，重新打开 Terminal(iTerm2) 来重启会话

### 安装 Node.js

#### 最新版

1. 安装最新版 Node.js，命令：`nvm install node`
2. 查看安装效果，命令：`nvm use node`，显示：`Now using node v7.5.0 (npm v4.1.2)`

#### 稳定版（LTS）

1. 安装 LTS 版，命令：`nvm install --lts`
2. 查看安装效果，命令：`nvm list`，显示：

```
   ->    v6.9.5
         v7.5.0
         system
default -> node (-> v7.5.0)
node -> stable (-> v7.5.0) (default)
stable -> 7.5 (-> v7.5.0) (default)
iojs -> N/A (default)
lts/* -> lts/boron (-> v6.9.5)
lts/argon -> v4.7.3 (-> N/A)
lts/boron -> v6.9.5
```

### 切换版本

从上面的安装列表上已经可以看到，我们安装了一个最新版，一个稳定版。分别是：v6.9.5 和 v7.5.0，我们要如何切换不同版本呢？

1. 切换到 v6.9.5，命令：`nvm use v6.9.5`，显示：`Now using node v6.9.5 (npm v3.10.10)`
2. 切换到 v7.5.0，命令：`nvm use v7.5.0`，显示：`Now using node v7.5.0 (npm v4.1.2)`

到这里，我们基本会使用 nvm 了，想用什么版本就可以自由切换。 但如果想玩得更爽一点，就要学习如下一些技巧。

### 使用别名

你肯定也想到，每次输入v6.9.5 好麻烦。并且时间长了，不一定记得住后面是9.5，还是8.6的版本号。

1. 设定 LTS 版别名，命令：`nvm alias 6 v6.9.5`，显示：`6 -> v6.9.5`
2. 设定最新版别名，命令：`nvm alias 7 v7.5.0`，显示：`7 -> v7.5.0`

## 一、NVM是什么？

nvm是node版本管理工具
nvm是让你在同一台机器上安装和切换不同版本的node的工具

### 为什么需要nvm？

作为一个走在潮流前沿的前端开发者，node在一直更新，我们都在紧紧跟随，当你在玩着最新的node版本（写文章的时候官推node版本是v16.8.0），玩得正欢快的时候，你的领导从某个角落里翻出了一个旧项目，让你去维护一下，当你运行项目的时候，你发现，这个旧项目，竟然需要node版本8.X.X的时候，你怎么办？？？你要卸载掉你电脑最新的node，重新安装一个古老的版本吗？\color{red}{显然不能}显然不能，这个时候我们需要的是可以在我们电脑同时存在多个node版本，并且可以随意切换的工具，**nvm闪亮✨登场**

## 二、nvm安装

### 1. 温馨提示，你也可以不听

卸载掉当前安装的node
卸载掉当前安装的node
卸载掉当前安装的node
我曾经因为年少轻狂没卸载，出现node_cache混淆和node版本切换无效的问题
如果还有因为没卸载node出现什么翻车事故的靓仔，请记得来跟我分享一下

### 2. 安装方式

#### window

链接：[github.com/coreybutler…](https://link.juejin.cn/?target=https%3A%2F%2Flinks.jianshu.com%2Fgo%3Fto%3Dhttps%3A%2F%2Fgithub.com%2Fcoreybutler%2Fnvm-windows%2Freleases) **可下载以下版本：**

- nvm-noinstall.zip：绿色免安装版，但使用时需要进行配置。
- nvm-setup.zip：安装版，推荐使用

解压后 nvm-setup.exe 直接傻瓜式一键安装
\color{red}{有坑：记得安装目录不要有特殊符号、中文、空格，比如：C: Program Files，这种目录就要不得}有坑：记得安装目录不要有特殊符号、中文、空格，比如：*C*:*P**r**o**g**r**a**m**F**i**l**e**s*，这种目录就要不得

#### mac

mac的安装相对于window来说，稍微麻烦一丢丢，还受macOS的版本影响，我这里用的是11.2.2，靓仔们要是安装过程有坑，可自行科普一下看看是不是受macOS的版本影响

#### 1. 安装命令：

**

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
复制代码
```

#### 2. 检查安装

```
$ nvm --version
复制代码
```

#### 3. 检查安装的前提是你安装成功了，事实往往不如人意，总会有坑的情况，你可能会遇到以下的？

##### 1. DNS污染报错，拉取nvm的过程中，DNS 解析被污染导致无法正常读取（当然可能还有其他的原因，其他原因暂没了解到，有知道的大佬，请指教）

```
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
复制代码
```

**DNS污染解决方法：**

**1. 去[IPAddress.com](https://link.juejin.cn/?target=https%3A%2F%2Fwww.ipaddress.com)查看真实的ip**

**2. curl -o- [raw.githubusercontent.com/nvm-sh/nvm/…](https://link.juejin.cn/?target=https%3A%2F%2Fraw.githubusercontent.com%2Fnvm-sh%2Fnvm%2Fv0.35.3%2Finstall.sh) | bash命令中拉取的域名是\color{red}{raw.githubusercontent.com}\*r\**a\**w\*.\*g\**i\**t\**h\**u\**b\**u\**s\**e\**r\**c\**o\**n\**t\**e\**n\**t\*.\*c\**o\**m\*，去搜一下，出现下面的结果**

我们找到了解析的ip，有四个，随便拎一个出来（当然运气不好，可能你拎出来那个用不了，你就自己再换一个）

**3. 修改host**

```
$ sudo vim /etc/hosts
复制代码
```

在host里面添加

```
185.199.108.133 raw.githubusercontent.com
复制代码
```

搞完重新再拉取一次试试

##### 2. zsh: command not found: nvm

安装过程没有报错，但是执行`$ nvm --version`提示 zsh: command not found: nvm，小靓仔，环境变量问题，搞一下就好了，莫慌 参考资料：-   [《Mac下配置.bash_profile（环境变量）》](https://link.juejin.cn?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F14f98f4a5667)

## 三、nvm日常使用

### 常用命令

- nvm ls 列出所有安装的版本
- nvm ls-remote 列出所有可安装的版本
- nvm install  安装指定版本，如：安装v4.4.0，nvm install v4.4.0
- nvm install stable 安装最新稳定版 node
- nvm uninstall  删除已安装的指定版本，语法与install类似
- nvm use  切换使用指定的版本node
- nvm alias default  如： nvm alias default v11.1.0
- nvm --help 大招，查看所有帮助命令

### 安装示例

**1. nvm ls**
 我们来用nvm安装一波node吧，先来个nvm ls 查看下当前的版本

简单的解读一下这张图，首先看到我电脑有三个node的版本
 分别是**v8.17.0、v12.18.4、v14.17.4**三个版本
 当前正在使用的版本是v14.17.4   可以通过 ` nvm use <version> ` 切换版本
 默认版本是：v14.17.4   为什么会有这个默认版本的存在？ 通过` nvm use <version> `切换的版本只是临时的，在你关闭终端后，就会恢复默认的版本，如果你想要长时间切换指定版本，那就设置这个默认版本

```
nvm alias default <version>  如： nvm alias default v11.1.0
复制代码
```

**2.  nvm ls-remote**
 如果我们一时半不会不知道安装哪个版本，那我们就来一条

```
nvm ls-remote
复制代码
```

查看下有哪些node版本可以安装的
 我们随便挑一个，直接nvm install vxx.xx.xx，然后安装完后nvm ls 查看会发现已经下载下来了

```
nvm install v11.1.0
nvm ls
复制代码
```

如果我们只是短期在某个项目上用，那就直接nvm use vxx.xx.xx即可，如果长期用，记得设置默认版本

```
nvm alias default <version>  如： nvm alias default v11.1.0
复制代码
```

## 四、坑点记录

### 全局依赖包安装了找不到？

**其实就是nvm切换node版本后，全局的node_modules指向不改变**
 在使用nvm过程中，切换到某个node版本后，在这个版本下安装某个全局包，我们这里以nrm举例子
 **科普：nrm(npm registry manager )是npm的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换**
 如：原本使用的node是12的版本，我闲来无事切换到了14的版本，安装了个nrm，执行nrm的时候，发现报错，提示没有这个依赖。 我们可以通过

```
npm config ls  //查看下npm的配置
复制代码
```

问题来了，如果切换了node版本后，全局依赖安装失败，检查下npm prefix这个配置中的node是否是你当前使用的node版本

切换node版本后，全局安装依赖，安装完后，找不到包
 原因是因为切换node之后，安装全局依赖仍然在原来的版本下，这个时候你不管怎么安装新的依赖，都是安装在以前的全局node_modules下
 **解决方案：**
 我们要把cache和prefix对应修改成我们要的版本

```
npm config set prefix "D:\ProgramFiles\nvm\v版本\node_cache"
npm config set cache "D:\ProgramFiles\nvm\v12.12.0\node_cache"
```

