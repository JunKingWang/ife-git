import {EventUtil, $} from './eventUtil.js';
import ife31Data from './ife31Data.js';
import {selectedLength, showDataAction} from './table.js';

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
			// item.checked = true;
			pushSelectChoosed(item.getAttribute("value"));
		} else {
			// item.checked = false;
			spliceSelectChoosed(item.getAttribute("value"));
		}
	});
}

function pushSelectChoosed(target) {
	var i;
	if(target == 0) {
		i = ife31Data.selectChoosed.all.indexOf(target)
		if(i < 0) {
			ife31Data.selectChoosed.all.push(target);
			window.location.hash += target;
		}
	} else if(target == 1 || target == 2 || target == 3) {
		i = ife31Data.selectChoosed.region.indexOf(target)
		if(i < 0) {
			ife31Data.selectChoosed.region.push(target);
			window.location.hash += target;
		}
	} else {
		i = ife31Data.selectChoosed.product.indexOf(target)
		if(i < 0) {
			ife31Data.selectChoosed.product.push(target);
			window.location.hash += target;
		}
	}
}

function spliceSelectChoosed(target) {
	var i;
	if(target == 0) {
		i = ife31Data.selectChoosed.all.indexOf(target)
		if(i > -1) {
			ife31Data.selectChoosed.all.splice(i, 1);
			window.location.hash = window.location.hash.replace(target,"")
		}
	} else if(target == 1 || target == 2 || target == 3) {
		i = ife31Data.selectChoosed.region.indexOf(target)
		if(i > -1) {
			ife31Data.selectChoosed.region.splice(i, 1);
			window.location.hash = window.location.hash.replace(target,"")
		}
	} else {
		i = ife31Data.selectChoosed.product.indexOf(target)
		if(i > -1) {
			ife31Data.selectChoosed.product.splice(i, 1);
			window.location.hash = window.location.hash.replace(target,"")
		}
	}
}

function selectAction(event) {
	if(event.target.checked) {
		pushSelectChoosed(event.target.getAttribute("value"));
		if(selectedLength() >= 6) {
			// $("selectAll").querySelector("input").checked = true;
			pushSelectChoosed("0");
		}
		// showDataAction();
	} else {
		spliceSelectChoosed(event.target.getAttribute("value"));
		spliceSelectChoosed("0");
		// $("selectAll").querySelector("input").checked = false;
		// showDataAction();
	}
}

export default addCheckBoxCtrl;