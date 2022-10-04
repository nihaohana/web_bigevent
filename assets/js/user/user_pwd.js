$(function(){
    let form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能一致'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '新旧密码不一致'
            }
        }
    })

    // 给表单提交添加监听事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize() ,
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                // 更新密码成功了之后，直接把所有的Input清空重置表单
                // [0]是为了转换成DOM对象，使用jQuery对象是没有办法调用reset方法的
                $('.layui-form')[0].reset()
            }    
        })
    })

})