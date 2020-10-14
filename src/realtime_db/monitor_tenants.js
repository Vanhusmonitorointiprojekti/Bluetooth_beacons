const axios = require("axios")
const _ = require('lodash')

const monitor_tenants = async () => {
    let delay = 5000
    let interval

    const tenants = await getData('http://localhost:4000/tenants')
    const receivers = await getData('http://localhost:4000/receivers')
    if (tenants && receivers) {
        interval = setInterval(() => getLocations(tenants, receivers), delay);
    } else {
        console.log('cannot get tenant or receiver data, app will not work')
    }
    
}

module.exports = monitor_tenants

const getLocations = async (tenants, receivers) => {
    const locations = await getData('http://localhost:4000/detections/locations')
    const locationsData = await combineData(locations, tenants, receivers)
    // todo logic continues
}

const getData = async (url) => {
    try {
        const result = await axios.get(url)
        return result.data;
    }
    catch(error){
        console.log('axios getData error')
        return
    }
}

const getTenant = async (beacon_id, tenants) => {
    try {
        let result = _.find(tenants, function(t) { return t.beacon_id === beacon_id })
        return result
    } catch(error) {
        console.log(error)
    }
}

const getReceiver = async (receiver_id, receivers) => {

    try {
        let result = _.find(receivers, function(t) { return t.receiver_id.toLowerCase() === receiver_id })
        return result
    } catch(error) {
        console.log(error)
    }
}

const combineData = async (obj, tenants, receivers) => {
    let array = []

    try {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                let tenant = await getTenant(key, tenants)
                let receiver = await getReceiver(obj[key].closest_receiver, receivers)
                array.push({tenant: tenant, receiver: receiver})
            }
        }
        console.log('array', array)
        return array
    } catch(error) {
        console.log(error)
    }
    
    
}
