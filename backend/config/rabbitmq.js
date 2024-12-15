const amqp = require('amqplib')

let connection, channel

async function connectRabbit() {
    try {
        connection = await amqp.connect('amqp://localhost')
        channel = await connection.createChannel()
        console.log('Conectado!')

        const exchangeReminders = 'reminders'
        const exchangeObservations = 'observations'
        const remindersQueue = 'remindersQueue'
        const observationsQueue = 'observationsQueue'
        const exchangeChatGPT = 'chatGpt'
        const chatGPTQueue = 'chatGpt'

        await channel.assertExchange(exchangeReminders, 'topic', { durable: true })
        await channel.assertExchange(exchangeObservations, 'topic', { durable: true })
        await channel.assertExchange(exchangeChatGPT, 'topic', {durable: true})

        await channel.assertQueue(remindersQueue, { durable: true })
        await channel.assertQueue(observationsQueue, { durable: true })
        await channel.assertQueue(chatGPTQueue, {durable:true})

        await channel.bindQueue(observationsQueue, exchangeObservations)
        await channel.bindQueue(remindersQueue, exchangeReminders)
        await channel.bindQueue(chatGPTQueue, exchangeChatGPT)
    } catch (error) {
        console.error('Erro ao conectar', error)
        throw error
    }
}

function getChannel() {
    if (!channel)
        throw new Error('Rabbit não iniciado.')

    return channel
}

async function closeRabbit() {
    if (channel) await channel.close();
    if (connection) await connection.close()
    console.log('Conexão fechada!')
}

module.exports = {
    connectRabbit,
    getChannel,
    closeRabbit
}