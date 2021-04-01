import numpy as np

# matplotlib 是python的主要科学绘图库
import matplotlib.pyplot as plt
xarr = np.linspace(-10,10,100)
print(xarr)

yarr = np.sin(xarr)
plt.plot(xarr,yarr,marker='x')