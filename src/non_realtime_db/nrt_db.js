
const mysql = require('mysql');

let connection = mysql.createConnection({
  host     : 'localhost' || process.env.NRT_HOST,
  user     : 'user' || process.env.NRT_USER,
  password : 'password' || process.env.NRT_PASSWORD,
  database: 'senior_monitoring'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected to non-realtimedb as id ' + connection.threadId);
});

module.exports = connection