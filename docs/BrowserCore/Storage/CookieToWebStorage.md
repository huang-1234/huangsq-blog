# 浏览器存储-从cookie到indexDB

## 浏览器存储

|     特性     |                   cookie                   |       localStorage       | sessionStorage |         indexDB          |
| :----------: | :----------------------------------------: | :----------------------: | :------------: | :----------------------: |
| 数据生命周期 |     一般由服务器生成，可以设置过期时间     | 除非被清理，否则一直存在 | 页面关闭就清理 | 除非被清理，否则一直存在 |
| 数据存储大小 |                     4K                     |            5M            |       5M       |           无限           |
| 与服务端通信 | 每次都会携带在 header 中，对于请求性能影响 |          不参与          |     不参与     |          不参与          |

对于 `cookie` 来说，由于其是在http携带的用户登录的凭证，我们还需要保证它安全性：不被窃取，不被冒用

下面便是cookie的字段

| 属性            | 作用                                                         |
| --------------- | ------------------------------------------------------------ |
| Value           | 如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识 |
| HttpOnly        | 不能通过 JS 访问 Cookie，减少 XSS 攻击                       |
| Secure          | 只能在协议为 HTTPS 的请求中携带                              |
| SameSite        | 规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击        |
| Path            | 能够携带该键值对的文件路径                                   |
| Name            | 键名                                                         |
| Domain          | 能够携带该键值对的域名，开头为`.` 则表示其子域名也可以携带   |
| Size            | cookie 大小                                                  |
| Exptres/Max-Age | cookie 过期时间的时间戳，超时则自动删除                      |

SameSite 的值

- None：任何请求都可以携带该 cookie
- Lax：部分跨站请求无法发送该 cookie
- Strict：所有跨站请求都无法发送该 cookie，仅同站请求允许。

## Service Worker

Service Worker 是运行在浏览器背后的**独立线程**，一般可以用来实现缓存功能。使用 Service Worker的话，传输协议必须为 **HTTPS**。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。

Service Worker 实现缓存功能一般分为三个步骤：

1. 首先需要先注册 Service Worker，
2. 然后监听到 `install` 事件以后就可以缓存需要的文件，
3. 那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。

```js
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function(registration) {
      console.log('service worker 注册成功')
    })
    .catch(function(err) {
      console.log('servcie worker 注册失败')
    })
}
// sw.js
// 监听 `install` 事件，回调中缓存所需文件
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll(['./index.html', './index.js'])
    })
  )
})

// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        return response
      }
      console.log('fetch source')
    })
  )
})
```

## 1：从 Cookie 说起

Cookie 的本职工作并非本地存储，而是“维持状态”。

在 Web 开发的早期，人们亟需解决的一个问题就是状态管理的问题：HTTP 协议是一个无状态协议，服务器接收客户端的请求，返回一个响应，故事到此就结束了，服务器并没有记录下关于客户端的任何信息。那么下次请求的时候，如何让服务器知道“我是我”呢？

在这样的背景下，Cookie 应运而生。

Cookie 说白了就是一个存储在浏览器里的一个小小的文本文件，它附着在 HTTP 请求上，在浏览器和服务器之间“飞来飞去”。它可以携带用户信息，当服务器检查 Cookie 的时候，便可以获取到客户端的状态。

**Cookie 以键值对的形式存在**。

### Cookie的性能劣势

Cookie 不够大

大家知道，Cookie 是有体积上限的，它最大只能有 4KB。当 Cookie 超过 4KB 时，它将面临被裁切的命运。这样看来，Cookie 只能用来存取少量的信息。

过量的 Cookie 会带来巨大的性能浪费

**Cookie 是紧跟域名的**。我们通过响应头里的 Set-Cookie 指定要存储的 Cookie 值。默认情况下，domain 被设置为设置 Cookie 页面的主机名，我们也可以手动设置 domain 的值：

```http
Set-Cookie: name=xiuyan; domain=xiuyan.me
```

