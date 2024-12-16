import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import Hour from "./Hour";

const Day = ({ day, reminders, onAddReminder }) => {
  const hours = Array.from({ length: 24 }, (_, i) => `${(i + 5) % 24}:00`);

  const safeReminders = reminders || {};

  return (
    <Card style={{ borderRadius: "8px", marginBottom: "16px", backgroundColor: '#E0FFFF'}}>
      <Card.Body>
        <Card.Title>{day}</Card.Title>
        <ListGroup>
          {hours.map((hour) => (
            <Hour
              key={`${day}-${hour}`}
              day={day}
              hour={hour}
              reminder={safeReminders[hour]}
              onAddReminder={onAddReminder}
            />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Day;
