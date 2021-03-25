# HTTP基础

先看一下最常见的 HTTP 用法：

- GET表示请求访问服务器的类型，称为方法（method）。
- /index.htm 指明了请求访问的资源对象， 也叫做请求 URI（request-URI）。
- HTTP/1.1，即 HTTP 的版本号，用来提示客户端使用的 HTTP 协议功能。

请求报文是由请求方法、请求 URI、协议版本、可选的请求首部字段 和内容实体构成的。

- 在起始行开头的 HTTP/1.1 表示服务器对应的 HTTP 版本。
- 200 OK 表示请求的处理结果的状态码（status code）和原因短语（reason-phrase）。下一行显示了创建响应的日期时间，是首部字段（header field）内的一个属性。

- 之后的内容称为资源实体的主体（entity body）。

响应报文基本上由协议版本、状态码（表示请求成功或失败的数字代 码）、用以解释状态码的原因短语、可选的响应首部字段以及实体主体构成。

## **HTTP** 是不保存状态的协议 

HTTP 是一种不保存状态，即无状态（stateless）协议。HTTP 协议自身不对请求和响应之间的通信状态进行保存。也就是说在 HTTP 这个级别，协议对于发送过的请求或响应都不做持久化处理。

## 请求 **URI** 定位资源 

HTTP 协议使用 URI 定位互联网上的资源。正是因为 URI 的特定功能，在互联网上任意位置的资源都能访问到。 

如果不是访问特定资源而是对服务器本身发起请求，可以 用一个 * 来代替请求 URI。

##  **HTTP** 方法

### **GET** ：获取资源 

GET 方法用来请求访问已被 URI 识别的资源。指定的资源经服务器端解析后返回响应内容。

### **POST**：传输实体主体

POST 方法用来传输实体的主体。 

### **PUT**：传输文件 

要求在请求报文的主体中包含文件内容，然后保存到请求 URI 指定的位置。

### **HEAD**：获得报文首部 

用于确认 URI 的有效性及资源更新的日期时间等。

### **DELETE**：删除文件 

DELETE 方法按请求 URI 删除指定的资源。

### **OPTIONS**：询问支持的方法

OPTIONS 方法用来查询针对请求 URI 指定的资源支持的方法。

### **TRACE**：追踪路径 

TRACE 方法是让 Web 服务器端将之前的请求通信返回给客户端的方法。

发送请求时，在 Max-Forwards 首部字段中填入数值，每经过一个服务器端就将该数字减 1，当数值刚好减到 0 时，就停止继续传输，最 后接收到请求的服务器端则返回状态码 200 OK 的响应。

但是它容易引发 XST（Cross-Site Tracing，跨站追踪）攻击，

### **CONNECT**：要求用隧道协议连接代理

CONNECT 方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行 TCP通信。主要使用 SSL（Secure Sockets Layer，安全套接层）和 TLS（Transport Layer Security，传输层安全）协议把通信内容加密后经网络隧道传输。

## 持久连接

持久连接（HTTP Persistent Connections，也称为 HTTP keep-alive 或 HTTP connection reuse）的特点是，只要任意一端 没有明确提出断开连接，则保持 TCP 连接状态。

好处在于减少了 TCP 连接的重复建立和断开所造成的额外开销，减轻了服务器端的负载。另外，减少开销的那部分时间，使 HTTP 请求和响应能够更早地结束，这样 Web 页面的显示速度也就相应提高了。

持久连接使得多数请求以管线化（pipelining）方式发送成为可能。从前发送请求后需等待并收到响应，才能发送下一个请求。管线化技术出现后，不用等待响应亦可直接发送下一个请求。这样就能够做到同时并行发送多个请求，而不需要一个接一个地等待响应了。后面有文章会进行介绍。

## 使用 **Cookie** 进行状态管理

Cookie 技术通过在请求和响应报文中写入 Cookie 信息来控制客户端的状态。

Cookie 会根据从服务器端发送的响应报文内的一个叫做 **Set-Cookie** 的首部字段信息，通知客户端保存 Cookie。当下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入 Cookie 值后发送出去。

服务器端发现客户端发送过来的 Cookie 后，会去检查究竟是从哪一个客户端发来的连接请求，然后对比服务器上的记录，最后得到之前的状态信息。

HTTP 请求报文和响应报文的内容如下

1. 请求报文（没有 Cookie 信息的状态）

   ![image-20210213232817394](C:\Users\陈怿龙\AppData\Roaming\Typora\typora-user-images\image-20210213232817394.png)

