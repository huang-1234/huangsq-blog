# 数组去重Full

## 1. ES6中的new Set()方法

```js
function dRemoval(arr){return Array.from(new Set(arr));}
```

Set是ES6中一种新的数据类型，类似于数组，但是其成员都是唯一的，没有重复值。
通过new Set()将数组转化为没有重复值的Set类型；然后通过Array.from将Set类型转回数组类型。

## 2. indexOf()方法

```js
function dRemoval(arr){
	let newArr = [];
	for (let i in arr){
		if(newArr.indexOf(arr[i]) === -1){
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
```

对原数组进行遍历，若新数组找不到原数组的成员，则indexOf()方法的值为-1，接着用push将其加入新的数组中。

## 3. filter()方法

```js
function dRemoval(arr){
	let newArr = arr.filter((item, index, arr)=>
arr.indexOf(item) === index);
	return newArr;
}
```

filter()是数组的遍历方法，参数为一个函数，返回一个参数函数返回值为true的成员组成的数组。即只有原数组中的成员满足arr.indexOf(item) === index才将其加入到新的数组中。

## 4. includes()方法

```js
function duRemoval(arr){
	let newArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (! newArr.includes(arr[i])){
			newArr.push(arr[i]);
		}
	}
	return newArr;
}	
```

类似indexOf()方法，只是通过数组的includes()方法判断成员是否在新数组中存在。

## 5. 双重遍历方法

```js
function duplicateRemoval4(arr){
	for (let i = 0; i < arr.length; i++) {
		for (let j = i+1; j < arr.length; j++) {
			if(arr[i] === arr[j]){
				arr.splice(j, 1);
				j--;
			}
		}
	}
	return arr;
}
```