$(function(){
    // 引入form 验证表单
    var form = layui.form
    var layer = layui.layer
    // 验证表单域
    form.verify({
        nickname:function(value){
            if(value.length>6) {
                return '输入内容应小于6个字符'
            } 
        }  
    })
    
    inituserinfo()

    // 初始化用户信息
     function inituserinfo(){
         $.ajax({
             method:'get',
             url:'/my/userinfo',
             success:function(res){
                 if(res.status!==0){
                     return layer.msg('获取用户信息失败')
                 }
                 form.val('inituserinfo',res.data);
             }
         })
     }

    // 重置按钮绑定事件
    $('#restbtn').on('click',function(e){
        e.preventDefault();
        inituserinfo()
    })

    //提交用户信息修改
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.post({
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功')
                //调用父页面的getuserinfo函数从新获取用户信息并渲染页面
                window.parent.getuserinfo()
            }
        })
    })
})