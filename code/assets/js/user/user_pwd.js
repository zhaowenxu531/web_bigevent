$(function(){
    // 引入form验证表单域
    var form = layui.form
    var layer = layui.layer
    // 自定义验证规则
    form.verify({
        pwd:function(value){
            if(value===$(".oldpwd").val()){
                return '新密码不能与旧密码一致'
            }
        },
        repwd:function(value){
            if(value!==$(".newpwd").val()){
                return '两次密码输入不一致'
            }
        }
    })
    // 发送请求修改密码
    $('.layui-form').on("submit",function(e){
        e.preventDefault()
        $.post({
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                
                if(res.status!==0){
                    return layer.msg('重置密码失败')
                }
                layer.msg('重置密码成功');
                //重置表单 reset为原生方法 所以要先将元素转换为dom元素
                $('.layui-form')[0].reset()
            }
        })
    })
})