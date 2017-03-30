
function jxlModel()
{
    this.defaultReqMsg = {
        token: "",
        account: "",
        password: "",
        captcha: "",
        type: "",
        website: "",
        contact1: "",
        contact2: "",
        contact3: ""
    };
    this.reqMsgType = {
        resendCaptcha: "RESEND_CAPTCHA", // 重新发送验证码
        submitPwd: "SUBMIT_PWD", // 提交密码
        submitCollectCaptcha: "SUBMIT_CAPTCHA", // 提交验证码
        resetPwd: "SUBMIT_RESET_PWD", // 重置密码
        resetPwdResendCaptcha: "RESEND_RESET_PWD_CAPTCHA"// 重新重置密码验证码
    };
    this.customer_info = {
        selected_website: [],
        skip_mobile: false,
        uid: "",
        basic_info: {
            name: "",
            id_card_num: "",
            cell_phone_num: ""           
        }
    };
    this.ApiURL = {
        getUserMsg: "/juxinli/GetUserInfo.ashx",//获取用户信息
        getDatasources: "/juxinli/datasources.ashx",//获取机构能力
        genToken: "/juxinli/applications.ashx",//生成token
        collectReq: "/juxinli/messages_req.ashx",//采集请求
        resetReq: "/juxinli/messages_reset.ashx", //重置请求
        setFlag: "/juxinli/SetGetFlag.ashx",//设置采集完成标志
        hasReport: "/juxinli/hasReport.ashx",//判断是否已获取报告
        skipReq: "/juxinli/messages_skip.ashx"//跳过当前数据源
    };
    this.currentStep = "";
    this.currentTask = "";
    this.currentWebsite = "";
    this.currentWebsiteDisplayName = "";
    this.supportDatasources = [];
    this.selectedDatasourceKeys = [];
    this.resetPwdMethod = 0;
    this.resetPwFlag = 0; //忘记密码验证码标志位
    this.collectedFlag = 0;//是否已采集数据
    this.captchaFlag = 0;//短信验证码标志位（电商）
}

jxlModel.prototype = {
    getUserMsgFn: function (Func) {
        $.ajax({
            url: this.ApiURL.getUserMsg,
            type: "post",
            dataType: "json",
            cache: false,
            data: {
            },
            success: function (msg) {
                Func(msg);
            },
            error: function () {

            }
        });
    },
    getDataSourceFn: function (Func) {
        $.ajax({
            url: this.ApiURL.getDatasources,
            type: "post",
            dataType: "json",
            cache: false,
            data: {
            },
            success: function (msg) {
                Func(msg);
            },
            error: function () {

            }
        });
    },
    getTokenFn: function (Func) {
        $.ajax({
            url: this.ApiURL.genToken,
            type: "post",
            dataType: "json",
            cache: false,
            data: {
                "request": JSON.stringify(this.customer_info)
            },
            success: function (msg) {
                Func(msg);
            },
            error: function () {

            }
        });
    },
    collectReqFn: function (Func) {
        $.ajax({
            url: this.ApiURL.collectReq,
            type: "post",
            dataType: "json",
            cache: false,
            data: {
                "request": JSON.stringify(this.defaultReqMsg)
            },
            success: function (msg) {
                Func(msg);
            },
            error: function () {

            }
        });
    },
    resetReqFn: function (Func) {
        $.ajax({
            url: this.ApiURL.resetReq,
            type: "post",
            dataType: "json",
            cache: false,
            data: {
                "request": JSON.stringify(this.defaultReqMsg)
            },
            success: function (msg) {
                Func(msg);
            },
            error: function () {

            }
        });
    },
    setFlagFn: function (Func) {
        $.ajax({
            url: this.ApiURL.setFlag,
            type: "post",
            dataType: "json",
            cache: false,
            data: {
            },
            success: function (msg) {
                Func(msg);
            },
            error: function () {

            }
        });
    },
    hasReportFn: function (Func) {
        $.ajax({
            url: this.ApiURL.hasReport,
            type: "post",
            dataType: "json",
            cache: false,
            data: {
            },
            success: function (msg) {
                Func(msg);
            },
            error: function () {

            }
        });
    },
    skipReqFn: function (Func) {
        $.ajax({
            url: this.ApiURL.hasReport,
            type: "post",
            dataType: "json",
            cache: false,
            data: {
                "request": this.defaultReqMsg.token
            },
            success: function (msg) {
                Func(msg);
            },
            error: function () {
                
            }
        });
    }
}
