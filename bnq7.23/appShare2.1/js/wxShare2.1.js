/**
 * Created by Z10002053 on 2016/7/14.
 */
$(function () {
    function isNotNull(obj){
        return typeof(obj) != 'undefined' && obj !== null &&  obj !== "";
    }
    /*******************************基本概况****************************************************************************************************************/
    /*数据加载*/
    var scoreArray = [];
    $.ajax({
       // url:'http://192.168.251.16:8080/dms/project/reform/baseInfo.share?reformId=1&seqNo=1&userName=Test3&accessToken=964fa7856d6ab1e898508e4010a81e95',
        url:'./js/package.json',
        dataType:'json',
        method:'get',
        success:function(data){
            if(data.response.code===0){
                renderDOM(data.response.data)
            }else{
                alert(data.response.message)
            }
        },
        error:function(a,b,c){
            console.log('a:'+a);
            console.log('b:'+b);
            console.log('c:'+c);
        }
    });
    //数据渲染函数
    function renderDOM(data){
        var score = data.score;
        var base  = data.base;

        //状态显示
        var $reformState = $('#reformState');
        data.reformId ===0?$reformState.text('等待队长确认')
            :data.reformId ===1?$reformState.text('等待队长整改')
            :data.reformId ===2?$reformState.text('等待工程管理员验收')
            :$reformState.text('验收通过');

        //分数等级
        var $scoreLevelName = $('#scoreLevelName');
        $scoreLevelName.text(score.scoreLevelName);
        $scoreLevelName.addClass('level'+score.scoreLevel);

        //超时显示
        if(isNotNull(2)){
            $('.box1 li:first-child').append('<p class="red over-time" id="overTime">超时'+2+'小时</p>')
        }
        //基本信息
        $('#shopName').text(base.shopName);
        $('#reformNum').text(base.reformNum+'次');
        $('#clientName').text(base.clientName);
        $('#contractSn').text(base.contractSn);
        $('#address').text(base.address);
        $('#teamAdminName').text(base.teamAdminName);
        $('#projAdminName').text(base.projAdminName);

        //整改时间
        $('#createTime').text(base.createTime);
        $('#planFinishTime').text(base.planFinishTime);
        var timeUl = '';
        if(isNotNull(base.teamSubmitTime))
            timeUl += '<li id="teamSubmitTime"><p>队长整改完成日期：</p><p>'+base.teamSubmitTime+'</p></li>';
        if(isNotNull(base.checkTime))
            timeUl += '<li id="checkTime"><p>工程管理员验收日期：</p><p>'+base.checkTime+'</p></li>';
        if(isNotNull(base.okTime))
            timeUl += '<li id="okTime"><p>整改合格日期：</p><p>'+base.okTime+'</p></li>';
        $('.date-list').html(timeUl);

        //扣分概况
        var scoreUl = '' ;
        scoreArray = score.scoreArray;//保存数据到弹出时候做渲染
        scoreArray.forEach(function (item) {
            scoreUl += '<li ><span>'
                + item.title
                + '</span><span>'
                + item.doScore
                + '分</span><span>'
                + item.punishTypeStr
                + '</span>'
                + (item.timeout.length>0?'<i class="clear alertShow">含超时扣分项</i>':'')
                + '</li>'
        });
        $('.box2').html(scoreUl+'<li><p>罚款小计算：<span class="red">'+score.punishFee+'元</span></p></li>');

        renderDOMCallback();
    }
    function renderDOMCallback(){
        var realH = $('.date-list').height();
        $('.date-list').css('height',realH);
        /*点击展开(收起)*/
        $('#dataListControl').tap(function () {
            // $('.date-list').toggle();
            //展开（闭合）小箭头旋转
            var span = $(this).find('span');
            var img  = $(this).find('img');
            if($(this).find('img.active').length==1){
                img.removeClass('active');
                span.text('收起');
                $('.date-list').css('height',realH);
            }else{
                img.addClass('active');
                span.text('展开');
                $('.date-list').css('height',0)
            }
        });

        /***弹出层(含超时扣分项)****/
        var winH = $(window).height();
        var alertMes = $('.alertMes');
        var body =$('.main,.foot');
        $('.box2 li').tap(function () {
            if($(this).find('i').length!==0){
                alertMes.height(winH);
                alertMes.addClass('movedh');
                body.addClass('filter');
                renderAlertMes($(this).index());
            }
        });
        //渲染弹出数据
        function renderAlertMes(i){
            var lisDOM = '';
            scoreArray[i].timeout.forEach(function (item) {
                lisDOM += '<li><p>'+item.content+'</p><p class="score">'+item.num+'处</p></li>'
            });
            $('#alertMes').html(lisDOM);
        }
        /***关闭弹出层****/
        $('.delete').tap(function () {
            alertMes.removeClass('movedh');
            body.removeClass('filter');
        });
    }


});
