# 操作DOM

### 为什么说 DOM 操作耗时

要解释 DOM 操作带来的性能问题，我们不得不提一下**浏览器的工作机制**。

### 线程切换

如果你对浏览器结构有一定了解，就会知道浏览器包含渲染引擎（也称浏览器内核）和 JavaScript 引擎，它们都是单线程运行。单线程的优势是开发方便，避免多线程下的死锁、竞争等问题，劣势是失去了并发能力。

浏览器为了避免两个引擎同时修改页面而造成渲染结果不一致的情况，增加了另外一个机制，这两个引擎具有互斥性，也就是说在某个时刻只有一个引擎在运行，另一个引擎会被阻塞。操作系统在进行线程切换的时候需要保存上一个线程执行时的状态信息并读取下一个线程的状态信息，俗称**上下文切换**。而这个操作相对而言是比较耗时的。

每次 DOM 操作就会引发线程的上下文切换——从 JavaScript 引擎切换到渲染引擎执行对应操作，然后再切换回 JavaScript 引擎继续执行，这就带来了**性能损耗**。单次切换消耗的时间是非常少的，但是如果频繁地大量切换，那么就会产生性能问题。

比如下面的测试代码，循环读取一百万次 DOM 中的 body 元素的耗时是读取 JSON 对象耗时的 10 倍。

```html
<script>
  // 测试次数：一百万次
  const times = 1000000
  // 缓存body元素
  console.time('object')

  let body = document.body

  // 循环赋值对象作为对照参考
  for (let i = 0;i < times;i++) {
    let tmp = body
  }
  console.timeEnd('object')// object: 3.2197265625 ms
  console.time('dom')
  // 循环读取body元素引发线程切换
  for (let i = 0;i < times;i++) {
    let tmp = document.body
  }
  console.timeEnd('dom')// dom: 33.347900390625 ms
</script>
```



### 重新渲染

另一个更加耗时的因素是元素及样式变化引起的再次渲染，在渲染过程中最耗时的两个步骤为**重排**（Reflow）与**重绘**（Repaint）。

浏览器在渲染页面时会将 HTML 和 CSS 分别解析成 DOM 树和 CSSOM 树，然后合并进行排布，再绘制成我们可见的页面。如果在操作 DOM 时涉及到元素、样式的修改，就会引起渲染引擎重新计算样式生成 CSSOM 树，同时还有可能触发对元素的重新排布（简称“重排”）和重新绘制（简称“重绘”）。

> 可能会影响到其他元素排布的操作就会引起重排，继而引发重绘，比如：

- 修改元素边距、大小
- 添加、删除元素
- 改变窗口大小

> 与之相反的操作则只会引起重绘，比如：

- 设置背景图片
- 修改字体颜色
- 改变 visibility 属性值

如果想了解更多关于重绘和重排的样式属性，可以参看这个网址：https://csstriggers.com/。

下面是两段验证代码，我们通过 Chrome 提供的性能分析工具来对渲染耗时进行分析。

第一段代码，通过修改 div 元素的边距来触发重排，渲染耗时（粗略地认为渲染耗时为紫色 Rendering 事件和绿色 Painting 事件耗时之和）3045 毫秒。

#### 在循环外操作元素

比如下面两段测试代码对比了读取 1000 次 JSON 对象以及访问 1000 次 body 元素的耗时差异，相差一个数量级。

```js
const times = 10000;
console.time('switch')
for (let i = 0; i < times; i++) {
  document.body === 1 ? console.log(1) : void 0;
}
console.timeEnd('switch') // 1.873046875ms
var body = JSON.stringify(document.body)
console.time('batch')
for (let i = 0; i < times; i++) {
  body === 1 ? console.log(1) : void 0;
}
console.timeEnd('batch') // 0.846923828125ms

```

### 批量操作元素

比如说要创建 1 万个 div 元素，在循环中直接创建再添加到父元素上耗时会非常多。如果采用字符串拼接的形式，先将 1 万个 div 元素的 html 字符串拼接成一个完整字符串，然后赋值给 body 元素的 innerHTML 属性就可以明显减少耗时。

```js
const times = 1000;
console.time('createElement')
for (let i = 0;i < times;i++) {
  const div = document.createElement('div')
  document.body.appendChild(div)
}
console.timeEnd('createElement')// 10000次：54.964111328125ms 1000次：createElement: 1.3271484375 ms
console.time('innerHTML')
let html = ''
for (let i = 0;i < times;i++) {
  html += '<div></div>'
}
document.body.innerHTML += html // 10000次：31.919921875ms 1000次：innerHTML: 2.67236328125 ms
console.timeEnd('innerHTML')
```

