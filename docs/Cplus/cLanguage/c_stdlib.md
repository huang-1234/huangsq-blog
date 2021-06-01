# c语言标准库

C语言函数手册也称为C标准库。C标准库由在15个头文件中声明的函数、类型定义和宏组成，每个头文件都代表了一定范围的编程功能。有人说，C标准库可以分为 3 组，如何正确并熟练的使用它们，可以相应的可区分出 3 个层次的程序员：

合格程序员：<stdio.h>、<ctype.h>、<stdlib.h>、<string.h>

熟练程序员：<assert.h>、<limits.h>、<stddef.h>、<time.h>

优秀程序员：<float.h>、<math.h>、<error.h>、<locale.h>、<setjmp.h>、<signal.h>、<stdarg.h>

[stdio.h](http://c.biancheng.net/cpp/u/stdio_h/)

[stdlib.h](http://c.biancheng.net/cpp/u/stdlab_h/)

[conio.h](http://c.biancheng.net/cpp/u/conio_h/)

[alloc.h](http://c.biancheng.net/cpp/u/alloc_h/)

[graphics.h](http://c.biancheng.net/cpp/u/graphics_h/)

[system.h](http://c.biancheng.net/cpp/u/system_h/)

[string.h](http://c.biancheng.net/cpp/u/string_h/)

[ctype.h](http://c.biancheng.net/cpp/u/ctype_h/)

[math.h](http://c.biancheng.net/cpp/u/math_h/)

[locale.h](http://c.biancheng.net/cpp/u/locale_h/)

### 1. [stdio.h](http://c.biancheng.net/cpp/u/stdio_h/)

| 函数                                                    | 说明                                                |
| ------------------------------------------------------- | --------------------------------------------------- |
| [fopen()](http://c.biancheng.net/cpp/html/250.html)     | 打开一个文件并返回文件指针                          |
| [getc()](http://c.biancheng.net/cpp/html/258.html)      | 从流中读取字符                                      |
| [getchar()](http://c.biancheng.net/cpp/html/259.html)   | 从控制台读取字符并立即回显                          |
| [gets()](http://c.biancheng.net/cpp/html/260.html)      | 从流中读取字符串                                    |
| [putc()](http://c.biancheng.net/cpp/html/262.html)      | 写文件函数(将一指定字符写入文件中)                  |
| [putchar()](http://c.biancheng.net/cpp/html/263.html)   | 向控制台输出一个字符                                |
| [rewind()](http://c.biancheng.net/cpp/html/264.html)    | 将文件指针重新指向文件开头                          |
| [setbuf()](http://c.biancheng.net/cpp/html/265.html)    | 把缓冲区与流相关联                                  |
| [setvbuf()](http://c.biancheng.net/cpp/html/268.html)   | 设置文件流的缓冲区                                  |
| [ungetc()](http://c.biancheng.net/cpp/html/269.html)    | 把字符退回到输入流                                  |
| [printf()](http://c.biancheng.net/cpp/html/293.html)    | 格式化输出函数                                      |
| [sprintf()](http://c.biancheng.net/cpp/html/295.html)   | 将格式化的数据写入字符串                            |
| [sscanf()](http://c.biancheng.net/cpp/html/296.html)    | 从字符串中读取指定格式的数据                        |
| [remove()](http://c.biancheng.net/cpp/html/322.html)    | 删除文件或目录                                      |
| [rename()](http://c.biancheng.net/cpp/html/323.html)    | 重命名文件或目录                                    |
| [perror()](http://c.biancheng.net/cpp/html/347.html)    | 打印最近一次系统错误信息                            |
| [getche()](http://c.biancheng.net/cpp/html/2409.html)   | 从控制台读取字符并立即回显                          |
| [getw()](http://c.biancheng.net/cpp/html/2410.html)     | 以二进制形式从文件流中读取整数                      |
| [puts()](http://c.biancheng.net/cpp/html/2411.html)     | 将一个字符串放入标准输出流(stdout)中                |
| [putw()](http://c.biancheng.net/cpp/html/2412.html)     | 以二进制形式向文件流中写入整数                      |
| [snprintf()](http://c.biancheng.net/cpp/html/2417.html) | 将格式化的数据写入字符串—sprintf()                  |
| [temfile()](http://c.biancheng.net/cpp/html/2418.html)  | 以二进制形式创建一个临时文件并打开                  |
| [tmpnam()](http://c.biancheng.net/cpp/html/2419.html)   | 产生一个唯一的包含路径的文件名                      |
| [ungetch()](http://c.biancheng.net/cpp/html/2420.html)  | 把一个字符退回到键盘缓冲区                          |
| [fgetpos()](http://c.biancheng.net/cpp/html/2421.html)  | 获得当前文件的读写指针                              |
| [fsetpos()](http://c.biancheng.net/cpp/html/2422.html)  | 设置当前文件的读写指针                              |
| [fclose()](http://c.biancheng.net/cpp/html/2505.html)   | 关闭文件流                                          |
| [fflush()](http://c.biancheng.net/cpp/html/2506.html)   | 清空文件缓冲区（或标准输入输出缓冲区）              |
| [ferror()](http://c.biancheng.net/cpp/html/2507.html)   | 检测文件流是否出错                                  |
| [freopen()](http://c.biancheng.net/cpp/html/2508.html)  | 文件流重定向，流替换                                |
| [clearerr()](http://c.biancheng.net/cpp/html/2509.html) | 清除（复位）文件流的错误标识，并使文件结束标标识为0 |
| [fgetc()](http://c.biancheng.net/cpp/html/2510.html)    | 从文件流中读取一个字符                              |
| [fgetchar()](http://c.biancheng.net/cpp/html/2511.html) | 从文件流中读取一个字符                              |
| [fputchar()](http://c.biancheng.net/cpp/html/2512.html) | 将一个字符输出到标准输出流(stdout)中                |
| [fgets()](http://c.biancheng.net/cpp/html/2513.html)    | 从文件流中读取一行或指定个数的字符                  |
| [feof()](http://c.biancheng.net/cpp/html/2514.html)     | 检查流上文件的结束标识(是否读到文件结尾)            |
| [fputs()](http://c.biancheng.net/cpp/html/2515.html)    | 将指定的字符串写入到文件流                          |
| [fread()](http://c.biancheng.net/cpp/html/2516.html)    | 从文件流中读取数据                                  |
| [fwrite()](http://c.biancheng.net/cpp/html/2517.html)   | 向文件流中写入数据                                  |
| [fseek()](http://c.biancheng.net/cpp/html/2518.html)    | 移动文件的读写指针到指定的位置                      |
| [ftell()](http://c.biancheng.net/cpp/html/2519.html)    | 获取文件读写指针的当前位置                          |
| [fprintf()](http://c.biancheng.net/cpp/html/2520.html)  | 将格式化数据输出到文件流                            |
| [scanf()](http://c.biancheng.net/cpp/html/2521.html)    | 格式化输入函数                                      |
| [fscanf()](http://c.biancheng.net/cpp/html/2522.html)   | 将文件流中的数据格式化输入                          |

### 2. [stdlib.h](http://c.biancheng.net/cpp/u/stdlab_h/)

| 函数                                                   | 说明                                        |
| ------------------------------------------------------ | ------------------------------------------- |
| [atof()](http://c.biancheng.net/cpp/html/124.html)     | 将字符串转换为double(双精度浮点数)          |
| [atoi()](http://c.biancheng.net/cpp/html/125.html)     | 将字符串转换成int(整数)                     |
| [atol()](http://c.biancheng.net/cpp/html/126.html)     | 将字符串转换成long(长整型)                  |
| [strtod()](http://c.biancheng.net/cpp/html/128.html)   | 将字符串转换为double(双精度浮点数)          |
| [strtol()](http://c.biancheng.net/cpp/html/129.html)   | 将字符串转换成long(长整型数)                |
| [strtoul()](http://c.biancheng.net/cpp/html/130.html)  | 将字符串转换成unsigned long(无符号长整型数) |
| [calloc()](http://c.biancheng.net/cpp/html/134.html)   | 分配内存空间并初始化                        |
| [free()](http://c.biancheng.net/cpp/html/135.html)     | 释放动态分配的内存空间                      |
| [malloc()](http://c.biancheng.net/cpp/html/137.html)   | 动态分配内存空间                            |
| [realloc()](http://c.biancheng.net/cpp/html/2859.html) | 重新分配内存空间                            |

### 7. [string.h](http://c.biancheng.net/cpp/u/string_h/)

| 函数                                                    | 说明                                              |
| ------------------------------------------------------- | ------------------------------------------------- |
| [bcmp()](http://c.biancheng.net/cpp/html/148.html)      | 比较内存(字符串)的前n个字节是否相等               |
| [bcopy()](http://c.biancheng.net/cpp/html/149.html)     | 复制内存(字符串)                                  |
| [bzero()](http://c.biancheng.net/cpp/html/150.html)     | 将内存（字符串）前n个字节清零                     |
| [memcpy()](http://c.biancheng.net/cpp/html/155.html)    | 复制内存内容(忽略\0)                              |
| [memmove()](http://c.biancheng.net/cpp/html/156.html)   | 复制内存内容（可以处理重叠的内存块）              |
| [memset()](http://c.biancheng.net/cpp/html/157.html)    | 将内存的前n个字节设置为特定的值                   |
| [strcat()](http://c.biancheng.net/cpp/html/160.html)    | 连接字符串                                        |
| [strchr()](http://c.biancheng.net/cpp/html/161.html)    | 查找某字符在字符串中首次出现的位置                |
| [strcmp()](http://c.biancheng.net/cpp/html/162.html)    | 比较字符串（区分大小写）                          |
| [strcoll()](http://c.biancheng.net/cpp/html/163.html)   | 根据环境变量LC_COLLATE来比较字符串                |
| [strcspn()](http://c.biancheng.net/cpp/html/165.html)   | 计算字符串str中连续有几个字符都不属于字符串accept |
| [strlen()](http://c.biancheng.net/cpp/html/167.html)    | 返回字符串的长度                                  |
| [strncat()](http://c.biancheng.net/cpp/html/169.html)   | 在字符串的结尾追加n个字符                         |
| [strncpy()](http://c.biancheng.net/cpp/html/170.html)   | 复制字符串的前n个字符                             |
| [strpbrk()](http://c.biancheng.net/cpp/html/171.html)   | 返回两个字符串中首个相同字符的位置                |
| [strrchr()](http://c.biancheng.net/cpp/html/172.html)   | 查找某字符在字符串中最后一次出现的位置            |
| [strspn()](http://c.biancheng.net/cpp/html/173.html)    | 计算字符串str中连续有几个字符都属于字符串accept   |
| [strstr()](http://c.biancheng.net/cpp/html/174.html)    | 返回字符串中首次出现子串的地址                    |
| [strtok()](http://c.biancheng.net/cpp/html/175.html)    | 字符串分割                                        |
| [stpcpy()](http://c.biancheng.net/cpp/html/2539.html)   | 将字符串复制到数组                                |
| [strcpy()](http://c.biancheng.net/cpp/html/2540.html)   | 字符串复制                                        |
| [stricmp()](http://c.biancheng.net/cpp/html/2713.html)  | 比较字符串（不区分大小写）                        |
| [strcmpi()](http://c.biancheng.net/cpp/html/2714.html)  | 比较字符串(不区分大小写)，stricmp()的宏定义       |
| [strlwr()](http://c.biancheng.net/cpp/html/2715.html)   | 将字符串转换为小写                                |
| [strupr()](http://c.biancheng.net/cpp/html/2716.html)   | 将字符串转换为大写                                |
| [strncmp()](http://c.biancheng.net/cpp/html/2717.html)  | 比较字符串的前n个字符（区分大小写）               |
| [strnicmp()](http://c.biancheng.net/cpp/html/2718.html) | 比较字符串的前n个字符（区分大小写）               |
| [strncmpi()](http://c.biancheng.net/cpp/html/2719.html) | 比较两个字符串的前n个字符（不区分大小写）         |
| [strrev()](http://c.biancheng.net/cpp/html/2721.html)   | 字符串逆置（倒序、逆序）                          |
| [strset()](http://c.biancheng.net/cpp/html/2722.html)   | 将字符串的所有字符设置为指定字符                  |
| [strnset()](http://c.biancheng.net/cpp/html/2723.html)  | 将字符串的前n个字符设置为指定字符                 |



### 8.[type.h](http://c.biancheng.net/cpp/u/ctype_h/)

| 函数                                                   | 说明                                 |
| ------------------------------------------------------ | ------------------------------------ |
| [isalnum()](http://c.biancheng.net/cpp/html/112.html)  | 判断字符是否为英文字母或数字         |
| [isalpha()](http://c.biancheng.net/cpp/html/113.html)  | 判断字符是否为英文字母               |
| [iscntrl()](http://c.biancheng.net/cpp/html/115.html)  | 判断字符是否为ASCII码的控制字符      |
| [isdigit()](http://c.biancheng.net/cpp/html/116.html)  | 判断字符是否为阿拉伯数字             |
| [isgraph()](http://c.biancheng.net/cpp/html/117.html)  | 判断字符是否为除空格以外的可打印字符 |
| [islower()](http://c.biancheng.net/cpp/html/118.html)  | 判断字符是否为小写字母               |
| [isprint()](http://c.biancheng.net/cpp/html/119.html)  | 判断字符是否为可打印字符             |
| [isspace()](http://c.biancheng.net/cpp/html/120.html)  | 判断字符是否为空白字符               |
| [ispunct()](http://c.biancheng.net/cpp/html/121.html)  | 判断字符是否为标点符号或特殊字符     |
| [isupper()](http://c.biancheng.net/cpp/html/122.html)  | 判断字符是否为大写英文字母           |
| [isxdigit()](http://c.biancheng.net/cpp/html/123.html) | 判断字符是否为16进制数字             |
| [toascii()](http://c.biancheng.net/cpp/html/131.html)  | 将字符转换成对应的ASCII码            |
| [tolower()](http://c.biancheng.net/cpp/html/132.html)  | 将大写字母转换为小写字母             |
| [toupper()](http://c.biancheng.net/cpp/html/133.html)  | 将小写字母转换为大写字母             |
| [isascii()](http://c.biancheng.net/cpp/html/2534.html) | 检测字符是否为ASCII字符              |
| [isblank()](http://c.biancheng.net/cpp/html/2535.html) | 判断字符是否为TAB或空格              |

### 9. [math.h](http://c.biancheng.net/cpp/u/math_h/)

| 函数                                                 | 说明                                 |
| ---------------------------------------------------- | ------------------------------------ |
| [acos()](http://c.biancheng.net/cpp/html/177.html)   | 求反余弦的值                         |
| [cos()](http://c.biancheng.net/cpp/html/182.html)    | 求余弦值                             |
| [cosh()](http://c.biancheng.net/cpp/html/183.html)   | 求双曲余玄值                         |
| [exp()](http://c.biancheng.net/cpp/html/184.html)    | e的次幂函数(以e为底的x次方值)        |
| [frexp()](http://c.biancheng.net/cpp/html/185.html)  | 把一个浮点数分解为尾数和指数         |
| [ldexp()](http://c.biancheng.net/cpp/html/186.html)  | 返回x乘上2的exp次方的值              |
| [log()](http://c.biancheng.net/cpp/html/187.html)    | 返回以e为底的对数值                  |
| [log10()](http://c.biancheng.net/cpp/html/188.html)  | 返回以10为底的对数值                 |
| [pow()](http://c.biancheng.net/cpp/html/189.html)    | 求x的y次方（次幂）                   |
| [sin()](http://c.biancheng.net/cpp/html/190.html)    | 正弦函数                             |
| [sinh()](http://c.biancheng.net/cpp/html/191.html)   | 双曲正玄函数                         |
| [sqrt()](http://c.biancheng.net/cpp/html/192.html)   | 求给定值的平方根                     |
| [tan()](http://c.biancheng.net/cpp/html/193.html)    | 正切函数                             |
| [tanh()](http://c.biancheng.net/cpp/html/194.html)   | 双曲线正切函数                       |
| [fabs()](http://c.biancheng.net/cpp/html/2523.html)  | 求浮点数的绝对值                     |
| [abs()](http://c.biancheng.net/cpp/html/2524.html)   | 求整数的绝对值                       |
| [asin()](http://c.biancheng.net/cpp/html/2525.html)  | 反正弦函数                           |
| [atan()](http://c.biancheng.net/cpp/html/2526.html)  | 反正切函数                           |
| [atan2()](http://c.biancheng.net/cpp/html/2527.html) | 求y/x的反正切值                      |
| [ceil()](http://c.biancheng.net/cpp/html/2528.html)  | 向上取整，即求不小于某个数的最小整数 |
| [floor()](http://c.biancheng.net/cpp/html/2529.html) | 向下取整，即求不大于某个数的最大整数 |
| [fmod()](http://c.biancheng.net/cpp/html/2530.html)  | 对浮点数取模（求余）                 |
| [modf()](http://c.biancheng.net/cpp/html/2531.html)  | 将浮点数分解为整数和小数部分         |
| [hypot()](http://c.biancheng.net/cpp/html/2532.html) | 求直角三角形的斜边长                 |
| [pow10()](http://c.biancheng.net/cpp/html/2533.html) | 求10的x次方（次幂）                  |

### 

