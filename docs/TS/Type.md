# TS的类型

### 基础静态类型

基础静态类型非常简单，只要在声明变量的后边加一个`:`号，然后加上对应的类型哦。比如下面的代码，就是声明了一个数字类型的变量，叫做`count`。

```js
const count : number = 918;
const myName ：string = 'huangshuiqing'
```

类似这样常用的基础类型还有,`null`,`undefinde`,`symbol`,`boolean`，`void`这些都是最常用的基础数据类型。

### 对象类型

来讲解(其实上节课我们也讲到了，我们这里就当复习了)。新建一个文件`demo3.ts`（你可以跟我不一样）,然后写下如下代码。

```js
const xiaoJieJie: {
  name: string,
  age: number,
} = {
  name: "大脚",
  age: 18,
};
console.log(xiaoJieJie.name);
```

写完后，我们在`terminal`（终端）中输入`ts-node demo3.ts`，可以看到结果输出了`大脚`。这就是一个经典的对象类型，也是最简单的对象类型。对象类型也可以是数组，比如现在我们需要很多小姐姐，我们就可以这样写。

```js
const xiaoJieJies: String[] = ["谢大脚", "刘英", "小红"];
```

这时候的意思是，变量`xiaoJieJies`必须是一个数组，数组里的内容必须是字符串。你可以试着把字符串改为数字，`VSCode`会直接给我们报错。

```js
const xiaoJieJies: String[] = ["谢大脚", "刘英", 123];
```

现在都讲究面向对象编程，我这面向对象编程这么多年了，也没再多编出来一个。我们再来看看下面的代码。这个代码就是用类的形式，来定义变量。

```js
class Person {}
const dajiao: Person = new Person();
```

这个意思就是`dajiao`必须是一个`Person`类对应的对象才可以。我们还可以定义一个函数类型，并确定返回值。代码如下：

```js
const jianXiaoJieJie: () => string = () => {
  return "大脚";
};
```

那我们现在总结一下对象类型可以有几种形式：

- 对象类型
- 数组类型
- 类类型
- 函数类型

这几种形式我们在`TypeScript`里叫做对象类型。

这节课我们就主要学习了基础类型和对象类型的概念