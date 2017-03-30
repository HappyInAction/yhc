new
function () {
    var q = this;
    q.width = 720;
    q.fontSize = 36;
    q.widthProportion = function () {
        var n = (document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / q.width;
        return 1 < n ? 1 : .4 > n ? .4 : n
    };
    q.changePage = function () {
        document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + q.widthProportion() * q.fontSize + "px !important")
    };
    q.changePage();
    window.addEventListener("resize",
    function () {
        q.changePage()
    },
    !1)
};