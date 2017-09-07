var checkBtn = document.getElementById("check");
var labelNode = document.getElementById("label");
// label.style.color = "#DBDBDB";
checkBtn.onclick = function() {
	debugger;
	var inputName = document.getElementById("inputName");
	if (!inputName.value || inputName.value == "") {
		labelNode.style.color = "red";
		inputName.style.border = "2px solid red";
		labelNode.innerHTML = "姓名不能为空";
		return;
	} 
	// 匹配中文字符的正则表达式： [\u4e00-\u9fa5] 
	// 匹配双字节字符(包括汉字在内)：[^\x00-\xff] 
	var excn=/[^\x00-\xff]{1,}/g;
	var cn = excn.exec(inputName.value) || [];
	var length = inputName.value.length + cn.toString().length;
	if(length < 4 || length > 16) {
		labelNode.style.color = "red";
		inputName.style.border = "2px solid red";
		labelNode.innerHTML = "长度为4~16个字符";
		return;
	}
	labelNode.style.color = "green";
	inputName.style.border = "2px solid green";
	labelNode.innerHTML = "名称格式正确";
};