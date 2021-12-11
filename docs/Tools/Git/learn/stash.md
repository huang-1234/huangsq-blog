### 常用git stash命令：

（1）**git stash** save "save message" : 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。

（2）**git stash list** ：查看stash了哪些存储

（3）**git stash show** ：显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}

（4）**git stash show -p** : 显示第一个存储的改动，如果想显示其他存存储，命令：git stash show stash@{$num} -p ，比如第二个：git stash show stash@{1} -p

（5）**git stash apply** :应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他个，git stash apply stash@{$num} ， 比如第二个：git stash apply stash@{1} 

（6）**git stash pop** ：命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num} ，比如应用并删除第二个：git stash pop stash@{1}

（7）**git stash drop** stash@{$num} ：丢弃stash@{$num}存储，从列表中删除这个存储

（8）**git stash clear** ：删除所有缓存的stash



**说明:新增的文件，直接执行stash是不会被存储的**，举例如下：



如上图：在git status 那一步很明显可以看出来，我修改了README，添加了新文件abc.txt，然后执行了git stash save后，在执行git stash list 可以看到刚才的save是的信息，然后使用git stash show ，只显示了README的改动被存起来了。

我们知道，执行了git statsh 以后，被存起来的在当前目录再执行git status 就看不到了，但是我们现在再执行git status，如下：

a.txt



这个文件还在，说明没有被存起来。说白了就是没有在git 版本控制中的文件，是不能被git stash 存起来的。

那要怎么办呢，这个文件我也想存起来，很明显，先执行下git add 加到git版本控制中，然后再git stash就可以了，如下：



最后一步可以看出来，这个新增文件已经被stash了。

这个时候再执行下git status ,被存起来的在当前目录就看不到了,如下：



这个时候，想切分支就再也不会报错有改动未提交了。

如果要应用这些stash，直接使用git stash apply或者git stash pop就可以再次导出来了。

总结下：git add 只是把文件加到git 版本控制里，并不等于就被stash起来了，git add和git stash 没有必然的关系，但是执行git stash 能正确存储的前提是文件必须在git 版本控制中才行。

参考的一个链接中说到了以下，我摘录此处备份下（就是只stash一部分文件）：

   常规 git stash 的一个限制是它会一下暂存所有的文件。有时，只备份某些文件更为方便，让另外一些与代码库保持一致。一个非常有用的技巧，用来备份部分文件：

1. add 那些你不想备份的文件（例如： git add file1.js, file2.js）
2. 调用 git stash –keep-index。只会备份那些没有被add的文件。
3. 调用 git reset 取消已经add的文件的备份，继续自己的工作。

 

参考链接：

https://blog.csdn.net/jeffasd/article/details/53107182

http://www.cppblog.com/deercoder/archive/2011/11/13/160007.aspx

https://blog.csdn.net/baidu_21578557/article/details/52137324

https://blog.csdn.net/kingboyworld/article/details/76408819

https://blog.csdn.net/AndyNikolas/article/details/79906132