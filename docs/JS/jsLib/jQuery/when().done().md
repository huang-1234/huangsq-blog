# jQUery的$.when（）.done() 这个知识点，很少见到，做个记录

```js
jQuery.when(deferreds)
参数deferreds，一个或多个延时对象或JS对象，我们初略的认为它就是一个或多个异步请求。
例如：

[javascript] view plain copy
$.when($.ajax("page1.php"), $.ajax("page2.php"))  

when()函数常常和done()函数、fail()函数、then()函数联合使用：
done(Function func) - 当deferreds中的处理都完成的时候执行Function回调函数
fail(Function func) - 当deferreds中有一个处理失败的时候执行Function回调函数
then(Function func1,Function func2)- 结合了done和fail函数，当都成功执行func1，当有一个失败执行func2
```

# [jQuery的 $when()](https://www.cnblogs.com/baiyuhong/p/5758147.html)

某天看jQuey的deffered对象的时候，突然想起了曾经面试的一个关于ajax的问题，就是同时发送三个ajax请求，当三个请求都成功的时候输出1，当时不知道jQuery的$.when（）,所以以为是一个请求结束的时候去判断另一个，现在想起来好傻。

$.when()  1.5版本以后添加的

参数：零个或多个延迟对象（deferred对象），或者普通的JavaScript对象。

用处：文档描述提供一种方法来执行零个或多个对象的回调函数，我所理解的是用来同时执行多个异步对象，当这几个异步对象都执行成功后调用done函数，若有一个失败则执行fail函数。

主要考虑三种参数情况

1.接收一个非延迟对象的参数或者不接收任何参数，则默认为一个状态为resolve的延迟对象。只会执行done函数。

2.接收一个延迟对象，会返回他的一个promise对象，可以继续绑定延迟对象的其他方法，同时也会相应的执行resolve或reject

3.接收多个延迟对象，会根据一个集成的延迟对象，这个对象集合所有延迟对象的状态，当全部成功则resolve，失败则reject

 

所以ajax的那个问题可以这样解决。

$.when(ajax1,ajax2,ajax3).done(function(){alert(1)}).

 

调用$.when()以后继续执行的done，fail，then等方法，都是延迟对象的方法。

关于延迟对象deferred对象可以参考阮一峰的http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html

deferred对象和promise对象的区别

$.ajax()返回的是一个延迟对象？

不是，从 jQuery 1.5 开始，`$.ajax()`返回的jqXHR对象 实现了 Promise 接口, 使它拥有了 Promise 的所有属性，方法和行为。