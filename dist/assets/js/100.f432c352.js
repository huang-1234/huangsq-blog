(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{609:function(v,_,t){"use strict";t.r(_);var a=t(6),d=Object(a.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"语法分析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#语法分析"}},[v._v("#")]),v._v(" 语法分析")]),v._v(" "),t("h2",{attrs:{id:"dfa自动机和nfa"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dfa自动机和nfa"}},[v._v("#")]),v._v(" DFA自动机和NFA")]),v._v(" "),t("h2",{attrs:{id:"求ll-1-分析表"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#求ll-1-分析表"}},[v._v("#")]),v._v(" 求LL(1)分析表")]),v._v(" "),t("h4",{attrs:{id:"易错点及扩展"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#易错点及扩展"}},[v._v("#")]),v._v(" 易错点及扩展：")]),v._v(" "),t("p",[v._v("1、求每个产生式的 SELECT 集")]),v._v(" "),t("p",[v._v("2、注意区分是对谁 FIRST 集 FOLLOW 集")]),v._v(" "),t("p",[v._v("3、开始符号的 FOLLOW 集包含 #")]),v._v(" "),t("p",[v._v("4、"),t("strong",[v._v("各集合对对应的对象以及含义")])]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("集")]),v._v(" "),t("th",[v._v("对象")]),v._v(" "),t("th",[v._v("含义")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[v._v("FIRST 集")]),v._v(" "),t("td",[v._v("是对产生式右部")]),v._v(" "),t("td",[v._v("右部内部的所有终结符集，可能为 ε")])]),v._v(" "),t("tr",[t("td",[v._v("FOLLOW 集")]),v._v(" "),t("td",[v._v("是对产生式左部（非终结符）")]),v._v(" "),t("td",[v._v("非终结符后面紧跟的终结符，可能为 #，和该非终结符推导出的右部无关（因为LL(1)文法不包含递归，所以右部不会再有该非终结符，所以不能通过该右部判断该非终结符后跟集合）")])]),v._v(" "),t("tr",[t("td",[v._v("SELECT 集")]),v._v(" "),t("td",[v._v("是对产生式")]),v._v(" "),t("td",[v._v("需要考虑产生式右部的不同情况，进一步确定是根据 FIRST 集还是 FOLLOW 集")])])])]),v._v(" "),t("p",[v._v("5、"),t("strong",[v._v("SELECT 集的定义")]),v._v(" "),t("strong",[v._v("注：")]),v._v(" 注意区分 FIRST 集 FOLLOW 时是对 α 还是 A")]),v._v(" "),t("blockquote",[t("p",[v._v("给定文法 G，对于产生式 A→α，α ∈ V*，则可选集 SELECT(A→α) 有：\n（1）若 α ≠ ε，且 α ≠+> ε，则 SELECT(A→α) = FIRST(α)\n（2）若 α ≠ ε，但 α =+> ε，则 SELECT(A→α) = FIRST(α) ∪ FOLLOW(A)\n（3）若 α = ε，则 SELECT(A→α) = FOLLOW(A)")])]),v._v(" "),t("p",[t("strong",[v._v("描述：")])]),v._v(" "),t("ul",[t("li",[t("p",[v._v("第 1 条是，当 α ≠ ε，且通过1次或多次推不出 ε，SELECT(A→α) = FIRST(α)")])]),v._v(" "),t("li",[t("p",[v._v("第 2 条是，当 α ≠ ε，但 α 经有限步可推出 ε，SELECT(A→α) = FIRST(α) ∪ FOLLOW(A)\n（注意是一个 α，一个 A）")])]),v._v(" "),t("li",[t("p",[v._v("第 3 条是，当 α = ε，SELECT 集就等于左部 A 的 FOLLOW 集")]),v._v(" "),t("p",[v._v("解题时，先判断是否为 ε，是则用第（3）条，否则再判断能否通过1次或多次推出 ε，是则用第（2）条，否则用第（1）条")]),v._v(" "),t("p",[v._v("求 FIRST，FOLLOW，SELECT 集详细例题可参考：\n"),t("a",{attrs:{href:"https://www.cnblogs.com/xpwi/p/10987443.html",target:"_blank",rel:"noopener noreferrer"}},[v._v("《编译原理》-用例题理解-自顶向下语法分析及 FIRST，FOLLOW，SELECT集，LL(1)文法"),t("OutboundLink")],1)])])]),v._v(" "),t("p",[v._v("6、"),t("strong",[v._v("LL(1) 分析表的结构")])]),v._v(" "),t("p",[v._v("分析表是一个二维数组 M[A，a]，其中 A 表示行，是非终结符，a 表式列是终结符或 #。")]),v._v(" "),t("ul",[t("li",[v._v("M[A，a] 中若有产生式，表明 A 可用该产生式推导，以求与输入符号 a 匹配。")]),v._v(" "),t("li",[v._v("M[A，a] 中若为空，表明 A 不可能推导出与 a 匹配的字符串")])]),v._v(" "),t("p",[v._v("7、"),t("strong",[v._v("LL(1) 分析表构造方法：")])]),v._v(" "),t("ul",[t("li",[v._v("若 a∈SELECT(A→α)，则把 A→α 加至 M[A, a] 中")]),v._v(" "),t("li",[v._v("把所有无定义的 M[A, a] 标上“出错标志”。为了使表简化，表中空白处为出错")])]),v._v(" "),t("h4",{attrs:{id:"例题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#例题"}},[v._v("#")]),v._v(" 例题：")]),v._v(" "),t("p",[t("strong",[v._v("已给文法：")])]),v._v(" "),t("blockquote",[t("p",[t("strong",[v._v("G[S]: S→aH\nH→aMd\nH→d\nM→Ab\nM→ε\nA→aM\nA→e")])])]),v._v(" "),t("p",[v._v("（1）求 SELECT 集\n（2）证明文法是 LL(1) 文法\n（3）构造 LL(1) 分析表")]),v._v(" "),t("p",[t("strong",[v._v("解析：")])]),v._v(" "),t("p",[t("strong",[v._v("求 SELECT 集：")])]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("产生式")]),v._v(" "),t("th",[v._v("FIRST 集")]),v._v(" "),t("th",[v._v("FOLLOW 集")]),v._v(" "),t("th",[v._v("SELECT 集")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[v._v("S→aH "),t("strong",[v._v("分析：")]),v._v(" 对该产生式，可知 FIRST(aH) = {a}；也可知应将 FOLLOW(S) = {#} 加到 FOLLOW(H) 中")]),v._v(" "),t("td",[v._v("{a}")]),v._v(" "),t("td",[v._v("FOLLOW(S) = {#}")]),v._v(" "),t("td",[v._v("SELECT(S→aH) = FIRST(aH) = {a}")])]),v._v(" "),t("tr",[t("td",[v._v("H→aMd "),t("strong",[v._v("分析：")]),v._v(" 对该产生式，可知 FIRST(aMd) = {a}；也可知应将 d 加到 FOLLOW(M) 中")]),v._v(" "),t("td",[v._v("{a}")]),v._v(" "),t("td",[v._v("FOLLOW(H) = {#}")]),v._v(" "),t("td",[v._v("SELECT(H→aMd) = FIRST(aMd) = {a}")])]),v._v(" "),t("tr",[t("td",[v._v("H→d "),t("strong",[v._v("分析：")]),v._v(" 对该产生式，可知 FIRST(d) = {d}")]),v._v(" "),t("td",[v._v("{d}")]),v._v(" "),t("td"),v._v(" "),t("td",[v._v("SELECT(H→d) = FIRST(d) = {d}")])]),v._v(" "),t("tr",[t("td",[v._v("M→Ab "),t("strong",[v._v("分析：")]),v._v(" 对该产生式，可知 FIRST(Ab) = {a, e}；也可知应将 b 加到 FOLLOW(A) 中")]),v._v(" "),t("td",[v._v("{a, e}")]),v._v(" "),t("td",[v._v("FOLLOW(M) = {b, d}")]),v._v(" "),t("td",[v._v("SELECT(M→Ab) = FIRST(Ad) = {a, e}")])]),v._v(" "),t("tr",[t("td",[v._v("M→ε")]),v._v(" "),t("td",[v._v("{ε}")]),v._v(" "),t("td"),v._v(" "),t("td",[v._v("SELECT(M→ε) = FOLLOW(M) ={d, b} "),t("strong",[v._v("求法：")]),v._v(" 由产生式 H→aMd，所以将 d 放入 FOLLOW(M)；由产生式 A→aM 所以把 FOLLOW(A) 加至 FOLLOW(M) 中。"),t("strong",[v._v("同理")]),v._v(" 求 FOLLOW(A)，由产生式 M→Ab，FOLLOW(A) = {b}。故 FOLLOW(M) = {d ,b}")])]),v._v(" "),t("tr",[t("td",[v._v("A→aM "),t("strong",[v._v("分析：")]),v._v(" 对该产生式，可知 FIRST(aM) = {a}；也可知应将 FOLLOW(A) 加到 FOLLOW(M) 中")]),v._v(" "),t("td",[v._v("{a}")]),v._v(" "),t("td",[v._v("FOLLOW(A) = {b}")]),v._v(" "),t("td",[v._v("SELECT(A→aM) = FIRST(aM) = {a}")])]),v._v(" "),t("tr",[t("td",[v._v("A→e "),t("strong",[v._v("分析：")]),v._v(" 对该产生式，可知 FIRST(e) = {e}")]),v._v(" "),t("td",[v._v("{e}")]),v._v(" "),t("td"),v._v(" "),t("td",[v._v("SELECT(A→e) = FIRST(e) = {e}")])])])]),v._v(" "),t("p",[t("strong",[v._v("证明文法是 LL(1) 文法（2 分）")])]),v._v(" "),t("p",[v._v("定理：同一非终结符的 SELECT 交集为空集，则该文法是 LL(1) 文法：")]),v._v(" "),t("ul",[t("li",[v._v("SELECT(H→aMd) ∩ SELECT(H→d) = ∅")]),v._v(" "),t("li",[v._v("SELECT(M→Ab) ∩ SELECT(M→ε) = ∅")]),v._v(" "),t("li",[v._v("SELECT(A→aM) ∩ SELECT(A→e) = ∅")])]),v._v(" "),t("p",[v._v("所以该文法是 LL(1) 文法")]),v._v(" "),t("p",[t("strong",[v._v("构造 LL(1) 分析表（1 分）")])]),v._v(" "),t("p",[v._v("分析表是一个二维数组 M[A，a]，其中 A 表示行是非终结符，a 表式列是终结符或 #。根据 SELECT 集构造分析表：")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th"),v._v(" "),t("th",[v._v("a")]),v._v(" "),t("th",[v._v("b")]),v._v(" "),t("th",[v._v("d")]),v._v(" "),t("th",[v._v("e")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[v._v("S")]),v._v(" "),t("td",[v._v("S→aH")]),v._v(" "),t("td"),v._v(" "),t("td"),v._v(" "),t("td")]),v._v(" "),t("tr",[t("td",[v._v("H")]),v._v(" "),t("td",[v._v("H→aMd")]),v._v(" "),t("td"),v._v(" "),t("td",[v._v("H→d")]),v._v(" "),t("td")]),v._v(" "),t("tr",[t("td",[v._v("M")]),v._v(" "),t("td",[v._v("M→Ab")]),v._v(" "),t("td",[v._v("M→ε")]),v._v(" "),t("td",[v._v("M→ε")]),v._v(" "),t("td",[v._v("M→Ab")])]),v._v(" "),t("tr",[t("td",[v._v("A")]),v._v(" "),t("td",[v._v("A→aM")]),v._v(" "),t("td"),v._v(" "),t("td"),v._v(" "),t("td",[v._v("A→e")])])])]),v._v(" "),t("h2",{attrs:{id:"求-firstvt-集和-lastvt-集的步骤"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#求-firstvt-集和-lastvt-集的步骤"}},[v._v("#")]),v._v(" 求 FIRSTVT 集和 LASTVT 集的步骤")]),v._v(" "),t("p",[v._v("算符优先关系表的构造中涉及到求 FIRSTVT 集和 LASTVT 集。")]),v._v(" "),t("p",[t("strong",[v._v("表示及含义：")])]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("FIRSTVT(T)")]),v._v(" "),t("th",[v._v("非终结符T的最左终结符集合")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[t("strong",[v._v("LASTVT(T)")])]),v._v(" "),t("td",[t("strong",[v._v("非终结符T的最右终结符集合")])])])])]),v._v(" "),t("p",[t("strong",[v._v("定义：")])]),v._v(" "),t("p",[t("img",{attrs:{src:"/images/CSBase/Complier/syntaxAlex.assets/FIRSTVTandLASTVT.png",alt:"img"}})]),v._v(" "),t("p",[t("strong",[v._v("定义解释：")])]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("FIRSTVT(T)")]),v._v(" "),t("th",[v._v("非终结符T经过1步或多步推导，得到的最左端终结符，以及左端第二个终结符的集合")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[t("strong",[v._v("LASTVT(T)")])]),v._v(" "),t("td",[t("strong",[v._v("非终结符T经过1步或多步推导，得到的最右端终结符，以及倒数第二个终结符的集合")])])])])]),v._v(" "),t("p",[t("strong",[v._v("求 FIRSTVT 集的步骤：")])]),v._v(" "),t("p",[v._v("（1）若有产生式 T→a 或者 T→Ra...，则 a ∈ FIRSTVT(T)")]),v._v(" "),t("p",[v._v("（2）若 a ∈ FIRSTVT(R)，且有产生式 T→R...，则 a ∈ FIRSTVT(T)")]),v._v(" "),t("p",[v._v("就是说如果 a 是非终结符 R 的 FIRSTVT 集，且 T 可以推出以非终结 R 带头的右部，则 a 也是非终结符 T 的 FIRSTVT 集。")]),v._v(" "),t("p",[t("strong",[v._v("注：")]),v._v(" 省略号 ... 可以为空，就是没有")]),v._v(" "),t("p",[t("strong",[v._v("求 LASTVT 集的步骤：")])]),v._v(" "),t("p",[v._v("（1）若有产生式 T→...a 或者 T→...aR，则 a ∈ LASTVT(T)")]),v._v(" "),t("p",[v._v("（2）若 a ∈ LASTVT(R)，且有产生式 T→...R，则 a ∈ LASTVT(T)")]),v._v(" "),t("p",[t("strong",[v._v("例题：")])]),v._v(" "),t("blockquote",[t("p",[t("strong",[v._v("已给文法：\nG[S]:\nS→a|b|(B)\nA→S, A|S\nB→A")])])]),v._v(" "),t("p",[v._v("求所有非终结符的 FIRSTVT，LASTVT 集")]),v._v(" "),t("h5",{attrs:{id:"解析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解析"}},[v._v("#")]),v._v(" 解析：")]),v._v(" "),t("p",[v._v("（1）只要是让求 FIRSTVT，LASTVT 集，则该文法就隐含条件为算符优先文法。")]),v._v(" "),t("p",[v._v("（2）算符优先文法的特点是：不会出现两个相邻的非终结符，即两个非终结符中间夹着一个终结符。如果第一个是终结符则第二个是非终结符。")]),v._v(" "),t("p",[t("strong",[v._v("结果：")])]),v._v(" "),t("table",[t("thead",[t("tr",[t("th"),v._v(" "),t("th",[v._v("FIRSTVT 集")]),v._v(" "),t("th",[v._v("LASTVT 集")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[v._v("S")]),v._v(" "),t("td",[v._v("{a, b, ( }")]),v._v(" "),t("td",[v._v("{a, b, ) }")])]),v._v(" "),t("tr",[t("td",[v._v("A")]),v._v(" "),t("td",[v._v("{a, b, (, 逗号 }")]),v._v(" "),t("td",[v._v("{a, b, ), 逗号}")])]),v._v(" "),t("tr",[t("td",[v._v("B")]),v._v(" "),t("td",[v._v("{a, b, (, 逗号 }")]),v._v(" "),t("td",[v._v("{a, b, ), 逗号}")])])])])])}),[],!1,null,null,null);_.default=d.exports}}]);