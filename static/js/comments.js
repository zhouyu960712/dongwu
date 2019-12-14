
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/category',
    success:function(response){
        // console.log(response);

        var html=template('fenleiTpl',{data:response.data});
        // console.log(html);
        $("#selectedUl").html(html);
        $('#hengUl').html(html);
    }
});

$('#btn').on('click',function(){
    // alert('ok');
    var key=$('#inp').val();
    location.href="/list.html?key="+key;
});


$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/rank',
    success:function(response){
        // console.log(response);
        
        var html=template('hotlistTpl',{data:response.data});
        // console.log(html);

        $('#hotlistBox').html(html);
    }
});

$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/latest_comment',
    success:function(response){
        // console.log(response);

        var html=template('pinglunTpl',{data:response.data});
        // console.log(html);
        
        $('#pinglunBox').html(html);

    }
});

$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/attention',
    success:function(response){
        // console.log(response);

        var html=template('onfocusTpl',{data:response.data});

        $('#onfocusBox').html(html);
    }
});



