;$(function () {
    var reformId = getUrlArg('reformId') ;
    /******请求数据*********/
    $.ajax({
        url:'http://192.168.251.81:8080/dms/project/reform/hist.share?reformId='+reformId,
       // url:'./js/historyList.json',
        dataType:'json',
        method:'get',
        success:function(data){
            if(data.response.code===0){
                renderDOM(data.response.data);
                if(isNotNull(window.sessionStorage.shopName))
                document.title = window.sessionStorage.shopName + '整改处罚单';
                setFootRUL(reformId);

            }else{
                alert(data.response.message)
            }
        },
        error:function(){
            alert('网络或服务器异常，请稍后重试')
        }
    });
    //数据渲染
    function renderDOM(data){
        var dataFlag = true;
        //整改历史记录
        if(isNotNull(data.reformHist)){
            var reformHistDOM ='<h3 class="h-title">整改历史记录</h3><ul class="h-list">';
            data.reformHist.forEach(function (item) {
                reformHistDOM += ' <li><span>第'
                    + item.seqNo
                    + '次整改</span><a href="./reformHist.html?reformId='+reformId+'&seqNo='+item.seqNo+'">'
                    + item.createTime
                    + '</a></li>'
            });
            reformHistDOM += '</ul>';
            $('#mainHistory').append(reformHistDOM);
            dataFlag = false;
        }

        //要求整改完成时间变更记录
        if(isNotNull(data.timeHist)){
            var timeHistDOM ='<h3 class="h-title">要求整改完成时间变更记录</h3><ul class="h-list">';
            data.timeHist.forEach(function (item) {
                timeHistDOM += ' <li><span>第'
                    + item.seqNo
                    + '次变更</span><a href="./timeHist.html?roundId='+item.roundId+'">'
                    + item.createTime
                    + '</a></li>'
            });
            timeHistDOM += '</ul>';
            $('#mainHistory').append(timeHistDOM);
            dataFlag = false;
        }
        if(dataFlag){
            //无数据渲染
            $('#mainHistory').addClass('no-data').height($(window).height()-60)
        }
    }
});

