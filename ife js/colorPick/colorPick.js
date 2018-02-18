window.onload = () => {
	htmlPreview.initData();
}

var htmlPreview = {
	chooseContain: document.getElementById("chooseContain"),
	barContain: document.getElementById("barContain"),
	chooseBtn: document.getElementById("chooseBtn"),
	barBtn: document.getElementById("barBtn"),
	colorPicChoose: document.getElementById("colorPicChoose"),
	// colorBoard: document.getElementById("colorBoard"),

	initData() {
		chooseBtnDownFlag = false;
		oldclientX = 0;
		oldclientY = 0;
		positionLeft = 0;
		positionTop = 0;
		ballTop = 0;
		barBtnDownFlag = false;

		this.createdContainer("#f00");
		this.createColorBar();
		this.showColorData(0, 0)
		// this.createColorBoard("#f00");

		colorPicChoose.onmousedown = this.chooseBtnDown;
		colorPicChoose.onmousemove = this.chooseBtnMove;
		colorPicChoose.onmouseup = this.chooseBtnLeave;
		
		colorPicBar.onmousedown = this.barBtnDown;
		colorPicBar.onmousemove = this.barBtnMove;
		colorPicBar.onmouseup = this.barBtnLeave;
	},

	createdContainer(color) {
		var ctx  = chooseContain.getContext("2d");
		ctx.clearRect(0, 0, 300, 300);
		var containGradient = ctx.createLinearGradient(0, 0, 300, 0);
		containGradient.addColorStop(0, "#fff");
		containGradient.addColorStop(1, color);
		ctx.fillStyle = containGradient;
		ctx.fillRect(0, 0, 300, 300);

		var opicatyGradient = ctx.createLinearGradient(0, 0, 0, 300);
		opicatyGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
		opicatyGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
		ctx.fillStyle = opicatyGradient;
		ctx.fillRect(0, 0, 300, 300);
	},

	createColorBar() {
		var ctx = barContain.getContext("2d");
		var barGradient = ctx.createLinearGradient(0, 0, 0, 300);
		barGradient.addColorStop(0, "rgb(255,0,0)");
		barGradient.addColorStop(1/6, "rgb(255,255,0)");
		barGradient.addColorStop(2/6, "rgb(0,255,0)");
		barGradient.addColorStop(3/6, "rgb(0,255,255)");
		barGradient.addColorStop(4/6, "rgb(0,0,255)");
		barGradient.addColorStop(5/6, "rgb(255,0,255)");
		barGradient.addColorStop(1, "rgb(255,0,0)");
		ctx.fillStyle = barGradient;
		ctx.fillRect(0, 0, 15, 300);
	},

	createColorBoard(color) {
		var ctx = colorBoard.getContext("2d");
		ctx.clearRect(0, 0, 40, 40);
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, 40, 40);
	},

	chooseBtnDown(event) {
		event.preventDefault();
		if(event.target.getAttribute("id") == "chooseBtn") {
			oldclientX =  event.clientX;
			oldclientY =  event.clientY;
			chooseBtnDownFlag = true;
		}
		document.onmousemove = () => {
			htmlPreview.chooseBtnMove();
		};

		document.onmouseup = () => {
			chooseBtnDownFlag = false;
			document.onmousemove = null;
			document.onmouseup = null;
		};
	},

	chooseBtnMove() {
		if(chooseBtnDownFlag == false) {
			return;
		}
		positionLeft += (event.clientX - oldclientX);
		positionTop += (event.clientY - oldclientY); 
		if(positionLeft < 0) {
			positionLeft = 0;
		} else if(positionLeft > 300) {
			positionLeft= 300
		}
		if(positionTop < 0) {
			positionTop = 0;
		} else if(positionTop > 300) {
			positionTop = 300;
		}
		chooseBtn.style.left = positionLeft + 'px';
		chooseBtn.style.top = positionTop + 'px';
		oldclientX =  event.clientX;
		oldclientY =  event.clientY;
		htmlPreview.showColorData(positionLeft, positionTop);
	},

	chooseBtnLeave() {
		chooseBtnDownFlag = false;
	},

	showColorData(left, top) {
		//边缘300处无法取长度为1，待后面解决。
		var tempLeft = left == 300 ? 299 : left;
		var tempTop = top == 300 ? 299 : top;
		var ctx = chooseContain.getContext("2d");
		var array = ctx.getImageData(tempLeft, tempTop, 1, 1).data;
		var color = "rgba(" + array[0] + "," + array[1] + "," + array[2] + "," + array[3] + ")";
		// htmlPreview.createColorBoard(color);
		document.getElementById("rInput").value = array[0];
		document.getElementById("gInput").value = array[1];
		document.getElementById("bInput").value = array[2];
		var hlsArray = this.changeRgbToHls(array[0], array[1], array[2]);
		document.getElementById("hInput").value = hlsArray[0];
		document.getElementById("lInput").value = hlsArray[1];
		document.getElementById("sInput").value = hlsArray[2];
	},

	barBtnDown(event) {
		event.preventDefault();
		if(event.target.getAttribute("id") == "barBtn") {
			oldClientY =  event.clientY;
			barBtnDownFlag = true;
		}
		document.onmousemove = () => {
			htmlPreview.barBtnMove();
		};
		document.onmouseup = () => {
			barBtnDownFlag = false;
			document.onmousemove = null;
			document.onmouseup = null;
		}
	},

	barBtnMove() {
		if(barBtnDownFlag == false) {
			return;
		}
		ballTop += event.clientY - oldClientY;
		if(ballTop < 0) {
			ballTop = 0;
		} else if(ballTop > 300) {
			ballTop = 300;
		}
		barBtn.style.top = ballTop + 'px';
		oldClientY = event.clientY;
		var ctx = barContain.getContext("2d");
		ballTop = ballTop == 0 ? 1 : ballTop;
		var array = ctx.getImageData(0, 0, 15, ballTop).data;
		var color = "rgba(" + array[array.length - 4] + "," + array[array.length - 3] + "," + array[array.length - 2] + "," + array[array.length - 1] + ")";
		htmlPreview.createdContainer(color);
		htmlPreview.showColorData(positionLeft, positionTop);
	},

	barBtnLeave() {
		barBtnDownFlag = false;
	},

	change() {
		var ctx = chooseContain.getContext("2d");
		var array = ctx.getImageData(0, 0, 300, 300).data;
		var rInput = document.getElementById("rInput").value;
		var gInput = document.getElementById("gInput").value;
		var bInput = document.getElementById("bInput").value;
		for(let i = 0; i < array.length; i = i + 4) {
			if(rInput == array[i] && gInput == array[i+1] && bInput == array[i+2]) {
				positionLeft = (i % 1200) / 4 + 1;
 				positionTop = (i - (positionLeft - 1) * 4) / 1200 + 1;
				chooseBtn.style.left = positionLeft + 'px';
				chooseBtn.style.top = positionTop + 'px';
				htmlPreview.changeRgbToHls(array[i], array[i + 1], array[i + 2]);
				break;
			}
		}
	},

	changeRgbToHls(r, g, b){
	    r /= 255, g /= 255, b /= 255;
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2;

	    if (max == min){ 
	        h = s = 0; // achromatic
	    } else {
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }
	    return [h, s, l];
	}
}