$(function () {
    /******请求数据*********/

    var reformId = getUrlArg('reformId') ;
    var seqNo = getUrlArg('seqNo') ;

    $.ajax({
        url:'http://192.168.251.81:8080/dms/project/reform/histDetail.share?reformId='+reformId+'&seqNo='+seqNo,
        //url:'./js/firstRectification.json',
        dataType:'json',
        method:'get',
        success:function(data){
            if(data.response.code===0){
                renderBaseDOM(data.response.data.base);
                var newPicData = renderTabDOM(data.response.data.reformInfo);
                renderDOMCallBack();
                $('.box').addClass('mid-tab-margin');
                var hh = $('#tabCon').offset().top-50;
                var $head = $('.head');
                $(window).scroll(function () {
                    if($(window).scrollTop()>hh){
                        $head.removeClass('mid-tab');
                        $('#tabCon').css('paddingTop','50px');
                        $head.unbind('tap').bind('tap', function () {
                            $(window).scrollTop(hh);
                        })
                    }else{
                        $('.head').addClass('mid-tab');
                        $('#tabCon').css('paddingTop','0');
                        $head.unbind('tap')
                    }
                });
                renderPic(newPicData);
            }else{
                alert(data.response.message)
            }
        },
        error:function(){
            alert('网络或服务器异常，请稍后重试')
        }
    });
    function renderBaseDOM(data){
        ['seqNo','roundStartTime','planFinishTime','teamSubmitTime','checkTime'].forEach(function (item) {
            $("#"+item).text(data[item]);
        });
        document.title='第'+data.seqNo+'次整改';
    }
});