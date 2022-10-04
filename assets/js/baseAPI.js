// 注意：每次调用$.get\$.post()\$.ajax()的时候
// 就会先调用ajaxprefilter这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 在发起正真的Ajax请求之前，同意拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url)
})