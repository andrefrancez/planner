const express = require('express')
const cors = require('cors')
const observationRoutes = require('./routes/observationsRoute.js')
const {connectRabbit} = require('../../config/rabbitmq.js')

const app = express();


app.use(cors());
app.use(express.json());

// RabbitMQ
(async () => {
    try{
        await connectRabbit()
        console.log('Conectado!')
    }catch(error){
        console.error('Erro ao conectar!', error)
    }
})();

app.use(observationRoutes);

app.listen(5000, () => {
    console.log('Porta 5000')
});