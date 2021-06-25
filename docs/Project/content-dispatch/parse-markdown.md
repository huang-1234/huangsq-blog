## markdown 编译原理

因为本人平时写作方式就是使用的 markdown, 感觉有些引擎解析快,有些慢. 但又无可奈何. 就像:

> 我就喜欢你看不惯我,又干不掉我的样子

所以, 这里,相对 markdown 语法引擎做一个简单分析。或者说,自己动手来写一个 micro-markdown-parser. markdown 引擎其实并不复杂,只要你得到了对应的 regexp,然后替换一下 HTML tag 即可. 目前市面上流行的几种 markdown 解析器 无外乎就是: [marker](https://link.zhihu.com/?target=https%3A//github.com/chjj/marked),[markdown-js](https://link.zhihu.com/?target=https%3A//github.com/evilstreak/markdown-js).
一开始,markdown 是由 John Gruber 用 Perl 写出来的语法解析器. 由于 md 在后面过于火爆,出现了不同的支持引擎. 不过,后面在 github 上,提出了[GFM](https://link.zhihu.com/?target=https%3A//help.github.com/articles/creating-and-highlighting-code-blocks/) (Github Flavored Markdown) 这一个标准之后. 大部分引擎的解析规范也得到了统一. 最最基本的一个 md 引擎,应该需要能够解析: Inline HTML, Automatic paragraphs, headers, blockquotes, lists, code blocks, horizontal rules, links, emphasis, inline code and images 这几种. 详情,可以参考: [md features](https://link.zhihu.com/?target=https%3A//css-tricks.com/choosing-right-markdown-parser/) 接下来,我们正式的 make a md parser.

### 前期准备

关于 md parser 最最基本的就是正则和 exec 方法. 先简单说一下 exec 方法吧.

### 正则的 exec

exec 是用来在特定 str 中,匹配指定正则的方法. 实际上可以使用 String.prototype.match 代替.基本使用为:

```js
regexObj.exec(str);
```

返回值为 array(匹配到) 和 null (没有匹配到) 如果返回 array 则:

- [1]…[n]: 正则分组匹配到的内容.
- index: 正则开始匹配到 string 的位置
- input: 原始的 string

具体的 demo:

```js
var re = /quick\s(brown).+?(jumps)/gi;
var result = re.exec("The Quick Brown Fox Jumps Over The Lazy Dog");

// 结果为
[
  "Quick Brown Fox Jumps",
  "Brown",
  "Jumps",
  (index: 4),
  (input: "The Quick Brown Fox Jumps Over The Lazy Dog"),
];
```

然后是基本的正则匹配:

### 基本正则

正则表达式很容易去源码里翻一翻就找到了.

```js
  regexobject: {
    headline: /^(\#{1,6})([^\#\n]+)$/m,
    code: /\s\`\`\`\n?([^`]+)\`\`\`/g,
    hr: /^(?:([\*\-_] ?)+)\1\1$/gm,
    lists: /^((\s*((\*|\-)|\d(\.|\))) [^\n]+)\n)+/gm,
    bolditalic: /(?:([\*_~]{1,3}))([^\*_~\n]+[^\*_~\s])\1/g,
    links: /!?\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g,
    reflinks: /\[([^\]]+)\]\[([^\]]+)\]/g,
    smlinks: /\@([a-z0-9]{3,})\@(t|gh|fb|gp|adn)/gi,
    mail: /<(([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,7}))>/gmi,
    tables: /\n(([^|\n]+ *\| *)+([^|\n]+\n))((:?\-+:?\|)+(:?\-+:?)*\n)((([^|\n]+ *\| *)+([^|\n]+)\n)+)/g,
    include: /[\[<]include (\S+) from (https?:\/\/[a-z0-9\.\-]+\.[a-z]{2,9}[a-z0-9\.\-\?\&\/]+)[\]>]/gi,
    url: /<([a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?)>/g
  }
```

