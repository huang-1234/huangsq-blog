# 理解 CRLF，LF

CRLF, LF 是用来表示文本换行的方式。CR(Carriage Return) 代表回车，对应字符 `'\r'`；LF(Line Feed) 代表换行，对应字符 `'\n'`。由于历史原因，不同的操作系统文本使用的换行符各不相同。主流的操作系统一般使用CRLF或者LF作为其文本的换行符。其中，Windows 系统使用的是 CRLF,  Unix系统(包括Linux, MacOS近些年的版本) 使用的是LF。

系统间的这个差异给跨平台协作开发和跨平台运行带来很多不方便的地方。最近写的代码就遇到了这个问题。下面是一段按行读取配置文件的 Golang 代码，在读取一行字符之后，去掉开头结尾的换行符与空格。我是这样写的：



```go
fun InterpretQueryLine(data []byte) {
    str_line := strings.Trim(string(data), " \n")
    // ...
}
```

本来在自己的 Ubuntu 系统上跑的很好，觉得没bug就提交了。然而，同事使用的是Windows系统，他编译之后怎么跑都不正常。由于我对 Golang 不熟悉，调试了很久才发现是换行符的问题。在Windows系统上换行符是CRLF, `\r\n`两个字符，只删除`\n`是不够的。所以在读取文件的时候一定要小心跨平台。

除了上面的问题，我们平常受到换行符问题的困扰更多来自协作开发工具，比如Git。有时候我们只改了源码中的一行，但提交的时候发现整个文件都被修改了。有时候拉取最新的分支，明明改动不大，但是在与本地合并的时候整个文件都是冲突。这些问题不会导致严重的错误，但是会给开发带来非常大的不方便。

下面介绍两个 Git 中换行符相关的处理方式：

这里先指定两个非官方的概念，方便后面解释与描述：**(重要，否则后面看不懂)**

1. **标准化** 指在提交代码到git数据库(本地库) 中将文本文件中的换行符CRLF转为LF的过程
2. **转换**     指在检出Git数据库代码过程中将文本文件中的换行符LF转换为CRLF的过程

#### core.autocrlf & core.safecrlf

Git 提供了一个名为 `core.autocrlf` 的配置，可以自动完成标准化与转换。它的设置方式如下：



```shell
git config --global core.autocrlf  [true | input | false]  # 全局设置
git config --local core.autocrlf  [true | input | false] # 针对本项目设置
```

- **true** 自动完成标准化与转换
- **input** 只做标准化操作，不做转换操作
- **false** 提交与检出的代码都保持文件原有的换行符不变

> 1. CRLF 与 LF 混合的文本文件不受此配置控制。
> 2. Git 安装后默认为 false

所以，一种规范换行符的方式是这样的：
 使用 Windows 系统的开发者设置：



```shell
git config --global core.aurocrlf true
```

使用 Linux/MacOS 的开发者设置：



```shell
git config --global core.autocrlf input
```

由于没有一个绝对有效的算法来判断一个文件是否为文本，所以Git 提供了一项禁止/警告不可逆转换的配置来防止错误的标准化与转换。它主要是影响到多种换行符混合的文件，我们可以手动将其转换为同一种换行符：



```shell
git config --global core.safecrlf [true | false | warn]
```

- **true** 禁止提交混合换行符的文本文件(`git add` 的时候会被拦截，提示异常)
- **warn** 提交混合换行符的文本文件的时候发出警告，但是不会阻止 `git add` 操作
- **false** 不禁止提交混合换行符的文本文件（默认配置）

#### .gitattributes 文件

core.autocrlf 的配置依赖于每一位参与项目的开发机器上的配置，这很难确保每个人都能正确配置。于是在规范项目中的换行符方面，还有一套添加配置文件的方案。在项目的根目录下可以添加一个.gitattributes 文件。它的优先级高于core.autocrlf的设置，可以覆盖core.autocrlf的。它类似于 .gitignore 文件，随提交修改生效，一个项目中可以维持一份相同的配置。所以，它能够避免每个开发人员配置不同的问题。

.gitattributes文件的功能不只有配置换行符，所以它的配置相对复杂一下。详细的说明文档可以参考 [地址](http://schacon.github.io/git/gitattributes.html)。这里只针对换行符的配置做一下简单的介绍：

每行基本形式：



```swift
filter attr1 attr2 ....
```

filter 代表匹配文件的通配符，在它后面跟着相应的属性，用空格间隔。

filter 的选项比较简单，常见的：



```css
* 匹配所有文件
*.txt  匹配文件名以txt结尾的文件
```

attr的选择比较多，其中与换行符相关的属性只有几条：

- text
  - **text** 自动完成标准化与转换
  - **-text** 不执行标准化与转换
  - **text=auto** 根据 Git 决定是否需要执行标准化与转化
  - **不设置** 使用core.autocrlf配置决定是否执行标准化与转换
- eol
  - **eol=lf** 强制完成标准化，不执行转换（相当于指定转换为LF格式）
  - **eol=crlf** 强制完成标准化，指定转换为CRLF格式
- binary
  - **binary** 二进制文件不参与标准化与转换
  - **不设置** 由 Git 决定是否为二进制文件

> text 设置的时候，转换自动转换到对应平台的换行符
>  行号高的设置会覆盖行号低的设置

这里给出一个简单的例子来说明一下：



```bash
*         text=auto
# These files are text and should be normalized (convert crlf => lf)
*.cs      text
*.xaml    text
*.csproj  text
*.sln     text
*.tt      text
*.ps1     text
*.cmd     text
*.msbuild text
*.md      text

# Images should be treated as binary
# (binary is a macro for -text -diff)
*.png     binary
*.jepg    binary

*.sdf     binary
```

除了下面匹配到的文件，剩下的依赖Git 决定是否参与标准化与转换。上面一段是参与标准化与转换的文件；下面一段是不参与标准化与转换的文件；

其实，在文件里只有下面这行配置的时候，就相当于根据操作系统自动填入 core.autocrlf 的设置。



```cpp
* text=auto
```

所以，这里推荐使用.gitattributes来规范项目中换行符。简单，方便，灵活。

参考文章：

- [1] [Mind the End of Your Line](http://adaptivepatchwork.com/2012/03/01/mind-the-end-of-your-line/)
- [2] [gitattributes(5) Manual Page](http://schacon.github.io/git/gitattributes.html)

我的博客即将搬运同步至腾讯云+社区，邀请大家一同入驻：https://cloud.tencent.com/developer/support-plan?invite_code=3ld8ip2y3rsw8



作者：于晓飞93
链接：https://www.jianshu.com/p/ec9564fe1c2b
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。