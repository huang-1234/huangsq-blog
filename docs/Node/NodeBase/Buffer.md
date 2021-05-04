# 使用Buffer类处理二进制数据

在Node.js中提供了Buffer类，通过Buffer类中的各种构造函数创建Buffer对象，从而实现将缓存区中的字节数据转换为字符串对象以及将缓存区中的字节数据与数值对象之间进行转换。

> 一、创建Buffer对象

  Node.js中的Buffer类是一个全局类，也就是说Buffer类可以在任何模块中被使用，不需要为了使用Buffer类二加载任何模块。可以使用new关键字创建Buffer类的实例对象，在Buffer类中用于创建实例对象的构造方法有三种。
   （1）第一种是只需要传入缓存区大小作为构造函数的参数创建实例对象，程序示例：



```javascript
var buf = new Buffer(size); //size表示需要设置的缓存区的大小，以字节为单位
```

  在创建Buffer类的实例对象之后，可以通过实例对象的length属性获取缓存区的大小。Buffer类的fill()方法可以用来初始化缓存区中的内容，程序示例：



```javascript
var buf = new Buffer(128);
buf.fill(2, 2 ,10); //使用Buffer类的fill()方法初始化缓存区内容
```

  fill()方法可以接受三个参数，第一个参数是必须指定的参数，表示被写入缓存区的内容。第二个参数为可选参数，表示从缓存区的第几个字节开始写入内容，默认是从缓存区开始的位置写入参数。第三个参数也是可选参数，表示向缓存区写入内容直到第几个字节为止，默认是将整个缓存区写满。
   （2）Buffer类中提供的第二种创建实例的构造方法是将数组传入构造方法创建Buffer类的实例对象。程序示例：



```javascript
var array = [1,2,3,4,5];
var buff = new Buffer(array);   //将数组作为参数传入构造方法创建Buffer类的实例对象
```

 （3）第三种创建Buffer类实例对象的方式是将字符串作为参数直接传入构造方法创建实例对象，程序示例：



```javascript
var string = 'Hello World';
var buffer = new Buffer(string);    //直接传入字符串创建Buffer类的实例对象
```

 在使用字符串作为参数创建Buffer类的实例对象时，可以在构造函数中添加第二个参数指定字符编码格式，默认的字符编码格式是“utf8”。

| 字符编码格式 | 描述                     |
| ------------ | ------------------------ |
| ascii        | ASCII字符编码格式        |
| utf8         | UTF-8字符编码格式        |
| utf16le      | UTF-16LE字符编码格式     |
| ucs2         | UCS2字符编码格式         |
| base64       | BASE64字符编码格式       |
| binary       | 二进制数据               |
| hex          | 使用十六进制表示的字符串 |

> 二、Buffer对象与字符串对象的转换

  （1）使用Buffer对象的toString()方法将缓存区中的内容按照指定的字符编码格式转换成字符串对象，程序示例：



```javascript
var buffer = new Buffer("Buffer对象与字符串对象之间的转换。");
console.log(buffer.toString("utf8", 6, 24));
```

 toString()方法可以接受三个可选参数，第一个参数表示字符集编码格式，通过设置字符集编码格式可以将Buffer对象缓存区中的内容转换成指定的编码格式的字符串，默认的编码格式是“utf8”。第二个参数表示转换的起始位置，默认的起始位置是整个缓存区的开头。第三个参数表示转换的结束位置，默认的结束位置是缓存区的终点。
   （2）使用Buffer类的write()方法可以向已经创建的Buffer对象中写入字符串。程序示例：



```javascript
var buffer = new Buffer("我喜欢苹果。");
buffer.write("吃", 3, 3);
console.log(buffer.toString());
```

（3）在Node.js中还可以使用StringDecoder对象将Buffer对象中的内容转换为字符串对象。与toString()的作用是相同的，程序示例：



```javascript
var string_decoder = require("string_decoder");
var StringDecoder = string_decoder.StringDecoder;
var decoder = new StringDecoder([encoding]);    //encoding表示可设置字符集编码格式
```

  （4）会用JSON.stringify()方法可以将Buffer对象缓存区中的内容转换为一个字符串，使用JSON.parse()方法可以将字符串转换为数组。
   （5）使用Buffer对象的copy()方法可以将一个Buffer对象缓存区中的内容复制到另一个Buffer实例对象的缓存区中。程序示例：



```javascript
var buffer1 = new Buffer("明天是晴天。");
console.log(buffer1.toString());
var buffer2 = new Buffer("Hello World");
console.log(buffer2.toString());
buffer1.copy(buffer2, 4);
console.log(buffer2.toString());
```



