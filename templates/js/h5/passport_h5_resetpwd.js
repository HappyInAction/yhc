jQuery(function($) {
	var csrftoken = $('meta[name=csrf-token]').attr('content')
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken)
	        }
	    }
	});
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
	var key = $('meta[name=key]').attr('content');
	var appid = $('meta[name=appid]').attr('content');
	var type = getParam('type');
	var agenttype = getParam('agenttype');
	var isFlag = false;
	var phone_check = false;
	var pwd_check = false;
	var pwd_confirmcheck = false;
	if(getParam('next') != null){
		var next_url = getParam('next')
	}else{
		var next_url = 'http://www.yhctech.com'
	}
	//	失去焦点时
	$("input[type='text']").blur(function() {
		if($(this).val() == "") {
				//	失去焦点内容为空时
				$(this).parents("li").find(".warning_img").show();
				$(this).parents("li").find(".warning").show();
			} else {
				if($(this).attr("class") == "phone") {
					if(!(/^1[34578]\d{9}$/.test($(this).val()))) {
						$(this).parents("li").find(".warning_img").show();
						$(this).parents("li").find(".warning").text('手机号格式不正确').show();
						phone_check = false;
						isFlag = false;
						// return false
					}
					else{
						$(this).parents("li").find(".warning_img").hide();
						$(this).parents("li").find(".warning").hide();
						phone_check = true;
						isFlag = true;
					}
				}
				//			失去焦点校验内容
				// $(this).parents("li").find(".warning_img").hide();
				// $(this).parents("li").find(".warning").hide();
				// isFlag = true;
				// var data = new Object(),
				// 	that = $(this),
				// 	key = $(this).attr("class"),
				// 	val = $(this).val()
				// data = JSON.stringify({
				// 	key: key,
				// 	value: val,
				// 	type: type,
				// 	agenttype: agenttype
				// });
				// $.ajax({
				// 	url: "/api/check",
				// 	type: "POST",
				// 	dataType: "json",
				// 	contentType:'json',
				// 	data: data,
				// 	success: function(res) {
				// 		if(res['code'] == 'A00000') {
				// 			that.parents("li").find(".warning_img").hide();
				// 			that.parents("li").find(".warning").hide();
				// 			phone_check = true;
				// 			isFlag = true;
				// 		} else {
				// 			that.parents("li").find(".warning_img").show();
				// 			that.parents("li").find(".warning").texst(res['msg']).show();
				// 			phone_check = false;
				// 			isFlag = false;
				// 		}
				// 	}
				// })
			}
	}).focus(function(){
		$(this).parents("li").find(".warning_img").hide();
		$(this).parents("li").find(".warning").hide();
	})
	$(".password").blur(function() {
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
	$(".password_repeat").blur(function() {
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
	$('.codebtn').on('click', codeText);
	function codeText() {
		if(!phone_check) {
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
						},1000)
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
//		重置密码 confirm
	function confirm() {
				var data = new Object();
				$('input').each(function(){
					if ($(this).val()=="") {
						isFlag = false;
						return false;
					}
				})
				if(isFlag && pwd_check && pwd_confirmcheck && phone_check) {
					$(".phone").attr("disabled","disabled");
					$(".verification_code").attr("disabled","disabled");
					$('.confirm').unbind();
					data = JSON.stringify({
						agenttype:agenttype,
						newpwd: getEntryptPwd($(".password").val(), key),
						phone: $(".phone").val(),
						code: $(".verification_code").val(),
						appid:appid,
						type:type
					});
					$.ajax({
						url: "",
						type: "POST",
						dataType: "json",
						contentType:'json',
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

		}
	$(".confirm_code").on("click", confirm);
	//	加密
	function getEntryptPwd(pwd, key) {
		var encrypt = new JSEncrypt();
		encrypt.setPublicKey(key);
		return encrypt.encrypt(pwd);
	}
})
