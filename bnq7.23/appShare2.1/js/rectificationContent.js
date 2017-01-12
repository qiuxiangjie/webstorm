/**
 * Created by Z10002053 on 2016/7/22.
 */
$(function () {
    function isNotNull(obj){
        return typeof(obj) != 'undefined' && obj !== null &&  obj !== "";
    }
    /***********************内容整改***********************************************************************************************/
    /*数据加载*/
    $.ajax({
        url:'./js/package2.json',
        dataType:'json',
        method:'get',
        success:function(data){
            if(data.response.code===0){
                renderDOM(data.response.data.reformInfo)
                renderDOMClassBack();
            }else{
                alert(data.response.message)
            }
        },
        error:function(a,b,c){
            console.log('a:'+a);
            console.log('b:'+b);
            console.log('c:'+c);
        }
    });
    function renderDOM(data){
        renderTab(data.require,false,'工程管理员');
        renderTab(data.teamReform,false,'施工队长');
        renderTab(data.qualified,false,'工程管理员');

    }
    function renderTab(data,state,post){
        //头部渲染
        $('.top-nav').append('<li '+(data.title==='管理员整改要求' ? 'class="active"' : '')+' >'+data.title+'</li>');
        //内容渲染
        $('#tabCon');
        var boxDOM = '<div class="box" '+(data.title==='管理员整改要求' ? 'style="display:block;"' : '')+'>';
        boxDOM +='<div class="box-title"><div class="box-title-pic"><img src="./img/head_portrait1.png" alt=""/></div><div class="box-name"> <h3>'
            + post
            + '</h3><p>'
            + data.name
            + '</p></div><p class="box-title-con clear">'
            + data.note
            + '</p></div><ul class="list">';

        //渲染打分项
        function renderScoreDOM(data,name){
            var qualityDOM = '';
            qualityDOM += ' <li><h4>'+name+'</h4><ul class="list-con clear">';
            data.forEach(function (item) {
                qualityDOM += '<li class="clear"><div class="left"><p>'+item.content+'</p><span>'
                    + item.num
                    + '处</span></div><div class="right pics"><img src="'+item.picUrl[0]+'"/>'+(item.picNum>1?('<i>'+item.picNum+'</i>'):'')+'</div></li>'
            });
            qualityDOM += '</ul></li>';
            boxDOM += qualityDOM;
        }
        if(isNotNull(data.quality)){
            renderScoreDOM(data.quality,'施工质量综合打分');
        }
        if(isNotNull(data.civil)){
            renderScoreDOM(data.civil,'安全文明打分');
        }
        if(isNotNull(data.protect)){
            renderScoreDOM(data.protect,'土地成品保护检查');
        }
        if(isNotNull(data.other)){
            renderScoreDOM(data.other,'其它');
        }
        boxDOM += '</ul></div>';
        $('#tabCon').append(boxDOM);
    }
    function renderDOMClassBack(){
        /*tab切换*/
        $('.top-nav li').tap(function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.box').eq($(this).index()).show().siblings('.box').hide();
        });
    }
    /*相册组件*/
    var list = [{
        text:"文字文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述描述",
        img: "./img/1.jpg"
    },
        {
            text:"文字文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述描述",
            img: "./img/2.jpg"
        },
        {
            text:"文字文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述描述",
            img: "./img/3.jpg"
        },
        {
            text:"文字文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述描述",
            img: "./img/4.jpg"
        },
        {
            text:"文字文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述描述",
            img: "./img/7.jpg"
        }
    ];

    var runFlag = true;
    (function ($) {
        var PicScroll = function (option){
            this.list = option.list;
            this.Doc = option.doc;
            this.doc = this.Doc.find('ul');

            this.init();
            this.renderDOM();
            if(runFlag){
                this.bindDOM();
                runFlag = !runFlag;
            }
        };
        PicScroll.prototype={
            //初始化
            init:function(){
                this.winW = $(window).width();
                this.winH = $(window).height();
                this.pid = 0;
            },
            //渲染DOM
            renderDOM:function(){
                var data = this.list;
                var winW = this.winW;
                var winH = this.winH;
                var liDOMs='';
                data.forEach(function(item,i,data){
                    liDOMs += '<li style="transform:translate3d('
                        + i*winW
                        + 'px,0,0);width:'
                        + winW
                        + 'px"><img src="'
                        + item.img
                        + '"/><p><span>'+(i+1)+'/'+data.length+'</span>'+item.text+'</p></li>';
                });
                this.doc.html(liDOMs);
            },
            //绑定事件
            bindDOM:function(){
                var self = this;
                this.liDOM = this.doc.find('li');
                this.picLength = this.liDOM.length;
                var picScroll = document.getElementById('picScroll');
                this.picScrollUl =picScroll.getElementsByTagName('ul')[0];
                this.lis = this.picScrollUl.getElementsByTagName('li');
                var lis = this.lis;

                //按下事件（记录开始的坐标）
                this.picScrollUl.addEventListener('touchstart',function (e) {
                    self.startX = e.touches[0].pageX;
                    self.offsetX = 0;
                },false);

                //滑动事件（记录坐标变换值，设置图片拖动特效）
                this.picScrollUl.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                    self.offsetX = e.targetTouches[0].pageX - self.startX;

                    var starId = self.pid-1;
                    var endId  = self.pid+1;
                    for(var i = starId; i <= endId; i++){
                        lis[i] && (lis[i].style.transition = 'transform 0s ease-out');
                        lis[i] && (lis[i].style.transform  = 'translate3d('+ ((i-self.pid)*self.winW+self.offsetX) +'px,0,0');
                    }
                },false);

                //抬起事件（根据滑动方向和距离，判断滚动方式）
                this.picScrollUl.addEventListener('touchend', function (e) {
                    self.offsetX>60?self.goIndex('prev')
                        :self.offsetX<-60?self.goIndex('next')
                        :self.goIndex(self.pid);
                },false);

                //单击事件(退出图片浏览)
                var delayFun = null;
                this.doc.tap(function () {
                    clearTimeout(delayFun);
                    //延时执行单机事件，避免双击事件的时候，执行单击事件
                    delayFun = setTimeout(function () {
                        console.log('tag');
                        self.Doc.hide();
                    },200)
                });

                //双击事件（隐藏/显示文苗）
                var flag = true;
                this.doc.doubleTap(function () {
                    clearTimeout(delayFun);//取消单机事件
                    if(flag){
                        $('#picScroll p').hide();
                    }else{
                        $('#picScroll p').show();
                    }
                    flag = !flag;
                })
            },
            //图片翻页函数
            goIndex:function(n){
                var lis = this.lis;
                var cid = this.pid;
                if(n==='prev'){
                    //上一页
                    cid-1 >= 0 ? cid-- : 0;
                    console.log('prev')
                }else if(n==='next'){
                    //下一页
                    cid+1 <= this.picLength-1 ? cid++ : this.picLength-1;
                    console.log('next')
                }
                this.pid = cid;
                console.log(cid);

                lis[cid-1] && (lis[cid-1].style.transition = 'transform .15s ease-out');
                lis[cid].style.transition = 'transform .3s ease-out';
                lis[cid+1] && (lis[cid+1].style.transition = 'transform .15s ease-out');

                lis[cid-1] && (lis[cid-1].style.transform = 'translate3d(-'+ (this.winW) +'px,0,0)');
                lis[cid].style.transform = 'translate3d(0,0,0)';
                lis[cid+1] && (lis[cid+1].style.transform = 'translate3d('+ (this.winW) +'px,0,0)');
            }
        };
        //全局注册PicScroll
        window.PicScroll =PicScroll;
    })($);

    /*******弹出图片相册***********/
    $('.pics').tap(function () {
        $('#picScroll').show();

        //实例化一个图片组件
        new PicScroll({
            list:list,
            doc:$('#picScroll')
        });
    });
});