本文参考的是一个教学用的 markdown 语法 parser.[github 源码](https://link.zhihu.com/?target=https%3A//github.com/SimonWaldherr/micromarkdown.js/blob/master/micromarkdown.js) 有兴趣,可以查看一下. 读起来非常简单.没有过多的逻辑处理. 所以,这里也是基于这个来进行讲解的.

### 简单匹配

最简单的匹配应该算 headline. 他的正则表达式为: /^(\#{1,6})([^\#\n]+)\$/m. 后面的 m 非常重要. 因为,所有的标题应该是写在首行的,如:

```js
# abc
## sub_abc
```

使用 m flag 来作为首行匹配标识符.完美~ 然后,只需要进行一个循环即可.

```js
var headling = /^(\#{1,6})([^\#\n]+)$/m;
while ((stra = headline.exec(str)) !== null) {
  count = stra[1].length;
  str = str
    .replace(stra[0], "<h" + count + ">" + stra[2].trim() + "</h" + count + ">")
    .trim();
}
```

当然,这里并不涉及到完全性的处理. 最简单的方式就是过滤字符串,不过过滤字符串也有很多方法. 最直接的就是 replace 直接替换.

```js
function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
```

这就算一个简单的替换. 另外,还有一种是使用 jsNode 内置的替换方案

```js
// 使用jsNode内置的替换引擎,将 < > $等字符替换. 但不会替换' 和 "
var escape = function(str) {
  "use strict";
  var div = document.createElement("div");
  div.appendChild(document.createjsNode(str));
  str = div.innerHTML;
  div = undefined;
  return str;
};
```

则上面的内容则可以写为:

```js
var headling = /^(\#{1,6})([^\#\n]+)$/m;
while ((stra = headline.exec(str)) !== null) {
  count = stra[1].length;
  str = str
    .replace(
      stra[0],
      "<h" + count + ">" + escape(stra[2].trim()) + "</h" + count + ">"
    )
    .trim();
}
```

实际上基于这点,我们就可以进行简单的发散. 比如 marked.js 根据正则提出了自定义化的匹配模式.

### marked.js feature

一些正则细节和匹配细节,我们这里就不过多探讨了, 因为处理的内容主要是\r\n ' ". 我们这里,简单的来看一下 marked.js 里面的一些精华部分. 特别是他提出来的可自定义化的正则样式. 即,Renderer 方法.

```js
// 官方提出的demo
var marked = require("marked");
var renderer = new marked.Renderer();

(renderer.heading = function(js, level) {
  var escapedjs = js.toLowerCase().replace(/[^\w]+/g, "-");

  return (
    "<h" +
    level +
    '><a name="' +
    escapedjs +
    '" class="anchor" href="#' +
    escapedjs +
    '"><span class="header-link"></span></a>' +
    js +
    "</h" +
    level +
    ">"
  );
}),
  console.log(marked("# heading+", { renderer: renderer }));
```

我们可以看一下他源码里面的思路: 首先,他有一个 Renderer 的构造函数:

```js
function Renderer(options) {
  this.options = options || {};
}
```

接着就是绑定在 prototype 上面的方法:

```js
Renderer.prototype.blockquote = function(quote) {
  return "<blockquote>\n" + quote + "</blockquote>\n";
};
```

可能有的童鞋会想,这里他并没有做什么语法解析呢？ 亲, 请注意他的参数 quote. 然后再看他的渲染内容,就一目了然. quote 是已经转义过后匹配的内容. 我们接着,来看一下调用方法:

```js
// url (gfm)
if (!this.inLink && (cap = this.rules.url.exec(src))) {
  src = src.substring(cap[0].length);
  js = escape(cap[1]);
  href = js;
  // out 这里是指全部输出的结果.
  out += this.renderer.link(href, null, js);
  continue;
}
```

有童鞋可能又会疑问了, 你正则不是全部匹配的吗？ 这样做不会遗漏信息吗？ 所以说, marked.js 为了实现自定义话的模式,牺牲了性能.我们看一下他的正则表达式即可:

```js
var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  js: /^[^\n]+/,
};
```

可以看出,他没有添加任何的 pattern… 这就是 marked.js 精妙的地方. 所以, 上面的 out 看起来,也并没有什么神奇的地方了:

```js
out += this.renderer.link(href, null, js);
```

因此, 通过将 renderer 对象中方法的 override. 造成自定义的效果. 这也是灰常好的. 另外,还有一点需要讲解一下,就是 marked.js 构造的注释替换的方法.

```js
function replace(regex, opt) {
  regex = regex.source;
  opt = opt || "";
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, "$1");
    regex = regex.replace(name, val);
    return self;
  };
}
// 看一下他的调用方法
// 相面的block.xxx 都是正则表达式,我这里就不赘述了
block.paragraph = replace(block.paragraph)("hr", block.hr)(
  "heading",
  block.heading
)("lheading", block.lheading)("blockquote", block.blockquote)(
  "tag",
  "<" + block._tag
)("def", block.def)();
// 实际上,这个方法运行的结果是生成一个新的正则表达式. 即,把上面用单词的地方替换为指定的正则
// 例如 paragraph 里面的hr, heading
paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/;
```

当然,也有其他的实现方式。 只是 marked.js 在这里做的比较完美.

### marked 实际解析顺序

前面提到了使用 out+=的方式进行解析. 当然,可能会想到下列问题: **段落嵌套语法怎么解析的呢？** 这实际上,他在嵌套的语法层里,并没有做 out+= 可以看下列源码:

```js
// code
if ((cap = this.rules.code.exec(src))) {
  src = src.substring(cap[0].length);
  cap = cap[0].replace(/^ {4}/gm, "");
  this.tokens.push({
    type: "code",
    js: !this.options.pedantic ? cap.replace(/\n+$/, "") : cap,
  });
  continue;
}
```

他在这里传了一个 tokens, 然后 传到外层这里再次进行的解析.

```js
Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
}
```

所以, marked.js 为了完成自定义化的解析真的是挖了一个很大的坑. 但相对于全局匹配在替换的模式来说, 这样灵活性大一点。

> flexibility + speed = const

ok, 现在我们已经简单的了解了大局方面的 marked.js 解析原理. 接下来,我们来看一下比较难的 code 解析。

### code 解析原理

如果只是表层的 code 解析,非常简单. 使用下面的正则表达式即可

```js
code: /\s?\`\`\`\n?([^`]+)\`\`\`/g;
```

