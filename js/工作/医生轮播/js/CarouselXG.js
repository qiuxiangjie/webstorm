/*Created by Zhoujianxiang on 2016/4/21.*/
;(function($){
    var CarouselXG = function(poster){
        var _this_ = this;
        this.poster= poster;
        this.prevBtn = poster.find(".prev-btn");
        this.nextBtn = poster.find(".next-btn");
        this.posterItemMain = poster.find("ul");
        this.posterItems0 = this.posterItemMain.find("li");
        this.posterItems  = this.posterItemMain.append(this.posterItems0.clone()).find("li");//克隆节点
        this.posterItemfirst = this.posterItems.first();
        this.posterItemlast  = this.posterItems.last();


        //默认配置参数
        this.setting ={
            "width":1020,
            "height":450,
            "posterWidth":1020,
            "posterHeight":450,
            "speed":500,
            "autoPlay":true,
            "delay":3000
        };
        this.settingPoster();
        if(this.setting.autoPlay){
            this.autoPlay();
            this.poster.hover(function () {
                clearInterval(_this_.play);
            },function () {
                _this_.autoPlay();
            })
        }
        this.rotateFlag =true;
        this.prevBtn.click(function () {
            //上一帧点击
            if(_this_.rotateFlag){
                _this_.carouseRotate('left');
            }
            _this_.rotateFlag =false;
        });
        this.nextBtn.click(function(){
            //下一帧点击
            if(_this_.rotateFlag){
                _this_.carouseRotate('right');
            }
            _this_.rotateFlag =false;
        });
        $.extend(this.setting,this.getSetting());//拓展用户设置；
        //console.log(this.setting);
    };
    CarouselXG.prototype = {
        autoPlay: function () {
            //循环播放
            var _this_ = this;
            _this_.play = setInterval(function () {_this_.prevBtn.click();},_this_.setting.delay);
            //self.play = setInterval("self.prevBtn.click()",1000);这样写居然不行！
        },
        settingPoster: function () {
            //初始化位置
            this.poster.css({
                width:this.setting.posterWidth,
                height:this.setting.posterHeight
            });
            this.posterItemMain.css({
                width:this.setting.width,
                height:this.setting.height,
                overflow:'hidden'
                });
            this.posterItems = this.posterItemMain.find("li");
            var rw = this.posterItemfirst.width();
            this.posterItems.each(function (i) {
                $(this).css({
                    top:0,
                    left:i*rw-rw,
                    zIndex:-(i+1)
                })
            });
        },
        carouseRotate:function (dir) {
            var _this_ = this;
            if(dir=="left"){
                //做按钮
                this.posterItems.each(function () {
                    if($(this).css("zIndex")>0){
                        _this_.posterItems.each(function () {
                            $(this).css("zIndex",-$(this).css("zIndex"));
                        });
                    }
                    var prev = $(this).next().get(0)? $(this).next():_this_.posterItemfirst;
                        $(this).stop().animate({
                            left:prev.css("left"),
                            zIndex:prev.css("zIndex")
                        },_this_.setting.speed, function () {
                            _this_.rotateFlag =true;
                        })
                });
            }else if(dir=="right"){
                //右按钮
                this.posterItems.each(function () {
                    if($(this).css("zIndex")<0){
                        _this_.posterItems.each(function () {
                            $(this).css("zIndex",-$(this).css("zIndex"));
                        });
                    }
                    var next = $(this).prev().get(0)? $(this).prev():_this_.posterItemlast;
                    $(this).stop().animate({
                        left:next.css("left"),
                        zIndex:next.css("zIndex")
                    },_this_.setting.speed, function () {
                        _this_.rotateFlag =true;
                    })
                });
            }
        },
        //获取用户设置
        getSetting:function () {
            var setting = this.poster.attr("data-setting");
            if(setting&&setting!=''){
                return $.parseJSON(setting);
            }else{
                return {};
            }
        }
    };
    //初始化函数
    CarouselXG.init = function (poster) {
        var _this = this;//this==CarouseXG;
        poster.each(function(){
            return new _this($(this));
        })
    };
    window.CarouselXG = CarouselXG;//对象全局注册
})(jQuery);

