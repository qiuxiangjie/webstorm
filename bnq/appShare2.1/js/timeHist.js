$(function () {
    var roundId = getUrlArg('roundId') ;
    /******请求数据*********/
    $.ajax({
        url:'http://192.168.251.81:8080/dms/project/reform/pftUpdateDetail.share?roundId='+roundId,
        //url:'./js/changeList.json',
        dataType:'json',
        method:'get',
        success:function(data){
            if(data.response.code===0){
                renderDOM(data.response.data);
            }else{
                alert(data.response.message)
            }
        },
        error:function(){
            alert('网络或服务器异常，请稍后重试')
        }
    });
    function renderDOM(data){
        $('#planTime').text(data.oldTime);
        $('#changeTime').text(data.newTime);
        $('.reason-c').text(data.reason);

    }
});