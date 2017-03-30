
//不少于4个字符
function chk_gt4char(obj)
{
    var reg = /^[A-Za-z0-9]{4,}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

function chk_6num(obj)
{
    var reg = /^\d{6}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)){
        return false;
    }

    return true;
}

//不少于6个字符
function chk_gt6char(obj)
{
    var reg = /^[A-Za-z0-9]{6,}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

function chk_8num(obj)
{
    var reg = /^\d{8}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

//限定6个字符
function chk_6char(obj)
{
    var reg = /^[A-Za-z0-9]{6}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

function chk_8char(obj) {
    var reg = /^[A-Za-z0-9]{8}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

//判断手机号码
function chk_phone(obj) {
    var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

function chk_number(obj){
    var reg = /^\d+$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }

    return true;
}

//判断身份证
function chk_idcard(obj){
    var reg = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }
    return true;
}

//邮箱验证
function chk_email(obj){
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (obj == undefined || obj == "" || !reg.test(obj)) {
        return false;
    }
    return true;
}