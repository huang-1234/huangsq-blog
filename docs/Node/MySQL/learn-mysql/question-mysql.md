## 常见问题

下面列出了最常见的 MySQL 面试问题和答案。

### MySQL 是什么？

MySQL 是一个多线程、多用户的 SQL 数据库管理系统，安装量超过 1100 万。这是世界第二最受欢迎和广泛使用的开源数据库。有趣的是 MySQL 的名称是如何被赋予这种查询语言的。My 是共同创始人 Michael Widenius 的女儿的名字，而 SQL 是结构化查询语言的缩写形式。对于开发人员而言，使用 MySQL 是免费的，但是企业必须向 Oracle 支付许可费。

最初 MySQL 由一家营利性公司 MySQL AB 拥有，然后被 Sun Microsystems 收购，然后 Oracle 收购了 Sun Microsystems，Oracle 目前拥有 MySQL。

MySQL 是 Oracle 支持的基于结构化查询语言的关系数据库管理系统 (RDBMS)。MySQL 支持多种操作系统，其中最著名的包括 Windows、Linux 和 UNIX。尽管可以使用 MySQL 开发各种应用程序，但它仅用于 Web 应用程序和在线发布。它被称为 Lamp 的开源企业的基本组成部分。

Lamp 是什么？

Lamp 是用于 web 开发的平台。Lamp 分别使用 Linux、Apache、MySQL 和 PHP 作为操作系统、web 服务器、数据库和面向对象的脚本语言。因此缩写为 LAMP。

### MySQL 是由哪种语言实现的？

MySQL 主要使用 C 和 C++ 实现的，但是 SQL 解析器是由 yacc 实现。

### MySQL 的技术特性有哪些？

灵活的数据结构

高性能的表现

方便使用和管理

灵活的复制和高可用性

存储管理和安全

Drivers

图形界面工具

MySQL 企业级监控

MySQL 企业级安全

JSON 支持

灵活的复制和高可用性（重复）

Manageability and Ease of Use

OLTP and 事务

支持 Geo

### MySQL 和 SQL 有什么区别？

SQL 被称为标准查询语言。它被用来与数据库进行交互，比如 MySQL。

MySQL 是一个存储各种类型的数据并保证其安全性的数据库，需要 PHP 脚本来存储和检索数据库中的值。

SQL 是一种计算机语言，而 MySQL 是一种软件或应用程序。

SQL 用于创建数据库管理系统，而 MySQL 用于启用数据处理、存储、删除和修改数据。

### 数据库和表有什么区别？

数据库和表之间有很大的区别。区别如下：

表是一种表示数据库中数据划分的方式，而数据库是表和数据的集合。
表用于将相互关联的数据分组并创建数据集。该数据集将在数据库中使用。以任何形式存储在表中的数据都是数据库的一部分，反之亦然。
数据库是有组织数据的集合，也是用于访问这些数据的功能，而表是用于存储数据的行和列的集合。

### 为什么使用 MySQL 数据库服务器？

首先，MySQL 服务器是免费的，开发者可以使用 ，企业只需支付少量费用。

MySQL 服务器是开源的。

MySQL 社区非常强大且具有支持性，因此，有关 MySQL 的任何帮助都会尽快解决。

MySQL 具有非常稳定的版本，因为 MySQL 已经在市场上很长时间了，因此以前版本中出现的所有错误都被不断清除，并且每次更新后都会提供一个非常稳定的版本。

MySQL 数据库服务器非常快速、可靠且易于使用。您可以轻松使用和修改软件。MySQL 软件可以免费从网上下载。

### MySQL 中有哪些表存储引擎？

默认情况下有许多表存储引擎仍然存在。在 MySQL5.5 版本之前，默认引擎是 MyISAM，之后是 InnoDB。MySQL 存储引擎有：

InnoDB

MyISAM

MEMORY

MERGE

### CHAR 和 VARCHAR 有什么区别？

CHAR 和 VARCHAR 的差异：

CHAR 是可变长度的，而 VARCHAR 是固定长度的。

CHAR 和 VARCHAR 类型在存储和检索中不同。

CHAR 列的长度固定为创建表时声明的长度。长度范围是 1 到 255。

当使用空格将 CHAR 值右填充到特定长度时存储 CHAR 值。检索 CHAR 值时会删除尾随空格。

CHAR 使用静态内存分配，而 VARCHAR 使用动态内存分配。

CHAR 比 VARCHAR 快 50%。

### MySQL 中的 TRUNCATE 和 DELETE 有什么区别？

