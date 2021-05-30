## 自动换行

 File>>Preferences>>settings>>UserSettings>>CommonlyUsed>>找到Editor:WordWrap,将off修改为on即可

```json
在 文件-首选项-设置-扩展-在settings.json中添加如下代码
{
  “vetur.format.defaultFormatterOptions”: {
  “js-beautify-html”: {
    “wrap_line_length”: 120,
    “wrap_attributes”: “auto”,
    “end_with_newline”: false
    }
  },
  “vetur.format.defaultFormatter.html”: “js-beautify-html”,
}
```

