# bytedance

## 一面

题目一：项目加Fiber

我们先来聊一聊你有做过哪些项目或者你觉得做的还不错的地方

我们来聊一聊Fiber架构吧

Fiber架构是怎么实现异步可中断的，如果要你来设计一个时间片轮转的任务队列，你怎么设计

[{ type: number }, {type: string, key}]

{

 a: number;

 b: string;

}

Record<string, string | number | boolean>

{

  value: string

  a: string;

} & {

  b: number;

}

fiber diff 

requestAnimationFrame

eventLoop

\- 浏览器 

宏任务队列 -> 自己的微任务队列 -> 每次宏任务执行微任务

常用微任务 Promise 

\- Node

宏任务 / 微任务 / nextTick

来聊一下浏览器和node的EventLoop吧

### 题目二

发布订阅

```js
class EventBus
- on(eventName, fn)
- off(eventName, fn)
- emit(eventName)

const a = new EventBus();

a.on()
a.off()
a.emit()
```

实现

```js
//line=readline()
//print(line)
class EventBus{
    constructor(){
        this.eventMap = {}
    }
    on(eventName, fn){
        Object.prototype.toString.call(fn).slice()
        if(!(fn instanceof Function)){
            throw new Error(`${fn} is not find`)
        }
        if(!this.eventMap[eventName]){
            this.eventMap[eventName] = []
        }
        eventName[eventName].push(fn)
    }
    emit(eventName){
        if(!this.EventMap[eventName]){
            throw new Error(`${fn} is not find`)
        }
        eventMap[eventName].forEach((cb)=>{
            cb()
        })
    }
    
    off(eventName, fn){
        if(!eventMap[eventName]){
            throw Error(`error`)
        }
        if(~eventMap[eventName].indexOf(fn)){
            this.eventMap[eventName].splice(eventMap[eventName].indexOf(fn),1)
        }else{
            throw new Error(`${fn} is not find`)
        }
```

来聊一下浏览器方面的东西吧

### 题目三

来问你一些http2和http3的东西吧

http2

\- 头部压缩 / 多路复用 / 服务端推送

\- 强缓存 / 协商缓存



再问你一下webpack的一些东西吧

webpack打包的流程是怎么样的

webpack是怎么使用那些插件的呢？

我建议你自己学着去写一些webpack的plugin

### 想一想有哪些不会

项目的组件说明没说好

组件有哪些功能，怎么实现的



## 二面

先介绍自己

面试官说：你操作系统，通信原理，这些基础都学了吧

操作系统，计算机组成原理，计算机网络，编译原理都学了。

### 操作系统篇

> 那问你个简单的问题哈！我们常说的这个64位的操作系统，他跟这个32位的操作系统相比较怎么样！





> 扯到地址总线，数据总线和控制总线，寻址技术

能访问的数据变多了，能控制的东西也变多了，然后又聊到了时间片轮转，假如我们的机器有一个内核，操作系统会给每一个线程一个时间片让他去执行任务，不管任务执行完了没有，时间片用完了或者被一个高优先级的线程给抢占了，该线程都得把CPU的控制权交给操作系统。



> 扯到内存和虚拟内存





> 扯到操作系统的分页机制

简述空间换时间的思想

### 计算机网络

> 说一说TCP的拥塞控制和流量控制是为了解决什么问题

答：TCP 作为传输层，肯定是解决传输层的问题，就比如需要根据实时的网络情况控制自身传递数据报文的大小和速度。

1慢启动。2拥塞避免。 3快重传。 4快恢复。

跟他说了一下这四种算法。



> 问你一下强类型的语言和弱类型的静态语言

简单的说了一下强类型的语言，程序员声明每一个变量都需要说明它的类型是什么，而弱类型的语言这不需要



> 再问你一下静态类型的语言和动态类型的语言

静态类型的语言一般不允许隐式转换，可显示转换，而且声明一个变量以后，后面改变了的类型不会改变。

动态类型的语言其声明的变量的类型是可以变化的。是可以隐式转换的。





> 我看你项目有写到这个跨域的问题，那你来说一说这个跨域

首先跨域这个问题是浏览器的一个安全机制，浏览器为了自身以及用户的安全，会对不同源地址来的资源进行拦截



> 什么是同源政策

协议 + 主机(域名) + 端口号  。 三者一致，浏览器才认为这是同源的。



然后又扯了一下DNS服务器解析域名



> 说一说跨域的方法有哪些

简答说了一下常用的几种：有代理服务器，CORS需前后端配合。然后就是浏览器的script漏洞：JSONP请求：只有get请求。

