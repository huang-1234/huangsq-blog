# Echarts.js+jquery.js实现中国疫情地图

[Echarts.js中国地图实例](https://www.echartsjs.com/examples/en/editor.html?c=doc-example/map-visualMap-pieces&edit=1)

[数据使用腾讯的数据：接口地址](https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&callback=jQuery34102581268431257997_1582545445186&_=1582545445187)

option参数的含义：

```js
title：显示图标的标题
tooltip：展示提示框，当你鼠标点击某个省份时用来展示对应的确诊人数
legend：图例，设置图例展示的位置
visualMap：视觉映射，每个颜色代表什么含义
series：地图数据可视化，添加data数据
```



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>疫情地图展示</title>
  <style>
    .container {
      width: 1200px;
      margin: 0 auto;
    }

    #myEcharts {
      width: 800px;
      height: 500px;
      border: solid 1px red;
      margin: 0 auto;
    }
  </style>
  <script src="https://www.echartsjs.com/examples/vendors/jquery/jquery.js"></script>
  <!-- 引入 echarts.js -->
  <script src="https://www.echartsjs.com/examples/vendors/echarts/echarts.min.js?_v_=1578305236132"></script>
  <!--引入中国的地图数据js文件，引入后会自动注册地图名字和数据-->
  <script src="https://www.echartsjs.com/examples/vendors/echarts/map/js/china.js?_v_=1578305236132"></script>

</head>

<body>
<div class="container">
  <h3>累计确诊人数如下：</h3>
  <!--为echarts准备一个dom容器-->
  <div id="myEcharts"></div>
</div>


<script>
  //初始化echarts实例
  var myChart = echarts.init(document.getElementById('myEcharts'));
  // 指定图表的配置项和数据
  option = {
    title: {
      text: '中国疫情图',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['中国疫情图']
    },
    visualMap: {
      type: 'piecewise',
      pieces: [
        { min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28' },
        { min: 500, max: 999, label: '确诊500-999人', color: '#4e160f' },
        { min: 100, max: 499, label: '确诊100-499人', color: '#974236' },
        { min: 10, max: 99, label: '确诊10-99人', color: '#ee7263' },
        { min: 1, max: 9, label: '确诊1-9人', color: '#f5bba7' },
      ],
      color: ['#E0022B', '#E09107', '#A3E00B']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    roamController: {
      show: true,
      left: 'right',
      mapTypeControl: {
        'china': true
      }
    },
    series: [
      {
        name: '确诊数',
        type: 'map',
        mapType: 'china',
        roam: false,
        label: {
          show: true,
          color: 'rgb(249, 249, 249)'
        },
        data: []
      }
    ]
  };

  //使用指定的配置项和数据显示图表
  myChart.setOption(option);

  //获取数据
  function getData() {
    $.ajax({
      url: "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5",
      dataType: "jsonp",
      success: function (data) {
        //  console.log(data.data)
        var res = data.data || "";
        res = JSON.parse(res);
        var newArr = [];
        //newArr的数据格式为：
        // [{
        //   name: '北京11',
        //   value: 212
        // }, {
        //   name: '天津',
        //   value: 60
        // }]
        if (res) {
          //获取到各个省份的数据
          var province = res.areaTree[0].children;
          for (var i = 0; i < province.length; i++) {
            var json = {
              name: province[i].name,
              value: province[i].total.confirm
            }
            newArr.push(json)
          }
          console.log(newArr)
          console.log(JSON.stringify(newArr))
          //使用指定的配置项和数据显示图表
          myChart.setOption({
            series: [
              {
                name: '确诊数',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                  show: true,
                  color: 'rgb(249, 249, 249)'
                },
                data: newArr
              }
            ]
          });
        }
      }

    })
  }
  getData();

</script>
</body>
</html>

```

