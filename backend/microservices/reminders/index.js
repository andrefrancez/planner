const express = require('express')
const cors = require('cors')
const remindersRoutes = require('./routes/remindersRoute.js')
const {connectRabbit} = require('../../config/rabbitmq.js')

const app = express()
app.use(express.json());

// RabbitMQ
(async () => {
    try{
        await connectRabbit()
        console.log('Conectado!')
    }catch(error){
        console.error('Erro ao conectar!', error)
    }
})()

app.use(remindersRoutes)

app.listen(4000, () => {
    console.log('Porta 4000')
})