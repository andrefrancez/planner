const express = require('express')
const {getAllReminders, createReminders, updateReminder, deleteReminder, } = require('../controllers/remindersController.js')

const router = express.Router()

router.get('/reminders', getAllReminders)
router.post('/reminders', createReminders)
router.patch('/reminders/:id', updateReminder)
router.delete('/reminders/:id', deleteReminder)

module.exports = router