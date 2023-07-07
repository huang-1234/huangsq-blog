# [try..catch 不能捕获的错误有哪些](https://segmentfault.com/a/1190000039813200)

今天的内容中, 我们来学习一下使用 `try` 、 `catch` 、 `finally` 和 `throw` 进行错误处理. 我们还会讲一下 JS 中内置的错误对象( `Error` , `SyntaxError` , `ReferenceError` 等)以及如何定义自定义错误.

## 1. 使用 try..catch..finally..throw

在 JS 中处理错误, 我们主要使用 `try` 、 `catch` 、 `finally` 和 `throw` 关键字.

* `try`块包含我们需要检查的代码
* 关键字`throw`用于抛出自定义错误
* `catch`块处理捕获的错误
* `finally` 块是最终结果无论如何, 都会执行的一个块, 可以在这个块里面做一些需要善后的事情

#### 1.1 `try`

每个 `try` 块必须与至少一个 `catch` 或 `finally` 块, 否则会抛出 `SyntaxError` 错误.

我们单独使用 `try` 块进行验证:

```js
try {
  throw new Error('Error while executing the code');
}ⓧ
Uncaught SyntaxError: Missing
catch or
finally after
try
```

#### 1.2 `try..catch`

建议将 `try` 与 `catch` 块一起使用, 它可以优雅地处理 `try` 块抛出的错误.

```js
try {
  throw new Error('Error while executing the code');
} catch (err) {
  console.error(err.message);
}➤ⓧ
Error
while executing the code
```

#### 1.2.1 `try..catch` 与 无效代码

`try..catch` 无法捕获无效的 JS 代码, 例如 `try` 块中的以下代码在语法上是错误的, 但它不会被 `catch` 块捕获.

```js
try {
  ~!$ % ^ & *
} catch (err) {
  console.log("这里不会被执行");
}➤ⓧ
Uncaught SyntaxError: Invalid or unexpected token
```

#### 1.2.2 `try..catch` 与 异步代码

同样, `try..catch` 无法捕获在异步代码中引发的异常, 例如 `setTimeout` :

```js
try {
  setTimeout(function() {
    noSuchVariable; // undefined variable
  }, 1000);
} catch (err) {
  console.log("这里不会被执行");
}
```

未捕获的 `ReferenceError` 将在1秒后引发:

```js
➤ⓧ
Uncaught ReferenceError: noSuchVariable is not defined
```

所以 , 我们应该在异步代码内部使用 `try..catch` 来处理错误:

```js
setTimeout(function() {
  try {
    noSuchVariable;
  } catch (err) {
    console.log("error is caught here!");
  }
}, 1000);
```

#### 1.2.3 嵌套 `try..catch`

我们还可以使用嵌套的 `try` 和 `catch` 块向上抛出错误, 如下所示:

```js
try {
  try {
    throw new Error('Error while executing the inner code');
  } catch (err) {
    throw err;
  }
} catch (err) {
  console.log("Error caught by outer block:");
  console.error(err.message);
}
Error caught by outer block: ➤ⓧError
while executing the code
```

#### 1.3 `try..finally`

不建议仅使用 `try..finally` 而没有 `catch` 块, 看看下面会发生什么:

```js
try {
  throw new Error('Error while executing the code');
} finally {
  console.log('finally');
} finally➤ⓧ Uncaught Error: Error
while executing the code
```

这里注意两件事:

* 即使从`try`块抛出错误后, 也会执行`finally`块
* 如果没有`catch`块, 错误将不能被优雅地处理, 从而导致未捕获的错误

#### 1.4 `try..catch..finally`

建议使用 `try...catch` 块和可选的 `finally` 块.

```js
try {
  console.log("Start of try block");
  throw new Error('Error while executing the code');
  console.log("End of try block -- never reached");
} catch (err) {
  console.error(err.message);
} finally {
  console.log('Finally block always run');
}
console.log("Code execution outside try-catch-finally block continue..");
Start of
  try block➤ⓧ Error
while executing the code
Finally block always run
Code execution outside
try -
catch -
finally block
continue..
```

这里还要注意两件事:

* 在`try`块中抛出错误后往后的代码不会被执行了
* 即使在`try`块抛出错误之后, `finally`块仍然执行

`finally` 块通常用于清理资源或关闭流, 如下所示:

```js
try {
  openFile(file);
  readFile(file);
} catch (err) {
  console.error(err.message);
} finally {
  closeFile(file);
}
```

#### 1.5 `throw`

`throw` 语句用于引发异常.

```js
throw <expression >
  // throw primitives and functions
  throw "Error404";
throw 42;
throw true;
throw {
  toString: function() {
    return "I'm an object!";
  }
};

// throw error object
throw new Error('Error while executing the code');
throw new SyntaxError('Something is wrong with the syntax');
throw new ReferenceError('Oops..Wrong reference');

// throw custom error object
function ValidationError(message) {
  this.message = message;
  this.name = 'ValidationError';
}
throw new ValidationError('Value too high');
```

## 2. 异步代码中的错误处理

对于异步代码的错误处理可以 `Promise` 和 `async await` .

#### 2.1 Promise 中的 `then..catch`

