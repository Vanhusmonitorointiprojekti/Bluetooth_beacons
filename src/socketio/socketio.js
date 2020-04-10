const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

function start(){

const port = 4001;
const app = express();

const httpServer = http.createServer(app);
const io = socketIo(httpServer);

let interval;

//not so many connections
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => emit(socket), 6000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const emit = async socket => {
  try {
    const res = await axios.get(
      "http://localhost:4000/beacon_locations_average"
    );
    // -> data structure for socket.emit ->  topic name you emit -> res. -> data. -> json attribute/value
    
    // console.error(res);
    // console.log(res)
    socket.emit("emitSocket", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

httpServer.listen(port, () => console.log(`\nSocket.io running on port ${port}`));
}

module.exports = {
  start


};