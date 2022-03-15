# jQuery

jQuery曾经是世上最流行的JavaScript库，在2000年后期，它得到了广泛的应用，围绕它也产生了一个丰富的生态系统，诞生了大量的插件、框架。

但是到了最近一段时间，jQuery的地位急剧下降。这篇文章会回顾一下jQuery的前世今生。

## jQuery的历史

John Resig在2005年开发了JQuery的第一个版本，并且在BarCampNYC中宣布了它。在jQuery网站中，他写到：

> jQuery是一个JavaScript库为了让**编写JavaScript代码变得有趣**。jQuery通过封装通用性、重复性的功能，移除掉不必要的代码修辞，让JavaScript代码变得简单、精炼和更加可读。

jQuery主要解决了两大问题，第一：它提供了一整套简洁的API用于操作Dom，尤其是提供了一系列强大的方法去选择页面元素。除了可以基于元素id或者class来选择元素，jQuery还可以支持复杂的表达式，例如基于和其他元素关系来筛选：

```
// 在contact节点下，选出people列表中每一个元素
$('#contacts ul.people li');
```

这个筛选引擎最终抽象成一个独立库“Sizzle”。

第二个卖点是它抹平了不同浏览器的差异。在它以前，要支持多个浏览器是件非常不容易的事情。

由于早年浏览器缺乏统一标准，开发者需要兼容不同浏览器解决各种边界情况。可以看下早期jQuery的源代码，搜索"jQuery.browser"：

```js
// If Mozilla is used
if (jQuery.browser == "mozilla" || jQuery.browser == "opera") {
  // Use the handy event callback
  jQuery.event.add(document, "DOMContentLoaded", jQuery.ready);

  // If IE is used, use the excellent hack by Matthias Miller
  // http://www.outofhanwell.com/blog/index.php?title=the_window_onload_problem_revisited
} else if (jQuery.browser == "msie") {

  // Only works if you document.write() it
  document.write("<scr" + "ipt id=__ie_init defer=true " +
    "src=javascript:void(0)><\/script>");

  // Use the defer script hack
  var script = document.getElementById("__ie_init");
  script.onreadystatechange = function () {
    if (this.readyState == "complete")
      jQuery.ready();
  };

  // Clear from memory
  script = null;

  // If Safari  is used
} else if (jQuery.browser == "safari") {
  // Continually check to see if the document.readyState is valid
  jQuery.safariTimer = setInterval(function () {
    // loaded and complete are both valid states
    if (document.readyState == "loaded" ||
      document.readyState == "complete") {

      // If either one are found, remove the timer
      clearInterval(jQuery.safariTimer);
      jQuery.safariTimer = null;

      // and execute any waiting functions
      jQuery.ready();
    }
  }, 10);
}
```



通过使用jQuery，开发者就可以让jQuery的团队去完成这些浏览器兼容的事情。后来，jQuery又添加了更多的特性，例如动画和ajax。jQuery自此变成了网站开发的标准依赖库，即使到今天依旧发挥了重要的作用。W3Techs预估当今依然有74%网站使用jQuery。

jQuery的管理也变得越来越正式，2011年，jQuery团队正式成立委员会，2012年，委员会组成了jQuery基金会。

到了2015年，jQuery基金会和Dojo基金会合并到了JS基金会，然后到了2019年，又和Node.js基金会合并成OpenJS基金会。

## 变化的环境

然而，近年来jQuery的受欢迎程度有所下降。 GitHub从他们网站中删除了jQuery，而Bootstrap v5也将丢弃jQuery，因为它是Bootstrap中最大的JavaScript的依赖库（压缩和gzip后30KB）。Web开发的一些趋势削弱了jQuery作为必须使用的工具的地位。

### 浏览器

浏览器差异和限制变得不那么重要了。首先是标准化有所改进， 主要的浏览器供应商（Apple，Google，Microsoft和Mozilla）通过Web Hypertext Application Technology Working Group在Web标准上进行协作。

虽然浏览器在很大程度上仍然存在差异，但供应商至少有一种方法可以找到并发展共同点而不是互相发动不间断的战争。 因此，浏览器API变得更加强大，例如，Fetch API可以取代jQuery的Ajax函数：

```js
// jQuery
$.getJSON('https://api.com/songs.json')
  .done(function (songs) {
    console.log(songs);
  })

// native
fetch('https://api.com/songs.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (songs) {
    console.log(songs);
  });
```



