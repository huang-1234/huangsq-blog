# Web Workers

## 问题：JavaScript 并行性

要将有趣的应用（例如从侧重服务器端的实施）移植到客户端 JavaScript，存在很多制约瓶颈。其中包括浏览器兼容性、静态类型、可访问性和性能。幸运的是，随着浏览器供应商快速提高 JavaScript 引擎的速度，性能已不再是瓶颈。

仍在阻碍 JavaScript 的实际上是语言本身。JavaScript 属于单线程环境，也就是说无法同时运行多个脚本。例如，假设有一个网站，它需要处理 UI 事件，查询并处理大量 API 数据以及操作 DOM。这很常见，不是吗？遗憾的是，由于受到浏览器 JavaScript 运行时的限制，所有这些操作都无法同时进行。脚本是在单个线程中执行的。

开发人员会使用 `setTimeout()`、`setInterval()`、`XMLHttpRequest` 和事件处理程序等技术模拟“并行”。所有这些功能确实都是异步运行的，但没有阻碍未必就意味着并行。系统会在生成当前执行脚本后处理异步事件。好消息是，HTML5 为我们提供了优于这些技巧的技术。

## Web Worker 简介：为 JavaScript 引入线程技术

[Web Worker](http://www.whatwg.org/specs/web-workers/current-work/) 规范定义了在网络应用中生成背景脚本的 API。您可以通过 Web Worker 执行一些操作，例如触发长时间运行的脚本以处理计算密集型任务，同时却不会阻碍 UI 或其他脚本处理用户互动。这有助于解决令人讨厌的“无响应脚本”对话框（大家都有些爱上它了吧）问题：

Worker 利用类似线程的消息传递实现并行。这非常适合您确保对 UI 的刷新、性能以及对用户的响应。

### Web Worker 的类型

值得注意的是，[规范](http://www.whatwg.org/specs/web-workers/current-work/)中介绍了两种 Web Worker：[专用 Worker](http://www.whatwg.org/specs/web-workers/current-work/#dedicated-workers-and-the-worker-interface) 和 [共用 Worker](http://www.whatwg.org/ pecs/web-workers/current-work/#sharedworker)。本文只涉及专用 Worker，并在全文中将其称为“Web Worker”或“Worker”。

## 使用入门

Web Worker 在独立线程中运行。因此，它们执行的代码需要保存在一个单独的文件中。但在保存代码前，我们要先在您的主网页上创建新的 `Worker` 对象。构造函数采用 Worker 脚本的名称：

```js
var worker = new Worker('task.js');
```

如果指定的异步下载文件存在，浏览器就会生成新的 Worker 线程。在完全下载并执行文件之前，系统不会生成 Worker。如果指向您 Worker 的路径返回 404，Worker 就会在不显示任何提示的情况下失败。

创建 Worker 之后，通过调用 `postMessage()` 方法启动：

```js
worker.postMessage(); // Start the worker.
```

### 通过消息传递与 Worker 通信

Worker 与其父网页之间的通信是通过事件模型和 `postMessage()` 方法实现的。`postMessage()` 可以接受字符串或 JSON 对象作为单个参数，具体取决于您的浏览器/版本。新式浏览器的最新版支持传递 JSON 对象。

以下示例使用字符串将“Hello World”传递给了 doWork.js 中的 Worker。Worker 直接返回了传递给它的消息。

主脚本：

```js
var worker = new Worker('doWork.js');

worker.addEventListener('message', function(e) {
  console.log('Worker said: ', e.data);
}, false);

worker.postMessage('Hello World'); // Send data to our worker.
```

doWork.js (Worker)：

```js
self.addEventListener('message', function(e) {
  self.postMessage(e.data);
}, false);
```

在主网页中调用 `postMessage()` 时，我们的 Worker 通过定义 `message` 事件的 `onmessage` 处理程序来处理消息。您可以在 `Event.data` 中访问消息有效负载（此示例中为“Hello World”）。虽然这个特殊的示例并不精彩，但它说明 `postMessage()` 也是您将数据传回主线程的一种方法。很方便！

在主网页和 Worker 之间传递的消息是复制而不是共享的。例如，下一示例中 JSON 消息的“msg”属性在两个位置中均可访问。即使对象运行在单独的专用空间中，系统似乎也会将其直接传递给 Worker。实际发生的情况是，系统将对象传递给 Worker 后，会将其序列化，随后在另一端解取消序列化。由于网页和 Worker 并不共享同一实例，因此每次传递时都要进行复制。大部分浏览器通过在任一端上对值进行自动 JSON 编码/解码来实施此功能。

下面是一个使用 JSON 对象传递消息的更复杂的示例。

主脚本：

```html
<button onclick="sayHI()">Say HI</button>
<button onclick="unknownCmd()">Send unknown command</button>
<button onclick="stop()">Stop worker</button>
<output id="result"></output>

<script>
  function sayHI() {
    worker.postMessage({'cmd': 'start', 'msg': 'Hi'});
  }

  function stop() {
    // Calling worker.terminate() from this script would also stop the worker.
    worker.postMessage({'cmd': 'stop', 'msg': 'Bye'});
  }

  function unknownCmd() {
    worker.postMessage({'cmd': 'foobard', 'msg': '???'});
  }

  var worker = new Worker('doWork2.js');

  worker.addEventListener('message', function(e) {
    document.getElementById('result').textContent = e.data;
  }, false);
</script>
```

doWork2.js：

```js
self.addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg + '. (buttons will no longer work)');
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);
```

**请注意**：停止 Worker 的方法有两种：在主网页中调用 `worker terminate()`，或在 Worker 本身内部调用 `self.close()`。

## Worker 环境

### Worker 作用域

就 Worker 来说，`self` 和 `this` 指的都是 Worker 的全局作用域。因此，上一示例也可以写成：

```js
addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
  ...
}, false);
```

或者，您可以直接设置 `onmessage` 事件处理程序（虽然 JavaScript 高手们总是会推荐 `addEventListener`）。

```js
onmessage = function(e) {
  var data = e.data;
  ...
};
```

### 适用于 Worker 的功能

由于 Web Worker 的多线程行为，所以它们只能使用 JavaScript 功能的子集：

- `navigator` 对象
- `location` 对象（只读）
- `XMLHttpRequest`
- `setTimeout()/clearTimeout()` 和 `setInterval()/clearInterval()`
- [应用缓存](https://www.html5rocks.com/tutorials/appcache/beginner/)
- 使用 `importScripts()` 方法导入外部脚本
- [生成其他 Web Worker](https://www.html5rocks.com/zh/tutorials/workers/basics/#toc-enviornment-subworkers)

Worker 无法使用：

- DOM（非线程安全）
- `window` 对象
- `document` 对象
- `parent` 对象

### 加载外部脚本

您可以通过 `importScripts()` 函数将外部脚本文件或库加载到 Worker 中。该方法采用零个或多个字符串表示要导入的资源的文件名。

此示例将 `script1.js` 和 `script2.js` 加载到了 Worker 中：

worker.js：

```js
importScripts('script1.js');
importScripts('script2.js');
```

也可以写成单个导入语句：

```js
importScripts('script1.js', 'script2.js');
```

### 子 Worker

Worker 可以生成子 Worker。这对于在运行时进一步拆分大任务来说非常重要。但是，子 Worker 还有几点注意事项：

- 子 Worker 必须托管在与父网页相同的来源中。
- 子 Worker 中的 URI 应相对于父 Worker 的位置进行解析（与主网页不同）。

请注意，大部分浏览器会为每个 Worker 生成单独的进程。在您开始生成 Worker 场之前，请注意不要占用太多的用户系统资源。这样做的一个原因是，在主网页和 Worker 之间传递的消息是复制而不是共享的。请参阅[通过消息传递与 Worker 通信](https://www.html5rocks.com/zh/tutorials/workers/basics/#toc-gettingstarted-workercomm)。

有关子 Worker 生成方法的示例，请参阅规范中的[相关示例](http://www.whatwg.org/specs/web-workers/current-work/#delegation)。

## 内嵌 Worker

如果您想即时创建 Worker 脚本，或者在不创建单独 Worker 文件的情况下创建独立网页，那该怎么做呢？在新 [`BlobBuilder`](http://dev.w3.org/2009/dap/file-system/file-writer.html#the-blobbuilder-interface) 界面中，您可以创建 `BlobBuilder` 并以字符串形式附上 Worker 代码，从而在与主逻辑相同的 HTML 文件中“内嵌”Worker：

```js
// Prefixed in Webkit, Chrome 12, and FF6: window.WebKitBlobBuilder, window.MozBlobBuilder
var bb = new BlobBuilder();
bb.append("onmessage = function(e) { postMessage('msg from worker'); }");

// Obtain a blob URL reference to our worker 'file'.
// Note: window.webkitURL.createObjectURL() in Chrome 10+.
var blobURL = window.URL.createObjectURL(bb.getBlob());

var worker = new Worker(blobURL);
worker.onmessage = function(e) {
  // e.data == 'msg from worker'
};
worker.postMessage(); // Start the worker.
```

### Blob 网址

对 [`window.URL.createObjectURL()`](http://dev.w3.org/2006/webapi/FileAPI/#dfn-createObjectURL) 的调用十分奇妙。此方法创建了一个简单的网址字符串，该字符串可用于 DOM `File` 或 `Blob` 对象中存储的参考数据。例如：

```js
blob:http://localhost/c745ef73-ece9-46da-8f66-ebes574789b1
```

Blob 网址是唯一的，且只要应用存在，该网址就会一直有效（例如直到卸载 `document` 为止）。如果您要创建很多 Blob 网址，最好发布不再需要的参考资料。您可以通过将 Blob 网址传递给 [`window.URL.revokeObjectURL()`](http://dev.w3.org/2006/webapi/FileAPI/#dfn-revokeObjectURL) 来明确发布该网址：

```js
window.URL.revokeObjectURL(blobURL); // window.webkitURL.createObjectURL() in Chrome 10+.
```

在 Chrome 浏览器中，有一个很实用的页面可供您查看创建的所有 Blob 网址：`chrome://blob-internals/`。

### 完整示例

再进行一个步骤，我们就会清楚如何将 Worker 的 JavaScript 代码内嵌在网页中了。此技术使用 `<script>` 标签定义 Worker：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
</head>
<body>

  <div id="log"></div>

  <script id="worker1" type="javascript/worker">
    // This script won't be parsed by JS engines because its type is javascript/worker.
    self.onmessage = function(e) {
      self.postMessage('msg from worker');
    };
    // Rest of your worker code goes here.
  </script>

  <script>
    function log(msg) {
      // Use a fragment: browser will only render/reflow once.
      var fragment = document.createDocumentFragment();
      fragment.appendChild(document.createTextNode(msg));
      fragment.appendChild(document.createElement('br'));

      document.querySelector("#log").appendChild(fragment);
    }

    var bb = new BlobBuilder();
    bb.append(document.querySelector('#worker1').textContent);

    // Note: window.webkitURL.createObjectURL() in Chrome 10+.
    var worker = new Worker(window.URL.createObjectURL(bb.getBlob()));
    worker.onmessage = function(e) {
      log("Received: " + e.data);
    }
    worker.postMessage(); // Start the worker.
  </script>
</body>
</html>
```

在我看来，这种新方法稍显清晰明了。它通过 id="worker1" 和 type='javascript/worker' 定义脚本标记（这样浏览器就不会解析 JavaScript 了）。系统会使用 `document.querySelector('#worker1').textContent` 以字符串形式提取该代码并将其传递给 `BlobBu lder.append()`。

### 加载外部脚本

在使用这些技术内嵌 Worker 代码时，`importScripts()` 只会在您提供绝对 URI 的情况下生效。如果您尝试传递相对 URI，浏览器就会提示出现安全错误。原因：系统会通过 `blob:` 前缀解析 Worker（现在通过 Blob 网址创建），而您的应用会通过其他（可能为 `http://`）方案运行。因此，失败原因在于跨源限制。

在内嵌 Worker 中利用 `importScripts()` 的一种方法是，通过将相关网址传递给内嵌 Worker 并手动构建绝对网址来“导入”运行您主脚本的当前网址。这可以确保外部脚本是从同一来源导入的。假设您的主应用是在 http://example.com/index.html 上运行的：

```html
<script id="worker2" type="javascript/worker">
self.onmessage = function(e) {
  var data = e.data;

  if (data.url) {
    var url = data.url.href;
    var index = url.indexOf('index.html');
    if (index != -1) {
      url = url.substring(0, index);
    }
    importScripts(url + 'engine.js');
  }
  ...
};
</script>
<script>
  var worker = new Worker(window.URL.createObjectURL(bb.getBlob()));
  worker.postMessage({url: document.location});
</script>
```

## 处理错误

与任何 JavaScript 逻辑一样，您需要处理 Web Worker 中出现的任何错误。如果在执行 Worker 时出现错误，就会触发 `ErrorEvent`。相关界面中包含用于找出错误内容的三个实用属性：`filename` - 导致错误的 Worker 脚本的名称；`lineno` - 出现错误的行号；以及 `message` - 有关错误的实用说明。以下示例设置了 `onerror` 事件处理程序以便打印错误内容：

```html
<output id="error" style="color: red;"></output>
<output id="result"></output>

<script>
  function onError(e) {
    document.getElementById('error').textContent = [
      'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message].join('');
  }

  function onMsg(e) {
    document.getElementById('result').textContent = e.data;
  }

  var worker = new Worker('workerWithError.js');
  worker.addEventListener('message', onMsg, false);
  worker.addEventListener('error', onError, false);
  worker.postMessage(); // Start worker without a message.
</script>
```

**示例**：workerWithError.js 尝试执行 1/x，其中 x 未定义。

运行

workerWithError.js：

```html
self.addEventListener('message', function(e) {
  postMessage(1/x); // Intentional error.
};
```

## 安全说明

### 本地访问限制

由于 Google Chrome 浏览器的安全限制，Worker 无法在最新版浏览器中本地运行（例如通过 `file://`），且会在不显示任何提示的情况下失败！要通过 `file://` 方案运行您的应用，请使用 `--allow-file-access-from-files` 标记设置来运行 Chrome 浏览器。**请注意**：不推荐使用此标记设置来运行您的主浏览器。此标记设置仅供测试用，请勿用于常规浏览。

其他浏览器不存在相同的限制。

### 同源注意事项

Worker 脚本必须是将相同方案作为调用网页的外部文件。因此，您无法通过 `data:` 网址或 `javascript:` 网址加载脚本，且 `https:` 网页无法启动以 `http:` 网址开头的 Worker 脚本。

## 用例

那么，哪种应用可以利用 Web Worker 呢？很遗憾，Web Worker 仍相对较新，且已有的示例/教程中大部分都会涉及素数的计算。虽然这没什么趣味性，但却可以帮助您理解 Web Worker 的概念。下面列出了更多概念供您活跃思维：

- 预先抓取和/或缓存数据以便稍后使用
- 突出显示代码语法或其他实时文本格式
- 拼写检查程序
- 分析视频或音频数据
- 背景 I/O 或网络服务轮询
- 处理较大数组或超大 JSON 响应
- <canvas> 中的图片过滤
- 更新本地网络数据库中的多行内容

## 参考资料

- [Web Worker](http://www.whatwg.org/specs/web-workers/current-work/) 规范
- 来自 Mozilla 开发人员网络的 [“使用 Web Worker”](http://developer.mozilla.org/en/Using_web_workers)
- 来自 Dev.Opera 的[“Web Worker 潮流！”](http://dev.opera.com/articles/view/web-workers-rise-up/)