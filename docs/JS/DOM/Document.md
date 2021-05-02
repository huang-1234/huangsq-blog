# Document 对象

## JS中document对象

## 对象属性
```js
document.title //设置文档标题等价于HTML的`<title>`标签
document.bgColor //设置页面背景色
document.fgColor //设置前景色(文本颜色)

document.linkColor //未点击过的链接颜色
document.alinkColor //激活链接(焦点在此链接上)的颜色
document.vlinkColor //已点击过的链接颜色

document.URL //设置URL属性从而在同一窗口打开另一网页
document.fileCreatedDate //文件建立日期，只读属性
document.fileModifiedDate //文件修改日期，只读属性
document.fileSize //文件大小，只读属性
document.cookie //设置和读出cookie
document.charset //设置字符集 简体中文:gb2312
```

## 对象方法
```js
document.write() //动态向页面写入内容
document.createElement(Tag) //创建一个html标签对象
document.getElementById(ID) //获得指定ID值的对象
document.getElementsByName(Name) //获得指定Name值的对象
document.body.appendChild(oTag)
```
## body-主体子对象
```js
document.body          //指定文档主体的开始和结束等价于<body></body>
document.body.bgColor      //设置或获取对象后面的背景颜色
document.body.link       //未点击过的链接颜色
document.body.alink       //激活链接(焦点在此链接上)的颜色
document.body.vlink       //已点击过的链接颜色
document.body.text       //文本色
document.body.innerText     //设置<body>...</body>之间的文本
document.body.innerHTML     //设置<body>...</body>之间的HTML代码
document.body.topMargin     //页面上边距
document.body.leftMargin    //页面左边距
document.body.rightMargin    //页面右边距
document.body.bottomMargin   //页面下边距
document.body.background    //背景图片
document.body.appendChild(oTag) //动态生成一个HTML对象
```
## 常用对象事件:
```js
document.body.onclick="func()"       //鼠标指针单击对象是触发
document.body.onmouseover="func()"     //鼠标指针移到对象时触发
document.body.onmouseout="func()"      //鼠标指针移出对象时触发
```
## location:
```js
document.location.hash     // #号后的部分 VS  window.location.hash
document.location.host     // 域名+端口号
document.location.hostname   // 域名
document.location.href     // 完整URL
document.location.pathname   // 目录部分(应用程序)
document.location.port     // 端口号
document.location.protocol   // 网络协议(http:)
document.location.search    // ?号后的部分
```
**常用对象事件:**
```js
documeny.location.reload()     //刷新网页
document.location.reload(URL)    //打开新的网页
document.location.assign(URL)    //打开新的网页
document.location.replace(URL)   //打开新的网页
```


## 三者的区别
```js
document.href，document.location，window.location区别

document.href="http://www.master.net" 

document.location="http://www.master.net" 

window.location="http://www.master.net" 
```
只是属于包含的问题，一个是window,一个是document

location 是个对象，比如本页的document.location和window.location，它的属性有：
```js
  location.hostname  =  community.csdn.net 

  location.href  =  http://community.csdn.net/Expert/topic/4033/4033372.xml?temp=2.695864E-02 

  location.host  =  community.csdn.net 

  location.hash  =  
  location.port  =  
  location.pathname  =  /Expert/topic/4033/4033372.xml 

  location.search  =  ?temp=2.695864E-02 

  location.protocol  =  http:  
```
  href 是location的属性，类别是string。用户不能改变document.location(因为这是当前显示文档的位置)。但是可以改变window.location (用其它文档取代当前文档) . document.location是只读的。window.location是可读可写的。 

# JS document(文档节点)

文档节点代表整个 HTML 文档，在 JS 中使用 document 即可访问。document 也叫“根节点”，它是文档内其他节点的访问入口，提供了操作其他节点的方法。主要特征值：nodeType 等于 9、nodeName 等于 "#document"、nodeValue 等于 null、parentNode 等于 null、ownerDocument 等于 null。

