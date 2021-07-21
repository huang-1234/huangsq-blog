## vue-typescript遇到的问题

**问题一**:
报错:
**Type string trivially inferred from a string literal, remove type annotation (no-inferrable-types)**

About.vue代码：

```html
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ word }}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  @Component
  export default class About extends Vue {
    word: string = "你好!";//导致了tslint报错
  }
</script>
```

究其原因可能是tslint觉得自己根据右边的"你好"判断出word的类型是string，所以，认为再写string是多此一举。

解决方法：**tslint.json添加"ignore-properties"。不推断类的属性（字段）** 代码如下:

```
{
  "rulesDirectory": ["./src/views/About.vue"],
  "rules": {
    "no-inferrable-types": [true, "ignore-params", "ignore-properties"]
  }
}
复制代码
```

参考链接:
typescript -入门 [www.jianshu.com/p/8ba2cdbfa…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F8ba2cdbfabd7)

配置TSLint：[palantir.github.io/tslint/usag…](https://link.juejin.cn/?target=https%3A%2F%2Fpalantir.github.io%2Ftslint%2Fusage%2Fconfiguration%2F)