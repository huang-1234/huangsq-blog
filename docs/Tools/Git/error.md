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