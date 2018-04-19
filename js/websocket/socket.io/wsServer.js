/**
 * Created by Zhoujianxiang on 2018/4/18.
 */
var app = require('http').createServer();
var io = require('socket.io')(app);
var PORT = 3000;

var clientCount= 0;

app.listen(PORT);

io.on('connection', function (socket) {
  console.log(clientCount);
  clientCount++;
  socket.clientName = 'user' + clientCount;
  io.emit('enter', socket.clientName + 'come in');
  socket.on('message', function (str) {
    io.emit('message', socket.clientName + ':' + str);
  });
  socket.on('disconnect', function () {
    io.emit('leave', socket.clientName + 'left');
  })
});
