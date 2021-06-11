# 各种场景下正确使用git命令

该问题的背景就在于我破坏了一个原则：`每次建立分支，或者切换分支前，都需要把当前的修改提交，否则切换到其他分支也能 看到这些未提交的修改，working directory 下的文件不会恢复到指定文档的版本.`

> 当我完成ch1分支的工作，但是我在还没有commit的情况下，却使用git checkout master切换到了master分支，导致我ch1的工作内容一下子就到了master分支上去。当时我就很疑惑。

## Git如何在不提交当前分支的情况下切换到其它分支进行操作——git stash

假如现在的Bug你还没有解决，而上边又给你派了一个新的Bug，而这个Bug相比较现在正在苦思冥想的Bug比较容易解决。

你想先解决新的Bug，可是之前的Bug还没有解决完而不能提交。怎么办?



解决方法：在其他分支上另开炉灶解决。

首先你需要将此刻正在解决Bug的当前分支“储藏”起来。例假如此时正在你在当前分支dev上已进行了Bug修改但还未提交。

此时你想去解决刚派下来的另一个Bug。而你需要在master分支上去修复这个Bug，第一步就需要先切换到master 分支。当你执行 $ git checkout master 命令的时候，将提示出错：

error: Your local changes to the following files would be overwritten by checkout:
        readme.txt
Please commit your changes or stash them before you switch branches.

（请在切换分支之前提交您的更改或隐藏它们）



因为当前的分支dev 最初也是从master 分支上衍生出来的。而此时你要再从该分支上切换到其主分支。那么你需要先把该dev分支上的改动提交后才能切换，但是该dev分支上还没有完成全部的修改，你不想提交。那么此时你就要选择 stash 它们（你在当前分支上改动的却没有提交commit的内容）。

> 所以第二步，在当前分支上执行  $ git stash 命令。将当前分支存起来，id为 8528ea2 s

```bash
13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (ch1)
$ git stash
Saved working directory and index state WIP on ch1: cc89460 del main.js p120
```

> 使用错误的stash命令会显示stash的各种命令

```bash
13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (ch1)
$ git stash cc89460
fatal: unknown subcommand: cc89460

usage: git stash list [<options>]
   or: git stash show [<options>] [<stash>]
   or: git stash drop [-q|--quiet] [<stash>]
   or: git stash ( pop | apply ) [--index] [-q|--quiet] [<stash>]
   or: git stash branch <branchname> [<stash>]
   or: git stash clear
   or: git stash [push [-p|--patch] [-k|--[no-]keep-index] [-q|--quiet]
          [-u|--include-untracked] [-a|--all] [-m|--message <message>]
          [--pathspec-from-file=<file> [--pathspec-file-nul]]
          [--] [<pathspec>...]]
   or: git stash save [-p|--patch] [-k|--[no-]keep-index] [-q|--quiet]
          [-u|--include-untracked] [-a|--all] [<message>]
```

> 正确使用stash回复命令$ git stash apply stash@{cc89460}

