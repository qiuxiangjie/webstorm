/**
 * Created by Z10002053 on 2017/1/20.
 */


$(function () {
  (function ($) {
    window.xgScroll = function (obj) {
      this.domId = obj.domId;
      this.data = obj.data;
      this.dom = $(this.domId);
      this.domScroll = obj.domScroll;
      this.curPage = 0;
      this.init();
      this.bind();
    };
    xgScroll.prototype = {
      init: function () {
        var listImg = '<div class="scroll" id="'+ this.domScroll +'"><ul>';
        this.data.forEach(function (item) {
          listImg += ' <li><img src="' + item.url + '" alt=""></li>'
        });
        listImg += '</ul><div class="position"> <div id="'+ this.domScroll + 'Prev' +'" class="prev"></div> <div id="'+ this.domScroll + 'Next' +'" class="next"></div></div><div id="'+ this.domScroll + 'Close' +'" class="close"></div></div>';
        $('body').append(listImg);
      },
      bind: function () {
        var self = this;
        this.domLi = this.dom.find('li');
        this.domLiLenght = this.domLi.length;
        this.imgs = $('#' + this.domScroll);
        this.domLi.each(function (item, i) {
          $(this).click(function () {
            self.imgs.fadeIn(300);
            self.goPage($(this).index());
          })
        });
        $('#'+ this.domScroll + 'Prev').click(function () {
          var prev = self.curPage - 1 < 0 ? self.domLiLenght -1 : --self.curPage;
          self.goPage(prev)
        });
        $('#' + this.domScroll + 'Next').click(function () {
          var next = self.curPage + 1 > self.domLiLenght - 1 ? 0 : ++self.curPage;
          self.goPage(next)
        });
        $('#' + this.domScroll + 'Close').click(function () {
          self.imgs.fadeOut(300)
        })
      },
      goPage: function (n) {
        this.curPage = n;
        this.imgs.find('li').eq(n).css({
          display: 'block'
        }).stop().animate({
          opacity: 1,
        },500).siblings().css({
          opacity: 0,
          display: 'none'
        })
      }
    }
  })($);


});