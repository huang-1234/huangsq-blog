## error1 2021年3月20晚上

在git项目中我们提交代码的时候经常遇到这样的报错：

```git
$ git commit -am'some messsage'
fatal: Unable to create '/XXXXXX/.git/index.lock': File exists.

If no other git process is currently running, this probably means a
git process crashed in this repository earlier. Make sure no other git
process is running and remove the file manually to continue.
```

这时候提交会失败。
解决办法是，到.git目录下，删除index.lock文件，就能正常提交了。
那index.lock有什么作用呢？
官方是这么说的：

在进行某些比较费时的git操作时自动生成，操作结束后自动删除，相当于一个锁定文件，目的在于防止对一个目录同时进行多个操作。有时强制关闭进行中的git操作，这个文件没有被自动删除，之后你就无法进行其他操作，必须手动删除。

通俗讲，就是我们在commit的时候，会自动生成一个index.lock文件，操作完成后，会自动删除。如果在commit过程中，产生了意外，比如手动退出了，电脑死机了，断网了等等，导致操作失败，没有自动删除index.lock文件，那么下次再commit的时候，系统不知道你的index.lock没删除，它会傻傻的再去创建index.lock文件，这时候，发现已经目录下已经有一个index.lock文件了，懵逼了，不知道咋处理了，所以抛错给你：

fatal: Unable to create '/XXXXXX/.git/index.lock': File exists.
1
字面意思就是，创建index.lock文件失败，因为File exists：文件已存在。
这就是这个报错的来源。

## 20210329

# error

## fatal: refusing to merge unrelated histories解决

Git :fatal: refusing to merge unrelated histories解决
今天本地创建了一个仓库（有README)，把本地仓库和Github上关联以后，发现git pull，git feach提醒fatal: refusing to merge unrelated histories

![截图示例](git0329.assets/20190830090402218.png)

上网查到原因是两个分支是两个不同的版本，具有不同的提交历史


加一句

$git pull origin master --allow-unrelated-histories
1
可以允许不相关历史提，强制合并，确实解决了这个问题，感谢网友

## git 上传出现“ ! [rejected] master -> master (non-fast-forward)”

