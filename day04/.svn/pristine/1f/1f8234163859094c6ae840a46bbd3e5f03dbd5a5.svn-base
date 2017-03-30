/**
* @file ValidateCreditCard_tianji.js
* @description 页面流程js
*
*/
$(function () {
    //切换是否同意邮箱协议与开启智能收取账单
    check($("#check1"),$("input[name='agreement']"),true);
    check($("#check2"),$("input[name='intelDet']"),true);
    var input1 = $("#accounts"),
        input2 = $("#password"),
        input3 = $("#tj_pic"),
        submitBtn = $("#form_submit"),
        picFlag = false,    //用于标识是否需要开启图片验证
        userErrFlag = false;    //用户名或密码错误或验证码错误标识符
    input1.on({
        input: function(){
            if(!chk_email($(this).val()))
            {
                $(this).css("color","red");
                submitBtn.attr({
                    "class": ""
                });
            }
            else
            {
                $(this).css("color","black");
                if(input2.val()!="")
                {
                    submitBtn.attr({
                        "class": "pass"
                    });
                }
            }
        }
    });
    input2.on({
        input: function(){
            if( chk_email(input1.val()) && input1.val()!="" && chk_gt6char($(this).val()) )
            {
                submitBtn.attr({
                    "class": "pass",
                    "disabled": false
                });
            }
        }
    });
    input3.on({
        input: function(){
            if(chk_email(input1.val()) && input1.val()!="" && chk_gt4char($(this).val()) && chk_gt6char(input2.val()))
            {
                submitBtn.attr({
                    "class": "pass",
                    "disabled": false
                });
            }
        }
    });
    submitBtn.on("click",function(){
        $(this).attr({
            "class":"",
            "disabled":true
        }); 
        if($("input[name='agreement']").val()!=1)
        {
            openErrPopup("100401","请先同意邮箱账单协议");
            $(this).attr("disabled",false);
            return;
        }
        if( !chk_email(input1.val()) || input1.val()==="" || input2.val()==="" )
        {
            openErrPopup("100402","请完整填写信息");
            $(this).attr({
                "class":"pass",
                "disabled":false
            });
            return;
        }
        if(picFlag)
        {
            if($("#tj_pic").val()==="")
            {
                openErrPopup("100403","请完整填写图片验证码");
                $(this).attr({
                    "class":"pass",
                    "disabled":false
                });
                return;
            }
            else
            {
                $("#loading").css("display","block");
                $.ajax({
                    url: "/InterFace/ValidateEmail_TJ.ashx",//"http://localhost/test/ValidateC1.php",
                    type: "post",
                    data: {
                        Type: "pic_codelanding",
                        email: input1.val(),
                        password: $("#password").val(),
                        pic_code: $("#tj_pic").val(),
                        etoken: _eToken
                        
                    },
                    success: function(msg){
                        $("#loading").css("display","none");
                        submitBtn.attr({
                            "class":"pass",
                            "disabled":false
                        });

                        $(".verifi_img").css({
                            "background": "url(data:image/png;base64," + msg.PicCode + ") no-repeat",
                            "background-size": "contain"
                        });

                        //msg = JSON.parse(msg);
                        /*if( msg.errmsg==="用户名或密码错误" || msg.errmsg==="请输入验证码" )
                        {
                            picFlag = false;
                            userErrFlag = true;
                            _eToken = msg.token;
                        }*/
                        if( msg.errmsg!="请输入独立密码" )
                        {
                            if( msg.errmsg==="请输入验证码" )
                            {
                                $("#get_verifi_img").css({
                                    "display": "inline-block",
                                    "position": "relative",
                                    "z-index": "0"
                                });
                                openErrPopup(msg.errcode,"验证码错误");
                            }
                            else if (msg.errmsg === "用户名或密码错误") {
                                picFlag = false;
                                userErrFlag = true;
                                _eToken = msg.token;
                                $("#get_verifi_img").css({
                                    "display": "none",
                                    "position": "relative",
                                    "z-index": "-2"
                                });
                                openErrPopup(msg.errcode, "用户名或密码错误");
                            }
                            else
                            {
                               openErrPopup(msg.errcode,msg.errmsg); 
                            }
                            return;
                        }
                        //判断是否需要独立验证
                        if( msg.errmsg==="请输入独立密码" )
                        {
                            location.href = msg.url+"?etoken="+msg.etoken;
                        }
                    },
                    error: function(err){
                        $("#loading").css("display","none");
                        submitBtn.attr({
                            "class":"pass",
                            "disabled":false
                        });
                        alert(err.statusText);
                    }
                }); 
            }
        }
        else
        {
            $("#loading").css("display","block");
            //如果用户名或密码错误，则改变请求数据
            if(!userErrFlag)
            {
                var data = {
                    Type: "login",
                    email: input1.val(),
                    password: $("#password").val(),
                    intelDet: $("input[name='intelDet']").val()
                };
            }
            else
            {
                var data = {
                        Type: "login",
                        email: input1.val(),
                        password: $("#password").val(),
                        pic_code: $("#tj_pic").val(),
                        intelDet: $("input[name='intelDet']").val(),
                        etoken: _eToken             
                    };
            }
            $.ajax({
                url: "/InterFace/ValidateEmail_TJ.ashx",//"http://localhost/test/ValidateC1.php",
                type: "post",
                data: data,
                success: function(msg){
                    //首次请求；返回验证码或直接登录成功
                    $("#loading").css("display","none");
                    submitBtn.attr({
                        "class":"pass",
                        "disabled":false
                    });
                    //msg = JSON.parse(msg);
                    _eToken = msg.etoken;
                    if(userErrFlag)
                    {
                        if( msg.errmsg==="请输入验证码" )
                        {
                            $(".verifi_img").css({
                                "background": "url(data:image/png;base64," + msg.PicCode + ") no-repeat",
                                "background-size": "contain"
                            });
                            $("#get_verifi_img").css({
                                "display": "inline-block",
                                "position": "relative",
                                "z-index": "0"
                            });
                            openErrPopup("", "验证码错误");
                            picFlag = true;
                            return;
                        }   
                    }
                    if( msg.errmsg!="请输入验证码"&&msg.errmsg!="请输入独立密码" )
                    {
                        openErrPopup(msg.errcode,msg.errmsg);
                        return;
                    }
                    if( msg.errmsg==="请输入独立密码")
                    {
                        location.href = msg.url+"?etoken="+_eToken;
                        return;
                    }
                    //判断是否需要图片验证
                    if( msg.errmsg==="请输入验证码" )
                    {
                        picFlag = true;
                        $("#verifi_box").css("display","block");
                        $(".verifi_img").css({
                            "background": "url(data:image/png;base64,"+msg.PicCode+") no-repeat",
                            "background-size": "contain"
                        });
                        $("#get_verifi_img").on("click", function () {
                            submitBtn.attr({
                                "class": "",
                                "disabled": true
                            });
                            $.ajax({
                                url: "/InterFace/ValidateEmail_TJ.ashx",//"http://localhost/test/ValidateC1.php",
                                type: "post",
                                data: {
                                    Type:"PicCodeRefresh",
                                    etoken: _eToken
                                },
                                success: function (msg) {
                                    submitBtn.attr({
                                        "class": "pass",
                                        "disabled": false
                                    });
                                    $(".verifi_img").css({
                                        "background": "url(data:image/png;base64,"+msg.PicCode+") no-repeat",
                                        "background-size": "contain"
                                    });
                                    picFlag = true;
                                },
                                error: function(err){
                                    alert(err.statusText);
                                }
                            });
                        });                       
                    }
                    else if( msg.errmsg==="登陆成功" )
                    {
                        location.href = "http://www.baidu.com";
                    }
                },
                error: function(err){
                    $("#loading").css("display","none");
                    submitBtn.attr({
                        "class":"pass",
                        "disabled":false
                    });
                    alert(err.statusText);
                }
            });    
        }  
        return false;         
    });
    //弹窗
    function openErrPopup(errcode,errmsg)
    {
        if (errmsg) {
            $("#errmsg").html(errmsg);
            $("#errPop").css("display", "block");
        }
    }
    //checkbox
    function check(obj1,obj2,flag)
    {
        obj1.on("click",function(){
            if(flag)
            {
                obj2.attr("class","iCheck");
                obj2.val("0");
                flag = false;
            }
            else
            {
                obj2.attr("class","iChecked");
                obj2.val("1");
                flag = true;
            }
        });
    }
})