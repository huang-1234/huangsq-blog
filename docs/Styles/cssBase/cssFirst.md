# css基础知识

## 所有 CSS 文本属性

| 属性                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [color](https://www.w3school.com.cn/cssref/pr_text_color.asp) | 设置文本颜色。                                               |
| [direction](https://www.w3school.com.cn/cssref/pr_text_direction.asp) | 指定文本的方向 / 书写方向。                                  |
| [letter-spacing](https://www.w3school.com.cn/cssref/pr_text_letter-spacing.asp) | 设置字符间距。                                               |
| [line-height](https://www.w3school.com.cn/cssref/pr_dim_line-height.asp) | 设置行高。                                                   |
| [text-align](https://www.w3school.com.cn/cssref/pr_text_text-align.asp) | 指定文本的水平对齐方式。                                     |
| [text-decoration](https://www.w3school.com.cn/cssref/pr_text_text-decoration.asp) | 指定添加到文本的装饰效果。                                   |
| [text-indent](https://www.w3school.com.cn/cssref/pr_text_text-indent.asp) | 指定文本块中首行的缩进。                                     |
| [text-shadow](https://www.w3school.com.cn/cssref/pr_text-shadow.asp) | 指定添加到文本的阴影效果。                                   |
| [text-transform](https://www.w3school.com.cn/cssref/pr_text_text-transform.asp) | 控制文本的大小写。                                           |
| [text-overflow](https://www.w3school.com.cn/cssref/pr_text-overflow.asp) | 指定应如何向用户示意未显示的溢出内容。                       |
| [unicode-bidi](https://www.w3school.com.cn/cssref/pr_unicode-bidi.asp) | 与 direction 属性一起使用，设置或返回是否应重写文本来支持同一文档中的多种语言。 |
| [vertical-align](https://www.w3school.com.cn/cssref/pr_pos_vertical-align.asp) | 指定文本的垂直对齐方式。                                     |
| [white-space](https://www.w3school.com.cn/cssref/pr_text_white-space.asp) | 指定如何处理元素内的空白。                                   |
| [word-spacing](https://www.w3school.com.cn/cssref/pr_text_word-spacing.asp) | 设置单词间距。                                               |

比如text-shadow

```css
h1 {
  text-shadow: 2px 2px red; // 给文字加红色阴影
}
```

## 所有 CSS 背景属性

在使用简写属性时，属性值的顺序为：

- background-color
- background-image
- background-repeat
- background-attachment
- background-position

属性值之一缺失并不要紧，只要按照此顺序设置其他值即可。请注意，在上面的例子中，我们没有使用 background-attachment 属性，因为它没有值。



| 属性                                                         | 描述                                               |
| :----------------------------------------------------------- | :------------------------------------------------- |
| [background](https://www.w3school.com.cn/cssref/pr_background.asp) | 在一条声明中设置所有背景属性的简写属性。           |
| [background-attachment](https://www.w3school.com.cn/cssref/pr_background-attachment.asp) | 设置背景图像是固定的还是与页面的其余部分一起滚动。 |
| [background-clip](https://www.w3school.com.cn/cssref/pr_background-clip.asp) | 规定背景的绘制区域。                               |
| [background-color](https://www.w3school.com.cn/cssref/pr_background-color.asp) | 设置元素的背景色。                                 |
| [background-image](https://www.w3school.com.cn/cssref/pr_background-image.asp) | 设置元素的背景图像。                               |
| [background-origin](https://www.w3school.com.cn/cssref/pr_background-origin.asp) | 规定在何处放置背景图像。                           |
| [background-position](https://www.w3school.com.cn/cssref/pr_background-position.asp) | 设置背景图像的开始位置。                           |
| [background-repeat](https://www.w3school.com.cn/cssref/pr_background-repeat.asp) | 设置背景图像是否及如何重复。                       |
| [background-size](https://www.w3school.com.cn/cssref/pr_background-size.asp) | 规定背景图像的尺寸。                               |

## CSS 字体属性

### 字体属性

为了缩短代码，也可以在一个属性中指定所有单个字体属性。

font 属性是以下属性的简写属性：

- font-style
- font-variant
- font-weight
- font-size/line-height
- font-family



使用简写声明设置一些字体属性：

```css
p.a {
font: 20px Arial, sans-serif;
}
p.b {
  font: italic small-caps bold 12px/30px Georgia, serif;
}
```

### 所有 CSS 字体属性

| 属性                                                         | 描述                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| [font](https://www.w3school.com.cn/cssref/pr_font_font.asp)  | 简写属性。在一条声明中设置所有字体属性。 |
| [font-family](https://www.w3school.com.cn/cssref/pr_font_font-family.asp) | 规定文本的字体系列（字体族）。           |
| [font-size](https://www.w3school.com.cn/cssref/pr_font_font-size.asp) | 规定文本的字体大小。                     |
| [font-style](https://www.w3school.com.cn/cssref/pr_font_font-style.asp) | 规定文本的字体样式。                     |
| [font-variant](https://www.w3school.com.cn/cssref/pr_font_font-variant.asp) | 规定是否以小型大写字母的字体显示文本。   |
| [font-weight](https://www.w3school.com.cn/cssref/pr_font-weight.asp) | 规定字体的粗细。                         |

## 浮动和清除

## float 属性

float 属性用于定位和格式化内容，例如让图像向左浮动到容器中的文本那里。

float 属性可以设置以下值之一：

- left - 元素浮动到其容器的左侧
- right - 元素浮动在其容器的右侧
- none - 元素不会浮动（将显示在文本中刚出现的位置）。默认值。
- inherit - 元素继承其父级的 float 值

最简单的用法是，float 属性可实现（报纸上）文字包围图片的效果。

## clear 属性

clear 属性指定哪些元素可以浮动于被清除元素的旁边以及哪一侧。

clear 属性可设置以下值之一：

- none - 允许两侧都有浮动元素。默认值
- left - 左侧不允许浮动元素
- right- 右侧不允许浮动元素
- both - 左侧或右侧均不允许浮动元素
- inherit - 元素继承其父级的 clear 值

使用 clear 属性的最常见用法是在元素上使用了 float 属性之后。

在清除浮动时，应该对清除与浮动进行匹配：如果某个元素浮动到左侧，则应清除左侧。您的浮动元素会继续浮动，但是被清除的元素将显示在其下方。

下例将清除向左的浮动。表示在（div 的）左侧不允许出现浮动元素：

## clearfix Hack

如果一个元素比包含它的元素高，并且它是浮动的，它将“溢出”到其容器之外：

然后我们可以向包含元素添加 overflow: auto;，来解决此问题：

### 实例

```css
.clearfix {
  overflow: auto;
}
```

## CSS 函数

CSS 函数用作各种CSS属性的值。

| 函数                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [attr()](https://www.w3school.com.cn/cssref/func_attr.asp)   | 返回所选元素的属性值。                                       |
| [calc()](https://www.w3school.com.cn/cssref/func_calc.asp)   | 允许您执行计算来确定 CSS 属性值。                            |
| [cubic-bezier()](https://www.w3school.com.cn/cssref/func_cubic-bezier.asp) | 定义三次贝塞尔曲线。                                         |
| [hsl()](https://www.w3school.com.cn/cssref/func_hsl.asp)     | 使用色相-饱和度-亮度模型（HSL）定义颜色。                    |
| [hsla()](https://www.w3school.com.cn/cssref/func_hsla.asp)   | 使用色相-饱和度-亮度-阿尔法模型（HSLA）定义颜色。            |
| [linear-gradient()](https://www.w3school.com.cn/cssref/func_linear-gradient.asp) | 将线性渐变设置为背景图像。定义至少两种颜色（从上到下）。     |
| [radial-gradient()](https://www.w3school.com.cn/cssref/func_radial-gradient.asp) | 将径向渐变设置为背景图像。定义至少两种颜色（从中心到边缘）。 |
| [repeating-linear-gradient()](https://www.w3school.com.cn/cssref/func_repeating-linear-gradient.asp) | 重复线性渐变。                                               |
| [repeating-radial-gradient()](https://www.w3school.com.cn/cssref/func_repeating-radial-gradient.asp) | 重复径向渐变。                                               |
| [rgb()](https://www.w3school.com.cn/cssref/func_rgb.asp)     | 使用红-绿-蓝模型（RGB）定义颜色。                            |
| [rgba()](https://www.w3school.com.cn/cssref/func_rgba.asp)   | 使用红-绿-蓝-阿尔法模型（RGB）定义颜色。                     |
| [var()](https://www.w3school.com.cn/cssref/func_var.asp)     | 插入自定义属性的值。                                         |

