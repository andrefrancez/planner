const express = require('express')
const cors = require('cors')
const observationRoutes = require('./routes/observationsRoute.js')

const app = express()

app.use(express.json())

app.use(observationRoutes)

app.listen(5000, () => {
    console.log('Porta 5000')
})