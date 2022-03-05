## 前言

 起因是：本小哥在某天接到一个特殊的需求，要**用前端的方式判断任意一个url，是否可以正常访问**。
 这么简短的需求，通常背后都有个大坑

先捊下思路，要实现这个功能，必须具备以下2点：

- 正常发起url请求
- 监听请求状态

有了思路，就开始撸起袖子加油干！

## 一、判断url是否可访问

由于浏览器的安全机制——**同源策略**的存在，要实现`任意`这个要求确实有点难。

> 同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

所以，为了实现任意url可以正常访问，第一个要解决的问题就是：**跨域**。

### 1.1 解决同源限制

前端老鸟很快就会联想到`JSONP`。其原理其实是利用`script`可跨源访问的特性。
 依据这个，可以做个拓展，找出所有可跨源访问的html标签：

- `<script>`
- `<img>`
- `<link>`
- `<video>`
- `<audio>`
- `<audio>`
- `<iframe>`

### 1.2 如何判断访问性

从可跨源访问的html标签中，筛选出能支持`onerror`和`onload`事件标签，则可以依靠标签很好地完成功能的开发。
 这里说明下：

- **`onerror`事件的作用**
   如果跨源标签请求的资源，和本身能解析的文件格式不一样，就会报`error`事件。
   而要检测的url，通常都是`html`。
   所以`onerror`事件可以用于监听发起请求，到接收到反馈`error`所花费的时间。这样，就可以直接算出网络访问的延时。
   但是，很遗憾，准确率并不是100%。
   因为有一种情况是：url本身就是死链。
   用死链发起http请求后，会得到`failed`的状态。这种情况下`onerror`也是会触发的。
- **为什么需要`onload`事件？**
   `onload`事件的触发时机是资源已下载完成。
   只要触发这个事件，则证明url不是死链。
   这样，就可以帮`onerror`排除意外情况，让准确率达到100%!

基于以上两点硬性要求，对标签进行过滤后如下：

- `<script>`
- `<img>`
- `<link>`

其中`<iframe>`的硬伤是：只要服务器设置`X-Frame-Options`消息头，就直接废了。所以也被排除掉。

> X-Frame-Options是一个HTTP标头（header），用来告诉浏览器这个网页是否可以放在iFrame内。

### 1.3 存在的安全隐患

<script>虽然可以满足需求，但是有一个很致命的问题：存在被XSS攻击的可能。  如果url对应的资源是可自执行的js函数，则完全有可能被利用干坏事。  <img>标签因为只能触发onerror，所以也被排除。

### 1.4 解析代码

最后只有`<link>`标签可以使用。
 由于解析方式是CSS，所以不存在攻击的可能性。
 以下是实现代码：

```ts
function getStatus(url: string){
    return new Promise((resolve, reject) => {
        let link = document.createElement('link');
        link.rel="stylesheet";
        link.type="text/css"
        link.href = url;

        link.onload = function(){
            resolve(true);
        }
        link.onerror = function(){
            resolve(false);
        }

        document.body.appendChild(link);
    })
}
```

- 通过生成`<link>`节点，并加入资源地址`url`
- 添加监听事件`onload`、`onerror`
- 加入`body`中，发起请求

需要注意的是，一定要声明`rel`和`type`，否则是触发不了绑定的事件的。

## 二、计算网络延时

由于CSS的跨域需要一个设置正确的Content-Type   消息头，所以还是存在很小概率的风险。
 因此，计算网络延时这块，`ping-url`还是用最保守的`<img>`。

### 2.1 解析代码

```ts
function getLoadTime(url: string){
    return new Promise(resolve => {
        let img = document.createElement('img');
        img.style.display = "none";
        img.src=`${url}/?v=${Math.random()}`;
        const timeStart = new Date();

        img.onerror = function(){
            const timeEnd = new Date();
            resolve(timeEnd.getTime() - timeStart.getTime());
        }
        img.onload = function(){
            const timeEnd = new Date();
            resolve(timeEnd.getTime() - timeStart.getTime());
        }

        document.body.appendChild(img);
    });
}
```

- 生成`<img>`节点，加入资源请求url，并将样式设置为`display:none`，避免对页面产生影响
- 记录开始时间`timeStart`
- 加入监听事件`onerror`、`onload`
- 加入`body`中，发起请求
- 事件触发后，计算延迟时间

这里有个小细节，url后要加上随机数`v=***`。这样可以避免缓存的情况。



## 参考

[1] [华佗诊断分析系统](https://link.juejin.cn?target=https%3A%2F%2Fping.huatuo.qq.com%2F)
 [2] [详解script标签](https://link.juejin.cn?target=https%3A%2F%2Fwww.html.cn%2Farchives%2F8254)
 [3] [不要再问我跨域的问题了](https://link.juejin.cn?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000015597029)
 [4] [:外部资源链接元素](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTML%2FElement%2Flink)
 [5] [跨源网络访问](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FSecurity%2FSame-origin_policy%23%E8%B7%A8%E6%BA%90%E7%BD%91%E7%BB%9C%E8%AE%BF%E9%97%AE)

