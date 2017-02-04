/**
 * Created by Z10002053 on 2016/6/23.
 */
$(function () {
    var URL='';
    var mapID;
    var map = new BMap.Map("rMap");//创建地图实例
    var geoc = new BMap.Geocoder();
    var unselectIcon = new BMap.Icon("http://res.bnq.com.cn/img/dms/markers_02.png", new BMap.Size(23, 25), {offset: new BMap.Size(10, 25)});  // 未选中的icon
    var selectedIcon =new BMap.Icon("http://res.bnq.com.cn/img/dms/markers_04.png", new BMap.Size(23, 25), {offset: new BMap.Size(10, 25)});  // 选中的icon
    var myIcon = new BMap.Icon("http://res.bnq.com.cn/img/dms/dingwei_02.png", new BMap.Size(16,31));//定位的icon
    var prevID='',mapData,allOverlay;
    var pointerData = [];
    /*********************初始化数据*********************************/
    var initData=JSON.parse(initDataStr);
    var dsMpa = initData.response.data.mapResult;
    if(dsMpa.results.length>0){
        initMap();
        renderMap(dsMpa);
    }else{
        initMap();
        setMobileLocation(map,121.47621,31.239882,myIcon); //添加移动选址
        noResultsData()

    }
    var dsProject = initData.response.data.project;
    var projectId=dsProject.projectId; //获取项目id
    $('#old-Address').text(dsProject.address);//设置合同地址
    $('#inputSearch').val(dsProject.address);//设置搜索数据
    $('#old-lonId').text(dsProject.longitude);//设置合同经度
    $('#old-latId').text(dsProject.latitude);//设置合同纬度
    $('#setMeal').text(dsProject.setMeal?dsProject.setMeal:'无');//设置套餐
    $('#contractSn').text(dsProject.contractSn);//设置合同号
    var contractProvince = dsProject.province, //合同省
        contractCity = dsProject.city,//合同市
        contractDistrict = dsProject.area;//合同区

    //初始化百度地图
    function initMap(){
        var point = new BMap.Point(121.47621,31.239882);//初始设置地图中心点，
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
        map.centerAndZoom(point, 15);  //设置中心点
        /*    var marker = new BMap.Marker(point);// 创建标注
         map.addOverlay(marker); //插入标注*/

        //设置地图放大缩小控制按钮
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        });
        map.addControl(navigationControl);
        // 添加定位控件
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function(e){
            // 定位成功事件
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            //alert("当前定位地址为：" + address);
        });
    }

    /*********************初始化数据************************************************/

    var provinceName,cityName,districtName,addressJson,cityDataList;
    /******************************城市选择获取**************************************/
    //加载省份
    $.ajax({
        url:URL+'/dms/area/list.do?',
       // url:URL+'/images/address.json',
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
            $('.map-input div').html('<span></span><span></span><span></span>');
            $('.map-input div').find('span').eq(0).text(contractProvince+'/');
            $('.map-input div').find('span').eq(1).text(contractCity+'/');
            $('.map-input div').find('span').eq(2).text(contractDistrict+'/');

/*            selectProvince(contractProvince);
            selectCity(contractCity);
            selectDistrict(contractDistrict)*/
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

    //省份选择函数
    function selectProvince(name){
        if($mapInput.text() == '请选择省市'){
            $mapInput.html('<span></span><span></span><span></span>')
        }
        var provinceData = $('#provinceData li');
        provinceData.removeClass('active');
        provinceData.each(function () {
            if($(this).text()===name){
                $(this).addClass('active');
                $mapInput.find('span').eq(0).text( $(this).text()+'/');
            }
        });
        //点击省份后加载城市地址信息
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
    }
    //点击选择省份
    $('#provinceData').on('click','li',function () {
        provinceName = $(this).text();
        selectProvince(provinceName);//选择省份
        $('.city-select span:eq(1)').click();//跳到下一个地址选择
    });

    //城市选择函数
    function selectCity(name){
        var cityDate = $('#cityData li');
        cityDate.removeClass('active');
        cityDate.each(function () {
            if($(this).text()===name){
                $(this).addClass('active');
                $mapInput.find('span').eq(1).text( $(this).text()+'/');
            }
        });
        //点击城市后加载区地址信息
        for(var i = 0, j = cityDataList.length ; i<j ; i++ ){
            if(cityDataList[i].cityName === cityName){
                var districtList='<li class="all">不限</li>',districtItem='';
                cityDataList[i].districtList.forEach(function (item) {
                    districtItem = '<li>'+item.districtName+'</li>';
                    districtList += districtItem;
                });
                $('#districtData').html(districtList);
                break;
            }
        }
    }
    //点击选择城市
    $('#cityData').on('click','li',function () {
        cityName = $(this).text();
        selectCity(cityName);//选择城市
        $('.city-select span:eq(2)').click();//跳到下一个地址选择
    });

    //区域选择函数
    function selectDistrict(name){
        var districtData = $('#districtData li');
        districtData.removeClass('active');
        districtData.each(function () {
            if($(this).text()===name){
                $(this).addClass('active');
                $mapInput.find('span').eq(2).text( $(this).text()+'/');
            }
        });
    }

    //点击选择区域
    $('#districtData').on('click','li',function () {
        districtName = $(this).text();
        selectDistrict(districtName);
        $mapSelect.fadeOut(300);
    });

    //点击地址选择框时候停止向上冒泡
    $('.map-select').click(function (e) {
        e.stopPropagation();
    });

    //设置确定按钮可操作
    function setAbler(){
        $('.map-commit').addClass('active');
       // $('.map-commit').bind('click',postData);
        document.getElementsByClassName('map-commit')[0].onclick = postData;
        $('#fcAddress').removeClass('fc-address');
    }

    //设置确定按钮不可操作
    function setDisabler(){
        $('.map-commit').removeClass('active');
        $('.map-commit').click(function () {
        })
    }
    /**************************************百度地图搜索**************************************/

    $("#btnSearch").click(function () {
        mapID = 0;
        //判断弹出提示信息
        function createMessage(name){
            $('<div class="alert-bg"> <div class="alert-message"> <h3>温馨提示</h3> <p>请选择['+name+']</p> <span id="confirm">确定</span> </div> </div>').appendTo('body');
            $("#confirm").click(function () {
                $(this).parents(".alert-bg").fadeOut(300);
                var state = true,
                    n = 4;
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
        }else if($('#inputSearch').val()==''||$('#inputSearch').val()==null){
            noResultsData();
            setMobileLocation(map,121.47621,31.239882,myIcon); //添加移动选址
        }else{
            //截取省、市、区字符串
            function sliceAddress (i){
                var selectAddress = $('.map-input span');
                return selectAddress.eq(i).text().slice(0,-1);
            }
            //var txt = sliceAddress(0) + sliceAddress(1) + sliceAddress(2) + $('#inputSearch').val();
            //请求服务器数据
            mapSearch (sliceAddress(1),$('#inputSearch').val().trim(),sliceAddress(0),sliceAddress(2));
        }
    });

    $(document).keypress(function(e) {
        // 回车键事件
        if(e.which == 13) {
            $("#btnSearch").click();
        }
    });

    //渲染地图数据函数
    function renderMap (data){
        if(data.code===1){
            var dataList = '';
            var dataItem = '';
            pointerData = [];
            mapData = data.results;
            map.clearOverlays();//清空原来的标注
            if(mapData.length>0){
                data.results.forEach(function(item,i){
                    dataItem ='<li><h3>'
                        + item.name
                        + '</h3><p class="address">'
                        + item.address
                        + '</p><p class="longitude">经度：<span>'
                        + item.longitude
                        + '</span></p><p class="latitude">纬度：<span>'
                        + item.latitude
                        + '</span></p></li>';
                    dataList += dataItem;
                    //设置第一个点为地图的中心点
                    if(i==0){
                        setMobileLocation(map,item.longitude,item.latitude,myIcon); //添加移动选址
                        map.centerAndZoom(new BMap.Point(item.longitude,item.latitude), 12); // 初始化地图，设置中心点坐标和地图级别
                    }
                    showPointInMap(map,item.longitude,item.latitude,i+1,unselectIcon,item.address,i);
                });
                allOverlay = map.getOverlays();//获取所有点
                $('#r-result').html(dataList);

                $('#r-result li').click(function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    $("#lonId").html($(this).find('.longitude span').text());
                    $("#latId").html($(this).find('.latitude span').text());
                    $("#fcAddress").text($(this).find('.address').text());
                    setAbler ();
                    changeColor(map,$(this).index());
                });
            }else{
                noResultsData();
                setMobileLocation(map,121.47621,31.239882,myIcon); //添加移动选址
            }
        }else{
            alert(data.message);
        }
    }
    function noResultsData(){
        var noResults ='<li class="no-res"> <p class="no-res-t">很抱歉，未找到相关地址：</p> <p>1.请检查地址拼写是否正确</p> <p>2.可以点击地图获取坐标， 移动坐标进行微调。</p> </li>';
        $('#r-result').html(noResults);
    }
    function mapSearch (cityName,ser,province, district){
        var url = URL + '/dms/project/address/searchMap.do?city='+cityName+'&q='+ser+'&pageSize=10&curPage=1&province='+province+'&district='+district;
        //var url = URL+'./images/map.json';
        $.ajax({
            url:url,
            dataType:'json',
            method:'get',
            success:function(data){
                renderMap(data);
            },
            error:function(mes){
                alert(mes);
            }
        });
    }
    //设置移动选址图标
    function setMobileLocation(map, lon, lat,Icon){
        var point = new BMap.Point(lon, lat+0.03);
        map.centerAndZoom(point, 15);  //设置中心点
        var marker = new BMap.Marker(point,{icon:Icon});
        map.addOverlay(marker);
        marker.enableDragging();    //标注可拖拽
        var aa = '',
            bb = '',
            address='',
            sContent ='';
        marker.addEventListener("dragend", function (e) { //监听标注的dragend事件，获取拖拽后地理坐标
            moveSetvalue(e,this);
        });
        function moveSetvalue (e,_this){
            function setValue (){
                $("#lonId").html(aa);
                $("#latId").html(bb);
                $("#fcAddress").text(address);
                setAbler ();
            }
            geoc.getLocation(e.point, function(rs){
                var addComp = rs.addressComponents;
                address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                aa = e.point.lng;
                bb = e.point.lat;
                sContent= "<div><p style=' font-weight:bold'>"+address+"</p>" +
                    "<p style='width:300px'><span>经度："+aa+"</span> <span>纬度："+bb+"</span></p>"+
                    "<p id='set-value' style='padding:5px 15px; margin:5px; color:#FFF; background:#FF950C; border-radius:5px; width:65px; text-align:center;cursor:pointer;'>确定</p>"+
                    "</div>";
                var info = {enableMessage:false};//取消短信
                var infoWindow = new BMap.InfoWindow(sContent,info);  // 创建信息窗口对象
                _this.openInfoWindow(infoWindow);
                setTimeout(function(){
                    $('#set-value').bind('click',setValue)
                },300);
            });
            pointerData.forEach(function (item) {
                new item[0];
            });
        }
        marker.addEventListener("click", function (e) {
            moveSetvalue(e,this);
            pointerData.forEach(function (item) {
                new item[0];
            });
            $('#r-result li').removeClass('active');
        });
    }

    //在地图添加点
    function showPointInMap(map, lon, lat, id, Icon, mapId){

        var point = new BMap.Point(lon, lat);
        var marker = new BMap.Marker(point,{icon:Icon});
        map.addOverlay(marker);
        var markerRed = new BMap.Marker(point,{icon:selectedIcon});
        map.addOverlay(markerRed);
        markerRed.hide();

        var pHide = function(){
            markerRed.hide();
            marker.show();
        };

        var pShow = function () {
            markerRed.show();
            marker.hide();
        };
        var aa =[];
        aa.push(pHide);
        aa.push(pShow);
        pointerData.push(aa);

        //给每个点添加点击事件
        markerRed.addEventListener("click", function (e) {
            //点击修改地址、经纬度
            var p = marker.getPosition();
            $("#lonId").html(p.lng);
            $("#latId").html(p.lat);
            geoc.getLocation(p, function(rs){
                var addComp = rs.addressComponents;
                $("#fcAddress").text(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
            });
            setAbler ();
            clickMapItem (id-1);
            //点击修改图片颜色
            pointerData.forEach(function (item) {
              new item[0];
            });
            pShow();
        });

        marker.addEventListener("click", function (e) {
            //点击修改地址、经纬度
            var p = marker.getPosition();
            $("#lonId").html(p.lng);
            $("#latId").html(p.lat);
            geoc.getLocation(p, function(rs){
                var addComp = rs.addressComponents;
                $("#fcAddress").text(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
            });
            setAbler ();
            clickMapItem (id-1);
            //点击修改图片颜色
            pointerData.forEach(function (item) {
                new item[0];
            });
            pShow();
        });
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
        var longitude     = $('#lonId').text();
        var latitude      = $('#latId').text();
        var adjustAddress = $('#fcAddress').text();
        $.ajax({
            url:URL+'/dms/project/address/save.do?',
            dataType:'json',
            method:'post',
            data:{
                "projectId":projectId,
                'longitude':longitude,
                'latitude':latitude,
                'adjustAddress':adjustAddress
            },
            success:function(data){
                if(!$('.alert-success').get(0)){
                    $('<div class="alert-success"><div class="fc-success"><span class="fc-success-close"></span></div></div>').appendTo('body');

                    $('.alert-success').click(function () {
                        $(this).fadeOut(300);
                        goBack();
                    });
                    $('.alert-success').height($('body').height());
                }
            },
            error:function(mes){
                alert(mes)
            }
        })
    }

    function clickMapItem (id){
        $('#r-result li').removeClass('active');
        $('#r-result li').eq(id).addClass('active')
    }
    function changeColor (map,id){
        pointerData.forEach(function (item) {
            new item[0];
        });
        new pointerData[id][1];
    }
    
     $('.back').click(function () {
        goBack();
    });
    function goBack(){
        window.location.href="/dms_bos/project/address/list.vdo";
    }
});

