
/*
**idImg:显示的img id
**filekey:后端接收图片的key值
**targetUrl: 上传图片的url
**callback: 回调函数 function(ret,err){}
*/
function uploadimg_app(idImg, filekey, targetUrl, callback){
    api.getPicture({
        sourceType: 'camera',
		encodingType: 'jpg',
		mediaValue: 'pic',
		destinationType: 'base64',
		allowEdit: false,
		quality: 30,
		saveToPhotoAlbum: false
    }, function (ret, err) {   
        if (ret && ret.base64Data) { 
            if(idImg != null && idImg != ""){
                var img = document.getElementById(idImg);
                img.src = ret.base64Data;
            }
            ajaxPic(ret.data, filekey, targetUrl, callback);
        }
        
    });
}


function ajaxPic(imgData, filekey, targetUrl, callback) {
    var file = {};
    file[filekey] = imgData;
    api.ajax({
        url: getUrl() + targetUrl,
        method:'post',
        cache:false,
        dataType:'json',
        data:{
            files:file
        }
    }, callback);
}