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
            number:req.body.number,
            beaconuser: req.body.beaconuser
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

