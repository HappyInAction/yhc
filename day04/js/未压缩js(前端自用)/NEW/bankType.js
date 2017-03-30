/**
 * Created by Administrator on 2016/5/6.
 */
function getBankType(bankName){
    var obj = {
        img:""
    };
    switch (bankName){
        case"工商银行":
            obj.img = "bank_gs.png";
            break;
        case"建设银行":
            obj.img = "bank_js.png";
            break;
        case"农业银行":
            obj.img = "bank_ny.png";
            break;
        case"招商银行":
            obj.img = "bank_zs.png";
            break;
        case"交通银行":
            obj.img = "bank_jt.png";
            break;
        case"中国银行":
            obj.img = "bank_zg.png";
            break;
        case"光大银行":
            obj.img = "bank_gd.png";
            break;
        case"民生银行":
            obj.img = "bank_ms.png";
            break;
        case"兴业银行":
            obj.img = "bank_xy.png";
            break;
        case"中信银行":
            obj.img = "bank_zx.png";
            break;
        case"广发银行":
            obj.img = "bank_gf.png";
            break;
        case"浦发银行":
            obj.img = "bank_pf.png";
            break;
        case"平安银行":
            obj.img = "bank_pa.png";
            break;
        case"华夏银行":
            obj.img = "bank_hx.png";
            break;
        case"宁波银行":
            obj.img = "bank_nb.png";
            break;
        case"东亚银行":
            obj.img = "bank_dy.png";
            break;
        case"上海银行":
            obj.img = "bank_sh.png";
            break;
        case"中国邮储银行":
            obj.img = "bank_yz.png";
            break;
        case"南京银行":
            obj.img = "bank_nj.png";
            break;
        case"上海农商行":
            obj.img = "bank_shn.png";
            break;
        case"渤海银行":
            obj.img = "bank_bh.png";
            break;
        case"成都银行":
            obj.img = "bank_cd.png";
            break;
        case"北京银行":
            obj.img = "bank_bj.png";
            break;
        default:
            obj.img = "mr.png";
            break;
    }
    return obj;
}