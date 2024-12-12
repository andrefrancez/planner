const express = require('express')
const cors = require('cors')
const remindersRoutes = require('./routes/RemindersRoute.js')

const app = express()
app.use(express.json());

app.use(remindersRoutes)

app.listen(4000, () => {
    console.log('Porta 4000')
})