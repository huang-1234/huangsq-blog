# jdk发展历史

```
Java语言的相关组织和规范（其他语言也有类似的组织）：
JCP：（Java Community Process）由世界上各个为 Java 发展操心的人士组成的社区，参与定义 Java 新特性和新版本制定标准的组织。
JSR：（Java Specification Requests）Java 语言规范请求文档，你可以对 Java 提出新的要求，然后 Java 相关的组织投票决定是否通过，通过后就将这个要求写入 JSR 中，并且最终给出一个开源的实现。
JEP：（Java Enhancement Proposal），Java 增强建议，收集大家对于 JDK 的建议，起草增强 Java 哪些功能的方案，为 JDK 新版本发布及相关工作指定路线。
```

### JAVA 1.0 ,代号Oak（橡树）

于1996-01-23发行

### JAVA 1.1

1997-02-19发行,主要更新内容:

1. 引入JDBC
2. 添加内部类支持
3. 引入JAVA BEAN
4. 引入RMI
5. **引入反射**



### JAVA 1.2, 代号Playground（操场）

1998-12-8发行，主要更新内容：

1. **引入集合框架**
2. 对字符串常量做内存映射
3. **引入JIT（Just In Time）编译器**
4. 引入打包文件数字签名
5. 引入控制授权访问系统资源策略工具
6. 引入JFC（Java Foundation Classes），包括Swing1.0，拖放和Java2D类库
7. 引入Java插件
8. JDBC中引入可滚动结果集，BLOB,CLOB,批量更新和用户自定义类型
9. Applet中添加声音支持

### JAVA1.3，代号Kestrel（红隼）

2000-5-8发布，主要更新内容：

1. 引入Java Sound API
2. 引入jar文件索引
3. 对Java各方面多了大量优化和增强
4. **Java Platform Debugger Architecture**用于 Java 调式的平台。

### JAVA 1.4，代号Merlin（隼）

2004-2-6发布（首次在JCP下发行），主要更新内容：

1. 添加XML处理
2. 添加Java打印服务（Java Print Service API）
3. **引入Logging API**
4. 引入Java Web Start
5. 引入JDBC 3.0 API
6. 引入断言
7. 引入Preferences API
8. 引入链式异常处理
9. 支持IPV6
10. 支持正则表达式
11. 引入Image I/O API
12. **NIO，非阻塞的 IO，优化 Java 的 IO 读取。**

### JAVA 5.0，代号Tiger（老虎），有重大改动

2004-9-30发布，主要更新内容：

1. **引入泛型**
2. **For-Each循环** 增强循环，可使用迭代方式
3. **自动装箱与自动拆箱**
4. 引入类型安全的枚举
5. **引入可变参数**
6. **添加静态引入**
7. **引入注解**
8. **引入Instrumentation**
9. **提供了 java.util.concurrent 并发包。**

### JAVA6，代号Mustang（野马）

2006-12-11发布，主要更新内容：

1. 引入了一个支持脚本引擎的新框架（基于 Mozilla Rhino 的 JavaScript 脚本引擎）
2. UI的增强
3. 对WebService支持的增强（JAX-WS2.0 和 JAXB2.0）
4. 引入JDBC4.0API
5. 引入Java Compiler API
6. 通用的Annotations支持

### JAVA7，代号Dolphin（海豚）

2011-07-28发布，这是sun被oracle收购（2009年4月）后的第一个版本，主要更新内容：

