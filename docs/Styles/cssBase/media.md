# 媒体查询



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      /* 将 body 的背景色设置为棕褐色 */
      body {
        background-color: tan;
      }
      /* 在小于或等于 992 像素的屏幕上，将背景色设置为蓝色 */
      @media screen and (max-width: 992px) {
        body {
          background-color: rgb(129, 129, 167);
        }
      }
      /* 在 600 像素或更小的屏幕上，将背景色设置为橄榄色 */
      @media screen and (max-width: 600px) {
        body {
          background-color: olive;
        }
      }
      /* navbar 容器 */
      .topnav {
        overflow: hidden;
        background-color: rgb(182, 69, 69);
        width: 100%;
      }
      /* Navbar 链接 */
      .topnav a {
        float: left;
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
      }
      .topnav a:hover{
        background-color: aqua;
        color: red;
        border-radius: 2px;
      }
      /* 在宽度为 600 像素或更小的屏幕上，使菜单链接彼此堆叠，而不是并排 */
      @media screen and (max-width: 600px) {
        .topnav a {
          float: none;
          width: 10%;
        }
      }

    </style>
  </head>
  <body>
    <div class="topnav">
      <label for="id1">
        <a href="#/id1" id="id1">Home</a>
      </label>
      <label for="id2">
        <a href="#/id2" id="id2">hsq</a>
      </label>
      <label for="id3">
        <a href="#/id3" id="id3">blog</a>
      </label>
      <label for="id4">
        <a href="#/id4" id="id4">life</a>
      </label>
    </div>
  </body>

</html>

```

