/**
 * Created by Z10002053 on 2017/1/18.
 */
$(function () {
  $.ajax({
    url:'/dms_bos/wms/so/detail.do?integrationBillNumber=111111111111',
    dataType:'json',
    method:'get',
    success:function(data){
      if (data.response.code === 0) {
        renderData(data.response.data)
      } else {
        alert(data.response.message)
      }
    },
    error:function(mes){
      console.log(mes)
    }
  });
  function renderData (data) {
    ['integrationBillNumber', 'deliveryBillNumber', 'uploadPersonName', 'postingDatetime', 'uploadDatetime', 'signDatetime', 'signPersonName', 'signPersonBadgeNumber', 'signStatus', '123456', 'signerName', 'signerBadgeNumber', 'signTime', 'imgs'].forEach(function (item) {
      $('#' + item).text(data[item])
    })
  }
});

$('.big-img').height($(window).height()/1.6).width($(window).width()/1.6);
