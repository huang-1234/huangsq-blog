# TS 基础

## TS 的类型

# TypeScript 基础类型

TypeScript 包含的数据类型如下表:

| 数据类型   | 关键字    | 描述                                                                                                                                                                                                                                      |
| :--------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 任意类型   | any       | 声明为 any 的变量可以赋予任意类型的值。                                                                                                                                                                                                   |
| 数字类型   | number    | 双精度 64 位浮点值。它可以用来表示整数和分数。`let binaryLiteral: number = 0b1010; // 二进制 let octalLiteral: number = 0o744; // 八进制 let decLiteral: number = 6; // 十进制 let hexLiteral: number = 0xf00d; // 十六进制`              |
| 字符串类型 | string    | 一个字符系列，使用单引号（**'**）或双引号（**"**）来表示字符串类型。反引号（**`**）来定义多行文本和内嵌表达式。`let name: string = "Runoob"; let years: number = 5; let words: string =`您好，今年是 ${ name } 发布 ${ years + 1} 周年`;` |
| 布尔类型   | boolean   | 表示逻辑值：true 和 false。`let flag: boolean = true;`                                                                                                                                                                                    |
| 数组类型   | 无        | 声明变量为数组。`// 在元素类型后面加上[] let arr: number[] = [1, 2]; // 或者使用数组泛型 let arr: Array<number> = [1, 2];`                                                                                                                |
| 元组       | 无        | 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。`let x: [string, number]; x = ['Runoob', 1]; // 运行正常 x = [1, 'Runoob']; // 报错 console.log(x[0]); // 输出 Runoob`                            |
| 枚举       | enum      | 枚举类型用于定义数值集合。`enum Color {Red, Green, Blue}; let c: Color = Color.Blue; console.log(c); // 输出 2`                                                                                                                           |
| void       | void      | 用于标识方法返回值的类型，表示该方法没有返回值。`function hello(): void { alert("Hello Runoob"); }`                                                                                                                                       |
| null       | null      | 表示对象值缺失。                                                                                                                                                                                                                          |
| undefined  | undefined | 用于初始化变量为一个未定义的值                                                                                                                                                                                                            |
| never      | never     | never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。                                                                                                                                                                  |

**注意：**TypeScript 和 JavaScript 没有整数类型。

---

## Any 类型

任意值是 TypeScript 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况。

1、变量的值会动态改变时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查，示例代码如下：

```ts
let x: any = 1; // 数字类型
x = "I am who I am"; // 字符串类型
x = false; // 布尔类型
```

改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查，示例代码如下：

```ts
let x: any = 4;
x.ifItExists(); // 正确，ifItExists方法在运行时可能存在，但这里并不会检查
x.toFixed(); // 正确
```

定义存储各种类型数据的数组时，示例代码如下：

```ts
let arrayList: any[] = [1, false, "fine"];
arrayList[1] = 100;
```

## Null 和 Undefined

### null

在 JavaScript 中 null 表示 "什么都没有"。

null 是一个只有一个值的特殊类型。表示一个空对象引用。

用 typeof 检测 null 返回是 object。

### undefined

在 JavaScript 中, undefined 是一个没有设置值的变量。

typeof 一个没有值的变量会返回 undefined。

Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在 TypeScript 中启用严格的空校验（--strictNullChecks）特性，就可以使得 null 和 undefined 只能被赋值给 void 或本身对应的类型，示例代码如下：

```ts
// 启用 --strictNullChecks
let x: number;
x = 1; // 运行正确
x = undefined; // 运行错误
x = null; // 运行错误
```

上面的例子中变量 x 只能是数字类型。如果一个类型可能出现 null 或 undefined， 可以用 | 来支持多种类型，示例代码如下：

```ts
// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1; // 运行正确
x = undefined; // 运行正确
x = null; // 运行正确
```

## never 类型

never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环），示例代码如下：

```ts
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (() => {
  throw new Error("exception");
})();

// 运行正确，never 类型可以赋值给 数字类型
y = (() => {
  throw new Error("exception");
})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
  throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
  while (true) {}
}
```

### 基础静态类型

基础静态类型非常简单，只要在声明变量的后边加一个`:`号，然后加上对应的类型哦。比如下面的代码，就是声明了一个数字类型的变量，叫做`count`。

```ts
const count : number = 918;
const myName ：string = 'huangshuiqing'
```

类似这样常用的基础类型还有,`null`,`undefinde`,`symbol`,`boolean`，`void`这些都是最常用的基础数据类型。

### 对象类型

来讲解(其实上节课我们也讲到了，我们这里就当复习了)。新建一个文件`demo3.ts`（你可以跟我不一样）,然后写下如下代码。

```ts
const Boy: {
  name: string;
  age: number;
} = {
  name: "yiyang",
  age: 18,
};
console.log(Boy.name);
```

