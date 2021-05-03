# window方法和属性汇总

# window对象有以下方法：

open　close　alert　confirm　prompt　setTimeout　clearTimeout　setInterval　clearInterval　moveBy　moveTo　resizeBy　resizeTo　scrollBy　scrollTo　find　back　forward　home　stop　print　blur　focus　captureEvent　enableExternalCapture　disableExternalCapture　handleEvent　 releaseEvent　routeEvent　scroll

## 1. open方法

语法格式：window.open(URL,窗口名称,窗口风格)

功能：打开一个新的窗口，并在窗口中装载指定URL地址的网页。

说明：

open方法用于打开一个新的浏览器窗口，并在新窗口中装入一个指定的URL地址；

open方法在打开一个新的浏览器窗口时，还可以指定窗口的名称(第二个参数)；

open方法在打开一个新的浏览器窗口时，还可以指定窗口的风格(第三个参数)，窗口风格有以下选项，这些选项可以多选，如果多选，各选项之间用逗号分隔：


```http
toolbar：指定窗口是否有标准工具栏。当该选项的值为1或yes时，表示有标准工具栏，当该选项的值为0或no时，表示没有标准工具栏；
location：指定窗口是否有地址工具栏，选项的值及含义与toolbar相同；
directories：指定窗口是否有链接工具栏，选项的值及含义与toolbar相同；
status：指定窗口是否有状态栏，选项的值及含义与toolbar相同；
menubar：指定窗口是否有菜单，选项的值及含义与toolbar相同；
scrollbar：指定当前窗口文档大于窗口时是否有滚动条，选项的值及含义与toolbar相同；
resizable：指定窗口是否可改变大小，选项的值及含义与toolbar相同；
width：以像素为单位指定窗口的宽度，已被innerWidth取代；
height：以像素为单位指定窗口的高度，已被innerHeight取代；
outerWidth：以像素为单位指定窗口的外部宽度；
outerHeight：以像素为单位指定窗口的外部高度；
left：以像素为单位指定窗口距屏幕左边的位置；
top：以像素为单位指定窗口距屏幕顶端的位置；
alwaysLowered：指定窗口隐藏在所有窗口之后，选项的值及含义与toolbar相同；
alwaysRaised：指定窗口浮在所有窗口之上，选项的值及含义与toolbar相同；
dependent：指定打开的窗口为当前窗口的一个子窗口，并随着父窗口的关闭而关闭，选项的值及含义与toolbar相同；
hotkeys：在没有菜单栏的新窗口中设置安全退出的热键，选项的值及含义与toolbar相同；
innerHeight：设定窗口中文档的像素高度；
innerWidth：设定窗口中文档的像素宽度；
screenX：设定窗口距离屏幕左边界的像素长度；
screenY：设定窗口距离屏幕上边界的像素长度；
titleBar：指明标题栏是否在新窗口中可见，选项的值及含义与toolbar相同；
z-look：指明当窗口被激活时，不能浮在其它窗口之上，选项的值及含义与toolbar相同。
```
open方法返回的是该窗口的引用。

小技巧：该方法经常用于在打开一个网页时自动打开另一个窗口。

## 2. close方法

语法格式：window.close()

功能：close方法用于自动关闭浏览器窗口。

## 3. alert方法

语法格式： window.alert(提示字符串)

功能：弹出一个警告框，在警告框内显示提示字符串文本。

## 4. confirm方法

语法格式：window.confirm(提示字符串)

功能：显示一个确认框，在确认框内显示提示字符串，当用户单击“确定”按钮时该方法返回true，单击“取消”时返回false。

## 5. prompt方法

语法格式：window.prompt(提示字符串，缺省文本)

功能：显示一个输入框，在输入框内显示提示字符串，在输入文本框显示缺省文本，并等待用户输入，当用户单击“确定”按钮时，返回用户输入的字符串，当单击“取消”按钮时，返回null值。

## 6. setTimeout方法

语法格式：window.setTimeout(代码字符表达式,毫秒数)

功能：定时设置，当到了指定的毫秒数后，自动执行代码字符表达式。

## 7. clearTimeout方法

语法格式：window.clearTimeout(定时器)

功能：取消以前的定时设置，其中的参数是用setTimeout设置时的返回值。

## 8. setInterval方法

语法格式：window.setInterval(代码字符表达式,毫秒数)

功能：设定一个时间间隔后(第二个参数)，反复执行“代码字符表达式”的内容

