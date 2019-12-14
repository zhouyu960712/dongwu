// 封装一个函数，用于从浏览器的地址栏中获取指定的参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    // 参数不存在，则返回-1
    return -1;
};


var key = getUrlParams('key');
console.log(key);
if(key==-1){
    //1-获取关键词（地址栏中的id参数）
    var id = getUrlParams('id');
    console.log(id);
    key='';
}else{
    id='';
}

$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/search',
    data: { type:id,key:key },
    success: function (response) {
        console.log(response);

        var html = template('listTpl', {data: response.data.data});
        // console.log(html);

        $('#mingcheng').html(response.data.data[0].category);
        // $('#listBox').html(html);
        
        //总页数
        var total_pages = Math.ceil(response.data.totalCount / 6);

        changePage(1);
        $(".pagination").twbsPagination({
            totalPages: total_pages,
            visiblePages: 5,
            startPage: 1,
            first: "首页",
            last: "页尾",
            prev: "上一页",
            next: "下一页",
            onPageClick: function (e, page) {
                changePage(page);
            }
        })

    }
});

// 封装函数，实现分页
function changePage(page) {

    // 发送请求，获取文章列表数据
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/search',
        data: {type:id,
            key:key,
        page:page},
        success: function (response) {
            // console.log(response);
            response.data.pages = Math.ceil(response.data.totalCount / 6);
            // console.log(page);
            var html = template('listTpl', {
                data: response.data.data
            });
            $('#listBox').html(html);

        }
    })
}