**同一个域名下的所有请求，都会携带 Cookie**。大家试想，如果我们此刻仅仅是请求一张图片或者一个 CSS 文件，我们也要携带一个 Cookie 跑来跑去（关键是 Cookie 里存储的信息我现在并不需要），这是一件多么劳民伤财的事情。Cookie 虽然小，请求却可以有很多，随着请求的叠加，这样的不必要的 Cookie 带来的开销将是无法想象的。

随着前端应用复杂度的提高，Cookie 也渐渐演化为了一个“存储多面手”——它不仅仅被用于维持状态，还被塞入了一些乱七八糟的其它信息，被迫承担起了本地存储的“重任”。在没有更好的本地存储解决方案的年代里，Cookie 小小的身体里承载了 4KB 内存所不能承受的压力。

为了弥补 Cookie 的局限性，让“专业的人做专业的事情”，Web Storage 出现了。

## 2：Web Storage

Web Storage 是 HTML5 专门为浏览器存储而提供的数据存储机制。它又分为 Local Storage 与 Session Storage。这两组概念非常相近，我们不妨先理解它们之间的区别，再对它们的共性进行研究。

### Local Storage 与 Session Storage 的区别

两者的区别在于**生命周期**与**作用域**的不同。

- 生命周期：Local Storage 是持久化的本地存储，存储在其中的数据是永远不会过期的，使其消失的唯一办法是手动删除；而 Session Storage 是临时性的本地存储，它是会话级别的存储，当会话结束（页面被关闭）时，存储内容也随之被释放。
- 作用域：Local Storage、Session Storage 和 Cookie 都遵循同源策略。但 Session Storage 特别的一点在于，即便是相同域名下的两个页面，只要它们**不在同一个浏览器窗口中**打开，那么它们的 Session Storage 内容便无法共享。

### Web Storage 的特性

- 存储容量大： Web Storage 根据浏览器的不同，存储容量可以达到 5-10M 之间。
- 仅位于浏览器端，不与服务端发生通信。

### Web Storage 核心 API 使用示例

Web Storage 保存的数据内容和 Cookie 一样，是文本内容，以键值对的形式存在。Local Storage 与 Session Storage 在 API 方面无异，这里我们以 localStorage 为例：

- 存储数据：setItem()

```js
localStorage.setItem('user_name', 'xiuyan')
```

- 读取数据： getItem()

```js
localStorage.getItem('user_name')
```

- 删除某一键名对应的数据： removeItem()

```js
localStorage.removeItem('user_name')
```

- 清空数据记录：clear()

```js
localStorage.clear()
```

### 应用场景

> Local Storage

Local Storage 在存储方面没有什么特别的限制，理论上 Cookie 无法胜任的、可以用简单的键值对来存取的数据存储任务，都可以交给 Local Storage 来做。

这里给大家举个例子，考虑到 Local Storage 的特点之一是**持久**，有时我们更倾向于用它来存储一些内容稳定的资源。比如图片内容丰富的电商网站会用它来存储 Base64 格式的图片字符串：

有的网站还会用它存储一些不经常更新的 CSS、JS 等静态资源。

> Session Storage

Session Storage 更适合用来存储生命周期和它同步的**会话级别**的信息。这些信息只适用于当前会话，当你开启新的会话时，它也需要相应的更新或释放。比如微博的 Session Storage 就主要是存储你本次会话的浏览足迹：

lasturl 对应的就是你上一次访问的 URL 地址，这个地址是即时的。当你切换 URL 时，它随之更新，当你关闭页面时，留着它也确实没有什么意义了，干脆释放吧。这样的数据用 Session Storage 来处理再合适不过。

这样看来，Web Storage 确实也够强大了。那么 Web Storage 是否能 hold 住所有的存储场景呢？

答案是否定的。大家也看到了，Web Storage 是一个从定义到使用都非常简单的东西。它使用键值对的形式进行存储，这种模式有点类似于对象，却甚至连对象都不是——它只能存储字符串，要想得到对象，我们还需要先对字符串进行一轮解析。

说到底，Web Storage 是对 Cookie 的拓展，它只能用于存储少量的简单数据。当遇到大规模的、结构复杂的数据时，Web Storage 也爱莫能助了。这时候我们就要清楚我们的终极大 boss——IndexedDB！