我们可以使用 `then()` 和 `catch()` 链接多个 Promises, 以处理链中单个 Promise 的错误, 如下所示:

```js
Promise.resolve(1)
  .then(res => {
    console.log(res); // 打印 '1'

    throw new Error('something went wrong'); // throw error

    return Promise.resolve(2); // 这里不会被执行
  })
  .then(res => {
    // 这里也不会执行，因为错误还没有被处理
    console.log(res);
  })
  .catch(err => {
    console.error(err.message); // 打印 'something went wrong'
    return Promise.resolve(3);
  })
  .then(res => {
    console.log(res); // 打印 '3'
  })
  .catch(err => {
    // 这里不会被执行
    console.error(err);
  })
```

我们来看一个更实际的示例, 其中我们使用 `fetch` 调用API, 该 API 返回一个 `promise` 对象, 我们使用 `catch` 块优雅地处理 API 失败.

```js
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

fetch("http://httpstat.us/500")
  .then(handleErrors)
  .then(response => console.log("ok"))
  .catch(error => console.log("Caught", error));
Caught Error: Internal Server Error
at handleErrors( < anonymous >: 3: 15)
```

#### 2.2 `try..catch` 和 `async await`

在 `async await` 中 使用 ` try..catch` 比较容易:

```js
(async function() {
  try {
    await fetch("http://httpstat.us/500");
  } catch (err) {
    console.error(err.message);
  }
})();
```

让我们看同一示例, 其中我们使用 `fetch` 调用API, 该API返回一个 `promise` 对象, 我们使用 `try..catch` 块优雅地处理API失败.

```js
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
}

(async function() {
  try {
    let response = await fetch("http://httpstat.us/500");
    handleErrors(response);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Caught", error)
  }
})();
Caught Error: Internal Server Error
at handleErrors( < anonymous >: 3: 15)
at < anonymous >: 11: 7
```

## 3. JS 中的内置错误

#### 3.1 Error

JavaScript 有内置的错误对象, 它通常由 `try` 块抛出, 并在 `catch` 块中捕获, `Error` 对象包含以下属性:

* `name`: 是错误的名称, 例如 "Error", "SyntaxError", "ReferenceError" 等.
* `message`: 有关错误详细信息的消息.
* `stack`: 是用于调试目的的错误的堆栈跟踪.

我们创建一个`Error` 对象, 并查看它的名称和消息属性:

```js
const err = new Error('Error while executing the code');

console.log("name:", err.name);
console.log("message:", err.message);
console.log("stack:", err.stack);
name: Error
message: Error
while executing the code
stack: Error: Error
while executing the code
at < anonymous >: 1: 13
```

JavaScript 有以下内置错误, 这些错误是从 `Error` 对象继承而来的

#### 3.2 EvalError

`EvalError` 表示关于全局 `eval()` 函数的错误, 这个异常不再由 JS 抛出, 它的存在是为了向后兼容.

#### 3.3 RangeError

当值超出范围时, 将引发 `RangeError` .

```js
➤
[].length = -1ⓧ Uncaught RangeError: Invalid array length
```

#### 3.4 ReferenceError

当引用一个不存在的变量时, 将引发 `ReferenceError`.

```js
➤
x = x + 1;ⓧ
Uncaught ReferenceError: x is not defined
```

#### 3.5 SyntaxError

当你在 JS 代码中使用任何错误的语法时, 都会引发 `SyntaxError` .

```js
➤
function() {
  return 'Hi!'
}ⓧ
Uncaught SyntaxError: Function statements require a
function name

➤ 1 = 1ⓧ Uncaught SyntaxError: Invalid left - hand side in assignment

➤ JSON.parse("{ x }");ⓧ
Uncaught SyntaxError: Unexpected token x in JSON at position 2
```

#### 3.6 TypeError

如果该值不是预期的类型, 则抛出 `TypeError` .

```js
➤
1();ⓧ
Uncaught TypeError: 1 is not a
function

➤ null.name;ⓧ
Uncaught TypeError: Cannot read property 'name' of null
```

#### 3.7 URIError

如果以错误的方式使用全局 URI 方法, 则会抛出 `URIError` .

```js
➤
decodeURI("%%%");ⓧ
Uncaught URIError: URI malformed
```

## 4. 定义并抛出自定义错误

我们也可以用这种方式定义自定义错误.

```js
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
};

const err = new CustomError('Custom error while executing the code');

console.log("name:", err.name);
console.log("message:", err.message);
name: CustomError
message: Custom error
while executing the code
```

我们还可以进一步增强 `CustomError` 对象以包含错误代码

```js
class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "CustomError";
    this.code = code;
  }
};

const err = new CustomError('Custom error while executing the code', "ERROR_CODE");

console.log("name:", err.name);
console.log("message:", err.message);
console.log("code:", err.code);
name: CustomError
message: Custom error
while executing the code
code: ERROR_CODE
```

在 `try..catch` 块中使用它:

```js
try {
  try {
    null.name;
  } catch (err) {
    throw new CustomError(err.message, err.name); //message, code
  }
} catch (err) {
  console.log(err.name, err.code, err.message);
}
```

> CustomError TypeError Cannot read property 'name' of null
