const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const model = require('../../models/beacons');

function start(){

const port = 4002;
const app = express();

const httpServer = http.createServer(app);
const io = socketIo(httpServer);



let clients = 0;
io.on('connection', function(socket) {

    model.setup(function(data) {
        if((data.new_val != null) && (data.old_val != null)) {
            // TODO update
            io.emit('updates', data.new_val);
        } else if((data.new_val != null) && (data.old_val == null)) {
            // new beacon
            io.emit('test', data.new_val);
            console.log('Emitting from realtimedb:', data.new_val)
        }
    });

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