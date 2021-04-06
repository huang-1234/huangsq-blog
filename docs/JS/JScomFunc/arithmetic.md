# javascript中解析四则运算表达式的算法和示例

在编写代码时我们有时候会碰到需要自己解析四则运算表达式的情况，本文简单的介绍使用JavaScript实现对简单四则运算表达式的解析。

**一、熟悉概念**

**中缀表示法**（或中缀记法）是一个通用的算术或逻辑公式表示方法， 操作符是以中缀形式处于操作数的中间（例：3 + 4）。也就是我们最常用的算术表达式，中缀表达式对于人类来说比较容易理解，但是不易于计算机解析。

**逆波兰表示法**（Reverse Polish notation，RPN，或逆波兰记法），是一种是由波兰数学家扬·武卡谢维奇1920年引入的数学表达式方式，在逆波兰记法中，所有操作符置于操作数的后面，因此也被称为后缀表示法。逆波兰记法不需要括号来标识操作符的优先级。逆波兰表示法容易使用堆栈结构对表达式进行解析并计算，所以，这里我们解析四则元素表达式，是先从中缀表达式，转换为逆波兰表达式。然后再计算值。

## **二、转换流程**

中缀表达式转换为后缀表达式（调度场算法）

1.输入队列弹出一个记号
2.如果记号为数字，添加到输出队列中
3.如果是一个操作符（+-*/）则比较它与输出堆栈中栈顶的操作符，如果优先级小于或等于栈顶的操作符，那么将栈顶的操作符弹出并加入输出队列（循环，直到上述条件不满足），最后将本次的操作符压入堆栈。
4.如果是一个左括号，压入堆栈
5.如果是一个右括号，从栈中不断的弹出操作符，并加入输出队列，知道栈顶的元素为左括号。弹出左括号，不加入输出队列。如果没有发现左括号，说明原来的表达式中括号不对称，有错误。
6.如果输入队列为空，而栈中尚有操作符时，如果栈顶的操作符为左括号，则说明原表达式有不匹配的括号。将栈中的操作符逐个弹出，加入输出队列。
7.完成

## 三、转换代码实现

```js
function isOperator(value){
	var operatorString = "+-*/()";
	return operatorString.indexOf(value) > -1
}

function getPrioraty(value){
	switch(value){
		case '+':
		case '-':
			return 1;
		case '*':
		case '/':
			return 2;
		default:
			return 0;
	}
}

function prioraty(o1, o2){
	return getPrioraty(o1) <= getPrioraty(o2);
}

function dal2Rpn(exp){
	var inputStack = [];
	var outputStack = [];
	var outputQueue = [];

	for(var i = 0, len = exp.length; i < len; i++){
		var cur = exp[i];
		if(cur != ' ' ){
			inputStack.push(cur);
		}
	}
	console.log('step one');
	while(inputStack.length > 0){
		var cur = inputStack.shift();
		if(isOperator(cur)){
			if(cur == '('){
				outputStack.push(cur);
			}else if(cur == ')'){
				var po = outputStack.pop();
				while(po != '(' && outputStack.length > 0){
					outputQueue.push(po);
					po = outputStack.pop();
				}
				if(po != '('){
					throw "error: unmatched ()";
				}
			}else{
				while(prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0){
					outputQueue.push(outputStack.pop());
				}
				outputStack.push(cur);
			}
		}else{
			outputQueue.push(new Number(cur));
		}
	}
	console.log('step two');
	if(outputStack.length > 0){
		if(outputStack[outputStack.length - 1] == ')' || outputStack[outputStack.length - 1] == '('){
			throw "error: unmatched ()";
		}
		while(outputStack.length > 0){
			outputQueue.push(outputStack.pop());
		}
	}
	console.log('step three');
	return outputQueue;

}

console.log(dal2Rpn('1 + 2'));
console.log(dal2Rpn('1 + 2 + 3'));
console.log(dal2Rpn('1 + 2 * 3'));
console.log(dal2Rpn('1 + 2 * 3 - 4 / 5'));
console.log(dal2Rpn('( 1 + 2 )'));

console.log(dal2Rpn('( 1 + 2 ) * ( 3 - 4 ) / 5'));
console.log(dal2Rpn('( 1 + 2 ) * (( 3 - 4 ) / 5)'));
```

**四、逆波兰表达式求值**

1.从输入队列中弹出一个记号
2.如果是操作数，加入输出堆栈
3.如果是一个操作符，从输出堆栈中弹出两个操作数并进行计算，并将计算得到的值压入输出堆栈。
4.循环操作，如果输入队列为空，且输出堆栈只有一个数则这个数为结果，否则是出现了多余的操作数。

**五、计算代码**

```js
function evalRpn(rpnQueue){
	var outputStack = [];
	while(rpnQueue.length > 0){
		var cur = rpnQueue.shift();

		if(!isOperator(cur)){
			outputStack.push(cur);
		}else{
			if(outputStack.length < 2){
				throw "unvalid stack length";
			}
			var sec = outputStack.pop();
			var fir = outputStack.pop();

			outputStack.push(getResult(fir, sec, cur));
		}
	}

	if(outputStack.length != 1){
		throw "unvalid expression";
	}else{
		return outputStack[0];
	}
}
```

**六、结语**

逆波兰表示法，在初次接触的时候感觉不太习惯，但是熟悉之后，会发现，其实思路特别简单，不像中缀表示法，还有各种优先级啊，还有小括号之类的，逻辑特别麻烦，还是逆波兰表示法比较简洁，完全不用考虑优先级，也没用小括号，中括号还有大括号搅局。

**您可能感兴趣的文章:**

- [JS使用Dijkstra算法求解最短路径](https://www.jb51.net/article/154806.htm)
- [javascript算法题 求任意一个1-9位不重复的N位数在该组合中的大小排列序号](https://www.jb51.net/article/30857.htm)
- [javascript算法题：求任意一个1-9位不重复的N位数在该组合中的大小排列序号](https://www.jb51.net/article/63275.htm)
- [JavaScript求一组数的最小公倍数和最大公约数常用算法详解【面向对象，回归迭代和循环】](https://www.jb51.net/article/139641.htm)
- [javascript使用递归算法求两个数字组合功能示例](https://www.jb51.net/article/101858.htm)
- [JavaScript实现数组全排列、去重及求最大值算法示例](https://www.jb51.net/article/144691.htm)
- [JS使用Prim算法和Kruskal算法实现最小生成树](https://www.jb51.net/article/154801.htm)
- [JS实现计算小于非负数n的素数的数量算法示例](https://www.jb51.net/article/156955.htm)
- [JavaScript采用递归算法计算阶乘实例](https://www.jb51.net/article/70606.htm)
- [JavaScript实现的一个计算数字步数的算法分享](https://www.jb51.net/article/58232.htm)
- [JS求解两数之和算法详解](https://www.jb51.net/article/185666.htm)