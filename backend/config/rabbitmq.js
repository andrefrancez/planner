const amqp = require('amqplib')

let connection, channel

async function connectRabbit() {
    try {
        connection = await amqp.connect('amqp://localhost')
        channel = await connection.createChannel()
        console.log('Conectado!')

        const exchangeReminders = 'reminders'
        const exchangeObservations = 'observations'
        const RemindersQueue = 'remindersQueue'
        const ObservationsQueue = 'observationsQueue'

        await channel.assertExchange(exchangeReminders, 'topic', { durable: true })
        await channel.assertExchange(exchangeObservations, 'topic', { durable: true })
        
        await channel.assertQueue(RemindersQueue, { durable: true });
        await channel.assertQueue(ObservationsQueue, { durable: true });

        await channel.bindQueue(ObservationsQueue, exchangeObservations);
        await channel.bindQueue(RemindersQueue, exchangeReminders);
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