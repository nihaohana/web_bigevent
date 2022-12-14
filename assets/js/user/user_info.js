$(function(){
    var form = layui.form

    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })

    initUserInfo()

    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取用户信息失败！')
                }
                // 调用form。form.val（）快速为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }


    // 重置按钮的监听事件
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })


    // 表单数据的提交监听
    $('.layui-form').on('submit',function(e){
        // 阻止默认提交行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })

})