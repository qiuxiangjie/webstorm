/**
 * Created by Z10002053 on 2017/1/13.
 */
$(function () {
  $("body").unbind();
  function checkType (str) {
    var strRegex = "(.xlsx|.xls)$"; //用于验证图片扩展名的正则表达式
    var re = new RegExp(strRegex);
    return re.test(str.toLowerCase())
  }
  function checkStatus (status) {
    if (status) {
      $('#upload').bind('click', upload);
      $('.check-warning').text('');
      $('.check-upload').addClass('active')
    } else {
      $('#upload').unbind();
      $('.check-warning').text('文件格式不正确！');
      $('.check-upload').removeClass('active')
    }
  }
  $('#file').change(function () {
    checkType($(this).val()) ? checkStatus(true) : checkStatus(false)
  });

  function upload () {
    $.ajax({
      url: '/dms_bos/wms/so/upload.do',
      type: 'POST',
      cache: false,
      data: new FormData($('#uploadForm')[0]),
      processData: false,
      contentType: false
    }).done(function(res) {

    }).fail(function(res) {

    });
  }

  $('#postTimeStart, #postTimeEnd').Zebra_DatePicker();
  $('#uploadTimeStart, #uploadTimeEnd').Zebra_DatePicker();
  $('#signTimeStart, #signTimeEnd').Zebra_DatePicker();
  
  $('#searchZhd').click(function () {
    
  })


});