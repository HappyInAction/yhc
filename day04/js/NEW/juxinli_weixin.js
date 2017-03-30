
//运营商数据采集

function dealUserMsg(msg) {

    $("#loading").css({ "display": "none" });
    //弹窗
    if (errShow(msg)) {
        return false;
    }

    jxl.customer_info.basic_info.cell_phone_num = msg.mobile;
    jxl.customer_info.basic_info.id_card_num = msg.creid;
    jxl.customer_info.basic_info.name = msg.name;
    jxl.customer_info.uid = msg.uid;
}


function dealDataSource(msg) {
    $("#loading").css({ "display": "none" });

    if (errShow(msg)) {
        return false;
    }

    if (usermsgflag == 1)//返回错误信息
    {
        return false;
    }

    var datasource = $.parseJSON(msg.reponse);
    if (datasource.success != true) //请求失败
    {
        remindShow("系统繁忙，请稍后重试", "000000");
        return false;
    }

    var data = datasource.data;
    var namelist = "";
    for (var i = 0; i < data.length; i++) {
        namelist += data[i].name + ",";
    }
    if (namelist.indexOf("京东") < 0) {
        $("#label02").css({ "display": "none" });
    }
    if (namelist.indexOf("淘宝") < 0) {
        $("#label01").css({ "display": "none" });
    }
    if (namelist.indexOf("京东") >= 0 || namelist.indexOf("淘宝") >= 0) {
        $("#bussele").css({ "display": "block" });
    }
    else {
        application();//直接提交申请
    }
}


function dealToken(msg) {
    $("#loading").css({ "display": "none" });

    if (errShow(msg)) {
        return false;
    }

    var datasource = $.parseJSON(msg.reponse);
    if (datasource.success != true) //请求失败
    {
        remindShow("系统繁忙，请稍后重试", "000000");
        return false;
    }
    var data = datasource.data;
    jxl.defaultReqMsg.token = data.token;
    jxl.defaultReqMsg.website = data.datasource.website;
    jxl.defaultReqMsg.account = data.cell_phone_num;
    jxl.resetPwdMethod = data.datasource.reset_pwd_method;

    if (jxl.resetPwdMethod != 0) {
        $("#retrunlog").css({ "display": "none" });
        $("div .bank_bom").css({ "display": "block" });
    }
    var status = data.datasource.status;
    if (status != 1)//运营商不支持或已下线
    {
        if (jxl.customer_info.selected_website == [])//没有选择电商，结束采集数据
        {
            window.location.href = "/Tenant/Personal/Information02.aspx";
        }
        else //跳转采集电商数据
        {
            window.location.href = "/template/ValidateShop-juxinli.html?token=" + jxl.defaultReqMsg.token + "&website=" + jxl.defaultReqMsg.website;
        }
    }
}


function dealReq(msg) {
    $("#loading").css({ "display": "none" });

    if (errShow(msg)) {
        return false;
    }

    var datasource = $.parseJSON(msg.reponse);
    if (datasource.success != true)  //请求失败
    {
        remindShow("系统繁忙，请稍后重试", "000000");
        return false;
    }
    var data = datasource.data;
    if (data.process_code == 10003)//密码错误
    {
        remindShow("密码错误，请重新输入", data.process_code);
        $("#phone").val("");
    }
    else if (data.process_code == 10004 || data.process_code == 10006)//短信验证码错误/失效
    {
        $("#remind01 #yzmerr").css({ "display": "block" });
        $("#remind01 #yzmerr").html("短信验证码错误/失效，请重新输入");
        $("#remind01").css({ "display": "block" });
    }
    else if (data.process_code == 10007)//简单密码或初始密码无法登录
    {
        remindShow("验证失败，请修改密码后重试", data.process_code);
    }
    else if (data.process_code == 30000 || data.process_code == 0)//采集请求超时
    {
        remindShow("验证失败，请稍后再试", data.process_code);
    }
    else if (data.process_code == 10002 || data.process_code == 10001)//输入短信验证码
    {
        $("#remind01").css({ "display": "block" });
    }
    else if (data.process_code == 10008)//开始采集数据
    {
        //跳转电商采集数据
        if (data.finish != true) {
            //提前设置标志位
            jxl.defaultReqMsg.website = data.next_datasource.website;
            jxl.setFlagFn(dealSetFlagAdvance);
        }
        else {
            //设置采集完成标志
            jxl.setFlagFn(dealSetFlag);
        }
    }
}