2. 响应报文（服务器端生成 Cookie 信息）

   ![image-20210213232843791](C:\Users\陈怿龙\AppData\Roaming\Typora\typora-user-images\image-20210213232843791.png)

3. 请求报文（自动发送保存着的 **Cookie** 信息） 

   ![image-20210213232912267](C:\Users\陈怿龙\AppData\Roaming\Typora\typora-user-images\image-20210213232912267.png)

## **HTTP** 报文

用于 HTTP 协议交互的信息被称为 HTTP 报文。

HTTP 报文本身是由多行（用 CR+LF 作换行符）数据构成的字符串文本。

HTTP 报文大致可分为报文首部和报文主体两块。两者由最初出现的空行（CR+LF）来划分。通常，并不一定要有报文主体。

### 报文主体和实体主体的差异 

- 报文（message） 是 HTTP 通信中的基本单位，由 8 位组字节流（octet sequence， 其中 octet 为 8 个比特）组成，通过 HTTP 通信传输。
- 实体（entity） 作为请求或响应的有效载荷数据（补充项）被传输，其内容由实体首部和实体主体组成。

## **HTTP** 状态码

状态码的职责是当客户端向服务器端发送请求时，描述返回的请求结果。借助状态码，用户可以知道服务器端是正常处理了请求，还是出现了错误。

### 1XX

- **100 Continue** 继续。客户端应继续其请求
- **101 Switching Protocols**切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到 HTTP 的新版本协议

### **2XX** 成功 

- **200 OK**： 表示从客户端发来的请求在服务器端被正常处理了。 
- **201 Created**： 已创建。成功请求并创建了新的资源。
- **202** **Accepted**： 已接受。已经接受请求,但未处理完成
- **204 No Content**：该状态码代表服务器接收的请求已成功处理，但在返回的响应报文中不含实体的主体部分。
- **206 Partial Content** ：该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的 GET 请求。响应报文中包含由 Content-Range 指定范围的实体内容。

### 3XX 重定向 

3XX 响应结果表明浏览器需要执行某些特殊的处理以正确处理请求。

- **301 Moved Permanently** ：永久性重定向。该状态码表示请求的资源已被分配了新的 URI，以后应使用资源现在所指的 URI。也就是说，如果已经把资源对应的 URI 保存为书签了，这时应该按 Location 首部字段提示的 URI 重新保存。

- **302 Found**：临时性重定向。该状态码表示请求的资源已被分配了新的 URI，希望 用户（本次）能使用新的 URI 访问。

- **303 See Other**：该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源。

- **304 Not Modified** ：该状态码表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况。304 状态码返回时，不包含任何响应的主体部分。304 虽然被划分在 3XX 类别中，但是和重定向没有关系。

- **307 Temporary Redirect** ：临时重定向。该状态码与 302 Found 有着相同的含义。307 会遵照浏览器标准，不会从 POST 变成 GET。

### **4XX** 客户端错误 

4XX 的响应结果表明客户端是发生错误的原因所在

- **400 Bad Request**：该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。

- **401 Unauthorized** ：该状态码表示发送的请求需要有通过 HTTP 认证（BASIC 认证、 DIGEST 认证）的认证信息。另外若之前已进行过 1 次请求，则表示用户认证失败。

  当浏览器初次接收到 401 响应，会弹出认证用的对话窗口。 

- **403 Forbidden** ：该状态码表明对请求资源的访问被服务器拒绝了。

- **404 Not Found** ：该状态码表明服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。 

### **5XX** 服务器错误

- **500 Internal Server Error**：该状态码表明服务器端在执行请求时发生了错误。
- **503 Service Unavailable**：该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。

## 浏览器端发起 HTTP 请求流程

### 构建请求

首先，浏览器构建请求行信息，构建好后，浏览器准备发起网络请求。

```
GET /index.html HTTP1.1
```

### 查找缓存

在真正发起网络请求之前，浏览器会先在浏览器缓存中查询是否有要请求的文件。其中，浏览器缓存是一种在本地保存资源副本，以供下次请求时直接使用的技术。

当浏览器发现请求的资源已经在浏览器缓存中存有副本，它会拦截请求，返回该资源的副本，并直接结束请求，而不会再去源服务器重新下载。这样做的好处有：

- 缓解服务器端压力，提升性能（获取资源的耗时更短了）；
- 对于网站来说，缓存是实现快速资源加载的重要组成部分。

如果缓存查找失败，就会进入网络请求过程了。

### 准备 IP 地址和端口

HTTP 封装好请求的文本信息后，使用 TCP/IP 将其发到网络上，所以 HTTP 开始工作时，浏览器需要通过 TCP 与服务器建立连接。而 TCP 建立连接第一步就是需要准备 IP 地址和端口号。

