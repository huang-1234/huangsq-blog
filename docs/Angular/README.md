# Angular

Angular（通常被称为 "Angular 2+"或 "Angular v2及以上版本"）是一个基于TypeScript的开源Web应用框架，由Google的Angular团队和由个人以及企业组成的社区领导。 Angular是由构建AngularJS的同一个团队从零开始重写的。

**Angular和AngularJS的区别**

- Angular没有 "Scope"或控制器的概念，相反，它使用组件的层次结构作为其主要的架构特征。
- Angular有不同的表达式语法，重点是"[]"用于属性绑定，"() "用于事件绑定
- 模块化 - 许多核心功能已转移到模块上
- Angular推荐使用微软的TypeScript语言，它引入了以下特性。

（1）静态键入，包括Generics

（2）注解

- TypeScript是ECMAScript 6 (ES6)的超集，向后兼容ECMAScript 5（即：JavaScript）。
- 动态加载
- 异步模板编译
- 由RxJS提供的迭代回调。RxJS限制了状态的可见性和调试，但这些问题可以通过像ngReact或ngrx这样的反应式附加组件来解决。
- 支持Angular Universal，可以在服务器上运行Angular应用程序。

**历史**

**命名**

最初，AngularJS的重写被称为 "Angular 2"，但这导致了开发人员的迷糊。为了澄清，团队宣布，每个框架使用不同的术语，其中 "AngularJS "指的是1.X版本， "Angular " 指的是2及以上版本。

**版本2**

Angular 2.0在2014年10月22-23日的ng-Europe大会上宣布。2.0版本的剧烈变化在开发者中引起了相当大的争议。

2015年4月30日，Angular开发者宣布Angular 2从Alpha转为开发者预览版，2015年12月Angular 2转为Beta版，2016年5月发布了第一个发布候选版本，2016年9月14日发布了最终版本。

**版本4**

2016年12月13日Angular 4发布，跳过了3，避免了因路由器包的版本错位导致的混乱，当时已经发布的版本为v3.3.0。最终版本于2017年3月23日发布，Angular 4向后兼容Angular 2。

Angular 4.3版本是一个小版本，它是4.x.x版本的替换版本。

**4.3版本的功能**

- 介绍了HttpClient，一个更小、更容易使用、更强大的HTTP请求库。
- 为守护者和解析器提供了新的路由器生命周期事件。四个新事件。GuardsCheckStart、GuardsCheckEnd、ResolveStart、ResolveEnd加入了现有的NavigationStart等生命周期事件集。
- 有条件地禁用动画。

**版本5**

Angular 5于2017年11月1日发布，Angular 5的主要改进包括支持渐进式Web应用、构建优化器以及与Material Design相关的改进。

**版本6**

Angular 6于2018年5月4日发布。这个版本，关注的重点不在于底层框架，更多的是工具链，以及让Angular在未来的更新和升级更加容易，比如：ngupdate、ng add、Angular元素、Angular Material+CDK组件、Angular Material入门组件、CLI工作区、库支持、树形摇动提供者、动画性能提升、RxJS v6。

**版本7**

Angular 7已于2018年10月18日发布。更新内容涉及到应用性能、Angular Material & CDK、虚拟滚动、Selects的可访问性改进、现在支持自定义元素使用Web标准的内容投影，以及关于Typescript 3.1、RxJS 6.3、Node 10（仍支持Node 8）的依赖性更新。

**版本8**

Angular 8已于2019年5月28日发布。具有所有应用代码的差异化加载、惰性路由的动态导入、Web工作者、TypeScript 3.4支持、以及Angular Ivy作为预览版可配置使用。Angular

**Ivy预览包括：**

- 生成的代码，在运行时更容易阅读和调试。
- 更快的重建时间
- 减少有效载荷
- 改进了模板类型检查
- 向后兼容

**版本9**

Angular 9已于2020年2月6日发布。第9版在默认情况下使用Ivy编译器。Angular可以与TypeScript 3.6和3.7兼容。除了数百个bug修复之外，Ivy编译器和运行时还提供了许多优势:

- 更小的软件包
- 更快的测试
- 更好的调试
- 改进的CSS类和样式绑定
- 改进的类型检查
- 改善了构建错误
- 改善了构建时间，默认开启AOT功能
- 提高国际化功能

**特点**

**组件化**

一个组件例子

**Html部分**

**常用命令**

从终端上，全局安装Angular CLI：

**npm install -g @angular/cli**

使用 ng new 命令创建一个新的 Angular CLI 工作区:

**ng new my-project-name**

开发环境运行：

**ng serve**

生产环境打包：

**ng build --prod**

**【官方网站】**

[https://angular.io/](https://link.zhihu.com/?target=https%3A//angular.io/)

**【最新版本】**

9.1.2于2020年4月15日

**【授权】**

MIT License