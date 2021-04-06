# HTML 元素参考



此页面列出了所有使用[标签](https://developer.mozilla.org/en-US/docs/Glossary/Tag)创建的 [HTML](https://developer.mozilla.org/en-US/docs/Glossary/HTML) [元素](https://developer.mozilla.org/en-US/docs/Glossary/Element)。它们已被按照功能进行分组，以便您更轻松地找到想要的内容。同时，侧边栏中也按照字母排序列出了所有元素。

若想获知更多关于HTML元素、属性的基本信息，请查阅 [HTML 介绍](https://developer.mozilla.org/zh-CN/docs/learn/HTML/Introduction_to_HTML)中的相关内容。

## 1 [主根元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#主根元素)



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`html`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/html) | **HTML `html` 元素** 表示一个HTML文档的根（顶级元素），所以它也被称为*根元素*。所有其他元素必须是此元素的后代。 |



## [文档元数据](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#文档元数据)

元数据（Metadata）含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（例如 [搜索引擎](https://developer.mozilla.org/en-US/docs/Glossary/Search_engine)、[浏览器](https://developer.mozilla.org/en-US/docs/Glossary/Browser) 等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`base`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/base) | **HTML base 元素** 指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个 base 元素。 |
| [`head`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head) | **HTML head 元素** 规定文档相关的配置信息（元数据），包括文档的标题，引用的文档样式和脚本等。 |
| [`link`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link) | **HTML外部资源链接元素** (**`link`**) 规定了当前文档与外部资源的关系。该元素最常用于链接[样式表](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS)，此外也可以被用来创建站点图标(比如PC端的“favicon”图标和移动设备上用以显示在主屏幕的图标) 。 |
| [`meta`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) | **HTML `meta` 元素**表示那些不能由其它 HTML 元相关（meta-related）元素（(`base`、`link`, `script`、`style` 或 `title`）之一表示的任何Metadata信息。 |
| [`style`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style) | **HTML的style元素**包含文档的样式信息或者文档的部分内容。默认情况下，该标签的样式信息通常是[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)的格式。 |
| [`title`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/title) | **HTML `title` 元素** 定义文档的标题，显示在Browser的标题栏或标签页上。它只应该包含文本，若是包含有标签，则它包含的任何标签都将被忽略。 |



## [分区根元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#分区根元素)



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`body`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) | **HTML `body` 元素**表示文档的内容。`document.body` 属性提供了可以轻松访问文档的 body 元素的脚本。 |



## [内容分区](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#内容分区)

内容分区元素允许你将文档内容从逻辑上进行组织划分。使用包括页眉(header)、页脚(footer)、导航(nav)和标题(h1~h6)等分区元素，来为页面内容创建明确的大纲，以便区分各个章节的内容。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`address`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/address) | **HTML `address` 元素** 表示其中的 HTML 提供了某个人或某个组织（等等）的联系信息。 |
| [`article`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article) | **HTML `article`**元素表示文档、页面、应用或网站中的独立结构，其意在成为可独立分配的或可复用的结构，如在发布中，它可能是论坛帖子、杂志或新闻文章、博客、用户提交的评论、交互式组件，或者其他独立的内容项目。 |
| [`aside`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside) | **HTML `aside` 元素**表示一个和其余页面内容几乎无关的部分，被认为是独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响。 |
| [`footer`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/footer) | **HTML footer 元素**表示最近一个[章节内容](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#defining_sections_in_html5)或者[根节点](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#sectioning_root)（sectioning root ）元素的页脚。一个页脚通常包含该章节作者、版权数据或者与文档相关的链接等信息。 |
| [`header`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header) | **HTML `header` 元素**用于展示介绍性内容，通常包含一组介绍性的或是辅助导航的实用元素。它可能包含一些标题元素，但也可能包含其他元素，比如 Logo、搜索框、作者名称，等等。 |
| [(en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) | **HTML `h1`–`h6` 标题(Heading)元素**呈现了六个不同的级别的标题，`h1` 级别最高，而 `h6` 级别最低。 |
| [`main`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main) | HTML `main` 元素呈现了文档的 `body` 或应用的主体部分。主体部分由与文档直接相关，或者扩展于文档的中心主题、应用的主要功能部分的内容组成。 |
| [`nav`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav) | **HTML `nav`元素**表示页面的一部分，其目的是在当前文档或其他文档中提供导航链接。导航部分的常见示例是菜单，目录和索引。 |
| [`section`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section) | **HTML section元素**表示一个包含在HTML文档中的独立部分，它没有更具体的语义元素来表示，一般来说会有包含一个标题。 |



## [文本内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#文本内容)

使用 HTML 文本内容元素来组织在开标签 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 和闭标签 `/body` 里的块或章节的内容。这些元素能标识内容的宗旨或结构，而这对于 [accessibility](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility) 和 [SEO](https://developer.mozilla.org/en-US/docs/Glossary/SEO) 很重要。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote) | **HTML `blockquote` 元素**（或者 HTML 块级引用元素），代表其中的文字是引用内容。通常在渲染时，这部分的内容会有一定的缩进（[注](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote#notes) 中说明了如何更改）。若引文来源于网络，则可以将原内容的出处 URL 地址设置到 cite 特性上，若要以文本的形式告知读者引文的出处时，可以通过 `cite` 元素。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dd) | **HTML `dd` 元素**（*HTML 描述元素*）用来指明一个描述列表 (`dl`) 元素中一个术语的描述。这个元素只能作为描述列表元素的子元素出现，并且必须跟着一个 `dt` 元素。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div) | **[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) `div` 元素** (或 *HTML 文档分区元素*) 是一个通用型的流内容容器，在不使用CSS的情况下，其对内容或布局没有任何影响。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dl) | **HTML `dl` 元素** （或 *HTML* *描述列表元素*）是一个包含术语定义以及描述的列表，通常用于展示词汇表或者元数据 (键-值对列表)。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dt) | **HTML `dt` 元素** （或 *HTML 术语定义元素*）用于在一个定义列表中声明一个术语。该元素仅能作为 `dl` 的子元素出现。通常在该元素后面会跟着 `dd` 元素， 然而，多个连续出现的 `dt` 元素都将由出现在它们后面的第一个 `dd` 元素定义。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figcaption) | **HTML `figcaption` 元素** 是与其相关联的图片的说明/标题，用?于描述其父节点 `figure` 元素里的其他数据。这意味着 `figcaption` 在`figure` 块里是第一个或最后一个。同时 HTML Figcaption 元素是可选的；如果没有该元素，这个父节点的图片只是会没有说明/标题。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure) | **HTML `figure` 元素**代表一段独立的内容, 经常与说明（caption） `figcaption` 配合使用, 并且作为一个独立的引用单元。当它属于主内容流（main flow）时，它的位置独立于主体。这个标签经常是在主文中引用的图片，插图，表格，代码段等等，当这部分转移到附录中或者其他页面时不会影响到主体。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/hr) | **HTML `hr` 元素**表示段落级元素之间的主题转换（例如，一个故事中的场景的改变，或一个章节的主题的改变）。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/li) | **HTML `li` 元素** （或称 *HTML 列表条目元素）* 用于表示列表里的条目。它必须包含在一个父元素里：一个有序列表(`ol`)，一个无序列表(`ul`)，或者一个菜单 (`menu`)。在菜单或者无序列表里，列表条目通常用点排列显示；在有序列表里，列表条目通常在左边显示按升序排列的计数，例如数字或者字母。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ol) | **HTML `ol` 元素**表示有序列表，通常渲染为一个带编号的列表。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) | **HTML p**元素（或者说 HTML 段落元素）表示文本的一个段落。该元素通常表现为一整块与相邻文本分离的文本，或以垂直的空白隔离或以首行缩进。另外，p 是[块级元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/pre) | **HTML pre** 元素表示预定义格式文本。在该元素中的文本通常按照原文件中的编排，以等宽字体的形式展现出来，文本中的空白符（比如空格和换行符）都会显示出来。(紧跟在 pre 开始标签后的换行符也会被省略) |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ul) | **HTML `ul` 元素**（或称 HTML 无序列表元素）表示一个内可含多个元素的无序列表或项目符号列表。 |



## [内联文本语义](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#内联文本语义)

使用 HTML 内联文本语义（Inline text semantics）定义一个单词、一行内容，或任意文字的语义、结构或样式。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) | **HTML `a` 元素**（或称锚元素）可以创建通向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 的超链接。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/abbr) | **HTML 缩写元素**（**`abbr`**）用于代表缩写，并且可以通过可选的 `title` 属性提供完整的描述。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/b) | **HTML提醒注意（Bring Attention To）元素（`b`）**用于吸引读者的注意到该元素的内容上（如果没有另加特别强调）。这个元素过去被认为是**粗体（Boldface）元素**，并且大多数浏览器仍然将文字显示为粗体。尽管如此，你不应将 `b` 元素用于显示粗体文字；替代方案是使用 CSS `font-weight` 属性来创建粗体文字。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/bdi) | **HTML** 双向隔离元素( **`bdi`** ) 告诉浏览器的双向算法将其包含的文本与周围的文本隔离，当网站动态插入一些文本且不知道所插入文本的方向性时，此功能特别有用。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/bdo) | HTML 双向文本替代元素(**`bdo`**)改写了文本的方向性,        |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br) | **HTML br 元素**在文本中生成一个换行（回车）符号。此元素在写诗和地址时很有用，这些地方的换行都非常重要。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/cite) | *HTML引用（ Citation）标签* (**cite**) 表示一个作品的引用，且必须包含作品的标题。这个引用可能是一个根据适当的上下文约定关联引用的元数据的缩写。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/code) | **HTML `code` 元素**呈现一段计算机代码. 默认情况下, 它以浏览器的默认等宽字体显示. |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/data) | **HTML `data` 元素**将一个指定内容和机器可读的翻译联系在一起。但是，如果内容是与时间或者日期相关的，则一定要使用 `time`。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dfn) | *HTML 定义元素* (**dfn**) 表示术语的一个定义。             |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/em) | **HTML 着重元素** (`**em**`) 标记出需要用户着重阅读的内容， `em` 元素是可以嵌套的，嵌套层次越深，则其包含的内容被认定为越需要着重阅读。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/i) | **HTML元素 `i`** 用于表现因某些原因需要区分普通文本的一系列文本。例如技术术语、外文短语或是小说中人物的思想活动等，它的内容通常以斜体显示。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/kbd) | HTML键盘输入元素(**kbd**) 用于表示用户输入，它将产生一个行内元素，以浏览器的默认monospace字体显示。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/mark) | HTML标记文本元素( Mark )表示为引用或符号目的而标记或突出显示的文本，这是由于标记的段落在封闭上下文中的相关性或重要性造成的。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/q) | *HTML引用标签* (**q**)表示一个封闭的并且是短的行内引用的文本. 这个标签是用来引用短的文本，所以请不要引入换行符; 对于长的文本的引用请使用 `blockquote` 替代. |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/rb) | **HTML Ruby Base**（`rb`）元素用于分隔`ruby`注释的基本文本组件（即正在注释的文本）。一个`rb`元素应该包装基本文本的每个单独的原子段。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/rp) | **HTML `rp` 元素**用于为那些不能使用 `ruby` 元素展示 ruby 注解的浏览器，提供随后的圆括号。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/rt) | **HTML Ruby 文本 (`rt`) 元素**包含字符的发音，字符在 ruby 注解中出现，它用于描述东亚字符的发音。这个元素始终在 `ruby` 元素中使用。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/rtc) | **HTML `rtc` 元素**包含文字的语义注解，它们在 `rb` 元素中展示。`rb` 元素可以拥有发音 (`rt`) 和语义(`rtc`) 注解。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ruby) | **HTML `ruby` 元素** 被用来展示东亚文字注音或字符注释。    |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/s) | **HTML `s` 元素** 使用删除线来渲染文本。使用 `s` 元素来表示不再相关，或者不再准确的事情。但是当表示文档编辑时，不提倡使用 `s` ；为此，提倡使用 `del` 和 `ins` 元素。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/samp) | samp 元素用于标识计算机程序输出，通常使用浏览器缺省的 monotype 字体（例如 Lucida Console）。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/small) | HTML 中的small元素將使文本的字体变小一号。(例如从大变成中等，从中等变成小，从小变成超小)。在HTML5中，除了它的样式含义，这个元素被重新定义为表示边注释和附属细则，包括版权和法律文本。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span) | **HTML `span`** 元素是短语内容的通用行内容器，并没有任何特殊语义。可以使用它来编组元素以达到某种样式意图（通过使用类或者Id属性），或者这些元素有着共同的属性，比如**lang**。应该在没有其他合适的语义元素时才使用它。`span` 与 `div` 元素很相似，但 `div` 是一个 [块元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements) 而 `span` 则是 [行内元素 ](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements). |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/strong) | Strong 元素 (`strong`)表示文本十分重要，一般用粗体显示。   |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/sub) | **HTML `sub` 元素**定义了一个文本区域，出于排版的原因，与主要的文本相比，应该展示得更低并且更小。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/sup) | **HTML `sup` 元素**定义了一个文本区域，出于排版的原因，与主要的文本相比，应该展示得更高并且更小。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time) | HTML *time* 标签(`time`) 用来表示24小时制时间或者[公历日期](http://en.wikipedia.org/wiki/Gregorian_calendar)，若表示日期则也可包含时间和时区。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/u) | **HTML `u` 元素（表意不清标注元素）**表示一个需要标注为非文本化（non-textual）的内联文本域。默认情况下渲染为一个实线下划线，可以用CSS替换。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/var) | **var 标签**表示变量的名称，或者由用户提供的值。           |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/wbr) | **HTML `wbr` 元素**  — 一个文本中的位置，其中浏览器可以选择来换行，虽然它的换行规则可能不会在这里换行。 |



## [图片和多媒体](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#图片和多媒体)

HTML 支持各种多媒体资源，例如图像、音频和视频。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/area) | *HTML `area` 元素 在图片上定义一个热点区域，可以关联一个超链接。area元素仅在map元素内部使用。* |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) | **HTML `audio`** 元素用于在文档中嵌入音频内容。 `audio` 元素可以包含一个或多个音频资源， 这些音频资源可以使用 `src` 属性或者`source` 元素来进行描述：浏览器将会选择最合适的一个来使用。也可以使用 `MediaStream` 将这个元素用于流式媒体。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) | **HTML `img` 元素**将一份图像嵌入文档。                    |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/map) | **HTML `map` 属性** 与 `area` 属性一起使用来定义一个图像映射(一个可点击的链接区域). |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/track) | **HTML `track` 元素** 被当作媒体元素—`audio` 和 `video`的子元素来使用。它允许指定时序文本字幕（或者基于时间的数据），例如自动处理字幕。字幕格式有 [WebVTT 格式](https://developer.mozilla.org/en-US/docs/Web/API/Web_Video_Text_Tracks_Format)（`.vtt`格式文件）— Web 视频文本字幕格式，以及指[时序文本标记语言（TTML）](https://w3c.github.io/ttml2/index.html)格式。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) | **HTML `video` 元素** 用于在HTML或者XHTML文档中嵌入媒体播放器，用于支持文档内的视频播放。 |



## [内嵌内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#内嵌内容)

除了常规的多媒体内容，HTML 可以包括各种其他的内容，即使它并不容易交互。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed) | **HTML `embed` 元素**将外部内容嵌入文档中的指定位置。此内容由外部应用程序或其他交互式内容源（如浏览器插件）提供。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) | browsing context                                             |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object) | **HTML `object` 元素**（或者称作 *HTML 嵌入对象元素*）表示引入一个外部资源，这个资源可能是一张图片，一个嵌入的浏览上下文，亦或是一个插件所使用的资源。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/param) | **HTML `param元素`**为`object`元素定义参数                 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture) | **HTML `picture` 元素**通过包含零或多个 `source` 元素和一个 `img` 元素来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子 `source` 元素，如果没有匹配的，就选择 `img` 元素的 `src` 属性中的URL。然后，所选图像呈现在img元素占据的空间中。 |
| [ (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/portal) |                                                              |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source) | **HTML `source`** 元素为 `picture`, `audio` 或者 `video` 元素指定多个媒体资源。这是一个空元素。它通常用于以[不同浏览器支持的多种格式](https://developer.mozilla.org/zh-CN/docs/conflicting/Web/Media/Formats)提供相同的媒体内容。 |



## [脚本](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#脚本)

为了创建动态内容和 Web 应用程序，HTML 支持使用脚本语言，最突出的就是 JavaScript。某些元素用于支持此功能。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) | `canvas`元素可被用来通过JavaScript（[Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) API 或 [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) API）绘制图形及图形动画。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/noscript) | 如果页面上的脚本类型不受支持或者当前在浏览器中关闭了脚本，则在 **HTML noscript 元素**中定义脚本未被执行时的替代内容。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script) | 该元素包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)。 |