前端的代理服务器(也称之为正向代理)



> 再问你一下正向代理和方向代理

* 正向代理的应用

1. 访问原来无法访问的资源
2. 用作缓存，加速访问速度
3. 对客户端访问授权，上网进行认证
4. 代理可以记录用户访问记录（上网行为管理），对外隐藏用户信息

* 反向代理的应用

1. 保护内网安全
2. 负载均衡
3. 缓存，减少服务器的压力

Nginx作为最近较火的反向代理服务器，安装在目的主机端，主要用于转发客户机请求，后台有多个http服务器提供服务，nginx的功能就是把请求转发给后台的服务器，决定哪台目标主机来处理当前请求。

> 安装配置Nginx

```nginx
#tar -xzf nginx-1.10.3.tar.gz
# cd nginx-1.10.3/
# ./cofigure  --prefix=/usr/local/nginx && make && make install
# vim /lib/systemd/system/nginx.service [Unit]
Description=nginx
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true

[Install]
WantedBy=multi-user.target

# systemctl enable nginx
# systemctl start nginx
```

> Nginx配置文件简介

```nginx
#vim/usr/local/nginx/conf/nginx.conf #运行用户 user nobody; #启动进程,通常设置成和cpu的数量相等 worker_processes  1; #全局错误日志及PID文件 #error_log  logs/error.log; #error_log  logs/error.log  notice; #error_log  logs/error.log  info; #pid logs/nginx.pid; #工作模式及连接数上限 events { #epoll是多路复用IO(I/O Multiplexing)中的一种方式, #仅用于linux2.6以上内核,可以大大提高nginx的性能
use   epoll; #单个后台worker process进程的最大并发链接数 worker_connections  1024; # 并发总数是 worker_processes 和 worker_connections 的乘积 # 即 max_clients = worker_processes * worker_connections # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4  为什么 # 为什么上面反向代理要除以4，应该说是一个经验值 # 根据以上条件，正常情况下的Nginx Server可以应付的最大连接数为：4 * 8000 = 32000 # worker_connections 值的设置跟物理内存大小有关 # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数 # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右 # 我们来看看360M内存的VP可以打开的文件句柄数是多少： # $ cat /proc/sys/fs/file-max # 输出 34336 # 32000 < 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内 # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置
  # 使得并发总数小于操作系统可以打开的最大文件数目
  # 其实质也就是根据主机的物理CPU和内存进行配置
  # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。
  # ulimit -SHn 65535 }

http {
  #设定mime类型,类型由mime.type文件定义 include mime.types; default_type  application/octet-stream; #设定日志格式 log_format  main  '$remote_addr - $remote_user [$time_local] "$request" ' '$status $body_bytes_sent "$http_referer" ' '"$http_user_agent" "$http_x_forwarded_for"';

access_log  logs/access.log  main; #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件， #对于普通应用，必须设为 on, #如果用来进行下载等应用磁盘IO重负载应用，可设置为 off， #以平衡磁盘与网络I/O处理速度，降低系统的uptime. sendfile on; #tcp_nopush on; #连接超时时间 #keepalive_timeout  0; keepalive_timeout  65; tcp_nodelay on; #开启gzip压缩 gzip  on; gzip_disable "MSIE [1-6]."; #设定请求缓冲 client_header_buffer_size 128k; large_client_header_buffers  4 128k; #设定虚拟主机配置 server { #侦听80端口 listen 80; #定义使用 www.nginx.cn访问 server_name  www.nginx.cn; #定义服务器的默认网站根目录位置 root html; #设定本虚拟主机的访问日志 access_log  logs/nginx.access.log  main; #默认请求 location / { #定义首页索引文件的名称 index index.php index.html index.htm; } # 定义错误提示页面 error_page   500 502 503 504 /50x.html; location = /50x.html { } #静态文件，nginx自己处理 location ~ ^/(images|javascript|js|css|flash|media|static)/ { #过期30天，静态文件不怎么更新，过期可以设大一点， #如果频繁更新，则可以设置得小一点。 expires 30d; } #PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置. location ~ .php$ { fastcgi_pass 127.0.0.1:9000; fastcgi_index index.php; fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name; include fastcgi_params; } #禁止访问 .htxxx 文件 location ~ /.ht { deny all; } }
}
```

> 1.配置虚拟主机

```nginx
location / { root html; index  index.html index.htm; } 此处的html为相对路径 # systemctl restart nginx # vim /usr/local/nginx/html 建立测试页面进行测试。
```





场景题：

给你使用React设计一个表格，然后埋点做用户行为分析

