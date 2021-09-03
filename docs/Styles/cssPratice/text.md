# 关于文本的小技巧



## using ellipsis to truncate

> css 单行文本溢出显示省略号

```html
<style>
  .truncate {
    width: 100px;
    height: 20px;
    white-space: nowrap;
    overflow: hidden; /* 防止文本溢出 */
    text-overflow: ellipsis;
    background-color: pink;
  }
</style>
<div class="truncate">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</div>
```

