var arr = [];
var rootNode = document.getElementById("root");
//前序遍历 根-左-右
function beforeTree(node) {
	debugger;
	if(node){
		//访问根节点
		if(node.getAttribute("id") != "root") {
			arr.push(node);
		}
		beforeTree(node.firstElementChild);
		beforeTree(node.lastElementChild);
	}
}

//中序遍历 左-右-根
function middleTree(node) {
	debugger;
	if(node){
        middleTree(node.firstElementChild);//先访问左子树
        if(node.getAttribute("id") != "root") {
        	arr.push(node);
        }
        middleTree(node.lastElementChild);//最后访问右子树
    }
}

//后序遍历 根-左-右
function lastTree(node) {
	debugger;
	if(node){
		lastTree(node.firstElementChild);
		lastTree(node.lastElementChild);
		if(node.getAttribute("id") != "root") {
			arr.push(node);
		}
	}
}

//显示遍历，setInterval,别忘记要clear
function showNode(arr) {
	debugger;
	var i = 0;
	arr[i].style.backgroundColor = "red";
	var showNodeInterval = setInterval(function() {
		debugger;
		i++;
		if(i == arr.length) {
			clearInterval(showNodeInterval);
			arr[i-1].style.backgroundColor = "#fff";
			return;
		}
		arr[i-1].style.backgroundColor = "#fff";
		arr[i].style.backgroundColor = "red";
	}, 1000);
}

window.onload = function() {
	debugger;
	document.getElementById("beforeTree").onclick = function() {
		arr = [];
		beforeTree(rootNode);
		showNode(arr);
	};
	document.getElementById("middleTree").onclick = function() {
		arr = [];
		middleTree(rootNode);
		showNode(arr);
	};
	document.getElementById("lastTree").onclick = function() {
		arr = [];
		lastTree(rootNode);
		showNode(arr);
	};
}
