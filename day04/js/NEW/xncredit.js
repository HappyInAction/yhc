/*信用管家 js*/

function XncreditModel() {
    this.uid = "";
    this.guid = "";
    this.telType = "";
    this.browser = {
        versions: function () {
            var u = navigator.userAgent;
            return {
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                iPhone: u.indexOf('iPhone') > -1,
                iPad: u.indexOf('iPad') > -1,
                windowsphone: u.indexOf('Windows Phone') > -1
            };
        }()
    };
    this.ApiUrl = {
        H5Url: "http://www.xncredit.com/h5/index.aspx",
        getGuidUrl: "/xncredit/getGUID.ashx"
    };
}

XncreditModel.prototype = {
    getGuid: function (Func) {
        $.ajax({
            url: this.ApiUrl.getGuidUrl,
            type: "post",
            dataType: "json",
            cache: false,
            data: {
            },
            success: function (msg) {
                Func(msg);
            },
            error: function () {

            }
        });
    },
    getTargetUrl: function () {
        if (this.browser.versions.android){
            this.telType = "android";
        }else if(this.browser.versions.iPhone || this.browser.versions.iPad){
            this.telType = "ios";
        }else if(this.browser.versions.windowsphone){
            this.telType = "windowsphone";
        }
        return this.ApiUrl.H5Url + "?dicid=fenqix_" + this.guid + "&uid=" + this.uid + "&com=FENQIX&telType=" + this.telType;
    }
}