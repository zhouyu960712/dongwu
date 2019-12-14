//发送ajax获取数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/comment/search',
    success: function(response) {
        console.log(response);
        // 模板拼接
        var html = template('listTpl', { data: response.data.data });
        // console.log(html);
        $('#listBox').html(html);


        //总页数
        var total_pages = response.data.totalPage;

        changePage(1);
        $(".pagination").twbsPagination({
            totalPages: total_pages,
            visiblePages: 5,
            startPage: 1,
            first: "首页",
            last: "页尾",
            prev: "上一页",
            next: "下一页",
            onPageClick: function(e, page) {
                changePage(page);
            }
        })


    }
});


// 封装函数，实现分页
function changePage(page) {

    // 发送请求，获取文章列表数据
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/comment/search',
        data: {
            page: page
        },
        success: function(response) {
            // console.log(response);
            response.data.data.pages = response.data.totalPage;
            // console.log(page);
            var html = template('listTpl', {
                data: response.data.data
            });
            $('#listBox').html(html);

        }
    })
}


// 评论审核
$('#listBox').on('click', '.success', function() {

    //判断当前属性值
    // console.log($(this).text());
    // console.log($(this));
    if ($(this).text() == '通过') {
        // alert('ok');
        var id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/pass',
            data: { id },
            success: function(response) {
                console.log(response);
                location.reload()
            }
        })
    }
});

// 评论审核，审核不通过
$('#listBox').on('click', '.success', function() {

    //判断当前属性值
    // console.log($(this).text());
    // console.log($(this));
    if ($(this).text() == '拒绝') {
        // alert('ok');
        var id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1//admin/comment/reject',
            data: { id },
            success: function(response) {
                console.log(response);
                location.reload()
            }
        })
    }
});

//删除评论
$('#listBox').on('click', '.decline', function() {
    if (confirm('您真的要删除？')) {
        var id = $(this).attr('data-id');
        // alert(id);
        //向服务器端发送请求
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/delete',
            data: { id: id },
            success: function(response) {
                console.log(response);
                location.reload()
            }
        })
    }
})