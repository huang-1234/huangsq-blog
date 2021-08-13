## 常见业务题 arrayToTree



```js
/* 有一套考察算法的小题目。后台返回一个扁平的数据结构，转成树。
我们看下题目：打平的数据内容如下：
let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]

输出结果
[
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": [
                    // 结果 ,,,
                ]
            }
        ]
    }
] */

{
  /**
   * 递归查找，获取children
   */
  const getChildren = (data, result, pid) => {
    for (const item of data) {
      if (item.pid === pid) {
        const newItem = {...item, children: []};
        result.push(newItem);
        getChildren(data, newItem.children, item.id);
      }
    }
  }

  /**
  * 转换方法
  */
  const arrayToTree = (data, pid) => {
    const result = [];
    getChildren(data, result, pid)
    return result;
  }
  let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
  ]
  console.log(arrayToTree(arr,0));
}

{
  /* 不用递归，也能搞定
  主要思路是先把数据转成Map去存储，之后遍历的同时借助对象的引用，直接从Map找对应的数据做存储 */
  function arrayToTree(items) {
    const result = [];   // 存放结果集
    const itemMap = {};  //

    // 先转成map存储
    for (const item of items) {
      itemMap[item.id] = {...item, children: []}
    }

    for (const item of items) {
      const id = item.id;
      const pid = item.pid;
      const treeItem =  itemMap[id];
      if (pid === 0) {
        result.push(treeItem);
      } else {
        if (!itemMap[pid]) {
          itemMap[pid] = {
            children: [],
          }
        }
        itemMap[pid].children.push(treeItem)
      }
    }
    return result;
  }
  /* 从上面的代码我们分析，有两次循环，该实现的时间复杂度为O(2n)，
  需要一个Map把数据存储起来，空间复杂度O(n) */
}

{
  /* 最优性能
  主要思路也是先把数据转成Map去存储，之后遍历的同时借助对象的引用，直接从Map找对应的数据做存储。
  不同点在遍历的时候即做Map存储,有找对应关系。性能会更好。 */
  function arrayToTree(items) {
    const result = [];   // 存放结果集
    const itemMap = {};  //
    for (const item of items) {
      const id = item.id;
      const pid = item.pid;

      if (!itemMap[id]) {
        itemMap[id] = {
          children: [],
        }
      }

      itemMap[id] = {
        ...item,
        children: itemMap[id]['children']
      }

      const treeItem =  itemMap[id];

      if (pid === 0) {
        result.push(treeItem);
      } else {
        if (!itemMap[pid]) {
          itemMap[pid] = {
            children: [],
          }
        }
        itemMap[pid].children.push(treeItem)
      }
    }
    return result;
  }
  /* 从上面的代码我们分析，一次循环就搞定了，
  该实现的时间复杂度为O(n)，需要一个Map把数据存储起来，空间复杂度O(n) */
}
```

### 小试牛刀

| 方法               | 1000(条)  | 10000(条） | 20000(条） | 50000(条) |
| ------------------ | --------- | ---------- | ---------- | --------- |
| 递归实现           | 154.596ms | 1.678s     | 7.152s     | 75.412s   |
| 不用递归，两次遍历 | 0.793ms   | 16.499ms   | 45.581ms   | 97.373ms  |
| 不用递归，一次遍历 | 0.639ms   | 6.397ms    | 25.436ms   | 44.719ms  |

从我们的测试结果来看，随着数量的增大，递归的实现会越来越慢，基本成指数的增长方式。