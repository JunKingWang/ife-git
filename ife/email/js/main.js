// 邮箱后缀List参考
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var $ = function(id) {
	return document.getElementById(id);
}
window.onload = function() {
	init();
}

function init () {
	var selectedNo = 0;
	EventUtil.addHandlers($("email-input"), "input", function(e) {
		e.target.value = e.target.value.trim();
		var text = e.target.value;
		if(e.target.value && e.target.value != "") {
			var tempArray = e.target.value.split("@");
			if(tempArray.length > 1) {
				text = tempArray[0];
			}
			$("email-sug-wrapper").innerHTML = ""
			$("email-sug-wrapper").style.display = "block"
			for(var i = 0; i < postfixList.length; i++) {
				if(tempArray.length > 1 && tempArray[1] && tempArray[1] != "" && postfixList[i].indexOf(tempArray[1]) > -1 || tempArray.length <= 1 || tempArray.length > 1 && tempArray[1] == "") {
					$("email-sug-wrapper").appendChild(document.createElement("li")).innerText = text + "@" + postfixList[i];
					selectedNo = 0;
					$("email-sug-wrapper").querySelectorAll("li")[selectedNo].style.background = "#ffc4ce";
				}
			}
		} else {
			$("email-sug-wrapper").style.display = "none"
			$("email-sug-wrapper").innerHTML = ""
			selectedNo = 0;
		}
	});

	EventUtil.addHandlers($("email-sug-wrapper"), 'click', function(e) {
		$("email-input").value = e.target.innerText;
		$("email-sug-wrapper").style.display = "none"
		$("email-sug-wrapper").innerHTML = "";
		$("email-input").focus()
	});

	EventUtil.addHandlers(document, 'keyup', function(e) {
		debugger;
		e.preventDefault();
		if($("email-sug-wrapper").childNodes.length < 1) {
			return;
		}
		if(e.keyCode == 38) {
			// up
			$("email-sug-wrapper").querySelectorAll("li")[selectedNo].style.background = "";
			if(selectedNo <= 0) {
				selectedNo = postfixList.length - 1;
			} else {
				selectedNo--;
			}
			$("email-sug-wrapper").querySelectorAll("li")[selectedNo].style.background = "#ffc4ce";
		} else if(e.keyCode == 40) {
			//down
			$("email-sug-wrapper").querySelectorAll("li")[selectedNo].style.background = "";
			if(selectedNo < postfixList.length - 1) {
				selectedNo++;
			} else {
				selectedNo = 0;
			}
			$("email-sug-wrapper").querySelectorAll("li")[selectedNo].style.background = "#ffc4ce";
		} else if(e.keyCode == 13) {
			//enter
			$("email-input").value =$("email-sug-wrapper").querySelectorAll("li")[selectedNo].innerText;
			$("email-sug-wrapper").style.display = "none"
			$("email-sug-wrapper").innerHTML = ""
		}
	});
}