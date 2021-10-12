## IndexOf

indexOf的含义：给定一个字符串去匹配另一个字符串的下标，如果匹配到，返回下标，如果匹配不到则返回-1，其实原理还是比较简单的，如果需要你实现，那么应该怎么做呢？

## 原理

现在给定匹配的字符串A，原始字符串B，比如匹配字符串A等于“叫练”，原始字符串B\等于“边叫边练，\我喜欢叫练”，你可能一眼就发现“叫练”是最后两个字符，我们以B做循环，一个一个单词去匹配，先找“叫”，找到计数器加1，然后继续找“练”，发现下个字符不是“练”，计数器清零，重新从“叫”开始查找，现在查找到B的倒数第二个字符了，下个字符是“练”计算器再加1，此时计数器等于2也正好是A字符串的长度，说明找到了，查找原理就是这样一个过程；下面我们分别以Java，javascript，python方式实现下。

注意：下面代码没有校验，仅供参考，\python是index方法，实现原理一样，但找不到会报错！

## 实现

### Java实现

```java
public static void main(String[] args) {
        String orgin = "边叫边练，我喜欢叫练";
        String serach = "叫练";
        int index = indexOf(orgin,serach);
        System.out.println(index);
    }

/
     *  indexOf 算法原理
     * @param orgin 原始字符串 B = “边叫边练，我喜欢叫练”;
     * @param serachString 匹配字符串 A=“叫练”
     * @return int 下标
     */
public static int indexOf(String orgin,String serachString) {
    char[] chars = orgin.toCharArray();
    char[] sChars = serachString.toCharArray();
    //返回字符串下标
    int index = -1;
    //匹配字符串计数器，用于查询是否匹配到完整字符串
    int s_index = 0;
    //全局计数器，用于计算下标
    int move = 0;
    for (int i=0; i<chars.length; i++) {
        move++;
        //如果匹配到“叫”,继续向下开始匹配“练”
        if (chars[i] == sChars[s_index]) {
            s_index++;
            if(s_index == sChars.length) {
                index = move-sChars.length;
                break;
            }
        } else {
            s_index = 0;
        }
    }
    return index;
}
```

### Javascript实现

```js
/
     * @param orgin 原始字符串 B = “边叫边练，我喜欢叫练”;
     * @param serachString 匹配字符串 A=“叫练”
     /
    function indexOf(orgin,serachString) {
        //返回字符串下标
        var index = -1;
        //匹配字符串计数器，用于查询是否匹配到完整字符串
        var s_index = 0;
        //全局计数器，用于计算下标
        var move = 0;
        for (var i=0; i<orgin.length; i++) {
            move++;
            //如果匹配到“叫”,继续向下开始匹配“练”
            if (orgin.substr(i,1) == serachString.substr(s_index,1)) {
                s_index++;
                if(s_index == serachString.length) {
                    index = move-serachString.length;
                    break;
                }
            } else {
                s_index = 0;
            }
        }
        return index;
    }
```

### python实现

```python
# indexOf 算法原理
# @param orgin 原始字符串 B = “边叫边练，我喜欢叫练”;
# @param serachString 匹配字符串 A=“叫练”
# @return int 下标
def index(orgin, serachString):
    # 返回字符串下标
    index = -1
    # 匹配字符串计数器，用于查询是否匹配到完整字符串
    s_index = 0
    # 全局计数器，用于计算下标
    move = 0
    for letter in enumerate(orgin):
        move = move + 1
        # 如果匹配到“叫”,继续向下开始匹配“练”
        if letter[1] == serachString[s_index]:
            s_index = s_index + 1
            if s_index == len(serachString):
                index = move - len(serachString)
                break
        else:
            s_index = 0;

    return index
```