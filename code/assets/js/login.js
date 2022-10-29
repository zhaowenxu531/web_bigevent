var btnlogin = document.querySelector('#btn-login')
var btnreg = document.querySelector('#btn-reg')
var iptlogin = document.querySelector('.ipt-login')
var iptreg = document.querySelector('.ipt-reg')
btnlogin.addEventListener('click',function(){
    iptlogin.style.display = 'none'
    iptreg.style.display = 'block'
})
btnreg.addEventListener('click',function(){
    iptreg.style.display = 'none'
    iptlogin.style.display = 'block'
})
// 正则验证
//1从layui中获取form对象
var form = layui.form
//2使用form.verify方法定义pass 与repass 校验规则
form.verify({
    //密码框验证
    pass:[/^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'],
    //确认密码框验证 形参value是 填写repass验证的表单的value
    repass: function(value){
        //拿到需要判断的密码框的value
        var pwd = document.querySelector('.pwd')
        var pwdvalue =pwd.value
        //用确认密码表单的value与密码框的value做对比
        if(pwdvalue!==value){
            return '两次密码不一致'
        }
    }
})
//   点击注册后发起注册请求

// 获取form表单
var form= document.querySelector('.reg')
// 获取账户表单
var username = document.querySelector('.username')
// 获取密码表单
var pwd = document.querySelector('.pwd')

// 从layui获取layer 用layer.msg()方法制作结果反馈提示框
var layer = layui.layer
//为注册表单绑定提交事件，发起注册账户请求
form.addEventListener('submit',function(e){
    e.preventDefault()
    var xhr = new XMLHttpRequest()
    xhr.open('post','http://api-breakingnews-web.itheima.net/api/reguser')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send('username='+username.value+"&password="+pwd.value)
    xhr.onreadystatechange= function(){
        if(xhr.readyState === 4 && xhr.status === 200){     
            var res = JSON.parse(xhr.responseText)
            console.log(res);
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            // 手动调用去登录点击事件，注册成功后，返回登录界面
            btnreg.click()
        }
    }
})

//  点击登录后发起登录请求

//1.获取表单
var lgn_form = document.querySelector('.login')
//2.获取账户表单
var lgnusername = document.querySelector('.lgn-username')
//3.获取密码表单
var lgnpassword = document.querySelector('.lgn-password')
//4.给form表单绑定submit事件发起登录请求
lgn_form.addEventListener('submit',function(e){
    e.preventDefault()
    var xhr = new XMLHttpRequest()
    xhr.open('post','http://api-breakingnews-web.itheima.net/api/login')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send('username='+lgnusername.value+"&password="+lgnpassword.value)
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            var res = JSON.parse(xhr.responseText)
            if(res.status!==0){
                return layer.msg(res.message)
            }
            //登录成功后发送回来的数据里面有一个token属性，后面凡是需要请求有登陆权限的请求接口都需要在header设置这个属性值（表示登录成功的验证）所以此处将其储存在本地存储里方便后续使用
            localStorage.setItem('token',res.token)
            layer.msg(res.message)
            //跳转至主页
            location.href = './index.html'
        }
    }
})

