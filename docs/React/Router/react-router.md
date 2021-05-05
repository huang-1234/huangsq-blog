# react-router

## react-router与react-router-dom

### 1、react-router与react-router-dom是干什么的？

`react-router`: 实现了路由的核心功能
`react-router-dom`: 基于`react-router`，加入了在浏览器运行环境下的一些功能，例如：`Link`组件，会渲染一个`a`标签，[Link组件源码`a`标签行](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js#L76); `BrowserRouter`和`HashRouter`组件，前者使用`pushState`和`popState`事件构建路由，后者使用`window.location.hash`和`hashchange`事件构建路由。

### 2、从源码分析react-router与react-router-dom有什么区别？

```
// Type definitions for React Router 5.1
// Project: https://github.com/ReactTraining/react-router
// Definitions by: Huy Nguyen <https://github.com/huy-nguyen>
//                 Philip Jackson <https://github.com/p-jackson>
//                 John Reilly <https://github.com/johnnyreilly>
//                 Sebastian Silbermann <https://github.com/eps1lon>
//                 Daniel Nixon <https://github.com/danielnixon>
//                 Tony Ward <https://github.com/ynotdraw>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

import { match } from 'react-router';
import * as React from 'react';
import * as H from 'history';

export {
    generatePath,
    Prompt,
    MemoryRouter,
    RedirectProps,
    Redirect,
    RouteChildrenProps,
    RouteComponentProps,
    RouteProps,
    Route,
    Router,
    StaticRouter,
    SwitchProps,
    Switch,
    match,
    matchPath,
    withRouter,
    RouterChildContext,
    useHistory,
    useLocation,
    useParams,
    useRouteMatch,
} from 'react-router';

export interface BrowserRouterProps {
    basename?: string;
    getUserConfirmation?: (message: string, callback: (ok: boolean) => void) => void;
    forceRefresh?: boolean;
    keyLength?: number;
}
export class BrowserRouter extends React.Component<BrowserRouterProps, any> {}

export interface HashRouterProps {
    basename?: string;
    getUserConfirmation?: (message: string, callback: (ok: boolean) => void) => void;
    hashType?: 'slash' | 'noslash' | 'hashbang';
}
export class HashRouter extends React.Component<HashRouterProps, any> {}

export interface LinkProps<S = H.LocationState> extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    component?: React.ComponentType<any>;
    to: H.LocationDescriptor<S> | ((location: H.Location<S>) => H.LocationDescriptor<S>);
    replace?: boolean;
    innerRef?: React.Ref<HTMLAnchorElement>;
}
export function Link<S = H.LocationState>(
    // TODO: Define this as ...params: Parameters<Link<S>> when only TypeScript >= 3.1 support is needed.
    props: React.PropsWithoutRef<LinkProps<S>> & React.RefAttributes<HTMLAnchorElement>,
): ReturnType<Link<S>>;
export interface Link<S = H.LocationState>
    extends React.ForwardRefExoticComponent<
        React.PropsWithoutRef<LinkProps<S>> & React.RefAttributes<HTMLAnchorElement>
    > {}

export interface NavLinkProps<S = H.LocationState> extends LinkProps<S> {
    activeClassName?: string;
    activeStyle?: React.CSSProperties;
    exact?: boolean;
    strict?: boolean;
    isActive?<Params extends { [K in keyof Params]?: string }>(match: match<Params>, location: H.Location<S>): boolean;
    location?: H.Location<S>;
}
export function NavLink<S = H.LocationState>(
    // TODO: Define this as ...params: Parameters<NavLink<S>> when only TypeScript >= 3.1 support is needed.
    props: React.PropsWithoutRef<NavLinkProps<S>> & React.RefAttributes<HTMLAnchorElement>,
): ReturnType<NavLink<S>>;
export interface NavLink<S = H.LocationState>
    extends React.ForwardRefExoticComponent<
        React.PropsWithoutRef<NavLinkProps<S>> & React.RefAttributes<HTMLAnchorElement>
    > {}
```

可以看出`react-router-dom`是依赖于`react-router`的，其中`Switch、Route、Router、Redirect`等组件是直接引入`react-router`中的

```
export { Switch, Route, Router, Redirect } from 'react-router'
```

除此之外，`react-router-dom`还另外新增了`Link、BrowserRouter、HashRouter`组件。

因此，在引入`react-router-dom`后不需要显性引入`react-router`，`react-router-dom`依赖`react-router`，`npm`都会将他们安装。

#### react-router3.x与react-router-dom区别

react-router3.x版本下路由采用集中式配置，UI组件和路由是分开的。react-router4.x版本下路由路由采用分散式配置，路由嵌套在UI组件当中，更加契合组件化思想（组件中的路由也应该包含在组件之中）。

### 3、在react-router3.x是如下配置路由：

```
// index.js
import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import routes from './module/routes'

render(<Router routes={routes} history={hashHistory}></Router>, document.getElementById('app'))
// App.js
import React from 'react'
import { Link } from 'react-router'

export default function App(props) {
  return <div>
      <Link to='/About'>About</Link>
      <br />
      <Link to='/Repos'>Repos</Link>

      { props.children }
    </div>
}
// routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home'
import About from "./About"
import Repos from './Repos'
import Repo from './Repo'

export default (
  <Route exact path='/' component={App}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path='/About' component={About}></Route>
    <Route path='/Repos' component={Repos}>
      <Route path='/Repos/:username/:repos' component={Repo}></Route>
    </Route>
  </Route>
)
```

#### 在react-router-dom是如下配置路由：

```
// App.js
import React from 'react'
import { NavLink, Route, HashRouter, Redirect } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Repos from './Repos'

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul>
            <li><NavLink to='/About' activeClassName="active">About</NavLink></li>
            <li><NavLink to='/Repos' activeClassName="active">Repos</NavLink></li>
          </ul>
          <Route exact path='/' component={Home} /> // 指定默认路由，用Redirect组件也可以实现
          <Route path='/About' component={About}></Route>
          <Route path='/Repos' component={Repos}></Route>
        </div>
      </HashRouter>
    )
  }
}
```

***注意：Route组件必须由Router、HashRouter、BrowserRouter组件包裹\***

参考：[https://www.jianshu.com/p/595...](https://www.jianshu.com/p/595a13c1bbb8)
[https://blog.csdn.net/weixin_...](https://blog.csdn.net/weixin_37242696/article/details/80738392)