# HTTP3 的由来





> 从 1989 年万维网（www）诞生，HTTP（HyperText Transfer Protocol）经历了众多版本迭代，WebSocket 也在期间萌芽。1991 年 HTTP0.9 被发明。1996 年出现了 HTTP1.0。2015 年 HTTP2 正式发布。2020 年 HTTP3 或能正式使用。以下将会简单介绍。

## **HTTP1.1 与 HTTP2**

### **HTTP1.1 的缺陷**

1. 高延迟 — 队头阻塞(Head-Of-Line Blocking)
2. 无状态特性 — 阻碍交互
3. 明文传输 — 不安全性
4. 不支持服务端推送

### **队头阻塞**

队头阻塞是指当顺序发送的请求序列中的一个请求因为某种原因被阻塞时，在后面排队的所有请求也一并被阻塞，会导致客户端迟迟收不到数据。

针对队头阻塞：

1.将同一页面的资源分散到不同域名下，提升连接上限。虽然能公用一个 TCP 管道，但是在一个管道中同一时刻只能处理一个请求，在当前的请求没有结束之前，其他的请求只能处于阻塞状态。

2.减少请求数量

3.内联一些资源：css、base64 图片等

4.合并小文件减少资源数

### **无状态特性**

无状态是指协议对于连接状态没有**记忆能力**。纯净的 HTTP 是没有 cookie 等机制的，每一个连接都是一个新的连接。上一次请求验证了用户名密码，而下一次请求服务器并不知道它与上一条请求有何关联，换句话说就是**掉登录态**。

### **不安全性**

传输内容没有加密，中途可能被篡改和劫持。

### **SPDY 协议**

SPDY 是由 google 推行的改进版本的 HTTP1.1 （那时候还没有 HTTP2）。

![img](HTTP3.assets/v2-7afd90538135334355eff37cdd34e4fb_720w.jpg)

特性：

1. 多路复用 — 解决队头阻塞
2. 头部压缩 — 解决巨大的 HTTP 头部
3. 请求优先级 — 先获取重要数据
4. 服务端推送 — 填补空缺
5. 提高安全性

### **多路复用**

