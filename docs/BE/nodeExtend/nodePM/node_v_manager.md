# node 版本管理


## nvm

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


## 关于在 zsh 终端下面无法使用 nvm 管理工具的问题

### Mac 新版本安装 nvm 之后，出现 nvm command not found 的问题

> `Mac` 安装 `nvm` 之后，执行 `source ~/.bash_profile`，当前终端可以使用 `nvm`，新 `tab` 或者退出重新打开，还是不能使用 `nvm`，还得再次执行 `source ~/.bash_profile`，才可以使用 `nvm`。

### 原因

`Mac` 新版本中终端是 `zsh`，所以使用 `.bash_profile` 文件之后，不会生效，需要使用 `zsh` 的文件才行。

### 解决

1. `cd ~`
2. `touch .zshrc`
3. 打开 `.zshrc` 文件
4. 写入如下代码

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
复制代码
```

1. 保存
2. `source ~/.zshrc`
3. 退出终端，重新打开，使用 `nvm` 命令即可

确实能够解决问题



其中有一个关于 source 的命令

# Linux中source命令的用法

## source命令：

**source命令也称为“点命令”，也就是一个点符号（.）。source命令通常用于重新执行刚修改的初始化文件，使之立即生效，而不必注销并重新登录。**

**用法： **
 source filename 或 . filename
 source命令除了上述的用途之外，还有一个另外一个用途。在对编译系统核心时常常需要输入一长串的命令，如：
 make mrproper
 make menuconfig
 make dep
 make clean
 make bzImage
 …………

如果把这些命令做成一个文件，让它自动顺序执行，对于需要多次反复编译系统核心的用户来说会很方便，而用source命令就可以做到这一点，它的作用就是把一个文件的内容当成shell来执行，先在linux的源代码目录下（如/usr/src/linux-2.4.20）建立一个文件，如make_command，在其中输入一下内容：
 make mrproper &&
 make menuconfig &&
 make dep &&
 make clean &&
 make bzImage &&
 make modules &&
 make modules_install &&
 cp arch/i386/boot/bzImage /boot/vmlinuz_new &&
 cp System.map /boot &&
 vi /etc/lilo.conf &&
 lilo -v

文件建立好之后，每次编译核心的时候，只需要在/usr/src/linux-2.4.20下输入：
 source make_command
 即可，如果你用的不是lilo来引导系统，可以把最后两行去掉，配置自己的引导程序来引导内核。

顺便补充一点，&&命令表示顺序执行由它连接的命令，但是只有它之前的命令成功执行完成了之后才可以继续执行它后面的命令。

**source filename 与 sh filename 及./filename执行脚本的区别在那里呢？**
 1.当shell脚本具有可执行权限时，用sh filename与./filename执行脚本是没有区别得。./filename是因为当前目录没有在PATH中，所有"."是用来表示当前目录的。
 2.sh filename 重新建立一个子shell，在子shell中执行脚本里面的语句，该子shell继承父shell的环境变量，但子shell新建的、改变的变量不会被带回父shell，除非使用export。
 3.source filename：这个命令其实只是简单地读取脚本里面的语句依次在当前shell里面执行，没有建立新的子shell。那么脚本里面所有新建、改变变量的语句都会保存在当前shell里面。

**举例说明：**
 1.新建一个test.sh脚本，内容为:A=1
 2.然后使其可执行chmod +x test.sh
 3.运行sh test.sh后，echo $A，显示为空，因为A=1并未传回给当前shell
 4.运行./test.sh后，也是一样的效果
 5.运行source test.sh 或者 . test.sh，然后echo $A，则会显示1，说明A=1的变量在当前shell中

# nvm 设置 nodejs 默认版本

windows 系统的版本管理软件是nodist

mac系统的node版本管理根据是nvm  

每次重启vscode软件后，nvm ls 看到的默认版本都会恢复到v5.5

使用以下命令可以改变默认的版本：nvm alias default v4.3.0  这样就不用每次都切换版本了

 

nvm 安装： [转载](https://www.jianshu.com/p/01bbd7bf64a7)

点击跳转([nvm项目的github地址](https://github.com/creationix/nvm)) ，找到install script的地方，然后复制，在终端粘贴运行。

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

根据终端的提示

> => Profile not found. Tried ~/.bashrc, ~/.bash_profile, ~/.zshrc, and ~/.profile.
>
> => Create one of them and run this script again

1.于是使用vim 创建一个~/.bash_profile文件

> JasonLamdeMacBook-Pro:~ jasonlam$ vim ~/.bash_profile

2.将vim切换至insert状态后，写入所给脚本，然后:wq退出

> export NVM_DIR="$HOME/.nvm"
>
> [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
>
> [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 
>
> :wq

重新启动终端,输入nvm --version会显示版本号即安装成功！！！

# 三、Mac下使用nvm安装node、npm(cnpm) 以及 nvm的常用指令：

------

## nvm 常用命令

● nvm install stable 安装最新稳定版 node

● nvm install <version> 安装指定版本，如：安装v4.4.0，nvm install v4.4.0

● nvm uninstall <version> 删除已安装的指定版本，语法与install类似

● nvm use <version> 切换使用指定的版本node

● nvm ls 列出所有安装的版本

● nvm alias default <version> 如： nvm alias default v11.1.0

