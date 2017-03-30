register();     //注册
function register(){
    var csrftoken = $('meta[name=csrf-token]').attr('content')
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
            }
        }
    })
    var key = $('meta[name=key]').attr('content');
    var appid = $('meta[name=appid]').attr('content');

    var phone_check = false;
    var pwd_check = false;
    var pwd_confirmcheck = false;
    var code_check = false;
    var pic_code_check =false;

    function getEntryptPwd(pwd, key) {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(key);
        return encrypt.encrypt(pwd);
    }
    //  获取url参数
    var getParam = function(name){
        var search = document.location.search;
        var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
        var matcher = pattern.exec(search);
        var items = null;
        if(null != matcher){
            try{
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            }catch(e){
                try{
                        items = decodeURIComponent(matcher[1]);
                }catch(e){
                        items = matcher[1];
                }
            }
        }
        return items;
    };
    var type = getParam('type')
    var agenttype =getParam('agenttype')
    var login_url = '/u/login?'+ 'type='+type+'&agenttype='+agenttype
    if(getParam('next') != null){
        var next_url = getParam('next')
    }else{
        var next_url = 'http://www.yhctech.com'
    }

    //验证码
    var text = document.querySelector(".code");
    var error = document.querySelector(".codeError");
    $(text).focus(function(){
        $('.codeLeft').addClass('changeBorder');
        $('.codeError').hide();
        $('.codeError_2').hide();
        pic_code_check =false;
    }).keyup(function(){
        if($(text).val().length == 0){
            ic_code_check =false;
            $('.codeError_2').hide();
            $('.codeError').show();
        }
        else if($(text).val().length < 4){
            pic_code_check =false;
            $('.codeError').hide();
            $('.codeError_2').hide();
            $('.codeError_2').show();
        }
        if($(text).val().length == 4){
            checkphone();
            $('.codeError').hide();
            var pic_code = $('.code').val();
            $.ajax({
                url:"/u/api/code/vericode",
                type: "GET",
                data: "pic_code=" + pic_code,
                success: function(data){
                    if (data == '1'){
                        pic_code_check = true;
                        $('.codeError_2').hide();
                    }else{
                        pic_code_check = false;
                        $('.codeError_2').show();
                    }
                },
                error : function() {
                    if($('.code').val() != $('.temporary').html()){
                        $('.temporary').html($('.code').val());
                        layer.open({
                          title: '萤火虫科技',
                          content: '网络连接超时，请您稍后重试'
                        });
                    }
                }
            })
        }
    }).blur(function(){
        if($(text).val() == ""){
            $(error).show();
            pic_code_check =false;
        }
    });
    pic_src = '/u/api/code/vcode.pic?r=' + Math.random()
    $('.vcode').attr('src', pic_src)

    $('.vcode').on("click", changepic);
    function changepic(){

        pic_src = '/u/api/code/vcode.pic?r=' + Math.random()
        $('.vcode').attr('src', pic_src)
    }
    //所有的输入框获取焦点后前面的图案变成白色
    $('.telephoneNumber, .againPass_test, .passwordTest, .code, .getPhone_code').focus(function(){
        $(this).prev().addClass('changeFont');
    });
    $('.telephoneNumber').focus(function(){     //手机号验证
        $('.telephone').addClass('changeBorder');
        $('.realPhone').hide();
        $('.phone_exists').hide();
    }).blur(function(){
        checkphone();
    });
    function checkphone(){
        var val = document.querySelector('.telephoneNumber').value;
        var realPhone = document.querySelector('.realPhone');
        var phone_exists = document.querySelector('.phone_exists');
        if(!(/^1[34578]\d{9}$/.test(val))){
            $(realPhone).show();
            phone_check = false;
        }else{
            check(val, 'phone', phone_exists)
        }
    }

    //手机验证码
    var getPhone_code = document.querySelector('.getPhone_code');
    var phoneCode_error = document.querySelector('.phoneCode_error');
    $(getPhone_code).focus(function(){
        $('.phoneCode_left').addClass('changeBorder');
        $('.phoneCode_error').hide();
    }).blur(function(){
        checkcode();
    });
    function checkcode(){
        if($(getPhone_code).val() == ""){
            $(phoneCode_error).show();
            code_check =false;
        }else{
            code_check = true;
        }
    }

    //手机验证码倒计时
    $('.getCode').on('click', codeText);
    function codeText(){
        var lessTime = 60;
        if(!phone_check) {
            return false;
        }
        else if(!pic_code_check){
            layer.open({
                title: '萤火虫科技',
                content: '图片验证码错误!',
                yes: function(index, layero){
                    layer.close(index);
                    changepic();
                }
            });
            return false;
        }
        else {
            $.ajax({
                url: "/u/api/sendmsg",
                type: "POST",
                dataType: "json",
                contentType: 'json',
                data: JSON.stringify({
                    RecNum: $(".telephoneNumber").val(),
                    type: '1',
                    appid: appid
                }),
                success: function(res) {
                    if(res['code'] == 'A00000') {
                        layer.open({
                            title: '萤火虫科技',
                            content: '验证码发送成功,请注意查收！',
                            yes: function(index, layero){
                                layer.close(index);
                                $('.getCode').off('click');
                                var times = setInterval(function() {
                                    lessTime--;
                                    $('.getCode').html(lessTime + "s后重新获取").addClass('handStyle');
                                    if(lessTime <= 0) {
                                        clearInterval(times);
                                        lessTime = 60;
                                        $('.getCode').html("获取手机验证码").removeClass('handStyle');
                                        $('.getCode').on('click',codeText);
                                    }
                                }, 1000)
                            }
                        });
                    } else {
                        layer.open({
                            title: '萤火虫科技',
                            content: '验证码发送失败,请稍后再试！',
                            yes: function(index, layero){
                                layer.close(index);
                                changepic();
                            }
                        });
                    }
                },
                error: function() {
                    layer.open({
                      title: '萤火虫科技',
                      content: '网络连接超时，发送验证码失败，请您稍后重试'
                    });
                }
            })
        }
    }
    //设置密码
    var confirmObj = document.querySelector('.passwordTest');
    var confirmAgain = document.querySelector('.writeCode');
    var confirmError = document.querySelector('.writeCode_error');
    $(confirmObj).focus(function(){
        $('.setPassword').addClass('changeBorder');
        $('.writeCode').hide();
        $('.writeCode_error').hide();
    }).blur(function(){
        if ($(confirmObj).val() == ""){
            $(confirmAgain).show();
        }else if (!/^[a-zA-Z][A-Za-z0-9]{7,19}$/.test($(confirmObj).val())){
            $(confirmError).show();
        }else{
            pwd_check = true;
        }
    });
    //确认密码
    var TestObj = document.querySelector('.passwordTest');
    var againObj = document.querySelector('.againPass_test');
    var warnObj = document.querySelector('.againCode_error');
    var errorObj = document.querySelector('.againpwd_err');
    var nullObj = document.querySelector('.againpwd')

    $(againObj).focus(function(){
        $('.againPassword').addClass('changeBorder');
        $('.againCode_error').hide();
        $('.againpwd_err').hide();
        $('.againpwd').hide();
    }).blur(function(){
        if($(againObj).val() == ""){
            $(nullObj).show();
        }else if($(againObj).val() != $(TestObj).val()){
            $(warnObj).show();
        }else if (!/^[a-zA-Z][A-Za-z0-9]{7,19}$/.test($(againObj).val())){
            $(errorObj).show();
        }
        else{
            pwd_confirmcheck = true;
        }
    });
    function confirm() {
        checkphone();
        checkcode();
        if(phone_check && pwd_confirmcheck && pwd_check && pic_code_check && code_check) {
            data = JSON.stringify({
                // v:v,
                type:type,
                agenttype:agenttype,
                newpwd: getEntryptPwd($(".passwordTest").val(), key),
                phone: $(".telephoneNumber").val(),
                code: $(".getPhone_code").val(),
                appid: appid
            })
            $.ajax({
                url: "",
                type: "POST",
                dataType: "json",
                contentType: 'json',
                data: data,
                success: function(res) {
                    if(res['code'] == 'A00000') {
                        $('.success').show();
                        setTimeout(function(){
                            location.href = next_url;
                        },1500)
                    } else {
                        changepic();
                        $('.error_text').html(res['msg']);
                        $('.error_msg').show();
                        $('.passwordTest').val('');
                        $('.againPass_test').val('');
                        $('.getPhone_code').val('');
                        $('.code').val('');
                    }
                },
                error : function() {
                    layer.open({
                      title: '萤火虫科技',
                      content: '网络连接超时，请您稍后重试'
                    });
                }
            })
        }else{
            $('.error_text').html('用户信息填写有误！');
            $('.error_msg').show();
        }
    }

    $(".buttoncommon").on("click", confirm)

    function check(obj1,obj2,obj3){
        var val = obj1;
        var key = obj2;
        var warn = $(obj3);
        data = JSON.stringify({
            key: key,
            value: val,
            type: type,
            agenttype: agenttype
        });
        $.ajax({
            url: "/u/api/check",
            type: "POST",
            dataType: "json",
            contentType: 'json',
            data: data,
            success: function(res) {
                if(res['code'] != 'A00000') {
                    phone_check = true;
                    return true;
                } else {
                    warn.show();
                    phone_check = false;
                    return false;
                }
            },
            error : function() {
                layer.open({
                  title: '萤火虫科技',
                  content: '网络连接超时，请您稍后重试'
                });
            }
        })
    }
}
