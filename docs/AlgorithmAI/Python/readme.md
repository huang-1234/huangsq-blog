今天给大家介绍一下 200 多个 Python 标准库，让大家对 Python 标准库有一个大致的认识。

## **关于 Python 标准库**

**01**

众所周知，Python 是一个依赖强大的组件库完成对应功能的语言，为了便捷实现各项功能，前辈大牛们打造了多种多样的工具库公开提供给大众使用，而越来越多的库已经因为使用的广泛和普遍及其功能的强大，已经成为 Python 的标准库。

时至今日，Python 标准库已经非常庞大，所提供的组件涉及范围十分广泛，正如本文后面的内容中所显示的。这个库包含了多个内置模块 (以 C 编写)，Python 程序员必须依靠它们来实现系统级功能，例如文件 I/O，此外还有大量以 Python 编写的模块，提供了日常编程中许多问题的标准解决方案。其中有些模块经过专门设计，通过将特定平台功能抽象化为平台中立的 API 来鼓励和加强 Python 程序的可移植性。

Windows 版本的 Python 安装程序通常包含整个标准库，往往还包含许多额外组件。对于类 Unix 操作系统，Python 通常会分成一系列的软件包，因此可能需要使用操作系统所提供的包管理工具来获取部分或全部可选组件。

在这个标准库以外还存在成千上万并且不断增加的其他组件 (从单独的程序、模块、软件包直到完整的应用开发框架)，均可以在网络上搜索到并下载使用。

**目录列表**

**02**

本文将按以下顺序列举各分类下的标准库：

- 文本
- 二进制数据
- 数据类型
- 数学
- 函数式编程
- 文件与目录
- 持久化
- 压缩
- 文件格式化
- 加密
- 操作系统工具
- 并发
- 进程间通信
- 互联网
- HTML 与 XML
- 互联网协议与支持
- 多媒体
- 国际化
- 编程框架
- Tk 图形用户接口
- 开发工具
- 调试
- 运行时
- 解释器
- 导入模块
- Python 语言
- 其它
- Windows 相关
- Unix 相关

**文本**

string：通用字符串操作

re：正则表达式操作

difflib：差异计算工具

textwrap：文本填充

unicodedata：Unicode 字符数据库

stringprep：互联网字符串准备工具

readline：GNU 按行读取接口

rlcompleter：GNU 按行读取的实现函数

**二进制数据**

struct：将字节解析为打包的二进制数据

codecs：注册表与基类的编解码器

**数据类型**

datetime：基于日期与时间工具

calendar：通用月份函数

collections：容器数据类型

collections.abc：容器虚基类

heapq：堆队列算法

bisect：数组二分算法

array：高效数值数组

weakref：弱引用

types：内置类型的动态创建与命名

copy：浅拷贝与深拷贝

pprint：格式化输出

reprlib：交替 repr()的实现

**数学**

numbers：数值的虚基类

math：数学函数

cmath：复数的数学函数

decimal：定点数与浮点数计算

fractions：有理数

random：生成伪随机数

**函数式编程**

itertools：为高效循环生成迭代器

functools：可调用对象上的高阶函数与操作

operator：针对函数的标准操作

**文件与目录**

os.path：通用路径名控制

fileinput：从多输入流中遍历行

stat：解释 stat()的结果

filecmp：文件与目录的比较函数

tempfile：生成临时文件与目录

glob：Unix 风格路径名格式的扩展

fnmatch：Unix 风格路径名格式的比对

linecache：文本行的随机存储

shutil：高级文件操作

macpath：MacOS 9 路径控制函数

**持久化**

pickle：Python 对象序列化

copyreg：注册机对 pickle 的支持函数

shelve：Python 对象持久化

marshal：内部 Python 对象序列化

dbm：Unix“数据库”接口

sqlite3：针对 SQLite 数据库的 API2.0

**压缩**

zlib：兼容 gzip 的压缩

gzip：对 gzip 文件的支持

bz2：对 bzip2 压缩的支持

lzma：使用 LZMA 算法的压缩

zipfile：操作 ZIP 存档

tarfile：读写 tar 存档文件

**文件格式化**

csv：读写 CSV 文件

configparser：配置文件解析器

netrc：netrc 文件处理器

xdrlib：XDR 数据编码与解码

plistlib：生成和解析 Mac OS X.plist 文件

**加密**

hashlib：安全散列与消息摘要

hmac：针对消息认证的键散列

**操作系统工具**

os：多方面的操作系统接口

io：流核心工具

time：时间的查询与转化

argparser：命令行选项、参数和子命令的解析器

optparser：命令行选项解析器

getopt：C 风格的命令行选项解析器

logging：Python 日志工具

logging.config：日志配置

logging.handlers：日志处理器

getpass：简易密码输入

curses：字符显示的终端处理

curses.textpad：curses 程序的文本输入域

curses.ascii：ASCII 字符集工具

curses.panel：curses 的控件栈扩展

platform：访问底层平台认证数据

errno：标准错误记号

ctypes：Python 外部函数库

**并发**

threading：基于线程的并行

multiprocessing：基于进程的并行

concurrent：并发包

concurrent.futures：启动并行任务

subprocess：子进程管理

sched：事件调度

queue：同步队列

select：等待 I / O 完成

dummy_threading：threading 模块的替代（当\_thread 不可用时）

\_thread：底层的线程 API（threading 基于其上）

\_dummy_thread：\_thread 模块的替代（当\_thread 不可用时）

**进程间通信**

socket：底层网络接口

ssl：socket 对象的 TLS / SSL 填充器

asyncore：异步套接字处理器

asynchat：异步套接字命令 / 响应处理器

