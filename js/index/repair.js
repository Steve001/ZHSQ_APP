mui.init();
mui.plusReady(function() {
	//initOauth();
	//storage.init();

	//	var btn_sendvalidcode = document.getElementById("btn_sendvalidcode");
	var btn_ok = document.getElementById("btn_ok");
	var inpt_mobile = document.getElementById("inpt_mobile");
	var inpt_validcode = document.getElementById("inpt_validcode");
	var ckb_agree = document.getElementById("ckb_agree");

	if(ismobileno(inpt_mobile.value)) {
		appUI.removeDisabled(btn_sendvalidcode);
	}
	
	//协议勾选
	ckb_agree.addEventListener("tap", function() {
		if(this.checked) {
			appUI.showTopTip("请先同意服务条款");
		}
	});
	
	document.getElementById("btn_sendvalidcode").addEventListener("click", function() {
		// appUI.showTopTip("111111111111");
		var data = {
			"phone": inpt_mobile.value,
		}
		//var phone = inpt_mobile.value;
		// console.debug(data);
		
		request_msg('/msgPost', data, function(json) {
			appUI.showTopTip("调用短信接口");
			mui.toast(json.message);
			if(json.status == "success") {
				appUI.showTopTip("调用短信接口成功");
				openNew("login.html");
			}else{
				appUi.showTopTip("调用短信接口失败");
			}
		});
		
	});
	
	
	btn_ok.addEventListener("click", function() {
		console.debug("调用短信登录接口");
		var data = {
			"phone": inpt_mobile.value,
			"code1": inpt_validcode.value,
		}
		
		if(inpt_mobile.value.trim() == "") {
			appUI.showTopTip("请输入您的手机号");
		}else if(!ismobileno(inpt_mobile.value)) {
			appUI.showTopTip("手机号格式不正确");
		}else if(inpt_validcode.value.trim() == "") {
			appUI.showTopTip("请输入验证码");
		}else {
			//appUI.setDisabled(btn_login);
			request_msg("/msgLogin", data, function(json) {
				appUI.removeDisabled(btn_ok);
				mui.toast(json.message);
				if(json.status == "success") {
					openNew("login.html");
				}
			});
		}
	});
		
	
	
	//服务条款
	document.getElementById("servicedesc").addEventListener("tap", function() {
		openNew("../my/myMsgDetail.html", {
			id: 1
		});
	});

});