但是,这样仅仅只是替换出下列格式.

```html
<pre>
    <code>
        ....
    </code>
<pre>
```

并没有像下面这样,带上颜色的匹配.

```js
var a = 1;
var b = 2;
```

简单的替换原理也很好解释.就是给指定的 span 添加上不同的 class 即可.

```js
// 替换:
```

‘s’

```js
// 生成span
<span class="str">'abc'</span>
```

它里面的解析机制,主要就是根据不同的语法正则来添加不同的 className. 具体,我们可以参照 highlight.js 里面的源码:

```js
  function highlightBlock(block) {
    var node, originalStream, result, resultNode, js;
    var language = blockLanguage(block);
    js = node.jsContent;
    ...
    result = language ? highlight(language, js, true) : highlightAuto(js);
    ...
  }
```

通过 blockLanguage 找出指定的 code 的编程语言. 查找细节有一个方法比较重要:

```js
function registerLanguage(name, language) {
  var lang = (languages[name] = language(hljs));
  if (lang.aliases) {
    lang.aliases.forEach(function(alias) {
      aliases[alias] = name;
    });
  }
}
```

该方法用来手动将 language 的配置文件挂载到里面。 我们看一看 js 的配置文件

```js
/*
Language: JavaScript
Category: common, scripting
*/

function(hljs) {
  return {
    aliases: ['js', 'jsx'],
    keywords: {
      keyword:
        'in of if for while finally var new function do return void else break catch ' +
        'instanceof with throw case default try this switch continue typeof delete ' +
        'let yield const export super debugger as async await static ' +
        // ECMAScript 6 modules import
        'import from as'
      ,
      literal:
        'true false null undefined NaN Infinity',
      built_in:
        'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
    ...
}
```

然后通过指定的正则来进行匹配和替换. 所以, 一般的 md parser 引擎解析并不会自带 code 解析, 因为是在太复杂了… 编程语言这么多… 这么搞的玩. 所以, highlight 自己自定义了一套 common 机制. 一方, 没有传入指定 language 的情况.

