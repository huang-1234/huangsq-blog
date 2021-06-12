## mysql root密码忘记重置密码

```
【摘要】因为每个系统mysql 的配置文件位置不同，我们只需要修改mysql的配置文件my.cnf即可实现免密登录 1、修改mysql配置文件 在mysql的配置文件里面添加skip-grant-tables保存即可 [mysqld] bind-address = 0.0.0.0 skip-grant-tables    #添加此行代码即可 2、重启mysql服务 servier  mys...
```

因为每个系统mysql 的配置文件位置不同，我们只需要修改mysql的配置文件my.cnf即可实现免密登录

1、修改mysql配置文件

在mysql的配置文件里面添加skip-grant-tables保存即可

[mysqld]
bind-address = 0.0.0.0
skip-grant-tables #添加此行代码即可

2、重启mysql服务

servier mysqld restart 

3、进入mysql数据库

注意：mysql数据库的user表中没有password这个字段会报错，只有authentication_string这个字段，

```javascript
[root@mysql ~]# mysql

mysql> use mysql;

mysql> update user set password = password("*****") where user='root';
ERROR 1054 (42S22): Unknown column 'password' in 'field list'

mysql> update user set authentication_string=password("*****") where user='root';
Query OK, 1 row affected, 1 warning (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 1

mysql> flush privileges;   # 立即生效
Query OK, 0 rows affected (0.02 sec)
```