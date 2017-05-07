var http = require('http');
// 创建http模块

http.createServer(function (request, response) {
  //request 请求体
  // response 响应体

  // 发送 HTTP 头部
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  response.writeHead(200, {'Content-Type': 'text/plain'});

  // 发送响应数据 "Hello World"
  response.end('Hello World\n');
}).listen(8888, '127.0.0.1');

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');