const { v4: uuidv4 } = require('uuid')
const db = require('../db')
const {getChannel} = require('../../../config/rabbitmq.js')

const createObservation = async (req, res) => {
    const { description, scheduled_at} = req.body;

    if (!description) {
        return res.status(400).json({
            message: 'A descrição é obrigatória!',
        })
    }

    const observationId = uuidv4();

    try {
        await db.execute(
            'INSERT INTO tb_observations (id, description, scheduled_at) VALUES (?, ?, ?)',
            [observationId, description, scheduled_at]
        )

        const newObservation = {
            id: observationId,
            description,
            scheduled_at
        }

        const channel = getChannel();
        const event = {
            eventType: 'OBSERVATION_CREATE',
            timestamp: new Date().toISOString(),
            payload: newObservation,
        }

        channel.publish(
            'observations',
            '',
            Buffer.from(JSON.stringify(event))
        )

        res.status(201).json(newObservation);
    } catch (error) {
        console.error('Erro ao criar a observação:', error);
        res.status(500).json({
            message: 'Erro interno no servidor. Tente novamente mais tarde.',
        })
    }
}


const getObservations = async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM tb_observations'
        )

        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateObservation = async (req, res) => {
    const { id } = req.params
    const { description} = req.body

    if (!description) {
        return res.status(400).json({
            message: 'Descrição é obrigatória!'
        });
    }

    try {
        const [result] = await db.execute(
            'UPDATE tb_observations SET description = ? WHERE id = ?',
            [description, id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Observação não encontrada!'
            })
        }

        const channel = getChannel()
        const event = {
            eventType: 'OBSERVATION_UPDATE',
            timestamp: new Date().toISOString(),
            payload: {
                id,
                description
            }
        }

        channel.publish(
            'observations',
            '',
            Buffer.from(JSON.stringify(event))
        )

        res.status(200).json({
            message: 'Observação atualizada!'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteObservation = async (req, res) => {
    const { id } = req.params

    try {
        const [result] = await db.execute(
            'DELETE FROM tb_observations WHERE id = ?',
            [id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Observação não encontrada!'
            })
        }

        const channel = getChannel()
        const event = {
            eventType: 'OBSERVATION_DELETE',
            timestamp: new Date().toISOString(),
            payload: {
                id
            }
        }

        channel.publish(
            'observations',
            '',
            Buffer.from(JSON.stringify(event))
        )

        return res.status(204).send()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createObservation,
    getObservations,
    updateObservation,
    deleteObservation
}