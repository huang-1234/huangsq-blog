这里主要有

- ctx
  - Context 是一个请求级别的对象
- app
  - Application 是全局应用对象，在一个应用中，只会实例化一个，它继承自 Koa.Application，在它上面我们可以挂载一些全局的方法和对象。
- config
  - 应用的配置
- service
  - 应用所有的 service

