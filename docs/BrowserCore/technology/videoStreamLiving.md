## 1、前言

不做任何开发，就能实现弱网环境下实现实时视频直播零卡顿，听上去是不是天方夜谭？看完这篇文章你就知道，我们是如何做到的。

## **学习交流：**

> \- 即时通讯开发交流群：[320837163](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A//shang.qq.com/wpa/qunwpa%3Fidkey%3D347e290d9cc726233b8c106272c100c8b56c366914452ebcd577f520e3617649)[推荐]
> \- 移动端IM开发入门文章：《[新手入门一篇就够：从零开发移动端IM](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A//www.52im.net/thread-464-1-1.html)》

（本文同步发布于：[http://www.52im.net/thread-1406-1-1.html](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1406-1-1.html)）

## 2、相关文章

《[移动端实时视频直播技术实践：如何做到实时秒开、流畅不卡](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-530-1-1.html)》

《[移动端实时音视频直播技术详解（六）：延迟优化](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-972-1-1.html)》

《[如何优化传输机制来实现实时音视频的超低延迟？](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1008-1-1.html)》

《[首次披露：快手是如何做到百万观众同场看直播仍能秒开且不卡顿的？](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1033-1-1.html)》

## 4、视频直播的痛点：卡顿

卡顿是最影响直播体验的因素之一，也是最难解决的问题之一。在流媒体的传输链路中，任何一个环节丢包都可能导致用户观看卡顿。

其中，主播端的推流卡顿最影响观看体验，会直接影响到所有观看直播的最终用户。主播推流卡顿在部分场景会特别显著，比如户外直播就非常考验在网络状况复杂的情况下推流的稳定性。

减少卡顿一直是开发者重大的技术挑战，那么继续看看我们又有什么样的对策呢？

Google 从 2014 年推出 QUIC 协议后一直在音视频产品上实践该协议。现在，经过一年多的探索和实践，我们的直播云产品已经拥抱 QUIC，最新推出的直播 QUIC 推流方案可以大幅度的降低直播的卡顿问题，可以在各种复杂网络环境下给客户提供优秀的直播体验。（关于QUIC协议的详细介绍请阅读《[技术扫盲：新一代基于UDP的低延时网络传输层协议——QUIC详解](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1309-1-1.html)》）

## 5、QUIC 是什么，为什么可以降低卡顿？

既然 QUIC 可以解决如此重要的直播体验问题，那么我们先从整体了解一下 QUIC 协议（关于QUIC协议的详细介绍请阅读《[技术扫盲：新一代基于UDP的低延时网络传输层协议——QUIC详解](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1309-1-1.html)》）。

## 5.1 QUIC 协议的定义

QUIC 全称 Quick UDP Internet Connection, 是谷歌公司制定的一种基于 UDP 协议的低时延互联网传输协议。

我们知道，TCP/IP 协议族是互联网的基础。其中传输层协议只有两种： TCP 和 UDP 协议。与 TCP 协议相比，UDP 更为轻量，但是错误校验也要少得多。由于 UDP 是不可靠协议，不保证按序送达，所以其可靠性比不上 TCP 协议。

QUIC 传输层基于 UDP 协议但却是一种可靠的传输协议，因为它将很多可靠性的验证策略从系统层转移到应用层来做，这样可以使用更适合现代流媒体传输的拥塞控制策略。

**关于TCP和UDP的差异，以下文章可以给您一些答案：**

> 《[网络编程懒人入门(四)：快速理解TCP和UDP的差异](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1160-1-1.html)》
> 《[网络编程懒人入门(五)：快速理解为什么说UDP有时比TCP更有优势](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1277-1-1.html)》
> 《[简述传输层协议TCP和UDP的区别](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-580-1-1.html)》
> 《[为什么QQ用的是UDP协议而不是TCP协议？](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-279-1-1.html)》
> 《[移动端即时通讯协议选择：UDP还是TCP？](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-33-1-1.html)》

## 5.3 QUIC 在传输上为什么有优势

从上面所有对 QUIC 的定义上来看，很明显 QUIC 的对比对象是 TCP。所以下面所有的优势的枚举都是基于 QUIC 和 TCP 的比较。

**【QUIC优势1：更出色的拥塞控制】**

虽然例如 HTTP/2 或者 SPDY 协议现在都支持将页面的多个数据通过一个数据链接进行传输，该特性也确实能够加快数据的传输速度。但是由于 TCP 协议在处理包时是有严格顺序的，所以还是会遇到队首阻塞的问题。

比如发生如下图所示场景下的问题时，当其中一个数据没有发送成功，TCP 连接需要等待这个包完成重传之后才能继续进行。因此，即使逻辑上一个 TCP 连接上并行的在进行多路数据传输，其他毫无关联的数据也会因此阻塞：

**【QUIC优势2：更加灵活】**

TCP 协议栈通常由操作系统层面来实现，例如如 Linux、Windows、iOS、Android 操作系统。因此如果要修改 TCP 协议需要从操作系统层面去做很多事情，这是一项复杂的工程。相对来说 UDP 协议在操作系统层面实现更为简单，QUIC 基于 UDP 在应用层做了很多网络拥塞控制层面的优化，帮助用户减少复杂网络下的卡顿率，提高流畅度，这是 TCP 无法做到的。

## 5.4 QUIC小结

从以上所有的介绍中可以看出，如果我们需要使用 QUIC 改善直播体验，就是用它来代替直播中 TCP 协议所扮演的角色。大家都清楚目前直播所使用的协议都基本是 RTMP 协议,而 RTMP 协议的传输层是基于 TCP 协议。所以**我们的 QUIC 推流方案就是把 RTMP 当中的传输层协议换成 QUIC，从而达到推流卡顿率下降的效果**

## 附件：更多实时视频技术文章

> **[1] 开源实时音视频技术WebRTC的文章：**
> 《[开源实时音视频技术WebRTC的现状](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Farticle-126-1.html)》
> 《[简述开源实时音视频技术WebRTC的优缺点](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-225-1-1.html)》
> 《[访谈WebRTC标准之父：WebRTC的过去、现在和未来](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-227-1-1.html)》
> 《[良心分享：WebRTC 零基础开发者教程（中文）[附件下载\]](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-265-1-1.html)》
> 《[WebRTC实时音视频技术的整体架构介绍](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-284-1-1.html)》
> 《[新手入门：到底什么是WebRTC服务器，以及它是如何联接通话的？](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-356-1-1.html)》
> 《[WebRTC实时音视频技术基础：基本架构和协议栈](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-442-1-1.html)》
> 《[浅谈开发实时视频直播平台的技术要点](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-475-1-1.html)》
> 《[[观点\] WebRTC应该选择H.264视频编码的四大理由](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-488-1-1.html)》
> 《[基于开源WebRTC开发实时音视频靠谱吗？第3方SDK有哪些？](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-510-1-1.html)》
> 《[开源实时音视频技术WebRTC中RTP/RTCP数据传输协议的应用](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-589-1-1.html)》
> 《[简述实时音视频聊天中端到端加密（E2EE）的工作原理](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-763-1-1.html)》
> 《[实时通信RTC技术栈之：视频编解码](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1034-1-1.html)》
> 《[开源实时音视频技术WebRTC在Windows下的简明编译教程](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1125-1-1.html)》
> 《[网页端实时音视频技术WebRTC：看起来很美，但离生产应用还有多少坑要填？](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1282-1-1.html)》
> \>> [更多同类文章 ……](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fforum.php%3Fmod%3Dcollection%26action%3Dview%26ctid%3D5)
> **[2] 实时音视频开发的其它精华资料：**
> 《[即时通讯音视频开发（一）：视频编解码之理论概述](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-228-1-1.html)》
> 《[即时通讯音视频开发（二）：视频编解码之数字视频介绍](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-229-1-1.html)》
> 《[即时通讯音视频开发（三）：视频编解码之编码基础](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-232-1-1.html)》
> 《[即时通讯音视频开发（四）：视频编解码之预测技术介绍](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-235-1-1.html)》
> 《[即时通讯音视频开发（五）：认识主流视频编码技术H.264](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-237-1-1.html)》
> 《[即时通讯音视频开发（六）：如何开始音频编解码技术的学习](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-241-1-1.html)》
> 《[即时通讯音视频开发（七）：音频基础及编码原理入门](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-242-1-1.html)》
> 《[即时通讯音视频开发（八）：常见的实时语音通讯编码标准](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-243-1-1.html)》
> 《[即时通讯音视频开发（九）：实时语音通讯的回音及回音消除概述](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-247-1-1.html)》
> 《[即时通讯音视频开发（十）：实时语音通讯的回音消除技术详解](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-250-1-1.html)》
> 《[即时通讯音视频开发（十一）：实时语音通讯丢包补偿技术详解](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-251-1-1.html)》
> 《[即时通讯音视频开发（十二）：多人实时音视频聊天架构探讨](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-253-1-1.html)》
> 《[即时通讯音视频开发（十三）：实时视频编码H.264的特点与优势](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-266-1-1.html)》
> 《[即时通讯音视频开发（十四）：实时音视频数据传输协议介绍](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-267-1-1.html)》
> 《[即时通讯音视频开发（十五）：聊聊P2P与实时音视频的应用情况](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-269-1-1.html)》
> 《[即时通讯音视频开发（十六）：移动端实时音视频开发的几个建议](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-270-1-1.html)》
> 《[即时通讯音视频开发（十七）：视频编码H.264、VP8的前世今生](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-274-1-1.html)》
> 《[实时语音聊天中的音频处理与编码压缩技术简述](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-825-1-1.html)》
> 《[网易视频云技术分享：音频处理与压缩技术快速入门](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-678-1-1.html)》
> 《[学习RFC3550：RTP/RTCP实时传输协议基础知识](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-590-1-1.html)》
> 《[基于RTMP数据传输协议的实时流媒体技术研究（论文全文）](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-273-1-1.html)》
> 《[声网架构师谈实时音视频云的实现难点(视频采访)](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-399-1-1.html)》
> 《[浅谈开发实时视频直播平台的技术要点](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-475-1-1.html)》
> 《[还在靠“喂喂喂”测试实时语音通话质量？本文教你科学的评测方法！](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-507-1-1.html)》
> 《[实现延迟低于500毫秒的1080P实时音视频直播的实践分享](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-528-1-1.html)》
> 《[移动端实时视频直播技术实践：如何做到实时秒开、流畅不卡](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-530-1-1.html)》
> 《[如何用最简单的方法测试你的实时音视频方案](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-535-1-1.html)》
> 《[技术揭秘：支持百万级粉丝互动的Facebook实时视频直播](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-541-1-1.html)》
> 《[简述实时音视频聊天中端到端加密（E2EE）的工作原理](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-763-1-1.html)》
> 《[移动端实时音视频直播技术详解（一）：开篇](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-853-1-1.html)》
> 《[移动端实时音视频直播技术详解（二）：采集](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-955-1-1.html)》
> 《[移动端实时音视频直播技术详解（三）：处理](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-960-1-1.html)》
> 《[移动端实时音视频直播技术详解（四）：编码和封装](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-965-1-1.html)》
> 《[移动端实时音视频直播技术详解（五）：推流和传输](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-967-1-1.html)》
> 《[移动端实时音视频直播技术详解（六）：延迟优化](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-972-1-1.html)》
> 《[理论联系实际：实现一个简单地基于HTML5的实时视频直播](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-875-1-1.html)》
> 《[IM实时音视频聊天时的回声消除技术详解](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-939-1-1.html)》
> 《[浅谈实时音视频直播中直接影响用户体验的几项关键技术指标](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-953-1-1.html)》
> 《[如何优化传输机制来实现实时音视频的超低延迟？](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1008-1-1.html)》
> 《[首次披露：快手是如何做到百万观众同场看直播仍能秒开且不卡顿的？](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1033-1-1.html)》
> 《[Android直播入门实践：动手搭建一套简单的直播系统](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1154-1-1.html)》
> 《[网易云信实时视频直播在TCP数据传输层的一些优化思路](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1254-1-1.html)》
> 《[实时音视频聊天技术分享：面向不可靠网络的抗丢包编解码器](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1281-1-1.html)》
> 《[P2P技术如何将实时视频直播带宽降低75%？](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1289-1-1.html)》
> 《[专访微信视频技术负责人：微信实时视频聊天技术的演进](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1201-1-1.html)》
> 《[腾讯音视频实验室：使用AI黑科技实现超低码率的高清实时视频聊天](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1308-1-1.html)》
> 《[微信团队分享：微信每日亿次实时音视频聊天背后的技术解密](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1311-1-1.html)》
> 《[近期大热的实时直播答题系统的实现思路与技术难点分享](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1369-1-1.html)》
> 《[福利贴：最全实时音视频开发要用到的开源工程汇总](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1395-1-1.html)》
> 《[七牛云技术分享：使用QUIC协议实现实时视频直播0卡顿！](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fthread-1406-1-1.html)》
> \>> [更多同类文章 ……](https://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A%2F%2Fwww.52im.net%2Fforum.php%3Fmod%3Dcollection%26action%3Dview%26ctid%3D4)

