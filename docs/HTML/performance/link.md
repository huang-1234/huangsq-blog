## link标签的rel属性进行性能优化

有很多种方式可以提高web性能，其中的一中方法是预加载你后面会用到的内容，预取一个css文件，预渲染一个页面，提前解析一个域名，实际需要时，您无需等待！听起来是不是很牛逼。

更牛逼的是，浏览器内置很多简单方法来完成所有这些操作，有五个<link rel>属性，它们让浏览器预加载一些内容：

```html
<link rel="prefetch" href="/style.css" as="style" />
<link rel="preload" href="/style.css" as="style" />
<link rel="preconnect" href="https://example.com" />
<link rel="dns-prefetch" href="https://example.com" />
<link rel="prerender" href="https://example.com/about.html" />
```

下面来说明它们各自的作用以及何时使用它们。

- preload (紧急下载内容)
- prefetch (使用低优先级策略下载内容)
- preconnect (连接到服务器)
- dns-prefetch (解析域名)
- prerender (在后台渲染页面)

### preload

`<link rel="preload">`高速浏览器尽快下载缓存资源 (比如 script 或则 stylesheet 文件)。当页面加载完成你立即需要某个资源并且想要加速获取时相当有用。

浏览器除了下载资源啥也不会干，脚本不会执行，样式也不会应用仅仅是cache，所以当需要的时候会立即可用。

**语法**

```html
<link rel="preload" href="/style.css" as="style" />
```

`href`指向想要下载的资源，`as` 可以是你在浏览器中用的所有资源类型。

- `style` 表示css样式表,
- `script`表示脚本,
- `font`表示字体,
- `fetch` 表示使用`fetch()` 或 `XMLHttpRequest`下载的资源,
- 其他值参考完整列表

指定as属性非常重要，它可以帮助浏览器正确设置下载优先级进行下载。



**什么时候用**

**当你立即需要一个资源的时候。**`<link rel="preload">`当页面加载完成后立即需要一个资源并且想尽快加载时，这个会很有用, 例如：

你自定义一个字体，在一个外部的css 文件@font-face 使用这些字体。

```html
<!-- index.html -->
<link rel="stylesheet" href="index.css" />
```



```html
/* index.css */
@font-face {
    src: url('comic-sans.woff2') format('woff2');
}
```

默认情况当`index.css`下载完成应用的时候 comic-sans.woff2 开始下载. 使用`<link rel="preload">`不用等很久可以立即下载字体。

```html
<link rel="preload" href="comic-sans.woff2" as="font" />
```

按照css是否关键的原则分割样式文件，你可以把css分支为两部分，关键部分，非关键部分。

```html
<style>
  /* Inlined critical styles */
</style>

<script>
  /* Custom JS that starts downloading non-critical styles */
  loadCSS('/app/non-critical.css');
</script>
```

用这种方法，非关键的样式仅仅当javascript执行后才开始下载，可能在首次渲染后延时几秒。使用 <link rel="preload"> 让浏览器立即下载， 代替等待JS执行万进行下载。

```html
<style>
  /* Inlined critical styles */
</style>

<link rel="preload" href="/app/non-critical.css" as="style" />

<script>
  /* Custom JS that starts downloading non-critical styles */
  loadCSS('/app/non-critical.css');
</script>
```

**不要过度使用** 预加载所有的资源并不会加速网站，相反会阻止浏览器更智能的下载计划。

与**`prefetch`区分** 如果你不是页面加载后马上需要的资源不要使用<link rel="preload">，如果你仅仅是稍后需要，例如下一页用，使用<link rel="prefetch">代替。

**更多**

**强制性** 不像其他link rel其他预加载相关的属性，对浏览器来说这个属性是强制性的，浏览器必须下载该属性标记的资源，这个属性的其他值，浏览器自行决定执行是否跳过下载对应的资源操作例如：网络不好的情况下 等等。

**优先级** 不同的资源浏览器分配不同的优先级，允许优先下载最重要的资源，使用 <link rel="preload"> 的资源，浏览器根据 as 属性来确定优先级。
### prefetch

<link rel="prefetch"> 告诉浏览器在后台下载并且缓存资源，该下载的优先级较低，不会干扰更重要的资源下载。当您知道在下一个页面上需要该资源并且希望提前对其进行缓存时，这就很有用了。

资源下载完成后，浏览器不会执行任何操作。没有执行脚本，没有应用css。仅仅只是缓存，所以当有需求时它可以立即生效。

**语法**

