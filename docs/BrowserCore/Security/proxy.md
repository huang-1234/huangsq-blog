# 代理服务器



## 正向代理和反向代理

**1、前言**

　　最近工作中用到反向代理，发现网络代理的玩法还真不少，网络背后有很多需要去学习。而在此之前仅仅使用了过代理软件，曾经为了访问google，使用了代理软件，需要在浏览器中配置代理的地址。我只知道有代理这个概念，并不清楚代理还有正向和反向之分，于是赶紧学习一下，补充一下知识。首先弄清楚什么是正向代理，什么是反向代理，然后是二者在实际使用中展示的方式是什么样的，最后总结一下正向代理用来做什么，反向代理可以做什么。

**2、正向代理**

　　正向代理类似一个跳板机，代理访问外部资源。

举个例子：

　　我是一个用户，我访问不了某网站，但是我能访问一个代理服务器，这个代理服务器呢,他能访问那个我不能访问的网站，于是我先连上代理服务器,告诉他我需要那个无法访问网站的内容，代理服务器去取回来,然后返回给我。从网站的角度，只在代理服务器来取内容的时候有一次记录，有时候并不知道是用户的请求，也隐藏了用户的资料，这取决于代理告不告诉网站。

　　**客户端必须设置正向代理服务器，当然前提是要知道正向代理服务器的IP地址，还有代理程序的端口。**

　　例如之前使用过这类软件例如CCproxy，[http://www.ccproxy.com](http://www.ccproxy.com/)/ 需要在浏览器中配置代理的地址。

总结来说：正向代理 是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。客户端必须要进行一些特别的设置才能使用正向代理。

　　**正向代理的用途：**

　（1）访问原来无法访问的资源，如google

   （2）可以做缓存，加速访问资源

　（3）对客户端访问授权，上网进行认证

　（4）代理可以记录用户访问记录（上网行为管理），对外隐藏用户信息

例如CCProxy用途：

**3、反向代理**

　　初次接触方向代理的感觉是，客户端是无感知代理的存在的，反向代理对外都是透明的，访问者者并不知道自己访问的是一个代理。因为客户端不需要任何配置就可以访问。

　　反向代理（Reverse Proxy）实际运行方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个服务器。

反向代理的作用：

（1）保证内网的安全，可以使用反向代理提供WAF功能，阻止web攻击

大型网站，通常将反向代理作为公网访问地址，Web服务器是内网。

（2）负载均衡，通过反向代理服务器来优化网站的负载

**5、nginx的反向代理**

 　nginx支持配置反向代理，通过反向代理实现网站的负载均衡。这部分先写一个nginx的配置，后续需要深入研究nginx的代理模块和负载均衡模块。

nginx通过proxy_pass_http 配置代理站点，upstream实现负载均衡。