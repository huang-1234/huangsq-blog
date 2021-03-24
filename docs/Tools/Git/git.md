# Git简单使用

## 什么是git

　　Git(读音为/gɪt/),是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。
　　Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

　　优点：
1. 　适合分布式开发，强调个体。
2. 　公共服务器压力和数据量都不会太大。
3. 　速度快、灵活。
4. 　任意两个开发者之间可以很容易的解决冲突。
5. 　离线工作。
[成为Git专家](https://www.progit.cn/)
## 上传项目到git的操作流程

### 　　1.本地安装Git

　　 这个步骤网上教程很多

　　 可参考：https://jingyan.baidu.com/article/9f7e7ec0b17cac6f2815548d.html

### 　　2.进入你想上传的项目文件夹下，然后右键点击

　　 Git Bash Here

### 　　3.配置你的用户名及邮箱

　　$ git config --global user.name "xxx"

　　$ git config --global user.email "xxx"

### 　　4.查看用户名及邮箱

　　$ git config user.name

　　$ git config user.email

### 　　5.初始化本地环境，把该项目变成可被git管理的仓库

　　$ git init

### 　　6.添加该项目下的所有文件

　　$git add .  （注意这里有个点）

### 7.使用如下命令将文件添加到仓库中去

　　$ git commit -m '本次提交的说明'（说明信息为必填项，最好是信息有意义，便于后期理解）

### 　　8.在远程端创建一个仓库（此处省略）

　　 具体怎么创建，很简单，自己摸索或者百度

### 　　9.将本地代码库与远程代码库相关联

　　$ git remote add origin https://gitee.com/qlqaq/projects/仓库名称

### 　　10.强制把远程仓库的代码跟新到当前分支上面。ps:如果仓库为空这一步可以跳过

　　$ git pull --rebase origin master

### 　　11.将本地代码推送到指定远程的仓库中

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

# 一些使用Git时出现的问题

## Everything up-to-date

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

### …or create a new repository on the command line



```git
echo "# MyvuePressBlog" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:huang-1234/MyvuePressBlog.git
git push -u origin main
```