```html
<link rel="prefetch" href="/style.css" as="style" />
```

href 指向需要预加载的资源。

- style 表示css样式表,
- script表示脚本,
- font表示字体,
- fetch 表示使用fetch() 或 XMLHttpRequest下载的资源,
- 其他值参考完整列表

指定as属性非常重要，它可以帮助浏览器正确设置下载优先级进行下载。


**什么时候使用**

**加载其他页面需要的资源。**<link rel =“"prefetch">预加载其他页面上需要资源可以加快相应页面的渲染速度。例如：

- 你有一个电商网站 40%的用户从首页跳转到产品商品页面使用 `<link rel="prefetch">` 下载css文件、js文件供产品页面使用
- 一个单页webapp,不同的页面分割了不同的bundle, 当访问一些页面的时候，确定一下该页面还能跳转到哪些路由，然后 使用 `<link rel="prefetch">`预加载相应的资源

**尽可能多的使用prefetch是安全的**。浏览器通常以最低的优先级安排prefetch，因此不会干扰其他资源，也就是说尽可能多的使用prefetch是安全的，
请记住这仍然会使用用户的数据--而且有可能会让他们花更多的钱!

**不要用于立即需要使用资源**。当你立即需要使用某些资源时，不要使用`<link rel="prefetch">`使用`<link rel="preload">`来代替.

#### 更多

非强制性，浏览器可以不用执行`<link rel="prefetch">`指令。可以自行决定是否需要下载资源，例如：网速慢的时候，可能不会下载资源。

**优先级** 在chrome中， <link rel="prefetch"> 通常使用最低优先级下载资源
，也就是说所有的资源下载完成后才会把prefetch的资源加到下载计划中。

### preconnect

`<link rel="preconnect">`提前让浏览器执行连接到指定的domain，这对你知道马上要从改domain下载资源，但是不知道下载啥东西很有用，可以加快在初次连接的速度。

浏览器从一个新的第三方域名获取东西时，必须建立一个连接。（第三方的域名是不同与你当前webapp的域名）可能是一个站点使用Google Fonts 获取字体，从CND加载React或者从Api 服务器请求JSON数据。

建立一个新连接同学需要花费数百毫秒。每个域名需要进行一次，仍然是需要花时间，你可以提前建立链接来节省时间，使得从该domain下载资源更快。

**语法**

```html
<link rel="preconnect" href="https://api.my-app.com" />
```

`href` 指向你要解析的域名. 带不带scheme都行(`https://domain.com`) 或者 (`//domain.com`)都一样

**什么时候使用**

**用于你马上需要使用的domain。**当你从第三方域名引入css、脚本、图片市你却不知道确切的资源时`<link rel="preconnect" />`会很有用，例如：

- 你的app在 `my-app.com`上, 并且发了请求到 `api.my-app.com`. 通过JS动态的发送请求所以你不知道哪些请求会到这个域名。
  使用 `<link rel="preconnect">` t提前连接到`api.my-app.com` 使得首次请求数据更快。
- 你的app在 `my-app.com`上, 并且用到了 Google Fonts. Google Fonts 通过两个阶段加载字体: 首先, 从`fonts.googleapis.com`下载css文件; 然后, 通过CSS文件，从 `fonts.gstatic.com`下载字体.
  你不知道哪个字体来自 `fonts.gstatic.com`直到你从 `fonts.googleapis.com`下载完CSS后你才知道. 使用 `<link rel="preconnect">` 提前建立链接

**用来稍微加速第三方脚本或者样式.** 如果你在页面中包含第三方的资源，并且你需要很快加载它, 把域名添加到 `<link rel="preconnect" />` 中. 它能让浏览器尽早的启动连接到该域名.

**不要过度使用.** 对客户端和服务端来说 发起并保持连接打开非常昂贵. 使用这个标签最多 4-6 个域名.

#### 更多

**非强制.** 浏览器不是必须遵守 `<link rel="preconnect">` 指令. 也就是说他可以自行决定是否启动一个连接. 例如： 如果已经有很多连接建立了，或者其他情况可能就不会建立连接.

**连接过程包括什么.** 为了连接到各个网站浏览器必须执行如下步骤:

