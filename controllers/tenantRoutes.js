const model = require('../models/tenants')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    model.getStatuses((result) => {
        console.log('statuses', result)
        res.send(
            result
        )
    })
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    model.getTenant(id, (result) => {
        res.send(
            result
        )
    })
})

router.post('/', function (req, res) {
    let tenant = {
        firstname: req.body.firstname,
        last_updated: req.body.last_updated || null,
        lastname: req.body.lastname,
        status: req.body.status || null,
        tenant_id: req.body.tenant_id
    }
    model.saveTenant(tenant, function (success, result) {
        if (success) res.json({
            result
        })
        else res.json({
            status: 'Error'
        })
    })
})

router.put('/:id', function (req, res) {
    const id = req.params.id
    if (req.body.checked != undefined) {
        console.log('Checked!')
        const checked = req.body.checked
        model.updateTenantChecked(id, checked, function (success, result) {
            if (success) res.json({
            result
            });
            else res.json({
                status: 'Error'
            });
        });
    } else {
    const status = req.body.status
    const time = req.body.measurement_time
    const location = req.body.location
    model.updateTenantStatus(id, status, time, location, function (success, result) {
        if (success) res.json({
           result
        });
        else res.json({
            status: 'Error'
        });
    });
    }
})

module.exports = router