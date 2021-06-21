## vue3api和hooks理念

作者：萧子山
链接：https://zhuanlan.zhihu.com/p/363709874
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



> 告别捆绑开发, 按需加载就是快 ! [https://vitejs.dev/guide/why.html#the-problems](https://link.zhihu.com/?target=https%3A//vitejs.dev/guide/why.html%23the-problems)

大家都使用过 [webpack](https://link.zhihu.com/?target=https%3A//webpack.js.org/)，[Rollup](https://link.zhihu.com/?target=https%3A//rollupjs.org/)和[Parceljs](https://link.zhihu.com/?target=https%3A//parceljs.org/) 等工具构建我们的前端项目, 但是，随着我们开始构建越来越雄心勃勃的应用程序，我们正在处理的JavaScript数量也呈指数增长。大型项目包含数千个模块的情况并不少见。我们开始遇到基于JavaScript的工具的性能瓶颈：启动开发服务器通常会花费不合理的长时间等待（有时可能长达数分钟！），即使使用HMR，文件编辑也可能需要花费几秒钟的时间才能反映出来。在浏览器中。缓慢的反馈循环会极大地影响开发人员的生产力和幸福感。

### **Vite 如何优化服务器启动缓慢**

Vite通过首先将应用程序中的模块分为两类来缩短开发服务器的启动时间：**依赖项**和**源代码**。

- **依赖关系**大多是普通的JavaScript，在开发过程中不会经常更改。一些较大的依赖项（例如，具有数百个模块的组件库）的处理成本也很高。依赖关系也可能以各种模块格式（例如ESM或CommonJS）提供。
  Vite [预束依赖性](https://link.zhihu.com/?target=https%3A//vitejs.dev/guide/dep-pre-bundling.html)使用[esbuild](https://link.zhihu.com/?target=https%3A//esbuild.github.io/)。Esbuild是用Go编写的，并且与基于JavaScript的捆绑器相比，捆绑前的依赖关系要快10-100倍。
- **源代码**通常包含需要转换的非普通JavaScript（例如JSX，CSS或Vue / Svelte组件），并且将经常进行编辑。同样，并非所有源代码都需要同时加载（例如，使用基于路由的代码拆分）。
  Vite通过[本机ESM](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)提供源代码。这实质上是让浏览器接管捆绑器的部分工作：Vite只需要根据浏览器的要求按需转换和提供源代码即可。条件动态导入后面的代码只有在当前屏幕上实际使用时才被处理。

作者：萧子山
链接：https://zhuanlan.zhihu.com/p/363709874
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



### **Vite 如何优化代码热更新慢**

在基于捆绑程序的构建设置中编辑文件时，由于显而易见的原因，重建整个捆绑软件效率很低：更新速度会随着应用程序的大小线性降低。

某些捆绑程序开发服务器在内存中运行捆绑程序，因此仅在文件更改时才需要使模块图的一部分无效，但仍需要重新构建整个捆绑程序并重新加载网页。重建捆绑包可能会很昂贵，并且重新加载页面会破坏应用程序的当前状态。这就是为什么某些捆绑软件支持热模块更换（HMR）的原因：允许模块“热更换”自身而不影响页面的其余部分。这极大地改善了DX-但是，实际上，我们发现，随着应用程序大小的增长，甚至HMR更新速度也会大大降低。

在Vite中，HMR是在本机ESM上执行的。编辑文件时，Vite只需要使已编辑模块与其最接近的HMR边界之间的链精确失效（大多数情况下，仅是模块本身）即可，无论应用程序的大小如何，都能始终如一地快速更新HMR。

Vite还利用HTTP标头来加快整个页面的重新加载速度（再次，让浏览器为我们做更多的工作）：源代码模块请求通过设置为有条件的`304 Not Modified`，而依赖模块请求通过进行了强烈缓存，`Cache-Control: max-age=31536000,immutable`因此它们不会再次访问服务器一旦缓存。

**一旦您体验了Vite的速度，我们高度怀疑您是否愿意忍受捆绑开发。**

> 诸多先进的特性

- Vite提供一流的Vue支持。

- Vite支持`.ts`开箱即用地导入文件。

- Vite通过本机ESM提供了[HMR API](https://link.zhihu.com/?target=https%3A//vitejs.dev/guide/api-hmr.html)。具有HMR功能的框架可以利用API提供即时，准确的更新，而无需重新加载页面或破坏应用程序状态。Vite为[Vue单个文件组件](https://link.zhihu.com/?target=https%3A//github.com/vitejs/vite/tree/main/packages/plugin-vue)和[React快速刷新](https://link.zhihu.com/?target=https%3A//github.com/vitejs/vite/tree/main/packages/plugin-react-refresh)提供了第一方HMR集成。

- Vite的默认类型适用于其Node.js API。

- `.jsx`和`.tsx`文件也支持开箱即用。JSX转换也可以通过[ESBuild](https://link.zhihu.com/?target=https%3A//esbuild.github.io/)处理，并且默认为React 16风格。[此处](https://link.zhihu.com/?target=https%3A//github.com/evanw/esbuild/issues/334)跟踪了ESBuild中对React 17样式JSX的支持。

- 如果项目包含有效的PostCSS配置（例如[postcss-load-config](https://link.zhihu.com/?target=https%3A//github.com/postcss/postcss-load-config)支持的任何格式`postcss.config.js`），它将自动应用于所有导入的CSS。

- CSS预处理器, 由于Vite仅面向现代浏览器，因此建议将本机CSS变量与实现CSSWG草稿（例如[postcss-nesting](https://link.zhihu.com/?target=https%3A//github.com/jonathantneal/postcss-nesting)）并编写符合未来标准的普通CSS的PostCSS插件一起使用。

- JSON文件可以直接导入-还支持命名导入.

- Vite支持通过特殊功能从文件系统导入多个模块：`import.meta.glob`

- 构建优化 (下面列出的功能会在构建过程中自动应用)

- - 异步块加载优化
  - CSS代码分割
  - 预载指令生成
  - 异步块加载优化

## **Vue3 真香**

 7 个月前, 荣幸地宣布 Vue.js 3.0“One Piece”的正式发布。这个框架的新的主要版本提供了改进的性能、更小的捆绑大小、更好的 TypeScript 集成、用于处理大规模用例的新 API，以及为框架未来的长期迭代奠定了坚实的基础。

Vue 3 与 Vue 2 相比，在捆绑大小 (tree-shaking 时减少了 41%)、初始渲染 (快了 55%)、更新 (快了 133%) 和内存使用 (少了 54%) 方面都有[显著的性能提升](https://link.zhihu.com/?target=https%3A//docs.google.com/spreadsheets/d/1VJFx-kQ4KjJmnpDXIEaig-cVAAJtpIGLZNbv3Lr4CR0/edit%3Fusp%3Dsharing)。

**学习任何新技术前, 都建议通读一下该技术的官方文档 !**

https://vue3js.cn/docs/zh/api/

### **Vue 2 -> Vue3 的变化**

1. 创建 Vue 的方式从 `new Vue()` 变为 -> Compostition api `createApp(App)`

2. **将 Options Api 变为 -> hook 式的 Compostition api or Reactive api**

3. 1. `beforeCreate` -> use `setup()`
   2. `created` -> use `setup()`
   3. `beforeMount` -> `onBeforeMount`
   4. `mounted` -> `onMounted`
   5. `beforeUpdate` -> `onBeforeUpdate`
   6. `updated` -> `onUpdated`
   7. `beforeUnmount` -> `onBeforeUnmount`
   8. `unmounted` -> `onUnmounted`
   9. `errorCaptured` -> `onErrorCaptured`
   10. `renderTracked` -> `onRenderTracked`
   11. `renderTriggered` -> `onRenderTriggered`



1. 只允许setup函数中书写 `import {watch, onMounted, computed ...} from 'vue'` (Compostition api)
2. vue2 要迁移vue3 所需的改动, 还是挺多的.