## 9. clearInterval方法

语法格式：window.clearInterval(时间间隔器)

功能：取消setInterval设置的定时。其中的参数是setInterval方法的返回值。

## 10. moveBy方法

语法格式：window.moveBy(水平位移量,垂直位移量)

功能：按照给定像素参数移动指定窗口。第一个参数是窗口水平移动的像素，第二个参数是窗口垂直移动的像素。

## 11.moveTo方法

语法格式：window.moveTo(x,y)

功能：将窗口移动到指定的指定坐标(x,y)处。

## 12. resizeBy方法

语法格式：window.resizeBy(水平,垂直)

功能：将当前窗口改变指定的大小(x,y)，当x、y的值大于0时为扩大，小于0时为缩小。

## 13. resizeTo方法

语法格式：window.resizeTo(水平宽度,垂直宽度)

功能：将当前窗口改变成(x,y)大小，x、y分别为宽度和高度。

## 14. scrollBy方法

语法格式：window.scrollBy(水平位移量，垂直位移量)

功能：将窗口中的内容按给定的位移量滚动。参数为正数时，正向滚动，否则反向滚动。

## 15. scrollTo方法

语法格式：window.scrollTo(x,y)

功能：将窗口中的内容滚动到指定位置。

## 16.find方法

语法格式：window.find()

功能：当触发该方法时，将弹出一个“find”(查找)对话窗口，并允许用户在触发find方法的页面中查找一个字符串。

注：该属性在IE5.5及Netscape6.0中都不支持。

## 17. back方法

语法格式：window.back()

功能：模拟用户点击浏览器上的“后退”按钮，将页面转到浏览器的上一页。

说明：仅当当前页面存在上一页时才能进行该操作。

注：IE5.5不支持该方法，Netscape6.0支持。

## 18. forward方法

语法格式：window.forward()

功能：模拟用户点击浏览器上的“前进”按钮，将页面转到浏览器的下一页。

说明：仅当当前页面存在下一页时才能进行该操作。

注：IE5.5不支持该方法，Netscape6.0支持。

## 19. home方法

语法格式：window.home()

功能：模拟用户点击浏览器上的“主页”按钮，将页面转到指定的页面上。

注：IE5.5不支持该方法，Netscape6.0支持。

## 20. stop方法

语法格式：window.stop()

功能：模拟用户点击浏览器上的“停止”按钮，终止浏览器的下载操作。

注：IE5.5不支持该方法，Netscape6.0支持。

## 21. print方法

语法格式：window.print()

功能：模拟用户点击浏览器上的“打印”按钮，通知浏览器打开打印对话框打印当前页。

## 22. blur方法

语法格式：window.blur()

功能：从窗口中移出焦点。当与focus方法合用时必须小心，因为可能导致焦点不断移进移出。

## 23. focus方法

语法格式：window.focus()

功能：使窗口中得到焦点。当与blur方法合用时必须小心，因为可能导致焦点不断移进移出

## 24. captureevent方法

# window事件

语法格式：window.captureevent(event)

window.captureevent(事件1|事件2|…|事件n)

功能：捕捉指定参数的所有事件。由于能够捕获哪些由本地程序自己处理的事件，所以程序员可以随意定义函数来处理事件。如果有多个事件需要捕捉，各事件之间用管道符“|”隔开。可捕捉的事件类型如下：

event.abort　event.blur　event.change　event.click　event.dblclick　event.dragdrop　event.error　event.focus　event.keydown　event.keypress　event.keyup　event.load　event.mousedown　event.mousuemove　event.mouseout　event.mouseover　event.mouseup　event.move　event.reset　event.resize　 event.select　event.submit　event.unload

## 25. enableexternalcapture事件

语法格式：window.enableexternalcapture(event)

功能：enableexternalcapture方法用于捕捉通过参数传入的外部事件。

## 26. disableexternalcapture事件

语法格式：window.disableexternalcapture()

功能：取消enableexternalcapture方法的设置，终止对外部事件的捕捉。

## 27. handleevent事件

语法格式：window.handleevent(event)

功能：触发指定事件的事件处理器。

## 28. releaseevent事件

语法格式：window.releaseevent(event)

window.releaseevent(事件1|事件2|…|事件n)

功能：释放通过参数传入的已被捕捉的事件，这些事件是由window.captureevent方法设置的，可释放的事件与captureevent相同。

