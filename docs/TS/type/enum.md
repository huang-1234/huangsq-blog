## 枚举类型

JavaScript 中其实并没有与枚举类型对应的原始实现，而 TypeScript 转译器会把枚举类型转译为一个属性为常量、命名值从 0 开始递增数字映射的对象，在功能层面达到与枚举一致的效果（然而不是所有的特性在 JavaScript 中都有对应的实现）。

 下面我们通过如下所示示例看看将如上示例转译为 JavaScript 后的效果。

```ts
{
  let Day = void 0;
  (function (Day) {
    Day[Day["SUNDAY"] = 0] = "SUNDAY";
    Day[Day["MONDAY"] = 1] = "MONDAY";
    Day[Day["TUESDAY"] = 2] = "TUESDAY";
    Day[Day["WEDNESDAY"] = 3] = "WEDNESDAY";
    Day[Day["THURSDAY"] = 4] = "THURSDAY";
    Day[Day["FRIDAY"] = 5] = "FRIDAY";
    Day[Day["SATURDAY"] = 6] = "SATURDAY";
  })(Day || (Day = {}));
}
```

在 TypeScript 中，我们可以通过“枚举名字.常量命名”的格式获取枚举集合里的成员，如下代码所示

```ts
enum Day { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY }
function work(d: Day) {
  switch (d) {
    case Day.SUNDAY:
    case Day.SATURDAY:
      return 'take a rest';
    case Day.MONDAY:
    case Day.TUESDAY:
    case Day.WEDNESDAY:
    case Day.THURSDAY:
    case Day.FRIDAY:
      return 'work hard';
  }
}
console.log(work(Day.SATURDAY)) // take a rest
console.log(work(5));           // work hard
console.log(work(8));           // undefined
```