```js
hljs.COMMENT = function(begin, end, inherits) {
  var mode = hljs.inherit(
    {
      className: "comment",
      begin: begin,
      end: end,
      contains: [],
    },
    inherits || {}
  );
  mode.contains.push(hljs.PHRASAL_WORDS_MODE);
  mode.contains.push({
    className: "doctag",
    begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
    relevance: 0,
  });
  return mode;
};
hljs.C_LINE_COMMENT_MODE = hljs.COMMENT("//", "$");
hljs.C_BLOCK_COMMENT_MODE = hljs.COMMENT("/\\*", "\\*/");
hljs.HASH_COMMENT_MODE = hljs.COMMENT("#", "$");
hljs.NUMBER_MODE = {
  className: "number",
  begin: hljs.NUMBER_RE,
  relevance: 0,
};
hljs.C_NUMBER_MODE = {
  className: "number",
  begin: hljs.C_NUMBER_RE,
  relevance: 0,
};
hljs.BINARY_NUMBER_MODE = {
  className: "number",
  begin: hljs.BINARY_NUMBER_RE,
  relevance: 0,
};
hljs.CSS_NUMBER_MODE = {
  className: "number",
  begin:
    hljs.NUMBER_RE +
    "(" +
    "%|em|ex|ch|rem" +
    "|vw|vh|vmin|vmax" +
    "|cm|mm|in|pt|pc|px" +
    "|deg|grad|rad|turn" +
    "|s|ms" +
    "|Hz|kHz" +
    "|dpi|dpcm|dppx" +
    ")?",
  relevance: 0,
};
```

## markdown-it 原理浅析

最近使用 markdown-it 比较多，也开发了一些插件，在这个过程中对源码进行了研读，最终写了这篇文章。需要了解细节的读者可以自行阅读[文档](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%3A%2F%2Fmarkdown-it.docschina.org)。

此文分为两个部分：原理剖析和原理应用（编写插件）。

### markdown-it 原理

输入一串 markdown 代码，最后得到一串 html 代码，整体流程如下：

我们以一个简单的例子来解释整个流程：`# 我是一个例子` -> `<h1>我是一个例子</h1>`

首先，它会被解析器拿到，经过各个解析规则处理后得到一个 token 流，接着这个 token 流被渲染器拿到，经过各个渲染规则处理后逐步拼接成一个 html 字符串。

### 解析器

markdown-it 内置了七个核心规则，在上图我对解析规则使用了虚线，因为它们是可以被启用/禁用的。我们这篇文章只来聊聊最核心的两个规则：block 和 inline。

规范指出：

> 我们可以将一篇 Markdown 文档视为一系列块，[块](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%3A%2F%2Fgithub.github.com%2Fgfm%2F%23blocks)是一种结构化的元素，如段落，块引用，列表，标题，规则和代码块。一些块（如块引号和列表项）可以包含其他块; 其他（如标题和段落）包含[内联](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%3A%2F%2Fgithub.github.com%2Fgfm%2F%23inline)内容，如文本，链接，强调文本，图像，行内代码等。
> 块结构的解析优先级始终高于内联结构。这意味着解析可以分两步进行： 1.识别 markdown 文档的块结构; 2.将段落，标题和其他块结构中的文本行，作为内联结构解析。
> 注意，第一步需要按顺序处理行，但第二步可以并行化，因为一个块元素的内联解析不会影响任何其他块的内联解析。
> 块分为两种类型：[容器块](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%3A%2F%2Fgithub.github.com%2Fgfm%2F%23container-block)和[叶子块](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%3A%2F%2Fgithub.github.com%2Fgfm%2F%23leaf-block)，容器块可以包含其他块，但叶子块不能包含其他块。

具体解析时，会围绕着 line 和 character 两个维度来解析。

对于每一行来说，解释的结果有以下三种：

1. 用来关闭一个或多个块结构。
2. 用来创建一个或多个新块结构，作为最后打开的块结构的子节点。
3. 可以将文本添加到树上剩余的最后（最深的）打开的块结构上。

对于我们这个例子，会先创建一个 heading 块，然后将文本内容添加到这个块上。下一行没有内容，于是块关闭。

字符包括非空白字符和空格(U+0020)，制表符 (U+0009)，换行符(U+000A)，行列表（U+000B），换页（U+000C）或回车（U+000D）这些空白字符。这里我们不做展开。

这期间会接触到的规则有 block、inline、heading、js。

1. **block** 规则，会用来解析 `# 我是一个例子`

- 先进入 tokenize 函数，内含十一个 block 规则。
- heading 规则
- 得到 heading_open 、inline、 heading_close 三个 token

1. **inline** 规则，会用来解析 `我是一个例子`

- 先进入 parse 函数，内含四个 inline 规则
- js 规则
- 得到 js 的 token

