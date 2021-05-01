# drag拖动

先简单实现一个

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
        background-color: pink;
        height: 2rem;
        width: -webkit-fit-content;
        margin-top: 0.5rem;
        line-height: 2rem;
      }
      #container1 {
        height: 5rem;
        min-width: 10rem;
        width: fit-content;
        background-color: #a8c080;
        border:#458ddf 1px;
        margin-top: 1rem;
      }

      #container2 {
        height: 2rem;
        min-width: 10rem;
        width: fit-content;
        background: #a7df45;
        margin-top: 1rem;
      }
    </style>
  </head>
  <body>
    <div class="box1" draggable="true">可以拖动的盒子随着文字的长度改变而改变</div>
    <div class="container1" ondrop="drop(event)" ondragover="allowDrop(event)">
      <div id="box1" draggable="true" ondragstart="dragEvent(event)">可以拖动的盒子</div>
    </div>
    <br>
    <div id="container2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
  </body>
  <script>
    function allowDrop(ev) {ev.preventDefault();}
    function dragEvent(ev) {
      ev.dataTransfer.setData('Text', ev.target.id);
    }
    function drop(ev) {
      ev.preventDefault()
      let data = ev.dataTransfer.getData("Text");
      ev.target.appendChild(document.getElementById(data))
    }
  </script>
</html>
```

