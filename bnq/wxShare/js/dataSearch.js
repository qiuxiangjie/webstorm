(function (){
	/*url参数截取*/
	function GetRequest() {
	    var url = window.location.href;
	    var index = url.indexOf('=');
	    var theRequestParam = new Object();
	    if (index != -1) {
	        theRequestParam = url.substr(index + 1,url.length);
	    }
	    return theRequestParam;
	}

	var trackId = GetRequest();

	/*获取数据*/
	function getData(){
		var data = {};
		$.ajax({
		//url:"http://dms.bnq.com.cn/dms/project/track/detail.share?trackId=" + trackId,
		//url:"http://192.168.251.16:8080/dms/project/track/detail.share?trackId=" + trackId,
//		url:"http://139.196.169.119:8080/dms/project/track/detail.share?trackId=" + trackId,
		url:"http://192.168.251.81:8080/dms/project/track/detail.share?trackId=" + trackId,
		//url:'./data.json',
		type: "get",
		data: data,
		dataType: "json",
		success: function(data){
			if (data.response) {
				if (data.response.code == 0) {
					getDataCallback(data.response.data);
					publicOne();
					widthVal();
					bageBox();
					deteDivone();
					//$('#gongxu-a').attr('href','review.html?trackId=' + trackId);
					$('#gongxu-a').attr('href','trackReview.html?trackId=' + trackId);
				}
			}
		},
		error: function(){
			
		}
	});
	}
	
	function getDataCallback(data){

		//基本信息--客户姓名
		if(data.customName == null){
			$('#customName').parent().remove();
		} else {
			$('#customName').text(data.customName);
		}

		//基本信息--地址
		if(data.address == null){
			$('#address').parent().remove();
		} else {
			$('#address').text(data.address);
		}


		//基本信息--装修风格
		if(data.styleName == null){
			$('#styleName').parent().remove();
		}else {
			$('#styleName').text(data.styleName);
		}

		//基本信息--面积
		if(data.houseArea == null){
			$('#houseArea').parent().remove();
		} else {
			$('#houseArea').text(data.houseArea + " ㎡");
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

		//施工情况--签到时间
		if(data.lastSubmitTrack.trackTimeStr == null){
			$('#trackTimeStr').parent().remove();
		}else {
			$('#trackTimeStr').text(data.lastSubmitTrack.trackTimeStr);
		}

		//施工情况--当前阶段
		if(data.curStageName == null){
			$('#workStateStr').parent().remove();
		}else {
			$('#workStateStr').text(data.curStageName);
		}

		//施工情况--施工队长
		if(data.teamAdminName == null){
			$('#teamAdminName').parent().remove();
		} else {
			$('#teamAdminName').text(data.teamAdminName);
		}

		
		
		
		
		if(data.lastSubmitTrack.qualityScore >= 0){
			$("#quality").text(data.lastSubmitTrack.qualityScore + "分");
		}else {
			$("#quality").text("");
		}
		if(data.lastSubmitTrack.civilScore >= 0){
			$("#civilScore").text(data.lastSubmitTrack.civilScore + "分");
		} else {
			$("#civilScore").text("");
		}
		
		if(data.lastSubmitTrack.protectScore >= 0){
			$("#protectScore").text(data.lastSubmitTrack.protectScore + "分");
		} else {
			$("#protectScore").text("");
		}
		
		if(data.lastSubmitTrack.confirmScore >= 0){
			$("#jiaodiAdminName").text(data.lastSubmitTrack.confirmScore + "分");
		} else {
			$("#jiaodiAdminName").text("");
		}
		
		if (data.lastSubmitTrack) {
			var ulDomList = '';
			var ulgramDomList = '';
			var ulpicDomList = '';
			var ulproDomList = '';
			var ulscoDomList = '';
			//电器工程
			if (data.lastSubmitTrack.stageDropScoreList.length > 0) {
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
			}
			
			//外单位施工不扣分项
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

			//综合评级
			var avgScoreLevel = data.lastSubmitTrack.avgScoreLevel;
			avgScoreLevel===1?setLevel(1)
				:avgScoreLevel===2?setLevel(2)
				:avgScoreLevel===3?setLevel(3)
				:avgScoreLevel===4?setLevel(4)
			    :'';

			//施工综合质量打分
			if (data.lastSubmitTrack.stageAddScoreList.length > 0) {
				var stageAddList = data.lastSubmitTrack.stageAddScoreList;
				for (var i = 0, len = stageAddList.length; i < len; i++) {
					var ulAddDomItem = '';
					ulAddDomItem += '<b>'
							+ stageAddList[i].stageName
							+ '</b>'
							+ '<ul class="fracList">';
					for (var j = 0, len1 = stageAddList[i].stageItemList.length; j < len1; j++) {
						var liAddDomItem = '<li><span>';
						liAddDomItem += stageAddList[i].stageItemList[j].orderNoStr
							+ ' '
							+ stageAddList[i].stageItemList[j].content
							+ '</span><b>'
							+ stageAddList[i].stageItemList[j].doScore
							+ '</b></li>';
						
						ulAddDomItem += liAddDomItem;
					}
					ulAddDomItem += '</ul>';
					ulDomList += ulAddDomItem;
				}
			}
			$('#dropScoreSpan').after(ulDomList);
			
			
			//文明工程扣分项
			if (data.lastSubmitTrack.civilList.length > 0) {
				var gramAddList = data.lastSubmitTrack.civilList;
				for (var i = 0, len = gramAddList.length; i < len; i++){
					var ulgramAddDomItem = '';
					ulgramAddDomItem += '<b>'
							+ gramAddList[i].subjectName
							+ '</b>'
							+ '<ul class="fracList">';
					for (var j = 0, len1 = gramAddList[i].civilItemList.length; j < len1; j++) {
						var ligramAddDomItem = '<li><span>';
						ligramAddDomItem += gramAddList[i].civilItemList[j].orderNoStr
							+ ' '
							+ gramAddList[i].civilItemList[j].content
							+ '</span><b>'
							+ gramAddList[i].civilItemList[j].doScore
							+ '</b></li>';
						
						ulgramAddDomItem += ligramAddDomItem;
					}
					ulgramAddDomItem += '</ul>';
					
					ulgramDomList += ulgramAddDomItem;
				}
			}
			$('#pramScoreSpan').after(ulgramDomList);
			
			
			
			
			
			//工地成品保护检查
			if(data.lastSubmitTrack.productProtects.length == 0){
				$('#domThree').remove();
			} else if (data.lastSubmitTrack.productProtects.length > 0) {
				var proAddList = data.lastSubmitTrack.productProtects;
				for (var i = 0, len = proAddList.length; i < len; i++){
					var liproAddDomItem = '';
					liproAddDomItem += '<li>'
									+ '<span>'
									+ proAddList[i].sequence
									+ ' '
									+ proAddList[i].content
									+ '</span>'
									+ '<b>'
									+ proAddList[i].doScoreStr
									+ '</b>'
									+ '</li>';
					ulproDomList += liproAddDomItem;
				}
			}
			$('#proScoreSpan').append(ulproDomList);
			
			
			//内部交底得分
			if(data.lastSubmitTrack.internalValidates.length == 0){
				$('#domTwo').remove();
			} else if (data.lastSubmitTrack.internalValidates.length > 0) {
				var scoAddList = data.lastSubmitTrack.internalValidates;
				
				for (var i = 0, len = scoAddList.length; i < len; i++){
					var liscoAddDomItem = '';
					liscoAddDomItem += '<li>'
									+ '<span>'
									+ scoAddList[i].orderNo
									+ ' '
									+ scoAddList[i].content
									+ '</span>'
									+ '<b>'
									+ scoAddList[i].doScoreStr
									+ '</b>'
									+ '</li>';
					ulscoDomList += liscoAddDomItem;
				}
			}
			$('#odaScoreSpan').append(ulscoDomList);
			
			
			//整改方案
			console.log(data.lastSubmitTrack.reformPlan);
			if( data.lastSubmitTrack.reformPlan == "undefined" || data.lastSubmitTrack.reformPlan === null ){
				$('#domOne').remove();
			} else {
				var reformplayDom = data.lastSubmitTrack.reformPlan;
				$("#textStyle").text(reformplayDom);
			}

			//工序检核
/*			if(data.lastSubmitTrack.authInfos.STEP_CHECK.needHidden == true){
				$('#projectgx').remove();
			}*/


			
			//巡检日志
			if (data.lastSubmitTrack.note == "undefined" || data.lastSubmitTrack.note === null){
				$("#inspectionRizhi").text("");
			} else {
				var rizhiplayDom = data.lastSubmitTrack.note;
				$("#inspectionRizhi").text(rizhiplayDom);
			}



			
			
			
			//图片路径等
			if(data.lastSubmitTrack.trackPicList.length > 0) {
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
			$(ulpicDomList).appendTo(".baguetteBox");


		}
	}
	
	getData();
	function publicOne(){

		$('.publicScore').each(function(){

			if(parseInt($(this).text()) <= 100 ){
				$(this).next().css({"background-image" : "url(http://res.bnq.com.cn/img/down.png)"});
				$(this).next().click(function(){
					if($(this).parent().next('.fraction').is(":hidden")){

						$(this).parent().next('.fraction').slideDown();
						$(this).css({"background-image" : "url(http://res.bnq.com.cn/img/up.png)"});
					}else {
						$(this).parent().next('.fraction').slideUp();
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