## [编辑标识](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#编辑标识)

这些元素能标示出某个文本被更改过的部分。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/del) | HTML的**`del`**标签表示一些被从文档中删除的文字内容。比如可以在需要显示修改记录或者源代码差异的情况使用这个标签。`ins`标签的作用恰恰于此相反：表示文档中添加的内容。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ins) | **HTML `ins` 元素**定义已经被插入文档中的文本。            |



## [表格内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#表格内容)

这里的元素用于创建和处理表格数据。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| `](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/caption) | **HTML `caption` 元素** (or *HTML 表格标题元素*) 展示一个表格的标题， 它常常作为 `table` 的第一个子元素出现，同时显示在表格内容的最前面，但是，它同样可以被CSS样式化，所以，它同样可以出现在任何一个一个相对于表格的做任意位置。 |
|                                                              | **HTML `col` 元素** 定义表格中的列，并用于定义所有公共单元格上的公共语义。它通常位于`colgroup`元素内。 |
|                                                              | HTML 中的 表格列组（*Column Group* **colgroup**） 标签用来定义表中的一组列表。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table) | **HTML**的 **`table`** 元素表示表格数据 — 即通过二维数据表表示的信息。 |
|                                                              |                                                              |
| `](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/td) | **HTML `td` 元素** 定义了一个包含数据的表格单元格。It participates in the *table model*. |
|                                                              | **HTML 元素`tfoot`** 定义了一组表格中各列的汇总行。        |
| `](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/th) | **HTML `th` 元素**                                         |
|                                                              | **HTML**的**thead**元素定义了一组定义表格的列头的行。      |
|                                                              | **HTML `tr` 元素**定义表格中的行。 同一行可同时出现`td` 和`th` 元素. |



## [表单](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#表单)

HTML 提供了许多可一起使用的元素，这些元素能用来创建一个用户可以填写并提交到网站或应用程序的表单。详情请参阅 [HTML 表单指南](https://developer.mozilla.org/zh-CN/docs/Learn/Forms)。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button) | **HTML `button` 元素**表示一个可点击的按钮，可以用在[表单](https://developer.mozilla.org/en-US/docs/Learn/Forms)或文档其它需要使用简单标准按钮的地方。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/datalist) | ***HTML\* `datalist`\*元素\***包含了一组`option`元素，这些元素表示其它表单控件可选值. |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/fieldset) | 这个元素包含[所有全局属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form) | **HTML `form` 元素**表示文档中的一个区域，此区域包含交互控件，用于向 Web 服务器提交信息。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input) | **HTML `input` 元素**用于为基于Web的表单创建交互式控件，以便接受来自用户的数据; 可以使用各种类型的输入数据和控件小部件，具体取决于设备和user agent。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label) | **HTML `label` 元素（标签）**表示用户界面中某个元素的说明。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/legend) | **HTML legend** 元素用于表示其父元素 `fieldset` 的内容标题。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meter) | **HTML `meter元素用来显示已知范围的标量值或者分数值。`**   |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/optgroup) | **HTML元素 `optgroup`** 为`select` 元素中的选项创建分组。  |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/option) | **HTML元素 `option`** 用于定义在 `select`, `optgroup` 或 `datalist` 元素中包含的项。`option` 可以在弹出窗口和 HTML 文档中的其他项目列表中表示菜单项。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/output) | **HTML `output` 标签**表示计算或用户操作的结果。           |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/progress) | **HTML**中的**`progress`**元素用来显示一项任务的完成进度.虽然规范中没有规定该元素具体如何显示,浏览器开发商可以自己决定,但通常情况下,该元素都显示为一个进度条形式. |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select) | **HTML `select` 元素**表示一个提供选项菜单的控件：         |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea) | **HTML `textarea` 元素**表示一个多行纯文本编辑控件，当你希望用户输入一段相当长的、不限格式的文本，例如评论或反馈表单中的一段意见时，这很有用。 |



## [交互元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#交互元素)

HTML 提供了一系列有助于创建交互式用户界面对象的元素。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/details) | **HTML `details`元素**可创建一个挂件，仅在被切换成展开状态时，它才会显示内含的信息。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dialog) | **HTML `dialog` 元素**表示一个对话框或其他交互式组件，例如一个检查器或者窗口。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/menu) | **HTML `menu` 元素**呈现了一组用户可执行或激活的命令。这既包含了可能出现在屏幕顶端的列表菜单，也包含了那些隐藏在按钮之下、当点击按钮后显示出来的文本菜单。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/summary) | **HTML `summary `元素** 用作 一个`details`元素的一个内容的摘要，标题或图例。 |



## [Web 组件](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#web_组件)

Web 组件是一种与 HTML 相关联（HTML-related）的技术，简单来说，它允许开发者创建自定义元素，并如同普通的 HTML 一样使用它们。另外，也可以创建经过自定义的标准 HTML 元素。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/content) | **HTML `content` 元素**— [Web 组件](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 的技术套件的废弃部分 — 用于 [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) 内部作为 insertion point，并且不可用于任何正常的 HTML，现在已被 `slot` 元素代替，它在 DOM 中创建一个位置，Shadow DOM 会插入这里。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Shadow) | **HTML `shadow` 元素** — [Web 组件](https://developer.mozilla.org/en-US/docs/Web/Web_Components)技术套件的废弃部分 — 目的是用作 Shadow DOM insertion point。如果你在 shadow host 下面创建了多个 shadow root，你就可能已经使用了它。在正常的 HTML 没有任何用处。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot) | **HTML `slot `元素 ，**作为 [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 技术套件的一部分，是 |
| [`                                                           | **HTML内容模板（`template`）元素**是一种用于保存客户端内容机制，该内容在加载页面时不会呈现，但随后可以(原文为 may be)在运行时使用JavaScript实例化。 |