## 29. routeevent事件

语法格式：window.releaseevent(event)

功能：把被捕捉类型的所有事件转交给标准事件处理方法进行处理，可转交的事件与captureevent相同。

## 30. scroll事件

语法格式：window.scroll(x坐标,y坐标)

功能：将窗口移动到指定的坐标位置。

# window对象的属性

## window对象具有如下属性：

status　statusbar　statusbar.visible　defaultstatus　location　locationbar　locationbar.visible　self　name　closed　frames　frames.length　length　document　history　innerheight　innerwidth　menubar　menubar.visible　opener　outerheight　outerwidth　pagexoffset　pageyoffset　parent　 personalbar　 personalbar.visible　scrollbar　scrollbar.visible　toolbar　toolbar.visible　top　

## 1. status属性

语法格式：window.status=字符串

功能：设置或给出浏览器窗口中状态栏的当前显示信息。

小技巧：可以使用该属性设置浏览器窗口状态栏信息。

## 2. statusbar属性

语法格式：window.statusbar.属性

功能：statusbar属性本身也是一个对象，用于访问它自已的visible属性从而确定状态栏是否可见。

注：ie5.5浏览器不支持该属性。

## 3. statusbar.visible属性

语法格式： window.statusbar.visible

功能：检查状态栏是否可见，如果可见则返回true，反之返回false。

注：ie5.5浏览器不支持该属性。

## 4. defaultstatus属性

语法格式：window.defaultstatus[=字符串]

功能：defaultstatus属性值是浏览器窗中状态栏的默认显示信息

## 5.location属性

语法格式：window.location=url

功能：给出当前窗口的url信息或指定打开窗口的url。

　　拓展:

　　1，设置或获取对象指定的文件名或路径。

　　alert(window.location.pathname)

　　2，设置或获取整个 URL 为字符串。

　　alert(window.location.href);

　　3，设置或获取与 URL 关联的端口号码。

　　alert(window.location.port)

　　4，设置或获取 URL 的协议部分。

　　alert(window.location.protocol)

　　5，设置或获取 href 属性中在井号“#”后面的分段。

　　alert(window.location.hash)

　　6，设置或获取 location 或 URL 的 hostname 和 port 号码。

　　alert(window.location.host)

　　7，设置或获取 href 属性中跟在问号后面的部分。

　　alert(window.location.search)

　　8，获取变量的值(截取等号后面的部分)

 　var url = window.location.search;

　　//   alert(url.length);

　　//   alert(url.lastIndexOf('='));

　　var loc = url.substring(url.lastIndexOf('=')+1, url.length);

　　9，用来得到当前网页的域名

　　var domain = document.domain;

## 6. locationbar属性

语法格式：window.locationbar.属性

功能：locationbar属性也可以看成是一个子对象，这个属性用来获取它自已的visible属性来确定位置栏是否可见。 到目前为止，该属性只有一个子属性：visible。

注：ie5.5不支持该属性。

## 7. locationbar.visible属性

语法格式：window.locationbar.visible

功能：返回位置栏是否可见，如果可见返回true，反之返回false。

注：ie5.5不支持该属性。

## 8. self属性

语法格式：window.self.方法

window.self.属性

功能：该属性包含当前窗口的标志，利用这个属性，可以保证在多个窗口被打开的情况下，正确调用当前窗口内的函数或属性而不会发生混乱。

## 9. name属性

语法格式： window.name=名称

功能：返回窗口名称，这个名称是由window.open()方法创建新窗口时给定的。在javascript1.0版本中，这个属性只能用于读取窗口名称，而到了javascript1.1版本时，可以用这个属性给一个不是用window.open()方法创建的窗口指定一个名称。

## 10. closed属性

语法格式：window.closed

功能：closed属性用于返回指定窗口的实例是否已经关闭，如果关闭，返回true ，反之返回flase。

## 11. frames属性

语法格式：window.frames[“框架名称”]

window.frames[数值]

功能：frames属性是一个数组，用来存储文档中每一个由元素创建的子窗口(框架)实例，其中的下标即可以是次序号也可以是用frame元素的name属性指定的名称来得到并使用。

## 12. frames.length属性

语法格式： window.frames.length

功能：frames.length属性用于给出文档中子窗口(框架)实例的个数。

## 13. length属性

语法格式：window.length

功能：length属性返回一个窗口内的子窗口数目，该属性与window.frame.length属性的值相同。

