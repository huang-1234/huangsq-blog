# commonjs 和 esm

这个问题也可以变为 commonjs模块和ES6模块的区别; 下面就通过一些例子来说明它们的区别.

先来一道面试题测验一下: 下面代码输出什么

```js
// base.js
let count = 0;
setTimeout(() => {
  console.log("base.count", ++count); // 1
}, 500)

module.exports.count = count;

// commonjs.js
const {
  count
} = require('./base');
setTimeout(() => {
  console.log("count is" + count + 'in commonjs'); // 0
}, 1000)

// base1.js
let count = 0;
setTimeout(() => {
  console.log("base.count", ++count); // 1
}, 500)
exports
const count = count;

// es6.js
import {
  count
} from './base1';
setTimeout(() => {
  console.log("count is" + count + 'in es6'); // 1
}, 1000)
```

> 注意上面的ES6模块的代码不能直接在 node 中执行. 可以把文件名称后缀改为 `.mjs` , 然后执行 `node --experimental-modules es6.mjs` , 或者自行配置babel.

## 目录

* CommonJS
* ES6模块
* ES6模块和CommonJs模块两大区别
* 总结

## CommonJs

### CommonJS 模块的加载原理

CommonJs 规范规定, 每个模块内部, `module` 变量代表当前模块. 这个变量是一个对象, 它的 `exports` 属性(即 `module.exports` )是对外的接口, 加载某个模块, 其实是加载该模块的 `module.exports` 属性.

```js
const x = 5;
const addX = function(value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
```

上面代码通过module.exports输出变量x和函数addX.

require方法用于加载模块.

```js
const example = require('./example.js');

console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

CommonJS 模块的特点如下:

* 所有代码运行在模块作用域, 不会污染全局作用域
* 模块可以多次加载, 但是只会在第一次加载时运行一次, 然后运行结果就被缓存了, 以后再加载, 就直接读取缓存结果. 要想让模块再次运行, 必须清除缓存.
* 模块加载的顺序, 按照其在代码中出现的顺序

### module对象

Node内部提供一个Module构建函数. 所有模块都是Module的实例.

```js
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  // ...
}
```

每个模块内部, 都有一个module对象, 代表当前模块. 它有以下属性.

* module.id 模块的识别符, 通常是带有绝对路径的模块文件名.
* module.filename 模块的文件名, 带有绝对路径.
* module.loaded 返回一个布尔值, 表示模块是否已经完成加载.
* module.parent 返回一个对象, 表示调用该模块的模块.
* module.children 返回一个数组, 表示该模块要用到的其他模块.
* module.exports 表示模块对外输出的值.

module.exports属性表示当前模块对外输出的接口, 其他文件加载该模块, 实际上就是读取module.exports变量.

为了方便, Node为每个模块提供一个exports变量, 指向module.exports. 这等同在每个模块头部, 有一行这样的命令

```js
const exports = module.exports;
```

注意, 不能直接将exports变量指向一个值, 因为这样等于切断了exports与module.exports的联系.

```js
exports = function(x) {
  console.log(x)
};
```

上面这样的写法是无效的, 因为exports不再指向module.exports了.

下面的写法也是无效的.

```js
exports.hello = function() {
  return 'hello';
};

module.exports = 'Hello world';
```

上面代码中, hello函数是无法对外输出的, 因为module.exports被重新赋值了.

这意味着, 如果一个模块的对外接口, 就是一个单一的值, 最好不要使用exports输出, 最好使用module.exports输出.

```js
module.exports = function(x) {
  console.log(x);
};
```

如果你觉得, exports与module.exports之间的区别很难分清, 一个简单的处理方法, 就是放弃使用exports, 只使用module.exports.

### 模块的缓存

第一次加载某个模块时, Node会缓存该模块. 以后再加载该模块, 就直接从缓存取出该模块的module.exports属性.

```js
require('./example.js');
require('./example.js').message = "hello";
require('./example.js').message
// "hello"
```

上面代码中, 连续三次使用require命令, 加载同一个模块. 第二次加载的时候, 为输出的对象添加了一个message属性. 但是第三次加载的时候, 这个message属性依然存在, 这就证明require命令并没有重新加载模块文件, 而是输出了缓存.

如果想要多次执行某个模块, 可以让该模块输出一个函数, 然后每次require这个模块的时候, 重新执行一下输出的函数.

所有缓存的模块保存在require.cache之中, 如果想删除模块的缓存, 可以像下面这样写.

```js
// 删除指定模块的缓存
delete require.cache[moduleName];

