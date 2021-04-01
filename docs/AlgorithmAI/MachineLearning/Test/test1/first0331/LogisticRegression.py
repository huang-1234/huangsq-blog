
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd
# import pandas as pd
# import matplotlib.pyplot as plt
# import seaborn as sns
# from sklearn.datasets import load_iris
# import re

def strToData(str):
    if(str == 'setosa'):
        return 0
    elif(str == 'versicolor'):
        return 1
    else:
        return 2

def loadData(filename):
    dataMat = []
    labelMat = []
    ans = []
    res = []
    fr = open(filename)
    labelMat = fr.readline().replace('"', '').strip().split()
    species = labelMat[4]
    labelMat = [labelMat[i] for i in range(0, 4)]
    while True:
        lineArr = fr.readline()
        if not lineArr:
            break
        lineArr = lineArr.strip().split()
        dataMat.append([float(lineArr[i]) for i in range(1, 5)]) # 前面四个数据集
        ans.append([lineArr[5].replace('"', "")])                # 
        res.append([strToData(str(lineArr[5].replace('"', "")))])
    return dataMat, labelMat, res, species, ans


data, label, res, species, ans = loadData('./iris_data.txt')
print('dataMat-------------------------------------')
print(data)
print('labelMat----------------------------------')
print(label)
print('res------------------------------------')
print(res)
print('species--------------------------------');
print(species)
print('ans------------------------------------')
print(ans)

## 下面对数据进行标准化
X = np.array(data)
Y = np.array(res)
XData = (X - np.mean(X, axis=0)) / np.std(X, axis = 0) # 标准化
# print(XData.shape, Y.shape)

##  打乱数据
XYData = np.hstack((XData, Y))
np.random.shuffle(XYData) #  打乱数据
## print(XYData)


X_DATA = XYData[:, :4]
Y_DATA = XYData[:, 4:]
Data = [X_DATA, Y_DATA]
print('Data:/n',Y_DATA)


## 下面开始训练得到模型
sklr = LogisticRegression(multi_class='multinomial', solver='sag', C=200, max_iter=1000000)
# 训练集和测试机拆分函数
X_train, X_test, y_train,y_test = train_test_split(Data[0], Data[1], random_state=10)
y_train = y_train.ravel()
y_test = y_test.ravel()
sklr.fit(X_train, y_train)
y_predict = sklr.predict(X_test)
accurcy = np.sum(y_predict == y_test) / len(y_test) # 测试准确率
print('The accurcy is ',accurcy)


# 画图
iris_dataframe = pd.DataFrame(X_DATA, columns = label)
pd.plotting.scatter_matrix(iris_dataframe, c=Y_DATA, figsize=(15,15), 
                           marker='0', hist_kwds={'bins':50},s=60,
                           alpha=.8)

