require('dotenv').config()

module.exports = {
    database: {
      db: process.env.RDB_DB || "rt_beacons",
      host: process.env.RDB_HOST || "localhost",
      port: process.env.RDB_PORT || 28015
    }
  }