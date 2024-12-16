import React from 'react'
import { Button } from 'react-bootstrap'
import ReminderDialog from './ReminderDialog'

const Hour = ({ day, hour, reminder, onAddReminder }) => {
  const getPriorityColor = (priority) => {
    console.log(priority)
    switch (priority) {
      case 'alta':
        return '#B22222'
      case 'media':
        return '#FFD700'
      case 'baixa':
        return '#00FA9A'
      default:
        return '#E0FFFF'
    }
  }

  return (
    <ReminderDialog day={day} hour={hour} reminder={reminder} onAddReminder={onAddReminder}>
      <Button
        variant='light'
        style={{
          width: '100%',
          padding: '8px',
          margin: '4px 0',
          backgroundColor: reminder ? getPriorityColor(reminder.priority) : '#E0FFFF',
          color: 'black',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
        {hour} {reminder ? `- ${reminder.title}  ` : '- Disponível'}
        </div>
      </Button>
    </ReminderDialog>
  )
}

export default Hour