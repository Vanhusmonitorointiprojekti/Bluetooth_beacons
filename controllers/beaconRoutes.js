var model = require('../models/beacons');
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

    router.get('/groups', (req, res) => {
        model.getGroups((groups) => {
            //console.log('groups', groups)
            let data = getStrongestSignalPerBeacon( groupByBeacon(groups) )
            console.log('testi', data)
            res.send(groups)
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
        console.log('signal', strongerSignal)
        return strongerSignal
    }
    let array

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            obj[key] = obj[key].reduce(reducer, {})
        }
      }

    return obj;
}


