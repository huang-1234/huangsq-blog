# Node.js 如何处理 ES6 模块

作者： [阮一峰](http://www.ruanyifeng.com/)

日期： [2020年8月20日](http://www.ruanyifeng.com/blog/2020/08/)

学习 JavaScript 语言，你会发现它有两种格式的模块。

一种是 ES6 模块，简称 ESM；另一种是 Node.js 专用的 CommonJS 模块，简称 CJS。这两种模块不兼容。

很多人使用 Node.js，只会用`require()`加载模块，遇到 ES6 模块就不知道该怎么办。本文就来谈谈，ES6 模块在 Node.js 里面怎么使用。