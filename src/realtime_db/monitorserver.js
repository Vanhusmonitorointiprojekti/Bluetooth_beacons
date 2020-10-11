const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const socketServer2 = require('../socketio/socketio_test')
const model = require('../../models/beacons')
const detections = require('../../controllers/beaconRoutes')

const app = express()

app.use(bodyparser.json());
 
app.use(cors())

socketServer2.start()
expressPort = 4000;

app.listen(expressPort,() => console.log('Monitoring App is listening at port : ' + expressPort))

app.use('/detections', detections);

app.get('/', (req, res) => {
    res.send('Monitor app')
})
