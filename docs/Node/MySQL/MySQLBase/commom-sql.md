# mysql语句大全

### 操作数据库
```sql
#登录数据库
mysql -hlocalhost -uroot -p;
#修改密码
mysqladmin -uroot -pold password new;

#显示数据库
show databases;
#显示数据表
show tables;
#选择数据库
use examples;
#创建数据库并设置编码utf-8 多语言
create database `examples` default character set utf8 collate utf8_general_ci;
#删除数据库
drop database examples;
```

### 表相关
```sql
#创建表
create table test(
    id int(10) unsigned zerofill not null auto_increment,
    email varchar(40) not null,
    ip varchar(15) not null,
    state int(10) not null default '-1',
    primary key (id)
)engine=InnoDB;
#显示表结构
describe 
#删除表
drop table test；
#重命名表
alter table test_old rename test_new;
#添加列
alter table test add cn int(4) not null;
#修改列
alter table test change id id1 varchar(10) not null;
#删除列 
alter table test drop cn;
#创建索引
alter table test add index (cn,id);
#删除索引
alter table test drop index cn
```

### 数据操作
```sql
#插入数据
insert into test (id,email,ip,state) values(2,'qq@qq.com','127.0.0.1','0');
#删除数据 
delete from test where id = 1;
#修改数据
update test set id='1',email='q@qq.com' where id=1;
#查数据
select * from test;  #取所有数据
select * from test limit 0,2;  #取前两条数据 
select * from test email like '%qq%' #查含有qq字符 _表示一个 %表示多个
select * from test order by id asc;#降序desc
select * from test id not in('2','3');#id不含2,3或者去掉not表示含有
select * from test timer between 1 and 10;#数据在1,10之间

#---------------------------表连接知识------------------------------
#等值连接又叫内链接 inner join 只返回两个表中连接字段相等的行
select * from A inner join B on A.id = B.id; #写法1
select * from A,B where A.id = B.id; #写法2
select a.id,a.title from A a inner join B b on a.id=b.id and a.id=1;#写法3 表的临时名称
select a.id as ID,a.title as 标题 from A inner join B on A.id=B.id;#添加as字句

#左连接又叫外连接 left join 返回左表中所有记录和右表中连接字段相等的记录
select * from A left join B on A.id = B.id;

select * from A left join (B,C,D) on (B.i1=A.i1 and C.i2=A.i2 and D.i3 = A.i3);#复杂连接

#右连接又叫外连接 right join 返回右表中所有记录和左表中连接字段相等的记录
select * from A right join B on A.id = B.id;

#完整外部链接 full join 返回左右表中所有数据
select * from A full join B on A.id = B.id;

#交叉连接 没有where字句 返回卡迪尔积
select * from A cross join B;
-------------------------表连接结束------------------------------------------------------------
-----------------索引创建------------------------------------------------
show index from A #查看索引
alter table A add primary key(id) #主键索引
alter table A add unique(name) #唯一索引
alter table A add index name(name) #普通索引
alter table A add fulltext(name) #全文索引
alter table A add index name(id,name) #多列索引
```