SPDY 允许在一个连接上无限制并发流。因为请求在一个通道上，TCP 效率更高（参考 [TCP 拥塞控制](https://zhuanlan.zhihu.com/p/37379780) 中的**慢启动**）。更少的网络连接，发出更密集的包。

### **头部压缩**

使用专门的 HPACK 算法，每次请求和响应只发送差异头部，一般可以达到 50%~90% 的高压缩率。

### **请求优先级**

虽然无限的并发流解决了队头阻塞的问题，但如果带宽受限，客户端可能会因防止堵塞通道而阻止请求。在网络通道被非关键资源堵塞时，高优先级的请求会被优先处理。

### **服务端推送**

[服务端推送（ServerPush）](https://link.zhihu.com/?target=http%3A//www.ruanyifeng.com/blog/2018/03/http2_server_push.html)，可以让服务端主动把资源文件推送给客户端。当然客户端也有权利选择是否接收。

### **提高安全性**

支持使用 HTTPS 进行加密传输。

## **HTTP2**

HTTP2 基于 SPDY，专注于性能，最大的一个目标是在用户和网站间只用一个连接。

新增特性：

1. 二进制分帧 - HTTP2 性能增强的核心
2. 多路复用 - 解决串行的文件传输和连接数过多

### **二进制分帧**

首先，HTTP2 没有改变 HTTP1 的语义，只是在应用层使用二进制分帧方式传输。因此，也引入了新的通信单位：**帧、消息、流**。

分帧有什么好处？服务器单位时间接收到的请求数变多，可以提高并发数。最重要的是，为多路复用提供了底层支持。

### **多路复用**

一个域名对应一个连接，一个流代表了一个完整的**请求-响应**过程。**帧**是最小的数据单位，每个**帧**会标识出该帧属于哪个**流**，**流**也就是多个帧组成的数据流。多路复用，就是在一个 TCP 连接中可以存在多个流。[演示](https://link.zhihu.com/?target=https%3A//http2.akamai.com/demo)

![img](HTTP3.assets/v2-f849a492f395db89e1c340b5468e18a0_720w.jpg)

## **HTTP2 的缺陷**

1. TCP 以及 TCP+TLS 建立连接的延时
2. TCP 的队头阻塞并没有彻底解决
3. 多路复用导致服务器压力上升
4. 多路复用容易 Timeout

### **建连延时**

TCP 连接需要和服务器进行**三次握手**，即消耗完 1.5 个 RTT 之后才能进行数据传输。

TLS 连接有两个版本—— TLS1.2 和 TLS1.3，每个版本建立连接所花的时间不同，大致需要 1~2 个 RTT。

RTT（Round-Trip Time）:
往返时延。表示从发送端发送数据开始，到发送端收到来自接收端的确认（接收端收到数据后便立即发送确认），总共经历的时延。

### **队头阻塞没有彻底解决**

TCP 为了保证可靠传输，有一个“超时重传”机制，丢失的包必须等待重传确认。HTTP2 出现丢包时，整个 TCP 都要等待重传，那么就会阻塞该 TCP 连接中的所有请求。

![img](HTTP3.assets/v2-0675aa8e0177293bf5abbfb2c0fc164b_720w.jpg)

RTO：英文全称是 Retransmission TimeOut，即重传超时时间； RTO 是一个动态值，会根据网络的改变而改变。RTO 是根据给定连接的往返时间 RTT 计算出来的。 接收方返回的 ack 是希望收到的下一组包的序列号。

### **多路复用导致服务器压力上升**

多路复用没有限制同时请求数。请求的平均数量与往常相同，但实际会有许多请求的短暂爆发，导致瞬时 QPS 暴增。

### **多路复用容易 Timeout**

大批量的请求同时发送，由于 HTTP2 连接内存在多个并行的流，而网络带宽和服务器资源有限，每个流的资源会被稀释，虽然它们开始时间相差更短，但却都可能超时。

即使是使用 Nginx 这样的负载均衡器，想正确进行节流也可能很棘手。 其次，就算你向应用程序引入或调整排队机制，但一次能处理的连接也是有限的。如果对请求进行排队，还要注意在响应超时后丢弃请求，以避免浪费不必要的资源。[引用](https://link.zhihu.com/?target=https%3A//www.lucidchart.com/techblog/2019/04/10/why-turning-on-http2-was-a-mistake/)

## **QUIC**

### **简介**

Google
在推 SPDY 的时候就已经意识到了这些问题，于是就另起炉灶搞了一个基于 UDP 协议的 QUIC 协议。而这个就是 HTTP3。它真正“完美”地解决了“队头阻塞”问题。

![img](HTTP3.assets/v2-042349861ba29fc613bd2364bb3f3881_720w.jpg)

### **主要特点**

1. 改进的拥塞控制、可靠传输
2. 快速握手
3. 集成了 TLS 1.3 加密
4. 多路复用
5. 连接迁移

### **改进的拥塞控制、可靠传输**

从拥塞算法和可靠传输本身来看，QUIC 只是按照 TCP 协议重新实现了一遍，那么 QUIC 协议到底改进在哪些方面呢？主要有如下几点：

**1. 可插拔 — 应用程序层面就能实现不同的拥塞控制算法。**

一个应用程序的不同连接也能支持配置不同的拥塞控制。 应用程序不需要停机和升级就能实现拥塞控制的变更，可以针对不同业务，不同网络制式，甚至不同的 RTT，使用不同的拥塞控制算法。

关于应用层的可插拔拥塞控制模拟，可以对 socket 上的流为对象进行实验。

**2. 单调递增的 Packet Number — 使用 Packet Number 代替了 TCP 的 seq。**

每个 Packet Number 都严格递增，也就是说就算 Packet N 丢失了，重传的 Packet
N 的 Packet
Number 已经不是 N，而是一个比 N 大的值。而 TCP 重传策略存在二义性，比如客户端发送了一个请求，一个 RTO 后发起重传，而实际上服务器收到了第一次请求，并且响应已经在路上了，当客户端收到响应后，得出的 RTT 将会比真实 RTT 要小。当 Packet N 唯一之后，就可以计算出正确的 RTT。

**3. 不允许 Reneging — 一个 Packet 只要被 Ack，就认为它一定被正确接收。**

Reneging 的意思是，接收方有权把已经报给发送端 [SACK（Selective Acknowledgment）](https://link.zhihu.com/?target=https%3A//allen-kevin.github.io/2017/03/01/TCP%E9%87%8D%E7%82%B9%E7%B3%BB%E5%88%97%E4%B9%8Bsack%E4%BB%8B%E7%BB%8D/) 里的数据给丢了（如接收窗口不够而丢弃乱序的包）。

QUIC 中的 ACK 包含了与 TCP 中 SACK 等价的信息，但 QUIC 不允许任何（包括被确认接受的）数据包被丢弃。这样不仅可以简化发送端与接收端的实现难度，还可以减少发送端的内存压力。

**4. 前向纠错（FEC）**

早期的 QUIC 版本存在一个丢包恢复机制，但后来由于增加带宽消耗和效果一般而**废弃**。FEC 中，QUIC 数据帧的数据混合原始数据和冗余数据，来确保无论到达接收端的 n 次传输内容是什么，接收端都能够恢复所有 n 个原始数据包。FEC 的实质就是异或。示意图：

![img](HTTP3.assets/v2-07835089c0fc25895d944ebebd33928a_720w.jpg)

**5. 更多的 Ack 块和增加 Ack Delay 时间。**

QUIC 可以同时提供 256 个 Ack Block，因此在重排序时，QUIC 相对于 TCP（使用 SACK）更有弹性，这也使得在**重排序**或**丢失**出现时，QUIC 可以在网络上保留更多的[在途字节](https://link.zhihu.com/?target=https%3A//blog.csdn.net/u014023993/article/details/85299434)。在丢包率比较高的网络下，可以提升网络的恢复速度，减少重传量。

TCP 的 Timestamp 选项存在一个问题：发送方在发送报文时设置发送时间戳，接收方在确认该报文段时把时间戳字段值复制到确认报文时间戳，但是没有计算接收端接收到包到发送 Ack 的时间。这个时间可以简称为 Ack Delay，会导致 RTT 计算误差。现在就是把这个东西加进去计算 RTT 了。

**6. 基于 stream 和 connection 级别的流量控制。**

为什么需要两类流量控制呢？主要是因为 QUIC 支持多路复用。 Stream 可以认为就是一条 HTTP 请求。 Connection 可以类比一条 TCP 连接。多路复用意味着在一条 Connetion 上会同时存在多条 Stream。

QUIC 接收者会通告每个流中最多想要接收到的数据的绝对字节偏移。随着数据在特定流中的发送，接收和传送，接收者发送 WINDOW_UPDATE 帧，该帧增加该流的通告偏移量限制，允许对端在该流上发送更多的数据。

除了每个流的流控制外，QUIC 还实现连接级的流控制，以限制 QUIC 接收者愿意为连接分配的总缓冲区。连接的流控制工作方式与流的流控制一样，但传送的字节和最大的接收偏移是所有流的总和。

最重要的是，我们可以在内存不足或者上游处理性能出现问题时，通过流量控制来限制传输速率，保障服务可用性。

![img](HTTP3.assets/v2-0dad191ff01fcffdf77ce3acc4a63d5b_720w.jpg)

### **快速握手**

由于 QUIC 是基于 UDP 的，所以 QUIC 可以实现 0-RTT 或者 1-RTT 来建立连接，可以大大提升首次打开页面的速度。

### **集成了 TLS 1.3 加密**

TLS 1.3 支持 3 种基本密钥交换模式：

```text
(EC)DHE (基于有限域或椭圆曲线的 Diffie-Hellman)
PSK - only
PSK with (EC)DHE
```

在完全握手情况下，需要 1-RTT 建立连接。 TLS1.3 恢复会话可以直接发送加密后的应用数据，不需要额外的 TLS 握手，也就是 0-RTT。

TLS 1.3 0-RTT 简单原理示意（基于 DHE）：

![img](HTTP3.assets/v2-fcb9dab6c1767c66be501ee20227f688_720w.jpg)

但是 TLS1.3 也并不完美。TLS 1.3 的 0-RTT 无法保证前向安全性(Forward secrecy)。简单讲就是，如果当攻击者通过某种手段获取到了 Session Ticket Key，那么该攻击者可以解密以前的加密数据。

要缓解该问题可以通过设置使得与 Session Ticket Key 相关的 DH 静态参数在短时间内过期（一般几个小时）。

### **多路复用**

QUIC 是为多路复用从头设计的，携带个别流的的数据的包丢失时，通常只影响该流。QUIC 连接上的多个 stream 之间并没有依赖，也不会有底层协议限制。假如 stream2 丢了一个包，也只会影响 stream2 的处理。

### **连接迁移**

TCP 是按照 4 要素（客户端 IP、端口, 服务器 IP、端口）确定一个连接的。而 QUIC 则是让客户端生成一个 Connection ID （64 位）来区别不同连接。只要 Connection ID 不变，连接就不需要重新建立，即便是客户端的网络发生变化。由于迁移客户端继续使用相同的会话密钥来加密和解密数据包，QUIC 还提供了迁移客户端的自动加密验证。

## **挑战**

### **NAT 问题**

### **NAT 概念**

为了解决 IP 地址不足的问题，NAT 给一个局域网络只分配一个 IP 地址，这个网络内的主机，则分配私有地址，这些私有地址对外是不可见的，他们对外的通信都要借助那个唯一分配的 IP 地址。所有离开本地网络去往 Internet 的数据报的源 IP 地址需替换为相同的 NAT，区别仅在于端口号不同。

![img](HTTP3.assets/v2-1a8675229e9afa8fc33f1b18a43710ef_720w.jpg)

### **原因**

TCP 和 UDP 的报文头部不同导致 NAT 问题的出现。

### **NAT 设备的端口记忆问题**

对于基于 TCP 的 HTTP、HTTPS 传输，NAT 设备可以根据 TCP 报文头的 SYN/FIN 状态位，知道通信什么时候开始，什么时候结束，对应记忆 NAT 映射的开始和结束。

但是基于 UDP 传输的 HTTP3 ，不存在 SYN/FIN 状态位。NAT 设备的记忆如果短于用户会话时间，则用户会话会中断。NAT 设备的记忆时间如果长于用户会话时间，则意味着 NAT 设备的端口资源会被白白占用。

最直接的解决方案是，在 QUIC 的头部模仿 TCP 的 SYN/FIN 状态，让沿途的 NAT 设备知道会话什么时候开始、什么时候结束。但这需要升级全球所有的 NAT 设备的软件。

另外一个可行的方案是，让 QUIC 周期性地发送 Keepalive 消息，刷新 NAT 设备的记忆，避免 NAT 设备自动释放。

### **NAT 设备禁用 UDP**

在一些 NAT 网络环境下（如某些校园网），UDP 协议会被路由器等中间网络设备禁止，这时客户端会直接降级，选择 HTTPS 等备选通道，保证正常业务请求。

### **NGINX 负载均衡问题**

### **概念**

QUIC 客户端存在网络制式切换，就算是同一个移动机房，可能第一次业务请求时会落到 A 这台服务器，后续再次连接，就会落到 B 实例上，重复走 1-RTT 的完整握手流程。

### **全局握手缓存**

为所有 QUIC 服务器实例建立一个全局握手缓存。当用户网络发生切换时，下一次的业务请求无论是落到哪一个机房或哪一台实例上，握手建连都会是 0-RTT。

## **历代 HTTP 速度测试**

![img](HTTP3.assets/v2-52af95552d5b135354b5f09f48dff165_720w.jpg)

## **结尾**

从古至今实时数据传输（音频、视频、游戏等）都面临卡顿、延迟等问题，而 QUIC 基于 UDP 的架构和改进的重传等特性，能够有效的提升用户体验。目前
B 站 也已经接入 QUIC。

如果想要自己体验 QUIC，可以使用 Libquic、[Caddy](https://link.zhihu.com/?target=https%3A//github.com/mholt/caddy/wiki/QUIC) 等。另外 github 上面也有 [C++版本](https://link.zhihu.com/?target=https%3A//github.com/devsisters/libquic)的 QUIC 实现，利用 Nodejs 的 C++ 模块，前端工程师也可以快速实现一个 node-quic。

## **参考资料**

1. [http2.0 原理详细分析](https://link.zhihu.com/?target=https%3A//www.huaijiujia.com/2018/06/30/http%E5%8D%8F%E8%AE%AE-http2-0%E5%8E%9F%E7%90%86%E8%AF%A6%E7%BB%86%E5%88%86%E6%9E%90/)
2. [HPACK: HTTP/2 里的沉默杀手](https://link.zhihu.com/?target=https%3A//www.zcfy.cc/article/hpack-the-silent-killer-feature-of-http-2-1969.html)
3. [QPACK：HTTP /3 的头压缩](https://link.zhihu.com/?target=https%3A//quicwg.org/base-drafts/draft-ietf-quic-qpack.html)
4. [DH 算法](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E8%BF%AA%E8%8F%B2-%E8%B5%AB%E7%88%BE%E6%9B%BC%E5%AF%86%E9%91%B0%E4%BA%A4%E6%8F%9B)
5. [前向安全（ForwardSecrecy）](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E5%89%8D%E5%90%91%E4%BF%9D%E5%AF%86)
6. [TLS 1.3 VS TLS 1.2，让你明白 TLS 1.3 的强大](https://link.zhihu.com/?target=https%3A//www.jianshu.com/p/efe44d4a7501)
7. [CaddyWeb 服务器 QUIC 部署](https://link.zhihu.com/?target=https%3A//www.wolfcstech.com/2017/01/09/Caddy%20Web%E6%9C%8D%E5%8A%A1%E5%99%A8QUIC%E9%83%A8%E7%BD%B2/)
8. [关于 QUIC 的各种尝试](https://link.zhihu.com/?target=https%3A//debug.fanzheng.org/post/about-quic.html%23toc-3b3)
9. [使用 QUIC 协议实现实时视频直播 0 卡顿](https://zhuanlan.zhihu.com/p/33902646)
10. [解密 HTTP/2 与 HTTP/3 的新特性](https://link.zhihu.com/?target=https%3A//www.infoq.cn/article/kU4OkqR8vH123a8dLCCJ)
11. [Web通信协议，你还需要知道： SPDY 和 QUIC](https://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000016265991)
12. [如何看待 HTTP/3 ？](https://www.zhihu.com/question/302412059)
