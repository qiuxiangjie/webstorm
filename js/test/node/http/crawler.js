var http = require('http');
var url = 'http://www.imooc.com/learn/348';
var cheerio = require('cheerio');
String.prototype.trim=function() {
  return this.replace(/(^\s*)|(\s*$)/g,'');
};
function filerChapters (html) {
  var $ = cheerio.load(html);
  var chapters = $('.chapter ');
/*  [{
    chapterTitle: '',
    videos: [
      {
        title: '',
        id: '123'
      }
    ]
  }]*/
  var courseData = [];
  chapters.each(function (item) {
    var chapter = $(this);
    var chapterTitle = chapter.find('strong').text();
    var videos = chapter.find('.video').children('li');
    var chapterData = {
      chapterTitle: chapterTitle,
      videos: []
    };
    videos.each(function (item) {
      var video = $(this).find('.J-media-item');
      var videoTitle = video.text();
      var id = video.attr('href').split('video/')[1];
      chapterData.videos.push({
        title: videoTitle,
        id: id
      })
    });
    courseData.push(chapterData)
  });
  return courseData
}
function printCourseInfo (courseData) {
  courseData.forEach(function (item) {
    console.log(item.chapterTitle.trim() + '\n');
    item.videos.forEach(function (item) {
      console.log('【' + item.id + '】' + item.title.trim() + '\n')
    })
  })
}
http.get(url, function (res) {
  var html = '';
  res.on('data', function (data) {
    html += data;
   // console.log('当前获取信息：+++++++++++++++++++++++++++++++++++++++++++++++' + data)
  });
  res.on('end', function () {
    var courseData =  filerChapters(html);
    printCourseInfo(courseData);
    console.log('over')
  })
}).on('error', function () {
  console.log('网络错误！')
});