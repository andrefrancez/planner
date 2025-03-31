import { createReminder, deleteReminder, updateReminder } from '../api/Axios.js';

export const saveReminder = async ({title, priority, reminderId, scheduled_at}) => {
  try {
    // Atualizar
    if(reminderId) {
      await updateReminder(reminderId, { title, priority })
      
      return {
        success: true
      }
    } else {
      const newReminder = await createReminder({title, priority, scheduled_at})

      return {
        success: true,
        newReminderId: newReminder?.id
      }
    }
  } catch(error){
    console.error('(services) ', error)
    return {
      success: false
    }
  }
}

export const removeReminder = async (reminderId) => {
  try{
    await deleteReminder(reminderId)

    return {
      success: true
    }
  }catch(error){
    console.error('(Services) erro ao excluir!', error)
  }
}