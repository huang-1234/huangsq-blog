# 数据请求

对于一个get请求，明明只点击了一次，却请求了很多次839次，而列表却只有6项数据

如下所示

```js
{key: "arti-list", keyPath: Array(2), item: MenuItem, domEvent: SyntheticBaseEvent}
index.jsx:73 /creator/list/
index.jsx:41 这里的getArticleList是通过useEffect吊用的
index.jsx:33 ArtiList: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
index.jsx:41 这里的getArticleList是通过useEffect吊用的
839XHR finished loading: GET "<URL>".
index.jsx:33 ArtiList: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
index.jsx:41 这里的getArticleList是通过useEffect吊用的
index.jsx:33 ArtiList: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
index.jsx:41 这里的getArticleList是通过useEffect吊用的
index.jsx:33 ArtiList: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
index.jsx:41 这里的getArticleList是通过useEffect吊用的
index.jsx:33 ArtiList: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
index.jsx:41 这里的getArticleList是通过useEffect吊用的
index.jsx:33 ArtiList: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
index.jsx:41 这里的getArticleList是通过useEffect吊用的
index.jsx:33 ArtiList: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
index.jsx:41 这里的getArticleList是通过useEffect吊用的
index.jsx:33 ArtiList: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
```

