(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{412:function(t,s,r){"use strict";r.r(s);var n=r(45),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"c-字符串"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#c-字符串"}},[t._v("#")]),t._v(" C++ 字符串")]),t._v(" "),r("p",[t._v("C++ 提供了以下两种类型的字符串表示形式：")]),t._v(" "),r("ul",[r("li",[t._v("C 风格字符串")]),t._v(" "),r("li",[t._v("C++ 引入的 string 类类型")])]),t._v(" "),r("h2",{attrs:{id:"c-风格字符串"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#c-风格字符串"}},[t._v("#")]),t._v(" C 风格字符串")]),t._v(" "),r("p",[t._v("C 风格的字符串起源于 C 语言，并在 C++ 中继续得到支持。字符串实际上是使用 "),r("strong",[t._v("null")]),t._v(" 字符 "),r("strong",[t._v("\\0")]),t._v(" 终止的一维字符数组。因此，一个以 null 结尾的字符串，包含了组成字符串的字符。")]),t._v(" "),r("p",[t._v("C++ 中有大量的函数用来操作以 null 结尾的字符串:")]),t._v(" "),r("table",[r("thead",[r("tr",[r("th",{staticStyle:{"text-align":"left"}},[t._v("序号")]),t._v(" "),r("th",{staticStyle:{"text-align":"left"}},[t._v("函数 & 目的")])])]),t._v(" "),r("tbody",[r("tr",[r("td",{staticStyle:{"text-align":"left"}},[t._v("1")]),t._v(" "),r("td",{staticStyle:{"text-align":"left"}},[r("strong",[t._v("strcpy(s1, s2);")]),t._v(" 复制字符串 s2 到字符串 s1。")])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[t._v("2")]),t._v(" "),r("td",{staticStyle:{"text-align":"left"}},[r("strong",[t._v("strcat(s1, s2);")]),t._v(" 连接字符串 s2 到字符串 s1 的末尾。连接字符串也可以用 "),r("strong",[t._v("+")]),t._v(" 号，例如: "),r("code",[t._v('string str1 = "runoob"; string str2 = "google"; string str = str1 + str2;')])])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[t._v("3")]),t._v(" "),r("td",{staticStyle:{"text-align":"left"}},[r("strong",[t._v("strlen(s1);")]),t._v(" 返回字符串 s1 的长度。")])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[t._v("4")]),t._v(" "),r("td",{staticStyle:{"text-align":"left"}},[r("strong",[t._v("strcmp(s1, s2);")]),t._v(" 如果 s1 和 s2 是相同的，则返回 0；如果 s1<s2 则返回值小于 0；如果 s1>s2 则返回值大于 0。")])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[t._v("5")]),t._v(" "),r("td",{staticStyle:{"text-align":"left"}},[r("strong",[t._v("strchr(s1, ch);")]),t._v(" 返回一个指针，指向字符串 s1 中字符 ch 的第一次出现的位置。")])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[t._v("6")]),t._v(" "),r("td",{staticStyle:{"text-align":"left"}},[r("strong",[t._v("strstr(s1, s2);")]),t._v(" 返回一个指针，指向字符串 s1 中字符串 s2 的第一次出现的位置。")])])])]),t._v(" "),r("p",[t._v("下面的实例使用了上述的一些函数：")]),t._v(" "),r("h2",{attrs:{id:"cstring-字符串函数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#cstring-字符串函数"}},[t._v("#")]),t._v(" "),r("code",[t._v("<cstring>")]),t._v("字符串函数")]),t._v(" "),r("div",{staticClass:"language-c++ extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v('#include <iostream>\n// #include <string>\n#include <cstring>\nusing namespace std;\n\nint main() {\n    char str1[] = "huangshuiqing";\n    char str2[] = "google";\n    char str3[strlen(str1)];\n    cout << "strlen:" << str3 << ":" << strlen(str3) << endl;\n    strcpy(str3, str1);\n    cout << str3 << endl;\n    cout << "strcat(str1,str2):" << strcat(str1, str2) << endl;\n    cout << "strlen(str1):" << strlen(str1) << endl;\n}\n')])])]),r("p",[t._v("当上面的代码被编译和执行时，它会产生下列结果：")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("strcpy( str3, str1) : runoob\nstrcat( str1, str2): runoobgoogle\nstrlen(str1) : 12\n")])])]),r("h2",{attrs:{id:"c-中的-string-类"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#c-中的-string-类"}},[t._v("#")]),t._v(" C++ 中的 String 类")]),t._v(" "),r("p",[t._v("C++ 标准库提供了 "),r("strong",[t._v("string")]),t._v(" 类类型，支持上述所有的操作，另外还增加了其他更多的功能。我们将学习 C++ 标准库中的这个类，现在让我们先来看看下面这个实例：")]),t._v(" "),r("p",[t._v("现在您可能还无法透彻地理解这个实例，因为到目前为止我们还没有讨论类和对象。所以现在您可以只是粗略地看下这个实例，等理解了面向对象的概念之后再回头来理解这个实例。")]),t._v(" "),r("h2",{attrs:{id:"string类的方法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#string类的方法"}},[t._v("#")]),t._v(" String类的方法")]),t._v(" "),r("div",{staticClass:"language-c++ extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v('#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string str1 = "huangshuiqing";\n    string str2 = "google";\n    string str3;\n    int len;\n    // 复制 str1 到 str3\n    str3 = str1;\n    cout << "str3 : " << str3 << endl;\n    // 连接 str1 和 str2\n    str3 = str1 + str2;\n    cout << "str1 + str2 : " << str3 << endl;\n    // 连接后，str3 的总长度\n    len = str3.size();\n    cout << "str3.size() :  " << len << endl;\n\n    return 0;\n}\n//str3 : huangshuiqing\n//str1 + str2 : huangshuiqinggoogle\n//str3.size() :  19\n')])])]),r("p",[t._v("当上面的代码被编译和执行时，它会产生下列结果：")]),t._v(" "),r("div",{staticClass:"language-c++ extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("str3 : runoob\nstr1 + str2 : runoobgoogle\nstr3.size() :  12\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);