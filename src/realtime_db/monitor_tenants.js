const axios = require("axios")
const _ = require('lodash')

const monitor_tenants = async () => {
    let delay = 6000
    let interval

    const tenants = await getData('http://localhost:4000/tenants')
    const receivers = await getData('http://localhost:4000/receivers')
    if (tenants && receivers) {
        interval = setInterval(() => getLocations(tenants, receivers), delay);
    } else {
        console.log('cannot get tenant or receiver data, app will not work')
    }
    /* this setInterval is unnecessary for the function of the monitoring, it's for the purpose
     of clearing the beacon_detections database table in the development
     environment, you can comment out the next line */
    setInterval(() => clearDetections('http://localhost:4000/detections'), 60000)
}

module.exports = monitor_tenants

const getLocations = async (tenants, receivers) => {
    const locations = await getData('http://localhost:4000/detections/locations')
    const locationsData = await combineData(locations, tenants, receivers)
    await getStatusForTenants(locationsData)
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

const clearDetections = async (url) => {
    try {
        const result = await axios.delete(url)
        console.log('clear detections')
        return result.data;
    }
    catch(error){
        console.log('axios delete error')
        return
    }
}

const updateData = async (url, newObj) => {
    const response = await axios.put(`${url}/${newObj.id}`, newObj)
    return response.data
}

const updateChecked = async (url, id, value) => {
    let checked = value
    console.log('updateChecked value', value)
    const response = await axios.put(`${url}/${id}`, {checked})
    return response.data
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
        let result = _.find(receivers, function(t) { return t.receiver_id.toLowerCase() === receiver_id.toLowerCase() })
        return result
    } catch(error) {
        console.log(error)
    }
}

//obj= locations object
const combineData = async (obj, tenants, receivers) => {
    let array = []

    try {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                let tenant = await getTenant(key, tenants)
                let receiver = await getReceiver(obj[key].closest_receiver, receivers)
                array.push({tenant: tenant, receiver: receiver, measurement_time: obj[key].measurement_time})
            }
        }
        //console.log('array', array)
        return array
    } catch(error) {
        console.log(error)
    }
       
}

const getStatusForTenants = async (tenantData) => {
    try {
        _.forEach( tenantData, t =>  defineStatus(t))
      
    } catch(error) {
        console.log(error)
    }
} 

const defineStatus = (obj) => {
    let alarmStatus = 'alarm'
    // to handle unknown receivers not stored in database!
    if (obj.receiver !== undefined) {
        let pair = obj.tenant.profile_type + '.' + obj.receiver.location_type
        let status = ''
        let newObj = { 
            id: obj.tenant.tenant_id,
            firstname: obj.tenant.tenant_firstname,
            lastname: obj.tenant.tenant_lastname,
            measurement_time: obj.measurement_time,
            location: obj.receiver.space_name
        }
        console.log(obj.tenant.space_name + ' ' + obj.receiver.space_name)
        console.log('pair', pair)
    
        const restricted = '1.1'
        const restrictedVisiting = '3.1'
        // check if tenant is in his/her own home or someone else's home
        if (pair === restricted || pair === restrictedVisiting) {
            if (obj.tenant.space_name === obj.receiver.space_name) {
                // tenant's own home, status ok
                status = statusMap.get(pair)[0]
                //console.log(status)
            } else {
                status = statusMap.get(pair)[1]
                //console.log(status)
            }
        } else {
            status = statusMap.get(pair)
            //console.log(status)
        }
        newObj.status = status
        //console.log('newObj', newObj)
        console.log('objStatus', `${newObj.status} ${newObj.firstname} ${newObj.lastname}`)
        updateData('http://localhost:4000/statuses', newObj)
        // TODO go through tenants and add a check if their beacon has not sent data for x (?) seconds
    
        // this function checks if a nurse has already reacted to the alarm, updates the tenant 
        // checked-field according to tenant status, or sends a push notification in alarm mode
        checkIfChecked(newObj) 
    }  
}

let statusMap = new Map([
    // first number profile_type, second location_type, eq. 1.1 = tenant_profile_type 1 and location_type 1
    ['1.1', ['ok', 'alarm']],
    ['1.2', 'alarm'],
    ['1.3', 'alarm'],
    ['1.4', 'alarm'],
    ['2.1', 'ok'],
    ['2.2', 'ok'],
    ['2.3', 'go check'],
    ['2.4', 'alarm'],
    ['3.1', ['ok', 'alarm']],
    ['3.2', 'ok'],
    ['3.3', 'go check'],
    ['3.4', 'alarm']
  ])

  // https://medium.com/@martin.crabtree/javascript-tracking-key-value-pairs-using-hashmaps-7de6df598257

  const checkIfChecked = async (newObj) => {
    const tenant = await getData(`http://localhost:4000/statuses/${newObj.id}`)
        console.log('checked?', tenant.checked)
        let alarmStatus = 'alarm'
        if (tenant.checked) {
            if (newObj.status !== alarmStatus) {
                console.log('status has changed, no need to keep checked')
                updateChecked('http://localhost:4000/statuses', newObj.id, false)
            } else {
                console.log(`${newObj.firstname} ${newObj.lastname} already taken care of`)
            }
            
        } else {
            if (newObj.status === alarmStatus) {
                sendNotification(newObj)
            }
        }
  }

  const sendNotification = async (tenant) => {
    const title = `${tenant.firstname} ${tenant.lastname} at ${tenant.location}`
    const body = `Alarm! ${tenant.firstname} ${tenant.lastname} at ${tenant.location}`
    const req = await axios.post("http://localhost:4000/api/push_notification/message", {
      title,
      body
    })
  }
