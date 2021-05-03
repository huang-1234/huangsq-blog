## attribute

在 W3C DOM Core 中，Attr (attribute) 对象从 Node 对象继承所有属性和方法。

在 DOM 4 中，Attr 对象不再从 Node 继承。

为了保证未来的代码安全，您应该避免在属性对象上使用节点对象的属性和方法：

| 属性 / 方法          | 避免的理由                         |
| :------------------- | :--------------------------------- |
| attr.appendChild()   | 属性没有子节点。                   |
| attr.attributes      | 属性没有属性。                     |
| attr.baseURI         | 使用 document.baseURI 代替。       |
| attr.childNodes      | 属性没有子节点。                   |
| attr.cloneNode()     | 使用 attr.value 代替。             |
| attr.firstChild      | 属性没有子节点。                   |
| attr.hasAttributes() | 属性没有属性。                     |
| attr.hasChildNodes   | 属性没有子节点。                   |
| attr.insertBefore()  | 属性没有子节点。                   |
| attr.isEqualNode()   | 没有意义。                         |
| attr.isSameNode()    | 没有意义。                         |
| attr.isSupported()   | 始终为 true。                      |
| attr.lastChild       | 属性没有子节点。                   |
| attr.nextSibling     | 属性没有同级节点。                 |
| attr.nodeName        | 使用 attr.name 代替。              |
| attr.nodeType        | 始终为 2 (ATTRIBUTE_NODE)。        |
| attr.nodeValue       | 使用 attr.value 代替。             |
| attr.normalize()     | 属性无法被正常化。                 |
| attr.ownerDocument   | 始终是您的 HTML 文档。             |
| attr.ownerElement    | 这是您用来访问该属性的 HTML 元素。 |
| attr.parentNode      | 这是您用来访问该属性的 HTML 元素。 |
| attr.previousSibling | 属性没有同级节点。                 |
| attr.removeChild     | 属性没有子节点。                   |
| attr.replaceChild    | 属性没有子节点。                   |
| attr.textContent     | 使用 attr.value 代替。             |