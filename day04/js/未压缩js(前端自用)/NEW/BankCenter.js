/**
 * Created by Administrator on 2016/4/19.
 */
function bankClick(obj) {
    $("#hidFid").val($(obj).find("input[type='hidden']").val());
    //if($("#hidApplyOrRepay").val() != ""){
        //confirmCard();
	if($("#hidjumpurl").val() != ""){
        confirmCard();	
    } else {
        $("#SafaText").val("");
        $("#dialog").css("display", "block");
    }
    //else if($("#hidOP").val() == ""){
    //    window.location.href = "/Tenant/Personal/Repayment.aspx?PlanID=" + $("#hidPlanID").val() + "&Fid=" + $("#hidFid").val();
    //}else {
    //    window.location.href = "/Tenant/Personal/UnionPayPage.aspx?PlanID=" + $("#hidPlanID").val() + "&Fid=" + $("#hidFid").val();
    //}
}

function showMsg(){
    $.ajax({
        url: "/InterFace/RepayMentCenter/BankCenter.ashx",
        type:"post",
        dataType:"json",
        data:{
            "type": "loadData"
        },
        success: function (msg) {
            if (!errShow(msg)) {
                return;
            }
            var imgpath = msg.Img_path;
            var data = msg.BankData;
            for(var i=0; i < data.length; i++){
                var num,def,obj = getBankType(data[i]["Fbank_name"]);
                if(data[i]["Fbank_id"].length >=4){
                    num = data[i]["Fbank_id"].substring(data[i]["Fbank_id"].length - 4);
                }else {
                    num = "";
                }
                if(data[i]["Fdefault"] == "1"){ //默认卡
                    def = "class='defcard'";
                }else {
                    def = "";
                }
                var html = '<p class="fl bank_pic_new"><img src="' + imgpath + obj.img + '"></p>' +
                    '<p class="fl bank_nrwz"><span>'+ data[i]["Fbank_name"] +'</span>尾号'+
                    '<span style="font-size: 0.8rem;color: #999;display: inline;">'+ num +'</span></p>'+
                    '<i '+ def +'></i><input type="hidden" value="'+ data[i]["Fid"] +'" />';
                var li = document.createElement("li");
                li.onclick = function () {
                    bankClick(this);
                }
                li.style.position = "relative";
                li.innerHTML = html;
                var banklist = document.getElementById("banklist");
                banklist.appendChild(li);
            }
        }
    })
}

function chkPassWord(){
    if($("#SafaText").val() == ""){
        $("#SafaText").attr("type", "text");
        $("#SafaText").val("请输入安全密码");
        $("#SafaText").css("color", "red");
        return false;
    }else if(!chk_6_10char($("#SafaText").val())){
        $("#SafaText").attr("type", "text");
        $("#SafaText").val("安全密码格式错误");
        $("#SafaText").css("color", "red");
        return false;
    }

    return true;
}

function setDefaultCard(){
    if(!chkPassWord()){
        return;
    }

    $.ajax({
        url: "/InterFace/RepayMentCenter/BankCenter.ashx",
        type:"post",
        dataType:"json",
        data:{
            "type": "setDefCard",
            "SafeText": $("#SafaText").val(),
            "Fid": $("#hidFid").val()
        },
        success: function (msg) {
            $("#SafaDlog").css("display","none");
            if(msg.errmsg == "success"){
                var _i01 = $("#deposit li i");
                _i01.each(function () {
                    if ($(this).hasClass("defcard")) {
                        $(this).removeClass("defcard");
                    }
                });
                var fid = $("#hidFid").val();
                var _i02 = $("#deposit li input[value=" + fid + "]").parent().find("i");
                _i02.addClass("defcard");
                return;
            }

            if(msg.errcode || msg.errmsg){
                errShow(msg);
                return;
            }
        }
    })
}

function modifyCard(){
    window.location.href = "/InterFace/RepayMentCenter/BankCenter.ashx?type=alterCard&Fid=" + $("#hidFid").val();
}

function addCard(){
    //window.location.href = "/InterFace/RepayMentCenter/BankCenter.ashx?type=addBankCard&ApplyOrRepay=" + $("#hidApplyOrRepay").val() + "&PlanID=" + $("#hidPlanID").val();
	window.location.href = "/InterFace/RepayMentCenter/BankCenter.ashx?type=addBankCard&jumpurl=" + $("#hidjumpurl").val() + "&PlanID=" + $("#hidPlanID").val();
}

function confirmCard(){
    window.location.href = "/InterFace/RepayMentCenter/BankCenter.ashx?type=confirmCard&Fid=" + $("#hidFid").val()+"&jumpurl=" + $("#hidjumpurl").val() + "&PlanID=" + $("#hidPlanID").val();
	//window.location.href = "/InterFace/RepayMentCenter/BankCenter.ashx?type=confirmCard&Fid=" + $("#hidFid").val();
}

function errShow(obj) {
    if (obj.errmsg || obj.errcode) {
        $("#remind02 .motwo_wz").html(obj.errmsg);
        if(obj.errcode){
            $("#remind02 .motwo_wz404").html("错误码:" + obj.errcode);
        }else {
            $("#remind02 .motwo_wz404").css("display", "none");
        }
        $("#remind02").css("display", "block");
        return false;
    }
    return true;
}