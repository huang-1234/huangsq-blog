## 规范你的 git commit

**简介：** commit message应该如何写才更清晰明了？团队开发中有没有遇到过让人头疼的git commit？本文分享在git commit规范建设上的实践，规定了commit message的格式，并通过webhook在提交时进行监控，避免不规范的代码提交。

### 背景

Git每次提交代码都需要写commit message，否则就不允许提交。一般来说，commit message应该清晰明了，说明本次提交的目的，具体做了什么操作……但是在日常开发中，大家的commit message千奇百怪，中英文混合使用、fix bug等各种笼统的message司空见怪，这就导致后续代码维护成本特别大，有时自己都不知道自己的fix bug修改的是什么问题。基于以上这些问题，我们希望通过某种方式来监控用户的git commit message，让规范更好的服务于质量，提高大家的研发效率。

### 规范建设

#### 规范梳理

初期我们在互联网上搜索了大量有关git commit规范的资料，但只有Angular规范是目前使用最广的写法，比较合理和系统化，并且有配套的工具（IDEA就有插件支持这种写法）。最后综合阿里巴巴高德地图相关部门已有的规范总结出了一套git commit规范。

**commit message格式**

```xml
<type>(<scope>): <subject>
```

**type(必须)**

用于说明git commit的类别，只允许使用下面的标识。

feat：新功能（feature）。

fix/to：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。

- fix：产生diff并自动修复此问题。适合于一次提交直接修复问题
- to：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用fix

docs：文档（documentation）。

style：格式（不影响代码运行的变动）。

refactor：重构（即不是新增功能，也不是修改bug的代码变动）。

perf：优化相关，比如提升性能、体验。

test：增加测试。

chore：构建过程或辅助工具的变动。

revert：回滚到上一个版本。

merge：代码合并。

sync：同步主线或分支的Bug。

**scope(可选)**

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

例如在Angular，可以是location，browser，compile，compile，rootScope， ngHref，ngClick，ngView等。如果你的修改影响了不止一个scope，你可以使用*代替。

**subject(必须)**

subject是commit目的的简短描述，不超过50个字符。

建议使用中文（感觉中国人用中文描述问题能更清楚一些）。

- 结尾不加句号或其他标点符号。
- 根据以上规范git commit message将是如下的格式：

```stylus
fix(DAO):用户查询缺少username属性 
feat(Controller):用户查询接口开发
```

以上就是我们梳理的git commit规范，那么我们这样规范git commit到底有哪些好处呢？

- 便于程序员对提交历史进行追溯，了解发生了什么情况。
- 一旦约束了commit message，意味着我们将慎重的进行每一次提交，不能再一股脑的把各种各样的改动都放在一个git commit里面，这样一来整个代码改动的历史也将更加清晰。
- 格式化的commit message才可以用于自动化输出Change log。

#### 监控服务

通常提出一个规范之后，为了大家更好的执行规范，就需要进行一系列的拉通，比如分享给大家这种规范的优点、能带来什么收益等，在大家都认同的情况下最好有一些强制性的措施。当然git commit规范也一样，前期我们分享完规范之后考虑从源头进行强制拦截，只要大家提交代码的commit message不符合规范，直接不能提交。但由于代码仓库操作权限的问题，我们最终选择了使用webhook通过发送警告的形式进行监控，督促大家按照规范执行代码提交。除了监控git commit message的规范外，我们还加入了大代码量提交监控和删除文件监控，减少研发的代码误操作。

**整体流程**

- 服务注册：服务注册主要完成代码库相关信息的添加。
- 重复校验：防止merge request再走一遍验证流程。
- 消息告警：对不符合规范以及大代码量提交、删除文件等操作发送告警消息。
- DB：存项目信息和git commit信息便于后续统计commit message规范率。

webhook是作用于代码库上的，用户提交git commit，push到仓库的时候就会触发webhook，webhook从用户的commit信息里面获取到commit message，校验其是否满足git commit规范，如果不满足就发送告警消息；如果满足规范，调用gitlab API获取提交的diff信息，验证提交代码量，验证是否有重命名文件和删除文件操作，如果存在以上操作还会发送告警消息，最后把所有记录都入库保存。

