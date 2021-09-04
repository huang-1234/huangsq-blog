## script 属性详解

html 元素及其属性，相信大家都很熟悉，但是 script 的属性，未必熟悉，故而整理总结，以待查阅。

## 前言

默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到 script 标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，则先去下载脚本，再执行脚本，等到执行完脚本，再继续向下渲染。

## script 标签的属性

### 1、src

> 定义引用外部脚本的 URI，这可以用来代替直接在文档中嵌入脚本。指定了 src 属性的 script 元素标签内不应该再有嵌入的脚本。

```html
<script src="file.js"></script>
```

### 2、type

> 该属性定义 script 元素包含或 src 引用的脚本语言。属性的值为 MIME 类型;

只能是下面几种方式:

- text/javascript（默认）
- text/ecmascript
- application/javascript
- application/ecmascript

```html
<script src="demo.js" type="text/javascript"></script>
```

除了上面以上 4 中，还有一种

- module

即代码会被当作 JavaScript 模块处理。

```html
<script type="module">
  import { addTextToBody } from "./utils.js";
  addTextToBody("Modules are pretty cool.");
</script>
```

type 为 module 时缺省为 defer 方式。

### 3、async

> 该属性指示浏览器是否在允许的情况下异步执行该脚本。该属性对于没有 src 属性的脚本不起作用。

```html
<script src="file.js" async></script>
```

等同于下面

```html
var script = document.createElement('script'); script.src = "file.js";
document.body.appendChild(script); //从脚本中创建的脚本默认为异步。
```

浏览器支持： chrome，firfox，safari，IE10+都已经实现。

### 4、defer

> 这个属性被设定用来通知浏览器“该脚本将在文档完成解析后，触发 DOMContentLoaded 事件前执行”。如果无 src，则不起作用。

```html
<script src="demo.js" defer></script>
```

精髓就是一句话： **不管这段脚本放在 html 的何处(即使 head 中)，都会等待 dom 解析完成后再去加载。**
如果将 script 标签放在整个 html 文件的最后，那就不需要 defer 了，画蛇添足。

浏览器支持： chrome，firfox，safari，IE10+都已经实现。

async 和 defer 的区别:
defer 要等到整个页面正常渲染结束，才会执行；
async 是在渲染 html 时发现 脚本已经异步下载完，就去执行，执行完了，再继续往下渲染 html

### 5、crossorigin

> 使用本属性来使那些将静态资源放在另外一个域名的站点打印错误信息。

what??? 这个官方的解释让人很懵逼，别急。
由于使用普通的方式加载 script，即下面这种

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
```

如果 src 中的跨站 js 文件，出现了错误。我们是无法通过监听 window.onerror 来将错误准确的打印出来。只能打印出来"Script error"（当然浏览器控制台可能会出来详细错误，但我们无法在代码中捕获，并作出处理）

所以我们要添加 crossorigin 属性来获取跨站文件的错误信息。
首先，服务器要允许跨站获取文件

```html
access-control-allow-origin: *
```

其次，在 js 中添加 crossorigin

```html
<script
  src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"
  crossorigin="anonymous"
></script>
```

crossorigin 的值为:
anonymous 采用普通方式设置对此元素的 CORS 请求
use-credentials 采用凭证的方式设置对此元素的 CORS 请求

浏览器支持： 只有 IE 未实现，其他均实现。

### 6、integrity

> 提供 hash 值，来验证览器获得的资源（例如从 CDN 获得的）是否被篡改。

首先需要服务器开启内容安全策略，即 Content-Security-Policy

```html
Content-Security-Policy: require-sri-for script; //加载script时需要进行校验
```

第二步，加入 integrity 值

```html
<script
  src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"
  integrity="sha384-9u9lzb/hr8e14GLHe5TEOrTiH3Qtw5DX2Zw9X/g7cqj81W2McEMx5CKOszxdb8jg"
  crossorigin="anonymous"
></script>
```

integrity 的值为 src 文件进行 base64 编码的值，可通过 SRI[在线生成工具](https://sri.beetool.cn/)生成。

如果 integrity 和 src 文件的 hash 值不匹配，则浏览器会报错。

除了对 script 进行校验外，同样还可对 style 进行校验

```http
Content-Security-Policy: require-sri-for style;
```

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css"
  integrity="sha384-xyZLiqnBEFn1hDkS8VeG/YHoqOjS/ucimT8TI6GDr9+ZP1UNbZr6d/q0ldMi/xvL"
  crossorigin="anonymous"
/>
```

浏览器支持： 只有 chrome，firfox 实现，safari，IE 都未实现。
