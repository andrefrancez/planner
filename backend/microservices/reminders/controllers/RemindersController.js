const { v4: uuidv4 } = require('uuid')

let reminders = [];

const getAllReminders = (req, res) => {
    res.status(200).json(reminders)
}

const createReminders = (req, res) => {
    const { title, priority } = req.body

    if (!title)
        return RegExp.status(400).json(
            {
                message: 'Titulo é obrigatórios!'
            })

    const newReminder = {
        id: uuidv4(),
        title,
        priority: priority || 'low'
    }

    reminders.push(newReminder)
    res.status(201).json(newReminder)
}

const updateReminder = (req, res) => {
    const { id } = req.params
    const { title, priority } = req.body

    const reminderId = reminders.findIndex(r => r.id === id)

    if (reminderId === -1)
        return res.status(404).json({
            message: 'Id não encontrado!'
        })

    const updatedReminder = {
        id,
        title: title || reminders[reminderId].title,
        priority: priority || reminders[reminderId].priority
    }

    reminders[reminderId] = updatedReminder
    res.send({
        message: 'Lembrete atualizado!'
    })
}

const deleteReminder = (req, res) => {
    const { id } = req.params

    const reminderId = reminders.findIndex(r => r.id === id)
    if (reminderId === -1)
        return res.status(404).json({
            message: 'Id não encontrado!'
        })

    reminders.splice(reminderId, 1)
    res.status(204).send()
}

module.exports = {
    getAllReminders,
    createReminders,
    updateReminder,
    deleteReminder
}