[`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) 和 [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) API可以替代jQuery的元素查询能力:

```
// jQuery
const fooDivs = $('.foo div');

// native
const fooDivs = document.querySelectorAll('.foo div');

```

操作DOM元素可以用 `classList` :

```
// jQuery
$('#warning').toggleClass('visible');

// native
document.querySelector('#warning').classList.toggle('visible');

```

您可能不需要jQuery网站列出了几个可以用原生代码替换jQuery代码的情况。有些开发人员总是会使用jQuery，因为他们并不知道这些API是可用的，但是随着开发人员了解它们，他们对jQuery的依赖性降低了。

使用原生功能还可以提高网页的性能。现在可以使用CSS更有效地实现许多jQuery动画效果。

第二个原因是浏览器的更新速度比过去更快。大多数浏览器现在都有常绿更新策略，Apple的Safari是主要的例外。他们可以在没有用户干预的情况下静默更新，并且不依赖于操作系统更新。

这意味着用户可以更快地采用新的浏览器功能和错误修复，开发人员不必等待使用率百分比达到可接受的水平。他们可以自信地使用功能和API而无需加载jQuery或polyfill。

第三个原因是IE越来越接近无关紧要，IE一直是各地Web开发者的祸根。特定版本的IE的错误是众所周知的，并且因为IE是2000年代的主流浏览器并且缺乏常规更新，旧版本固执地徘徊。

微软加速了IE的弃用，结束了对2016年IE 10及以下版本的支持，将IE 11作为最后一个支持版本。Web开发人员忽视IE兼容性的现象越来越普遍。

即使jQuery在2013年发布版本2.0时也放弃了对IE 8及以下版本的支持。虽然遗留网站等一些特殊情况仍然需要IE，但这些情况正变得越来越少。

### 新框架

自jQuery发布以来，出现了大量的Web框架，目前的一些领先者是React，Angular和Vue。这些框架比jQuery有两个显着优势。

首先，它们可以轻松地将UI组件化。它们能够很好的处理展现页面以及更新页面。 jQuery通常仅用于更新页面，依靠服务器提供初始页面。

另一方面，React，Angular和Vue组件允许HTML，JS甚至CSS之间的紧密耦合。就像我们可能将代码库分解为多个自包含的函数和类一样，将UI分解为可重用的组件可以更容易地构建和维护复杂的网站。

第二个优点是较新的框架鼓励声明性范例，其中开发人员描述UI应该是什么样的，并将其留给框架以进行必要的更改以实现目标。这种方法与以jQuery代码为特征的命令式方法形成对比。

使用jQuery，您可以明确地编写执行任何更改的步骤。使用声明性框架，您会说，“基于这些数据，这就是用户界面的样子。”这可以显着减少编写无错代码时必须进行的心理记账。

开发人员已经采用这些新方法来构建网站，从而降低了jQuery的使用率。

## 什么时候使用jQuery

那么我们什么时候应该选择使用jQuery？

如果预计相关项目的复杂性会增加，最好从一个不同的库或框架开始，这样可以让您明智地处理这种复杂性，例如将UI分解为组件。对于这样的网站使用jQuery起初可以很好，但它可以快速演变成意大利面条式的代码，在那里你不确定哪些代码会影响页面的哪些部分。

我之前已经处理过这个问题，每当你想做出改变时，情况就会产生一种不安的感觉。由于jQuery选择器依赖于服务器生成的HTML结构，因此很难确定您没有破坏任何东西。

另一方面，您拥有只需要少量交互性或动态内容的简单网站。对于这些情况，我仍然默认不使用jQuery，因为我们现在可以使用原生API做更多事情。

即使我确实需要更强大的功能，我也会为用例寻找特定的库，例如用于Ajax的axios或用于动画的Animate.css。使用像这样的库通常比加载整个jQuery而只是为了它的一些功能更轻量级。

我认为使用jQuery的最佳理由是它提供了全面的功能，可以为网站的前端提供支持。您不必学习所有各种原生API或专用库，而只需阅读jQuery文档并立即提高工作效率。

它的命令式方法不能很好地扩展，但它比其他库的声明性方法更直接。对于范围明确有限的网站，放入jQuery并继续前进是合理的;它不需要任何复杂的构建或编译过程。

当你有理由相信网站不会变得更加复杂，并且你不想打扰本机功能时，jQuery是一个不错的选择，原生功能肯定比等效的jQuery代码更冗长。

当您必须支持旧版本的IE时，会出现另一个用例。在这种情况下，jQuery的功能与IE浏览器占主导地位的浏览器一样好。

## 展望

jQuery不会很快消失。 它正在积极开发中，即使有原生方法，许多开发人员也更喜欢使用它的API。

它帮助一代开发人员制作适用于每个浏览器的网站。虽然它已经在很多方面被新的库、框架和范例取代，但jQuery在使网络成为现在的状态方面发挥了巨大的积极作用。

除非jQuery功能发生重大变化，否则jQuery在未来几年内的使用率可能会继续缓慢但稳定下降。新网站倾向于从一开始就使用更现代的框架构建，jQuery的适用场景正变得越来越少。

有些人对网络开发工具的流失率不满意，但对我来说，这是一个快速进步的标志。 jQuery为我们提供了更好的方法来做事。它的继任者也做了同样的事情。

