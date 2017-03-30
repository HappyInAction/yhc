jQuery(function($) {
	//先不管
	var csrftoken = $('meta[name=csrf-token]').attr('content')
	$.ajaxSetup({
		beforeSend: function(xhr, settings) {
			if(!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
				xhr.setRequestHeader("X-CSRFToken", csrftoken)
			}
		}
	})

	var key = $('meta[name=key]').attr('content');
	// var v = '1.0',
	isFlag = false;
	//	获取url参数
	var getParam = function(name) {
		var search = document.location.search;
		var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
		var matcher = pattern.exec(search);
		var items = null;
		if(null != matcher) {
			try {
				items = decodeURIComponent(decodeURIComponent(matcher[1]));
			} catch(e) {
				try {
					items = decodeURIComponent(matcher[1]);
				} catch(e) {
					items = matcher[1];
				}
			}
		}
		return items;
	};

	var type = getParam('type');
	var agenttype = getParam('agenttype');

	if(getParam('next') != null) {
		var next_url = getParam('next')
	} else {
		var next_url = 'http://www.yhctech.com'
	}
	
	var register_url = '/u/register?' + 'type=' + type + '&agenttype=' + agenttype + '&next=' + escape(next_url)
	// console.log(next_url)
	var resetpwd_url = '/u/resetpwd?' + 'type=' + type + '&agenttype=' + agenttype + '&next=' + escape(next_url)
	
	$(".content_food a").eq(0).attr('href', register_url)
	$(".content_food a").eq(1).attr('href', resetpwd_url)
	
	
	// 失去焦点时
	$("input[type='text']").blur(function() {
		if(!(/^1[34578]\d{9}$/.test($(this).val()))) {
			
			$(this).parents("li").find(".warning_img").show();
			$(this).parents("li").find(".warning").text('电话号码输入错误').show();
			
		} else {
			$(this).parents("li").find(".warning_img").hide();
			$(this).parents("li").find(".warning").hide();
			//			失去焦点校验内容
			var data = new Object(),
				that = $(this),
				key = $(this).attr("class"),
				val = $(this).val(),
				data = JSON.stringify({
					"key": key,
					"value": val,
					"type": type,
					// "v": v,
					"agenttype": agenttype
				});
			$.ajax({
				url: "/u/login",
				type: "POST",
				dataType: "json",
				contentType: 'json',
				data: data,
				success: function(res) {
					if(res['code'] != 'A00000') {
						that.parents("li").find(".warning_img").hide();
						that.parents("li").find(".warning").hide();
						isFlag = true;
					} else {
						that.parents("li").find(".warning_img").show();
						that.parents("li").find(".warning").text('手机号尚未注册').show();
						isFlag = false;
					}
				}
			})
		}
	}).focus(function() {
		$(this).parents("li").find(".warning_img").hide();
		$(this).parents("li").find(".warning").hide();
	})
	
	
	//	验证密码规则
	$("input[type='password']").blur(function() {
		if(/^[a-zA-Z][A-Za-z0-9]{7,19}$/.test($('.password').val())) {
			$(this).parents("li").find(".warning_img").hide();
			$(this).parents("li").find(".warning").hide();
			isFlag = true;
		} else {
			$(this).parents("li").find(".warning_img").show();
			$(this).parents("li").find(".warning").show();
			isFlag = false;
		}

	})
	
	//	登录
	function confirm() {
		if(isFlag) {
			$("input").attr("disabled", "disabled");
			$('.confirm').unbind();
			
			data = JSON.stringify({
				// v: v,
				agenttype: agenttype,
				type: type,
				phone: $(".phone").val(),
				pwd: getEntryptPwd($(".password").val(), key)
			})
			$.ajax({
				url: "",
				type: "POST",
				dataType: "json",
				contentType: 'json',
				data: data,
				success: function(res) {
					// console.log(res)
					if(res['code'] == 'A00000') {
						location.href = next_url;
						// location.href = "control.html";
					} else {
						alert('账号或密码错误');
						$("input").attr("disabled", false);
						$('.confirm').bind('click', confirm);
					}
				}
			})
		} else {
			//没有勾选用户协议
			alert("手机号或密码填写有误！")
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