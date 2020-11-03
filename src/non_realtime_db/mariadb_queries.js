const mysql = require('mysql')
const config = require('../../config')

let db = mysql.createConnection({
  host     : 'localhost' || config.nrt_host,
  user     : config.nrt_user,
  password : config.nrt_password,
  database: 'senior_monitoring'
})

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected to non-realtimedb as id ' + db.threadId)
})

db.getReceivers = (callback) => {
    const sql = 'SELECT r.receiver_id, s.space_name, l.location_type \
    FROM spaces as s, receivers as r, location_types as l \
    WHERE r.space_id=s.space_id AND s.location_type_id=l.location_type_id \
    ORDER BY r.receiver_name;'
    executeQuery(sql, callback)
    
}

db.getTenants = (callback) => {

    const sql = 'SELECT t.tenant_id, t.tenant_firstname, t.tenant_lastname, s.space_name, t.beacon_id, p.profile_type \
    FROM tenants as t, spaces as s, profiles as p \
    WHERE t.space_id=s.space_id AND t.profile_id=p.profile_id \
    ORDER BY t.tenant_lastname;'
    executeQuery(sql, callback)
}

const executeQuery = (sql, callback) => {
    db.query(sql, function(error, rows) {
        if (error) {
            console.log(error)
            return
        } else {
            callback(rows)
        }
    })
}

module.exports = db
