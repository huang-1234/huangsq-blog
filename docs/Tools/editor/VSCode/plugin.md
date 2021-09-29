# VSCode 插件



## Code Runner

> 一个小问题，在bash 终端使用Code Runner 运行编译cpp 代码总是说找不到目录。
>
> Vs code 使用code runner在终端bash跑显示No such file or directory



```cpp
Vs code 使用code runner在终端bash跑显示No such file or directory
这个问题是因为bash把"/“给丢掉了，只要把它补上，就好了。
在settings里面找到code runner中的 Edit in setting.json增加一项：“code-runner.terminalRoot”:”/"，这样就OK了
```

确实上述操作就能解决这个[问题](https://www.cxyzjd.com/article/rocket3370/115520583)

终于解决了这个问题