# Git Commit 规范
## 一、背景
Git 规范 
## 二、Git Commit 规范内容
2.1 Commit 原子性
为了更好的跟踪提交历史以及回溯，要确保 commit 的“原子性”，每个 commit 要以适当的粒度包含且仅包“单项”改动，避免过多的临时 commit；提交代码时应该让每个commit都更具有意义，而不是散乱随意的commit。
判断原则参考：commit 粒度尽量小，且只提交该单个 commit 时功能能正常运行。

正例：
一个需求（或一个完整的功能）一个 commit，或者一个阶段性代码一个 commit。 
一项优化一个 commit。
一个 issue 修复一个 commit。 
反例：
一个需求（优化或者 Bugfix）进行了多次临时且无意义的 commit。
两个或多个不相关的 Bugfix，没有分开进行 commit。
将一天的无关联的工作都集中到一个 commit。
Squash Commits
基于 commit 原子性原则，应避免将过于零散的 commit 提交合并到主干分支。对于需求或者功能的 commit，尤其是在协作开发时，如果 commit 过于临时或零散，应整合成一个 commit 再提交到主干，确保主干历史简洁有用。 
```js
const a = 23;
```

squash commits 能有效减少rebase方式合并时的冲突，能简化解决冲突的过程；频繁临时的commit导致多个无意义提交，容易引起他人困惑。
注意：已经合并到主干的 commit，不能进行 squash，改变主干（协作）分支历史会导致其他人无法正常同步。
Squash Commits 方法参考
1. 优先本地处理，使用 git rebase -i/--interactive。
squash commits 实现的核心是 git rebase，-i/--interactive 选项提供交互式的 rebase。使用方法参考：
https://github.com/wprig/wprig/wiki/How-to-squash-commits
https://www.internalpointers.com/post/squash-commits-into-one-git
2. 使用 squash / fixup 来合并 commit 
3. 其次，可考虑用 Gitlab squash 选项：

Tips to stash your work
1. 如果你的工作经常被打断，导致出现许多临时的 commit，那么你可能需要善用 git stash 技巧。

2.2 Commit Message 格式规范
规范参考 https://www.conventionalcommits.org/en/v1.0.0/（由 Angular Commit 规范衍化而来），并结合直播中台客户端特点进行演变。
Message 整体格式
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
整体格式说明：
1. Commit message 都包括三个部分：Header，Body 和 Footer。
2. 其中，Header 是必需的，Body 和 Footer 可以省略。
3. Header，Body 和 Footer 之前用空行分隔。
4. 每一行内容长度都不能超过100个字符。
# header: <type>(<scope>): <subject>，100-character line
# - type: feat, fix, docs, style, refactor, test, chore
# - scope: can be empty (eg. if the change is a global or difficult to assign to a single component)
# - subject: start with verb (such as 'change')
#
# body: 100-character wrapped. This should answer:
# * Why was this change necessary?
# * How does it address the problem?
# * Are there any side effects?
#
# footer: reserved field
# - BREAKING CHANGE: description
# - Closes #123, #245, #992
Header（必需）
Header 部分只有一行，包括三个字段：type（必需）、scope（可选）和 subject（必需）。

type（必需） 
type 用来说明 commit 的类别，只允许使用下面的标识：
feat: A new feature

fix: A bug fix（code、UI）

docs: Documentation only changes

perf: A code change that improves performance

refactor: A code change that neither fixes a bug nor adds a feature

style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

test: Adding missing tests or correcting existing tests

build: Changes that affect the build system or external dependencies

ci: Changes to our CI configuration files and scripts

chore: Other changes that don't modify src or test files

revert: Reverts a previous commit. If the commit reverts a previous commit, it should begin with revert: , followed by the header of the reverted commit. In the body it should say: This reverts commit <hash>., where the hash is the SHA of the commit being reverted.
Changelog 配置参考：如果 type 为 feat 和 fix ，则该 commit 信息将肯定出现在 change log 之中。其他情况（docs、chore、style、refactor、test）再定，建议是不要。

