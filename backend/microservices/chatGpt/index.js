const express = require('express')
//const cors = require('cors')
const chatRoutes = require('./routes/chatRoutes.js')

const app = express()
app.use(express.json())

app.use(chatRoutes)

app.listen(6000, () => {
    console.log('Porta 6000')
})