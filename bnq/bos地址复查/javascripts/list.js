/**
 * Created by Z10002053 on 2016/6/29.
 */
$(function(){
    /*************************合同list***************************************/
    var page,unFinishPageSize,finishPageSize,unf,f;

    var pageWill = 1;//初始化页码,当前页码(未复查)
    var pageDid = 1;//初始化页码，当前页码（已复查）
    var lastPage ;//最后一页（未复查）
    var lastPageDid; //最后一页（已复查）
    var pageLength = 8; //每页显示的条数
    var status = false; //false:unfinish ; true: finish
    var resultState = 1; //1:unfinish ; 2: finish; 3:all
    var keys = '';
    var firstFlag = true;

    var initData=JSON.parse(initDataStr);//第一次页面数据
    renderData(initData,false,1);//第一次数据渲染

    //tab切换
    $('.fc-title p').click(function () {
        $(this).addClass('active').siblings().removeClass('active');

        var keys = $('.search-input').val();
        if(keys !== null && keys !== "undefined" && keys !== ""){
            var num = $(this).find('span').text();
            var i = $(this).index();
            if(num === '0'){
                $('.fc-list').html('<div class="null-search"></div>');
                clearData(i);
                function clearData(i){
                    $('.fc-title span').eq(i).text('0');
                    $('.select-page span:first-child').text('共0页');
                    $('#getPage').val(0);
                }
            }else{
                $('.search-button').click();
            }

        }else{
            if($(this).attr('id')=='NotReview'){
                status = false;
                getPage(pageWill,status);
            }else{
                status = true;
                getPage(pageDid,status);
            }
        }
    });

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
        var contractSnParam ='';
		if (keys && '' != keys) {
         	  contractSnParam='&contractSn='+keys;
        }
        lastPage = state?finishPageSize:unFinishPageSize;
        page = pageId<=1?1
            :pageId>=lastPage?lastPage
            :pageId;
        if(state){
            pageDid = page;
        }else{
            pageWill = page;
        }
        console.log(lastPage);
        console.log(page);
        $.ajax({ 
            url:'http://192.168.251.81:8080/dms_bos/project/address/list.do?'+"shopId=1004&"+"curPage="+page+"&pageSize=1"+contractSnParam+"&adjustState="+(state?1:0),
            dataType:'json',
            method:'get',
            success:function(data){
                renderData(data,state,page);
            },
            error:function(mes){
                console.log(mes)
            }
        });
    }

    //数据渲染函数
    function renderData(Data,state,page, resultState){
        if(Data.response.code === 0){
            //初次设置页码总数
            if(firstFlag){
                unFinishPageSize= Data.response.data.unfinish.totalNum;
                unf = unFinishPageSize;
                finishPageSize= Data.response.data.finish.totalNum;
                f = finishPageSize;
                firstFlag = false;
            }
            if(keys == '' ){
                unFinishPageSize =unf;
                finishPageSize = f;

            }
            state?finishPageSize= Data.response.data.finish.totalNum:unFinishPageSize= Data.response.data.unfinish.totalNum;
            if(1==resultState){

            }
            $('.fc-title p:nth-child(1) span').text(unFinishPageSize);//设置未完成数据总条数
            $('.fc-title p:nth-child(2) span').text(finishPageSize);//设置已完成数据总条数
            var ds =state? Data.response.data.finish.list:Data.response.data.unfinish.list;//根据状态取数据源
             console.log(ds);
            lastPage = state?finishPageSize:unFinishPageSize;
            $('.select-page span:first-child').text('共'+lastPage+'页');//设置页码总数
            if(ds.length>0){

                $('#getPage').val(page);
                var fcDomList = '<ul class="fc-list-title clear"><li>订单类型／合同号</li> <li>合同地址</li> <li>复查地址</li> <li>坐标</li> <li>操作</li></ul>';
                for(var i = 0; i < ds.length ; i++){
                    var fcDomItem = '';
                    var detailedAddress = '';
                    detailedAddress = ds[i].province + ds[i].city + ds[i].address;//拼接详细地址
                    fcDomItem ='<ul class="fc-list-title fc-list-con clear"><li><p>'
                        + ds[i].setMealStr
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
                        + '</p></li> <li><a href="/dms_bos/project/address/detail.vdo?projectId='
                        + ds[i].projectId
                        + '&userId=1">'
                        + (status?'修改地址':'地址复查')
                        + '</a></li></ul>';

                    fcDomList += fcDomItem;
                }
                $('.fc-list').html(fcDomList);
            }else{
                $('.fc-list').html('<div class="null-data"></div>');
                $('#getPage').val(0);
            }
        }else{
            alert(Data.response.message);
        }
    }
    /******************************************搜索******************************/
    $('.search-button').click(function () {
        keys = $('.search-input').val();
        pageWill = 1;
        pageDid = 1;
        if(keys !== ''){
            $.ajax({
               // url:'/dms_bos/project/address/list.do?contractSn='+keys,
                 url:'http://192.168.251.81:8080/dms_bos/project/address/list.do?shopId=1004&contractSn='+keys,
                dataType:'json',
                method:'get',
                success:function(data){
                    var ds = data.response.data;
                    var fcDomList = '<ul class="fc-list-title clear"><li>订单类型／合同号</li> <li>合同地址</li> <li>复查地址</li> <li>坐标</li> <li>操作</li></ul>';
                    function addHtml(searchData){
                        var fcDomItem,detailedAddress;
                        detailedAddress = searchData.province + searchData.city + searchData.address;//拼接详细地址
                        fcDomItem ='<ul class="fc-list-title fc-list-con clear"><li><p>'
                            + searchData.setMealStr
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
                            + '</p></li> <li><a href="/dms_bos/project/address/detail.vdo?projectId='
                            + searchData.projectId
                            + '&userId=1">'
                            + (status?'修改地址':'地址复查')
                            + '</a></li></ul>';
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
                        lastPage = 1;
                        unFinishPageSize = 1;
                        finishPageSize = 0;

                    }else if(ds.finish.list.length!==0){
                        clearData(1);
                        $('#Reviewed').addClass('active').siblings().removeClass('active');
                        $('#Reviewed').find('span').text('1');
                        addHtml(ds.finish.list[0]);
                        lastPage = 1;
                        unFinishPageSize = 0;
                        finishPageSize = 1;

                    }else{
                        $('.fc-list').html('<div class="null-search"></div>');
                        clearData(0);

                    }
                },
                error:function(mes){
                    console.log(mes)
                }
            })
        }else{
        	 $('#NotReview').addClass('active').siblings().removeClass('active');
            status = false;
            getPage(pageWill,status);
        }
    });
});
