
function showDay (){
	var NewDay = parseInt(Day/7),
		bigNum=["零","一","二","三","四","五","六","七","八","九","十"];
	
	for(var i=1; i<=NewDay; i++){
		$("#Time").append("<option value='" + i + "'>" + bigNum[i] + "周" + "</option>");
	}
}

function changeDay(){
	var NewDay = $("#Time").val()*7;
	if(NewDay <= 0){
		return
	}
	$.ajax({
		url: "/InterFace/RepayMentCenter/ShortExtension.ashx",
		type: "post",
		dataType: "json",
		cache: false,
		data:{
			"type": "getmoney",
			"PlanID": PlanID,
			"channel": channel,
			"Day": NewDay
		},
		success: function (msg){
			var Money = msg.Money;
			if(Money){
				$("#handling").html(Money + "元");
			} else {
				errShow({ "errmsg": "获取手续费错误,请刷新页面重试", "errcode": "" });
			}
		}
	});
}

function Paybtn(){
	var Time = $("#Time").val(),
		NewDay = Time*7,
		handling = $("#handling").html();
	if(Time == 0){
		errShow({ "errmsg": "请先选择延期时间", "errcode": "" });
		return;
	} else if( !handling ){
		errShow({ "errmsg": "获取手续费错误,请刷新页面重试", "errcode": "" });
		return;
	}
	
	$("#formsub").attr("action", "/InterFace/RepayMentCenter/ShortExtension.ashx?type=submit&channel=" + channel + "&PlanID=" + PlanID + "&Day=" + NewDay);
	$("#formsub").submit();
}

function errShow(obj) {
    if (obj.errmsg || obj.errcode) {
        $("#remind02 .motwo_wz").html(obj.errmsg);
		if(obj.errcode){			
			$("#remind02 .motwo_wz404").html("错误码:" + obj.errcode);
		}else{
			$("#remind02 .motwo_wz404").html("");
		}
        
        $("#remind02").css("display", "block");
        return false;
    }
    return true;
}
