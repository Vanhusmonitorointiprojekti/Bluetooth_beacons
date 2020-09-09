const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

function start(){

const port = 4002;
const app = express();

const httpServer = http.createServer(app);
const io = socketIo(httpServer);



let clients = 0;
io.on('connection', function(socket) {
   clients++;
   io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   });
});



httpServer.listen(port, () => console.log(`\nSocket.io running on port ${port}`));
}

module.exports = {
  start


};