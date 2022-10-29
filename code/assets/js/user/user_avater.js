var layer = layui.layer
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
// 纵横比
aspectRatio: 1,
// 指定预览区域
preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)
// 点击按钮触发文件选择表单域
$('.btnImageChoos').on('click',function(){
    $('#file').click()
})
// 给file表单域绑定change事件
$('#file').on('change',function(e){
    console.log(e);
    var imgFiles = e.target.files
    if(imgFiles.length===0){
        return layer.msg('请选择文件')
    }
    // 更换裁剪图片
    // 拿到选择的图片
    var file = e.target.files[0]
    // 将图片转化为url地址
    var newImgURL = URL.createObjectURL(file)
    $image
    //先销毁旧的裁剪区域，再重新设置图片路径 ，之后再创建新的裁剪区域
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', newImgURL) // 重新设置图片路径
    .cropper(options) // 重新初始化裁剪区域
})
// 上传裁剪好的头像
$('.btnimgupload').on('click',function(){
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 100,
    height: 100
    })
    .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
        method:'POST',
        url:'/my/update/avatar',
        data:{
            avatar:dataURL
        },
        success:function(res){
            if(res.status!==0){
                return layer.msg('更换头像失败')
            }
            layer.msg('更换头像成功')
            //调用主页的getuserinfo方法 获取用户最新信息并渲染页面
            window.parent.getuserinfo()
        },
    })
})