# HTML5新增内容

[概要学习H5](https://www.w3school.com.cn/html/html5_new_elements.asp)

`  前言

- 新的语义元素，比如 `header`, `footer`, `article`, and `section`。

- 新的表单控件，比如数字、日期、时间、日历和滑块。

- 强大的图像支持（借由 `canvas` 和 `svg`）

- 强大的多媒体支持（借由 `video` 和 `audio`）

- 强大的新 API，比如用本地存储取代 cookie。

`  html4.01的元素已从html5废除

`acronym`,`applet`,`basefont`,`big`,`center`,`dir`,`font`,`frame`,`frameset`,`noframes`,`strike`,`tt`

### H5新增的标签

`template`,`section`,`nav`,`article`,`aside`,`header`,`footer`,`main`,

`canvas`,`svg`,`video`,`audio`,`source`,`track`,`menu`,

`datalist`,`embed`

### H5的更新加强了浏览器的功能，减少了插件的使用（Flash）。

```html
video 表示一段视频并提供播放的用户界面
audio 表示音频
canvas 表示位图区域

svg 定义矢量图

time 日期和时间值
mark 高亮的引用文字
```

> 语义化标签

```html
<header>头部</header>
<footer>尾部</footer>
<nav>导航栏</nav>
<section>具体的内容</section>
<article>文章</article>
<aside>内容的侧边栏</aside>

<figure> 
  <img src="" alt="">用作文档中插图的图像，如果要添加标题的话得使用
</figure>
<figcaption>
  并且要必须要放在标签里面
</figcaption>
<figure> 
  <img src="" alt="">
	<figcaption>这是一张图片</figcaption>
</figure>

<mark>mark标签:高亮的引用文字</mark> 

<progress value="0.5">进度栏标签 value值代表进度，0-1</progress>
```



### 块级标签

1.独占一行，不和其他元素待在同一行，宽度自动填满父元素宽度。

2.可设置宽高（width,height）、内外边距属性（margin,padding）。

有div，p，h1-h6，ul，li，dl（定义列表，跟ul…li类似），dt（定义了定义列表中的项目），dd（定义描述项目的内容，跟dt一起搭配）

3.常见的块级元素

   * address - 地址
　　* blockquote - 块引用
　　* center - 举中对齐块
　　* dir - 目录列表
　　* div - 常用块级容易，也是css layout的主要标签
　　* dl - 定义列表
　　* fieldset - form控制组
　　* form - 交互表单
　　* h1 - 大标题- h6 - 6级标题
　　* hr - 水平分隔线
　　* isindex - input prompt
　　* menu - 菜单列表
　　* noframes - frames可选内容，（对于不支持frame的浏览器显示此区块内容
　　* noscript - 可选脚本内容（对于不支持script的浏览器显示此内容）
　　* ol - 排序表单
　　* pre - 格式化文本
　　* ul - 非排序列表

 

### 行级标签

1.行级标签又称为内联标签，行级标签不会单独占据一行，设置宽高（width,height）无效。

2.行内内部可以容纳其他行内元素，但不可以容纳块元素。
有span、strong、em、b、i、input、a、img、u（下划线），em(强调)，i(斜体)，sub(下标),sup(上标)等。

3.行内元素的水平方向的padding-left和padding-right都会产生边距效果，但是竖直方向上的padding-top和padding-bottom都不会产生边距效果。

4.常见的行级标签有span,  strong,  em,  br,  img ,  input,  label,  select,  textarea,  cite。

 

### 行内块标签（inline-block element）

1、能和其他元素待在一行

2、能设置宽高

有`img`，`input`，`textarea`等

```html
a - 锚点,b - 粗体(不推荐),br - 换行
em - 强调
font - 字体设定(不推荐)
i - 斜体
img - 图片
input - 输入框
label - 表格标签
select - 项目选择
small - 小字体文本
span - 常用内联容器，定义文本内区块
strike - 中划线
strong - 粗体强调
sub - 下标
sup - 上标
textarea - 多行文本输入框
tt - 电传文本
u - 下划线
```

### 行块级标签相互转化

通过css样式中的displiay属性对行块级标签进行相互转换，属性值中inline（元素以行内标签进行展示），block（元素以块级标签进行展示），inline-block（元素以行内块级标签进行展示）。

 display属性

| block        |                    |
| ------------ | ------------------ |
| inline       |                    |
| inline-block |                    |
| none         | 设置元素不会被显示 |

### `link`标签有什么作用

`link`标签可以实现资源加载，DNS预解析