// 删除所有模块的缓存
Object.keys(require.cache).forEach(function(key) {
  delete require.cache[key];
})
```

注意, 缓存是根据绝对路径识别模块的, 如果同样的模块名, 但是保存在不同的路径, require命令还是会重新加载该模块.

## ES6模块

ES6 模块的设计思想是尽量的静态化, 使得编译时就能确定模块的依赖关系, 以及输入和输出的变量. CommonJS 和 AMD 模块, 都只能在运行时确定这些东西. 比如, CommonJS 模块就是对象, 输入时必须查找对象属性.

```js
// CommonJS模块
let {
  stat,
  exists,
  readFile
} = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载fs模块(即加载fs的所有方法), 生成一个对象(_fs), 然后再从这个对象上面读取 3 个方法. 这种加载称为"运行时加载", 因为只有运行时才能得到这个对象, 导致完全没办法在编译时做"静态优化".

ES6 模块不是对象, 而是通过export命令显式指定输出的代码, 再通过import命令输入.

```js
// ES6模块
import {
  stat,
  exists,
  readFile
} from 'fs';
```

上面代码的实质是从fs模块加载 3 个方法, 其他方法不加载. 这种加载称为"编译时加载"或者静态加载, 即 ES6 可以在编译时就完成模块加载, 效率要比 CommonJS 模块的加载方式高. 当然, 这也导致了没法引用 ES6 模块本身, 因为它不是对象.

### export命令

ES6的模块功能主要由两个命令构成: `export` 和 `import` . export 命令用于规定模块的对外接口.import 命令用于输入 其他模块提供的功能.

* ES6模块必须用export导出
* export 必须与模块内部的变量建立一一对应关系

1. 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。

```js
export const firstName = 'Michael';
export function multiply(x, y) {
  return x * y;
};
```

1. export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

```js
// 报错
export 1;

// 报错
const m = 1;
export m;
```

上面两种写法都会报错, 因为没有提供对外的接口. 第一种写法直接输出 1, 第二种写法通过变量m, 还是直接输出 1.1只是一个值, 不是接口.

```js
// 写法一
export const m = 1;

// 写法二
const m = 1;
export {
  m
};

// 写法三
const n = 1;
export {
  n as m
};
```

### import命令

* import命令输入的变量都是只读的
* import命令具有提升效果
* import是静态执行, 所以不能使用表达式和变量
* import语句是 Singleton 模式

1. import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

```js
import {
  a
} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
```

上面代码中, 脚本加载了变量a, 对其重新赋值就会报错, 因为a是一个只读的接口. 但是, 如果a是一个对象, 改写a的属性是允许的.

```js
import {
  a
} from './xxx.js'

a.foo = 'hello'; // 合法操作
```

上面代码中, a的属性可以成功改写, 并且其他模块也可以读到改写后的值. 不过, 这种写法很难查错, 建议凡是输入的变量, 都当作完全只读, 不要轻易改变它的属性.

1. import命令具有提升效果，会提升到整个模块的头部，首先执行。

```js
foo();

import {
  foo
} from 'my_module';
```

这种行为的本质是, import命令是编译阶段执行的, 在代码运行之前.

1. import是静态执行，所以不能使用表达式和变量

```js
// 报错
import {
  'f' + 'oo'
} from 'my_module';

// 报错
let module = 'my_module';
import {
  foo
} from module;
```

1. 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。

```js
import {
  foo
} from 'my_module';
import {
  bar
} from 'my_module';

// 等同于
import {
  foo,
  bar
} from 'my_module';
```

上面代码中, 虽然foo和bar在两个语句中加载, 但是它们对应的是同一个my_module实例. 也就是说, import语句是 `Singleton` 模式.