TRUNCATE 是一个 DDL 命令，DELETE 是一个 DML 命令。

不能将 Where 命令与 TRUNCATE 一起使用，但可以将其与 DELETE 命令一起使用。

TRUNCATE 不能与索引视图一起使用，而 DELETE 可以与索引视图一起使用。

DELETE 命令用于从表中删除数据。它只删除表中的数据行，而 TRUNCATE 是非常危险的命令，应谨慎使用，因为它会永久删除表中的每一行。

### MySQL 中允许多少个触发器？

MySQL 数据库中只允许使用六个触发器。

Before Insert
After Insert
Before Update
After Update
Before Delete
After Delete

### 内存表（heap table）是什么？

内存中存在的表称为内存表。在 MySQL 中创建内存表时，您需要将类型指定为 HEAP。它们被临时用于高速存储。它们不允许 BLOB 或文本字段。

### MySQL 中的 BLOB 和 TEXT 是什么？

BLOB 是大型二进制对象的缩写。它用于保存可变数量的数据。

BLOB 有四种类型。

TINYBLOB
BLOB
MEDIUMBLOB
LONGBLOB
这些类型之间的差异是它们可以保存的值的最大长度。

TEXT 是不区分大小写的 BLOB。TEXT 值是非二进制字符串（字符串）。它们具有一个字符集，并根据字符集的排序规则存储值并进行比较。

TEXT 有四种类型。

TINYTEXT
TEXT
MEDIUMTEXT
LONGTEXT

### MySQL 中的触发器是什么？

触发器是一组响应某些事件而执行的代码。

### 内存表和临时表有什么区别

内存表：

内存中存在的表。它们被临时用于高速存储。它们不允许 BLOB 或文本字段。

不支持 AUTO_INCREMENT。

索引不应为空。

临时表：

临时表用于保留临时数据。有时在某些情况下保存临时数据会很有用。当前客户会话终止后，将删除临时表。

主要区别：

内存表在客户端之间共享，而临时表不共享。

内存表只是一个存储引擎，而对于临时表，则需要特殊权限（创建临时表）。

### FLOAT 和 DOUBLE 有什么区别？

FLOAT 存储精度高达 8 位的浮点数并分配 4 字节，而 DOUBLE 存储精度高达 18 位的浮点数并分配 8 个字节。

### 与 Oracle 相比，MySQL 有哪些优势？

MySQL 是一个免费、快速、可靠、开源的关系型数据库，而 Oracle 是昂贵的，尽管它提供了 Oracle 免费版来吸引 MySQL 用户。
MySQL 在笔记本电脑上仅使用不到 1 MB 的 RAM ，而安装 Oracle 9i 需要 128 MB。
MySQL 非常适合支持数据库的网站，而 Oracle 是面向企业的。
MySQL 是可移植的。

### MySQL 有什么缺点？

对于大型数据库而言，MySQL 效率不高。
低于 5.0 版本不支持 COMMIT 和 STORED PROCEDURES 函数。
交易处理效率不高。
MySQL 的功能高度依赖于其他插件。
发展不是社区驱动的。

### CHAR 和 VARCHAR 有什么区别？

CHAR 和 VARCHAR 类型在存储和检索中不同。
CHAR 是可变长度的，而 VARCHAR 是固定长度的。
CHAR 类型最多可以容纳 255 个字符，而 VARCHAR 可以容纳 4000 个字符。
CHAR 比 VARCHAR 快 50%。
CHAR 使用静态内存分配，而 VARCHAR 使用动态内存分配。

### MySQL_connect 和 MySQL_pconnect 有什么区别？

Mysql_connect:

它将打开与数据库的新连接。
每次需要打开和关闭数据库连接时，视请求而定。
每次加载页面时都会打开页面。
Mysql_pconnect:

在 Mysql_pconnect 中，"p" 代表持久连接，因此它将打开持久连接。
无法关闭数据库连接。
如果您的站点流量较大，这将更加有用，因为不需要在每次加载页面时频繁打开和关闭连接。

### MySQL 中的 "i_am_a_dummy flag" 是做什么的？

如果 WHERE 子句不存在，"i_am_a_dummy flag" 允许 MySQL 引擎拒绝执行任何 UPDATE 或 DELETE 语句。因此，如果程序员不使用 WHERE 子句，它可以避免删除整个表的错误。

### 如何在 MySQL 中获取当前日期？

要获取当前日期，可使用：

SELECT CURRENT_DATE();

### 使用 MySQL 时有哪些安全警报？

安装防病毒软件并配置操作系统的防火墙。

