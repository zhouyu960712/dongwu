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

//1-获取关键词（地址栏中的key参数）
var id=''+getUrlParams('id');
console.log(id);



// ....
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/article',
    data:{id:id},
    success:function(response){
        // console.log(response);

        var html=template('editTpl',response);
        // console.log(html);

        $('#editBox').html(html);
        
        
    }
});

$('#commentForm').on('submit',function(){
    var user=$('#users').val();
    var contents=$('#contents').val();

    $.ajax({
        type:'post',
        url:'http://localhost:8080/api/v1/index/post_comment',
        data:{
            author:user,
            content:contents,
            articleId:id,
        },
        success:function(response){
            // console.log(response);
            location.reload();

        }
    })

    return false;
});

$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/get_comment',
    data:{articleId:id},
    success:function(response){
        // console.log(response);

        var html=template('comtentsTpl',{data:response.data});
        // console.log(html);

        $('#contentsBox').html(html);
    }
})