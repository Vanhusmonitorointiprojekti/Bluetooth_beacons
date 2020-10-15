const model = require('../models/tenants')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    model.getStatuses((result) => {
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
    let id = req.params.id
    let status = req.body.status
    model.updateTenantStatus(id, status, function (success, result) {
        if (success) res.json({
           result
        });
        else res.json({
            status: 'Error'
        });
    });
})

module.exports = router