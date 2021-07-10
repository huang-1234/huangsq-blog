# WebAPI-Node接口

`Node` 是一个接口，各种类型的 DOM API 对象会从这个接口继承。它允许我们使用相似的方式对待这些不同类型的对象；比如, 继承同一组方法，或者用同样的方式测试。

以下接口都从 `Node` 继承其方法和属性：

[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document), [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element), [`Attr`](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr), [`CharacterData`](https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData) (which [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text), [`Comment`](https://developer.mozilla.org/zh-CN/docs/Web/API/Comment), and [`CDATASection`](https://developer.mozilla.org/zh-CN/docs/Web/API/CDATASection) inherit), [`ProcessingInstruction` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction), [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment), [`DocumentType`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentType), [`Notation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Notation), [`Entity`](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/API/Entity), `EntityReference`

在方法和属性不相关的特定情况下，这些接口可能返回 `null`。它们可能会抛出异常 - 例如，当将子节点添加到不允许子节点存在的节点时。

## 1. contains

**Node.contains()**返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。

```js
node.contains( otherNode )
```

- `node` 是否包含otherNode节点.
- `otherNode` 是否是node的后代节点.

如果 `otherNode` 是 `node 的后代节点或是` `node` 节点本身.则返回`true` , 否则返回 `false`.

> 例题

```js
// 查找两个节点的最近的一个共同父节点，可以包括节点自身
function commonParentNode(oNode1, oNode2) {
  if (oNode1.contains(oNode2)) {
    return oNode1
  } else {
    return commonParentNode(oNode1.parentNode, oNode2)
  }
}
```