scope（可选） 
scope 用于说明 commit 影响的范围，比如影响哪个模块或者功能等。推荐按功能描述。

直播客户端 scope 参考：
功能模块角度：
- 开播
  - 视频开播
  - 录屏开播
    - 悬浮窗
  - PC开播
- 直播间
  - PK
  - 连麦
  - 公屏
  - 弹幕
  - 短效触达
  - 礼物
  - 礼物托盘

技术模块角度：
Android：


iOS：



subject（必需） 
subject 是关于 commit 信息的简短描述。
1. 以动词开头，使用第一人称现在时，比如change，而不是changed或changes。
2. 第一个字母小写（英文）。
3. 结尾不加句号（.）。
4. 如果是针对某单一宿主的改动，要在这里描述清楚。

Body（可选）
Body 部分是针对本次 commit 的详细描述，内容较长时，要进行合理的换行，要表达清楚变动的动机以及与之前行为的对比。好的提交信息要回答下面的内容：
1. 为什么要提交这次修改？
2. 怎么解决的问题？
3. 可能影响哪些内容？

【推荐】：如果在 Body 需要附上相关连接（如 PRD、技术优化文档），以 ref: 为前缀，如 ref: url。

Footer（可选）（保留字段，暂不启用）
Footer 部分只用于描述不兼容的变动和关闭 Issue。
BREAKING CHANGE: 不兼容的变动
Closes：关闭 Issue

根据目前直播中台客户端情况，Footer暂不启用。

Samples
feature:
feat: 完成xx红包功能

VCD 项目，目前只有xx有红包功能。
ref：PRD-url
bugfix:
fix(liveredpacket-impl): 修复抖火红包xxxx问题

fix: 修复滑动直播间快捷礼物消失的问题
refactor：
refactor(礼物)：重构礼物模块

完成礼物模块组件化，xxxxxx。
ref: 礼物组件化文档

Tips to change commit message
如果你想修改本地不符合规范的 commit message，可以有多种方式供你选择：
1. git commit --amend：修改最后一次 commit。
2. git rebase -i HEAD~N：利用 rebase 修改最近的N次 commit。
3. git reset --soft <commit hash>：利用 reset --soft 恢复修改到暂存区，然后重新进行 commit，可以修改最近多次的 commit。

使用方法参考：
https://help.github.com/en/github/committing-changes-to-your-project/changing-a-commit-message
https://linuxize.com/post/change-git-commit-message/
https://gist.github.com/nepsilon/156387acf9e1e72d48fa35c4fabef0b4

注意：不要修改已合并到主干的 commit，改变主干（协作）分支历史会导致其他人无法正常同步。

2.3 Commit Message 英文化规范要求 by @Patrick （待定）
随着国际化的发展，需要与海外的团队交流合作，git提交信息需要全用英文完成。
根据上一节 Message整体格式，目前Header是必选的，包括三个字段：type（必需）、scope（可选）和 subject（必需），前两者参考前面定义，subject 是提交的简要信息描述，也是锻练大家英文的地方，这里再详细说明一下：
1. 以动词开头，使用第一人称现在时，比如change，而不是changed或changes。
2. 第一个字母小写（英文）。
3. 结尾不加句号（.）。

2.4 Commit Message Template
header: <type>(<scope>): <subject>，100-character line
# - type: feat, fix, docs, style, refactor, test, chore
# - scope: can be empty (eg. if the change is a global or difficult to assign to a single component)
# - subject: start with verb (such as 'change')
#
# body: 100-character wrapped. This should answer:
# * Why was this change necessary?
# * How does it address the problem?
# * Are there any side effects?
#
# footer: reserved field
# BREAKING CHANGE: description
# Closes #123, #245, #992


## 三、commitlint 与 commitizen 使用教程

为了更方便的编写符合规范的 message，工程将会安装 commitizen 工具。使用方法请参考commitlint 与 commitizen 使用教程
