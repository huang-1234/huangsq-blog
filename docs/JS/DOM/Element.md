# DOM Element 对象

>  Element MDN说明

**`Element`** 是一个通用性非常强的基类，所有 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 对象下的对象都继承自它。这个接口描述了所有相同种类的元素所普遍具有的方法和属性。一些接口继承自 `Element` 并且增加了一些额外功能的接口描述了具体的行为。例如， [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 接口是所有 HTML 元素的基本接口，而 [`SVGElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGElement) 接口是所有 SVG 元素的基础。大多数功能是在这个类的更深层级（hierarchy）的接口中被进一步制定的。

在 Web 平台的领域以外的语言，比如 XUL，通过 `XULElement` 接口，同样也实现了 `Element` 接口。

## HTML DOM 节点

在 HTML DOM （文档对象模型）中，每个部分都是节点：

- 文档本身是文档节点
- 所有 HTML 元素是元素节点
- 所有 HTML 属性是属性节点
- HTML 元素内的文本是文本节点
- 注释是注释节点

## Element 对象

在 HTML DOM 中，Element 对象表示 HTML 元素。

Element 对象可以拥有类型为1元素节点、2文本节点、3注释节点的4子节点。

NodeList 对象表示节点列表，比如 HTML 元素的子节点集合。

所有浏览器都支持 Element 对象和 NodeList 对象。

## 属性和方法

下面的属性和方法可用于所有 HTML 元素上：[来自w3c](https://www.w3school.com.cn/jsref/dom_obj_all.asp)

| 属性 / 方法                                                  | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [element.accessKey](https://www.w3school.com.cn/jsref/prop_html_accesskey.asp) | 设置或返回元素的快捷键。                                     |
| [element.appendChild()](https://www.w3school.com.cn/jsref/met_node_appendchild.asp) | 向元素添加新的子节点，作为最后一个子节点。                   |
| [element.attributes](https://www.w3school.com.cn/jsref/prop_node_attributes.asp) | 返回元素属性的 NamedNodeMap。                                |
| [element.childNodes](https://www.w3school.com.cn/jsref/prop_node_childnodes.asp) | 返回元素子节点的 NodeList。                                  |
| [element.className](https://www.w3school.com.cn/jsref/prop_html_classname.asp) | 设置或返回元素的 class 属性。                                |
| element.clientHeight                                         | 返回元素的可见高度。                                         |
| element.clientWidth                                          | 返回元素的可见宽度。                                         |
| [element.cloneNode()](https://www.w3school.com.cn/jsref/met_node_clonenode.asp) | 克隆元素。                                                   |
| [element.compareDocumentPosition()](https://www.w3school.com.cn/jsref/met_node_comparedocumentposition.asp) | 比较两个元素的文档位置。                                     |
| [element.contentEditable](https://www.w3school.com.cn/jsref/prop_html_contenteditable.asp) | 设置或返回元素的文本方向。                                   |
| [element.dir](https://www.w3school.com.cn/jsref/prop_html_dir.asp) | 设置或返回元素的内容是否可编辑。                             |
| [element.firstChild](https://www.w3school.com.cn/jsref/prop_node_firstchild.asp) | 返回元素的首个子。                                           |
| [element.getAttribute()](https://www.w3school.com.cn/jsref/met_element_getattribute.asp) | 返回元素节点的指定属性值。                                   |
| [element.getAttributeNode()](https://www.w3school.com.cn/jsref/met_element_getattributenode.asp) | 返回指定的属性节点。                                         |
| [element.getElementsByTagName()](https://www.w3school.com.cn/jsref/met_element_getelementsbytagname.asp) | 返回拥有指定标签名的所有子元素的集合。                       |
| element.getFeature()                                         | 返回实现了指定特性的 API 的某个对象。                        |
| element.getUserData()                                        | 返回关联元素上键的对象。                                     |
| [element.hasAttribute()](https://www.w3school.com.cn/jsref/met_element_hasattribute.asp) | 如果元素拥有指定属性，则返回true，否则返回 false。           |
| [element.hasAttributes()](https://www.w3school.com.cn/jsref/met_node_hasattributes.asp) | 如果元素拥有属性，则返回 true，否则返回 false。              |
| [element.hasChildNodes()](https://www.w3school.com.cn/jsref/met_node_haschildnodes.asp) | 如果元素拥有子节点，则返回 true，否则 false。                |
| [element.id](https://www.w3school.com.cn/jsref/prop_html_id.asp) | 设置或返回元素的 id。                                        |
| [element.innerHTML](https://www.w3school.com.cn/jsref/prop_html_innerhtml.asp) | 设置或返回元素的内容。                                       |
| [element.insertBefore()](https://www.w3school.com.cn/jsref/met_node_insertbefore.asp) | 在指定的已有的子节点之前插入新节点。                         |
| [element.isContentEditable](https://www.w3school.com.cn/jsref/prop_html_iscontenteditable.asp) | 设置或返回元素的内容。                                       |
| [element.isDefaultNamespace()](https://www.w3school.com.cn/jsref/met_node_isdefaultnamespace.asp) | 如果指定的 namespaceURI 是默认的，则返回 true，否则返回 false。 |
| [element.isEqualNode()](https://www.w3school.com.cn/jsref/met_node_isequalnode.asp) | 检查两个元素是否相等。                                       |
| [element.isSameNode()](https://www.w3school.com.cn/jsref/met_node_issamenode.asp) | 检查两个元素是否是相同的节点。                               |
| [element.isSupported()](https://www.w3school.com.cn/jsref/met_node_issupported.asp) | 如果元素支持指定特性，则返回 true。                          |
| [element.lang](https://www.w3school.com.cn/jsref/prop_html_lang.asp) | 设置或返回元素的语言代码。                                   |
| [element.lastChild](https://www.w3school.com.cn/jsref/prop_node_lastchild.asp) | 返回元素的最后一个子元素。                                   |
| [element.namespaceURI](https://www.w3school.com.cn/jsref/prop_node_namespaceuri.asp) | 返回元素的 namespace URI。                                   |
| [element.nextSibling](https://www.w3school.com.cn/jsref/prop_node_nextsibling.asp) | 返回位于相同节点树层级的下一个节点。                         |
| [element.nodeName](https://www.w3school.com.cn/jsref/prop_node_nodename.asp) | 返回元素的名称。                                             |
| [element.nodeType](https://www.w3school.com.cn/jsref/prop_node_nodetype.asp) | 返回元素的节点类型。                                         |
| [element.nodeValue](https://www.w3school.com.cn/jsref/prop_node_nodevalue.asp) | 设置或返回元素值。                                           |
| [element.normalize()](https://www.w3school.com.cn/jsref/met_node_normalize.asp) | 合并元素中相邻的文本节点，并移除空的文本节点。               |
| element.offsetHeight                                         | 返回元素的高度。                                             |
| element.offsetWidth                                          | 返回元素的宽度。                                             |
| element.offsetLeft                                           | 返回元素的水平偏移位置。                                     |
| element.offsetParent                                         | 返回元素的偏移容器。                                         |
| element.offsetTop                                            | 返回元素的垂直偏移位置。                                     |
| [element.ownerDocument](https://www.w3school.com.cn/jsref/prop_node_ownerdocument.asp) | 返回元素的根元素（文档对象）。                               |
| [element.parentNode](https://www.w3school.com.cn/jsref/prop_node_parentnode.asp) | 返回元素的父节点。                                           |
| [element.previousSibling](https://www.w3school.com.cn/jsref/prop_node_previoussibling.asp) | 返回位于相同节点树层级的前一个元素。                         |
| [element.removeAttribute()](https://www.w3school.com.cn/jsref/met_element_removeattribute.asp) | 从元素中移除指定属性。                                       |
| [element.removeAttributeNode()](https://www.w3school.com.cn/jsref/met_element_removeattributenode.asp) | 移除指定的属性节点，并返回被移除的节点。                     |
| [element.removeChild()](https://www.w3school.com.cn/jsref/met_node_removechild.asp) | 从元素中移除子节点。                                         |
| [element.replaceChild()](https://www.w3school.com.cn/jsref/met_node_replacechild.asp) | 替换元素中的子节点。                                         |
| element.scrollHeight                                         | 返回元素的整体高度。                                         |
| element.scrollLeft                                           | 返回元素左边缘与视图之间的距离。                             |
| element.scrollTop                                            | 返回元素上边缘与视图之间的距离。                             |
| element.scrollWidth                                          | 返回元素的整体宽度。                                         |
| [element.setAttribute()](https://www.w3school.com.cn/jsref/met_element_setattribute.asp) | 把指定属性设置或更改为指定值。                               |
| [element.setAttributeNode()](https://www.w3school.com.cn/jsref/met_element_setattributenode.asp) | 设置或更改指定属性节点。                                     |
| element.setIdAttribute()                                     |                                                              |
| element.setIdAttributeNode()                                 |                                                              |
| element.setUserData()                                        | 把对象关联到元素上的键。                                     |
| element.style                                                | 设置或返回元素的 style 属性。                                |
| [element.tabIndex](https://www.w3school.com.cn/jsref/prop_html_tabindex.asp) | 设置或返回元素的 tab 键控制次序。                            |
| [element.tagName](https://www.w3school.com.cn/jsref/prop_element_tagname.asp) | 返回元素的标签名。                                           |
| [element.textContent](https://www.w3school.com.cn/jsref/prop_node_textcontent.asp) | 设置或返回节点及其后代的文本内容。                           |
| [element.title](https://www.w3school.com.cn/jsref/prop_html_title.asp) | 设置或返回元素的 title 属性。                                |
| element.toString()                                           | 把元素转换为字符串。                                         |
| [nodelist.item()](https://www.w3school.com.cn/jsref/met_nodelist_item.asp) | 返回 NodeList 中位于指定下标的节点。                         |
| [nodelist.length](https://www.w3school.com.cn/jsref/prop_nodelist_length.asp) | 返回 NodeList 中的节点数。                                   |

