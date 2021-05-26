# 学习样式中遇到的坑

**今天用webpack打包项目，安装了less-loader模块之后报错，如下图：
![less报错](error.assets/20210202134021528.png)
**原因： less-loader安装的版本过高
**解决方案：** 

1. npm uninstall less-loader

2. npm install less-loader@5.0.0

##sass

安装 sass 使用所需要的依赖

```bash
npm i sass-loader node-sass --save-dev
```

在项目中使用

```html
<style lang="scss" scoped>
</style>
```

注意这里是lang="scss"不是"sass"