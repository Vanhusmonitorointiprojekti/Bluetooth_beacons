var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://195.148.21.81')

client.on('connect', function () {
  client.subscribe('Beacon-detect', function (err) {
    if (!err) {
      console.log('connected to Beacon-detect!')
    }
  })
})
    
client.on('message', function (topic, message) {
  // message is Buffer, hence make it toString()
  var msgArray = message.toString().split(" ")
 // console.log(message.toString())
  writeValues(msgArray)
})

// rethinkdb connection
var r = require('rethinkdb')
var connection = null;
r.connect({ 
  db: 'rt_beacons',
  host: 'localhost',
  port: '28015'
 // user: 'mqtt_client'
}, function(err, conn) {
  if (err) throw err;
  connection = conn;
})

function writeValues(msg) {
  r.db('rt_beacons').table('beacon_detections').insert( {
    receiver_id: msg[0],
    beacon_id: msg[1],
    signal_db: msg[2],
    measurement_time: Date.now()
  }).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2))
  })
}