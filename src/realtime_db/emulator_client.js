var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://195.148.21.81')
const config = require('../../config')

client.on('connect', function () {
  //publish every 5 secs
  var timer_id = setInterval(function(){
      publish();
  },1000)

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

const signals = ['receiver1 e2:e3:23:d1:b0:54 -23',
'receiver2 e2:e3:23:d1:b0:54 -61',
'receiver2 f2:36:00:21:c0:50 -20',
'receiver3 f2:36:00:21:c0:50 -54',
'receiver2 d6:2c:ca:c0:d4:9c -18',
'receiver3 d6:2c:ca:c0:d4:9c -77',
'receiver1 e2:e3:23:d1:b0:54 -17',
'receiver2 e2:e3:23:d1:b0:54 -78',
'receiver2 f2:36:00:21:c0:50 -35',
'receiver3 f2:36:00:21:c0:50 -19',
'receiver2 d6:2c:ca:c0:d4:9c -37',
'receiver1 d6:2c:ca:c0:d4:9c -28',
'receiver2 e2:e3:23:d1:b0:54 -61',
'receiver1 e2:e3:23:d1:b0:54 -17',
'receiver2 f2:36:00:21:c0:50 -70',
'receiver3 f2:36:00:21:c0:50 -29',
'receiver2 f2:36:00:21:c0:50 -25',
'receiver2 d6:2c:ca:c0:d4:9c -64',
'receiver1 d6:2c:ca:c0:d4:9c -19']

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

var giveSignal = function() {
    var privateCounter = 0;
    var signal = signals[privateCounter]
    function changeNumber() {      
      if (privateCounter === signals.length-1) {
          privateCounter = 0
      } else {
        privateCounter += 1;
      }
      signal = signals[privateCounter]
    }
    return {
      increment: function() {
        changeNumber();
      },
      value: function() {
        return signal;
      }
    }
  };

var signalFunction = giveSignal()

//publish function
function publish(){

    var msg = signalFunction.value();
    signalFunction.increment()
    var topic="emulator";
    console.log("publishing", msg);
    if (client.connected == true){
        client.publish(topic,msg);
    }
}
