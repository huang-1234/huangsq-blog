# 内建对象



## Number



**`Number.MAX_SAFE_INTEGER`** 常量表示在 JavaScript 中最大的安全整数（maxinum safe integer)（`253 - 1）。`

| `Number.MAX_SAFE_INTEGER` 属性的属性特性： |       |
| :----------------------------------------- | ----- |
| writable                                   | false |
| enumerable                                 | false |
| configurable                               | false |

```js
Number.MAX_SAFE_INTEGER // 9007199254740991
Math.pow(2, 53) - 1     // 9007199254740991
```

## String



### 应用

> JS 生成26个大小写字母

```js
// JS 生成26个大小写字母
/* 主要用到 str.charCodeAt()和 String.fromCharCode()方法

--》使用 charCodeAt() 来获得字符串中某个具体字符的 Unicode 编码。

--》fromCharCode() 可接受一个（或多个）指定的 Unicode 值，然后返回对应的字符串。 */

//生成大写字母  A的Unicode值为65 . Z的Unicode值为90
function generateBig_1() {
  let str = [];
  for (let i = 65;i < 91;i++) {
    str.push(String.fromCharCode(i));
  }
  return str;
}
//生成大写字母  a的Unicode值为97 . z的Unicode值为122
function generateSmall_1() {
  let smallWordArr = [];
  for (let i = 97;i < 123;i++) {
    smallWordArr.push(String.fromCharCode(i));
  }
  return smallWordArr;
}
//将字符串转换成Unicode码
function toUnicode(str) {
  let codes = [];
  for (let i = 0;i < str.length;i++) {
    codes.push(str.charCodeAt(i));
  }
  return codes;
}

function generateSmall() {
  let ch_small = 'a';
  let str_small = '';
  for (let i = 0;i < 26;i++) {
    str_small += String.fromCharCode(ch_small.charCodeAt(0) + i);
  }
  return str_small;
}

function generateBig() {
  let ch_big = 'A';
  let str_big = '';
  for (let i = 0;i < 26;i++) {
    str_big += String.fromCharCode(ch_big.charCodeAt(0) + i);
  }
  return str_big;
}

console.log(generateBig());
console.log(generateSmall());

console.log(toUnicode(generateBig()));
console.log(toUnicode(generateSmall()));

console.log(generateBig_1());
console.log(generateSmall_1());
```