1. **switch语句块中允许以字符串作为分支条件**
2. **在创建泛型对象时应用类型推断**,比如你之前版本使用泛型类型时这样写 `ArrayList<User> userList= new ArrayList<User>();`，这个版本只需要这样写 `ArrayList<User> userList= new ArrayList<>();`，也即是后面一个尖括号内的类型，JVM 帮我们自动类型判断补全了。
3. **在一个语句块中捕获多种异常**
4. **添加try-with-resources语法支持，使用文件操作后不用再显示执行close了。**
5. 支持动态语言
6. JSR203, **NIO.2,AIO,新I/O文件系统，增加多重文件的支持、文件原始数据和符号链接,支持ZIP文件操作**
7. JDBC规范版本升级为JDBC4.1
8. **引入Fork/Join框架，用于并行执行任务**
9. 支持带下划线的数值，如 int a = 100000000;，0 太多不便于人阅读，这个版本支持这样写 int a = 100_000_000，这样就对数值一目了然了。
10. Swing组件增强（JLayer,Nimbus Look Feel…）[参考](https://docs.oracle.com/javase/7/docs/technotes/guides/swing/enhancements-7.html)

### JAVA8

2014-3-19发布，oracle原计划2013年发布，由于安全性问题两次跳票，是自JAVA5以来最具革命性的版本，主要更新内容：

1. **接口改进，接口居然可以定义默认方法实现和静态方法了。**
2. **引入函数式接口**
3. **引入Lambda表达式**
4. **引入全新的Stream API，提供了对值流进行函数式操作。**
5. 引入新的Date-Time API
6. 引入新的JavaScrpit引擎Nashorn
7. 引入Base64类库
8. 引入并发数组（parallel）
9. 添加新的Java工具：jjs、jdeps
10. JavaFX，一种用在桌面开发领域的技术
11. 静态链接 JNI 程序库

### JAVA9

2017-9-21发布

1. **模块化（jiqsaw）**
2. 交互式命令行（JShell）
3. **默认垃圾回收期切换为G1**
4. 进程操作改进
5. 竞争锁性能优化
6. 分段代码缓存
7. 优化字符串占用空间

### JAVA10

2018-3-21发布
1.JEP286，**var 局部变量类型推断。**
2.JEP296，将原来用 Mercurial 管理的众多 JDK 仓库代码，合并到一个仓库中，简化开发和管理过程。
3.JEP304，统一的垃圾回收接口。
4.JEP307，G1 垃圾回收器的并行完整垃圾回收，实现并行性来改善最坏情况下的延迟。
5.JEP310，应用程序类数据 (AppCDS) 共享，通过跨进程共享通用类元数据来减少内存占用空间，和减少启动时间。
6.JEP312，ThreadLocal 握手交互。在不进入到全局 JVM 安全点 (Safepoint) 的情况下，对线程执行回调。优化可以只停止单个线程，而不是停全部线程或一个都不停。
7.JEP313，移除 JDK 中附带的 javah 工具。可以使用 javac -h 代替。
8.JEP314，使用附加的 Unicode 语言标记扩展。
9.JEP317，能将堆内存占用分配给用户指定的备用内存设备。
10.JEP317，使用 Graal 基于 Java 的编译器，可以预先把 Java 代码编译成本地代码来提升效能。
11.JEP318，在 OpenJDK 中提供一组默认的根证书颁发机构证书。开源目前 Oracle 提供的的 Java SE 的根证书，这样 OpenJDK 对开发人员使用起来更方便。
12.JEP322，基于时间定义的发布版本，即上述提到的发布周期。版本号为\$FEATURE.\$INTERIM.\$UPDATE.\$PATCH，分别是大版本，中间版本，升级包和补丁版本。

### Java 11

2018-9-25发布
官网公开的 17 个 JEP（JDK Enhancement Proposal 特性增强提议）：

1. JEP181: Nest-Based Access Control（基于嵌套的访问控制）
2. JEP309: Dynamic Class-File Constants（动态的类文件常量）
3. JEP315: Improve Aarch64 Intrinsics（改进 Aarch64 Intrinsics）
4. JEP318: Epsilon: A No-Op Garbage Collector（Epsilon 垃圾回收器，又被称为”No-Op（无操作）”回收器）
5. JEP320: Remove the Java EE and CORBA Modules（移除 Java EE 和 CORBA 模块，JavaFX 也已被移除）
6. JEP321: HTTP Client (Standard)
   7.JEP323: Local-Variable Syntax for Lambda Parameters（用于 Lambda 参数的局部变量语法）
7. JEP324: Key Agreement with Curve25519 and Curve448（采用 Curve25519 和 Curve448 算法实现的密钥协议）
8. JEP327: Unicode 10
9. JEP328: Flight Recorder（飞行记录仪）
10. JEP329: ChaCha20 and Poly1305 Cryptographic Algorithms（实现 ChaCha20 和 Poly1305 加密算法）
11. JEP330: Launch Single-File Source-Code Programs（启动单个 Java 源代码文件的程序）
12. JEP331: Low-Overhead Heap Profiling（低开销的堆分配采样方法）
13. JEP332: Transport Layer Security (TLS) 1.3（对 TLS 1.3 的支持）
14. JEP333: ZGC: A Scalable Low-Latency Garbage Collector (Experimental)（ZGC：可伸缩的低延迟垃圾回收器，处于实验性阶段）
15. JEP335: Deprecate the Nashorn JavaScript Engine（弃用 Nashorn JavaScript 引擎）
16. JEP336: Deprecate the Pack200 Tools and API（弃用 Pack200 工具及其 API）