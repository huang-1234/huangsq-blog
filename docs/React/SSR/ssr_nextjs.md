# SSR & Next.js Note

## References

- [Learning Next.js](https://learnnextjs.com/)
- [最简单的服务端渲染框架 - Next.js 快速入门](https://zhuanlan.zhihu.com/p/25191863)
- [Next.js — React 完美的服务器端渲染框架](http://www.zcfy.cc/article/next-js-react-server-side-rendering-done-right-freecodecamp-4557.html)
- [React 服务端渲染如此轻松 从零开始构建前后端应用](https://zhuanlan.zhihu.com/p/28004982)
- [服务端渲染与 Universal React App](https://zhuanlan.zhihu.com/p/30580569)
- [React 服务端渲染](https://hulufei.gitbooks.io/react-tutorial/content/server-rendering.html)

## Note

### 服务端渲染 (Server Side Rendering - SSR)

关于 SSR，网上已经有很多资料了。这里只总结一下我自己的理解。

为什么需要服务端渲染？服务端渲染的两个目的：

1. 加快首屏加载速度
2. SEO

如果不用服务端渲染，浏览器将很快得到一个体积非常小的 html 静态文件，当 html 加载完毕后，浏览器认为内容加载完毕，停止 loading 状态，但此时用户看到的是什么内容都还没有的白屏。此时浏览器还需要下载一个体积很大的 bundle.js，下载完 bundle.js 后再执行 bundle.js，而 bundle.js 还要去访问一些 API，用 API 得到的内容来重新渲染 html，用户从而看到真正的内容。这整个过程会耗费很长时间，也就是说用户会看到很长时间的白屏却不知道发生了什么，这是很不好的用户体验。

另外，为什么只有首屏需要做服务端渲染，因为首屏之后的其它路由操作都在客户端进行。

针对这种情况，其实不做服务端渲染也是可以的，在没有从 API 得到内容之前，加一些 Loading 的状态，以缓解用户等待时焦急的心情。比如 [Skeleton Screen with CSS](https://codepen.io/oslego/pen/XdvWmd?editors=0110)。

其实 SEO 对服务端渲染有更高的需求，因为一般来说搜索引擎只解析初次得到 html，不会执行其中的 js 代码。

另外，在做社交分享时，很多时候需要用到 Facebook 的 Open Graph，在 html 的 head 声明一些 open graph meta tags，这些内容必须在服务端填充好。

**服务端渲染的原理 (以 React 为例)**

在浏览器访问服务器后，服务器将直接得到的数据 (比如从数据库)，渲染生成静态 html，但同时，需要将这些原始数据以类似 json 的形式，放到 html 的 javascript 标签中。

```html
<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
```

浏览器在加载完 html 后，因为它已经是一个渲染好的静态 html，用户可以直接看到所有的内容，即使 js 文件还没有下载下来。

但实际此时，浏览器还会继续下载 bundle.js，bundle.js 会从 javascript 标签中解析出首屏所需要的数据，这样它就不用再访问一次 API 来得到这些数据了。bundle.js 解析这些数据作为 Component 的 props，或 store 的 initial state (如果用了 redux 的话)。然后 bundle.js 用这些数据重新渲染一次，得到的页面和刚刚用户看到的页面是一样的，但用户可以感知不到页面上的变化，实际它是在客户端重新渲染了一次。

具体看 [React 服务端渲染](https://hulufei.gitbooks.io/react-tutorial/content/server-rendering.html)

### Next.js

Next.js 是一个 React 的服务端渲染框架。

我觉得可以把它理解成类似 [Meteor](https://www.meteor.com/)，都是让同一份 JavaScript 代码同时在服务端和客户端运行。但 Next.js 比 Meteor 轻量很多，没有操作数据库的部分，所以我觉得更倾向于用 Next.js 作为前端和后端的中间渲染层。

所谓中间渲染层，因为 React 的服务端渲染最好用 Node 来做，而如果你已经有一个用其它语言实现的后端，比如 Rails、Python，不方便用它们来做服务端渲染。那我们可以用 Next.js 作为中间渲染层，它从客户端接受请求，然后访问 Rails / Python 后端提供的 API，得到数据，渲染 html 返回给客户端。

update (2019/07/15): 现在的理解，Next.js，用于前后端后离，它既是前端的全部，又承担一部分后端，同时它必须有一个配套的提供 API 的后端。当在浏览器首次访问某个页面时，Next.js 首先在服务端请求 API 后端，渲染出相应的页面的 html 代码，同时包含 bundle 的所有 js，然后这个 bundle 的 js 会在客户端接管所有页面的路由，当访问其它页面时，皆在客户端完成，客户端的 js 代码里访问的 API 请求也直接到达 API 后端，而不会再经过服务器的 Next.js 代码。这个设计很好。

#### Learning Next.js

Note for [Learning Next.js](https://nextjs.org/learn/basics/getting-started)

(发现在 Next.js 中的 component 实现都不需要 `import React from 'react'`，神奇，在 CRA 中是需要的，应该是 Next.js 帮我们做了这件事情。)

**1 - Getting Started**

安装 react、react-dom、next：

```bash
$ npm install --save react react-dom next
```

创建 pages 目录：

```bash
$ mkdir pages
```

把需要服务端渲染的页面 (或者说路由) 放在 pages 目录下，在 pages 目录下的 js 文件会自动生成相应的路由，比如 `pages/about.js` 会生成 `/about` 路由。

修改 package.json，增加 `npm run dev` 命令，并让其执行 next：

```json
{
  "scripts": {
    "dev": "next"
  }
}
```

创建首页 `pages/index.js`：

```js
const Index = () => (
  <div>
    <p>Hello Next.js</p>
  </div>
)

export default Index
```

**2 - Navigate between Pages**

使用 Next 提供的 Link 组件

```jsx
<Link href="/about">
  <a>About</a>
</Link>
```

**3 - Using Shared Components**

抽取出复用的 Header 和 Layout 组件，放置于 components 目录下。

Header:

```jsx
// components/Header.js
import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
)

export default Header
```

Layout:

```jsx
// components/MyLayout.js
import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)

export default Layout
```

这两个例子中还包含了 CSS-in-JS 的一种模式，linkStyle 和 layoutStyle，后面还会介绍另一种 CSS-in-JS 的用法，styled-jsx。

上面 Header / Layout 的导出还可以进一步简化，匿名导出，以 Layout 为例：

```jsx
export default props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)
```

可见 JS 是多么灵活...

2019/8/15 update: 新的 tutorial 增加了两种实现，使用了不同的 react pattern。

一种是将 Layout 定义成 HOC。

```jsx
// components/MyLayout.js
import Header from './Header'
...
const withLayout = Page => {
  return () => (
    <div style={layoutStyle}>
      <Header />
      <Page />
    </div>
  )
}
export default withLayout
```

使用：

```jsx
// pages/index.js
import withLayout from '../components/MyLayout'
const Page = () => <p>Hello Next.js</p>
export default withLayout(Page)
```

另一种是将 Page content 作为 Layout 的 prop。

```jsx
// components/MyLayout.js
import Header from './Header'
...
const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.content}
  </div>
)
export default Layout
```

使用：

```jsx
// pages/index.js
import Layout from '../components/MyLayout.js'
const indexPageContent = <p>Hello Next.js</p>
export default function Index() {
  return <Layout content={indexPageContent} />
}
```

**4 - Create Dynamic Pages**

主要是说在 url 中使用查询参数，比如 `/post?title=xxx`

创建 `pages/post.js` 页面：

```jsx
import Layout from '../components/MyLayout.js'

export default props => (
  <Layout>
    <h1>{props.url.query.title}</h1>
    <p>This is the blog post content.</p>
  </Layout>
)
```

Next 会给 pages 目录中的所有顶层 Component 的 props 增加 url 属性，注意，只有顶层 Component 的 props 有此额外属性，其它 Component 没有。如下例所示：

```jsx
const Content = props => (
  <div>
    <h1>{props.url.query.title}</h1>
    <p>This is the blog post content.</p>
  </div>
)

export default () => (
  <Layout>
    <Content />
  </Layout>
)
```

Content 的 props 并没有 url 属性，导致运行出错，解决办法之一：

```jsx
export default props => (
  <Layout>
    <Content url={props.url} />
  </Layout>
)
```

2019/8/15 update: 新的 tutorial 使用了 useRouter react hook 得到 query。

```jsx
// pages/post.js
import { useRouter } from 'next/router'
import Layout from '../components/MyLayout'

const Page = () => {
  const router = useRouter()
  return (
    <Layout>
      <h1>{router.query.title}</h1>
      <p>This is the blog post content.</p>
    </Layout>
  )
}
export default Page
```

**5 - Clean URLs with Route Masking**

使用 Link 组件的 as 属性，为 href 提供别名路由。

```jsx
const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)
```

当点击上面这样一个链接时，浏览器显示的链接是类似 `/p/100` 的路径，但内部访问的还是 `/post?title=xxx` 的链接，因此它会自动切换到 `pages/page.js`。

但是，使用别名有个问题，`/p/100` 这种 url，实际是虚拟的路径，只在客户端工作，服务端并没有实际对应的逻辑，当你直接从浏览器访问这个链接，而不是从某个链接跳转时，会显示 404。这个问题在下一小节会解决。

2019/8/15 update: 新的 tutorial 使用了 Next.js 9.0 中的新特性 - Dynamic Routing，可以创建类似 `pages/p/[id].js` 这样的文件，这样就是不需要第 6 小节的内容，也就是不需要自己再写 server.js 了 (这曾经是 umi 在此之前拥有的特性)。

用法，创建 `pages/p/[id].js` 文件。

```jsx
import { useRouter } from 'next/router'
import Layout from '../../components/MyLayout'

export default function Post() {
  const router = useRouter()

  return (
    <Layout>
      <h1>{router.query.id}</h1>
      <p>This is the blog post content.</p>
    </Layout>
  )
}
```

使用：

```jsx
<Link href="/p/[id]" as="/p/hello-nextjs">
  <a>hello nextjs</a>
</Link>
```

(总感觉 href 和 as 的意义应该反过来才更合理...)

**6 - Server Side Support for Clean URLs**

(此小节在 Next.js 9 中已经不需要了。)

如上一小节所说，Next 为 pages 下的 component 自动生成了相应的路由，但如果你为它们用了别名，直接访问别名链接时，显示 404。

解决办法是，自定义服务端 (其实是扩展服务端，Next 已经实现了服务端的大部分逻辑) 逻辑，为其加上别名路由。

创建 server.js，使用 express 或 koa，扩展路由。

```jsx
// server.js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { title: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
```

核心代码：

```jsx
server.get('/p/:id', (req, res) => {
  const actualPage = '/post'
  const queryParams = { title: req.params.id }
  app.render(req, res, actualPage, queryParams)
})
```

同时修改 package.json 的 `npm run dev` 命令，因为扩展了 server 逻辑，所以我们不应该再直接用 next 提供的默认服务端逻辑，而是使用新的 server 逻辑：

```json
{
  "scripts": {
    "dev": "node server.js"
  }
}
```

**7 - Fetching Data for Pages**

服务端渲染很重要的一点，我就是要在浏览器之前拿到相应的数据并渲染。

Next 为 Component 定义了一静态方法 getInitialProps()，这个方法会在 render() 之前执行一次，可以在这个方法中使用 fetch 从 API 拿到数据，然后在 render() 中渲染。isomorphic-unfetch 提供了同构的 fetch 方法。

```jsx
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({ show }) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index
```

首次访问时，getInitialProps() 在服务端执行，之后在浏览器端执行。

**8 - Styling Components**

除了上面第 3 小节讲到的在 JS 中使用 CSS 的方法，Next 还推荐使用 styled-jsx 在 JS 中使用 CSS。

```jsx
const PostLink = ({ post }) => (
  <li>
    <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
      <a>{post.title}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: 'Arial';
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)
```

使用 `<style jsx>{``}</style>`，因为我们可以在 styled-jsx 使用变量，所以要用反引号包围起来。

`<style jsx>` 内的 CSS 只会在当前 Component 生效，不会在 Component 的 children 生效，因此不会影响全局。

如果想让它在全局作用，则可以加上 global 选项，即 `<style jsx global/>`，这里举了一个 Markdown Component 的例子。

```html
<div className="markdown">
  <Markdown source={`
    This is our blog post.
    Yes. We can have a [link](/link).
    And we can have a title as well.

    ### This is a title

    And here's the content.
  `}/>
</div>
<style>
    {`
      .markdown {
        font-family: 'Arial';
      }

      .markdown a {
        text-decoration: none;
        color: blue;
      }
    `}
</style>
```

**9 - Deploying a Next.js App**

把代码放到服务器，先用 `next build` 生成 production 代码，再用 `next start` 运行就行了。

其它略。

高级内容：

1. Export into a Static HTML App
2. Lazy Loading Modules
3. Lazy Loading Components

略。需要时再看。

2019/08/15，继续看高级内容。

**10 - Export into a Static HTML App**

生成静态的 html 文件。

有了 Gatsby 的知识后这一部分就很好理解了，写一个 next.config.js 配置文件，在配置文件里描述要生成的静态文件路由。

```jsx
// next.config.js
const fetch = require('isomorphic-unfetch')

module.exports = {
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/about': { page: '/about' }
    }
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()
    const shows = data.map(entry => entry.show)

    shows.forEach(show => {
      paths[`/show/${show.id}`] = { page: '/show/[id]', query: { id: show.id } }
    })

    return paths
  }
}
```

在 package.json 中新增 export 命令：

```json
{
  "scripts": {
    "build": "next build",
    "export": "next export"
  }
}
```

执行 build 和 export 命令，生成静态文件，生成的文件默认在 out 目录中。

```bash
$ npm run build // 只需要首次执行，之后只需要单独执行 npm run export 即可
$ npm run export
```

安装 serve npm package，用来在本地起一个静态 web 服务器，预览效果。

```bash
$ npm i -g serve
$ cd out
$ serve -p 8080
```

**11 - TypeScript**

Next.js 内置对 TS 的支持，只要将 component 以 .tsx 后缀命名即可。不过 typescript 依赖还是需要显示手动安装的。

```bash
$ npm install --save react react-dom next
$ npm install --save-dev typescript @types/react @types/react-dom @types/node
```

**12 - Lazy Loading Modules**

`npm run analyze:browser` 命令会启动 webpack bundle analyzer 分析各 bundle file 的情况。

dynamic import:

```jsx
// const firebase = require('firebase/app')
// require('firebase/database')
const firebase = await import('firebase/app')
await import('firebase/database')
```

**13 - Lazy Loading Components**

```jsx
//import Highlight from 'react-highlight'
import dynamic from 'next/dynamic'

const Highlight = dynamic(() => import('react-highlight'))
```

让 Highlight 组件动态加载。

**14 - Create AMP Pages**

略。

**15 - Automatic Prerendering**

略。

通过同一个 `next build` 命令，自动判断相应的路由是要生成静态页面还是动态页面。

疑问：next.js 如何和 redux 配合使用？可能要看文档了。

#### 和 umi.js 对比

umi.js 和 next.js 有一些类似的地方，比如约定式路由，但也仅此而已。

看了一遍 umi.js 的文档，并没有提及 umi.js 支持 SSR，umi 应该是使用约定式路由来做 SPA，当然，它也支持配置式路由。

相同点：

1. 约定式路由

不同点：

1. next.js 支持 SSR，且这是它的主打；umi.js 不支持 SSR
2. umi.js 还支持配置式路由，next.js 只支持约定式路由
3. next.js 的路由功能较简单，不支持嵌套布局，嵌套路由，权限路由等高级功能，需要自己封装实现，但 umi.js 支持

> umi，中文可发音为乌米，是一个可插拔的企业级 react 应用框架。umi 以路由为基础的，支持类 next.js 的约定式路由，以及各种进阶的路由功能，并以此进行功能扩展，比如支持路由级的按需加载...

由此看出，强大的路由功能才是 umi 的主要特性。