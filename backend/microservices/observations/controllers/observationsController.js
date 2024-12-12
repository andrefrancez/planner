const { v4: uuidv4 } = require('uuid')

let observations = []

const createObservation = (req, res) => {

    const {description} = req.body
    const { id: reminderId } = req.params;

    if (!description || !reminderId)
        return res.status(400).json({
            message: 'Descrição e Id do Lembretes são obrigatórios!'
        })

    const newObservation = {
        id: uuidv4(),
        description,
        reminderId
    }

    observations.push(newObservation)
    res.status(201).json(newObservation)
}

const getObservationsByReminderId = (req, res) => {
    const { reminderId } = req.params
    const observationsForReminder = observations.filter((o) => o.reminderId === reminderId)
    console.log('Filtered Observations:', observationsForReminder);
    res.status(200).json(observationsForReminder)
}

const updateObservation = (req, res) => {
    const { id } = req.params
    const { description, reminderId } = req.body

    const observationId = observations.findIndex(o => o.id === id)

    if (observationId === -1)
        return res.status(404).json({
            message: 'Observação não encontrada!'
        })

    const updatedObservation = {
        id,
        description: description || observations[observationId].description,
        reminderId: reminderId || observations[observationId].reminderId
    }

    observations[observationId] = updatedObservation
    res.send({
        message: 'Observação atualizada!'
    })
}

const deleteObservation = (req, res) => {
    const { id } = req.params

    const observationId = observations.findIndex(o => o.id === id)

    if (observationId === -1)
        return res.status(404).json({
            message: 'Observação não encontrada!'
        })

    observations.splice(observationId, 1)
    res.status(204).send()
}

module.exports = {
    createObservation,
    getObservationsByReminderId,
    updateObservation,
    deleteObservation
}