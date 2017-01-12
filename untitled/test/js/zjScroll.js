// JavaScript Document
$(function () {
	
	function scoll(){
		if(parseInt($(".zj_con_contentAll").css("left"))<=-2400){
			$(".zj_con_contentAll").stop().animate({left:'-0px'},500);
		}
		else{
			$(".zj_con_contentAll").stop().animate({left:'-=800'},500);
		}		
	}
	var s=setInterval(scoll,4000);
	$(".zj_con_contentAll,.zj_con_list").mouseover(function(){clearInterval(s)});
	$(".zj_con_contentAll,.zj_con_list").mouseleave(function(){s=setInterval(scoll,2000)});//自动滚动
	
	$(".zj_con_list ul li").mouseover(function(e){
		//this.style.background="#1165BB".siblings().style.background="#FFF";
		var i=$(".zj_con_list ul li").index(this);
		switch(i){
			case 0:
			$(".zj_con_contentAll").stop().animate({left:'-0px'},500);
			break;
			case 1:
			$(".zj_con_contentAll").stop().animate({left:'-800px'},500);
			break;
			case 2:
			$(".zj_con_contentAll").stop().animate({left:'-1600px'},500);
			break;
			case 3:
			$(".zj_con_contentAll").stop().animate({left:'-2400px'},500);
			break;
		}
		/*var j=$(".zj_con_list ul li").length();
		for(  ;i<=j-1;i++){
			$(".zj_con_contentAll").stop().animate({left:'-=800*(i+1)'},500);
		}*/
	});//tab滚动
	
	
	
	
	

});

