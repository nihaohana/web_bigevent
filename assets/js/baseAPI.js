// 注意：每次调用$.get\$.post()\$.ajax()的时候
// 就会先调用ajaxprefilter这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 在发起正真的Ajax请求之前，同意拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url)


    if(options.url.indexOf('/my/') !== -1){
    // 统一为有权限的接口，设置headers请求头
    options.headers={
        Authorization:localStorage.getItem('token') || ''
    }}


    // 全局统一挂载conmplete函数
    options.complete = function(res){
        // 在complete回调函数中，可是使用res.responseJSON拿到服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            // 强制清空Token
            localStorage.removeItem('token')
            // 强制跳转到登录界面
            location.href = './login.html'
        }

    }
})