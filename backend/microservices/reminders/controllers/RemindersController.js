const { v4: uuidv4 } = require('uuid')
const db = require('../db')
const {getChannel} = require('../../../config/rabbitmq.js')

const getAllReminders = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM tb_reminders'
        )
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const createReminders = async (req, res) => {
    const { title, priority } = req.body

    if (!title)
        return RegExp.status(400).json(
            {
                message: 'Titulo é obrigatórios!'
            })

    const reminderId = uuidv4()

    try {
        const [result] = await db.execute(
            'INSERT INTO tb_reminders (id, title, priority) VALUES (?, ?, ?)',
            [reminderId, title, priority || 'baixa']
        )

        const newReminder = {
            id: reminderId,
            title,
            priority: priority || 'baixa'
        }

        // RabbitMQ
        const channel = getChannel()
        const event = {
            eventType: 'REMINDER_CREATE',
            timestamp: new Date().toISOString(),
            payload: newReminder
        }

        channel.publish(
            'reminders',
            '',
            Buffer.from(JSON.stringify(event))
        )

        res.status(201).json(newReminder)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateReminder = async (req, res) => {
    const { id } = req.params
    const { title, priority } = req.body

    try {
        const [result] = await db.execute(
            'UPDATE tb_reminders SET title = ?, priority = ? WHERE id = ?',
            [title, priority || 'baixa', id]
        )

        if (result.affectedRows === 0)
            return res.status(404).json({
                message: 'Lembrete não encontrado!'
            })

        // RabbitMQ
        const channel = getChannel()
        const event = {
            eventType: 'REMINDER_UPDATE',
            timestamp: new Date().toISOString(),
            payload: {
                id,
                title,
                priority
            }
        }

        channel.publish(
            'reminders',
            '',
            Buffer.from(JSON.stringify(event))
        )

        res.status(200).json({
            message: 'Lembrete atualizado!'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteReminder = async (req, res) => {
    const { id } = req.params

    try {
        const [observationsResult] = await db.execute(
            'DELETE FROM observations_db.tb_observations WHERE reminder_id = ?',
            [id]
        )

        const [result] = await db.execute(
            'DELETE FROM tb_reminders WHERE id = ?',
            [id]
        )

        if (result.affectedRows === 0)
            return res.status(404).json({
                message: 'Lembrete não encontrado!'
            })

        // Rabbit
        const channel = getChannel()
        const event = {
            eventType: 'REMINDER_DELETE',
            timestamp: new Date().toISOString(),
            payload: {reminderId: id}
        }

        channel.publish(
            'reminders',
            '',
            Buffer.from(JSON.stringify(event))
        )

        res.status(204).send()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getAllReminders,
    createReminders,
    updateReminder,
    deleteReminder
}