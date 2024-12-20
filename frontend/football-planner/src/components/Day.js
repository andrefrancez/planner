import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import Hour from './Hour';

export default class Day extends Component{
  constructor(props){
    super(props)

    this.hours = Array.from({length: 24}, (_, i) => `${(i + 5) % 24}:00`)
  }

  render(){
    const {day, dayDate, reminders, days, currentDay} = this.props
    const safeReminders = reminders || {};

    return(
      <Card className='mb-3' style={{
        borderRadius: '10px',
        backgroundColor: '#A9A9A9'
      }}>
        <Card.Body>
          <Card.Title>{day} - {dayDate.getDate()}</Card.Title>
          <ListGroup>
            {this.hours.map((hour) => (
              <Hour key={`${day}-${hour}`} day={day} hour={hour} reminder={safeReminders[hour]} days={days} currentDay={currentDay}>                
              </Hour>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    )
  }
}