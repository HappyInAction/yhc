/**
 * Created by Administrator on 2016/3/29.
 */
var images = {
    localId: [],
    serverId: [],
    allcount: 6, //最多上传6张图片
    leftcount: 0, //剩余可上传张数
    curcount: 0, //当前id值
    count: 0, //显示的图片张数
    hasImg: false,
    imgs: 0 //已上传的图片
};

wx.ready(function () {

    $("#inputa").on("click", function () {
        var has = $(".img:last").attr("id");
        if (has) {
            images.hasImg = true;
            images.curcount = has.split('_')[1];
            images.count = $(".img").length;
            images.leftcount = images.allcount - images.count;
            if (images.leftcount <= 0) {
                errShow({ "errmsg": "最多上传6张图片", "errcode": "" });
                return;
            }
        } else {
            images.leftcount = images.allcount;
        }
        images.localId = [];
        wx.chooseImage({
            count: images.leftcount,
            sizeType: ['compressed'], // 压缩图
            sourceType: ['camera'], // 相机
            success: function (res) {
                for (var i = 0; i < res.localIds.length; i++) {
                    images.localId[i] = res.localIds[i]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    var imgname = 'img_';
                    if (images.hasImg) {
                        images.curcount++;
                        imgname += images.curcount;
                    } else {
                        imgname += '1';
                        images.curcount = 1;
                        images.hasImg = true;
                    }
                    $(".uppic").before("<li  class='upflpic'><img  id='" + imgname + "' src='" + images.localId[i] + "' class='img' style='width:100%; height:100%;'><i onclick='deleteImg(this)'></i></li>");
                }
                uploadImg();
            }
        });
    });

    function uploadImg() {
        var i = 0;
        images.serverId = [];
        var uploadAPI = function () {
            setTimeout(function () {
                wx.uploadImage({
                    localId: images.localId[i].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        images.serverId.push(res.serverId); // 返回图片的服务器端ID
                        ++i;
                        if (i < images.localId.length) {
                            uploadAPI();
                        } else {
                            ajaxImg();
                        }
                    },
                    fail: function (res) {
                        errShow({ "errmsg": "上传失败,请刷新重试.", "errcode": "" });
                        return;
                    }
                });
            }, 100);
        };
        uploadAPI();
    }

    function ajaxImg() {
        $.ajax({
            url: "/InterFace/ValidateCenter/ValidateFamily01.ashx",
            type: "post",
            dataType: "json",
            cache: false,
            data: {
                "type": "uploadimg",
                "type_detail": "",
                "serverId": images.serverId.join(",")
            },
            success: function (msg) {
                if (msg.errmsg != "success") {
                    errShow({ "errmsg": "上传失败,请刷新重试.", "errcode": "" });
                    return;
                } else {
                    images.imgs += images.serverId.length;
                }
            }
        });
    }
});

function deleteImg(obj)
{
    var id = $(obj).parent().find("img").attr("id");
    var detail = id.split("_")[1];
    $(obj).parent().remove();

    $.ajax({
        url: "/InterFace/ValidateCenter/ValidateFamily01.ashx",
        type: "post",
        dataType: "json",
        cache: false,
        data: {
            "type": "delete",
            "type_detail": detail
        },
        success: function (msg) {
            if (msg.errmsg != "success") {
                errShow({ "errmsg": "删除图片失败,请刷新重试.", "errcode": "" });
                return;
            } else {
                images.imgs--;
            }
        }
    });

}

function showImg(){
    $.ajax({
        url: "/InterFace/ValidateCenter/ValidateFamily01.ashx",
        type: "post",
        dataType: "json",
        cache: false,
        data: {
            "type": "loadimgdata"
        },
        success: function (msg) {
            var imglist = msg.House;
            for (var i = 0; i < imglist.length; i++) {
                $(".uppic").before("<li  class='upflpic'><img  id='img_" + imglist[i].type_detail + "' src='" + imglist[i].Img + "' class='img' style='width:100%; height:100%;'><i onclick='deleteImg(this)'></i></li>");
            }
            images.imgs = imglist.length;
        }
    });
}

function showMsg(){
    $.ajax({
        url: "/InterFace/ValidateCenter/ValidateFamily01.ashx",
        type: "post",
        dataType: "json",
        cache: false,
        data: {
            "type": "loaduserdata"
        },
        success: function (msg) {
            $("#housetype").val(msg.house_type);
            $("#rent").val(msg.rent);
        }
    });
}

function errShow(obj) {
    if (obj.errmsg || obj.errcode) {
        $("#remind02 .motwo_wz").html(obj.errmsg);
        $("#remind02 .motwo_wz404").html("错误码:" + obj.errcode);
        $("#remind02").css("display", "block");
        return false;
    }
    return true;
}

function butSubmit() {
    if ($("#housetype").val() == "" || $("#housetype").val().indexOf("请输入") > -1) {
        errShow({ "errmsg": "请先输入户型", "errcode": "" });
        return;
    } else if ($("#rent").val() == "" || $("#rent").val().indexOf("请输入") > -1 || !chk_money($("#rent").val())) {
        errShow({ "errmsg": "请先输入月租金", "errcode": "" });
        return;
    } else if (images.imgs < 3){
        errShow({ "errmsg": "至少上传3张图片", "errcode": "" });
        return;
    }

    window.location.href = "/InterFace/ValidateCenter/ValidateFamily01.ashx?type=submit&house_type=" + $("#housetype").val() + "&rent=" + $("#rent").val();
}