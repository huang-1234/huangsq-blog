# MySQL Login

1、第一步，用管理员身份运行命令提示符，并进入mysql安装或解压的根目录，再进入bin目录，我这里目录是D:\programs\mysql-8.0.21-winx64\bin
2、第二步，登录mysql数据库。在命令行工具输入下面命令后按回车

```sql
mysql -u root -p
```

3、这里会提示你输入root的密码，输入你自己的密码按回车即可。 Enter password: ******
4、接着输入下面这行命令后回车：

ALTER USER ‘root’@‘localhost’ IDENTIFIED WITH mysql_native_password
BY ‘viva1234’;

5、最后再输入如下命令，然后按回车：

> FLUSH PRIVILEGES;

至此，就能够成功连接mysql数据库获取到相应数据了。

