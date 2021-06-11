# 抓包eggjs

当我抓一个登录的数据包时，后端的cookie如下：

```http
Response sent 233 bytes of Cookie data:
	Set-Cookie: EGG_SESS=3JLIUCxAp-yvdIERZ856aSTcj4LJGJz0zICrgsssfhJ5mlgvJL5QBEz6xzWeZH3u9HQ9VSZYmtPx1Ad6k9kjzMd1M6mX4QFEmWOmSIYz4kfKT1TUdd4r9gou3jZCNsbn-NpdG2WoGqueiQ-I5LKLWg==; path=/; max-age=86400; expires=Sat, 05 Jun 2021 11:40:21 GMT; httponly

This response did not contain a P3P Header.

Validate P3P Policies at: http://www.w3.org/P3P/validator.html
Learn more at: http://fiddler2.com/r/?p3pinfo
```

遇到的跨域问题

```js
Access to XMLHttpRequest at 'http://localhost:7001/admin/checkLogin' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
xhr.js:177 POST http://localhost:7001/admin/checkLogin net::ERR_FAILED
```

当我设置egg的config.default.js

```js
  config.cors = {
    // origin: '*', // *表示所有的都可以
    origin: ['http://localhost:3000','http://127.0.0.1:3000'], //
    // origin: 'http://127.0.0.1:3000', //
    credentials: true, // 表是否允许cookie进行跨域,前后台共享session
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
```



前端登录报错

```js
Access to XMLHttpRequest at 'http://localhost:7001/admin/checkLogin' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header contains multiple values 'http://localhost:3000, http://127.0.0.1:3000', but only one is allowed.
```

也就是说：头包含多个值'http://localhost:3000, http://127.0.0.1:3000'，但只允许一个。

