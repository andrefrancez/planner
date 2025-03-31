import React from 'react'
import { Button} from 'react-bootstrap'
import ReminderDialog from './ReminderDialog.js'

const Hour = ({day, hour, reminder = {}, days, currentDay}) => {
  const priorityColors = {
    baixa: '#00FA9A',
    media: 'FFD700',
    alta: 'B22222'
  }

  const getPriorityColor = (priority) => priorityColors[priority]

  return (
    <ReminderDialog day={day} hour={hour} reminder={reminder} days={days} currentDay={currentDay}>
      <Button
        variant="secondary"
        style={{
          width: '80%',
          backgroundColor: reminder ? getPriorityColor(reminder.priority) : '#C0C0C0',
          color: 'black',
          border: '1px solid #696969',
          borderRadius: '5px',
          fontSize: '14px',
          padding: '6px',
          margin: '5px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {hour} - {reminder.title || 'Disponível'}
        </div>
      </Button>
    </ReminderDialog>
  )
}

export default Hour