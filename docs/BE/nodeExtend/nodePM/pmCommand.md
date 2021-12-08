# node 包管理工具命令汇总

) node 包管理器

目前就我知道的包管理器就有 mac和win10 常用的npm， yarn， pnpm

此外还有一个未来的tink

除此之外还有node版本管理器 nvm 以及 nvs

## npm 命令

### npm 常用命令

npm的全称是(Node Package Manager)，是随同NodeJS一起安装的包管理和分发工具，它很方便让JavaScript开发者**下载、安装、上传以及管理已经安装的包**。

**先说明下 下面会用到的几个变量：**

- (name)|(pkg) 模块名
- (version) 版本号
- (version range) 版本范围
- (@scope) 作用域。所有 npm 软件包都有一个名称。某些软件包名称也有作用域。[NPM 包名称作用域/scope的详细解读](https://link.segmentfault.com/?enc=bdCGAddHMAQjGdcU5eJ8gw%3D%3D.MLpEcm8IkV%2F8N6bNf%2F%2FNT54%2BdilX0wCC5LMS%2FcxUIgo%2Fn7Qu9A2q%2BzxuNmmxKNcc)|

#### 一、[安装配置Node和前言](https://link.segmentfault.com/?enc=Di3hUsjBiCw6I9UAwmixEg%3D%3D.DWFSHm%2BLemYw%2Fb416gDg%2FoBNORAFQHeTA36%2BeKI18lqwGT341E3JHqQR%2BEwe9%2By74d7VQpUqOR7EdtK1Mx1dlg%3D%3D)

```shell
# 查看 npm 的版本
$ npm -v  //6.4.0 (( 安装成功会返回版本号

# 查看各个命令的简单用法
$ npm -l

# 查看 npm 命令列表
$ npm help

# 查看 npm 的配置
$ npm config list -l
```

#### 二、npm init 创建模块

```coffeescript
$ npm init
```

`npm init`用来初始化生成一个新的`package.json`文件。它会向用户提问一系列问题，如果觉得不用修改默认配置，一路回车就可以了。

尾缀带`-f`（代表force）、`-y`（代表yes），则跳过提问阶段，直接生成一个新的`package.json`文件，不带尾缀的话，默认有提问阶段。

以上创建好之后就可以在Package.json直接看了 还可以在里面修改更新。



#### 三、npm set 设置环境变量



```csharp
$ npm set init-author-name 'my name jerry'
$ set init-author-email '12345@qq.com'
$ set init-author-url 'http://yourdomain.com'
$ npm set init-license 'MIT'
执行了以上的修改，此时 Package.json并没有发生变化

//设置后执行init才是真正修改成功
$ npm init
```

#### 四、npm search 搜索模块

```bnf
$ npm search (搜索词) [-g]
```

`npm search`命令用于搜索npm仓库，它后面可以跟字符串，也可以跟正则表达式。

`npm search glup`

### 五、npm list 查看模块

```coffeescript
#当前项目安装的所有模块
$npm list

#列出全局安装的模块 带上[--depth 0] 不深入到包的支点 更简洁
$ npm list -g --depth 0
```

### 四、npm install 安装模块

##### 基本用法

```awk
# 读取package.json里面的配置单安装
$ npm install
//可简写成 npm i

# 默认安装指定模块的最新(@latest)版本
$ npm install [(@scope)/](name)
//eg:npm install gulp

# 安装指定模块的指定版本
$ npm install [(@scope)/](name)@(version)
//eg: npm install gulp@3.9.1

# 安装指定指定版本范围内的模块
$ npm install [(@scope)/](name)@(version range)
//eg: npm install vue@")=1.0.28 ( 2.0.0"

# 安装指定模块的指定标签 默认值为(@latest)
$ npm install [(@scope)/](name)@(tag)
//eg:npm install sax@0.1.1

# 通过Github代码库地址安装
$ npm install (tarball url)
//eg:npm install git://github.com/package/path.git
```

##### **配置选项说明:**

) ```1c
) #全局安装
) -g | -global
) //eg: npm i -g gulp 或者 npm i gulp -g
)
) #这是默认设置，除非-D或-O存在
) #安装并将被添加到package.json的dependencies区。
) -P | --save-prod
)
) #**（生产阶段的依赖）**
) #安装并将被添加到package.json的dependencies区
) -S | --save
) //eg: npm i gulp --save 或 npm i gulp -S
)
) #**（开发阶段的依赖）**
) #安装并将被添加到package.json的devDependencies区。
) -D | --save-dev
) //npm i gulp --save-dev 或 npm i gulp -D
)
) #**（可选阶段的依赖）**
) #安装并将被添加到package.json的optionalDependencies区
) -O | --save-optional
)
) #安装模块的确切版，而不是使用npm的默认semver range运算符
) -E | --save-exact
) //npm i gulp --save-exact 或 npm i gulp -E
)
) #安装并将被添加到`bundleDependencies`列表中
) -B | --save-bundle
)
) #模块不管是否安装过，npm 都要强制重新安装
) -f|--force
) //eg:npm install sax --force
) //补充：所有模块都要强制重新安装，那就删除`node_modules`，重新执行`npm install`
) $ rm -rf node_modules //或者手动去删除node_modules目录
) $ npm install
)
) #防止保存到`dependencies`
) --no-save
)
) #报告安装状况而不是真的安装
) --dry-run
) ```

