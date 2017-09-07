var arr = [];
// beforeTree middleTree lastTree
window.onload = function() {
	debugger;
	var rootNode = document.getElementById("main");
	document.getElementById("ergodic").onclick = function() {
		arr = [];
		ergodicTree(rootNode);
		showNode(arr);
	};

	document.getElementById("search").onclick = function() {
		reset(arr);
		arr = [];
		ergodicTree(rootNode);
		searchNode(arr);
	};
}

function ergodicTree(node) {
	debugger;
	if(node) {
		arr.push(node);
		if(node.childElementCount > 0) {
			for(var i = 0; i < node.childElementCount; i++) {
				ergodicTree(node.children[i]);
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

function searchNode(arr) {
	var i = 0;
	var inputStr = document.getElementsByName("search")[0].value;
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
}