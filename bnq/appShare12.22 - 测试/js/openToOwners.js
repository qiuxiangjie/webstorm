$(function () {
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
  $.ajax({
    url:"http://dms.bnq.com.cn/dms/project/customerTrack/detail.share?trackId=" + trackId,
    type: "get",
    dataType: "json",
    success: function(data){
      if (data.response) {
        if (data.response.code == 0) {
          showData(data.response.data)
        } else {
          alert(data.response.message)
        }
      }
    },
    error: function(){
      alert('网络错误')
    }
  });

  function showData (ds) {
    var data = [];
    $('#wrokingNote').text(ds.workingNote);
    $('#finshedNote').text(ds.finishNote);
    var workingData = ds.workingPicUrlList.map(function (item,i) {
      return {
        content: ds.workingNote,
        id:i,
        picURL: item
      }
    });
    data.push(workingData);
    var finishData = ds.finishPicUrlList.map(function (item,i) {
      return {
        content: ds.finishNote,
        id:i,
        picURL: item
      }
    });
    data.push(finishData);
    ['wImg', 'cImg'].forEach(function (item, i) {
      var h = '';
      data[i].forEach(function (item2, j) {
        h += '<li class=' + item + ' id='+ item + j +'><img src=' + item2.picURL + '></li>'
      });
      $( i === 0 ? '#working' : '#complete').html(h).width(data[i].length * 34.6 + 'vw');

      var flag = true;
      var picScroll;
      $('.' + item).tap(function () {
        //实例化一个图片组件
        if(flag){
          picScroll = new PicScroll({
            list:data[i],
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

});


