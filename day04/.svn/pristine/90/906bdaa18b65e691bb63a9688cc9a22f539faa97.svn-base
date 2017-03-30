/**
 * Created by Administrator on 2016/4/27.
 */
function submitfn(){
    if($("#idcard").val() == ""){
        $("#idcard").val("请输入身份证");
        $("#idcard").css("color", "red");
        return;
    }else if(!chk_idcard($("#idcard").val())){
        $("#idcard").val("身份证格式错误");
        $("#idcard").css("color", "red");
        return;
    } else if($("#phone").val() == ""){
        $("#phone").val("请输入手机号码");
        $("#phone").css("color", "red");
        return;
    }else if(!chk_phone($("#phone").val())){
        $("#phone").val("手机号码格式错误");
        $("#phone").css("color", "red");
        return;
    }

    $.ajax({
        url:"/InterFace/PersonalCenter/Appeal.ashx",
        type:"post",
        dataType:"json",
        data:{
            "type": "Appeal",
            "appealType": $("#appealType").val(),
            "ID": $("#idcard").val(),
            "mobile": $("#phone").val()
        },
        success:function(msg){
            if(msg.errmsg == "success"){
                $("#remind").on("click", function(){
                    window.location.href = "/Tenant/Personal/Personal.aspx";
                });
                errShow({"errmsg": "申述成功！", "errcode": ""});
            }else {
                errShow(msg);
            }
        }
    })
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