## 3：IndexedDB

IndexedDB 是一个**运行在浏览器上的非关系型数据库**。既然是数据库了，那就不是 5M、10M 这样小打小闹级别了。理论上来说，IndexedDB 是没有存储上限的（一般来说不会小于 250M）。它不仅可以存储字符串，还可以存储二进制数据。

IndexedDB 从推出之日起，其优质教程就层出不绝，我们今天不再着重讲解它的详细操作。接下来，我们遵循 MDN 推荐的操作模式，通过一个基本的 IndexedDB 使用流程，旨在对 IndexedDB 形成一个感性的认知：

1. 打开/创建一个 IndexedDB 数据库（当该数据库不存在时，open 方法会直接创建一个名为 xiaoceDB 新数据库）。

```js
// 后面的回调中，我们可以通过event.target.result拿到数据库实例
let db
// 参数1位数据库名，参数2为版本号
const request = window.indexedDB.open("xiaoceDB", 1)
// 使用IndexedDB失败时的监听函数
request.onerror = function (event) {
  console.log('无法使用IndexedDB')
}
// 成功
request.onsuccess = function (event) {
  // 此处就可以获取到db实例
  db = event.target.result
  console.log("你打开了IndexedDB")
}
```

1. 创建一个 object store（object store 对标到数据库中的“表”单位）。

```js
// onupgradeneeded事件会在初始化数据库/版本发生更新时被调用，我们在它的监听函数中创建object store
request.onupgradeneeded = function(event){
  let objectStore
  // 如果同名表未被创建过，则新建test表
  if (!db.objectStoreNames.contains('test')) {
    objectStore = db.createObjectStore('test', { keyPath: 'id' })
  }
}
```

1. 构建一个事务来执行一些数据库操作，像增加或提取数据等。

```js
  // 创建事务，指定表格名称和读写权限
  const transaction = db.transaction(["test"],"readwrite")
  // 拿到Object Store对象
  const objectStore = transaction.objectStore("test")
  // 向表格写入数据
  objectStore.add({id: 1, name: 'xiuyan'})
```

1. 通过监听正确类型的事件以等待操作完成。

```js
  // 操作成功时的监听函数
  transaction.oncomplete = function(event) {
    console.log("操作成功")
  }
  // 操作失败时的监听函数
  transaction.onerror = function(event) {
    console.log("这里有一个Error")
  }
```

### IndexedDB 的应用场景

通过上面的示例大家可以看出，在 IndexedDB 中，我们可以创建多个数据库，一个数据库中创建多张表，一张表中存储多条数据——这足以 hold 住复杂的结构性数据。IndexedDB 可以看做是 LocalStorage 的一个升级，当数据的复杂度和规模上升到了 LocalStorage 无法解决的程度，我们毫无疑问可以请出 IndexedDB 来帮忙。

## 小结

浏览器缓存/存储技术的出现和发展，为我们的前端应用带来了无限的转机。近年来基于缓存/存储技术的第三方库层出不绝，此外还衍生出了 PWA这样优秀的 Web 应用模型。可以说，现代前端应用，尤其是移动端应用，之所以可以发展到在体验上叫板 Native 的地步，主要就是仰仗缓存/存储立下的汗马功劳。

# cookie、sessionStorage、localStorage 详解及应用场景

> Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在，而Web Storage仅仅是为了在本地“存储”数据而生

------

### cookie

> `Cookie`的作用是与服务器进行交互，作为`HTTP`规范的一部分而存在

#### 了解cookie

1. 要表示唯一的一个`cookie`值需要：`name`、`domain`、`path`
2. 一个`cookie`就是一个小型的文本文件
3. 虽然`cookie`保存在浏览器端，但是一般是在服务器端设置的。
4. 可以在`HTTP`返回体里，通过设置`Set-Cookie`来告诉浏览器端所要存储的`cookie`。
5. 用来保存客户浏览器请求服务器页面的请求信息

------

