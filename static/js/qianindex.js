

$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/hotpic',
    success:function(response){
        // console.log(response);

        var html=template('focusTpl',{data:response.data});
        // console.log(html);

        $('#focuslistBox').html(html);
        $('#focuslistBox').children('li').eq(0).addClass('first');
        
    }
});

$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/latest',
    success:function(response){
        // console.log(response);

        var html=template('listTpl',{data:response.data});
        

        $('#listBox').html(html);
    }
})