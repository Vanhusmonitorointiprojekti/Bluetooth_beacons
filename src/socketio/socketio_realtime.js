
const express = require('express');
const bodyParser = require('body-parser');
const model = require('../../models/beacons');
const cors = require('cors')
const realtimeRoutes = require('../../controllers/beaconRoutes')

const start = () => {
    const port = 4002
    const app = express();
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);

    app.use(cors)
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/test', realtimeRoutes);


    server.listen(port, function() {
        console.log('Server "socketio and rtdb" up and listening on port %d', port);
        model.setup(function(data) {
            if((data.new_val != null) && (data.old_val != null)) {
                // TODO update
                io.emit('updates', data.new_val);
            } else if((data.new_val != null) && (data.old_val == null)) {
                // new beacon
                io.emit('test', data.new_val);
            }
        });
    });
}

module.exports = {
    start  
};