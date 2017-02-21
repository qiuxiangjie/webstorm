/**
 * Created by Z10002053 on 2017/1/13.
 */
$(function () {
  var curPage = 1;
  var totalPage = 0;
  $("body").unbind();
  $(".conWrap").undelegate();

  function isNotNull(obj){
    return typeof(obj) != 'undefined' && obj !== null && ($.isArray(obj)? obj.length !== 0 : obj !== "");
  }

  function checkType (str) {
    var strRegex = "(.xlsx|.xls)$"; //用于验证文件扩展名的正则表达式
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
      alert(res.response.message)
    }).fail(function(res) {
      alert(res)
    });
  }

  $('#uploadTimeStart, #uploadTimeEnd, #signTimeStart, #signTimeEnd, #logisticsSignDatetimeMin, #logisticsSignDatetimeMax').datetimepicker({
    lang:'ch',
    timepicker:false,
    format:'Y-m-d'
  });

  $('#searchZhd').click(function () {
    getData(1)
  });
  function getParam () {
    var param = '';
    var paramObj = {
      pageSize: 10,
      curPage: curPage,
      integrationBillNumber: $('#zhdId').val(),
      deliveryBillNumber: $('#orderId').val(),
      postingDatetimeMin: $('#postTimeStart').val(),
      postingDatetimeMax: $('#postTimeEnd').val(),
      uploadDatetimeMin: $('#uploadTimeStart').val(),
      uploadDatetimeMax: $('#uploadTimeEnd').val(),
      uploadPersonName: $('#uploadName').val(),
      uploadPersonBadgeNumber: $('#uploadNum').val(),
      signStatus: $('#signStatus').val() === '-1' ? '' : $('#signStatus').val(),
      signPersonName: $('#signName').val(),
      signDatetimeMin: $('#signTimeStart').val(),
      signDatetimeMax: $('#signTimeEnd').val(),
      logisticsSignDatetimeMin: $('#logisticsSignDatetimeMin').val(),
      logisticsSignDatetimeMax: $('#logisticsSignDatetimeMax').val(),
      logisticsSignPersonName: $('#logisticsSignPersonName').val(),
      logisticsSignStatus: $('#logisticsSignStatus').val() === '-1' ? '' : $('#logisticsSignStatus').val()
    };
    for ( var a in paramObj) {
      if(isNotNull(paramObj[a])) {
        if (param === '') {
          param += a + '=' + paramObj[a]
        } else {
          param += '&' + a + '=' + paramObj[a]
        }
      }
    }
    return param
  }
  function getData (pageNum) {
    curPage = pageNum;
    $('#getPage').val(curPage);
    if (curPage == 1 ) {
      $('.prev').addClass('disabled')
    } else {
      $('.prev').removeClass('disabled')
    }
    $.ajax({
      url:'/dms_bos/wms/so/list.do?' + getParam(),
      dataType:'json',
      method:'get',
      success:function(data){
        if (data.response.code === 0) {
          if (data.response.data.data.length !== 0) {
            $('.zhd-list, .page').show();
            totalPage = data.response.data.page.pageNum;
            if (curPage == totalPage ) {
              $('.next').addClass('disabled')
            } else {
              $('.next').removeClass('disabled')
            }
            $('.select-page span:first-child').text('共'+ totalPage +'页');
            renderList(data.response.data.data)
          } else {
            $('.zhd-list, .page').hide();
            $('.zhd-list').html('');
            alert('未查询到符合条件的数据');
          }
        } else {
          alert(data.response.message)
        }
      },
      error:function(mes){
        console.log(mes)
      }
    });
  }
  function renderList (data) {
    var list = '<ul class="zhd-list-title clear"><li>整合单号</li><li>交货单号</li><li>过账日期</li><li>上传人员姓名</li><li>上传人员工号</li><li>上传时间</li><li>签到状态</li><li>签收人</li> <li>签收人工号</li><li>签收时间</li><li>物流签到状态</li><li>物流签收人</li> <li>物流签收人工号</li><li>物流签收时间</li></ul>';

    data.forEach(function (item) {
      var listItem = '';
      listItem += '<a href="/dms_bos/wms/so/detail.vdo?integrationBillNumber='+ item.integrationBillNumber +'"><ul class="zhd-list-title zhd-list-con clear"><li><p>'
        + item.integrationBillNumber
        +'</p></li> <li><p>'
        + item.deliveryBillNumber
        +' </p></li> <li><p>'
        + item.postingDatetime
        +'</p></li> <li><p>'
        + item.uploadPersonName
        +'</p></li> <li><p>'
        + item.uploadPersonBadgeNumber
        +'</p></li> <li><p>'
        + item.uploadDatetime
        +'</p></li><li><p>'
        + item.signStatus
        +'</p></li> <li><p>'
        + item.signPersonName
        +'</p></li> <li><p>'
        + item.signPersonBadgeNumber
        +' </p></li> <li><p>'
        + item.signDatetime
        +'</p></li><li><p>'
        + item.logisticsSignStatus
        +'</p></li> <li><p>'
        + item.logisticsSignerName
        +'</p></li> <li><p>'
        + item.logisticsSignerBadgeNumber
        +' </p></li> <li><p>'
        + item.logisticsSignerTime
        +'</p></li></ul></a>';
      list += listItem
    });
    $('.zhd-list').html(list)
  }

  $('.prev').click(function () {
    if (curPage == 1) {
      return
    }
    getData(--curPage)
  });

  $('.next').click(function () {
    if (totalPage < 1 + curPage) {
      return
    }
    getData(++curPage)
  });
  $('.select-page-btn').click(function () {
    var page = parseInt($('#getPage').val());
    page < 1 ? getData(1)
      : page > totalPage ? getData(totalPage)
      : getData(page)
  });
  $('#signStatus').change(function () {
    if ($(this).val() == 0) {
      $('#signTimeStart, #signTimeEnd, #signName').attr('disabled', 'disabled')
    } else {
      $('#signTimeStart, #signTimeEnd, #signName').removeAttr('disabled')
    }

  });
  $('.export').click(function () {
    window.location.href = '/dms_bos/wms/so/export.do?' + getParam()
  })
});