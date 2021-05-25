# Fetch新一代

> 前段时间看到一句话，Ajax已死，Fetch永生。当然只是一句玩笑话啦！！！

上面这句话就表明了ajax和Fetch的历史渊源。实际上Fetch和XMLHttpRequest同级，都是浏览器的内置API，不过Fetch是基于Promise对http请求进行了封装。

ajax实际上是对XHR的封装，使其API更好用。而axios则是在基于es6的Promise对ajax再一次封装，现在你应该能理解ajax和Fetch的关系了吧。

下面我们来学习Fetch

>  先来看看MDN是怎么定义Fetch的吧

```js
位于 WorkerOrGlobalScope 这一个 mixin 中的 fetch() 方法用于发起获取资源的请求。它返回一个 promise，
这个 promise 会在请求响应后被 resolve，并传回 Response 对象。

Window 和 WorkerGlobalScope 都实现了 WorkerOrGlobalScope。 ——这意味着基本在任何场景下只要你想获取资源，
都可以使用 位于 WorkerOrGlobalScope 中的 fetch() 方法。

当遇到网络错误时，fetch() 返回的 promise 会被 reject，并传回 TypeError，虽然这也可能因为权限或其它问题导致。
成功的 fetch() 检查不仅要包括 promise 被 resolve，还要包括 Response.ok 属性为 true。HTTP 404 状态并不被认为是网络错误。

fetch() 方法由 Content Security Policy 的 connect-src指令控制，而不是它请求的资源。
```

fetch的参数以及返回值

```js
参数
?input
定义要获取的资源。这可能是：
一个 USVString 字符串，包含要获取资源的 URL。一些浏览器会接受 blob: 和 data: 作为 schemes.
一个 Request 对象。
init 可选
一个配置项对象，包括所有对请求的设置。可选的参数有：
method: 请求使用的方法，如 GET、POST。
headers: 请求的头信息，形式为 Headers 的对象或包含 ByteString 值的对象字面量。
body: 请求的 body 信息：可能是一个 Blob、BufferSource (en-US)、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
mode: 请求的模式，如 cors、 no-cors 或者 same-origin。
credentials: 请求的 credentials，如 omit、same-origin 或者 include。为了在当前域名内自动发送 cookie ， 必须提供这个选项， 从 Chrome 50 开始， 这个属性也可以接受 FederatedCredential (en-US) 实例或是一个 PasswordCredential (en-US) 实例。
cache:  请求的 cache 模式: default、 no-store、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
redirect: 可用的 redirect 模式: follow (自动重定向), error (如果产生重定向将自动终止并且抛出一个错误）, 或者 manual (手动处理重定向). 在Chrome中默认使用follow（Chrome 47之前的默认值是manual）。
referrer: 一个 USVString 可以是 no-referrer、client或一个 URL。默认是 client。
referrerPolicy: 指定了HTTP头部referer字段的值。可能为以下值之一： no-referrer、 no-referrer-when-downgrade、 origin、 origin-when-cross-origin、 unsafe-url 。
integrity: 包括请求的  subresource integrity 值 （ 例如： sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=）。
返回值
一个 Promise，resolve 时回传 Response 对象。
```

> init* 可选

一个配置项对象，包括所有对请求的设置。可选的参数有：

`method`: 请求使用的方法，如 `GET、``POST。``

`headers`: 请求的头信息，形式为 [`Headers`](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers) 的对象或包含 [`ByteString`](https://developer.mozilla.org/zh-CN/docs/Web/API/ByteString) 值的对象字面量。

`body`: 请求的 body 信息：可能是一个 `Blob`、`BufferSource` (en-US)、`FormData`、`URLSearchParams`或者 [`USVString` 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。

`mode`: 请求的模式，如 `cors、` `no-cors 或者` `same-origin。`

`credentials`: 请求的 credentials，如 `omit、``same-origin 或者` `include`。为了在当前域名内自动发送 cookie ， 必须提供这个选项， 从 Chrome 50 开始， 这个属性也可以接受 [`FederatedCredential`实例或是一个 [`PasswordCredential`  实例。

`cache`:  请求的 cache 模式: `default`、 `no-store`、 `reload` 、 `no-cache `、 `force-cache `或者 `only-if-cached` 。

`redirect`: 可用的 redirect 模式: `follow` (自动重定向), `error` (如果产生重定向将自动终止并且抛出一个错误）, 或者 `manual` (手动处理重定向). 在Chrome中默认使用`follow（`Chrome 47之前的默认值是`manual`）。

`referrer`: 一个 [`USVString`可以是 `no-referrer、``client`或一个 URL。默认是 `client。`

`referrerPolicy`: 指定了HTTP头部referer字段的值。可能为以下值之一： `no-referrer、` `no-referrer-when-downgrade、` `origin、` `origin-when-cross-origin、` `unsafe-url 。`

``integrity`: 包括请求的  subresource integrity值 （ 例如： `sha256BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=）。`

> 返回值

Ajax和Fetch都是浏览器端向服务器端发送数据请求的http封装。只不过Fetch是基于Promise的。

## Fetch接收的参数

第一个参数url



第二个参数：可以控制不同配置的init对象

```js
最好使用符合内容安全策略 (CSP) (en-US)的链接而不是使用直接指向资源地址的方式来进行Fetch的请求。

支持的请求参数
fetch() 接受第二个可选参数，一个可以控制不同配置的 init 对象：

参考 fetch()，查看所有可选的配置和更多描述。

// Example POST method implementation:

postData('http://example.com/answer', {answer: 42})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}
```

init 对象要按照下表中的键/值进行填充。

