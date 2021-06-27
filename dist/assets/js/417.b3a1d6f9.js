(window.webpackJsonp=window.webpackJsonp||[]).push([[417],{924:function(t,e,l){"use strict";l.r(e);var a=l(6),_=Object(a.a)({},(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[l("h2",{attrs:{id:"vscode查找和替换正则表达式转义字符整理"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#vscode查找和替换正则表达式转义字符整理"}},[t._v("#")]),t._v(" VSCode查找和替换正则表达式转义字符整理")]),t._v(" "),l("p",[t._v("使用VSCode进行查找、替换时，经常需要用到正则表达式，一段时间不用就忘了，每次要用的时候都要耽误很多时间去查找，所以整理了一份很全的放在这里。这个其实是.NET使用的正则表达式，VSCode也是一样的，微软系的产品（比如Visual Studio等）应该都是使用这个标准的。")]),t._v(" "),l("p",[t._v("本文只列举和翻译了常用的一些，完整内容请参照"),l("a",{attrs:{href:"https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference",target:"_blank",rel:"noopener noreferrer"}},[t._v("微软官方文档"),l("OutboundLink")],1)]),t._v(" "),l("p",[t._v("注意事项：在VSCode中使用时，要先把通配符开关打开（开关是查找输入框右边的”.*“符号）")]),t._v(" "),l("table",[l("thead",[l("tr",[l("th",{staticStyle:{"text-align":"left"}},[t._v("转义字符")]),t._v(" "),l("th",{staticStyle:{"text-align":"left"}},[t._v("匹配内容")])])]),t._v(" "),l("tbody",[l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("\\t")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("tab")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("\\r")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("回车符号\\r")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("\\n")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("换行符号\\n")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("\\uxxxx")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("匹配Unicode编码为xxx的字符,如\\u0020匹配空格，这个符号可以用来帮助匹配中文，后面说")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("\\")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("特殊符号转义，如”*” ，转义后匹配的是字符”*“， “(” 匹配的是括号”(”")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("[字符序列]")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("匹配[ ]中的任意字符，如[ae]，字符a和字符e均匹配")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("[^字符序列]")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("匹配不在[ ]中的任意字符，如[^ae]除了a和e，其他字符都匹配")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("[字符1-字符2]")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("匹配在[ ]之间的任意字符，如[a-x]，就是匹配a和x之间的所有字符（包括a和x）")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v(".")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("匹配任意单个字符(除了\\n)")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("\\w")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("匹配所有单词字符（如”a”，”3”，”E”，但不匹配”?“，”.“等）")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("\\W")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("和\\w相反，匹配所有非单词字符")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("[\\u4e00-\\u9fa5]")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("利用区间和\\u转义符号，匹配中文（该区间包含2万个汉字），可以当做中文版的\\w使用")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("\\s")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("匹配空格")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("\\S")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("和\\s相反，匹配非空格")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("\\d")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("匹配数字字符，如”1”，”4”，”9”等")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("\\D")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("和\\d相反，匹配除了数字字符外的其他字符")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("将前面的元素匹配0到多次，如”\\d*.\\d”，可以匹配”19.9”，”.0”,“129.9”")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("+")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("将前面的元素匹配1到多次，如”be+“，可以匹配”be”， “beeeeee”")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("？")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("将前面的元素匹配0次或者一次，如”rai?n” 可以且只可以匹配 “ran” 或者 “rain”")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("{n}")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("n是个数字，将前面的元素匹配n次，如”be{3}“可以且只可以匹配 ”beee”")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("{n, m}")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("将前面的元素匹配至少n次，最多m次，如”be{1,3}” 可以且只可以匹配”be”,“bee”, “beee”")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("|")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("相当于”或”,表示匹配由|分割的任意一个元素，如the(e| is | at)，可以匹配”the”, “this”, “that”")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("$n")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("n是个数字，这个是替换时使用括号（ ）将匹配的patter分割成了几个元素，然后在替换的patter里面使用，类似于变量。 如果查找patter是”(\\w+)(\\s)(\\w+)“,那么$1就是(\\w+),$2是(\\s),$3是(\\w+)，替换patter是$3$2$1,那么替换结果就是(\\w+)(\\s)(\\w+)。 假设匹配到的是”one two”，那么$1,$2,$3分别为”one”, “ “, “two”，替换后的结果为”two one”.")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("________________")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}})])])]),t._v(" "),l("p",[t._v("正则表达式除了匹配字符外，还可以对匹配的上下文做要求，比如要求匹配必须从一行的开头开始，感觉用的不是特别多，需要的请参照本文开头给出的链接。")])])}),[],!1,null,null,null);e.default=_.exports}}]);