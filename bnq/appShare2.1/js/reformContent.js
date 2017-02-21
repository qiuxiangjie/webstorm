$(function () {
    var reformId = getUrlArg('reformId') ;
    /*数据加载*/
    $.ajax({
        url:'http://192.168.251.16:8080/dms/project/reform/detail.share?reformId='+reformId,
       // url:'./js/package2.json',
        dataType:'json',
        method:'get',
        success:function(data){
            if(data.response.code===0){
                var newPicData = renderTabDOM(data.response.data.reformInfo, data.response.data.base.creatorType);
                renderDOMCallBack();
                renderPic(newPicData);
                if(isNotNull(window.sessionStorage.shopName))
                document.title = window.sessionStorage.shopName + '整改处罚单';
                setFootRUL(reformId);
                $('.head').tap(function () {
                    $(window).scrollTop(0);
                });

            }else{
                alert(data.response.message)
            }
        },
        error:function(){
            alert('网络或服务器异常，请稍后重试')
        }
    });
});