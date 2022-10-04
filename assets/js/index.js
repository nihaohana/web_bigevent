$(function(){
    // 调用getUserInfo获取用户的基本信息
    getUserInfo()

    let layer = layui.layer


    // 点击退出按钮的监听事件
    $('#btnLogout').click(function(){
        // console.log('ok')
        // 点击退出按钮，弹出是否确认退出提示框
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = './login.html'
            // 关闭对应的comforin弹出层
            layer.close(index);
          });
    })
})

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头配置对象
        // 以/my开头的请求路径必须在请求头携带authorization身份认证字段，才能够正常访问成功
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },



    })
}


// 渲染用户的头像
function renderAvatar(user){
    // 1获取用户的名称
    let name = user.nickname || user.username
    // 2设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)


    // 3渲染用户的头像
    // 先判断是否有图片头像，没有则使用文本头像
    if(user.user_pic !== null){
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        // 将文本头像隐藏
        $('.text-avatar').hide()

    }else{// 3.2渲染文字图像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}