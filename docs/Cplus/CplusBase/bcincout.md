# cpp 基本的输入输出

cpp 标准库提供了一组丰富的输入/输出功能，我们将在后续的章节进行介绍。本章将讨论 cpp 编程中最基本和最常见的 I/O 操作。

cpp 的 I/O 发生在流中，流是字节序列。如果字节流是从设备（如键盘、磁盘驱动器、网络连接等）流向内存，这叫做**输入操作**。如果字节流是从内存流向设备（如显示屏、打印机、磁盘驱动器、网络连接等），这叫做**输出操作**。

## I/O 库头文件

下列的头文件在 cpp 编程中很重要。

| 头文件       | 函数和描述                                                   |
| :----------- | :----------------------------------------------------------- |
| `<iostream>` | 该文件定义了 **cin、cout、cerr** 和 **clog** 对象，分别对应于标准输入流、标准输出流、非缓冲标准错误流和缓冲标准错误流。 |
| `<iomanip>`  | 该文件通过所谓的参数化的流操纵器（比如 **setw** 和 **setprecision**），来声明对执行标准化 I/O 有用的服务。 |
| `<fstream>`  | 该文件为用户控制的文件处理声明服务。我们将在文件和流的相关章节讨论它的细节。 |

## 标准输出流（cout）

预定义的对象 **cout** 是 **iostream** 类的一个实例。cout 对象"连接"到标准输出设备，通常是显示屏。**cout** 是与流插入运算符 << 结合使用的，如下

```cpp
#include <iostream>
using namespace std;
int main() {
  char str[] = "Unable to read....";
  cout << str << endl;
  clog << "Error message : " << str << endl;
}
```

cpp 编译器根据要输出变量的数据类型，选择合适的流插入运算符来显示值。<< 运算符被重载来输出内置类型（整型、浮点型、double 型、字符串和指针）的数据项。

流插入运算符 << 在一个语句中可以多次使用，如上面实例中所示，**endl** 用于在行末添加一个换行符。

### 输入输出流中的函数（模板）：

```cpp
#include <iomanip>
#include <iostream>
using namespace std;
int main() {
  char str[] = "Unable to read....";
  cout << str << endl;
  clog << "Error message : " << str << endl;
  // string a, b, c;
  // cin >> a;
  // cin.get();
  // cin >> b;
  // cin.get();
  // cin >> c;
  cout << setiosflags(ios::left |ios::showpoint);  // 设左对齐，以一般实数方式显示
  cout.precision(5);  // 设置除小数点外有五位有效数字
  cout << 123.456789 << endl;
  cout.width(10);                    // 设置显示域宽10
  cout.fill('*');                    // 在显示区域空白处用*填充
  cout << resetiosflags(ios::left);  // 清除状态左对齐
  cout << setiosflags(ios::right);   // 设置右对齐
  cout << 123.456789 << endl;
  cout << setiosflags(ios::left | ios::fixed);  // 设左对齐，以固定小数位显示
  cout.precision(3);  // 设置实数显示三位小数
  cout << 999.123456 << endl;
  cout << resetiosflags(ios::left | ios::fixed);  //清除状态左对齐和定点格式
  cout << setiosflags(ios::left |
                      ios::scientific);  //设置左对齐，以科学技术法显示
  cout.precision(3);                     //设置保留三位小数
  cout << 123.45678 << endl;
  return 0;
}
// 运行程序
Unable to read....
Error message : Unable to read....
123.46
****123.46
999.123
1.235e+002
```

