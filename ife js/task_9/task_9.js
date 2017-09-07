var arr = [];
// beforeTree middleTree lastTree
window.onload = function() {
	debugger;
	var rootNode = document.getElementById("main");
	var nodes = document.getElementsByClassName("main_1");
	var arrNodes = Array.prototype.slice.call(nodes);
	var inputStr = document.getElementsByName("search")[0];

	document.getElementById("ergodic").onclick = function() {
		arr = [];
		ergodicTree(rootNode);
		showNode(arr);
	};

	document.getElementById("search").onclick = function() {
		reset(arr);
		ergodicTree(rootNode);
		searchNode(arr, inputStr.value);
	};

	rootNode.onclick = function(event) {
		reset(arr);
		chooseNode(event.target);
	};

	document.getElementById("delete").onclick = function() {
		deleteNodes(arrNodes);
	};

	document.getElementById("insert").onclick = function() {
		insertNodes(arrNodes, inputStr.value);
	}
}

function ergodicTree(node) {
	debugger;
	if(node) {
		arr.push(node);
		if(node.childElementCount > 0) {
			for(var i = 0; i < node.childElementCount; i++) {
				arguments.callee(node.children[i]);
			}
		}
	}
}

function showNode(arr) {
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
	},1000);
}

function searchNode(arr, inputStr) {
	var i = 0;
	arr[i].style.backgroundColor = "red";
	var showNodeInterval = setInterval(function() {
		debugger;
		if(arr[i].childNodes[0].nodeValue.trim() == inputStr) {
			clearInterval(showNodeInterval);
			alert("Searching successfully!");
			return;
		}
		i++;
		if(i == arr.length) {
			clearInterval(showNodeInterval);
			arr[i-1].style.backgroundColor = "#fff";
			alert("Nothing is found!");
			return;
		}
		arr[i-1].style.backgroundColor = "#fff";
		arr[i].style.backgroundColor = "red";
	},1000);
}

function reset(arr) {
	if(arr.length == 0) {
		return;
	}
	arr.forEach(function(val) {
		val.style.backgroundColor = "#fff";
	});
	arr = [];
}

function chooseNode(target) {
	// console.log(target);
	target.style.backgroundColor = "red";

}

function deleteNodes(arr) {
	debugger;
	arr.forEach(function(val) {
		if(val.style.backgroundColor == "red") {
			val.remove(this);
		}
	});
}

function insertNodes(arr, inputStr) {
	debugger;
	var node = document.createElement("div");
	var nodeText = document.createTextNode(inputStr);
	node.appendChild(nodeText);
	node.setAttribute("class", "main_1");
	arr.forEach(function(val) {
		if(val.style.backgroundColor == "red") {
			val.appendChild(node);
		}
	});
}