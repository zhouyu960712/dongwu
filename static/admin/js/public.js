// //search表单提交事件
// $('.search_form').on('submit', function() {
//     // alert('ok');
//     var keys = $(this).find('input').val();
//     $.ajax({
//             type: 'get',
//             url: 'http://localhost:8000/admin/search' + key,
//             success: function(response) {
//                 console.log(response);

//             }
//         })
//         //阻止表单默认提交
//     return false;
// })