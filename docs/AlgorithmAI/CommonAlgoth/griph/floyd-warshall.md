## 背景知识

### 图简介

图由节点和边组成, 边有方向的图称为有向图, 边没有方向的图称为无向图, 最短路径算法里可以把无向图视为双向连接的有向图. 边有权重的图称为有权图, 边没有权重的图称为无权图, 无权图可以视为边的权重均为1的图.

### 点对点最短路径

求图中任意(所有)两点之间的最短路径,

## Floyd-Warshall算法

### 概述

点对点路径可以通过将每个点作为源点使用Dijkstra算法或者Bellman-Ford算法来求得, 算法复杂度分别为O(V^3), O(E*V^2). Folyd-Warshall算法复杂度并没有降低, 是O(V^3), 但是Floyd的算法非常简洁、优雅, 嗯, 比前面说到的两个简洁了不只一点点. 代码核心就三个循环 + 一个距离更新语句.

### 核心思想

循环V次, 每次循环使用k作为中继点, k是循环的迭代系数, 初始为0, 代表当前循环体中使用的中继节点)分别计算所有点对点之间以k为中继点的距离, 如果以k为中继点的距离更小, 就更新最短路径.

### 算法步骤

dis[][]用于存储每个点对的距离, midNode[][]用于存储每个点对的中继点信息

**Step1:**初始化, dis[][]初始化为图中各边的权重, dis[i][i]初始化为0, 没有边直接连接的点对初始化为INT_MAX,

**Step2:**遍历每个节点: 对每个节点k, 执行Step3

**Step3:**遍历所有点对(v, u), 若dis[v][k], dis[k][u]均非INT_MAX, 且dis[v][k] + dis[k][u] 小于 dis[v][u], 执行:dis[v][u] = dis[v][k] + dis[k][u]; midNode[v][u] = k;

**Step4:**遍历同一节点的距离, 即dis[i][i], 如果dis[i][i]小于0, 说明图中存在负环.

### 为什么Folyd算法能获得最短路径

其实最让人怀疑的是使用中继点更新距离时(dis[v][u] = dis[v][k] + dis[k][u])dis[v][k]或者dis[k][u]可能还没有获得最小值. 下面就简单说一下为什么dis[k][u]已经获得最小值了.

假设已知一条最短路径, 例如(1, 3, 5, 7, 2, 4), 那么dis[1][4]最晚是在7作为中继点时获得最大路径(因为7是1->4路径上最后一个被遍历到的中间节点), 假设dis[1][7], dis[7][4]已经获得了最小值, 如果此时dis[1][4]如果没有获得最小值, 那么dis[1][4]必然被更新为dis[1][7] + dis[7][4], dis[1][4]获得了最短路径,

下面只需要证明dis[1][7] 和dis[7][4]已经找到了最短路径

以7->4为例, 因为已知(1, 3, 5, 7, 2, 4)是最短路径, 所以(7, 2, 4)一定也是最短路径, 所以在2作为中继点时, dis[7][4]一定会被更新为dis[7][2] + dis[2][4](因为一只2在7->4最短路径上, 在2这里肯定要更新的)

同理因为(7, 2, 4)是最短路径, 所以(7, 2)和(2, 4)也分别为7->2 和2->4的最短路径. 综上所述: Floyd算法一定会找到(1, 3, 5, 7 , 2 , 4)这条最短路径.

### 判断负环的原理

如果存在负环, 假设点v在负环上, dis[v][v] 经过这条负环获得的距离小于0(dis[v][v]的初始值), 会被更新为负值. 因此通过判断每个节点自己到自己的距离是否有负值就可以判断负环了.

### C++实现

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution
{
public:
    int printPath()
    {
        vector<vector<int>> graph{{0, 4, 0, 0, 0, 0, 0, 8, 0},
                                  {4, 0, 8, 0, 0, 0, 0, 11, 0},
                                  {0, 8, 0, 7, 0, 4, 0, 0, 2},
                                  {0, 0, 7, 0, 9, 14, 0, 0, 0},
                                  {0, 0, 0, 9, 0, 10, 0, 0, 0},
                                  {0, 0, 4, 14, 10, 0, 2, 0, 0},
                                  {0, 0, 0, 0, 0, 2, 0, 1, 6},
                                  {8, 11, 0, 0, 0, 0, 1, 0, 7},
                                  {0, 0, 2, 0, 0, 0, 6, 7, 0}};

        vector<vector<int>> midNode;
        vector<vector<int>> distances = floydWarshall(graph, midNode);
        for(int i = 0; i < graph.size(); i++)
        {
            for(int j = 0; j < graph.size(); j++)
            {
                cout << i << "->" << j << ": ";
                print(midNode, i, j, midNode[i][j]);
                cout << " dis:" << distances[i][j] << endl;
            }
            cout << endl;
        }
        return 0;
    }

    void print(vector<vector<int>> midNode, int head, int tail, int mid)
    {
        cout << head << " ";
        if(head == tail)
        {
            return;
        }
        printUtil(midNode, head, tail, midNode[head][tail]);
        cout << tail << " ";
    }

    void printUtil(vector<vector<int>> midNode, int head, int tail, int mid)
    {
        if(mid == -1)
        {
            return;
        }
        printUtil(midNode, head, mid, midNode[head][mid]);
        cout << mid << " ";
        printUtil(midNode, mid, tail, midNode[mid][tail]);
    }

    vector<vector<int>> floydWarshall(vector<vector<int>> &graph, vector<vector<int>> &midNode)
    {
        ///initialization
        midNode = vector<vector<int>>(graph.size(), vector<int>(graph.size(), -1));
        vector<vector<int>> distances(graph.size(), vector<int>(graph.size(), INT_MAX));
        for(int i = 0; i < graph.size(); i++)
        {
            for(int j = 0; j < graph.size(); j++)
            {
                if(graph[i][j] != 0)
                {
                    distances[i][j] = graph[i][j];
                } else if(i == j)
                {
                    distances[i][j] = 0;
                }
            }
        }

        ////find shortest path
        for(int k = 0; k < graph.size(); k++) ///intermediate node
        {
            ///traverse each node pair
            for(int i = 0; i < graph.size(); i++)
            {
                for(int j = 0; j < graph.size(); j++)
                {
                    if(distances[i][k] != INT_MAX && distances[k][j] != INT_MAX &&
                       distances[i][k] + distances[k][j] < distances[i][j])
                    {
                        distances[i][j] = distances[i][k] + distances[k][j];
                        midNode[i][j] = k;
                    }
                }
            }
        }

        ///detect negative ring
        for(int i = 0; i < distances.size(); i++)
        {
            if(distances[i][i] < 0)
            {
                return vector<vector<int>>();
            }

        }
        return distances;
    }
};

int main()
{
    return Solution().printPath();
}
```
