## 浏览器前缀

由于浏览器厂商众多，不同的厂商有着自己的利益，所以很多时候对于同一规范并不会完全按照执行。特别是早期。对于CSS部分属性的前缀，不同的浏览器添加不同的前缀到今天来说已经是成为历史了。使用PostCSS的Autoprefixer插件可以解决这些问题，你也不需要担心CSS属性应该添加什么样的前缀。你只需要控制你自己需要兼容什么样的浏览器版本，那么这个插件就可以帮你解决后顾之忧。所以到今天，前缀已不是什么问题了？

我认为早就不应该在源代码中写私有有属性前缀了。正确的姿势是在项目构建阶段，用autoprefixer这个工具来为编译后的css自动补全所需的前缀。无论你是用webpack、gulp、grunt还是fis，它都能完美配合。
这个工具中内置了非常详尽的数据，描述每个私有有属性在浏览器下的各版本下，是否需要前缀。配置该工具的时候，只要指明需要兼容的浏览器版本，它就会很智能的按需添加前缀了。如果私有语法与标准有差异，它也能自动处理。
只有一种情况下例外，还是要写前缀，那就是你写的这条css属性没有对应的w3c标准语法。



> 应该是处理不同浏览器之间的兼容问题吧

```css
-moz-对应 Firefox,
-webkit-对应 Safari and Chrome
-o- for Opera
-ms- for Internet Explorer
```