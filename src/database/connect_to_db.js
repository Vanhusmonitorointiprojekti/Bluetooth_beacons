const mysql = require('mysql');

//Connection config
global.db = mysql.createConnection({
    host     : '193.166.11.75' || '172.28.170.116',
    user     : 'connect',
    password : 'test',
    database : 'bt_beacons',
  });
  
//Connect to database
  db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connection established with the database');
});

module.exports = 'connect_to_db';