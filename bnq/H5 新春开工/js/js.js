/**
 * Created by Z10002053 on 2017/2/4.
 */
$(function () {
  var wind = $(window);
  var w = wind.width();
  var h = wind.height();
  $('.page>li, .bb').width(w).height(h).children('img').width(w).height(h);
  $('.page').height(h);

  /*******************翻页***************************/

  (function ($) {
    window.PageScroll = function (doc) {
      this.doc = doc;
      this.lis = doc.getElementsByClassName('p');
      this.init();
      this.renderDOM();
      this.bindDOM()
    };
    window.PageScroll.prototype = {
      init: function () {
        this.w = $(window).width();
        this.h = $(window).height();
        this.pid = 0;
      },
      renderDOM: function () {
        for(var i = 0; i < this.lis.length; i++) {
          this.lis[i].style.position = 'absolute';
          this.lis[i].style.webkitTransform ='translate3d(0px,'+ this.h * i +'px,0px)'
        }
      },
      bindDOM: function () {
        var self = this;
        var lis = this.lis;
        this.doc.addEventListener('touchstart', function (e) {
          self.startY= e.touches[0].pageY;
          self.offsetY = 0;//移动距离归零
        });
        this.doc.addEventListener('touchmove', function (e) {
          e.preventDefault();
          self.offsetY = e.targetTouches[0].pageY - self.startY;

          //拖动当前页以及前后两张图片
          var starId = self.pid-1;
          var endId  = self.pid+1;
          if ( self.pid === 0 && self.offsetY > 0){ return}
          else if (self.pid === 1 && self.offsetY < 0) {
            $('.b11 > img').attr({src: './img/22222.png'})
          } else if ( self.offsetY < 0 && self.pid === 2) {
            $('.bb > img').attr({src: './img/2b.png'});
            $('.b1 > img').attr({src: './img/330.png'});
            $('.b11 > img').attr({src: './img/2b1.png'});
            $('.b22 > img').attr({src: './img/2b2.png'});
          } else if (self.offsetY > 0 && self.pid === 2) {
            $('.b1 > img').attr({src: './img/330.png'});
            $('.b11 > img').attr({src: './img/22222.png'});
          } else if (self.offsetY < 0 && self.pid === 3) {
            $('.b22 > img').attr({src: './img/22.png'});
          } else if (self.offsetY > 0 && self.pid === 3) {
            $('.b22 > img').attr({src: './img/2b2.png'});
          } else if (self.offsetY > 0 && self.pid === 4) {
            $('.b1 > img').attr({src: './img/330.png'})
          } else if (self.offsetY > 0 && self.pid === 8) {
            $('.b2 > img').attr({src: './img/b55.png'})
          } else if (self.offsetY < 0 && self.pid === 8) {
            $('.b2 > img').attr({src: './img/334.png'})
          }
          for(var i = starId; i <= endId; i++){
            lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0s ease-out');//取消动画，使拖动自然
            lis[i] && (lis[i].style.webkitTransform  = 'translate3d(0px,'+((i-self.pid)*self.h+self.offsetY)+'px,0)');
          }
        });
        this.doc.addEventListener('touchend', function () {
          self.offsetY>60?self.goIndex('prev')
            :self.offsetY<-60?self.goIndex('next')
            :self.goIndex(self.pid);
        })
      },
      goIndex: function (n) {
        var cid = this.pid;
        var lis = this.lis;
        if (n === 'prev'){
          console.log('-1');
          cid = cid - 1 < 0 ? 0 : --cid;
        } else if ( n === 'next') {
          console.log('+1');
          cid = cid + 1 > this.lis.length - 1 ? this.lis.length  - 1 : ++cid;
        }
        this.pid = cid;

        console.log(this.pid);
        if (this.pid === 1) {
          $('.icon li').each(function (i) {
            $(this).addClass('a-icon' + (i + 1))
          });
          $('.note li').each(function (i) {
            $(this).addClass('a-note' + (i + 1))
          })
        }
        if ( this.pid === 4) {
          setTimeout(function () {
            $('.b1 > img').attr({src: './img/b11.png'})
          }, 200);
        }
        if ( this.pid === 8) {
          setTimeout(function () {
            $('.b2 > img').attr({src: './img/b55.png'})
          }, 200);
        }
        if (this.pid === 11) {
          $('.bb > img').removeAttr('src')
        } else if (this.pid === 8 || this.pid === 4 || this.pid === 5 || this.pid === 6 || this.pid === 7 ) {
          $('.bb > img').attr({src:"./img/bb.png"})
        } else {
          $('.bb > img').attr({src:"./img/2b.png"})
        }

        //添加动画
        lis[cid-1] && (lis[cid-1].style.webkitTransition = '-webkit-transform .15s ease-out');
        lis[cid].style.webkitTransition = '-webkit-transform .2s ease-out';
        lis[cid+1] && (lis[cid+1].style.webkitTransition = '-webkit-transform .15s ease-out');

        //执行翻页
        lis[cid-1] && (lis[cid-1].style.webkitTransform = 'translate3d(0px,-'+ (this.h) +'px,0px)');
        lis[cid].style.webkitTransform = 'translate3d(0px,0px,0px)';
        lis[cid+1] && (lis[cid+1].style.webkitTransform = 'translate3d(0px,'+ (this.h) +'px,0px)');
      }
    }
  }($));
  var page = document.getElementsByClassName('page')[0];
  var p = new PageScroll(page);
  $('.down-div').click(function () {
    p.goIndex('next');
  });

  var music = document.getElementById('music');
  $('.music-c').click(function () {
    if (music.paused) {
      music.play();
      $('.music-c').css({
        animationPlayState: 'running'
      });
    } else {
      music.pause();
      $('.music-c').css({
        animationPlayState: 'paused'
      });
    }
  });

/*  setTimeout(function () {
   // music.src='./img/music.mp3';
   // music.play();
    $('.music-c').click()
  }, 300);*/

});
