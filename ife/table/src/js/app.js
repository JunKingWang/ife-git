import ife31Data from './ife31Data.js';
import '../css/main.css';
import addCheckBoxCtrl from './checkBox.js';
import {selectedLength, showDataAction, addTableHandler} from './table.js';

window.onload = function() {
	init();
	hashchangeAction();
}

function init() {
	var selectGroup = document.getElementsByClassName("select-group");
	for(var i = 0; i < selectGroup.length; i++) {
		addCheckBoxCtrl(selectGroup[i], selectGroup[i].getAttribute("id"), ife31Data.selectData[i]);
	}

	addTableHandler();
}

function hashchangeAction() {
	var data = {
	    all: [],
	    region: [],
	    product:[]
	}
	document.getElementById("select-container").querySelectorAll("input").forEach(function(item){
		item.checked = false;
	})
	window.location.hash.split("").forEach(function(item) {
		if(item == 0) {
			data.all.push(item);
			document.getElementById("selectAll").querySelector("input").checked = true;
		} else if(item == 1 || item == 2 || item == 3) {
			data.region.push(item);
			document.getElementById("selectProduct").querySelectorAll("input")[item - 1].checked = true;
		} else if(item == 4 || item == 5 || item == 6) {
			data.product.push(item);
			document.getElementById("selectRegion").querySelectorAll("input")[item - 4].checked = true;
		}
	})
	ife31Data.selectChoosed = data;
	showDataAction();
}

window.addEventListener("hashchange", hashchangeAction, false);










