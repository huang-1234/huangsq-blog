# tools
## 翻墙

主 [**google cloud**](https://cloud.google.com/)，备 [**rixcloud**](https://home.rixcloud.me/aff.php?aff=1432)、**阿里云香港**和**公司翻墙**。

- google cloud 免费，一年到期后可无限续，支持 netflix
- rixcloud 到期后可能不续了，有点贵，不过老牌服务商，比较稳定，支持 surge 客户端，当时买这个主要是为了看 netflix，后来 google cloud 支持 netflix 后就没必要再买他了
- 软件方面，Mac 下用 [**ShadowsocksX-NG-R**](https://github.com/qinyuhang/ShadowsocksX-NG-R/releases)，iPhone 下用 [**ShadowRocket**](https://itunes.apple.com/us/app/shadowrocket/id932747118?mt=8)（需切美区下载）
- 通过 [**Proxifier**](https://www.proxifier.com/) 实现命令行应用或其他应用翻墙，比如 iTerm2 下执行 npm publish 偶尔会被墙，并且实测下来比 `export http_proxy` 快
- 家里的路由器翻墙是用 [**RT-AC88U**](https://www.asus.com/us/Networking/RT-AC88U/) + **梅林小宝版固件**
- 电视上看 youtube 和 netflix 可以用 [**Nvidia Shield TV**](https://www.nvidia.com/en-us/shield/)，我买的美版，据说国版也可刷原生系统

## Mac 软件

### 编辑器和 Terminal

主 [**Intellij Idea**](https://www.jetbrains.com/idea/)，辅 [**VSCode**](https://code.visualstudio.com/) 和 **Vim**。选 Intellij Idea 的原因是无需安装插件就很好用，另外也是没有时间去折腾插件。

- 字体主 [**Dank Mono**](https://dank.sh/)，辅 [**Operator Mono**](http://www.typography.com/fonts/operator/overview/)，看厌了一个换另一个
- Intellij Idea 使用 [**material-theme-jetbrains**](https://github.com/ChrisRM/material-theme-jetbrains)，Theme 选 Material One Dark，字号 16 号，行距 1.2，[效果图](https://gw.alipayobjects.com/zos/rmsportal/JKRPNvvHhPgFonHHXvPe.png)
- Intellij Idea 插件额外装了 **File Watchers**、**GitLink**、**Import Cost**、**Prettier** 和 **Rainbow Brackets**
- Terminal 用 [**iTerm2**](https://www.iterm2.com/) + [**zsh**](https://en.wikipedia.org/wiki/Z_shell) + [**oh-my-zsh**](https://github.com/robbyrussell/oh-my-zsh) 的组合，主题是 [robbyrussell](https://github.com/robbyrussell/oh-my-zsh/blob/master/themes/robbyrussell.zsh-theme)
- zsh 的插件开了 git、autojump、brew、git、git-extra、git-flow、git-prompt、git-remote-branch、github、gitignore、history、history-substring-search、iterm2、node、npm、npx、nvm、tig、vscode、yarn
- iTerm2 里配 `Run command...` 为 `/usr/local/bin/idea \1` ([图](https://zos.alipayobjects.com/rmsportal/RmWdxKRQUWFMoVDjerNQ.png))，这样 Command + 点击文件路径，就会在 Intellij Idea 里打开

### 开发辅助

- [**SourceTree**](https://www.sourcetreeapp.com/)，git 辅助，由于 git 高级操作命令记不住，就只用借助 UI 了
- [**Paw**](https://paw.cloud/)，请求模拟，前后端联调时我会用这个先走一遍
- [**Github Desktop**](https://github.com/desktop/desktop)，管理 github 仓库的变更和 PR，代替了 SourceTree 的部分工作，可以方便地把别人的 PR checkout 到本地验证
- [**Gas Mask**](https://github.com/2ndalpha/gasmask) ，Hosts 管理
- [**ColorSnapper2**](https://colorsnapper.com/)，取色工具
- [**Charles**](https://www.charlesproxy.com/)，抓包用，支持 https
- [**Google Chrome**](https://www.google.com/chrome/) + [**Google Chrome Canary**](https://www.google.com/chrome/canary/) + [**Firefox**](https://www.mozilla.org/en-US/firefox/new/) + **Safari**，浏览器，调试用，IE 的测试会借助内网的云测平台

### 输出

- [**Notion**](https://www.notion.so/?r=d5a0d43dd99f446cb27477785ede47f9)，笔记工具，准备逐渐从 Bear 迁到 Notion
- [**Bear**](http://www.bear-writer.com/)，笔记工具，颜值高，订阅了 Pro，和手机同步
- [**Typora**](https://typora.io/)，可以基于目录编辑 Markdown，所以 github 仓库的文档都会用他编辑
- [**OmniGraffle**](https://www.omnigroup.com/omnigraffle) + [**iThoughtsX**](https://www.toketaware.com/ithoughts-osx)，画流程图
- [**LICEcap**](http://www.cockos.com/licecap/) ，GIF 录屏工具

### 输入

- [**Reeder**](http://reederapp.com/mac/)，RSS 阅读软件，我的主要信息来源，没有提供 rss 源的我会先在 [**rsshub.app**](https://docs.rsshub.app/) 上找，再没有就自己写一个 serverless 服务部署在 now@2 上
- [**Kiwi for Gmail**](http://kiwiforgmail.com/)，Gmail 客户端

### 效率

- [**Alfred**](https://www.alfredapp.com/) + [**Powerpack**](https://www.alfredapp.com/powerpack/)，应用启动、粘贴板管理、Workflow、Snippets 管理等
- [**Thor**](https://github.com/gbammc/Thor)，一键直达应用
- [**OmniFocus**](https://www.omnigroup.com/omnifocus) ，任务管理，通过 Omni Sync Server 和 iPhone 同步
- [**Karabiner Element**](https://pqrs.org/osx/karabiner/)，用于[把右 Command 和 Capslock 键利用起来](http://lucifr.com/2013/02/16/caps-lock-to-hyper-key/)，避免快捷键冲突，[简单 note](https://hackmd.io/s/rk4u9i-pG)，详见[《我的快捷键技巧》](https://www.bilibili.com/video/av44127555)

### vlog 相关

- [**ScreenFlow**](http://www.telestream.net/screenflow/overview.htm)，视频录制和剪辑
- [**Final Cut Pro**](https://www.apple.com/final-cut-pro/)，视频剪辑
- [**RDM**](https://github.com/avibrazil/RDM)，分辨率切换，允许设置未支持的分辨率，比如我会在录屏时设置 720p(hd) 的分辨率
- [**KeyCastr**](https://github.com/keycastr/keycastr)，按键显示

### 其他

- [**CleanMyMac 3**](https://macpaw.com/cleanmymac)，系统清理
- [**1Password**](https://1password.com/)，密码管理
- [**Bartender 3**](https://www.macbartender.com/)，管理系统右上菜单项，隐藏或收起不常用的
- [**KeepingYouAwake**](https://github.com/newmarcel/KeepingYouAwake)，可保证系统不自动休眠
- [**Softorino YouTube Converter**](https://softorino.com/youtube-converter)，YouTube 视频下载
- [**Downie 3**](http://software.charliemonroe.net/downie.php)，通用视频下载
- [**Folx 5**](https://mac.eltima.com/download-manager.html) + [**qBittorrent**](https://www.qbittorrent.org/) + [**Motrix**](https://motrix.app/)，下载工具，Folx 下 http，qBittorrent 下 magnet，Motrix 是 aria2 的封装，可以[下百度云盘、115 等](https://www.yuque.com/moapp/help/extensions)
- [**f.lux**](https://justgetflux.com)，调节显示器色温，护眼，尤其是早上起来屏幕实在是刺眼
- [**IINA**](https://github.com/iina/iina)，视频播放
- [**snipaste**](https://www.snipaste.com/)，截图工具，需要标注的时候用
- [**Get Plain Text**](https://zipzapmac.com/GetPlainText)，自动清除粘贴板内容的格式
- [**RunCat**](https://itunes.apple.com/nz/app/runcat/id1429033973?mt=12&ref=appinn) - 菜单栏显示奔跑的小猫，CPU 占用率越高跑地越快
- [**钉钉**](https://tms.dingtalk.com/markets/dingtalk/download) + [**QQ**](https://im.qq.com/macqq/) + [**微信**](https://mac.weixin.qq.com/) + [**Telegram**](https://macos.telegram.org/) + [**Slack**](https://slack.com/downloads/mac)，通讯交流

### 命令行

#### 通过 [homebrew](https://brew.sh/) 安装

- [**autojump**](https://github.com/wting/autojump)，目录跳转
- [**the_silver_searcher**](https://github.com/ggreer/the_silver_searcher)，文件搜索，命令行是 ag
- [**hub**](https://hub.github.com/) - git 扩展
- [**tig**](https://github.com/jonas/tig) - git 扩展
- [**bat**](https://github.com/sharkdp/bat)，带行号的 cat，可以配 `alias cat="bat"`
- [**fd**](https://github.com/sharkdp/fd)，比系统自带的 find 友好

#### 通过 `yarn global add` 安装

- [**projj**](https://github.com/popomore/projj)，github/gitlab 项目管理
- [**serve**](https://github.com/zeit/serve)，本地静态服务器
- [**fkill**](https://github.com/sindresorhus/fkill)，比 kill 好用的进程 killer
- [**qrcode-terminal**](https://github.com/gtanner/qrcode-terminal)，二维码生成

### Chrome 插件

#### Github 相关

- [**OctoLinker**](https://github.com/OctoLinker/browser-extension)，根据 require/import 或 package.json 中的 dependencies 进行快速跳转
- [**Refined Github**](https://github.com/sindresorhus/refined-github)，Github 改进
- [**npmhub**](https://github.com/npmhub/npmhub)，在 README 下方显示 npm 依赖信息
- [**Hide Files on GitHub**](https://github.com/sindresorhus/hide-files-on-github)，隐藏配置文件等非必要文件
- [**Github Hovercard**](https://github.com/Justineo/github-hovercard)，比如不用点进去就能看到 issue 详情
- [**Git History Browser Extension**](https://chrome.google.com/webstore/detail/git-history-browser-exten/laghnmifffncfonaoffcndocllegejnf)，可视化的方式显示文件修改历史
- [**File Icon for GitHub, GitLab and Bitbucket**](https://chrome.google.com/webstore/detail/file-icon-for-github-gitl/ficfmibkjjnpogdcfhfokmihanoldbfe)，更好看的文件 icon

#### 其他

- [**Workona**](https://workona.com/)，tab 管理，基于使用场景
- [**JSON Formatter**](https://github.com/callumlocke/json-formatter)，让 JSON 更易读
- [**Better History**](https://chrome.google.com/webstore/detail/chrome-better-history/aadbaagbanfijdnflkhepgjmhlpppbad?hl=en)，搜索历史记录用
- [**Tampermonkey**](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)，油猴，通过脚本定制网页

- [**uBlock Origin**](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm)，广告 Block
- [**Netflix Rating**](https://chrome.google.com/webstore/detail/imdb-ratings-for-netflix/dnbpnlalaijjbogmjbpdkdcohoibjcmp/related?hl=en)，在 netflix 上显示每个影片的 IMDB 的评分信息
- [**Select like a boss**](https://chrome.google.com/webstore/detail/select-like-a-boss/mnbiiidkialopoakajjpeghipbpljffi/related?hl=en)，可以选择链接里的内容

## iPhone 软件

### 每天用

- **支付宝**
- **微信**
- **Chrome**，代替 Safari，好处是可以和电脑同步
- **Gmail**
- **Reeder**，我是 RSS 重度用户
- **钉钉**，工作交流
- **Shadowrocket**，你懂的，需切换美区安装
- **Twitter**，感觉官方客户端够用了
- **Workflow**，最常用的一个 workflow 是 clipboard to instapaper，用于把微信文章经由 instapaper 保存到 github issue
- **网易云音乐**
- **OmniFocus**，任务管理

更多 https://github.com/sorrycc/ama/issues/12

## 在线服务

#### 免费

- [**refiddle**](http://refiddle.com/) + [**regex101**](https://regex101.com/)，调正则表达式
- [**30 seconds of code**](https://30secondsofcode.org/)，代码片段
- [**astexplorer**](https://astexplorer.net/)，调 ast
- [**globtester**](http://www.globtester.com/)，调 glob
- [**ghub.io**](http://ghub.io/)，redirect to an npm package's repository page
- [**unpkg**](https://unpkg.com/)，npm 包的 cdn 服务，可以查看 npm 包发布后的内容
- [**sketchboard**](https://sketchboard.me/) + [**draw.io**](https://www.draw.io/) + [**MindMeister**](https://www.mindmeister.com/)，在线画流程图
- [**HackMD**](https://hackmd.io/recent)，在线笔记，有 PPT 展示功能
- [**Slides**](https://slides.com/)，PPT 制作
- [**CodeSandbox**](https://codesandbox.io/) + [**glitch**](https://glitch.com/) + [**repl.it**](https://repl.it/)，在线代码编辑，前者支持 sandbox container，可以跑 npm scripts
- [**node.green**](https://node.green/)，查询 NodeJS 的 ES2018 特性支持情况
- [**Can I use**](https://caniuse.com/)，查询浏览器的特性支持情况
- [**carbon**](https://carbon.now.sh/)，根据源码生成图片
- [**Tell me when it closes**](https://tellmewhenitcloses.com)，github issue 关闭时发送邮件通知
- [**Package Diff**](https://diff.intrinsic.com/)，比较 npm 包两个版本直接的区别
- [**Firefox Send**](https://send.firefox.com/) + [**ffsend**](https://github.com/timvisee/ffsend)，文件分享服务
- （beta）[**Webpack config tool**](https://webpack.jakoblind.no/)，webpack 配置工具

#### 付费

- [**Oreilly Safari Books**](https://www.safaribooksonline.com/)，Oreilly 图书、视频教程、newsletter 等，看地比较少，到期了不准备续费了
- [**Frontend Masters**](https://frontendmasters.com/)，视频教程
- [**Zeit Now**](https://zeit.co/now)，serverless 服务，域名等
- [**name.com**](https://www.name.com/)，域名服务，之后会转到 Zeit Now 上
- [**少数派 Power+ 2.0**](https://sspai.com/series/70)，提效相关文章
- [**网易云音乐**](https://music.163.com/)
- **百度云盘** + **115 网盘** + [**麦果网盘中转**](https://www.maiguopan.com/)，资料下载
- **爱奇艺** + **腾讯视频** + **优酷**，会员去广告
- [**Netflix**](https://www.netflix.com)
- [**Youtube Premium**](https://www.youtube.com/)，主要为了 iPhone 上切换应用或锁屏后能继续播放

## 硬件

#### 电脑

- **MacBook Pro 15-inch, Mid 2015**，公司配的，256 G 不太够用，自己买了个 [**SDCZ43 128G U 盘**](https://www.sandisk.co.uk/home/usb-flash/ultra-fit-usb) 一直插着做扩展
- [**神舟战神 Z7-KP7S1**](https://detail.tmall.com/item.htm?id=543437409299&skuId=3434337259021)，可以玩一些要求不太高的 PC 游戏

#### 电脑配件

显示器、键盘、鼠标都 x2，保证公司和家里的体验一致。

- [**U28E590D**](https://detail.tmall.com/item.htm?id=523282229383)x2，三星显示器，应该是 4K 中最便宜的了
- (**HHKB Pro 2 无刻** + [彩色键帽](https://item.taobao.com/item.htm?id=522721338431&_u=41h6urte838))x2
- [**Razer DeathAdder Chroma**](http://www.razerzone.com/store/razer-deathadder-chroma)x2

#### 家庭网络

- J1900 软路由 + UBNT 交换机 + （UBNT AP & [**华硕 RT-AC88U**](https://item.jd.com/2104499.html)）

#### 手机

- [**iPhone13**](https://www.apple.com/iphone-13/)

#### 耳机

- [**Bose QC30**](https://www.bose.com/en_us/products/headphones/earphones/quietcontrol-30.html)，公司环境有点吵，降噪耳机必备

#### 相机

- [**FUJIFILM X100T**](https://www.fujifilmusa.com/products/digital_cameras/x/fujifilm_x100t/)
- [**GoPro Hero7 Black**](https://zh.shop.gopro.com/China/cameras/hero7-black/CHDHX-701-master.html)

