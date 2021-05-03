# 浏览器多进程架构

我们可以简单的认为 JavaScript 这门语言目前有两个主要的 runtime，一个是 Node.js，另一个就是浏览器环境。我们平常所谓的 JavaScript 是单线程的，实际上指的是 JavaScript 运行在 Render process 的 Main thread，什么是 Render process，看完你就明白了。

## 背景知识 - 进程与线程

先来扯一些背景知识，什么是进程，什么是线程（JavaScript 其实还有个协程的概念，不扯），这个对我们后面的讲解很重要。



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-61a0f6f7d721ebe70197995116d31499_720w.jpg)



- A process can be described as an application’s executing program.
- A thread is the one that lives inside of process and executes any part of its process's program.
- 多个线程之间共享内存，多个进程之间不共享内存，需要通过 IPC 传递信息



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-31c508ea3beb939f681f8257ce0e3a7b_720w.jpg)



### 单线程与多线程

比如下面的代码，理论上来说通过多线程处理要比单线程要快，原因是因为多线程允许并行处理

```js
const a = 1 + 2;
const b = 20 / 5;
const c = 7 * 8;
console.log(a, b, c);
```



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-62e20195195189bca138d21b16c6bea7_720w.jpg)



下图展示同一个进程的内存是如何共享的



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-d3b72af641e80551c3c549777f9c5fa3_720w.jpg)



## 多进程浏览器架构

不扯以前的旧的浏览器架构，Chrome 浏览器的架构如下图所示（不一定最新）。**需要注意的是，像 UI process, Network process 等等这些进程都有可能会被“降级”为 Browser process 的线程（UI thread, Network thread）**。

> When Chrome is running on powerful hardware, it may split each service into different processes giving more stability, but if it is on a resource-constraint device, Chrome consolidates services into one process saving memory footprint.



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-74bd7668de8f98f47b302de8d9500048_720w.jpg)



所以当你仅仅打开一个 tab 页的时候的进程信息可能是这样的



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-11d255e0026081f2f26f3b65f85f6ae0_720w.jpg)



### 进程介绍

### 1. 插件进程（Plugin process)

就是插件运行的进程，每个插件一个进程，单独隔离出是为了防止插件挂了影响用户



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-049b2bcb4dfab229f68f30f0291f4a12_720w.jpg)



### 2. GPU 进程（GPU process）

主要负责 UI 渲染

> Handles GPU tasks in isolation from other processes. It is separated into different process because GPUs handles requests from multiple apps and draw them in the same surface.

### 3. 网络进程（Network process）

负责网络资源加载

### 4. 浏览器主进程（Browser process）

负责界面展示，用户交互，子进程管理，文件存取等

### 5. 渲染进程 (Renderer process）

Controls anything inside of the tab where a website is displayed.

主要负责将 HTML, CSS, JavaScript 转换为用户可交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 就运行在渲染进程，默认每个 tab 一个渲染进程（特殊情况下面的进程模式会讲）



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-12dcfec1e4e079c89be0c5fd086c53e5_720w.jpg)



## Chromium 四种进程模式 (Chromium Process Models)

