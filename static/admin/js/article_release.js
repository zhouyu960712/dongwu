$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function(response) {
        // console.log(response);
        // 用模板引擎渲染到页面
        var html = template('creatgoyTpl', { data: response.data });
        // console.log(html);
        $('#article_category').html(html);
        // console.log($('#typeaaa'));
    }
});


//input控件发生change事件时
$('#exampleInputFile').on('change', function() {
    //图片的预览
    var file = this.files[0];
    var imgURL = URL.createObjectURL(file);
    $('#preview').prop('src', imgURL);
    //打印图片的地址
    // console.log(imgURL);
});


//表单提交事件,成功时
$('#articleAddForm').on('click', '#success', function() {
    // 发送Ajax请求
    var formData = new FormData();
    formData.append('cover', $('#exampleInputFile')[0].files[0]);
    formData.append('title', $('#inputEmail3').val());
    formData.append('categoryId', $('#article_category').val());
    formData.append('date', $('#dateinput').val());
    formData.append('content', tinyMCE.get('rich_content').getContent().slice(3, -4));
    formData.append('state', '已发布');
    // console.log(formData.get('title'));
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/article/publish',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            // console.log(response);
            location.href = '/admin/article_list.html';
        }
    });
    //阻止表单默认提交
    return false;
});
//表单提交事件,草稿时
$('#articleAddForm').on('click', '#draft', function() {
    // 发送Ajax请求
    var formData = new FormData();
    formData.append('cover', $('#exampleInputFile')[0].files[0]);
    formData.append('title', $('#inputEmail3').val());
    formData.append('categoryId', $('#article_category').val());
    formData.append('date', $('#dateinput').val());
    formData.append('content', tinyMCE.get('rich_content').getContent().slice(3, -4));
    formData.append('state', '');
    // console.log(formData.get('title'));
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/article/publish',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            // console.log(response);
            location.href = '/admin/article_list.html';
        }
    });
    //阻止表单默认提交
    return false;
});