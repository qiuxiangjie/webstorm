/**
 * Created by Zhoujianxiang on 2018/4/13.
 */
var ws = require("nodejs-websocket");
var PORT = 8001;
var clientCount = 0;


var server = ws.createServer(function (conn) {
  console.log("New connection");
  clientCount++;
  conn.clientName = 'user' + clientCount;
  broadcast(conn.clientName + 'come in');
  conn.on("text", function (str) {
    console.log("Received "+str)
    //conn.sendText(str.toUpperCase()+"!!!")
    broadcast(str);
  });
  conn.on("close", function (code, reason) {
    console.log("Connection closed");
    broadcast(conn.clientName + 'Connection closed')
  });
  conn.on('error', function (e) {
    console.log('error');
    console.log(e)
  })
}).listen(PORT);

console.log('websocket server listening on port:' + PORT);
function broadcast(str) {
  server.connections.forEach(function (connection) {
    connection.sendText(str);
  })
}