浏览器会请求 DNS 返回域名对应的 IP。当然浏览器还提供了 DNS 数据缓存服务，如果某个域名已经解析过了，那么浏览器会缓存解析的结果，以供下次查询时直接使用，这样也会减少一次网络请求。

拿到 IP 之后，接下来就需要获取端口号了。

### 等待 TCP 队列

Chrome 有个机制，同一个域名同时最多只能建立 6 个 TCP 连接，如果在同一个域名下同时有 10 个请求发生，那么其中 4 个请求会进入排队等待状态，直至进行中的请求完成。

### 建立 TCP 连接

HTTP 工作开始之前，浏览器通过 TCP 与服务器建立连接。

### 发送 HTTP 请求

一旦建立了 TCP 连接，浏览器就可以和服务器进行通信了。而 HTTP 中的数据正是在这个通信过程中传输的。

浏览器会向服务器发送请求行，它包括了请求方法、请求 URI（Uniform Resource Identifier）和 HTTP 版本协议。

## 常用HTTP请求头

| 协议头              | 说明                                                         | 示例                                                    | 状态       |
| :------------------ | :----------------------------------------------------------- | :------------------------------------------------------ | :--------- |
| Accept              | 可接受的响应内容类型（`Content-Types`）。                    | `Accept: text/plain`                                    | 固定       |
| Accept-Charset      | 可接受的字符集                                               | `Accept-Charset: utf-8`                                 | 固定       |
| Accept-Encoding     | 可接受的响应内容的编码方式。                                 | `Accept-Encoding: gzip, deflate`                        | 固定       |
| Accept-Language     | 可接受的响应内容语言列表。                                   | `Accept-Language: en-US`                                | 固定       |
| Accept-Datetime     | 可接受的按照时间来表示的响应内容版本                         | Accept-Datetime: Sat, 26 Dec 2015 17:30:00 GMT          | 临时       |
| Authorization       | 用于表示HTTP协议中需要认证资源的认证信息                     | Authorization: Basic OSdjJGRpbjpvcGVuIANlc2SdDE==       | 固定       |
| Cache-Control       | 用来指定当前的请求/回复中的，是否使用缓存机制。              | `Cache-Control: no-cache`                               | 固定       |
| Connection          | 客户端（浏览器）想要优先使用的连接类型                       | `Connection: keep-alive``Connection: Upgrade`           | 固定       |
| Cookie              | 由之前服务器通过`Set-Cookie`（见下文）设置的一个HTTP协议Cookie | `Cookie: $Version=1; Skin=new;`                         | 固定：标准 |
| Content-Length      | 以8进制表示的请求体的长度                                    | `Content-Length: 348`                                   | 固定       |
| Content-MD5         | 请求体的内容的二进制 MD5 散列值（数字签名），以 Base64 编码的结果 | Content-MD5: oD8dH2sgSW50ZWdyaIEd9D==                   | 废弃       |
| Content-Type        | 请求体的MIME类型 （用于POST和PUT请求中）                     | Content-Type: application/x-www-form-urlencoded         | 固定       |
| Date                | 发送该消息的日期和时间（以[RFC 7231](http://tools.ietf.org/html/rfc7231#section-7.1.1.1)中定义的"HTTP日期"格式来发送） | Date: Dec, 26 Dec 2015 17:30:00 GMT                     | 固定       |
| Expect              | 表示客户端要求服务器做出特定的行为                           | `Expect: 100-continue`                                  | 固定       |
| From                | 发起此请求的用户的邮件地址                                   | `From: user@itbilu.com`                                 | 固定       |
| Host                | 表示服务器的域名以及服务器所监听的端口号。如果所请求的端口是对应的服务的标准端口（80），则端口号可以省略。 | `Host: www.itbilu.com:80``Host: www.itbilu.com`         | 固定       |
| If-Match            | 仅当客户端提供的实体与服务器上对应的实体相匹配时，才进行对应的操作。主要用于像 PUT 这样的方法中，仅当从用户上次更新某个资源后，该资源未被修改的情况下，才更新该资源。 | If-Match: "9jd00cdj34pss9ejqiw39d82f20d0ikd"            | 固定       |
| If-Modified-Since   | 允许在对应的资源未被修改的情况下返回304未修改                | If-Modified-Since: Dec, 26 Dec 2015 17:30:00 GMT        | 固定       |
| If-None-Match       | 允许在对应的内容未被修改的情况下返回304未修改（ 304 Not Modified ），参考 超文本传输协议 的实体标记 | If-None-Match: "9jd00cdj34pss9ejqiw39d82f20d0ikd"       | 固定       |
| If-Range            | 如果该实体未被修改过，则向返回所缺少的那一个或多个部分。否则，返回整个新的实体 | If-Range: "9jd00cdj34pss9ejqiw39d82f20d0ikd"            | 固定       |
| If-Unmodified-Since | 仅当该实体自某个特定时间以来未被修改的情况下，才发送回应。   | If-Unmodified-Since: Dec, 26 Dec 2015 17:30:00 GMT      | 固定       |
| Max-Forwards        | 限制该消息可被代理及网关转发的次数。                         | `Max-Forwards: 10`                                      | 固定       |
| Origin              | 发起一个针对[跨域资源共享](http://itbilu.com/javascript/js/VkiXuUcC.html)的请求（该请求要求服务器在响应中加入一个`Access-Control-Allow-Origin`的消息头，表示访问控制所允许的来源）。 | `Origin: http://www.itbilu.com`                         | 固定: 标准 |
| Pragma              | 与具体的实现相关，这些字段可能在请求/回应链中的任何时候产生。 | `Pragma: no-cache`                                      | 固定       |
| Proxy-Authorization | 用于向代理进行认证的认证信息。                               | Proxy-Authorization: Basic IOoDZRgDOi0vcGVuIHNlNidJi2== | 固定       |
| Range               | 表示请求某个实体的一部分，字节偏移以0开始。                  | `Range: bytes=500-999`                                  | 固定       |
| Referer             | 表示浏览器所访问的前一个页面，可以认为是之前访问页面的链接将浏览器带到了当前页面。`Referer`其实是`Referrer`这个单词，但RFC制作标准时给拼错了，后来也就将错就错使用`Referer`了。 | Referer: http://itbilu.com/nodejs                       | 固定       |
| TE                  | 浏览器预期接受的传输时的编码方式：可使用回应协议头`Transfer-Encoding`中的值（还可以使用"trailers"表示数据传输时的分块方式）用来表示浏览器希望在最后一个大小为0的块之后还接收到一些额外的字段。 | `TE: trailers,deflate`                                  | 固定       |
| User-Agent          | 浏览器的身份标识字符串                                       | `User-Agent: Mozilla/……`                                | 固定       |
| Upgrade             | 要求服务器升级到一个高版本协议。                             | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11          | 固定       |
| Via                 | 告诉服务器，这个请求是由哪些代理发出的。                     | Via: 1.0 fred, 1.1 itbilu.com.com (Apache/1.1)          | 固定       |
| Warning             | 一个一般性的警告，表示在实体内容体中可能存在错误。           | Warning: 199 Miscellaneous warning                      | 固定       |

## 常用的HTTP响应头

| 响应头                      | 说明                                                         | 示例                                                         | 状态       |
| :-------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :--------- |
| Access-Control-Allow-Origin | 指定哪些网站可以`跨域源资源共享`                             | `Access-Control-Allow-Origin: *`                             | 临时       |
| Accept-Patch                | 指定服务器所支持的文档补丁格式                               | Accept-Patch: text/example;charset=utf-8                     | 固定       |
| Accept-Ranges               | 服务器所支持的内容范围                                       | `Accept-Ranges: bytes`                                       | 固定       |
| Age                         | 响应对象在代理缓存中存在的时间，以秒为单位                   | `Age: 12`                                                    | 固定       |
| Allow                       | 对于特定资源的有效动作;                                      | `Allow: GET, HEAD`                                           | 固定       |
| Cache-Control               | 通知从服务器到客户端内的所有缓存机制，表示它们是否可以缓存这个对象及缓存有效时间。其单位为秒 | `Cache-Control: max-age=3600`                                | 固定       |
| Connection                  | 针对该连接所预期的选项                                       | `Connection: close`                                          | 固定       |
| Content-Disposition         | 对已知MIME类型资源的描述，浏览器可以根据这个响应头决定是对返回资源的动作，如：将其下载或是打开。 | Content-Disposition: attachment; filename="fname.ext"        | 固定       |
| Content-Encoding            | 响应资源所使用的编码类型。                                   | `Content-Encoding: gzip`                                     | 固定       |
| Content-Language            | 响就内容所使用的语言                                         | `Content-Language: zh-cn`                                    | 固定       |
| Content-Length              | 响应消息体的长度，用8进制字节表示                            | `Content-Length: 348`                                        | 固定       |
| Content-Location            | 所返回的数据的一个候选位置                                   | `Content-Location: /index.htm`                               | 固定       |
| Content-MD5                 | 响应内容的二进制 MD5 散列值，以 Base64 方式编码              | Content-MD5: IDK0iSsgSW50ZWd0DiJUi==                         | 已淘汰     |
| Content-Range               | 如果是响应部分消息，表示属于完整消息的哪个部分               | Content-Range: bytes 21010-47021/47022                       | 固定       |
| Content-Type                | 当前内容的`MIME`类型                                         | Content-Type: text/html; charset=utf-8                       | 固定       |
| Date                        | 此条消息被发送时的日期和时间(以[RFC 7231](http://tools.ietf.org/html/rfc7231#section-7.1.1.1)中定义的"HTTP日期"格式来表示) | Date: Tue, 15 Nov 1994 08:12:31 GMT                          | 固定       |
| ETag                        | 对于某个资源的某个特定版本的一个标识符，通常是一个 消息散列  | ETag: "737060cd8c284d8af7ad3082f209582d"                     | 固定       |
| Expires                     | 指定一个日期/时间，超过该时间则认为此回应已经过期            | Expires: Thu, 01 Dec 1994 16:00:00 GMT                       | 固定: 标准 |
| Last-Modified               | 所请求的对象的最后修改日期(按照 RFC 7231 中定义的“超文本传输协议日期”格式来表示) | Last-Modified: Dec, 26 Dec 2015 17:30:00 GMT                 | 固定       |
| Link                        | 用来表示与另一个资源之间的类型关系，此类型关系是在[RFC 5988](https://tools.ietf.org/html/rfc5988)中定义 | `Link: `; rel="alternate"                                    | 固定       |
| Location                    | 用于在进行重定向，或在创建了某个新资源时使用。               | Location: http://www.itbilu.com/nodejs                       | 固定       |
| P3P                         | P3P策略相关设置                                              | P3P: CP="This is not a P3P policy!                           | 固定       |
| Pragma                      | 与具体的实现相关，这些响应头可能在请求/回应链中的不同时候产生不同的效果 | `Pragma: no-cache`                                           | 固定       |
| Proxy-Authenticate          | 要求在访问代理时提供身份认证信息。                           | `Proxy-Authenticate: Basic`                                  | 固定       |
| Public-Key-Pins             | 用于防止中间攻击，声明网站认证中传输层安全协议的证书散列值   | Public-Key-Pins: max-age=2592000; pin-sha256="……";           | 固定       |
| Refresh                     | 用于重定向，或者当一个新的资源被创建时。默认会在5秒后刷新重定向。 | Refresh: 5; url=http://itbilu.com                            |            |
| Retry-After                 | 如果某个实体临时不可用，那么此协议头用于告知客户端稍后重试。其值可以是一个特定的时间段(以秒为单位)或一个超文本传输协议日期。 | 示例1:Retry-After: 120示例2: Retry-After: Dec, 26 Dec 2015 17:30:00 GMT | 固定       |
| Server                      | 服务器的名称                                                 | `Server: nginx/1.6.3`                                        | 固定       |
| Set-Cookie                  | 设置`HTTP cookie`                                            | Set-Cookie: UserID=itbilu; Max-Age=3600; Version=1           | 固定: 标准 |
| Status                      | 通用网关接口的响应头字段，用来说明当前HTTP连接的响应状态。   | `Status: 200 OK`                                             |            |
| Trailer                     | `Trailer`用户说明传输中分块编码的编码信息                    | `Trailer: Max-Forwards`                                      | 固定       |
| Transfer-Encoding           | 用表示实体传输给用户的编码形式。包括：`chunked`、`compress`、 `deflate`、`gzip`、`identity`。 | Transfer-Encoding: chunked                                   | 固定       |
| Upgrade                     | 要求客户端升级到另一个高版本协议。                           | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11               | 固定       |
| Vary                        | 告知下游的代理服务器，应当如何对以后的请求协议头进行匹配，以决定是否可使用已缓存的响应内容而不是重新从原服务器请求新的内容。 | `Vary: *`                                                    | 固定       |
| Via                         | 告知代理服务器的客户端，当前响应是通过什么途径发送的。       | Via: 1.0 fred, 1.1 itbilu.com (nginx/1.6.3)                  | 固定       |
| Warning                     | 一般性警告，告知在实体内容体中可能存在错误。                 | Warning: 199 Miscellaneous warning                           | 固定       |
| WWW-Authenticate            | 表示在请求获取这个实体时应当使用的认证模式。                 | `WWW-Authenticate: Basic`                                    | 固定       |