# connecting-mysql

## resolve-1

MYSQL：ER_NOT_SUPPORTED_AUTH_MODE:Client does not support authentication protocol

[](https://www.cnblogs.com/Jiangchuanwei/p/10238958.html)

```js
Error: ER_BAD_DB_ERROR: Unknown database 'user'
    at Handshake.Sequence._packetToError
    (/Users/apple/Desktop/githubdoc/node/server/node_modules/mysql/lib/protocol/sequences/Sequence.js:47:14)
```

node使用mysql报错。

原因：登录数据库的客户端跟mysql8.0不兼容了，mysql8.0密码认证采用了新的密码格式

解决办法：

　　在系统mysql终端输入下面命令

```js
//password 是你的数据库账户密码，root和host也是
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```





## resolve-2

MYSQL：ER_NOT_SUPPORTED_AUTH_MODE:Client does not support authentication protocol

今天重装了系统，装了高版本的mysql，是node koa sequelize连接mysql时的项目，结果运行报错了如图

> 解决办法，进入mysql，输入

  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '自己的密码';

原因8.0mysql引入了caching_sha2_password模块作为默认身份验证插件，nodejs还没有跟进







## resolve-3

**前言**

mysql模块（项目地址为https://github.com/mysqljs/mysql）是一个开源的、JavaScript编写的MySQL驱动，可以在Node.js应用中来操作MySQL。但在使用过程中，出现了“ER_NOT_SUPPORTED_AUTH_MODE”问题。

本文介绍了出现该问题的原因及解决方案。

**报错信息**

当我试图使用mysql模块来连接MySQL 8时，出现了如下错误信息：

```js
D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\index.js:17
throw error;
^
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
at Handshake.Sequence._packetToError (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\sequences\Sequence.js:47:14)
at Handshake.ErrorPacket (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\sequences\Handshake.js:123:18)
at Protocol._parsePacket (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\Protocol.js:291:23)
at Parser._parsePacket (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\Parser.js:433:10)
at Parser.write (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\Parser.js:43:10)
at Protocol.write (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\Protocol.js:38:16)
at Socket.<anonymous> (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\Connection.js:91:28)
at Socket.<anonymous> (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\Connection.js:525:10)
at Socket.emit (events.js:196:13)
at addChunk (_stream_readable.js:290:12)
--------------------
at Protocol._enqueue (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\Protocol.js:144:48)
at Protocol.handshake (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\Protocol.js:51:23)
at Connection.connect (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\Connection.js:119:18)
at Object.<anonymous> (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\index.js:12:12)
at Module._compile (internal/modules/cjs/loader.js:759:30)
at Object.Module._extensions..js (internal/modules/cjs/loader.js:770:10)
at Module.load (internal/modules/cjs/loader.js:628:32)
at Function.Module._load (internal/modules/cjs/loader.js:555:12)
at Function.Module.runMain (internal/modules/cjs/loader.js:826:10)
at internal/main/run_main_module.js:17:11
```

**出错原因**

导致这个错误的原因是，目前，最新的mysql模块并未完全支持MySQL 8的“caching_sha2_password”加密方式，而“caching_sha2_password”在MySQL 8中是默认的加密方式。因此，下面的方式命令是默认已经使用了“caching_sha2_password”加密方式，该账号、密码无法在mysql模块中使用。

```sql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
Query OK, 0 rows affected (0.12 sec)
```

**解决方法
**

解决方法是从新修改用户root的密码，并指定mysql模块能够支持的加密方式：

```sql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
Query OK, 0 rows affected (0.12 sec)
```

上述语句，显示指定了使用“mysql_native_password”的加密方式。这种方式是在mysql模块能够支持。

再此运行应用，可以看到如下的控制台输出信息：

```sql
$ node index.js
The result is: RowDataPacket { user_id: 1, username: '老卫' }
```

其中，“RowDataPacket { user_id: 1, username: ‘老卫' }”就是数据库查询的结果。

**源码**

本节例子可以在https://github.com/waylau/nodejs-book-samples的“mysql-demo”应用中找到。

以上就是本文的全部内容，希望对大家的学习有所帮助，也希望大家多多支持脚本之家。

## 文章参考

- [MySQL mysqladmin客户端的使用简介](https://www.jb51.net/article/208445.htm)
- [MySQL 如何连接对应的客户端进程](https://www.jb51.net/article/200222.htm)
- [解决MySql客户端秒退问题（找不到my.ini）](https://www.jb51.net/article/179931.htm)
- [PHP Swoole异步MySQL客户端实现方法示例](https://www.jb51.net/article/172690.htm)
- [mysql8.0.11客户端无法登陆的解决方法](https://www.jb51.net/article/140954.htm)
- [mysql/Java服务端对emoji的支持与问题解决方法详解](https://www.jb51.net/article/173078.htm)
- [初识NodeJS服务端开发入门（Express+MySQL）](https://www.jb51.net/article/110616.htm)
- [用于App服务端的MySQL连接池（支持高并发）](https://www.jb51.net/article/77325.htm)
- [解读MySQL的客户端和服务端协议](https://www.jb51.net/article/211813.htm)

## 遇到的问题

```shell
PS G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle> yarn dev
yarn run v1.22.10
$ egg-bin dev
[egg-ts-helper] create typings\app\controller\index.d.ts (3ms)
[egg-ts-helper] create typings\config\index.d.ts (20ms)
[egg-ts-helper] create typings\config\plugin.d.ts (3ms)
[egg-ts-helper] create typings\app\index.d.ts (1ms)
2021-05-14 00:38:58,442 INFO 49952 [master] node version v14.15.3
2021-05-14 00:38:58,443 INFO 49952 [master] egg version 2.29.4
2021-05-14 00:38:59,895 INFO 49952 [master] agent_worker#1:27728 started (1448ms)
2021-05-14 00:39:01,534 ERROR 52716 [-/127.0.0.1/-/0ms GET /] nodejs.ER_NOT_SUPPORTED_AUTH_MODEError: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
    at Handshake.Sequence._packetToError (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\sequences\Sequence.js:47:14)
    at Handshake.ErrorPacket (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\sequences\Handshake.js:123:18)
    at Protocol._parsePacket (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Protocol.js:291:23)
    at Parser._parsePacket (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Parser.js:433:10)    at Parser.write (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Parser.js:43:10)
    at Protocol.write (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Protocol.js:38:16)
    at Socket.<anonymous> (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\Connection.js:88:28)
    at Socket.<anonymous> (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\Connection.js:526:10)
    at Socket.emit (events.js:315:20)
    at addChunk (internal/streams/readable.js:309:12)
    --------------------
    at Protocol._enqueue (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Protocol.js:144:48)    at Protocol.handshake (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Protocol.js:51:23)    at PoolConnection.connect (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\Connection.js:116:18)
    at Pool.getConnection (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\Pool.js:48:16)
    at G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\ali-rds\node_modules\pify\index.js:29:7
    at new Promise (<anonymous>)
    at Pool.<anonymous> (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\ali-rds\node_modules\pify\index.js:12:10)
    at Pool.ret [as getConnection] (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\ali-rds\node_modules\pify\index.js:56:34)
    at Pool.query (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\Pool.js:202:8)
    at G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\ali-rds\node_modules\pify\index.js:29:7
    sql: select now() as currentTime;
code: "ER_NOT_SUPPORTED_AUTH_MODE"
errno: 1251
sqlMessage: "Client does not support authentication protocol requested by server; consider upgrading MySQL client"
sqlState: "08004"
fatal: true
name: "ER_NOT_SUPPORTED_AUTH_MODEError"
pid: 52716
hostname: HSQ

2021-05-14 00:39:01,541 ERROR 52716 nodejs.ER_NOT_SUPPORTED_AUTH_MODEError: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
    at Handshake.Sequence._packetToError (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\sequences\Sequence.js:47:14)
    at Handshake.ErrorPacket (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\sequences\Handshake.js:123:18)
    at Protocol._parsePacket (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Protocol.js:291:23)
    at Parser._parsePacket (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Parser.js:433:10)    at Parser.write (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Parser.js:43:10)
    at Protocol.write (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Protocol.js:38:16)
    at Socket.<anonymous> (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\Connection.js:88:28)
    at Socket.<anonymous> (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\Connection.js:526:10)
    at Socket.emit (events.js:315:20)
    at addChunk (internal/streams/readable.js:309:12)
    --------------------
    at Protocol._enqueue (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Protocol.js:144:48)    at Protocol.handshake (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\protocol\Protocol.js:51:23)    at PoolConnection.connect (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\Connection.js:116:18)
    at Pool.getConnection (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\Pool.js:48:16)
    at G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\ali-rds\node_modules\pify\index.js:29:7
    at new Promise (<anonymous>)
    at Pool.<anonymous> (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\ali-rds\node_modules\pify\index.js:12:10)
    at Pool.ret [as getConnection] (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\ali-rds\node_modules\pify\index.js:56:34)
    at Pool.query (G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\mysql\lib\Pool.js:202:8)
    at G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle\node_modules\ali-rds\node_modules\pify\index.js:29:7
    sql: select now() as currentTime;
code: "ER_NOT_SUPPORTED_AUTH_MODE"
errno: 1251
sqlMessage: "Client does not support authentication protocol requested by server; consider upgrading MySQL client"
sqlState: "08004"
fatal: true
name: "ER_NOT_SUPPORTED_AUTH_MODEError"
pid: 52716
hostname: HSQ

2021-05-14 00:39:01,546 ERROR 52716 [app_worker] start error, exiting with code:1
```

当我在mysql当中运行命令

```sql
 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password  BY 'huang';
```

奇迹般的

```shell
PS G:\Study\Code\Web\NodeJS\some-project\use-egg-build-middle> yarn dev
yarn run v1.22.10
$ egg-bin dev
[egg-ts-helper] create typings\app\controller\index.d.ts (2ms)
[egg-ts-helper] create typings\config\index.d.ts (18ms)
[egg-ts-helper] create typings\config\plugin.d.ts (3ms)
[egg-ts-helper] create typings\app\index.d.ts (1ms)
2021-05-14 00:44:48,027 INFO 23128 [master] node version v14.15.3
2021-05-14 00:44:48,028 INFO 23128 [master] egg version 2.29.4
2021-05-14 00:44:49,445 INFO 23128 [master] agent_worker#1:42820 started (1413ms)
2021-05-14 00:44:51,074 INFO 23128 [master] egg started on http://127.0.0.1:7001 (3045ms)
```

连接数据库成功了

```shell
RowDataPacket { ar_id: 12, ar_title: 'the life of js' }
```

