# 现点击按钮跳到当前页面顶部或底部

### 点击跳转到顶部
第一种最简单的方式
```html
<span class="bottom-bar-item"><a href="#">↑</a></span>
```
第二种jQuery
```html
<span class="bottom-bar-item"><a href="javascript:void(0)" onclick="goTop()">↑</a></span>

<script>
    function goTop() {
        $('html, body').animate({scrollTop:0}, 'slow');
    }
</script>
```
### 点击跳转到底部
```html
<span class="bottom-bar-item"><a href="javascript:void(0)" onclick="goBottom()">↓</a></span>
<script>
    function goBottom() {
        window.scrollTo(0, document.documentElement.scrollHeight-document.documentElement.clientHeight);
    }
</script>
```