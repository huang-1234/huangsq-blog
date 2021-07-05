(window.webpackJsonp=window.webpackJsonp||[]).push([[143],{653:function(n,t,e){"use strict";e.r(t);var r=e(6),a=Object(r.a)({},(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h1",{attrs:{id:"回车与换行的区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#回车与换行的区别"}},[n._v("#")]),n._v(" 回车与换行的区别")]),n._v(" "),e("p",[n._v("我一直没有搞得很清楚，回车和换行符有啥区别。")]),n._v(" "),e("p",[n._v("符号 ASCII码 意义\n\\n 10 换行NL\n\\r 13 回车CR")]),n._v(" "),e("p",[n._v("回车 \\r 本义是光标重新回到本行开头，r的英文return，控制字符可以写成CR，即Carriage Return\n换行 \\n 本义是光标往下一行（不一定到下一行行首），n的英文newline，控制字符可以写成LF，即Line Feed\n在不同的"),e("strong",[n._v("操作系统")]),n._v("这几个字符表现不同，比如在WIN系统下，这两个字符就是表现的本义，在UNIX类系统，换行\\n就表现为光标下一行并回到行首，在MAC上，\\r就表现为回到本行开头并往下一行，至于ENTER键的定义是与操作系统有关的。通常用的Enter是两个加起来。")]),n._v(" "),e("p",[n._v("在计算机还没有出现之前，有一种叫做电传打字机（Teletype Model 33）的玩意，每秒钟可以打10个字符。但是它有一个问题，就是打完一行换行的时候，要用去0.2秒，正好可以打两个字符。要是在这0.2秒里面，又有新的字符传过来，那么这个字符将丢失。\n于是，研制人员想了个办法解决这个问题，就是在每行后面加两个表示结束的字符。一个叫做“回车”，告诉打字机把打印头定位在左边界；另一个叫做“换行”，告诉打字机把纸向下移一行。\n这就是“换行”和“回车”的来历，从它们的英语名字上也可以看出一二。\n后来，计算机发明了，这两个概念也就被般到了计算机上。那时，存储器很贵，一些科学家认为在每行结尾加两个字符太浪费了，加一个就可以。于是，就出现了分歧。")]),n._v(" "),e("p",[n._v("/"),e("em",[n._v("======================================")]),n._v("/\n\\n: UNIX 系统行末结束符\n\\n\\r: window 系统行末结束符\n\\r: MAC OS 系统行末结束符\n/"),e("em",[n._v("======================================")]),n._v("/\n一个直接后果是，Unix/Mac系统下的文件在"),e("strong",[n._v("Windows")]),n._v("里打开的话，所有文字会变成一行；而Windows里的文件在Unix/Mac下打开的话，在每行的结尾可能会多出一个^M符号。（这也是经常说见到的现象，哈哈，原来是这样的）")]),n._v(" "),e("p",[n._v('c++语言编程时（windows系统）\\r 就是return 回到 本行 行首 这就会把这一行以前的输出 覆盖掉\n如：\nint main() {\ncout << "hahaha" << "\\r" << "xixi" ;\n}\n最后只显示 xixi 而 hahaha 被覆盖了\n\\n 是回车＋换行 把光标 先移到 行首 然后换到下一行 也就是 下一行的行首拉\nint main() {\ncout << "hahaha" << "\\n" << "xixi" ;\n}\n则 显示\nhahaha\nxixi')])])}),[],!1,null,null,null);t.default=a.exports}}]);