function dealResetReq(msg) {
    $("#loading").css({ "display": "none" });

    if (errShow(msg)) {
        return false;
    }

    var datasource = $.parseJSON(msg.reponse);
    if (datasource.success != true) //请求失败
    {
        remindShow("系统繁忙，请稍后重试", "000000");
        return false;
    }

    var data = datasource.data;
    if (data.process_code == 31000 || data.process_code == 30000)//重置密码失败，建议到营业厅重置密码
    {
        remindShow("建议按下图方式找回服务密码", data.process_code);
    }
    else if (data.process_code == 10004 || data.process_code == 10006)//短信验证码错误
    {
        remindShow("短信验证码错误，请重新输入", data.process_code);
    }
    else if (data.process_code == 10002 || data.process_code == 10001)//输入短信验证码
    {
        jxl.resetPwFlag = 1;
    }
    else if (data.process_code == 0)//请求超时
    {
        remindShow("重置密码失败，请稍后再试", data.process_code);
    }
    else if (data.process_code == 11000)//重置密码成功
    {
        remindShow("重置成功，请重新登录", data.process_code);

    }
    else if (data.process_code == 10010)//新密码格式错误
    {
        remindShow("新密码格式错误，请重新输入", data.process_code);
    }
}

function dealSetFlagAdvance(msg) {
    window.location.href = "/template/ValidateShop-juxinli.html?token=" + jxl.defaultReqMsg.token + "&website=" + jxl.defaultReqMsg.website;
}


function dealSetFlag(msg) {
    if (errShow(msg)) {
        return false;
    }

    window.location.href = "/Tenant/Personal/Information02.aspx";
}


//电商确认
function chkbusiness() {
    if (!$("#yzfs01").attr("checked") && !$("#yzfs02").attr("checked")) {
        //提示选择电商
        $("#bussele").css({ "display": "block" });
        $("#buserr").html("请选择验证的电商数据");
        $("#buserr").css({ "display": "block", "color": "red" });
        return false;
    }
    application();
}

//提交申请单
function application() {
    if ($("#yzfs01").attr("checked") && !$("#yzfs02").attr("checked")) {
        jxl.customer_info.selected_website = [{
            "name": "taobao",
            "category": "e_business"
        }];
    }
    else if ($("#yzfs02").attr("checked") && !$("#yzfs01").attr("checked")) {
        jxl.customer_info.selected_website = [{
            "name": "jingdong",
            "category": "e_business"
        }];
    }
    else if ($("#yzfs02").attr("checked") && $("#yzfs01").attr("checked")) {
        jxl.customer_info.selected_website = [{
            "name": "taobao",
            "category": "e_business"
        }, {
            "name": "jingdong",
            "category": "e_business"
        }
        ];
    }
    else {
        jxl.customer_info.selected_website = [];
    }

    $("#bussele").css({ "display": "none" });
    $("#loading").css({ "display": "block" });

    jxl.getTokenFn(dealToken);

}


function msg_req(type_in) {
    if (usermsgflag == 1)//返回错误信息
    {
        remindShow("系统繁忙，请稍后重试", "000001");
        return false;
    }

    $("#remind01").css({ "display": "none" });

    jxl.defaultReqMsg.password = $("#phone").val().trim();
    jxl.defaultReqMsg.captcha = $("#reqyzm").val().trim();
    jxl.defaultReqMsg.type = type_in;

    if (!type_in && !chk_6num(jxl.defaultReqMsg.password) && !chk_8num(jxl.defaultReqMsg.password)) {
        $("#remind02 .motwo_wz").html("请输入服务密码");
        $("#remind02").css("display", "block");
        return false;
    }

    if (type_in == jxl.reqMsgType.submitCollectCaptcha)//提交短信验证码
    {
        if (!chk_6char(jxl.defaultReqMsg.captcha) && !chk_8char(jxl.defaultReqMsg.captcha)) {
            $("#remind01").css({ "display": "block" });
            $("#yzmerr").css({ "display": "block" });
            return false;
        }
    }
    $("#loading").css({ "display": "block" });

    jxl.collectReqFn(dealReq);

};


function reset_pw(type_in) {
    jxl.defaultReqMsg.type = type_in;
    jxl.defaultReqMsg.captcha = $("#newfwyzm").val().trim();
    jxl.defaultReqMsg.password = $("#newfwpw").val().trim();

    if (jxl.resetPwFlag == 1 && jxl.defaultReqMsg.type == jxl.reqMsgType.resetPwd && $("#resetpw").val() == "忘记密码") {
        jxl.defaultReqMsg.type = jxl.reqMsgType.resetPwdResendCaptcha;
    }
    if (jxl.resetPwdMethod == 1) {
        $("#newyzm").css({ "display": "block" });
    }
    else if (jxl.resetPwdMethod == 2) {
        $("#newpw").css({ "display": "block" });
        $("#newyzm").css({ "display": "block" });
    }
    $("#fwpw").css({ "display": "none" });

    if ($("#resetpw").val() == "忘记密码") {
        $("#resetpw").val("重置密码");
        $("#retrunlog").css({ "display": "inline-block" });
    }
    $("#loading").css({ "display": "block" });

    jxl.resetReqFn(dealResetReq);
}