## [过时的和弃用的元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#过时的和弃用的元素)

**警告：**下面这些旧的 HTML 元素已被弃用，且不应再被使用。**千万不要在新的项目中使用它们，并且要尽快替换旧项目中的残余。**在此列出，仅供参考。



| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/acronym) | HTML Acronym 元素 (`acronym)` 允许作者明确地声明一个字符序列,，它们构成一个单词的首字母缩写或简略语。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/applet) | HTML中的Applet元素(`applet`) 标志着包含了Java的applet。    |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/basefont) | HTML标签basefont用来设置文档的默认字体大小。使用`font`可以相对于默认字体大小进行变化。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/bgsound) | bgsound是IE浏览器中设置网页背景音乐的元素。                |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/big) | The HTML Big Element (`big`) 会使字体加大一号（例如从小号(small)到中号(medium)，从大号(large)到加大(x-large)），最大不超过浏览器的最大字体。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blink) | HTML Blink Element (`blink`)不是标准元素，它会使包含其中的文本闪烁。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/center) | HTML Center 元素 (`center`) 是个 [块级元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)，可以包含段落，以及其它块级和内联元素。这个元素的整个内容在它的上级元素中水平居中(通常是 `body`)。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/content) | **HTML `content` 元素**— [Web 组件](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 的技术套件的废弃部分 — 用于 [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) 内部作为 insertion point，并且不可用于任何正常的 HTML，现在已被 `slot` 元素代替，它在 DOM 中创建一个位置，Shadow DOM 会插入这里。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dir) | 已废弃的 **HTML 目录元素**（**`dir`**）被作为一个文件和/或文件夹的目录的容器，可能还有 user agent 应用的样式与图标。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/font) | *HTML Font 元素*（`font`）定义了该内容的字体大小、顏色与表现。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/frame) | `frame` 是 HTML 元素，它定义了一个特定区域，另一个 HTML 文档可以在里面展示。帧应该在 `frameset` 中使用。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/frameset) | `frameset` 是一个用于包含 `frame` 的 HTML 元素。           |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/hgroup) | 这个元素仅包含全局属性。                                     |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/image) | HTML `image元素曾经是一个试验性的元素，用来显示图片。它从未被实现过，请使用标准的``img`元素。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/isindex) | `**isindex元素**的作用是`使浏览器显示一个对话框，提示用户输入单行文本。在W3C的规范中建议，`isindex元素最好被放置在` `head` 标签块内，但是对于浏览器来说，isindex标签在页面任何位置都没有关系。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/keygen) | HTML `keygen` 元素是为了方便生成密钥材料和提交作为 [HTML form](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms) 的一部分的公钥.这种机制被用于设计基于 Web 的证书管理系统。按照预想，`keygen` 元素将用于 HTML 表单与其他的所需信息一起构造一个证书请求，该处理的结果将是一个带有签名的证书。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/listing) | *HTML 列表元素* (`listing`) 渲染了开始和结束标签之间的文本，而不会解释 HTML，并使用等宽字体。HTML2 标准建议，当一行不超过 132 个字符时，不应该将其拆开。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/marquee) | HTML marquee 元素（`marquee）` 用来插入一段滚动的文字。你可以使用它的属性控制当文本到达容器边缘发生的事情。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/menuitem) | 用户可以通过**HTML `menuitem` 元素**生成一个弹出式菜单。这包括上下文菜单，以及按钮可能附带的菜单。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/multicol) | HTMLmulticol 元素是一个实验元素，旨在允许多列布局。它从来没有任何显着的牵引力，并没有在任何主流浏览器中实现。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nextid) | **`nextid`** 是一个过时的HTML元素，用于使NeXT网页设计工具为其锚点生成自动的NAME标签。 它是由该Web编辑工具自动生成的，不需要手动调整或输入。 通过从HTML版本的官方公共DTD中删除，此元素的区别在于它是第一个成为“丢失标签”之一的元素。 它也可能是所有早期HTML元素中最少被了解的之一。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nobr) | HTML `nobr` 元素阻止文本自动拆分成新行，所以它展示为长的一行，可能还需要滚动。这个标签不是标准的 HTML，并且不应该使用。反之应该使用 CSS 属性 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/noembed) | `**noembed**` 元素是个废除的和不标准的方式，用于向不支持 `embed` ，或者不支持作者希望的 [嵌入式内容](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#embedded_content) 的浏览器提供替代（或者“后备”）内容。这个元素在 HTML 4.01 起废除，以支持 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/noframes) | `noframes` 是个 HTML 元素，用于支持不支持  `frame` 元素的浏览器，或者这样配置的浏览器。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/plaintext) | *HTML 纯文本元素* (`plaintext`) 将起始标签后面的任何东西渲染为纯文本，不会解释为 HTML。它没有闭合标签，因为任何后面的东西都会看做纯文本。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/rb) | **HTML Ruby Base**（`rb`）元素用于分隔`ruby`注释的基本文本组件（即正在注释的文本）。一个`rb`元素应该包装基本文本的每个单独的原子段。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/rtc) | **HTML `rtc` 元素**包含文字的语义注解，它们在 `rb` 元素中展示。`rb` 元素可以拥有发音 (`rt`) 和语义(`rtc`) 注解。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Shadow) | **HTML `shadow` 元素** — [Web 组件](https://developer.mozilla.org/en-US/docs/Web/Web_Components)技术套件的废弃部分 — 目的是用作 Shadow DOM insertion point。如果你在 shadow host 下面创建了多个 shadow root，你就可能已经使用了它。在正常的 HTML 没有任何用处。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/spacer) | **`spacer`** 是过时的 HTML 元素，它可以向页面插入间隔。它由 Netscape 设计，用于实现单像素布局图像的相同效果，Web 设计师用它来向页面添加空白，而不需要实际使用图片。 但是，`spacer` 不再受任何主流浏览器支持，并且相同效果可以简单由 CSS 实现。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/strike) | **HTML `strike` 元素**（或者 HTML 删除线元素）在文本上放置删除线。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/tt) | HTML 电报文本元素 (`tt`) 产生一个内联元素，使用浏览器内置的 monotype 字体展示。这个元素用于给文本排版，使其等宽展示，就像电报那样。使用 `code` 元素来展示等宽文本可能更加普遍。 |
| [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/xmp) | `xmp` 标签之间的内容不会被当作文档内容解析，而会被用等宽字体直接呈现。HTML2 规范建议，本标签中的内容应该具有足够容纳每行80个字母的宽度。 |



#### Found a problem with this page?

- [Source on **GitHub**](https://github.com/mdn/translated-content/blob/main/files/zh-cn/web/html/element/index.html)
- [Report a problem with this content on **GitHub**](https://github.com/mdn/content/issues/new?body=MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTML%2FElement %23%23%23%23+What+information+was+incorrect%2C+unhelpful%2C+or+incomplete%3F  %23%23%23%23+Specific+section+or+headline%3F  %23%23%23%23+What+did+you+expect+to+see%3F  %23%23%23%23+Did+you+test+this%3F+If+so%2C+how%3F   MDN+Content+page+report+details%2Fsummary *+Folder%3A+`zh-cn%2Fweb%2Fhtml%2Felement` *+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTML%2FElement *+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Ftranslated-content%2Fblob%2Fmain%2Ffiles%2Fzh-cn%2Fweb%2Fhtml%2Felement%2Findex.html *+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Ftranslated-content%2Fcommit%2F36857008af2d8170b101a8d95cb04b21ca2dc411 *+Document+last+modified%3A+2021-04-02T19%3A31%3A37.000Z %2Fdetails&title=Issue+with+"HTML+元素参考"%3A+(short+summary+here+please)&labels=Content%3AHTML%2Cneeds-triage)
- Want to fix the problem yourself? See [our Contribution guide](https://github.com/mdn/content/blob/main/README.md).

**Last modified:** 2021年4月3日, [by MDN contributors](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/contributors.txt)