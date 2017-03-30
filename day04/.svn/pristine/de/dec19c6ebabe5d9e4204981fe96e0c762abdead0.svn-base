
  var wait = 60;
        function time(o) {
            if (wait == 0) {
                o.removeAttribute("disabled");
                o.value = "发送邮件";
                wait = 60;
                o.style.fontSize = "0.8rem";
                o.style.background = "#f64349";
            } else {
                o.setAttribute("disabled", true);
                o.value = wait + "秒后重新发送";
                o.style.fontSize = "0.6rem";
                o.style.background = "#ccc";
                wait--;
                setTimeout(function () {
                    time(o)
                },
                1000)
            }
        }
                          
        apiready = function () {
            var email = "{$:email jsencode=”true”}",
		    role01 = "{$:role01 jsencode=”true”}",
		    role02 = "{$:role02 jsencode=”true”}",
		    role03 = "{$:role03 jsencode=”true”}",
		    name01 = "{$:name01 jsencode=”true”}",
		    name02 = "{$:name02 jsencode=”true”}",
		    name03 = "{$:name03 jsencode=”true”}",
		    phone01 = "{$:phone01 jsencode=”true”}",
		    phone02 = "{$:phone02 jsencode=”true”}",
		    phone03 = "{$:phone03 jsencode=”true”}",
		    emlhei = "2.66rem";//"8.266rem";
            conhei = "16.8rem";
            if (email) {
                //$('#hidinput').val('1');
                $('.rzyzm,.rz_tips').remove();
                $('.emailspan').html(email);
                //$('#btnemail').val("已认证");
                //$('#btnemail').attr('disabled', 'true');
                emlhei = '2.66rem';
                $('.email_nr').css('height', emlhei);
                $("#yxrz_mail").val(email);
            }

            if (role01) {
                $('#role01').val(role01);
            }
            if (role02) {
                $('#role02').val(role02);
            }
            if (role03) {
                $('#role03').val(role03);
            }
            chasele();

            
            //select
            $("#role01").change(function () {
                if ($(this).val() != role01) {
                    $("#name01,#phone01").attr("style", "color:black");
                    $("#name01").val("");                 
                    $("#phone01").val("");                  
                } else {
                    chasele()
                    $("#name01,#phone01").attr("style", "color:black");
                }
            })
            $("#role02").change(function () {
                if ($(this).val() != role02) {
                    $("#name02,#phone02").attr("style", "color:black");
                    $("#name02").val("");                  
                    $("#phone02").val("");                  
                } else {
                    chasele()
                    $("#name02,#phone02").attr("style", "color:black");
                }
            })
            $("#role03").change(function () {
                if ($(this).val() != role03) {
                    $("#name03,#phone03").attr("style", "color:black");
                    $("#name03").val("");                 
                    $("#phone03").val("");                
                } else {
                    chasele()
                    $("#name03,#phone03").attr("style", "color:black");
                }
            })

            //弹窗
            var errcode = "{$:errcode jsencode=”true”}";
            var errmsg = "{$:errmsg jsencode=”true”}";
            if (errmsg) {
                $("#errmsg").html("错误代码:" + errcode + "," + errmsg);
                $(".modal01").css("display", "block");
            }

            $(".email p").click(function () {
                $('.email_nr').css('transition', 'height ease-in-out 1s');
                if ($('.email_nr').height() == 0) {
                    $('.email_nr').css({ 'height': emlhei, 'border-top': '1px #ddd solid' });
                    $('.email p').css({ 'background': 'url(../images/arror-r2.png) right center no-repeat', 'background-size': '0.666rem 0.5rem' });
                    $('.contacts_nr').css({ 'height': '0', 'border-top': 'none' });
                } else {
                    $('.email_nr').css({ 'height': '0', 'border-top': 'none' });
                    $('.email p').css({ 'background': 'url(../images/arror-r1.png) right center no-repeat', 'background-size': '0.666rem 0.5rem' });
                }
            });
            $(".contacts p").click(function () {
                $('.contacts_nr').css('transition', 'height ease-in-out 1s');
                if ($('.contacts_nr').height() == 0) {
                    $('.contacts_nr').css({ 'height': conhei, 'border-top': '1px #ddd solid' });
                    $('.contacts p').css({ 'background': 'url(../images/arror-r2.png) right center no-repeat', 'background-size': '0.666rem 0.5rem' });
                    $('.email_nr').css({ 'height': '0', 'border-top': 'none' });
                } else {
                    $('.contacts_nr').css({ 'height': '0', 'border-top': 'none' });
                    $('.contacts p').css({ 'background': 'url(../images/arror-r1.png) right center no-repeat', 'background-size': '0.666rem 0.5rem' });
                }
            });

            //
            $("input").focusin(function () {
            	if($(this).val().indexOf("手机号码") > -1){
            		$(this).attr("type", "number");
            		$(this).attr("style", "color:black");
                    $(this).val("");
            	}else if ($(this).val().indexOf("请输入") > -1) {
                    $(this).attr("style", "color:black");
                    $(this).val("");
                }
            });

            $("#name01,#name02,#name03").focusout(function () {
                if ($(this).val() == "" || !chk_chinese($(this).val())) {
                    $(this).val("请输入姓名");
                    $(this).attr("style", "color:red");
                }
            });
            $("#phone01,#phone02,#phone03").focusout(function () {
                if ($(this).val() == "" || !chk_mobile($(this).val())) {
                	$(this).attr("type", "text");
                    $(this).val("请输入手机号码");
                    $(this).attr("style", "color:red");
                }
            });
            $("input[type!=submit]").bind('input propertychange', function () {
                if ($(this).val() == "") {
                    $(this).attr("style", "color:black");
                }
                if(chk_mobile($("#phone01").val()) || chk_mobile($("#phone02").val()) || chk_mobile($("#phone03").val())){
                    if ($("#phone01").val() != "" && $("#phone01").val() == $("#phone02").val()){
                    	$("#phone02").attr("type", "text");
                        $("#phone02").val("手机号码不能重复");
                        $("#phone02").attr("style", "color:red");
                    } else if ($("#phone03").val() != "" && ($("#phone01").val() == $("#phone03").val() || $("#phone02").val() == $("#phone03").val())) {
                        $("#phone03").attr("type", "text");
                        $("#phone03").val("手机号码不能重复");
                        $("#phone03").attr("style", "color:red");
                    }
                }
                if (chk_chinese($("#name01").val()) && chk_chinese($("#name02").val()) && chk_chinese($("#name03").val()) && chk_mobile($("#phone01").val()) && chk_mobile($("#phone02").val()) && chk_mobile($("#phone03").val())) {
                    $("#rzbtn").attr("class", "pass");
                    $("#rzbtn").removeAttr("disabled");
                } else {
                    $("#rzbtn").attr({ "disabled": "", "class": "" });
                }
            })

        }

		function chasele() {
            if (name01) {
                $('#name01').val(name01);     
            }
            if (name02) {
                $('#name02').val(name02);                
            }
            if (name03) {
                $('#name03').val(name03);                  
            }
            if (phone01) {
                $('#phone01').val(phone01);                   
            }
            if (phone02) {
                $('#phone02').val(phone02);                  
            }
            if (phone03) {
                $('#phone03').val(phone03);                   
            }
            if (chk_chinese($("#name01").val()) && chk_chinese($("#name02").val()) && chk_chinese($("#name03").val()) && chk_mobile($("#phone01").val()) && chk_mobile($("#phone02").val()) && chk_mobile($("#phone03").val())) {
                $("#rzbtn").attr("class", "pass");
                $("#rzbtn").removeAttr("disabled");
            } else {
                $("#rzbtn").attr({ "disabled": "", "class": "" });
            }
        }
            