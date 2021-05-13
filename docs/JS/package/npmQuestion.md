# npm-question Full
执行num run build:prod 报错，但是npm run dev没问题

二、解决

```nginx
TypeError: Class extends value undefined is not a constructor or null at Object.`<anonymous>`(C:\Users\司超龙\IdeaProjects\vue\base_education_vue\base_education_third_3.0+\grass-roots teaching system\node_modules\mini-css-extract-plugin\dist\CssDependency.js:12:46
```

CssDependency的问题，依赖包不兼容

执行npm add webpack@4.5.0，解决