写完后，我们在`terminal`（终端）中输入`ts-node demo3.ts`，可以看到结果输出了`yiyangqianxi`。这就是一个经典的对象类型，也是最简单的对象类型。对象类型也可以是数组，比如现在我们需要很多小姐姐，我们就可以这样写。

```ts
const Boy: String[] = ["易烊千玺", "华晨宇", "小明"];
```

这时候的意思是，变量`Boy`必须是一个数组，数组里的内容必须是字符串。你可以试着把字符串改为数字，`VSCode`会直接给我们报错。

```ts
const Boy: String[] = ["易烊千玺", "华晨宇", 123];
```

现在都讲究面向对象编程，我这面向对象编程这么多年了，也没再多编出来一个。我们再来看看下面的代码。这个代码就是用类的形式，来定义变量。

```ts
class Person {}
const yiyang: Person = new Person();
```

这个意思就是`dajiao`必须是一个`Person`类对应的对象才可以。我们还可以定义一个函数类型，并确定返回值。代码如下：

```ts
const Boy: () => string = () => {
  return "yiyangqianxi";
};
```

那我们现在总结一下对象类型可以有几种形式：

- 对象类型
- 数组类型
- 类类型
- 函数类型

这几种形式我们在`TypeScript`里叫做对象类型。

> 基础类型和对象类型的概念

## 类型和接口

如果你作过一些项目，你就会知道真实的项目中数组中一定会有对象的出现。那对于这类带有对象的数组定义就稍微麻烦点了。 比如现在我们要定义一个有很多小姐姐的数组，每一个小哥哥都是一个对象。这是的定义就编程了这样。

```ts
const Boy: { name: string; age: Number }[] = [
  { name: "hsq", age: 18 },
  { name: "andy", age: 28 },
];
```

这种形式看起来比较麻烦，而且如果有同样类型的数组，写代码也比较麻烦，TypeScript 为我们准备了一个概念，叫做`类型别名`(type alias)。

比如刚才的代码，就可以定义一个`类型别名`，定义别名的时候要以`type`关键字开始。现在定义一个`BoyType`的别名。

```ts
type BoyType = { name: string; age: Number };
```

有了这样的类型别名以后哦，就可以把上面的代码改为下面的形式了。

```ts
type BoyType = { name: string; age: Number };

const Boy: BoyType[] = [
  { name: "易烊千玺", age: 21 },
  { name: "华晨宇", age: 25 },
];
```

这样定义是完全起作用的，比如我们下面在对象里再加入一个属性，这时候编译器就会直接给我们报错了。

这时候有的小伙伴就会问了，我用类进行定义可以吗？答案是可以的，比如我们定义一个`BoyType`的类,然后用这个类来限制数组的类型也是可以的。

```ts
class BoyType {
  name: string;
  age: number;
}

const Boy: BoyType[] = [
  { name: "易烊千玺", age: 21 },
  { name: "华晨宇", age: 25 },
];
```

学了`接口`，也学过了`类型别名`，这两个语法和用处好像一样，我先表个态，确实用起来基本一样，但是也有少许的不同。

> 类型别名可以直接给类型，比如`string`，而接口必须代表对象。

比如我们的`类型别名`可以写出下面的代码：

```ts
type Boy1 = stirng;
```

但是接口就不能这样写，它必须代表的是一个对象，也就是说，你初始化`girl`的时候，必须写出下面的形式.

```ts
const boy1 = {
  name: "易烊千玺",
  age: 21,
  height: 180,
};
```

### 接口非必选值得定义

如果这时候老板又有了新的要求，要求尽量能看到小哥哥的祖籍，但是不作强制要求，就是可选值吗。那接口如何定义那？其实`typeScript`已经为我们准备好了相应的办法，就是在`:`号前加一个`?`

比如把 BoyType 的接口写成这样。

```ts
interface Boy {
  name: string;
  age: number;
  height: number;
  ancestral_home?: string;
}
```

```ts
const boy2 = {
  name: "易烊千玺",
  age: 21,
  height: 180,
  ancestral_home: "changsha",
};
```

## TS 类的 Getter、Setter 和 static 使用

学了类的访问类型`private`，那这个东西如何使用？其实他的最大用处是封装一个属性，然后通过 Getter 和 Setter 的形式来访问和修改这个属性。

### 类的 Getter 和 Setter

`_age`是私有的，那类的外部就没办法改变，所以这时候可以用`setter`属性进行改变，代码如下：

```ts
class Boy {
  private _age: number;
  constructor(_age: number) {
    this._age = _age;
  }
  get age() {
    console.log(this._age);
    return this._age - 10;
  }
  set age(age: number) {
    this._age = age;
  }
}

const boy1 = new Boy(28);
console.log(boy1.age);
```

static

```ts
  static sayHello() {
    console.log('Hello')
  }
```
