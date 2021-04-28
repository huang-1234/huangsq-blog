# 数学

## 导数

设 $y = f(x)$ 在点 $x_0$ 的某个邻域内有定义，当自变量 x 在 $x_0$ 处有增量 $\Delta x$ ，$(x_0 + \Delta x)$ 也在该邻域内时，相应地函数取得增量 $y=f(x_0+\Delta x)-f(x0))$ ；如果 $\Delta y$ 与 $\Delta x$ 之比当 $\Delta x \to 0$  时极限在，则称函数 $y=f(x)$ 在点 $x_0$ 处可导，并称这个极限为函数 $y=f(x)$ 在点 $x_0$ 处的导数，记作 $f’(x_0)$，即：
$$
f'(x_0) = \underset{\Delta x \to 0}{lim} \frac{\Delta y}{\Delta x} = \underset{\Delta x \to 0}{lim}\frac{f(x_0 +\Delta x) - f(x_0)}{\Delta x}
$$

## 几何意义

函数 $y=f(x)$ 在 $x_0$ 点的导数 $f'(x_0)$ 的几何意义：表示函数曲线在点 $P_0(x_0, f(x_0))$ 处的切线的斜率。

## 常用公式

| **函数**   | **原函数**     | **导函数**                    |
| ---------- | -------------- | ----------------------------- |
| 常函数     | $y=C$          | $y'=0$                        |
| 指数函数   | $y=a^x$        | $y’=a^x\ln a$                 |
|            | $y= e^x$       | $y’=e^x$                      |
| 幂函数     | $y=x^n$        | $y’=nx^{n-1}$                 |
| 对数函数   | $y=\log_ax$    | $y'=\frac{1}{x\ln a}$         |
|            | $y=\ln x$      | $y'=\frac{1}{x}$              |
| 正弦函数   | $y=\sin x$     | $y’=\cos x$                   |
| 余弦函数   | $y=\cos x$     | $y'=-\sin x$                  |
| 正切函数   | $y=\tan x$     | $y'=\sec ^2 x$                |
| 余切函数   | $y=\cot x$     | $y'=-\csc ^2 x$               |
| 正割函数   | $y=\sec x$     | $y'=\tan x\sec x$             |
| 余割函数   | $y=\csc x$     | $y'=-\csc x\cot x$            |
| 反正弦函数 | $y=\arcsin x$  | $y'=\frac{1}{\sqrt{1 - x^2}}$ |
| 反余弦函数 | $y=\arccos x$  | $y'=-\frac{1}{\sqrt{1-x^2}}$  |
| 反正切函数 | $y=\arctan x$  | $y'=\frac{1}{1+x^2}$          |
| 反余切函数 | $y=arccot \ x$ | $y'=-\frac{1}{1+x^2}$         |
| 双曲线函数 | $y=sh \ x$     | $y'=ch \ x$                   |

## 导数的四则运算

$$
(u \pm v)' = u' \pm v' \\
(uv)' = u'v + uv' \\
(\frac{u}{v})' = \frac{u'v - uv'}{v^2}
$$

