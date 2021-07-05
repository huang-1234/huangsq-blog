# ts 类型

## type



## interface



## 高级类型

### 交叉类型（Intersection Types）

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如， `Person & Serializable & Loggable`同时是 `Person` *和* `Serializable` *和* `Loggable`。 就是说这个类型的对象同时拥有了这三种类型的成员。

我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。 （在JavaScript里发生这种情况的场合很多！）

```ts
/* 合并联合类型
另外，我们可以合并联合类型为一个交叉类型，这个交叉类型需要同时满足不同的联合类型限制，也就是提取了所有联合类型的相同类型成员。
这里，我们也可以将合并联合类型理解为求交集。
在如下示例中，两个联合类型交叉出来的类型 IntersectionUnion 其实等价于 'em' | 'rem'，所以我们只能把 'em' 或者 'rem' 字符串赋值给
 IntersectionUnion 类型的变量。 */
{
  type UnionA = 'px' | 'em' | 'rem' | '%';
  type UnionB = 'vh' | 'em' | 'rem' | 'pt';
// 取既属于UnionA的类型，同时也属于UnionB的属性，如果两者没有相同的属性，则取得的类型为never
  type IntersectionUnion = UnionA & UnionB;
  const intersectionA: IntersectionUnion = 'em'; // ok
  const intersectionB: IntersectionUnion = 'rem'; // ok
  const intersectionC: IntersectionUnion = 'px'; // ts(2322)
  const intersectionD: IntersectionUnion = 'pt'; // ts(2322)
  type myString = string;
  type myNumber = number;
  type myType = myString & myNumber
}
```

