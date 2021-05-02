# H5简介

## H5之问？

为什么要有H5？H5解决了什么问题？H5出现之前前端面临哪些问题？H5的规范最早是由哪个浏览器实现的？

HTML5是HTML最新的修订版本，2014年10月由万维网联盟（W3C）完成标准制定。

HTML5的设计目的是为了在移动设备上支持多媒体。

HTML5 简单易学。

## 什么是H5

HTML5 是下一代 HTML 标准。

HTML , HTML 4.01的上一个版本诞生于 1999 年。自从那以后，Web 世界已经经历了巨变。

HTML5 仍处于完善之中。然而，大部分现代浏览器已经具备了某些 HTML5 支持。

HTML5 是 W3C 与 WHATWG 合作的结果,WHATWG 指 Web Hypertext Application Technology Working Group。

WHATWG 致力于 web 表单和应用程序，而 W3C 专注于 XHTML 2.0。在 2006 年，双方决定进行合作，来创建一个新版本的 HTML。

HTML5 中的一些有趣的新特性：

- 用于绘画的 canvas 元素
- 用于媒介回放的 video 和 audio 元素
- 对本地离线存储的更好的支持
- 新的特殊内容元素，比如 article、footer、header、nav、section
- 新的表单控件，比如 calendar、date、time、email、url、search

> <font color=red>注意</font>

`<!doctype> `声明必须位于 HTML5 文档中的第一行,使用非常简单:

`<!DOCTYPE html>`

## H5 的改进

- 新元素
- 新属性
- 完全支持 CSS3
- Video 和 Audio
- 2D/3D 制图
- 本地存储
- 本地 SQL 数据
- Web 应用

------

## H5 多媒体

使用 HTML5 你可以简单的在网页中播放 视频(video)与音频 (audio) 。

- HTML5 [](https://www.runoob.com/html/html5-video.html)
- HTML5 [](https://www.runoob.com/html/html5-audio.html)

------

## H5应用

使用 HTML5 你可以简单地开发应用

- 本地数据存储
- 访问本地文件
- 本地 SQL 数据
- 缓存引用
- Javascript 工作者
- XHTMLHttpRequest 2

------

## H5 图形

使用 HTML5 你可以简单的绘制图形:

- 使用 [canvas](https://www.runoob.com/html/html5-canvas.html) 元素。
- 使用内联 [SVG](https://www.runoob.com/html/html5-svg.html)。
- 使用 [CSS3 2D 转换](https://www.runoob.com/css3/css3-2dtransforms.html)、[CSS3 3D 转换](https://www.runoob.com/css3/css3-3dtransforms.html)。

------

## H5 使用 CSS3

- 新选择器
- 新属性
- 动画
- 2D/3D 转换
- 圆角
- 阴影效果
- 可下载的字体

## 语义元素

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <article> 1定义页面独立的内容区域。</article>
    <aside> 2定义页面的侧边栏内容。</aside>
    <bdi> 3允许您设置一段文本，使其脱离其父元素的文本方向设置。</bdi>
    <command> 4定义命令按钮，比如单选按钮、复选框或按钮</command>
    <details> 5用于描述文档或文档某个部分的细节</details>
    <dialog> 6定义对话框，比如提示框</dialog>
    <summary> 7标签包含 details 元素的标题</summary>
    <figure> 8规定独立的流内容（图像、图表、照片、代码等等）</figure>
    <figcaption> 9定义 </figcaption>
    <figure> 元素的标题</figure>
    <footer> 0定义 section 或 document 的页脚。</footer>
    <header> 1定义了文档的头部区域</header>
    <mark> 2定义带有记号的文本。</mark>
    <meter> 3定义度量衡。仅用于已知最大和最小值的度量。</meter>
    <nav> 4定义导航链接的部分。</nav>
    <progress> 5定义任何类型的任务的进度。</progress>
    <ruby> 6定义 ruby 注释（中文注音或字符）。</ruby>
    <rt> 7定义字符（中文注音或字符）的解释或发音。</rt>
    <rp> 8在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容。</rp>
    <section> 9定义文档中的节（section、区段）。</section>
    <time> 0定义日期或时间。</time>
    <wbr>	1规定在文本中的何处适合添加换行符。
  </body>
</html>

```

