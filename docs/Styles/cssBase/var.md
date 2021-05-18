## CSS 变量
自定义属性（有时候也被称作CSS变量或者级联变量）是由CSS作者定义的，它包含的值可以在整个文档中重复使用。由自定义属性标记设定值（比如： --main-color: black;），由var() 函数来获取值（比如： color: var(--main-color);）

复杂的网站都会有大量的CSS代码，通常也会有许多重复的值。举个例子，同样一个颜色值可能在成千上百个地方被使用到，如果这个值发生了变化，需要全局搜索并且一个一个替换（很麻烦哎～）。自定义属性在某个地方存储一个值，然后在其他许多地方引用它。另一个好处是语义化的标识。比如，--main-text-color 会比 #00ff00 更易理解，尤其是这个颜色值在其他上下文中也被使用到。

自定义属性受级联的约束，并从其父级继承其值。

> 基本用法

声明一个自定义属性，属性名需要以两个减号（--）开始，属性值则可以是任何有效的CSS值。和其他属性一样，自定义属性也是写在规则集之内的，如下：

```cs
element {
 --main-bg-color: brown;
}
```
注意，规则集所指定的选择器定义了自定义属性的可见作用域。通常的最佳实践是定义在根伪类 :root 下，这样就可以在HTML文档的任何地方访问到它了：


```css
:root {
 --main-bg-color: brown;
}
```
然而这条规则不是绝对的，如果有理由去限制你的自定义属性，那么就应该限制。

注意：自定义属性名是大小写敏感的，--my-color 和 --My-color 会被认为是两个不同的自定义属性。

如前所述，使用一个局部变量时用 var() 函数包裹以表示一个合法的属性值：


```css
element {
 background-color: var(--main-bg-color);
}
```

```css

/* 
红橙黄绿蓝靛紫-RGB-十六进制
红：255，0，0    #FF0000
橙: 255,125,0     #FF7D00
黄：255，255，0   #FFFF00
绿：0，255，0    #00FF00
蓝：0，0，255    #0000FF
靛: 0,255,255    #00FFFF
紫: 255,0,255    #FF00FF
*/

html{
  --min-font-size:10px;
  --h1-color:#FF0000;
  --h2-color:#FF7D00;
  --h3-color:#FFFF00;
  --h4-color:#00FF00;
  --h5-color:#0000FF;
  --h6-color:#00FFFF;
  --h7-color:#FF00FF;
}

.markdown-content{
    /* font-size:16px !important; */
    font-size:var(--min-font-size) !important;
    max-height: 745px;
}
.show-html{
    padding:10px;
    border:1px solid #ddd;
    border-radius: 5px;
    font-size:var(--min-font-size);
    height: 745px;
    background-color: #f0f0f0;
    overflow: auto;
}

.show-html h1{
    font-size:30px;
    color:var(--h1-color);
}

.show-html h2{
    font-size:28px;
    border-bottom: 1px solid #cbcbcb;
    color:var(--h2-color);
}
.show-html h3{
    font-size:24px;
    color:var(--h3-color);
}
.show-html h4{
    font-size:24px;
    color:var(--h4-color);
}
.show-html h5{
    font-size:24px;
    color:var(--h5-color);
}
.show-html h6{
    font-size:24px;
    color:var(--h6-color);
}
```

