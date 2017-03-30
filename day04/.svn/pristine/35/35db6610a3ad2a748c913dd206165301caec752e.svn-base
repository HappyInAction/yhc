/**
 * Created by Administrator on 2016/2/24.
 */

function uploadimg_app(idImg, filekey, targetUrl, callback){

    api.getPicture({
        sourceType: 'camera',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'base64Data',
        allowEdit: false,
        quality: 50,
        saveToPhotoAlbum: false
    }, function (ret, err) {
        if(ret && ret.data){
            if(idImg != null && idImg != ""){
                var img = document.getElementById(idImg);
                img.src = ret.data;
            }
            ajaxPic(ret.data, filekey, targetUrl, callback);
        }
    });
}


function ajaxPic(imgData, filekey, targetUrl, callback) {
    api.showProgress({
    });

    var file = {};
    file[filekey] = imgData;
    api.ajax({
        url:targetUrl,
        method:'post',
        cache:false,
        dataType:'json',
        data:{
            files:file
        }
    }, callback);
}