#### 五、npm uninstall 卸载模块

```coffeescript
#卸载当前项目或全局模块
$ npm uninstall (name) [-g]

eg: npm uninstall gulp --save-dev
    npm i gulp -g

卸载后，你可以到 /node\_modules/ 目录下查看包是否还存在，或者使用以下命令查看：
npm ls 查看安装的模块
```

#### 六、npm update 更新模块

```coffeescript
#升级当前项目或全局的指定模块
$ npm update (name) [-g]
//eg: npm update express
      npm update express -g
```

#### 七、npm link 引用模块

```fsharp
# 引用依赖 有些包是全局安装了，在项目里面只需要引用即可。
$ npm link [(@scope)/](pkg)[@(version)]
//eg: 引用   npm link gulp gulp-ssh gulp-ftp
//eg: 解除引用 npm unlink gulp

# 引用模块 本人用得少没深入说了 用得上时可去翻文档例子
$ npm link (in package dir)
```

#### 八、npm run 执行脚本

`package.json`的`scripts`字段，可以用于指定脚本命令，供`npm`直接调用。`npm run`会创建一个Shell，执行指定的命令。

##### 两个命令简写，`start`和`test`属于特殊命令，可以省略run,其余的都得带上run。

##### `npm run`的参数。

- 如果不加任何参数，直接运行，会列出`package.json`里面所有可以执行的脚本命令

- 可配置参数 格式是加上两个连词线（--）

  ```applescript
  ---package.json文件---
  "scripts": {
    "test": "mocha test/"
  }

  -------终端-------
  $ npm run test -- anothertest.js
  # 等同于直接执行
  $ mocha test/ anothertest.js
  ```

##### 内部变量

```awk
---package.json文件---
{
    "name": "npm_test",
    "version": "1.0.0",
    "config": {
        "reporter": "xunit"
    },
    "script":{
        "bundle": "mkdir -p build/$npm_package_version/",
        //$npm_package_version 读的是外层"version"的值，同理$npm_package_name 读的是外层"name"的值
        "test": "mocha test/ --reporter $npm_package_config_reporter"
        //$npm_package_config_reporter读的是"config"里的"reporter"
    }
}
```

##### `pre-`和`post-`两个钩子（hook）

npm会先查看有没有定义prelint和postlint两个钩子，如果有的话，就会
先执行`npm run pre-命令名`，然后执行`npm run 命令名`，最后执行`npm run post-命令名`。