#### cookie相关字段的说明

1. 名称：一个唯一确定`cookie`的名称。`cookie`名称是不区分大小写的。`cookie`的名称必须是经过`URL`编码的。
2. 值：储存在`cookie`中的字符串值。值必须被`URL`编码。
3. 域：`cookie`对于哪个域是有效的。所有向该域发送的请求中都会包含这个`cookie`信息。如果没有明确设定，那么这个域会被认作来自设置`cookie`的那个域。
4. 路径：对于指定域中的那个路径，应该向服务器发送`cookie`。例如，你可以指定`cookie`只有从`http://www.wrox.com/books/`中才能访问，那么`http://www.wrox.com`的页面就不会发送`cookie`信息，即使请求都是来自同一个域的。
5. 失效时间：表示`cookie`何时应该被删除的时间戳（也就是，何时应该停止向服务器发送这个`cookie`）。默认情况下，浏览器会话结束时即将所有`cookie`删除；不过也可以自己设置删除时间。这个值是个`GMT`格式的日期（`Wdy,DD-Mon-YYYY HH:MM:SSGMT`），用于指定应该删除`cookie`的准确时间。因此，`cookie`可在浏览器关闭后依然保存在用户的机器上。如果你设置的失效日期是个以前的时间，则`cookie`会被立刻删除。
6. 安全标志：指定后，`cookie`只有在使用`SSL`连接的时候才发送到服务器。例如，`cookie`信息只能发送给 `https://www.wrox.com`，而`http://www.wrox.com`的请求则不能发送 `cookie`。

------

#### cookie的应用场景

- 简单来说，`Cookie`就是服务器暂存放在你的电脑里的资料（`.txt`格式的文本文件），好让服务器用来辨认你的计算机。当你在浏览网站的时候，`Web`服务器会先送一小小资料放在你的计算机上，`Cookie` 会把你在网站上所打的文字或是一些选择都记录下来。当下次你再访问同一个网站，Web服务器会先看看有没有它上次留下的`Cookie`资料，有的话，就会依据`Cookie`里的内容来判断使用者，送出特定的网页内容给你。
- 网站可以利用`cookie`跟踪统计用户访问该网站的习惯，比如什么时间访问，访问了哪些页面，在每个网页的停留时间等。利用这些信息，一方面是可以为用户提供个性化的服务，另一方面，也可以作为了解所有用户行为的工具，对于网站经营策略的改进有一定参考价值。
- 目前`Cookie`最广泛的是记录用户登录信息，这样下次访问时可以不需要输入自己的用户名、密码了——当然这种方便也存在用户信息泄密的问题，尤其在多个用户共用一台电脑时很容易出现这样的问题。

------

#### 设置／修改 `cookie`

> `cookie`的原生的`API`，需要我们自己进行封装

```
//直接复制 【直接复制不是覆盖，而是追加】
document.cookie = 'name=value;'

//封装setCookie方法
//setCookie 首先对name和value进行编码
function setCookie(name,value,expires,path,domain,secure){

    var cookie = encodeURIComponent(name)+ '=' +encodeURIComponent(value);
    
    //注意分号后面要有空格
    //后面的4个参数是可选的，所以用if判断并追加
     
    if(expires){
        cookie +='; expires='+expires.toGMTString();
    }
    if(path){
        cookie += '; path='+path;
    }
    if(domain){
        cookie += '; domain='+domain;
    }
    if(secure){
        cookie += '; secure='+secure;
    }
    document.cookie = cookie;
}
```

------

#### 删除cookie

> 输入参数为`name`、`path`、`domain` 这`3`个是唯一标识`cookie`的,将`max-age`设置为0，就可以立即删除了.

```
function remove(name,domain,path){
    document.cookie = 'name='+name
                    +'; domain='+domain
                    +'; path='+path
                    +'; max-age=0';
}
```

------

#### cookie缺点

