var selection = {
	"北京":["清华大学","北京大学","北京航空航天大学"],
	"上海":["复旦大学","上海财经大学","上海外国语大学"]
}

function $(id) {
	return document.getElementById(id);
}

function changeSchool() {
	debugger;
	$("school").removeAttribute("hidden");
	$("company").setAttribute("hidden", true);
}

function changeCompany() {
	$("company").removeAttribute("hidden");
	$("school").setAttribute("hidden", true);
}

function changeUniversity() {
	debugger;
	var universityArr = selection[$("city").value];
	$("university").innerHTML = "";
	for(var i = 0; i < universityArr.length; i++) {
		var optionNode = document.createElement("option");
		optionNode.innerHTML = universityArr[i];
		$("university").appendChild(optionNode);
	}
}

window.onload = function() {
	changeUniversity();
}