```awk
---package.json文件---
"scripts": {
    "lint": "eslint --cache --ext .js --ext .jsx src",
    "test": "karma start --log-leve=error karma.config.js --single-run=true",
    "pretest": "npm run lint",
    "posttest": "echo 'Finished running tests'"
  }

-------终端-------
$ npm run lint
//直接执行 npm run lint 结束

$ npm run test
//因为有定义了两个钩子pretest、posttest。
//所以先执行 npm run pretest
//然后执行 npm run test
//最后执行 npm run posttest
```

#### 九、npm publish 发布模块

```coffeescript
# 未注册 申请注册一个用户 直接在https://www.npmjs.com/注册一样
$ npm adduser
//执行后 填写几个问题 Username、Password、Email

#已注册
$ npm login

#发布
$ npm publish
```

Mart一下 仅供参考 欢迎更正补充 Thanks

------

**资料：**
阮一峰：[https://javascript.ruanyifeng...](https://link.segmentfault.com/?enc=w0K0bCSqnke7stoQCDnC7A%3D%3D.%2BpED6r%2FtimN1JxvwA0YifyckcNDhfG26WIrvvx3iLQDvuSM23%2FHJpE8EI73bjN6DH387rZs2hpV0ORn1DaHYhw%3D%3D)
官网文档:[https://www.npmjs.com.cn/](https://link.segmentfault.com/?enc=2bX4bzTwpYWq7kRzhT6qZA%3D%3D.cwSal%2B6d0s13SksBsWOpqwuCHaGMZ1SCd2m%2FR0IX5GE%3D)
菜鸟教程：[https://www.runoob.com/nodejs...](https://link.segmentfault.com/?enc=TFKUVtz4b5ERfjLRcoZL1w%3D%3D.jrCM9NOu6wgvIfZo0%2BD0enPPTyuTz5dHsm6yrHeQ4HJvBmrBuIyM9okJaeGH1NSE)
[白色橡树npm 常用命令详解](https://link.segmentfault.com/?enc=Kh7dKF7OT4rnY2Y5FFZTpQ%3D%3D.4cLKHvlm%2BGT%2FgRd40ouvAjaSGy9MxrWdluIa9KvKnVXi%2Fftk84aMlKSVDUaRpJGVTX4rd2cOq6TQh9VNJJGCIA%3D%3D)
[初学案例之用npm发布一个包](https://link.segmentfault.com/?enc=JqRE9t76WwetUWIoAaZTgQ%3D%3D.fUJVh4WKlpiiIZ1RW5%2Fd6cK7QGZLI7%2BJv8Ht074XrkiQtFQTDZTfg2rZdCLALBNN)
[如何发布自己的NPM包（模块）？](https://link.segmentfault.com/?enc=0DMa6js7A1IHtp%2FVKPrCqw%3D%3D.WRDY5Z7HsHF1AYZOVpYOW28f9WXgRFqC2wdhj67eWww%2FftT5GGX0%2FLJ4GT5WSo8Z)

```bash
npm (command)

Usage:

npm install        install all the dependencies in your project
npm install (foo)  add the (foo) dependency to your project
npm test           run this project's tests
npm run (foo)      run the script named (foo)
npm (command) -h   quick help on (command)
npm -l             display usage info for all commands
npm help (term)    search for help on (term) (in a browser)
npm help npm       more involved overview (in a browser)

All commands:

    access          npm access

                    Set access level on published packages

                    Usage:
                    npm access public [(package)]
                    npm access restricted [(package)]
                    npm access grant (read-only|read-write) (scope:team) [(package)]
                    npm access revoke (scope:team) [(package)]
                    npm access 2fa-required [(package)]
                    npm access 2fa-not-required [(package)]
                    npm access ls-packages [(user)|(scope)|(scope:team)]
                    npm access ls-collaborators [(package) [(user)]]
                    npm access edit [(package)]

                    Run "npm help access" for more info

    adduser         npm adduser

                    Add a registry user account

                    Usage:
                    npm adduser

                    Options:
                    [--registry (registry)] [--scope (@scope)]

                    aliases: login, add-user

                    Run "npm help adduser" for more info

    audit           npm audit

                    Run a security audit

                    Usage:
                    npm audit [fix]

                    Options:
                    [--audit-level (info|low|moderate|high|critical|none)] [--dry-run] [-f|--force]
                    [--json] [--package-lock-only] [--production]

                    Run "npm help audit" for more info

    bin             npm bin

                    Display npm bin folder

                    Usage:
                    npm bin

                    Options:
                    [-g|--global]

                    Run "npm help bin" for more info

    bugs            npm bugs

                    Report bugs for a package in a web browser

                    Usage:
                    npm bugs [(pkgname)]

                    alias: issues

                    Run "npm help bugs" for more info

    cache           npm cache

                    Manipulates packages cache

                    Usage:
                    npm cache add (tarball file)
                    npm cache add (folder)
                    npm cache add (tarball url)
                    npm cache add (git url)
                    npm cache add (name)@(version)
                    npm cache clean
                    npm cache verify

                    Run "npm help cache" for more info

    ci              npm ci

                    Install a project with a clean slate

                    Usage:
                    npm ci

                    aliases: clean-install, ic, install-clean, isntall-clean

                    Run "npm help ci" for more info

    completion      npm completion

                    Tab Completion for npm

                    Usage:
                    npm completion

                    Run "npm help completion" for more info

    config          npm config

                    Manage the npm configuration files

                    Usage:
                    npm config set (key)=(value) [(key)=(value) ...]
                    npm config get [(key) [(key) ...]]
                    npm config delete (key) [(key) ...]
                    npm config list [--json]
                    npm config edit

                    alias: c

                    Run "npm help config" for more info

    dedupe          npm dedupe

                    Reduce duplication in the package tree

                    Usage:
                    npm dedupe

                    alias: ddp

                    Run "npm help dedupe" for more info

    deprecate       npm deprecate

                    Deprecate a version of a package

                    Usage:
                    npm deprecate (pkg)[@(version)] (message)

                    Run "npm help deprecate" for more info

    diff            npm diff

                    The registry diff command

                    Usage:
                    npm diff [...(paths)]
                    npm diff --diff=(pkg-name) [...(paths)]
                    npm diff --diff=(version-a) [--diff=(version-b)] [...(paths)]
                    npm diff --diff=(spec-a) [--diff=(spec-b)] [...(paths)]
                    npm diff [--diff-ignore-all-space] [--diff-name-only] [...(paths)] [...(paths)]

                    Run "npm help diff" for more info

    dist-tag        npm dist-tag

                    Modify package distribution tags

                    Usage:
                    npm dist-tag add (pkg)@(version) [(tag)]
                    npm dist-tag rm (pkg) (tag)
                    npm dist-tag ls [(pkg)]

                    Options:
                    [-w|--workspace (workspace-name) [-w|--workspace (workspace-name) ...]]
                    [-ws|--workspaces]

                    alias: dist-tags

                    Run "npm help dist-tag" for more info

    docs            npm docs

                    Open documentation for a package in a web browser

                    Usage:
                    npm docs [(pkgname) [(pkgname) ...]]

                    Options:
                    [--browser|--browser (browser)] [--registry (registry)]
                    [-w|--workspace (workspace-name) [-w|--workspace (workspace-name) ...]]
                    [-ws|--workspaces]

                    alias: home

                    Run "npm help docs" for more info

    doctor          npm doctor

                    Check your npm environment

                    Usage:
                    npm doctor

                    Run "npm help doctor" for more info

    edit            npm edit

                    Edit an installed package

                    Usage:
                    npm edit (pkg)[/(subpkg)...]

                    Run "npm help edit" for more info

    exec            npm exec

                    Run a command from a local or remote npm package

                    Usage:
                    npm exec -- (pkg)[@(version)] [args...]
                    npm exec --package=(pkg)[@(version)] -- (cmd) [args...]
                    npm exec -c '(cmd) [args...]'
                    npm exec --package=foo -c '(cmd) [args...]'

                    Options:
                    [-w|--workspace (workspace-name) [-w|--workspace (workspace-name) ...]]
                    [-ws|--workspaces]

                    alias: x

                    Run "npm help exec" for more info

    explain         npm explain

                    Explain installed packages

                    Usage:
                    npm explain (folder | specifier)

                    alias: why

                    Run "npm help explain" for more info

    explore         npm explore

                    Browse an installed package

                    Usage:
                    npm explore (pkg) [ -- (command)]

                    Run "npm help explore" for more info

    find-dupes      npm find-dupes

                    Find duplication in the package tree

                    Usage:
                    npm find-dupes

                    Run "npm help find-dupes" for more info

    fund            npm fund

                    Retrieve funding information

                    Usage:
                    npm fund [[(@scope)/](pkg)]

                    Options:
                    [--json] [--browser|--browser (browser)] [--unicode]
                    [--which (fundingSourceNumber)]

                    Run "npm help fund" for more info

    get             npm get

                    Get a value from the npm configuration

                    Usage:
                    npm get [(key) ...] (See `npm config`)

                    Run "npm help get" for more info

    help            npm help

                    Get help on npm

                    Usage:
                    npm help (term) [(terms..)]

                    alias: hlep

                    Run "npm help help" for more info

    hook            npm hook

                    Manage registry hooks

                    Usage:
                    npm hook add (pkg) (url) (secret) [--type=(type)]
                    npm hook ls [pkg]
                    npm hook rm (id)
                    npm hook update (id) (url) (secret)

                    Run "npm help hook" for more info

    init            npm init

                    Create a package.json file

                    Usage:
                    npm init [--force|-f|--yes|-y|--scope]
                    npm init (@scope) (same as `npx (@scope)/create`)
                    npm init [(@scope)/](name) (same as `npx [(@scope)/]create-(name)`)

                    Options:
                    [-w|--workspace (workspace-name) [-w|--workspace (workspace-name) ...]]
                    [-ws|--workspaces]

                    aliases: create, innit

                    Run "npm help init" for more info

    install         npm install

                    Install a package

                    Usage:
                    npm install [(@scope)/](pkg)
                    npm install [(@scope)/](pkg)@(tag)
                    npm install [(@scope)/](pkg)@(version)
                    npm install [(@scope)/](pkg)@(version range)
                    npm install (alias)@npm:(name)
                    npm install (folder)
                    npm install (tarball file)
                    npm install (tarball url)
                    npm install (git:// url)
                    npm install (github username)/(github project)

                    Options:
                    [-S|--save|--no-save|--save-prod|--save-dev|--save-optional|--save-peer]
                    [-E|--save-exact]

                    aliases: i, in, ins, inst, insta, instal, isnt, isnta, isntal, add

                    Run "npm help install" for more info

    install-ci-test npm install-ci-test

                    Install a project with a clean slate and run tests

                    Usage:
                    npm install-ci-test

                    alias: cit

                    Run "npm help install-ci-test" for more info

    install-test    npm install-test

                    Install package(s) and run tests

                    Usage:
                    npm install-test [(@scope)/](pkg)
                    npm install-test [(@scope)/](pkg)@(tag)
                    npm install-test [(@scope)/](pkg)@(version)
                    npm install-test [(@scope)/](pkg)@(version range)
                    npm install-test (alias)@npm:(name)
                    npm install-test (folder)
                    npm install-test (tarball file)
                    npm install-test (tarball url)
                    npm install-test (git:// url)
                    npm install-test (github username)/(github project)

                    Options:
                    [-S|--save|--no-save|--save-prod|--save-dev|--save-optional|--save-peer]
                    [-E|--save-exact]

                    alias: it

                    Run "npm help install-test" for more info

    link            npm link

                    Symlink a package folder

                    Usage:
                    npm link (in package dir)
                    npm link [(@scope)/](pkg)[@(version)]

                    alias: ln

                    Run "npm help link" for more info

    ll              npm ll

                    List installed packages

                    Usage:
                    npm ll [[(@scope)/](pkg) ...]

                    alias: la

                    Run "npm help ll" for more info

    login           npm adduser

                    Add a registry user account

                    Usage:
                    npm adduser

                    Options:
                    [--registry (registry)] [--scope (@scope)]

                    aliases: login, add-user

                    Run "npm help adduser" for more info

    logout          npm logout

                    Log out of the registry

                    Usage:
                    npm logout

                    Options:
                    [--registry (registry)] [--scope (@scope)]

                    Run "npm help logout" for more info

    ls              npm ls

                    List installed packages

                    Usage:
                    npm ls npm ls [[(@scope)/](pkg) ...]

                    alias: list

                    Run "npm help ls" for more info

    org             npm org

                    Manage orgs

                    Usage:
                    npm org set orgname username [developer | admin | owner]
                    npm org rm orgname username
                    npm org ls orgname [(username)]

                    alias: ogr

                    Run "npm help org" for more info

    outdated        npm outdated

                    Check for outdated packages

                    Usage:
                    npm outdated [[(@scope)/](pkg) ...]

                    Run "npm help outdated" for more info

    owner           npm owner

                    Manage package owners

                    Usage:
                    npm owner add (user) [(@scope)/](pkg)
                    npm owner rm (user) [(@scope)/](pkg)
                    npm owner ls [(@scope)/](pkg)

                    alias: author

                    Run "npm help owner" for more info

    pack            npm pack

                    Create a tarball from a package

                    Usage:
                    npm pack [[(@scope)/](pkg)...]

                    Options:
                    [--dry-run]
                    [-w|--workspace (workspace-name) [-w|--workspace (workspace-name) ...]]
                    [-ws|--workspaces]

                    Run "npm help pack" for more info

    ping            npm ping

                    Ping npm registry

                    Usage:
                    npm ping

                    Options:
                    [--registry (registry)]

                    Run "npm help ping" for more info

    prefix          npm prefix

                    Display prefix

                    Usage:
                    npm prefix [-g]

                    Run "npm help prefix" for more info

    profile         npm profile

                    Change settings on your registry profile

                    Usage:
                    npm profile enable-2fa [auth-only|auth-and-writes]
                    npm profile disable-2fa
                    npm profile get [(key)]
                    npm profile set (key) (value)

                    Run "npm help profile" for more info

    prune           npm prune

                    Remove extraneous packages

                    Usage:
                    npm prune [[(@scope)/](pkg)...]

                    Options:
                    [--production]

                    Run "npm help prune" for more info

    publish         npm publish

                    Publish a package

                    Usage:
                    npm publish [(folder)]

                    Options:
                    [--tag (tag)] [--access (restricted|public)] [--dry-run]

                    Run "npm help publish" for more info

    rebuild         npm rebuild

                    Rebuild a package

                    Usage:
                    npm rebuild [[(@scope)/](name)[@(version)] ...]

                    alias: rb

                    Run "npm help rebuild" for more info

    repo            npm repo

                    Open package repository page in the browser

                    Usage:
                    npm repo [(pkgname) [(pkgname) ...]]

                    Options:
                    [--browser|--browser (browser)]
                    [-w|--workspace (workspace-name) [-w|--workspace (workspace-name) ...]]
                    [-ws|--workspaces]

                    Run "npm help repo" for more info

    restart         npm restart

                    Restart a package

                    Usage:
                    npm restart [-- (args)]

                    Run "npm help restart" for more info

    root            npm root

                    Display npm root

                    Usage:
                    npm root

                    Options:
                    [-g|--global]

                    Run "npm help root" for more info

    run-script      npm run-script

                    Run arbitrary package scripts

                    Usage:
                    npm run-script (command) [-- (args)]

                    Options:
                    [-w|--workspace (workspace-name) [-w|--workspace (workspace-name) ...]]
                    [-ws|--workspaces]

                    aliases: run, rum, urn

                    Run "npm help run-script" for more info

    search          npm search

                    Search for pacakges

                    Usage:
                    npm search [search terms ...]

                    Options:
                    [-l|--long] [--json] [-p|--parseable] [--no-description]

                    aliases: s, se, find

                    Run "npm help search" for more info

    set             npm set

                    Set a value in the npm configuration

                    Usage:
                    npm set (key)=(value) [(key)=(value) ...] (See `npm config`)

                    Run "npm help set" for more info

    set-script      npm set-script

                    Set tasks in the scripts section of package.json

                    Usage:
                    npm set-script [(script)] [(command)]

                    Options:
                    [-w|--workspace (workspace-name) [-w|--workspace (workspace-name) ...]]
                    [-ws|--workspaces]

                    Run "npm help set-script" for more info

    shrinkwrap      npm shrinkwrap

                    Lock down dependency versions for publication

                    Usage:
                    npm shrinkwrap

                    Run "npm help shrinkwrap" for more info

    star            npm star

                    Mark your favorite packages

                    Usage:
                    npm star [(pkg)...]

                    Run "npm help star" for more info

    stars           npm stars

                    View packages marked as favorites

                    Usage:
                    npm stars [(user)]

                    Run "npm help stars" for more info

    start           npm start

                    Start a package

                    Usage:
                    npm start [-- (args)]

                    Run "npm help start" for more info

    stop            npm stop

                    Stop a package

                    Usage:
                    npm stop [-- (args)]

                    Run "npm help stop" for more info

    team            npm team

                    Manage organization teams and team memberships

                    Usage:
                    npm team create (scope:team) [--otp (otpcode)]
                    npm team destroy (scope:team) [--otp (otpcode)]
                    npm team add (scope:team) (user) [--otp (otpcode)]
                    npm team rm (scope:team) (user) [--otp (otpcode)]
                    npm team ls (scope)|(scope:team)

                    Run "npm help team" for more info

    test            npm test

                    Test a package

                    Usage:
                    npm test [-- (args)]

                    aliases: tst, t

                    Run "npm help test" for more info

    token           npm token

                    Manage your authentication tokens

                    Usage:
                    npm token list
                    npm token revoke (id|token)
                    npm token create [--read-only] [--cidr=list]

                    Run "npm help token" for more info

    uninstall       npm uninstall

                    Remove a package

                    Usage:
                    npm uninstall [(@scope)/](pkg)...

                    Options:
                    [-S|--save|--no-save|--save-prod|--save-dev|--save-optional|--save-peer]

                    aliases: un, unlink, remove, rm, r

                    Run "npm help uninstall" for more info

    unpublish       npm unpublish

                    Remove a package from the registry

                    Usage:
                    npm unpublish [(@scope)/](pkg)[@(version)]

                    Run "npm help unpublish" for more info

    unstar          npm unstar

                    Remove an item from your favorite packages

                    Usage:
                    npm unstar [(pkg)...]

                    Run "npm help unstar" for more info

    update          npm update

                    Update packages

                    Usage:
                    npm update [(pkg)...]

                    Options:
                    [-g|--global]

                    aliases: up, upgrade, udpate

                    Run "npm help update" for more info

    version         npm version

                    Bump a package version

                    Usage:
                    npm version [(newversion) | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]

                    Options:
                    [--allow-same-version] [--commit-hooks] [--git-tag-version] [--json]
                    [--preid prerelease-id] [--sign-git-tag]
                    [-w|--workspace (workspace-name) [-w|--workspace (workspace-name) ...]]
                    [-ws|--workspaces]

                    alias: verison

                    Run "npm help version" for more info

    view            npm view

                    View registry info

                    Usage:
                    npm view [(@scope)/](pkg)[@(version)] [(field)[.subfield]...]

                    Options:
                    [--json] [-w|--workspace (workspace-name) [-w|--workspace (workspace-name) ...]]
                    [-ws|--workspaces]

                    aliases: v, info, show

                    Run "npm help view" for more info

    whoami          npm whoami

                    Display npm username

                    Usage:
                    npm whoami

                    Options:
                    [--registry (registry)]

                    Run "npm help whoami" for more info

Specify configs in the ini-formatted file:
    C:\Users\13770\.npmrc
or on the command line via: npm (command) --key=value

More configuration info: npm help config
Configuration fields: npm help 7 config

npm@7.12.1 F:\JS_SoftWare\node.js\node_global\node_modules\npm
```



