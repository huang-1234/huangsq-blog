## HTTP Cookie

> 首先我们来看看MDN是怎么描述Cookie的

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie 使基于[无状态](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#http_is_stateless_but_not_sessionless)的HTTP协议记录稳定的状态信息成为了可能。

Cookie 主要用于以下三个方面：

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

Cookie 曾一度用于客户端数据的存储，因当时并没有其它合适的存储办法而作为唯一的存储手段，但现在随着现代浏览器开始支持各种各样的存储方式，Cookie 渐渐被淘汰。由于服务器指定 Cookie 后，浏览器的每次请求都会携带 Cookie 数据，会带来额外的性能开销（尤其是在移动环境下）。新的浏览器API已经允许开发者直接将数据存储到本地，如使用 [Web storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) （本地存储和会话存储）或 [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 。

### 创建Cookie
当服务器收到 HTTP 请求时，服务器可以在响应头里面添加一个 Set-Cookie 选项。浏览器收到响应后通常会保存下 Cookie，之后对该服务器每一次请求中都通过  Cookie 请求头部将 Cookie 信息发送给服务器。另外，Cookie 的过期时间、域、路径、有效期、适用站点都可以根据需要来指定。

```http
Set-Cookie: <cookie名>=<cookie值>
```
**提示:** 如何在以下几种服务端程序中设置 `Set-Cookie` 响应头信息 :

- [PHP](https://secure.php.net/manual/en/function.setcookie.php)
- [Node.JS](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_response_setheader_name_value)
- [Python](https://docs.python.org/3/library/http.cookies.html)
- [Ruby on Rails](https://api.rubyonrails.org/classes/ActionDispatch/Cookies.html)

> 具体我们来看下Nodejs下的服务器编程是如何设置cookie的

### response.setHeader(name, value)

Added in: v0.4.0

- `name` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- `value` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Sets a single header value for implicit headers. If this header already exists in the to-be-sent headers, its value will be replaced. Use an array of strings here to send multiple headers with the same name.

Example:

```js
response.setHeader('Content-Type', 'text/html');
```

or

```js
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
```

Attempting to set a header field name or value that contains invalid characters will result in a [`TypeError`](https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_class_typeerror) being thrown.

When headers have been set with [`response.setHeader()`](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_response_setheader_name_value), they will be merged with any headers passed to [`response.writeHead()`](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_response_writehead_statuscode_statusmessage_headers), with the headers passed to [`response.writeHead()`](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_response_writehead_statuscode_statusmessage_headers) given precedence.

```js
// returns content-type = text/plain
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

### 定义 Cookie 的生命周期

Cookie 的生命周期可以通过两种方式定义：

会话期 Cookie 是最简单的 Cookie：浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。会话期Cookie不需要指定过期时间（Expires）或者有效期（Max-Age）。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期Cookie 也会被保留下来，就好像浏览器从来没有关闭一样，这会导致 Cookie 的生命周期无限期延长。
持久性 Cookie 的生命周期取决于过期时间（Expires）或有效期（Max-Age）指定的一段时间。
例如：

```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```
提示：当Cookie的过期时间被设定时，设定的日期和时间只与客户端相关，而不是服务端。

### 限制访问 Cookie

有两种方法可以确保 `Cookie` 被安全发送，并且不会被意外的参与者或脚本访问：`Secure` 属性和`HttpOnly` 属性。

标记为 `Secure` 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端，因此可以预防 [man-in-the-middle](https://developer.mozilla.org/zh-CN/docs/Glossary/MitM) 攻击者的攻击。但即便设置了 `Secure` 标记，敏感信息也不应该通过 Cookie 传输，因为 Cookie 有其固有的不安全性，`Secure` 标记也无法提供确实的安全保障, 例如，可以访问客户端硬盘的人可以读取它。

从 Chrome 52 和 Firefox 52 开始，不安全的站点（`http:`）无法使用Cookie的 `Secure` 标记。

JavaScript [`Document.cookie`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie) API 无法访问带有 `HttpOnly` 属性的cookie；此类 Cookie 仅作用于服务器。例如，持久化服务器端会话的 Cookie 不需要对 JavaScript 可用，而应具有 `HttpOnly` 属性。此预防措施有助于缓解[跨站点脚本（XSS）](https://wiki.developer.mozilla.org/zh-CN/docs/Web/Security/Types_of_attacks#Cross-site_scripting_(XSS))攻击。

```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

### Cookie 的作用域

`Domain` 和 `Path` 标识定义了Cookie的*作用域：*即允许 Cookie 应该发送给哪些URL。

#### Domain 属性

`Domain` 指定了哪些主机可以接受 Cookie。如果不指定，默认为 [origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)，**不包含子域名**。如果指定了`Domain`，则一般包含子域名。因此，指定 `Domain` 比省略它的限制要少。但是，当子域需要共享有关用户的信息时，这可能会有所帮助。 

例如，如果设置 `Domain=mozilla.org`，则 Cookie 也包含在子域名中（如`developer.mozilla.org`）。

#### Path 属性

`Path` 标识指定了主机下的哪些路径可以接受 Cookie（该 URL 路径必须存在于请求 URL 中）。以字符 `%x2F` ("/") 作为路径分隔符，子路径也会被匹配。

例如，设置 `Path=/docs`，则以下地址都会匹配：

- `/docs`
- `/docs/Web/`
- `/docs/Web/HTTP`

#### SameSite attribute

`SameSite` Cookie 允许服务器要求某个 cookie 在跨站请求时不会被发送，（其中  [Site (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Site) 由可注册域定义），从而可以阻止跨站请求伪造攻击（[CSRF](https://developer.mozilla.org/zh-CN/docs/Glossary/CSRF)）。

SameSite cookies 是相对较新的一个字段，[所有主流浏览器都已经得到支持](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#browser_compatibility)。

下面是例子：

```http
Set-Cookie: key=value; SameSite=Strict
```

SameSite 可以有下面三种值：

- `**None**`**。**浏览器会在同站请求、跨站请求下继续发送 cookies，不区分大小写。

- **`Strict`。**浏览器将只在访问相同站点时发送 cookie。（在原有 Cookies 的限制条件上的加强，如上文 “Cookie 的作用域” 所述）

- **`Lax`。**与 **`Strict`** 类似，但用户从外部站点导航至URL时（例如通过链接）除外。 在新版本浏览器中，为默认选项，Same-site cookies 将会为一些跨站子请求保留，如图片加载或者 frames 的调用，但只有当用户从外部站点导航到URL时才会发送。如 link 链接


```http
以前，如果 SameSite 属性没有设置，或者没有得到运行浏览器的支持，那么它的行为等同于 None，Cookies 会被包含在任何请求中——包括跨站请求。

大多数主流浏览器正在将 SameSite 的默认值迁移至 Lax。如果想要指定 Cookies 在同站、跨站请求都被发送，现在需要明确指定 SameSite 为 None。
```