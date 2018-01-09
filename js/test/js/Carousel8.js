/**
 * Created by Administrator on 2015/12/4.
 */
;(function ($) {
    var Carousel = function (poster) {
        var _this_ = this;
        this.poster = poster;
        this.prevBtn = poster.find($("div.post_prve"));
        this.nextBtn = poster.find($("div.post_next"));
        this.posterItemMain = poster.find($(".carousel ul"));
        this.posterItems = this.posterItemMain.find($("li"));
        this.posterFirstItem = this.posterItems.first();
        this.posterLastItem = this.posterItems.last();

        //默认参数配置
        this.setting={
            "width":900,
            "height":300,
            "posterWidth":640,
            "posterHeight":300,	//幻灯片第一帧的高度
            "scale":0.8,		//记录显示比例关系
            "speed":500,
            "autoPlay":false,
            "delay":2000,      //播放速度
            "verticalAlign":"middle" //top bottom
        };
        //修改配置参数
        $.extend(this.setting,this.getSetting());
        this.setPosterPos();
        this.setSettingValue();

        _this_.rotateFlag = true;
        this.nextBtn.click(function () {
            if(_this_.rotateFlag){
                _this_.rotateFlag = false;
                _this_.carouseRotate("right");
            }

        });
        this.prevBtn.click(function () {
            if(_this_.rotateFlag){
                _this_.rotateFlag = false;
                _this_.carouseRotate("left");
            }
        });
        if(this.setting.autoPlay){
            this.autoPlay();
            this.poster.hover(function () {
                window.clearInterval(_this_.pLay);
            },function(){
                _this_.autoPlay();
            });
        }
    };
    Carousel.prototype = {

        //自动播放
        autoPlay:function(){
            var self = this;
            self.pLay = setInterval(function () {self.prevBtn.click();},this.setting.delay);
        },

        //设置第一帧和左右按钮的位置关系
        setSettingValue: function () {
            this.poster.css({
                width:this.setting.width,
                height:this.setting.height
            });
            this.posterItemMain.css({
                width:this.setting.width,
                height:this.setting.height
            });
            var w = (this.setting.width-this.setting.posterWidth)/2;
            this.prevBtn.css({
                width:w,
                height:this.setting.height,
                zIndex:Math.ceil(this.posterItems.size()/2)
            });
            this.nextBtn.css({
                width:w,
                height:this.setting.height,
                zIndex:Math.ceil(this.posterItems.size()/2)
            });
            this.posterFirstItem.css({
                width:this.setting.posterWidth,
                height:this.setting.posterHeight,
                zIndex:Math.ceil(this.posterItems.size()/2),
                left:w,
                top:0
            });
        },

        //设置剩余帧的位置关系
        setPosterPos:function(){
            var self = this;
          var  sliceItems = this.posterItems.slice(1),
              sliceSize   = sliceItems.size()/2,
              rightSlice  = sliceItems.slice(0,sliceSize),//右边帧
              leftSlice   = sliceItems.slice(sliceSize),//左边帧
              level       = Math.floor(this.posterItems.size()/2);

            //设置右边帧的位置关系
          var rw = this.setting.posterWidth,
              rh = this.setting.posterHeight,
              gap= (this.setting.width-rw)/2/level;

          var firstLeft = (this.setting.width-rw)/2,
              fixOffsetLeft = firstLeft+rw;

            //设置右边的位置关系
            rightSlice.each(function (i) {
                level--;
                rw = rw*self.setting.scale;
                rh = rh*self.setting.scale;
                var j = i;
                $(this).css({
                    width:rw,
                    zIndex:level,
                    height:rh,
                    opacity:1/++i,
                    left:fixOffsetLeft+gap*++j-rw,
                    top:self.setVerticalAlign(rh)
                });
            });
            //设置左边的位置关系
            var lw = rightSlice.last().width(),
                lh = rightSlice.last().height(),
             oLoop = Math.floor(this.posterItems.size()/2);
            leftSlice.each(function (i) {
                $(this).css({
                    width:lw,
                    height:lh,
                    zIndex:i,
                    opacity:1/oLoop--,
                    left:i*gap,
                    top:self.setVerticalAlign(lh)
                });
                lw = lw/self.setting.scale;
                lh = lh/self.setting.scale;
            })
        },

        //左右按钮控制切换方法
        carouseRotate: function (dir) {
            var _this_ = this;
            if(dir=="left"){
                //alert("left");
                this.posterItems.each(function(){
                   var lefts = $(this),
                       prev  =lefts.prev().get(0)?lefts.prev():_this_.posterLastItem;

                    lefts.animate({
                        width:prev.width(),
                        height:prev.height(),
                        zIndex:prev.css("zIndex"),
                        opacity:prev.css("opacity"),
                        left:prev.css("left"),
                        top:prev.css("top")
                    },_this_.setting.speed,function(){
                        _this_.rotateFlag = true;
                    });
                    //console.log("A:"+prev.css("zIndex"));
                    //lefts.css("zIndex",prev.css("zIndex"));
                   // console.log("B:"+prev.css("zIndex"));
                });

            }else if(dir=="right"){
               // alert("right");
                this.posterItems.each(function(){
                    var rights = $(this),
                        next   = rights.next().get(0)?rights.next():_this_.posterFirstItem;
                    rights.stop().animate({
                        width:next.width(),
                        height:next.height(),
                        zIndex:next.css("zIndex"),
                        opacity:next.css("opacity"),
                        left:next.css("left"),
                        top:next.css("top")
                    },_this_.setting.speed,function(){
                        _this_.rotateFlag = true;
                    })
                });
            }
        },

        //设置垂直排列模式
        setVerticalAlign: function (height) {
            var verticalAlign = this.setting.verticalAlign,
                          top = 0;
            if(verticalAlign==="middle"){
                top=(this.setting.height-height)/2;
            }else if(verticalAlign==="top"){
                top=0;
            }else if(verticalAlign==="bottom"){
                top=this.setting.height-height;
            }else{
                top=(this.setting.height-height)/2;
            }
            return top;
        },

        //获取人工配置参数
        getSetting: function () {
            var setting = this.poster.attr("data-setting");
            if (setting&&setting!="") {
                return $.parseJSON(setting);
            } else {
                return {};
            }
        }
    };
    //初始化所有的对象
    Carousel.init=function(poster){
        var _this_ = this;
     //   console.log(this.class);
        poster.each(function(){
           new _this_($(this));
        });
    };
    window["Carousel"] = Carousel; //window.Carousel = Carousel;
})(jQuery);
