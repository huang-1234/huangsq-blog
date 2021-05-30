# C语言函数手册



## 1 字符检测

| 函数                                                  | 说明                      |
| ----------------------------------------------------- | ------------------------- |
| [isascii()](http://c.biancheng.net/cpp/html/114.html) | 判断字符是否为ASCII码字符 |

## 2. 字符串操作

| 函数                                                      | 说明                               |
| --------------------------------------------------------- | ---------------------------------- |
| [gcvt()](http://c.biancheng.net/cpp/html/127.html)        | 将浮点型数转换为字符串(四舍五入)   |
| [index()](http://c.biancheng.net/cpp/html/151.html)       | 查找字符串并返回首次出现的位置     |
| [rindex()](http://c.biancheng.net/cpp/html/158.html)      | 查找字符串并返回最后一次出现的位置 |
| [strcasecmp()](http://c.biancheng.net/cpp/html/159.html)  | 判断字符串是否相等(忽略大小写)     |
| [strcpy()](http://c.biancheng.net/cpp/html/164.html)      | 复制字符串                         |
| [strdup()](http://c.biancheng.net/cpp/html/166.html)      | 复制字符串                         |
| [strncasecmp()](http://c.biancheng.net/cpp/html/168.html) | 比较字符串的前n个字符              |

## 3. 内存管理函数



| 函数                                                      | 说明                 |
| --------------------------------------------------------- | -------------------- |
| [getpagesize()](http://c.biancheng.net/cpp/html/136.html) | 取得内存分页大小     |
| [mmap()](http://c.biancheng.net/cpp/html/138.html)        | 建立内存映射         |
| [munmap()](http://c.biancheng.net/cpp/html/139.html)      | 解除内存映射         |
| [memccpy()](http://c.biancheng.net/cpp/html/152.html)     | 复制内存中的内容     |
| [memchr()](http://c.biancheng.net/cpp/html/153.html)      | 在内存中查找特定字符 |
| [memcmp()](http://c.biancheng.net/cpp/html/154.html)      | 比较内存前n个字节    |

## 4. 日期时间函数

| 函数                                                       | 说明                               |
| ---------------------------------------------------------- | ---------------------------------- |
| [asctime()](http://c.biancheng.net/cpp/html/140.html)      | 将时间日期以字符串格式表示         |
| [ctime()](http://c.biancheng.net/cpp/html/141.html)        | 将时间日期以字符串格式表示         |
| [gettimeofday()](http://c.biancheng.net/cpp/html/142.html) | 获取当前时间                       |
| [gmtime()](http://c.biancheng.net/cpp/html/143.html)       | 获取当前时间和日期                 |
| [localtime()](http://c.biancheng.net/cpp/html/144.html)    | 获取当前时间和日期并转换为本地时间 |
| [mktime()](http://c.biancheng.net/cpp/html/145.html)       | 将时间转换成经过的秒数             |
| [settimeofday()](http://c.biancheng.net/cpp/html/146.html) | 设置当前时间戳                     |
| [time()](http://c.biancheng.net/cpp/html/147.html)         | 获取当前时间(以秒数表示)           |



## 5. 数学函数

| 函数                                                | 说明                     |
| --------------------------------------------------- | ------------------------ |
| [abs()](http://c.biancheng.net/cpp/html/176.html)   | 求绝对值(整数)           |
| [asin()](http://c.biancheng.net/cpp/html/178.html)  | 求反正弦的值(以弧度表示) |
| [atan()](http://c.biancheng.net/cpp/html/179.html)  | 求反正切的值(以弧度表示) |
| [atan2()](http://c.biancheng.net/cpp/html/180.html) | 求反正切的值(以弧度表示) |
| [ceil()](http://c.biancheng.net/cpp/html/181.html)  | 向上取整                 |



## 6. 文件操作函数

| 函数                                                     | 说明                                 |
| -------------------------------------------------------- | ------------------------------------ |
| [endgrent()](http://c.biancheng.net/cpp/html/195.html)   | 关闭文件(关闭组文件)                 |
| [endpwent()](http://c.biancheng.net/cpp/html/196.html)   | 关闭文件(关闭密码文件)               |
| [endutent()](http://c.biancheng.net/cpp/html/197.html)   | 关闭文件(关闭utmp文件)               |
| [fgetgrent()](http://c.biancheng.net/cpp/html/198.html)  | 读取组格式函数                       |
| [fgetpwent()](http://c.biancheng.net/cpp/html/199.html)  | 读取密码格式                         |
| [getegid()](http://c.biancheng.net/cpp/html/200.html)    | 获得组识别码                         |
| [geteuid()](http://c.biancheng.net/cpp/html/201.html)    | 获取用户识别码函数                   |
| [getgid()](http://c.biancheng.net/cpp/html/202.html)     | 取得组识别码函数                     |
| [getgrent()](http://c.biancheng.net/cpp/html/203.html)   | 从组文件中取得账号的数据             |
| [getgrgid()](http://c.biancheng.net/cpp/html/204.html)   | 从组文件中取得指定gid的数据          |
| [getgrnam()](http://c.biancheng.net/cpp/html/205.html)   | 从组文件中取得指定组的数据           |
| [getgroups()](http://c.biancheng.net/cpp/html/206.html)  | 获取组代码函数                       |
| [getpw()](http://c.biancheng.net/cpp/html/207.html)      | 取得指定用户的密码文件数据           |
| [getpwent()](http://c.biancheng.net/cpp/html/208.html)   | 从密码文件中取得账号的数据           |
| [getpwnam()](http://c.biancheng.net/cpp/html/209.html)   | 从密码文件中取得指定账号的数据       |
| [getpwuid()](http://c.biancheng.net/cpp/html/210.html)   | 从密码文件中取得指定uid的数据        |
| [getuid()](http://c.biancheng.net/cpp/html/211.html)     | 取得真实的用户识别码                 |
| [getutent()](http://c.biancheng.net/cpp/html/212.html)   | 从utmp文件中取得账号登录数据         |
| [getutid()](http://c.biancheng.net/cpp/html/213.html)    | 从utmp文件中查找特定的记录           |
| [getutline()](http://c.biancheng.net/cpp/html/214.html)  | 文件查找函数(从utmp文件中查找特定的  |
| [initgroups()](http://c.biancheng.net/cpp/html/215.html) | 初始化组清单                         |
| [pututline()](http://c.biancheng.net/cpp/html/216.html)  | 将utmp记录写入文件                   |
| [seteuid()](http://c.biancheng.net/cpp/html/217.html)    | 设置有效的用户识别码                 |
| [setfsgid()](http://c.biancheng.net/cpp/html/218.html)   | 设置文件系统的组识别码               |
| [setfsuid()](http://c.biancheng.net/cpp/html/219.html)   | 设置文件系统的用户识别码             |
| [setgid()](http://c.biancheng.net/cpp/html/220.html)     | 设置真实的组识别码                   |
| [setgrent()](http://c.biancheng.net/cpp/html/221.html)   | 从头读取组文件中的组数据             |
| [setgroups()](http://c.biancheng.net/cpp/html/222.html)  | 设置组代码函数                       |
| [setpwent()](http://c.biancheng.net/cpp/html/223.html)   | 从头读取密码文件中的账号数据         |
| [setregid()](http://c.biancheng.net/cpp/html/224.html)   | 设置真实及有效的组识别码             |
| [setreuid()](http://c.biancheng.net/cpp/html/225.html)   | 设置真实及有效的用户识别码           |
| [setuid()](http://c.biancheng.net/cpp/html/226.html)     | 设置真实的用户识别码                 |
| [setutent()](http://c.biancheng.net/cpp/html/227.html)   | 从头读取utmp文件中的登录数据         |
| [utmpname()](http://c.biancheng.net/cpp/html/228.html)   | 设置文件路径                         |
| [close()](http://c.biancheng.net/cpp/html/229.html)      | 关闭文件                             |
| [creat()](http://c.biancheng.net/cpp/html/230.html)      | 创建文件函数                         |
| [dup()](http://c.biancheng.net/cpp/html/231.html)        | 复制文件描述词                       |
| [dup2()](http://c.biancheng.net/cpp/html/232.html)       | 复制文件描述词                       |
| [fcntl()](http://c.biancheng.net/cpp/html/233.html)      | 文件描述词操作函数                   |
| [flock()](http://c.biancheng.net/cpp/html/234.html)      | 解除锁定文件                         |
| [fsync()](http://c.biancheng.net/cpp/html/235.html)      | 将缓冲区数据写回磁盘                 |
| [lseek()](http://c.biancheng.net/cpp/html/236.html)      | 移动文件的读写位置                   |
| [mkstemp()](http://c.biancheng.net/cpp/html/237.html)    | 建立临时文件                         |
| [open()](http://c.biancheng.net/cpp/html/238.html)       | 打开文件函数                         |
| [read()](http://c.biancheng.net/cpp/html/239.html)       | 读文件函数(由已打开的文件读取数据)   |
| [sync()](http://c.biancheng.net/cpp/html/240.html)       | 写文件函数(将缓冲区数据写回磁盘)     |
| [write()](http://c.biancheng.net/cpp/html/241.html)      | 写文件函数                           |
| [clearerr()](http://c.biancheng.net/cpp/html/242.html)   | 清除文件流的错误旗标                 |
| [fclose()](http://c.biancheng.net/cpp/html/243.html)     | 关闭打开的文件                       |
| [fdopen()](http://c.biancheng.net/cpp/html/244.html)     | 将文件描述词转为文件指针             |
| [feof()](http://c.biancheng.net/cpp/html/245.html)       | 检查文件流是否读到了文件尾           |
| [fflush()](http://c.biancheng.net/cpp/html/246.html)     | 更新缓冲区                           |
| [fgetc()](http://c.biancheng.net/cpp/html/247.html)      | 读文件函数(由文件中读取一个字符)     |
| [fgets()](http://c.biancheng.net/cpp/html/248.html)      | 读取文件字符串                       |
| [fileno()](http://c.biancheng.net/cpp/html/249.html)     | 获取文件流所使用的文件描述词         |
| [fputc()](http://c.biancheng.net/cpp/html/251.html)      | 写文件函数(将一指定字符写入文件流中) |
| [fputs()](http://c.biancheng.net/cpp/html/252.html)      | 写文件函数(将一指定的字符串写入文件  |
| [fread()](http://c.biancheng.net/cpp/html/253.html)      | 读文件函数(从文件流读取数据)         |
| [freopen()](http://c.biancheng.net/cpp/html/254.html)    | 打开文件函数，并获得文件句柄         |
| [fseek()](http://c.biancheng.net/cpp/html/255.html)      | 移动文件流的读写位置                 |
| [ftell()](http://c.biancheng.net/cpp/html/256.html)      | 取得文件流的读取位置                 |
| [fwrite()](http://c.biancheng.net/cpp/html/257.html)     | 写文件函数(将数据流写入文件中)       |
| [mktemp()](http://c.biancheng.net/cpp/html/261.html)     | 产生唯一临时文件名                   |
| [setbuffer()](http://c.biancheng.net/cpp/html/266.html)  | 设置文件流的缓冲区                   |
| [setlinebuf()](http://c.biancheng.net/cpp/html/267.html) | 设置文件流为线性缓冲区               |

## 7. 进程操作函数

| 函数                                                      | 说明                                |
| --------------------------------------------------------- | ----------------------------------- |
| [atexit()](http://c.biancheng.net/cpp/html/270.html)      | 设置程序正常结束前调用的函数        |
| [execl()](http://c.biancheng.net/cpp/html/271.html)       | 执行文件函数                        |
| [execlp()](http://c.biancheng.net/cpp/html/272.html)      | 从PATH 环境变量中查找文件并执行     |
| [execv()](http://c.biancheng.net/cpp/html/273.html)       | 执行文件函数                        |
| [execve()](http://c.biancheng.net/cpp/html/274.html)      | 执行文件函数                        |
| [execvp()](http://c.biancheng.net/cpp/html/275.html)      | 执行文件函数                        |
| [exit()](http://c.biancheng.net/cpp/html/276.html)        | 结束进程                            |
| [_exit()](http://c.biancheng.net/cpp/html/277.html)       | 结束进程执行                        |
| [getpgid()](http://c.biancheng.net/cpp/html/278.html)     | 获取进程组识别码                    |
| [getpgrp()](http://c.biancheng.net/cpp/html/279.html)     | 获取进程组识别码                    |
| [getpid()](http://c.biancheng.net/cpp/html/280.html)      | 获取进程识别码                      |
| [getppid()](http://c.biancheng.net/cpp/html/281.html)     | 取得父进程的进程识别码              |
| [getpriority()](http://c.biancheng.net/cpp/html/282.html) | 取得程序进程执行优先权              |
| [nice()](http://c.biancheng.net/cpp/html/283.html)        | 改变进程优先顺序                    |
| [on_exit()](http://c.biancheng.net/cpp/html/284.html)     | 设置程序正常结束前调用的函数        |
| [setpgid()](http://c.biancheng.net/cpp/html/285.html)     | 设置进程组识别码函数                |
| [setpgrp()](http://c.biancheng.net/cpp/html/286.html)     | 设置进程组识别码                    |
| [setpriority()](http://c.biancheng.net/cpp/html/287.html) | 设置程序进程执行优先权              |
| [system()](http://c.biancheng.net/cpp/html/288.html)      | 执行shell命令                       |
| [wait()](http://c.biancheng.net/cpp/html/289.html)        | 结束(中断)进程函数(常用)            |
| [waitpid()](http://c.biancheng.net/cpp/html/290.html)     | 中断(结束)进程函数(等待子进程中断或 |
| [fprintf()](http://c.biancheng.net/cpp/html/291.html)     | 输出函数(格式化输出数据至文件)      |
| [fscanf()](http://c.biancheng.net/cpp/html/292.html)      | 输入函数(比较常用)                  |
| [sacnf()](http://c.biancheng.net/cpp/html/294.html)       | 字符串输入函数(最常用的输入函数)    |
| [vfprintf()](http://c.biancheng.net/cpp/html/297.html)    | 输出函数(格式化输出数据至文件)      |
| [vfscanf()](http://c.biancheng.net/cpp/html/298.html)     | 输入函数(先格式化字符串再输入)      |
| [vprintf()](http://c.biancheng.net/cpp/html/299.html)     | 输出函数                            |
| [vscanf()](http://c.biancheng.net/cpp/html/300.html)      | 字符串格式化输入函数                |
| [vsprintf()](http://c.biancheng.net/cpp/html/301.html)    | 格式化字符串                        |
| [vsscanf()](http://c.biancheng.net/cpp/html/302.html)     | 字符串输入函数                      |
| [vfork()](http://c.biancheng.net/cpp/html/1141.html)      | 建立新的进程                        |



## 8. 文件权限控制函数

| 函数                                                    | 说明                         |
| ------------------------------------------------------- | ---------------------------- |
| [access()](http://c.biancheng.net/cpp/html/303.html)    | 判断是否具有存取文件的权限   |
| [alphasort()](http://c.biancheng.net/cpp/html/304.html) | 依字母顺序排序目录结构       |
| [chdir()](http://c.biancheng.net/cpp/html/305.html)     | 改变当前的工作目录           |
| [chmod()](http://c.biancheng.net/cpp/html/306.html)     | 修改文件权限                 |
| [chown()](http://c.biancheng.net/cpp/html/307.html)     | 改变文件所有者               |
| [chroot()](http://c.biancheng.net/cpp/html/308.html)    | 改变文件根目录               |
| [closedir()](http://c.biancheng.net/cpp/html/309.html)  | 关闭目录                     |
| [fchdir()](http://c.biancheng.net/cpp/html/310.html)    | 改变当前工作目录             |
| [fchmod()](http://c.biancheng.net/cpp/html/311.html)    | 修改文件的权限               |
| [fchown()](http://c.biancheng.net/cpp/html/313.html)    | 改变文件的所有者             |
| [fstat()](http://c.biancheng.net/cpp/html/314.html)     | 由文件描述词取得文件状态     |
| [ftruncate()](http://c.biancheng.net/cpp/html/315.html) | 改变文件大小                 |
| [getcwd()](http://c.biancheng.net/cpp/html/316.html)    | 取得当前的工作目录           |
| [link()](http://c.biancheng.net/cpp/html/317.html)      | 建立文件连接                 |
| [lstat()](http://c.biancheng.net/cpp/html/318.html)     | 由文件描述词取得文件状态     |
| [opendir()](http://c.biancheng.net/cpp/html/319.html)   | 打开目录函数                 |
| [readdir()](http://c.biancheng.net/cpp/html/320.html)   | 读取目录函数                 |
| [readlink()](http://c.biancheng.net/cpp/html/321.html)  | 取得符号连接所指的文件       |
| [rewinddir()](http://c.biancheng.net/cpp/html/324.html) | 重设读取目录的位置为开头位置 |
| [seekdir()](http://c.biancheng.net/cpp/html/325.html)   | 设置下回读取目录的位置       |
| [stat()](http://c.biancheng.net/cpp/html/326.html)      | 获取文件状态                 |
| [symlink()](http://c.biancheng.net/cpp/html/327.html)   | 建立文件符号连接             |
| [telldir()](http://c.biancheng.net/cpp/html/328.html)   | 取得目录流的读取位置         |
| [truncate()](http://c.biancheng.net/cpp/html/329.html)  | 改变文件大小                 |
| [umask()](http://c.biancheng.net/cpp/html/330.html)     | 设置建立新文件时的权限遮罩   |
| [unlink()](http://c.biancheng.net/cpp/html/331.html)    | 删除文件                     |
| [utime()](http://c.biancheng.net/cpp/html/332.html)     | 修改文件的存取时间和更改时间 |
| [utimes()](http://c.biancheng.net/cpp/html/333.html)    | 修改文件的存取时间和更改时间 |

## 9. 信号处理函数

| 函数                                                      | 说明                         |
| --------------------------------------------------------- | ---------------------------- |
| [alarm()](http://c.biancheng.net/cpp/html/334.html)       | 设置信号传送闹钟             |
| [kill()](http://c.biancheng.net/cpp/html/335.html)        | 传送信号给指定的进程         |
| [pause()](http://c.biancheng.net/cpp/html/336.html)       | 让进程暂停直到信号出现       |
| [sigaddset()](http://c.biancheng.net/cpp/html/337.html)   | 增加一个信号至信号集         |
| [sigdelset()](http://c.biancheng.net/cpp/html/338.html)   | 从信号集里删除一个信号       |
| [sigemptyset()](http://c.biancheng.net/cpp/html/339.html) | 初始化信号集                 |
| [sigfillset()](http://c.biancheng.net/cpp/html/340.html)  | 将所有信号加入至信号集       |
| [sigismember()](http://c.biancheng.net/cpp/html/341.html) | 测试某个信号是否已加入至信号 |
| [signal()](http://c.biancheng.net/cpp/html/342.html)      | 设置信号处理方式             |
| [sigpending()](http://c.biancheng.net/cpp/html/343.html)  | 查询被搁置的信号             |
| [sigprocmask()](http://c.biancheng.net/cpp/html/344.html) | 查询或设置信号遮罩           |
| [sleep()](http://c.biancheng.net/cpp/html/345.html)       | 让进程暂停执行一段时间       |
| [ferror()](http://c.biancheng.net/cpp/html/346.html)      | 检查文件流是否有错误发生     |
| [strerror()](http://c.biancheng.net/cpp/html/348.html)    | 返回错误原因的描述字符串     |
| [mkfifo()](http://c.biancheng.net/cpp/html/349.html)      | 建立具名管道                 |
| [pclose()](http://c.biancheng.net/cpp/html/350.html)      | 关闭管道I/O                  |
| [popen()](http://c.biancheng.net/cpp/html/351.html)       | 建立管道I/O                  |
| [sigaction()](http://c.biancheng.net/cpp/html/1142.html)  | 查询或设置信号处理方式       |

## 10. 接口处理函数

| 函数                                                      | 说明                                 |
| --------------------------------------------------------- | ------------------------------------ |
| [accept()](http://c.biancheng.net/cpp/html/352.html)      | 接受socket连线                       |
| [bind()](http://c.biancheng.net/cpp/html/353.html)        | 对socket定位                         |
| [connect()](http://c.biancheng.net/cpp/html/354.html)     | 建立socket连线                       |
| [endprotoent()](http://c.biancheng.net/cpp/html/355.html) | 结束网络协议数据的读取               |
| [endservent()](http://c.biancheng.net/cpp/html/356.html)  | 结束网络服务数据的读取               |
| [getsockopt()](http://c.biancheng.net/cpp/html/358.html)  | 取得socket 状态                      |
| [htonl()](http://c.biancheng.net/cpp/html/359.html)       | 将32位主机字符顺序转换成网络字符顺序 |
| [htons()](http://c.biancheng.net/cpp/html/360.html)       | 将16位主机字符顺序转换成网络字符顺序 |
| [inet_addr()](http://c.biancheng.net/cpp/html/361.html)   | 将网络地址转成二进制的数字           |
| [inet_aton()](http://c.biancheng.net/cpp/html/362.html)   | 将网络地址转成网络二进制的数字       |
| [inet_ntoa()](http://c.biancheng.net/cpp/html/363.html)   | 将网络二进制的数字转换成网络地址     |
| [listen()](http://c.biancheng.net/cpp/html/364.html)      | 等待连接                             |
| [ntohl()](http://c.biancheng.net/cpp/html/365.html)       | 将32位网络字符顺序转换成主机字符顺序 |
| [ntohs()](http://c.biancheng.net/cpp/html/366.html)       | 将16位网络字符顺序转换成主机字符顺序 |
| [recv()](http://c.biancheng.net/cpp/html/367.html)        | 经socket接收数据                     |
| [recvfrom()](http://c.biancheng.net/cpp/html/368.html)    | 经socket接收数据                     |
| [recvmsg()](http://c.biancheng.net/cpp/html/369.html)     | 经socket接收数据                     |
| [send()](http://c.biancheng.net/cpp/html/370.html)        | 经socket传送数据                     |
| [sendmsg()](http://c.biancheng.net/cpp/html/371.html)     | 经socket传送数据                     |
| [sendto()](http://c.biancheng.net/cpp/html/372.html)      | 经socket传送数据                     |
| [setprotoent()](http://c.biancheng.net/cpp/html/373.html) | 打开网络协议的数据文件               |
| [setsockopt()](http://c.biancheng.net/cpp/html/374.html)  | 设置socket状态                       |
| [shutdown()](http://c.biancheng.net/cpp/html/375.html)    | 终止socket通信                       |
| [socket()](http://c.biancheng.net/cpp/html/376.html)      | 建立一个socket通信                   |
| [setservent()](http://c.biancheng.net/cpp/html/1143.html) | 打开主机网络服务的数据文件           |

## 11. 环境变量函数

| 函数                                                 | 说明               |
| ---------------------------------------------------- | ------------------ |
| [getenv()](http://c.biancheng.net/cpp/html/377.html) | 取得环境变量内容   |
| [putenv()](http://c.biancheng.net/cpp/html/378.html) | 改变或增加环境变量 |

## 12. 终端控制函数

| 函数                                                  | 说明                         |
| ----------------------------------------------------- | ---------------------------- |
| [getopt()](http://c.biancheng.net/cpp/html/379.html)  | 分析命令行参数               |
| [isatty()](http://c.biancheng.net/cpp/html/380.html)  | 判断文件描述词是否是为终端机 |
| [select()](http://c.biancheng.net/cpp/html/381.html)  | I/O多工机制                  |
| [ttyname()](http://c.biancheng.net/cpp/html/382.html) | 返回一终端机名称             |