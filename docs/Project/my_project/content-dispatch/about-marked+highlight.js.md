# react中使用marked+highlight.js 实现高亮效果

## 一、背景

最近在鼓捣md文件转html的相关东西，使用的marked第三方插件， 遇到代码高亮需求时，卡了半天。。一直不知道为什么无法高亮显示。 解决后记录下来供参考

## 二、问题

问题： react 使用marked+highlight.js样式不生效

原因： 需要手动引入highlight.js的样式文件

## 三、[markedjs官网](https://marked.js.org/#/USING_ADVANCED.md#highlight)

### 官网demo



```javascript
// Create reference instance
var myMarked = require('marked');

// Set options
// `highlight` example uses `highlight.js`
myMarked.setOptions({
  renderer: new myMarked.Renderer(),
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

// Compile
console.log(myMarked('I am using __markdown__.'));
```

### 说明



```javascript
highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
}
```

code 参数是`<code>`中的初始内容， 该函数返回的是经highlight `处理` （给特定内容添加上class）后的内容。

## 四、react 使用

1. 安装highlight.js

```shell
 npm install highlight.js 
```

1. 组件中引入（重点！！！）



```javascript
import hljs  from 'highlight.js'
import 'highlight.js/styles/github.css';
```

`highlight需要自己手动引入css文件`，否则页面样式不生效，只相当于给特殊内容添加了class

1. 初始化参数



```javascript
marked.setOptions({
  renderer: renderer,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
}); 
```

1. 调用



```javascript
<div dangerouslySetInnerHTML = {{__html: marked(this.props.docContent, { renderer: renderer }, )}}></div>
```

#### 调试代码，发现code中有特殊的class，则说明，highlight处理标签已成功



## 五、相关文章

[marked+highlight.js 高亮效果没出来，谁有例子](https://cnodejs.org/topic/53bcf214a3ccaece737e3f0c)

[highlight.js怎么修改高亮风格](https://segmentfault.com/q/1010000004077054?_ea=490106)

最近在做一个**Markdown**编辑器给自己用，基于**nw.js**。
想添加*代码高亮*功能，用的是[highlight.js](https://highlightjs.org/)。
在index.html中加入css文件（hybrid.css放在index.html上一层的css文件夹中），代码如下：

```
<link rel="stylesheet" type="text/css" href="../css/hybrid.css"
 media="screen" />
```

在**editor.js**中的代码如下：

```
exports.reload = function(){
    var marked = require("marked");
    var hljs = require("highlight.js");
    marked.setOptions({
    renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight:function(code){return hljs.highlightAuto(code).value;}
    });
    var resultDiv = global.$('.md_result');
    var textEditor = global.$('#editor');
    var text = textEditor.val();
    resultDiv.html(marked(text));
};
```

关键代码是：

```
var hljs = require("highlight.js");
highlight:function(code){return hljs.highlightAuto(code).value;}
```

这个可以用，但是渲染效果不是hybrid.css的风格，而是默认的格式。

PS: markdown基础程序基于[Node Webkit (NW.js) tutorial: creating a Markdown editor](https://ducode.org/node-webkit-tutorial-creating-a-markdown-editor.html)

**请问怎么做才能用到hybrid.css？**
谢谢！！

修改或者替换css就好了

或者用源码里面提供的
https://github.com/isagalaev/highlight.js/tree/master/src/styles