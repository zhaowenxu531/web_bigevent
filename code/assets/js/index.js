$(function(){
    // 获取个人信息
    getuserinfo()
    // 给退出绑定事件
    $('.loginout').on('click',function(){
        // 跳转到登录页面
        location.href='./login.html'
        //删除token值
        localStorage.removeItem('token')
    })
})
//发送请求获取个人资料 按需渲染头像名称
function getuserinfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        //后面需访问的接口均为 有权限的接口为优化代码量 故将设置请求头的代码放入baseapi中
        //一发起请求自动设置请求头
        // 设置请求头 以访问有权限的接口 属性值为登录时的返回值
        // headers:{
        //     Authorization: localStorage.getItem('token') ||''
        // },
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg('获取信息失败')
            }
            // 渲染头像文字
            renderavater(res.data);
        },
        //后面需访问的接口均需要设置该权限 故将其设置在baseapi中
        // 解决未登录也可访问主页的问题
        // 请求成功或失败都会回调的函数用以限制访问权限
        // 如果访问时没有token或token不正确，则无法进入主页
        // complete:function(res){
        //     console.log(res.responseJSON);
        //     if(res.responseJSON.status === 1 &&res.responseJSON.message==='身份认证失败！'){
        //         // 跳转到登录页面
        //         location.href='./login.html'
        //         //删除token值
        //         localStorage.removeItem('token')
        //     }
        // }
    })
}
function renderavater(user){
    // 获取用户名(有昵称优先昵称 无昵称则用用户名)
    var name = user.nickname || user.username
    // 渲染欢迎文字
    $('.wellcome').html('欢迎:&nbsp;&nbsp'+name);
    // 按需渲染头像
    if(user.user_pic!==null){
        $('.text-avater').hide()
        $('.layui-nav-img').attr('src',user.user_pic).show()
    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avater').html(first).show()
    }
}