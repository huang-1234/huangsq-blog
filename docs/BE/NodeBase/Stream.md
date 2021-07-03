# 理解 Stream（流）

接触过 Node.js 的开发人员可能知道，流（Stream）这个概念比较难理解，也不太好处理。

这篇文章就来帮你理解流的概念，以及如何使用它。别担心，一定会搞懂的。

## 流（Stream）是什么？

流（Stream）是驱动 Node.js 应用的基础概念之一。它是数据处理方法，用于按顺序将输入读写到输出中。

流是一种处理读写文件、网络通信或任何端到端信息交换的有效方式。

流的独特之处在于，它不像传统的程序那样一次将一个文件读入内存，而是逐块读取数据、处理其内容，而不是将其全部保存在内存中。

这使得流在处理**大量数据**时非常强大，例如，文件可能大于你的空闲内存，不可能将整个文件读入内存来处理，这时候流就发挥作用了。

我们以 YouTube 或 Netflix 等流媒体服务为例：这些服务不会让你立即下载完整的视频和音频，而是浏览器将视频作为连续流的数据块，可以做到用户立即收看。

然而，流并不仅仅用来处理媒体或大数据，它还赋予了代码的“可组合性”。在设计时考虑到可组合性意味着几个组件可以以某种方式组合以产生相同类型的结果。在 Node.js 中，通过使用流将数据从其他更小的代码段中导入或导出，可以组成功能强大的代码段。

## 为什么要用流

与其他数据处理方法相比，流有两个主要优势：

1. **内存效率：** 不需要加载大量的数据到内存就可以处理
2. **时间效率：** 一旦有了数据就开始处理，而不必等待传输完所有数据

## Node.js 中的 4 种流（Stream）

1. **可写流：** 可写入数据的流。例如`fs.createWriteStream()` 可以使用流将数据写入文件。
2. **可读流：** 可读取数据的流。例如`fs.createReadStream()` 可以从文件读取内容。
3. **双工流：** 既可读又可写的流。例如 `net.Socket`。
4. **转换流：** 可以在数据写入和读取时修改或转换数据的流。例如，在文件压缩操作中，可以向文件写入压缩数据，并从文件中读取解压数据。

如果你用过 Node.js，可能已经遇到过流了。例如，在基于 Node.js 的 HTTP 服务器中，`request` 是可读流，`response` 是可写流。还有`fs` 模块，能同时处理可读和可写文件流。只要你用 Express，就是在使用流与客户端进行交互，流也被用于各种数据库连接驱动程序中，因为 TCP 套接字、TLS 堆栈和其他连接都是基于 Node.js 流的。

## 如何创建可读流

引入模块并初始化：

```js
const Stream = require('stream')
const readableStream = new Stream.Readable()
```

初始化后就可以给它发送数据了：

```js
readableStream.push('ping!')
readableStream.push('pong!')


```

## 异步迭代器（async iterator）

**强烈建议在处理流时使用异步迭代器**。异步迭代是一种异步检索数据容器内容的协议，意味着当前的“任务”可能在检索数据项之前暂停。另外，值得一提的是，流的异步迭代器的内部实现使用了 `readable`事件。

当从可读的流读取数据时，可以使用 async iterator:

```js
import * as fs from 'fs';

async function logChunks(readable) {
  for await (const chunk of readable) {
    console.log(chunk);
  }
}
const readable = fs.createReadStream(
  'tmp/test.txt', {encoding: 'utf8'});
logChunks(readable);

// Output:
// 'This is a test!\n'
```

**也可以在字符串中收集可读流的内容:**

```js
import { Readable } from 'stream';

async function readableToString2(readable) {
  let result = '';
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}
const readable = Readable.from('Good morning!', { encoding: 'utf8' });
assert.equal(await readableToString2(readable), 'Good morning!');
```

注意，在本例中，我们必须使用异步函数，因为我们希望返回一个 Promise。

