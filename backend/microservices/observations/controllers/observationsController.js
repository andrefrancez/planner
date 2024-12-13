const { v4: uuidv4 } = require('uuid')
const db = require('../db')

const createObservation = async (req, res) => {
    const { description } = req.body
    const { id: reminderId } = req.params;

    if (!description || !reminderId)
        return res.status(400).json({
            message: 'Descrição e Id do Lembretes são obrigatórios!'
        })

    const observationId = uuidv4();

    try {
        const [reminder] = await db.execute(
            'SELECT * FROM reminders_db.tb_reminders WHERE id = ?',
            [reminderId]
        )

        if (reminder.length === 0) {
            return res.status(404).json({
                message: 'Lembrete não encontrado!',
            })
        }

        const [result] = await db.execute(
            'INSERT INTO tb_observations (id, description, reminder_id) VALUES (?, ?, ?)',
            [observationId, description, reminderId]
        )

        const newObservation = {
            id: observationId,
            description,
            reminderId
        }

        res.status(201).json(newObservation)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getObservationsByReminderId = async (req, res) => {
    const { reminderId } = req.params

    try {
        const [rows] = await db.execute(
            'SELECT * FROM tb_observations WHERE reminder_id = ?',
            [reminderId]            
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
        return res.status(204).send()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createObservation,
    getObservationsByReminderId,
    updateObservation,
    deleteObservation
}