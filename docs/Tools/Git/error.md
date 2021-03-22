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