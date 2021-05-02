# 回到顶部

>  描述

当滑动超过一个窗口的高度，就动态出现一个回到顶部的按钮，很多网站都有这个功能！

重点：window.scrollTo(0,0)该函数可以实现，另外可以使用

开始我是想着动态创建这个回到顶部的按钮，但是比较麻烦(多一个函数，另外样式还是一个一个加上去的)，后来先预设一个按钮，scrollTop<600,就使得dispaly=none;

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    #box1 {
      height: 600vh;
      width: 50%;
      background-color: rgb(159, 179, 123);
      display: block;
    }
    #box1 #gotoTop {
      height: 1.5rem;
      width: fit-content;
      background-color: rgb(180, 180, 206);
      border-radius: 0.3rem;
      position: fixed;
      right: 2rem;
      bottom: 2rem;
    }
  </style>
</head>
<body>
  <div id="box1">
    <button onclick="gotoWhere(0,600)" id="btn1">去600px的地方</button>
    <button id="btn2" style="height: 90vh;">btn2</button>
    <button id="gotoTop" data-v-49f63007 title="回到顶部" onclick="gotoWhere(0,0)" style="display: none;">
      <i >回到顶部</i>
    </button>
  </div>
  <script>
    function gotoWhere(x, y) {
      window.scrollTo(x, y)
    }
    function watchScroll(top) {
      return function () {
        let wp = document.body.scrollTop || document.documentElement.scrollTop;
        let gotoTop = document.getElementById('gotoTop');
        if (wp > top) {
          gotoTop.style.display = null;
        } else {
          gotoTop.style.display = 'none';
        }
      }
    }
    window.onscroll = watchScroll(580)

  </script>
</body>
</html>

```

