(window.webpackJsonp=window.webpackJsonp||[]).push([[305],{808:function(t,e,a){"use strict";a.r(e);var n=a(6),s=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"git-基础"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-基础"}},[t._v("#")]),t._v(" git 基础")]),t._v(" "),a("h3",{attrs:{id:"查看已暂存和未暂存的修改"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看已暂存和未暂存的修改"}},[t._v("#")]),t._v(" 查看已暂存和未暂存的修改")]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("git diff")])])]),t._v(" "),a("p",[t._v("如果 "),a("code",[t._v("git status")]),t._v(" 命令的输出对于你来说过于模糊，你想知道具体修改了什么地方，可以用 "),a("code",[t._v("git diff")]),t._v(" 命令。 稍后我们会详细介绍 "),a("code",[t._v("git diff")]),t._v("，你可能通常会用它来回答这两个问题：当前做的哪些更新还没有暂存？ 有哪些更新已经暂存起来准备好了下次提交？ 尽管 "),a("code",[t._v("git status")]),t._v(" 已经通过在相应栏下列出文件名的方式回答了这个问题，"),a("code",[t._v("git diff")]),t._v(" 将通过文件补丁的格式显示具体哪些行发生了改变。")]),t._v(" "),a("p",[t._v("假如再次修改 README 文件后暂存，然后编辑 "),a("code",[t._v("CONTRIBUTING.md")]),t._v(" 文件后先不暂存， 运行 "),a("code",[t._v("status")]),t._v(" 命令将会看到：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('$ git status\nOn branch master\nChanges to be committed:\n  (use "git reset HEAD <file>..." to unstage)\n\n    modified:   README\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git checkout -- <file>..." to discard changes in working directory)\n\n    modified:   CONTRIBUTING.md\n')])])]),a("p",[t._v("要查看尚未暂存的文件更新了哪些部分，不加参数直接输入 "),a("code",[t._v("git diff")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git diff\ndiff --git a/CONTRIBUTING.md b/CONTRIBUTING.md\nindex 8ebb991..643e24f 100644\n--- a/CONTRIBUTING.md\n+++ b/CONTRIBUTING.md\n@@ -65,7 +65,8 @@ branch directly, things can get messy.\n Please include a nice description of your changes when you submit your PR;\n if we have to read the whole diff to figure out why you're contributing\n in the first place, you're less likely to get feedback and have your change\n-merged in.\n+merged in. Also, split your changes into comprehensive chunks if your patch is\n+longer than a dozen lines.\n\n If you are starting to work on a particular area, feel free to submit a PR\n that highlights your work in progress (and note in the PR title that it's\n")])])]),a("p",[t._v("此命令比较的是工作目录中当前文件和暂存区域快照之间的差异， 也就是修改之后还没有暂存起来的变化内容。")]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("git diff --staged")])])]),t._v(" "),a("p",[t._v("若要查看已暂存的将要添加到下次提交里的内容，可以用 "),a("code",[t._v("git diff --cached")]),t._v(" 命令。（Git 1.6.1 及更高版本还允许使用 "),a("code",[t._v("git diff --staged")]),t._v("，效果是相同的，但更好记些。）")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git diff --staged\ndiff --git a/README b/README\nnew file mode 100644\nindex 0000000..03902a1\n--- /dev/null\n+++ b/README\n@@ -0,0 +1 @@\n+My Project\n")])])]),a("p",[t._v("请注意，git diff 本身只显示尚未暂存的改动，而不是自上次提交以来所做的所有改动。 所以有时候你一下子暂存了所有更新过的文件后，运行 "),a("code",[t._v("git diff")]),t._v(" 后却什么也没有，就是这个原因。")]),t._v(" "),a("h4",{attrs:{id:"跳过使用暂存区域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#跳过使用暂存区域"}},[t._v("#")]),t._v(" 跳过使用暂存区域")]),t._v(" "),a("p",[t._v("尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。 Git 提供了一个跳过使用暂存区域的方式， 只要在提交的时候，给 "),a("code",[t._v("git commit")]),t._v(" 加上 "),a("code",[t._v("-a")]),t._v(" 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 "),a("code",[t._v("git add")]),t._v(" 步骤：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('$ git status\nOn branch master\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git checkout -- <file>..." to discard changes in working directory)\n\n    modified:   CONTRIBUTING.md\n\nno changes added to commit (use "git add" and/or "git commit -a")\n$ git commit -a -m \'added new benchmarks\'\n[master 83e38c7] added new benchmarks\n 1 file changed, 5 insertions(+), 0 deletions(-)\n')])])]),a("p",[t._v("看到了吗？提交之前不再需要 "),a("code",[t._v("git add")]),t._v(" 文件“CONTRIBUTING.md”了。")]),t._v(" "),a("h4",{attrs:{id:"移除文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#移除文件"}},[t._v("#")]),t._v(" 移除文件")]),t._v(" "),a("p",[t._v("要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。 可以用 "),a("code",[t._v("git rm")]),t._v(" 命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。")]),t._v(" "),a("p",[t._v("如果只是简单地从工作目录中手工删除文件，运行 "),a("code",[t._v("git status")]),t._v(" 时就会在 “Changes not staged for commit” 部分（也就是 "),a("em",[t._v("未暂存清单")]),t._v("）看到：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('$ rm PROJECTS.md\n$ git status\nOn branch master\nYour branch is up-to-date with \'origin/master\'.\nChanges not staged for commit:\n  (use "git add/rm <file>..." to update what will be committed)\n  (use "git checkout -- <file>..." to discard changes in working directory)\n\n        deleted:    PROJECTS.md\n\nno changes added to commit (use "git add" and/or "git commit -a")\n')])])]),a("p",[t._v("然后再运行 "),a("code",[t._v("git rm")]),t._v(" 记录此次移除文件的操作：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git rm PROJECTS.md\nrm 'PROJECTS.md'\n$ git status\nOn branch master\nChanges to be committed:\n  (use \"git reset HEAD <file>...\" to unstage)\n\n    deleted:    PROJECTS.md\n")])])]),a("p",[t._v("下一次提交时，该文件就不再纳入版本管理了。 如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 "),a("code",[t._v("-f")]),t._v("（译注：即 force 的首字母）。 这是一种安全特性，用于防止误删还没有添加到快照的数据，这样的数据不能被 Git 恢复。")]),t._v(" "),a("p",[t._v("另外一种情况是，我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。 换句话说，你想让文件保留在磁盘，但是并不想让 Git 继续跟踪。 当你忘记添加 "),a("code",[t._v(".gitignore")]),t._v(" 文件，不小心把一个很大的日志文件或一堆 "),a("code",[t._v(".a")]),t._v(" 这样的编译生成文件添加到暂存区时，这一做法尤其有用。 为达到这一目的，使用 "),a("code",[t._v("--cached")]),t._v(" 选项：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git rm --cached README\n")])])]),a("p",[a("code",[t._v("git rm")]),t._v(" 命令后面可以列出文件或者目录的名字，也可以使用 "),a("code",[t._v("glob")]),t._v(" 模式。 比方说：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git rm log/\\*.log\n")])])]),a("p",[t._v("注意到星号 "),a("code",[t._v("*")]),t._v(" 之前的反斜杠 "),a("code",[t._v("\\")]),t._v("， 因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开。 此命令删除 "),a("code",[t._v("log/")]),t._v(" 目录下扩展名为 "),a("code",[t._v(".log")]),t._v(" 的所有文件。 类似的比如：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git rm \\*~\n")])])]),a("p",[t._v("该命令为删除以 "),a("code",[t._v("~")]),t._v(" 结尾的所有文件。")]),t._v(" "),a("h4",{attrs:{id:"移动文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#移动文件"}},[t._v("#")]),t._v(" 移动文件")]),t._v(" "),a("p",[t._v("不像其它的 VCS 系统，Git 并不显式跟踪文件移动操作。 如果在 Git 中重命名了某个文件，仓库中存储的元数据并不会体现出这是一次改名操作。 不过 Git 非常聪明，它会推断出究竟发生了什么，至于具体是如何做到的，我们稍后再谈。")]),t._v(" "),a("p",[t._v("既然如此，当你看到 Git 的 "),a("code",[t._v("mv")]),t._v(" 命令时一定会困惑不已。 要在 Git 中对文件改名，可以这么做：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git mv file_from file_to\n")])])]),a("p",[t._v("它会恰如预期般正常工作。 实际上，即便此时查看状态信息，也会明白无误地看到关于重命名操作的说明：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('$ git mv README.md README\n$ git status\nOn branch master\nChanges to be committed:\n  (use "git reset HEAD <file>..." to unstage)\n\n    renamed:    README.md -> README\n')])])]),a("p",[t._v("其实，运行 "),a("code",[t._v("git mv")]),t._v(" 就相当于运行了下面三条命令：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ mv README.md README\n$ git rm README.md\n$ git add README\n")])])]),a("p",[t._v("如此分开操作，Git 也会意识到这是一次改名，所以不管何种方式结果都一样。 两者唯一的区别是，"),a("code",[t._v("mv")]),t._v(" 是一条命令而另一种方式需要三条命令，直接用 "),a("code",[t._v("git mv")]),t._v(" 轻便得多。 不过有时候用其他工具批处理改名的话，要记得在提交前删除老的文件名，再添加新的文件名。")]),t._v(" "),a("h3",{attrs:{id:"查看提交历史"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看提交历史"}},[t._v("#")]),t._v(" 查看提交历史")]),t._v(" "),a("p",[t._v("在提交了若干更新，又或者克隆了某个项目之后，你也许想回顾下提交历史。 完成这个任务最简单而又有效的工具是 "),a("code",[t._v("git log")]),t._v(" 命令。")]),t._v(" "),a("p",[t._v("接下来的例子会用我专门用于演示的 simplegit 项目， 运行下面的命令获取该项目源代码：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("git clone https://github.com/schacon/simplegit-progit\n")])])]),a("p",[t._v("然后在此项目中运行 git log，应该会看到下面的输出：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git log\ncommit ca82a6dff817ec66f44342007202690a93763949\nAuthor: Scott Chacon <schacon@gee-mail.com>\nDate:   Mon Mar 17 21:52:11 2008 -0700\n\n    changed the version number\n\ncommit 085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7\nAuthor: Scott Chacon <schacon@gee-mail.com>\nDate:   Sat Mar 15 16:40:33 2008 -0700\n\n    removed unnecessary test\n\ncommit a11bef06a3f659402fe7563abf99ad00de2209e6\nAuthor: Scott Chacon <schacon@gee-mail.com>\nDate:   Sat Mar 15 10:31:28 2008 -0700\n\n    first commit\n")])])]),a("p",[t._v("默认不用任何参数的话，"),a("code",[t._v("git log")]),t._v(" 会按提交时间列出所有的更新，最近的更新排在最上面。 正如你所看到的，这个命令会列出每个提交的 SHA-1 校验和、作者的名字和电子邮件地址、提交时间以及提交说明。")]),t._v(" "),a("p",[a("code",[t._v("git log")]),t._v(" 有许多选项可以帮助你搜寻你所要找的提交， 接下来我们介绍些最常用的。")]),t._v(" "),a("p",[t._v("一个常用的选项是 "),a("code",[t._v("-p")]),t._v("，用来显示每次提交的内容差异。 你也可以加上 "),a("code",[t._v("-2")]),t._v(" 来仅显示最近两次提交：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('$ git log -p -2\ncommit ca82a6dff817ec66f44342007202690a93763949\nAuthor: Scott Chacon <schacon@gee-mail.com>\nDate:   Mon Mar 17 21:52:11 2008 -0700\n\n    changed the version number\n\ndiff --git a/Rakefile b/Rakefile\nindex a874b73..8f94139 100644\n--- a/Rakefile\n+++ b/Rakefile\n@@ -5,7 +5,7 @@ require \'rake/gempackagetask\'\n spec = Gem::Specification.new do |s|\n     s.platform  =   Gem::Platform::RUBY\n     s.name      =   "simplegit"\n-    s.version   =   "0.1.0"\n+    s.version   =   "0.1.1"\n     s.author    =   "Scott Chacon"\n     s.email     =   "schacon@gee-mail.com"\n     s.summary   =   "A simple gem for using Git in Ruby code."\n\ncommit 085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7\nAuthor: Scott Chacon <schacon@gee-mail.com>\nDate:   Sat Mar 15 16:40:33 2008 -0700\n\n    removed unnecessary test\n\ndiff --git a/lib/simplegit.rb b/lib/simplegit.rb\nindex a0a60ae..47c6340 100644\n--- a/lib/simplegit.rb\n+++ b/lib/simplegit.rb\n@@ -18,8 +18,3 @@ class SimpleGit\n     end\n\n end\n-\n-if $0 == __FILE__\n-  git = SimpleGit.new\n-  puts git.show\n-end\n\\ No newline at end of file\n')])])]),a("p",[t._v("该选项除了显示基本信息之外，还附带了每次 commit 的变化。 当进行代码审查，或者快速浏览某个搭档提交的 commit 所带来的变化的时候，这个参数就非常有用了。 你也可以为 "),a("code",[t._v("git log")]),t._v(" 附带一系列的总结性选项。 比如说，如果你想看到每次提交的简略的统计信息，你可以使用 "),a("code",[t._v("--stat")]),t._v(" 选项：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git log --stat\ncommit ca82a6dff817ec66f44342007202690a93763949\nAuthor: Scott Chacon <schacon@gee-mail.com>\nDate:   Mon Mar 17 21:52:11 2008 -0700\n\n    changed the version number\n\n Rakefile | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)\n\ncommit 085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7\nAuthor: Scott Chacon <schacon@gee-mail.com>\nDate:   Sat Mar 15 16:40:33 2008 -0700\n\n    removed unnecessary test\n\n lib/simplegit.rb | 5 -----\n 1 file changed, 5 deletions(-)\n\ncommit a11bef06a3f659402fe7563abf99ad00de2209e6\nAuthor: Scott Chacon <schacon@gee-mail.com>\nDate:   Sat Mar 15 10:31:28 2008 -0700\n\n    first commit\n\n README           |  6 ++++++\n Rakefile         | 23 +++++++++++++++++++++++\n lib/simplegit.rb | 25 +++++++++++++++++++++++++\n 3 files changed, 54 insertions(+)\n")])])]),a("p",[t._v("正如你所看到的，"),a("code",[t._v("--stat")]),t._v(" 选项在每次提交的下面列出额所有被修改过的文件、有多少文件被修改了以及被修改过的文件的哪些行被移除或是添加了。 在每次提交的最后还有一个总结。")]),t._v(" "),a("p",[t._v("另外一个常用的选项是 "),a("code",[t._v("--pretty")]),t._v("。 这个选项可以指定使用不同于默认格式的方式展示提交历史。 这个选项有一些内建的子选项供你使用。 比如用 "),a("code",[t._v("oneline")]),t._v(" 将每个提交放在一行显示，查看的提交数很大时非常有用。 另外还有 "),a("code",[t._v("short")]),t._v("，"),a("code",[t._v("full")]),t._v(" 和 "),a("code",[t._v("fuller")]),t._v(" 可以用，展示的信息或多或少有些不同，请自己动手实践一下看看效果如何。")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git log --pretty=oneline\nca82a6dff817ec66f44342007202690a93763949 changed the version number\n085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7 removed unnecessary test\na11bef06a3f659402fe7563abf99ad00de2209e6 first commit\n")])])]),a("p",[t._v("但最有意思的是 format，可以定制要显示的记录格式。 这样的输出对后期提取分析格外有用 — 因为你知道输出的格式不会随着 Git 的更新而发生改变：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('$ git log --pretty=format:"%h - %an, %ar : %s"\nca82a6d - Scott Chacon, 6 years ago : changed the version number\n085bb3b - Scott Chacon, 6 years ago : removed unnecessary test\na11bef0 - Scott Chacon, 6 years ago : first commit\n')])])]),a("p",[a("a",{attrs:{href:"https://www.progit.cn/#pretty_format",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("git log --pretty=format")]),t._v(" 常用的选项"),a("OutboundLink")],1),t._v(" 列出了常用的格式占位符写法及其代表的意义。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("选项")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%H")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("提交对象（commit）的完整哈希字串")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%h")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("提交对象的简短哈希字串")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%T")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("树对象（tree）的完整哈希字串")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%t")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("树对象的简短哈希字串")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%P")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("父对象（parent）的完整哈希字串")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%p")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("父对象的简短哈希字串")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%an")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("作者（author）的名字")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%ae")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("作者的电子邮件地址")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%ad")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("作者修订日期（可以用 --date= 选项定制格式）")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%ar")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("作者修订日期，按多久以前的方式显示")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%cn")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("提交者（committer）的名字")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%ce")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("提交者的电子邮件地址")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%cd")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("提交日期")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%cr")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("提交日期，按多久以前的方式显示")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("%s")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("提交说明")])])])]),t._v(" "),a("p",[t._v("你一定奇怪 "),a("em",[t._v("作者")]),t._v(" 和 "),a("em",[t._v("提交者")]),t._v(" 之间究竟有何差别， 其实作者指的是实际作出修改的人，提交者指的是最后将此工作成果提交到仓库的人。 所以，当你为某个项目发布补丁，然后某个核心成员将你的补丁并入项目时，你就是作者，而那个核心成员就是提交者。 我们会在 "),a("a",{attrs:{href:"https://www.progit.cn/#_distributed_git",target:"_blank",rel:"noopener noreferrer"}},[t._v("分布式 Git"),a("OutboundLink")],1),t._v(" 再详细介绍两者之间的细微差别。")]),t._v(" "),a("h3",{attrs:{id:"撤消操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#撤消操作"}},[t._v("#")]),t._v(" 撤消操作")]),t._v(" "),a("p",[t._v("在任何一个阶段，你都有可能想要撤消某些操作。 这里，我们将会学习几个撤消你所做修改的基本工具。 注意，有些撤消操作是不可逆的。 这是在使用 Git 的过程中，会因为操作失误而导致之前的工作丢失的少有的几个地方之一。")]),t._v(" "),a("p",[t._v("有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 "),a("code",[t._v("--amend")]),t._v(" 选项的提交命令尝试重新提交：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git commit --amend\n")])])]),a("p",[t._v("这个命令会将暂存区中的文件提交。 如果自上次提交以来你还未做任何修改（例如，在上次提交后马上执行了此命令），那么快照会保持不变，而你所修改的只是提交信息。")]),t._v(" "),a("p",[t._v("文本编辑器启动后，可以看到之前的提交信息。 编辑后保存会覆盖原来的提交信息。")]),t._v(" "),a("p",[t._v("例如，你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git commit -m 'initial commit'\n$ git add forgotten_file\n$ git commit --amend\n")])])]),a("p",[t._v("最终你只会有一个提交 - 第二次提交将代替第一次提交的结果。")]),t._v(" "),a("h4",{attrs:{id:"取消暂存的文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#取消暂存的文件"}},[t._v("#")]),t._v(" 取消暂存的文件")]),t._v(" "),a("p",[t._v("接下来的两个小节演示如何操作暂存区域与工作目录中已修改的文件。 这些命令在修改文件状态的同时，也会提示如何撤消操作。 例如，你已经修改了两个文件并且想要将它们作为两次独立的修改提交，但是却意外地输入了 "),a("code",[t._v("git add *")]),t._v(" 暂存了它们两个。 如何只取消暂存两个中的一个呢？ "),a("code",[t._v("git status")]),t._v(" 命令提示了你：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('$ git add *\n$ git status\nOn branch master\nChanges to be committed:\n  (use "git reset HEAD <file>..." to unstage)\n\n    renamed:    README.md -> README\n    modified:   CONTRIBUTING.md\n')])])]),a("p",[t._v("在 “Changes to be committed” 文字正下方，提示使用 "),a("code",[t._v("git reset HEAD <file>...")]),t._v(" 来取消暂存。 所以，我们可以这样来取消暂存 "),a("code",[t._v("CONTRIBUTING.md")]),t._v(" 文件：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('$ git reset HEAD CONTRIBUTING.md\nUnstaged changes after reset:\nM\tCONTRIBUTING.md\n$ git status\nOn branch master\nChanges to be committed:\n  (use "git reset HEAD <file>..." to unstage)\n\n    renamed:    README.md -> README\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git checkout -- <file>..." to discard changes in working directory)\n\n    modified:   CONTRIBUTING.md\n')])])]),a("p",[t._v("这个命令有点儿奇怪，但是起作用了。 "),a("code",[t._v("CONTRIBUTING.md")]),t._v(" 文件已经是修改未暂存的状态了。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("NOTE")]),t._v(" "),a("th",[t._v("虽然在调用时加上 "),a("code",[t._v("--hard")]),t._v(" 选项"),a("strong",[t._v("可以")]),t._v("令 "),a("code",[t._v("git reset")]),t._v(" 成为一个危险的命令（译注：可能导致工作目录中所有当前进度丢失！），但本例中工作目录内的文件并不会被修改。 不加选项地调用 "),a("code",[t._v("git reset")]),t._v(" 并不危险 — 它只会修改暂存区域。")])])]),t._v(" "),a("tbody",[a("tr",[a("td"),t._v(" "),a("td")])])]),t._v(" "),a("p",[t._v("到目前为止这个神奇的调用就是你需要对 "),a("code",[t._v("git reset")]),t._v(" 命令了解的全部。我们将会在 "),a("a",{attrs:{href:"https://www.progit.cn/#_git_reset",target:"_blank",rel:"noopener noreferrer"}},[t._v("重置揭密"),a("OutboundLink")],1),t._v(" 中了解 "),a("code",[t._v("reset")]),t._v(" 的更多细节以及如何掌握它做一些真正有趣的事。")]),t._v(" "),a("h4",{attrs:{id:"撤消对文件的修改"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#撤消对文件的修改"}},[t._v("#")]),t._v(" 撤消对文件的修改")]),t._v(" "),a("p",[t._v("如果你并不想保留对 "),a("code",[t._v("CONTRIBUTING.md")]),t._v(" 文件的修改怎么办？ 你该如何方便地撤消修改 - 将它还原成上次提交时的样子（或者刚克隆完的样子，或者刚把它放入工作目录时的样子）？ 幸运的是，"),a("code",[t._v("git status")]),t._v(" 也告诉了你应该如何做。 在最后一个例子中，未暂存区域是这样：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('Changes not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git checkout -- <file>..." to discard changes in working directory)\n\n    modified:   CONTRIBUTING.md\n')])])]),a("p",[t._v("它非常清楚地告诉了你如何撤消之前所做的修改。 让我们来按照提示执行：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('$ git checkout -- CONTRIBUTING.md\n$ git status\nOn branch master\nChanges to be committed:\n  (use "git reset HEAD <file>..." to unstage)\n\n    renamed:    README.md -> README\n')])])]),a("p",[t._v("可以看到那些修改已经被撤消了。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("IMPORTANT")]),t._v(" "),a("th",[t._v("你需要知道 "),a("code",[t._v("git checkout -- [file]")]),t._v(" 是一个危险的命令，这很重要。 你对那个文件做的任何修改都会消失 - 你只是拷贝了另一个文件来覆盖它。 除非你确实清楚不想要那个文件了，否则不要使用这个命令。")])])]),t._v(" "),a("tbody",[a("tr",[a("td"),t._v(" "),a("td")])])]),t._v(" "),a("p",[t._v("如果你仍然想保留对那个文件做出的修改，但是现在仍然需要撤消，我们将会在 "),a("a",{attrs:{href:"https://www.progit.cn/#_git_branching",target:"_blank",rel:"noopener noreferrer"}},[t._v("Git 分支"),a("OutboundLink")],1),t._v(" 介绍保存进度与分支；这些通常是更好的做法。")]),t._v(" "),a("p",[t._v("记住，在 Git 中任何 "),a("em",[t._v("已提交的")]),t._v(" 东西几乎总是可以恢复的。 甚至那些被删除的分支中的提交或使用 "),a("code",[t._v("--amend")]),t._v(" 选项覆盖的提交也可以恢复（阅读 "),a("a",{attrs:{href:"https://www.progit.cn/#_data_recovery",target:"_blank",rel:"noopener noreferrer"}},[t._v("数据恢复"),a("OutboundLink")],1),t._v(" 了解数据恢复）。 然而，任何你未提交的东西丢失后很可能再也找不到了。")]),t._v(" "),a("h3",{attrs:{id:"查看远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看远程仓库"}},[t._v("#")]),t._v(" 查看远程仓库")]),t._v(" "),a("p",[t._v("如果想查看你已经配置的远程仓库服务器，可以运行 "),a("code",[t._v("git remote")]),t._v(" 命令。 它会列出你指定的每一个远程服务器的简写。 如果你已经克隆了自己的仓库，那么至少应该能看到 origin - 这是 Git 给你克隆的仓库服务器的默认名字：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git clone https://github.com/schacon/ticgit\nCloning into 'ticgit'...\nremote: Reusing existing pack: 1857, done.\nremote: Total 1857 (delta 0), reused 0 (delta 0)\nReceiving objects: 100% (1857/1857), 374.35 KiB | 268.00 KiB/s, done.\nResolving deltas: 100% (772/772), done.\nChecking connectivity... done.\n$ cd ticgit\n$ git remote\norigin\n")])])]),a("p",[t._v("你也可以指定选项 "),a("code",[t._v("-v")]),t._v("，会显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL。")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git remote -v\norigin\thttps://github.com/schacon/ticgit (fetch)\norigin\thttps://github.com/schacon/ticgit (push)\n")])])]),a("p",[t._v("如果你的远程仓库不止一个，该命令会将它们全部列出。 例如，与几个协作者合作的，拥有多个远程仓库的仓库看起来像下面这样：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ cd grit\n$ git remote -v\nbakkdoor  https://github.com/bakkdoor/grit (fetch)\nbakkdoor  https://github.com/bakkdoor/grit (push)\ncho45     https://github.com/cho45/grit (fetch)\ncho45     https://github.com/cho45/grit (push)\ndefunkt   https://github.com/defunkt/grit (fetch)\ndefunkt   https://github.com/defunkt/grit (push)\nkoke      git://github.com/koke/grit.git (fetch)\nkoke      git://github.com/koke/grit.git (push)\norigin    git@github.com:mojombo/grit.git (fetch)\norigin    git@github.com:mojombo/grit.git (push)\n")])])]),a("p",[t._v("这样我们可以轻松拉取其中任何一个用户的贡献。 此外，我们大概还会有某些远程仓库的推送权限，虽然我们目前还不会在此介绍。")]),t._v(" "),a("p",[t._v("注意这些远程仓库使用了不同的协议；我们将会在 "),a("a",{attrs:{href:"https://www.progit.cn/#_git_on_the_server",target:"_blank",rel:"noopener noreferrer"}},[t._v("在服务器上搭建 Git"),a("OutboundLink")],1),t._v(" 中了解关于它们的更多信息。")]),t._v(" "),a("h3",{attrs:{id:"添加远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#添加远程仓库"}},[t._v("#")]),t._v(" 添加远程仓库")]),t._v(" "),a("p",[t._v("我在之前的章节中已经提到并展示了如何添加远程仓库的示例，不过这里将告诉你如何明确地做到这一点。 运行 "),a("code",[t._v("git remote add <shortname> <url>")]),t._v(" 添加一个新的远程 Git 仓库，同时指定一个你可以轻松引用的简写：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git remote\norigin\n$ git remote add pb https://github.com/paulboone/ticgit\n$ git remote -v\norigin\thttps://github.com/schacon/ticgit (fetch)\norigin\thttps://github.com/schacon/ticgit (push)\npb\thttps://github.com/paulboone/ticgit (fetch)\npb\thttps://github.com/paulboone/ticgit (push)\n")])])]),a("p",[t._v("现在你可以在命令行中使用字符串 "),a("code",[t._v("pb")]),t._v(" 来代替整个 URL。 例如，如果你想拉取 Paul 的仓库中有但你没有的信息，可以运行 "),a("code",[t._v("git fetch pb")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git fetch pb\nremote: Counting objects: 43, done.\nremote: Compressing objects: 100% (36/36), done.\nremote: Total 43 (delta 10), reused 31 (delta 5)\nUnpacking objects: 100% (43/43), done.\nFrom https://github.com/paulboone/ticgit\n * [new branch]      master     -> pb/master\n * [new branch]      ticgit     -> pb/ticgit\n")])])]),a("p",[t._v("现在 Paul 的 master 分支可以在本地通过 "),a("code",[t._v("pb/master")]),t._v(" 访问到 - 你可以将它合并到自己的某个分支中，或者如果你想要查看它的话，可以检出一个指向该点的本地分支。 （我们将会在 "),a("a",{attrs:{href:"https://www.progit.cn/#_git_branching",target:"_blank",rel:"noopener noreferrer"}},[t._v("Git 分支"),a("OutboundLink")],1),t._v(" 中详细介绍什么是分支以及如何使用分支。）")]),t._v(" "),a("h4",{attrs:{id:"从远程仓库中抓取与拉取"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#从远程仓库中抓取与拉取"}},[t._v("#")]),t._v(" 从远程仓库中抓取与拉取")]),t._v(" "),a("p",[t._v("就如刚才所见，从远程仓库中获得数据，可以执行：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git fetch [remote-name]\n")])])]),a("p",[t._v("这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。")]),t._v(" "),a("p",[t._v("如果你使用 "),a("code",[t._v("clone")]),t._v(" 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。 所以，"),a("code",[t._v("git fetch origin")]),t._v(" 会抓取克隆（或上一次抓取）后新推送的所有工作。 必须注意 "),a("code",[t._v("git fetch")]),t._v(" 命令会将数据拉取到你的本地仓库 - 它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。")]),t._v(" "),a("p",[t._v("如果你有一个分支设置为跟踪一个远程分支（阅读下一节与 "),a("a",{attrs:{href:"https://www.progit.cn/#_git_branching",target:"_blank",rel:"noopener noreferrer"}},[t._v("Git 分支"),a("OutboundLink")],1),t._v(" 了解更多信息），可以使用 "),a("code",[t._v("git pull")]),t._v(" 命令来自动的抓取然后合并远程分支到当前分支。 这对你来说可能是一个更简单或更舒服的工作流程；默认情况下，"),a("code",[t._v("git clone")]),t._v(" 命令会自动设置本地 master 分支跟踪克隆的远程仓库的 master 分支（或不管是什么名字的默认分支）。 运行 "),a("code",[t._v("git pull")]),t._v(" 通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。")]),t._v(" "),a("h3",{attrs:{id:"推送到远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#推送到远程仓库"}},[t._v("#")]),t._v(" 推送到远程仓库")]),t._v(" "),a("p",[t._v("当你想分享你的项目时，必须将其推送到上游。 这个命令很简单："),a("code",[t._v("git push [remote-name] [branch-name]")]),t._v("。 当你想要将 master 分支推送到 "),a("code",[t._v("origin")]),t._v(" 服务器时（再次说明，克隆时通常会自动帮你设置好那两个名字），那么运行这个命令就可以将你所做的备份到服务器：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git push origin master\n")])])]),a("p",[t._v("只有当你有所克隆服务器的写入权限，并且之前没有人推送过时，这条命令才能生效。 当你和其他人在同一时间克隆，他们先推送到上游然后你再推送到上游，你的推送就会毫无疑问地被拒绝。 你必须先将他们的工作拉取下来并将其合并进你的工作后才能推送。 阅读 "),a("a",{attrs:{href:"https://www.progit.cn/#_git_branching",target:"_blank",rel:"noopener noreferrer"}},[t._v("Git 分支"),a("OutboundLink")],1),t._v(" 了解如何推送到远程仓库服务器的详细信息。")]),t._v(" "),a("h4",{attrs:{id:"查看远程仓库-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看远程仓库-2"}},[t._v("#")]),t._v(" 查看远程仓库")]),t._v(" "),a("p",[t._v("如果想要查看某一个远程仓库的更多信息，可以使用 "),a("code",[t._v("git remote show [remote-name]")]),t._v(" 命令。 如果想以一个特定的缩写名运行这个命令，例如 "),a("code",[t._v("origin")]),t._v("，会得到像下面类似的信息：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git remote show origin\n* remote origin\n  Fetch URL: https://github.com/schacon/ticgit\n  Push  URL: https://github.com/schacon/ticgit\n  HEAD branch: master\n  Remote branches:\n    master                               tracked\n    dev-branch                           tracked\n  Local branch configured for 'git pull':\n    master merges with remote master\n  Local ref configured for 'git push':\n    master pushes to master (up to date)\n")])])]),a("p",[t._v("它同样会列出远程仓库的 URL 与跟踪分支的信息。 这些信息非常有用，它告诉你正处于 master 分支，并且如果运行 git pull，就会抓取所有的远程引用，然后将远程 master 分支合并到本地 master 分支。 它也会列出拉取到的所有远程引用。")]),t._v(" "),a("p",[t._v("这是一个经常遇到的简单例子。 如果你是 Git 的重度使用者，那么还可以通过 "),a("code",[t._v("git remote show")]),t._v(" 看到更多的信息。")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git remote show origin\n* remote origin\n  URL: https://github.com/my-org/complex-project\n  Fetch URL: https://github.com/my-org/complex-project\n  Push  URL: https://github.com/my-org/complex-project\n  HEAD branch: master\n  Remote branches:\n    master                           tracked\n    dev-branch                       tracked\n    markdown-strip                   tracked\n    issue-43                         new (next fetch will store in remotes/origin)\n    issue-45                         new (next fetch will store in remotes/origin)\n    refs/remotes/origin/issue-11     stale (use 'git remote prune' to remove)\n  Local branches configured for 'git pull':\n    dev-branch merges with remote dev-branch\n    master     merges with remote master\n  Local refs configured for 'git push':\n    dev-branch                     pushes to dev-branch                     (up to date)\n    markdown-strip                 pushes to markdown-strip                 (up to date)\n    master                         pushes to master                         (up to date)\n")])])]),a("p",[t._v("这个命令列出了当你在特定的分支上执行 "),a("code",[t._v("git push")]),t._v(" 会自动地推送到哪一个远程分支。 它也同样地列出了哪些远程分支不在你的本地，哪些远程分支已经从服务器上移除了，还有当你执行 "),a("code",[t._v("git pull")]),t._v(" 时哪些分支会自动合并。")]),t._v(" "),a("h3",{attrs:{id:"远程仓库的移除与重命名"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#远程仓库的移除与重命名"}},[t._v("#")]),t._v(" 远程仓库的移除与重命名")]),t._v(" "),a("p",[t._v("如果想要重命名引用的名字可以运行 "),a("code",[t._v("git remote rename")]),t._v(" 去修改一个远程仓库的简写名。 例如，想要将 "),a("code",[t._v("pb")]),t._v(" 重命名为 "),a("code",[t._v("paul")]),t._v("，可以用 "),a("code",[t._v("git remote rename")]),t._v(" 这样做：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git remote rename pb paul\n$ git remote\norigin\npaul\n")])])]),a("p",[t._v("值得注意的是这同样也会修改你的远程分支名字。 那些过去引用 "),a("code",[t._v("pb/master")]),t._v(" 的现在会引用 "),a("code",[t._v("paul/master")]),t._v("。")]),t._v(" "),a("p",[t._v("如果因为一些原因想要移除一个远程仓库 - 你已经从服务器上搬走了或不再想使用某一个特定的镜像了，又或者某一个贡献者不再贡献了 - 可以使用 "),a("code",[t._v("git remote rm")]),t._v(" ：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git remote rm paul\n$ git remote\norigin\n")])])]),a("h3",{attrs:{id:"git-别名"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-别名"}},[t._v("#")]),t._v(" Git 别名")]),t._v(" "),a("p",[t._v("在我们结束本章 Git 基础之前，正好有一个小技巧可以使你的 Git 体验更简单、容易、熟悉：别名。 我们不会在之后的章节中引用到或假定你使用过它们，但是你大概应该知道如何使用它们。")]),t._v(" "),a("p",[t._v("Git 并不会在你输入部分命令时自动推断出你想要的命令。 如果不想每次都输入完整的 Git 命令，可以通过 "),a("code",[t._v("git config")]),t._v(" 文件来轻松地为每一个命令设置一个别名。 这里有一些例子你可以试试：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git config --global alias.co checkout\n$ git config --global alias.br branch\n$ git config --global alias.ci commit\n$ git config --global alias.st status\n")])])]),a("p",[t._v("这意味着，当要输入 "),a("code",[t._v("git commit")]),t._v(" 时，只需要输入 "),a("code",[t._v("git ci")]),t._v("。 随着你继续不断地使用 Git，可能也会经常使用其他命令，所以创建别名时不要犹豫。")]),t._v(" "),a("p",[t._v("在创建你认为应该存在的命令时这个技术会很有用。 例如，为了解决取消暂存文件的易用性问题，可以向 Git 中添加你自己的取消暂存别名：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git config --global alias.unstage 'reset HEAD --'\n")])])]),a("p",[t._v("这会使下面的两个命令等价：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git unstage fileA\n$ git reset HEAD -- fileA\n")])])]),a("p",[t._v("这样看起来更清楚一些。 通常也会添加一个 "),a("code",[t._v("last")]),t._v(" 命令，像这样：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git config --global alias.last 'log -1 HEAD'\n")])])]),a("p",[t._v("这样，可以轻松地看到最后一次提交：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git last\ncommit 66938dae3329c7aebe598c2246a8e6af90d04646\nAuthor: Josh Goebel <dreamer3@example.com>\nDate:   Tue Aug 26 19:48:51 2008 +0800\n\n    test for current head\n\n    Signed-off-by: Scott Chacon <schacon@example.com>\n")])])]),a("p",[t._v("可以看出，Git 只是简单地将别名替换为对应的命令。 然而，你可能想要执行外部命令，而不是一个 Git 子命令。 如果是那样的话，可以在命令前面加入 "),a("code",[t._v("!")]),t._v(" 符号。 如果你自己要写一些与 Git 仓库协作的工具的话，那会很有用。 我们现在演示将 "),a("code",[t._v("git visual")]),t._v(" 定义为 "),a("code",[t._v("gitk")]),t._v(" 的别名：")]),t._v(" "),a("div",{staticClass:"language-console extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ git config --global alias.visual '!gitk'\n")])])])])}),[],!1,null,null,null);e.default=s.exports}}]);