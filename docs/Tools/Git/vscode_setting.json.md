

## 我的vscode_setting.json配置

```json
{
  "window.zoomLevel": 0,
  "[html]": {

    "editor.tabSize": 2,
    "editor.formatOnType": true,
    "editor.formatOnSave": false,
    "editor.defaultFormatter": "vscode.html-language-features",
    "editor.foldingStrategy": "indentation"
  },
  // 在DOM标签上写东西
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
    },//
  "workbench.sideBar.location": "left",
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "python.autoComplete.addBrackets": true,
  "editor.cursorSmoothCaretAnimation": true,
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  "code-runner.runInTerminal": true,
  "code-runner.clearPreviousOutput": true,
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "python.jediEnabled": false,
  "sync.gist": "80889bd6124775e46c77b94be37ff5a7",
  "kite.showWelcomeNotificationOnStartup": false,
  "[javascript]": {
    "editor.tabSize": 2,
    "editor.formatOnType": true,
    "editor.formatOnSave": false,
    "editor.defaultFormatter": "vscode.typescript-language-features",
  },
  "python.languageServer": "Microsoft",
  "files.autoSave": "afterDelay",
  "editor.fontSize": 11,
  "editor.cursorStyle": "line-thin",
  "editor.detectIndentation": false,
  "[yaml]": {
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "editor.autoIndent": "advanced"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.format.enable": true,
  //autoFix默认开启，只需输入字符串数组即可
  "eslint.validate": [
    "javascript",
    "vue",
    "html"
  ],

  "eslint.codeActionsOnSave.mode": "problems",
  "workbench.editorAssociations": [
    
    {
      "viewType": "",
      "filenamePattern": ""
    },
    {
      "viewType": "jupyter.notebook.ipynb",
      "filenamePattern": "*.ipynb"
    }
  ],
  "files.autoSaveDelay": 10,
  "emmet.triggerExpansionOnTab": true,
  "indentRainbow.includedLanguages": [
  
  ],
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "wxml": "html"
  },
  "[jsonc]": {
  "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "[css]": {
    "editor.tabSize": 2,
    "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
  },
  "liveServer.settings.donotShowInfoMsg": true,
  "search.followSymlinks": false,
  "git.autorefresh": false,
  "gitlens.advanced.messages": {
    "suppressGitDisabledWarning": true
  },
  "editor.formatOnPaste": true,
  "editor.formatOnType": true,
  "json.maxItemsComputed": 1000,
  "[less]": {

    "editor.suggest.insertMode": "replace",
    "gitlens.codeLens.scopes": [
      "document"
    ],
    "editor.defaultFormatter": "Wscats.eno"
  },
  "less.compile": {

    // "out": "./"
  },
  "[typescript]": {
    "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
  },
  "autoimport.useSemiColon": false,
  "javascript.format.insertSpaceAfterSemicolonInForStatements": false,
  "typescript.format.insertSpaceAfterSemicolonInForStatements": false,
  "C_Cpp.vcFormat.space.insertAfterSemicolon": true,
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "editor.acceptSuggestionOnCommitCharacter": false,
  "git.ignoreLegacyWarning": true,
  "editor.tokenColorCustomizations": {
        "comments": "#486648"
    },
    "emmet.excludeLanguages": [
    
      "markdown"
    ],
    "path-intellisense.mappings": {
      "@": "${workspaceRoot}/src"
    },
    "workbench.iconTheme": "vscode-icons",
    "files.associations": {
      "*.cjson": "jsonc",
      // "*.wxss": "css",
      "*.wxs": "javascript",
      "*.less": "less"
    },
    "minapp-vscode.disableAutoConfig": true,
    "editor.fontWeight": 500,
    "explorer.confirmDelete": false,
    "[scss]": {
      "editor.defaultFormatter": "Wscats.eno"
    },
    "[typescriptreact]": {
      "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
    },
    "iceworks.materialSources": [],
    "iceworks.workspace": "g:\\Study\\Code\\Web\\rax\\raxfirst",
    "terminal.integrated.allowMnemonics": true,
    "terminal.integrated.automationShell.osx": "",
    "C_Cpp.updateChannel": "Insiders",
    "workbench.colorTheme": "Visual Studio Dark",
    "html-css-class-completion.enableEmmetSupport": true,
    "html.format.endWithNewline": true,
    "html.format.indentInnerHtml": true,
    "html.format.templating": true,
    "editor.linkedEditing": true,
    "markdown-preview-enhanced.HTML5EmbedIsAllowedHttp": true,
    "C_Cpp.vcFormat.newLine.closeBraceSameLine.emptyFunction": true,
    "C_Cpp.autocompleteAddParentheses": true,
    "C_Cpp.vcFormat.space.betweenEmptyParameterListParentheses": true,
    "C_Cpp.clang_format_style": "{ BasedOnStyle: Chromium, IndentWidth: 2}",
    "[cpp]": {
      "editor.defaultFormatter": "ms-vscode.cpptools"
    },
    "html.format.extraLiners": "head, body, /html",
    "terminal.integrated.tabs.enabled": true,
    "typescript.updateImportsOnFileMove.enabled": "always",
    "terminal.integrated.fontSize": 12,
    "terminal.integrated.automationShell.windows": "F:\\JS_SoftWare\\Git\\Git\\bin\\bash.exe",
}
```

## 将shell改为bash

可能Windows开发的一个缺点就是与shell结合的不好，Git Bash提供了一种方式可以在Windows下执行Linux命令，如何将其结合在VSCode中使用呢？

参考回答：https://stackoverflow.com/questions/42606837/how-to-use-bash-on-windows-from-visual-studio-code-integrated-terminal

两种方式：1. 将Git bash目录比如C:\Program Files (x86)\Git\bin\bash.exe添加到环境变量中，就可以VSCode终端输入bash进入Bash模式了， 同理，输入cmd即可返回默认Cmd模式。
2. 如果想默认设置Bash模式，可以编辑用户设置文件，添加"terminal.integrated.shell.windows": "C:\\Program Files (x86)\\Git\\bin\\bash.exe"