```bash
13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (ch1)
$ git stash apply stash@{cc89460}
On branch ch1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   t1.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

一、用 $ git stash apply 命令恢复，但是恢复后，stash内容并不删除，这时候再执行  

$ git stash list 命令，id 为  8528ea2 s 的储藏项目还会在列表中，你需要用 

$ git stash drop 来删除；

注意： 如果有一个分支上多个 stash，如果需要恢复指定的 stash ，可以在命令尾部加id，如  $ git stash apply stash@{0}，同样删除指定 stash 项目则执行如 

$ git stash drop stash@{1}  。

二、用  $ git stash pop  命令，恢复的同时把 stash 存储列表的内容也删了。这时候再执行  

$ git stash list 命令，id 为  8528ea2 s 的储藏项目不会在列表中。

此时再查看 $ cat  `<filename>`  会发现之前的改动还存在，且执行 git status 就会继续显示该分支上有改动未提交。



### 误删stash：git stash clear

前言：

- `git fsck` & `git stash apply <commit_id>` ：针对 stash 存储的误删
- `git checkout -- <file>` ：针对工作区的修改
- `git reset` ：针对暂存区的修改

### fsck —— 针对 stash 存储的误删

在不同的公司，技术团队在代码仓库中的协同工作流程可能会有不同。我公司就是在 dev 分支上进行开发，合并更新的流程基本就是下面：

1. `git stash` 存储自己在 dev 上做的修改（新建的文件是不会被存储起来的）
2. `git pull` 拉取远程仓库中的 dev 的更新
3. `git stash pop` 弹出存储的修改（有冲突的话就解决冲突）
4. 然后就是添加文件并提交修改那些操作。

那么我在工作中，遇到最让我窒息、心痛如绞的事情就是：我亲手把自己 stash 的修改给 clear 了……….

神操作如下：

1. 啊，终于可以提交了，我先 `git stash` 存起来先
2. 那么接下来查查看我的存储仓记录 `git stash clear` （一失足成千古恨）
3. 嗯？为什么没有显示存储记录？
4. ？？？我执行了 `git stash clear` ？？？ CLEAR？？？？我不是要 `git stash list` 的吗？？？

1. 我不信，一定没有清空掉的， `git stash list` ………
   (Sorry, the list you checked is empty. Du… Du… Du…)
2. 我还是不信，可能我没有 stash 到，还在工作区里。 `git status` ……..
   (Sorry, the list you checked is empty. Du… Du… Du…)

1. **`git fsck`** 查询仓库中所有未被其他对象引用的对象，这密密麻麻地列出了一摞（我记得当时不是时间顺序排序的，但是今天一看好像又是时间顺序的）。
2. 于是我只能 **`git show <commit_id>`** 一个个打开来看。
3. 经过漫长的版本查找后，我终于找到了离上一次修改最近的记录！最后 **`git stash apply <commit_id>`** 。谢天谢地，回来了！

### checkout —— 针对工作区的修改

对于在工作区的修改，还没执行 `git add` 等操作，此时若是想放弃工作区的全部修改，只需要：

```js
git checkout -- <需要撤销修改的文件名>
```



注意：这个不针对 Untracked 的文件哦～

### reset —— 针对暂存区的修改

对于刚执行完 `git add` 把文件添加到暂存区的修改，此时若是想放弃暂存区某个文件的修改，只需要：

```
git reset HEAD <需要撤销修改的文件名>
```



而如果你已经执行了 `git commit` 将这些暂存区的文件提交，那你只能：

```
git reset --hard HEAD^                ## 将 HEAD 回退到上一个版本
git reset --hard HEAD@{<index>}       ## 将 HEAD 回退到第 index 个版本
git reset --hard <commit_id>          ## 将 HEAD 指向指定的 commit_id 版本

git log         ## 查看提交的历史
git reflog      ## 查看 HEAD 移动的历史记录，从而回到任意版本
```



注意：这个操作非常危险！⚠️如果你的工作区中还有已跟踪的修改文件未提交，执行这个操作将会丢失你的这些文件！

## Vue的响应式原理

我们都知道， Vue 最大的特点之一就是响应式的双向绑定。那么它的实现原理是怎么样的呢？无论是深入学习 Vue 框架也好，还是作为一个面试常考题也好，这都是前端必须了解的一个问题。那么我们今天就来探索一下它的实现方法。

### 模拟实现

Vue 在它的官网中就已经有对它的这个「双向绑定」特性进行说明。详情请戳[传送门](https://cn.vuejs.org/v2/guide/reactivity.html)。我们可以看到， Vue 会遍历实例的 `data` 对象的所有属性，并使用 `Object.defineProperty` 把这些属性全部转为 `getter` / `setter`。根据 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 的介绍，我尝试着使用这个方法来做一个简单的模拟实现：

```
var $person1 = {},   // 模拟 vm.$data
  person1 = { name: 'caaa' }  // 模拟我们在 Vue 中的 data 选项

Object.defineProperty($person1, 'name', {
  get() { return person1.name },
  set(val) {
    person1.name = val
    // 执行某些操作实现 DOM 局部更新
    console.log('发生了更新')
  }
})

$person1.name             // 'caaa'
$person1.age              // undefined

/* 改变 $person1.name */
$person1.name = 'jack'    // '发生了更新'
$person1.name             // 'jack'
person1.name              // 'jack'
```

### 局限

通过上面的例子，我们知道了 Vue 是如何实现响应式原理的，但是「受现代 JavaScript 的限制，Vue 不能检测到对象属性的添加或删除。」例如说，我们对上面的 `$person1` 添加一个属性：

```
/* 为 $person1 添加 age 属性 */
$person1.age = 18
$person1.age              // 18
person1.age               // undefined
```



我们可以看到，即使已经改变了 `$person1.age` ， `person1.age` 也依旧没有变化。这是因为 `$person1.age` 是一个非响应的属性，它并没有 `setter` 来对它进行追踪。也就是说 `$person1.age = 18` 其实等同于：

```js
Object.defineProperty($person1, 'age', {
  value: 18,
  enumerable: true,
  writable: true
})
```

那么要如何在 Vue 中为已创建的实例动态添加新的根级响应式属性呢？ Vue 提供的一个方法是 `Vue.set(object, key, value)` 。这里不详细举例说明，有兴趣的可以自己去尝试一下。

我想展开讲的是， Vue 3.0 中对于响应式数据的更新。

