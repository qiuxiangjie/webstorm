$(function () {
    var trackId = getUrlArg('trackId'),
        errorMsg;
    /*数据加载*/
    $.ajax({
        //url:'http://192.168.251.81:8080/dms/project/reform/detail.share?reformId='+reformId,
        // url:'./js/package2.json',
        url:'http://192.168.251.81:8080/dms/project/reform/originDetail.share?trackId='+trackId,
        dataType:'json',
        method:'get',
        success:function(data){
            if(data.response.code===0){
                $('body').show();
                var planPicData = renderPlan(data.response.data.reformInfo.require);
                renderPic(planPicData);
                $('#note').text(data.response.data.reformInfo.require.note ? data.response.data.reformInfo.require.note : '暂无');
                $('#planFinishTime').text(data.response.data.base.planFinishTime);
                errorMsg&&clearTimeout(errorMsg);
            }else{
                alert(data.response.message);
                $('body').html('').addClass('no-search').height($(window).height());
            }
        },
        error:function(){
            errorMsg = setTimeout(function () {
                alert('网络或服务器异常，请稍后重试')
            },1500);
        }
    });

    function renderPlan(data){
        var boxDOM = '';
        var planPicData = [];
        var picsID = 0;
        if(isNotNull(data.quality)){
            renderScoreDOM(data.quality,'施工质量综合打分');
        }
        if(isNotNull(data.civil)){
            renderScoreDOM(data.civil,'安全文明打分');
        }
        if(isNotNull(data.protect)){
            renderScoreDOM(data.protect,'土地成品保护检查');
        }
        if(isNotNull(data.internal)){
            renderScoreDOM(data.internal,'内部交底打分');
        }
        if(isNotNull(data.other)){
            renderScoreDOM(data.other,'其它');
        }
        $('.list').append(boxDOM);
        return [planPicData];

        //渲染打分项
        function renderScoreDOM(data,name){
            var qualityDOM = '';
            qualityDOM += ' <li><h4>'+name+'</h4><ul class="list-con clear">';
            data.forEach(function (item,i) {
                qualityDOM += '<li class="clear '+(item.isOpen ? 'padding' : '')+'"><div class="listLeft"><p>'
                  +item.content
                  + '</p><i>'
                  + item.num
                  + '处'
                  +'</i></div><div class="pics picR'
                  +'" id=picR"'
                  + picsID
                  +'"><img src="'
                  + item.picUrls[0].picUrl
                  +'"/>'
                  +(item.picNum>1?('<i>'+item.picNum+'</i>'):'')
                  +'</div><div class="bottomTip '+(!item.isOpen ?'hidden' : '')+' ">此问题业主可见</div></li>';
                //保存图片数据
                item.picUrls.forEach(function (picItem) {
                    planPicData.push({
                        id:picsID++,
                        picURL :picItem.picUrl,
                        content : item.content
                    })
                });
            });
            qualityDOM += '</ul></li>';
            boxDOM += qualityDOM;
        }
    }
});