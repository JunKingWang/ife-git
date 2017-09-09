var direction = "";

function $(id) {
	return document.getElementById(id);
}

//动态生成正方形棋盘
function createTable(num) {
	for(var i = 0; i < num; i++) {
		var trNode = document.createElement("tr");
		for(var j = 0; j < num; j++) {
			var tdNode = document.createElement("td");
			var id = (i+1).toString() + "d" + (j+1).toString();
			tdNode.setAttribute("id", id);
			trNode.appendChild(tdNode);
		}
		$("tbody").appendChild(trNode);
	}
}

function start() {
	$("5d5").className = "choose";
	var blueNode = "<div id='blueNode'></div>";
	$("5d5").innerHTML = blueNode;
	direction = "top";
}

function orderGo() {
	debugger;
	var parentNode = $("blueNode").parentNode;
	var idarr = $("blueNode").parentNode.id.split("d");
	if(direction == "top") {
		if(idarr[0] == "1") {
			return;
		}
		parentNode.style.backgroundColor = "#fff";
		var id = (idarr[0] * 1 - 1) + "d" + idarr[1];
		$(id).appendChild($("blueNode"));
		$(id).style.backgroundColor  = "red";
	} else if(direction == "left") {
		if(idarr[1] == "1") {
			return;
		}
		parentNode.style.backgroundColor = "#fff";
		var id = idarr[0] + "d" + (idarr[1] * 1 - 1);
		$(id).appendChild($("blueNode"));
		$(id).style.backgroundColor  = "red";
	} else if(direction == "right") {
		debugger;
		if(idarr[1] == "10") {
			return;
		}
		parentNode.style.backgroundColor = "#fff";
		var id = idarr[0] + "d" + (idarr[1] * 1 + 1)
		$(id).appendChild($("blueNode"));
		$(id).style.backgroundColor  = "red";
	} else {
		if(idarr[0] == "10") {
			return;
		}
		parentNode.style.backgroundColor = "#fff";
		var id = (idarr[0] * 1 + 1) + "d" + idarr[1];
		$(id).appendChild($("blueNode"));
		$(id).style.backgroundColor  = "red";
	}
}

function turnLeft() {
	if(direction == "top") {
		toLeft();
	} else if(direction == "left") {
		toBottom();
	} else if(direction == "right") {
		toTop();
	} else {
		toRight();
	}
}

function turnRight() {
	if(direction == "top") {
		toRight();
	} else if(direction == "left") {
		toTop();		
	} else if(direction == "right") {
		toBottom();		
	} else {
		toLeft();
	}
}

function toRight() {
	debugger;
	$("blueNode").style.width = "10px";
	$("blueNode").style.height = "50px";
	$("blueNode").style.marginTop = "0px";
	$("blueNode").style.marginLeft = "40px"
	direction = "right";	
}

function toTop() {
	debugger;
	$("blueNode").style.width = "50px";
	$("blueNode").style.height = "10px";
	$("blueNode").style.marginTop = "-25px";
	$("blueNode").style.marginLeft = "0px";
	direction = "top";
}

function toBottom() {
	debugger;
	$("blueNode").style.width = "50px";
	$("blueNode").style.height = "10px";
	$("blueNode").style.marginTop = "40px";
	$("blueNode").style.marginLeft = "0px";
	direction = "bottom";
}

function toLeft() {
	debugger;
	$("blueNode").style.width = "10px";
	$("blueNode").style.height = "50px";
	$("blueNode").style.marginTop = "0px";
	direction = "left";
}

function turnBack() {
	debugger;
	if(direction == "top") {
		$("blueNode").style.marginTop = "40px";
		direction = "bottom";
	} else if(direction == "left") {
		$("blueNode").style.marginLeft = "40px";
		direction = "right";
	} else if(direction == "right") {
		$("blueNode").style.marginLeft = "0px";
		direction = "left";
	} else {
		$("blueNode").style.marginTop = "-25px";
		direction = "top";
	}
}

createTable(10);