最近接触的一个小项目中频繁看到一个新的面孔：

```js
 changeTheme () {
      dispatch({ type: 'app/switchTheme' })
    },
    changeOpenKeys (openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }
```
虽然字面上理解了window.localStorage.setItem的意思，但是对其用法不甚理解。所以找了一些文档，将自己的理解整理下来：

针对上面的这个部分，这段代码可以缓存当前页面的停留的子页面和展开的数据，当切换出去该页面再回来的时候，展示的仍然是离开时的页面和数据。

HTML5种的web storage包含两种存储方式：localStorage和sessionStorage，这两种方式存储的数据不会自动发给服务器，仅仅是本地保存，有大小限制。

localStorage是持久化的本地保存，只要你找不到其所在地没有主动删掉，就会一直存在。就像一些缓存，都把APP删了还有。

sessionStorage是会话级别的本地保存，比如一个页面关闭的时候该页面设置的sessionStorage数据会自动消失，在不同浏览器窗口不会共享的，即使是同一个浏览器的同一个页面。根Java里面的会话有点类似的。
```js
window.localStorage.setItem(key,value);//设置指定key的数据（JSON格式）

window.localStorage.getItem(key);//获取指定key的数据
window.localStorage.removeItem(key);//删除指定key的数据

window.localStorage.clear();//清空所有的存储数据

 

window.sessionStorage.setItem(key,value);

window.sessionStorage.getItem(key);

window.sessionStorage.removeItem(key);

window.sessionStorage.clear();
```
应该还有更深的理解

> localStorage其他注意事项

一般我们会将JSON存入localStorage中，但是在localStorage会自动将localStorage转换成为字符串形式

这个时候我们可以使用JSON.stringify()这个方法，来将JSON转换成为JSON字符串
```js
if(!window.localStorage){
    alert("浏览器支持localstorage");
}else{
    var storage=window.localStorage;
    var data={
        name:'taytay',
        sex:'woman',
        hobby:'program'
    };
    var d=JSON.stringify(data);
    storage.setItem("data",d);
    console.log(storage.data);
}
```
读取之后要将JSON字符串转换成为JSON对象，使用JSON.parse()方法

```js
var data={
    name:'taytay',
    sex:'woman',
    hobby:'program'
};
var d=JSON.stringify(data);
window.localStorage.setItem("data",d);
//将JSON字符串转换成为JSON对象输出
var json=storage.getItem("data");
var jsonObj=JSON.parse(json);
console.log(typeof jsonObj);
```
打印出来是Object对象

另外还有一点要注意的是，其他类型读取出来也要进行转换.......

参考链接： https://www.cnblogs.com/st-leslie/p/5617130.html 
https://www.cnblogs.com/wdlhao/p/4494624.html

一、什么是localStorage、sessionStorage

在HTML5中，新加入了一个localStorage特性，这个特性主要是用来作为本地存储来使用的，解决了cookie存储空间不足的问题(cookie中每条cookie的存储空间为4k)，localStorage中一般浏览器支持的是5M大小，这个在不同的浏览器中localStorage会有所不同。

 

二、localStorage的优势与局限

localStorage的优势

1、localStorage拓展了cookie的4K限制

2、localStorage会可以将第一次请求的数据直接存储到本地，这个相当于一个5M大小的针对于前端页面的数据库，相比于cookie可以节约带宽，但是这个却是只有在高版本的浏览器中才支持的

localStorage的局限

1、浏览器的大小不统一，并且在IE8以上的IE版本才支持localStorage这个属性

2、目前所有的浏览器中都会把localStorage的值类型限定为string类型，这个在对我们日常比较常见的JSON对象类型需要一些转换

3、localStorage在浏览器的隐私模式下面是不可读取的

4、localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡

5、localStorage不能被爬虫抓取到

localStorage与sessionStorage的唯一一点区别就是localStorage属于永久性存储，而sessionStorage属于当会话结束的时候，sessionStorage中的键值对会被清空

这里我们以localStorage来分析

### localStorage的写入
localStorage的写入有三种方法，这里就一一介绍一下
```js
if(！window.localStorage){
            alert("浏览器支持localstorage");
            return false;
        }else{
            var storage=window.localStorage;
            //写入a字段
            storage["a"]=1;
            //写入b字段
            storage.a=1;
            //写入c字段
            storage.setItem("c",3);
            console.log(typeof storage["a"]);
            console.log(typeof storage["b"]);
            console.log(typeof storage["c"]);
        }
```


这里要特别说明一下localStorage的使用也是遵循同源策略的，所以不同的网站直接是不能共用相同的localStorage

不知道各位读者有没有注意到，刚刚存储进去的是int类型，但是打印出来却是string类型，这个与localStorage本身的特点有关，localStorage只支持string类型的存储。

localStorage的读取
```js
if(!window.localStorage){
            alert("浏览器支持localstorage");
        }else{
            var storage=window.localStorage;
            //写入a字段
            storage["a"]=1;
            //写入b字段
            storage.a=1;
            //写入c字段
            storage.setItem("c",3);
            console.log(typeof storage["a"]);
            console.log(typeof storage["b"]);
            console.log(typeof storage["c"]);
            //第一种方法读取
            var a=storage.a;
            console.log(a);
            //第二种方法读取
            var b=storage["b"];
            console.log(b);
            //第三种方法读取
            var c=storage.getItem("c");
            console.log(c);
        }
```

这里面是三种对localStorage的读取，其中官方推荐的是getItem\setItem这两种方法对其进行存取，不要问我这个为什么，因为这个我也不知道

### 前端的数据库 localStorage

我之前说过localStorage就是相当于一个前端的数据库的东西，数据库主要是增删查改这四个步骤，这里的读取和写入就相当于增、查的这两个步骤

下面我们就来说一说localStorage的删、改这两个步骤

改这个步骤比较好理解，思路跟重新更改全局变量的值一样，这里我们就以一个为例来简单的说明一下
```js
if(!window.localStorage){
            alert("浏览器支持localstorage");
        }else{
            var storage=window.localStorage;
            //写入a字段
            storage["a"]=1;
            //写入b字段
            storage.b=1;
            //写入c字段
            storage.setItem("c",3);
            console.log(storage.a);
            // console.log(typeof storage["a"]);
            // console.log(typeof storage["b"]);
            // console.log(typeof storage["c"]);
            /*分割线*/
            storage.a=4;
            console.log(storage.a);
        }
```

这个在控制台上面我们就可以看到已经a键已经被更改为4了

localStorage的删除

1、将localStorage的所有内容清除
```js
var storage=window.localStorage;
storage.a=1;
storage.setItem("c",3);
console.log(storage);
storage.clear();
console.log(storage);
```
将localStorage中的某个键值对删除
```js
var storage=window.localStorage;
storage.a=1;
storage.setItem("c",3);
console.log(storage);
storage.removeItem("a");
console.log(storage.a);
```

https://www.cnblogs.com/st-leslie/p/5617130.html