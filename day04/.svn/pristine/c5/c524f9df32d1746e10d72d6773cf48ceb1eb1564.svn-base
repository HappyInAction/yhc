
 var jxl = new jxlModel();

        apiready = function () {

            $("#loading").css({ "display": "block" });

            var str = window.location.href;
            try {
                var params = str.split('?')[1];
                $("#hidtoken").val(params.split('&')[0].split('=')[1]);
                $("#hidwebsite").val(params.split('&')[1].split('=')[1]);
            }
            catch (e) { }
            if ($("#hidwebsite").val() == "jingdong") {
                $("#busaccount b").html("京东账号");
                $("#subbut").css({"display": "none"});
            }
            else if ($("#hidwebsite").val() == "taobao") {
                $("#busaccount b").html("淘宝账号");
                $("#subbut").css({ "display": "none" });
            }
            else {
                //显示上传图片
                uploadImgShow();
            }

            $("#loading").css({ "display": "none" });

            $(".upflpic i").each(function (i) {
                $(this).click(function () {
                    $(this).parent().remove();
                })
            });           

            //弹窗
            var errcode = "{$:errcode jsencode=”true”}";
            var errmsg = "{$:errmsg jsencode=”true”}";
            if ((errcode || errmsg) && (errcode.indexOf("jsencode") < 0)) {
                $("#remind02 .motwo_wz").html(errmsg);
                $("#remind02 .motwo_wz404").html("错误码:" + errcode);
                $("#remind02").css("display", "block");
            }
        };
       
       function img_click() {
            var imgname = 'business_';
            var has = $(".img:last").attr("id");
            var type_detail;
            if (has) {
                var imgcunt = has.split('_')[1];
                imgcunt++;                   
                imgname += imgcunt;
                type_detail = imgcunt;
            } else {
                imgname += '1';
                type_detail = 1;
            }
            $(".uppic").before("<li  class='upflpic'><img  id='" + imgname + "' src='' class='img' style='width:100%; height:100%;'><i type_detail='" + type_detail + "' onclick='imgClose(this)'></i></li>");
            uploadimg_app(imgname, imgname, "/InterFace/ValidateBusiness.ashx", function(ret, err){});
        };
            
            
        function imgClose(obj) {
            var type_detail = $(obj).attr("type_detail");
            $(obj).parent().remove();
            if (type_detail == "") {
                return;
            }
            $.ajax({
                url: '/InterFace/ValidateBusiness.ashx',
                type: 'post',
                dataType: 'txt',
                cache: false,
                data: { "type": "delete", "type_detail": type_detail },
                success: function () { }
            });
        }
        function check() {
            var yzfsname = "";//$("input:radio[name='yzfsname']:checked").val();
            var account = "";//$("#accounts").val();
            var password = "";//$("#password").val();

            window.location.href = "/InterFace/ValidateBusiness.ashx?yzfsname=" + yzfsname + "&account=" + account + "&password=" + password;         
        }


        function reqyzmfocus() {
            $("#yzmerr").css({ "display": "none" });
            //$("#reqyzm").val("");
        };


        function errShow(obj) {
            if (obj.errcode || obj.errmsg) {
                $("#remind02 .motwo_wz").html(obj.errmsg);
                $("#remind02 .motwo_wz404").html("错误码:" + obj.errcode);
                $("#remind02").css("display", "block");
                return true;
            }

            return false;
        }

        function remindShow(msg, code) {
            $("#remind02 .motwo_wz").html(msg);
            $("#remind02 .motwo_wz404").html("状态码:" + code);
            $("#remind02").css("display", "block");
        }

        function uploadImgShow()
        {
            $("#cjds").css({ "display": "none" });
            $("#uploadImg").css({ "display": "block" });

            $.ajax({
                url: '/InterFace/ValidateBusiness.ashx?type=pic',
                type: 'get',
                dataType: 'json',
                cache: false,
                success: function (msg) {
                	$("#loading").css({ "display": "none" });
                    var picarr = Array();
                    if("" == msg.Img) msg.Img = "[]";                 
                    var json = msg.Img;
                    $.each(JSON.parse(json), function (k, v) {
                        picarr.push(v);
                    });
                    picshow(picarr);                    
                }
            });
        }

        function picshow(picarr) {
            picarr.reverse();
            for (var i = 0; i < picarr.length; i++) {
                if (picarr[i].state == "1") {
                    $(".uppic").before("<li class='upflpic'><img id='business_" + picarr[i].type_detail + "' src='" + picarr[i].Img + "' class='img' style='width:100%; height:100%;'></li>");
                } else {
                    $(".uppic").before("<li class='upflpic'><img id='business_" + picarr[i].type_detail + "' src='" + picarr[i].Img + "' class='img' style='width:100%; height:100%;'><i onclick='imgClose(this)' type_detail='" + picarr[i].type_detail + "'></i></li>");
                }
            }
        }

        function turnImgShow(msg, code) {
            $("#remind03 .motwo_wz").html(msg);
            $("#remind03 .motwo_wz404").html("状态码:" + code);
            $("#remind03").css("display", "block");
        }

        function turnUploadImg() {
            window.location.href = "ValidatePhone.html?uploadImgFlag=1";
        }