# vscode 的 setting config

```json
{
  // 控制已更新文件的自动保存。可在[此处](https://code.visualstudio.com/docs/editor/codebasics#_save-auto-save)阅读有关自动保存的详细信息。
  //  - off: 永不自动保存更新后的文件。
  //  - afterDelay: 当文件修改后的时间超过 `files.autoSaveDelay` 中配置的值时自动进行保存。
  //  - onFocusChange: 编辑器失去焦点时自动保存更新后的文件。
  //  - onWindowChange: 窗口失去焦点时自动保存更新后的文件。
  "files.autoSave": "off",

}
,
{


  // 控制在差异编辑器中是否把前导空格或尾随空格的改动显示为差异。
  "diffEditor.ignoreTrimWhitespace": true,

  // 控制差异编辑器是否为添加/删除的更改显示 +/- 指示符号。
  "diffEditor.renderIndicators": true,

  // 控制差异编辑器的显示方式是并排还是内联。
  "diffEditor.renderSideBySide": true,

  // 控制是否应在遇到提交字符时接受建议。例如，在 JavaScript 中，半角分号 (`;`) 可以为提交字符，能够在接受建议的同时键入该字符。
  "editor.acceptSuggestionOnCommitCharacter": true,

  // 控制除了 `Tab` 键以外， `Enter` 键是否同样可以接受建议。这能减少“插入新行”和“接受建议”命令之间的歧义。
  //  - on
  //  - smart: 仅当建议包含文本改动时才可使用 `Enter` 键进行接受。
  //  - off
  "editor.acceptSuggestionOnEnter": "on",

  // 控制编辑器是否应运行在对屏幕阅读器进行优化的模式。
  //  - auto: 编辑器将使用平台 API 以检测是否附加了屏幕阅读器。
  //  - on: 编辑器将对屏幕阅读器的使用进行永久优化。
  //  - off: 编辑器将不再对屏幕阅读器的使用进行优化。
  "editor.accessibilitySupport": "auto",

  // 控制编辑器是否在左括号后自动插入右括号。
  //  - always
  //  - languageDefined: 使用语言配置确定何时自动闭合括号。
  //  - beforeWhitespace: 仅当光标位于空白字符左侧时，才自动闭合括号。
  //  - never
  "editor.autoClosingBrackets": "languageDefined",

  // 控制编辑器是否在左括引号后自动插入右引号。
  //  - always
  //  - languageDefined: 使用语言配置确定何时自动闭合引号。
  //  - beforeWhitespace: 仅当光标位于空白字符左侧时，才自动闭合引号。
  //  - never
  "editor.autoClosingQuotes": "languageDefined",

  // 控制编辑器是否在用户键入、粘贴或移动行时自动调整缩进。必须安装包含此语言缩进规则的扩展。
  "editor.autoIndent": true,

  // 控制编辑器是否应自动包住所选内容。
  //  - languageDefined: 使用语言配置确定何时自动包住所选内容。
  //  - brackets: 使用括号而非引号来包住所选内容。
  //  - quotes: 使用引号而非括号来包住所选内容。
  //  - never
  "editor.autoSurround": "languageDefined",

  // 在保存时运行的代码操作类型。
  "editor.codeActionsOnSave": {},

  // 控制在保存文件时进行的代码操作的超时时间 (毫秒)。
  "editor.codeActionsOnSaveTimeout": 750,

  // 控制是否在编辑器中显示 CodeLens
  "editor.codeLens": true,

  // 控制编辑器是否显示内联颜色修饰器和颜色选取器。
  "editor.colorDecorators": true,

  // 控制在复制时是否同时复制语法高亮。
  "editor.copyWithSyntaxHighlighting": true,

  // 控制光标的动画样式。
  "editor.cursorBlinking": "blink",

  // 控制是否启用平滑插入动画。
  "editor.cursorSmoothCaretAnimation": false,

  // 控制光标样式。
  "editor.cursorStyle": "line",

  // 当 `editor.cursorStyle` 设置为 `line` 时，控制光标的宽度。
  "editor.cursorWidth": 0,

  // 控制是否在打开文件时，基于文件内容自动检测 `editor.tabSize#` 和 `#editor.insertSpaces`。
  "editor.detectIndentation": true,

  // 控制在编辑器中是否允许通过拖放来移动选中内容。
  "editor.dragAndDrop": true,

  // 控制在没有选择内容时进行复制是否复制当前行。
  "editor.emptySelectionClipboard": true,

  // 在执行查找操作时，在编辑器中的选中文本中还是整个文件中进行查找。
  "editor.find.autoFindInSelection": false,

  // 控制是否将编辑器选中内容作为搜索词填入到查找小组件中。
  "editor.find.seedSearchStringFromSelection": true,

  // 控制编辑器是否启用代码折叠功能
  "editor.folding": true,

  // 控制计算折叠范围的策略。`auto` 将使用语言特定的折叠策略 (若可用)。`indentation` 将使用基于缩进的折叠策略。
  "editor.foldingStrategy": "auto",

  // 控制字体系列。
  "editor.fontFamily": "Consolas, 'Courier New', monospace",

  // 启用或禁用字体连字。
  "editor.fontLigatures": false,

  // 以像素为单位控制字体大小。
  "editor.fontSize": 14,

  // 控制字体粗细。
  "editor.fontWeight": "normal",

  // 控制编辑器是否自动格式化粘贴的内容。格式化程序必须可用，并且能针对文档中的某一范围进行格式化。
  "editor.formatOnPaste": false,

  // 在保存上格式化文件。格式化程序必须可用，延迟后文件不能保存，并且编辑器不能关闭。
  "editor.formatOnSave": false,

  // 控制在保存文件时进行格式化的超时时间 (毫秒)。
  "editor.formatOnSaveTimeout": 750,

  // 控制编辑器在键入一行后是否自动格式化该行。
  "editor.formatOnType": false,

  // 控制编辑器是否应呈现垂直字形边距。字形边距最常用于调试。
  "editor.glyphMargin": true,

  // 控制是否在概览标尺中隐藏光标。
  "editor.hideCursorInOverviewRuler": false,

  // 控制是否突出显示编辑器中活动的缩进参考线。
  "editor.highlightActiveIndentGuide": true,

  // 控制显示悬停提示前的等待时间 (毫秒)。
  "editor.hover.delay": 300,

  // 控制是否显示悬停提示。
  "editor.hover.enabled": true,

  // 控制当鼠标移动到悬停提示上时，其是否保持可见。
  "editor.hover.sticky": true,

  // 按 `Tab` 键时插入空格。该设置在 `editor.detectIndentation` 启用时根据文件内容可能会被覆盖。
  "editor.insertSpaces": true,

  // 对大型文件进行特殊处理，禁用某些内存密集型功能。
  "editor.largeFileOptimizations": true,

  // 控制以像素为单位的字母间距。
  "editor.letterSpacing": 0,

  // 在编辑器中启用代码操作小灯泡提示。
  "editor.lightbulb.enabled": true,

  // 控制行高。为 0 时则通过字体大小自动计算。
  "editor.lineHeight": 0,

  // 控制行号的显示。
  //  - off: 不显示行号。
  //  - on: 将行号显示为绝对行数。
  //  - relative: 将行号显示为与光标相隔的行数。
  //  - interval: 每 10 行显示一次行号。
  "editor.lineNumbers": "on",

  // 控制是否在编辑器中检测链接并使其可被点击。
  "editor.links": true,

  // 当选择其中一项时，将突出显示匹配的括号。
  "editor.matchBrackets": true,

  // 控制是否显示小地图。
  "editor.minimap.enabled": true,

  // 限制小地图的宽度，控制其最多显示的列数。
  "editor.minimap.maxColumn": 120,

  // 渲染每行的实际字符，而不是色块。
  "editor.minimap.renderCharacters": true,

  // 控制是否自动隐藏小地图滑块。
  "editor.minimap.showSlider": "mouseover",

  // 控制在哪一侧显示小地图。
  "editor.minimap.side": "right",

  // 对鼠标滚轮滚动事件的 `deltaX` 和 `deltaY` 乘上的系数。
  "editor.mouseWheelScrollSensitivity": 1,

  // 按住 `Ctrl` 键并滚动鼠标滚轮时对编辑器字体大小进行缩放。
  "editor.mouseWheelZoom": false,

  // 当多个光标重叠时进行合并。
  "editor.multiCursorMergeOverlapping": true,

  // 在通过鼠标添加多个光标时使用的修改键。“转到定义”和“打开链接”功能所需的鼠标动作将会相应调整，不与多光标修改键冲突。[阅读详细信息](https://code.visualstudio.com/docs/editor/codebasics#_multicursor-modifier)。
  //  - ctrlCmd: 映射为 `Ctrl` (Windows 和 Linux) 或 `Command` (macOS)。
  //  - alt: 映射为 `Alt` (Windows 和 Linux) 或 `Option` (macOS)。
  "editor.multiCursorModifier": "alt",

  // 控制编辑器是否突出显示语义符号次数。
  "editor.occurrencesHighlight": true,

  // 控制是否在概览标尺周围绘制边框。
  "editor.overviewRulerBorder": true,

  // 控制概览标尺中同一位置可显示的提示数量。
  "editor.overviewRulerLanes": 3,

  // 控制参数提示菜单在到达列表末尾时进行循环还是关闭。
  "editor.parameterHints.cycle": false,

  // 在输入时显示含有参数文档和类型信息的小面板。
  "editor.parameterHints.enabled": true,

  // 控制是否在键入时自动显示建议。
  "editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": false
  },

  // 控制显示快速建议前的等待时间 (毫秒)。
  "editor.quickSuggestionsDelay": 10,

  // 控制编辑器是否显示控制字符。
  "editor.renderControlCharacters": false,

  // 控制编辑器是否显示缩进参考线。
  "editor.renderIndentGuides": true,

  // 控制编辑器的当前行进行高亮显示的方式。
  //  - none
  //  - gutter
  //  - line
  //  - all: 同时突出显示导航线和当前行。
  "editor.renderLineHighlight": "line",

  // 控制编辑器在空白字符上显示符号的方式。
  //  - none
  //  - boundary: 除了单个空格，在空白字符上显示符号。
  //  - all
  "editor.renderWhitespace": "none",

  // 控制选区是否有圆角。
  "editor.roundedSelection": true,

  // 在一定数量的等宽字符后显示垂直标尺。输入多个值，显示多个标尺。若数组为空，则不绘制标尺。
  "editor.rulers": [],

  // 控制编辑器水平滚动时可以超过范围的字符数。
  "editor.scrollBeyondLastColumn": 5,

  // 控制编辑器是否可以滚动到最后一行之后。
  "editor.scrollBeyondLastLine": true,

  // 控制编辑器是否突出显示选中内容的近似匹配。
  "editor.selectionHighlight": true,

  // 控制是否自动隐藏导航线上的折叠控件。
  "editor.showFoldingControls": "mouseover",

  // 控制是否淡化未使用的代码。
  "editor.showUnused": true,

  // 控制编辑器是否在滚动时使用动画。
  "editor.smoothScrolling": false,

  // 控制代码片段是否与其他建议一起显示及其排列的位置。
  //  - top: 在其他建议上方显示代码片段建议。
  //  - bottom: 在其他建议下方显示代码片段建议。
  //  - inline: 在其他建议中穿插显示代码片段建议。
  //  - none: 不显示代码片段建议。
  "editor.snippetSuggestions": "inline",

  // 在速览编辑器中，即使双击其中的内容或者按 `Esc` 键，也保持其打开状态。
  "editor.stablePeek": false,

  // 控制对建议的筛选和排序是否考虑小的拼写错误。
  "editor.suggest.filterGraceful": true,

  // 控制排序时是否提高靠近光标的词语的优先级。
  "editor.suggest.localityBonus": false,

  // 控制在活动代码片段内是否禁用快速建议。
  "editor.suggest.snippetsPreventQuickSuggestions": true,

  // 建议小部件的字号。如果设置为 `0`，则使用 `editor.fontSize` 的值。
  "editor.suggestFontSize": 0,

  // 建议小部件的行高。如果设置为 `0`，则使用 `editor.lineHeight` 的值。
  "editor.suggestLineHeight": 0,

  // 控制在键入触发字符后是否自动显示建议。
  "editor.suggestOnTriggerCharacters": true,

  // 控制在建议列表中如何预先选择建议。
  //  - first: 始终选择第一个建议。
  //  - recentlyUsed: 选择最近的建议，除非进一步键入选择其他项。例如 `console. -> console.log`，因为最近补全过 `log`。
  //  - recentlyUsedByPrefix: 根据之前补全过的建议的前缀来进行选择。例如，`co -> console`、`con -> const`。
  "editor.suggestSelection": "recentlyUsed",

  // 启用 Tab 补全。
  //  - on: 在按下 Tab 键时进行 Tab 补全，将插入最佳匹配建议。
  //  - off: 禁用 Tab 补全。
  //  - onlySnippets: 在前缀匹配时进行 Tab 补全。在 "quickSuggestions" 未启用时体验最好。
  "editor.tabCompletion": "off",

  // 一个制表符等于的空格数。在 `editor.detectIndentation` 启用时，根据文件内容，该设置可能会被覆盖。
  "editor.tabSize": 4,

  // 覆盖当前所选颜色主题中的编辑器颜色和字体样式。
  "editor.tokenColorCustomizations": {},

  // 删除自动插入的尾随空白符号。
  "editor.trimAutoWhitespace": true,

  // 根据制表位插入和删除空格。
  "editor.useTabStops": true,

  // 控制是否根据文档中的文字计算自动完成列表。
  "editor.wordBasedSuggestions": true,

  // 执行单词相关的导航或操作时作为单词分隔符的字符。
  "editor.wordSeparators": "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",

  // 控制折行的方式。
  //  - off: 永不换行。
  //  - on: 将在视区宽度处换行。
  //  - wordWrapColumn: 在 `editor.wordWrapColumn` 处折行。
  //  - bounded: 在视区宽度和 `editor.wordWrapColumn` 中的较小值处折行。
  "editor.wordWrap": "off",

  // 在 `editor.wordWrap` 为 `wordWrapColumn`  或 `bounded` 时，控制编辑器的折行列。
  "editor.wordWrapColumn": 80,

  // 控制折行的缩进。
  //  - none: 没有缩进。折行从第 1 列开始。
  //  - same: 折行的缩进量与其父级相同。
  //  - indent: 折行的缩进量比其父级多 1。
  //  - deepIndent: 折行的缩进量比其父级多 2。
  "editor.wrappingIndent": "same"

}