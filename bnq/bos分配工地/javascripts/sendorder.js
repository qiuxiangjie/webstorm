/**
 * Created by Z10002053 on 2017/2/8.
 */
$(function () {

  var w = $(window).width();
  var h = $(window).height();
  $('.msg-bg').click(function () {
    //$(this).fadeOut(300).children().fadeOut(300);
  });
  $('#checkName').text(getUrlArg('name'));
  $('.conPubTitile > span').text(getUrlArg('allocLogType') === '1' ? '本周派单' : '下周派单');

  //取URL参数
  function getUrlArg(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var arg = window.location.search.substr(1).match(reg);
    if(isNotNull(arg)) {
      return decodeURI(arg[2])
    }else{
      return ''
    }
  }

  function isNotNull(obj){
    return typeof(obj) != 'undefined' && obj !== null && ($.isArray(obj)? obj.length !== 0 : obj !== "");
  }

  function checkType (str) {
    var strRegex = "(.xlsx|.xls)$"; //用于验证文件扩展名的正则表达式
    var re = new RegExp(strRegex);
    re.test(str.toLowerCase()) ? checkStatus(true) : checkStatus(false);
    return re.test(str.toLowerCase())
  }

  $('.submit').click(function () {
    checkType($('#file').val()) ? checkFile () : '';
  });

  $('#file').change(function () {
    $('.file-name').text($(this).val());
    checkType($(this).val())
  });

  function checkStatus (status) {
    if (!isNotNull($('#file').val())) {
      $('.check-warning').addClass('f-active n-active').removeClass('s-active').text('没有选择文件！');
    } else {
      if (status) {
        $('.check-warning').addClass('s-active').removeClass('f-active n-active').text('');
      } else {
        $('.check-warning').addClass('f-active').removeClass('s-active n-active').text('文件格式不正确！');
      }
    }
  }

  function checkFile () {
    $.ajax({
      url: 'http://pr.devbos.b-and-qchina.com:8080/dms_bos/project/checker/allocLog/check.do',
      type: 'POST',
      cache: false,
      data: new FormData($('#uploadForm')[0]),
      processData: false,
      contentType: false
    }).done(function(res) {
      $('.sk-wave').hide();
      if (res.response) {
        if ( res.response.code === 0) {
          submit ()
        } else {
          if (!res.response.data) {
            alert(res.response.message);
            return
          }
          submitFailure(res.response.data)
        }
      } else {
        submitError()
      }
    }).fail(function(res) {
      submitError()
    });
    $('.msg-bg, .sk-wave').fadeIn(300);
  }

  function submit () {
    var ss = {
      allocLogType: getUrlArg('allocLogType'),//派单时间类型,1-本周派单, 2-下周派单
      checkerBosid: getUrlArg('checkerBosid'),//铁面bosid
      remark:$('#note').val(),//选填
    };
    var d1 = new FormData($('#uploadForm')[0]);
    d1.append("data", JSON.stringify(ss));

    $.ajax({
      url: 'http://pr.devbos.b-and-qchina.com:8080/dms_bos/project/checker/allocLog/save.do',
      type: 'POST',
      cache: false,
      data: d1,
      processData: false,
      contentType: false
    }).done(function(res) {
      $('.sk-wave').hide();
      if (res.response) {
        if ( res.response.code === 0) {
          submitSuccess ()
        } else {
          submitError()
        }
      } else {
        submitError()
      }
    }).fail(function(res) {
      submitError()
    });

    $('.msg-bg, .sk-wave').fadeIn(300);
  }
  function submitError () {
    $('.submit-failure').show(300);
    setTimeout(function () {
      $('.submit-failure, .msg-bg').fadeOut(300);
    },2000)
  }

  function submitSuccess () {
    $('.submit-success').show(300);
    setTimeout(function () {
      $('.submit-success, .msg-bg').fadeOut(300);
    },2000)
  }
  function submitFailure (data) {
    var dataList = data.allocResultList;
    var list = '';
    dataList.forEach(function (item, i) {
      var li = '';
      li += '<ul class="clear"> <li>'+ item.contractSn +'</li> <li>'+ item.failedReason +'</li></ul>';
      list += li;
    });
    $('.error-list-con').html(list);
    $('.error').show(300);
  }
  $('.error-list-con').on('mouseover', 'li', function (event) {
    if ($(this).text().length > 10) {
      $(this).css({cursor: 'pointer'});
      $('.more-mes').show(300).css({
        left: event.clientX,
        top: event.clientY
      }).find('p').text($(this).text());
    } else {
      $('.more-mes').fadeOut(300);
    }
  }).on('mouseleave', 'li', function () {
    $('.more-mes').hide();
  });

  $('.cancel').click(function () {
    $('.error, .msg-bg').fadeOut(300);
  });
  $('.confirm').click(function (event) {
    event.stopPropagation();
    $('.alert-mes').hide();
    submit ();
  });
});