- *DNS 解析.* 找到指定域名([http://google.com])的服务器的 IP 地址 (`216.58.215.78`)
- *TCP 握手.* 执行一次往返 (消息经过 客户端 → 服务器 → 客户端) 来初始化一个 TCP 连接到服务器
- *TLS 握手 (只针对 HTTPS 网站).* 执行两个往返 (消息经过 客服端 → 服务器 → 客服端 → 服务器 → 客服端) 来初始化安全的 TLS 会话

备注: HTTP/3 将会改变因为他将 [提高并且加速连接机制]仍然遥遥无期.

### dns-prefetch

`<link rel="dns-prefetch">`让浏览器提前执行DNS解析，当你知道你马上要连接一个域名，并且想加速首次连接时很有用。

DNS连接第三方域名的时候开始进行域名解析，可能在你加载gogole字体、从CDN加载React的时候，或者从服务器请求JSON API 相应的时候。

对一个新域名来说，解析通常需要花费20-120毫秒，仅仅对第一次从domain下载资源的时候起作用，但是它仍然很重要。如果你提前解析域名，你可能会节省第一次加载资源的时间。



**语法**

```html
<link rel="dns-prefetch" href="https://api.my-app.com" />
```

href 指向你要解析的域名，有没有(https)协议都行。



**什么时候使用**

**在你马上要使用域名的时候使用。**`<link rel="dns-prefetch" />`will 当你需要一些资源在第三方域名上，但是事先不知道什么资源时很有用。例如：

- 你的网站放在 `my-app.com`上， 发起来ajax请求到 `api.my-app.com`. 由于你使用JS发起的请求，浏览器不知道你请求到了该域名。
  使用 `<link rel="dns-prefetch">` 来解析 `api.my-app.com` 来加速首次请求
- 你的app放在 `my-app.com`, 使用 Google Fonts. Google Fonts 加载分两个阶段： 首先从 `fonts.googleapis.com`加载CSS文件 然后, CSS文件从 `fonts.gstatic.com`加载相应的字体文件.
  浏览器不知道你会从 `fonts.gstatic.com`加载字体, 所以使用 `<link rel="dns-prefetch">` 来提前解析域名

**用来直接加速第三方脚本和样式.** 假如你在页面中有一个第三方的资源，你确实需要更快速的加载他，添加该域名到`<link rel="dns-prefetch" />`上 . 他会指示浏览器把按照计划解析DNS域名。



**更多**

**非强制.** 浏览器不必遵守 `<link rel="dns-prefetch">` 指令. 意味着浏览器自行决定是否进行DNS解析 – 例如： 已经有很多域名的情况下或者其他情况浏览器可能就不会解析.

**DNS是啥.** 每个服务在互联网上有一个唯一的IP地址类似：`216.58.215.78`. 当你访问一个网站的时候你可以使用域名而不必输入IP地址(比如 `google.com`). 因为DNS (Domain Name System)
服务器提供了域名 (google.com) 和IP(216.58.215.78)的映射服务 .

要解析域名，浏览器必须先查找DNS服务器. 当连接一个第三方面域名的时候大概需要 20-120 ms .

**DNS 被缓存但是并不可靠.** 一些操作系统和浏览器会对DNS请求进行缓存. 如果你需要再次获取第三方域名的时候能节省时间，但是并不可靠 . Linux 系统通常 [不会缓存DNS].
Chrome 有 DNS 缓存, 但是 [有效期仅仅几分钟]. Windows 缓存 DNS 响应 [5天]

### prerender

`<link rel="prerender">` 可以让浏览器在不可见的tab加价URL并进行渲染. 当点击一个URL链接时，页面需要立即被渲染. 当你确定用户访问的下个页面时，并且尽快渲染时会很有用.

尽管很有用, `<link rel="prerender">` 主流浏览器支持的并不好. 查看 [更多详情]



**语法**


`href` 指向你希望在后台渲染的页面.



#### 总结

使用:

- `<link rel="preload">` – 当你接下来需要使用的资源时
- `<link rel="prefetch">` – 当你在下个页面需要的资源时
- `<link rel="preconnect">` – 当你知道你需要一个资源但是不知道具体的URL时
- `<link rel="dns-prefetch">` – 当你知道你需要一个资源但是不知道具体的URL时
- `<link rel="prerender">` – 当你确定用户要跳转的指定页面并且想加速

了解更多:

- [Preload, prefetch and priorities in Chrome](https://link.zhihu.com/?target=https%3A//medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf): Addy Osmani’s deep-dive into how Chrome handles preloading and how it affects performance
- [Prefetching, preloading, prebrowsing](https://link.zhihu.com/?target=https%3A//css-tricks.com/prefetching-preloading-prebrowsing/): Robin Rendle’s overview of all preload-related tags on CSS-Tricks