Web应用程序安全性是任何基于Web的业务的重要组成部分。互联网的全球性使Web属性暴露于来自不同位置、规模和复杂程度不同的攻击。 Web应用程序安全性专门处理围绕网站、Web应用程序和Web服务（例如API）的安全性。

## 什么是常见的Web应用程序安全漏洞？

攻击Web应用程序的范围从针对性的数据库操纵到大规模的网络中断。让我们探讨一些常用的攻击方法或常用的“手段”。

- **[跨站点脚本（XSS）](https://www.cloudflare.com/learning/security/threats/cross-site-scripting/)** – XSS 是一个漏洞，攻击者可以利用该漏洞将客户端脚本注入网页中，以便直接访问重要信息，冒充用户或诱使用户泄露重要信息。
- **[SQL 注入（SQi）](https://www.cloudflare.com/learning/security/threats/sql-injection/)** – SQi 攻击者通过数据库执行搜索查询来利用漏洞。攻击者使用 SQi 来访问未经授权的信息，修改或创建新的用户权限，或以其他方式操纵或破坏敏感数据。
- **[拒绝服务（DoS）](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/)和[分布式拒绝服务（DDoS）攻击](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)** - 攻击者可以利用多种手段和途径通过不同类型的攻击流量使目标服务器或其周围基础设施超载。当服务器不再能够有效处理传入请求时，它开始表现缓慢，最终拒绝为合法用户的传入请求提供服务。
- **内存损坏** - 内存中的位置被无意修改时，会发生内存损坏，从而可能导致软件出现意外行为。恶意的攻击者将试图通过代码注入或缓冲区溢出攻击之类的方法来嗅探并利用内存损坏。
- **[缓冲区溢出](https://www.cloudflare.com/learning/security/threats/buffer-overflow/)** - 缓冲区溢出是在软件将数据写入内存中定义的空间（称为缓冲区）时发生的异常。缓冲区容量的溢出会导致相邻的存储器位置被数据覆盖。可以利用此行为将恶意代码注入内存，从而有可能在目标计算机中创建漏洞。
- **[跨站点请求伪造（CSRF）](https://www.cloudflare.com/learning/security/threats/cross-site-request-forgery/)** - 跨站点请求伪造包括诱骗受害者使用其身份验证或授权进行请求。通过利用用户的帐户特权，攻击者能够发送伪装成该用户的请求。一旦用户的帐户受损，攻击者便可以窃取，破坏或修改重要信息。通常会以高特权帐户（例如管理员或执行官）为目标。
- **[数据泄露](https://www.cloudflare.com/learning/security/what-is-a-data-breach/)** - 与特定的攻击手段和途径不同，数据泄露是一个通用术语，指的是敏感或机密信息的暴露，并且可能由于恶意操作或错误而发生。被认定为数据泄露的范畴相当广泛，可以是泄露少量极有价值的记录，也可能是数百万个用户帐户的暴露。

## 防护漏洞的最佳实践是什么？

保护 web 应用程序免遭利用的重要步骤包括：使用最新[加密](https://www.cloudflare.com/learning/ssl/what-is-encryption/)，要求合适的身份验证，不断修补发现的漏洞，以及拥有健康的软件开发环境。而现实情况是，即使在相当强大的安全环境中，较聪明的攻击者仍有可能找到漏洞，因此建议采用全方位的安全策略。

可以通过防御 DDoS、[应用程序层](https://www.cloudflare.com/learning/ddos/application-layer-ddos-attack/)和 DNS 攻击来提高 web 应用程序的安全性：

#### WAF – 防御应用程序层攻击

[Web 应用程序防火墙](https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/)，或简称 WAF，帮助保护 Web 应用程序免受恶意[ HTTP ](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/)流量的攻击。通过在目标服务器和攻击者之间设置过滤屏障，WAF 可以防御跨站点伪造、跨站点脚本编写和 SQL 注入等攻击。[了解有关 Cloudflare WAF 的更多信息](https://www.cloudflare.com/waf/)。

#### DDoS 缓解

破坏 web 应用程序的一个常用方式是使用分布式拒绝服务（DDoS）攻击。Cloudflare 通过多种策略在不影响服务性能的情况下缓解 DDoS 攻击，包括在我们的[边缘](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/)丢弃容量耗尽型攻击的流量，以及使用我们的 [Anycast 网络](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/)来适当路由合法请求。了解 Cloudflare 能如何帮助您[防御针对 web 资产的 DDoS 攻击](https://www.cloudflare.com/ddos/)。

#### DNS安全-DNSSEC保护

[域名系统（DNS）](https://www.cloudflare.com/learning/dns/what-is-dns/)是互联网的电话簿，它指代互联网工具（例如 Web 浏览器）查找正确服务器的方式。恶意攻击者试图通过[DNS 高速缓存中毒](https://www.cloudflare.com/learning/dns/dns-security#dns-attacks)、[在途攻击](https://www.cloudflare.com/learning/security/threats/man-in-the-middle-attack/)以及其它干扰 DNS 查询的生命周期的方法来劫持 DNS 请求过程。如果 DNS 是互联网的电话簿，则 DNSSEC 是不可欺骗的呼叫者 ID。[了解如何使用 Cloudflare 保护 DNS 查找。](https://www.cloudflare.com/dns/)。

https://www.cloudflare.com/zh-cn/learning/security/what-is-web-application-security/

