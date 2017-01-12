//判断对象为空
function isEmptyObject(o){
    for(var n in o){
        return false;
    }
    return true;
}

//取URL参数
function renderTabDOM(data){
    return [
        !isEmptyObject(data.require)?renderTabItem(data.require,false,'工程管理员','picR',1):'',
        !isEmptyObject(data.teamReform)?renderTabItem(data.teamReform,false,'施工队长','picT',2):'',
        !isEmptyObject(data.qualified)?renderTabItem(data.qualified,true,'工程管理员','picQ',1):''
    ]
}
function renderTabItem(data,state,post,pid,picId){
    var openTip = state ? '合格照片业主可见' : '此问题业主可见';
    var picsID = 0;
    var newPicData = [];
    //头部渲染
    $('.top-nav').append('<li '+(data.title==='管理员整改要求' ? 'class="active"' : '')+' >'+data.title+'</li>');
    //内容渲染
    var boxDOM = '<div class="box" '+(data.title==='管理员整改要求' ? 'style="display:block;"' : '')+'>';
    boxDOM +='<div class="box-title"><div class="box-title-pic"><img src="http://res.bnq.com.cn/img/head_portrait'
      + picId
      + '.png" alt=""/></div><div class="box-name"><h3>'
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
        data.forEach(function (item,i) {

            qualityDOM += '<li class="clear '+(item.isOpen ? 'padding' : '')+'"><div class="listLeft"><p>'
              +item.content
              + '</p><i'
              + (state?' class="qualified"':'')
              +'>'
              + item.num
              + '处'
              + (state?'/整改合格':'')
              +'</i></div><div class="pics '
              + pid
              +'" id="'
              + pid+(picsID)
              +'"><img src="'
              + item.picUrls[0].picUrl
              +'"/>'
              +(item.picNum>1?('<i>'+item.picNum+'</i>'):'')
              +'</div><div class="bottomTip '+(!item.isOpen ?'hidden' : '')+' ">'+openTip+'</div></li>';
            //保存图片数据
            item.picUrls.forEach(function (picItem) {
                newPicData.push({
                    id:picsID++,
                    picURL :picItem.picUrl,
                    content : item.content
                })
            });
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
    if(isNotNull(data.internal)){
        renderScoreDOM(data.internal,'内部交底打分');
    }
    if(isNotNull(data.other)){
        renderScoreDOM(data.other,'其它');
    }
    boxDOM += '</ul></div>';
    $('#tabCon').append(boxDOM);
    return newPicData;
}
function renderDOMCallBack(){
    /*tab切换*/
    $('.top-nav li').tap(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.box').eq($(this).index()).show().siblings('.box').hide();
    });
}

/*******************相册组件***************************/
var $winW = $(window).width();
var $winH = $(window).height();
(function ($) {
    var PicScroll = function (option){
        this.list = option.list;
        this.docID= option.doc;
        this.Doc = $('#'+ option.doc);
        this.doc = this.Doc.find('ul');

        this.init();
        this.renderDOM();
        this.bindDOM();
    };
    PicScroll.prototype={
        //初始化
        init:function(){
            this.winW = $winW;
            this.winH = $winH;
            this.pid = 0;
        },
        //渲染DOM
        renderDOM:function(){
            var data = this.list;
            var winW = this.winW;
            var winH = this.winH;
            var liDOMs='';
            data.forEach(function(item,i){
                liDOMs += '<li style="transform:translate3d('
                  + i*winW
                  + 'px,0px,0px);width:'
                  + winW
                  + 'px"><img src="'
                  + item.picURL
                  + '"/></li>';
            });
            this.doc.html(liDOMs);
        },
        //绑定事件
        bindDOM:function(){
            var self = this;
            this.liDOM = this.doc.find('li');
            this.picLength = this.liDOM.length;
            var picScroll = document.getElementById(this.docID);
            this.picScrollUl =picScroll.getElementsByTagName('ul')[0];
            this.lis = this.picScrollUl.getElementsByTagName('li');
            var lis = this.lis;

            //按下事件（记录开始的坐标）
            this.picScrollUl.addEventListener('touchstart',function (e) {
                self.startX = e.touches[0].pageX;
                self.offsetX = 0;//移动距离归零
            },false);

            //滑动事件（记录坐标变换值，设置图片拖动特效）
            this.picScrollUl.addEventListener('touchmove', function (e) {
                e.preventDefault();
                self.offsetX = e.targetTouches[0].pageX - self.startX;

                //拖动当前页以及前后两张图片
                var starId = self.pid-1;
                var endId  = self.pid+1;
                for(var i = starId; i <= endId; i++){
                    lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0s ease-out');//取消动画，使拖动自然
                    lis[i] && (lis[i].style.webkitTransform  = 'translate3d('+ ((i-self.pid)*self.winW+self.offsetX) +'px,0,0)');
                }
            });

            //抬起事件（根据滑动方向和距离，判断滚动方式）
            this.picScrollUl.addEventListener('touchend', function () {
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
                    self.Doc.css({
                        transitionDuration:'300ms',
                        transform:'translate3d('+leftP+'px,'+topP+'px,0'+') scale(0.001)'
                    }).removeClass('active');
                    setTimeout(function(){
                        self.Doc.css({
                            transitionDuration:'0ms'
                        })
                    },300)
                },200)
            });

            //双击事件（隐藏/显示文苗）
            var flag = true;
            this.doc.doubleTap(function () {
                clearTimeout(delayFun);//取消单机事件
                flag?self.Doc.find('p').hide():self.Doc.find('p').show();
                flag = !flag;
            })
        },
        //图片翻页函数
        goIndex:function(n){
            var self = this;
            var data = this.list;
            var lis = this.lis;
            var cid = this.pid;
            if(n==='prev'){
                //上一页
                cid-1 >= 0 ? cid-- : 0;
            }else if(n==='next'){
                //下一页
                cid+1 <= this.picLength-1 ? cid++ : this.picLength-1;
            }else if(typeof n==="number"){
                cid = n;
                for(var i = 0; i < lis.length ; i++){
                    /*
                     * 设置当前页前面的图片都是负值，当前页后面的图片都是正值
                     * */
                    lis[i].style.transitionDuration='0ms';
                    if(i<n){
                        lis[i].style.webkitTransform = 'translate3d(-' + (self.winW) +'px,0px,0px)';
                    }else if(i>n){
                        lis[i].style.webkitTransform = 'translate3d(' + (self.winW) +'px,0px,0px)';
                    }
                }
            }

            //保存当前页码
            this.pid = cid;

            //设置翻页图片文描
            self.Doc.children('p').html('<span>'+(1+cid)+'/'+self.list.length+'</span>'+self.list[cid].content);
            /*
             *按需加载，发现影响动画效率，暂不运用
             * *
             lis[cid].getElementsByTagName('img')[0].setAttribute('src',data[cid].picURL);
             lis[cid].style.webkitTransition = '-webkit-transform .2s ease-out';
             if(lis[cid-1]){
             lis[cid-1].getElementsByTagName('img')[0].setAttribute('src',data[cid-1].picURL);
             lis[cid-1].style.webkitTransition = '-webkit-transform .15s ease-out';
             }
             if(lis[cid+1]){
             lis[cid+1].getElementsByTagName('img')[0].setAttribute('src',data[cid+1].picURL);
             (lis[cid+1].style.webkitTransition = '-webkit-transform .15s ease-out');
             }*/

            //添加动画
            lis[cid-1] && (lis[cid-1].style.webkitTransition = '-webkit-transform .15s ease-out');
            lis[cid].style.webkitTransition = '-webkit-transform .2s ease-out';
            lis[cid+1] && (lis[cid+1].style.webkitTransition = '-webkit-transform .15s ease-out');

            //执行翻页
            lis[cid-1] && (lis[cid-1].style.webkitTransform = 'translate3d(-'+ (this.winW) +'px,0px,0px)');
            lis[cid].style.webkitTransform = 'translate3d(0px,0px,0px)';
            lis[cid+1] && (lis[cid+1].style.webkitTransform = 'translate3d('+ (this.winW) +'px,0px,0px)');
        }
    };
    //全局注册PicScroll
    window.PicScroll =PicScroll;
})($);

/*******弹出图片相册***********/
var leftP = $winW/2-40-$winW*0.03,topP;
function renderPic(list){
    //给3个tab添加事件
    ['picR','picT','picQ'].forEach(function (item,i) {
        var flag = true;
        var picScroll;

        $('.'+item).tap(function () {
            //实例化一个图片组件
            if(flag){
                picScroll = new PicScroll({
                    list:list[i],
                    doc:'picScroll'+(i+1)
                });
                flag = false;
            }
            var cPicId= parseInt($(this).attr('id').replace(/[^0-9]/ig,""));//获取id数字
            picScroll.goIndex(cPicId);//跳转到响应的图片
            topP = $(this).offset().top-$(window).scrollTop()+35-$winH/2;
            $('#picScroll'+(i+1)).addClass('active').css({
                transition:'opacity 300ms,transform 0s',
                transform: 'scale(1) translate3d(0px, 0px, 0px)'
            });
        });
    });
}