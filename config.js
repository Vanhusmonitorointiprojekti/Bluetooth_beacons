require('dotenv').config({path:__dirname+'/./.env'})

const rdb_host = process.env.RDB_HOST
const nrt_host = process.env.NRT_HOST

const nrt_user = process.env.NRT_USER
const nrt_password = process.env.NRT_PASSWORD

const mqtt_user = process.env.MQTT_USER
const mqtt_password = process.env.MQTT_PASSWORD

const rt_user = process.env.RT_USER
const rt_password = process.env.RT_PASSWORD

const port = process.env.PORT
const socket_server_port = process.env.SOCKET_SERVER_PORT

module.exports = {
    database: {
      db: "rt_beacons" || process.env.RDB_DB,
      host: "localhost" || process.env.RDB_HOST,
      port: 28015 || process.env.RDB_PORT,
      user: process.env.RT_USER,
      password: process.env.RT_PASSWORD
    },
    rdb_host, nrt_host, nrt_user, nrt_password, mqtt_user,
    mqtt_password, rt_user, rt_password, port,
    socket_server_port
}

// https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables