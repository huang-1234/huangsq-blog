# meituan

1 说说你对 this 的理解，然后看代码输出

```js
var test = {
  a: 40,
  init: () => {
    console.log(this.a); 
    function go() {
      console.log(this.a); 
    }
    go.prototype.a = 50; 
    return go;
   }
};

var p = test.init(); 
p();
```



然后把这个 init 函数由普通函数改为剪头函数

所以说你对浏览器渲染机制的全过程

说一说你对 js 继承的理解

两个对象继承同一个父对象，然后父对象身上有一个属性是一个引用类型。当一个对象访问这个对象的引用类型属性并修改，另一个对象访问这个属性时的情况如何。

2 EventLoop

```js
const promise = new Promise((resolve, reject) => { 
  console.log(1);
  resolve(5);
  console.log(2);
}).then(val => { 
  console.log(val);
});
promise.then(() => {
  console.log(3); 
});
console.log(4); 
setTimeout(function() {
 console.log(6); 
});
```





3. vue 和 react 的一个 diff 算法

说一说具体的一个diff过程。

a,b,c,d   ==> acbd

往React源码的fiber架构简单的讲了一下的会有两次遍历

第一次遍历打上节点相应的标签，看`fiber`节点属于哪一种变化类型：增删改查

增：需要新增一个`fiber`节点

删：需要删除改`fiber`节点

改：该节点需要修改

查：表示该节点仅仅被查过一次，与另一个fiber树的节点完全相同，可以重用，无需改变



## 美团ermian

操作系统的并行

操作系统的中断和异常

1操作系统的进程和线程

2进程之间是如何通信的，有哪几种方法



3内存泄露和内存溢出

java 的内存管理和垃圾回收机制

说一说你了解哪些linux命令:

chown

chmod

比如：[linux chmod命令](https://www.cnblogs.com/peida/archive/2012/11/29/2794010.html) 知道是干嘛用的吗？

```js
chmod命令用于改变linux系统文件或目录的访问权限。用它控制文件或目录的访问权限。该命令有两种用法。一种是包含字母和操作符表达式的文字设定法；另一种是包含数字的数字设定法。

Linux系统中的每个文件和目录都有访问许可权限，用它来确定谁可以通过何种方式对文件和目录进行访问和操作。
　　文件或目录的访问权限分为只读，只写和可执行三种。以文件为例，只读权限表示只允许读其内容，而禁止对其做任何的更改操作。可执行权限表示允许将该文件作为一个程序执行。文件被创建时，文件所有者自动拥有对该文件的读、写和可执行权限，以便于对文件的阅读和修改。用户也可根据需要把访问权限设置为需要的任何组合。
　　有三种不同类型的用户可对文件或目录进行访问：文件所有者，同组用户、其他用户。所有者一般是文件的创建者。所有者可以允许同组用户有权访问文件，还可以将文件的访问权限赋予系统中的其他用户。在这种情况下，系统中每一位用户都能访问该用户拥有的文件或目录。
　　每一文件或目录的访问权限都有三组，每组用三位表示，分别为文件属主的读、写和执行权限；与属主同组的用户的读、写和执行权限；系统中其他用户的读、写和执行权限。当用ls -l命令显示文件或目录的详细信息时，最左边的一列为文件的访问权限。 例如：
  
  
  确定了一个文件的访问权限后，用户可以利用Linux系统提供的chmod命令来重新设定不同的访问权限。也可以利用chown命令来更改某个文件或目录的所有者。利用chgrp命令来更改某个文件或目录的用户组。 

chmod命令是非常重要的，用于改变文件或目录的访问权限。用户用它控制文件或目录的访问权限。chmod命令详细情况如下。

1. 命令格式:

chmod [-cfvR] [--help] [--version] mode file   

2. 命令功能：

用于改变文件或目录的访问权限，用它控制文件或目录的访问权限。

3. 命令参数：

必要参数：
-c 当发生改变时，报告处理信息
-f 错误信息不输出
-R 处理指定目录以及其子目录下的所有文件
-v 运行时显示详细处理信息
```



4css实现水平和垂直居中布局 css画三角形和



5说一说你了解的DOM0级事件和DOM1事件

举个例子

```js
elem.addEventListener('change', cb1)
elem.addEventListener('change', cb1)
elem.addEventListener('change', cb1)

elem.onchange = cb1
elem.onchange = cb1
elem.onchange = cb1
```

上面的三个回调函数都会执行，

下面的三个回调函数，只有最后一个函数回调会被执行。

因为最后一个回调函数覆盖了前面的回调函数

6 说一说你对与计算机网络层次体系结构和TCP，UDP的理解。

TCP和http的关系如何，请你简单的讲一讲