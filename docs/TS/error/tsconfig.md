# tsconfig 报错

## has no initializer

最近在从头写一个vue+ts的项目，我们都知道typescript是js的一个超类。js是弱类型语言，在开发中存在一些问题。这可能也是ts这几年发展这么快的原因之一。在项目中老是遇到这个问题：

```ts
属性“checkedLabel”没有初始化表达式，且未在构造函数中明确赋值。ts(2564)
(property) Checked.checkedLabel: string
```

问题原因：

1.可能是属性的类型不对

2.可能是没有初始化

3.可能为undefined或者null(在ts中，这两个是单独的类型，是其他类型的子类型)

看了官网，大概有一下几种解决办法：

1.tsconfig.json配置以下设置，简单粗暴，但是超级不推荐。

```json
{
  "compilerOptions": {
    // 严格属性初始化
    "strictPropertyInitialization": false
  }
}
```


 2.使用非空断言   属性后加“ ！”

@Prop() option!: String;
3.使用联合类型

@Prop() option: Object | undefined | null;
4.使用可选属性 属性后加“ ? ”

@Prop() option?: Object;

