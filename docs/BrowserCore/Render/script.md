# Browser解析script

先来看段代码

script.html

```html
<body>
  <script type="text/javascript">
    window.onload = function () { // 需要等到页面加载完以后再执行这个函数
      alert('onload')
    }
  </script>
  <!-- 如果想给脚本增加defer属性让其延迟加载的话，最好是外部脚本，
    内联的defer不仅多数浏览器不支持，而且IE6的表现也不一致。
    所以将脚本放在body底部比给脚本增加defer属性让脚本延迟加载更好 -->
  <script type="text/javascript" defer src="defer.js">
  </script>
  
  <script type="text/javascript" async src="async.js">
    // alert('async')
  </script>
  <script type="text/javascript">
    alert('script')
  </script>
</body>
```

async.js

```js
alert('defer');
```

defer.js

```js
alert('async');
```

js执行先后顺序

script->defer->async->onload

## 正文

1. defer 属性

```html
<script src="file.js" defer></script>
```

defer属性声明这个脚本中将不会有 document.write 或 dom 修改。
浏览器将会并行下载 file.js 和其它有 defer 属性的script，而不会阻塞页面后续处理。
defer属性在IE 4.0中就实现了，超过13年了！Firefox 从 3.5 开始支持defer属性 。
注：所有的defer 脚本保证是按顺序依次执行的。
 async 属性

```html
<script src="file.js" async></script>
```

async属性是HTML5新增的。作用和defer类似，但是它将在下载后尽快执行，不能保证脚本会按顺序执行。它们将在onload 事件之前完成。
Firefox 3.6、Opera 10.5、IE 9 和 最新的Chrome 和 Safari 都支持 async 属性。可以同时使用 async 和 defer，这样IE 4之后的所有 IE 都支持异步加载。
详细解释

`<script>` 
标签在 HTML 4.01 与 HTML5 的区别：

  type 属性在HTML 4中是必须的，在HTML5中是可选的。
  async 属性是HTML5中新增的。
  个别属性（xml:space）在HTML5中不支持。

说明：

  async：false，script 将立即获取（下载）并执行，然后才继续后面的处理，这期间阻塞了浏览器的后续处理。
  async：true，那么 script 将被异步下载并执行，同时浏览器继续后续的处理。
  HTML4中就有了defer属性，它提示浏览器这个 script 不会产生任何文档元素（没有document.write），因此浏览器会继续后续处理和渲染。

  如果没有 async 属性 但是有 defer 属性，那么script 将在页面parse之后执行。（async=false;defer=true）

  如果同时设置了二者，那么 defer 属性主要是为了让不支持 async 属性的老浏览器按照原来的 defer 方式处理，而不是同步方式。（异步兼容，同时使用defer+async）

优化脚本文件的加载提高页面的加载速度，一直是前端工程师提高页面加载速度很重要的一条。因为涉及到各个浏览器对解析脚本文件的不同机制，以及加载脚本会阻塞其他资源和文件的加载。当浏览器解析器遇到`<script>`时，会立即加载（加载：下载，解析和执行），浏览器对其他资源和文档的加载会停止。为了提高页面的加载速度，得让JS不阻塞其他资源的加载。

Webkit 和 Firefox 对JS的执行过程进行了优化，增加了“预解析”这个过程，“预解析”过程不会修改DOM树，所以可以跟其他解析过程并行,该过程由预解析器去完成，而可能会改变DOM树执行过程则由主解析器来完成，在[通过解析过程了解JavaScript](http://www.html5jscss.com/js-data-scope-52.html#2)文章中有提到的JS的“预解析”过程，此过程应该就是由浏览器的预解析器完成，预解析器还负责解析样式表和图片。

另一方面，浏览器同事请求http的数量也是有一定限制的，加载js不像加载样式那样是并行的。样式表是构建呈现树的一部分，浏览器在解析页面结构是由DOM树和呈现树两部分组成，而解析执行样式表只会改变样式表不会更改DOM树，呈现树跟DOM树虽然是相对应的，但并非一一对应。因此，也就没有必要停止对其他资源和文档的加载了。

提高页面加载速度的最简单快速的方法就是将脚本文件放到body底部。但这并不是提高页面加载速度最优方案的方案，接下来我们介绍其他方案。



> 能让脚本延迟和异步执行的两个属性：defer和async。

## Defer、Async属性

- defer是html4.0中定义的，该属性使得浏览器能延迟脚本的执行，等文档完成解析完成后会按照他们在文档出现顺序再去下载解析。也就是说defer属性的script就类似于将script放在body的效果。
- async是HTML5新增的属性，IE10和浏览器都是支持该属性的。该属性的作用是让脚本能异步加载，也就是说当浏览器遇到async属性的script时浏览器加载css一样是异步加载的。

如果想给脚本增加defer属性让其延迟加载的话，最好是外部脚本，内联的defer不仅多数浏览器不支持，而且IE6的表现也不一致。

所以将脚本放在body底部比给脚本增加defer属性让脚本延迟加载更好，就像yslow建议的那样：put style top,put script bottom。

浏览器的在遇到defer和async属性的<script>的浏览器执行过程如下（以下摘自javascript权威指南）：

1. WEB浏览器创建Document对象，并且开始解析WEB页面，解析HTML元素和它们的文本内容后添加Element对象和Text节点到文档中。这个过程的readystate的属性值是“loading”
2. 当HTML解析器遇到没有async和defer属性的<script>时，它把这些元素添加到文档中，然后执行行内或外部脚本。这些脚本会同步执行，并且在脚本下载（如果需要）和执行解析器会暂停。这样脚本就可以用document.write()来把文本插入到输入流中。解析器恢复时这些文本会成为文档的一部分。同步脚本经常单定义函数和注册后面使用的注册事件处理程序，但它们可以遍历和操作文档树，因为在它们执行时已经存在了。这样同步脚本可以看到他自己的<script>元素和它们之前的文档内容
3. 当解析器遇到了设置async属性的<script>元素时，它开始下载脚本，并继续解析文档。脚本会在它下载完成后尽快执行，但是解析器没有停下来等他下载。异步脚本禁止document.write()方法。它们可以看到自己的<script>元素和它之前的所有文档元素，并且可能或干脆不可能访问其他的文档内容。
4. 当文档完成解析，document.readyState属性变成“interactive”。
5. 所有有defer属性的脚本，会被它们在文档的里的出现顺序执行。异步脚本可能也会在这个时间执行。延迟脚本能访问完整的文档树，禁止使用document.write()方法。
6. 浏览器在Document对象上触发DOMContentLoaded事件。这标志着程序执行从同步脚本执行阶段转到异步事件驱动阶段。但要注意，这时可能还有异步脚本没有执行完成。
7. 这时，文档已经完全解析完成，但是浏览器可能还在等待其他内容载入，如图片。当所有这些内容完成载入时，并且所有异步脚本完成载入和执行，document.readyState属性变为“complete”，WEB浏览器出发Window对象上的load事件。
8. 从此刻起，会调用异步事件，以异步响应用户输入事件，网络事件，计算器过期等。