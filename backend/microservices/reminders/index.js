const express = require('express')
const cors = require('cors')
const remindersRoutes = require('./routes/remindersRoute.js')
//const {connectRabbitMQ, publishMessage} = require('./rabbit.js')

const app = express()
app.use(express.json());

//connectRabbitMQ()

app.use(remindersRoutes)

app.listen(4000, () => {
    console.log('Porta 4000')
})