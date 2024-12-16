import React, { useState } from "react"
import { Row, Col } from "react-bootstrap"
import Day from "./Day.js"

const Week = () => {
    const days = [
        "Domingo",
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado",
    ]

    const [reminders, setReminders] = useState({})

    const addReminder = (day, hour, title, priority, observation) => {
        setReminders((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [hour]: {
                    title, priority, observation
                }
            },
        }))
    }

    return (
        <>
            <Row className="g-2" style={{ textAlign: 'center' }}>
                {days.map((day) => (
                    <Col key={day}>
                        <Day day={day} reminders={reminders[day]} onAddReminder={addReminder} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Week