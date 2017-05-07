var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();

//  添加事件监听
// life 默认最多可以添加10个时间，超出会警告
life.setMaxListeners(11); // 可以设置最大监听事件数

life.on('事件名称', function (data) {
  console.log(data)
});

function fun () {
  console.log('123')
}
life.on('事件名称', fun);

// 触发事件
life.emit('事件名称', '事件函数传入的参数'); // 返回值可以判断是否被监听，即是否有添加了该事件的监听

/*
* removeListener, 移除监听函数，但是第二个参数不能是匿名函数，
* removeAllListeners('事件名称') 移除该事件名称所有事件，不传参数，将移除所有事件
* 事件移除要在事件触发前移除有效
* */

life.removeListener('事件名称', fun);
life.removeAllListeners('事件名称');