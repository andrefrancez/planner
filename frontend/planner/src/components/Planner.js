import React, {useState} from 'react'
import MonthYearNavbar from './MonthYearNavbar.js'
import Week from './Week.js'

const Planner = () => {
    const [date, setDate] = useState(new Date())

    const lastWeek = () => {
        setDate((prevDate) => {
            const toLastWeek = new Date(prevDate)
            toLastWeek.setDate(prevDate.getDate() - 7)
            return toLastWeek
        })
    }

    const nextWeek = () => {
        setDate((prevDate) => {
            const toNextWeek = new Date(prevDate)
            toNextWeek.setDate(prevDate.getDate() + 7)
            return toNextWeek
        })
    }

    return (
        <div>
            <MonthYearNavbar 
                currentMonth={date.getMonth() + 1}
                currentYear={date.getFullYear()}
                onLastWeek={lastWeek}
                onNextWeek={nextWeek}
            />

            <Week currentDate={date} />
        </div>
    )
}

export default Planner