在 HTML 文档中，文档节点是唯一的，也是只读的。

## 访问文档

在不同环境中，获取文档节点的迭代不同。具体说明如下：

- 在文档内部节点，使用 ownerDocument 访问。
- 在脚本中，使用 document 访问。
- 在框架页，使用 contentDocument 访问。
- 在异步通信中，使用 XMLHttpRequest 对象的 responseXML 访问。

## 访问子节点

文档子节点包括以下类型：

- doctype 文档类型，如 <!doctype html>。
- html 元素，如 <html>。
- 处理指令，如 <?xml-stylesheet type="text/xsl" href="xsl.xsl"?>。
- 注释，如 <!--注释-->


访问方法说明如下：

- 使用 document.documentElement 可以访问 html 元素。
- 使用 document.doctype 可以访问 doctype。注意，部分浏览器不支持。
- 使用 document.childNodes 可以遍历子节点。
- 使用 document.firstChild 可以访问第一个子节点，一般为 doctype。
- 使用 document.lastChild 可以访问最后一个子节点，如 html 元素或者注释。

## 访问特殊元素

文档中存在很多特殊元素，使用下面的方法可以获取，若获取不到则返回 null。

- 使用 document.body 可以访问 body 元素。
- 使用 document.head 可以访问 head 元素。
- 使用 document.defaultView 可以访问默认视图，即所属的窗口对象 window。
- 使用 document.scrollingElement 可以访问文档内滚动的元素。
- 使用 document.activeElement 可以访问文档内获取焦点的元素。
- 使用 document.fullscreenElement 可以访问文档内正在全屏显示的元素。

## 访问元素集合

document 包含一组集合对象，使用它们可以快速访问文档内元素，简单说明如下：

- document.anchors：返回所有设置 name 属性的 <a> 标签。
- document.links：返回所有设置 href 属性的 <a> 标签。
- document.forms：返回所有 form 对象。
- document.images：返回所有 image 对象。
- document.applets：返回所有 applet 对象。
- document.embeds：返回所有 embed 对象。
- document.plugins：返回所有 plugin 对象。
- document.scripts：返回所有 script 对象。
- document.styleSheets：返回所有样式表集合。

## 访问文档信息

document 包含很多信息，简单说明如下：

#### 静态信息

- document.URL：返回当前文档的网址。
- document.domain：返回当前文档的域名，不包含协议和接口。
- document.location：访问 location 对象。
- document.lastModified：返回当前文档最后修改的时间。
- document.title：返回当前文档的标题。
- document.characterSet：返回当前文档的编码。
- document.referrer：返回当前文档的访问者来自哪里。
- document.dir：返回文字方向。
- document.compatMode：返回浏览器处理文档的模式，值包括 BackCompat（向后兼容模式）和 CSS1Compat（严格模式）。

#### 状态信息

- document.hidden：表示当前页面是否可见。如果窗口最小化、切换页面，则 document.hidden 返回 true。
- document.visibilityState：返回文档的可见状态。取值包括：visible（可见）、hidden（不可见）、prerender（正在渲染）、unloaded（已卸载）。
- document.readyState：返回当前文档的状态。取值包括：loading（正在加载）、interactive（加载外部资源）、complete（加载完成）。

## 访问文档元素

document 对象包含多个访问文档内元素的方法，简单说明如下：

- getElementById()：返回指定 id 属性值的元素。注意，id 值要区分大小写。如果找到多个 id 相同的元素，则返回第一个元素；如果没有找到指定 id 值得元素，则返回 null。
- getElementsByTagName()：返回所有指定标签名称的元素节点。
- getElementsByName()：返回所有指定名称（name 属性值）的元素节点。该方法多用于表单结构中，获取单选按钮组或复选框组。


getElementsByName() 方法返回的是一个 HTMLCollection 对象，与 nodeList 对象类似，可以使用方括号语法或者 item() 方法访问 HTMLCollection 对象中的元素，并通过 length 属性取得这个对象中元素的数量。