- `Cookie`**数量和长度**的限制。`IE6`或更低版本每个`domian`下最多`20`个`cookie`，`IE7`和之后的版本最多可以有 `50`个`cookie`，`Firefox`最多`50`个`cookie`，`chrome`和`Safari`没有做硬性限制，每个`cookie`长度不能超过`4KB`，否则会被截掉。
- `IE`和`Opera` 会**清理**近期最少使用的`cookie`，`Firefox`会随机清理`cookie`。这就导致不能永久储存信息。
- **安全性问题**。如果`cookie`被人拦截了，那人就可以取得所有的`session`信息。即使加密也与事无补，因为拦截者并不需要知道`cookie`的意义，他只要原样转发`cookie`就可以达到目的了。
- 并且每次你请求一个新的页面的时候，`cookie`只要满足作用域和作用路径，`Cookie`都会被发送过去，这样无形中**浪费了带宽**。

------

### 本地储存

> ```
> Web Storage`是为了在本地“存储”数据而生。`html5`中的 `Web Storage` 包括了两种存储方式：`sessionStorage`和`localStorage
> ```

#### localStorage && sessionStorage

> 只要有效期和作用域，浏览器每次访问的时候都会将`Storage`载入到内存里

- `localStorage`用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。
- `sessionStorage`用于本地存储一个会话（`session`）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此`sessionStorage`不是一种持久化的本地存储，仅仅是会话级别的存储。也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口后，`sessionStorage`即被销毁
- `localStorage`也受同源策略的限制。
- `localStorage`和`sessionStorage`都具有相同的操作方法，如`setItem`,`getItem`,`removeItem`,`clear`等方法，不像`cookie`需要前端开发者自己封装`setCookie`，`getCookie`。

------

#### localStorage应用场景

> `localStorage`可以用于存储该浏览器对该页面的访问次数，当然，如果换个浏览器，这个次数就重新开始计数了。还可以用来存储一些固定不变的页面信息，这样就不需要每次都重新加载了，这个值也可以进行覆盖。

访问这个页面的时候，`script` 脚本会自动运行，`localStorage.pagecount`就会 `++` 了，从而达到统计页面访问次数的目的。

```
<!DOCTYPE HTML>
<html>
<body>

<script type="text/javascript">

if (localStorage.pagecount){
    localStorage.pagecount=Number(localStorage.pagecount) +1;
}
else{
    localStorage.pagecount=1;
}

document.write("Visits: " + localStorage.pagecount + " time(s).");

</script> 

<p>刷新页面会看到计数器在增长。</p>

<p>请关闭浏览器窗口，然后再试一次，计数器会继续计数。</p>

</body>
</html>
```

------

#### sessionStorage应用场景

> 使用 `sessionStorage` 进行页面传值

```
//有时会有这样的需求，我们从A页面获取的数据，需要在B页面发送给后端，这时就需要我们将数据从A页面传递到B页面。

//A页面
//首先检测Storage
if (typeof(Storage) !== "undefined") {
    sessionStorage.'name'=value;
} else {
    sessionStorage.name = '';
}


//B页面
if (typeof(Storage) !== "undefined") {
    var B_name = sessionStorage.name;
    }
//注意，如果要储存的数据对象、数组
//那么在储存之前，用JSON.stringify将数据转换为字符串
//读取之后，再用JSON.parse转换为对象、数组

//存储
var obj = {name:"xiaoxiong",age:25};
var arr = [1,2,3,4];
window.sessionStorage.obj = JSON.stringify(obj);
window.sessionStorage.arr = JSON.stringify(arr);

//读取
var OBJ = window.sessionStorage.obj;//"{"name":"xiaoxiong","age":25}"
JSON.parse(OBJ);//Object {name: "xiaoxiong", age: 25}

var ARR = window.sessionStorage.arr;//"[1,2,3,4]"
JSON.parse(ARR);//(4) [1, 2, 3, 4]
```

------

**总结一下**：`cookie`数量和长度都有限制，`Web Storage`解决了这样的限制，且`localStorage`做到了永久储存。但是`Cookie`也是不可以或缺的：`Cookie`的作用是与服务器进行交互，作为`HTTP`规范的一部分而存在 ，而`Web Storage`仅仅是为了在本地“存储”数据而生。