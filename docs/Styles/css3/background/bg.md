# 背景





## 背景色

background-color





## 背景填充

# background-clip

`background-clip` 设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。

```css
/* Keyword values */
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
background-clip: text;

/* Global values */
background-clip: inherit;
background-clip: initial;
background-clip: unset;
```

值

```css
border-box
背景延伸至边框外沿（但是在边框下层）。
padding-box
背景延伸至内边距（padding）外沿。不会绘制到边框处。
content-box
背景被裁剪至内容区（content box）外沿。
text 
背景被裁剪成文字的前景色。
```



> 实例

```html
<style>	
p {
  border: .8em darkviolet;
  border-style: dotted double;
  margin: 1em 0;
  padding: 1.4em;
  background: linear-gradient(60deg, red, yellow, red, yellow, red);
  font: 900 1.2em sans-serif;
  text-decoration: underline;
}

.border-box { background-clip: border-box; }
.padding-box { background-clip: padding-box; }
.content-box { background-clip: content-box; }

.text {
  background-clip: text;
  -webkit-background-clip: text;
  color: rgba(0,0,0,.2);
}
</style>
<p class="border-box">The background extends behind the border.</p>
<p class="padding-box">The background extends to the inside edge of the border.</p>
<p class="content-box">The background extends only to the edge of the content box.</p>
<p class="text">The background is clipped to the foreground text.</p>
```

