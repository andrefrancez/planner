const express = require('express')
const chatController = require('../controllers/chatController.js')

const router = express.Router()

router.post('/chat', chatController.postChat)

module.exports = router