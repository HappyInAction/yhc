changepwd();     //修改密码
function changepwd(){
    var csrftoken = $('meta[name=csrf-token]').attr('content')
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
            }
        }
    })
    var key = $('meta[name=key]').attr('content');

    // var phone_check = false;
    var pwd_check = false;
    var pwd_confirmcheck = false;
    var old_pwd_check = false;

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
            $('.codeError').hide();
            $('.code').attr('placeholder',$('.code').val())
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
                    layer.open({
                      title: '萤火虫科技',
                      content: '网络连接超时，请您稍后重试'
                    });
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
        pic_code_check =false;
        pic_src = '/u/api/code/vcode.pic?r=' + Math.random()
        $('.vcode').attr('src', pic_src)
    }


    var type = getParam('type')
    var agenttype =getParam('agenttype')
    var login_url = '/u/login?'+ 'type='+type+'&agenttype='+agenttype
    if(getParam('next') != null){
        var next_url = getParam('next')
    }else{
        var next_url = 'http://www.yhctech.com'
    }

    //所有的输入框获取焦点后前面的图案变成白色
    $('.telephoneNumber, .againPass_test, .passwordTest, .oldpasswordTest, .code').focus(function(){
        $(this).prev().addClass('changeFont');
    });
    // $('.telephoneNumber').focus(function(){     //手机号验证
    //     $('.telephone').addClass('changeBorder');
    //     $('.realPhone').hide();
    // }).blur(function(){
    //     var val = document.querySelector('.telephoneNumber').value;
    //     var realPhone = document.querySelector('.realPhone');
    //     if(!(/^1[34578]\d{9}$/.test(val))){
    //         $(realPhone).show();
    //     }else{
    //         phone_check = true;
    //     }
    // });

    $('.oldpasswordTest').focus(function(){
        $('.oldPassword').addClass('changeBorder');
        $('.oldwriteCode').hide();
    }).blur(function(){
        var val = document.querySelector('.oldpasswordTest').value;
        if(val == ""){
            $('.oldwriteCode').show();
        }else{
            old_pwd_check = true;
        }
    });

    //设置密码
    var confirmObj = document.querySelector('.passwordTest');
    var confirmAgain = document.querySelector('.chgwriteCode');
    var confirmError = document.querySelector('.chgwriteCode_error');
    $(confirmObj).focus(function(){
        $('.setPassword').addClass('changeBorder');
        $('.chgwriteCode').hide();
        $('.chgwriteCode_error').hide();
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
    var nullObj = document.querySelector('.chgagainpwd')

    $(againObj).focus(function(){
        $('.againPassword').addClass('changeBorder');
        $('.againCode_error').hide();
        $('.againpwd_err').hide();
        $('.chgagainpwd').hide();
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
        if(old_pwd_check && pwd_confirmcheck && pwd_check && pic_code_check) {
            data = JSON.stringify({
                // v:v,
                agenttype:agenttype,
                type:type,
                oldpwd: getEntryptPwd($(".oldpasswordTest").val(), key),
                newpwd: getEntryptPwd($(".passwordTest").val(), key),
                // phone: $(".telephoneNumber").val(),
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
                    } else if (res['code'] == 'B00105'){
                        layer.open({
                          title: '萤火虫科技',
                          content: res['msg'],
                          yes:function(index, layero){
                            layer.close(index);
                            location.href = login_url;
                          }
                        });
                    }else {
                        // layer.open({
                        //     title: '萤火虫科技',
                        //     content: res['msg'],
                        //     yes: function(index, layero){
                        //         layer.close(index);
                        //         changepic();
                        //     }
                        // });
                        changepic();
                        $('.error_text').html(res['msg']);
                        $('.error_msg').show();
                        $(".oldpasswordTest").val("");
                        $('.code').val('');
                    }
                },
                error: function() {
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
}
