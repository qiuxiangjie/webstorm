
(function (){
  //判断字符串不为空
  function isNotNull(obj){
    return typeof(obj) != 'undefined' && obj !== null && ($.isArray(obj)? obj.length !== 0 : obj !== "");
  }
  /*url参数截取*/
  function getUrlArg(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var arg = window.location.search.substr(1).match(reg);
    if(isNotNull(arg)) {
      return arg[2]
    }else{
      return ''
    }
  }

  var trackId = getUrlArg('trackId');

  /*获取数据*/
  function getData(){
    var data = {};
    $.ajax({
      //url:"http://dms.bnq.com.cn/dms/project/track/detail.share?trackId=" + trackId,
      url:"http://192.168.251.81:8080/dms/project/track/getDetail.share?trackId=" + trackId,
//		url:"http://139.196.169.119:8080/dms/project/track/detail.share?trackId=" + trackId,
//		url:"http://192.168.251.16:8080/dms/project/track/detail.share?trackId=" + trackId
      //url:'http://192.168.251.16:8080/dms/project/reform/originDetail.share?trackId=158',
      type: "get",
      data: data,
      dataType: "json",
      success: function(data){
        if (data.response) {
          if (data.response.code === 0) {
            getDataCallback(data.response.data);
            publicOne();
            widthVal();
            //bageBox();
            deteDivone();
            //$('#gongxu-a').attr('href','review.html?trackId=' + trackId);
            $('#gongxu-a').attr('href','trackReview.html?trackId=' + trackId);
            $('#z_plan').attr('href','./reformPlan.html?trackId='+trackId);
            $('#z_open').attr('href','./openToOwners.html?trackId='+trackId)
          } else {
            alert(data.response.message)
          }
        }
      },
      error: function(){
      }
    });
  }

  function getDataCallback(data){

    //基本信息--客户姓名
    if(data.customerName == null){
      $('#customName').parent().remove();
    } else {
      $('#customName').text(data.customerName);
    }

    //基本信息--地址
    if(data.address == null){
      $('#address').parent().remove();
    } else {
      $('#address').text(data.address);
    }


    //基本信息--装修风格
    if(data.style == null){
      $('#styleName').parent().remove();
    }else {
      $('#styleName').text(isNotNull(data.style) ? data.style : '暂无');
    }

    //基本信息--面积
    if(data.area == null){
      $('#houseArea').parent().remove();
    } else {
      $('#houseArea').text(Math.round(data.area) + " ㎡");
    }

    //基本信息--面积
    if(data.startTimeName == null ){
      $('#startTimeName').parent().remove();
    } else {
      $('#startTimeName').text(data.startTimeName);
    }

    //基本信息--门店
    if(data.shopName == null){
      $('#shopName').parent().remove();
    } else {
      $('#shopName').text(data.shopName);
    }
    //开始时间/完成时间/天数
    if(!!data.isStartPlan){
      var realStartTime = isNotNull(data.startTime)?data.startTime
        :'暂无';
      var realEndTime = isNotNull(data.endTime)?data.endTime
        :'暂无';
      var realDay = isNotNull(data.days)?data.days:'0';

      $('#createTime').text(realStartTime);
      $('#planFinishTime').text(realEndTime);
      $('.days').text(realDay+'天');
    } else {
      $('.time').hide()
    }

    //  累计延期天数
    $('.delayDays').text(isNotNull(data.delayDays) && data.delayDays != 0 ? '累计延期' + data.delayDays + '天' : '' );

    //施工情况--签到时间
    if(!isNotNull(data.signTimeStr)){
      $('#trackTimeStr').parent().remove();
    }else {
      $('#trackTimeStr').text(data.signTimeStr);
    }

    //施工情况--当前阶段
    if(!isNotNull(data.stateStr)){
      $('#workStateStr').parent().remove();
    }else {
      $('#workStateStr').text(data.stateStr);
    }

    //施工情况--施工队长
    if(!isNotNull(data.teamName)){
      $('#teamAdminName').parent().remove();
    } else {
      $('#teamAdminName').text(data.teamName);
    }
    //工程管理员
    if(!isNotNull(data.projAdminName)){
      $('#proAdminName').parent().remove();
    } else {
      $('#proAdminName').text(data.projAdminName);
    }
    //铁面二人组
    if(!isNotNull(data.projAdminName)){
      $('#stickAdminName').parent().remove();
    } else {
      $('#stickAdminName').text(data.projAdminName);
    }

    if (data.isValid === 1) {
      $("#quality").text(data.qualityScore + "分");
      $("#civilScore").text(data.civilScore + "分");
      $("#protectScore").text(data.protectScore + "分");
      $("#jiaodiAdminName").text(data.confirmScore + "分");
      if(!data.hasReform) {
        $('#hasReform').hide()
      }
      if(!data.openCustomer){
        $('#openCustomer').hide()
      }
      var ulDomList = '';
      var ulgramDomList = '';
      var ulpicDomList = '';
      var ulproDomList = '';
      var ulscoDomList = '';
      //电器工程
/*      if (data.lastSubmitTrack.stageDropScoreList.length > 0) {
        var dropScoreList = data.lastSubmitTrack.stageDropScoreList;
        for (var i = 0, len = dropScoreList.length; i < len; i++) {
          var ulDomItem = '';
          ulDomItem += '<b>'
            + dropScoreList[i].stageName
            + '</b>'
            + '<ul class="fracList">';
          for (var j = 0, len1 = dropScoreList[i].stageItemList.length; j < len1; j++) {
            var liDomItem = '<li><span>';
            liDomItem += dropScoreList[i].stageItemList[j].orderNoStr
              + ' '
              + dropScoreList[i].stageItemList[j].content
              + '</span><b>'
              + dropScoreList[i].stageItemList[j].doScore
              + '</b></li>';

            ulDomItem += liDomItem;
          }
          ulDomItem += '</ul>';

          ulDomList += ulDomItem;
        }
      }*/

      //外单位施工不扣分项
/*
      if (data.lastSubmitTrack.stageSelectList.length > 0) {
        var stageSelectList = data.lastSubmitTrack.stageSelectList;
        for (var i = 0, len = stageSelectList.length; i < len; i++) {
          var ulSelectDomItem = '';
          ulSelectDomItem += '<b>'
            + stageSelectList[i].stageName
            + '</b>'
            + '<ul class="fracList">';
          for (var j = 0, len1 = stageSelectList[i].stageItemList.length; j < len1; j++) {
            var liSelectDomItem = '<li><span>';
            liSelectDomItem += stageSelectList[i].stageItemList[j].orderNoStr
              + ' '
              + stageSelectList[i].stageItemList[j].content
              + '</span><b>'
              + stageSelectList[i].stageItemList[j].optResultTypeStr
              + '</b></li>';

            ulSelectDomItem += liSelectDomItem;
          }
          ulSelectDomItem += '</ul>';
          ulDomList += ulSelectDomItem;
        }
      }
*/

      //综合评级
      var avgScoreLevel = data.avgScoreLevel;
      setLevel(avgScoreLevel);

      //施工综合质量打分
      if (data.score.quality.segList.length > 0) {
        var stageAddList = data.score.quality.segList;
        for (var i = 0, len = stageAddList.length; i < len; i++) {
          var ulAddDomItem = '';
          ulAddDomItem += '<b>'
            + stageAddList[i].segName
            + '</b>'
            + '<ul class="fracList">';
          for (var j = 0, len1 = stageAddList[i].itemList.length; j < len1; j++) {
            var liAddDomItem = '<li><span>';
            liAddDomItem += stageAddList[i].itemList[j].mark
              + ' '
              + stageAddList[i].itemList[j].content
              + '</span><b>'
              + stageAddList[i].itemList[j].doScore
              + '</b></li>';

            ulAddDomItem += liAddDomItem;
          }
          ulAddDomItem += '</ul>';
          ulDomList += ulAddDomItem;
        }
      }
      $('#dropScoreSpan').after(ulDomList);


      //文明工程扣分项
      if (data.score.civil.segList.length > 0) {
        var gramAddList = data.score.civil.segList;
        for (var i = 0, len = gramAddList.length; i < len; i++){
          var ulgramAddDomItem = '';
          ulgramAddDomItem += '<b>'
            + gramAddList[i].segName
            + '</b>'
            + '<ul class="fracList">';
          for (var j = 0, len1 = gramAddList[i].itemList.length; j < len1; j++) {
            var ligramAddDomItem = '<li><span>';
            ligramAddDomItem += gramAddList[i].itemList[j].mark
              + ' '
              + gramAddList[i].itemList[j].content
              + '</span><b>'
              + gramAddList[i].itemList[j].doScore
              + '</b></li>';

            ulgramAddDomItem += ligramAddDomItem;
          }
          ulgramAddDomItem += '</ul>';

          ulgramDomList += ulgramAddDomItem;
        }
      }
      $('#pramScoreSpan').after(ulgramDomList);
      //工地成品保护检查
      var proAddList = data.score.protect.itemList;
      if(proAddList.length == 0){
        $('#domThree').find('.switchWrap').remove();
      } else if (proAddList.length > 0) {

        for (var i = 0, len = proAddList.length; i < len; i++){
          var liproAddDomItem = '';
          liproAddDomItem += '<li>'
            + '<span>'
            + proAddList[i].seqNo
            + ' '
            + proAddList[i].content
            + '</span>'
            + '<b>'
            + proAddList[i].isOkStr
            + '</b>'
            + '</li>';
          ulproDomList += liproAddDomItem;
        }
      }
      $('#proScoreSpan').append(ulproDomList);


      //内部交底得分
      var scoAddList = data.score.internal.itemList;
      if(scoAddList.length == 0){
        $('#domTwo').find('.switchWrap').remove();
      } else if (scoAddList.length > 0) {


        for (var i = 0, len = scoAddList.length; i < len; i++){
          var liscoAddDomItem = '';
          liscoAddDomItem += '<li>'
            + '<span>'
            + scoAddList[i].seqNo
            + ' '
            + scoAddList[i].content
            + '</span>'
            + '<b>'
            + scoAddList[i].isOkStr
            + '</b>'
            + '</li>';
          ulscoDomList += liscoAddDomItem;
        }
      }
      $('#odaScoreSpan').append(ulscoDomList);


      //整改方案
      /*			console.log(data.lastSubmitTrack.reformPlan);
       if( data.lastSubmitTrack.reformPlan == "undefined" || data.lastSubmitTrack.reformPlan === null ){
       $('#domOne').remove();
       } else {
       var reformplayDom = data.lastSubmitTrack.reformPlan;
       $("#textStyle").text(reformplayDom);
       }*/

      //工序检核
/*
      if(data.lastSubmitTrack.authInfos.STEP_CHECK.needHidden == true){
        $('#projectgx').remove();
      }
*/



      //巡检日志
        $("#inspectionRizhi").text(isNotNull(data.note) ? data.note : '暂无' );
      //业主回访
      $("#ownerCallback").text(isNotNull(data.note) ? data.note : '暂无' );


      //图片路径等
/*      if(data.lastSubmitTrack.trackPicList.length > 0) {
        var picPathList = data.lastSubmitTrack.trackPicList;
        for ( var i = 0 , len = picPathList.length; i < len; i++){
          var picAddDomItem = '';
          //picAddDomItem += '<div class="swiper-slide am am-figure" data-am-widget="figure" data-am-figure="{pureview:'
          //			+ '\'true\''
          //			+ '}">'
          //			+ '<img src="'
          //			+ picPathList[i].picUrl
          //			+ '" />'
          //			+ '</div>';
          picAddDomItem += '<a href="'
            + picPathList[i].picUrl
            + '">'
            + '<img src="'
            + picPathList[i].picUrl
            + '"/></a>';
          ulpicDomList += picAddDomItem;
        }
      }
      $(ulpicDomList).appendTo(".baguetteBox");*/
    }
    if (data.isValid === 0) {
      $('.check-invalid, .no-mark').show();
      $('.isValid').hide();

      var imgData = [[]];
      $('.open-box-tex').text(data.invalidReason);
      data.invalidPicList.forEach(function (item,i) {
        imgData[0].push({
          content: data.invalidReason,
          id:i,
          picURL: item
        })
      });

      ['wImg'].forEach(function (item, i) {
        var h = '';
        imgData[i].forEach(function (item2, j) {
          h += '<li class=' + item + ' id='+ item + j +'><img src=' + item2.picURL + '></li>'
        });
        $( i === 0 ? '#working' : '#complete').html(h).width(imgData[i].length * 34.6 + 'vw');

        var flag = true;
        var picScroll;
        $('.' + item).tap(function () {
          //实例化一个图片组件
          if(flag){
            picScroll = new PicScroll({
              list:imgData[i],
              doc:'picScroll'+(i+1)
            });
            flag = false;
          }
          var cPicId= parseInt($(this).attr('id').replace(/[^0-9]/ig,""));//获取id数字
          picScroll.goIndex(cPicId);//跳转到响应的图片
          $('#picScroll' + (i+1)).addClass('active').css({
            transition:'opacity 300ms,transform 0s',
            transform: 'scale(1) translate3d(0px, 0px, 0px)'
          });
        });
      });
    }
  }


  (function ($) {
    $.fn.slideDown = function (duration) {
      // get old position to restore it then
      var position = this.css('position');

      // show element if it is hidden (it is needed if display is none)
      this.show();

      // place it so it displays as usually but hidden
      /*		this.css({
       position: 'absolute',
       visibility: 'hidden'
       });*/

      // get naturally height
      var height = this.height();

      // set initial css for animation
      this.css({
        position: position,
        visibility: 'visible',
        overflow: 'hidden',
        height: 0
      });

      // animate to gotten height
      this.animate({
        height: height
      }, duration);
    };
  })(Zepto);

  getData();
  function publicOne(){

    $('.publicScore').each(function(){

      if(parseInt($(this).text()) <= 100 ){
        $(this).next().css({"background-image" : "url(http://res.bnq.com.cn/img/down.png)"});
        $(this).next().click(function(){
          if($(this).parent().next('.fraction').css("display") == "none"){

            $(this).parent().next('.fraction').slideDown(300);
            $(this).css({"background-image" : "url(http://res.bnq.com.cn/img/up.png)"});
          }else {
            $(this).parent().next('.fraction').hide();
            $(this).css({"background-image" : "url(http://res.bnq.com.cn/img/down.png)"});
          }
        });
      }
    });

    $('.fraction').on("click" , ".fracList > li" , function(){
      $('.positionDiv').addClass('movedh');
      if($(this).parent().prev('b').length > 0){
        $('.textLi').text($(this).parent().prev('b').text());
        $('.scoreLi').text($(this).children('b').text());
        $('.scoreDiv').text("");
      } else {
        $('.textLi').text($(this).parent().parent().prev(".pubTitle").children("span").text());
        $('.scoreDiv').text($(this).children('b').text());
        $('.scoreLi').text("");
      }

      $('.contentLi').text($(this).children('span').text());
      $('.headDiv').css({"-webkit-filter" : "blur(4px)"});
    });
    $('.btWrap > a').click(function(){
      $('.positionDiv').removeClass('movedh');
      $('.headDiv').css({"-webkit-filter" : "none"});
    });
  }

  function widthVal(){
    var widthval = $(".baguetteBox > a").length*110;
    $(".baguetteBox").css("width", widthval +"px");
  }

  function bageBox(){
    baguetteBox.run('.baguetteBox');
  }

  function deteDivone(){
    if($('#divDele-2 li').length == 0){
      $('#dele-a-2').remove();
    }
    if($('#divDele-1 li').length == 0){
      $('#dele-a-1').remove();
    }
  }

  //综合评级函数
  function setLevel(i){
    var e =$('#avgScoreLevel i');
    e.addClass('level'+i);
    i===1? e.text('优秀')
      :i===2? e.text('合格')
      :i===3? e.text('不合格')
      :e.text('差');
  }




})();