记得不要将异步函数与 `EventEmitter` 搞混了，因为目前无法捕获从事件处理程序中发出的 rejection，从而导致难以跟踪 bug 和内存泄漏。当前的最佳实践是始终将异步函数的内容封装在 `try/catch` 块中并处理错误，但这很容易出错。[这个 pull request](https://github.com/nodejs/node/pull/27867)就是为了解决这个问题，如果能加入到 Node 核心代码的话。

### Readable.from(): 从 iterables 创建可读流

`stream.Readable.from(iterable, [options])` 是一个实用方法，用于从迭代器创建可读流，其中的 iterable 包含了数据。iterable 可以是同步迭代的，也可以是异步迭代的。`options` 是可选的，可以用于指定文本编码。

```js
const { Readable } = require('stream');

async function * generate() {
  yield 'hello';
  yield 'streams';
}

const readable = Readable.from(generate());

readable.on('data', (chunk) => {
  console.log(chunk);
});
```

### 两种读取模式

根据 [Streams API](https://nodejs.org/api/stream.html#stream_stream)，可读流有两种操作模式： *flowing* 和 *paused*。 无论流是处于流模式还是暂停模式，可读流都可以用对象模式或非对象模式。

- 在**flowing 模式**中，数据从底层系统自动读取，并通过 `EventEmitter` 接口以尽可能快的速度使用事件提供给应用程序。
- 在**paused 模式**中，必须显式地调用 `stream.read()` 方法来从流中读取数据块。

**在 flowing 模式**中，要从流中读取数据，可以监听 `data` 事件并绑定回调。当数据块可用时，可读流发出 `data` 事件并执行回调。代码如下：

```js
var fs = require("fs");
var data = '';

var readerStream = fs.createReadStream('file.txt'); //Create a readable stream

readerStream.setEncoding('UTF8'); // Set the encoding to be utf8\. 

// 处理 stream 事件 --> data, end, 和 error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function() {
   console.log(data);
});

readerStream.on('error', function(err) {
   console.log(err.stack);
});

console.log("Program Ended");
```

函数调用 `fs.createReadStream()` 提供了一个可读流。一开始，流处于静止状态。只要监听 `data` 事件并绑定回调，它就开始流动。然后，读取数据块并将其传递给回调。流的实现者可以决定 `data` 事件发出的频率。例如，HTTP 请求可以在每读取几 KB 数据时发出一个 `data` 事件。当你从文件中读取数据时，你可能会采取每读取一行就发出 `data` 事件。

当没有更多的数据要读取(到达尾部)时，流就会发出 `end` 事件。在上面的代码中，我们监听了这个事件，以便在结束时得到通知。

另外，如果出现错误，流将发出错误并通知。

**在 paused 模式**下，你只需要反复调用流实例上的 `read()`，直到每一块数据都被读取，如下所示：

```js
var fs = require('fs');
var readableStream = fs.createReadStream('file.txt');
var data = '';
var chunk;

readableStream.on('readable', function() {
    while ((chunk=readableStream.read()) != null) {
        data += chunk;
    }
});

readableStream.on('end', function() {
    console.log(data)
});

```

`read()` 函数从内部缓冲区读取一些数据并返回。当没有要读取的内容时，它返回 `null`。因此，在`while`循环中，我们检查`null`并终止循环。请注意，`readable`事件是在可以从流中读取数据块时发出的。

所有`Readable`数据流都以 **paused 模式**开始，但可以通过以下方式切换到 **flowing 模式**：

- 添加 `data` 事件处理器
- 调用 `stream.resume()` 方法
- 调用 `stream.pipe()` 方法发送数据到一个 `Writable`

`Readable`可以使用以下几种方式切换回 paused 模式:

- 如果没有管道（pipe）目标，调用`stream.pause()`方法
- 如果有管道（pipe）目标，删除所有管道目标。可以通过调用 `stream.unpipe()` 方法来删除多个管道目标。

要记住的重要概念是，除非提供了一种用于消费或忽略该数据的机制，否则`Readable` 将不会生成数据。如果消费机制被禁用或取消，`Readable`将*尝试*停止生成数据。 添加一个`readable` 事件处理程序会自动使流停止流动，并通过`readable.read()`消费数据。如果删除了`readable`事件处理程序，那么如果存在`data`事件处理程序，则流就会再次开始流动。

## 如何创建可写流

要将数据写入可写流，你需要在流实例上调用`write()`。 如下所示：

```js
var fs = require('fs');
var readableStream = fs.createReadStream('file1.txt');
var writableStream = fs.createWriteStream('file2.txt');

readableStream.setEncoding('utf8');

readableStream.on('data', function(chunk) {
    writableStream.write(chunk);
});
```

上面的代码简单直白。它只是简单地从输入流中读取数据块，并使用`write()`写入目标位置。该函数返回一个布尔值，表明操作是否成功。如果为true，则写入成功，你可以继续写入更多数据。 如果返回 false，则表示出了点问题，目前无法写入任何内容。可写流将通过发出`drain`事件来通知你何时可以开始写入更多数据。

调用`writable.end()`方法表明没有更多数据将被写入`Writable`。 如果提供可选的回调函数，将作为`finish`事件的监听器函数。

```js
// 写入 'hello, ' 然后以 'world!' 结束
const fs = require('fs');
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
// 不允许写更多内容！
```

**使用可写流，你可以从可读流中读取数据：**

```js
const Stream = require('stream')

const readableStream = new Stream.Readable()
const writableStream = new Stream.Writable()

writableStream._write = (chunk, encoding, next) => {
    console.log(chunk.toString())
    next()
}

readableStream.pipe(writableStream)

readableStream.push('ping!')
readableStream.push('pong!')

writableStream.end()
```

**你还可以使用异步迭代器写入可写流，这也是建议的做法：**

```js
import * as util from 'util';
import * as stream from 'stream';
import * as fs from 'fs';
import {once} from 'events';

const finished = util.promisify(stream.finished); // (A)

async function writeIterableToFile(iterable, filePath) {
  const writable = fs.createWriteStream(filePath, {encoding: 'utf8'});
  for await (const chunk of iterable) {
    if (!writable.write(chunk)) { // (B)
      // 处理反压
      await once(writable, 'drain');
    }
  }
  writable.end(); // (C)
  // 等待完成，如果有错误则抛出
  await finished(writable);
}

await writeIterableToFile(
  ['One', ' line of text.\n'], 'tmp/log.txt');
assert.equal(
  fs.readFileSync('tmp/log.txt', {encoding: 'utf8'}),
  'One line of text.\n');
```

`stream.finished()`的默认版本是基于回调的，但是可以通过`util.promisify()`转换为基于 Promise 的版本（A行）。

在此示例中，使用了以下两种模式：

写入可写流，同时处理反压（短时负载高峰导致系统接收数据的速率远高于它处理数据的速率）（B行）：

```js
if (!writable.write(chunk)) {
  await once(writable, 'drain');
}
```

关闭可写流，并等待写入完成（C行）：

```js
writable.end();
await finished(writable);
```

## pipeline()

管道是一种机制，是将一个流的输出作为另一流的输入。它通常用于从一个流中获取数据并将该流的输出传递到另外的流。管道操作没有限制，换句话说，管道用于分步骤处理流数据。

Node 10.x 引入了`stream.pipeline()`。 这是一种模块方法，用于在流之间进行管道传输，转发错误信息和数据清理，并在管道完成后提供回调。

下面是使用 pipeline 的一个例子：

```js
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

// 使用 pipeline API 轻松管理多个管道流，并且在管道全部完成时得到通知
// 一个用来高效压缩超大视频文件的管道

pipeline(
  fs.createReadStream('The.Matrix.1080p.mkv'),
  zlib.createGzip(),
  fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);


```

应该使用`pipeline` 而不是 `pipe`，因为`pipe`是不安全的。

## Stream 模块

[Node.js stream 模块](https://nodejs.org/api/stream.html) 是构建所有流 API 的基础。

Stream 模块是 Node.js 中默认提供的内建模块。 Stream 是 EventEmitter 类的实例，该类在Node 中用于异步处理事件。 因此，流本质上是基于事件的。

使用stream模块只需：

```js
const stream = require('stream');


```

`stream` 模块对于创建新型流实例非常有用。通常没有必要使用`stream`模块来消费流。

## 基于流的 Node.js API

由于它们的优点，Node.js 许多核心模块提供了原生流处理功能，最值得注意的是这些：

- `net.Socket` 基于流的主要 node api，是以下大部分 API 的基础
- `process.stdin` 返回连接到 stdin 的流
- `process.stdout`返回连接到 stdout 的流
- `process.stderr` 返回连接到 stderr 的流
- `fs.createReadStream()` 创建一个文件可读流
- `fs.createWriteStream()` 创建一个文件可写流
- `net.connect()` 初始化一个基于流的连接
- `http.request()` 返回 `http.ClientRequest`类的一个实例，是一个可写流
- `zlib.createGzip()` 用 gzip (一种压缩算法)将数据压缩到流
- `zlib.createGunzip()` 解压 gzip 流
- `zlib.createDeflate()` 用 deflate (一种压缩算法)将数据压缩到流
- `zlib.createInflate()` 解压 deflate 流

## Streams 备忘单

| 类型        | 功能                     |
| ----------- | ------------------------ |
| `Readable`  | 数据提供者               |
| `Writable`  | 数据接收者               |
| `Transform` | 提供者和接收者           |
| `Duplex`    | 提供者和接收者（独立的） |

更多内容请查阅文档: [Stream](https://nodejs.org/api/stream.html#stream_stream) *(nodejs.org)*

#### Streams

```js
const Readable = require('stream').Readable
const Writable = require('stream').Writable
const Transform = require('stream').Transform


```

#### 管道 Piping

```js
clock()              // 可读流
  .pipe(xformer())   // 转换流
  .pipe(renderer())  // 可写流


```

#### 方法

```js
stream.push(/*...*/)         // Emit a chunk
stream.emit('error', error)  // Raise an error
stream.push(null)            // Close a stream


```

#### 事件

```js
const st = source() // 假设 source() 是可读流
st.on('data', (data) => { console.log('<-', data) })
st.on('error', (err) => { console.log('!', err.message) })
st.on('close', () => { console.log('** bye') })
st.on('finish', () => { console.log('** bye') })


```

#### Flowing 模式

```js
// 开启和关闭 flowing 模式
st.resume()
st.pause()
// 自动开启 flowing 模式
st.on('data', /*...*/)


```

#### 可读流

```js
function clock () {
  const stream = new Readable({
    objectMode: true,
    read() {} // 自己实现 read() 方法，如果要按需读取
  })

  setInterval(() => {
    stream.push({ time: new Date() })
  }, 1000)

  return stream
}

```

> 可读流是数据生成器，用`stream.push()`写入数据。

#### 转换流

```js
function xformer () {
  let count = 0

  return new Transform({
    objectMode: true,
    transform: (data, _, done) => {
      done(null, { ...data, index: count++ })
    }
  })
}


```

> 将转换后的数据块传给 `done(null, chunk)`.

#### 可写流

```js
function renderer () {
  return new Writable({
    objectMode: true,
    write: (data, _, done) => {
      console.log('<-', data)
      done()
    }
  })
}


```

#### 全部串起来

```js
clock()              // 可读流
  .pipe(xformer())   // 转换流
  .pipe(renderer())  // 可写流


```

以下是与可写流相关的一些重要事件：

- `error` – 在写入/管道操作发生了错误时发送
- `pipeline` – 当将可读流传递到可写流中时，可写流会发出此事件。
- `unpipe` – 当你在可读流上调用`unpipe`并停止将其输送到目标流中时发出。

## 总结

这就是所有关于流的基础知识。 流、管道和链式操作是 Node.js 的核心和最强大的功能。流确实可以帮助你编写简洁而高效的代码来操作 I/O。

此外，还有一个值得期待的[Node.js战略计划](https://github.com/nodejs/TSC/blob/master/Strategic-Initiatives.md#current-initiatives)叫做[BOB](https://github.com/Fishrock123/bob)，目标是改善 Node.js 的流数据接口，既可应用于 Node.js 内部核心，将来还有希望用于公开 API。