切勿将 MySQL 服务器用作 UNIX 根用户。

更改 root 用户名和密码限制或禁用远程访问。

### 如何通过 Mysqladmin 更改现有用户的密码？

Mysqladmin -u root -p password "newpassword"

### Unix 时间戳和 MySQL 时间戳有什么区别？

Unix 时间戳和 MySQL 时间戳都存储为 32 位整数，但是 MySQL 时间戳以 YYYY-MM-DD HH:MM:SS 格式的可读格式表示。

### 如果在 MySQL 查询中表格中第 N 个最高薪水？

假设一个名为 employee 的表。

要找到第 N 个高薪水：

select distinct(salary) from employee order by salary desc limit n-1,1

如果您想找到第三大薪水：

select distinct(salary) from employee order by salary desc limit 2,1

### MySQL 默认的端口号是多少？

MySQL 的默认端口号是 3306。

### REGEXP 是什么？

REGEXP 是使用正则表达式的模式匹配。正则表达式是为复杂搜索指定模式的有效方法。

基本上，它是用于描述搜索模式的特殊文本字符串。为了更好地理解它，可以考虑日常生活的情况，当您在文件管理器中搜索 .txt 文件以列出所有文本文件时就会用到它。与 .txt 等价的正则表达式为 .\*\.txt。

### 最多可以创建多少个索引？

一个标准表最多可以创建 16 个索引。

### NOW () 和 CURRENT_DATE () 有什么区别？

NOW() 用于显示当今的年、月、日、小时、分钟和秒，而 CURRENT_DATE() 仅显示当今的年、月、日。

### 显示前 20 行的查询语句是什么？

SELECT \* FROM table_name LIMIT 0,20;

### 显示当前日期和时间的查询语句是什么？

如果要显示当前日期和时间，使用：

SELECT NOW();

如果只想显示当前日期，使用：

SELECT CURRENT_DATE();

### MySQL 中的保存点是什么？

任何事务中定义的点都称为保存点。

SAVEPOINT 是 MySQL 中的一条语句，用于设置具有标识符名称的命名事务保存点。

### SQLyog 是什么？

SQLyog 程序是最流行的 GUI 管理工具。它是最流行的 MySQL 管理和管理工具。它结合了 MySQL administrator、phpMyadmin 等 MySQL 前端和 MySQL GUI 工具的特点。

### 如何在 MySQl 中备份数据库？

使用 phpMyAdmin 备份数据很容易。单击左侧导航栏中的数据库名称，选择要备份的数据库。然后单击「导出」按钮，确保所有要备份的表都高亮显示。然后在导出下指定所需的选项并保存输出。

### MySQL 中有哪些不同的列比较运算符？

=、<>、<=、<、>=、>、<<、>>、< = >、AND、OR 或 LIKE 运算符是 MySQL 中的比较运算符。这些运算符通常与 SELECT 语句一起使用。

### 编写查询以计算 MySQL 中表的行数。

SELECT COUNT user_id FROM users;

### 编写查询以检索从 20 开始的一百本书。

SELECT book_title FROM books LIMIT 20, 100;

### 编写查询以选择赢得 1、3、5 或 7 场比赛的所有球队。

SELECT team_name FROM team WHERE team_won IN (1, 3, 5, 7);

### MySQL Server 默认的端口号是什么？

MySQL Server 的默认端口号是 3306。

### MyISAM 表如何存储？

MyISAM 表以三种格式存储在磁盘上。

'.frm' file ：存储表定义

'.MYD' (MYData) ：数据文件

'.MYI' (MYIndex) ：索引文件

### MySQL 中 ENUM 的用法是什么？

ENUM 是字符串对象，通过定义 ENUM，我们允许最终用户提供正确的输入，如果用户提供的输入不属于 ENUM 定义的数据，则该查询不会执行，并显示一条错误信息 "Wrong Query"。例如，假设我们要以用户的性别作为输入，所以我们指定 ENUM('male', 'female', 'other')，因此，当用户尝试输入除这三个字符串以外的任何字符串时，都会导致错误。

ENUM 用于限制表中可能出现的值：

例如：

CREATE TABLE months (month ENUM 'January', 'February', 'March');
INSERT months VALUES ('April');

### MyISAM 与 InnoDB 相比有什么优势？

MyISAM 遵循保守的磁盘空间管理方法，将每个 MyISAM 表存储在单独的文件中，如果需要，可以进一步压缩。而 InnoDB 将表存储在表空间中，进一步优化是困难的。

