var images = {
	localId: [],
	serverId: []
};

function errShow(obj) {
	if (obj.errmsg || obj.errcode) {
	    $("#remind02 .motwo_wz").html(obj.errmsg);
	    if (obj.errcode) {
	        $("#remind02 .motwo_wz404").html("错误码:" + obj.errcode);
	    } else {
	        $("#remind02 .motwo_wz404").html("");
	    }
		$("#remind02").css("display", "block");
		return false;
	}
	return true;
}

function checkfile() {
	var Locate = $("#result").val();
	if (Locate == "") {
		alert("请重新定位");
		return;
	}
	if ($("#xx_adr").val() == "" || !/[\u4e00-\u9fa5]+/g.test($("#xx_adr").val())) {
		alert("请输入正确的地址");
		return
	}
	$("#Locate").val(Locate);
	$("#Address").val($("#xx_adr").val());
	if ($("#front").attr("src") == "" || $("#back").attr("src") == "" || $("#handcreid").attr("src") == "") {
		errShow({ "errmsg": "请先上传完所有图片", "errcode": "" });
		return;
	}
	$("#sub").submit();
}

function showAdd(){
	$.ajax({
		url: '/InterFace/ValidateCreid.ashx',
		type: 'post',
		dataType: 'json',
		cache: false,
		data: {
			"type" : "onload"
		},
		success: function (msg) {
			var locate = msg.Locate,
				address = msg.Address,
				front = msg.front,
				back = msg.back,
				handcreid = msg.handcreid;
			if (locate && address) {
				$("#result").val(locate);
				$("#xx_adr").val(address);
			}
			Address();
			showImg(front, back, handcreid);
		}
	})
}

function showImg(front, back, handcreid) {
	if (front) {
		$("#front").attr({ src: front, style: "position:absolute;top:0;left:0;z-index:19;width:100%;height:100%;" });
	}
	if (back) {
		$("#back").attr({ src: back, style: "position:absolute;top:0;left:0;z-index:19;width:100%;height:100%;" });
	}
	if (handcreid) {
		$("#handcreid").attr({ src: handcreid, style: "position:absolute;top:0;left:0;z-index:19;width:100%;height:100%;" });
	}
}

/*function Address(){
	var map = new AMap.Map("mapContainer");
	var mapcenter = map.getCenter(),
		getlng = mapcenter.getLng(),
		getlat = mapcenter.getLat(),
		lnglatXY = [getlng, getlat];
	geocoder();
	function geocoder() {
		var MGeocoder;
		AMap.service(["AMap.Geocoder"], function () {
			MGeocoder = new AMap.Geocoder({
				radius: 1000,
				extensions: "all"
			});
			MGeocoder.getAddress(lnglatXY, function (status, result) {
				if (status === 'complete' && result.info === 'OK') {
					geocoder_CallBack(result);
				}
			});
		});
		var marker = new AMap.Marker({
			map: map,
			position: lnglatXY
		});
		map.setFitView();
	}

	function geocoder_CallBack(data) {
		var resultStr = "";
		var poiinfo = "";
		var address;
		address = data.regeocode.formattedAddress;
		var inforkey = address.indexOf('区') + 1;
		var lfkey = address.substr(0, inforkey);
		var rtkey = address.substr(inforkey, address.length);
		if (address.length > 1) {
			document.getElementById("result").value = lfkey;
		}
	}	
}*/

function Address(){
	var map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB',
            extensions: 'base'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', getLocation);//返回定位信息
        AMap.event.addListener(geolocation, 'error', getLocationError);      //返回定位出错信息
    });
    //解析定位结果
    function getLocation(data) {
        //逆地理地址解析
        var lnglatXY = [];
        lnglatXY[0] = data.position.getLng();
        lnglatXY[1] = data.position.getLat();
        var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });        
        geocoder.getAddress(lnglatXY, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                var address = result.regeocode.formattedAddress;
                document.getElementById("result").value = address;
            }
        }); 
    }
    //解析定位错误信息
    function getLocationError(data) {
    	alert(JSON.stringify(data));
        document.getElementById('location').innerHTML = '定位失败';
    } 
}

wx.ready(function () {
	$("#fronta,#backa,#handcreida").on("click", function () {
		var _id = $(this).attr("id");
		var _mold = _id.substring(0, _id.length - 1);
		wx.chooseImage({
			count: 1,
			sizeType: ['compressed'], // 压缩图
			sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				images.localId[0] = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片                 
				var img = document.getElementById(_mold);
				$("#"+ _mold).attr("style","position:absolute;top:0;left:0;z-index:19;width:100%;height:100%;");
				img.src = images.localId[0];
				uploadImg(_mold);
			}
		});
	});

    function uploadImg(mold) {
        setTimeout(function () {
            wx.uploadImage({
                localId: images.localId[0].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    images.serverId[0] = res.serverId; // 返回图片的服务器端ID
                    ajaxImg(mold);
                }
            });
        }, 100);        
    }

    function ajaxImg(mold) {
        $.ajax({
            url: '/InterFace/ValidateCreid.ashx',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: {
				"type": "upload",
				"filemold": mold,
                "serverId": images.serverId[0]
            },
            success: function (msg) {
                if (msg.errmsg != "success") {
                    errShow({ "errmsg": "上传失败,请刷新重试.", "errcode": "" });
                    return;
                }
            }
        });
    }

});

