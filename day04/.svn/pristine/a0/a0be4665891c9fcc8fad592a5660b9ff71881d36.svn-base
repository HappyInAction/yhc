/**
 * Created by Administrator on 2016/3/29.
 */
var images = {
    localId: [],
    serverId: [],
    imgflag: 0
};

wx.ready(function () {

    $("#inputa").on("click", function () {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'], // 压缩图
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                images.localId[0] = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                var img = document.getElementById("showImg");
                img.src = images.localId[0];
                uploadImg();
            }
        });
    });

    function uploadImg() {
        setTimeout(function () {
            wx.uploadImage({
                localId: images.localId[0].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    images.serverId[0] = res.serverId; // 返回图片的服务器端ID
                    ajaxImg();
                }
            });
        }, 100);
    }

    function ajaxImg() {
        $.ajax({
            url: "/InterFace/ValidateCenter/ValidateFamily02.ashx",
            type: "post",
            dataType: "json",
            cache: false,
            data: {
                "type": "uploadimg",
                "type_detail": "0",
                "serverId": images.serverId[0]
            },
            success: function (msg) {
                if (msg.errmsg != "success") {
                    errShow({ "errmsg": "上传失败,请刷新重试.", "errcode": "" });
                    images.imgflag = 0;
                    return;
                } else {
                    images.imgflag = 1;
                }
            }
        });
    }
});

function butSubmit() {
    if (images.imgflag == 0) {
        errShow({ "errmsg": "请先上传图片.", "errcode": "" });
        return;
    }

    window.location.href = "/InterFace/ValidateCenter/ValidateFamily02.ashx?type=submit";
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

function showImg() {
    $.ajax({
        url: "/InterFace/ValidateCenter/ValidateFamily02.ashx",
        type: "post",
        dataType: "json",
        cache: false,
        data: {
            "type": "loadimgdata"
        },
        success: function (msg) {
            var imglist = msg.IMGData;
            if(imglist.length > 0){
                $("#showImg").attr("src", imglist[0].Img);
                images.imgflag = 1;
            }else {
                images.imgflag = 0;
            }
        }
    });
}