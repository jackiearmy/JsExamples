
var dataArr;

var script = document.createElement("script");

function GetData(data) {
	dataArr = data;
	//console.log(data);

}

function _getReduceValue() {
	if (Object.prototype.toString.call(arr) === "[object Array]") {
		return arr.reduce()
	}

}

script.src = "https://demos.telerik.com/kendo-ui/service/products?callback=GetData";

document.head.appendChild(script);

window.onload = function () {
	var dataArr = window.dataArr;
	var div = document.getElementById("testdiv");
	var childeDivStr = "";
	dataArr.forEach(function (val) {
		var item = val;
		var discontinued = item && item.Discontinued || "";
		var productID = item && item.ProductID || "";
		var productName = item && item.ProductName || "";
		var unitPrice = item && item.UnitPrice || "";
		var unitsInStock = item && item.UnitsInStock || "";
		var childDivStr = "<div class='childitem'><div class='itemspan'><span>discontinued</span><span class='spanitemvale'>" + discontinued + "</span></div>" +
			"<div class='itemspan'><span>productID</span><span class='spanitemvale'>" + productID + "</span></div>" +
			"<div class='itemspan'><span>productName</span><span class='spanitemvale'>" + productName + "</span></div>" +
			"<div class='itemspan'><span>unitPrice</span><span class='spanitemvale'>" + unitPrice + "</span></div>" +
			"<div class='itemspan'><span>unitsInStock</span><span class='spanitemvale'>" + unitsInStock + "</span></div></div>";
		childeDivStr += childDivStr;
	})
	if (childeDivStr.length > 0) {
		//div.innerHTML = childeDivStr;


		// var promise = new Promise()
		let testJson = `{
			"name": "a",
			"children": [{
				"name": "b",
				"children": [{
					"name": "c",
					"children": []
				}, {
					"name": "d",
					"children": []
				}]
			}, {
				"name": "e",
				"children": [{
					"name": "f",
					"children": []
				}, {
					"name": "g",
					"children": []
				}]
			}]
		}`
		let jObject = JSON.parse(testJson);
		var obj = DeepFirst(jObject);
		var obj1 = BreadthFirst(jObject);
		var arr = Object.values(jObject);
		// console.log(obj1);

		let s = "{([][])}"
		//console.log("@@",isValidParentheses(s))
	}
};

window.addEventListener('hashchange', function (e) {
	console.log('The hash has changed!', e);
}, false);

//深度优先
function DeepFirst(data) {
	let result = [];
	//console.log(data);
	let forEachData = function (data) {
		result.push(data.name);
		let child = data.children;
		child && child.length > 0 &&
			child.forEach(forEachData);
	};
	forEachData(data);
	return result;
}

//广度优先
function BreadthFirst(data) {
	let result = [];
	let queue = data;
	//console.log(data.length);
	while (queue.length > 0) {
		[...queue].forEach((child) => {
			queue.shift();
			result.push(child.name);
			child.children && queue.push([...child.children])
		})
	}
	return result;
}

///判断括号的有效
function isValidParentheses(s) {
	const stack = [];
	for (let i = 0; i < s.length; i++) {
		switch (s[i]) {
			case "(":
			case "[":
			case "{":
				stack.push(s[i]);
				break;
			case ")":
				if (stack.length === 0 || stack.pop() !== "(")
					return false;
				break;
			case "]":
				if (stack.length === 0 || stack.pop() !== "[")
					return false;
				break;
			case "}":
				if (stack.length === 0 || stack.pop() !== "{")
					return false;
				break;
		}
	}
	return stack.length === 0;
}

//[{()}]
var isValid = function (s) {
	// 创建栈存储左括号
	const stack = [],
		// 利用obj维护对应关系
		obj = {
			')': '(',
			']': '[',
			'}': '{'
		}
	// 遍历字符串
	for (let i = 0; i < s.length; i++) {
		switch (s[i]) {
			// 如果为左括号，入栈
			case '(':
			case '[':
			case '{':
				stack.push(s[i])
				break;
			// 如果为右括号，判断当前栈顶字符是否是其对应左括号，如果不是，返回 false
			case ')':
			case ']':
			case '}':
				if (stack.length === 0 || stack.pop() !== obj[s[i]]) return false;
				break;
		}
	}
	// 代码来到这里遍历过程中所有右括号都匹配到了对应的左括号
	// 此时如果栈为不为空，说明左括号存在多余情况，反之说明输入字符串有效
	return stack.length === 0
};