# babel-plugin-import

在 Babel 配置中引入该插件，可以针对 [antd](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fant-design%2Fant-design), [antd-mobile](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fant-design%2Fant-design-mobile), lodash, [material-ui](https://links.jianshu.com/go?to=http%3A%2F%2Fmaterial-ui.com%2F)等库进行按需加载.

------

## 为什么需要 babel-plugin-import

- [English Instruction](https://links.jianshu.com/go?to=https%3A%2F%2Fant.design%2Fdocs%2Freact%2Fgetting-started%23Import-on-Demand)
- [中文说明](https://links.jianshu.com/go?to=https%3A%2F%2Fant.design%2Fdocs%2Freact%2Fgetting-started-cn%23%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)

## 如何在项目中添加 babel-plugin-import

- [babelrc](https://links.jianshu.com/go?to=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fusage%2Fbabelrc%2F)
- [babel-loader](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel-loader)

## 例子

#### `{ "libraryName": "antd" }`



```source-js
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);

      ↓ ↓ ↓ ↓ ↓ ↓

var _button = require('antd/lib/button');
ReactDOM.render(<_button>xxxx</_button>);
```

#### `{ "libraryName": "antd", style: "css" }`



```source-js
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);

      ↓ ↓ ↓ ↓ ↓ ↓

var _button = require('antd/lib/button');
require('antd/lib/button/style/css');
ReactDOM.render(<_button>xxxx</_button>);
```

#### `{ "libraryName": "antd", style: true }`



```source-js
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);

      ↓ ↓ ↓ ↓ ↓ ↓

var _button = require('antd/lib/button');
require('antd/lib/button/style');
ReactDOM.render(<_button>xxxx</_button>);
```

备注 : 配置 `style: true` 则在项目编译阶段，可以对引入的 antd 样式文件进行编译，从而可以压缩打包尺寸；而配置`style: "css"`, 则直接引入经过打包后的 antd 样式文件

## 使用方式



```source-shell
npm install babel-plugin-import --save-dev
```

通过 `.babelrc` 配置文件或者 babel-loader 模块编程引入.



```source-js
{
  "plugins": [["import", options]]
}
```

### options

`options` can be object.



```source-js
{
  "libraryName": "antd",
  "style": true,   // or 'css'
}
```



```source-js
{
  "libraryName": "lodash",
  "libraryDirectory": "", //表示从库的package.json的main入口；否则默认为lib文件夹
  "camel2DashComponentName": false,  // default: true，将引入的组件名转化为"-"连接的文件名
}
```



```source-js
{
  "libraryName": "@material-ui/core",
  "libraryDirectory": "components",  // default: lib
  "camel2DashComponentName": false,  // default: true
}
```

~~`options` can be an array.~~ It's not available in babel@7+

For Example:



```source-js
[
  {
    libraryName: 'antd',
    libraryDirectory: 'lib', // default: lib
    style: true
  },
  {
    libraryName: 'antd-mobile'
  }
];
```

`Options` can't be an array in babel@7+, but you can add plugins with name to support multiple dependencies.

For Example:



```csharp
// .babelrc
"plugins": [
  ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "ant"],
  ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib"}, "antd-mobile"]
]
```

#### style

- `["import", { "libraryName": "antd" }]`: import js modularly
- `["import", { "libraryName": "antd", "style": true }]`: import js and css modularly (LESS/Sass source files)
- `["import", { "libraryName": "antd", "style": "css" }]`: import js and css modularly (css built files)

If option style is a `Function`, `babel-plugin-import` will auto import the file which filepath equal to the function return value. This is useful for the components library developers.

e.g.

- `["import", { "libraryName": "antd", "style": (name) =>`${name}/style/2x`}]`: import js and css modularly & css file path is `ComponentName/style/2x`

If a component has no style, you can use the `style` function to return a `false` and the style will be ignored.

e.g.



```source-js
[
  'import',
  {
    libraryName: 'antd',
    style: (name: string, file: Object) => {
      if (name === 'antd/lib/utils') {
        return false;
      }
      return `${name}/style/2x`;
    }
  }
];
```

#### customName

使用 `customName` 来自定义导入文件路径.

插件默认导入文件的基础路径为 lib 目录，并且默认将引入的组件名转换为按照"-"连接的结构:



```source-ts
import { TimePicker } from "antd"
↓ ↓ ↓ ↓ ↓ ↓
var _button = require('antd/lib/time-picker');
```

设置 `camel2DashComponentName` 为 `false`来阻止组件名称的转换:



```source-ts
import { TimePicker } from "antd"
↓ ↓ ↓ ↓ ↓ ↓
var _button = require('antd/lib/TimePicker');
```

在 Babel 配置文件中，使用 `customName` 来自定义导入组件路径:



```source-js
[
  'import',
  {
    libraryName: 'antd',
    customName: (name: string) => {
      if (name === 'TimePicker') {
        return 'antd/lib/custom-time-picker';
      }
      return `antd/lib/${name}`;
    }
  }
];
```

上面编译后的结果为:



```source-ts
import { TimePicker } from "antd"
↓ ↓ ↓ ↓ ↓ ↓
var _button = require('antd/lib/custom-time-picker');
```

#### transformToDefaultImport

如果打包后的模块没有`default`导出，则设置 `false`

### 备注

babel-plugin-import will not work properly if you add the library to the webpack config [vendor](https://links.jianshu.com/go?to=https%3A%2F%2Fwebpack.github.io%2Fdocs%2Fcode-splitting.html%23split-app-and-vendor-code).

[https://swift.ctolib.com/article/wiki/108814](https://links.jianshu.com/go?to=https%3A%2F%2Fswift.ctolib.com%2Farticle%2Fwiki%2F108814)

# babel-plugin-import-custom

针对iview做了额外的优化，[https://github.com/videring/babel-plugin-import-custom/blob/master/README.md](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvidering%2Fbabel-plugin-import-custom%2Fblob%2Fmaster%2FREADME.md)