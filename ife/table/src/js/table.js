import {EventUtil, $} from './eventUtil.js';
import ife31Data from './ife31Data.js';

function addTableHead(data) {
	var showHeadArr = [];
	var productFlag = true;
	if(data.region.length == 1  && data.product.length != 1) {
		showHeadArr.push(ife31Data.theadData[1]);
		showHeadArr.push(ife31Data.theadData[0]);
		for(let i = 2; i < ife31Data.theadData.length; i++) {
			showHeadArr.push(ife31Data.theadData[i]);
		}
		productFlag = false;
	} else {
		showHeadArr = ife31Data.theadData;
	}
	showHeadArr.forEach(function(item) {
		var tempHeadNode = document.createElement("th");
		tempHeadNode.innerText = item;
		$("tHead").append(tempHeadNode);
	});
	return productFlag;
}

function showTableData(data, productFlag) {
	data.forEach(function(item) {
		var tempTrNode = document.createElement("tr");
		var tempTdNode = document.createElement("td");
		tempTdNode.innerText = item.name;
		tempTdNode.setAttribute("rowspan", item.value.length);
		tempTrNode.append(tempTdNode);
		item.value.forEach(function(val, index) {
			if(index != 0) {
				tempTrNode = document.createElement("tr");
			}
			tempTdNode = document.createElement("td");
			tempTdNode.innerText = val.item;
			tempTrNode.append(tempTdNode);
			for(let i = 0; i < val.sale.length; i++) {
				tempTdNode = document.createElement("td");
				var spanNode = document.createElement("span");
				spanNode.innerText = val.sale[i];
				tempTdNode.append(spanNode);
				tempTdNode.setAttribute("class", "monthData");
				if(productFlag) {
					tempTdNode.setAttribute("data-region", val.item);
					tempTdNode.setAttribute("data-product", item.name);
					tempTdNode.setAttribute("data-month", i);
				} else {
					tempTdNode.setAttribute("data-region", item.name);
					tempTdNode.setAttribute("data-product", val.item);
					tempTdNode.setAttribute("data-month", i);
				}
				var tempTdDiv = document.createElement("div");
				tempTdNode.append(tempTdDiv);
				var inputNode = document.createElement("input");
				inputNode.value = val.sale[i];
				tempTdNode.append(inputNode);
				tempTrNode.append(tempTdNode);
				EventUtil.addHandlers(tempTdNode, 'mouseleave', function(event) {
					event.target.querySelector("div").style.display = "none";
				});
				EventUtil.addHandlers(inputNode, 'blur', function(event) {
					debugger;
					event.target.style.display = "none";
					event.target.parentNode.querySelector("span").innerText = event.target.value;
					event.target.parentNode.querySelector("span").style.display = "inline";
					changeData(event.target.parentNode.dataset, event.target.value);
				});
			}
			$("tbody").append(tempTrNode);
		});
	});
}

function changeData(data, changeValue) {
	var tempData = ife31Data.sourceData;
	tempData.forEach(function(item) {
		if(item.product == data.product && item.region == data.region) {
			item.sale.forEach(function(value, index) {
				item.sale[data.month] = changeValue;
			});
		}
	});
	localStorage.setItem("sourceData", JSON.stringify(tempData));
}

function showDataAction() {
	$("tHead").innerHTML = "";
	$("tbody").innerHTML = "";
	if(selectedLength() == 0) {
		return;
	}
	var productFlag = addTableHead(ife31Data.selectChoosed);
	var showData = delData(filterData(ife31Data.selectChoosed));
	showTableData(showData, productFlag);
}

function selectedLength() {
	return ife31Data.selectChoosed.all.length + ife31Data.selectChoosed.region.length + ife31Data.selectChoosed.product.length
}

function delData(data) {
	var tempDataArr = [];
	if(ife31Data.selectChoosed.region.length == 1 && ife31Data.selectChoosed.product.length != 1) {
		var tempData = {
			name: data[0].region,
			value: []
		}
		data.forEach(function(item) {
			tempData.value.push({
				item: item.product,
				sale: item.sale
			})
		});
		tempDataArr.push(tempData);
	} else {
		data.forEach(function(item) {
			var exitFlag = false;
			for(let i = 0; i < tempDataArr.length; i++) {
				if(tempDataArr[i].name == item.product) {
					tempDataArr[i].value.push({
						item: item.region,
						sale: item.sale
					});
					exitFlag = true;
					break;
				}
			}
			if(!exitFlag) {
				var tempData = {
					name: item.product,
					value: []
				}
				tempData.value.push({
					item: item.region,
					sale: item.sale
				});
				tempDataArr.push(tempData);
			}
		});
	}
	return tempDataArr;
}

function filterData(dataArr) {
	var showData = ife31Data.sourceData;
	//all
	if(dataArr.all.length > 0) {
		return showData;
	}
	var showData = [];
	//region
	var regionDataArr = [];
	ife31Data.selectData[1].forEach(function(item) {
		if(ife31Data.selectChoosed.region.indexOf(item.value) > -1) {
			regionDataArr.push(item.text);
		}
	});
	if(regionDataArr.length > 0) {
		regionDataArr.forEach(function(val) {
			ife31Data.sourceData.forEach(function(item) {
				if(item.region == val) {
					showData.push(item);
				}
			});
		});
	} else {
		showData = ife31Data.sourceData;
	}

	//product
	var productDataArr = [];
	ife31Data.selectData[2].forEach(function(item) {
		if(ife31Data.selectChoosed.product.indexOf(item.value) > -1) {
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

function addTableHandler() {
	EventUtil.addHandlers($("tbody"), 'mouseover', function(event) {
		if(!event.target.getAttribute("class") || event.target.getAttribute("class").indexOf("monthData") < 0) {
			return
		}
		if(event.target.querySelector("input").style.display != "block"){
			event.target.querySelector("div").style.display = "inline-block";
		}
	});

	EventUtil.addHandlers($("tbody"), 'click', function(event) {
		if(event.target.localName == 'div' || (event.target.getAttribute("class") && event.target.getAttribute("class").indexOf("monthData") > -1)) {
			(event.target.querySelector("span")||event.target.parentNode.querySelector("span")).style.display = "none";
			(event.target.querySelector("div")||event.target.parentNode.querySelector("div")).style.display = "none";
			(event.target.querySelector("input")||event.target.parentNode.querySelector("input")).style.display = "block";
			(event.target.querySelector("input")||event.target.parentNode.querySelector("input")).focus();
		}
	});
}

export {selectedLength, showDataAction, addTableHandler};