signal：异步事务信号处理器

mmap：内存映射文件支持

**互联网**

email：邮件与 MIME 处理包

json：JSON 编码与解码

mailcap：mailcap 文件处理

mailbox：多种格式控制邮箱

mimetypes：文件名与 MIME 类型映射

base64：RFC

3548：Base16、Base32、Base64 编码

binhex：binhex4 文件编码与解码

binascii：二进制码与 ASCII 码间的转化

quopri：MIME

quoted - printable 数据的编码与解码

uu：uuencode 文件的编码与解码

**HTML 与 XML**

html：HTML 支持

html.parser：简单 HTML 与 XHTML 解析器

html.entities：HTML 通用实体的定义

xml：XML 处理模块

xml.etree.ElementTree：树形 XML 元素 API

xml.dom：XML DOM API

xml.dom.minidom：XML DOM 最小生成树

xml.dom.pulldom：构建部分 DOM 树的支持

xml.sax：SAX2 解析的支持

xml.sax.handler：SAX 处理器基类

xml.sax.saxutils：SAX 工具

xml.sax.xmlreader：SAX 解析器接口

xml.parsers.expat：运用 Expat 快速解析 XML

**互联网协议与支持**

webbrowser：简易 Web 浏览器控制器

cgi：CGI 支持

cgitb：CGI 脚本反向追踪管理器

wsgiref：WSGI 工具与引用实现

urllib：URL 处理模块

urllib.request：打开 URL 连接的扩展库

urllib.response：urllib 模块的响应类

urllib.parse：将 URL 解析成组件

urllib.error：urllib.request 引发的异常类

urllib.robotparser：robots.txt 的解析器

http：HTTP 模块

http.client：HTTP 协议客户端

ftplib：FTP 协议客户端

poplib：POP 协议客户端

imaplib：IMAP4 协议客户端

nntplib：NNTP 协议客户端

smtplib：SMTP 协议客户端

smtpd：SMTP 服务器

telnetlib：Telnet 客户端

uuid：RFC4122 的 UUID 对象

socketserver：网络服务器框架

http.server：HTTP 服务器

http.cookies：HTTPCookie 状态管理器

http.cookiejar：HTTP 客户端的 Cookie 处理

xmlrpc：XML - RPC 服务器和客户端模块

xmlrpc.client：XML - RPC 客户端访问

xmlrpc.server：XML - RPC 服务器基础

ipaddress：IPv4 / IPv6 控制库

**多媒体**

audioop：处理原始音频数据

aifc：读写 AIFF 和 AIFC 文件

sunau：读写 Sun AU 文件

wave：读写 WAV 文件

chunk：读取 IFF 大文件

colorsys：颜色系统间转化

imghdr：指定图像类型

sndhdr：指定声音文件类型

ossaudiodev：访问兼容 OSS 的音频设备

**国际化**

gettext：多语言的国际化服务

locale：国际化服务

**编程框架**

turtle：Turtle 图形库

cmd：基于行的命令解释器支持

shlex：简单词典分析

**Tk 图形用户接口**

tkinter：Tcl / Tk 接口

tkinter.ttk：Tk 主题控件

tkinter.tix：Tk 扩展控件

tkinter.scrolledtext：滚轴文本控件

**开发工具**

pydoc：文档生成器和在线帮助系统

doctest：交互式 Python 示例

unittest：单元测试框架

unittest.mock：模拟对象库

test：Python 回归测试包

test.support：Python 测试工具套件

venv：虚拟环境搭建

**调试**

bdb：调试框架

faulthandler：Python 反向追踪库

pdb：Python 调试器

timeit：小段代码执行时间测算

trace：Python 执行状态追踪

**运行时**

sys：系统相关的参数与函数

sysconfig：访问 Python 配置信息

builtins：内置对象

main：顶层脚本环境

warnings：警告控制

contextlib：with 状态的上下文工具

abc：虚基类

atexit：出口处理器

traceback：打印或读取一条栈的反向追踪

future：未来状态定义

gc：垃圾回收接口

inspect：检查存活的对象

site：址相关的配置钩子（hook）

fpectl：浮点数异常控制

distutils：生成和安装 Python 模块

**解释器**

code：基类解释器

codeop：编译 Python 代码

**导入模块**

imp：访问 import 模块的内部

zipimport：从 ZIP 归档中导入模块

pkgutil：包扩展工具

modulefinder：通过脚本查找模块

runpy：定位并执行 Python 模块

importlib：import 的一种实施

**Python 语言**

parser：访问 Python 解析树

ast：抽象句法树

symtable：访问编译器符号表

symbol：Python 解析树中的常量

token：Python 解析树中的常量

keyword：Python 关键字测试

tokenize：Python 源文件分词

tabnany：模糊缩进检测

pyclbr：Python 类浏览支持

py_compile：编译 Python 源文件

compileall：按字节编译 Python 库

dis：Python 字节码的反汇编器

pickletools：序列化开发工具

**其他**

formatter：通用格式化输出

**Windows 相关**

msilib：读写 Windows 的 Installer 文件

msvcrt：MS VC + + Runtime 的有用程序

winreg：Windows 注册表访问

winsound：Windows 声音播放接口

**Unix 相关**

posix：最常用的 POSIX 调用

pwd：密码数据库

spwd：影子密码数据库

grp：组数据库

crypt：Unix 密码验证

termios：POSIX 风格的 tty 控制

tty：终端控制函数

pty：伪终端工具

fcntl：系统调用 fcntl()和 ioctl()

pipes：shell 管道接口

resource：资源可用信息

nis：Sun 的 NIS 的接口

syslog：Unix 日志服务
