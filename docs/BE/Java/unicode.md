# java

## java utf-8转中文

```java
// java中如何把类似%E6%8D%A2%E4%B9的编码转化成中文？
java.net.URLDecoder.decode("%E6%8D%A2%E4%B9","UTF-8")
前一参数是编码串，后一参数是编码方式名称。
注：不一定有效，有时编码用的不是UTF-8，java支持的编码种类有上百种。用错了编码方式结果不会正确的。
比如用UTF-8试验了几个链接中的编码串是正确的，但上面的编码串试验了所有编码方式，都是乱码。
编码方式操作：
import java.nio.charset.Charset;
取得本机支持的编码方式名称数组：
   String[] charsets=Charset.availableCharsets().keySet().toArray(new String[0]);
取得本机支持的编码方式数组：
   Charset[] charsets=Charset.availableCharsets().keySet().toArray(new Charset[0]);
取得本机默认的编码方式名称：
   Charset.defaultCharset().name()

补充：Java是一种可以撰写跨平台应用软件的面向对象的程序设计语言。Java 技术具有卓越的通用性、高效性、平台移植性和安全性，广泛应用于PC、数据中心、游戏控制台、科学超级计算机、移动电话和互联网，同时拥有全球最大的开发者专业社群。
```

> code

```java
public class Test{
public static void main(String[] args){
try
{
System.out.println(java.net.URLDecoder.decode("java+url%B1%E0%C2%EB%D7%AA%BB%BB","gb2312"));
}
catch (Exception e)
{
e.printStackTrace();
}
}
}
```
