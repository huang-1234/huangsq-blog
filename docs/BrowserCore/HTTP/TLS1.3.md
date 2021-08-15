# TLS的由来





## TLS 1.3 VS TLS 1.2

HTTPS 加密时代已经来临，近两年，Google、Baidu、Facebook 等互联网巨头，不谋而合地开始大力推行 HTTPS， 2018 年 7 月 25 日，Chrome 68 上线，所有 HTTP 网站都会被明确标记为“不安全”。国内外大到 Google、Facebook 等巨头，小到个人博客在内的众多网站，以及登陆 Apple App Store 的 App，微信的小程序，都已经启用了全站 HTTPS，这也是未来互联网发展的趋势。

有得必有失，HTTPS 虽然增加了网站安全性，但因为 HTTPS 握手次数增加，会一定程度上降低用户访问速度。为了使 HTTPS 达到更快的数据传输性能，并且在传输过程中更加安全，又拍云 CDN 已支持 TLS 1.3 新特性。下文简单介绍下 TLS 1.3 的新特性，让你明白相较于TLS 1.2，TLS 1.3 强大在哪里。

## **带你认识 TLS**

通常所说的 HTTPS 协议，说白了就是 “HTTP 协议” 和 “SSL/TLS 协议” 的组合。SSL 是 “Secure Sockets Layer” 的缩写，中文意思为“安全套接层”，而 TLS 则是标准化之后的 SSL。

![img](https:////upload-images.jianshu.io/upload_images/80097-fbacd5272894082c.png?imageMogr2/auto-orient/strip|imageView2/2/w/519/format/webp)

TLS（Transport Layer Security Protocol，传输层安全协议）主要目的是提供隐私和数据两个通信应用之间的完整性。该协议由两层组成：TLS 记录协议（TLS Record）和 TLS 握手协议（TLS Handshake）。

当使用 TLS 时，客户端和服务器之间的连接具有以下一个或多个属性：

- 连接私密性：使用对称加密算法用于加密数据的传输，例如 AES [AES], RC4 [SCH] 等
- 可以使用公钥加密来验证通信方的身份
- 连接可靠性：发送的每个消息都使用 MAC（消息认证码） 进行完整性检查

## **低版本 TLS 之殇**

Netscape（网景公司） 在 1994 年时提出了 SSL 协议的原始规范， TLS 协议也经过了很多次版本的更新。目前低版本的 TLS （例如：SSL 3.0/TLS 1.0 等）存在许多严重漏洞。另外根据 Nist（美国国家标准与技术研究院）所说，现在没有补丁或修复程序能够充分修复低版本 TLS 的漏洞，尽快升级到高版本的 TLS 是最好的方法。

目前行业正处于 TLS 1.2 取代 TLS 1/1.1 的过渡时期，将来会有越来越多的互联网安全企业启用 TLS 1.2。它引入了 SHA-256 哈希算法，摒弃了 SHA-1，对增强数据完整性有着显著优势。

又拍云提供最低 TLS 版本管理功能，只需登陆又拍云控制台，选择服务，进入「配置」即可开启。配置过程中，选择的协议级别越高，相应的也就更安全，但是可以支持的浏览器也就越少，有可能会影响终端用户访问，请谨慎选择配置。

## **TLS 1.3 VS TLS 1.2，强大尽显**

TLS 1.3 是时隔九年对 TLS 1.2 等之前版本的新升级，也是迄今为止改动最大的一次。针对目前已知的安全威胁，IETF（Internet Engineering Task Force，互联网工程任务组） 正在制定 TLS 1.3 的新标准，使其有望成为有史以来最安全，但也最复杂的 TLS 协议。

TLS 1.3 与之前的协议有较大差异，主要在于：

- 相比过去的的版本，引入了新的密钥协商机制 — PSK
- 支持 0-RTT 数据传输，在建立连接时节省了往返时间
- 废弃了 3DES、RC4、AES-CBC 等加密组件，废弃了 SHA1、MD5 等哈希算法
- ServerHello 之后的所有握手消息采取了加密操作，可见明文大大减少
- 不再允许对加密报文进行压缩、不再允许双方发起重协商
- DSA 证书不再允许在 TLS 1.3 中使用

对比旧协议中的不足，TLS 1.3 确实可以称得上是向前迈了一大步。既避免之前版本出现的缺陷，也减少了 TLS 握手的时间。

总结一下，TLS 1.3 与以前的版本相比具有如下两个大的优势，分别是：

## **更快的访问速度**

为了对比 TLS 1.3 在 TLS 握手阶段的变化， 这里将 TLS 1.2 和 TLS 1.3 在 TLS 握手阶段进行对比。

![img](https:////upload-images.jianshu.io/upload_images/80097-deb83ba337d1da83.png?imageMogr2/auto-orient/strip|imageView2/2/w/572/format/webp)

△ TLS 1.2 完整握手框架（来自 RFC 5246）

从上图可以看出，使用 TLS 1.2 需要两次往返（ 2-RTT ）才能完成握手，然后才能发送请求。

![img](https:////upload-images.jianshu.io/upload_images/80097-ca53d3d086450b6b.png?imageMogr2/auto-orient/strip|imageView2/2/w/651/format/webp)

△ TLS 1.3 完整握手框架（来自 TLS 1.3 最新草案 ）

TLS 1.3 的握手不再支持静态的 RSA 密钥交换，这意味着必须使用带有前向安全的 Diffie-Hellman 进行全面握手。从上图可以看出，使用 TLS 1.3 协议只需要一次往返（ 1-RTT ）就可以完成握手。

相比 TLS 1.2，TLS 1.3 的握手时间减半。这意味着访问一个移动端网站，使用 TLS 1.3 协议，可能会减少将近 100ms 的时间。

## **更强的安全性**

TLS 的发展有 20 多年的历史，在之前的版本中，TLS 1.2 是高度可配置的，为了更好的兼容旧版本的浏览器，这意味着那些易受攻击的站点始终在运行着不安全的加密算法，这让互联网黑客有可乘之机。

TLS 1.3 在之前版本的基础上删除了那些不安全的加密算法，这些加密算法包括：

- RSA 密钥传输 —— 不支持前向安全性
- CBC 模式密码 —— 易受 BEAST 和 Lucky 13 攻击
- RC4 流密码 —— 在 HTTPS 中使用并不安全
- SHA-1 哈希函数 —— 建议以 SHA-2 取而代之
- 任意 Diffie-Hellman 组—— CVE-2016-0701 漏洞
- 输出密码 —— 易受 FREAK 和 LogJam 攻击

总之，TLS 1.3 相比老版本的 TLS 协议将会更加安全，这也代表着互联网安全的一大进步。

## **TLS 1.3 浏览器支持情况**

下面是各大浏览器的 TLS 1.3 支持情况：

![img](https:////upload-images.jianshu.io/upload_images/80097-ff5748925c253c32.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

目前最新的 Chrome 和 Firefox 都已支持 TLS 1.3，但需要手动开启：

Chrome 中需要将 [chrome://flags/](chrome://flags/) 中的 Maximum TLS version enabled 改为 TLS 1.3（Chrome 62 中需要将 TLS 1.3 改为 Enabled (Draft)

**推荐阅读：**

[科普 TLS 1.3 — 新特性与开启方式](https://link.zhihu.com/?target=https%3A//tech.upyun.com/article/286/1.html)

[用了 HTTPS 还不安全，问题就出在低版本 TLS 上](https://link.zhihu.com/?target=https%3A//tech.upyun.com/article/329/1.html)