解析完毕，我们得到了 3 + 1 个 token：

### token 流

这里我们得到的结果不是一颗 AST 树，而是一个数组，markdown-it 称之为 token 流。为什么呢？

官方解释是：

- Tokens 是一个简单的数组。（AST 是一个对象）
- 打开的标签和关闭的标签可以隔离。
- 将“内联容器(inline container)”作为一种特殊的 block token 对象。它有嵌套的 tokens，如粗体，斜体，文本等等。

这样做有什么好处呢？这样就可以并行处理 block 和 inline 类型的 token 了。

生成 token 流后，它们就被会传递给 [renderer](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%3A%2F%2Fgithub.com%2Fmarkdown-it%2Fmarkdown-it%2Fblob%2Fmaster%2Flib%2Frenderer.js)。

### 渲染器

它会遍历所有 token，将每个 token 传递给与 token 的 type 属性同名的规则。markdown-it 内置了九种规则：围栏、行内代码、代码块、html 块、行内 html、图片、硬换行、软换行、文本。

type 属性不在内置规则的 token 将会被被传入 [renderToken](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%3A%2F%2Fgithub.com%2Fmarkdown-it%2Fmarkdown-it%2Fblob%2F1ad3aec2041cd2defa7e299543cc1e42184b680d%2Flib%2Frenderer.js%23L193) 中当一个普通 token 处理，这里不作展开。

回到我们的例子中来：

heading_open 会被渲染成 <h1>

inline 中的 js 会被渲染成 我是一个例子

heading_close 会被渲染成 </h1>

### markdown-it 插件

一些 markdown-it 插件就利用了上述的原理。

### markdown-it-container

这个插件可以让你支持内容块：比如 vuepress 的内容块：

这是如何实现的呢？我们可以根据之前的介绍推测一个内容块的 token 流：

第一行和第三行有 block 型的 token，一个代表 open，一个代表 close。第二行是 inline 型的 token，其中的内容是 inline 型的。

> 由于内容块中是 inline 类型，所以围栏、行内代码、代码块、html 块、行内 html、图片、硬换行、软换行、文本都是支持的。

实际上，我们会逐行扫描，找到匹配 ::: tip 这样的内容块语法，将它作为一个块结构开始进行解析，直到有 ::: 的行结束。其中的每一行，都将解析为 paragraph_open、inline、paragraph_close。

解析后的 token 流最后分别渲染 <div> 、若干 p 标签、 </div>。

### markdown-it-anchor

这个插件可以对标题进行锚点抽取，以便阅读文档时能快速定位位置。

这里也可以推测一下，是不是往原本是 heading_open type 的 token 之前插入了一个 token 呢？这个 token 渲染出来就是锚点。

实际上，的确是插入了 token，但不止一个，因为锚点是可点击的，所以实际上是一个 a 链接，也就是 link_open、inline、link_close 三个 token。而且也不是插入在 heading_open 之前，而是 heading_open 和 heading_close 之间的 inline 子元素里了，因为 # 是和 Markdown 语法平级的。

> 注意事项： 1.因为标题可能是@#\$等特殊字符，会造成 url 哈希无效，所以需要对锚点的哈希值转义。 2.可能会出现重名的标题，所以需要对哈希进行标记

### 给链接添加属性

官方有一个写插件的例子：添加 target="\_blank" 属性到所有链接。

有两种方式：

1. 修改渲染器规则

```php
// 如果覆盖，或者是对默认渲染器的代理，则记住老的渲染器。
var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // 如果你确认其他的插件不能添加 `target` - 放弃以下检查：
  var aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // 添加新属性
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // 替换已经存在的属性值
  }

  // 传递 token 到默认的渲染器。
  return defaultRender(tokens, idx, options, env, self);
};
```

1. 修改 token

```php
var iterator = require('markdown-it-for-inline');

var md = require('markdown-it')()
            .use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
              var aIndex = tokens[idx].attrIndex('target');

              if (aIndex < 0) {
                tokens[idx].attrPush(['target', '_blank']);
              } else {
                tokens[idx].attrs[aIndex][1] = '_blank';
              }
            });
```

### 结语

markdown-it 作为一款经典的 js 解析 markdown 的库，其中思想和设计都可以细细揣摩，回味久久。
