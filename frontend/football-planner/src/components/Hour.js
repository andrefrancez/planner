import React, {Component} from 'react'
import { Button} from 'react-bootstrap'
import ReminderDialog from './ReminderDialog.js'

export default class Hour extends Component {
  constructor(props) {
    super(props)

    this.priorityColors = {
      alta: '#B22222',
      media: '#FFD700',
      baixa: '#00FA9A',
    }
  }

  getPriorityColors(priority) {
    return this.priorityColors[priority]
  }

  render() {
    const {day, hour, reminder, days, currentDay} = this.props
    const testReminder = reminder || {}
    
    return (
      <ReminderDialog day={day} hour={hour} reminder={testReminder} days={days} currentDay={currentDay}>
        <Button variant='secondary' style={{
          width: '80%',
          backgroundColor: reminder ? this.getPriorityColors(reminder.priority) : '#C0C0C0',
          color: 'black',
          border: '1px solid #696969',
          borderRadius: '5px',
          fontSize: '14px',
          padding: '6px',
          margin: '5px'
        }}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            {hour} {reminder ? `- ${reminder.title}` : '- Disponível'}
          </div>
        </Button>
      </ReminderDialog>
    )
  }
}