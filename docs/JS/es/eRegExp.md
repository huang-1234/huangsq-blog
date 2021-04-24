# 6. RegExp

#### 正则表达式修饰符

**修饰符** 可以在全局搜索中不区分大小写:

| 修饰符 | 描述                                                     |
| :----- | :------------------------------------------------------- |
| i      | 执行对大小写不敏感的匹配。                               |
| g      | 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。 |
| m      | 执行多行匹配。                                           |



------

#### 正则表达式模式4

方括号用于查找某个范围内的字符：

| 表达式 | 描述                       |
| :----- | :------------------------- |
| [abc]  | 查找方括号之间的任何字符。 |
| [0-9]  | 查找任何从 0 至 9 的数字。 |
| (x\|y) | 查找任何以 \| 分隔的选项。 |

元字符是拥有特殊含义的字符：

| 元字符 | 描述                                        |
| :----- | :------------------------------------------ |
| \d     | 查找数字。                                  |
| \s     | 查找空白字符。                              |
| \b     | 匹配单词边界。                              |
| \uxxxx | 查找以十六进制数 xxxx 规定的 Unicode 字符。 |

量词:

| 量词 | 描述                                  |
| :--- | :------------------------------------ |
| n+   | 匹配任何包含至少一个 *n* 的字符串。   |
| n*   | 匹配任何包含零个或多个 *n* 的字符串。 |
| n?   | 匹配任何包含零个或一个 *n* 的字符串。 |



------

#### 使用 RegExp 对象

在 JavaScript 中，RegExp 对象是一个预定义了属性和方法的正则表达式对象。

------

#### 使用 test()

test() 方法是一个正则表达式方法。

test() 方法用于检测一个字符串是否匹配某个模式，如果字符串中含有匹配的文本，则返回 true，否则返回 false。

以下实例用于搜索字符串中的字符 "e"：

#### 实例

var patt = /e/;
patt.test("The best things in life are free!");

字符串中含有 "e"，所以该实例输出为：

true


[尝试一下 »](https://www.runoob.com/try/tryit.php?filename=tryjs_regexp_test)

你可以不用设置正则表达式的变量，以上两行代码可以合并为一行：

/e/.test("The best things in life are free!")



------

#### 使用 exec()

exec() 方法是一个正则表达式方法。

exec() 方法用于检索字符串中的正则表达式的匹配。

该函数返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。

以下实例用于搜索字符串中的字母 "e":

#### 实例 1

/e/.exec("The best things in life are free!");

字符串中含有 "e"，所以该实例输出为:

e


[尝试一下 »](https://www.runoob.com/try/tryit.php?filename=tryjs_regexp_exec)

------

#### 更多实例

- [JS 判断输入字符串是否为数字、字母、下划线组成](https://c.runoob.com/codedemo/3527)
- [JS 判断输入字符串是否全部为字母](https://c.runoob.com/codedemo/3526)
- [JS 判断输入字符串是否全部为数字](https://c.runoob.com/codedemo/3525)

------

#### 完整的 RegExp 参考手册

完整的 RegExp 对象参考手册，请参考我们的 [JavaScript RegExp 参考手册](https://www.runoob.com/jsref/jsref-obj-regexp.html)。

该参考手册包含了所有 RegExp 对象的方法和属性。

### RegExp常用实例

#### 正则表达式表单验证实例：

```js
/*是否带有小数*/
function    isDecimal(strValue )  {  
   var  objRegExp= /^\d+\.\d+$/;
   return  objRegExp.test(strValue);  
}  

/*校验是否中文名称组成 */
function ischina(str) {
    var reg=/^[\u4E00-\u9FA5]{2,4}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}

/*校验是否全由8位数字组成 */
function isStudentNo(str) {
    var reg=/^[0-9]{8}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}

/*校验电话码格式 */
function isTelCode(str) {
    var reg= /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    return reg.test(str);
}

/*校验邮件地址是否合法 */
function IsEmail(str) {
    var reg=/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    return reg.test(str);
}
```