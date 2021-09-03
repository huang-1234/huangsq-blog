# 关于布局的一些小技巧



### 让一个盒子在X轴 和 Y 轴居中对齐

```html
<style>
  .container{
    min-height: 500px;
    display: flex;
    justify-content: center;
    /* align-items: center; */  /* 无需其他条件就可以实现 Y 轴对齐 */
    flex-wrap: wrap;
    align-content: center; /* flex-wrap != wrap; 才有效果 */
  }
</style>
<div class="container">
  <div class="date">
    <!-- 1，日期控件 - date -->
    <input type="date" value="2015-09-24"/>
    <!-- 2，时间控件 - time -->
    <input type="time" value="13:59"/>
    <input type="time" value="13:59:59"/>
    <!-- 3，日期时间控件 - datetime-local -->
    <input type="datetime-local" value="2015-09-24T13:59:59"/>
    <!-- 月控件 - month -->
    <input type="month" value="2015-09"/>
    <!-- 5，周控件 - week -->
    <input type="week" value="2015-W02"/>
    <!-- 6，日期时间控件也支持min和max属性，表示可设置的最小和最大时间 -->
    <input type="date" value="2015-09-24" min="2015-09-16" max="2015-09-26"/>
  </div>
</div>
```