### 常用函数
```sql
abs(-1)#绝对值
pi()#pi值
sqrt(2)#平方根
mod(-5,3)#取余-2
ceil(10.6)#进位+1 结果11 ceil(10.0)结果10
floor(10.6)#取整 10
round(2.5)#四舍五入到整数 结果3
round(2.5,2)#保留两位小数 结果2.50
truncate(2.5234,3)#取小数后3位不四舍五入 2.523
sign(-2);#符号函数 返回-1 0还是0 正数返回1
pow(2,3),exp(2);#2的3次幂 或e的2次幂
log(2),log10(2);#求对数
radians(180),degrees(0.618);#角度弧度转换
sin(0.5),asin(0.5)#正弦和反正弦 类似cos acos tan atan
length('hi')#计算字符长度
concat('1',1,'hi')#合并字符串
insert('12345',1,0,'7890');#从开头第1个字符开始到0个结束，替换成后边字符串，0表示在最前边插入
ucase('a'),lcase('A')#转成大写和小写
left('abcd',2),right('abcd',2);#返回前两个字符和后两个字符
ltrim('  0  '),rtrim(' 0 '),trim('  0  ')#删除空格
replace('1234567890','345678','0');#替换输出12090
substring('12345',1,2)#取字符 输出12 1是位置 2是长度
instr('1234','234');#取得234位置是2
reverse('1234');#反序输出4321
current()#返回日期
curtime()#返回时间
now()#返回日期时间
month(now())#当前月份 monthname 英文月份
dayname(now())#星期英文 dayofweek()1是星期天 weekday()1是星期二
week(now())#本年第多少周
dayofyear(now()),dayofmonth(now())#今天是本年第多少天 今天是本月第多少天
year(now()),month(now()),day(now()),hour(now()),minute(now()),second(now())#返回年月日 时分秒
time_to_sec(now()),sec_to_time(3600*8);#转换时间为秒和还原
version()#mysql版本
database()#当前连接的数据库 没有为null
user()#获取用户名
md5('a')#加密字符串
ascii('a')#ascii值97
bin(100),hex(100),oct(100)#返回二进制 十六进制 八进制
conv(10001,2,8);#各种进制相互转换
rand()#生成0到1之间随机数
sleep(0.02)#暂停秒数
```



### MySQL DATE_FORMAT() 函数

```sql
[MySQL Date 函数](http://www.w3school.com.cn/sql/sql_dates.asp)

## 定义和用法
DATE_FORMAT() 函数用于以不同的格式显示日期/时间数据。
### 语法
```

DATE_FORMAT(date,format)
```sql

 参数是合法的日期。 规定日期/时间的输出格式。

可以使用的格式有：

格式 描述

|      |                                                |
| ---- | ---------------------------------------------- |
| %a   | 缩写星期名                                     |
| %b   | 缩写月名                                       |
| %c   | 月，数值                                       |
| %D   | 带有英文前缀的月中的天                         |
| %d   | 月的天，数值(00-31)                            |
| %e   | 月的天，数值(0-31)                             |
| %f   | 微秒                                           |
| %H   | 小时 (00-23)                                   |
| %h   | 小时 (01-12)                                   |
| %I   | 小时 (01-12)                                   |
| %i   | 分钟，数值(00-59)                              |
| %j   | 年的天 (001-366)                               |
| %k   | 小时 (0-23)                                    |
| %l   | 小时 (1-12)                                    |
| %M   | 月名                                           |
| %m   | 月，数值(00-12)                                |
| %p   | AM 或 PM                                       |
| %r   | 时间，12-小时（hh:mm:ss AM 或 PM）             |
| %S   | 秒(00-59)                                      |
| %s   | 秒(00-59)                                      |
| %T   | 时间, 24-小时 (hh:mm:ss)                       |
| %U   | 周 (00-53) 星期日是一周的第一天                |
| %u   | 周 (00-53) 星期一是一周的第一天                |
| %V   | 周 (01-53) 星期日是一周的第一天，与 %X 使用    |
| %v   | 周 (01-53) 星期一是一周的第一天，与 %x 使用    |
| %W   | 星期名                                         |
| %w   | 周的天 （0=星期日, 6=星期六）                  |
| %X   | 年，其中的星期日是周的第一天，4 位，与 %V 使用 |
| %x   | 年，其中的星期一是周的第一天，4 位，与 %v 使用 |
| %Y   | 年，4 位                                       |
| %y   | 年，2 位                                       |
```
### 实例

下面的脚本使用 DATE_FORMAT() 函数来显示不同的格式。我们使用 NOW() 来获得当前的日期/时间：

