/**
 * Created by w10001901 on 2016/6/8.
 */
$(function(){
    //dom左边导航自动获取浏览器可视区域高度
    $('#leftWrap').css("height" , $(window).height()+"px");

    //当滚动条滚动高度大于130px的时候，在logo处显示焦点标题
    $(window).scroll(function(){
        if($(document).scrollTop() > 60){
            $('.toplogo > b').text(" - " + $('.conPubTitile').text());
        } else if($(document).scrollTop() < 60) {
            $('.toplogo > b').text("");
        }
    });

    //侧边导航
    jQuery(document).ready(function () {
        jQuery("#jquery-accordion-menu").jqueryAccordionMenu();
    });
});
