import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import Hour from './Hour';

const Day = ({ day, dayDate, reminders = {}, days, currentDay}) => {
  const hours = Array.from({ length: 24 }, (_, i) => `${(i + 5) % 24}:00`)

  return (
    <Card className='mb-3' style={{
      borderRadius: '10px',
      backgroundColor: '#A9A9A9'
    }}>
      <Card.Body>
        <Card.Title>{day} - {dayDate.getDate()}</Card.Title>
        <ListGroup>
          {hours.map((hour) => (
            <Hour key={`${day}-${hour}`} day={day} hour={hour} reminder={reminders[hour]} days={days} currentDay={currentDay}>
            </Hour>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Day