### export default 命令

* `export default`就是输出一个叫做default的变量或方法
* `export default` 所以它后面不能跟变量声明语句

1. 本质上，`export default`就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。

```js
// modules.js
function sayHello() {
  console.log('哈哈哈')
}
export {
  sayHello as
  default
};
// 等同于
// export default sayHello;

// app.js
import {
  default as sayHello
} from 'modules';
// 等同于
// import sayHello from 'modules';
```

1. 正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。

```js
// 正确
export const a = 1;

// 正确
const a = 1;
export default a;

// 错误
export default
const a = 1;
```

上面代码中, export default a的含义是将变量a的值赋给变量default. 所以, 最后一种写法会报错.

同样地, 因为export default命令的本质是将后面的值, 赋给default变量, 所以可以直接将一个值写在export default之后.

```js
// 正确
export default 42;

// 报错
export 42;
```

上面代码中, 后一句报错是因为没有指定对外的接口, 而前一句指定对外接口为default.

### export 和 import 的复合写法

* 在一个模块里导入同时导出模块

```js
export {
  foo,
  bar
}
from 'my_module';

// 可以简单理解为
import {
  foo,
  bar
} from 'my_module';
export {
  foo,
  bar
};
```

写成一行以后, foo和bar实际上并没有被导入当前模块, 只是相当于对外转发了这两个接口, 导致当前模块不能直接使用foo和bar.

```js
export {
  es6 as
  default
}
from './someModule';

// 等同于
import {
  es6
} from './someModule';
export default es6;
```

在平常开发中这种常被用到, 有一个utils目录, 目录下面每个文件都是一个工具函数, 这时候经常会创建一个index.js文件作为 utils的入口文件, index.js中引入utils目录下的其他文件, 其实这个index.js其的作用就是一个对外转发 utils 目录下 所有工具函数的作用, 这样其他在使用 utils 目录下文件的时候可以直接 通过 `import { xxx } from './utils'` 来引入.

## ES6模块和CommonJs模块主要有以下两大区别

* CommonJs模块输出的是一个值的拷贝, ES6模块输出的是值的引用.
* CommonJs模块是运行时加载, ES6模块是编译时输出接口.

第二个差异是因为 CommonJS 加载的是一个对象(即module.exports属性). 该对象只有在脚本运行完才会生成. 而ES6模块不是对象, 它的对外接口只是一种静态定义, 在代码静态编译阶段就会生成.

> 在传统编译语言的流程中, 程序中的一段源代码在执行之前会经历三个步骤, 统称为编译."分词/词法分析" -> "解析/语法分析" -> "代码生成".

下面来解释一下第一个区别
CommonJS 模块输出的是值的拷贝, 也就是说, 一旦输出一个值, 模块内部的变化就影响不到这个值. 请看下面这个模块文件lib.js的例子.

```js
// lib.js
const counter = 3;

function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

上面代码输出内部变量counter和改写这个变量的内部方法incCounter. 然后, 在main.js里面加载这个模块.

```js
// main.js
const mod = require('./lib');

console.log(mod.counter); // 3
mod.incCounter();
console.log(mod.counter); // 3
```

上面代码说明, lib.js 模块加载以后, 它的内部变化就影响不到输出的 mod.counter了. 这是因为 mod.counter是一个原始类型的值, 会被缓存. 除非写成一个函数, 才能得到内部变动后的值

```js
// lib.js
const counter = 3;

function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```

上面代码中, 输出的counter属性实际上是一个取值器函数. 现在再执行main.js, 就可以正确读取内部变量counter的变动了.

```js
3
4
```

ES6 模块的运行机制与 CommonJS 不一样. JS 引擎对脚本静态分析的时候, 遇到模块加载命令import, 就会生成一个只读引用. 等到脚本真正执行时, 再根据这个只读引用, 到被加载的那个模块里面去取值. 换句话说, ES6 的import有点像 Unix 系统的"符号连接", 原始值变了, import加载的值也会跟着变. 因此, ES6 模块是动态引用, 并且不会缓存值, 模块里面的变量绑定其所在的模块.

还是举上面的例子.

```js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import {
  counter,
  incCounter
} from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

