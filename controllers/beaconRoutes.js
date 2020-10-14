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
        // get averaged signal strengths from all receivers grouped by beacon and receiver:
        model.getLocations((groups) => {
            //console.log('groups', groups)
            let data = getStrongestSignalPerBeacon( groupByBeacon(groups) )
            //console.log('testi', data)
            res.send(data)
        })
    })


module.exports = router

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
            obj[key] = { closest_receiver: newObj.group[1], signal_avg: newObj.reduction }
            //obj[key] = obj[key].reduce(reducer, {})
        }
      }

    return obj;
}


