(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{418:function(t,e,n){"use strict";n.r(e);var s=n(45),a=Object(s.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"c-基本的输入输出"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#c-基本的输入输出"}},[t._v("#")]),t._v(" C++ 基本的输入输出")]),t._v(" "),n("p",[t._v("C++ 标准库提供了一组丰富的输入/输出功能，我们将在后续的章节进行介绍。本章将讨论 C++ 编程中最基本和最常见的 I/O 操作。")]),t._v(" "),n("p",[t._v("C++ 的 I/O 发生在流中，流是字节序列。如果字节流是从设备（如键盘、磁盘驱动器、网络连接等）流向内存，这叫做"),n("strong",[t._v("输入操作")]),t._v("。如果字节流是从内存流向设备（如显示屏、打印机、磁盘驱动器、网络连接等），这叫做"),n("strong",[t._v("输出操作")]),t._v("。")]),t._v(" "),n("h2",{attrs:{id:"i-o-库头文件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#i-o-库头文件"}},[t._v("#")]),t._v(" I/O 库头文件")]),t._v(" "),n("p",[t._v("下列的头文件在 C++ 编程中很重要。")]),t._v(" "),n("table",[n("thead",[n("tr",[n("th",{staticStyle:{"text-align":"left"}},[t._v("头文件")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("函数和描述")])])]),t._v(" "),n("tbody",[n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("<iostream>")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("该文件定义了 "),n("strong",[t._v("cin、cout、cerr")]),t._v(" 和 "),n("strong",[t._v("clog")]),t._v(" 对象，分别对应于标准输入流、标准输出流、非缓冲标准错误流和缓冲标准错误流。")])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("<iomanip>")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("该文件通过所谓的参数化的流操纵器（比如 "),n("strong",[t._v("setw")]),t._v(" 和 "),n("strong",[t._v("setprecision")]),t._v("），来声明对执行标准化 I/O 有用的服务。")])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("<fstream>")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("该文件为用户控制的文件处理声明服务。我们将在文件和流的相关章节讨论它的细节。")])])])]),t._v(" "),n("h2",{attrs:{id:"标准输出流-cout"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#标准输出流-cout"}},[t._v("#")]),t._v(" 标准输出流（cout）")]),t._v(" "),n("p",[t._v("预定义的对象 "),n("strong",[t._v("cout")]),t._v(" 是 "),n("strong",[t._v("iostream")]),t._v(' 类的一个实例。cout 对象"连接"到标准输出设备，通常是显示屏。'),n("strong",[t._v("cout")]),t._v(" 是与流插入运算符 << 结合使用的，如下")]),t._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('#include <iostream>\nusing namespace std;\nint main() {\n  char str[] = "Unable to read....";\n  cout << str << endl;\n  clog << "Error message : " << str << endl;\n}\n')])])]),n("p",[t._v("C++ 编译器根据要输出变量的数据类型，选择合适的流插入运算符来显示值。<< 运算符被重载来输出内置类型（整型、浮点型、double 型、字符串和指针）的数据项。")]),t._v(" "),n("p",[t._v("流插入运算符 << 在一个语句中可以多次使用，如上面实例中所示，"),n("strong",[t._v("endl")]),t._v(" 用于在行末添加一个换行符。")]),t._v(" "),n("h3",{attrs:{id:"输入输出流中的函数-模板"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#输入输出流中的函数-模板"}},[t._v("#")]),t._v(" 输入输出流中的函数（模板）：")]),t._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('#include <iomanip>\n#include <iostream>\nusing namespace std;\nint main() {\n  char str[] = "Unable to read....";\n  cout << str << endl;\n  clog << "Error message : " << str << endl;\n  // string a, b, c;\n  // cin >> a;\n  // cin.get();\n  // cin >> b;\n  // cin.get();\n  // cin >> c;\n  cout << setiosflags(ios::left |ios::showpoint);  // 设左对齐，以一般实数方式显示\n  cout.precision(5);  // 设置除小数点外有五位有效数字\n  cout << 123.456789 << endl;\n  cout.width(10);                    // 设置显示域宽10\n  cout.fill(\'*\');                    // 在显示区域空白处用*填充\n  cout << resetiosflags(ios::left);  // 清除状态左对齐\n  cout << setiosflags(ios::right);   // 设置右对齐\n  cout << 123.456789 << endl;\n  cout << setiosflags(ios::left | ios::fixed);  // 设左对齐，以固定小数位显示\n  cout.precision(3);  // 设置实数显示三位小数\n  cout << 999.123456 << endl;\n  cout << resetiosflags(ios::left | ios::fixed);  //清除状态左对齐和定点格式\n  cout << setiosflags(ios::left |\n                      ios::scientific);  //设置左对齐，以科学技术法显示\n  cout.precision(3);                     //设置保留三位小数\n  cout << 123.45678 << endl;\n  return 0;\n}\n// 运行程序\nUnable to read....\nError message : Unable to read....\n123.46\n****123.46\n999.123\n1.235e+002\n')])])])])}),[],!1,null,null,null);e.default=a.exports}}]);