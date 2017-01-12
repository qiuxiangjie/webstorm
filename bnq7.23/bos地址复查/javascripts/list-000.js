/**
 * Created by Z10002053 on 2016/6/29.
 */
$(function(){
    /*************************合同list***************************************/
    var page;
    var pageWill = 1;//初始化页码,当前页码(未复查)
    var pageDid = 1;//初始化页码，当前页码（已复查）；
    var lastPage ;//最后一页（未复查）
    var lastPageDid; //最后一页（已复查）
    var pageLength = 8; //每页显示的条数
    var status = false; //未完成（完成）显示状态
    getPage(pageWill,status);
    //tab切换
    $('.fc-title p').click(function () {
        $(this).addClass('active').siblings().removeClass('active');

        var keys = $('.search-input').val();
        if(keys !== null && keys !== "undefined" && keys !== ""){
            var num = $(this).find('p').text();
            var i = $(this).index()+1;
            if(num == 0){
                $('.fc-list').html('<div class="null-search"></div>');
                clearData(0);
                function clearData(i){
                    $('.fc-title span').text('0');
                    $('.select-page span:first-child').text('共'+i+'页');
                    $('#getPage').val(i);
                }
            }else{
                $('.search-button').click();
            }

        }else{
            if($(this).attr('id')=='NotReview'){
                status = false;
                getPage(pageWill,status)
            }else{
                status = true;
                getPage(pageDid,status);
            }
        }

    });

    /*******************************数据list获取*************************************/
    //var getHttp = "http://192.168.251.187:8080/dms/project/address/list.do?adjustState=0&shopId=41";
    /*    {
     "area": "嘉定区",                       区
     "customMobile": "0",
     "address": "云屏路1399弄1号203室",      详细地址
     "city": "嘉定",                        市
     "adjustAddress": null,                 复查地址
     "latitude": null,                      纬度
     "customName": "曹圣",
     "projectAdminId": 462,
     "province": "上海",                    省
     "contractSn": "00000001",              合同编号
     "contractId": 38,                      合同ID
     "shopId": 41,                          店铺ID
     "projectId": 11,
     "longitude": null,                     经度
     "adjustState": 0                       0：待核查  1:已核查
     }*/

    //翻页控制函数
    function controlPage(n){
        if(status){
            n=='next'?getPage(++pageDid,status)
                :n=="prev"?getPage(--pageDid,status)
                :getPage(n,status)
        }else{
            n=='next'?getPage(++pageWill,status)
                :n=="prev"?getPage(--pageWill,status)
                :getPage(n,status)
        }
    }
    //上一页按钮
    $('.prev').click(function () {
        controlPage("prev")
    });
    //下一页按钮
    $('.next').click(function () {
        controlPage("next")
    });
    //页码跳转按钮
    $('.select-page-btn').click(function () {
        var page = $('#getPage').val();
        getPage(page,status);
    });
    //跳转页码函数
    function getPage(pageId,state){
        $.ajax({
             url:'./images/package.json',
           // url:'http://192.168.251.105:8080/dms/project/address/list.do?',
            dataType:'json',
            method:'get',
            success:function(data){
                if(data.response.code == 0){
                    var ds =state? data.response.data.finish.list:data.response.data.unfinish.list;
                    if(ds.length>0){
                        $('.fc-title p.active span').text(ds.length);//设置数据条数
                        $('.fc-title p:nth-child(2) span').text(data.response.data.finish.list.length);
                        lastPage = Math.ceil(ds.length/pageLength);
                        $('.select-page span:first-child').text('共'+lastPage+'页');//设置页码总数

                        page = pageId<=1?1
                            :pageId>=lastPage?lastPage
                            :pageId;
                        if(state){
                            pageDid = page;
                        }else{
                            pageWill = page;
                        }
                        $('#getPage').val(page);
                        var lastItem = page*pageLength <= ds.length? page*pageLength:ds.length;//长度不能大于数据长度
                        var fcDomList = '<ul class="fc-list-title clear"><li>订单类型／合同号</li> <li>合同地址</li> <li>复查地址</li> <li>坐标</li> <li>操作</li></ul>';
                        for(var i = page*pageLength-pageLength; i < lastItem ; i++){
                            var fcDomItem = '';
                            var detailedAddress = '';
                            detailedAddress = ds[i].province + ds[i].city + ds[i].address;//拼接详细地址
                            fcDomItem ='<ul class="fc-list-title fc-list-con clear"><li><p>'
                            + ds[i].list.setMeal?ds[i].list.setMeal:''
                            + '</p><p>'
                            + ds[i].contractSn
                            + '</p> </li> <li> <p>'
                            + detailedAddress
                            + '</p> </li> <li><p>'
                            + (ds[i].adjustAddress?ds[i].adjustAddress:'无')
                            + '</p></li> <li><p>经度：'
                            + (ds[i].longitude?ds[i].longitude:'无')
                            + '</p><p>纬度：'
                            + (ds[i].latitude?ds[i].latitude:'无')
                            + '</p></li> <li><a href="http://192.168.251.105:8080/dms/project/address/detail.do?projectId='
                            + ds[i].projectId
                            + '&userId=1">'+
                            + status?'复查地址':'修改地址'
                            +'</a></li></ul>';

                            fcDomList += fcDomItem;
                        }
                        $('.fc-list').html(fcDomList);
                    }else{
                        $('.fc-list').html('<div class="null-data"></div>');
                    }
                }
            },
            error:function(mes){
                console.log(mes)
            }
        });
    }
    /******************************************搜索******************************/
    $('.search-button').click(function () {
        var keys = $('.search-input').val();
        $.ajax({
            url:'http://192.168.251.105:8080/dms/project/address/list.do?contractSn='+keys,
            dataType:'json',
            method:'get',
            success:function(data){
                var ds = data.response.data;
                var fcDomList = '<ul class="fc-list-title clear"><li>订单类型／合同号</li> <li>合同地址</li> <li>复查地址</li> <li>坐标</li> <li>操作</li></ul>';
                function addHtml(searchData){
                    var fcDomItem,detailedAddress;
                    detailedAddress = searchData.province + searchData.city + searchData.address;//拼接详细地址
                    fcDomItem ='<ul class="fc-list-title fc-list-con clear"><li><p>'
                    + ds[i].list.setMeal?ds[i].list.setMeal:''
                    + '</p><p>'
                    + searchData.contractSn
                    + '</p> </li> <li> <p>'
                    + detailedAddress
                    + '</p> </li> <li><p>'
                    + (searchData.adjustAddress?searchData.adjustAddress:'无')
                    + '</p></li> <li><p>经度：'
                    + (searchData.longitude?searchData.longitude:'无')
                    + '</p><p>纬度：'
                    + (searchData.latitude?searchData.latitude:'无')
                    + '</p></li> <li><a href="http://192.168.251.211:8080/dms/project/address/detail.do?projectId='
                    + searchData.projectId
                    + '&userId=1">复查地址</a></li></ul>';
                    fcDomList += fcDomItem;
                    $('.fc-list').html(fcDomList);
                }
                function clearData(i){
                    $('.fc-title span').text('0');
                    $('.select-page span:first-child').text('共'+i+'页');
                    $('#getPage').val(i);
                }
                if(ds.unfinish.list.length!==0){
                    clearData(1);
                    $('#NotReview').addClass('active').siblings().removeClass('active');
                    $('#NotReview').find('span').text('1');
                    addHtml(ds.unfinish.list[0]);
                    $('.fc-list-con').find('a').text("地址复查");


                }else if(ds.finish.list.length!==0){
                    clearData(1);
                    $('#Reviewed').addClass('active').siblings().removeClass('active');
                    $('#Reviewed').find('span').text('1');
                    addHtml(ds.finish.list[0]);
                    $('.fc-list-con').find('a').text("修改地址");

                }else{
                    $('.fc-list').html('<div class="null-search"></div>');
                    clearData(0)
                }
                searchCallback(keys);
            },
            error:function(mes){
                console.log(mes)
            }
        })
    });
});
