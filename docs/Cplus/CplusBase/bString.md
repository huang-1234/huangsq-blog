# C++ 字符串

C++ 提供了以下两种类型的字符串表示形式：

- C 风格字符串
- C++ 引入的 string 类类型

## C 风格字符串

C 风格的字符串起源于 C 语言，并在 C++ 中继续得到支持。字符串实际上是使用 **null** 字符 **\0** 终止的一维字符数组。因此，一个以 null 结尾的字符串，包含了组成字符串的字符。

C++ 中有大量的函数用来操作以 null 结尾的字符串:

| 序号 | 函数 & 目的                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **strcpy(s1, s2);** 复制字符串 s2 到字符串 s1。              |
| 2    | **strcat(s1, s2);** 连接字符串 s2 到字符串 s1 的末尾。连接字符串也可以用 **+** 号，例如: `string str1 = "runoob"; string str2 = "google"; string str = str1 + str2;` |
| 3    | **strlen(s1);** 返回字符串 s1 的长度。                       |
| 4    | **strcmp(s1, s2);** 如果 s1 和 s2 是相同的，则返回 0；如果 s1<s2 则返回值小于 0；如果 s1>s2 则返回值大于 0。 |
| 5    | **strchr(s1, ch);** 返回一个指针，指向字符串 s1 中字符 ch 的第一次出现的位置。 |
| 6    | **strstr(s1, s2);** 返回一个指针，指向字符串 s1 中字符串 s2 的第一次出现的位置。 |

下面的实例使用了上述的一些函数：

## `<cstring>`字符串函数

```c++
#include <iostream>
// #include <string>
#include <cstring>
using namespace std;

int main() {
    char str1[] = "huangshuiqing";
    char str2[] = "google";
    char str3[strlen(str1)];
    cout << "strlen:" << str3 << ":" << strlen(str3) << endl;
    strcpy(str3, str1);
    cout << str3 << endl;
    cout << "strcat(str1,str2):" << strcat(str1, str2) << endl;
    cout << "strlen(str1):" << strlen(str1) << endl;
}
```



当上面的代码被编译和执行时，它会产生下列结果：

```
strcpy( str3, str1) : runoob
strcat( str1, str2): runoobgoogle
strlen(str1) : 12
```

## C++ 中的 String 类

C++ 标准库提供了 **string** 类类型，支持上述所有的操作，另外还增加了其他更多的功能。我们将学习 C++ 标准库中的这个类，现在让我们先来看看下面这个实例：

现在您可能还无法透彻地理解这个实例，因为到目前为止我们还没有讨论类和对象。所以现在您可以只是粗略地看下这个实例，等理解了面向对象的概念之后再回头来理解这个实例。

## String类的方法

```c++
#include <iostream>
#include <string>

using namespace std;

int main() {
    string str1 = "huangshuiqing";
    string str2 = "google";
    string str3;
    int len;
    // 复制 str1 到 str3
    str3 = str1;
    cout << "str3 : " << str3 << endl;
    // 连接 str1 和 str2
    str3 = str1 + str2;
    cout << "str1 + str2 : " << str3 << endl;
    // 连接后，str3 的总长度
    len = str3.size();
    cout << "str3.size() :  " << len << endl;

    return 0;
}
//str3 : huangshuiqing
//str1 + str2 : huangshuiqinggoogle
//str3.size() :  19
```



当上面的代码被编译和执行时，它会产生下列结果：

```c++
str3 : runoob
str1 + str2 : runoobgoogle
str3.size() :  12
```