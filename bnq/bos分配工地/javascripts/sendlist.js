/**
 * Created by Z10002053 on 2017/1/13.
 */
$(function () {
  var curPage = 1;
  var totalPage = 0;
  $('#getPage').val(1);
  getData(1);

  function getData (pageNum) {
    curPage = pageNum;
    $('#getPage').val(curPage);
    if (curPage == 1 ) {
      $('.prev').addClass('disabled')
    } else {
      $('.prev').removeClass('disabled')
    }
    $.ajax({
      url:'http://pr.devbos.b-and-qchina.com:8080/dms_bos/project/checker/list.do?pageSize=10&curPage=' + curPage ,
      dataType:'json',
      method:'get',
      success:function(data){
        if (data.response.code === 0) {
          if (data.response.data.length !== 0) {
            $('.zhd-list, .page').show();
            totalPage = data.response.data.page.totalPage;
            if (curPage == totalPage ) {
              $('.next').addClass('disabled')
            } else {
              $('.next').removeClass('disabled')
            }
            $('.select-page span:first-child').text('共'+ totalPage +'页');
            renderList(data.response.data.checkerList)
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
    var list = '<ul class="pd-list-title clear"> <li>姓名</li> <li>本周派单统计</li> <li>巡查统计</li> <li>巡查无效统计</li> <li>下周派单统计</li> <li>操作</li></ul>';
    data.forEach(function (item, id) {
      var li = '';
      li += '<ul class="pd-list-title pd-list-con clear"><li><p>'
        + item.name
        +'</p></li> <li><p>'
        + item.thisWeekTrackNum
        +'</p></li> <li><p>'
        +  item.thisWeekAllocNum
        +'</p></li> <li><p>'
        + item.thisWeekTrackNoNum
        +'</p></li> <li><p>'
        + item.nextWeekAllocNum
        +'</p></li> <li><p><a href="./sendorder.html?allocLogType=1&name=' + item.name + '&checkerBosid='+ item.checkerBosid +'">本周派单／</a><a href="./sendorder.html?allocLogType=2&name=' + item.name + '&checkerBosid='+ item.checkerBosid +'">下周派单／</a></p></li> </ul>';
      list += li;
    });
    $('.pd-list').html(list);
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
});