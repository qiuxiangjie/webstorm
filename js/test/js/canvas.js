/**
 * Created by Administrator on 2016/2/27.
 */

var can,ctx,w,h;
var girlImg = new Image();
var starImg = new Image();
var mun   = 60;
//var stars = [];

function init(){
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");
    w   = can.width;
    h   = can.height;
    gameLoop();
    girlImg.src = '/js/test/images/banner2.jpg';
    starImg.src = '/js/test/images/star.png';

/*    for(var i = 0; i < mun; i++){
        stars[i] = new StarsObj();
        stars[i].init();
    }*/

}
document.body.onlond = init();

function gameLoop(){
    window.requestAnimFrame(gameLoop);//循环绘制背景
    drawBackground();
    drawGirl();
    //drawStars();
}
//绘制背景
function drawBackground(){
    ctx.fillStyle ="#393500";
    ctx.fillRect(0,0,w,h);
}
//绘制图片
function drawGirl(){
    ctx.drawImage(girlImg,0,0);
}
//绘制星星类
/*
var StarsObj = function() {
    this.x;
    this.y;
};
StarsObj.prototype.init= function() {
    this.x =100;
    this.y =100;
};
StarsObj.prototype.draw = function() {
    ctx.drawImage(starImg,this.x,this.y);
};
function drawStars(){
    for(var i = 0; i < mun; i++){
        stars[i].draw();
    }
}
*/




