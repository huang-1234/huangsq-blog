# Worker.postMessage()





[`Worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker) 接口的 `**postMessage()**`方法向worker的内部作用域发送一个消息。这接受单个参数，这是要发送给worker的数据。数据可以是由[结构化克隆](https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/The_structured_clone_algorithm)算法处理的任何值或JavaScript对

参数

> *aMessage*

The object to deliver to the worker; this will be in the data field in the event delivered to the [`DedicatedWorkerGlobalScope.onmessage` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/onmessage) handler. This may be any value or JavaScript object handled by the [structured clone](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) algorithm, which includes cyclical references.

> *transferList* 可选

一个可选的[`Transferable`](https://developer.mozilla.org/zh-CN/docs/Web/API/Transferable)对象的[数组](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)，用于传递所有权。如果一个对象的所有权被转移，在发送它的上下文中将变为不可用（中止），并且只有在它被发送到的worker中可用。

可转移对象是如[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)，[`MessagePort`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort)或[`ImageBitmap`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap)的实例对象。transferList数组中不可传入null。

以下代码显示了如何使用 [`Worker()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker) 构造函数创建一个Worker对象。当两个表单输入(`first`和`second)`中的其中一个的输入值改变时， `change (en-US)` 事件将调用`postMessage()`把两个input的值发送给当前worker。

```
var myWorker = new Worker('worker.js');

first.onchange = function() {
  myWorker.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}

second.onchange = function() {
  myWorker.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}
```

有关完整的示例，请参阅我们的[Basic dedicated worker example](https://github.com/mdn/simple-web-worker) ([run dedicated worker](https://mdn.github.io/simple-web-worker/)).

**Note**: `postMessage()` 一次只能发送一个对象。如上所示，如果你想传递多个值，可以使用数组。


## sendmessage和postmessage的区别

1、POSTMESSAGE(非阻塞)与SENDMESSAGE(阻塞)

区别1：返回时间不同

PostMessage发送消息后就立即返回

SendMessage发送消息后，等待消息处理函数处理完后才返回。

 

区别2：返回值不同

从函数定义上来看，PostMessage的返回值是BOOL，

意思是返回非0值，消息执行成功，返回0，执行不成功。

SendMessage的返回值是LRESULT,返回的是消息处理函数后的返回值。


区别3：同步和异步问题

如果发送的消息码在WM_USER之下(非自定义消息)且消息参数中带有指针，那么

PostMessage，SendNotifyMessage，SendMessageCallback这些异步消息发送

函数将会失败。原因是异步消息发送函数发送后会立即返回，这样会导致消息

处理函数还未处理消息，消息参数中的指针就被释放了。

 

区别4：发送中的过程不同

在同一个线程中，PostMessage发送消息时，消息要先放入系统消息队列中，

系统会根据存放的消息，找到对应的线程(窗口、程序)的消息队列中，然后由

GetMessage/PeekMessage提交给TranslateMessage，如果是键盘、鼠标消息，

TranslateMessage会处理提交给DispatchMessage，如不是，则直接提交给

DispatchMessage，最后DispatchMessage经USER模块协助，将消息传递给窗口

处理函数；而SendMessage发送消息时，由USER模块调用目标窗口的处理函数

处理消息，并将结果返回。

不在同一个线程，基本都是用PostThreadMessage代替PostMessage，因为

PostThreadMessage是直接指定线程ID来确定目标线程；而SendMessage发送

消息到目标窗口所属的线程的消息队列中，然后发送消息的线程在UESR模块内

监视和等待消息处理，直到目标窗口处理完返回。