const mqtt = require('mqtt')
const mysql = require('mysql');
const client  = mqtt.connect('mqtt://195.148.21.81')
const db = require('./nrt_db')

client.on('connect', function () {
  client.subscribe('Beacon-detect', function (err) {
    if (!err) {
      console.log('connected!')
    }
  })
})
    
client.on('message', function (topic, message) {
  // message is Buffer, hence make it toString()
  let msgArray = message.toString().split(" ")
  //console.log(message.toString())
  writeValues(msgArray)
})

function writeValues(msg) {
  const receiver_id = msg[0]
  const beacon_id = msg[1]
  const signal_db = msg[2]

  let sql = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)'
  const params = ['beacon_detections', 'receiver_id', 'beacon_id', 'signal_db',
    receiver_id, beacon_id, signal_db]
  sql = mysql.format(sql, params)
  db.query(sql, function(error, results) {
      if (error) {
          console.log(error)
          return
      }
  })

}

//https://gist.github.com/smching/ff414e868e80a6ee2fbc8261f8aebb8f#file-app_mqtt_mysql_completed-js