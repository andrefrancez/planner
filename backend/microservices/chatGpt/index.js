const express = require('express')
const cors = require('cors')
const chatRoutes = require('./routes/chatRoutes.js')

const app = express();

app.use(cors());
app.use(express.json());

app.use(chatRoutes);

app.listen(3500, () => {
    console.log('Conectado: Porta 3500')
});