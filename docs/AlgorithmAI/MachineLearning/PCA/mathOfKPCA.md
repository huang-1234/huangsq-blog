# 讲讲KPCA

## [Kernel PCA 推导](https://www.cnblogs.com/hainingwyx/p/6834671.html)

## 算法原理

部分数据在低维度线性不可分，但映射到高维度时就可以实现线性划分。通过使用核的技巧就可以实现映射xi→ϕxixi→ϕxi，并在映射得到的新的特征空间进行主成分分析。

### 推导方法1[1]

推导建立在PCA的基础上的。需要先掌握PCA。可以参考前一篇[博客](http://www.cnblogs.com/hainingwyx/p/6836323.html)

假设在特征空间数据的均值为：





μ=1n∑i=1nϕ(xi)=0μ=1n∑i=1nϕ(xi)=0



有方差：





C=1n∑i=1nϕ(xi)ϕ(xi)TC=1n∑i=1nϕ(xi)ϕ(xi)T



和PCA相类似， 特征向量为：





Cv=λv(1)(1)Cv=λv



因为不知道ϕϕ的形式是怎么样的，并不能直接通过特征分解求vv。

可以证明vv可以表示成高维特征的线性组合





vj=∑i=1nαjiϕ(xi)vj=∑i=1nαjiϕ(xi)



所以求特征向量等价于求因子αjiαji

通过将C,vC,v的表达式代入(1)中可以得到：





Kαj=nλjαj(2)(2)Kαj=nλjαj



其中KK是一个核函数，k(xi,xj)=ϕ(xi)Tϕ(xi),K≠Ck(xi,xj)=ϕ(xi)Tϕ(xi),K≠C对于特定的数据，可认为是已知的。由(2) $\alpha _j 是是K的特征向量，下面求其约束。注意这里并不是要求其长度为1。特征向量的特征向量，下面求其约束。注意这里并不是要求其长度为1。特征向量v_j$是一个单位向量,
由





vTjvj=1vjTvj=1



代入vjvj有





∑k=1n∑l=1nαjlαjkϕ(xl)Tϕ(xk)=1∑k=1n∑l=1nαjlαjkϕ(xl)Tϕ(xk)=1



即





αTjKαj=1αjTKαj=1



代入(2)得到





λjnαTjαj=1,∀jλjnαjTαj=1,∀j



以上就是其长度约束。

对于新的数据x，它在主成分的投影坐标为





ϕ(x)Tvj=∑i=1nαjiϕ(x)Tϕ(xi)=∑i=1nαjiK(x,xj)ϕ(x)Tvj=∑i=1nαjiϕ(x)Tϕ(xi)=∑i=1nαjiK(x,xj)



由以上投影坐标可以求。

------

一般情况下，特征空间的均值不是0。可以将特征中心化。





ϕ^(xi)=ϕ(xi)−1n∑k=1nϕ(xk)ϕ^(xi)=ϕ(xi)−1n∑k=1nϕ(xk)



相应的核也变成了





K^(xi,xj)=K(xi,xj)−1n∑k=1nK(xi,xk)−1n∑k=1nK(xj,xk)+1n2∑l=1,k=1nK(xl,xk)K^(xi,xj)=K(xi,xj)−1n∑k=1nK(xi,xk)−1n∑k=1nK(xj,xk)+1n2∑l=1,k=1nK(xl,xk)



矩阵形式：





K^(xi,xj)=K−211/nK+11/nK11/nK^(xi,xj)=K−211/nK+11/nK11/n



11/n11/n表示所有元素为1的矩阵。

------

**KPCA的算法流程**

1. 选择一个核
2. 由(3)建立一个归一化核矩阵
3. 求特征值分解





K^αi=λiαiK^αi=λiαi



1. 对于新的数据点在主成分的投影为





yi=∑i=1nαjiK(x,xi),j=1,⋅⋅⋅dyi=∑i=1nαjiK(x,xi),j=1,···d



### 推导方法2[2]

假设数据均值为0时，有协方差矩阵，





C=1nXTX=1N[ϕ(x1),...ϕ(xn)]⎡⎣⎢⎢ϕ(x1)T⋮ϕ(xn)T⎤⎦⎥⎥C=1nXTX=1N[ϕ(x1),...ϕ(xn)][ϕ(x1)T⋮ϕ(xn)T]



XX认为是数据在特征空间的表示。因为不知道ϕϕ的形式，所以希望转换成可以用kernel K表示形式





K=XXT=⎡⎣⎢⎢ϕ(x1)Tϕ(x1)⋮ϕ(xn)Tϕ(x1)………ϕ(x1)Tϕ(xn)⋮ϕ(xn)Tϕ(xn)⎤⎦⎥⎥=⎡⎣⎢⎢κ(x1,x1)⋮κ(xn,x1)………κ(x1,xn)⋮κ(xn,xn)⎤⎦⎥⎥K=XXT=[ϕ(x1)Tϕ(x1)…ϕ(x1)Tϕ(xn)⋮…⋮ϕ(xn)Tϕ(x1)…ϕ(xn)Tϕ(xn)]=[κ(x1,x1)…κ(x1,xn)⋮…⋮κ(xn,x1)…κ(xn,xn)]



从kernel矩阵的特征方程(逆向推理)出发：





XXTu=λuXXTu=λu



两边左乘XTXT，整理得到





XTX(XTu)=λ(XTu)XTX(XTu)=λ(XTu)



可以看出XTuXTu是CC的特征向量，因为其受到其为单位向量的约束，有：





v=1||XTu||XTu=1uTXXTu−−−−−−−−√XTu=1uTλu−−−−−√XTu=1λ−−√XTuv=1||XTu||XTu=1uTXXTuXTu=1uTλuXTu=1λXTu



这里令uu也是单位向量。特征向量还是和XX直接相关，仍然是未知的。

直接考虑在特征空间投影之后的坐标(高中向量知识)：





vTϕ(x′)=(1λ−−√XTu)Tϕ(x′)=1λ−−√uTXϕ(x′)=1λ−−√uT⎡⎣⎢⎢ϕ(x1)T⋮ϕ(xn)T⎤⎦⎥⎥ϕ(x′)=1λ−−√uT⎡⎣⎢⎢κ(x1,x′)⋮κ(xn,x′)⎤⎦⎥⎥vTϕ(x′)=(1λXTu)Tϕ(x′)=1λuTXϕ(x′)=1λuT[ϕ(x1)T⋮ϕ(xn)T]ϕ(x′)=1λuT[κ(x1,x′)⋮κ(xn,x′)]



最想要知道的正好是可以计算的。

------

**题外话**
特征空间的向量vv可以用特征空间的数据线性表示。因为





v=1λ−−√XTu=1λ−−√[ϕ(x1),...ϕ(xn)]u=1λ−−√∑i=1nuiϕ(xi)=∑i=1nαiϕ(xi)v=1λXTu=1λ[ϕ(x1),...ϕ(xn)]u=1λ∑i=1nuiϕ(xi)=∑i=1nαiϕ(xi)



------

**KPCA的算法流程**

1. 选择一个核
2. 建立一个归一化核矩阵
3. 求特征值分解





Ku=λuKu=λu



1. 对于新的数据点在主成分的投影为





v=1λ−−√uT⎡⎣⎢⎢κ(x1,x′)⋮κ(xn,x′)⎤⎦⎥⎥v=1λuT[κ(x1,x′)⋮κ(xn,x′)]



## 参考文献

[1]. http://www.cs.haifa.ac.il/~rita/uml_course/lectures/KPCA.pdf
[2]. https://www.youtube.com/watch?v=G2NRnh7W4NQ