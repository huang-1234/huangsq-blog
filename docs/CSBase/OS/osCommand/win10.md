# win10

## win10 系统所有的命令

一般情况下，win10系统想要快速关闭某个页面，都是点击窗口的×按钮，如果同时打开很多窗口，要一个一个点击关闭有点麻烦。其实，我们可以学习一些快速关闭网页的方法，今天小编将给大家分享介绍win10系统通过快捷键来关闭页面的具体方法。

具体方法如下：

1、快捷键关闭页面的方法 "**Alt"+"F4**"，就可以关闭当前页面。

2、快捷键**Ctrl+w**：功能：关闭当前打开的一个页面，可以连续执行。

3、**WIN键+D键** 功能：最小化浏览器窗口，直接回到桌面。

4、**WIN键+M键** 功能：最小化的窗口在任务栏上显示为按钮。

5、**WIN键+M键+SHIFT 键** 功能：可将所有窗口和对话框还原为原来的大小。



## win10 常用快捷键

```wiki
1.WIN+A-打开操作栏
2.WIN + B-[聚焦通知区域](https://www.zhihu.com/search?q=聚焦通知区域&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A124086684})
3.WIN+D-快速返回桌面
4.WIN+ALT+D-显示日期时间
5.WIN+E-打开[资源管理器](https://www.zhihu.com/search?q=资源管理器&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A124086684})
6.WIN+I-打开Windows设置
7.WIN+K-打开连接功能
8.WIN+L-锁定屏幕
9.WIN+M-最小化所有窗口
10.WIN+P-选择演示模式
11.WIN+R-打开运行窗口
12.WIN+S-打开搜索功能
13.Win+T-任务栏切换
14.Win+U-打开轻松使用设置
15.WIN+V-打开[剪切板](https://www.zhihu.com/search?q=剪切板&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A124086684})
16.WIN+X-打开连接菜单
17.WIN+[逗号](https://www.zhihu.com/search?q=逗号&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A124086684})-临时查看桌面
18.WIN+ Ctrl + F-搜索电脑（有网络）
19.WIN+ 数字-启动固定到任务栏应用
20.WIN+TAB-打开任务视图
21.WIN+上下左右键-调整窗口大小位置
22.WIN+空格-语言切换
23.WIN+加减号-[放大镜](https://www.zhihu.com/search?q=放大镜&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A124086684})
24.WIN+CTRL+D-创建虚拟桌面
```







## win10 网络问题



### 关于host的问题

> 我的win10 host文件：C:\WINDOWS\system32\drivers\etc

```bash
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost

192.30.253.112  github.com    
192.30.253.113  www.github.com

192.30.253.112 github.com

# 140.82.112.4 github.com
140.82.113.3 gist.github.com
185.199.108.153 assets-cdn.github.com
199.232.68.133 raw.githubusercontent.com
199.232.68.133 gist.githubusercontent.com
199.232.68.133 cloud.githubusercontent.com
151.101.192.133 camo.githubusercontent.com
199.232.68.133 avatars0.githubusercontent.com
199.232.68.133 avatars1.githubusercontent.com
199.232.68.133 avatars2.githubusercontent.com
199.232.68.133 avatars3.githubusercontent.com
199.232.68.133 avatars4.githubusercontent.com
199.232.68.133 avatars5.githubusercontent.com
199.232.68.133 avatars6.githubusercontent.com
199.232.68.133 avatars7.githubusercontent.com
199.232.68.133 avatars8.githubusercontent.com
```

修改host文件如下

```bash
192.30.253.112 github.com
52.167.219.168 gitlab.com
# GitHub域名ip地址
140.82.112.4 github.com
```

