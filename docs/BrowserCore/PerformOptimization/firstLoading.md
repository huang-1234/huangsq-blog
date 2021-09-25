# 优化SPA应用的首屏加载速度慢的问题



- 将公用的JS库通过script标签外部引入，减小app.bundel的大小，让浏览器并行下载资源文件，提高下载速度；
- 在配置 路由时，页面和组件使用懒加载的方式引入，进一步缩小 app.bundel 的体积，在调用某个组件时再加载对应的js文件；
- 加一个首屏 loading 图，提升用户体验；
- 如果在webview中的页面，可以进行页面预加载
- 独立打包异步组件公共 Bundle，以提高复用性&缓存命中率
- 静态文件本地缓存，有两种方式分别为HTTP缓存，设置Cache-Control，Last-Modified，Etag等响应头和Service Worker离线缓存
- 配合 PWA 使用
- SSR
- 去掉外链css
- http缓存资源 cache-control > expires > etag > last-modified
- 使用动态 polyfill
- 使用 SplitChunksPlugin 自动拆分业务基础库，避免加载重复模块
- 使用 Tree Shaking 减少业务代码体积
- 懒加载：动态import，loaddable
- 把代码编译到 ES2015+
- 使用 lazyload 和 placeholder 提升加载体验







另外

减少网络请求次数
• 雪碧图
• 避免图片src 为空，减少不必要的请求
减少资源体积
• js 压缩
• css 压缩
• code spliting (实现按需加载)
• 使用外部js css ，减少当前html 文件体积
延迟加载
• 懒加载、预加载
• webpack - import() 实现组件按需加载
预加载
使用CDN
• webpack - externals ：将第三方依赖用CDN的方式引入，可使用其缓存的特性
HTTP缓存
• 强缓存
• 协商缓存
减少包的体积（空间换时间）
• code split
渲染性能
• 避免回流
SSR
• 首屏服务端渲染
避免重定向
减少页面DOM数量
DNS Prefetch

SEO • 合理的 title、description、keywords（三项的权重逐个减小） • 语义化的 HTML 标签 • 重要内容 HTML 代码放在最前，不要用 js 输出，少用 iframe（搜索引擎不会抓取子资源的内容） • 图片必须加 alt • 服务端渲染