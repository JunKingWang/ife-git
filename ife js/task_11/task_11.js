function $(id) {
	return document.getElementById(id);
}

//点击提示方法
function promptFocus(id) {
	$(id).onfocus = function() {
		changeLabel(id, "tip-text", "#999");
	}
}

//检验名称
function checkName() {
	debugger;
	var name = $("name").value;
	if(!name) {
		changeLabel("name", "empty-text", "red");
		return false;
	}
	var excn = /[^\x00-\xff]{1,}/g;
	var cn = excn.exec(name) || [];
	var length = name.length + cn.toString().length;
	if(length < 4 || length > 17) {
		changeLabel("name", "err-text", "red");
		return false;
	}
	changeLabel("name", "success-text", "green");
	return true;
}

//检验密码
function checkPsd() {
	var psd = $("psd").value;
	if(!psd) {
		changeLabel("psd", "empty-text", "red");
		return false;
	}
	var exps = /^[\da-zA-Z]{6,20}$/g;
	var result = exps.test(psd);
	debugger;
	if(!result) {
		changeLabel("psd", "err-text", "red");
		return false;
	} else if(($("repsd").value && $("repsd").value !== psd)) {
		changeLabel("psd", "err2-text", "red");
		return false;
	} else {
		changeLabel("psd", "success-text", "green");
		return true;
	}
}

//重复密码校验
function checkRepsd() {
	var repsd = $("repsd").value;
	if(!repsd) {
		changeLabel("repsd", "empty-text", "red");
		return false;
	}
	var exps = /^[\da-zA-Z]{6,20}$/g;
	var result = exps.test(repsd);
	if(!result || ($("psd").value && $("psd").value !== repsd)) {
		changeLabel("repsd", "err-text", "red");
		return false;
	}
	changeLabel("repsd", "success-text", "green");
	return true;
}

//邮箱校验
function checkEmail() {
	var email = $("email").value;
	if(!email) {
		changeLabel("email", "empty-text", "red");
		return false;
	}
	var exEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(exEmail.test(email)) {
		changeLabel("email", "success-text", "green");
		return true;
	} else {
		changeLabel("email", "err-text", "red");
		return false;
	}
}

//电话号码校验
function checkPhone() {
	var phone = $("phone").value;
	if(!phone) {
		changeLabel("phone", "empty-text", "red");
		return false;
	}
	var exPhone = /^\d{11}$/;
	if(exPhone.test(phone)) {
		changeLabel("phone", "success-text", "green");
		return true;
	} else {
		changeLabel("phone", "err-text", "red");
		return false;
	}
}

//校验后不同情况的显示
function changeLabel(id, textType, color) {
	$(id).style.borderColor = color;
	$(id + "Label").style.color = color;
	$(id + "Label").innerHTML = showText(id, textType);
}

//Json格式返回提示语
function showText(id, textType) {
	var showJson = {
		"name":{
			"tip-text": "必填，长度为4~16个字符",
			"err-text": "名称格式错误",
			"empty-text": "名称不能为空",
			"success-text": "名称可用"
		},
		"psd":{
			"tip-text": "数字和字母结合，长度为6到20个字符",
			"err-text": "密码格式错误",
			"err2-text": "两次输入不一致",
			"empty-text": "密码不能为空",
			"success-text": "密码可用"
		},
		"repsd":{
			"tip-text": "再次输入相同密码",
			"err-text": "两次输入不一致",
			"empty-text": "密码不能为空",
			"success-text": "密码可用"
		},
		"email":{
			"tip-text": "请输入邮箱地址",
			"err-text": "邮箱格式错误",
			"empty-text": "邮箱不能为空",
			"success-text": "邮箱可用"
		},
		"phone":{
			"tip-text": "请输入11位手机号码",
			"err-text": "号码格式错误",
			"empty-text": "号码不能为空",
			"success-text": "号码可用"
		}
	}
	return showJson[id][textType];
}

//点击校验按钮的校验
function checkOut() {
	if(checkName() && checkPsd() && checkRepsd() && checkEmail() && checkPhone()) {
		alert("提交成功");
	} else {
		alert("提交失败");
	}
}

//绑定事件
window.onload = function() {
	promptFocus("name");
	promptFocus("psd");
	promptFocus("repsd");
	promptFocus("email");
	promptFocus("phone");
	$("name").onblur = checkName;
	$("psd").onblur = checkPsd;
	$("repsd").onblur = checkRepsd;
	$("email").onblur = checkEmail;
	$("phone").onblur = checkPhone;
	$("checkOut").onclick = checkOut;
}