> Ref: [https://www.chromium.org/developers/design-documents/process-models](https://link.zhihu.com/?target=https%3A//www.chromium.org/developers/design-documents/process-models)

Chromium 提供了四种进程模式，不同的进程模式会对 tab 进程做不同的处理，比如采用某个模式况会给 tab 分配新进程，而采用另外一个模式则不会，下面是四种模式的介绍，Chrome 默认采用第一个模式

- **Process-per-site-instance** (default) - 同一个 **site-instance** 使用一个进程
- **Process-per-site -** 同一个 **site** 使用一个进程
- **Process-per-tab -** 每个 tab 使用一个进程
- **Single process -** 所有 tab 共用一个进程

这里需要给出 site 和 site-instance 的定义

- **site** 指的是相同的 registered domain name (e.g., [http://google.com](https://link.zhihu.com/?target=http%3A//google.com) or [http://bbc.co.uk](https://link.zhihu.com/?target=http%3A//bbc.co.uk)) 和 scheme (e.g., https://) 。比如 [https://z.baidu.com](https://link.zhihu.com/?target=https%3A//z.baidu.com) 和 [https://b.baidu.com](https://link.zhihu.com/?target=https%3A//b.baidu.com) 就可以理解为同一个 site（注意这里要和 [Same-origin policy](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) 区分开来，同源策略还涉及到子域名和端口）

- **site-instance** 指的是一组 **connected pages from the same site**，这里 **connected** 的定义是 **can obtain references to each other in script code** 怎么理解这段话呢。满足下面两中情况并且打开的新页面和旧页面属于上面定义的同一个 site，就属于同一个 **site-instance**

- - 用户通过 `<a target="_blank">` 这种方式点击打开的新页面
  - JavaScript code 打开的新页面（比如 `window.open`)

理解了这两个关键字就可以仔细说下上面的四种进程模式

**Single process** 和 **Process-per-tab** 就不用说了，意如其名。 如果使用 **Process-per-site** 模式，当你打开了一个 tab 访问 [https://a.baidu.com](https://link.zhihu.com/?target=https%3A//a.baidu.com)，然后再打开一个 tab 访问 [https://b.baidu.com](https://link.zhihu.com/?target=https%3A//b.baidu.com)，这两个 tab 其实用的是同一个进程，因为这两个 tab 被分在同一个 group。这就意味着，你在其中一个 tab 写一个死循环，这两个 tab 都会 hang

**Process-per-site-instance** 是最重要的，因为这个是 Chrome 默认使用的模式，也就是几乎所有的用户都在用的模式。当你打开一个 tab 访问 [https://a.baidu.com](https://link.zhihu.com/?target=https%3A//a.baidu.com)，然后再打开一个 tab 访问 [https://b.baidu.com](https://link.zhihu.com/?target=https%3A//b.baidu.com)，这两个 tab 会使用**两个进程**。如果 [https://b.baidu.com](https://link.zhihu.com/?target=https%3A//b.baidu.com) 是通过 [https://a.baidu.com](https://link.zhihu.com/?target=https%3A//a.baidu.com) 页面的 JavaScript 代码打开的，这两个 tab 会使用**同一个进程**，比如下图的例子，可以看到两个 tab 的 processId 是相同的



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-c7923c5f307addf0176c5cc9ce2305d1_720w.jpg)



## 为什么使用 Process-per-site-instance 这种进程模式

因为这种模型兼顾了性能与易用性，是一个比较中庸通用的模式

- 相较于 Process-per-tab，能够少开很多进程，就意味着更少的内存占用
- 相较于 Process-per-site，能够更好的隔离相同域名下毫无关联的 tab，更加安全

同时这么做也满足了 different subdomains or ports of a site to access each other via Javascript 这种需求。

我们一开始的时候说过，同一个进程的多个线程是共享内存的。所以当两个 tab 使用同一个进程的时候，这两个 tab 就是“通的”。比如 A 页面使用 JavaScript 打开 B 页面，那么 B 页面可以通过 `window.opener` 访问 A 页面的 `window` 对象。

## 多进程协作完成任务

### 从输入 URL 到页面展示

这个问题大概是面试出现概率最高的题目之一了，这整个流程其实有个名字叫 **Navigation**，我们从进程线程的角度来梳理一下。

### UI 和网络

首先，在输入框输入 `www.mysite.com` 然后输入 `Enter` 这些都是由浏览器进程的 UI thread 来负责处理的，其中还有个额外的处理就是判断输入是一个 URL 还是个 Query，无论是哪个都要通过 IPC 通知网络进程发送请求，只不过请求的目标不一样（输入的 URL / 搜索引擎）。



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-9a36065b0afc54cc859c0d8e8f7e1713_720w.jpg)



通知网络进程后，UI thread 展示 Spinner，Network process 会负责后续网络相关的处理比如 DNS lookup 和 establishing TLS Connection。Network process 有可能会收到 redirect response 比如 HTTP 301，这种情况 Network 会通知 UI thread 对输入框的 URL 做修改。



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-fbb02b92ff64443b6982c66cc5dd6ee1_720w.jpg)



### 解析返回数据

网络进程会根据 Content-Type(HTTP Header) 和文件的 MIME type 来对不同的返回做不同的处理。比如，如果是 HTML 会交给 Renderer process, 如果是 zip 会交给 Download manager。

同时这里会做一些安全检查，比如 [SafeBrowsing](https://link.zhihu.com/?target=https%3A//safebrowsing.google.com/) 和 [Cross Origin Read Blocking (CORB)](https://link.zhihu.com/?target=https%3A//www.chromium.org/Home/chromium-security/corb-for-developers)



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-62b5c2036b641126b7a3b66d53c45966_720w.jpg)



### 提交导航

Network process 完成解析文件类型和安全检查后，会通知 Browser process，然后 browser process 通过 IPC 通知指定的渲染进程**提交导航（commit the navigation）**，同时将网络进程的 data stream 传给渲染进程 so the renderer process can keep receiving HTML data。渲染进程在开始接收 HTML 后，会返回**确认信息（confirm message）**，然后浏览器进程这边就会对 UI 做一些修改，比如 HTTPS 的小锁头，前进后退按钮等等



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-0326147f061af8a13fafbf3aa01b4746_720w.jpg)



### 渲染进程内部

就像上面说的，Renderer process 收到 commit navigation 的信息后会返回 confirm message 给浏览器主进程，同时接收 HTML 并渲染的过程就开始了，具体细节不讲太复杂，我们只关心进程间通讯。渲染进程结束后并且所有 onload 事件触发后，会发送 IPC 给浏览器进程，然后 tab 页的 spinner 会停止，页面加载完成。



![img](/images/BrowserModel/BrowserArch/BrowserArchFirst.assets/v2-862e209e5e284cdb2ad3f73c031524cd_720w.jpg)



## Ref

- [https://www.chromium.org/developers/design-documents](https://link.zhihu.com/?target=https%3A//www.chromium.org/developers/design-documents)
- [https://developers.google.com/web/updates/2018/09/inside-browser-part1](https://link.zhihu.com/?target=https%3A//developers.google.com/web/updates/2018/09/inside-browser-part1)
- [https://developers.google.com/web/updates/2018/09/inside-browser-part2](https://link.zhihu.com/?target=https%3A//developers.google.com/web/updates/2018/09/inside-browser-part2)

[浏览器多进程架构](https://zhuanlan.zhihu.com/p/102128787)