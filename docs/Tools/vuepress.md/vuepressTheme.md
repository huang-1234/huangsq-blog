# vuepress主题配置

在.vuepress/styles/文件夹下面添加一个palette.styl样式文件，加上下面的样式即可

```styl
$accentColor =blue//默认主题颜色
$textColor = black//默认字体颜色
$borderColor = #eaecef//默认边框颜色
$codeBgColor = #282c34//默认背景颜色

//示例修改相关样式f12找到需要修改的地方找到对应class类拿过来直接用就行了
.sidebar-group.is-sub-group > .sidebar-heading:not(.clickable){
  opacity :1
}
```