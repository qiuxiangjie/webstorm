$(function () {
    /*数据加载*/
    var reformId = getUrlArg('reformId');
    var scoreArray = [];
    var errorMsg;
    $.ajax({
        url:'http://192.168.251.81:8080/dms/project/reform/baseInfo.share?reformId='+reformId,
        //url:'./js/package.json',
        dataType:'json',
        method:'get',
        success:function(data){
            if(data.response.code===0){
                renderDOM(data.response.data);
                setFootRUL(reformId);
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
    //数据渲染函数
    function renderDOM(data){
        var score = data.score;
        var base  = data.base;

        //状态显示
        $('#reformState').text(base.reformStateStr);

        //分数等级
        var $scoreLevelName = $('#scoreLevelName');
        $scoreLevelName.text(score.scoreLevelName);
        $scoreLevelName.addClass('level'+score.scoreLevel);

        //超时显示
        if(isNotNull(base.confirmTimeout)){
            $('.box1 li').eq(1).append('<p class="red over-time" id="overTime">超时'+base.confirmTimeout+'小时</p>')
        }
        //基本信息
        document.title = base.shopName +'整改处罚单';
        window.sessionStorage.shopName = base.shopName;//本地存储店铺名称，给其他页面用
        $('#shopName').text(base.shopName);
        $('#reformNum').text(base.reformNum==='暂无'?base.reformNum:(base.reformNum+'次'));
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
        if(isNotNull(base.okTime))
            timeUl += '<li id="okTime"><p>铁面验收日期：</p><p>'+base.okTime+'</p></li>';
        $('.date-list').html(timeUl);

        //扣分概况
        var scoreUl = '' ;
        var classFlag = false;
        scoreArray = score.scoreArray;//保存数据到弹出时候做渲染
        scoreArray.forEach(function (item) {
            scoreUl += '<li ><span>'
                + item.title
                + '</span><span class="doScore">'
                + item.doScore
                + '分</span>'
                + (item.punshFeeStr==='扣除成品保护费'?'<span class="f12">':'<span>')
                + item.punshFeeStr
                + '</span>'
                + (item.timeout.length>0?'<i class="clear alertShow">含超时扣分项</i>':'')
                + '<b>'+item.stopMonthStr+'</b>'
                + '</li>';
            isNotNull(item.punshFeeStr)?classFlag = true:'';
        });

        $('.box2').html(scoreUl+'<li><p>罚款小计：<span class="red">'+score.punishFee+'元</span></p></li>');
        if(classFlag){
            $('.doScore').addClass('right')
        }
        renderDOMCallback();
    }
    function renderDOMCallback(){
        var client = $('#client');
        var shop = $('#shop');
        autoHeight(client);
        autoHeight(shop);
        function autoHeight(obj){
            if(obj.height()>50){
                obj.find('p').eq(1).css({
                    float:'left',
                    width:'100%',
                    borderTop:'1px #EEE solid'
                })
            }
        }
        var dateList= $('.date-list');
        var realH = dateList.height();
        dateList.css('height',realH);
        //点击展开(收起)
        $('#dataListControl').tap(function () {
            //展开（闭合）小箭头旋转
            var span = $(this).find('span');
            var img  = $(this).find('img');
            if($(this).find('img.active').length==1){
                $('.date-list').css({height:realH});
                img.removeClass('active');
                span.text('收起');
            }else{

                $('.date-list').css({height:0});
                img.addClass('active');
                span.text('展开');
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