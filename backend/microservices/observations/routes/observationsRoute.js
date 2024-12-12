const express = require('express')
const {createObservation, getObservationsByReminderId, deleteObservation, updateObservation} = require('../controllers/observationsController.js')

const router = express.Router()

router.post('/reminders/:id/observations', createObservation)
router.get('/reminders/:reminderId/observations', getObservationsByReminderId)
router.patch('/observations/:id', updateObservation)
router.delete('/observations/:id', deleteObservation)

module.exports = router