var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://195.148.21.81')
const config = require('../../config')
const giveSignal = require('./emulator')

const client_function = () => {
client.on('connect', function () {
  //publish every 5 secs
  var timer_id = setInterval(function(){
      publish();
  },5000)

  client.subscribe('emulator', function (err) {
    if (!err) {
      console.log('connected to emulator channel!')
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
    port: '28015',
    user: config.mqtt_user,
    password: config.mqtt_password
  }, function(err, conn) {
    if (err) throw err;
    connection = conn;
  })

function writeValues(msg) {
  r.db('rt_beacons').table('beacon_detections').insert( {
    receiver_id: msg[0],
    beacon_id: msg[1],
    signal_db: Number(msg[2]),
    measurement_time: r.now()
  }).run(connection, function(err, result) {
    if (err) throw err;
   //  console.log(JSON.stringify(result, null, 2))
  })
}

let signalFunction = giveSignal()

//publish function
// http://www.steves-internet-guide.com/using-node-mqtt-client/
function publish(){
    let msg = signalFunction.value();
    signalFunction.increment()
    let topic="emulator";
    // console.log("publishing", msg);
    if (client.connected == true){
        client.publish(topic,msg);
    }
}
}

module.exports = client_function