var u = navigator.userAgent,
	uto = u.toLowerCase(),
	isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
	isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	
//切换帐单
$(".mybill_tab ul li").each(function(i) {
	$(this).click(function(){
		$(".mybill_tab ul li").removeClass("active");
		$(this).addClass("active");
		
		AjaxMsg(i);
	});
});

//取消选择支付方式
$("#perRemove").click(function (){
	$("#modalzz").css("display", "none");
	$("#perDiv").css("bottom", "-14.6rem");
});

function AjaxMsg(i){
	var typeArr = new Array('timenowdata','beforedata','overduedata','haspaydata');
	$(".mybill_tab ul li").removeClass("active");
	$(".mybill_tab ul li").eq(i).addClass("active");
	$.ajax({
		url: '/InterFace/PersonalCenter/BillList.ashx',
		type: 'post',
		dataType: 'json',
		cache: false,
		data: {
			"type": typeArr[i]
		},
		success: function(msg){
			var PlanList = eval("(" + msg.PlanList + ")");
			billList(PlanList);
		}
	});
}

function billList (PlanList){
	if(PlanList.length <= 0){
		errShow({ "errmsg": "帐单加载错误,请刷新重试", "errcode": "" });
	}
	$('.bill_cont').html("");
	$.each(PlanList, function (k, v){
		var Short = this.Short,
			state = this.state,
			Left_money = Number(this.Left_money),
			Interest_money = Number(this.Interest_money),
			Service_money = Number(this.Service_money),
			Default_interest = Number(this.Default_interest),
			transid = this.transid,
			inttype = this.inttype,
			time = this.time,
			type = this.type;
		
		$('.mybill_nr').append(
			'<div class="bill_cont">' + 
			'<div class="bill_nr">' + 
			'	<div class="bill_cttp">' + 
			'		<div class="fl cttp_pic"><img src="../../images/NEW/repay_other.png"><br>' + type + '</div>' + 
			'		<div class="fl cttp_wzwz">' + 
			'			<p>应还本金：<span>' + Left_money + '元</span></p>' + 
			'			<p>利　　息：<span>' + Interest_money + '元</span></p>' + 
			'			<p>服 务 费：<span>' + Service_money + '元</span></p>' + 
			'		</div>' + 
			'	</div>' + 
			'	<div class="bill_ctbom">' + 
			'		<p class="ctbom_lf fl ne_lf "><img src="../../images/NEW/mybill02.png"><span>还款时间：' + time + '</span></p>' + 
			'		<p class="ctbom_rt fr ctboms_rt square" onClick="Paybtn(this,\'InterFace/RepayMentCenter/PayMent.ashx\')"><a><span>还款</span></a></p>' + 
			'	</div>' + 
			'	<input name="" type="hidden" value="' + transid + '">' + 
			'</div>' + 
			'</div>'
		);
		
		//是否已还完
		if(state != "0" && state != "1"){
			$(".square").eq(k).attr("class","ctbom_rt fr square over");
			$(".square").eq(k).removeAttr("onClick");
			$(".square").eq(k).prepend('<img src="../../images/NEW/mybill01.png">');
			$(".square span").eq(k).html("已还款");
		}
		
		//是否逾期
		if(Default_interest != "" && Default_interest > 0){
			$(".ne_lf").eq(k).css("display", "none");
			$(".bill_ctbom").eq(k).prepend(
				'<div class="hhqbom_lf fl">' + 
				'	<p class="yqfx">逾期罚息：' + Default_interest + '元</p>' + 
				'	<p><img src="../../images/NEW/mybill02.png"><span>还款时间：2015.06.10</span></p>' + 
				'</div>'
			);
		}
		
		//是否可延期
		if(Short == "True"){
			$(".bill_ctbom").eq(k).append(
				'<p class="ctbom_rt fr ctboms_rt bod mr2" onClick="Paybtn(this,\'InterFace/RepayMentCenter/ShortExtension.ashx\')">' + 
				'	<a><span>延期</span></a>' + 
				'</p>'
			);
		}
		
		//分期类型
		switch (inttype)
		{
			case "0":
				$(".cttp_pic img").eq(k).attr("src", "../../images/NEW/repay_zf.png");
				break;
				
			case "1":
				$(".cttp_pic img").eq(k).attr("src", "../../images/NEW/repay_jx.png");
				break;
				
			case "16":
				$(".cttp_pic img").eq(k).attr("src", "../../images/NEW/repay_knrxh.png");
				break;
				
			case "17":
				$(".cttp_pic img").eq(k).attr("src", "../../images/NEW/repay_djb.png");
				break;
				
			default:
				$(".cttp_pic img").eq(k).attr("src", "../../images/NEW/repay_other.png");
				break;
		}
	});
}

//提交
function Paybtn(obj, Url){
	var PlanID = $(obj).parents(".bill_nr").find("input:hidden").val();
	
	$("#perDiv input:hidden").val(PlanID+","+Url);
	$("#modalzz").css("display", "block");
	$("#perDiv").css("bottom", "0rem");
}

//提交方式
function payChoose(obj){
	var channel = $(obj).attr("channel"),
		PlanIDUrl = $("#perDiv input:hidden").val(),
		arr = PlanIDUrl.split(","),
		PlanID = arr[0],
		Url = arr[1];
		
	if(channel == 0 || channel == 2){
		$("#formsub").attr("action", Url + "?type=submit&PlanID=" + PlanID + "&channel=" + channel);
		$("#formsub").submit();
	} else if(channel == 1){
		weixinPay(Url, PlanID, channel);
	}
}

function weixinPay(Url, PlanID, channel){
	$.ajax({
		url: "/InterFace/PersonalCenter/ BillList.ashx",
		type: "post",
		dataType: "json",
		cache: false,
		data:{
			"type": "submit",
			"PlanID": PlanID,
			"channel": channel
		},
		success: function (msg){
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
						location.href = Url;
					}
				}
			});
		}
	});
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