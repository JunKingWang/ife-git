/*TRA LEF：向屏幕的左侧移动一格，方向不变
TRA TOP：向屏幕的上面移动一格，方向不变
TRA RIG：向屏幕的右侧移动一格，方向不变
TRA BOT：向屏幕的下面移动一格，方向不变
MOV LEF：方向转向屏幕左侧，并向屏幕的左侧移动一格
MOV TOP：方向转向屏幕上面，向屏幕的上面移动一格
MOV RIG：方向转向屏幕右侧，向屏幕的右侧移动一格
MOV BOT：方向转向屏幕下面，向屏幕的下面移动一格*/

function $(id) {
	return document.getElementById(id);
}

function traLeft() {
	var left = parseInt($("block").style.left);
	if(left == -255) {
		return;
	}
	$("block").style.left = (left - 51) + "px";
}

function traTop() {
	var top = parseInt($("block").style.top);
	if(top == -255) {
		return;
	}
	$("block").style.top = (top - 51) + "px";
}

function traRig() {
	var left = parseInt($("block").style.left);	
	if(left == 204) {
		return;
	}
	$("block").style.left = (left + 51) + "px";
}

function traBot() {
	var top = parseInt($("block").style.top);
	if(top == 204) {
		return;
	}
	$("block").style.top = (top + 51) + "px";
}

function movLeft() {
	$("block").style.transform = "rotate(-90deg)";
	traLeft();
}

function movTop() {
	$("block").style.transform = "rotate(0deg)";
	traTop();
}

function movRig() {
	$("block").style.transform = "rotate(90deg)";
	traRig();
}

function movBot() {
	$("block").style.transform = "rotate(180deg)";
	traBot();
}

function createTbody(num) {
	for(var i = 0; i < num; i++) {
		var trNode = document.createElement("tr");
		for(var j = 0; j < num; j++) {
			var tdNode = document.createElement("td");
			tdNode.setAttribute("id", i + "d" + j);
			trNode.appendChild(tdNode);
		}
		$("tbody").appendChild(trNode);
	}
	$("5d5").innerHTML = "<div id='block'><div id='blockBlue'></div></div>";
	$("block").style.top = "0px";
	$("block").style.left = "0px";
}

createTbody(10);