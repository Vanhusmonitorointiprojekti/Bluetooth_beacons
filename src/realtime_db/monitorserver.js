const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const socketServer2 = require('../socketio/socketio_test')
const detections = require('../../controllers/beaconRoutes')
const tenant_statuses = require('../../controllers/tenantRoutes')
const push_notifications = require('../../controllers/pushRoutes')
const mariadb = require('../non_realtime_db/mariadb_queries')
const logic = require('./monitor_tenants')
const client = require('./emulator_client')

const app = express()

app.use(bodyparser.json())
 
app.use(cors())

socketServer2.start()
expressPort = 4000

app.listen(expressPort,() => console.log('Monitoring App is listening at port : ' + expressPort))

//start mqtt data client:
client()
//start tenant location monitoring:
logic()

app.use('/detections', detections)
app.use('/statuses', tenant_statuses)
app.use('/api/push_notification', push_notifications)

app.get('/', (req, res) => {
    res.send('Monitor app')
})

app.get('/tenants', (req, res) => {
    mariadb.getTenants((result) => {
        res.send(
            result
        )
    })
})

app.get('/receivers', (req, res) => {
    mariadb.getReceivers((result) => {
        res.send(
            result
        )
    })
})
