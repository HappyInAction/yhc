function WXOnLoad() {
    var MappId, Mtimestamp, MnonceStr, Msignature;
    var REURL = encodeURIComponent(location.href.split('#')[0]);
    $.ajax({
        url: '/Interface.ashx?type=GetSign&URL=' + REURL,
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function (Data) {
            MappId = Data["MappId"];
            Mtimestamp = Data["Mtimestamp"];
            MnonceStr = Data["MnonceStr"];
            Msignature = Data["Msignature"];
            wx.config({
                debug: false,
                appId: MappId,
                timestamp: Mtimestamp,
                nonceStr: MnonceStr,
                signature: Msignature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ]
            });
        }
    });
}
