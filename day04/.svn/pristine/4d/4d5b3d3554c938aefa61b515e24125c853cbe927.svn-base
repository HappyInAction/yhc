function onBridgeReady() {
    WeixinJSBridge.call('hideOptionMenu');
}
if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
} else {
    onBridgeReady();
}
function ReIString(obj) {
    if (obj == "" || obj.indexOf("请输入") > -1) {
        return true;
    } else {
        return false;
    }
}
function IsPhone(obj) {
    Reg10 = /^10\d{9}$/;
    Reg11 = /^1\d{10}$/;
    Reg10_12 = /^0(\d{2,3}-?[\d]{7,8}-?[\d]{0,6})$/;
    if (obj.substr(0, 1).indexOf("0") > -1) {
        if (Reg10_12.test(obj)) {
            return true;
        } else {
            return false;
        }
    } else if (obj.substr(0, 1).indexOf("1") > -1) {
        if (Reg11.test(obj) && !Reg10.test(obj)) {
            return true;
        } else {
            return false;
        }
    }
    else {
        return false;
    }
}
function IsPW(obj) {
    Reg = /^[0-9a-zA-Z]{6,10}$/;
    if (Reg.test(obj)) {
        return true;
    }
    else {
        return false;
    }
}
function IsEmail(obj) {
    Reg = /^\w{3,}@\w+(\.\w+)+$/;
    if (Reg.test(obj)) {
        return true;
    } else {
        return false;
    }
}
function IsVcard(obj) {
    Reg = /^(\d{15}|\d{18}|\d{17}X|\d{17}x)$/;
    if (Reg.test(obj)) {
        return true;
    } else {
        return false;
    }
}
function IsNumber(obj) {
    Reg = /^\d+$/;
    if (Reg.test(obj)) {
        return true;
    } else {
        return false;
    }
}
function IsUrl(obj) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
      + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@  
      + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
      + "|" // 允许IP和DOMAIN（域名）  
      + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
      + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
      + "[a-z]{2,6})" // first level domain- .com or .museum  
      + "(:[0-9]{1,4})?" // 端口- :80  
      + "((/?)|" // a slash isn't required if there is no file name  
      + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    return re.test(obj);
}
function isValidURL(str_url) {// 验证url
    var strRegex = "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=#]*)?$";
    var re = new RegExp(strRegex);
    return re.test(str_url);
}
function IsQQ(obj) {
    Reg = /^\d{5,12}$/;
    if (Reg.test(obj)) {
        return true;
    } else {
        return false;
    }
}
function IsName(obj) {
    Reg = /^[\u4e00-\u9fa5]{2,10}$/;
    if (Reg.test(obj)) {
        return true;
    } else {
        return false;
    }
}

function IsBankCard(obj) {
    Reg = /^(\d{16}|\d{19})$/;
    if (Reg.test(obj)) {
        return true;
    } else {
        return false;
    }
}

function dialog_show(msg) {
    $("#lable_error").text(msg);
    var dialog = document.getElementsByClassName('dialog')[0];
    dialog.style.display = 'block';
}
function dialog_confirm() {
    var dialog = document.getElementsByClassName('dialog')[0];
    dialog.style.display = 'none';
}
