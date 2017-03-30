
var usermsgflag = 0;
        var uploadImgFlag = 0;//上传图片的标志

        var jxl = new jxlModel();
		apiready = function(){
			//弹窗
            var errcode = "{$:errcode jsencode=”true”}";
            var errmsg = "{$:errmsg jsencode=”true”}";
            if ((errcode || errmsg) && (errcode.indexOf("jsencode") < 0)) {
                $("#loading").css({ "display": "none" });
                $("#remind02 .motwo_wz").html(errmsg);
                $("#remind02 .motwo_wz404").html("错误码:" + errcode);
                $("#remind02").css("display", "block");
                usermsgflag = 1;
            }

            var str = window.location.href;
            try {
                var params = str.split('?')[1];
                if (params.indexOf("uploadImgFlag") != -1)
                {
                    uploadImgFlag = 1;
                }
            }
            catch (e) { }

            //判断是否只上传图片
            if (uploadImgFlag == 1) {
                $("#subbut").css({ "display": "inline-block" });
                onlyUploadImg();
            }
            else {
                //判断是否已采集数据
                jxl.hasReportFn(dealHasReport);
            }
                    

            $(".onli_yzfs input[type=radio]").bind("click", function () {
                if ($(this).attr("checked")) {
                    $(this).attr("checked", false);
                    $(this).next("label").removeClass("pass");
                }
                else {                   
                    $(this).attr("checked", true);
                    $(this).next("label").addClass("pass");
                }
                $("#buserr").css({ "display": "none" });
            });

            $(".upflpic i").each(function (i) {
                $(this).click(function () {
                    $(this).parent().remove();
                })
            });

            $(".yzfs_rt label").each(function (i) {
                $(this).click(function () {
                    if (!$(".yzfs_rt input").eq(i).is(":checked")) {
                        $(".yzfs_rt label").attr("class", "");
                        $(".yzfs_rt label").eq(i).addClass("pass");
                        $(".qhtab").css("display", "none");
                        $(".qhtab").eq(i).css("display", "block");
                    }
                })
            });
		}

        function img_click(){
            var imgname = 'img_';
            var has = $(".img:last").attr("id");
            if (has) {
                var imgcunt = has.split('_')[1];
                imgcunt++;
                imgname += imgcunt;
            } else {
                imgname += '1';
            }
            $(".uppic").before("<li  class='upflpic'><img  id='" + imgname + "' src='' class='img' style='width:100%; height:100%;'><i onclick='$(this).parent().remove()'></i></li>");
            uploadimg_app(imgname, imgname, "/InterFace/ValidatePhone.ashx", function(ret, err){});
        }

        function imgClose(obj) {
            var type_detail = $(obj).attr("type_detail");
            $(obj).parent().remove();
            if(type_detail==""){
                return;
            }
            $.ajax({
                url: '/InterFace/ValidatePhone.ashx',
                type: 'post',
                dataType: 'txt',
                cache: false,
                data: { "type": "delete","type_detail":type_detail},
                success: function () {}
            });
        }
      
        
        function showMsg()
        {
            //服务密码已认证
            $("#yzdiv").css({ "display": "none" });
            $("#rzimg").css({"display": "block"});

            //显示上传截图
            $("#labeltop02").css({ "display": "inline-block" });

            getImg();
        }

        function onlyUploadImg()
        {
            $("#labeltop01").css({ "display": "none" });
            $("#cjtxl").css({ "display": "none" });

            //显示上传截图
            $("#labeltop02").css({ "display": "inline-block" });
            $("#labeltop02").addClass("pass");
            $("#sctxl").css({ "display": "block" });
            getImg();
        }

        function getImg()
        {
            $.ajax({
                url: '/InterFace/ValidatePhone.ashx?type=pic',
                type: 'get',
                dataType: 'json',
                cache: false,
                success: function (msg) {

                    $("#loading").css({ "display": "none" });
                    var yzfsname = msg.yzfsname,
                        picarr = Array();
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
            	var state = picarr[i].state;
            	var detail = picarr[i].type_detail;
            	api.imageCache({
            		url: picarr[i].Img,
            		policy: 'cache_else_network'
            	}, function(ret,err){
            		if ("1" == state) {          		
                    	$(".uppic").before("<li class='upflpic'><img id='img_" + detail + "' src='" + ret.url + "' class='img' style='width:100%; height:100%;'></li>");
	                } else {
	                    $(".uppic").before("<li class='upflpic'><img id='img_" + detail + "' src='" + ret.url + "' class='img' style='width:100%; height:100%;'><i onclick='imgClose(this)' type_detail='" + detail + "'></i></li>");
	                }
            	});             
            }
        }

        function reqyzmfocus() {
            $("#yzmerr").css({ "display": "none" });
            //$("#reqyzm").val("");
        };

        function errShow(obj) {
            if (obj.errcode || obj.errmsg) {
                usermsgflag = 1;
                $("#bussele").css({ "display": "none" });
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

        function uploadImgShow(msg, code)
        {
            $("#remind03 .motwo_wz").html(msg);
            $("#remind03 .motwo_wz404").html("状态码:" + code);
            $("#remind03").css("display", "block");
        }

        function turnUploadImg()
        {
            $("#remind03").css({ "display": "none" });

            $("#yzfstop01").attr("checked", false);
            $("#yzfstop01").next("label").removeClass("pass");
            $("#yzfstop01").next("label").css({ "display": "none" });
            $("#yzfstop02").attr("checked", true);
            $("#yzfstop02").next("label").addClass("pass");
            $("#yzfstop02").next("label").css({ "display": "block" });

            $("#cjtxl").css("display", "none");
            $("#sctxl").css("display", "block");
            $("#subbut").css({ "display": "inline-block" });
        }


        function check() {
            var yzfsname = "1";//上传截图

            window.location.href =  "/InterFace/ValidatePhone.ashx?yzfsname=" + yzfsname;
        }