# 关于写文件的一些应用和问题



## 将长字符串写入文件

我有一个长度为 1.69 亿个字符的字符串，我需要将其写入文件，然后从另一个进程读取。

我已经阅读了 WriteStream 和 ReadStream，但是当它没有方法“管道”时如何将字符串写入文件？

**最佳答案**

创建一个写流是个好主意。你可以这样使用它:

```
var fs = require('fs');
var wstream = fs.createWriteStream('myOutput.txt');
wstream.write('Hello world!\n');
wstream.write('Another line\n');
wstream.end();
```


您可以根据需要调用多次写入，其中包含 1600 万个字符字符串的一部分。完成文件写入后，您可以创建一个读取流来读取文件的块。

但是，1600 万个字符并不是那么多，我想说您可以一次读写它并将整个文件保存在内存中。

**更新** :根据评论中的要求，我更新了一个示例以将流传输到即时压缩:

```
var zlib = require('zlib');
var gzip = zlib.createGzip();
var fs = require('fs');
var out = fs.createWriteStream('input.txt.gz');

gzip.pipe(out);

gzip.write('Hello world!\n');
gzip.write('Another line\n');

gzip.end();
```


这将创建一个 gz 文件，并且里面只有一个同名的文件(末尾没有 .gz)。



关于node.js - 将长字符串写入文件( Node js)，我们在Stack Overflow上找到一个类似的问题： https://stackoverflow.com/questions/30734373/

## 判断一个文件是否存在？

记录一些 Node.js 应用中的小知识点，如果你 Google/Baidu “Node.js 如何判断文件是否存在” 发现给出的很多答案还是使用的 fs.exists，这里**不推荐使用 fs.exists 你可以选择 fs.stat 或 fs.access。**

## **为什么不推荐 fs.exists**

我们在设计一个回调函数时，通常会遵循一个原则 “ **错误优先的回调函数**”，也就是返回值的第一个参数为错误信息，用以验证是否出错，其它的参数则用于返回数据。 如下所示为 fs.exists 的使用示例，直接返回了一个布尔值，违背了 “错误优先的回调函数” 这一设计原则，这是一方面原因。

```javascript
fs.exists('/etc/passwd', (exists) => {
  console.log(exists ? '存在' : '不存在');
});
```

另外一个是 **不推荐在 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.exists() 判断文件是否存在**，因为这样会引起 **竞态条件**，如果是在多进程下，程序的执行不完全是线性的，当程序的一个进程在执行 fs.exists 和 fs.writeFile() 时，其它进程是有可能在这之间更改文件的状态，这样就会造成一些非预期的结果。 **不推荐**

```javascript
(async () => {
  const exists = await util.promisify(fs.exists)('text.txt');
  console.log(exists);
  await sleep(10000);
  if (exists) {
    try {
      const res = await util.promisify(fs.readFile)('text.txt', { encoding: 'utf-8' });
      console.log(res);
    } catch (err) {
      console.error(err.code, err.message);
      throw err;
    }
  }
})();
```

**推荐**

```javascript
(async () => {
  try {
    const data = await util.promisify(fs.readFile)('text.txt', { encoding: 'utf-8' });
    console.log(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('File does not exists');
    } else {
      throw err;
    }
  }
})();
```

目前 **fs.exists 已被废弃**，另外需要清楚， **只有在文件不直接使用时才去检查文件是否存在**，下面推荐几个检查文件是否存在的方法。

## **使用 fs.stat**

fs.stat 返回一个 fs.Stats 对象，该对象提供了关于文件的很多信息，例如文件大小、创建时间等。其中有两个方法 stats.isDirectory()、stats.isFile() 用来判断是否是一个目录、是否是一个文件。

```javascript
const stats = await util.promisify(fs.stat)('text1.txt');
console.log(stats.isDirectory()); // false
console.log(stats.isFile()); // true
```

**若只是检查文件是否存在，推荐使用下面的 fs.access**。

## **使用 fs.access**

fs.access 接收一个 mode 参数可以判断一个文件是否存在、是否可读、是否可写，返回值为一个 err 参数。

```javascript
const file = 'text.txt';

// 检查文件是否存在于当前目录中。
fs.access(file, fs.constants.F_OK, (err) => {
  console.log(`${file} ${err ? '不存在' : '存在'}`);
});

// 检查文件是否可读。
fs.access(file, fs.constants.R_OK, (err) => {
  console.log(`${file} ${err ? '不可读' : '可读'}`);
});

// 检查文件是否可写。
fs.access(file, fs.constants.W_OK, (err) => {
  console.log(`${file} ${err ? '不可写' : '可写'}`);
});

// 检查文件是否存在于当前目录中、以及是否可写。
fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.error(
      `${file} ${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
  } else {
    console.log(`${file} 存在，且可写`);
  }
});
```

同样的也**不推荐在 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.exists() 判断文件是否存在，会引起竞态条件。**

本文分享自微信公众号 - Nodejs技术栈（NodejsRoadmap），作者：五月君

原文出处及转载信息见文内详细说明，如有侵权，请联系 yunjia_community@tencent.com 删除。

[原始发表时间：2020-08-24](https://cloud.tencent.com/developer/article/1688742)

