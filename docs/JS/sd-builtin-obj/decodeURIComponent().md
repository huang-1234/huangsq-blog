# decodeURIComponent()

使用 decodeURIComponent() 对编码后的 URI 进行解码：

```html
<script>
  var uri="http://w3cschool.cc/my test.php?name=ståle&car=saab";
  var uri_encode=encodeURIComponent(uri);
  document.write(uri_encode);
  document.write("<br>");
  document.write(decodeURIComponent(uri_encode));
</script>
```

输出

```js
http%3A%2F%2Fw3school.cc%2Fmy%20test.php%3Fname%3Dst%C3%A5le%26car%3Dsaab
http://w3schools.com/my test.asp?name=ståle&car=saab
```

> 编码

 encodeURI()

  decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。

    decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
    
    从W3C的定义和用法来看，两者没有什么区别，但是两者的参数是有区别的：
------------------------------------------------
decodeURI(URIstring)        //URIstring    一个字符串，含有要解码的 URI 或其他要解码的文本。

decodeURIComponent(URIstring)       //URIstring   一个字符串，含有编码 URI 组件或其他要解码的文本。

------------------------------------------------