上面代码说明, ES6 模块输入的变量counter是活的, 完全反应其所在模块lib.js内部的变化.

再举一个出现在export一节中的例子.

```js
// m1.js
export const foo = 'bar';
setTimeout(() => foo = 'baz', 500);

// m2.js
import {
  foo
} from './m1.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);
```

上面代码中, m1.js的变量foo, 在刚加载时等于bar, 过了 500 毫秒, 又变为等于baz.

让我们看看, m2.js能否正确读取这个变化.

```js
bar
baz
```

上面代码表明, ES6 模块不会缓存运行结果, 而是动态地去被加载的模块取值, 并且变量总是绑定其所在的模块.

由于 ES6 输入的模块变量, 只是一个"符号连接", 所以这个变量是只读的, 对它进行重新赋值会报错.

```js
// lib.js
export let obj = {};

// main.js
import {
  obj
} from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
```

上面代码中, `main.js` 从lib.js输入变量obj, 可以对obj添加属性, 但是重新赋值就会报错. 因为变量obj指向的地址是只读的, 不能重新赋值, 这就好比main.js创造了一个名为obj的const变量.

最后, export通过接口, 输出的是同一个值. 不同的脚本加载这个接口, 得到的都是同样的实例.

```js
// mod.js
function C() {
  this.sum = 0;
  this.add = function() {
    this.sum += 1;
  };
  this.show = function() {
    console.log(this.sum);
  };
}

export let c = new C();
```

上面的脚本mod.js, 输出的是一个C的实例. 不同的脚本加载这个模块, 得到的都是同一个实例.

```js
// x.js
import {
  c
} from './mod';
c.add();

// y.js
import {
  c
} from './mod';
c.show();

// main.js
import './x';
import './y';
```

现在执行main.js, 输出的是1.

这就证明了x.js和y.js加载的都是C的同一个实例.

> 在平常开发中这种常被用到, 有一个utils目录, 目录下面每个文件都是一个工具函数, 这时候经常会创建一个index.js文件作为 utils的入口文件, index.js中引入utils目录下的其他文件, 其实这个index.js其的作用就是一个对外转发 utils 目录下 所有工具函数的作用, 这样其他在使用 utils 目录下文件的时候可以直接 通过 import { xxx } from './utils' 来引入.

## 总结

* CommonJs模块输出的是一个值的拷贝, ES6模块输出的是值的引用.
* CommonJs模块是运行时加载, ES6模块是编译时输出接口.

## 再来几道题检查一下

下面代码输出什么

```js
// index.js
console.log('running index.js');
import {
  sum
} from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```

答案: `running sum.js, running index.js, 3` .

import命令是编译阶段执行的, 在代码运行之前. 因此这意味着被导入的模块会先运行, 而导入模块的文件会后执行.
这是CommonJS中require()和import之间的区别. 使用require(), 您可以在运行代码时根据需要加载依赖项. 如果我们使用require而不是import, running index.js, running sum.js, 3会被依次打印.

```js
// module.js
export default () => "Hello world"
export const name = "Lydia"

// index.js
import * as data from "./module"

console.log(data)
```

答案: `{ default: function default(), name: "Lydia" }`

使用import * as name语法, 我们将module.js文件中所有export导入到index.js文件中, 并且创建了一个名为data的新对象. 在module.js文件中, 有两个导出: 默认导出和命名导出. 默认导出是一个返回字符串"Hello World"的函数, 命名导出是一个名为name的变量, 其值为字符串"Lydia".
data对象具有默认导出的default属性, 其他属性具有指定exports的名称及其对应的值.

```js
// counter.js
let counter = 10;
export default counter;
// index.js
import myCounter from "./counter";

myCounter += 1;

console.log(myCounter);
```

答案: `Error`

引入的模块是 只读 的: 你不能修改引入的模块. 只有导出他们的模块才能修改其值.
当我们给myCounter增加一个值的时候会抛出一个异常: myCounter是只读的, 不能被修改.
