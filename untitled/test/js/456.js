/*Author:ZhangYin JavaScriptUpdated:(02.02.2016@11:AM)*/
$(function(){
    /* 首页专家切换效果 */
    (function(){
        var con = $('#team-con'), width = con.width(), height = con.height(),
            teamUl = con.find('>ul:first'), teamLi = teamUl.find('>li.team-list'), teamLen = teamLi.length,
            profile = teamLi.find('>ul'),// profielLi = [],// expertLi = profile.find('>li'),
            expertTab = teamLi.find('>div'),// expertCtrl = [], expertUl = [], expertLi = [],
        //globalCtrl = $('#team-tab-bottom>li,#team-tab-top a:not(:last)'),
            i = 0;
        /*con.find('img').each(function(index, element) {
         var _t = $(this);
         _t.attr('src',_t.attr('data-load')).removeAttr('data-load');
         });*/
        teamUl.css({width:( 1 + teamLen-- ) * width,height: height });
        teamLi.css({width: width,height: height });
        /*for(var j = 0; j< teamLen ; j++){
         var tep = $(profile[j]), tepLi = tep.find('>li'),
         tep2 = $(expertTab[j]), tep2Div = tep2.find('>div'), tep2A = tep2.find('>a'),tep2Ul = tep2.find('ul'), tep2Li = tep2Ul.find('>li'),len = tep2Li.length;
         $(tepLi[0]).clone().appendTo(tep);
         $(tep2Li[0]).clone().appendTo(tep2Ul);
         profielLi.push( tepLi );
         expertCtrl.push( tep2A );
         if(len > 5){
         tep2Div.width(500);
         }else{
         tep2Div.width(len*100);
         }
         expertUl.push( tep2Ul );
         expertLi.push( tep2Li );
         }*/

        /*$(teamLi[0]).clone().appendTo(teamUl);*/
        function move(){
            //$(globalCtrl[ -i > teamLen ? 0: -i]).addClass('active').siblings().removeClass('active');
            teamUl.stop().animate({left: i * width} ,function(){
                if(-i > teamLen){
                    i = 0;
                    teamUl.stop().css('left',0);
                }
            });
        }
        /*setInterval(function(){
         move(--i);
         },3e3);*/
        $('#team-tab-bottom>li').mouseenter(function(e) {
            var _t = $(this);
            _t.addClass('active').siblings().removeClass('active');
            i = - _t.index();
            move();
        });
        $('#team-tab-top a:not(:last)').mouseenter(function(e) {
            var _t = $(this);
            _t.addClass('active').siblings().removeClass('active');
            i = - _t.index() - 3;
            move();
        });
        expertTab.each(function(a, element) {
            var _t = $(this), arrowLeft = _t.find('a:first'), arrowRight = _t.find('a:last'), div = _t.find('>div'), ul = _t.find('ul'), li = _t.find('li'), len = li.length, tag = len>5 , index = 0;
            if(tag){
                div.width(500);
            }else{
                div.width(len*100);
            }
            ul.width(len--*100);
            function expertMove(){
                if( index < 0){
                    index = len;
                }
                if(index>len){
                    index = 0;
                }
                if(tag){
                    if(index>=4){
                        if(index>len){
                            ul.stop().animate({left: 0});
                            index = 0;
                        }else{
                            ul.stop().animate({left: -(index -4) *100});
                        }
                    }
                }
                $(li[index]).addClass('active').siblings().removeClass('active');
                $(profile[a]).stop().animate({top: - index * height});
            }

            arrowRight.click(function(e) {
                expertMove(++index);
            });
            arrowLeft.click(function(e) {
                expertMove(--index);
            });
        });
    })();

    /* 科室切换效果 */
    (function(){
        var depTab = $('#dep-tab>li'), depCon = $('#dep-con'),width = depCon.width(),depUl = depCon.find('>ul'),depLi = depUl.find('>li'), len = depLi.length, i = 0, clock;
        /*depUl.find('img').each(function(index, element) {
         var _t = $(this);
         _t.attr('src',_t.attr('data-load'))
         });*/
        $(depLi[0]).clone().appendTo(depUl);
        depUl.width( ( 1 + len-- ) * width );
        function move(){
            $(depTab[ -i > len ? 0: -i  ]).addClass('active').siblings().removeClass('active');
            depUl.stop().animate({left: i * width},function(){
                if(-i > len){
                    i = 0;
                    depUl.css('left',0);
                }
            })
        }

        function auto(){
            clock = setTimeout(function(){
                move(--i);
                auto();
            },3e3);
        }
        auto();
        function clear(){
            clearTimeout(clock);
        }
        depCon.mouseenter(function(e) {
            clear();
        });
        depCon.mouseleave(function(e) {
            auto();
        });
        depTab.hover(function(e) {
            clear();
            var _t = $(this);
            i = - _t.index();
            move();
        });
        depTab.mouseleave(function(e) {
            auto();
        });
    })();


    /* 品牌切换效果 */
    (function(){
        var tab = $('#brand-tab>li'), con = $('#brand-con'),width = con.width(),height = con.height(),ul = con.find('>ul'),li = ul.find('>li'), len = li.length, i = 0, clock;
        /*ul.find('img').each(function(index, element) {
         var _t = $(this);
         _t.attr('src',_t.attr('data-load'))
         });*/
        li.css({width:width,height:height});
        $(li[0]).clone().appendTo(ul);
        ul.width( ( 1 + len-- ) * height );
        function move(){
            $(tab[ -i > len ? 0: -i  ]).addClass('active').siblings().removeClass('active');
            ul.stop().animate({top: i * height},function(){
                if(-i > len){
                    i = 0;
                    ul.css('top',0);
                }
            })
        }
        function auto(){
            clock = setTimeout(function(){
                move(--i);
                auto();
            },3e3);
        }
        auto();
        function clear(){
            clearTimeout(clock);
        }
        con.mouseenter(function(e) {
            clear();
        });
        con.mouseleave(function(e) {
            auto();
        });
        tab.hover(function(e) {
            clear();
            var _t = $(this);
            i = - _t.index();
            move();
        });
        tab.mouseleave(function(e) {
            auto();
        });
    })();
});
