import axios from 'axios'

const apiReminder = axios.create({
    baseURL: 'http://localhost:4000'
})

const apiChat = axios.create({
    baseURL: 'http://localhost:3500'
})

// Reminders

export const getReminders = async () => {
    try {
        const response = await apiReminder.get('/reminders')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const createReminder = async ({ title, priority, scheduled_at }) => {
    try {
        const response = await apiReminder.post('/reminders', { title, priority, scheduled_at})
        return response.data
    } catch (error) {
        console.error("(axios) Erro ao criar:", error)
    }
}

export const updateReminder = async (id, {title, priority}) => {
    try{
        const response = await apiReminder.patch(`/reminders/${id}`, {title, priority})
        return response.data
    }catch(error){
        console.error('(axios)Erro ao atualizar: ', error)
    }
}

export const deleteReminder = async (id) => {
    try{
        return await apiReminder.delete(`/reminders/${id}`)
    }catch(error){
        console.error('(axios) Erro ao deletar: ', error)
    }
}

// Observation


// Chat

export const createAsk = async (ask) => {
    try{
        const response = await apiChat.post('/chat', {ask})
        return response.data
    } catch(error){
        console.error('(axios)Erro no chat: ', error)
    }
}