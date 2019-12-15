$.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/user/info',
        success: function(response) {
            // //获取到相应信息后，展示在页面
            $('#userPic').attr('src', response.data.userPic);
                $('#nickname').html('欢迎&nbsp;&nbsp;' + response.data.nickname);
            $('#user2').prop('src',response.data.userPic)
        }
    });
    
    $('#logout').on('click', function() {
        var inConfirm = confirm('您的要退出吗?');
        if (inConfirm) {
            location.href = 'login.html';
        } else {
            alert('退出失败')
        }
    
    
    })