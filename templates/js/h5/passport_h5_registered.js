jQuery(function($) {
	var csrftoken = $('meta[name=csrf-token]').attr('content')
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken)
	        }
	    }
	})
	var key = $('meta[name=key]').attr('content');
	var appid = $('meta[name=appid]').attr('content');
	var isFlag=false;
	var can_send = false;
	var org_check = false;
	var user_check = false;
	// var phone_check = false;
	var pwd_check = false;
	var pwd_confirmcheck = false;
	//	获取url参数
	var getParam = function(name){
	    var search = document.location.search;
	    var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
	    var matcher = pattern.exec(search);
	    var items = null;
	    if(null != matcher){
	        try{
	            items = decodeURIComponent(decodeURIComponent(matcher[1]));
	        }catch(e){
	            try{
	                    items = decodeURIComponent(matcher[1]);
	            }catch(e){
	                    items = matcher[1];
	            }
	        }
	    }
	    return items;
	};
	var type = getParam('type');
	var agenttype = getParam('agenttype');
	if(getParam('next') != null){
		var next_url = getParam('next')
	}else{
		var next_url = 'http://www.yhctech.com'
	}
		//	弹出用户协议
	$(".content_food>.text>span").on("click", function() {
			$(".user_know").show("fast")
		})
		//	关闭用户协议
	$(".user_know .close").on("click", function() {
			$(".user_know").hide("fast")
		})
		//	失去焦点时
	$("input[type='text']").blur(function() {
			if($(this).val() == "") {
				//	失去焦点内容为空时
				if($(this).attr("class") == "org_name"){
					$(this).parents("li").find(".warning_img").show();
					$(this).parents("li").find(".warning").text('请填写名称').show();
				}
				if($(this).attr("class") == "username"){
					$(this).parents("li").find(".warning_img").show();
					$(this).parents("li").find(".warning").text('请填写用户名').show();
				}
			}
			 else {
				 if($(this).attr("class") == "phone") {
					if(!(/^1[34578]\d{9}$/.test($(this).val()))) {
						$(this).parents("li").find(".warning_img").show();
						$(this).parents("li").find(".warning").text('手机号格式不正确').show();
						can_send = false;
						isFlag = false;
						return false
					}
				}
				//			失去焦点校验内容
				$(this).parents("li").find(".warning_img").hide();
				$(this).parents("li").find(".warning").hide();
				isFlag = true;
				var data = new Object(),
					that = $(this),
					key = $(this).attr("class"),
					val = $(this).val()
				data = JSON.stringify({
					key: key,
					value: val,
					type: type,
					agenttype: agenttype
					// v: v
				});
				// console.log(data)
				$.ajax({
					url: "/u/api/check",
					type: "POST",
					dataType: "json",
					contentType: 'json',
					data: data,
					success: function(res) {
						// console.log(res)
						// console.log(key)
						if(res['code'] == 'A00000') {
							if(key == "org_name"){
								// console.log('org')
								org_check = true;
							}
							if(key == "username"){
								// console.log('user')
								user_check = true;
							}
							if(key == "phone"){
								// console.log('11')
								can_send = true;
							}
							that.parents("li").find(".warning_img").hide();
							that.parents("li").find(".warning").hide();
							isFlag = true;
						} else {
							that.parents("li").find(".warning_img").show();
							that.parents("li").find(".warning").text(res['msg']).show();
							if(key == "org_name"){
								org_check = false;
							}
							if(key == "username"){
								user_check = false;
							}
							if(key == "phone"){
								can_send = false;
							}
							isFlag = false;
						}
					}
				})
			}
		}).focus(function(){
			$(this).parents("li").find(".warning_img").hide();
			$(this).parents("li").find(".warning").hide();
		})
		//	验证密码规则
	$("input[type='password']").blur(function() {
			if(/^[a-zA-Z][A-Za-z0-9]{7,19}$/.test($('.password').val())) {
				$(this).parents("li").find(".warning_img").hide();
				$(this).parents("li").find(".warning").hide();
				pwd_check = true;
				isFlag = true;
			} else {
				$(this).parents("li").find(".warning_img").show();
				$(this).parents("li").find(".warning").show();
				pwd_check =false;
				isFlag = false;
			}

		})
		//	验证重输密码规则
	$("input[type='password']").eq(1).blur(function() {
			if($(this).val() == $(".password").val()) {
				$(this).parents("li").find(".warning_img").hide();
				$(this).parents("li").find(".warning").hide();
				pwd_confirmcheck = true;
				isFlag = true;
			} else {
				$(this).parents("li").find(".warning_img").show();
				$(this).parents("li").find(".warning").show();
				pwd_confirmcheck = false;
				isFlag = false;
			}
		})
		//	获取验证码
	$('.codebtn').on('click',codeText);
	function codeText() {
		if(!can_send) {
			return false;
		} else {
			$.ajax({
				url: "/u/api/sendmsg",
				type: "POST",
				dataType: "json",
				contentType: 'json',
				data: JSON.stringify({
					RecNum: $(".phone").val(),
					type: '1',
					appid: appid
				}),
				success: function(res) {
					if(res['code'] == 'A00000') {
						$(".codebtn").hide();
						$(".codetime").show();
						$(".verification_code").parents("li").find(".warning_img").hide();
						$(".verification_code").parents("li").find(".warning").hide();
						$('.codebtn').off('click');
						var times = setInterval(function() {
							$(".codetime span").text($(".codetime span").text() - 1);
							if($(".codetime span").text() <= 0) {
								$(".codebtn").show();
								$(".codetime").hide();
								$(".codetime span").text(60);
								clearInterval(times);
								$('.codebtn').on('click', codeText);
							}
						}, 1000)
					} else {
						$(".verification_code").parents("li").find(".warning_img").show();
						$(".verification_code").parents("li").find(".warning").text('发送失败,请稍后再试！').show();
						$(".codebtn").show();
						$(".codetime").hide();
						$(".codetime span").text(60);
					}
				}
			})
		}
	}
		//	注册提交
//		注册函数 confirm
	function confirm() {
			if($(".checkbox").is(":checked")) {
				//			勾选用户协议
				var data = new Object();
				$('input').each(function(){
					if ($(this).val()=="") {
						isFlag = false;
						return false;
					}
				})
				if(isFlag && org_check && user_check && can_send && pwd_confirmcheck && pwd_check) {
					$("input").attr("disabled","disabled");
					$('.confirm').unbind();
					data = JSON.stringify({
						org_name: $(".org_name").val(),
						username: $(".username").val(),
						pwd: getEntryptPwd($(".password").val(), key),
						phone: $(".phone").val(),
						code: $(".verification_code").val(),
						appid: appid
					})
					$.ajax({
						url: "",
						type: "POST",
						dataType: "json",
						contentType: 'json',
						data: data,
						success: function(res) {
							if(res['code'] == 'A00000') {
								$('.success').show();
								setTimeout(function(){
									location.href = next_url;
								},1500)
							} else {
								alert(res['msg']);
								$("input").attr("disabled",false);
								$('.confirm').bind('click', confirm);
							}
						}
					})
				}else{
					alert("用户信息填写有误！")
				}

			} else {
				//			没有勾选用户协议
				alert("请认真阅读用户协议，并勾选")
			}
		}
	$(".confirm").on("click", confirm)
		//	加密
	function getEntryptPwd(pwd, key) {
		var encrypt = new JSEncrypt();
		encrypt.setPublicKey(key);
		return encrypt.encrypt(pwd);
	}
})
