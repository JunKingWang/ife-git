// import ife31Data from './ife31Data';
selectChoosed = [];

window.onload = function() {
	$ = function(id) {
		return document.getElementById(id);
	}
	init();
}

function init() {
	var selectGroup = document.getElementsByClassName("select-group");
	for(var i = 0; i < selectGroup.length; i++) {
		addCheckBoxCtrl(selectGroup[i], selectGroup[i].getAttribute("id"), selectData[i]);
	}

	theadData.forEach(function(item) {
		var tempHeadNode = document.createElement("th");
		tempHeadNode.innerText = item
		$("tHead").append(tempHeadNode);
	});
}

function showDataAction() {
	$("tbody").innerHTML = "";
	if(selectChoosed.length == 0) {
		return;
	}
	var showData = filterData(selectChoosed);
	showTableData(showData);
}

function filterData(dataArr) {
	var showData = sourceData;
	//all
	if(dataArr.indexOf("0") > -1) {
		return showData;
	}

	var showData = [];
	//region
	var regionDataArr = [];
	selectData[1].forEach(function(item) {
		if(selectChoosed.indexOf(item.value) > -1) {
			regionDataArr.push(item.text);
		}
	});
	if(regionDataArr.length > 0) {
		regionDataArr.forEach(function(val) {
			sourceData.forEach(function(item) {
				if(item.region == val) {
					showData.push(item);
				}
			});
		});
	} else {
		showData = sourceData;
	}

	//product
	var productDataArr = [];
	selectData[2].forEach(function(item) {
		if(selectChoosed.indexOf(item.value) > -1) {
			productDataArr.push(item.text);
		}
	});
	if(productDataArr.length > 0) {
		var showData1 = [];
		productDataArr.forEach(function(val) {
			showData.forEach(function(item) {
				if(item.product == val) {
					showData1.push(item);
				}
			});
		});
		return showData1;
	} else {
		return showData;
	}
}

function showTableData(data) {
	data.forEach(function(item) {
		var tempTrNode = document.createElement("tr");
		var tempTdNode = document.createElement("td");
		tempTdNode.innerText = item.product;
		tempTrNode.append(tempTdNode);
		tempTdNode = document.createElement("td");
		tempTdNode.innerText = item.region;
		tempTrNode.append(tempTdNode);
		for(let i = 0; i < item.sale.length; i++) {
			tempTdNode = document.createElement("td");
			tempTdNode.innerText = item.sale[i];
			tempTrNode.append(tempTdNode);
		}
		$("tbody").append(tempTrNode);
	});
}

function addCheckBoxCtrl(parent, name, arr) {
	for(var i = 0; i < arr.length; i++) {
		var tempInput = document.createElement("input");
		tempInput.setAttribute("type", "checkBox");
		tempInput.setAttribute("value", arr[i].value);
		tempInput.setAttribute("name", name);
		var tempText = document.createElement("span");
		tempText.innerText = arr[i].text;
		var tempBr = document.createElement("br");
		parent.append(tempInput);
		parent.append(tempText);
		parent.append(tempBr);
		EventUtil.addHandlers(tempInput, 'click', function(event) {
			if(event.target.value == 0) {
				selectAllAction(event);
			} else {
				selectAction(event);
			}
		});
	}
}

function selectAction(event) {
	if(event.target.checked) {
		pushSelectChoosed(event.target.getAttribute("value"));
		if(selectChoosed.length >= 6) {
			$("selectAll").querySelector("input").checked = true;
			pushSelectChoosed("0");
		}
		showDataAction();
	} else {
		spliceSelectChoosed(event.target.getAttribute("value"));
		spliceSelectChoosed("0");
		$("selectAll").querySelector("input").checked = false;
		showDataAction();
	}
}

function selectAllAction(event) {
	if(event.target.checked) {
		pushSelectChoosed("0");
		changeBySelect(document.getElementsByName("selectProduct"), true);
		changeBySelect(document.getElementsByName("selectRegion"), true);
		showDataAction();
	} else {
		spliceSelectChoosed("0");
		changeBySelect(document.getElementsByName("selectProduct"), false);
		changeBySelect(document.getElementsByName("selectRegion"), false);
		showDataAction();
	}
}

function changeBySelect(target, select) {
	target.forEach(function(item) {
		if(select) {
			item.checked = true;
			pushSelectChoosed(item.getAttribute("value"));
		} else {
			item.checked = false;
			spliceSelectChoosed(item.getAttribute("value"));
		}
	});
}

function pushSelectChoosed(target) {
	var i = selectChoosed.indexOf(target);
	if(i < 0) {
		selectChoosed.push(target)
	}
}

function spliceSelectChoosed(target) {
	var i = selectChoosed.indexOf(target);
	if(i > -1) {
		selectChoosed.splice(i, 1);
	}
}

