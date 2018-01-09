/**
 * Created by Zhoujianxiang on 2016/5/5.
 */
define(function(require, exports, module){
    require('common');

    function initPlayer(){
        $("#js-video-close").click(function(){
            $('#js-index-video').hide().find("[id^='js-ideo']").empty().attr("id","js-video");
        });
        return function(){
            $('#js-index-video').fadeIn();
            require.async('player',function(player){
                player.init(800, 500, 'http://video.mukewang.com/mk.mp4',"js-video");
            });
        }
    }

    $('#js-play-video').on('click', initPlayer());

    $("#js-header-login").click(function(){
        require.async("login_sns",function(mod){
            mod.init();
        });
    });
    $("#js-header-register").click(function(){
        require.async("login_sns",function(mod){
            mod.signup();
        });
    });
    //character test.use html5 to opt
    var animateBlock={
        isVisiable:function(el,wh,st,delta){
            delta=delta||160;
            //console.log($(el).offset().top,wh,st,delta)
            return $(el).offset().top<wh+st-delta;
        },
        animations:{
            band:function(wh,st){
                return;
                var $el=$("#band");
                if(animateBlock.isVisiable($el,wh,st)){
                    //background:time:0-500.o
                    //text:time:500-733.o.p:10px;
                    //menu:time:633-900.o.p:-10px;
                    $("#js-band-bg").animate({opacity:1},500);
                    $("#js-band-text").delay(500).animate({bottom:"9%",opacity:1},233);
                    $("#js-header").delay(633).animate({top:0,opacity:1},267);
                    delete animateBlock.animations.band;
                }
            },
            character:function(wh,st){
                var $el=$("#characters");
                if(animateBlock.isVisiable($el,wh,st)){
                    $el.find(".char-icon1").animate({top:50,opacity:1},333);
                    $el.find(".char-icon2").delay(200).animate({top:50,opacity:1},533);
                    $el.find(".char-icon3").delay(400).animate({top:50,opacity:1},733);

                    delete animateBlock.animations.character;
                }
            },
            intro1:function(wh,st){
                var $el=$("#intro1");
                if(animateBlock.isVisiable($el,wh,st)){
                    //console.log("trigger intro1 animate");
                    $el.find(".intro1-video").animate({
                        "bottom":0,
                        opacity:1
                    },500);
                    $el.find(".intro1-text").delay(167).animate({opacity:1},500);
                    $el.find(".intro1-star").delay(333).animate({opacity:1},333);
                    delete animateBlock.animations.intro1;
                }
            },
            intro2:function(wh,st){
                var $el=$("#intro2");
                if(animateBlock.isVisiable($el,wh,st)){
                    //console.log("trigger intro2 animate");
                    $el.find(".intro2-computer1").animate({
                        "top":-30,
                        opacity:1
                    },500);
                    $el.find(".intro2-computer2").delay(500).animate({
                        opacity:1
                    },167);
                    $el.find(".intro2-text").delay(167).animate({opacity:1},500);
                    delete animateBlock.animations.intro2;
                }
            },
            intro3:function(wh,st){
                var $el=$("#intro3");
                if(animateBlock.isVisiable($el,wh,st)){
                    //console.log("trigger intro3 animate");
                    $el.find(".intro3-calendar").animate({
                        "top":-31,
                        opacity:1
                    },333);
                    $el.find(".intro3-rockets").delay(233).animate({
                        "top":-46,
                        opacity:1
                    },267);
                    $el.find(".intro3-smoke").delay(333).animate({
                        "top":-31,
                        opacity:1
                    },334);
                    $el.find(".intro3-text").delay(167).animate({opacity:1},500);
                    delete animateBlock.animations.intro3;
                }
            },
            intro4:function(wh,st){
                var $el=$("#intro4");
                if(animateBlock.isVisiable($el,wh,st)){
                    //console.log("trigger intro4 animate");
                    $el.find(".intro4-hand").animate({
                        "top":-30,
                        opacity:1
                    },500);
                    $el.find(".intro4-icon").delay(333).animate({
                        opacity:1
                    },333);
                    $el.find(".intro4-text").delay(167).animate({opacity:1},500);
                    delete animateBlock.animations.intro4;
                }
            },
            startStudy: function(wh, st){
                var $el = $('.joinmooc');

                if(animateBlock.isVisiable($el,wh,st)){
                    $el.addClass('joinmooc-active');
                }
            }
        }
    }

    $(window).on("scroll",function(){
        var animations,
            name,
            winHeight=$(window).height(),
            scrollTop=$(window).scrollTop();

        animations=animateBlock.animations;
        for(name in animations){
            animations[name](winHeight,scrollTop);
        }
    });

    if($(window).height()>500){
        $(window).trigger("scroll");
    }
    //mooc dynamic

    if($("#dynamic-wrap .dynamic-group").length>1){
        $("#dynamic-wrap").on({
            mouseenter:function(){
                $("#dynamic-left,#dynamic-right").show();
            },
            mouseleave:function(){
                $("#dynamic-left,#dynamic-right").hide();
            }
        });
    }
    !function(){
        var index=0,
            timer,
            fn;
        fn=function(){
            var $g=$("#dynamic-wrap .dynamic-group");
            clearInterval(timer);
            $g.eq(index).fadeOut();
            index=(index+1)%$g.length;
            $g.eq(index).fadeIn()
        }
        $("#dynamic-left").click(function(){
            var $g=$("#dynamic-wrap .dynamic-group");
            clearInterval(timer);
            $g.eq(index).fadeOut();
            index=(index-1+$g.length)%$g.length;
            //console.log(index,$g.eq(index))
            $g.eq(index).fadeIn()

        });
        $("#dynamic-right").click(fn);

        if($("#dynamic-wrap .dynamic-group").length>1){
            timer=setInterval(fn,3000);
        }
    }();

    var itemOverTimer
    $("#js-family").on({
        mouseleave:function(){
            $("#js-family-mask").show().stop().animate({opacity:0.6},200);
            $("#js-family-text").show().stop().animate({opacity:1},200);
        },
        mouseenter:function(){
            $("#js-family-mask").stop().animate({opacity:0},200,function(){ $("#js-family-mask").hide(); });
            $("#js-family-text").stop().animate({opacity:0},200,function(){ $("#js-family-text").hide(); });
        }
    }).on("mouseenter",".js-family-item",function(){
        var _this=this;
        clearTimeout(itemOverTimer)
        itemOverTimer=setTimeout(function(){
            showItemInfo(_this);
        },800);
    }).on("mouseleave",".js-family-item",function(){
        clearTimeout(itemOverTimer)
        $(this).find(".js-family-info").fadeOut("fast");
    });

    function showItemInfo(el){
        $(el).find(".js-family-info").fadeIn("fast");
    }

    //mobile
    $("#js-mobile-trigger").on({
        mouseenter:function(){
            var $wrap=$("#js-mobile-bg-wrap");
            $wrap.stop().animate({bottom:0},300);
            $wrap.find(".mobile-bg2").stop().animate({opacity:0},300);
            $wrap.find(".mobile-bg3").stop().animate({opacity:1},300);

            $('#J-mk-mobile-bg').stop().animate({
                'margin-bottom': -30,
                opacity: 0
            }, 200);
            $('#J-mk-down-qrcode').stop().animate({
                'margin-bottom': 0,
                opacity: 1
            }, 300);
        },
        mouseleave:function(){
            var $wrap=$("#js-mobile-bg-wrap");
            $wrap.stop().animate({bottom:-30},300);
            $wrap.find(".mobile-bg3").stop().animate({opacity:0},300);
            $wrap.find(".mobile-bg2").stop().animate({opacity:1},300);

            $('#J-mk-mobile-bg').stop().animate({
                'margin-bottom': 0,
                opacity: 1
            }, 300);
            $('#J-mk-down-qrcode').stop().animate({
                'margin-bottom': -30,
                opacity: 0
            }, 200);
        }
    });

    // 首页轮播图-渐变
    (function(){
        var banner = $('.g-banner'),
            slides = banner.find('.banner-slide'),
            dotContainer = banner.find('.banner-dots'),
            dotTpl = '',
            dots,
            total = slides.length,
            index = -1,
            duration = 500,
            interval = 5000,
            timer = null;

        // 一张图 不执行轮播
        if(total == 1) {
            next();
            return;
        }

        dotTpl = '<span></span>';

        $.each(slides, function(i, el){
            dotContainer.append(dotTpl);
        });

        dots = dotContainer.find('span');

        function show(i){
            var cur = slides.filter('.slide-active');

            slides.stop(true, true);

            cur.removeClass('slide-active').fadeOut(600);

            slides.eq(i).addClass('slide-active').fadeIn(800);

            dots && dots.removeClass('active').eq(i).addClass('active');
        }
        function prev(){
            index--;

            index = index < 0 ? total - 1 : index;

            show(index);
        }

        function next(){
            index++;
            index = index > total - 1 ? 0 : index;

            show(index);
        }

        function autoPlay(){
            if(timer) clearInterval(timer);

            timer = setInterval(function(){
                next();
            }, interval);
        }

        banner.find('.banner-anchor').removeAttr('style');

        banner.on('click', '.prev', function(e){
            prev();
        }).on('click', '.next', function(e){
            next();
        }).on('click', '.banner-dots span', function(e){
            if($(this).hasClass('active')) return;

            var i = $(this).index();

            index = i;

            show(i);
        });

        banner.on('mouseenter', function(e){
            if(timer) clearInterval(timer);
        }).on('mouseleave', function(e){
            autoPlay();
        });

        next();

        autoPlay();

    })();
    // 默认滚动，触发动画检测
    $(window).trigger('scroll');


});

