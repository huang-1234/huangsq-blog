# -*- coding: utf-8 -*-
"""
Created on Thu Apr  1 12:23:58 2021

@author: 13770
"""

import numpy as np #导入numpy模块
import matplotlib.pyplot as plt
 
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
        # res.append([strToData(str(lineArr[5].replace('"', "")))])
    return dataMat, labelMat, res, species, ans


data, label, res, species, ans = loadData('./iris_data.txt')
print('dataMat-------------------------------------')
print(data)


X = np.array(data)
Y = np.array(res)
XData = (X - np.mean(X, axis=0)) / np.std(X, axis = 0) # 标准化
# print(XData.shape, Y.shape)
XYData = np.hstack((XData, Y))
X_DATA = XYData[:, :4]
Y_DATA = XYData[:, 4:]

plt.plot(data)
plt.ylabel(Y_DATA)
plt.show()