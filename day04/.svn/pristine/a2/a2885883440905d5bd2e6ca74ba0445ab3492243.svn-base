//判断6个数字
function chk_6num(obj)
{
    var reg = /^\d{6}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)){
        return false;
    }

    return true;
}

//判断8个数字
function chk_8num(obj)
{
    var reg = /^\d{8}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

//判断6个字符，包括大小写字母及数字
function chk_6char(obj)
{
    var reg = /^[A-Za-z0-9]{6}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

//判断8个字符，包括大小写字母及数字
function chk_8char(obj) {
    var reg = /^[A-Za-z0-9]{8}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

//判断数字
function chk_number(obj) {
    var reg = /^\d+$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

//判断金额，可带小数点
function chk_money(obj){
    //var reg = /^\d+.?\d{1,2}$/;
	var reg = /^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$/ ;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }
    return true;

}

//判断座机号码
function chk_tel(obj) {
    var reg = /^0\d{2,3}-\d{7,8}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

//判断手机号码
function chk_phone(obj) {
    var reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

//判断6-10个字符
function chk_6_10char(obj){
    var reg = /^[A-Za-z0-9]{6,10}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

//判断身份证
function chk_idcard(obj){
    var reg = /(^\d{17}|(^\d{18}$)([0-9]|X|x)$)/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }
    return true;
}