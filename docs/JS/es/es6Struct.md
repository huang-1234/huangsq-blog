# 5.ES6 Symbol,Set,Map

## 新数据类型 Symbol

- Symbol 不是对象，可以理解成不能重复的独立字符串，括号内对象会转化为字符串
- Symbol for 在全局中定义查找，创建多个其实查找是同一个
- Symbol.keyFor 返回已经登记的Symbol类型的key



```swift
const obj={
    name:'daji',
    toString(){
        return this.name
    }
}
let n=Symbol(obj)
console.log(n); //Symbol(daji)

let c=Symbol([1,2,3])
console.log(c);  //Symbol(1,2,3)

let s1=Symbol('foo')
let s2=Symbol('foo')
console.log(s1===s2); //false

let a1=Symbol.for('foo')
let a2=Symbol.for('foo')
console.log(a1===a2);  //true

const x1=Symbol('foo')
console.log(Symbol.keyFor(x1)); //undefined
const x2=Symbol.for('foo')
console.log(Symbol.keyFor(x2)); //foo
```

##### 应用场景

- 对象内如果有重复key值会覆盖的解决方式



```swift
let s1 = Symbol('foo');
let s2 = Symbol('foo');
const stu1 = Symbol('hsq')
const stu2 = Symbol('hsq')
console.log(stu1,stu2) // Symbol(hsq) Symbol(hsq)
const grade = {
  [stu1]: { address: 'changsha', tel: '137707531' },
  [stu2]: { address: 'changsha', tel: '137707531' }
}
console.log(grade); //{Symbol('hsq'):{...},Symbol('hsq'):{...}} 不会覆盖，显示两个
console.log(grade[stu1]);
console.log(grade[stu2]);
```

- 一定程度上保护构造函数的属性

```swift
let sym=Symbol('hello')
class User{
    constructor(name){
        this.name=name
        this[sym]='hello.com'
    }
    getName(){
        return this.name+this[sym]
    }
}
let user=new User('daji')
console.log(user.getName()); //dajihello.com

for(let key in user){
    console.log(key);  //name 无法读到Symbol('hello')属性
}
for(let key of Object.keys(user)){
    console.log(key);  //name 无法读到Symbol('hello')属性
}
for(let key of Object.getOwnPropertyNames(user)){
    console.log(key);  //name 无法读到Symbol('hello')属性
}
for(let key of Object.getOwnPropertySymbols(user)){
    console.log(key);  //Symbol(hello)   只能读到symbol属性，读不到name
}
for(let key of Reflect.ownKeys(user)){
    console.log(key);   //name Symbol(hello)  都能读到
}
```

- 消除魔术字符串（重复出现的字符串）



```swift
const shpeType={
    triangle:Symbol(),  //triangle:'triangle' vlaue值不重要用symbol替代
    circle:Symbol()     //circle:'circle' 
}
function getArea(shape){
    let area = 0
    switch(shape){
        case shpeType.triangle:  //避免case 'triangle' 重复出现此字符串
            area=1
            break
        case shpeType.circle:
            area=2
            break
    }
    return area
}
console.log(getArea(shpeType.triangle));  //返回1  避免getArea('triangle') 重复出现此字符串
```