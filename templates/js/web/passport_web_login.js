login();    //登录
function login(){
    var csrftoken = $('meta[name=csrf-token]').attr('content')
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
            }
        }
    })
    var pic_code_check = true;
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
    var amount = $('meta[name=requestamount]').attr('content');
    checkreqamount(amount)
    function checkreqamount(amount){
        if (amount > 5){
            $('.loginverificationCode').show();
            $('.loginContent_wrap').css('height','615px');
            pic_code_check = false;
            pic_src = '/u/api/code/vcode.pic?r=' + Math.random()
            $('.vcode').attr('src', pic_src)

            $('.vcode').on("click", changepic);
            function changepic(){
                pic_src = '/u/api/code/vcode.pic?r=' + Math.random()
                $('.vcode').attr('src', pic_src)
                pic_code_check =false;
            }
        }
    }
    //验证码
    var text = document.querySelector(".code");
    var error = document.querySelector(".codeError");
    $(text).focus(function(){
        $(this).prev().addClass('changeFont');
        $('.codeLeft').addClass('changeBorder');
        $('.codeError').hide();
        $('.codeError_2').hide();
        pic_code_check =false;
    }).blur(function(){
        if($(text).val() == ""){
            $(error).show();
            pic_code_check =false;
        }else{
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
    }).keyup(function(){
        if($(text).val().length == 4){
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
    });

    var type = getParam('type')
    var agenttype =getParam('agenttype')
    if(getParam('next') != null){
        var next_url = getParam('next')
    }else{
        var next_url = 'http://www.yhctech.com'
    }

    var register_url = '/u/register?'+ 'type='+type+'&agenttype='+agenttype+'&next='+escape(next_url)

    var resetpwd_url = '/u/resetpassword?'+ 'type='+type+'&agenttype='+agenttype+'&next='+escape(next_url)

    var key = $('meta[name=key]').attr('content');
    //用户登录验证
    var userObj = document.querySelector('.userPhone_test');
    var disSolve = document.querySelector('.disSolve');
    var passwordObj = document.querySelector('.userPassword_test');
    var passError = document.querySelector('.passError');
    // var clearPhone = document.querySelector('.clearPhone');

    $(".nowLogin").attr('href',register_url)
    $(".forgetPassword").attr('href',resetpwd_url)


    $(userObj).focus(function(){
        $(this).prev().addClass('changeFont');
        $(this).parent('.telephone').addClass('changeBorder');
        $('.disSolve').hide();
        $('.phone_exists').hide();
    });
    
    $(userObj).blur(function(){
        checkphone();
    });

    function checkphone(){
        var val = document.querySelector('.userPhone_test').value;
        var phone_exists = document.querySelector('.phone_exists');
        if(!(/^1[34578]\d{9}$/.test(val))){
            $(disSolve).show();
        }else{
            check(val, 'phone', phone_exists)
        }
    }

    $(passwordObj).focus(function(){
        $('.passError').hide();
        $(this).prev().addClass('changeFont');
        $(this).parent('.telephone').addClass('changeBorder');
        $(this).parent('.loginPassword').addClass('changeBorder');
    });
    $(passwordObj).blur(function(){
        showWarn(passwordObj, passError);
    });
    //登录提交
    $('.buttonLogin').on('click', submit)
    function submit(){
        var phoneNumber = $('.userPhone_test').val();
        if (phoneNumber==""){
            phonecheck = false;
        }else{
            phonecheck = true;
        }
        var phonePassword = $('.userPassword_test').val();
        if(phonePassword==""){
            password_check = false;
        }else{
            password_check = true;
        }
        var is_remember = 0;
        if($("input[type='checkbox']").is(':checked')){
            is_remember = 1;
        }
        if(phonecheck && password_check && pic_code_check){
            $.ajax({
                type:'POST',
                url: '',
                contentType:'json',
                dataType: 'json',
                data: JSON.stringify({
                    agenttype: agenttype,
                    type: type,
                    phone: phoneNumber,
                    pwd: getEntryptPwd(phonePassword, key),
                    is_remember:is_remember
                }),
                success: function(response){
                    if(response['code'] == 'A00000'){
                       location.href = next_url;
                    }else{
                        amount++;
                        checkreqamount(amount);
                        $('.error_text').html('账号或密码错误');
                        $('.error_msg').show();
                        $('.userPassword_test').val('');
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


    function getEntryptPwd(pwd, key) {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(key);
        return encrypt.encrypt(pwd);
    }

    function showWarn(obj1, obj2, obj3){    //判断空值函数
        var obj1 = $(obj1);     //当前input值
        var obj2 = $(obj2);     //提示语
        var obj3 = $(obj3);     //比较值
        if( arguments.length > 2){
            if( obj1.val() == "" || obj1.val() !== obj3.val()){
                obj2.show();
                return false;
            }else{
                obj2.hide();
            }
        }
        if(arguments.length <= 2){
            if( obj1.val() == ""){
                obj2.show();
                return false;
            }else{
                obj2.hide();
            }
        }
    }

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
                    return true;
                } else {
                    warn.show();
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
