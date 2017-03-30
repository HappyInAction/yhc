
function chk_6num(obj)
{
    var reg = /^\d{6}$/;
    if (obj == undefined || obj == "" || !reg.test(obj)){
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