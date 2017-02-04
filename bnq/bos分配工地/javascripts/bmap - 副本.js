/**
 * Created by Z10002053 on 2016/6/23.
 */
$(function () {
    /*********************初始化数据*********************************/
    var initData=JSON.parse(initDataStr);
    var dsMpa = initData.response.data.mapResult.results[0];
    var dsProject = initData.response.data.project;
    $('#old-Address').text(dsProject.adjustAddress);
    $('#old-lonId').text(dsProject.longitude);
    $('#old-latId').text(dsProject.latitude);

    var map = new BMap.Map("rMap");//创建地图实例
    var point = new BMap.Point(dsMpa.longitude, dsMpa.latitude);//初始设置地图中心点，
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    //  map.setCurrentCity("上海");
    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    map.centerAndZoom(point, 15);
    var geoc = new BMap.Geocoder();
    var marker = new BMap.Marker(point);        // 创建标注
    map.addOverlay(marker);

    geoc.getLocation(point, function(rs){
        var addComp = rs.addressComponents;
        $("#old-Address").text(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);//设置合同地址
    });
    $('#setMeal').text(dsProject.setMeal?dsProject.setMeal:'无');//设置套餐
    $('#contractSn').text(dsProject.contractSn);//设置合同号

    var mapAddress = '<li class="active"><h3>'
        +dsMpa.name
        +'</h3><p class="address">'
        +dsMpa.address
        +'</p><p class="longitude">经度：'
        +dsMpa.longitude
        +'</p><p class="latitude">纬度:'
        +dsMpa.latitude
        +'</p></li>';

    $('#r-result').html(mapAddress);
    /*********************初始化数据************************************************/






    var provinceName,cityName,districtName,addressJson,cityDataList;
    /**********************城市选择获取**************************/
    $.ajax({
        //url:'http://192.168.251.105:8080/dms/area/list.do?',
        url:'./images/address.json',
        dataType:'json',
        method:'get',
        success:function(data){
            addressJson = data.response.data;
            var provinceList='',provinceItem='';
            addressJson.forEach(function (item) {
                provinceItem ='<li>'+item.provinceName+'</li>';
                provinceList += provinceItem;
            });
            $('#provinceData').html(provinceList);
            provinceEvent();
        },
        error:function(esm){
            console.log(esm)
        }
    });

    //弹出/隐藏 城市选择
    var $mapSelect = $('.map-select');
    $('body').click(function () {
        $mapSelect.fadeOut(300);
    });
    $('.map-input>div').click(function (e) {
        if( $mapSelect.css('display')=='none'){
            $mapSelect.fadeIn(300);
        }else{
            $mapSelect.fadeOut(300);
        }
        e.stopPropagation();
    });
    //省市选择切换
    $('.city-select span').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('ul.city-list').eq($(this).index()).show().siblings('ul.city-list').hide();
    });
    var $mapInput = $('.map-input div');
    function provinceEvent (){
        //省份选择
        $('#provinceData li').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            if($mapInput.text() == '请选择省市'){
                $mapInput.html('<span></span><span></span><span></span>')
            }
            $mapInput.find('span').eq(0).text( $(this).text()+'/');
            $('.city-select span:eq(1)').click();//跳到下一个地址选择
            //加载下一个地址信息
            provinceName = $(this).text();
            for(var i=0, j = addressJson.length ; i < j ; i++){
                if(addressJson[i].provinceName === provinceName){
                    var cityList='', cityItem='';
                    cityDataList = addressJson[i].cityList;
                    addressJson[i].cityList.forEach(function(item){
                        cityItem = '<li>'+item.cityName+'</li>';
                        cityList += cityItem;
                    });
                    $('#cityData').html(cityList);
                    break;
                }
            }

        });
        //城市选择
        $('#cityData').on('click','li',function () {
            $(this).addClass('active').siblings().removeClass('active');
            $mapInput.find('span').eq(1).text( $(this).text()+'/');
            $('.city-select span:eq(2)').click();//跳到下一个地址选择
            //加载下一个地址信息
            cityName = $(this).text();
            for(var i = 0, j = cityDataList.length ; i<j ; i++ ){
                if(cityDataList[i].cityName === cityName){
                    var districtList='',districtItem='';
                    cityDataList[i].districtList.forEach(function (item) {
                        districtItem = '<li>'+item.districtName+'</li>';
                        districtList += districtItem;
                    });
                    $('#districtData').html(districtList);
                    break;
                }
            }
        });

        //区域选择
        $('#districtData').on('click','li',function () {
            $(this).addClass('active').siblings().removeClass('active');
            $mapInput.find('span').eq(2).text( $(this).text()+'/');
            $mapSelect.fadeOut(300);
        });
    }
    $('.map-select').click(function (e) {
        e.stopPropagation();
    });
    var $fcAddress = $('#fcAddress');
    if($fcAddress.text() !== '请在下方地址中点选，或手动移动坐标'){
        setAbler ()
    }
    function setAbler(){
        $('.map-commit').addClass('active');
        $('.map-commit').click(function () {
            postData()
        })
    }
    function setDisabler(){
        $('.map-commit').removeClass('active');
        $('.map-commit').click(function () {
        })
    }
    $fcAddress.blur(function () {
        if($(this).val()==''){
            $(this).val('请在下方地址中点选，或手动移动坐标');
        }
    });

    $fcAddress.focus(function () {
        if($(this).val()=='请在下方地址中点选，或手动移动坐标'){
            $(this).val('');
        }
    });

    $fcAddress.keyup(function(){
        if($(this).val()!==''){
            setAbler()
        }else{
            setDisabler()
        }
    });
    /**************************************百度地图**************************************/

