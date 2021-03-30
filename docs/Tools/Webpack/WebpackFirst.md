# Webpack打包

### 一. 概述
[learn Webpack](https://webpack.docschina.org/)

#### 什么是webpack

***模块打包机：\***它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。

#### 为什么使用webpack

现在是网络时代，在我们的生活中网络成为了必不可少的，我们在网络上可以看到很多漂亮的功能丰富的页面，这些页面都是由复杂的JavaScript代码和各种依赖包组合形成的，那么这些都是怎么*组合在一起的呢，组合在一起需要花费多少精力呢，经过漫长发展时间现前端涌现出了很多实践方法来处理复杂的工作流程，让开发变得更加简便。

- **模块化** 可以使复杂的程序细化成为各个小的文件
- **预处理器** 可以对Scss，less等CSS预先进行处理
   ......

### 二. weback使用流程

### 1、创建项目

这里用的是命令创建项目，当然你也可以去鼠标右键创建项目



```cpp
mkdir webpackDemo // 创建项目
cd webpackDemo // 进入项目
mkdir app // 在项目中创建app文件
mkdir common // 在项目中创建common文件
cd app // 进入app文件夹
touch app.js // 创建app.js文件
touch main.js // 创建main.js文件
cd .. //返回到webpackDemo项目根目录
cd common // 进入common文件
touch index.html // 创建index.html文件
```

- **mkdir：**创建文件夹
- **cd ..：**返回所在目录的上级目录
- **touch：**创建文件
- **app：**用来存放原始数据和我们将写的JavaScript模块
- **common：**用来存放之后供浏览器读取的文件（包括使用webpack打包生成的js文件以及一个`index.html`文件）

***基础代码\***
 index.html是主入口，需要设置根目录并且将打包后的文件导入

```xml
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <script type="text/javascript" src="index.js"></script>
</body>
</html>
```

app.js是我们写的模块,并依据CommonJS规范导出这个模块,这里我们以输出`welcome to use webpack`为例

```jsx
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "welcome to use webpack!";
  return greet;
}
```

main.js其实是一个组件,它的目的是将我们写的一些代码模块返回并插入到页面中

```dart
const greeter = require('./app.js');
document.querySelector("#root").appendChild(greeter());
```

### 2. 安装

因为安装webpack要用**npm**,所以安装之前我们首先要**安装node**

### **第一步** 要在项目根目录用`npm init`初始化，生成package.json文件

```kotlin
npm init
```

初始化过程中会有好多提示，如果非正式项目下可以直接回车调过，括号里的都是默认的,正式项目下可以根据情况填写每一步

```kotlin
name: (webpackDemo) // 项目名称
version: (1.0.0) // 版本号
description: // 项目的描述
entry point: (index.js) // 入口文件
test command: // 测试命令
git repository: // git仓库
keywords: // 关键字
author: // 作者创始人
 license: (ISC) //许可:(ISC)
About to write to C:\Users\Administrator\Desktop\webpackDemo\package.json:

{
  "name": "webpackdemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

Is this ok? (yes) // 这里直接输入yes就可以了
```

### **第二步** 安装webpack



```cpp
npm install webpack -g // 全局安装
npm install webpack --save-dev // 项目内安装
```

如果不想安装最新的版本那么得在webpack后面加一个@然后在填入你要安装的版本号，当然安装最新版本时可以加@版本号也可以不加@版本号



```dart
npm install webpack@xx -g
npm install webpack@xx --save-dev
```

webpack有两个版本分别是webpack2和webpack4，这两个版本安装配置有差异。
 **先来看看webpack2**
 本次安装的是3.5.6的版本，运行的是以下命令



```css
npm install webpack@3.5 --save-dev
```

接下来看下我们创建的package.json文件,里面的都是我们刚配置的



```json
{
  "name": "webpackdemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.5.6"
  }
}
```

**接下来看webpack4**
 webpack4版需要去额外安装`webpack-cli`



```kotlin
npm install webpack@4 --save-dev
npm install webpack@4 webpack-cli --save-dev
```

接下来看下配置文件



```json
{
  "name": "webpackdemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.29.5",
    "webpack-cli": "^3.2.3",
  }
}
```

**注意：`package.json`文件中不能有注释，在运行的时候请将注释删除**

### **第三步** 使用Webpack打包
 webpack可以在终端中使用，基本的使用方法如下：



```cpp
// webpack2的命令
node_modules/.bin/webpack app/main.js common/index.js 
// webpack4的命令
node_modules/.bin/webpack app/main.js -o common/index.js
```

- **app/main.js：**是入口文件的路径，本文中就是上述main.js的路径
- **common/index.js：**是打包文件的存放路径

**webpack4打包命令执行后**
如果你的webpack是最新的版本webpack4那么就不能用webpack2的打包命令，如果用webpack2的命令会报错打包失败，如下：

- **黄色部分：**webpack4是需要指定打包为开发环境还是生产环境的，目前我们没有指定是什么环境所以就会有这个警告
- **红色部分：**因为webpack4的打包命令和webpack2的打包命令不同，所以用webpack2的打包命令时就会提示打包的路径找不到

如果你用webpack4的打包命令，打包如下

是不是很激动我们已经将`welcome to use webpack!`在页面打包生成，但是这种方式需要在终端运行复杂的命令而且容易出错很不方便，如果能更方便点就好了，那么接下来我们在看下它的升级版打包。

### **第四步** 通过配置文件`webpack.config.js`来使用webpack
 Webpack拥有很多其它的比较高级的功能，这些功能其实都可以通过命令行模式实现，但是在终端中进行复杂的操作，这样不太方便且容易出错的，更好的办法是定义一个配置文件，这个配置文件其实也是一个简单的JavaScript模块，我们可以把所有的与打包相关的信息放在里面。
 在当前项目webpackDemo文件夹下新创建一个文件`webpack.config.js`,写入简单的配置代码，目前的配置主要涉及到的内容是入口文件路径和打包后文件的存放路径



```java
// webpack2的配置
module.exports = {
    entry:  __dirname + "/app/main.js", // 之前提到的唯一入口文件
    output: {
        path: __dirname + "/common", // 打包后的文件存放的地方
        filename: "index.js" // 打包后输出文件的文件名
    }
}
// webpack4的配置
module.exports = {
    // webpack4需要添加这个配置，development为开发环境，production为生产环境
    mode: "development",
    entry:  __dirname + "/app/main.js", // 之前提到的唯一入口文件
    output: {
        path: __dirname + "/common", // 打包后的文件存放的地方
        filename: "index.js" // 打包后输出文件的文件名
    }
}
```

**注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。**
 有了这个配置之后，再打包文件，只需在终端里运行`webpack(全局情况下)或node_modules/.bin/webpack(非全局安装需使用)`命令就可以了，不需要再命令行打入主入口和打包文件的路径了，这条命令会自动引用`webpack.config.js`文件中的配置选项。
 示例如下：

是不是很简单这样我们就不用再终端输入那么多烦人的配置文件的路径了，那么如果`node_modules/.bin/webpack`这条命令都不用在终端输入，是不是更简单呢？，接下来接着往下看。
 **更加方便的打包操作**
 根据上面的方式来看我们只要配置了`webpack.config.js`就可以将打包的路径命令省去，那么我们想是否可以以这种方式将`node_modules/.bin/webpack`命令省去呢？  答案是可以，只不过不是在这个文件内配置，也不用去新建文件配置。
 npm可以引导任务执行，对npm进行配置后可以在命令行中使用简单的npm start命令来替代上面略微繁琐的命令。在`package.json`中对scripts对象进行相关设置即可，设置方法如下。



```json
{
  "name": "webpackdemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack" // 修改的是这里，JSON文件不支持注释，引用时请清除
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.5.6"
  }
}
```

**注：package.json中的script会安装一定顺序寻找命令对应位置，本地的`node_modules/.bin`路径就在这个寻找清单中，所以无论是全局还是局部安装的Webpack，你都不需要写前面那指明详细的路径了。**
 npm的start命令是一个特殊的脚本名称，其特殊性表现在，在命令行中使用npm start就可以执行其对于的命令，如果对应的此脚本名称不是start，想要在命令行中运行时，需要这样用`npm run {script name}`如`npm run build`，我们在命令行中输入`npm start`，看看输出结果是什么，输出结果如下：

现在只需要使用`npm start`就可以打包文件了，有没有觉得webpack也不过如此嘛，不过不要太小瞧webpack，要充分发挥其强大的功能我们还需要配置很多。



### 其他配置可以查看以下文章

[(一)Source Maps](https://www.jianshu.com/p/9ccbb6f9127a)
 [(二)构建本地服务器](https://www.jianshu.com/p/16f587621811)
 [(三)Loaders](https://www.jianshu.com/p/dbd16d0ba840)
 [(四)Babel](https://www.jianshu.com/p/b002d9cffd73)
 [(五)模块化处理](https://www.jianshu.com/p/d7fbb5ad610e)
 [(六)插件（Plugins)](https://www.jianshu.com/p/1a9715a83cd4)
 [(七)产品阶段的构建](https://www.jianshu.com/p/d550974bc567)

