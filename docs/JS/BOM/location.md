# Location

``Location ``接口表示其链接到的对象的位置（URL）。所做的修改反映在与之相关的对象上。 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 和 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 接口都有这样一个链接的Location，分别通过 [`Document.location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/location)和[`Window.location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location) 访问。

来看个例子

```js
// Create anchor element and use href property for the purpose of this example
// A more correct alternative is to browse to the URL and use document.location or window.location
var url = document.createElement('a');
url.href = 'https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container';
console.log(url.href);      // https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container
console.log(url.protocol);  // https:
console.log(url.host);      // developer.mozilla.org
console.log(url.hostname);  // developer.mozilla.org
console.log(url.port);      // (blank - https assumes port 443)
console.log(url.pathname);  // /en-US/search
console.log(url.search);    // ?q=URL
console.log(url.hash);      // #search-results-close-container
console.log(url.origin);    // https://developer.mozilla.org
```

## 属性



## 方法



# Document.location

``Document.location`` 是一个只读属性，返回一个 [`Location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location) 对象，包含有文档的 URL 相关的信息，并提供了改变该 URL 和加载其他 URL 的方法。

尽管 `Document.location` 是一个只读的 `Location` 对象，你也能够赋给它一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)。这意味着你能够赋给 document.location 字符串，大多数情况下像这样使用：`document.location = 'http://www.example.com'`，也可写为`document.location.href = 'http://www.example.com'`。

只是想获取字符串形式的 URL，可以使用只读属性 [`document.URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/URL)。
