var model = require('../models/beacons');
const express = require('express')
const router = express.Router()


    router.get('/', function (req, res) {
        model.getBeacons(function (result) {
            console.log('Getting results', result)
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send({
                result
            });
        });
    });

    router.post('/', function (req, res) {
        var beacon = {
            receiver_id:req.body.receiver_id,
            beacon_id: req.body.beacon_id,
            signal_db: req.body.signal_db,
            measurement_time: req.body.measurement_time
        };
        model.saveBeacon(beacon, function (success, result) {
            if (success) res.json({
                status: 'OK'
            });
            else res.json({
                status: 'Error'
            });
        });
    });

module.exports = router

