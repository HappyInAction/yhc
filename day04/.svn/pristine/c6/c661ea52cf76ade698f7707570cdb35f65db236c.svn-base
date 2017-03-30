// JavaScript Document
/*
//图片等比例缩放函数
//参数:
//obj : 需要缩放的图片对象
//w : 显示图片的宽度
//h : 显示图片的高度
*/
function drawimg(obj,w,h){
	var newimg = new Image();
	newimg.src = obj.src;
	if(newimg.width>0 && newimg.height>0)
	{
		if(newimg.width / newimg.height >= w / h)
		{
			
			if(newimg.width > w)
			{							
				obj.width = w;
				obj.height = (newimg.height*w)/newimg.width;
			}
			else
			{
				obj.width =w;
				obj.height=h;
			}
		}
		else
		{
			if(newimg.height > h)
			{
				obj.height = h;
				obj.width =(newimg.width*h)/newimg.height;	
			}	
			else
			{
				obj.width = w;
				obj.height =h;	
			}
			
		}
	}
}



/*
//input type=file onchange函数
//参数：
//files : this.files
//imgid : 将读取的文件显示出来的image id
//filekey : 文件传输到后台对应的key值
//url : 文件post地址
*/

function filechange(files, imgid, filekey, url) {
    //console.log(imgid);
    //console.log(filekey);
    //console.log(url);
    //console.log(files);

    for (var i = 0, f; f = files[i]; i++) {

        var filetype = f.type;
        var filename = f.name;

        var reader = new FileReader();
        reader.onload = function (e) {

            var img = document.createElement("img");
            img.src = e.target.result;

            img.onload = function () {
       
                var data = compress(this);
                //console.log("data:" + data);
                //console.log("imgid:"+imgid);
                if (imgid != null && imgid != "")
                {
                    var myimg = document.getElementById(imgid);
                    myimg.src = data;
                    //console.log("have img");
                }
                
                uploadimg(data, filename, filetype, filekey, url);
            }
        };
        reader.readAsDataURL(f);
		$("#imghead01").css({width:"100%", height:"100%"});
    }

}



/*
//压缩图片函数
//参数:
//source_img : 需要压缩的图片
*/

function compress(source_img, Orientation) {
        var orientation = Orientation ? Orientation : 1;

        var iw = source_img.naturalWidth;
        var ih = source_img.naturalHeight;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        var ratio,width,height;
        if ((ratio = iw * ih / 4000000) > 1) {
            ratio = Math.sqrt(ratio);
            width = iw / ratio;
            height = ih / ratio;
        } else {
            width = iw;
            height = ih;
        }

		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		ctx.save();		
		transformCoordinate(canvas, ctx, width, height, orientation);

        //铺底色
		ctx.fillStyle = "#fff";
		if (orientation >= 5 && orientation <= 8) {
		    ctx.fillRect(0, 0, canvas.height, canvas.width);
		} else {
		    ctx.fillRect(0, 0, canvas.width, canvas.height);
		}	

		if (detectSubsampling(source_img)) {
		    iw /= 2;
		    ih /= 2;
		}

        var d = 1024; // size of tiling canvas
        var tmpCanvas   = document.createElement('canvas');
        tmpCanvas.width = tmpCanvas.height = d;
        var tmpCtx          = tmpCanvas.getContext('2d');
        var vertSquashRatio = detectVerticalSquash(source_img, iw, ih);
        var dw              = Math.ceil(d * width / iw);
        var dh              = Math.ceil(d * height / ih / vertSquashRatio);
        var sy              = 0;
        var dy              = 0;
        while (sy < ih) {
            var sx = 0;
            var dx = 0;
            while (sx < iw) {
                tmpCtx.clearRect(0, 0, d, d);
                tmpCtx.drawImage(source_img, -sx, -sy);
                ctx.drawImage(tmpCanvas, 0, 0, d, d, dx, dy, dw, dh);
                sx += d;
                dx += dw;
            }
            sy += d;
            dy += dh;
        }
        ctx.restore();
        tmpCanvas = tmpCtx = null;

        //进行最小压缩
        var ndata = canvas.toDataURL('image/jpeg', 0.5);
        return ndata;
}