/*    var map = new BMap.Map("rMap");//创建地图实例
    var point = new BMap.Point(121.38937, 31.24925);//初始设置地图中心点，
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("上海");
    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    map.centerAndZoom(point, 15);
    var geoc = new BMap.Geocoder();
    var marker = new BMap.Marker(point);        // 创建标注
    map.addOverlay(marker);*/
    // creatMarker();
    $("#btnSearch").click(function () {

        //判断弹出提示信息
        function createMessage(name){
            $('<div class="alert-bg"> <div class="alert-message"> <h3>温馨提示</h3> <p>请选择['+name+']</p> <span id="confirm">确定</span> </div> </div>').appendTo('body');
            $("#confirm").click(function () {
                $(this).parents(".alert-bg").fadeOut(300);
                var state = true,
                    n     = 4;
                setTimeout(warnColor,500);
                function warnColor (){
                    state?$mapInput.addClass('warning'):$mapInput.removeClass('warning');
                    state = !state;
                    n--;
                    if(n>0){
                        setTimeout(function () {
                            warnColor ()
                        },150)
                    }
                }
            });
            setTimeout(function () {
                $("#confirm").click();
            },1000);
        }
        if($mapInput.text() == '请选择省市'){
            if(!$('.alert-bg').get(0)){
                createMessage("省")
            }else{
                $('.alert-message').find('p').text('请选择[省]');
                $('.alert-bg').fadeIn(300);
                setTimeout(function () {
                    $("#confirm").click();
                },1000);
            }
        }else if($mapInput.find('span').eq(1).text()==''){
            if(!$('.alert-bg').get(0)){
                createMessage('市')
            }else{
                $('.alert-message').find('p').text('请选择[市]');
                $('.alert-bg').fadeIn(300);
                setTimeout(function () {
                    $("#confirm").click();
                },1000);
            }
        }else{
            //截取省、市、区字符串
            function sliceAddress (i){
                var selectAddress = $('.map-input span');
                return selectAddress.eq(i).text().slice(0,-1);
            }
            var txt = sliceAddress(0) + sliceAddress(1) + sliceAddress(2) + $('#inputSearch').val();
            /*
            $("#fcAddress").text(txt);
            var lng, lat;
            var localSearch = new BMap.LocalSearch(map);
            map.clearOverlays();//清空原来的标注
            localSearch.setSearchCompleteCallback(function (searchResult) {
                var poi = searchResult.getPoi(0);
                lng = poi.point.lng;
                lat = poi.point.lat;
                $("#lonId").html(lng);
                $("#latId").html(lat);
                map.centerAndZoom(poi.point, 15);
                point = new BMap.Point(poi.point.lng, poi.point.lat);
                //creatMarker();
            });
            console.log(txt);
            localSearch.search(txt);*/
            //请求服务器数据
            mapSearch (sliceAddress(1),$('#inputSearch').val());
        }
    });

    $(document).keypress(function(e) {
        // 回车键事件
        if(e.which == 13) {
            $("#btnSearch").click();
        }
    });
    //创建地图遮盖物
    function creatMarker() {
        var marker = new BMap.Marker(point);        // 创建标注
        map.addOverlay(marker);                     // 将标注添加到地图中
        marker.enableDragging();                    //标注可拖拽
        marker.addEventListener("click", function (e) {
            searchInfoWindow.open(marker);
        });
        marker.addEventListener("dragend", function (e) { //监听标注的dragend事件，获取拖拽后地理坐标
            $("#lonId").html(e.point.lng);
            $("#latId").html(e.point.lat);
            geoc.getLocation(e.point, function(rs){
                var addComp = rs.addressComponents;
                $("#fcAddress").text(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
            })
        });
        // var label = new BMap.Label("拖动图标~", {offset: new BMap.Size(20, -10)});
        // marker.setLabel(label);
        map.addOverlay(marker); //在地图中添加marker
        // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    }

    var unselectIcon = new BMap.Icon("./images/markers_02.png", new BMap.Size(23, 25), {offset: new BMap.Size(10, 25)});  // 未选中的icon
    var selectedIcon =new BMap.Icon("./images/markers_04.png", new BMap.Size(23, 25), {offset: new BMap.Size(10, 25)});  // 选中的icon
    var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
    var prevID='',mapData,allOverlay,projectId;
    //mapSearch ();
    function mapSearch (cityName,ser){
        var url = 'http://192.168.251.183:8080/dms/project/address/searchMap.do?city='+cityName+'&q='+ser+'&pageSize=6&curPage=1';
        //var url = './images/map.json';
        $.ajax({
            url:url,
            dataType:'json',
            method:'get',
            success:function(data){
                var dataList = '';
                var dataItem = '';
                mapData = data.results;
                map.clearOverlays();//清空原来的标注
                if(mapData.length>0){
                    projectId = mapData.projectid;
                    data.results.forEach(function(item,i){
                        dataItem ='<li><h3>'
                            + item.name
                            + '</h3><p class="address">'
                            + item.address
                            + '</p><p class="longitude">经度：'
                            + item.longitude
                            + '</p><p class="latitude">纬度：'
                            + item.latitude
                            + '</p></li>';
                        dataList += dataItem;

                        //设置第一个点为地图的中心点
                        if(i==0){
                            map.centerAndZoom(new BMap.Point(item.longitude,item.latitude), 12); // 初始化地图，设置中心点坐标和地图级别
                            setMobileLocation(map,item.longitude,item.latitude,myIcon); //添加移动选址
                        }
                        showPointInMap(map,item.longitude,item.latitude,i,unselectIcon,item.address);
                    });
                    allOverlay = map.getOverlays();

                    $('#r-result').html(dataList);

                    $('#r-result li:first-child').addClass('active');

                    $('#r-result li').click(function () {
                        $(this).addClass('active').siblings().removeClass('active');
                        $("#lonId").html($(this).find('.longitude').text());
                        $("#latId").html($(this).find('.latitude').text());
                        $("#fcAddress").text($(this).find('.address').text());
                        setAbler ();
                        console.log('被点击的id'+$(this).index());
                        changeColor(map,$(this).index());
                    });
                }else{
                    var noResults ='<li class="no-res"> <p class="no-res-t">很抱歉，未找到相关地址：</p> <p>1.请检查地址拼写是否正确</p> <p>2.可以点击地图获取坐标， 移动坐标进行微调。</p> </li>';
                    $('#r-result').html(noResults);
                }
            },
            error:function(mes){
                console.log(mes)
            }
        });
    }
    var opts = {
        width : 250,     // 信息窗口宽度
        height: 80,     // 信息窗口高度
        title : "信息窗口" , // 信息窗口标题
     //   enableMessage:true//设置允许信息窗发送短息
    };

    function setMobileLocation(map, lon, lat,Icon){
        var point = new BMap.Point(lon, lat);
        var marker = new BMap.Marker(point,{icon:Icon});
        map.addOverlay(marker);
        marker.enableDragging();    //标注可拖拽
        marker.addEventListener("dragend", function (e) { //监听标注的dragend事件，获取拖拽后地理坐标
            $("#lonId").html(e.point.lng);
            $("#latId").html(e.point.lat);
            geoc.getLocation(e.point, function(rs){
                var addComp = rs.addressComponents;
                $("#fcAddress").text(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
            });
            setAbler ();
        });
    }

    //在地图添加点
    function showPointInMap(map, lon, lat, id,Icon,ads){

        var point = new BMap.Point(lon, lat);
        var marker = new BMap.Marker(point,{icon:Icon});
        map.addOverlay(marker);
/*
        var label = new BMap.Label(""+id,{offset:new BMap.Size(20,-10)});
        marker.setLabel(label);
*/
        //给每个点添加点击事件
        marker.addEventListener("click", function (e) {
            //点击修改地址、经纬度
            $("#lonId").html(e.point.lng);
            $("#latId").html(e.point.lat);
            geoc.getLocation(e.point, function(rs){
                var addComp = rs.addressComponents;
                $("#fcAddress").text(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
            });
            setAbler ();
            clickMapItem (id);
            console.log(id);

        /*    var p = e.target;
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            var infoWindow = new BMap.InfoWindow(ads,opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow,point); //开启信息窗口*/

            //点击修改图片颜色
            changeColor(map,id);
/*            map.removeOverlay(allOverlay[id+1]);
            console.log(id+'==='+allOverlay.length);
            showPointInMap(map,mapData[id].longitude,mapData[id].latitude,id,selectedIcon);
            if(prevID !== ''){
                map.removeOverlay(allOverlay[prevID+1]);
                showPointInMap(map,mapData[prevID].longitude,mapData[prevID].latitude,prevID,unselectIcon);
            }
            prevID = id;*/

           /*     var allOverlay = map.getOverlays();
                var marker=new BMap.Marker(e.point,{icon:myIcon});
                map.removeOverlay(allOverlay[id+1]);
                map.addOverlay(marker);
                preMarker=marker;
                */
           // map.removeOverlay(allOverlay[id-1]);
        });

       /* marker.addEventListener("dragend", function (e) { //监听标注的dragend事件，获取拖拽后地理坐标
            $("#lonId").html(e.point.lng);
            $("#latId").html(e.point.lat);
            geoc.getLocation(e.point, function(rs){
                var addComp = rs.addressComponents;
                $("#fcAddress").text(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
            })
        });*/
    }

    /********************************地址提交*******************************************/
    /*
    * /project/address/save.do
      * projectId ：工地ID
        * longitude ：经度
         * latitude：纬度
          * adjustAddress：调整后的地址
    * */
    function postData(){
      //  var projectId     = 12;
        var longitude     = $('#lonId').text();
        var latitude      = $('#latId').text();
        var adjustAddress = $('#fcAddress').val();
        $.ajax({
            url:'http://192.168.251.183:8080/dms/project/address/save.do?',
            dataType:'json',
            method:'post',
           // data:'projectId=12&longitude=31.202259&latitude=121.696303&adjustAddress=上海浦东新区新德路735号',
            data:{
                "projectId":projectId,
                'longitude':longitude,
                'latitude':latitude,
                'adjustAddress':adjustAddress
            },
            success:function(data){
                if(!$('.alert-success').get(0)){
                    $('<div class="alert-success"><div class="fc-success"><span class="fc-success-close"></span></div></div>').appendTo('body');
                }
                $('.alert-success').click(function () {
                    $(this).fadeOut(300);
                })
            },
            error:function(mes){
                console.log(mes)
            }
        })
    }

    function clickMapItem (id){
        $('#r-result li').removeClass('active');
        $('#r-result li').eq(id).addClass('active')
    }
    function changeColor (map,id){
        map.removeOverlay(allOverlay[id+1]);
        console.log(id+'==='+allOverlay.length);
        showPointInMap(map,mapData[id].longitude,mapData[id].latitude,id,selectedIcon);
        if(prevID !== ''){
            map.removeOverlay(allOverlay[prevID+1]);
            showPointInMap(map,mapData[prevID].longitude,mapData[prevID].latitude,prevID,unselectIcon);
        }
        prevID = id;
    }
});