### MySQL_fetch_array ()、MySQL_fetch_object ()、MySQL_fetch_row () 之间有什么区别？

Mysql_fetch_object 以对象的形式返回结果，mysql_fetch_array 以数组的形式返回结果。这将允许通过字段名称访问数据。

例如：

使用 mysql_fetch_object 可以使用 \$result->name 访问字段。

使用 mysql_fetch_array 可以使用 \$result->[name] 访问字段。

使用 mysql_fetch_row($result)，其中 $result 是使用 mysql_query() 函数执行的成功查询返回的结果。

示例：

$result = mysql_query("SELECT * from students");    
while($row = mysql_fetch_row(\$result))  
{  
 Some statement;  
}

### mysql_connect 和 mysql_pconnect 有什么区别？

Mysql_connect() 用于打开与数据库的新连接，而 mysql_pconnect() 用于打开与数据库的持久连接，这意味着每次加载页面时 mysql_pconnect() 都不会打开数据库。

### mysql_close () 有什么用？

Mysql_close() 无法关闭持久连接，但可以用来关闭由 mysql_connect() 打开的连接。

### MySQL 数据目录是什么？

MySQL 数据目录是 MySQL 存储数据的地方。该数据字典下的每个子目录都代表一个 MySQL 数据库。默认情况下，MySQL = server mysqld 管理的信息存储在数据目录中。

### 如何确定 MySQL 数据目录的位置。

Windows 中 MySQL 数据目录的默认位置为 C:\mysql\data 或 C:\Program Files\MySQL\MySQL Server 5.0 \data。

### MySQL 中怎么使用正则表达式？

在 MySQL 中，查询中使用正则表达式来搜索字符串的模式。

- 匹配前面的元素的零次或多次。

* 匹配前面的元素的一次或多次。
  ? 匹配前面的元素的零次或一次。
  . 匹配一个字符。
  [abc] 匹配 a 或 b 或 c。
  | 分隔字符串。
  ^ 匹配字符串开头。
  "." 匹配任何单个字符。
  "|" 匹配两个字符串之一。
  REGEXP 将输入字符与数据库进行匹配。
  示例：

以下语句检索 employee_name 列包含文本 1000 的所有行：

Select employee_name  
From employee  
Where employee_name REGEXP '1000'  
Order by employee_name

### MySQL 中 "i-am-a-dummy" 标志的用法是什么？

在 MySQL 中，"i-am-a-dummy" 标志使 MySQL 引擎拒绝 UPDATE 和 DELETE 命令，除非存在 WHERE 子句。

### 哪个命令用于查看 MySQL 中表的内容？

SELECT 命令用于查看 MySQL 中表的内容。

### 解释访问控制列表。

ACL 是与对象关联的权限列表。MySQL 将访问控制列表缓存在内存中，每当用户尝试验证或执行命令时，MySQL 都会检查对象所需的权限，如果权限可用，则执行将成功完成。

### InnoDB 是什么？

InnoDB 是 SQL 的存储数据库。提供了 ACID 事务，并且支持外键。最初由 InnobaseOY 拥有，自 2005 年起收购 Oracle 后，现在归 Oracle Corporation 所有。

### ISAM 是什么？

它是 IBM 开发的文件管理系统，允许记录按顺序甚至是随机访问。

### 如何在 MySQL 中运行批处理模式？

要在 MySQL 中执行批处理模式，我们使用以下命令：

mysql;

mysql mysql.out;

### 什么是联合表？

联合表是指向位于其他服务器上其他数据库上的表的表。

### 主键和候选键有什么区别？

要标识表的每一行，使用主键。对于一个表，仅存在一个主键。

候选关键字是一列或一组列，可用于唯一标识数据库中的任何记录，而不必引用任何其他数据。

### MySQL 中的驱动程序是什么？

以下是 MySQL 中可用的驱动程序：

PHP Driver

JDBC Driver

ODBC Driver

C WRAPPER

PYTHON Driver

PERL Driver

RUBY Driver

CAP11PHP Driver

Ado.net5.mxz

### DDL、DML 和 DCL 是什么？

SQL 命令主要可以分为三类，即 DDL、DML 和 DCL。

数据定义语言 (DDL) 处理所有数据库模式，并定义数据应如何驻留在数据库中。诸如 Create TABLE 和 ALTER TABLE 之类的命令是 DDL 的一部分。

数据操作语言 (DML) 处理数据的操作和操纵，DML 中的命令包括 Insert、Select 等。

数据控制语言 (DCL) 与授予和权限有关。简而言之，访问权限是由数据库定义的。

---
