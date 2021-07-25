# git 简介和常用命令



## 简介

### 什么是git

　　Git(读音为/gɪt/),是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。
　　Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

　　优点：

1. 　适合分布式开发，强调个体。
2. 　公共服务器压力和数据量都不会太大。
3. 　速度快、灵活。
4. 　任意两个开发者之间可以很容易的解决冲突。
5. 　离线工作。
    [成为Git专家](https://www.progit.cn/)

### 上传项目到git的操作流程

#### 1.本地安装Git

　　 这个步骤网上教程很多

　　 可参考：https://jingyan.baidu.com/article/9f7e7ec0b17cac6f2815548d.html

#### 2.进入你想上传的项目文件夹下，然后右键点击

　　 Git Bash Here

#### 3.配置你的用户名及邮箱

　　$ git config --global user.name "xxx"

　　$ git config --global user.email "xxx"

#### 　　4.查看用户名及邮箱

　　$ git config user.name

　　$ git config user.email

#### 　　5.初始化本地环境，把该项目变成可被git管理的仓库

　　$ git init

#### 　　6.添加该项目下的所有文件

　　$git add .  （注意这里有个点）

#### 7.使用如下命令将文件添加到仓库中去

　　$ git commit -m '本次提交的说明'（说明信息为必填项，最好是信息有意义，便于后期理解）

#### 　　8.在远程端创建一个仓库（此处省略）

　　 具体怎么创建，很简单，自己摸索或者百度

#### 　　9.将本地代码库与远程代码库相关联

　　$ git remote add origin https://gitee.com/qlqaq/projects/仓库名称

#### 　　10.强制把远程仓库的代码跟新到当前分支上面。ps:如果仓库为空这一步可以跳过

　　$ git pull --rebase origin master

#### 　　11.将本地代码推送到指定远程的仓库中

　　$ git push -u origin master



**解决方法共两步**
1、移除
git remote rm origin
2、再次连接
git remote add origin ‘仓库地址’

输入“git remote -v”查看项目远程地址。

输入“git branch -a”查看远程项目所有分支，红颜色分支代表当前所在分支，其他的所列的就是所有分支了。

输入“git log”查看历史提交信息。

输入“git status”检查下修改了什么内容。

输入“git remote show origin”查看当前仓库基本信息。

## 一些使用Git时出现的问题

```git
echo "# MyvuePressBlog" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:huang-1234/MyvuePressBlog.git
git push -u origin main
```



### Everything up-to-date

出现这个问题的原因是git提交改动到缓存，要push的时候不会将本地所有的分支都push掉，所以出现这个问题。我们应该告诉git提交哪个分支。
这里有种特殊的情况是如果你是fork别人的仓库再clone到本地的话，即使git上只有一个主分支，他还是可能出现这个错误。那么我们就需要新建分支提交改动然后合并分支。

接下来先创建一个新分支提交改动

```git
git branch newbranch
然后输入这条命令检查是否创建成功
$ git branch
这时输出
 newbranch
 master
```

这样就创建成功了，前面的*代表的是当前你所在的工作分支。我们接下来就要切换工作分支。
$ git checkout newbranch
这样就切换完了，可以 $ git branch确认下。然后你要将你的改动提交到新的分支上。
$ git add .
$ git commit -a
此时可以 $ git status检查下提交情况。如果提交成功，我们接下来就要回主分支了，代码和之前一样。
$ git checkout master
然后我们要将新分支提交的改动合并到主分支上
$ git merge newbranch
合并分支可能产生冲突这是正常的，虽然我们这是新建的分支不会产生冲突，但还是在这里记录下。下面的代码可以查看产生冲突的文件，然后做对应的修改再提交一次就可以了。
$ git diff
我们的问题就解决了，接下来就可以push代码了。
$ git push -u origin master
新建分支的朋友别忘了删除这个分支
$ git branch -D newbranch
如果想保留分支只是想删除已经合并的部分只要把大写的D改成小写的d就行了。

#### …or create a new repository on the command line



```git
echo "# MyvuePressBlog" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:huang-1234/MyvuePressBlog.git
git push -u origin main
```

### 有图有真相

别害怕，了解git命令之前我们先来看张图吧！

<a target="_blank" href="/images/Tools/Git/git-command.png">
  <img :src="$withBase('/images/Tools/Git/git-command.png')" draggable="ture" alt="git-command"/>
</a>

```html
<body ondragstart="window.event.returnValue=false" oncontextmenu="window.event.returnValue=false" onselectstart="event.returnValue=false">
</body>
```



### 下载安装

从git官网下载安装包，安装完毕后就可以使用命令行的 git 工具，在开始菜单里找到"Git"->"Git Bash"，会弹出 Git 命令窗口，你可以在该窗口进行 Git 相关命令行的操作。

```
具体可参考https://www.runoob.com/git/git-install-setup.html
```

### 全局配置环境

配置个人用户名和电子邮箱

```
git config –globle user.name “runoob”
git config –globle user.email text@runoob.com
```

配置完毕后，可以通过$ git config –list命令查看所有的配置信息。 也可直接查询某个环境变量的信息。

```
git config user.name
git config user.email
```

### 查看工作区状态

```
git status
```

- 状态一：修改了没有添加到缓存区（红色），此时可以通过git diff 查看修改了的内容，“-”号是修改前，“+”号是修改后，第一个加号后修改的前一行。第二个加号是修改的内容。
- 状态二：修改了添加到缓存区（绿色）
- 状态三：On branch master nothing to commit, work tree clean 表明无修改内容

### 添加文件到git仓库

分两步： 把修改的修改添加到版本库里的暂存区，可以单独添加某个文件，可多次使用

```
git add <file>
```

把暂存区的所有内容提交到当前分支，提交的说明一定要写（字符串加双引号）

```
git commit -m <message>
```

将当前分支与远程仓库关联

```git
git remote add origin
```

删除与远程仓库的关联就比较简单了，直接输入以下命令：

```git
$ git remote rm github
```

**注意：** 以上**github** 是远程仓库在本地Git中的名称。就是上面的origin

### 本地同步更新远程分支

```
git pull
```

如果项目是多人合作的，那么就需要在拉去别人更新的代码合并到本地。Git会自动合并本地代码。

### 把缓存中的代码推送到远程分支

```
git push
```

### 撤销修改

- 场景一：修改了文件但是未被add

```
git checkout -- <file>
```

- 场景二：修改了工作区内容，还添加到了暂存区时，想丢弃修改，分两步

```
git reset HEAD <file> 就回到了场景一
git checkout -- <file>
```

- 场景三：修改文件已被commit,但是没有推送到远程库，想要撤销本次提交，只能切换版本

```
git reset --hard HEAD^
```

### 从远程分支拉取项目

```
git clone SSH/HTTPS地址 -b <分支名>
```

### 分支管理

当前分支作业时

```
1)查看分支：git branch
2)创建分支：git branch <name>
3)切换分支：git checkout <name>
4)创建+切换分支：git checkout -b <name>
5)合并某分支到当前分支：git merge <name>
6)删除分支git branch -d <name>
```

临时切换分支作业时

```
1)暂存分支工作状态： git stash
2)查看分支存储的工作状态： git stash list
3)恢复分支工作状态： git stash apply
4)删除分支存储的工作状态：git stash drop
5)恢复并删除分支存储工作状态：git stash pop
```

切换远程分支 ：当前分支branch1工作，现在需要在分支branch2上工作，则需要切换

```
git fetch origin branch2(分支名)
git checkout branch2
```