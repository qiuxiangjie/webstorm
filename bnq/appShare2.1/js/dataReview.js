/**
 * Created by w10001901 on 2016/6/24.
 */
(function(){
    //判断字符串不为空
    function isNotNull(obj){
        return typeof(obj) != 'undefined' && obj !== null && ($.isArray(obj)? obj.length !== 0 : obj !== "");
    }

    function GetTrackId() {
        var url = window.location.href;
        var index = url.indexOf('=');
        var theRequestParam = new Object();
        if (index != -1) {
            theRequestParam = url.substr(index + 1,url.length);
        }
        return theRequestParam;
    }

    var trackId = GetTrackId();


    /*获取数据*/
    function reviewData(){
        $.ajax({
            url:"http://192.168.251.81:8080/dms/project/track/step-check.share?trackId=" + trackId,
           // url:"http://dms.bnq.com.cn/dms/project/track/step-check.share?trackId=" + trackId,
            type: "get",
            dataType: "json",
            success: function(data){
                if (data.response) {
                    if (data.response.code == 0) {
                        reviewDataCallback(data.response.data);
                        textStyle();
                    }
                }
            },
            error: function(){

            }
        });
    }

    function reviewDataCallback(data){
        /* 隐蔽工程 */
        if(isNotNull(data.milestoneList)){
            var milestName = data.milestoneList;
            var milestSpanDom = '';
            for(var i = 0; i < milestName.length; i++){

                milestSpanDom += '<span class="reviewTitle">'
                    + milestName[i].milestoneName
                    + '</span>'
                    + '<div class="reviewCon">';
                for(var t = 0; t < milestName[i].stepInfos.length; t++){
                    var milestDivDom = '';
                    milestDivDom += '<div class="clearfix">'
                        + '<span>'
                        + milestName[i].stepInfos[t].stepName
                        + '</span>'
                        + '<b>'
                        + milestName[i].stepInfos[t].stateStr
                        + '</b></div>';
                    milestSpanDom += milestDivDom;
                }
                milestSpanDom +='</div>';
            }
        }
        $('#yinbi').append(milestSpanDom);

        /* 隐蔽工程 */
        //if(data.unfinishedMilestoneList.length > 0){
        //    var unfinishName = data.unfinishedMilestoneList;
        //    var unfinishSpanDom = '';
        //    for(var i = 0; i < unfinishName.length; i++){
        //        unfinishSpanDom += '<span class="reviewTitle">'
        //            + unfinishName[i].unfinishedPhaseName
        //            + '</span>'
        //            + '<div class="reviewCon">';
        //        for(var j = 0; j < unfinishName[i].stepInfos.length; j++){
        //            var unfinishDivDom = '';
        //            unfinishDivDom += '<div class="clearfix">'
        //                + '<span>'
        //                + unfinishName[i].stepInfos[j].stepName
        //                + '</span>'
        //                + '<b>'
        //                + unfinishName[i].stepInfos[j].stateStr
        //                + '</b></div>';
        //            unfinishSpanDom += unfinishDivDom;
        //        }
        //        unfinishSpanDom +='</div>';
        //    }
        //}
        //$('#nimu').append(unfinishSpanDom);
        if(isNotNull(data.reason)){
            $('.clp').text(data.reason);
        }
    }

    reviewData();
    /* */
    function textStyle(){
        $('.clearfix > b').each(function(){
            if($(this).text() == '完成'){
                $(this).addClass('color-1');
            } else {
                $(this).addClass('color-2');
            }
        });
    }

})();