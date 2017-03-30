$(function () {
    var input2 = $("#password"),
        input3 = $("#tj_pic"),
        submitBtn = $("#form_submit"),
        picFlag = false,
        userErrFlag = false;
    input2.on({
        input: function(){
            if(chk_gt6char($(this).val()))
            {
                submitBtn.attr({
                    "class": "pass"
                });
            }
        }
    });
    input3.on({
        input: function(){
            if( chk_gt4char($(this).val()) && chk_gt6char(input2.val()) )
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
            "disabled":true,
            "class":""
        });
        if( input2.val()==="" )
        {
            $("#errmsg").html("请填写您的独立密码");
            $("#errPop").css("display", "block");
            $(this).attr({
                "disabled":false,
                "class":"pass"
            });
            return;
        }
        if( picFlag )
        {
            if($("#tj_pic").val()==="")
            {
                $("#errmsg").html("请完整填写图片验证码");
                $("#errPop").css("display", "block");
                $(this).attr({
                    "disabled":false,
                    "class":"pass"
                });
                return;
            }
            else
            {
                $("#loading").css("display","block");
                $.ajax({
                    url: "/InterFace/ValidateEmail_TJ.ashx",//"http://localhost/test/index2.php",
                    type: "post",
                    data: {
                        Type: "pic_codelanding",
                        dulipassCrawl: input2.val(),
                        password: $("#password").val(),
                        etoken: _eToken
                    },
                    success: function(msg){
                        $("#loading").css("display","none");
                        submitBtn.attr({
                            "disabled":false,
                            "class":"pass"
                        });
                        //切换状态    
                        if( msg.errmsg==="请输入验证码" )
                        {
                            picFlag = false;
                            userErrFlag = true;
                            _eToken = msg.token;
                            openErrPopup(msg.errcode,"验证码错误");
                            return;
                        }
                        else
                        {
                            openErrPopup(msg.errcode,"独立密码错误"); 
                            return;
                        }        
                        //msg = JSON.parse(msg);
                        alert(msg);
                        location.href = msg.url+"?etoken="+_eToken;
                    },
                    error: function(err){
                        alert(err.statusText);
                    }
                }); 
            }
        }
        else
        {
            $("#loading").css("display","block");
            //如果独立密码或验证码错误，则改变请求数据
            if(!userErrFlag)
            {
                var data = {
                    Type: "dulipasslanding",
                    dulipassCrawl: input2.val(),
                    etoken: GetQueryString(etoken)
                };
            }
            else
            {
                var data = {
                        Type: "dulipasslanding",
                        dulipassCrawl: input2.val(),
                        pic_code: $("#tj_pic").val(),
                        etoken: GetQueryString(etoken)
                    };         
            }
            $.ajax({
                url: "/InterFace/ValidateEmail_TJ.ashx",//"http://localhost/test/index2.php",
                type: "post",
                data: data,
                success: function(msg){
                    $("#loading").css("display","none");
                    submitBtn.attr({
                        "disabled":false,
                        "class":"pass"
                    });
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
                    if( msg.errmsg!="请输入验证码" )
                    {
                        openErrPopup(msg.errcode,msg.errmsg);
                        return;
                    }
                    //判断是否需要图片验证
                    if( msg.errcode==="请输入验证码" )
                    {
                        picFlag = true;
                        $("#verifi_box").css("display","block");
                        $(".verifi_img").css({
                            "background": "url("+msg.PicCode+")",
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
                },
                error: function(err){
                    alert(err.statusText);
                }
            });
        }
    });
    //弹窗
    function openErrPopup(errcode,errmsg)
    {
        if (errmsg) {
            $("#errmsg").html(errmsg);
            $(".modal01").css("display", "block");
        }
    }
    //获取地址栏参数
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;

    }
})