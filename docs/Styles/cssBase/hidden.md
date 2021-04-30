# display:none 与 visiblity: hidden

```html
<!DOCTYPE html>
<html>
<head>
<style>
.imgbox {
  float: left;
  text-align: center;
  width: 185px;
  border: 1px solid gray;
  margin: 4px;
  padding: 6px;
}

button {
  width: 100%;
}
</style>
</head>
<body>

<h1>display:none 与 visiblity: hidden 的区别</h1>
<p><b>visibility:hidden</b> 隐藏元素，但仍占据布局中的空间。</p>
<p><b>display:none</b> 从文档中删除元素。它不会占据任何空间。</p>

<div class="imgbox" id="imgbox1">Box 1<br>
  <img src="/i/css/imgbox-1.gif" alt="Box 1" style="width:100%">
  <button onclick="removeElement()">删除</button>
</div>

<div class="imgbox" id="imgbox2">Box 2<br>
  <img src="/i/css/imgbox-2.gif" alt="Box 2" style="width:100%">
  <button onclick="changeVisibility()">隐藏</button>
</div>

<div class="imgbox">Box 3<br>
  <img src="/i/css/imgbox-3.gif" alt="Box 3" style="width:100%">
  <button onclick="resetElement()">重置所有</button>
</div>

<script>
function removeElement() {
  document.getElementById("imgbox1").style.display = "none";
}

function changeVisibility() {
  document.getElementById("imgbox2").style.visibility = "hidden";
}

function resetElement() {
  document.getElementById("imgbox1").style.display = "block";
  document.getElementById("imgbox2").style.visibility = "visible";
}
</script>

</body>
</html>
```

>  解析：

**visibility:hidden** 隐藏元素，但仍占据布局中的空间。

**display:none** 从文档中删除元素。它不会占据任何空间。

## 可隐藏页面元素的几种方法

> display：none

display:none是我们最常用的隐藏页面元素的方法，使用display:none方法隐藏的页面元素，应该算是真正意义上的隐藏，因为它使元素完全不占空间，连盒模型也不生成，任何基于该元素的用户交互操作也不会起作用，并且读屏软件也读不到它，一旦某个页面元素被设置了display:none的属性后，该元素的子孙元素也会被隐藏，效果等同于该元素，此外，为display:none添加动画过渡效果也是无效的，它的任何不同状态值之间的切换总是会立即生效。
不过我们可以通过常用的DOM操作方法访问到该元素，就跟其他未被隐藏的元素一样，例如$(“”)等

>  Visibility

将元素的Visibility的属性值设置成hidden也可以达到隐藏元素的效果，但是他区别于display:none的地方是该元素依然会在页面布局起作用，它仍然占据着它原来的空间。不过他并不影响任何交互操作，读屏软件也能读到它，不过也是隐藏的，被设置visibility:hidden的元素也能够实现动画效果，只要保证开始跟结束的状态不一样就行，这确保了 visibility 状态切换之间的过渡动画可以是时间平滑的，我们可以利用这一点来实现元素的延迟显示跟隐藏。但是opacity 属性可以用来实现一些效果很棒的动画。任何 opacity 属性值小于 1 的元素也会创建一个新的堆叠上下文（stacking context）；visibility与display:none不同的地方还在于被设置visibility:hidden的元素的子孙元素若是被设置成visibility: visible;的话，那么该元素就是可见的，但是display:none则不同，即使它的子孙元素被设置成display:block，该子孙元素也是不可见的。

> Opacity

Opacity属性用于设置元素的透明度，当我们设置Opacity的值为0时，该元素就会被隐藏，但它仍会在页面布局中起作用，但是他会影响部分页面交互操作，读屏软件能读到该元素，但是读到的状态并不会是隐藏的，跟不透明时是一样的效果

> Position

有些时候，我们可能会遇到这样一种情况，我们希望某个元素能够不影响我们的页面布局，但是我们又想与之交互，这种情况下opacity 和 visibility会 影响布局， display 不影响布局但又无法直接交互，所以以上这三种都不能满足这种需求，这时候我们就可以使用Position这个属性将元素移出可视区域，这样既不会影响布局，又能让元素可以操作。不过我们要避免使用这个方法去隐藏任何可以获得焦点的元素，因为如果那么做，当用户让那个元素获得焦点时，会导致一个不可预料的焦点切换问题。这个方法在创建自定义复选框和单选按钮时经常被使用。