function relogin() {
    //隐藏服务密码输入
    $("#retrunlog").css({ "display": "none" });
    $("#resetpw").val("忘记密码");
    $("#newpw").css({ "display": "none" });
    $("#newyzm").css({ "display": "none" });
    $("#phone").val("");
    $("#fwpw").css({ "display": "block" });
}

//重发短信验证码：重置密码
function reset_sendyzm() {
    $("#newfwpw").val("");
    $("#newfwyzm").val("");
    reset_pw(jxl.reqMsgType.resetPwdResendCaptcha);
}

//重发短信验证码
function resendyzm() {
    msg_req(jxl.reqMsgType.resendCaptcha);
}

//提交短信验证码
function submityzm() {
    msg_req(jxl.reqMsgType.submitCollectCaptcha);
}



/******************************************/

//电商数据采集

function dealSetFlag_bus(msg) {
    if (errShow(msg)) {
        return false;
    }

    window.location.href = "/Tenant/Personal/Information02.aspx";

}

function dealCollectReq_bus(msg) {
    jxl.captchaFlag = 0;
    $("#loading").css({ "display": "none" });

    if (errShow(msg)) {
        return false;
    }

    var datasource = $.parseJSON(msg.reponse);
    if (datasource.success != true) //请求失败
    {
        remindShow("系统繁忙，请稍后重试", "000000");

        return false;
    }
    var data = datasource.data;
    if (data.process_code == 10003)//密码错误
    {
        remindShow("密码错误，请重新输入", data.process_code);

        $("#buspw").val("");
    }
    else if (data.process_code == 10004 || data.process_code == 10006)//短信验证码错误/失效
    {
        $("#reqyzm").val("");
        $("#remind01 #yzmerr").css({ "display": "block" });
        $("#remind01 #yzmerr").html("短信验证码错误/失效，请重新输入");
        $("#remind01").css({ "display": "block" });
    }
    else if (data.process_code == 10007)//简单密码或初始密码无法登录
    {
        remindShow("验证失败，请修改密码后重试", data.process_code);

    }
    else if (data.process_code == 30000 || data.process_code == 0)//超时
    {
        remindShow("验证失败，请稍后再试", data.process_code);

    }
    else if (data.process_code == 10002 || data.process_code == 10001)//输入短信验证码
    {
        jxl.captchaFlag = 1;
        $("#remind01").css({ "display": "block" });
    }
    else if (data.process_code == 10008)//开始采集数据
    {
        //跳转电商采集数据
        if (data.finish != true) {
            $("#busac").val("");
            $("#buspw").val("");
            $("#reqyzm").val("");
            jxl.defaultReqMsg.website = data.next_datasource.website;
            window.location.href = "/template/ValidateShop-juxinli.html?token=" + jxl.defaultReqMsg.token + "&website=" + jxl.defaultReqMsg.website;
        }
        else {
            //设置采集完成标志
            jxl.setFlagFn(dealSetFlag_bus);
        }
    }
}


function msg_req_bus(type_in) {
    jxl.defaultReqMsg.type = type_in;
    jxl.defaultReqMsg.captcha = $("#reqyzm").val().trim();
    jxl.defaultReqMsg.account = $("#busac").val().trim();
    jxl.defaultReqMsg.password = $("#buspw").val().trim();
    jxl.defaultReqMsg.token = $("#hidtoken").val().trim();
    jxl.defaultReqMsg.website = $("#hidwebsite").val().trim();

    if (jxl.defaultReqMsg.account == "" || jxl.defaultReqMsg.password == "") {
        $("#remind01").css({ "display": "none" });
        $("#remind02 .motwo_wz").html("请输入电商账户密码");
        $("#remind02").css({ "display": "block" });
        return false;
    }
    if (type_in == jxl.reqMsgType.submitCollectCaptcha || jxl.captchaFlag == 1)//提交短信验证码
    {
        if (!chk_6char(jxl.defaultReqMsg.captcha) && !chk_8char(jxl.defaultReqMsg.captcha)) {
            $("#yzmerr").css({ "display": "block" });
            $("#remind01").css({ "display": "block" });
            return false;
        }
    }
    $("#remind01").css({ "display": "none" });
    $("#loading").css({ "display": "block" });

    jxl.collectReqFn(dealCollectReq_bus);

};
