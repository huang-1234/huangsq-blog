(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{612:function(t,s,a){"use strict";a.r(s);var n=a(6),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"头文件和std命名空间"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#头文件和std命名空间"}},[t._v("#")]),t._v(" 头文件和std命名空间")]),t._v(" "),a("p",[a("a",{attrs:{href:"http://c.biancheng.net/cplus/",target:"_blank",rel:"noopener noreferrer"}},[t._v("C++"),a("OutboundLink")],1),t._v(" 是在C语言的基础上开发的，早期的 C++ 还不完善，不支持命名空间，没有自己的编译器，而是将 C++ 代码翻译成C代码，再通过C编译器完成编译。这个时候的 C++ 仍然在使用C语言的库，stdio.h、stdlib.h、string.h 等头文件依然有效；此外 C++ 也开发了一些新的库，增加了自己的头文件，例如：")]),t._v(" "),a("ul",[a("li",[t._v("iostream.h：用于控制台输入输出头文件。")]),t._v(" "),a("li",[t._v("fstream.h：用于文件操作的头文件。")]),t._v(" "),a("li",[t._v("complex.h：用于复数计算的头文件。")])]),t._v(" "),a("p",[t._v("和C语言一样，C++ 头文件仍然以"),a("code",[t._v(".h")]),t._v("为后缀，它们所包含的类、函数、宏等都是全局范围的。")]),t._v(" "),a("p",[t._v("后来 C++ 引入了命名空间的概念，计划重新编写库，将类、函数、宏等都统一纳入一个命名空间，这个命名空间的名字就是"),a("code",[t._v("std")]),t._v("。std 是 s"),a("a",{attrs:{href:"http://c.biancheng.net/ref/tan.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("tan"),a("OutboundLink")],1),t._v("dard 的缩写，意思是“标准命名空间”。")]),t._v(" "),a("p",[t._v("但是这时已经有很多用老式 C++ 开发的程序了，它们的代码中并没有使用命名空间，直接修改原来的库会带来一个很严重的后果：程序员会因为不愿花费大量时间修改老式代码而极力反抗，拒绝使用新标准的 C++ 代码。")]),t._v(" "),a("p",[t._v("C++ 开发人员想了一个好办法，保留原来的库和头文件，它们在 C++ 中可以继续使用，然后再把原来的库复制一份，在此基础上稍加修改，把类、函数、宏等纳入命名空间 std 下，就成了新版 C++ 标准库。这样共存在了两份功能相似的库，使用了老式 C++ 的程序可以继续使用原来的库，新开发的程序可以使用新版的 C++ 库。")]),t._v(" "),a("p",[t._v("为了避免头文件重名，新版 C++ 库也对头文件的命名做了调整，去掉了后缀"),a("code",[t._v(".h")]),t._v("，所以老式 C++ 的"),a("code",[t._v("iostream.h")]),t._v("变成了"),a("code",[t._v("iostream")]),t._v("，"),a("code",[t._v("fstream.h")]),t._v("变成了"),a("code",[t._v("fstream")]),t._v("。而对于原来C语言的头文件，也采用同样的方法，但在每个名字前还要添加一个"),a("code",[t._v("c")]),t._v("字母，所以C语言的"),a("code",[t._v("stdio.h")]),t._v("变成了"),a("code",[t._v("cstdio")]),t._v("，"),a("code",[t._v("stdlib.h")]),t._v("变成了"),a("code",[t._v("cstdlib")]),t._v("。")]),t._v(" "),a("p",[t._v("需要注意的是，旧的 C++ 头文件是官方所反对使用的，已明确提出不再支持，但旧的C头文件仍然可以使用，以保持对C的兼容性。实际上，编译器开发商不会停止对客户现有软件提供支持，可以预计，旧的 C++ 头文件在未来数年内还是会被支持。")]),t._v(" "),a("p",[t._v("下面是我总结的 C++ 头文件的现状：")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("旧的 C++ 头文件，如 iostream.h、fstream.h 等将会继续被支持，尽管它们不在官方标准中。这些头文件的内容不在命名空间 std 中。")])]),t._v(" "),a("li",[a("p",[t._v("新的 C++ 头文件，如 iostream、fstream 等包含的基本功能和对应的旧版头文件相似，但头文件的内容在命名空间 std 中。")])])]),t._v(" "),a("blockquote",[a("p",[t._v("注意：在标准化的过程中，库中有些部分的细节被修改了，所以旧的头文件和新的头文件不一定完全对应。")])]),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[a("p",[t._v("标准C头文件如 stdio.h、stdlib.h 等继续被支持。头文件的内容不在 std 中。")])]),t._v(" "),a("li",[a("p",[t._v("具有C库功能的新C++头文件具有如 cstdio、cstdlib 这样的名字。它们提供的内容和相应的旧的C头文件相同，只是内容在 std 中。")])])]),t._v(" "),a("p",[t._v("可以发现，对于不带"),a("code",[t._v(".h")]),t._v("的头文件，所有的符号都位于命名空间 std 中，使用时需要声明命名空间 std；对于带"),a("code",[t._v(".h")]),t._v("的头文件，没有使用任何命名空间，所有符号都位于全局作用域。这也是 C++ 标准所规定的。")]),t._v(" "),a("p",[t._v("不过现实情况和 C++ 标准所期望的有些不同，对于原来C语言的头文件，即使按照 C++ 的方式来使用，即"),a("code",[t._v("#include <cstdio>")]),t._v("这种形式，那么符号可以位于命名空间 std 中，也可以位于全局范围中，请看下面的两段代码。")]),t._v(" "),a("ol",[a("li",[t._v("使用命名空间 std：")])]),t._v(" "),a("div",{staticClass:"language-cpp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-cpp"}},[a("code",[a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<cstdio>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    std"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("printf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://c.biancheng.net\\n"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("不使用命名空间 std：")])]),t._v(" "),a("div",{staticClass:"language-cpp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-cpp"}},[a("code",[a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<cstdio>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("printf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://c.biancheng.net\\n"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("这两种形式在 Microsoft Visual C++ 和 "),a("a",{attrs:{href:"http://c.biancheng.net/gcc/",target:"_blank",rel:"noopener noreferrer"}},[t._v("GCC"),a("OutboundLink")],1),t._v(" 下都能够编译通过，也就是说，大部分编译器在实现时并没有严格遵循C++标准，它们对两种写法都支持，程序员可以使用 std 也可以不使用。")]),t._v(" "),a("p",[t._v("第 1) 种写法是标准的，第 2) 种不标准，虽然它们在目前的编译器中都没有错误，但我依然推荐使用第 1) 种写法，因为标准写法会一直被编译器支持，非标准写法可能会在以后的升级版本中不再支持。")]),t._v(" "),a("h2",{attrs:{id:"使用c-的头文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用c-的头文件"}},[t._v("#")]),t._v(" 使用C++的头文件")]),t._v(" "),a("p",[t._v("虽然 C++ 几乎完全兼容C语言，C语言的头文件在 C++ 中依然被支持，但 C++ 新增的库更加强大和灵活，请读者尽量使用这些 C++ 新增的头文件，例如 iostream、fstream、string 等。")]),t._v(" "),a("p",[t._v("前面几节我们使用了C语言的格式输出函数 printf，引入了C语言的头文件 stdio.h，将C代码和 C++ 代码混合在了一起，我不推荐这样做，请尽量使用 C++ 的方式。下面的例子演示了如何使用 C++ 库进行输入输出：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('#include <iostream>#include <string>int main(){    //声明命名空间std    using namespace std;       //定义字符串变量    string str;    //定义 int 变量    int age;    //从控制台获取用户输入    cin>>str>>age;    //将数据输出到控制台    cout<<str<<"已经成立"<<age<<"年了！"<<endl;    return 0;}\n')])])]),a("p",[t._v("运行结果：\nC语言中文网↙\n6↙\nC语言中文网已经成立6年了！")]),t._v(" "),a("p",[t._v("string 是 C++ 中的字符串类，初学者可以将 string 看做一种内置的数据类型，就像 int、float 等，可以用来定义变量。cin 用于从控制台获取用户输入，cout 用于将数据输出到控制台，下节我们会详细讲解。")]),t._v(" "),a("p",[t._v("读者暂时不需要深入了解这段代码的细节，只需要留意"),a("code",[t._v("using namespace std;")]),t._v("，它声明了命名空间 std，后续如果有未指定命名空间的符号，那么默认使用 std，代码中的 string、cin、cout 都位于命名空间 std。")]),t._v(" "),a("p",[t._v("在 main() 函数中声明命名空间 std，它的作用范围就位于 main() 函数内部，如果在其他函数中又用到了 std，就需要重新声明，请看下面的例子：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('#include <iostream>void func(){    //必须重新声明    using namespace std;    cout<<"http://c.biancheng.net"<<endl;}int main(){    //声明命名空间std    using namespace std;       cout<<"C语言中文网"<<endl;    func();    return 0;}\n')])])]),a("p",[t._v("如果希望在所有函数中都使用命名空间 std，可以将它声明在全局范围中，例如：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('#include <iostream>//声明命名空间stdusing namespace std;void func(){    cout<<"http://c.biancheng.net"<<endl;}int main(){    cout<<"C语言中文网"<<endl;    func();    return 0;}\n')])])]),a("p",[t._v("很多教程中都是这样做的，将 std 直接声明在所有函数外部，这样虽然使用方便，但在中大型项目开发中是不被推荐的，这样做增加了命名冲突的风险，我推荐在函数内部声明 std。")]),t._v(" "),a("p",[t._v("不过为了方便，本教程还是忍不住违反了原则，后面有很多代码都在全局范围内声明了 std。")])])}),[],!1,null,null,null);s.default=e.exports}}]);