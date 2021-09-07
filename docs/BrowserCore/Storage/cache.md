# 缓存

### 文件的缓存

快速回答

- `Expires` 为 Cookie 的删除设置一个过期的**日期**
- `Max-age` 设置一个 Cookie 将要过期的秒数
- IE 浏览器(ie6、ie7 和 ie8) 不支持 `max-age`，所有的浏览器都支持 `expires`

深入一些来说明

`expires` 参数是当年网景公司推出 Cookies 原有的一部分。在 HTTP1.1 中，`expires` 被弃用并且被更加易用的 `max-age` 所替代。你只需说明这个 Cookie 能够存活多久就可以了，而不用像之前那样指定一个日期。设置二者中的一个，Cookie 会在它过期前一直保存，如果你一个都没有设置，这个 Cookie 将会一直存在直到你关闭浏览器，这种称之为 `Session Cookie`。

**举个栗子**

用 `expires` 的方式设置 `foo=bar` 在5分钟后过期

```
var d = new Date();
d.setTime(d.getTime() + 5*60*1000); // in milliseconds
document.cookie = 'foo=bar;path=/;expires='+d.toGMTString()+';';
```

用 `max-age` 来做同样的事情

```
document.cookie = 'foo=bar;path=/;max-age='+5*60+';';
```

不幸的是，IE 浏览器 不支持 `max-age`，如果你想跨浏览器存放 Cookie，应该坚持用 `expires`。

下边我们来进行几个假设的问答

**问：如果我在 Cookie 中同时设置了 `expires` 和 `max-age` 会发生什么？**

答：所有支持 `max-age` 的浏览器会忽略 `expires` 的值，只有 IE 另外，IE 会忽略 `max-age` 只支持 `expires`。

**问：如果我只设了 `max-age` 会怎样？**

答：除了 IE 之外的所有浏览器会正确的使用它。在 IE 浏览器中，这个 Cookie 将会作为一个 Session Cookie（当你关闭浏览器时它会被删除）。

**问：如果我只设了 `expires`？**

答：所有浏览器会正确使用它来保存 Cookie，只需要记得像上边示例那样设置它的 GMT 时间就行了。

**问：这篇文章的寓意是什么？**

答：如果你关心你的 Cookies 功能在大多数 Web 用户下正常工作，不要用正确的方式（`max-age`）存储你的 Cookies，应该用 `expires` 的方式让他们工作。