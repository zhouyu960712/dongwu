// 更改用户头像
//给控件注册change事件 
$('#userBox').on('change', '#exampleInputFile', function() {
    //把选中的图片文件保存在file变量中
    var file = this.files[0];
    //用这个URL里的（createObjectURL）方法生成一个img的地址
    var imgURL = URL.createObjectURL(file);
    //设置img标签的src属性
    $('#headPortrait').prop('src', imgURL);
});



// 用户信息修改功能
function modiFicaTion() {
    // console.log('3211');

    // 给表单注册提交（submit）事件
    $('#userBox').on('submit', '#uesrForm', function() {
        // 收集用户表单填写的数据
        var formData = new FormData(this);
        // console.log(formData.get('userPic'))

        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/user/edit',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // console.log(response);
                // alert('用户信息已修改');
                alert('修改成功，即将退回登录页重新登录');
                parent.location.href = 'login.html';
            },
            error: function(u) {
                //邮箱参数错误
                alert('您输入的邮箱格式不对，请重新输入');
            }
        });
        // 阻止表单的重新刷新
        return false;
    });
};





// 获取用户详情

$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/user/detail',
    data: '',
    success: function(response) {
        // console.log(response);
        var html = template('userForms', response);

        $("#userBox").html(html)

    }
})






//修改时退出登录状态
$('#userBox').on('click', '#logout', function() {
    var isConfirm = confirm('修改信息需要重新登录，确认修改吗？')
    if (isConfirm) {
        
            // 调用获取用户信息函数
        modiFicaTion();

        //跳转到登录页面
        // top.location.href = 'login.html';
        // window.top.location.replace('login.html');
        
    } 
})