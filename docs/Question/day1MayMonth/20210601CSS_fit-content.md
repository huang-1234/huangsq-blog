# CSS之问

## 让div宽度自适应文字内容

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
  .box1{
    background-color:pink;
    height: 2rem;
    width: -webkit-fit-content;
    margin-top: 0.5rem;
    line-height: 2rem;
  }
  </style>
</head>
<body>
  <div class="box1" draggable="true" >可以拖动的盒子随着文字的长度改变而改变</div>
  <div class="box1" draggable="true" >可以拖动的盒子</div>
</body>
</html>
```

**直接用css3的fit-content：**

```css
width:fit-content;
width:-webkit-fit-content;
width:-moz-fit-content;
```