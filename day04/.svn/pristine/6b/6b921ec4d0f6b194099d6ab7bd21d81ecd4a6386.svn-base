var u = navigator.userAgent,
	uto = u.toLowerCase(),
	isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
	isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

//取消选择支付方式
$("#perRemove").click(function (){
	$("#modalzz").css("display", "none");
	$("#perDiv").css("bottom", "-14.6rem");
});

function Paybtn(){
	var	Money = Number($("#Money").val());
		idNum = chk_idcard($("#idNum").val());
	if(!idNum){
		errShow({ "errmsg": "请输入正确身份证号码", "errcode": "" });
		return;
	}else if( !chk_money(Money) ){
		$("#Money").val("");
		errShow({ "errmsg": "请输入还款金额", "errcode": "" });
		return;
	}/* else if(Money < 100){
		$("#Money").val("");
		errShow({ "errmsg": "还款金额不能少于100", "errcode": "" });
		return;
	}*/
	
	$("#modalzz").css("display", "block");
	$("#perDiv").css("bottom", "0rem");
}

//提交方式
function payChoose(obj){
	var PayType = $(obj).attr("PayType"),
		idNum = $("#idNum").val(),
		Money = $("#Money").val();
	
	if(PayType == 2 && is_weixn()){
		return;
	}

	if(PayType == 0 || PayType == 2){
		$("#formsub").attr("action", Url + "?type=submit&PayType=" + PayType + "&idNum=" + idNum + "&Money=" + Money + "&Uid=" + Uid + "&SignKey=" + SignKey);
		$("#formsub").submit();
	} else if(PayType == 1){
		weixinPay(idNum, Money);
	}
}

function weixinPay(idNum, Money){
	$.ajax({
		url: "/InterFace/RepayMentCenter/BehalfRayMent.ashx",
		type: "post",
		dataType: "json",
		cache: false,
		data:{
			"type": "submit",
			"idNumd": idNum,
			"Money": Money
		},
		success: function (msg){
			if(msg.Url)
			{
				location.href = msg.Url;
				return;
			}
			var appId = msg.appId,
				timeStamp = msg.timeStamp,
				nonceStr = msg.nonceStr,
				package = msg._package,
				paySign = msg.paySign;
            
			var Vison = navigator.userAgent.split('MicroMessenger/')[1].split('.')[0];
            if (Vison < 5) {
				errShow({ "errmsg": "微信版本过低，请升级版本后进行支付", "errcode": "" });
                return;
            }
            				
			wx.chooseWXPay({
				appId: appId,
				timestamp: timeStamp, // 支付签名时间戳
				nonceStr: msg.nonceStr, // 支付签名随机串
				package: _package, // 统一支付接口返回的prepay_id参数值
				signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: paySign, // 支付签名
				success: function (res) {
					if (res.err_msg.indexOf("ok") > -1) {
						location.href = "/InterFace/RepayMentCenter/BehalfRayMent.ashx";
					}
				}
			});
		}
	});
}

function is_weixn(){
    if(uto.match(/MicroMessenger/i)=="micromessenger") {
		$("#modalzz").css("display", "none");
		$("#perDiv").css("bottom", "-14.8rem");
		$("#weixinTips").css("display","block");
		
		if(isAndroid){
			$(".tpctxt").attr("class","tpctxt Android");
			$(".tpctxt b").html("在浏览器中打开");
		} else if(isiOS){
			$(".tpctxt").attr("class","tpctxt IOS");
			$(".tpctxt b").html("在Safari中打开");
		}
        return true;
    } else {
        return false;
    }
}

function Noweixn(){
	if(LLinterest > 0){
		$("#LLinterest").css("display","block");
		$("#LLinterest span").html(LLinterest);
	} else {
		$("#LLinterest").css("display","none");
	}
	if(WXinterest > 0){
		$("#WXinterest").css("display","block");
		$("#WXinterest span").html(WXinterest);
	} else {
		$("#WXinterest").css("display","none");
	}
	if(aplipayinterest > 0){
		$("#aplipayinterest").css("display","block");
		$("#aplipayinterest span").html(aplipayinterest);
	} else {
		$("#aplipayinterest").css("display","none");
	}
	
    if(uto.match(/MicroMessenger/i)!="micromessenger") {
		$(".weixininterest").css("display","none");
    }
}

function errShow(obj) {
    if (obj.errmsg || obj.errcode) {
        $("#remind02 .motwo_wz").html(obj.errmsg);
        $("#remind02 .motwo_wz404").html("错误码:" + obj.errcode);
        $("#remind02").css("display", "block");
        return false;
    }
    return true;
}