参考文章： 
[如何将本地项目上传到码云](https://blog.csdn.net/tiegenz/article/details/79551717) 
[GIT远程仓库地址变更](https://www.cnblogs.com/merray/p/5698331.html) 
[! [rejected\] master -> master (non-fast-forward)（有推荐视频）](https://blog.csdn.net/lujinjian605894472/article/details/8443403) 
在使用Git 配置公司的远程仓库时`git push origin master`，出现以下问题

```
xu:QProj xiaokai$ git push origin master
To https://gitee.com/XXXXX.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://gitee.com/XXXXX.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

从提示语中可以看出是，问题（Non-fast-forward）的出现原因在于：git仓库中已经有一部分代码，所以它不允许你直接把你的代码覆盖上去。于是你有2个选择方式：

1、强推，即利用强覆盖方式用你本地的代码替代git仓库内的内容，如果远程仓库是刚建的，没有代码，可以这样操作，尽量避免这种操作方法。

```
git push -f
```

2、先把git的东西fetch到你本地然后merge后再push

```
$ git fetch
```

```
$ git merge
```

3、在使用的时候，`git merge`，又出现了以下的问题

```
xu:QProj xiaokai$ git merge
fatal: refusing to merge unrelated histories
```

对于这个问题。使用`git pull origin master --allow-unrelated-histories `
来处理一下。

4、然后继续`git merge`,依然有问题

```
fatal: You have not concluded your merge (MERGE_HEAD exists).
Please, commit your changes before you merge.
```

这个就好处理了，是我们没有提交当前的变化， `git add .`,`git commit -am "提交信息"`

然后再来一次`git merge`,然后ok.

5、然后输入`git pull`,显示如下

```
Already up-to-date.
```

最后就可以执行`xu:QProj xiaokai$ git push origin master `
将代码上传到公司的远程仓库中。

```
xu:QProj xiaokai$ git push origin master
Counting objects: 693, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (636/636), done.
Writing objects: 100% (693/693), 2.83 MiB | 570.00 KiB/s, done.
Total 693 (delta 362), reused 0 (delta 0)
remote: Resolving deltas: 100% (362/362), completed with 1 local object.
remote: Powered by Gitee.com
To https://gitee.com/XXXXX.git
   83902a5..8100890  master -> master
```

### ??Git报错解决：OpenSSL SSL_read: Connection was reset, errno 10054 错误解决

**首先，造成这个错误很有可能是网络不稳定，连接超时导致的，
如果再次尝试后依然报错，可以执行下面的命令。*

**打开Git命令页面，执行git命令脚本：修改设置，解除ssl验证**

```
git config --global http.sslVerify "false"
```

此时，再执行git操作即可。

## git比较两个分支的文件的差异

Git diff branch1 branch2 --stat   //显示出所有有差异的文件列表

Git diff branch1 branch2 文件名(带路径)   //显示指定文件的详细差异

Git diff branch1 branch2                   //显示出所有有差异的文件的详细差异

## Git-撤销（回退）已经add，commit或push的提交

本文只阐述如何解决问题，不会对git的各种概念多做介绍，如果有兴趣可以点击下面的链接，进行详细的学习：
Pro Git

本文适用的环境
现在先假设几个环境，本文将会给出相应的解决方法：

1. 本地代码（或文件）已经add但是还未commit；
2. 要回退的commit的代码已经commit了，但是还未push到远程个人repository
3. 要回退的commit的代码已经push到远程的个人分支，但是还未merge到公共的repository
4. 要回退的commit的代码已被merge（合入)到公共的repository

关键的几个命令
git reset [commit]
git revert [commit]

git reset有三个参数soft,mixed,hard分别对应head的指针移动，index（暂存区）、以及工作目录的修改，当缺省时，默认为mixed参数。
git revert与reset的区别是git revert会生成一个新的提交来撤销某次提交，此次提交之前的commit都会被保留，也就是说对于项目的版本历史来说是往前走的。而git reset 则是回到某次提交，类似于穿越时空。

相应的解决方法
1、 对于上面的前两种情况，我们可以直接使用git reset命令。根据需要的不同使用，不同的参数。但是要注意1.

git reset –hard

是一个危险的命令,他是git少数几个会销毁数据的命令之一，如果你不小心放了错，你也许可以使用

git reflog

命令来找回你的数据。
2、 对于第三种情况，如果你的远程分支只有你一个人用的话，那么可以在先使用git reset [commit]回退，如何使用git push -f [commit]来强制更新你的远程库2

3、 对于最后一种情况，考虑到其他人的版本历史，使用git reset [commit]是不建议的，此时我们应该使用git revert [commit]改命令不会修改之前的提交历史，相当于对数据做了一次逆操作，然后再执行add，commit等命令。

总结
对于前三种情况，虽然git revert也适用，但是如要要保持版本历史干净的话，建议还是用 git reset3，但是希望保留完整的历史的话，还是使用git revert为好。对于和其他人协同的项目，使用git rever是最好的。

对于第一种情况 如果只是想修改commit的内容的话，可以使用git commit –amend ↩
[commit]表示所需要回退到的目标commit的SHA。 ↩
对于有些情况而言，git checkout [commit]也可以达到同样的效果，但是最好避免这样有歧义的使用方式



##  210506

Git使用中报错fatal: The current branch master has no upstream branch.解决方案

具体原因： 出现这种情况主要是由于远程仓库太多，且分支较多。在默认情况下，`git push`时一般会上传到`origin`下的`master`分支上，然而当repository和branch过多，而又没有设置关联时，git就会产生疑问，因为它无法判断你的push目标。

Git 的 “master” 分支并不是一个特殊分支。 它就跟其它分支完全没有区别。 之所以几乎每一个仓库都有 master 分支，是因为`git init`命令默认创建它，并且大多数人都懒得去改动它。
远程仓库名字 “origin” 与分支名字 “master” 一样，在 Git 中并没有任何特别的含义一样。origin” 是当你运行git clone时默认的远程仓库名字。 如果你运行 `git clone -o booyah`，那么你默认的远程分支名字将会是 `booyah/master`。

解决办法其实就是确定这两个值，方法有两种：

- 第一种如上图中的提示：`git push --set-upstream origin master`。其中的origin是你在clone远程代码时，git为你创建的指向这个远程代码库的标签，它指向repository。为了能清楚了解你要指向的repository，可以用命令git remote -v进行查看。master是你远程的branch，可以用`git branch -a`查看所有分支，远程分支是红色的部分。然后确定好这两个值后，将值换掉即可。
- 另一种方法是：`git push -u origin master`。同样根据自己的需要，替换origin和master。
  两个命令的区别是第一条命令是要保证你的远程分支存在，如果不存在，也就无法进行关联。而第二条指令即使远程没有你要关联的分支，它也会自动创建一个出来，以实现关联。

## 210520

说明：-u 在服务器仓库应该是一个空仓库时使用。

二、分析原因 之所以没有成功的将本地代码推动到服务器上，是因为服务器的仓库不是一个空仓库，那么正确的上传顺序就应该是这样的。

- 返回服务器的代码（git pull）；
- 使用 git rebase origin master 进行合并；
- 合并过程中，如果本地代码和服务器代码有冲突会有提醒；
- 使用 git diff 可以查看冲突，手动解决冲突后使用 git add ‘修改的文件名’ 将修改添加到暂缓区；
- 使用 git rebase --continue 继续合并；
- 最后使用 git push 更新到服务器。

三、解决方法

1. 先进行合并

```bash
$ git pull rebase origin master
```

1. 进行推送

```bash
$ git push origin master   
这个时候应该就没问题！
```

## 210615

Git的报错
在使用Git的过程中有时会出现一些问题，那么在解决了每个问题的时候，都需要去总结记录下来，下次不再犯。

一、fatal: refusing to merge unrelated histories
今天在使用Git创建项目的时候，在两个分支合并的时候，出现了下面的这个错误。

~/SpringSpace/newframe on  master ⌚ 11:35:56
$ git merge origin/druid
fatal: refusing to merge unrelated histories

这里的问题的关键在于：fatal: refusing to merge unrelated histories
你可能会在git pull或者git push中都有可能会遇到，这是因为两个分支没有取得关系。那么怎么解决呢？

二、解决方案
在你操作命令后面加--allow-unrelated-histories
例如：
git merge master --allow-unrelated-histories

~/SpringSpace/newframe on  druid ⌚ 11:36:49
$ git merge master --allow-unrelated-histories
Auto-merging .gitignore
CONFLICT (add/add): Merge conflict in .gitignore
Automatic merge failed; fix conflicts and then commit the result.

如果你是git pull或者git push报fatal: refusing to merge unrelated histories
同理：
git pull origin master --allow-unrelated-histories
等等，就是这样完美的解决咯！

# error

## fatal: refusing to merge unrelated histories解决

Git :fatal: refusing to merge unrelated histories解决
今天本地创建了一个仓库（有README)，把本地仓库和Github上关联以后，发现git pull，git feach提醒fatal: refusing to merge unrelated histories

![截图示例](git0329.assets/20190830090402218.png)

上网查到原因是两个分支是两个不同的版本，具有不同的提交历史


加一句

$git pull origin master --allow-unrelated-histories
1
可以允许不相关历史提，强制合并，确实解决了这个问题，感谢网友

## git 上传出现“ ! [rejected] master -> master (non-fast-forward)”

参考文章： 
[如何将本地项目上传到码云](https://blog.csdn.net/tiegenz/article/details/79551717) 
[GIT远程仓库地址变更](https://www.cnblogs.com/merray/p/5698331.html) 
[! [rejected\] master -> master (non-fast-forward)（有推荐视频）](https://blog.csdn.net/lujinjian605894472/article/details/8443403) 
在使用Git 配置公司的远程仓库时`git push origin master`，出现以下问题

```
xu:QProj xiaokai$ git push origin master
To https://gitee.com/XXXXX.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://gitee.com/XXXXX.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

从提示语中可以看出是，问题（Non-fast-forward）的出现原因在于：git仓库中已经有一部分代码，所以它不允许你直接把你的代码覆盖上去。于是你有2个选择方式：

1、强推，即利用强覆盖方式用你本地的代码替代git仓库内的内容，如果远程仓库是刚建的，没有代码，可以这样操作，尽量避免这种操作方法。

```
git push -f
```

2、先把git的东西fetch到你本地然后merge后再push

```
$ git fetch
```

```
$ git merge
```

3、在使用的时候，`git merge`，又出现了以下的问题

```
xu:QProj xiaokai$ git merge
fatal: refusing to merge unrelated histories
```

对于这个问题。使用`git pull origin master --allow-unrelated-histories `
来处理一下。

4、然后继续`git merge`,依然有问题

```
fatal: You have not concluded your merge (MERGE_HEAD exists).
Please, commit your changes before you merge.
```

这个就好处理了，是我们没有提交当前的变化， `git add .`,`git commit -am "提交信息"`

然后再来一次`git merge`,然后ok.

5、然后输入`git pull`,显示如下

```
Already up-to-date.
```

最后就可以执行`xu:QProj xiaokai$ git push origin master `
将代码上传到公司的远程仓库中。

```
xu:QProj xiaokai$ git push origin master
Counting objects: 693, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (636/636), done.
Writing objects: 100% (693/693), 2.83 MiB | 570.00 KiB/s, done.
Total 693 (delta 362), reused 0 (delta 0)
remote: Resolving deltas: 100% (362/362), completed with 1 local object.
remote: Powered by Gitee.com
To https://gitee.com/XXXXX.git
   83902a5..8100890  master -> master
```

### ??Git报错解决：OpenSSL SSL_read: Connection was reset, errno 10054 错误解决

**首先，造成这个错误很有可能是网络不稳定，连接超时导致的，
如果再次尝试后依然报错，可以执行下面的命令。*

**打开Git命令页面，执行git命令脚本：修改设置，解除ssl验证**

```
git config --global http.sslVerify "false"
```

此时，再执行git操作即可。





## git比较两个分支的文件的差异

Git diff branch1 branch2 --stat   //显示出所有有差异的文件列表

Git diff branch1 branch2 文件名(带路径)   //显示指定文件的详细差异

Git diff branch1 branch2                   //显示出所有有差异的文件的详细差异

## Git-撤销（回退）已经add，commit或push的提交

本文只阐述如何解决问题，不会对git的各种概念多做介绍，如果有兴趣可以点击下面的链接，进行详细的学习：
Pro Git

本文适用的环境
现在先假设几个环境，本文将会给出相应的解决方法：

1. 本地代码（或文件）已经add但是还未commit；
2. 要回退的commit的代码已经commit了，但是还未push到远程个人repository
3. 要回退的commit的代码已经push到远程的个人分支，但是还未merge到公共的repository
4. 要回退的commit的代码已被merge（合入)到公共的repository

关键的几个命令
git reset [commit]
git revert [commit]

git reset有三个参数soft,mixed,hard分别对应head的指针移动，index（暂存区）、以及工作目录的修改，当缺省时，默认为mixed参数。
git revert与reset的区别是git revert会生成一个新的提交来撤销某次提交，此次提交之前的commit都会被保留，也就是说对于项目的版本历史来说是往前走的。而git reset 则是回到某次提交，类似于穿越时空。

相应的解决方法
1、 对于上面的前两种情况，我们可以直接使用git reset命令。根据需要的不同使用，不同的参数。但是要注意1.

git reset –hard

是一个危险的命令,他是git少数几个会销毁数据的命令之一，如果你不小心放了错，你也许可以使用

git reflog

命令来找回你的数据。
2、 对于第三种情况，如果你的远程分支只有你一个人用的话，那么可以在先使用git reset [commit]回退，如何使用git push -f [commit]来强制更新你的远程库2

3、 对于最后一种情况，考虑到其他人的版本历史，使用git reset [commit]是不建议的，此时我们应该使用git revert [commit]改命令不会修改之前的提交历史，相当于对数据做了一次逆操作，然后再执行add，commit等命令。

总结
对于前三种情况，虽然git revert也适用，但是如要要保持版本历史干净的话，建议还是用 git reset3，但是希望保留完整的历史的话，还是使用git revert为好。对于和其他人协同的项目，使用git rever是最好的。

对于第一种情况 如果只是想修改commit的内容的话，可以使用git commit –amend ↩
[commit]表示所需要回退到的目标commit的SHA。 ↩
对于有些情况而言，git checkout [commit]也可以达到同样的效果，但是最好避免这样有歧义的使用方式

