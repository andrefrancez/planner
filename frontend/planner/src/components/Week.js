import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Day from './Day.js'
import { getReminders } from '../api/Axios.js'

const Week = ({currentDate}) => {
    const [reminders, setReminders] = useState([])

    useEffect(() => {
        const loadReminders = async () => {
            try{
                const data = await getReminders()
                const remindersByDay = {}
                const days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

                data.forEach((reminder) => {
                    const scheduledDate = new Date(reminder.scheduled_at)
                    const day = days[scheduledDate.getDay()]
                    const hour = `${scheduledDate.getHours()}:00`

                    if(!remindersByDay[day]) remindersByDay[day] = {}

                    remindersByDay[day][hour] = {
                        id: reminder.id,
                        title: reminder.title,
                        priority: reminder.priority
                    }
                })

                setReminders(remindersByDay)
            } catch(error){
                console.error(error)
            }
        }

        loadReminders()
    }, [])


    const days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
    const dayOfWeek = currentDate.getDate() - currentDate.getDay()
    const currentDay = Array.from({length: 7}, (_, i) => {
        const date = new Date(currentDate)
        date.setDate(dayOfWeek + i)
        return date
    })

    return(
        <Row>
            {currentDay.map((dayDate) => {
                const dayWeek = dayDate.getDay()
                const dayName = days[dayWeek]
                const remindersForDay = reminders[dayName] || {}

                return (
                    <Col key={dayDate}>
                        <Day 
                            day={dayName}
                            dayDate={dayDate}
                            reminders={remindersForDay}
                            days={days}
                            currentDay={currentDay}
                        />
                    </Col>
                )
            })}
        </Row>
    )
}

export default Week