// 给表单注册提交事件
$('#addCategory').on('submit', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 添加分类
    $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/category/add',
            data: formData,
            success: function() {
                location.reload();
            }
        })
        // 阻止表单默认提交行为
    return false;
});

// 发送请求获取所有分类列表 添加新增分类
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function(response) {
        // console.log(response);
        var html = template('xinzengTpl', { data: response.data });
        $('#xinzengBox').html(html);
    }
});
// 新增类别功能完成
// ------------------------------------------------------------------------------------------------------------

// 通过事件委托获取要被修改的分类id的详细信息 
$('#xinzengBox').on('click', '.edit', function() {

    // 获取要修改的分类数据的id
    var id = $(this).attr('data-id');
    // console.log(id);

    // 根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/category/search',
        data: {
            id: id
        },
        success: function(response) {
            // console.log(response);
            var html = template('bianjiTpl', response);
            // console.log(html);
            $('#formBox').html(html);
        }
    })
});

// // 通过事件监听给关闭按钮添加事件
$('#addModal').on('click', '.guan', function() {
    $('#addModal').fadeOut();
    location.reload();
});



// 通过事件监听给编辑按钮注册提交事件
$('#addModal').on('submit', '#xiugaiCategory', function() {
    // alert('ok')
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // console.log(formData)
    // 发送请求 修改分类数据
    $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/category/edit',
            data: formData,
            success: function(response) {
                // console.log(response)
                location.reload();
            }
        })
        // 阻止表单的默认提交行为
    return false;
});
// 编辑功能完成
// -----------------------------------------------------------------------------------------------------------------

$('#xinzengBox').on('click', '.shanchu', function() {
    // alert('ok')
    if (confirm('您真的要执行删除操作吗')) {
        // 获取要删除的分类数据id
        var id = $(this).attr('data-id');
        // console.log(id)

        // 向服务器端发送请求 删除分类数据
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/category/delete',
            data: {
                id: id
            },
            success: function(response) {
                // console.log(response);
                location.reload();
            }
        })
    }
})