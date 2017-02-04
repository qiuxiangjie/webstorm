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
          listImg += ' <li><img src="' + item + '" alt=""></li>'
        });
        listImg += '</ul><div class="position"> <div id="prev"></div> <div id="next"></div></div><div id="close"></div></div>';
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
        $('#prev').click(function () {
          self.goPage(self.curPage - 1)
        });
        $('#next').click(function () {
          self.goPage(self.curPage + 1)
        });
        $('#close').click(function () {
          self.imgs.fadeOut(300)
        })
      },
      goPage: function (n) {
        var i = n < 0 ? 0
          : n > this.domLiLenght - 1 ? this.domLiLenght - 1
          : n ;
        this.curPage = i;
        this.imgs.find('li').eq(i).css({
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