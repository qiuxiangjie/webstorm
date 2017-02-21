$(function () {
    /******请求数据*********/
    var reformId = getUrlArg('reformId'),
        seqNo = getUrlArg('seqNo'),
        errorMsg;
    $.ajax({
        url:'http://dms.bnq.com.cn/dms/project/reform/histDetail.share?reformId='+reformId+'&seqNo='+seqNo,
        dataType:'json',
        method:'get',
        success:function(data){
            if(data.response.code===0){
                renderBaseDOM(data.response.data.base);
                var newPicData = renderTabDOM(data.response.data.reformInfo);
                renderDOMCallBack();
                errorMsg&&clearTimeout(errorMsg);
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
            errorMsg = setTimeout(function () {
                alert('网络或服务器异常，请稍后重试')
            },1500);
        }
    });
    function renderBaseDOM(data){
        ['seqNo','roundStartTime','planFinishTime','teamSubmitTime','checkTime', 'checkerCheckTime'].forEach(function (item) {
            $("#"+item).text(data[item]);
        });
        document.title='第'+data.seqNo+'次整改';
    }
});