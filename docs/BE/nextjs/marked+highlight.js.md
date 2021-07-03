这两个模块需要先安装，这里我们就使用`yarn`来进行安装。打开终端，进入到`blog`目录下，然后使用下面命令进行安装。

```
yarn add marked
yarn add highlight
```

这个可能需要的时间多一点，我目前的版本是marked是0.7.0,highlight是9.15.10。如果版本有变化，导致代码没法运行，可自行查看API进行修改。

[重构`detailed.js`文件](https://jspang.com/detailed?id=52#toc374)

这里的重构主要就是替换以前的`Markdown`解决方案。在代码顶部用`import`引入刚才安装的`marked`和`highlight.js`。

引入模块

```js
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
```

引入设置一下`marked.setOptions`，里边的属性比较多，我在这里详细的介绍一下。

```js
const renderer = new marked.Renderer();

marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
  }); 

    let html = marked(props.article_content) 
```

- renderer: 这个是必须填写的，你可以通过自定义的`Renderer`渲染出自定义的格式
- gfm：启动类似Github样式的Markdown,填写true或者false
- pedatic：只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
- sanitize: 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
- tables： 支持Github形式的表格，必须打开gfm选项
- breaks: 支持Github换行符，必须打开gfm选项，填写true或者false
- smartLists：优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
- highlight: 高亮显示规则 ，这里我们将使用highlight.js来完成

** 增加Code的高亮显示 **

在设置`setOptions`属性时，可以直接设置高亮显示，代码如下：

```js
highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
```

设置完成后，你在浏览器检查代码时就可以出现hljs的样式，说明你的效果加成功了，实现了高亮显示代码。

[CSS样式的更换](https://jspang.com/detailed?id=52#toc375)

都设置好以后，是不是又觉的现在样式也不是很好看，所以可以继续设置一下CSS样式。因为我们的视频中不讲解CSS样式部分，但是我给你提供了我`detailed.css`所有代码

```css
.bread-div{
    padding: .5rem;
    border-bottom:1px solid #eee;
    background-color: #e1f0ff;
}
.detailed-title{
    font-size: 1.8rem;
    text-align: center;
    padding: 1rem;
}
.center{
    text-align: center;
}
.detailed-content{
    padding: 1.3rem;
    font-size: 1rem;
}
pre{
    display: block;
    background-color:#f3f3f3;
     padding: .5rem !important;
     overflow-y: auto;
     font-weight: 300;
     font-family: Menlo, monospace;
     border-radius: .3rem;
}
pre{
    background-color: #283646 !important;
}
pre >code{
    border:0px !important;
    background-color: #283646 !important;
    color:#FFF;

}
code {
    display: inline-block ;
    background-color:#f3f3f3;
    border:1px solid #fdb9cc;
    border-radius:3px;
    font-size: 12px;
    padding-left: 5px;
    padding-right: 5px;
    color:#4f4f4f;
    margin: 0px 3px;

}

.title-anchor{
    color:#888 !important;
    padding:4px !important;
    margin: 0rem !important;
    height: auto !important;
    line-height: 1.2rem !important;
    font-size: .7rem !important;
    border-bottom: 1px dashed #eee;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.active{
    color:rgb(30, 144, 255) !important;
}
.nav-title{
    text-align: center;
    color: #888;
    border-bottom: 1px solid rgb(30, 144, 255);

}
.article-menu{
    font-size:12px;
}
iframe{
    height: 34rem;
}
.detailed-content  img{
    width: 100%;
    border:1px solid #f3f3f3;
}
.title-level3{
    display: none !important;
}
.ant-anchor-link-title{
    font-size: 12px !important;
}
.ant-anchor-wrapper{
    padding: 5px !important;
}
```

样式复制完，我们再到浏览器中预览一下，应该就可以出现更漂亮的效果了。然后我们把右侧的导航也重新完善一下，实现对文章章节的导航效果。