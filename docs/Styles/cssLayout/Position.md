# position定位

##  position属性的五个值：

- static
- relative
- fixed
- absolute
- sticky

元素可以使用的顶部，底部，左侧和右侧属性定位。然而，这些属性无法工作，除非是先设定position属性。他们也有不同的工作方式，这取决于定位方法。

- `static`

  该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 `top`, `right`, `bottom`, `left` 和 `z-index `属性无效。

- `relative`

  该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。position:relative 对 table-*-group, table-row, table-column, table-cell, table-caption 元素无效。

- `absolute`

  元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

- `fixed`

  元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。`fixed` 属性会创建新的层叠上下文。当元素祖先的 `transform`, `perspective` 或 `filter` 属性非 `none` 时，容器由视口改为该祖先。

- `sticky`

  元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）


```cpp
static | relative | absolute | sticky | fixed
```

相对定位的元素是在文档中的正常位置偏移给定的值，但是不影响其他元素的偏移。下面的例子中，注意未应用定位的其它元素是按照 "Two" 在正常位置的情况下进行布局的。

 HTML 内容

```html
<div class="box" id="one">One</div>
<div class="box" id="two">Two</div>
<div class="box" id="three">Three</div>
<div class="box" id="four">Four</div>
```

#### CSS

```css
.box {
  display: inline-block;
  width: 100px;
  height: 100px;
  background: red;
  color: white;
}

#two {
  position: relative;
  top: 20px;
  left: 20px;
  background: blue;
}
```

##  sticky 粘性定位

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>hsq</title> 
<style>
div.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: 5px;
  background-color: #cae8ca;
  border: 2px solid #4CAF50;
}
</style>
</head>
<body>

<p>尝试滚动页面。</p>
<p>注意: IE/Edge 15 及更早 IE 版本不支持 sticky 属性。</p>

<div class="sticky">我是粘性定位!</div>

<div style="padding-bottom:2000px">
  <p>滚动我</p>
  <p>来回滚动我</p>
  <p>滚动我</p>
  <p>来回滚动我</p>
  <p>滚动我</p>
  <p>来回滚动我</p>
</div>

</body>
</html>
```

