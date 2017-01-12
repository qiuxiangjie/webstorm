$(function () {
    var roundId = getUrlArg('roundId'),
        errorMsg;
    /******请求数据*********/
    $.ajax({
        url:'http://dms.bnq.com.cn/dms/project/reform/pftUpdateDetail.share?roundId='+roundId,
        dataType:'json',
        method:'get',
        success:function(data){
            if(data.response.code===0){
                renderDOM(data.response.data);
                errorMsg&&clearTimeout(errorMsg);
            }else{
                alert(data.response.message)
            }
        },
        error:function(){
            errorMsg = setTimeout(function () {
                alert('网络或服务器异常，请稍后重试')
            },1500);
        }
    });
    function renderDOM(data){
        $('#planTime').text(data.oldTime);
        $('#changeTime').text(data.newTime);
        $('.reason-c').text(data.reason);

    }
});