/*
//上传图片函数
//参数:
//data : 压缩图片函数返回的数据 toDataURL格式
//filename : 用户上传的图片名称
//filetype : 用户上传的图片格式
//filekey : 文件传输到后台对应的key值
//url : 文件post地址
*/

function uploadimg(data, filename, filetype, filekey, url) {

    //console.log("start upload");
    //将ascii转换成base64编码格式
    var text = window.atob(data.split(",")[1]);
    //var type = data.split(',')[0].split(':')[1].split(';')[0];
    //console.log("text:" + text);
    var buffer = new ArrayBuffer(text.length);
    var ubuffer = new Uint8Array(buffer);
    for (var i = 0; i < text.length; i++) {
        ubuffer[i] = text.charCodeAt(i);
    }
    var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
    var blob;
    if (Builder) {
        var builder = new Builder();
        builder.append(buffer);
        blob = builder.getBlob(type);
    } else {
        //console.log(this.type);
        blob = new window.Blob([buffer], { type: filetype });
    }
    //console.log("blob:"+blob);
    var xhr = new XMLHttpRequest();
    var formdata = new FormData();
    formdata.append(filekey, blob, filename);
    //console.log("formdata:"+ formdata);
    xhr.open("post", url );

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //console.log("ok");
        }
    }
    xhr.send(formdata);
}

function uploadfile(Data,name, imgid, filekey, url) {
        var img = document.createElement("img");
        img.src = Data;
        var exif,data;
        img.onload = function () {
            EXIF.getData(this, function () {
                exif = EXIF.getTag(this, "Orientation");
                data = compress(this, exif);
                if (imgid != null && imgid != "") {
                    var myimg = document.getElementById(imgid);
                    myimg.src = data;
                }
                uploadimg(data, name, 'image/png', filekey, url);
            })         
        }

        $("#imghead01").css({ width: "100%", height: "100%" });
}
function openCamera(selectFlag,jsonStr) {
    if(selectFlag === "kaniu")
    {
        location.href = "cardniu://api/openCameraWithoutEncoding?callbackData=" + jsonStr;
    }
    else if(selectFlag === "wacai")
    {
        location.href = "wacai://mashangtakephoto?token=" + jsonStr;
    }
};



/**
     * Detect subsampling in loaded image.
     * In iOS, larger images than 2M pixels may be subsampled in rendering.
     */
function detectSubsampling(img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    if (iw * ih > 1048576) { // subsampling may happen over megapixel image
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, -iw + 1, 0);
        // subsampled image becomes half smaller in rendering size.
        // check alpha channel value to confirm image is covering edge pixel or not.
        // if alpha value is 0 image is not covering, hence subsampled.
        return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
    } else {
        return false;
    }
}



/**
   * Detecting vertical squash in loaded image.
   * Fixes a bug which squash image vertically while drawing into canvas for some images.
   */
function detectVerticalSquash(img, iw, ih) {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) {
            ey = py;
        } else {
            sy = py;
        }
        py = (ey + sy) >> 1;
    }
    var ratio = (py / ih);
    return (ratio === 0) ? 1 : ratio;
}


/**
* Transform canvas coordination according to specified frame size and orientation
* Orientation value is from EXIF tag
*/
function transformCoordinate(canvas, ctx, width, height, orientation) {
    switch (orientation) {
        case 5:
        case 6:
        case 7:
        case 8:
            canvas.width = height;
            canvas.height = width;
            break;
        default:
            canvas.width = width;
            canvas.height = height;
            break;
    }
    switch (orientation) {
        case 1:
            // nothing
            break;
        case 2:
            // horizontal flip
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
            break;
        case 3:
            // 180 rotate left
            ctx.translate(width, height);
            ctx.rotate(Math.PI);
            break;
        case 4:
            // vertical flip
            ctx.translate(0, height);
            ctx.scale(1, -1);
            break;
        case 5:
            // vertical flip + 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.scale(1, -1);
            break;
        case 6:
            // 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(0, -height);
            break;
        case 7:
            // horizontal flip + 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(width, -height);
            ctx.scale(-1, 1);
            break;
        case 8:
            // 90 rotate left
            ctx.rotate(-0.5 * Math.PI);
            ctx.translate(-width, 0);
            break;
        default:
            break;
    }
}