```sql
DATE_FORMAT(NOW(),'%b %d %Y %h:%i %p')
DATE_FORMAT(NOW(),'%m-%d-%Y')
DATE_FORMAT(NOW(),'%d %b %y')
DATE_FORMAT(NOW(),'%d %b %Y %T:%f')
```

结果类似：

```sql
Dec 29 2008 11:45 PM
12-29-2008
29 Dec 08
29 Dec 2008 16:25:46.635
--------------------
数据库优化
1.开启缓存，尽量使用php函数而不是mysql
2. explain select 语句可以知道性能
3.一行数据使用 limit 1；
4.为搜索字段重建索引 比如关键字 标签
5.表连接join保证字段类型相同并且有其索引
6.随机查询使用php $r = mysql_query("SELECT count(*) FROM user");
                    $d = mysql_fetch_row($r);
                    $rand = mt_rand(0,$d[0] - 1);
                    $r = mysql_query("SELECT username FROM user LIMIT $rand, 1");
7.避免使用select * 应该使用具体字段
8.每张表都是用id主键，并且是unsigned int
9.对于取值有限而固定使用enum类型，如性别 国家 名族 部门 状态
10.尽可能使用not null ip存储使用int(4),使用ip 转化函数ip2long()相互long2ip()
11.delete和insert语句会锁表，所以可以采用分拆语句操作
    while(1){操作语句;usleep(2000);}
12.选择正确的存储引擎；MyISAM适合大量查询 写操作多用InnoDB支持事务

#存储过程
#存储程序
delimiter #定义存储程序
create procedure getversion(out params varchar(20)) #params是传出参数 in传进 out传出 inout传回
begin
select version() into params; #版本信息赋值params
end
call getversion(@a); #调用存储过程
select @a;
delimiter #定义存储函数
create function display(w varchar(20)) returns varchar(20)
begin
return concat('hello',w);
end
select display('world');

drop procedure if exists spName; #删除一个存储过程
alter function spName [];#修改一个存储过程
show create procedure spName;#显示存储过程信息
declare varName type default value;#声明局部变量
#if语句
if 条件 then 语句
elseif 条件 then 语句
else 语句
end if
#case语句
case 条件
when 条件 then 语句
when 条件 then 语句
else 语句
end case
#loop语句
fn:loop
语句
end loop fn;
leave fn #退出循环
#while语句
fn：while 条件 do
语句
end while fn


#mysql使用帮助资料
? contents; #列出帮助类型
? data types;#列出数据类型
？ int;#列出具体类型
? show;#show语句
? create table;#
#常见表的比较
                    Myisam   BDB    Memory    InnoDB    Archive
存储限制        no           no      yes                64T        no
事物安全                      支持                         支持                         
锁机制         表锁           页锁    表锁             行锁          行锁
全文索引       支持
外键支持                                                        支持
myisam  frm存储表定义 MYD存储数据 MYI存储索引
InnoDB 用于事务处理
char 和 varchar保存和索引都不相同
浮点数float(10,2) 定点数decimal(10,2)
长度一定下，浮点数表示更大数据范围，缺点是引起精度丢失，货币等使用定点数存储
        索引适合于where字句或者连接字句列
        对于唯一值使用唯一索引

添加新用户 grant select,insert,update,delete on *.* to Yoby@localhost identified by 'mysql'; 
#           *.* 数据库名.表名，限制登录某一个数据库 test.*                           localhost是本地主机 网络可以使用 '%'代替所有主机        'mysql'是密码 Yoby是用户名  所有权限可以用 all代替
查看用户权限 show grants for 'root'@'localhost';
移除权限  revoke all on *.* from root@localhost;
group by id 分组
having 限制字句
select1 union select2 联合查询有重复去掉保留一行
select2 union all select2 所有行合并到结果集中去
--------------------------------------------------------------------
修改MYSQL参数
show variables like '%Func%';
set global log_bin_trust_function_creators=1;
show variables like '%Func%';
```