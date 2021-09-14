# 使用pm2部署Nodejs Full

[pm2](https://pm2.keymetrics.io/)

最近用node写了一个小型的项目，项目完成后到了部署的阶段，才开始考虑怎样才能更好的监控项目。在node的开发过程中有很多痛点，最让人忍受不了的就是文件修改后服务的重启，需要不断的关闭进程，启动进程，后来研究了一下，发现可以用nodemon自动重启服务，方便了很多，但是项目需要上线的时候，发现nodemon不能后台运行，于是自己用python写了一个自动启停的脚本，可以实现后台运行，代码如下，

```js
#!/bin/bash
node_status(){
   pids=`ps aux|grep node|grep www|awk '{print $2}'`
   if [ ${pids} ]
    then
        return 1
    else
        return 2
    fi
}
node_start(){
    node_status
    if [ $? == 2 ]
    then
            nohup node /home/web/claire/bin/www >> /tmp/node/shell.log 2>&1 &
    fi
}
node_stop(){
    node_status
    if [ $? == 1 ]
    then
            kill -9 ${pids} >> /tmp/node/shell.log 2>&1
    fi
}
node_restart(){
    node_stop
    sleep 5
    node_start
}
node_defend(){
    while true
    do
    node_status
    if [ $? == 2 ]
    then
            node_start
    fi
    sleep 5
    done
}
ACTION=$1
case $ACTION in
    start)
            node_start
    ;;
    stop)
            node_stop
    ;;
    restart)
            node_restart
    ;;
    defend)
            node_defend
    ;;
```



写python脚本的时候，如果用编辑器，需要将编码格式转成***unix格式\***，要不会报错，我用的nodepad++，修改方式为右键点击选择unix格式即可。

后来发现Nodejs有一个高大上的管理工具PM2，是可以用于生产环境的Nodejs的进程管理工具，并且它内置一个负载均衡。它不仅可以保证服务不会中断一直在线，并且提供0秒reload功能，还有其他一系列进程管理、监控功能。并且使用起来非常简单，赶快上手试试吧。

## Nodejs安装

之前nodejs安装，是去官方网站上下载安装包然后安装的，在使用pm2的过程中，了解到，***nvm\***利器，可以方便切换nodejs版本，推荐用这个方法安装node。
删除之前安装的node，查询全局安装的模块然后删除

```shell
npm list -g --depth 0

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

执行curl过程中报错curl: (35) SSL connect error，执行

```shell
yum update nss
```

最后执行

```shell
source ~/.bashrc
nvm--version             //查看nvm是否安装成功
nvm install stable       //安装最新稳定版本
```

## PM2安装

安装环境

- Linux x86_64
- node v10.8.0
- npm 6.2.0

全局安装

```shell
npm install pm2 -g
```

安装成功后可直接启动

```shell
pm2 start bin/www
```

## [nodejs部署方式-pm2](https://www.cnblogs.com/zzsdream/p/6898974.html)

目前Nodejs开发中有很多痛点，其中有一个是修改完代码以后需要我们重启服务才能看到效果。这样一次次的杀进程、重启，杀进程、重启很让人头大。程序员是最痛恨重复工作的物种，之前有了解过的同学可能知道 `forever` 。 `forever` 可以帮我们解决上面的问题，通过对资源变化的检测做到变化后自动重启。开发阶段我们使用 `node file.js` 来启动另外由于Nodejs的单线程，任何异常都会导致整个服务中断，这对于生产上长时间提供服务的程序来讲是不可以的， `forever` 可以帮我们在异常后重启，保证服务一直在线，我想这也就是它名字的由来吧。但我想说的是 `forever` 不够“高！大！上！”。接下来我要介绍一个足够高大上的神器– [`pm2` ](http://pm2.keymetrics.io/)。

## 简介

`pm2` = **P** (rocess) **M** (anager)2，是可以用于生产环境的Nodejs的进程管理工具，并且它内置一个负载均衡。它不仅可以保证服务不会中断一直在线，并且提供0秒reload功能，还有其他一系列进程管理、监控功能。并且使用起来非常简单。下面我将把我的使用过程分享出来，Nodejs应用是一个基于Express 4.x的应用，名称是 `Wolverine` 。

## 安装

环境清单：

- windows7 x64
- node v5.0.0
- npm 3.3.6

全局安装 `pm2`

```shell
$ npm install pm2 -g
```

更新

```shell
$ pm2 update
```

## 启动

以前启动 `Wolverine` 是利用package.json的 `scripts` 来实现的，只需要执行 `npm run start` 就可以启动，配置如下：

```shell
"scripts": {
    "start": "node ./bin/www",
    "debug": "node debug ./bin/www"

  },
```

使用 `pm2` 我们可以在start处配置成 `pm2 ./bin/www` ,命令后面支持加参数来实现watch、cluster多进程模式等功能。我不太喜欢一大串的命令，于是我使用了配置文件的方式。

在 `Wolverine` 的根目录，我创建了一个 `processes.json` 配置文件，配置文件内容如下，注释写的也很清楚了

```shell
{
  "apps" : [{
    "name" : "Wolverine",  //名称
    "script": "./bin/www", //程序入库
    "cwd": "./",           //根目录
    "watch":[
		"bin",
		"common",
		"configs",
		"public",
		"routes",
		"views"
	],//需要监控的目录
    "error_file":"./logs/app-err.log",//错误输出日志
    "out_file":"./logs/app-out.log",  //日志
    "log_date_format":"YYYY-MM-DD HH:mm Z" //日期格式
    }]
}
```

随后，我在package.json中增加了一条

```shell
"pm2": "pm2 start processes.json"
```

在启动就直接输入如下命令就好：

```shell
$ npm run pm2
```

看到下面的界面，就启动成功了，然后我们就可以关掉这个窗口了，服务不会因此停止，是不是高大上多了。

## 管理和监控

启动成功的界面会展示App name和id，这两个值很重要。当然这两个值都可以在processes.json配置文件进行配置。

打开命令行，在任何路径下，输入

```bash
$ pm2 list
```

就能看到启动时的图表界面，方便我们查看所有通过pm2管理的Nodejs服务。

输入,下面命令配合id或者name可以查看某一个进程的详细信息

```bash
$ pm2 show Wolverine 或者
$ pm2 show 0
```

内容涉及重启次数、运行时间、脚本路径、参数、日志路径、运行模式等等信息

输入

```bash
$ pm2 monit
```

停止、重启等命令

```bash
$ pm2 stop [app-name|id]  #停止某一个进程，可以使用app-name或者id
$ pm2 stop all            #停止所有进程

$ pm2 restart all         #重启所有的进程

$ pm2 delete [app-name|id]#删除并停止进程
$ pm2 delete all          #删除并停止所有进程
```

可以进一步查看每一个服务的cpu、内存动态占用情况。

## 日志监控

如果你一直使用 `tail -f log_file.log log_error.log` 来查看日志，你可能会爱上下面的这个功能。

```bash
$ pm2 logs
$ pm2 logs [app-name]
```

我们可以实时查看全部进程的日志，或者只查看某一个。我们甚至可以使用json格式查看日志。

```bash
$ pm2 logs --json
```

## Web API

如果你不仅仅想监控被pm2管理的进程，还需要监控进程所运行的机器的信息，你可以使用下面这个API

```bash
$ pm2 web
```

pm2会启动一个叫做pm2-http-interface的进程提供web服务。你打开浏览器输入http：//127.0.0.1:9615，是不是被看到的结果惊艳到了。