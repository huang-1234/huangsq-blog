# 服务（Service）

### 属性

每一次用户请求，框架都会实例化对应的 Service 实例，由于它继承于 `egg.Service`，故拥有下列属性方便我们进行开发：

- `this.ctx`: 当前请求的上下文 [Context](https://eggjs.org/zh-cn/basics/extend.html#context) 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
- `this.app`: 当前应用 [Application](https://eggjs.org/zh-cn/basics/extend.html#application) 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
- `this.service`：应用定义的 [Service](https://eggjs.org/zh-cn/basics/service.html)，通过它我们可以访问到其他业务层，等价于 `this.ctx.service` 。
- `this.config`：应用运行时的[配置项](https://eggjs.org/zh-cn/basics/config.html)。
- `this.logger`：logger 对象，上面有四个方法（`debug`，`info`，`warn`，`error`），分别代表打印四个不同级别的日志，使用方法和效果与 [context logger](https://eggjs.org/zh-cn/core/logger.html#context-logger) 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。

### 注意事项

- Service 文件必须放在 `app/service` 目录，可以支持多级目录，访问的时候可以通过目录名级联访问。

  ```js
  app/service/biz/user.js => ctx.service.biz.user
  app/service/sync_user.js => ctx.service.syncUser
  app/service/HackerNews.js => ctx.service.hackerNews
  ```

- 一个 Service 文件只能包含一个类， 这个类需要通过 `module.exports` 的方式返回。

- Service 需要通过 Class 的方式定义，父类必须是 `egg.Service`。

- Service 不是单例，是 **请求级别** 的对象，框架在每次请求中首次访问 `ctx.service.xx` 时延迟实例化，所以 Service 中可以通过 this.ctx 获取到当前请求的上下文。