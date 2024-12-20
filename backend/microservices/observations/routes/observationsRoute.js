const express = require('express')
const {createObservation, getObservations, deleteObservation, updateObservation} = require('../controllers/observationsController.js')

const router = express.Router()

router.post('/observations', createObservation)
router.get('/observations', getObservations)
router.patch('/observations/:id', updateObservation)
router.delete('/observations/:id', deleteObservation)

module.exports = router