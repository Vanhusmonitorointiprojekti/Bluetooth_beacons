const model = require('../models/beacons')
const express = require('express')
const router = express.Router()


    router.get('/', (req, res) => {
        model.getDetections((result) => {
            //console.log('Getting results', result)
            //res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(
                result
            )
        })
    })

    router.get('/locations', (req, res) => {
        
        model.getLocations((groups) => {
            //console.log('groups', groups)
            // get averaged signal strengths from all receivers grouped by beacon and receiver:
            const avgData = getAverageSignalStrengthAndLatestMeasurement_time(groups)
            let data = getStrongestSignalPerBeacon( groupByBeacon(avgData) )
            console.log('data', data)
            res.send(data)
        })
    })

    router.delete('/', (req, res) => {
        model.deleteDetections((result) => {
            res.send(result)
        })
    })

module.exports = router

const getAverageSignalStrengthAndLatestMeasurement_time = (data) => {

    const reducer = (accumulator, currentValue) => accumulator + currentValue.signal_db

    let newArray = data.map(d => {
        let avg = d.reduction.reduce(reducer, 0)/d.reduction.length
        let times = d.reduction[0].measurement_time
        let group = d.group
        return {group, reduction: avg, measurement_time: times}
    })
    //console.log('huipennus', newArray)
    return newArray
}

const groupByBeacon = (data) => {
    //[ { group: [ 'd6:2c:ca:c0:d4:9c', 'receiver2' ],reduction: -15.8 },
    // https://medium.com/@edisondevadoss/javascript-group-an-array-of-objects-by-key-afc85c35d07e
    let sorted = data.reduce((r, a) => {
        r[a.group[0]] = [...r[a.group[0]] || [], a];
        return r;
       }, {});
    return sorted;
    //{ 'd6:2c:ca:c0:d4:9c':[ { group: [Array], reduction: -15.8 },{ group: [Array], reduction: -60.4 } ],

}

const getStrongestSignalPerBeacon = (obj) => {
    let reducer = ( acc, cur ) => {
        let strongerSignal = acc.reduction > cur.reduction ? acc : cur
        //console.log('signal', strongerSignal)
        return strongerSignal
    }

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newObj = obj[key].reduce(reducer, {})
            obj[key] = { closest_receiver: newObj.group[1], signal_avg: newObj.reduction, measurement_time: newObj.measurement_time }
        }
      }

    return obj;
}


