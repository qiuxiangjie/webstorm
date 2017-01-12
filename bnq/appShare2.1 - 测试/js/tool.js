//取URL参数
function getUrlArg(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var arg = window.location.search.substr(1).match(reg);
    if(isNotNull(arg)) {
        return arg[2]
    }else{
        return ''
    }
}
//判断字符串不为空
function isNotNull(obj){
    return typeof(obj) != 'undefined' && obj !== null && ($.isArray(obj)? obj.length !== 0 : obj !== "");
}

//设置底部链接
function setFootRUL(reformId){
    var $foot = $('.foot a');
    $foot.eq(0).attr('href','./reformDetail.html?reformId='+reformId);
    $foot.eq(1).attr('href','./reformContent.html?reformId='+reformId);
    $foot.eq(2).attr('href','./reformHistory.html?reformId='+reformId);
}