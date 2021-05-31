## CSS旋转动画

- `html`

```html
  <div class="container">
    <div class="show">
      <!-- 地图模块 -->
      <div class="map">
        <div class="map1"></div> 
        <div class="map2"></div>
        <div class="map3"></div>
        <div class="chart"></div>
      </div>
    </div>
  </div>
```

- `css`

```css
.container{
  width: 500px;
  height: 500px;
  background-color: pink;
  display: flex;
  justify-content: center;
  margin: auto;

}
.container .map1 {
  position: absolute;
  top: 50%;
  left: 50%;
  /* 定义这个装图片盒子的大小 */
  width: 200px;
  height: 200px;
  transform: translate(-50%,-50%); 
  background: url(./images/map.png);
  /* //透明度 */
  /* opacity: .7; */
  /* // 图片与盒子的百分比大小，设置为百分百才能使得图片与盒子一起变大变小 */
  background-size: 100% 100%;
  animation: rotate1 10s linear infinite;
}
.map2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8.0375rem;
  height: 8.0375rem;
  background: url(./images/lbx.png);
  animation: rotate1 15s linear infinite;
  opacity: 0.6;
  background-size: 100% 100%;
}
@keyframes rotate1{
  form{
    transform: translate(-50%,-50%)
    rotate(0deg)
  } 
  to{
    transform:translate(-50%,-50%)
    rotate(360deg)
  }
}
```