## 14. document属性

语法格式：window.document.事件　window.document.方法　window.document.属性

功能：window对象的子对象document是javascript的核心对象，在脚本中遇到body元素时创建一个实例。

## 15. history属性

语法格式：　window.history[数值] 　window.history.方法() 　window.history.属性

window对象的子对象history是javascript的核心对象之一，该属性包含了一个已访问过页面的名称和url的数组。

## 16. innerheight属性

语法格式：window.innerheight=数值

功能：返回或指定浏览器窗口中文档的像素高度，这个高度不包括任何工具栏和组成窗口的页面修饰高度。

注：ie5.5不支持该属性。

## 17. innerwidth属性

语法格式：window.innerheight=数值

功能：返回或指定浏览器窗口中文档的像素宽度，这个宽度不包括任何工具栏和组成窗口的页面修饰宽度。

注：ie5.5不支持该属性。

## 18. menubar属性

语法格式：window.menubar.属性

功能：menubar属性也可以看成是一个子对象，这个属性用来获取它自已的visible属性来确定菜单栏是否可见。到目前为止，该属性只有一个子属性：visible。

注：ie5.5不支持该属性。

## 19. menubar.visible属性

语法格式：window.menubar.visible

功能：menubar.visible属性用于返回菜单栏是否可见，如果可见返回true，反之返回false。

注：ie5.5不支持该属性。

## 20. opener属性

语法格式：window.opener　window.opener.方法　window.opener.属性

功能：opener属性与打开该窗口的父窗口相联系，当访问子窗口中operer属性时，返回的是父窗口。通过该属性，可以使用父窗口对象中的方法和属性。

## 21. outerheight属性

语法格式：window.outerheight

功能：outerheight属性用于访问浏览器窗口的像素高度，该高度包括工具栏和装饰边的高度。

注：ie5.5不支持该属性。

## 22. outerwidth属性

语法格式：window.outerwidth

功能：outerwidth属性用于访问浏览器窗口的像素宽度，该宽度包括工具栏和装饰边的宽度。

注：ie5.5不支持该属性。

## 23. pagexoffset属性

语法格式：window.pagexoffset=数值

功能：指定浏览器窗口中文档左上角在窗口中的当前水平像素位置。在利用moveto移动之前，可以通过该属性来决定是否需要移动窗口。因为该属性返回了可见文档相对整个页面的当前位置。

注：ie5.5不支持该属性。

## 24. pageyoffset属性

语法格式：window.pageyoffset=数值

功能：指定浏览器窗口中文档左上角在窗口中的当前垂直像素位置。在利用moveto移动之前，可以通过该属性来决定是否需要移动窗口。因为该属性返回了可见文档相对整个页面的当前位置。

注：ie5.5不支持该属性。

## 25. parent属性

语法格式：window.parent.frames[数值]　window.parent.framesname

功能：访问各个子窗口(多框架)所在的父窗口。

## 26. personalbar属性

语法格式：window.personalbar.属性

功能：personalbar属性本身也是一个对象，用于访问其自身的visible属性来确定个人栏是否可见。

注：ie5.5不支持该属性。

## 27. personalbar.visible属性

语法格式：window.personalbar.visible

功能：确定个人栏是否可见，如果可见则返回true，反之返回false。

注：ie5.5不支持该属性。

## 28. scrollbars属性

语法格式：window.scrollbars.属性

功能：scrollbars属性本身也是一个对象，用于访问其自身的visible属性来确定滚动栏是否可见

注：ie5.5不支持该属性。

## 29. scrollbars.visible属性

语法格式：window.scrollbars.visible

功能：scrollbars.visible用于确定滚动栏是否可见，如果可见则返回true，反之返回false。

注：ie5.5不支持该属性。

## 30. toolbar属性

语法格式：window.toolbar.属性

功能：toolbar属性本身也是一个对象，用于访问它自已的visible属性从而确定工具栏是否可见。

注：ie5.5不支持该属性。

## 31. toolbar.visible属性

语法格式：window.toolbar.visible

功能：toolbar.visible属性用于检查工具栏是否可见，如果可见则返回true，反之返回false。

注：ie5.5不支持该属性。

## 32. top属性

语法格式：window.top.frames[数值] 　window.top.framename 　window.top.方法()

## window.top.属性

功能：window对象的top属性用于包含所有装入浏览器的子窗口(多框架)的最顶层窗口的信息。