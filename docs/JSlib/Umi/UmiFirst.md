在`JSONNumber`（数字内部不允许包含空格）或`JSONString`（字符串内部的空格被解释为相应的字符，否则就有问题了）之外的任何位置可以有多余的空白字符。JSON只支持这些空白字符： 制表符（[U+0009](http://unicode-table.com/en/0009/)），回车（[U+000D](http://unicode-table.com/en/000D/)），换行（[U+00](http://unicode-table.com/en/0020/)0A）以及空格（[U+0020](http://unicode-table.com/en/0020/)）。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON#methods)

- [`JSON.parse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

  解析JSON字符串并返回对应的值，可以额外传入一个转换函数，用来将生成的值和其属性, 在返回之前进行某些修改。

- [`JSON.stringify()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

  返回与指定值对应的JSON字符串，可以通过额外的参数, 控制仅包含某些属性, 或者以自定义方法来替换某些key对应的属性值。

## [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON#polyfill)

`JSON`对象可能不被老版本的浏览器支持。可以将下面的代码放到JS脚本最开始的位置，这样就可以在没有原生支持 JSON 对象的浏览器（如IE6）中使用 `JSON`对象。

以下算法是对原生`JSON`对象的模仿：

```
if (!window.JSON) {
  window.JSON = {
    parse: function(sJSON) { return eval('(' + sJSON + ')'); },
    stringify: (function () {
      var toString = Object.prototype.toString;
      var isArray = Array.isArray || function (a) { return toString.call(a) === '[object Array]'; };
      var escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'};
      var escFunc = function (m) { return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1); };
      var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
      return function stringify(value) {
        if (value == null) {
          return 'null';
        } else if (typeof value === 'number') {
          return isFinite(value) ? value.toString() : 'null';
        } else if (typeof value === 'boolean') {
          return value.toString();
        } else if (typeof value === 'object') {
          if (typeof value.toJSON === 'function') {
            return stringify(value.toJSON());
          } else if (isArray(value)) {
            var res = '[';
            for (var i = 0; i < value.length; i++)
              res += (i ? ', ' : '') + stringify(value[i]);
            return res + ']';
          } else if (toString.call(value) === '[object Object]') {
            var tmp = [];
            for (var k in value) {
              if (value.hasOwnProperty(k))
                tmp.push(stringify(k) + ': ' + stringify(value[k]));
            }
            return '{' + tmp.join(', ') + '}';
          }
        }
        return '"' + value.toString().replace(escRE, escFunc) + '"';
      };
    })()
  };
}
```

业界更专业, 更强大的`JSON`对象 [polyfills](http://remysharp.com/2010/10/08/what-is-a-polyfill/) 是 [JSON2](https://github.com/douglascrockford/JSON-js) 和 [JSON3](http://bestiejs.github.com/json3)。